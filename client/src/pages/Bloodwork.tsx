import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { anchor } from "@/lib/anchors";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, faqJsonLd, breadcrumbJsonLd, orgJsonLd } from "@/lib/seo";
import { BiomarkerCard } from "@/components/BiomarkerCard";
import { BIOMARKERS } from "@/data/biomarkers";
import {
  BIOMARKER_PANEL,
  PANEL_TOTAL_MARKERS,
  PANEL_CATEGORY_COUNT,
} from "@/data/biomarkerPanel";
import { PANELS, FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { Link } from "wouter";
import { ArrowRight, Check, Activity, Brain, Shield, Apple, Droplet, Stethoscope, RefreshCw, FlaskConical, ClipboardCheck, TestTube } from "lucide-react";
import { FONT, S } from "@/lib/typography";
import {
  PANEL_ART,
  PANEL_TINTS,
  HERO_SAMPLE_ROWS,
  RESULTS_ROWS,
  SURFACE_PILLS,
  BLOODWORK_FAQ_ITEMS,
} from "@/data/bloodworkContent";

const NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums lining-nums",
  fontFeatureSettings: "'tnum'",
};

/* ══════════════════════════════════════════════════════════════
   HERO — data-hero pattern, dark cobalt, benefit-led
   ══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      data-testid="bloodwork-hero"
      className="nx-gradient-hero-dark relative overflow-hidden" style={{ color: "var(--nx-ceramic)" }}
    >
      {/* (Decorative hero score ring removed — it was absolutely positioned
          over the right column and collided with the Live-panel glass card
          at every desktop width.) */}
      <div
        className="nx-container"
        style={{ paddingTop: "clamp(4rem, 8vw, 7rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}
      >
        <div
          style={{ display: "grid", gap: "3rem", alignItems: "end" }}
          className="md:grid-cols-[1.1fr_0.9fr]"
        >
          <Reveal>
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <span className="nx-icon-circle on-dark" aria-hidden>
                  <Droplet size={19} strokeWidth={1.9} />
                </span>
              </div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-acid)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ width: 28, height: 1, backgroundColor: "var(--nx-acid)" }} />
                Your bloodwork
              </p>
              <h1
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(2.4rem, 5.4vw, 4.4rem)",
                  lineHeight: 0.98,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  marginBottom: "1.5rem",
                }}
              >
                See what's driving your results
                <br />
                <span style={{ color: "var(--nx-acid)" }}>before you start.</span>
              </h1>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
                  lineHeight: 1.55,
                  color: "rgba(246, 249, 252,0.75)",
                  maxWidth: 520,
                  marginBottom: "2rem",
                }}
              >
                {PANEL_TOTAL_MARKERS} biomarkers across {PANEL_CATEGORY_COUNT} panels, re-drawn every 90 days —
                signals of 1,000+ conditions before symptoms surface. Every Nexphoria protocol
                starts here and adjusts every quarter against your own numbers.
              </p>
              <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                <StartIntakeButton
                  source="bloodwork-hero"
                  variant="primary"
                  size="lg"
                >
                  Start your assessment
                </StartIntakeButton>
                <Link
                  href="/science"
                  data-testid="bloodwork-hero-cta-science"
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-sm)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: "var(--nx-ceramic)",
                    padding: "0.9rem 1.4rem",
                    border: "1px solid rgba(246, 249, 252,0.28)",
                    borderRadius: "var(--nx-r-pill)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  See the science <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>

              <div
                className="grid grid-cols-3"
                style={{ gap: 12, marginTop: "3rem", maxWidth: 560 }}
              >
                {[
                  { n: `${PANEL_TOTAL_MARKERS}+`, l: "Biomarkers" },
                  { n: PANEL_CATEGORY_COUNT.toString(), l: "Panels" },
                  { n: "90d", l: "Retest cadence" },
                ].map((k) => (
                  <div key={k.l} className="nx-stat-card on-dark">
                    <span className="nx-stat-num" style={NUM}>{k.n}</span>
                    <span className="nx-stat-lbl">{k.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right-side glass card: sample vial-panel readout */}
          <Reveal delay={0.1}>
            <div
              style={{
                background:
                  "linear-gradient(160deg, rgba(246, 249, 252,0.06) 0%, rgba(246, 249, 252,0.02) 100%)",
                border: "1px solid rgba(246, 249, 252,0.14)",
                borderRadius: "var(--nx-r-md)",
                padding: "1.6rem 1.6rem 1.4rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(246, 249, 252,0.55)",
                  }}
                >
                  Live panel · sample
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 500,
                    color: "var(--nx-acid)",
                    letterSpacing: "0.02em",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "var(--nx-r-pill)",
                      backgroundColor: "var(--nx-acid)",
                      display: "inline-block",
                    }}
                  />
                  Optimal band
                </div>
              </div>

              {HERO_SAMPLE_ROWS.map((r, i) => (
                <div
                  key={r.m}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr auto",
                    alignItems: "center",
                    padding: "0.7rem 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(246, 249, 252,0.09)",
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-sm)",
                  }}
                >
                  <div style={{ color: "rgba(246, 249, 252,0.9)", fontWeight: 500 }}>{r.m}</div>
                  <div style={{ ...NUM, color: "rgba(246, 249, 252,0.7)" }}>
                    {r.v} <span style={{ fontSize: "var(--nx-t-xs)", opacity: 0.6 }}>{r.u}</span>
                  </div>
                  <div
                    style={{
                      ...NUM,
                      color: "var(--nx-acid)",
                      fontWeight: 500,
                      fontSize: "var(--nx-t-xs)",
                    }}
                  >
                    {r.d}
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: "1.1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(246, 249, 252,0.09)",
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  color: "rgba(246, 249, 252,0.5)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.5,
                }}
              >
                Illustrative 90-day trajectory · partner laboratory · reviewed by a Nexphoria
                physician
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Cinematic lab — living proof band (Higgsfield kling3.0) ── */}
      <div className="nx-container" style={{ paddingBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
        <div className="relative overflow-hidden" style={{ borderRadius: "var(--nx-r-lg)", boxShadow: "var(--nx-e-4)" }} data-testid="bloodwork-video-band">
          <video autoPlay muted loop playsInline
            src="img/img_6d36ae1989c8.mp4"
            poster="img/img_b9ec00db43d6.webp"
            className="w-full h-auto block" style={{ aspectRatio: "16 / 7", objectFit: "cover" }}
            aria-label="Partner-laboratory lab work — every 90 days" />
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 62%, rgba(21, 24, 28,0.30))" }} />
          <p className="absolute left-6 bottom-4 md:left-8 md:bottom-5" style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(16px, 2vw, 24px)", color: "var(--nx-bg)", textShadow: "0 2px 16px rgba(21, 24, 28,0.45)", margin: 0 }}>
            Your numbers, every 90 days.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TRUST ROW — calm single-row operating facts, straight after hero.
   Claims are limited to what is true for Nexphoria: licensed physicians,
   503A pharmacy, prescription-gated, lab-monitored. No CLIA/CAP/FDA.
   ══════════════════════════════════════════════════════════════ */
function TrustRow() {
  const items = [
    { Icon: Stethoscope, label: "Licensed U.S. physicians" },
    { Icon: FlaskConical, label: "503A compounding pharmacy" },
    { Icon: ClipboardCheck, label: "Prescription required" },
    { Icon: TestTube, label: "Lab-monitored results" },
  ];
  return (
    <section
      aria-label="How Nexphoria operates"
      data-testid="bloodwork-trust-row"
      style={{
        background: "var(--nx-ceramic)",
        borderBottom: "1px solid var(--nx-border)",
      }}
    >
      <div
        className="nx-container"
        style={{ paddingTop: "1.4rem", paddingBottom: "1.4rem" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.9rem 2.4rem",
          }}
        >
          {items.map(({ Icon, label }) => (
            <span
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: FONT,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--nx-fg-graphite)",
              }}
            >
              <Icon size={15} strokeWidth={1.8} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FILTER CHIPS + CATEGORY GRID — Hims-Labs pattern
   ══════════════════════════════════════════════════════════════ */
function PanelExplorer() {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(() => {
    if (active === "all") return BIOMARKER_PANEL;
    return BIOMARKER_PANEL.filter((c) => c.id === active);
  }, [active]);

  const chips = [
    { id: "all", name: "All panels" },
    ...BIOMARKER_PANEL.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <section
      data-testid="bloodwork-panel-explorer"
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
    >
      <div className="nx-container">
        <div className="nx-divider-ornament" aria-hidden style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}><i /></div>
        {/* Section header */}
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 720 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--nx-fg-graphite)",
                marginBottom: "1rem",
              }}
            >
              What we measure
            </p>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                color: "var(--nx-fg)",
                marginBottom: "0.9rem",
              }}
            >
              {PANEL_TOTAL_MARKERS} markers. {PANEL_CATEGORY_COUNT} systems. One clear picture.
            </h2>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                lineHeight: 1.6,
                color: "var(--nx-fg-graphite)",
              }}
            >
              Annual physicals measure a handful of basic markers. Our panel goes further — from
              cardiovascular risk to hormone balance to a 21-factor biological-age composite — so
              your protocol is calibrated to your chemistry, not a population average.
            </p>
          </div>
        </Reveal>

        {/* Filter chips */}
        <div
          role="tablist"
          aria-label="Biomarker categories"
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid var(--nx-border)",
          }}
        >
          {chips.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                data-testid={`chip-${c.id}`}
                onClick={() => setActive(c.id)}
                className="nx-filter-chip"
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-sm)",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  // active state stays this page's ink-dark look; inactive
                  // inherits the class so its hover can actually fire
                  ...(isActive ? { backgroundColor: "var(--nx-fg)", color: "var(--nx-ceramic)", borderColor: "var(--nx-fg)" } : {}),
                }}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Category grid */}
        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {visible.map((cat) => (
            <Reveal key={cat.id}>
              <article
                data-testid={`panel-card-${cat.id}`}
                className="nx-glass-card"
                style={{
                  padding: "1.5rem 1.4rem",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 320,
                }}
              >
                {PANEL_ART[cat.id] && (
                  <span className="relative block overflow-hidden -mt-1 mb-4" style={{ borderRadius: "var(--nx-r-md)", aspectRatio: "4 / 3", background: "var(--nx-ice)" }}>
                    <img src={PANEL_ART[cat.id]} alt="" aria-hidden loading="lazy"
                      className="w-full h-full transition-transform duration-700"
                      style={{ objectFit: "cover" }} />
                    <span className="absolute inset-0 flex items-end p-3" style={{ background: "linear-gradient(180deg, rgba(10,20,35,0) 52%, rgba(10,20,35,0.58))" }}>
                      <span style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>{cat.eyebrow}</span>
                    </span>
                  </span>
                )}
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.9rem" }}>
                  <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div>
                                        <h3
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
                        letterSpacing: "-0.01em",
                        fontWeight: 500,
                        color: "var(--nx-fg)",
                      }}
                    >
                      {cat.name}
                    </h3>
                  </div>
                  </div>
                  <div
                    style={{
                      ...NUM,
                      fontFamily: FONT,
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 500,
                      color: "var(--nx-fg-graphite)",
                      padding: "0.25rem 0.55rem",
                      border: "1px solid var(--nx-border)",
                      borderRadius: "var(--nx-r-pill)",
                    }}
                  >
                    {cat.count} markers
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-sm)",
                    lineHeight: 1.55,
                    color: "var(--nx-fg-graphite)",
                    marginBottom: "1rem",
                    minHeight: 70,
                  }}
                >
                  {cat.blurb}
                </p>

                {/* Biomarker chips — every marker as a calm, flat pill */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0.9rem 0 0",
                    marginTop: "auto",
                    borderTop: "1px solid var(--nx-border)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    flex: 1,
                    alignContent: "flex-start",
                  }}
                >
                  {cat.markers.map((m) => (
                    <li
                      key={m.name}
                      style={{
                        fontFamily: FONT,
                        fontSize: "var(--nx-t-xs)",
                        fontWeight: 500,
                        lineHeight: 1.25,
                        letterSpacing: "0.01em",
                        color: "var(--nx-fg-graphite)",
                        background: "var(--nx-bg)",
                        border: "1px solid var(--nx-border)",
                        borderRadius: "var(--nx-r-pill)",
                        padding: "0.32rem 0.72rem",
                      }}
                    >
                      {m.name.split(" (")[0]}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Explainer strip */}
        <Reveal>
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              backgroundColor: "var(--nx-ceramic)",
              border: "1px solid var(--nx-border)",
              borderRadius: "var(--nx-r-md)",
              display: "grid",
              gap: "1.25rem",
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-[auto_1fr]"
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: "clamp(2.6rem, 4.5vw, 3.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "var(--nx-fg)",
                lineHeight: 0.9,
                ...NUM,
              }}
            >
              1,000+
            </div>
            <div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-graphite)",
                  marginBottom: "0.5rem",
                }}
              >
                What a full panel catches
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                  lineHeight: 1.55,
                  color: "var(--nx-fg)",
                }}
              >
                Biomarkers are measurable indicators in your blood that signal how well every
                system is functioning. Track them over time and you catch drift early, prove
                progress, and adjust dose before an issue becomes a diagnosis.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   LIVE TRAJECTORY — the real BiomarkerCard set
   ══════════════════════════════════════════════════════════════ */
function LiveTrajectory() {
  return (
    <section
      data-testid="bloodwork-live"
      className="nx-section"
      style={{
        backgroundColor: "var(--nx-bg-dark)",
        color: "var(--nx-ceramic)",
      }}
    >
      <div className="nx-container">
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 640 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--nx-acid)",
                marginBottom: "1rem",
              }}
            >
              Protocol results
            </p>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                marginBottom: "0.9rem",
              }}
            >
              Ninety days. Six data points. Every marker moving.
            </h2>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                lineHeight: 1.6,
                color: "rgba(246, 249, 252,0.7)",
              }}
            >
              Illustrative trajectory of one Nexphoria patient across the first quarter — reference
              range, current value, direction of travel, and clinical interpretation on every card.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {BIOMARKERS.slice(0, 8).map((b) => (
            <Reveal key={b.name}>
              <BiomarkerCard m={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOW IT WORKS — 3 numbered steps
   ══════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const STEPS = [
    {
      n: "01",
      Icon: Droplet,
      title: "Baseline draw",
      body: `A ${PANEL_TOTAL_MARKERS}-marker panel through a CLIA-certified partner laboratory before a single dose. Walk into any of 2,000+ centers or use the at-home collection kit.`,
    },
    {
      n: "02",
      Icon: Stethoscope,
      title: "Physician-reviewed protocol",
      body: "A board-certified physician reads every marker against your goals — not a population average — and prescribes the peptides and doses your chemistry calls for.",
    },
    {
      n: "03",
      Icon: RefreshCw,
      title: "90-day recheck",
      body: "The panel repeats every quarter. We track each marker against your own baseline and adjust dose the moment a value drifts outside its target band.",
    },
  ];
  return (
    <section
      data-testid="bloodwork-how"
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
    >
      <div className="nx-container">
        <div className="nx-divider-ornament" aria-hidden style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}><i /></div>
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 620 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--nx-fg-graphite)",
                marginBottom: "1rem",
              }}
            >
              How it works
            </p>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                color: "var(--nx-fg)",
              }}
            >
              Prove it, prescribe it, retest it.
            </h2>
          </div>
        </Reveal>

        <div className="nx-timeline">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div
                className="nx-timeline-step"
                style={{ paddingBottom: i < STEPS.length - 1 ? "clamp(1.6rem,3vw,2.2rem)" : 0 }}
              >
                <span className="nx-timeline-node" aria-hidden>{s.n}</span>
                <div
                  data-testid={`how-step-${s.n}`}
                  className="nx-glass-tile"
                  style={{ display: "block" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.7rem" }}>
                    <span className="nx-icon-circle" aria-hidden>
                      <s.Icon size={19} strokeWidth={1.9} />
                    </span>
                    <h3
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--nx-fg)",
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: "var(--nx-t-sm)",
                      lineHeight: 1.55,
                      color: "var(--nx-fg-graphite)",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WHY IT MATTERS — 4 value tiles
   ══════════════════════════════════════════════════════════════ */
function WhyItMatters() {
  const V = [
    {
      k: "Signal, not vibes",
      v: `${PANEL_TOTAL_MARKERS} lab values — not a symptom questionnaire — decide your protocol.`,
    },
    {
      k: "Baseline you own",
      v: "Every trend is measured against your own numbers, not a population average.",
    },
    {
      k: "Adjusted quarterly",
      v: "Dose changes are triggered by data. Every 90 days the loop closes.",
    },
    {
      k: "Safety floor",
      v: "Liver, kidney, and blood panels rule out risk before a single peptide is prescribed.",
    },
  ];
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-ceramic)" }}
    >
      <div className="nx-container">
        <Reveal>
          <div
            style={{
              display: "grid",
              gap: "1.25rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {V.map((v) => (
              <div
                key={v.k}
                data-testid={`why-tile-${v.k.toLowerCase().replace(/\s+/g, "-")}`}
                className="nx-feature-card edge-top"
                style={{
                  background: "var(--nx-bg)",
                  padding: "1.5rem 1.4rem",
                  minHeight: 170,
                }}
              >
                <Check
                  size={18}
                  strokeWidth={2}
                  style={{ color: "var(--nx-cobalt)", marginBottom: "0.75rem" }}
                />
                <h3
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-base)",
                    fontWeight: 500,
                    letterSpacing: "-0.005em",
                    color: "var(--nx-fg)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {v.k}
                </h3>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "var(--nx-t-sm)",
                    lineHeight: 1.5,
                    color: "var(--nx-fg-graphite)",
                  }}
                >
                  {v.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══ PANEL TIERS — Basic / Full / Elite pricing + stack→panel mapping (merged from BloodPanels) ══ */
function PanelTiers() {
  // which tier do most protocols gate on?
  const demand: Record<string, number> = {};
  FLAGSHIP_STACKS.forEach((st) => { demand[st.panel] = (demand[st.panel] ?? 0) + 1; });
  const mostRequired = Object.entries(demand).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <section id="tiers" className="nx-section" style={{ background: "var(--nx-bg-cream)" }}>
      <div className="nx-container">
        <p className="nx-eyebrow">Panel tiers</p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(34px,5vw,66px)", lineHeight: 1.08, color: "var(--nx-fg)", maxWidth: "18ch", marginTop: "0.7rem" }}>
          Nothing is prescribed <em style={{ fontStyle: "italic", color: "var(--nx-cobalt)" }}>before it's measured.</em>
        </h2>
        <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1rem" }}>
          Every protocol is gated on the right panel — drawn at baseline, then retested on a fixed schedule so a physician can read the trend, not a snapshot.
        </p>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-3" style={{ gap: 14, alignItems: "stretch" }}>
          {PANELS.map((p, i) => {
            const hot = p.tier === mostRequired;
            const depth = PANELS.slice(0, i + 1).reduce((n, q) => n + q.adds.length, 0);
            const maxDepth = PANELS.reduce((n, q) => n + q.adds.length, 0);
            return (
            <Reveal key={p.tier} delay={i * 70}>
              <div className="nx-glass-tile" style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", border: hot ? "1.5px solid var(--nx-cobalt)" : undefined }}>
                {hot && (
                  <p style={{ position: "absolute", top: 14, right: 16, fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--nx-cobalt)" }} data-testid="panel-most-required">
                    Most protocols gate here
                  </p>
                )}
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{p.tier}</p>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,3.4vw,34px)", color: "var(--nx-fg)", marginTop: "0.3rem", lineHeight: 1 }}>{usd(p.price)}</p>
                {p.freeWith && <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", color: "var(--nx-cobalt)", fontWeight: 600, marginTop: 4 }}>{p.freeWith}</p>}
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.7rem" }}>{p.summary}</p>
                <div style={{ marginTop: "1rem", flex: 1 }}>
                  {i > 0 && (
                    <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: 8 }}>
                      Everything in {PANELS[i - 1].tier}, plus:
                    </p>
                  )}
                  {p.adds.map((a) => (
                    <div key={a} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 7 }}>
                      <Check size={15} strokeWidth={2.4} style={{ color: "var(--nx-cobalt)", marginTop: 3, flexShrink: 0 }} />
                      <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)" }}>{a}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1rem" }} aria-hidden>
                  <div style={{ height: 4, borderRadius: "var(--nx-r-pill)", background: "var(--nx-border)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.round((depth / maxDepth) * 100)}%`, background: "var(--nx-cobalt)", borderRadius: "var(--nx-r-pill)" }} />
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: 5 }}>Cumulative depth · {depth} marker groups</p>
                </div>
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "0.8rem", borderTop: "1px solid var(--nx-border)", paddingTop: "0.8rem" }}>
                  Retest: {p.retest}
                </p>
              </div>
            </Reveal>
          );})}
        </div>

        {/* stack → panel mapping */}
        <div className="mt-12">
          <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.4vw,34px)", color: "var(--nx-fg)" }}>Which protocol needs which panel</h3>
          <div style={{ borderTop: "1px solid var(--nx-border)", marginTop: "1rem" }}>
            {FLAGSHIP_STACKS.map((s) => (
              <Link key={s.slug} href={`/stacks/${s.slug}`} className="grid grid-cols-[1fr_auto] gap-4 py-3.5" style={{ borderBottom: "1px solid var(--nx-border)", textDecoration: "none", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{s.name}</p>
                  <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)" }}>{s.category}</p>
                </div>
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)" }}>{s.panel}{s.panelNote && s.panelNote.includes("plus") ? " +" : ""} panel</p>
              </Link>
            ))}
          </div>
          <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "1.4rem", maxWidth: "60ch" }}>
            Draws are handled through an at-home collection partner. Your results populate one dashboard and are read by your physician before anything is prescribed or adjusted.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   DEFAULT EXPORT
   ══════════════════════════════════════════════════════════════ */
export default function Bloodwork() {
  // Shared page: follow the visitor's chosen world so the outcome
  // photography matches the palette SiteLayout already applies.
  const [loc] = useLocation();
  const world = resolveWorld(loc);
  useSeo({
    title: `Peptide therapy bloodwork — ${PANEL_TOTAL_MARKERS} biomarkers, every 90 days`,
    description: `${PANEL_TOTAL_MARKERS} biomarkers across ${PANEL_CATEGORY_COUNT} partner-laboratory panels. Calibrate your protocol to your chemistry, not a population average. Results appear in your portal after physician review.`,
    path: "/bloodwork",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Bloodwork",
        description: `${PANEL_TOTAL_MARKERS} biomarkers. Every Nexphoria protocol is calibrated to your chemistry and retested every 90 days via a partner laboratory.`,
        path: "/bloodwork",
        type: "MedicalWebPage",
      }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Bloodwork", path: "/bloodwork" }]),
      faqJsonLd(BLOODWORK_FAQ_ITEMS),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content">
        <Hero />
        <TrustRow />
        <SectionPills />
        <SystemsMosaic />
        <ResultsDashboard />
        <ActionPlan world={world} />
        <GlowingBody world={world} />
        <OfferStack />
        <PanelTiers />
        <MarkerWall />
        <div id="explore" />
        <PanelExplorer />
        <LiveTrajectory />
        <HowItWorks />
        <WhyItMatters />
        <FinalCTAStrip
          title="Every protocol starts with proof."
          sub={`A physician reviews all ${PANEL_TOTAL_MARKERS} markers before a single dose is prescribed. Book your panel in five minutes.`}
        />
      </main>
    </SiteLayout>
  );
}

/* ══ SYSTEMS MOSAIC — twelve warm-tinted windows ══ */
function SystemsMosaic() {
  return (
    <section id="panel" className="nx-section" style={{ background: "var(--nx-bg)" }}>
      <div className="nx-container">
        <p className="nx-eyebrow">The panel</p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(34px,5vw,66px)", lineHeight: 1.08, color: "var(--nx-fg)", maxWidth: "18ch", marginTop: "0.7rem" }}>
          One draw. <em style={{ fontStyle: "italic", color: "var(--nx-amber)" }}>Eleven</em> windows into you.
        </h2>
        <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BIOMARKER_PANEL.map((cat) => {
            const [bg, ink] = PANEL_TINTS[cat.id] ?? PANEL_TINTS["bio-age"];
            return (
              <a key={cat.id} href={anchor("#explore")} className="group block no-underline overflow-hidden" style={{ background: bg, borderRadius: "var(--nx-r-md)", padding: 10 }} data-testid={`mosaic-${cat.id}`}>
                <span className="block overflow-hidden" style={{ borderRadius: "var(--nx-r-md)", aspectRatio: "1 / 1" }}>
                  <img src={PANEL_ART[cat.id]} alt="" aria-hidden loading="lazy" className="w-full h-full transition-transform duration-700 group-hover:scale-[1.05]" style={{ objectFit: "cover" }} />
                </span>
                <span className="block px-1.5 pt-2.5 pb-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-body)", color: "var(--nx-fg)" }}>{cat.name}</span>
                    <span style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: ink, whiteSpace: "nowrap" }}>{cat.markers.length} markers</span>
                  </span>
                  <span className="block mt-0.5" style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", lineHeight: 1.4, color: ink, opacity: 0.85 }}>
                    {cat.markers.slice(0, 2).map((m) => m.name.split(" (")[0]).join(" · ")}
                  </span>
                </span>
              </a>
            );
          })}
          <a href="assessment" className="group flex flex-col justify-between no-underline" style={{ background: "var(--nx-fg)", borderRadius: "var(--nx-r-md)", padding: "1.1rem 1.05rem" }} data-testid="mosaic-cta">
            <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.15, color: "var(--nx-bg)" }}>
              Re-tested every <em style={{ fontStyle: "italic", color: "var(--nx-acid)" }}>90 days.</em>
            </span>
            <span className="inline-flex items-center gap-1.5 mt-4" style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-acid)" }}>
              Book your baseline <ArrowRight size={14} strokeWidth={2.2} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══ RESULTS DASHBOARD — rendered live, not a screenshot ══ */
function ResultsDashboard() {
  const rows = RESULTS_ROWS;
  const spark = [96, 91, 82, 72];
  const pts = spark.map((v, i) => `${20 + i * 86},${104 - (v - 60) * 1.6}`).join(" ");
  return (
    <section id="results" className="nx-section" style={{ background: "var(--nx-fg)" }}>
      <div className="nx-container">
        <p className="nx-eyebrow" style={{ color: "rgba(243, 245, 247,0.55)" }}>Your results</p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(34px,5vw,66px)", lineHeight: 1.08, color: "var(--nx-bg)", marginTop: "0.7rem" }}>
          Not a PDF. <em style={{ fontStyle: "italic", color: "var(--nx-acid)" }}>A plan.</em>
        </h2>
        <div className="mt-9 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <div style={{ background: "rgba(243, 245, 247,0.05)", border: "1px solid rgba(243, 245, 247,0.1)", borderRadius: "var(--nx-r-lg)", padding: "1.4rem 1.5rem", backdropFilter: "blur(8px)" }}>
            {rows.map((r) => {
              const pct = ((r.v - r.lo) / (r.hi - r.lo)) * 100;
              const oL = ((r.opt[0] - r.lo) / (r.hi - r.lo)) * 100, oW = ((r.opt[1] - r.opt[0]) / (r.hi - r.lo)) * 100;
              return (
                <div key={r.m} className="py-3.5" style={{ borderBottom: "1px solid rgba(243, 245, 247,0.08)" }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span style={{ fontFamily: FONT, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-bg)" }}>{r.m}</span>
                    <span style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: r.s === "Watch" ? "var(--nx-accent)" : "var(--nx-success)" }}>{r.s} · {r.v} {r.unit}</span>
                  </div>
                  <div className="relative mt-2.5" style={{ height: 6, borderRadius: "var(--nx-r-pill)", background: "rgba(243, 245, 247,0.12)" }}>
                    <span className="absolute top-0 h-full" style={{ left: oL + "%", width: oW + "%", borderRadius: "var(--nx-r-pill)", background: "rgba(243, 245, 247,0.28)" }} />
                    <span className="absolute nx-pulse-dot" style={{ left: `calc(${pct}% - 6px)`, top: -3, width: 12, height: 12, borderRadius: "var(--nx-r-pill)", background: "var(--nx-acid)" }} data-pulse />
                  </div>
                </div>
              );
            })}
            <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", color: "rgba(243, 245, 247,0.4)", marginTop: "0.9rem" }}>Illustration of the member dashboard.</p>
          </div>
          <div style={{ background: "rgba(243, 245, 247,0.05)", border: "1px solid rgba(243, 245, 247,0.1)", borderRadius: "var(--nx-r-lg)", padding: "1.4rem 1.5rem", backdropFilter: "blur(8px)" }}>
            <div className="flex items-baseline justify-between">
              <span style={{ fontFamily: FONT, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-bg)" }}>ApoB · 12 months</span>
              <span style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 700, color: "var(--nx-success)" }}>−25%</span>
            </div>
            <svg viewBox="0 0 300 120" className="mt-4 w-full" style={{ height: 120 }}>
              <polyline className="nx-spark" pathLength={100} points={pts} fill="none" stroke="var(--nx-acid)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {spark.map((v, i) => (
                <circle key={i} cx={20 + i * 86} cy={104 - (v - 60) * 1.6} r="4" fill="var(--nx-fg)" stroke="var(--nx-acid)" strokeWidth="2" />
              ))}
            </svg>
            <div className="flex justify-between" style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", color: "rgba(243, 245, 247,0.45)" }}>
              <span>Baseline</span><span>Q2</span><span>Q3</span><span>Q4</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "rgba(243, 245, 247,0.75)", marginTop: "1rem" }}>
              Every 90 days your physician reviews the trend — and adjusts the protocol against it. Numbers first. Always.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ OFFER STACK — the close ══ */
function OfferStack() {
  const items = [
    `${PANEL_TOTAL_MARKERS} biomarkers across 11 systems — heart to biological age`,
    "Every marker reviewed by a U.S.-licensed physician",
    "A written action plan, not a raw lab report",
    "Re-tested every 90 days to prove what's working",
    "Draw at 2,000+ partner locations, on your schedule",
  ];
  return (
    <section id="offer" className="nx-section" style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-border)" }}>
      <div className="nx-container">
        <div className="nx-glass-card" style={{ padding: "clamp(2rem,4.5vw,3.4rem)" }}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,3.8vw,46px)", lineHeight: 1.1, color: "var(--nx-fg)" }}>
                Everything your body has been <em style={{ fontStyle: "italic", color: "var(--nx-amber)" }}>trying to tell you.</em>
              </h2>
              <ul className="mt-6 flex flex-col gap-2.5 list-none m-0 p-0">
                {items.map((t) => (
                  <li key={t} className="flex gap-2.5 items-start" style={{ fontFamily: FONT, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg-graphite)" }}>
                    <Check size={16} strokeWidth={2.4} className="shrink-0 mt-1" style={{ color: "var(--nx-amber)" }} /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)" }}>Included with every protocol. Available standalone.</p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a href="assessment" className="nx-cta-cobalt inline-flex items-center justify-center gap-2" data-testid="offer-cta">
                  Book your baseline panel <ArrowRight size={16} strokeWidth={2.2} />
                </a>
                <a href="how-it-works" className="nx-cta-ghost inline-flex items-center justify-center">See how protocols work</a>
              </div>
              <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-muted)", marginTop: "1.1rem" }}>
                Panels require eligibility review and a physician order. Results inform your protocol; they are not a standalone diagnosis. Availability varies by state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ ACTION PLAN — guidance cards floating over life ══
   World-cast: this shared page inherits [data-world] from the visitor's
   chosen world, so the photography must follow the palette. */
function ActionPlan({ world }: { world: "men" | "women" }) {
  return (
    <section id="plan" className="relative overflow-hidden flex items-center" style={{ minHeight: "82vh" }}>
      <img src={world === "women" ? "img/img_484de9509e9f.webp" : "img/img_beb6d78848a2.webp"} alt="" aria-hidden className="absolute inset-0 w-full h-full" style={{ objectFit: "cover" }} loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(21, 24, 28,0.25) 0%, rgba(21, 24, 28,0.05) 35%, rgba(21, 24, 28,0.62) 100%)" }} />
      <img src="img/img_0354fd0a9688.webp" alt="" aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" style={{ objectFit: "cover", zIndex: 1 }} loading="lazy" />
      {/* zIndex 2: all content paints above BOTH overlay frames — the second
          overlay (zIndex 1) was covering the guidance card at 390px */}
      <div className="nx-container relative" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem", zIndex: 2 }}>
        <div className="flex flex-wrap gap-x-7 gap-y-2" style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-bg)" }}>
          <span className="inline-flex items-center gap-2"><Activity size={16} strokeWidth={2} /> Movement</span>
          <span className="inline-flex items-center gap-2"><Apple size={16} strokeWidth={2} /> Nutrition</span>
          <span className="inline-flex items-center gap-2"><Brain size={16} strokeWidth={2} /> Recovery</span>
          <span className="inline-flex items-center gap-2"><Shield size={16} strokeWidth={2} /> Protocol</span>
        </div>
        <div className="relative mt-10 max-w-xl">
          <div className="absolute left-3 right-3 -bottom-3 h-full" style={{ background: "rgba(243, 245, 247,0.45)", borderRadius: "var(--nx-r-md)", filter: "blur(0.5px)" }} aria-hidden />
          <div className="relative nx-rise" style={{ background: "var(--nx-ceramic)", borderRadius: "var(--nx-r-md)", padding: "1.3rem 1.5rem", boxShadow: "var(--nx-e-4)" }}>
            <div className="flex items-center justify-between gap-4">
              <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-body)", lineHeight: 1.5, color: "var(--nx-fg)", fontWeight: 500, margin: 0 }}>
                Front-load protein within an hour of waking — steadier glucose, stronger recovery.
              </p>
              <ArrowRight size={18} strokeWidth={2} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
            </div>
            <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-amber)", marginTop: 8 }}>Supports 6 metabolic markers</p>
          </div>
        </div>
        <div className="relative" style={{ marginTop: "4.5rem", zIndex: 2 }}>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(30px,4.6vw,56px)", lineHeight: 1.06, color: "var(--nx-bg)", maxWidth: "14ch" }}>
            Doctor-developed. <em style={{ fontStyle: "italic", color: "var(--nx-acid)" }}>You</em>-specific.
          </h2>
          <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "rgba(243, 245, 247,0.85)", maxWidth: "48ch", marginTop: "0.9rem" }}>
            Every panel becomes a written plan — movement, nutrition, recovery, and if appropriate, a prescribed protocol. Reviewed against your next draw.
          </p>
          <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", color: "rgba(243, 245, 247,0.5)", marginTop: "1.2rem" }}>Illustration of member guidance.</p>
        </div>
      </div>
    </section>
  );
}

/* ══ GLOWING BODY — what one draw can surface ══ */
function GlowingBody({ world }: { world: "men" | "women" }) {
  return (
    <section id="surface" className="relative overflow-hidden" style={{ background: "var(--nx-bg-dark)" }}>
      <div className="nx-container relative" style={{ paddingTop: "5.5rem", paddingBottom: "5rem" }}>
        <div className="relative mx-auto" style={{ maxWidth: 880 }}>
          <img src={world === "women" ? "img/img_f04642b4a1f1.webp" : "img/img_af00f66cbf20.webp"} alt="" aria-hidden className="w-full" style={{ display: "block", borderRadius: "var(--nx-r-lg)" }} loading="lazy" />
          {SURFACE_PILLS.map((p, pi) => (
            <span key={p.t} className="hidden sm:inline-block absolute nx-float" style={{ left: p.x, top: p.y, fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: p.hot ? "var(--nx-bg)" : "rgba(243, 245, 247,0.4)", border: `1px solid ${p.hot ? "rgba(243, 245, 247,0.55)" : "rgba(243, 245, 247,0.18)"}`, borderRadius: "var(--nx-r-pill)", padding: "8px 16px", background: "rgba(22, 27, 32,0.35)", backdropFilter: "blur(6px)", animationDelay: `${pi * 0.55}s` }}>
              {p.t}
            </span>
          ))}
          <span className="absolute left-1/2 -translate-x-1/2 nx-pulse-chip" style={{ top: "44%", fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", background: "var(--nx-ceramic)", borderRadius: "var(--nx-r-pill)", padding: "9px 16px", boxShadow: "var(--nx-e-3)", whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: "var(--nx-r-pill)", background: "var(--nx-success)", color: "var(--nx-fg)", textAlign: "center", lineHeight: "16px", fontSize: "var(--nx-t-xs)", marginRight: 8 }}>✓</span>
            All {PANEL_TOTAL_MARKERS} reviewed by a physician
          </span>
        </div>
        {/* Mobile: the floating pills above are hidden below sm — restate
            what the panel surfaces as a wrapped row so phones keep the point */}
        <div className="sm:hidden flex flex-wrap justify-center gap-2 mt-6">
          {SURFACE_PILLS.map((p) => (
            <span key={p.t} style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 500, color: "rgba(243, 245, 247,0.75)", border: "1px solid rgba(243, 245, 247,0.22)", borderRadius: "var(--nx-r-pill)", padding: "7px 13px" }}>
              {p.t}
            </span>
          ))}
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {[["One draw", "5-minute booking, 2,000+ locations"], [`${PANEL_TOTAL_MARKERS} markers`, "heart to biological age"], ["4x a year", "quarterly re-testing keeps you ahead"]].map(([t, s]) => (
            <div key={t} style={{ background: "rgba(243, 245, 247,0.94)", borderRadius: "var(--nx-r-md)", padding: "1.1rem 1.2rem" }}>
              <div style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-cobalt-hover)" }}>{t}</div>
              <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: 4 }}>{s}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", color: "rgba(243, 245, 247,0.45)", marginTop: "1.2rem" }}>
          Lab results alone do not diagnose any condition. Out-of-range markers are conversations to have with your physician.
        </p>
      </div>
    </section>
  );
}

/* ══ MARKER WALL — the language of your body ══ */
function MarkerWall() {
  // Dedupe after stripping parentheticals — "Lymphocytes (absolute count)"
  // and "(percentage)" would otherwise drift past as side-by-side twins.
  const names = Array.from(new Set(BIOMARKER_PANEL.flatMap((c) => c.markers.map((m) => m.name.split(" (")[0]))));
  const rows = [names.slice(0, 5), names.slice(9, 13), names.slice(18, 22), names.slice(27, 31), names.slice(36, 40), names.slice(45, 49), names.slice(54, 58)];
  const ops = [0.16, 0.3, 0.5, 0.75, 0.5, 0.3, 0.16];
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--nx-bg)", padding: "7rem 0" }}>
      <div aria-hidden style={{ textAlign: "center" }}>
        {rows.map((r, i) => (
          <p key={i} className={i % 2 ? "nx-drift reverse" : "nx-drift"} style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,4.6vw,58px)", lineHeight: 1.28, color: "var(--nx-cobalt)", opacity: ops[i], margin: 0, whiteSpace: "nowrap" }}>
            {r.join(",  ")},
          </p>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: "var(--nx-ceramic)", borderRadius: "var(--nx-r-lg)", padding: "1.2rem 1.4rem", boxShadow: "var(--nx-e-4)", minWidth: 260 }}>
        <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", margin: 0 }}>Out of range → In range</p>
        <svg viewBox="0 0 240 70" style={{ width: 240, height: 70, display: "block", marginTop: 8 }}>
          <line x1="30" y1="22" x2="180" y2="48" stroke="var(--nx-amber)" strokeWidth="1.6" strokeDasharray="4 5" />
          <circle cx="30" cy="22" r="7" fill="var(--nx-ceramic)" stroke="var(--nx-rust)" strokeWidth="2.5" />
          <circle cx="180" cy="48" r="9" fill="var(--nx-acid)" stroke="var(--nx-amber)" strokeWidth="2.5" />
          <text x="30" y="64" textAnchor="middle" fill="rgba(21, 24, 28,0.5)" style={{ font: "500 10px " + FONT }}>Baseline</text>
          <text x="180" y="16" textAnchor="middle" fill="rgba(21, 24, 28,0.5)" style={{ font: "500 10px " + FONT }}>90 days</text>
        </svg>
      </div>
    </section>
  );
}

/* ══ Sticky pill sub-nav ══ */
function SectionPills() {
  const items = [["The panel", "#panel"], ["Your results", "#results"], ["Your plan", "#plan"], ["What it surfaces", "#surface"], ["Get started", "#offer"]];
  return (
    <div className="nx-pills" style={{ background: "rgba(243, 245, 247,0.85)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid var(--nx-border)" }}>
      <div className="nx-container flex gap-2 overflow-x-auto" style={{ paddingTop: "10px", paddingBottom: "10px", scrollbarWidth: "none" }}>
        {items.map(([t, h]) => (
          <a key={h} href={anchor(h)} className="whitespace-nowrap no-underline" style={{ fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt-hover)", background: "color-mix(in srgb, var(--nx-cobalt) 16%, transparent)", border: "1px solid color-mix(in srgb, var(--nx-cobalt) 26%, transparent)", borderRadius: "var(--nx-r-pill)", padding: "12px 15px" }}>
            {t}
          </a>
        ))}
      </div>
    </div>
  );
}
