// Data validation pass — reads TS data files and flags missing/empty required fields.
// Run: node qa_shots/data_audit.mjs from repo root.
// Because TS import is complex, we regex the exported arrays.

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const report = [];

function warn(msg) { report.push(`- WARN  ${msg}`); }
function fail(msg) { report.push(`- FAIL  ${msg}`); }
function ok(msg)   { report.push(`- OK    ${msg}`); }

// ── Peptides ─────────────────────────────────────────────────────
const peptidesSrc = fs.readFileSync('client/src/data/peptides.ts', 'utf8');
const peptideBlocks = peptidesSrc.match(/\{\s*slug:\s*"[^"]+"[^}]*(?:\{[^}]*\}[^}]*)*\}/gs) || [];
// Rough count: use slug lines
const peptideSlugs = [...peptidesSrc.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map(m => m[1]);
report.push(`## Peptides (${peptideSlugs.length} entries)`);
const required = ['name', 'fullName', 'tagline', 'summary', 'mechanism', 'halfLife', 'typicalDose', 'cycleLength', 'administration'];
for (const slug of peptideSlugs) {
  // Extract the peptide's block by finding slug then to the next slug or end
  const startIdx = peptidesSrc.indexOf(`slug: "${slug}"`);
  const nextIdx = peptidesSrc.indexOf('slug: "', startIdx + 1);
  const block = peptidesSrc.slice(startIdx, nextIdx === -1 ? undefined : nextIdx);
  for (const field of required) {
    const re = new RegExp(`\\b${field}:\\s*"([^"]*)"`, 'm');
    const m = block.match(re);
    if (!m) {
      // Some fields might be template literals — try backtick
      const reTpl = new RegExp(`\\b${field}:\\s*\`([\\s\\S]*?)\``, 'm');
      const mt = block.match(reTpl);
      if (!mt) warn(`peptide "${slug}" is missing field "${field}"`);
      else if (!mt[1].trim()) fail(`peptide "${slug}" has empty "${field}"`);
    } else if (!m[1].trim()) {
      fail(`peptide "${slug}" has empty "${field}"`);
    }
  }
  // Timeline
  if (!/timeline:\s*\[/.test(block)) warn(`peptide "${slug}" has no timeline`);
  // Studies
  if (!/studies:\s*\[/.test(block)) warn(`peptide "${slug}" has no studies`);
  else {
    const studiesBlock = block.match(/studies:\s*\[([\s\S]*?)\]/);
    if (studiesBlock && studiesBlock[1].trim() === '') warn(`peptide "${slug}" has empty studies array`);
  }
  // Contraindications recommended
  if (!/contraindications:/.test(block)) warn(`peptide "${slug}" missing contraindications`);
}
ok(`Checked ${peptideSlugs.length} peptides`);

// ── Stacks (protocols in lib/protocols.ts) ────────────────────────
const protoSrc = fs.readFileSync('client/src/lib/protocols.ts', 'utf8');
const stackSlugs = [...protoSrc.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map(m => m[1]);
report.push(`\n## Stacks/Protocols (${stackSlugs.length} entries)`);
const stackRequired = ['name', 'subhead'];
for (const slug of stackSlugs) {
  const startIdx = protoSrc.indexOf(`slug: "${slug}"`);
  const nextIdx = protoSrc.indexOf('slug: "', startIdx + 1);
  const block = protoSrc.slice(startIdx, nextIdx === -1 ? undefined : nextIdx);
  for (const field of stackRequired) {
    const re = new RegExp(`\\b${field}:\\s*"([^"]*)"`, 'm');
    const m = block.match(re);
    if (!m) warn(`stack "${slug}" missing field "${field}"`);
    else if (!m[1].trim()) fail(`stack "${slug}" empty "${field}"`);
  }
  if (!/price:/.test(block)) warn(`stack "${slug}" has no price field`);
}
ok(`Checked ${stackSlugs.length} stacks`);

// ── Pricing ──────────────────────────────────────────────────────
const priceSrc = fs.readFileSync('client/src/data/pricing.ts', 'utf8');
const priceLines = priceSrc.split('\n').length;
report.push(`\n## Pricing`);
if (!/subscription|price|monthly|weekly/i.test(priceSrc)) fail('pricing.ts appears to have no price data');
else ok(`pricing.ts ${priceLines} lines`);

// ── Journal ──────────────────────────────────────────────────────
const journalSrc = fs.readFileSync('client/src/data/journal.ts', 'utf8');
const journalSlugs = [...journalSrc.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map(m => m[1]);
report.push(`\n## Journal (${journalSlugs.length} articles)`);
for (const slug of journalSlugs) {
  const startIdx = journalSrc.indexOf(`slug: "${slug}"`);
  const nextIdx = journalSrc.indexOf('slug: "', startIdx + 1);
  const block = journalSrc.slice(startIdx, nextIdx === -1 ? undefined : nextIdx);
  if (!/dek:/.test(block)) warn(`journal "${slug}" missing dek`);
  if (!/body:/.test(block)) warn(`journal "${slug}" missing body`);
}
ok(`Checked ${journalSlugs.length} journal articles`);

// ── Physicians ───────────────────────────────────────────────────
const drSrc = fs.readFileSync('client/src/data/physicians.ts', 'utf8');
const drNames = [...drSrc.matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);
report.push(`\n## Physicians (${drNames.length} entries)`);
for (const name of drNames) {
  const startIdx = drSrc.indexOf(`name: "${name}"`);
  const nextIdx = drSrc.indexOf('name: "', startIdx + 1);
  const block = drSrc.slice(startIdx, nextIdx === -1 ? undefined : nextIdx);
  if (!/credentials:|title:/.test(block)) warn(`physician "${name}" missing credentials/title`);
  if (!/bio:/.test(block) && !/summary:/.test(block)) warn(`physician "${name}" missing bio/summary`);
}
ok(`Checked ${drNames.length} physicians`);

// ── Report ────────────────────────────────────────────────────────
const outFile = 'qa_shots/data_audit_2026-07-02.md';
const failCount = report.filter(r => r.startsWith('- FAIL')).length;
const warnCount = report.filter(r => r.startsWith('- WARN')).length;
const header = `# Data Audit — 2026-07-02\n\n**${failCount} FAIL, ${warnCount} WARN**\n\n`;
fs.writeFileSync(outFile, header + report.join('\n') + '\n');
console.log(`Wrote ${outFile}`);
console.log(`FAIL=${failCount} WARN=${warnCount}`);
