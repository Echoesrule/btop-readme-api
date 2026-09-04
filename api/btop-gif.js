import sharp from 'sharp';
import { getSimulation } from '../lib/simulation.js';

const width = 720;
const height = 480;
const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]);
const percent = (value, max = 100) => Math.min(100, value / max * 100);

function frame(data) {
  const load = percent(data.cpu.load[0], data.cpu.cores);
  const memory = percent(data.memory.used, data.memory.total);
  const processRows = data.processes.map((process, index) => `<text x="340" y="${190 + index * 25}" class="bright">${escapeXml(process.command)}</text><rect x="480" y="${183 + index * 25}" width="100" height="11" class="bar"/><rect x="480" y="${183 + index * 25}" width="${percent(process.cpu, 50)}" height="11" class="green"/><text x="595" y="${190 + index * 25}" class="green">${process.cpu.toFixed(1)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><style>text{font:14px monospace;dominant-baseline:middle}.bg{fill:#080b09}.panel{fill:#0d120f;stroke:#36503b;stroke-width:2}.bright{fill:#d7e7d5}.green{fill:#a8d98e}.cyan{fill:#8edbd1}.yellow{fill:#f1ca4d}.muted{fill:#759078}.bar{fill:#1b281e}</style><rect width="${width}" height="${height}" class="bg"/><rect x="5" y="5" width="710" height="470" class="panel"/><text x="16" y="22" class="green">simulation :: sys.resource_allocation</text><text x="625" y="22" class="yellow">LIVE</text><rect x="12" y="38" width="330" height="130" class="panel"/><text x="22" y="54" class="cyan">cpu -- usage</text><text x="22" y="86" class="bright">load 1m</text><rect x="90" y="80" width="190" height="12" class="bar"/><rect x="90" y="80" width="${load / 100 * 190}" height="12" class="green"/><text x="290" y="86" class="green">${load.toFixed(1)}%</text><text x="22" y="120" class="bright">cores</text><text x="90" y="120" class="green">${data.cpu.cores}</text><text x="22" y="148" class="muted">synthetic data only</text><rect x="350" y="38" width="358" height="130" class="panel"/><text x="362" y="54" class="cyan">stack -- tools</text><text x="362" y="84" class="bright">Python  Django  JavaScript</text><text x="362" y="110" class="bright">SQL  PostgreSQL  Linux</text><text x="362" y="136" class="bright">Git  Docker  C/C++</text><rect x="12" y="180" width="320" height="288" class="panel"/><text x="22" y="198" class="cyan">mem -- allocation</text><text x="22" y="235" class="bright">used</text><rect x="80" y="229" width="210" height="12" class="bar"/><rect x="80" y="229" width="${memory / 100 * 210}" height="12" class="yellow"/><text x="22" y="275" class="bright">total</text><text x="80" y="275" class="green">${(data.memory.total / 1024 ** 3).toFixed(1)} GiB</text><text x="22" y="305" class="bright">free</text><text x="80" y="305" class="green">${(data.memory.available / 1024 ** 3).toFixed(1)} GiB</text><text x="22" y="430" class="muted">uptime ${Math.floor(data.uptime / 86400)}d</text><rect x="350" y="180" width="358" height="288" class="panel"/><text x="362" y="198" class="cyan">processes -- simulated</text><text x="340" y="225" class="muted">command                  cpu %</text>${processRows}<text x="362" y="450" class="muted">animated GIF preview</text></svg>`;
}

export default async function handler(req, res) {
  const start = Date.now();
  const frames = await Promise.all(Array.from({ length: 8 }, (_, index) => sharp(Buffer.from(frame(getSimulation(start + index * 250)))).raw().toBuffer()));
  const gif = await sharp(Buffer.concat(frames), { raw: { width, height: height * frames.length, channels: 4, pageHeight: height } }).gif({ loop: 0, delay: 250 }).toBuffer();

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).send(gif);
}