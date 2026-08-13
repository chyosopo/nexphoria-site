/* ═══ SITEMAP GENERATOR ═══
   Regenerates client/public/sitemap.xml from the real data every build, so
   it can never drift again (it was hand-maintained and had silently dropped
   all 10 journal articles and all 8 goal pages). We read the data files as
   TEXT and extract slugs by anchored regex — importing the modules directly
   is impossible because journal.ts imports .webp assets Node can't load. */
import { readFile, writeFile } from "node:fs/promises";

const BASE = "https://nexphoria.com";

/** Pull the string after `slug: "` from a data source file. */
/* Reads the launch-scope Set literal (LAUNCH_SLUGS / LAUNCH_STACK_SLUGS) out of
   a catalog source. Returns null when the file declares no such set, so
   catalogs without a scope filter (journal) keep their previous behaviour. */
async function launchScopeFrom(src: string, name: string): Promise<Set<string> | null> {
  const m = new RegExp(`${name}\\s*=\\s*new Set\\(\\[([^\\]]*)\\]`, "s").exec(src);
  if (!m) return null;
  return new Set([...m[1].matchAll(/"([a-z0-9-]+)"/g)].map((x) => x[1]));
}

/* Slugs a catalog actually PUBLISHES.

   This regexed every `slug:` in the source and returned them all, which was
   correct only while the catalogs listed exactly what was for sale. Under
   retire-don't-delete the retired entries are still in the file on purpose, so
   the raw scan re-advertised every one of them: the sitemap listed
   /peptides/bpc-157 and /stacks/wolverine, and prerender.ts — which shares
   collectRoutes() — kept emitting 116 snapshots as if nothing had been cut.
   Both point search engines and reviewers at molecules we do not sell.

   So the scan is now intersected with the file's own launch-scope Set. Reading
   it from source rather than importing keeps this script free of the "@/" alias
   resolution the rest of the file deliberately avoids. */
async function slugsFrom(path: string, scopeName?: string): Promise<string[]> {
  const src = await readFile(path, "utf-8");
  const out: string[] = [];
  const re = /\bslug:\s*"([a-z0-9-]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) out.push(m[1]);
  const all = [...new Set(out)];
  if (!scopeName) return all;
  const scope = await launchScopeFrom(src, scopeName);
  return scope ? all.filter((s) => scope.has(s)) : all;
}

/* Goal categories that still have a sellable molecule behind them.

   The full PeptideCategory union is eight; under the launch scope only three
   are answerable — metabolic (semaglutide, tirzepatide), growth (tesamorelin)
   and sexual-health (PT-141). Listing the other five put /goals/recovery,
   /goals/skin, /goals/cognition, /goals/sleep and /goals/longevity in the
   sitemap and prerendered them, i.e. asked search engines to index pages that
   answer a goal we cannot currently serve.

   Kept as an explicit list rather than derived: deriving means mapping
   SoloCategory -> PeptideCategory, and that mapping already lives in SoloPDP;
   duplicating it here would be a second source of truth for the same fact.
   Update this alongside LAUNCH_SLUGS — audit:data's census is the check. */
const GOAL_CATEGORIES = ["growth", "metabolic", "sexual-health"];

/* journal.ts also declares JournalCategory slugs (foundations, protocols, …)
   with the same `slug:` shape as articles. These are NOT article routes —
   /journal/foundations would 404 — so exclude them. */
const JOURNAL_CATEGORY_SLUGS = new Set([
  "foundations", "protocols", "research", "metabolic",
  "longevity", "performance", "hormones", "safety",
]);

/* Static routes that always exist (App.tsx). Alias/redirect and
   checkout/cart/gate routes are intentionally excluded from the sitemap. */
const STATIC_ROUTES = [
  "/", "/men", "/women",
  "/about", "/science", "/physicians", "/pricing", "/bloodwork",
  "/how-it-works", "/faq", "/contact", "/community", "/booking", "/assessment",
  "/what-happens-next",
  "/protocols", "/stacks", "/stacks/build", "/peptides", "/gift",
  "/men/peptides", "/women/peptides", "/journal",
  "/legal", "/legal/hipaa-notice", "/legal/prescribing-policy",
  "/legal/privacy", "/legal/refund-policy", "/legal/state-availability",
  "/legal/telehealth-consent", "/legal/terms", "/legal/messaging",
];

/**
 * The ordered, deduplicated list of every real, indexable route — composed
 * from the canonical catalogs, the 8 goal categories, and the static route
 * list. This is the SINGLE SOURCE OF TRUTH consumed by BOTH generateSitemap
 * (below) and script/prerender.ts, so the sitemap and the prerendered HTML
 * snapshots can never drift apart. Alias/redirect and cart/checkout/gate
 * routes are intentionally excluded (they are not in STATIC_ROUTES).
 */
export async function collectRoutes(): Promise<string[]> {
  const root = process.cwd();
  const solos = await slugsFrom(`${root}/client/src/data/soloCatalog.ts`, "LAUNCH_SLUGS");
  const stacks = await slugsFrom(`${root}/client/src/data/stacksCatalog.ts`, "LAUNCH_STACK_SLUGS");
  const articles = (await slugsFrom(`${root}/client/src/data/journal.ts`))
    .filter((s) => !JOURNAL_CATEGORY_SLUGS.has(s));

  const paths = new Set<string>(STATIC_ROUTES);

  // goal decision pages
  GOAL_CATEGORIES.forEach((c) => paths.add(`/goals/${c}`));

  // every solo peptide, unworlded + both worlds (all three are real routes)
  solos.forEach((s) => {
    paths.add(`/peptides/${s}`);
    paths.add(`/men/peptides/${s}`);
    paths.add(`/women/peptides/${s}`);
  });

  // flagship protocols ('build' is already a static route)
  stacks.filter((s) => s !== "build").forEach((s) => paths.add(`/stacks/${s}`));

  // journal articles
  articles.forEach((a) => paths.add(`/journal/${a}`));

  return [...paths].sort();
}

/**
 * The canonical-only route list for the sitemap. Starts from collectRoutes()
 * (the full route universe that prerender snapshots) and drops the
 * world-scoped per-slug PDPs `/men/peptides/<slug>` and `/women/peptides/<slug>`
 * because BOTH emit `<link rel="canonical" href=".../peptides/<slug>">` — they
 * canonicalize to the neutral `/peptides/<slug>`. Listing non-canonical URLs in
 * a sitemap dilutes crawl budget and triggers Search Console's "Duplicate,
 * submitted URL not selected as canonical". Those routes are STILL real, linked,
 * live pages — collectRoutes() keeps them so prerender still snapshots all three
 * worlds; only the sitemap omits the canonicalized-away variants.
 *
 * The `/men/peptides` and `/women/peptides` LISTING pages are their own canonical
 * routes (they do NOT canonicalize away), so the predicate is anchored to match
 * ONLY per-slug PDPs (`^/(men|women)/peptides/<slug>$`) and leaves listings,
 * `/goals/*`, and every other route untouched.
 */
export async function sitemapRoutes(): Promise<string[]> {
  const WORLD_PDP = /^\/(?:men|women)\/peptides\/[^/]+$/;
  return (await collectRoutes()).filter((p) => !WORLD_PDP.test(p));
}

export async function generateSitemap(): Promise<number> {
  const root = process.cwd();
  const ordered = await sitemapRoutes();
  const body = ordered
    .map((p) => `  <url><loc>${BASE}${p}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- GENERATED by script/genSitemap.ts at build time — do not edit by hand.
     Composed from data/soloCatalog, data/stacksCatalog, data/journal, the
     8 goal categories, and the static route list. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
  await writeFile(`${root}/client/public/sitemap.xml`, xml, "utf-8");
  return ordered.length;
}

// Allow standalone invocation: `tsx script/genSitemap.ts`
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap()
    .then((n) => console.log(`sitemap.xml written — ${n} URLs`))
    .catch((e) => { console.error(e); process.exit(1); });
}
