export default function handler(req, res) {
  // Tell GitHub to treat this as a sharp SVG image
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="850" height="520" viewBox="0 0 850 520" fill="none">
    <style>
      .bg { fill: #0C100C; }
      .border { stroke: #00FF66; stroke-width: 1.5; }
      .text-green { fill: #00FF66; font-family: 'Fira Code', 'Courier New', monospace; font-size: 12px; }
      .text-sub { fill: #A6E22E; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px; }
      .text-muted { fill: #666666; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px; }
      .text-yellow { fill: #E6DB74; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px; }
      .text-cyan { fill: #66D9EF; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px; }
    </style>

    <!-- Outer Terminal Container -->
    <rect width="850" height="520" rx="8" class="bg" />
    <rect x="4" y="4" width="842" height="512" rx="6" fill="none" class="border" />

    <!-- Top Bar -->
    <text x="18" y="24" class="text-green" font-weight="bold">retro@github :: sys.resource_allocation</text>
    <text x="400" y="24" class="text-muted">10:42:17</text>
    <text x="580" y="24" class="text-muted">uptime: 42d 18:07</text>
    <text x="760" y="24" class="text-green">2000ms ⚡</text>

    <!-- Top-Left Box: Wave / CPU Status -->
    <rect x="15" y="38" width="410" height="150" fill="none" stroke="#2D372D" rx="4"/>
    <text x="25" y="55" class="text-sub">cpu ─ menu ─ preset *</text>
    <text x="25" y="100" class="text-green"> ▞▚▞▚▞▚  AUDIO / AUDIO WAVEFORM ACTIVE  ▞▚▞▚▞▚ </text>
    <text x="25" y="170" class="text-muted">developer_mode: ON</text>

    <!-- Top-Right Box: Skills Overview -->
    <rect x="435" y="38" width="400" height="150" fill="none" stroke="#2D372D" rx="4"/>
    <text x="445" y="55" class="text-sub">Common Developer Skills ────────────── 4.0 GHz</text>
    <text x="445" y="75" class="text-green">CPU [████████████████████████░░░░░░░░] 72%</text>

    <text x="445" y="100" class="text-green">C0  Python      85%</text>
    <text x="640" y="100" class="text-green">C4  Django      65%</text>
    <text x="445" y="120" class="text-green">C1  JavaScript  60%</text>
    <text x="640" y="120" class="text-green">C5  Flask       50%</text>
    <text x="445" y="140" class="text-green">C2  HTML/CSS    70%</text>
    <text x="640" y="140" class="text-green">C6  MySQL       60%</text>

    <!-- Bottom-Left Box: Memory / Stack Allocations -->
    <rect x="15" y="198" width="410" height="305" fill="none" stroke="#2D372D" rx="4"/>
    <text x="25" y="215" class="text-sub">mem ──── stack ──── io</text>
    <text x="25" y="240" class="text-green">Total: 16.0 GiB</text>
    <text x="25" y="270" class="text-green">Python / Django    [██████████████░░] 4.2 GiB</text>
    <text x="25" y="300" class="text-yellow">JavaScript / Node  [████████░░░░░░░░] 2.1 GiB</text>
    <text x="25" y="330" class="text-cyan">MySQL / Relational [████░░░░░░░░░░░░] 1.2 GiB</text>

    <!-- Bottom-Right Box: Process Tree -->
    <rect x="435" y="198" width="400" height="305" fill="none" stroke="#2D372D" rx="4"/>
    <text x="445" y="215" class="text-yellow">proc ┬ filter ────────────────── tree &lt; skills &gt;</text>
    <text x="445" y="240" class="text-muted">PID   Skill         Category     Level     %    Mem</text>

    <text x="445" y="265" class="text-green">1001  Python        Backend      ████████░  85  512M</text>
    <text x="445" y="288" class="text-green">1002  Django        Backend      ██████░░░  65  384M</text>
    <text x="445" y="311" class="text-green">1003  Flask         Backend      █████░░░░  50  256M</text>
    <text x="445" y="334" class="text-yellow">1004  JavaScript    Frontend     ██████░░░  60  320M</text>
    <text x="445" y="357" class="text-yellow">1005  HTML/CSS      Frontend     ███████░░  70  288M</text>
    <text x="445" y="380" class="text-cyan">1006  MySQL         Database     █████░░░░  55  224M</text>
    <text x="445" y="403" class="text-cyan">1007  Linux/Git     Systems      ████████░  80  288M</text>
  </svg>
  `;

  res.status(200).send(svg);
}
