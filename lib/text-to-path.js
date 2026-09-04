import * as fontkit from 'fontkit';

export const FILLS = {
  green: '#a8d98e',
  bright: '#d7e7d5',
  cyan: '#8edbd1',
  yellow: '#f1ca4d',
  muted: '#759078',
};

const GLYPH_CACHE = new Map();

function glyphPath(font, codePoint) {
  if (!GLYPH_CACHE.has(codePoint)) {
    const glyph = font.glyphForCodePoint(codePoint);
    GLYPH_CACHE.set(codePoint, {
      d: glyph.path.toSVG(),
      advance: glyph.advanceWidth / font.unitsPerEm,
    });
  }
  return GLYPH_CACHE.get(codePoint);
}

export function textToPath(svg, { font, size, baselineRatio = 0.36 }) {
  const re = /<text\b([^>]*)>((?:(?!<\/text>).)*)<\/text>/g;
  return svg.replace(re, (match, attributes, content) => {
    const x = Number((/x="(-?[\d.]+)"/.exec(attributes) || [])[1] || 0);
    const y = Number((/y="(-?[\d.]+)"/.exec(attributes) || [])[1] || 0);
    const klass = (/class="([^"]*)"/.exec(attributes) || [])[1] || 'bright';
    const fill = FILLS[klass] || FILLS.bright;
    const baseline = y + size * baselineRatio;
    const scale = size / font.unitsPerEm;
    let cursor = x;
    const paths = [];
    for (const character of String(content)) {
      const { d, advance } = glyphPath(font, character.codePointAt(0));
      if (d && d !== '') {
        paths.push(`<path d="${d}" transform="translate(${cursor} ${baseline}) scale(${scale})" fill="${fill}"/>`);
      }
      cursor += advance * size;
    }
    return paths.join('');
  });
}