import fs from 'node:fs/promises';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

function parseMemory() {
  return fs.readFile('/proc/meminfo', 'utf8').then((contents) => {
    const values = Object.fromEntries(
      contents.split('\n').flatMap((line) => {
        const match = line.match(/^(\w+):\s+(\d+)/);
        return match ? [[match[1], Number(match[2]) * 1024]] : [];
      }),
    );

    const total = values.MemTotal || os.totalmem();
    const available = values.MemAvailable || os.freemem();
    return { total, available, used: total - available };
  });
}

async function getProcesses() {
  try {
    const { stdout } = await execFileAsync('ps', ['-eo', 'pid,pcpu,pmem,comm', '--sort=-pcpu'], { maxBuffer: 1024 * 1024 });
    return stdout.trim().split('\n').slice(1, 13).map((line) => {
      const match = line.trim().match(/^(\d+)\s+(\S+)\s+(\S+)\s+(.+)$/);
      return match ? { pid: Number(match[1]), cpu: Number(match[2]), memory: Number(match[3]), command: match[4] } : null;
    }).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  try {
    const [memory, processes] = await Promise.all([parseMemory(), getProcesses()]);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).json({
      hostname: os.hostname(),
      platform: `${os.type()} ${os.release()}`,
      cpu: { model: os.cpus()[0]?.model || 'unknown', cores: os.cpus().length, load: os.loadavg() },
      memory,
      uptime: os.uptime(),
      processes,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
