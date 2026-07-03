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

console.log("═══ DESIGN ENTROPY (target: tokens only — var(--nx-*)) ═══");
const a = count(/fontSize: ?"?[\d.]+(px)?"?/g, "off-scale fontSize literals");
const b = count(/borderRadius: ?"?[\d.]+(px)?"?/g, "off-scale borderRadius literals", /var\(/);
const c = count(/boxShadow: ?"(?!var)[^"]{8,}"/g, "off-token boxShadow strings");
const d = count(/transition: ?"(?!var)[^"]*\d+m?s[^"]*"/g, "off-token transition strings");
const e = count(/const (F|S|FONT) = "/g, "local font redeclarations");
console.log(`\nCRUDE-GREP BASELINE (pre-system): fontSize 46 · radius 31 · shadow 16 · transition 34 · font-redecl 20\nLINT BASELINE (post D1–D6, these regexes): fontSize 74 · radius 31 · shadow 16 · transition 34 · font-redecl 0`);
console.log(`NOW: fontSize ${a} · radius ${b} · shadow ${c} · transition ${d} · font-redecl ${e}`);
