/* ═══ audit:voice — house voice, against the RENDERED site ═══

   CLAUDE.md law 3: institutional bank voice, and NEVER defensive negation.
   "Transparent pricing. No hidden fees" was killed sitewide (Chiya
   2026-07-14) because a premium house does not deny trickery — assurance is
   stated as completeness. The law was written down and then drifted anyway:
   by 2026-08-13 the site carried more than a dozen "not a checkout flow / not
   an algorithm / not a gray-market supplier / not a testimonial" constructions,
   and Chiya read the result back to us — "the copy is very defensive... We're
   not selling. We're not doing this. We're doing that. It's just
   straightforward."

   A law nobody can check is a preference. This gate makes it checkable.

   Reads the PRERENDERED HTML per route, same as audit:a2p and for the same
   reason: a phrase that exists in a .tsx file the router never reaches is not
   copy anyone reads, and a phrase that reaches the page from a shared
   component IS copy even though it lives nowhere near the page. Only the
   rendered artifact answers "what does the visitor actually see".

   EXEMPTIONS are literal strings, listed with the reason each one earns.
   Nothing is exempted by pattern or by wildcard — an exemption you can widen
   is an exemption that swallows the rule.  */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist/public";

if (!existsSync(DIST)) {
  console.error(`\n✖ ${DIST} not found — run \`npm run build\` first.\n`);
  process.exit(1);
}

/* The marketing surface. /legal/* is deliberately absent: policy pages state
   limits of liability and scope of practice, and those are written in the
   negative because the law requires them to be. */
const ROUTES = [
  "/", "/about", "/how-it-works", "/peptides-101", "/peptides", "/stacks",
  "/goals/metabolic", "/goals/growth", "/goals/sexual-health",
  "/faq", "/physicians", "/contact", "/assessment",
  "/peptides/tesamorelin", "/peptides/semaglutide",
  "/peptides/tirzepatide", "/peptides/pt-141",
];

/* Defensive constructions, each with the positive move that replaces it.
   The message is half the gate: a failure that only says "matched /not a/"
   gets the phrase reworded into a synonym instead of rewritten. */
const PATTERNS: { re: RegExp; why: string }[] = [
  { re: /\bnot an? (?!candidate|patient record|pharmacy or a medical practice)[a-z-]+/gi,
    why: "defines us by what we are not. State the thing we ARE." },
  { re: /\bnever (?:a|an|by) [a-z-]+/gi,
    why: "denial. Assurance is stated as completeness, not as a promise to abstain." },
  { re: /\bwe (?:do not|don't|will not|won't|never)\b/gi,
    why: "a house does not defend itself against an accusation nobody made." },
  { re: /\bno hidden\b/gi,
    why: "the phrase Chiya killed sitewide on 2026-07-14. Say what the figure covers." },
  { re: /\bnothing is (?:skipped|hidden|withheld)\b/gi,
    why: "negation of an absence. Say what is on the record." },
  { re: /\b(?:for free|it's free|totally free|no fee|no charge to you)\b/gi,
    why: "house words are 'complimentary' and 'included'." },
  { re: /\bunlike (?:other|most|typical)\b/gi,
    why: "comparison against unnamed competitors reads as defensiveness, and LegitScript reads it as a claim." },
];

/* Literal exemptions. Each is quoted exactly as it renders, and each is here
   because removing the negation would change a clinical or legal meaning —
   never because the sentence was hard to rewrite. */
const EXEMPT: { text: string; reason: string }[] = [
  { text: "not a candidate",
    reason: "a clinical determination a physician records, quoted verbatim. Rewriting it would misstate the outcome." },
  { text: "not a patient record",
    reason: "safety disclaimer on illustrative lab UI. Required so a mock dashboard is never read as real data." },
  { text: "not a pharmacy or a medical practice",
    reason: "regulatory scope-of-entity statement. LegitScript and state boards require the distinction stated plainly." },
  { text: "not intended to diagnose",
    reason: "FDA disclaimer language. Fixed wording." },
  { text: "not a condition of purchase",
    reason: "A2P 10DLC required consent language (data/messaging.ts). Carriers check for this exact construction; rewording it fails campaign review. Asserted verbatim by audit:a2p." },
  { text: "not an fda-approved drug",
    reason: "FDA compounded-drug wording (DESIGN-PACKAGE §6.6): a compounded preparation is never itself an approved drug, and the distinction must be stated plainly beside any brand comparison." },
  { text: "no charge",
    reason: "states that a declined intake costs nothing — a patient-protective fact, not a price boast." },
];

const norm = (s: string) =>
  s.replace(/<script[\s\S]*?<\/script>/gi, " ")
   .replace(/<style[\s\S]*?<\/style>/gi, " ")
   .replace(/<[^>]+>/g, " ")
   .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
   .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&apos;/g, "'")
   .replace(/&nbsp;/g, " ").replace(/&mdash;/g, "—")
   .replace(/['’]/g, "'").replace(/\s+/g, " ").trim();

function textAt(route: string): string | null {
  const p = join(DIST, route.replace(/^\//, ""), "index.html");
  return existsSync(p) ? norm(readFileSync(p, "utf8")) : null;
}

function isExempt(hit: string, context: string): boolean {
  return EXEMPT.some(
    (e) => hit.toLowerCase().includes(e.text) || context.toLowerCase().includes(e.text),
  );
}

console.log("═══ HOUSE VOICE — DEFENSIVE NEGATION (CLAUDE.md law 3) ═══\n");

type Finding = { route: string; hit: string; context: string; why: string };
const findings: Finding[] = [];
const missing: string[] = [];
/* Deduped across routes: shared components (nav, footer, disclosure blocks)
   render the same sentence on every page, and printing it fourteen times
   would bury the ten real ones. */
const seen = new Set<string>();

for (const route of ROUTES) {
  const text = textAt(route);
  if (text === null) { missing.push(route); continue; }

  for (const { re, why } of PATTERNS) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const context = text.slice(Math.max(0, m.index - 70), m.index + m[0].length + 70);
      /* Exemption is tested against the match plus a SHORT tail, not the full
         context window. An exempt phrase only has to complete the match
         ("not a condition" → "not a condition of purchase"); widening the
         window to the printed context would let one exempt string forgive
         every violation within 70 characters of it. */
      if (isExempt(m[0], text.slice(m.index, m.index + m[0].length + 32))) continue;
      const key = m[0].toLowerCase() + "|" + context.slice(0, 40);
      if (seen.has(key)) continue;
      seen.add(key);
      findings.push({ route, hit: m[0], context, why });
    }
  }
}

if (missing.length) {
  console.log("─ routes with no prerendered HTML (not scanned) ─");
  for (const r of missing) console.log(`  ⚠ ${r}`);
  console.log("");
}

if (findings.length === 0) {
  console.log("  ✓ no defensive negation found across " +
    `${ROUTES.length - missing.length} rendered marketing routes`);
} else {
  for (const f of findings) {
    console.log(`  ✖ ${f.route}  “${f.hit}”`);
    console.log(`      …${f.context}…`);
    console.log(`      ${f.why}\n`);
  }
}

console.log(`\n  scanned : ${ROUTES.length - missing.length} routes`);
console.log(`  exempt  : ${EXEMPT.length} documented strings`);
console.log(`  findings: ${findings.length}`);

if (findings.length > 0) {
  console.log("\nRESULT: FAIL — defensive negation in rendered copy (CLAUDE.md law 3)\n");
  process.exit(1);
}
console.log("\nRESULT: PASS — the copy states what we are\n");
