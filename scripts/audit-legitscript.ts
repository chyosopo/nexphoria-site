/* audit:legitscript — the readiness checklist as a runnable gate.

   docs/LEGITSCRIPT-CHECKLIST.md was a document someone had to re-read and
   re-verify by hand, which is how its "114/115 sitemap URLs verified" line
   went stale the moment the catalog changed. Every requirement that can be
   machine-checked is checked here instead, and — per the Phase 2 brief —
   against the RENDERED HTML in dist/public, never the source. Source can
   satisfy a requirement that the built page then fails to show.

   Requirements needing something only Chiya or Bask can supply (business
   address, policy templates, DNS, portal URL) are reported as BLOCKED, not
   failed: they are real gaps but not regressions, and burying them in a red
   gate would train everyone to ignore it. Only regressions fail the build.

   Run `npm run build` first — this reads the artifact. */
import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { BUSINESS, PROVIDER_INFO, PHARMACY_INFO, compliancePlaceholders } from "../client/src/data/compliance";

const DIST = "dist/public";
let failed = 0;
const blocked: string[] = [];

const ok = (m: string) => console.log(`  ✓ ${m}`);
const bad = (m: string) => { console.log(`  ✗ ${m}`); failed++; };
const block = (m: string) => { console.log(`  ⏳ ${m}`); blocked.push(m); };

async function html(route: string): Promise<string> {
  const p = route === "/" ? `${DIST}/index.html` : `${DIST}${route}/index.html`;
  return existsSync(p) ? readFile(p, "utf-8") : "";
}

/** Every prerendered route in the artifact. */
async function allRoutes(dir = DIST, prefix = ""): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) out.push(...(await allRoutes(`${dir}/${e.name}`, `${prefix}/${e.name}`)));
    else if (e.name === "index.html") out.push(prefix || "/");
  }
  return out;
}

if (!existsSync(DIST)) {
  console.error("audit:legitscript — no dist/public. Run `npm run build` first.");
  process.exit(1);
}

const routes = await allRoutes();
console.log(`\n═ LEGITSCRIPT READINESS — verified against ${routes.length} rendered pages ═`);

/* ── §1 General site requirements ───────────────────────────── */
console.log("\n§1 · General");
{
  // Dead internal links: every same-origin href must resolve to a real route.
  const known = new Set(routes);
  const dead = new Map<string, string[]>();
  for (const r of routes) {
    const body = await html(r);
    const hrefs = [...body.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/$/, "") || "/");
    for (const h of hrefs) {
      if (/\.(xml|txt|png|webp|svg|ico|json|pdf|jpg)$/i.test(h)) continue;
      if (known.has(h)) continue;
      if (existsSync(`${DIST}${h}`)) continue;              // static asset dir
      if (!dead.has(h)) dead.set(h, []);
      dead.get(h)!.push(r);
    }
  }
  if (dead.size === 0) ok(`no dead internal links across ${routes.length} pages`);
  else for (const [h, from] of [...dead].slice(0, 12)) bad(`dead link ${h} (on ${from.slice(0, 3).join(", ")})`);

  const nav = await html("/");
  if (/href="\/assessment"/.test(nav)) block("patient-portal link still points at /assessment — needs Bask portal URL");
}

/* ── §2 Required policies ───────────────────────────────────── */
console.log("\n§2 · Policies");
{
  const REQUIRED = ["terms", "privacy", "refund-policy", "telehealth-consent", "hipaa-notice"];
  const home = await html("/");
  for (const p of REQUIRED) {
    const exists = routes.includes(`/legal/${p}`);
    const linked = home.includes(`/legal/${p}`);
    if (exists && linked) ok(`/legal/${p} exists and is footer-linked`);
    else if (exists) bad(`/legal/${p} exists but is NOT linked from the footer`);
    else bad(`/legal/${p} is missing`);
  }

  // The business-contact block must render on EVERY legal page, not just exist.
  const missing = [];
  for (const p of routes.filter((r) => r.startsWith("/legal/"))) {
    const b = await html(p);
    if (!b.includes("legal-business-contact") || !b.includes(BUSINESS.entity)) missing.push(p);
  }
  if (missing.length === 0) ok("business-contact block renders on every legal page");
  else bad(`business-contact block missing on: ${missing.join(", ")}`);

  const pending = compliancePlaceholders();
  if (pending.length) block(`${pending.join(", ")} still placeholder — LegitScript verifies the business address`);
  else ok("business address + phone are real values");
}

/* ── §3 Provider + pharmacy ─────────────────────────────────── */
console.log("\n§3 · Provider + pharmacy");
{
  const faq = await html("/faq");
  faq.includes(PROVIDER_INFO.name) ? ok(`provider (${PROVIDER_INFO.name}) named on /faq`) : bad("provider not named on /faq");
  faq.includes(PHARMACY_INFO.name) ? ok(`pharmacy (${PHARMACY_INFO.name}) named on /faq`) : bad("pharmacy not named on /faq");
  faq.includes(PROVIDER_INFO.email) ? ok("provider compliance email present") : bad("provider compliance email missing");
  faq.includes(PHARMACY_INFO.phone) ? ok("pharmacy phone present") : bad("pharmacy phone missing");

  // The superseded entity must not survive anywhere user-facing.
  const stale: string[] = [];
  for (const r of routes) if ((await html(r)).includes("MDI Providers")) stale.push(r);
  stale.length === 0 ? ok("no stale 'MDI Providers' references") : bad(`stale provider entity on: ${stale.slice(0, 5).join(", ")}`);
}

/* ── §4 Compliance language ─────────────────────────────────── */
console.log("\n§4 · Compliance language");
{
  const RUO = /for research (purposes )?only|research[- ]grade peptides|not for human consumption/i;
  const EQUIV = /(same as|equivalent to|generic version of)\s+(ozempic|wegovy|mounjaro|zepbound|vyleesi|egrifta)/i;
  // An affirmative approval claim about what WE dispense. The safe pattern is
  // "the branded drug is approved; the compounded preparation is not".
  const APPROVED_CLAIM = /our (compounded )?(peptides|medications|preparations)[^.]{0,40}are FDA[- ]approved/i;

  /* One route may contain RUO wording, by documented decision (checklist
     addendum §"RUO language"): this article QUOTES gray-market vial labels in
     order to repudiate them — "The label is not a wink. It is the legal posture
     of a chemical supplier" — and tells readers not to self-administer. That is
     pro-compliance educational content and the strongest on-site evidence of
     our posture; removing it would weaken the case, not strengthen it.

     Exempted by explicit slug rather than by sniffing the body for words like
     "repudiate": a content heuristic would silently excuse a genuine violation
     that happened to use the same vocabulary. An allowlist is auditable — if it
     grows, that is visible in review. Flag to Mason if he wants it renamed. */
  const RUO_EXEMPT = new Set(["/journal/legal-landscape-compounded-peptides-2026"]);

  for (const [label, re] of [["RUO language", RUO], ["brand-equivalence", EQUIV], ["FDA-approval claim", APPROVED_CLAIM]] as const) {
    const hits: string[] = [];
    for (const r of routes) {
      if (label === "RUO language" && RUO_EXEMPT.has(r)) continue;
      if (re.test(await html(r))) hits.push(r);
    }
    if (hits.length === 0) {
      ok(`no ${label}${label === "RUO language" && RUO_EXEMPT.size ? ` (${RUO_EXEMPT.size} documented exemption)` : ""}`);
    } else bad(`${label} on: ${hits.slice(0, 5).join(", ")}`);
  }

  // The required non-approval disclosure must actually appear on product pages.
  const pdps = routes.filter((r) => /^\/peptides\/[a-z0-9-]+$/.test(r));
  const undisclosed: string[] = [];
  for (const r of pdps) {
    const b = await html(r);
    if (!/not FDA[- ]approved/i.test(b)) undisclosed.push(r);
  }
  if (!pdps.length) bad("no product pages found in the artifact");
  else if (undisclosed.length === 0) ok(`all ${pdps.length} product pages carry the non-approval disclosure`);
  else bad(`missing non-approval disclosure: ${undisclosed.join(", ")}`);

  // 503A phrasing should be present somewhere user-facing.
  const has503 = (await html("/")).includes("503A") || (await html("/science")).includes("503A");
  has503 ? ok("503A compounding language present") : bad("503A compounding language absent");
}

/* ── §5–6 Vendor / dashboard ────────────────────────────────── */
console.log("\n§5–6 · Bask / vendor (not site-side)");
block("Bask dashboard: General + Domains sections");
block("DNS A records for portal. / intake. (values from Bask)");
block("Stripe connection inside Bask");
block("GA4 / GTM IDs (VITE_GA4_ID lights the analytics scaffold)");
block("GLP-1 questionnaire links from Bask");

/* ── Summary ────────────────────────────────────────────────── */
console.log(`\n═ SUMMARY ═`);
console.log(`  site-side failures : ${failed}`);
console.log(`  blocked on Chiya/Bask: ${blocked.length}`);
if (failed) {
  console.log("\nRESULT: FAIL — a site-side LegitScript requirement regressed\n");
  process.exit(1);
}
console.log("\nRESULT: PASS — every site-side requirement holds; remainder is vendor-blocked\n");
