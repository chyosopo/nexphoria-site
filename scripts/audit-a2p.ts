/* ═══ audit:a2p — A2P 10DLC / SMS compliance, against the RENDERED site ═══

   Chiya applied for A2P 10DLC registration and a Twilio number (2026-08-13).
   Campaign review reads the PUBLIC WEBSITE, so this gate reads the built
   artifact rather than the source: a required clause that exists in a .tsx
   file but never reaches the rendered HTML is not a clause a reviewer can
   find, and that is exactly the failure mode a source grep would miss.

   Run after `npm run build`. Every check below maps to a documented rejection
   cause, and each failure prints WHY it fails an application, not just that a
   string is absent — a gate you cannot act on is a gate people disable.

   Deliberately NOT checked here: the campaign registration itself (brand,
   use case, sample messages) is filed with the carrier, not published, so no
   site-side gate can verify it. The punch list carries that.  */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { A2P_REQUIRED_STRINGS } from "../client/src/data/messaging";
import { BUSINESS, isPlaceholder } from "../client/src/data/compliance";

const DIST = "dist/public";
const failures: string[] = [];
const notes: string[] = [];

if (!existsSync(DIST)) {
  console.error(`\n✖ ${DIST} not found — run \`npm run build\` first.\n`);
  process.exit(1);
}

/* Read PRERENDERED HTML PER ROUTE, not the whole bundle.

   The first version of this gate globbed every .html and .js file into one
   haystack — and then PASSED a falsification test in which the clause had been
   deleted from the Privacy page. It passed because data/messaging.ts, which
   DEFINES the clause as a constant, is itself bundled: the string was present
   in the artifact whether or not any page rendered it. That is the same shape
   as the bug audit:catalog exists to catch — code that looks correct while
   rendering nothing — so the gate must assert what a REVIEWER SEES at a URL.

   A route with no prerendered index.html is itself a finding: a campaign
   reviewer or crawler fetching it gets an empty SPA shell. */
function htmlFor(route: string): string | null {
  const p = join(DIST, route.replace(/^\//, ""), "index.html");
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

/* Compare on a normalised form: prerendered HTML carries entities and wrapping
   tags, so raw substring equality gives false negatives. */
const norm = (s: string) =>
  s.replace(/<[^>]+>/g, " ")
   .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
   .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&apos;/g, "'")
   .replace(/['’]/g, "'").replace(/\s+/g, " ").trim();

const ROUTE_TEXT = new Map<string, string>();
function textAt(route: string): string {
  if (!ROUTE_TEXT.has(route)) {
    const h = htmlFor(route);
    if (h === null) failures.push(`${route} has no prerendered index.html — a reviewer or crawler fetching it sees an empty shell.`);
    ROUTE_TEXT.set(route, h === null ? "" : norm(h));
  }
  return ROUTE_TEXT.get(route)!;
}

console.log("═══ A2P 10DLC — SITE-SIDE REQUIREMENTS ═══\n");

console.log("─ required disclosures present in the rendered artifact ─");
for (const { label, needle, where } of A2P_REQUIRED_STRINGS) {
  const ok = textAt(where).includes(norm(needle));
  console.log(`  ${ok ? "✓" : "✖"} ${label.padEnd(28)} (${where})`);
  if (!ok) failures.push(`Missing "${label}" — carriers check ${where} for this. Rejection cause.`);
}

/* The opt-in has to be VISIBLE and UNCHECKED. Reviewers screenshot it. */
console.log("\n─ opt-in mechanism ─");
/* The intake's gates render behind several steps, so the opt-in is asserted
   on the SOURCE for /assessment and on the rendered HTML everywhere it is
   statically reachable. Both, because either alone has a blind spot. */
const consentSrc = readFileSync("client/src/components/ConsentGates.tsx", "utf8");
const contactHtml = textAt("/contact");
const optInChecks: [string, boolean, string][] = [
  ["intake renders an SMS gate", /id="sms"|consent-sms|set\("sms"\)/.test(consentSrc), "no SMS gate on the intake"],
  ["SMS gate is never required", !/requiredConsents[\s\S]{0,400}?"sms"/.test(consentSrc), "messaging consent must not gate submission"],
  ["contact form renders an opt-in", contactHtml.length > 0 && readFileSync("client/src/pages/Contact.tsx", "utf8").includes("contact-sms"), "no SMS opt-in beside the contact phone field"],
  ["contact page states the consent", contactHtml.includes(norm("not a condition of purchase")), "consent wording missing from the rendered contact page"],
  ["messaging terms linked from the footer", textAt("/legal/privacy").length > 0 && htmlFor("/legal/privacy")!.includes("/legal/messaging"), "/legal/messaging not linked from a shipped page"],
];
for (const [label, ok, why] of optInChecks) {
  console.log(`  ${ok ? "✓" : "✖"} ${label}`);
  if (!ok) failures.push(`${label} — ${why}.`);
}

/* A pre-checked consent box is an automatic rejection AND a TCPA problem. */
console.log("\n─ dark-pattern check ─");
const preChecked = [...ROUTE_TEXT.keys()]
  .map((r) => htmlFor(r) ?? "")
  .some((h) => /type="checkbox"[^>]*\bchecked\b/.test(h));
console.log(`  ${preChecked ? "✖" : "✓"} no pre-checked consent box in prerendered HTML`);
if (preChecked) failures.push("A consent checkbox ships pre-checked. Express written consent must be affirmative.");

/* Brand verification cross-checks the legal entity on the site against the
   name on the registration. A mismatch fails the brand, not just the campaign. */
console.log("\n─ brand identity ─");
const entityOk = textAt("/legal/messaging").includes(norm(BUSINESS.entity));
console.log(`  ${entityOk ? "✓" : "✖"} legal entity "${BUSINESS.entity}" appears on the site`);
if (!entityOk) failures.push(`Legal entity "${BUSINESS.entity}" not found. Brand verification compares this to the registration.`);

const LEGAL_ROUTES = ["/legal/terms", "/legal/privacy", "/legal/messaging", "/legal/refund-policy", "/legal/telehealth-consent"];
const stale = ["Nexphoria, Inc.", "Nexphoria Inc."].filter((n) => LEGAL_ROUTES.some((r) => textAt(r).includes(norm(n))));
console.log(`  ${stale.length ? "✖" : "✓"} no conflicting entity name`);
if (stale.length) failures.push(`Site also claims "${stale.join('", "')}" — two entities on one site fails verification.`);

/* Address and phone are required on the registration. They are Chiya-blocked
   here, so they are reported as BLOCKERS rather than failures: the gate should
   tell the truth about what is missing without pretending the site can fix it. */
/* A placeholder that reaches the PUBLISHED site is worse than a missing line:
   a reviewer reading "[PHONE — PENDING]" on a policy page fails the
   application outright. LegalLayout was doing exactly this, because its
   `BUSINESS.address &&` truthiness test is true for the bracketed string.
   Asserted against rendered HTML so the render, not the intent, is checked. */
console.log("\n─ no placeholders published ─");
const PLACEHOLDER_IN_HTML = /\[[^\]]*(PENDING|PLACEHOLDER|TODO)[^\]]*\]/i;
const leaky = LEGAL_ROUTES.filter((r) => PLACEHOLDER_IN_HTML.test(textAt(r)));
console.log(`  ${leaky.length ? "✖" : "✓"} legal pages publish no bracketed placeholders`);
if (leaky.length) failures.push(`Placeholder text is PUBLISHED on ${leaky.join(", ")}. Reviewers read these pages.`);

console.log("\n─ business facts required by the registration ─");
for (const [k, v] of [["address", BUSINESS.address], ["phone", BUSINESS.phone]] as const) {
  const pending = isPlaceholder(v);
  console.log(`  ${pending ? "…" : "✓"} business ${k}${pending ? "  — PENDING from Chiya" : ""}`);
  if (pending) notes.push(`BUSINESS.${k} is still a placeholder. A2P registration requires a real value.`);
}

console.log("\n═ SUMMARY ═");
console.log(`  site-side failures : ${failures.length}`);
console.log(`  blocked on Chiya   : ${notes.length}`);
for (const f of failures) console.log(`   ✖ ${f}`);
for (const n of notes) console.log(`   … ${n}`);

if (failures.length) {
  console.log("\nRESULT: FAIL — the site would be rejected on the items above.\n");
  process.exit(1);
}
console.log("\nRESULT: PASS — every site-side A2P requirement holds; remainder is registration-side.\n");
