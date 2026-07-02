/* ═══ WORLD HOME — P3 engine · one skeleton, two worlds ═══
   Grammar: aurora hero → tinted-glass goal tiles in first glance →
   product card row → ONE night band (~15%) → standards line → close.
   Every color derives from --nx-* tokens; the orchid world themes itself
   under /women via [data-world]. Bank voice. Nothing decorative. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { peptides, CATEGORY_LABELS, PeptideCategory } from "@/data/peptides";
import { getPrice } from "@/data/pricing";

const F = "'General Sans', system-ui, sans-serif";
const S = "'Fraunces', Georgia, serif";

/** One-line job description per category — what the shelf is for. */
const CATEGORY_JOBS: Record<PeptideCategory, string> = {
  growth: "GH pulse, lean mass, body composition.",
  recovery: "Tissue repair under real training load.",
  metabolic: "Appetite, weight, glucose control.",
  longevity: "Cellular energy, immune function, healthspan.",
  cognition: "Focus and mood, without stimulants.",
  sleep: "Deep-sleep architecture, restored.",
  skin: "Collagen, tone, structural skin health.",
};

export interface WorldHomeConfig {
  world: "men" | "women";
  eyebrow: string;
  h1: React.ReactNode;
  sub: string;
  categories: PeptideCategory[];
  /** slugs for the product card row, in display order */
  featured: string[];
  nightEyebrow: string;
  nightH2: React.ReactNode;
  nightBody: string;
}

export function WorldHome({ config }: { config: WorldHomeConfig }) {
  const { world } = config;
  const base = `/${world}`;
  const countFor = (c: PeptideCategory) => peptides.filter((p) => p.category === c).length;
  const cards = config.featured
    .map((slug) => peptides.find((p) => p.slug === slug))
    .filter(Boolean) as typeof peptides;

  return (
    <SiteLayout navVariant={world} footerVariant={world}>
      {/* ── HERO — aurora field, quiet institutional claim ── */}
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden>
          <i /><i /><i />
        </div>
        <div className="nx-container relative" style={{ padding: "clamp(3.4rem,7vw,5.8rem) 0 clamp(2rem,4vw,3rem)", zIndex: 1 }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            {config.eyebrow}
          </p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(38px,5.8vw,68px)", lineHeight: 1.05, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.9rem" }}>
            {config.h1}
          </h1>
          <p style={{ fontFamily: F, fontSize: 16.5, lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1.1rem" }}>
            {config.sub}
          </p>
          <div style={{ marginTop: "1.8rem", display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/assessment"
              data-testid={`${world}-hero-cta`}
              style={{ display: "inline-block", fontFamily: F, fontWeight: 600, fontSize: 15, background: "var(--nx-cobalt)", color: "var(--nx-ceramic)", borderRadius: 999, padding: "14px 28px", textDecoration: "none" }}
            >
              Begin your intake
            </Link>
            <Link href="/bloodwork" className="nx-glass-btn" data-testid={`${world}-hero-panel`} style={{ fontFamily: F, fontSize: 15 }}>
              See the 76-marker panel
            </Link>
          </div>
        </div>

        {/* ── GOAL TILES — tinted glass, inside the aurora, first glance ── */}
        <div className="nx-container relative" style={{ paddingBottom: "clamp(2.6rem,5vw,4rem)", zIndex: 1 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 14 }}>
            {config.categories.map((cat, i) => (
              <Reveal key={cat} delay={i * 60}>
                <Link href={`${base}/peptides`} className="nx-glass-tile" data-testid={`${world}-goal-${cat}`}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                    <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(20px,2.2vw,24px)", color: "var(--nx-fg)", lineHeight: 1.15 }}>
                      {CATEGORY_LABELS[cat]}
                    </h2>
                    <ArrowRight size={17} strokeWidth={2.2} style={{ color: "var(--nx-cobalt)", flexShrink: 0, transform: "translateY(2px)" }} />
                  </div>
                  <p style={{ fontFamily: F, fontSize: 13.5, lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.45rem" }}>
                    {CATEGORY_JOBS[cat]}
                  </p>
                  <p style={{ fontFamily: F, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "0.85rem" }}>
                    {countFor(cat)} {countFor(cat) === 1 ? "protocol" : "protocols"}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CARD ROW — the shelf, if-prescribed framing ── */}
      <section className="nx-container" style={{ padding: "clamp(2.2rem,4.5vw,3.6rem) 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.6vw,38px)", color: "var(--nx-fg)" }}>
            From the formulary
          </h2>
          <Link href={`${base}/peptides`} style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none" }} data-testid={`${world}-formulary-all`}>
            The complete catalog →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 14, marginTop: "1.4rem" }}>
          {cards.map((p, i) => {
            const pricing = getPrice(p.slug);
            return (
              <Reveal key={p.slug} delay={i * 60}>
                <Link href={`${base}/peptides/${p.slug}`} className="nx-glass-tile" data-testid={`${world}-card-${p.slug}`} style={{ height: "100%" }}>
                  <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                    {CATEGORY_LABELS[p.category]}
                  </p>
                  <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: 23, color: "var(--nx-fg)", marginTop: "0.55rem", lineHeight: 1.1 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: F, fontSize: 13.5, lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>
                    {p.tagline}
                  </p>
                  <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--nx-fg)", marginTop: "0.95rem" }}>
                    {pricing ? `From $${pricing.monthlyPrice}/mo` : "Physician-priced"}
                    <span style={{ fontWeight: 400, color: "var(--nx-fg-muted)" }}> · if prescribed</span>
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── THE ONE NIGHT BAND — the loop is the product ── */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "clamp(3rem,6vw,4.6rem) 0" }}>
        <div className="nx-container">
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>
            {config.nightEyebrow}
          </p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.4vw,46px)", color: "var(--nx-ceramic)", maxWidth: "22ch", marginTop: "0.8rem", lineHeight: 1.12 }}>
            {config.nightH2}
          </h2>
          <p style={{ fontFamily: F, fontSize: 15.5, lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "56ch", marginTop: "1rem" }}>
            {config.nightBody}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 14, marginTop: "2.2rem", borderTop: "1px solid color-mix(in srgb, var(--nx-acid) 25%, transparent)", paddingTop: "1.8rem" }}>
            {[
              { n: "76", l: "biomarkers at baseline" },
              { n: "90", l: "days between retests" },
              { n: "503A", l: "state-licensed compounding" },
            ].map((s) => (
              <div key={s.n}>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(34px,4.4vw,48px)", color: "var(--nx-ceramic)", lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-acid)", marginTop: "0.5rem", opacity: 0.9 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STANDARDS LINE + CLOSE ── */}
      <section className="nx-container" style={{ padding: "3rem 0 4.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
          Licensed physicians · State-licensed 503A pharmacies · Prescription required · One dashboard
        </p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.2vw,44px)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "1.4rem auto 0", lineHeight: 1.12 }}>
          The consultation carries no charge. <em style={{ color: "var(--nx-cobalt)" }}>You pay only if prescribed.</em>
        </h2>
        <Link
          href="/assessment"
          data-testid={`${world}-close-cta`}
          style={{ display: "inline-block", fontFamily: F, fontWeight: 600, fontSize: 15, background: "var(--nx-cobalt)", color: "var(--nx-ceramic)", borderRadius: 999, padding: "14px 28px", marginTop: "1.6rem", textDecoration: "none" }}
        >
          Begin your intake
        </Link>
      </section>
    </SiteLayout>
  );
}
