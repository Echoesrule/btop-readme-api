import * as fontkit from 'fontkit';
import sharp from 'sharp';
import { btopSvg } from '../lib/btop-svg.js';
import { getSimulation } from '../lib/simulation.js';
import { textToPath } from '../lib/text-to-path.js';
import { fileURLToPath } from 'node:url';

const width = 1152;
const height = 768;

export default async function handler(req, res) {
  try {
    const font = fontkit.openSync(fileURLToPath(new URL('../lib/fonts/Mono.ttf', import.meta.url)));
    const start = Date.now();
    const frames = [];
    for (let index = 0; index < 8; index++) {
      const svg = textToPath(btopSvg(getSimulation(start + index * 250), { size: width }), { font, size: 16 });
      frames.push(await sharp(Buffer.from(svg)).raw().toBuffer());
    }
    const gif = await sharp(Buffer.concat(frames), { raw: { width, height: height * frames.length, channels: 4, pageHeight: height } }).gif({ loop: 0, delay: 250 }).toBuffer();

    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).send(gif);
  } catch (error) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(500).send(`ERROR: ${error.stack || error.message || error}`);
  }
}