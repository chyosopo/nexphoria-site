/* JOB: browse by goal, reach a PDP in one click; nothing else. */
/* ═══ PEPTIDES CATALOG — P5 wave 2 · the 19-solo shelf ═══ */
import { useState } from "react";
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
import { OUTCOME_CATEGORY, OUTCOME_HERO, OUTCOME_STACK } from "@/data/outcomeImagery";
import { getPeptideCardImage } from "@/lib/peptideImages";
import { getPrice } from "@/data/pricing";
import vialLineupHero from "@/assets/brand/vial-lineup-hero.webp";

/* Solo category → a POOL of outcome frames, cast per world. Brand law
   (C29): sell the outcome, never the vial — and never the same outcome
   five cards in a row (five Growth cards once shared one frame). Cards
   rotate through their category's pool by position. The unworlded
   /peptides route defaults to the men set; skin casts female in both. */
function catImg(world: "men" | "women" | undefined): Record<string, string[]> {
  const women = world === "women";
  const w = women ? OUTCOME_CATEGORY.women : OUTCOME_CATEGORY.men;
  const hero = women ? OUTCOME_HERO.women : OUTCOME_HERO.men;
  const pool = (...frames: (string | undefined)[]) =>
    frames.filter((f): f is string => Boolean(f));
  // Her pools are all-female-cast: the men-leaning stack frames (ascend pull-up,
  // wolverine doorway, threshold track) only pool on his side. Her Growth and
  // Sexual Health now have dedicated female frames instead of male fallbacks.
  return {
    Growth: women
      ? pool(w.growth, hero, OUTCOME_STACK.glow, w.recovery)
      : pool(w.growth ?? OUTCOME_CATEGORY.men.growth, OUTCOME_STACK.ascend, OUTCOME_STACK.threshold, hero),
    Cognitive: pool(w.cognition, OUTCOME_STACK.lucidity, hero),
    Recovery: women
      ? pool(w.recovery, hero, OUTCOME_STACK.glow)
      : pool(w.recovery, OUTCOME_STACK.wolverine, hero),
    "Skin & Longevity": pool(OUTCOME_CATEGORY.women.skin, OUTCOME_STACK.glow, w.longevity, OUTCOME_STACK.meridian),
    Metabolic: pool(w.metabolic, hero),
    Sleep: pool(w.sleep, hero),
    "Sexual Health": women ? pool(w["sexual-health"], hero) : pool(hero),
  };
}

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
      webPageJsonLd({ name: "Peptides", description: "Solo peptide catalog.", path: "/peptides" }),
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

  const CAT_IMG = catImg(world);
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

  return (
    /* Carry the visitor's world into the chrome — otherwise a woman on
       /women/peptides gets the generic nav whose "Peptides" link points to
       /peptides → redirects to /men/peptides, silently ejecting her from
       her world. Worlded catalog keeps her in it. */
    <SiteLayout navVariant={world ?? "showcase"} footerVariant={world ?? "shared"}>
      <section className="relative" style={{ overflow: "hidden" }} aria-labelledby="peptides-hero-title">
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <div className="nx-hero-split nx-hero-seq">
            <div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The catalog</p>
              <h1 id="peptides-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.8rem" }}>
                {SOLO_CATALOG.length} peptides. <em style={{ color: "var(--nx-cobalt)" }}>Every one accounted for.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "50ch", marginTop: "1rem" }}>
                {world === "women"
                  ? "Chosen for how you want to feel — then proven in your bloodwork. Every peptide lists its dose, format, mechanism, and required labs before you begin."
                  : "Every peptide lists its dose, its format, its mechanism, and the bloodwork it requires — before you ever begin."}
              </p>
            </div>
            <div className="nx-hero-media nx-hero-frame nx-hero-bleed" style={{ position: "relative", aspectRatio: "5 / 4" }}>
              <img src={vialLineupHero} alt="The Nexphoria peptide formulary" fetchPriority="high" width={1600} height={1280} />
              <div className="nx-gradient-overlay tint" aria-hidden />
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
        <div role="group" aria-label="Filter the catalog by category" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {cats.map((c) => {
            const n = c === "All" ? SOLO_CATALOG.length : SOLO_CATALOG.filter((s) => s.category === c).length;
            const active = filter === c;
            return (
              <button key={c} onClick={() => setFilter(c)} aria-pressed={active} data-testid={`filter-${c.toLowerCase()}`} className="nx-filter-chip focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nx-cobalt)] focus-visible:ring-offset-2" style={{
                fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600,
              }}>
                {c}
                <span style={{ opacity: 0.65, marginLeft: 6, fontWeight: 500 }}>{n}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-sec)" }} aria-label="Peptide catalog">
        <p aria-live="polite" style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.9rem" }}>
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
          const card = (s: (typeof shown)[number], nth: number, i: number) => {
            /* Show the PRODUCT, not a mood (Chiya 2026-07-13: "we're a
               pharmacy, not a marketing site") — the compound's own vial
               frame first; category lifestyle only as fallback. */
            const pool = CAT_IMG[s.category] ?? [world === "women" ? OUTCOME_HERO.women : OUTCOME_HERO.men];
            const productImg = getPeptideCardImage(s.slug, world) ?? pool[nth % pool.length];
            return (
            <Reveal key={s.slug} delay={i * 35}>
              <Link href={`${base}/peptides/${s.slug}`} className="nx-float-card" data-testid={`peptide-${s.slug}`}>
                <div className="nx-float-card__media">
                  <img src={productImg} alt="" aria-hidden loading="lazy" width={1632} height={2048} />
                  {s.gated && (
                    <span className="nx-float-badge"><Lock size={10} aria-hidden /> Assessed</span>
                  )}
                </div>
                <div className="nx-float-card__body">
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>{s.category}</p>
                  <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.3rem" }}>{s.outcome}</h3>
                  <p className="nx-line-1" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.4, color: "var(--nx-fg-graphite)", marginTop: "0.25rem" }}>
                    <strong style={{ fontWeight: 600, color: "var(--nx-fg)" }}>{s.name}</strong> · {s.dose}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto", paddingTop: "0.85rem" }}>
                    <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)" }}>
                      {s.gated ? "Physician-assessed" : s.pricing ? `From ${usd(s.pricing.m12)}/mo` : getPrice(s.slug) ? `From ${usd(getPrice(s.slug)!.monthlyPrice)}/mo` : "At consult"}
                    </span>
                    <ArrowRight size={16} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                  </div>
                </div>
              </Link>
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
