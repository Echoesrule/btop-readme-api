export default function handler(req, res) {
  // Tell GitHub to treat this as a sharp SVG image
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1152" height="768" viewBox="0 0 1152 768" fill="none">
    <style>
      text { font-family: 'Fira Code', 'Courier New', monospace; font-size: 16px; dominant-baseline: middle; }
      .bg { fill: #050705; }
      .border { stroke: #9ab59b; stroke-width: 2; }
      .panel { fill: #050705; stroke: #687b68; stroke-width: 2; }
      .text-green { fill: #a8d98e; }
      .text-sub { fill: #b7e35b; }
      .text-muted { fill: #899189; }
      .text-yellow { fill: #f1ca4d; }
      .text-cyan { fill: #8edbd1; }
      .text-purple { fill: #c78fe0; }
      .text-blue { fill: #91b5ed; }
      .text-bright { fill: #d9e7d4; }
      .bar-bg { fill: #1d221e; }
    </style>

    <rect width="1152" height="768" class="bg" />
    <rect x="7" y="7" width="1138" height="754" rx="5" fill="none" class="border" />

    <!-- Top Bar -->
    <text x="20" y="23" class="text-green">retro@github :: sys.resource_allocation</text>
    <text x="558" y="23" class="text-bright">10:42:17</text>
    <text x="812" y="23" class="text-bright">uptime: 42d 18:07</text>
    <text x="1048" y="23" class="text-yellow">2000ms +</text>

    <!-- Top-Left Box: Wave / CPU Status -->
    <rect x="14" y="40" width="592" height="200" rx="5" class="panel" />
    <text x="25" y="53" class="text-sub">cpu ── menu ── preset *</text>
    <path d="M24 136 L35 136 35 120 43 120 43 162 51 162 51 105 59 105 59 150 67 150 67 125 75 125 75 172 83 172 83 92 91 92 91 145 99 145 99 132 107 132 107 166 115 166 115 113 123 113 123 148 131 148 131 126 139 126 139 161 147 161 147 102 155 102 155 139 163 139 163 170 171 170 171 115 179 115 179 151 187 151 187 130 195 130 195 158 203 158 203 111 211 111 211 147 219 147 219 121 227 121 227 165 235 165 235 102 243 102 243 153 251 153 251 132 259 132 259 171 267 171 267 116 275 116 275 145 283 145 283 126 291 126 291 160 299 160 299 95 307 95 307 145 315 145 315 121 323 121 323 173 331 173 331 113 339 113 339 150 347 150 347 128 355 128 355 164 363 164 363 103 371 103 371 145 379 145 379 119 387 119 387 168 395 168 395 107 403 107 403 144 411 144 411 128 419 128 419 175 427 175 427 107 435 107 435 147 443 147 443 122 451 122 451 163 459 163 459 99 467 99 467 142 475 142 475 128 483 128 483 169 491 169 491 111 499 111 499 148 507 148 507 122 515 122 515 165 523 165 523 102 531 102 531 145 539 145 539 127 547 127 547 169 555 169 555 109 563 109 563 145 571 145 571 120 579 120 579 157 587 157 587 136" stroke="#b7e35b" stroke-width="3" fill="none" />
    <text x="25" y="220" class="text-muted">developer_mode: <tspan class="text-green">ON</tspan></text>

    <!-- Top-Right Box: Skills Overview -->
    <rect x="615" y="40" width="523" height="200" rx="5" class="panel" />
    <text x="630" y="53" class="text-bright">Common Developer Skills</text>
    <text x="1070" y="53" class="text-yellow">4.0 GHz</text>
    <text x="630" y="81" class="text-bright">CPU</text>
    <rect x="673" y="72" width="380" height="15" class="bar-bg" /><rect x="673" y="72" width="274" height="15" fill="#9aca9b" />
    <text x="1068" y="81" class="text-sub">72%</text>

    <text x="630" y="112" class="text-bright">C0  Python</text><text x="812" y="112" class="text-green">85%</text>
    <text x="900" y="112" class="text-bright">C4  Django</text><text x="1070" y="112" class="text-green">65%</text>
    <text x="630" y="138" class="text-bright">C1  JavaScript</text><text x="812" y="138" class="text-green">60%</text>
    <text x="900" y="138" class="text-bright">C5  Flask</text><text x="1070" y="138" class="text-green">50%</text>
    <text x="630" y="164" class="text-bright">C2  HTML/CSS</text><text x="812" y="164" class="text-green">70%</text>
    <text x="900" y="164" class="text-bright">C6  PostgreSQL</text><text x="1070" y="164" class="text-green">60%</text>
    <text x="630" y="190" class="text-bright">C3  SQL</text><text x="812" y="190" class="text-green">45%</text>
    <text x="900" y="190" class="text-bright">C7  Linux</text><text x="1070" y="190" class="text-green">70%</text>

    <!-- Bottom-Left Box: Memory / Stack Allocations -->
    <rect x="14" y="252" width="500" height="250" rx="5" class="panel" />
    <text x="25" y="265" class="text-sub">2 mem ── stack ───────── io</text>
    <text x="25" y="294" class="text-bright">Total: 16.0 GiB</text><text x="385" y="294" class="text-green">Used: 6.4 GiB</text>
    <text x="25" y="326" class="text-bright">Avail: 9.6 GiB</text><text x="385" y="326" class="text-green">60%</text>
    <rect x="25" y="343" width="455" height="13" class="bar-bg" /><rect x="25" y="343" width="273" height="13" fill="#e5d347" />
    <text x="25" y="378" class="text-bright">Cache: 4.2 GiB</text><text x="385" y="378" class="text-green">26%</text>
    <rect x="25" y="395" width="455" height="13" class="bar-bg" /><rect x="25" y="395" width="118" height="13" fill="#8edbd1" />
    <text x="25" y="450" class="text-bright">Free: 5.4 GiB</text><text x="385" y="450" class="text-green">16%</text>

    <!-- Bottom-Right Box: Process Tree -->
    <rect x="14" y="514" width="500" height="238" rx="5" class="panel" />
    <text x="25" y="528" class="text-purple">3 net ── sync ── auto ── zero ── &lt;b eth0 n&gt;</text>
    <path d="M26 678 L41 678 41 643 48 643 48 690 55 690 55 625 62 625 62 684 69 684 69 649 76 649 76 702 83 702 83 632 90 632 90 674 97 674 97 647 104 647 104 687 111 687 111 638 118 638 118 675 125 675 125 654 132 654 132 695 139 695 139 629 146 629 146 671 153 671 153 644 160 644 160 700 167 700 167 636 174 636 174 681 181 681 181 650 188 650 188 692 195 692 195 621 202 621 202 673 209 673 209 647 216 647 216 688 223 688 223 633 230 633 230 679 237 679 237 642 244 642 244 698 251 698 251 630 258 630 258 674 265 674 265 650 272 650 272 690 279 690 279 637 286 637 286 679 293 679 293 650 300 650 300 695 307 695 307 628 314 628 314 673 321 673 321 644 328 644 328 687 335 687 335 632 342 632 342 679 349 679 349 648 356 648 356 696 363 696 363 625 370 625 370 678 377 678 377 641 384 641 384 688 391 688 391 629 398 629 398 675 405 675 405 648 412 648 412 699 419 699 419 637 426 637 426 680 433 680 433 650 440 650 440 691 447 691 447 633 454 633 454 676 461 676 461 646 468 646 468 688 475 688 475 636 482 636 482 679" stroke="#c78fe0" stroke-width="3" fill="none" />
    <text x="328" y="572" class="text-muted">4Mb</text><text x="328" y="628" class="text-muted">2Mb</text><text x="328" y="688" class="text-muted">0b</text>

    <rect x="524" y="252" width="614" height="500" rx="5" class="panel" />
    <text x="538" y="265" class="text-yellow">4 proc ┬ filter ───────────────────── tree &lt; skills lazy &gt;</text>
    <text x="538" y="298" class="text-muted">PID   Skill           Category       Level      %     Mem</text>
    <text x="538" y="329" class="text-bright">1001  Python          Backend</text><rect x="890" y="321" width="108" height="13" class="bar-bg" /><rect x="890" y="321" width="92" height="13" fill="#a8d98e" /><text x="1014" y="329" class="text-green">85.0  512M</text>
    <text x="538" y="360" class="text-bright">1002  Django          Backend</text><rect x="890" y="352" width="108" height="13" class="bar-bg" /><rect x="890" y="352" width="70" height="13" fill="#a8d98e" /><text x="1014" y="360" class="text-green">65.0  384M</text>
    <text x="538" y="391" class="text-bright">1003  Flask           Backend</text><rect x="890" y="383" width="108" height="13" class="bar-bg" /><rect x="890" y="383" width="54" height="13" fill="#a8d98e" /><text x="1014" y="391" class="text-green">50.0  256M</text>
    <text x="538" y="422" class="text-yellow">1004  JavaScript      Frontend</text><rect x="890" y="414" width="108" height="13" class="bar-bg" /><rect x="890" y="414" width="65" height="13" fill="#f1ca4d" /><text x="1014" y="422" class="text-green">60.0  320M</text>
    <text x="538" y="453" class="text-yellow">1005  HTML/CSS        Frontend</text><rect x="890" y="445" width="108" height="13" class="bar-bg" /><rect x="890" y="445" width="76" height="13" fill="#f1ca4d" /><text x="1014" y="453" class="text-green">70.0  288M</text>
    <text x="538" y="484" class="text-purple">1006  SQL             Database</text><rect x="890" y="476" width="108" height="13" class="bar-bg" /><rect x="890" y="476" width="49" height="13" fill="#c78fe0" /><text x="1014" y="484" class="text-green">45.0  192M</text>
    <text x="538" y="515" class="text-purple">1007  PostgreSQL      Database</text><rect x="890" y="507" width="108" height="13" class="bar-bg" /><rect x="890" y="507" width="65" height="13" fill="#c78fe0" /><text x="1014" y="515" class="text-green">60.0  256M</text>
    <text x="538" y="546" class="text-blue">1008  C/C++           Systems</text><rect x="890" y="538" width="108" height="13" class="bar-bg" /><rect x="890" y="538" width="32" height="13" fill="#91b5ed" /><text x="1014" y="546" class="text-green">30.0  160M</text>
    <text x="538" y="577" class="text-blue">1009  Linux           Systems</text><rect x="890" y="569" width="108" height="13" class="bar-bg" /><rect x="890" y="569" width="76" height="13" fill="#91b5ed" /><text x="1014" y="577" class="text-green">70.0  288M</text>
    <text x="538" y="608" class="text-cyan">1010  Git             Tools</text><rect x="890" y="600" width="108" height="13" class="bar-bg" /><rect x="890" y="600" width="87" height="13" fill="#8edbd1" /><text x="1014" y="608" class="text-green">80.0  128M</text>
    <text x="538" y="639" class="text-cyan">1011  Docker          Tools</text><rect x="890" y="631" width="108" height="13" class="bar-bg" /><rect x="890" y="631" width="60" height="13" fill="#8edbd1" /><text x="1014" y="639" class="text-green">55.0  192M</text>
    <text x="538" y="700" class="text-muted">↑↓ select   + info   1 signals</text><text x="1050" y="700" class="text-bright">0/14</text>
  </svg>
  `;

  res.status(200).send(svg);
}
