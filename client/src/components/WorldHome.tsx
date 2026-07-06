/* ═══ WORLD HOME — P3 engine · one skeleton, two worlds ═══
   Grammar: aurora hero → tinted-glass goal tiles in first glance →
   product card row → ONE night band (~15%) → standards line → close.
   Every color derives from --nx-* tokens; the orchid world themes itself
   under /women via [data-world]. Bank voice. Nothing decorative. */
import { Link } from "wouter";
import { ArrowRight, Stethoscope, FlaskConical, ClipboardCheck, Activity } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { peptides, CATEGORY_LABELS, CATEGORY_FEELING, PeptideCategory } from "@/data/peptides";
import { getStack, usd } from "@/data/stacksCatalog";
import { HeroTileRail, type RailTile } from "@/components/HeroTileRail";
import { getPrice } from "@/data/pricing";
import { BIOMARKER_PANEL, PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { outcomeSrcSet, OUTCOME_STACK } from "@/data/outcomeImagery";
import { F, S } from "@/lib/typography";
import { PhysicianGate } from "@/components/PhysicianProofBand";

/* The four credentials that are TRUE for Nexphoria — no invented CLIA/FDA/CAP. */
const TRUST_BADGES = [
  { Icon: Stethoscope, label: "U.S.-licensed physicians" },
  { Icon: FlaskConical, label: "State-licensed 503A pharmacy" },
  { Icon: ClipboardCheck, label: "Prescription required" },
  { Icon: Activity, label: "Lab-monitored every 90 days" },
];

/* Home FAQ — bank voice, every answer true to the service model. World-agnostic. */
const HOME_FAQ = [
  {
    q: "Does the consultation cost anything?",
    a: "No. The intake and physician review carry no charge. You pay only if a physician determines a prescription is appropriate and you choose to proceed.",
  },
  {
    q: "Is a prescription required?",
    a: "Yes. Every compound is prescribed by a U.S.-licensed physician of MDI Providers PLLC after reviewing your intake and bloodwork. They can — and do — decline when a protocol is not appropriate.",
  },
  {
    q: "Where are the peptides compounded?",
    a: "In state-licensed 503A compounding pharmacies, prepared per prescription and batch-documented. Nothing is stocked, resold, or shipped without a physician's order.",
  },
  {
    q: "How often is my bloodwork re-run?",
    a: "The same panel is drawn again every ninety days. Your physician reads the new trend against your protocol and adjusts — nothing continues on assumption.",
  },
  {
    q: "How many biomarkers are measured?",
    a: `${PANEL_TOTAL_MARKERS} markers across eleven systems at baseline, including a twenty-one-factor biological-age composite — the same panel a physician would order to read your endocrine, metabolic, and cardiovascular picture properly.`,
  },
];

/** One-line job description per category — what the shelf is for. */
const CATEGORY_JOBS: Record<PeptideCategory, string> = {
  growth: "GH pulse, lean mass, body composition.",
  recovery: "Tissue repair under real training load.",
  metabolic: "Appetite, weight, glucose control.",
  longevity: "Cellular energy, immune function, healthspan.",
  cognition: "Focus and mood, without stimulants.",
  sleep: "Deep-sleep architecture, restored.",
  skin: "Collagen, tone, structural skin health.",
  "sexual-health": "Libido and arousal, centrally mediated.",
};

export interface WorldHomeConfig {
  world: "men" | "women";
  /** outcome photography — the tile's working surface (hyper-real, per ART-DIRECTION.md) */
  tileArt: Partial<Record<PeptideCategory, string>>;
  /** hero outcome frame (3:2) — renders beside the claim on lg+ */
  heroArt?: string;
  /** master vial render — anchors the formulary as a physical, compounded product */
  vialArt: string;
  eyebrow: string;
  h1: React.ReactNode;
  sub: string;
  categories: PeptideCategory[];
  /** slugs for the product card row, in display order */
  featured: string[];
  nightEyebrow: string;
  nightH2: React.ReactNode;
  nightBody: string;
  /** optional trust sections dropped between the shelf and the night band; per-world, women pass nothing */
  trustSlot?: React.ReactNode;
  /** optional human frame beside the FAQ intro — person mid-consult with a clinician */
  faqArt?: string;
  /** floating marker chip on the hero frame — clearly labeled as a sample */
  heroMarker?: { label: string; delta: string; state: string };
}

export function WorldHome({ config }: { config: WorldHomeConfig }) {
  const { world } = config;
  const base = `/${world}`;
  const countFor = (c: PeptideCategory) => peptides.filter((p) => p.category === c).length;
  const cards = config.featured
    .map((slug) => peptides.find((p) => p.slug === slug))
    .filter(Boolean) as typeof peptides;

  /* Hero rail tiles (hims grammar): this world's six goals on its own cast,
     one flagship protocol with its real from-price, and the retest promise
     on the world's hero portrait. */
  const flagshipSlug = world === "women" ? "glow" : "ascend";
  const flagship = getStack(flagshipSlug)!;
  const flagshipFrom = usd(Math.min(...flagship.cadences.map((c) => c.perMonth ?? c.total)));
  const railTiles: RailTile[] = [
    ...(config.heroArt
      ? [{ img: config.heroArt, label: "Your bloodwork", sub: "Retested every 90 days.", href: "/bloodwork", testid: `${world}-rail-bloodwork` }]
      : []),
    ...config.categories.slice(0, 6).map((cat, i) => ({
      img: config.tileArt[cat] ?? config.heroArt ?? "",
      label: CATEGORY_LABELS[cat],
      sub: CATEGORY_FEELING[cat],
      href: `/goals/${cat}`,
      testid: `${world}-rail-${cat}`,
    })),
    { img: OUTCOME_STACK[flagshipSlug] ?? config.heroArt ?? "", label: `The ${flagship.name} protocol`, sub: `from ${flagshipFrom}/mo`, href: `/stacks/${flagshipSlug}`, testid: `${world}-rail-flagship` },
  ].filter((t) => t.img);

  return (
    <SiteLayout navVariant={world} footerVariant={world}>
      {/* ── HERO — aurora field, quiet institutional claim ── */}
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden>
          <i /><i /><i />
        </div>
        <div className="nx-container relative" style={{ paddingTop: "clamp(3.4rem,7vw,5.8rem)", paddingBottom: "clamp(2rem,4vw,3rem)", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]" style={{ gap: "clamp(1.6rem,4vw,3.2rem)", alignItems: "center" }}>
          <div className="nx-hero-seq">
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            {config.eyebrow}
          </p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(40px,6vw,74px)", lineHeight: 1.04, letterSpacing: "-0.018em", color: "var(--nx-fg)", maxWidth: "15ch", marginTop: "0.9rem" }}>
            {config.h1}
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1.1rem" }}>
            {config.sub}
          </p>
          {/* CTA law (ROADMAP 1.1): ONE solid action; the panel becomes a
              text link; the protocols button is gone — the goal grid IS the
              protocols entrance, one viewport below. */}
          <div style={{ marginTop: "1.8rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.4rem" }}>
            <Link
              href="/assessment"
              data-testid={`${world}-hero-cta`}
              className="nx-cta-cobalt"
              style={{ fontSize: "var(--nx-t-base)", padding: "15px 30px" }}
            >
              Start your assessment
            </Link>
            <Link href="/bloodwork" className="nx-text-link" data-testid={`${world}-hero-panel`} style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
              What the {PANEL_TOTAL_MARKERS}-marker panel checks →
            </Link>
          </div>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.9rem" }}>
            2 minutes · no charge unless a physician prescribes
          </p>
          {/* Physician presence at the decision moment (ROADMAP 5.1) */}
          <PhysicianGate testid={`${world}-hero-physician`} style={{ marginTop: "0.9rem" }} />
          </div>
          {/* The weightless vertical tile rail — the hims-grammar hero:
              this world's goals, flagship, and the retest promise on its own
              photographic cast. Desktop: two counter-scrolling columns.
              Mobile: snap strip. */}
          <HeroTileRail tiles={railTiles} testid={`${world}-rail`} />
          </div>
        </div>

        {/* ── GOAL TILES — tinted glass, inside the aurora, first glance ── */}
        <div className="nx-container relative" style={{ paddingBottom: "clamp(2.6rem,5vw,4rem)", zIndex: 1 }}>
          {/* Bento: the first goal is the editorial anchor (2×2 on lg+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 18 }}>
            {config.categories.map((cat, i) => (
              <Reveal key={cat} delay={i * 60} className={i === 0 ? "nx-art-tile--feature-cell" : undefined}>
                {/* Deep-link the GOAL, not the generic shelf (found by the
                    6.1 funnel gate): recovery lands on /goals/recovery. */}
                <Link href={`/goals/${cat}`} className={i === 0 ? "nx-art-tile nx-art-tile--feature" : "nx-art-tile"} data-testid={`${world}-goal-${cat}`}>
                  {config.tileArt[cat] && (
                    <img
                      src={config.tileArt[cat]}
                      srcSet={outcomeSrcSet(config.tileArt[cat])}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt="" aria-hidden loading="lazy" width={1632} height={2048}
                    />
                  )}
                  <div className="nx-art-chip">
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                      <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(19px,2.1vw,23px)", color: "var(--nx-fg)", lineHeight: 1.12 }}>
                        {CATEGORY_LABELS[cat]}
                      </h2>
                      <ArrowRight size={16} strokeWidth={2.2} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0, transform: "translateY(2px)" }} />
                    </div>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)", marginTop: "0.3rem" }}>
                      {CATEGORY_JOBS[cat]}
                    </p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "0.55rem" }}>
                      {countFor(cat)} {countFor(cat) === 1 ? "protocol" : "protocols"}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BADGE STRIP — calm quiet credential row (TRUE claims only) ── */}
      <section className="nx-container" style={{ paddingTop: "clamp(1.4rem,2.4vw,2.2rem)", paddingBottom: "0" }}>
        <Reveal>
          <div className="nx-trust-strip" data-testid={`${world}-trust-strip`}>
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div key={label} className="nx-trust-badge">
                <Icon size={18} strokeWidth={1.8} aria-hidden />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── BIOMARKER MARQUEE — the panel as living texture (hims-Labs grammar) ── */}
      <section aria-label="Biomarkers we measure" style={{ paddingTop: "clamp(2.6rem,4.5vw,3.6rem)", paddingBottom: "0" }}>
        <div className="nx-container" style={{ marginBottom: "1.1rem" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            {PANEL_TOTAL_MARKERS} biomarkers · drawn at baseline · re-drawn every 90 days
          </p>
        </div>
        {[BIOMARKER_PANEL.slice(0, 5), BIOMARKER_PANEL.slice(5)].map((half, r) => (
          <div key={r} className="nx-marquee" style={{ marginBottom: r === 0 ? 10 : 0 }} aria-hidden>
            <div className={`nx-marquee-track ${r === 1 ? "reverse" : ""}`}>
              {(() => {
                const row = half.flatMap((c) => c.markers.map((m) => ({ n: m.name.split(" (")[0], c: c.name })));
                return [...row, ...row].map((m, j) => (
                  <span key={j} className="nx-marquee-chip">
                    <span style={{ color: "var(--nx-cobalt)", fontWeight: 600 }}>{m.c}</span>&nbsp;·&nbsp;{m.n}
                  </span>
                ));
              })()}
            </div>
          </div>
        ))}
      </section>

      {/* ── PRODUCT CARD ROW — the shelf, if-prescribed framing ── */}
      <section className="nx-container" style={{ paddingTop: "clamp(3.5rem,6vw,5.5rem)", paddingBottom: "clamp(3.5rem,6vw,5.5rem)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.6vw,38px)", color: "var(--nx-fg)" }}>
            From the formulary
          </h2>
          <Link href={`${base}/peptides`} className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }} data-testid={`${world}-formulary-all`}>
            The complete catalog →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.5fr]" style={{ gap: 14, marginTop: "1.9rem", alignItems: "stretch" }}>
          <Reveal>
            <div className="relative" style={{ borderRadius: "var(--nx-r-lg)", overflow: "hidden", minHeight: 320, height: "100%", boxShadow: "var(--nx-e-3)" }}>
              <img src={config.vialArt} alt="" aria-hidden loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="nx-art-chip" style={{ maxWidth: 260 }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                  Compounded per prescription
                </p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)", marginTop: "0.3rem" }}>
                  Prepared for you in state-licensed 503A pharmacies. Batch-documented.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
          {cards.map((p, i) => {
            const pricing = getPrice(p.slug);
            return (
              <Reveal key={p.slug} delay={i * 60}>
                <Link href={`${base}/peptides/${p.slug}`} className="nx-float-card" data-testid={`${world}-card-${p.slug}`}>
                  <div className="nx-float-card__body">
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                      {CATEGORY_LABELS[p.category]}
                    </p>
                    <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: "0.5rem", lineHeight: 1.1 }}>
                      {p.name}
                    </h3>
                    <p className="nx-line-2" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>
                      {p.tagline}
                    </p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", marginTop: "auto", paddingTop: "0.95rem" }}>
                      {pricing ? `From $${pricing.monthlyPrice}/mo` : "Physician-priced"}
                      <span style={{ fontWeight: 400, color: "var(--nx-fg-muted)" }}> · if prescribed</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
          </div>
        </div>
      </section>

      {/* ── BIOMARKER CHIPS — the panel, read as rounded pill chips (rythm grammar) ── */}
      <section className="nx-container" style={{ paddingTop: "clamp(3.8rem,7vw,6rem)", paddingBottom: "clamp(3.8rem,7vw,6rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]" style={{ gap: "clamp(2rem,5vw,4rem)", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
              The panel
            </p>
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.2vw,46px)", color: "var(--nx-fg)", marginTop: "0.8rem", lineHeight: 1.1, letterSpacing: "-0.015em", maxWidth: "14ch" }}>
              {PANEL_TOTAL_MARKERS} markers. Eleven systems.
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1.1rem", maxWidth: "44ch" }}>
              Every protocol begins from a full read of your biology — endocrine, metabolic, cardiovascular, and more — not a template. This is the baseline a physician works from.
            </p>
            <Link
              href="/bloodwork"
              data-testid={`${world}-panel-cta`}
              className="nx-text-link"
              style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.5rem" }}
            >
              See the full {PANEL_TOTAL_MARKERS}-marker panel
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
            </Link>
          </div>
          <Reveal>
            <div className="nx-biochip-grid" data-testid={`${world}-biochips`}>
              {BIOMARKER_PANEL.map((c) => (
                <Link key={c.id} href="/bloodwork" className="nx-biochip" data-testid={`${world}-biochip-${c.id}`}>
                  {c.name}
                  <span className="nx-biochip-ct">{c.count}</span>
                </Link>
              ))}
              <span className="nx-biochip muted">+ biological-age composite</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TRUST SLOT — per-world sections (physician band, how-it-works) ── */}
      {config.trustSlot}

      {/* ── OUTCOME DASHBOARD + CLINICAL STANDARD — abstract preview, no PHI ── */}
      <section className="nx-container" style={{ paddingTop: "clamp(3.8rem,7vw,6rem)", paddingBottom: "clamp(3.8rem,7vw,6rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]" style={{ gap: "clamp(2.2rem,5vw,4rem)", alignItems: "center" }}>
          <Reveal>
            <div className="nx-mini-panel" data-testid={`${world}-dashboard`} aria-hidden>
              <div className="nx-mini-head">
                <span className="nx-mini-title">Biomarker index — retest trend</span>
                <span className="nx-mini-pill">Sample</span>
              </div>
              <div className="nx-mini-bars">
                <div className="nx-mini-bar" style={{ height: "44%" }} />
                <div className="nx-mini-bar" style={{ height: "58%" }} />
                <div className="nx-mini-bar" style={{ height: "52%" }} />
                <div className="nx-mini-bar" style={{ height: "71%" }} />
                <div className="nx-mini-bar" style={{ height: "66%" }} />
                <div className="nx-mini-bar hi" style={{ height: "88%" }} />
              </div>
              <div className="nx-mini-row">
                <span>Baseline → 90 → 180 → 270 days</span>
                <span><b>+31%</b> in range</span>
              </div>
              <div className="nx-mini-row">
                <span className="nx-mini-cap">Illustrative — not a patient record</span>
              </div>
            </div>
          </Reveal>
          <div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
              One dashboard
            </p>
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.8vw,40px)", color: "var(--nx-fg)", marginTop: "0.8rem", lineHeight: 1.12, letterSpacing: "-0.015em", maxWidth: "18ch" }}>
              Your markers, plotted against every retest.
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "48ch" }}>
              The same values your physician watches, in one place — each panel laid beside the last so the trend, not a single number, decides what changes.
            </p>
            <div className="nx-proof" style={{ marginTop: "clamp(1.8rem,3vw,2.6rem)" }}>
              <p className="nx-proof-quote">No protocol continues without a physician reading the next panel.</p>
              <p className="nx-proof-attr">The Nexphoria clinical standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ONE NIGHT BAND — the loop is the product ── */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "clamp(4rem,7vw,6rem) 0" }}>
        <div className="nx-container">
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>
            {config.nightEyebrow}
          </p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.4vw,46px)", color: "var(--nx-ceramic)", maxWidth: "22ch", marginTop: "0.8rem", lineHeight: 1.12 }}>
            {config.nightH2}
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "56ch", marginTop: "1rem" }}>
            {config.nightBody}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 14, marginTop: "2.2rem", borderTop: "1px solid color-mix(in srgb, var(--nx-acid) 25%, transparent)", paddingTop: "1.8rem" }}>
            {[
              { n: String(PANEL_TOTAL_MARKERS), l: "biomarkers at baseline" },
              { n: "90", l: "days between retests" },
              { n: "503A", l: "state-licensed compounding" },
            ].map((s) => (
              <div key={s.n}>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(34px,4.4vw,48px)", color: "var(--nx-ceramic)", lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-acid)", marginTop: "0.5rem", opacity: 0.9 }}>{s.l}</p>
              </div>
            ))}
          </div>
          {/* the page's strongest conviction moment gets its next step */}
          <Link href="/assessment" className="nx-cta-ceramic" data-testid={`${world}-night-cta`} style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)", marginTop: "2.2rem" }}>
            Start your assessment
          </Link>
        </div>
      </section>

      {/* ── FAQ — clean spacious accordion, native <details> ── */}
      <section className="nx-container" style={{ paddingTop: "clamp(3.8rem,7vw,6rem)", paddingBottom: "clamp(3.8rem,7vw,6rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr]" style={{ gap: "clamp(1.8rem,4vw,3.4rem)", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
              Questions
            </p>
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.8vw,40px)", color: "var(--nx-fg)", marginTop: "0.8rem", lineHeight: 1.12, letterSpacing: "-0.015em", maxWidth: "14ch" }}>
              What to expect.
            </h2>
            {config.faqArt && (
              <div className="hidden lg:block" style={{ marginTop: "1.6rem", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-2)", aspectRatio: "4 / 5" }}>
                <img
                  src={config.faqArt}
                  alt="A member at ease on a call with their physician"
                  loading="lazy"
                  decoding="async"
                  width={1632}
                  height={2048}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}
          </div>
          <div data-testid={`${world}-faq`}>
            {HOME_FAQ.map((item, i) => (
              <details key={item.q} className="nx-faq-item" open={i === 0}>
                <summary>
                  {item.q}
                  <span className="nx-faq-plus" aria-hidden />
                </summary>
                <p className="nx-faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── STANDARDS LINE + CLOSE ── */}
      <section className="nx-container" style={{ paddingTop: "clamp(3.5rem,6vw,5.5rem)", paddingBottom: "clamp(4.5rem,7vw,6rem)", textAlign: "center" }}>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
          Licensed physicians · State-licensed 503A pharmacies · Prescription required · One dashboard
        </p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.2vw,44px)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "1.4rem auto 0", lineHeight: 1.12 }}>
          The consultation carries no charge. <em style={{ color: "var(--nx-cobalt)" }}>You pay only if prescribed.</em>
        </h2>
        <Link
          href="/assessment"
          data-testid={`${world}-close-cta`}
          className="nx-cta-cobalt"
          style={{ fontSize: "var(--nx-t-base)", padding: "14px 28px", marginTop: "1.6rem" }}
        >
          Start your assessment
        </Link>
      </section>
    </SiteLayout>
  );
}
