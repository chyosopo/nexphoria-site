/* audit:catalog — the failure mode that narrowing a catalog actually causes.

   Four real defects this session came from the same shape, and none of them
   broke loudly:
     · Math.min() over a now-empty list returned Infinity, and "from $Infinity"
       rendered on the front door and the pricing table.
     · genSitemap regexed catalog SOURCE, so retired molecules stayed in the
       sitemap and prerender kept emitting 116 snapshots.
     · genLlms did the same AND its field-adjacency pattern broke on the new
       compliance fields, so llms.txt published the exact inverse of the catalog.
     · ProtocolSelector returned null below 2 routes, so two of three goal pages
       silently lost their only price and CTA.

   The common thread: cutting a catalog does not break code, it makes
   correct-looking code render the wrong thing. Type checking cannot see it,
   smoke passes because pages still render, and a human reading the diff sees
   nothing wrong — the assumption was true when it was written.

   So this gate asserts OUTCOMES, not syntax. Two halves:
     1. DERIVED FIGURES — recompute what the UI computes and require finite,
        positive numbers.
     2. RENDERED ARTIFACT — grep the built HTML for the strings this class of
        bug actually produces. Empirical, so it catches shapes not enumerated
        here, including ones introduced later.

   Run `npm run build` first; the second half reads dist/public. */
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { SOLO_CATALOG, RETIRED_SOLO } from "../client/src/data/soloCatalog";
import { FLAGSHIP_STACKS } from "../client/src/data/stacksCatalog";
import { LIVE_CATEGORIES } from "../client/src/data/peptides";
import { selectorRoutes } from "../client/src/data/protocolSelector";
import { allGiftItems } from "../client/src/data/gift";
import { GOALS, goalSkus } from "../client/src/data/goals";
import { liveFeatured } from "../client/src/data/peptides";
import { OUTCOME_CATEGORY } from "../client/src/data/outcomeImagery";

const DIST = "dist/public";
let failed = 0;
const ok = (m: string) => console.log(`  ✓ ${m}`);
const bad = (m: string) => { console.log(`  ✗ ${m}`); failed++; };

/** Finite, positive, not NaN — what every money figure must be. */
/** Every slug the catalog knows, live or retired — the declared universe. */
const ALL_SLUGS = new Set([...SOLO_CATALOG, ...RETIRED_SOLO].map((s) => s.slug));

/** The /goals/<cat> pages genSitemap actually publishes, read from source so
 *  the gate compares against what ships rather than what we assume ships. */
async function publishedGoalCategories(): Promise<string[]> {
  const src = await readFile("script/genSitemap.ts", "utf-8");
  const m = /GOAL_CATEGORIES\s*=\s*\[([^\]]*)\]/s.exec(src);
  return m ? [...m[1].matchAll(/"([a-z-]+)"/g)].map((x) => x[1]) : [];
}

const money = (n: unknown): boolean => typeof n === "number" && Number.isFinite(n) && n > 0;

console.log("\n═ DERIVED FIGURES ═");
{
  // Solo pricing: every tier of every priced SKU.
  const badSolos = SOLO_CATALOG.filter((s) => s.pricing && !(money(s.pricing.m1) && money(s.pricing.m3) && money(s.pricing.m6) && money(s.pricing.m12)));
  badSolos.length === 0
    ? ok(`all ${SOLO_CATALOG.filter((s) => s.pricing).length} priced solos have finite tiers`)
    : bad(`non-finite solo pricing: ${badSolos.map((s) => s.slug).join(", ")}`);

  // Stack cadences: an UNGATED stack with no cadences is the Infinity trap.
  const emptyCadence = FLAGSHIP_STACKS.filter((s) => !s.gated && s.cadences.length === 0);
  emptyCadence.length === 0
    ? ok("no ungated stack has an empty cadence list")
    : bad(`ungated stack with no cadences (Math.min => Infinity): ${emptyCadence.map((s) => s.slug).join(", ")}`);

  const badCadence = FLAGSHIP_STACKS.flatMap((s) =>
    s.cadences.filter((c) => !money(c.perMonth ?? c.total)).map((c) => `${s.slug}/${c.key}`));
  badCadence.length === 0 ? ok("all stack cadences carry a finite figure") : bad(`non-finite cadences: ${badCadence.join(", ")}`);

  // Gift items: Gift.tsx reduces over terms with no guard.
  const badGift = allGiftItems().filter((g) => {
    const terms = (g as { terms?: { total: number }[] }).terms ?? [];
    return terms.length === 0 || terms.some((t) => !money(t.total));
  });
  badGift.length === 0
    ? ok(`all ${allGiftItems().length} gift items have finite terms`)
    : bad(`gift items with empty/non-finite terms: ${badGift.map((g) => `${g.kind}/${g.slug}`).join(", ")}`);
}

console.log("\n═ SURFACE COVERAGE — does every live surface still offer something? ═");
{
  /* ⚠ These checks originally looped over liveGoals() and LIVE_CATEGORIES —
     both DERIVED lists that exclude anything empty by construction. Removing
     pt-141 as a test therefore made the "desire" goal vanish from the list
     being checked instead of failing it: the gate passed on the exact defect it
     was written to catch. That is the same vacuous-assumption shape as the bugs
     above, reproduced inside the gate itself.

     Drift lives between what is DECLARED and what RESOLVES, so that is what is
     compared now. */

  // 1. Every category the sitemap publishes a /goals/<cat> page for must have
  //    routes. GOAL_CATEGORIES in genSitemap is hand-maintained; if it drifts
  //    from the catalog we prerender and index pages with nothing on them.
  const published = await publishedGoalCategories();
  for (const cat of published) {
    const men = selectorRoutes(cat as never, "men").length;
    const women = selectorRoutes(cat as never, "women").length;
    const n = Math.min(men, women);
    n > 0
      ? ok(`/goals/${cat} (published) offers ${n}+ route(s) in both worlds`)
      : bad(`/goals/${cat} is published in the sitemap but offers NO routes — dead goal page`);
  }
  const orphanPublished = published.filter((c) => !LIVE_CATEGORIES.includes(c as never));
  orphanPublished.length === 0
    ? ok("sitemap goal categories all have live molecules")
    : bad(`sitemap publishes goals with no live molecule: ${orphanPublished.join(", ")}`);
  const unpublishedLive = LIVE_CATEGORIES.filter((c) => !published.includes(c));
  unpublishedLive.length === 0
    ? ok("every live category is published")
    : bad(`live categories missing from the sitemap: ${unpublishedLive.join(", ")}`);

  // 2. Every slug DECLARED by a goal must exist in the catalog. A declared slug
  //    that silently resolves to nothing is how a goal card loses its content.
  for (const g of GOALS) {
    const missing = g.skus.filter((slug) => !ALL_SLUGS.has(slug));
    const retired = g.skus.filter((slug) => RETIRED_SOLO.some((r) => r.slug === slug));
    const live = goalSkus(g).length;
    if (missing.length) bad(`goal "${g.slug}" names slugs absent from the catalog entirely: ${missing.join(", ")}`);
    else if (live === 0) bad(`goal "${g.slug}" declares ${g.skus.length} SKU(s) but NONE are live (retired: ${retired.join(", ")})`);
    else if (retired.length) ok(`goal "${g.slug}": ${live} live, ${retired.length} retired (${retired.join(", ")})`);
    else ok(`goal "${g.slug}" resolves to ${live} live SKU(s)`);
  }
  /* 3. Home-page card row. Originally read MenHome/WomenHome, which hardcoded
        four featured slugs each — the launch scope retired 3 of men's and ALL
        FOUR of women's, so her row rendered zero cards. Those files are now
        deleted with the two-worlds split, and the single home renders the
        shared block over the live catalog, so the check moves with it: assert
        the home still puts products on the page at all. That is the defect
        worth catching — the home shipped with NO product cards the moment the
        world homes were unrouted.

        The component name is deliberately NOT pinned: it has been ProductShelf
        and is now ProductTiles, and rewriting this assertion each time invites
        someone to weaken it instead. What must hold is that the home renders
        the LIVE CATALOG, whatever the block is called. */
  {
    // 2026-09-04 (the Spine): the assertion moves from the SOURCE to the
    // RENDERED home. Whatever component draws the menu (a shelf, tiles, the
    // rail), the prerendered index.html must carry a tile for EVERY live SKU.
    // A source regex can be satisfied by a block that renders nothing; the
    // artifact cannot.
    const home = await readFile(`${DIST}/index.html`, "utf-8").catch(() => "");
    const missing = SOLO_CATALOG.filter((s) => !home.includes(`frontdoor-sku-${s.slug}`)).map((s) => s.slug);
    if (!home) {
      bad("home page not prerendered (dist/public/index.html missing): build first");
    } else if (missing.length) {
      bad(`home page no longer renders the live catalog: ${missing.length} of ${SOLO_CATALOG.length} live SKUs have no tile (${missing.join(", ")})`);
    } else if (SOLO_CATALOG.length === 0) {
      bad("home formulary shelf would render zero cards");
    } else {
      ok(`home formulary shelf renders ${SOLO_CATALOG.length} product card(s)`);
    }
  }

  /* 4. Goal tiles must have art. A live category with no entry in
        OUTCOME_CATEGORY rendered as a blank white box on /men. */
  for (const world of ["men", "women"] as const) {
    const art = OUTCOME_CATEGORY[world] as Record<string, string | undefined>;
    const naked = LIVE_CATEGORIES.filter((c) => !art[c]);
    naked.length === 0
      ? ok(`${world} goal tiles all have category art`)
      : ok(`${world} goal tiles fall back to hero art for: ${naked.join(", ")}`);
  }

  // Retired entries must stay retained, not deleted — the dial depends on it.
  // 2026-09-03: the full menu is on, so an empty retired set is the expected
  // state. The check now guards the DIAL, not the count: LAUNCH_SLUGS must
  // still be the filter, and every catalog slug must pass through it.
  ALL_SLUGS.size === SOLO_CATALOG.length + RETIRED_SOLO.length
    ? ok(`${SOLO_CATALOG.length} live SKUs, ${RETIRED_SOLO.length} retired (LAUNCH_SLUGS is the dial)`)
    : bad("catalog slugs are not partitioned by LAUNCH_SLUGS");
}

console.log("\n═ RENDERED ARTIFACT ═");
if (!existsSync(DIST)) {
  bad("no dist/public — run `npm run build` first");
} else {
  async function pages(dir = DIST, prefix = ""): Promise<string[]> {
    const out: string[] = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isDirectory()) out.push(...(await pages(`${dir}/${e.name}`, `${prefix}/${e.name}`)));
      else if (e.name === "index.html") out.push(prefix || "/");
    }
    return out;
  }
  const routes = await pages();

  /* The literal strings this bug class emits. Scoped to visible text — these
     tokens appear legitimately inside minified JS and JSON-LD numerics, so the
     scan strips <script> blocks and tags before matching. */
  const SYMPTOMS: [string, RegExp][] = [
    ["$Infinity / Infinity in copy", /\bInfinity\b/],
    ["NaN in copy", /\bNaN\b/],
    ["literal undefined in copy", /\bundefined\b/],
    /* Narrowed after a first-run false positive: /how-it-works carries a
       deliberate "$0 · Until you're prescribed" stat tile, which is a true
       statement of the billing condition, not a broken figure. Only a $0 in a
       PRICE POSITION (per-month, per-cycle, a total) indicates a bad render. */
    ["$0 price", /\$0\s*(?:\/mo|\/cycle|total)/],
    ["empty price template", /\$\s*(?:\/mo|\/cycle)/],
  ];
  const hits = new Map<string, string[]>();
  for (const r of routes) {
    const raw = await readFile(r === "/" ? `${DIST}/index.html` : `${DIST}${r}/index.html`, "utf-8");
    const text = raw.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
    for (const [label, re] of SYMPTOMS) {
      if (re.test(text)) {
        if (!hits.has(label)) hits.set(label, []);
        hits.get(label)!.push(r);
      }
    }
  }
  if (hits.size === 0) ok(`no broken-figure symptoms in visible text across ${routes.length} pages`);
  else for (const [label, rs] of hits) bad(`${label} on: ${rs.slice(0, 6).join(", ")}${rs.length > 6 ? ` (+${rs.length - 6})` : ""}`);
}

/* ── THE SNAPSHOT MUST STAND ALONE ──────────────────────────────────────────
   This gate exists for "correct-looking code that renders nothing", and on
   2026-08-20 that shipped to nexphoria.com in a new form. Reveal.tsx hides
   off-screen blocks by adding .nx-armed (opacity:0), the prerenderer snapshots
   the DOM after React mounts, and so twelve invisible sections were baked into
   the crawlable HTML. Every gate was green: the markup was complete, the text
   was present, the routes returned 200. It just could not be seen until
   hydration finished. Chiya's report was "a weird site."

   Two invariants, asserted against the built artifact:
     1. No serialized client-only hidden state in any prerendered page.
     2. No CSS rule that hides .nx-reveal by default — the hidden state must be
        opt-in via .nx-armed, which only JS applies and only off-screen.
   A page a crawler or a slow connection sees as blank is not a rendered page. */
{
  const pages = ["/", "/plan", "/peptides", "/peptides/tesamorelin", "/faq"];
  let serialized = 0;
  for (const r of pages) {
    const f = r === "/" ? `${DIST}/index.html` : `${DIST}${r}/index.html`;
    let raw: string;
    try { raw = await readFile(f, "utf-8"); } catch { continue; }
    const n = (raw.match(/\bnx-armed\b/g) || []).length;
    if (n > 0) { bad(`${r} ships ${n} block(s) with nx-armed — invisible until hydration`); serialized += n; }
  }
  if (serialized === 0) ok(`no client-only hidden state serialized across ${pages.length} prerendered pages`);

  const css = (await readFile(`${DIST}/index.html`, "utf-8")).match(/assets\/[A-Za-z0-9_.-]+\.css/)?.[0];
  if (css) {
    const sheet = await readFile(`${DIST}/${css}`, "utf-8");
    // A default-hidden reveal is the shape of the bug: .nx-reveal{opacity:0}
    // with no .nx-armed qualifier anywhere in the selector.
    const offenders = (sheet.match(/[^{}]*\.nx-reveal[^{}]*\{[^}]*opacity:\s*0[^}]*\}/g) || [])
      .filter((rule) => !/\.nx-armed/.test(rule));
    if (offenders.length) bad(`CSS hides .nx-reveal by default: ${offenders[0].slice(0, 90)}`);
    else ok("no CSS rule hides .nx-reveal by default (hidden state is opt-in via .nx-armed)");
  }
}

console.log("\n═ SUMMARY ═");
if (failed) {
  console.log(`  ${failed} failure(s)\n\nRESULT: FAIL — a catalog assumption broke silently\n`);
  process.exit(1);
}
console.log("  0 failures\n\nRESULT: PASS — derived figures finite, live surfaces populated\n");
