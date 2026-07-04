/* ═══ PEPTIDES CATALOG — P5 wave 2 · the 19-solo shelf ═══ */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { TrustStrip } from "@/components/EnterprisePatterns";
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

/* Markers every protocol on this shelf is monitored against — reinforces the
   lab-monitored law (TRUE: bloodwork every 90 days). Echoes the Science page. */
const CATALOG_BIOMARKERS = ["IGF-1", "HbA1c", "Fasting insulin", "hs-CRP", "Total testosterone", "Lipid panel"];

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

      {/* ── Trust badge strip — calm quiet credential row (TRUE claims only) ── */}
      <section className="nx-container" style={{ padding: "clamp(1.2rem,2.4vw,2rem) 0 clamp(1.8rem,3vw,2.4rem)" }}>
        <Reveal>
          <TrustStrip testid="peptides-trust-strip" />
        </Reveal>
      </section>

      {/* ── Biomarker chip strip — every shelf item is lab-monitored (TRUE) ── */}
      <section className="nx-container" style={{ paddingBottom: "clamp(1.4rem,3vw,2.2rem)" }}>
        <Reveal>
          <p className="nx-eyebrow" style={{ marginBottom: "0.9rem" }}>Every protocol here is lab-monitored</p>
          <div className="nx-biochip-grid" data-testid="catalog-biochips">
            {CATALOG_BIOMARKERS.map((name) => (
              <Link key={name} href="/bloodwork" className="nx-biochip" data-testid={`catalog-biochip-${name}`}>
                {name}
              </Link>
            ))}
            <span className="nx-biochip muted">+ 32 more on the full panel</span>
          </div>
        </Reveal>
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

      <section className="nx-container" style={{ padding: "clamp(1.4rem,3vw,2.2rem) 0 clamp(4rem,7vw,6rem)" }}>
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
        <div className="nx-float-grid">
          {shown.map((s, i) => (
            <Reveal key={s.slug} delay={i * 35}>
              <Link href={`${base}/peptides/${s.slug}`} className="nx-float-card" data-testid={`peptide-${s.slug}`}>
                <div className="nx-float-card__media">
                  <img src={CAT_IMG[s.category] ?? OUTCOME_HERO.men} alt="" aria-hidden loading="lazy" width={1632} height={2048} />
                  {s.gated && (
                    <span className="nx-float-badge"><Lock size={10} /> Assessed</span>
                  )}
                </div>
                <div className="nx-float-card__body">
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>{s.category}</p>
                  <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.3rem" }}>{s.name}</h2>
                  <p className="nx-line-1" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.4, color: "var(--nx-fg-muted)", marginTop: "0.25rem" }}>{s.dose}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto", paddingTop: "0.85rem" }}>
                    <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)" }}>
                      {s.gated ? "Physician-assessed" : s.pricing ? `From ${usd(s.pricing.m12)}/mo` : "At consult"}
                    </span>
                    <ArrowRight size={16} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* not sure which — route to the assessment */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "clamp(2.6rem,5vw,4rem) 0" }}>
        <div className="nx-container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>Not sure which fits?</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,4vw,42px)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: "0.8rem auto 0", lineHeight: 1.12 }}>
            The intake decides — <em style={{ color: "var(--nx-acid)" }}>not the catalog.</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "52ch", margin: "1rem auto 0" }}>
            You don’t have to pick correctly from a grid. Share your history and bloodwork; a physician matches you to the right compound, or tells you none is appropriate.
          </p>
          <Link href="/assessment" style={{ display: "inline-block", fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)", background: "var(--nx-ceramic)", color: "var(--nx-bg-dark)", borderRadius: "var(--nx-r-pill)", padding: "14px 28px", marginTop: "1.6rem", textDecoration: "none" }} data-testid="catalog-assess-cta">
            Begin your intake
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
