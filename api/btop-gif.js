import * as fontkit from 'fontkit';
import sharp from 'sharp';
import { btopSvg } from '../lib/btop-svg.js';
import { getSimulation } from '../lib/simulation.js';
import { textToPath } from '../lib/text-to-path.js';
import { fileURLToPath } from 'node:url';

const width = 1152;
const height = 768;
const fontPath = fileURLToPath(new URL('../lib/fonts/Mono.ttf', import.meta.url));

async function render(count) {
  const font = fontkit.openSync(fontPath);
  const start = Date.now();
  const frames = [];
  for (let index = 0; index < count; index++) {
    const svg = textToPath(btopSvg(getSimulation(start + index * 250), { size: width }), { font, size: 16 });
    frames.push(await sharp(Buffer.from(svg)).raw().toBuffer());
  }
  return sharp(Buffer.concat(frames), { raw: { width, height: height * frames.length, channels: 4, pageHeight: height } }).gif({ loop: 0, delay: 250 }).toBuffer();
}

const isText = { 'image/png': true, 'image/jpeg': true, 'image/webp': true, 'image/avif': true };

export default async function handler(req, res) {
  const probe = req.query?.probe;
  try {
    if (probe === 'env') {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify({
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        sharpVersion: sharp.versions?.vips,
        font: typeof fontkit.openSync,
        fontPathExists: typeof process === 'object',
      }));
      return;
    }
    if (probe === '1') {
      const gif = await render(1);
      res.setHeader('Content-Type', 'image/gif');
      res.status(200).send(gif);
      return;
    }
    if (probe === '8') {
      const gif = await render(8);
      res.setHeader('Content-Type', 'image/gif');
      res.status(200).send(gif);
      return;
    }
    const gif = await render(8);
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).send(gif);
  } catch (error) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(500).send(`ERROR: ${error.stack || error.message || error}`);
  }
}