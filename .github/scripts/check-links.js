#!/usr/bin/env node
// Fails the build if any page references a file that is not in the repo.
// Guards against the classic static-site regression: a renamed asset or page
// that still has links pointing at the old name.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

if (!pages.length) {
  console.error('no .html pages found at repo root');
  process.exit(1);
}
if (!pages.includes('index.html')) {
  console.error('index.html is missing — Pages needs it as the entry point');
  process.exit(1);
}

const problems = [];
let checked = 0;

for (const page of pages) {
  const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const refs = new Set();
  for (const m of src.matchAll(/(?:src|href)="([^"#]+)"/g)) refs.add(m[1]);
  for (const m of src.matchAll(/url\((?:'|")?([^)'"]+)/g)) refs.add(m[1]);

  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|\/\/|#)/.test(ref)) continue;
    checked++;
    const rel = decodeURIComponent(ref.replace(/^\.\//, ''));
    if (!fs.existsSync(path.join(ROOT, rel))) problems.push(`${page} -> ${ref}`);
  }
}

console.log(`${pages.length} pages, ${checked} local references checked`);

if (problems.length) {
  console.error(`\n${problems.length} broken reference(s):`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log('all references resolve');
