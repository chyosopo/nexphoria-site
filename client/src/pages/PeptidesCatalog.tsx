/* JOB: browse by goal, reach a PDP in one click; nothing else. */
/* ═══ PEPTIDES CATALOG — the twenty-two, to docs/COPY-DECK-PLAIN.md ═══ */
import { useRef, useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { SOLO_CATALOG, SOLO_CATEGORIES, type SoloCategory } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { OUTCOME_CATEGORY } from "@/data/outcomeImagery";
import { getPrice } from "@/data/pricing";
import { ProductCard } from "@/components/ProductCard";
import { VialMockup, labelSpec } from "@/components/VialMockup";
import { SkuPhoto, skuPhotoFor } from "@/components/SkuPhoto";


/* Category key → the name the reader sees (the deck's category vocabulary,
   the same words as the goal tiles). Keys stay as they are in soloCatalog;
   only the display changes here. "Skin & Longevity" holds both the skin
   medicines and the energy and healthy ageing ones, so it shows as the
   first of those two names and its group line names both. */
const CAT_LABEL: Record<SoloCategory, string> = {
  Growth: "Body composition",
  Cognitive: "Focus and mood",
  Recovery: "Recovery",
  "Skin & Longevity": "Skin, energy and ageing",
  Metabolic: "Weight loss",
  Sleep: "Sleep",
  "Sexual Health": "Sexual health",
  Hormone: "Hormones",
};
/* One plain phrase per group, shown as the group heading. */
const CAT_LINE: Record<SoloCategory, string> = {
  Growth: "Body composition: your own growth hormone, lean mass and fat.",
  Cognitive: "Focus and mood: focus by day and a steadier mood under stress.",
  Recovery: "Recovery: injury and recovery from training.",
  "Skin & Longevity": "Skin, energy and ageing: skin firmness, cellular energy and healthy ageing.",
  Metabolic: "Weight loss: appetite and weight.",
  Sleep: "Sleep: deep sleep.",
  "Sexual Health": "Sexual health: desire, closeness and erectile function.",
  Hormone: "Hormones: low testosterone.",
};
const labelFor = (c: string) => (c === "All" ? "All" : CAT_LABEL[c as SoloCategory] ?? c);

export default function PeptidesCatalog({ world }: { world?: "men" | "women" }) {
  const base = world ? `/${world}` : "";
  const [filter, setFilter] = useState<string>("All");
  const [q, setQ] = useState("");
  // Roving tabindex for the category filter toolbar (same idiom as Journal's
  // filter row): exactly one chip is Tab-reachable; Arrow/Home/End move focus
  // only (focus-follows, no auto-activation — a filter must not swap the grid
  // on mere traversal); Enter/Space/click still activate. Seeded to "All" (0).
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusIdx, setFocusIdx] = useState(0);
  useSeo({
    // World-aware path + title/description so /peptides, /men/peptides, and
    // /women/peptides each carry their own canonical/og:url and aren't three
    // homepage-canonical duplicates (the old omitted-path bug).
    path: `${base}/peptides`,
    title: world === "women"
      ? "Prescription peptides for women | Nexphoria"
      : world === "men"
      ? "Prescription peptides for men | Nexphoria"
      : "Prescription peptides, by what they treat | Nexphoria",
    description: "Prescription peptides organised by what they treat, each with what it is for, how it works, how you take it, and what it costs. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy.",
    jsonLd: [
      // World-aware path so the WebPage node's url matches this page's own
      // canonical/og:url + breadcrumb + itemList (all `${base}/peptides`) on
      // /men/peptides and /women/peptides — not a neutral /peptides that
      // contradicts its siblings on the worlded routes.
      webPageJsonLd({ name: "Peptides", description: "Solo peptide catalog.", path: `${base}/peptides` }),
      breadcrumbJsonLd(
        world
          ? [{ name: "Home", path: "/" }, { name: world === "men" ? "Men" : "Women", path: `/${world}` }, { name: "Peptides", path: `/${world}/peptides` }]
          : [{ name: "Home", path: "/" }, { name: "Peptides", path: "/peptides" }],
      ),
      // ItemList of every catalog entry — real names/paths only, no prices/ratings here.
      itemListJsonLd({
        name: "Nexphoria peptide catalog",
        description: "Prescription peptides in the Nexphoria catalog.",
        items: SOLO_CATALOG.map((s) => ({ name: s.name, path: `${base}/peptides/${s.slug}` })),
      }),
    ],
  });

  const cats = ["All", ...SOLO_CATEGORIES];
  const needle = q.trim().toLowerCase();
  const shown = SOLO_CATALOG.filter(
    (s) =>
      (filter === "All" || s.category === filter) &&
      (!needle ||
        s.name.toLowerCase().includes(needle) ||
        s.category.toLowerCase().includes(needle) ||
        labelFor(s.category).toLowerCase().includes(needle) ||
        s.outcome.toLowerCase().includes(needle) ||
        s.mechanism.toLowerCase().includes(needle)),
  );

  const onFilterKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const n = cats.length;
    let next = focusIdx;
    switch (e.key) {
      case "ArrowRight":
        next = (focusIdx + 1) % n;
        break;
      case "ArrowLeft":
        next = (focusIdx - 1 + n) % n;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = n - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setFocusIdx(next);
    chipRefs.current[next]?.focus();
  };

  // sr-only announcement mirrors the visible count so AT users hear the new
  // filtered result set on every filter/search change (the plural word and
  // count match exactly what the grid shows).
  const noun = shown.length === 1 ? "peptide" : "peptides";
  const resultStatus = needle
    ? `Showing ${shown.length} ${noun} matching “${q.trim()}”${filter !== "All" ? ` in ${labelFor(filter)}` : ""}.`
    : filter === "All"
    ? `Showing all ${shown.length} ${noun}.`
    : `Showing ${shown.length} ${noun} in ${labelFor(filter)}.`;

  return (
    /* Carry the visitor's world into the chrome — otherwise a woman on
       /women/peptides gets the generic nav whose "Peptides" link points to
       /peptides → redirects to /men/peptides, silently ejecting her from
       her world. Worlded catalog keeps her in it. */
    <SiteLayout navVariant={world ?? "showcase"} footerVariant={world ?? "shared"}>
      <section className="nx-hero-r3 relative" style={{ overflow: "hidden" }} aria-labelledby="peptides-hero-title">
        <div className="nx-container relative" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <div className="nx-hero-split nx-hero-seq">
            <div className="nx-sec-head">
              <p className="nx-eyebrow">The medicines</p>
              <h1 id="peptides-hero-title" className="nx-dsh1" style={{ maxWidth: "16ch" }}>
                Every medicine, by what it treats.
              </h1>
              <p className="nx-lede" style={{ maxWidth: "50ch" }}>
                Choose by your goal. Each one shows what it treats, how it works, how you take it, and what it costs. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy.
              </p>
            </div>
            {/* THE FORMULARY, RENDERED — replaces vial-lineup-hero.webp.

                That photograph was shot under the previous palette: its caps
                are NAVY, which is off-sheet under Graphite & Ice, and it shows
                five vials on a shelf that stocks four. Regenerating it was not
                available (no image credits), and a photo cannot stay in sync
                with the catalog anyway — a cut or an addition silently makes
                it a lie. Drawn from SOLO_CATALOG instead: it repaints with the
                palette, always shows exactly what is on the shelf, and each
                vial carries its own molecule. */}
            <div className="nx-hero-media nx-hero-frame nx-hero-bleed nx-vial-lineup" style={{ position: "relative", aspectRatio: "5 / 4" }}>
              <div className="nx-vial-lineup__row">
                {SOLO_CATALOG.filter((s) => skuPhotoFor(s.slug)).slice(0, 6).map((s) => (
                  <div key={s.slug} className="nx-vial-cell">
                    <SkuPhoto slug={s.slug} name={s.name} eager className="nx-sku-img nx-sku-img--lineup" fallback={<VialMockup name={s.name} dose={labelSpec(s.spec)} size="clamp(150px, 78%, 340px)" fill={0.6} onDark label={false} />} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nx-container" style={{ paddingBottom: "1rem" }} aria-label="Search and filter the catalog">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a peptide by name, goal, or mechanism"
          aria-label="Search the catalog"
          className="nx-input"
          data-testid="catalog-search"
          style={{ maxWidth: 420, marginBottom: 14 }}
        />
        <div
          role="toolbar"
          aria-orientation="horizontal"
          aria-label="Filter the catalog by category"
          onKeyDown={onFilterKeyDown}
          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {cats.map((c, i) => {
            const n = c === "All" ? SOLO_CATALOG.length : SOLO_CATALOG.filter((s) => s.category === c).length;
            const active = filter === c;
            return (
              <button
                key={c}
                ref={(el) => { chipRefs.current[i] = el; }}
                onClick={() => { setFilter(c); setFocusIdx(i); }}
                aria-pressed={active}
                aria-controls="catalog-results"
                tabIndex={i === focusIdx ? 0 : -1}
                data-testid={`filter-${c.toLowerCase()}`}
                className="nx-filter-chip focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nx-cobalt)] focus-visible:ring-offset-2"
                style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}
              >
                {labelFor(c)}
                <span style={{ opacity: 0.65, marginLeft: 6, fontWeight: 500 }}>{n}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="catalog-results" className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-sec)" }} aria-label="Peptide catalog">
        {/* Screen-reader-only live region: announces the new filtered count on
            every filter/search change without the whole grid being re-read. The
            visible count below is a styled label, not the live region (avoids a
            doubled announcement). */}
        <p className="sr-only" aria-live="polite" aria-atomic="true" data-testid="catalog-sr-status">
          {resultStatus}
        </p>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.9rem" }}>
          {shown.length} {shown.length === 1 ? "peptide" : "peptides"}{filter !== "All" ? ` · ${labelFor(filter)}` : ""}
        </p>
        {shown.length === 0 && (
          <div className="nx-glass-tile" style={{ display: "block", textAlign: "center", padding: "3rem 1.5rem" }} data-testid="filter-empty">
            <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>{needle ? `No matches for “${q.trim()}”.` : `No matches in ${labelFor(filter)}.`}</p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", marginTop: "0.5rem" }}>Clear the search, or choose another category.</p>
            <button onClick={() => { setFilter("All"); setQ(""); }} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nx-cobalt)] focus-visible:ring-offset-2" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", background: "none", border: "none", cursor: "pointer", marginTop: "1rem", textDecoration: "underline" }}>
              Clear filters
            </button>
          </div>
        )}
        {/* Goals before chemistry (ROADMAP 3.2): the default view groups the
            shelf by goal with the OUTCOME as each card's title; the compound
            name is the identifying second line. Filter/search flattens. */}
        {(() => {
          /* "Show the PRODUCT, not a mood" (Chiya 2026-07-13: "we're a
             pharmacy, not a marketing site") is now literal — ProductCard
             draws the vial itself, so this closure no longer picks a photo.
             The per-SKU frame and the category fallback pool it used to
             resolve were left computed-and-unused by that change. */
          const card = (s: (typeof shown)[number], nth: number, i: number) => {
            return (
            <Reveal key={s.slug} delay={i * 35}>
              {/* Same block the home formulary renders — one card grammar,
                  not a second implementation of it. The price line lives in
                  ProductCard so a shelf card can never disagree with the PDP
                  it links to. */}
              <ProductCard sku={s} index={i} />
            </Reveal>
            );
          };
          const grouped = filter === "All" && !needle;
          if (!grouped) {
            return (
              <div className="nx-float-grid">
                {shown.map((s, i) => card(s, shown.slice(0, i).filter((p) => p.category === s.category).length, i))}
              </div>
            );
          }
          // Her page should open on her strongest affinity (Skin & Longevity),
          // not Growth — which on her home is last. Men keep the default order.
          const WOMEN_SHELF_ORDER = ["Skin & Longevity", "Metabolic", "Recovery", "Sleep", "Cognitive", "Sexual Health", "Growth"];
          const orderedCats = world === "women"
            ? [...SOLO_CATEGORIES].sort((a, b) => {
                const ia = WOMEN_SHELF_ORDER.indexOf(a); const ib = WOMEN_SHELF_ORDER.indexOf(b);
                return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
              })
            : SOLO_CATEGORIES;
          return orderedCats.map((cat) => {
            const items = shown.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: "clamp(2.4rem,4.5vw,3.6rem)" }}>
                <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginBottom: "1.1rem", paddingBottom: "0.7rem", borderBottom: "1px solid var(--nx-border)", display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                  {CAT_LINE[cat] ?? labelFor(cat)}
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginLeft: "auto" }}>
                    {items.length} {items.length === 1 ? "peptide" : "peptides"}
                  </span>
                </h2>
                <div className="nx-float-grid">
                  {items.map((s, i) => card(s, i, i))}
                </div>
              </div>
            );
          });
        })()}
      </section>

      {/* the closer: the next step is a physician */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "var(--nx-sp-band) 0" }} aria-labelledby="peptides-assess-title">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <h2 id="peptides-assess-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: "0.8rem auto 0", lineHeight: 1.12 }}>
            The next step is a physician.
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "52ch", margin: "1rem auto 0" }}>
            A few health questions, read by a licensed U.S. physician, who prescribes the medicine that fits or explains why not.
          </p>
          <Link href="/how-it-works" className="nx-cta-ceramic" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)", marginTop: "1.6rem" }} data-testid="catalog-assess-cta">
            How it works
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
