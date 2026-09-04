import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { btopSvg } from '../lib/btop-svg.js';
import { getSimulation } from '../lib/simulation.js';
import { fileURLToPath } from 'node:url';

const width = 1152;
const height = 768;
const fontPath = fileURLToPath(new URL('../lib/fonts/Mono.ttf', import.meta.url));

export default async function handler(req, res) {
  const start = Date.now();
  const frames = await Promise.all(Array.from({ length: 8 }, (_, index) => {
    const resvg = new Resvg(btopSvg(getSimulation(start + index * 250)), {
      fitTo: { mode: 'width', value: width },
      font: { fontFiles: [fontPath], loadSystemFonts: false, defaultFontFamily: 'Fira Mono' },
    });
    return sharp(resvg.render().asPng()).raw().toBuffer();
  }));
  const gif = await sharp(Buffer.concat(frames), { raw: { width, height: height * frames.length, channels: 4, pageHeight: height } }).gif({ loop: 0, delay: 250 }).toBuffer();

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).send(gif);
}