import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/SiteLayout";
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
import { Link } from "wouter";
import { ArrowRight, Check, HeartPulse, Flame, Activity, Brain, Gauge, Droplets, Filter, Shield, Apple, TestTube, Hourglass } from "lucide-react";

/* Organ/system icon map — hims-Labs tile grammar */
const PANEL_ICONS: Record<string, any> = {
  heart: HeartPulse, metabolism: Flame, hormones: Activity, stress: Brain,
  thyroid: Gauge, kidneys: Droplets, liver: Filter, immunity: Shield,
  nutrients: Apple, blood: TestTube, "bio-age": Hourglass,
};

const FONT = "'General Sans', system-ui, sans-serif";
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
      style={{ backgroundColor: "var(--nx-bg-dark)", color: "#FFFFF3" }}
    >
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
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
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
                  color: "rgba(255,255,243,0.75)",
                  maxWidth: 520,
                  marginBottom: "2rem",
                }}
              >
                {PANEL_TOTAL_MARKERS} biomarkers across {PANEL_CATEGORY_COUNT} panels twice a year —
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
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: "#FFFFF3",
                    padding: "0.9rem 1.4rem",
                    border: "1px solid rgba(255,255,243,0.28)",
                    borderRadius: 999,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  See the science <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>

              <div
                style={{
                  marginTop: "3rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem",
                  maxWidth: 560,
                }}
              >
                {[
                  { n: `${PANEL_TOTAL_MARKERS}+`, l: "Biomarkers" },
                  { n: PANEL_CATEGORY_COUNT.toString(), l: "Panels" },
                  { n: "2×/yr", l: "Retest cadence" },
                ].map((k) => (
                  <div key={k.l} style={{ borderTop: "1px solid rgba(255,255,243,0.16)", paddingTop: 12 }}>
                    <div
                      style={{
                        ...NUM,
                        fontFamily: FONT,
                        fontSize: "clamp(1.75rem, 2.4vw, 2rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: "var(--nx-acid)",
                      }}
                    >
                      {k.n}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT,
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,243,0.6)",
                        marginTop: 4,
                      }}
                    >
                      {k.l}
                    </div>
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
                  "linear-gradient(160deg, rgba(255,255,243,0.06) 0%, rgba(255,255,243,0.02) 100%)",
                border: "1px solid rgba(255,255,243,0.14)",
                borderRadius: 16,
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
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,243,0.55)",
                  }}
                >
                  Live panel · sample
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
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
                      borderRadius: "50%",
                      backgroundColor: "var(--nx-acid)",
                      display: "inline-block",
                    }}
                  />
                  Optimal band
                </div>
              </div>

              {[
                { m: "Total Testosterone", v: "742", u: "ng/dL", d: "+69%" },
                { m: "IGF-1", v: "218", u: "ng/mL", d: "+44%" },
                { m: "hs-CRP", v: "0.4", u: "mg/L", d: "−81%" },
                { m: "HbA1c", v: "5.1", u: "%", d: "−0.4" },
                { m: "Vitamin D", v: "62", u: "ng/mL", d: "+29" },
              ].map((r, i) => (
                <div
                  key={r.m}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr auto",
                    alignItems: "center",
                    padding: "0.7rem 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,243,0.09)",
                    fontFamily: FONT,
                    fontSize: 13,
                  }}
                >
                  <div style={{ color: "rgba(255,255,243,0.9)", fontWeight: 500 }}>{r.m}</div>
                  <div style={{ ...NUM, color: "rgba(255,255,243,0.7)" }}>
                    {r.v} <span style={{ fontSize: 11, opacity: 0.6 }}>{r.u}</span>
                  </div>
                  <div
                    style={{
                      ...NUM,
                      color: "var(--nx-acid)",
                      fontWeight: 500,
                      fontSize: 12,
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
                  borderTop: "1px solid rgba(255,255,243,0.09)",
                  fontFamily: FONT,
                  fontSize: 11,
                  color: "rgba(255,255,243,0.5)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.5,
                }}
              >
                Illustrative 90-day trajectory · Quest Diagnostics · reviewed by a Nexphoria
                physician
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Cinematic lab — living proof band (Higgsfield kling3.0) ── */}
      <div className="nx-container" style={{ paddingBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
        <div className="relative overflow-hidden" style={{ borderRadius: "24px", boxShadow: "0 30px 70px -28px rgba(28,24,21,0.5)" }} data-testid="bloodwork-video-band">
          <video autoPlay muted loop playsInline
            src="https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_060612_bafa2a0a-9bcc-400c-8cd3-35fae70369e8.mp4"
            poster="https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_031339_70395d8a-d7d1-4eb0-881e-43d519542b6a.png"
            className="w-full h-auto block" style={{ aspectRatio: "16 / 7", objectFit: "cover" }}
            aria-label="Quest Diagnostics lab work — every 90 days" />
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 62%, rgba(28,24,21,0.30))" }} />
          <p className="absolute left-6 bottom-4 md:left-8 md:bottom-5" style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(16px, 2vw, 24px)", color: "#FAF7F0", textShadow: "0 2px 16px rgba(28,24,21,0.45)", margin: 0 }}>
            Your numbers, every 90 days.
          </p>
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
      style={{
        backgroundColor: "var(--nx-bg)",
        paddingTop: "clamp(3.5rem, 6vw, 5.5rem)",
        paddingBottom: "clamp(3.5rem, 6vw, 5.5rem)",
      }}
    >
      <div className="nx-container">
        {/* Section header */}
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 720 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--nx-ink-2)",
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
                color: "var(--nx-ink)",
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
                color: "var(--nx-ink-2)",
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
            borderBottom: "1px solid var(--nx-line)",
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
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  padding: "0.55rem 1.05rem",
                  borderRadius: 999,
                  border: `1px solid ${isActive ? "var(--nx-ink)" : "var(--nx-line)"}`,
                  backgroundColor: isActive ? "var(--nx-ink)" : "transparent",
                  color: isActive ? "#FFFFF3" : "var(--nx-ink)",
                  cursor: "pointer",
                  transition: "all 200ms cubic-bezier(0.2, 0.65, 0.3, 1)",
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
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.9rem" }}>
                  <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    {(() => { const Ico = PANEL_ICONS[cat.id] ?? Activity; return (
                      <span className="nx-icon-chip" aria-hidden>
                        <Ico size={22} strokeWidth={1.7} />
                      </span>
                    ); })()}
                  <div>
                    <p
                      style={{
                        fontFamily: FONT,
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--nx-ink-2)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {cat.eyebrow}
                    </p>
                    <h3
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
                        letterSpacing: "-0.01em",
                        fontWeight: 500,
                        color: "var(--nx-ink)",
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
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--nx-ink-2)",
                      padding: "0.25rem 0.55rem",
                      border: "1px solid var(--nx-line)",
                      borderRadius: 999,
                    }}
                  >
                    {cat.count} markers
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "var(--nx-ink-2)",
                    marginBottom: "1rem",
                    minHeight: 70,
                  }}
                >
                  {cat.blurb}
                </p>

                {/* Marker list */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    flex: 1,
                  }}
                >
                  {cat.markers.slice(0, 6).map((m) => (
                    <li
                      key={m.name}
                      style={{
                        fontFamily: FONT,
                        fontSize: 12.5,
                        lineHeight: 1.4,
                        color: "var(--nx-ink)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                        padding: "0.35rem 0",
                        borderTop: "1px solid var(--nx-line)",
                      }}
                    >
                      <span>{m.name}</span>
                      {m.note && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "var(--nx-ink-2)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {m.note}
                        </span>
                      )}
                    </li>
                  ))}
                  {cat.markers.length > 6 && (
                    <li
                      style={{
                        fontFamily: FONT,
                        fontSize: 11.5,
                        color: "var(--nx-ink-2)",
                        letterSpacing: "0.02em",
                        padding: "0.35rem 0",
                        borderTop: "1px solid var(--nx-line)",
                      }}
                    >
                      + {cat.markers.length - 6} more
                    </li>
                  )}
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
              backgroundColor: "var(--nx-surface)",
              border: "1px solid var(--nx-line)",
              borderRadius: 12,
              display: "grid",
              gap: "1.25rem",
              gridTemplateColumns: "auto 1fr",
              alignItems: "start",
            }}
            className="md:grid-cols-[auto_1fr]"
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: "clamp(2.6rem, 4.5vw, 3.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "var(--nx-ink)",
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
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-ink-2)",
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
                  color: "var(--nx-ink)",
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
      style={{
        backgroundColor: "var(--nx-bg-dark)",
        color: "#FFFFF3",
        paddingTop: "clamp(4rem, 6vw, 6rem)",
        paddingBottom: "clamp(4rem, 6vw, 6rem)",
      }}
    >
      <div className="nx-container">
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 640 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 11,
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
                color: "rgba(255,255,243,0.7)",
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
      title: "Baseline draw",
      body: `A ${PANEL_TOTAL_MARKERS}-marker panel through Quest Diagnostics before a single dose. Walk into any of 2,500+ centers or use the at-home collection kit.`,
    },
    {
      n: "02",
      title: "Physician-reviewed protocol",
      body: "A board-certified physician reads every marker against your goals — not a population average — and prescribes the peptides and doses your chemistry calls for.",
    },
    {
      n: "03",
      title: "90-day recheck",
      body: "The panel repeats every quarter. We track each marker against your own baseline and adjust dose the moment a value drifts outside its target band.",
    },
  ];
  return (
    <section
      data-testid="bloodwork-how"
      style={{
        backgroundColor: "var(--nx-bg)",
        paddingTop: "clamp(4rem, 6vw, 6rem)",
        paddingBottom: "clamp(4rem, 6vw, 6rem)",
      }}
    >
      <div className="nx-container">
        <Reveal>
          <div style={{ marginBottom: "2.5rem", maxWidth: 620 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--nx-ink-2)",
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
                color: "var(--nx-ink)",
              }}
            >
              Prove it, prescribe it, retest it.
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {STEPS.map((s) => (
            <Reveal key={s.n}>
              <article
                data-testid={`how-step-${s.n}`}
                style={{
                  backgroundColor: "var(--nx-surface)",
                  border: "1px solid var(--nx-line)",
                  borderRadius: 12,
                  padding: "1.75rem 1.5rem",
                  minHeight: 260,
                }}
              >
                <div
                  style={{
                    ...NUM,
                    fontFamily: FONT,
                    fontSize: 40,
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: "var(--nx-acid)",
                    lineHeight: 1,
                    marginBottom: "1.25rem",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--nx-ink)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--nx-ink-2)",
                  }}
                >
                  {s.body}
                </p>
              </article>
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
      style={{
        backgroundColor: "var(--nx-surface)",
        paddingTop: "clamp(4rem, 6vw, 6rem)",
        paddingBottom: "clamp(4rem, 6vw, 6rem)",
      }}
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
                style={{
                  backgroundColor: "var(--nx-bg)",
                  border: "1px solid var(--nx-line)",
                  borderRadius: 12,
                  padding: "1.5rem 1.4rem",
                  minHeight: 170,
                }}
              >
                <Check
                  size={18}
                  strokeWidth={2}
                  style={{ color: "var(--nx-ink)", marginBottom: "0.75rem" }}
                />
                <h3
                  style={{
                    fontFamily: FONT,
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: "-0.005em",
                    color: "var(--nx-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {v.k}
                </h3>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: "var(--nx-ink-2)",
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

/* ══════════════════════════════════════════════════════════════
   DEFAULT EXPORT
   ══════════════════════════════════════════════════════════════ */
/* ── Bloodwork FAQ data ─────────────────────────────────────────── */
const BLOODWORK_FAQ_ITEMS = [
  {
    q: "What bloodwork does Nexphoria require before prescribing?",
    a: "Nexphoria requires a 38-biomarker Quest Diagnostics panel before any prescription is issued. The panel covers hormonal axis markers (testosterone, LH, FSH, estradiol), metabolic markers (HbA1c, fasting insulin, lipid panel), inflammatory markers (hs-CRP, ESR), hepatic function (ALT, AST), and renal function (creatinine, BUN). Your requisition is generated in your member portal after completing the intake assessment.",
  },
  {
    q: "How often are labs required during a Nexphoria subscription?",
    a: "Quest Diagnostics panels are required every 90 days throughout your active subscription. Lab results trigger a physician re-evaluation, at which point dosing may be adjusted or a new compound introduced based on updated biomarkers. Labs are included in all multi-month plans and available as an add-on for monthly subscribers.",
  },
  {
    q: "Who reviews my bloodwork at Nexphoria?",
    a: "Your assigned board-certified physician reviews all Quest Diagnostics results within 24 hours of receipt. Results are never reviewed by algorithms, nurses, or non-physician staff without physician oversight. Your physician responds via secure portal message with a prescription decision, a follow-up question, or a request for additional information.",
  },
  {
    q: "Can I use bloodwork I already have?",
    a: "Your physician may accept CLIA-certified lab results from within the past 30 days in lieu of a new Quest draw, subject to physician discretion. Results must be from an accredited laboratory and include all required panel markers. Bring documentation to your intake assessment for physician review.",
  },
];

export default function Bloodwork() {
  useSeo({
    title: "Peptide therapy bloodwork — 38 biomarkers, every 90 days",
    description: `${PANEL_TOTAL_MARKERS} biomarkers across ${PANEL_CATEGORY_COUNT} Quest Diagnostics panels. Calibrate your protocol to your chemistry, not a population average. Results in your portal within 48 hours. Physician review included.`,
    path: "/bloodwork",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Bloodwork",
        description: `${PANEL_TOTAL_MARKERS} biomarkers. Every Nexphoria protocol is calibrated to your chemistry and retested every 90 days via Quest Diagnostics.`,
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
