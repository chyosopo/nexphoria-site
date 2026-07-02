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

/* Porcelain-kintsugi organ artwork — one per system */
const PANEL_ART: Record<string, string> = {
  "heart": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152043_c505a7ff-5c11-4ace-95c9-7181e35bc8d4.png",
  "metabolism": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152051_874517d2-49c0-4611-a684-1caf378c8fc8.png",
  "hormones": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152059_c0f88e93-bfe0-4f4a-b540-aff3d34350f8.png",
  "stress": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152108_4c838823-37f2-468f-860b-58a4513b3750.png",
  "thyroid": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152115_ac9456e0-62a7-4e9c-8519-c0a62c72ee11.png",
  "kidneys": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152123_9100d54b-9142-46b5-ac02-a436ecce5dfc.png",
  "liver": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152130_a06b685b-6bd6-42c7-bd9b-341833691d72.png",
  "immunity": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152137_9c659ee5-1f32-44e1-8ef5-4be7086fb367.png",
  "nutrients": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152145_e83ce276-f545-4338-bb46-9c605a42e74c.png",
  "blood": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152153_e93d95ec-41d4-48c0-84d7-4564d0ac2f74.png",
  "bio-age": "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152202_0658e816-204c-41ff-8729-419cdf508334.png",
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
                {PANEL_ART[cat.id] && (
                  <span className="block overflow-hidden -mt-1 mb-4" style={{ borderRadius: 14, aspectRatio: "4 / 3", background: "#F7F2EA" }}>
                    <img src={PANEL_ART[cat.id]} alt="" aria-hidden loading="lazy"
                      className="w-full h-full transition-transform duration-700"
                      style={{ objectFit: "cover" }} />
                  </span>
                )}
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.9rem" }}>
                  <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
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
        <SystemsMosaic />
        <ResultsDashboard />
        <ActionPlan />
        <GlowingBody />
        <OfferStack />
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
const TINTS: Record<string, [string, string]> = {
  heart: ["#F6E2DE", "#8A4038"], metabolism: ["#F6E5CE", "#8A5A22"],
  hormones: ["#F7EAD2", "#8B5A2B"], stress: ["#EFDDD0", "#7A452E"],
  thyroid: ["#F7E3D3", "#8A4B2A"], kidneys: ["#EFE9DC", "#6B5B4A"],
  liver: ["#F3EBD3", "#77521B"], immunity: ["#E9E7D2", "#5B5A34"],
  nutrients: ["#E6EAD9", "#4E5B3E"], blood: ["#F6E2DE", "#8A4038"],
  "bio-age": ["#F3E7D2", "#7A4E12"],
};

function SystemsMosaic() {
  return (
    <section className="nx-section" style={{ background: "var(--nx-bg)" }}>
      <div className="nx-container">
        <p className="nx-eyebrow">The panel</p>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,54px)", lineHeight: 1.08, color: "var(--nx-black)", maxWidth: "18ch", marginTop: "0.7rem" }}>
          One draw. <em style={{ fontStyle: "italic", color: "#B97C24" }}>Eleven</em> windows into you.
        </h2>
        <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BIOMARKER_PANEL.map((cat) => {
            const [bg, ink] = TINTS[cat.id] ?? TINTS["bio-age"];
            return (
              <a key={cat.id} href="#explore" className="group block no-underline overflow-hidden" style={{ background: bg, borderRadius: 18, padding: 10 }} data-testid={`mosaic-${cat.id}`}>
                <span className="block overflow-hidden" style={{ borderRadius: 12, aspectRatio: "1 / 1" }}>
                  <img src={PANEL_ART[cat.id]} alt="" aria-hidden loading="lazy" className="w-full h-full transition-transform duration-700 group-hover:scale-[1.05]" style={{ objectFit: "cover" }} />
                </span>
                <span className="block px-1.5 pt-2.5 pb-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 17, color: "var(--nx-black)" }}>{cat.name}</span>
                    <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: ink, whiteSpace: "nowrap" }}>{cat.markers.length} markers</span>
                  </span>
                  <span className="block mt-0.5" style={{ fontFamily: FONT, fontSize: 11.5, lineHeight: 1.4, color: ink, opacity: 0.85 }}>
                    {cat.markers.slice(0, 2).map((m) => m.name.split(" (")[0]).join(" · ")}
                  </span>
                </span>
              </a>
            );
          })}
          <a href="/#/assessment" className="group flex flex-col justify-between no-underline" style={{ background: "var(--nx-black)", borderRadius: 18, padding: "1.1rem 1.05rem" }} data-testid="mosaic-cta">
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 19, lineHeight: 1.15, color: "#FAF7F0" }}>
              Re-tested every <em style={{ fontStyle: "italic", color: "#F3C87A" }}>90 days.</em>
            </span>
            <span className="inline-flex items-center gap-1.5 mt-4" style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 600, color: "#F3C87A" }}>
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
  const rows = [
    { m: "Apolipoprotein B", v: 72, lo: 40, hi: 130, opt: [40, 80], unit: "mg/dL", s: "Optimal" },
    { m: "hs-CRP", v: 0.8, lo: 0, hi: 5, opt: [0, 1], unit: "mg/L", s: "Optimal" },
    { m: "Free T3", v: 3.1, lo: 2.0, hi: 4.4, opt: [3.0, 4.0], unit: "pg/mL", s: "In range" },
    { m: "HbA1c", v: 5.6, lo: 4.0, hi: 7.0, opt: [4.0, 5.4], unit: "%", s: "Watch" },
  ];
  const spark = [96, 91, 82, 72];
  const pts = spark.map((v, i) => `${20 + i * 86},${104 - (v - 60) * 1.6}`).join(" ");
  return (
    <section className="nx-section" style={{ background: "var(--nx-black)" }}>
      <div className="nx-container">
        <p className="nx-eyebrow" style={{ color: "rgba(250,247,240,0.55)" }}>Your results</p>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,54px)", lineHeight: 1.08, color: "#FAF7F0", marginTop: "0.7rem" }}>
          Not a PDF. <em style={{ fontStyle: "italic", color: "#F3C87A" }}>A plan.</em>
        </h2>
        <div className="mt-9 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <div style={{ background: "rgba(250,247,240,0.05)", border: "1px solid rgba(250,247,240,0.1)", borderRadius: 20, padding: "1.4rem 1.5rem", backdropFilter: "blur(8px)" }}>
            {rows.map((r) => {
              const pct = ((r.v - r.lo) / (r.hi - r.lo)) * 100;
              const oL = ((r.opt[0] - r.lo) / (r.hi - r.lo)) * 100, oW = ((r.opt[1] - r.opt[0]) / (r.hi - r.lo)) * 100;
              return (
                <div key={r.m} className="py-3.5" style={{ borderBottom: "1px solid rgba(250,247,240,0.08)" }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 600, color: "#FAF7F0" }}>{r.m}</span>
                    <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: r.s === "Watch" ? "#DE9A3C" : "#A8C69A" }}>{r.s} · {r.v} {r.unit}</span>
                  </div>
                  <div className="relative mt-2.5" style={{ height: 6, borderRadius: 999, background: "rgba(250,247,240,0.12)" }}>
                    <span className="absolute top-0 h-full" style={{ left: oL + "%", width: oW + "%", borderRadius: 999, background: "rgba(168,198,154,0.35)" }} />
                    <span className="absolute nx-pulse-dot" style={{ left: `calc(${pct}% - 6px)`, top: -3, width: 12, height: 12, borderRadius: 999, background: "#F3C87A" }} data-pulse />
                  </div>
                </div>
              );
            })}
            <p style={{ fontFamily: FONT, fontSize: 11, color: "rgba(250,247,240,0.4)", marginTop: "0.9rem" }}>Illustration of the member dashboard.</p>
          </div>
          <div style={{ background: "rgba(250,247,240,0.05)", border: "1px solid rgba(250,247,240,0.1)", borderRadius: 20, padding: "1.4rem 1.5rem", backdropFilter: "blur(8px)" }}>
            <div className="flex items-baseline justify-between">
              <span style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 600, color: "#FAF7F0" }}>ApoB · 12 months</span>
              <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: "#A8C69A" }}>−25%</span>
            </div>
            <svg viewBox="0 0 300 120" className="mt-4 w-full" style={{ height: 120 }}>
              <polyline className="nx-spark" pathLength={100} points={pts} fill="none" stroke="#F3C87A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {spark.map((v, i) => (
                <circle key={i} cx={20 + i * 86} cy={104 - (v - 60) * 1.6} r="4" fill="#1C1815" stroke="#F3C87A" strokeWidth="2" />
              ))}
            </svg>
            <div className="flex justify-between" style={{ fontFamily: FONT, fontSize: 11, color: "rgba(250,247,240,0.45)" }}>
              <span>Baseline</span><span>Q2</span><span>Q3</span><span>Q4</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 13.5, lineHeight: 1.55, color: "rgba(250,247,240,0.75)", marginTop: "1rem" }}>
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
    <section className="nx-section" style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-line)" }}>
      <div className="nx-container">
        <div className="nx-glass-card" style={{ padding: "clamp(2rem,4.5vw,3.4rem)" }}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(28px,3.8vw,46px)", lineHeight: 1.1, color: "var(--nx-black)" }}>
                Everything your body has been <em style={{ fontStyle: "italic", color: "#B97C24" }}>trying to tell you.</em>
              </h2>
              <ul className="mt-6 flex flex-col gap-2.5 list-none m-0 p-0">
                {items.map((t) => (
                  <li key={t} className="flex gap-2.5 items-start" style={{ fontFamily: FONT, fontSize: 15, lineHeight: 1.5, color: "var(--nx-fg-graphite)" }}>
                    <Check size={16} strokeWidth={2.4} className="shrink-0 mt-1" style={{ color: "#B97C24" }} /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#7A4E12" }}>Included with every protocol. Available standalone.</p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a href="/#/assessment" className="nx-cta-cobalt inline-flex items-center justify-center gap-2" data-testid="offer-cta">
                  Book your baseline panel <ArrowRight size={16} strokeWidth={2.2} />
                </a>
                <a href="/#/how-it-works" className="nx-cta-ghost inline-flex items-center justify-center">See how protocols work</a>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 11.5, lineHeight: 1.5, color: "var(--nx-fg-muted)", marginTop: "1.1rem" }}>
                Panels require eligibility review and a physician order. Results inform your protocol; they are not a standalone diagnosis. Availability varies by state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ══ ACTION PLAN — guidance cards floating over life ══ */
function ActionPlan() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 560 }}>
      <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152222_271d9e81-0e8b-4523-919e-f87170779650.png" alt="" aria-hidden className="absolute inset-0 w-full h-full" style={{ objectFit: "cover" }} loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(28,24,21,0.25) 0%, rgba(28,24,21,0.05) 35%, rgba(28,24,21,0.62) 100%)" }} />
      <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_170611_9a4e8cf6-4a78-4757-97f4-18aed47a8cc5.png" alt="" aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" style={{ objectFit: "cover", zIndex: 1 }} loading="lazy" />
      <div className="nx-container relative" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div className="flex flex-wrap gap-x-7 gap-y-2" style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#FAF7F0" }}>
          <span className="inline-flex items-center gap-2"><Activity size={16} strokeWidth={2} /> Movement</span>
          <span className="inline-flex items-center gap-2"><Apple size={16} strokeWidth={2} /> Nutrition</span>
          <span className="inline-flex items-center gap-2"><Brain size={16} strokeWidth={2} /> Recovery</span>
          <span className="inline-flex items-center gap-2"><Shield size={16} strokeWidth={2} /> Protocol</span>
        </div>
        <div className="relative mt-10 max-w-xl">
          <div className="absolute left-3 right-3 -bottom-3 h-full" style={{ background: "rgba(250,247,240,0.45)", borderRadius: 18, filter: "blur(0.5px)" }} aria-hidden />
          <div className="relative" style={{ background: "#FFFEFB", borderRadius: 18, padding: "1.3rem 1.5rem", boxShadow: "0 24px 50px -20px rgba(28,24,21,0.45)" }}>
            <div className="flex items-center justify-between gap-4">
              <p style={{ fontFamily: FONT, fontSize: 16, lineHeight: 1.5, color: "var(--nx-black)", fontWeight: 500, margin: 0 }}>
                Front-load protein within an hour of waking — steadier glucose, stronger recovery.
              </p>
              <ArrowRight size={18} strokeWidth={2} style={{ color: "#7A4E12", flexShrink: 0 }} />
            </div>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#B97C24", marginTop: 8 }}>Supports 6 metabolic markers</p>
          </div>
        </div>
        <div className="relative" style={{ marginTop: "4.5rem", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(30px,4.6vw,56px)", lineHeight: 1.06, color: "#FAF7F0", maxWidth: "14ch" }}>
            Doctor-developed. <em style={{ fontStyle: "italic", color: "#F3C87A" }}>You</em>-specific.
          </h2>
          <p style={{ fontFamily: FONT, fontSize: 15.5, lineHeight: 1.55, color: "rgba(250,247,240,0.85)", maxWidth: "48ch", marginTop: "0.9rem" }}>
            Every panel becomes a written plan — movement, nutrition, recovery, and if appropriate, a prescribed protocol. Reviewed against your next draw.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 11, color: "rgba(250,247,240,0.5)", marginTop: "1.2rem" }}>Illustration of member guidance.</p>
        </div>
      </div>
    </section>
  );
}


/* ══ GLOWING BODY — what one draw can surface ══ */
const SURFACE_PILLS: { t: string; x: string; y: string; hot?: boolean }[] = [
  { t: "Insulin resistance", x: "4%", y: "12%", hot: true },
  { t: "Chronic inflammation", x: "62%", y: "8%", hot: true },
  { t: "Low testosterone", x: "72%", y: "30%" },
  { t: "Hypothyroidism", x: "2%", y: "36%" },
  { t: "Vitamin D deficiency", x: "68%", y: "56%", hot: true },
  { t: "Elevated ApoB", x: "6%", y: "62%", hot: true },
  { t: "B12 deficiency", x: "70%", y: "78%" },
  { t: "Liver stress", x: "8%", y: "84%" },
];
function GlowingBody() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#241A12" }}>
      <div className="nx-container relative" style={{ paddingTop: "3.5rem", paddingBottom: "3rem" }}>
        <div className="relative mx-auto" style={{ maxWidth: 880 }}>
          <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_155120_6ebcb99a-6685-491b-b11b-f63f4dad450c.png" alt="" aria-hidden className="w-full" style={{ display: "block", borderRadius: 24 }} loading="lazy" />
          {SURFACE_PILLS.map((p, pi) => (
            <span key={p.t} className="hidden sm:inline-block absolute nx-float" style={{ left: p.x, top: p.y, fontFamily: FONT, fontSize: 13.5, fontWeight: 500, color: p.hot ? "#FAF7F0" : "rgba(250,247,240,0.4)", border: `1px solid ${p.hot ? "rgba(250,247,240,0.55)" : "rgba(250,247,240,0.18)"}`, borderRadius: 999, padding: "8px 16px", background: "rgba(36,26,18,0.35)", backdropFilter: "blur(6px)", animationDelay: `${pi * 0.55}s` }}>
              {p.t}
            </span>
          ))}
          <span className="absolute left-1/2 -translate-x-1/2 nx-pulse-chip" style={{ top: "44%", fontFamily: FONT, fontSize: 13.5, fontWeight: 600, color: "#1C1815", background: "#FFFEFB", borderRadius: 999, padding: "9px 16px", boxShadow: "0 12px 30px rgba(0,0,0,0.35)", whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: 999, background: "#A8C69A", color: "#1C1815", textAlign: "center", lineHeight: "16px", fontSize: 11, marginRight: 8 }}>✓</span>
            All 76 reviewed by a physician
          </span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[["One draw", "5-minute booking, 2,000+ locations"], ["76 markers", "heart to biological age"], ["4x a year", "quarterly re-testing keeps you ahead"]].map(([t, s]) => (
            <div key={t} style={{ background: "rgba(250,247,240,0.94)", borderRadius: 16, padding: "1.1rem 1.2rem" }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 22, color: "#5E3C0D" }}>{t}</div>
              <p style={{ fontFamily: FONT, fontSize: 13.5, color: "var(--nx-fg-graphite)", marginTop: 4 }}>{s}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: FONT, fontSize: 11.5, color: "rgba(250,247,240,0.45)", marginTop: "1.2rem" }}>
          Lab results alone do not diagnose any condition. Out-of-range markers are conversations to have with your physician.
        </p>
      </div>
    </section>
  );
}

/* ══ MARKER WALL — the language of your body ══ */
function MarkerWall() {
  const names = BIOMARKER_PANEL.flatMap((c) => c.markers.map((m) => m.name.split(" (")[0]));
  const rows = [names.slice(0, 5), names.slice(9, 13), names.slice(18, 22), names.slice(27, 31), names.slice(36, 40), names.slice(45, 49), names.slice(54, 58)];
  const ops = [0.16, 0.3, 0.5, 0.75, 0.5, 0.3, 0.16];
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--nx-bg)", padding: "4rem 0" }}>
      <div aria-hidden style={{ textAlign: "center" }}>
        {rows.map((r, i) => (
          <p key={i} style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(26px,4.6vw,58px)", lineHeight: 1.28, color: "#7A4E12", opacity: ops[i], margin: 0, whiteSpace: "nowrap" }}>
            {r.join(",  ")},
          </p>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: "#FFFEFB", borderRadius: 20, padding: "1.2rem 1.4rem", boxShadow: "0 30px 60px -20px rgba(28,24,21,0.35)", minWidth: 260 }}>
        <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "var(--nx-black)", margin: 0 }}>Out of range → In range</p>
        <svg viewBox="0 0 240 70" style={{ width: 240, height: 70, display: "block", marginTop: 8 }}>
          <line x1="30" y1="22" x2="180" y2="48" stroke="#B97C24" strokeWidth="1.6" strokeDasharray="4 5" />
          <circle cx="30" cy="22" r="7" fill="#FFFEFB" stroke="#D07A52" strokeWidth="2.5" />
          <circle cx="180" cy="48" r="9" fill="#F3C87A" stroke="#B97C24" strokeWidth="2.5" />
          <text x="30" y="64" textAnchor="middle" fill="rgba(28,24,21,0.5)" style={{ font: "500 10px " + FONT }}>Baseline</text>
          <text x="180" y="16" textAnchor="middle" fill="rgba(28,24,21,0.5)" style={{ font: "500 10px " + FONT }}>90 days</text>
        </svg>
      </div>
    </section>
  );
}
