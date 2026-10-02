var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// W3C CSS Values 3 absolute lengths: 1in = 96px = 2.54cm; 1pt = 1/72 in; 1pc = 1/6 in; 1cm = 96px/2.54; 1px = 1/96 in
eq(E.convert(1, 'in', 'px'), 96, 'in'); eq(E.convert(72, 'pt', 'in'), 1, '72pt'); eq(E.convert(1, 'pc', 'in'), 1 / 6, 'pc'); eq(E.convert(1, 'pc', 'px'), 16, 'pc px');
eq(E.convert(2.54, 'cm', 'px'), 96, 'cm'); eq(E.convert(1, 'cm', 'px'), 96 / 2.54, '1cm'); eq(E.convert(96, 'px', 'in'), 1, '96px'); eq(E.convert(25.4, 'mm', 'in'), 1, 'mm');
eq(E.convert(12, 'pt', 'px'), 16, '12pt = 16px'); eq(E.convert(16, 'px', 'pt'), 12, '16px = 12pt'); eq(E.convert(1, 'pt', 'px'), 4 / 3, '1pt');
// relative units use the base size
eq(E.convert(1.5, 'rem', 'px', 16), 24, '1.5rem'); eq(E.convert(20, 'px', 'rem', 16), 1.25, '20px'); eq(E.convert(1.5, 'rem', 'px', 10), 15, 'base 10'); eq(E.convert(24, 'px', 'em', 12), 2, 'em');
is(isNaN(E.convert(1, 'vh', 'px')), true, 'unknown unit'); eq(E.convert(5, 'cm', 'mm'), 50, 'cm to mm', 1e-9);
// round trip
eq(E.convert(E.convert(37.5, 'pt', 'mm'), 'mm', 'pt'), 37.5, 'round trip', 1e-9);
// Major third (1.25) from 16px, the widely used type-scale.com values: 12.8, 16, 20, 25, 31.25, 39.06, 48.83
var s = E.scale(16, 1.25, -1, 5), want = [12.8, 16, 20, 25, 31.25, 39.06, 48.83];
s.forEach(function (r, i) { eq(E.r2(r.px), want[i], 'major third step ' + r.step, 1e-9); });
is(s.length, 7, '7 steps'); eq(s[1].rem, 1, 'base rem'); eq(s[2].rem, 1.25, 'step1 rem'); eq(s[1].pt, 12, 'base pt');
// Perfect fourth: 16, 21.33, 28.43, 37.9; golden ratio 16 -> 25.89 -> 41.89
var p = E.scale(16, 4 / 3, 0, 3); eq(E.r2(p[1].px), 21.33, 'P4 1'); eq(E.r2(p[2].px), 28.44, 'P4 2'); eq(E.r2(p[3].px), 37.93, 'P4 3');
var g = E.scale(16, E.RATIOS['Golden ratio (1.618)'], 0, 2); eq(E.r2(g[1].px), 25.89, 'golden 1'); eq(E.r2(g[2].px), 41.89, 'golden 2');
// ratio ladders: every step multiplies by the ratio
var q = E.scale(18, 1.5, 0, 4); eq(q[4].px / q[3].px, 1.5, 'ratio step'); eq(q[0].px, 18, 'base');
// formatting and css
is(E.fmt(1.25), '1.25', 'fmt'); is(E.fmt(1), '1', 'fmt1'); is(E.fmt(1.5), '1.5', 'fmt1.5'); is(E.fmt(2.4414), '2.44', 'fmt3');
var c = E.css(16, 1.25, -1, 2); is(c.split('\n').length, 4, 'css lines'); is(c.indexOf('--text-base: 1rem;') > -1, true, 'css base'); is(c.indexOf('--text-lg: 1.25rem;') > -1, true, 'css lg');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
