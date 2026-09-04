const processNames = ['python', 'django-server', 'node', 'postgres', 'docker', 'git', 'vite', 'code'];

function wave(seed, offset = 0) {
  return (Math.sin(seed / 1300 + offset) + 1) / 2;
}

export function getSimulation() {
  const timestamp = Date.now();
  const tick = Math.floor(timestamp / 1000);
  const memoryTotal = 16 * 1024 ** 3;
  const memoryUsed = memoryTotal * (0.38 + wave(timestamp, 1.2) * 0.27);

  return {
    simulated: true,
    cpu: { cores: 8, load: [1.1 + wave(timestamp, 0.4) * 3.8] },
    memory: { total: memoryTotal, used: memoryUsed, available: memoryTotal - memoryUsed },
    uptime: 42 * 86400 + 18 * 3600 + tick % 3600,
    processes: processNames.map((command, index) => ({
      pid: 1000 + index,
      cpu: 3 + wave(timestamp, index) * (index === 0 ? 42 : 18),
      memory: 1 + wave(timestamp, index + 2) * 8,
      command,
    })).sort((a, b) => b.cpu - a.cpu),
    timestamp,
  };
}