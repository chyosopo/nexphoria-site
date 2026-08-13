/* JOB: browse by goal, reach a PDP in one click; nothing else. */
/* ═══ PEPTIDES CATALOG — P5 wave 2 · the 19-solo shelf ═══ */
import { useRef, useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { SOLO_CATALOG, SOLO_CATEGORIES } from "@/data/soloCatalog";
import { feelingFor, type PeptideCategory } from "@/data/peptides";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { usd } from "@/data/stacksCatalog";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { OUTCOME_CATEGORY } from "@/data/outcomeImagery";
import { getPrice } from "@/data/pricing";
import { ProductCard } from "@/components/ProductCard";
import { VialHero } from "@/components/VialHero";


/* Markers every protocol on this shelf is monitored against — reinforces the
   lab-monitored law (TRUE: bloodwork every 90 days). Echoes the Science page. */
/* Lab chips lead with the markers each world actually cares about — her panel
   shouldn't open on "Total testosterone" (all are on the same 99-marker panel). */
const CATALOG_BIOMARKERS_MEN = ["IGF-1", "HbA1c", "Fasting insulin", "hs-CRP", "Total testosterone", "Lipid panel"];
const CATALOG_BIOMARKERS_WOMEN = ["Estradiol", "Free T3 / T4", "Ferritin", "HbA1c", "hs-CRP", "Vitamin D"];

/* Shelf name → goal key, so the feeling line can be cast per world
   (feelingFor applies the women's register on her catalog). */
const SHELF_CAT: Record<string, PeptideCategory> = {
  Growth: "growth",
  Cognitive: "cognition",
  Recovery: "recovery",
  "Skin & Longevity": "skin",
  Metabolic: "metabolic",
  Sleep: "sleep",
  "Sexual Health": "sexual-health",
};

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
      ? "Peptides for Women — The Full Catalog | Nexphoria"
      : world === "men"
      ? "Peptides for Men — The Full Catalog | Nexphoria"
      : "Peptides — The Full Catalog | Nexphoria",
    description: `${SOLO_CATALOG.length} physician-prescribed peptides${world === "women" ? " for women" : world === "men" ? " for men" : ""}, each with dosing, mechanism, timeline, and required bloodwork stated plainly.`,
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
        description: "Physician-prescribed peptides in the Nexphoria formulary.",
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
    ? `Showing ${shown.length} ${noun} matching “${q.trim()}”${filter !== "All" ? ` in ${filter}` : ""}.`
    : filter === "All"
    ? `Showing all ${shown.length} ${noun}.`
    : `Showing ${shown.length} ${noun} in ${filter}.`;

  return (
    /* Carry the visitor's world into the chrome — otherwise a woman on
       /women/peptides gets the generic nav whose "Peptides" link points to
       /peptides → redirects to /men/peptides, silently ejecting her from
       her world. Worlded catalog keeps her in it. */
    <SiteLayout navVariant={world ?? "showcase"} footerVariant={world ?? "shared"}>
      <section className="relative" style={{ overflow: "hidden" }} aria-labelledby="peptides-hero-title">
        <div className="nx-container relative" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <div className="nx-hero-split nx-hero-seq">
            <div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The catalog</p>
              <h1 id="peptides-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-snug)", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.8rem" }}>
                {SOLO_CATALOG.length} peptides. <em style={{ color: "var(--nx-cobalt)" }}>Every one accounted for.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "50ch", marginTop: "1rem" }}>
                {world === "women"
                  ? "Chosen for how you want to feel — then proven in your bloodwork. Every peptide lists its dose, format, mechanism, and required labs before you begin."
                  : "Every peptide lists its dose, its format, its mechanism, and the bloodwork it requires — before you ever begin."}
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
                {SOLO_CATALOG.map((s) => (
                  <div key={s.slug} className="nx-vial-cell">
                    <VialHero sku={s} width="100%" />
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: "absolute", top: 14, right: 14, display: "inline-flex", alignItems: "center", gap: 8,
                  background: "color-mix(in srgb, var(--nx-fg) 55%, transparent)",
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "var(--nx-r-pill)", padding: "8px 14px",
                }}
              >
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>
                  {SOLO_CATALOG.length} peptides · physician-prescribed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Biomarker chip strip — every shelf item is lab-monitored (TRUE) ── */}
      <section className="nx-container" style={{ paddingBottom: "var(--nx-sp-tight)" }} aria-label="Lab-monitored biomarkers">
        <Reveal>
          <p className="nx-eyebrow" style={{ marginBottom: "0.9rem" }}>Every protocol here is lab-monitored</p>
          <div className="nx-biochip-grid" data-testid="catalog-biochips">
            {(world === "women" ? CATALOG_BIOMARKERS_WOMEN : CATALOG_BIOMARKERS_MEN).map((name) => (
              <Link key={name} href="/bloodwork" className="nx-biochip" data-testid={`catalog-biochip-${name}`}>
                {name}
              </Link>
            ))}
            <span className="nx-biochip muted">+ {PANEL_TOTAL_MARKERS - 6} more on the full panel</span>
          </div>
        </Reveal>
      </section>

      <section className="nx-container" style={{ paddingBottom: "1rem" }} aria-label="Search and filter the catalog">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a peptide — name, goal, or mechanism"
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
                {c}
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
          {shown.length} {shown.length === 1 ? "peptide" : "peptides"}{filter !== "All" ? ` · ${filter}` : ""}
        </p>
        {shown.length === 0 && (
          <div className="nx-glass-tile" style={{ display: "block", textAlign: "center", padding: "3rem 1.5rem" }} data-testid="filter-empty">
            <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>{needle ? `No matches for “${q.trim()}”.` : `No matches in ${filter}.`}</p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", marginTop: "0.5rem" }}>The formulary is curated — some shelves are short by design.</p>
            <button onClick={() => { setFilter("All"); setQ(""); }} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nx-cobalt)] focus-visible:ring-offset-2" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", background: "none", border: "none", cursor: "pointer", marginTop: "1rem", textDecoration: "underline" }}>
              Clear — show all
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
              <ProductCard sku={s} />
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
                  {cat}
                  {SHELF_CAT[cat] && (
                    <em style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-cobalt)" }}>
                      {feelingFor(SHELF_CAT[cat], world)}
                    </em>
                  )}
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

      {/* not sure which — route to the assessment */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "var(--nx-sp-band) 0" }} aria-labelledby="peptides-assess-title">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-acid)" }}>Not sure which fits?</p>
          <h2 id="peptides-assess-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: "0.8rem auto 0", lineHeight: 1.12 }}>
            The intake decides — <em style={{ color: "var(--nx-acid)" }}>not the catalog.</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "52ch", margin: "1rem auto 0" }}>
            You don’t have to pick correctly from a grid. Share your history and bloodwork; a physician matches you to the right compound, or tells you none is appropriate.
          </p>
          <Link href="/assessment" className="nx-cta-ceramic" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)", marginTop: "1.6rem" }} data-testid="catalog-assess-cta">
            Start your assessment
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
