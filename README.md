# TypeScale

A modular font-size scale and CSS length converter.

size = base x ratio^step. Absolute units follow W3C CSS Values 3: 1in = 96px = 72pt = 6pc = 2.54cm (https://www.w3.org/TR/css-values-3/#absolute-lengths), so 12pt = 16px. rem and em use the chosen base size.
Tests: 43 checks. Spec relations (in, pt, pc, cm, mm to px), the major third scale from 16px (12.8, 16, 20, 25, 31.25, 39.06, 48.83), and golden ratio steps.
Deviation: ratios are exact (perfect fourth = 4/3), so 16px step 2 is 28.44; tools that use 1.333 show 28.43.

Static client-side. `node test-engine.js` runs the tests.
