/* ══ E31 — DESIGN LINT: the entropy counter ══
   The scale (D1–D4) is law. This prints how far the codebase is from it,
   per axis, with the worst files named. Numbers must only go down.
   Run: npm run audit:design */
import { readFileSync } from "fs";
import { globSync } from "glob";

const files = globSync("client/src/**/*.tsx");
const read = (f: string) => readFileSync(f, "utf8");

function count(rx: RegExp, label: string, allow?: RegExp) {
  const perFile: [string, number][] = [];
  const values = new Set<string>();
  for (const f of files) {
    const s = read(f);
    const hits = [...s.matchAll(rx)].filter((m) => !allow || !allow.test(m[0]));
    if (hits.length) perFile.push([f.replace("client/src/", ""), hits.length]);
    hits.forEach((m) => values.add(m[0]));
  }
  const total = perFile.reduce((a, [, n]) => a + n, 0);
  perFile.sort((a, b) => b[1] - a[1]);
  console.log(`\n${label}: ${values.size} distinct · ${total} occurrences`);
  perFile.slice(0, 5).forEach(([f, n]) => console.log(`   ${String(n).padStart(3)}  ${f}`));
  return values.size;
}

import { contrast } from "./lib-contrast";

/* ── GOAL ACCENT CONTRAST ──
   The goal accent family (added 2026-08-13) makes colour carry navigation:
   metabolic is always the same green, growth always the same amber. That only
   works if the text on each tint is readable, so every -ink/-tint pair is
   asserted at WCAG AA (4.5:1) on every build. A pale palette is exactly where
   this goes wrong quietly — a tint two steps too light still looks fine to the
   person who chose it. */
{
  const css = readFileSync("client/src/index.css", "utf8");
  const tok = (n: string) => css.match(new RegExp(`--nx-goal-${n}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
  const goals = [...new Set([...css.matchAll(/--nx-goal-([a-z-]+)-tint:/g)].map((m) => m[1]))];
  console.log("\n═══ GOAL ACCENT CONTRAST (WCAG AA = 4.5:1) ═══");
  let bad = 0;
  for (const g of goals) {
    const tint = tok(`${g}-tint`), ink = tok(`${g}-ink`), edge = tok(`${g}-edge`);
    if (!tint || !ink || !edge) { console.log(`   ✖ ${g}: incomplete triple (needs -tint, -edge, -ink)`); bad++; continue; }
    const r = contrast(ink, tint);
    const ok = r >= 4.5;
    if (!ok) bad++;
    console.log(`   ${ok ? "✓" : "✖"} ${g.padEnd(15)} ink on tint ${r.toFixed(2)}:1`);

    /* The SOLID register (Chiya chose colour blocks, 2026-08-13). Checked with
       the same threshold and for a sharper reason: on a pale tint, text that
       fails contrast usually LOOKS wrong too, so the eye catches it. On a
       saturated jewel ground, near-white body text looks completely correct at
       every glance while measuring around 3:1 — the failure is invisible
       precisely to the person choosing it. Both roles are required, so adding
       a goal without them fails the build rather than silently rendering
       transparent text on a coloured card. */
    const solid = tok(`${g}-solid`), on = tok(`${g}-on`), onsoft = tok(`${g}-onsoft`);
    if (!solid || !on || !onsoft) { console.log(`   ✖ ${g}: incomplete solid triple (needs -solid, -on, -onsoft)`); bad++; continue; }
    for (const [label, fg] of [["on", on], ["onsoft", onsoft]] as const) {
      const rs = contrast(fg, solid);
      const oks = rs >= 4.5;
      if (!oks) bad++;
      console.log(`   ${oks ? "✓" : "✖"} ${g.padEnd(15)} ${label.padEnd(6)} on solid ${rs.toFixed(2)}:1`);
    }
  }
  if (bad) {
    console.log(`\n✖ ${bad} goal accent pair(s) fail WCAG AA. A tile nobody can read is not a tile.\n`);
    process.exit(1);
  }
  console.log(`   ${goals.length} goal accents, all AA or better`);
}

console.log("═══ DESIGN ENTROPY (target: tokens only — var(--nx-*)) ═══");
const a = count(/fontSize: ?"?[\d.]+(px)?"?/g, "off-scale fontSize literals");
const b = count(/borderRadius: ?"?[\d.]+(px)?"?/g, "off-scale borderRadius literals", /var\(/);
const c = count(/boxShadow: ?"(?!var)[^"]{8,}"/g, "off-token boxShadow strings");
const d = count(/transition: ?"(?!var)[^"]*\d+m?s[^"]*"/g, "off-token transition strings");
const e = count(/const (F|S|FONT) = "/g, "local font redeclarations");
console.log(`\nCRUDE-GREP BASELINE (pre-system): fontSize 46 · radius 31 · shadow 16 · transition 34 · font-redecl 20\nLINT BASELINE (post D1–D6, these regexes): fontSize 74 · radius 31 · shadow 16 · transition 34 · font-redecl 0`);
console.log(`NOW: fontSize ${a} · radius ${b} · shadow ${c} · transition ${d} · font-redecl ${e}`);

/* ── TOKEN INTEGRITY — every var(--nx-*) referenced must be defined in index.css.
      (Caught live bugs: --nx-line/--nx-ink borders invisible, --nx-dur-2 transitions
      snapping. This gate makes that class of bug impossible to ship again.) ── */
import { execSync } from "child_process";
const RUNTIME_SET = new Set(["--nx-scroll-progress"]); // set via JS setProperty at runtime
const tokFiles = execSync("grep -rl 'var(--nx-' client/src --include='*.tsx' --include='*.css'", { encoding: "utf8" }).trim().split("\n");
const used = new Set<string>();
for (const f of tokFiles) for (const m of readFileSync(f, "utf8").matchAll(/var\((--nx-[a-z0-9-]+)/g)) used.add(m[1]);
const css = readFileSync("client/src/index.css", "utf8");
const defined = new Set([...css.matchAll(/(--nx-[a-z0-9-]+):/g)].map((m) => m[1]));
const undef = [...used].filter((t) => !defined.has(t) && !RUNTIME_SET.has(t)).sort();
if (undef.length) {
  console.log(`\n✗ UNDEFINED TOKENS IN USE (${undef.length}): ${undef.join(", ")}`);
  process.exit(1);
}
console.log(`\n✓ token integrity: all ${used.size} referenced --nx-* tokens are defined (or runtime-set)`);
