(function (root) {
  'use strict';
  // CSS absolute lengths (W3C CSS Values 3): 1in = 96px = 72pt = 6pc = 2.54cm; 1pt = 4/3 px; 1cm = 96/2.54 px.
  var PX = { px: 1, pt: 96 / 72, pc: 16, in: 96, cm: 96 / 2.54, mm: 96 / 25.4 };
  var RATIOS = { 'Minor second (1.067)': 1.067, 'Major second (1.125)': 1.125, 'Minor third (1.2)': 1.2, 'Major third (1.25)': 1.25, 'Perfect fourth (1.333)': 4 / 3, 'Augmented fourth (1.414)': Math.SQRT2, 'Perfect fifth (1.5)': 1.5, 'Golden ratio (1.618)': (1 + Math.sqrt(5)) / 2 };
  function r2(v) { return Math.round(v * 100) / 100; }
  // Convert a length. Relative units (rem, em) need the root or parent font size in px.
  function convert(value, from, to, basePx) {
    var base = basePx || 16, px;
    if (from === 'rem' || from === 'em') px = value * base; else if (PX[from] != null) px = value * PX[from]; else return NaN;
    if (to === 'rem' || to === 'em') return px / base; if (PX[to] != null) return px / PX[to]; return NaN;
  }
  // Modular scale: size = base * ratio^step
  function scale(basePx, ratio, lo, hi) {
    var out = []; for (var s = lo; s <= hi; s++) { var px = basePx * Math.pow(ratio, s); out.push({ step: s, px: px, rem: px / basePx, pt: px / PX.pt }); } return out;
  }
  function fmt(v) { var s = r2(v).toFixed(2); return s.replace(/\.?0+$/, ''); }
  // CSS custom properties for the scale, rem based
  function css(basePx, ratio, lo, hi) {
    var names = { '-2': 'xs2', '-1': 'xs', '0': 'base', '1': 'lg', '2': 'xl', '3': 'xl2', '4': 'xl3', '5': 'xl4', '6': 'xl5' };
    return scale(basePx, ratio, lo, hi).map(function (r) { return '  --text-' + (names[r.step] || 's' + r.step) + ': ' + fmt(r.rem * 1000 / 1000) + 'rem;'; }).join('\n');
  }
  var api = { PX: PX, RATIOS: RATIOS, convert: convert, scale: scale, css: css, fmt: fmt, r2: r2 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.TS = api;
})(typeof window !== 'undefined' ? window : this);
