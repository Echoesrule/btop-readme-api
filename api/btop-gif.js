export default async function handler(req, res) {
  const probe = req.query?.probe;
  try {
    if (probe === 'env') {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify({ node: process.version, platform: process.platform, arch: process.arch }));
      return;
    }
    if (probe === 'f') {
      const fontkit = await import('fontkit');
      const { fileURLToPath } = await import('node:url');
      const fontPath = fileURLToPath(new URL('../lib/fonts/Mono.ttf', import.meta.url));
      const font = fontkit.openSync(fontPath);
      const glyph = font.glyphForCodePoint(65);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(200).send(`fontkit ok: ${font.familyName} unitsPerEm=${font.unitsPerEm} glyph=${!!glyph.path.toSVG()}`);
      return;
    }
    if (probe === 's') {
      const sharp = (await import('sharp')).default;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20"><rect width="40" height="20" fill="#a8d98e"/></svg>`;
      const png = await sharp(Buffer.from(svg)).png().toBuffer();
      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(png);
      return;
    }

    const [sharp, fontkit, url, { textToPath }, { btopSvg }, { getSimulation }] = await Promise.all([
      import('sharp').then((m) => m.default),
      import('fontkit'),
      import('node:url'),
      import('../lib/text-to-path.js'),
      import('../lib/btop-svg.js'),
      import('../lib/simulation.js'),
    ]);
    const width = 1152;
    const height = 768;
    const font = fontkit.openSync(url.fileURLToPath(new URL('../lib/fonts/Mono.ttf', import.meta.url)));
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