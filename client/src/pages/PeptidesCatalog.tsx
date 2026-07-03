/* ═══ PEPTIDES CATALOG — P5 wave 2 · the 19-solo shelf ═══ */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SOLO_CATALOG, SOLO_CATEGORIES } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { ArrowRight, Lock } from "lucide-react";
import { F, S } from "@/lib/typography";
import { OUTCOME_CATEGORY, OUTCOME_HERO } from "@/data/outcomeImagery";
import vialLineupHero from "@/assets/brand/vial-lineup-hero.webp";

/* Solo category → its outcome frame. Brand law (C29): sell the outcome,
   never the vial — so each product tile carries a lifestyle frame, not a
   repeated bottle. Men set is the neutral default; skin casts female. */
const CAT_IMG: Record<string, string> = {
  Growth: OUTCOME_CATEGORY.men.growth ?? OUTCOME_HERO.men,
  Cognitive: OUTCOME_CATEGORY.men.cognition ?? OUTCOME_HERO.men,
  Recovery: OUTCOME_CATEGORY.men.recovery ?? OUTCOME_HERO.men,
  "Skin & Longevity": OUTCOME_CATEGORY.women.skin ?? OUTCOME_HERO.women,
  Metabolic: OUTCOME_CATEGORY.men.metabolic ?? OUTCOME_HERO.men,
  Sleep: OUTCOME_CATEGORY.men.sleep ?? OUTCOME_HERO.men,
  "Sexual Health": OUTCOME_HERO.women,
};

export default function PeptidesCatalog({ world }: { world?: "men" | "women" }) {
  const base = world ? `/${world}` : "";
  const [filter, setFilter] = useState<string>("All");
  const [q, setQ] = useState("");
  useSeo({
    title: "Peptides — The Full Catalog | Nexphoria",
    description: "Nineteen physician-prescribed peptides, each with dosing, mechanism, timeline, and required bloodwork stated plainly.",
    jsonLd: [
      webPageJsonLd({ name: "Peptides", description: "Solo peptide catalog.", path: "/peptides" }),
      breadcrumbJsonLd(
        world
          ? [{ name: "Home", path: "/" }, { name: world === "men" ? "Men" : "Women", path: `/${world}` }, { name: "Peptides", path: `/${world}/peptides` }]
          : [{ name: "Home", path: "/" }, { name: "Peptides", path: "/peptides" }],
      ),
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
        s.mechanism.toLowerCase().includes(needle)),
  );

  return (
    <SiteLayout>
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ padding: "clamp(3rem,6vw,5rem) 0 clamp(1.6rem,3vw,2.4rem)", zIndex: 1 }}>
          <div className="nx-hero-split nx-hero-seq">
            <div>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The catalog</p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(38px,5.6vw,64px)", lineHeight: 1.05, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.8rem" }}>
                Nineteen peptides. <em style={{ color: "var(--nx-cobalt)" }}>Nothing hidden.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "50ch", marginTop: "1rem" }}>
                Every peptide lists its dose, its format, its mechanism, and the bloodwork it requires — before you ever begin.
              </p>
            </div>
            <div className="nx-hero-media nx-hero-frame" style={{ aspectRatio: "5 / 4" }}>
              <img src={vialLineupHero} alt="The Nexphoria peptide formulary" fetchPriority="high" width={1600} height={1280} />
              <div className="nx-gradient-overlay tint" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="nx-container" style={{ paddingBottom: "1rem" }}>
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {cats.map((c) => {
            const n = c === "All" ? SOLO_CATALOG.length : SOLO_CATALOG.filter((s) => s.category === c).length;
            const active = filter === c;
            return (
              <button key={c} onClick={() => setFilter(c)} aria-pressed={active} data-testid={`filter-${c.toLowerCase()}`} style={{
                fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, padding: "8px 15px", borderRadius: "var(--nx-r-pill)", cursor: "pointer",
                background: active ? "var(--nx-cobalt)" : "transparent",
                color: active ? "var(--nx-ceramic)" : "var(--nx-fg-graphite)",
                border: `1px solid ${active ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
                transition: "background var(--nx-dur-2) var(--nx-ease), color var(--nx-dur-2) var(--nx-ease), border-color var(--nx-dur-2) var(--nx-ease)",
              }}>
                {c}
                <span style={{ opacity: 0.65, marginLeft: 6, fontWeight: 500 }}>{n}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="nx-container" style={{ padding: "1rem 0 4rem" }}>
        <p aria-live="polite" style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.9rem" }}>
          {shown.length} {shown.length === 1 ? "peptide" : "peptides"}{filter !== "All" ? ` · ${filter}` : ""}
        </p>
        {shown.length === 0 && (
          <div className="nx-glass-tile" style={{ display: "block", textAlign: "center", padding: "3rem 1.5rem" }} data-testid="filter-empty">
            <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>{needle ? `No matches for “${q.trim()}”.` : `No matches in ${filter}.`}</p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", marginTop: "0.5rem" }}>The formulary is curated — some shelves are short by design.</p>
            <button onClick={() => { setFilter("All"); setQ(""); }} style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", background: "none", border: "none", cursor: "pointer", marginTop: "1rem", textDecoration: "underline" }}>
              Clear — show all
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 18 }}>
          {shown.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <Link href={`${base}/peptides/${s.slug}`} className="nx-product-card" data-testid={`peptide-${s.slug}`}>
                <div className="nx-product-card__media">
                  <img src={CAT_IMG[s.category] ?? OUTCOME_HERO.men} alt="" aria-hidden loading="lazy" width={1632} height={2048} />
                  <div className="nx-gradient-overlay soft" aria-hidden />
                  <span style={{ position: "absolute", top: 14, left: 14, fontFamily: F, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>{s.category}</span>
                  {s.gated && (
                    <span style={{ position: "absolute", top: 12, right: 12, display: "inline-flex", alignItems: "center", gap: 5, fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--nx-ceramic)", background: "color-mix(in srgb, var(--nx-fg) 62%, transparent)", backdropFilter: "blur(6px)", borderRadius: "var(--nx-r-pill)", padding: "4px 10px" }}>
                      <Lock size={11} /> Assessed
                    </span>
                  )}
                  <h2 style={{ position: "absolute", left: 16, right: 16, bottom: 14, fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-ceramic)", lineHeight: 1.02 }}>{s.name}</h2>
                </div>
                <div className="nx-product-card__body">
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)", flex: 1 }}>{s.dose}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.9rem", paddingTop: "0.85rem", borderTop: "1px solid var(--nx-border)" }}>
                    <p style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, color: "var(--nx-fg)" }}>
                      {s.gated ? "Physician-assessed" : s.pricing ? `From ${usd(s.pricing.m12)}/mo` : "Priced at consult"}
                    </p>
                    <ArrowRight size={16} style={{ color: "var(--nx-cobalt)" }} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
