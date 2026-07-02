import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";
import { BiomarkerCard } from "@/components/BiomarkerCard";
import { BIOMARKERS, TEST_PANELS, TOTAL_MARKERS } from "@/data/biomarkers";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import bloodworkHero from "@/assets/nx_v11_bloodwork_hero.webp";

const FONT = "'General Sans', system-ui, sans-serif";
const NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums lining-nums",
  fontFeatureSettings: "'tnum'",
};

/* ── How-it-works 3-step flow ───────────────────────────────── */
const STEPS = [
  {
    n: "01",
    title: "Baseline draw",
    body: `A ${TOTAL_MARKERS}-marker panel through Quest Diagnostics before a single dose. Walk into any of 2,500+ centers, or use the at-home collection kit. No appointment needed.`,
  },
  {
    n: "02",
    title: "Physician-reviewed protocol",
    body: "A board-certified physician reads every marker against your goals — not a population average — and prescribes the exact peptides and doses your chemistry calls for.",
  },
  {
    n: "03",
    title: "90-day recheck",
    body: "The same panel repeats every quarter. We track each marker against your own baseline and adjust dose the moment a value drifts outside its target band.",
  },
];

export default function Bloodwork() {
  useSeo({
    title: "Bloodwork | Nexphoria",
    description:
      "Every protocol starts with proof. A physician-reviewed biomarker panel — value, reference range, trend, and clinical interpretation for every marker.",
    path: "/bloodwork",
  });

  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content">
        {/* ── HERO — Pattern B: data-hero ─────────────────────── */}
        <section
          data-testid="bloodwork-hero"
          style={{ backgroundColor: "var(--nx-bg-dark)", color: "#FFFFF3" }}
        >
          <div className="nx-container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div
              style={{
                display: "grid",
                gap: "3rem",
                alignItems: "center",
              }}
              className="md:grid-cols-[1.05fr_0.95fr]"
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
                      marginBottom: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <span style={{ width: 28, height: 1, backgroundColor: "var(--nx-acid)" }} />
                    The data layer
                  </p>
                  <h1
                    style={{
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: "clamp(44px, 6.5vw, 88px)",
                      lineHeight: 0.98,
                      letterSpacing: "-0.035em",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Every protocol
                    <br />
                    starts with proof.
                  </h1>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: "1.0625rem",
                      lineHeight: 1.55,
                      color: "rgba(255,255,243,0.72)",
                      maxWidth: 460,
                      marginBottom: "2rem",
                    }}
                  >
                    We do not guess. Before any peptide is prescribed, a {TOTAL_MARKERS}-marker
                    Quest Diagnostics panel establishes your baseline. Every 90 days we redraw
                    and prove the protocol is working — marker by marker.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    <StartIntakeButton source="bloodwork-hero" size="lg">
                      Start your assessment
                    </StartIntakeButton>
                    <button
                      data-testid="button-hero-see-panel"
                      onClick={() =>
                        document.getElementById("panel")?.scrollIntoView({ behavior: "smooth" })
                      }
                      style={{
                        fontFamily: FONT,
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#FFFFF3",
                        border: "1px solid rgba(255,255,243,0.28)",
                        borderRadius: 12,
                        padding: "0.875rem 1.5rem",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      See a live panel
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* hero stat strip */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1.5rem",
                      marginTop: "3rem",
                      paddingTop: "2rem",
                      borderTop: "1px solid rgba(255,255,243,0.14)",
                    }}
                  >
                    {[
                      { k: `${TOTAL_MARKERS}`, v: "Markers per draw" },
                      { k: "90d", v: "Recheck cadence" },
                      { k: "24h", v: "Physician review" },
                    ].map((s) => (
                      <div key={s.v}>
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: 30,
                            fontWeight: 600,
                            color: "#FFFFF3",
                            letterSpacing: "-0.02em",
                            ...NUM,
                          }}
                        >
                          {s.k}
                        </p>
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: 11,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,243,0.5)",
                            marginTop: 4,
                          }}
                        >
                          {s.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,243,0.12)",
                    aspectRatio: "4 / 5",
                  }}
                >
                  <img
                    src={bloodworkHero}
                    alt="A focused man mid-30s having blood drawn by a phlebotomist in a clinical draw room — every Nexphoria protocol begins with a physician-reviewed baseline panel."
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="eager"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── BIOMARKER PANEL ─────────────────────────────────── */}
        <section
          id="panel"
          data-testid="section-biomarker-panel"
          style={{
            backgroundColor: "var(--nx-bg)",
            borderTop: "1px solid var(--nx-border)",
            paddingTop: "5rem",
            paddingBottom: "5rem",
          }}
        >
          <div className="nx-container">
            <Reveal>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginBottom: "2.5rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--nx-cobalt)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Sample panel · Week 12
                  </p>
                  <h2
                    style={{
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: "clamp(32px, 4.5vw, 56px)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.02,
                      color: "var(--nx-fg)",
                    }}
                  >
                    Every marker, read like a chart.
                  </h2>
                </div>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "0.95rem",
                    lineHeight: 1.55,
                    color: "var(--nx-fg-graphite)",
                    maxWidth: 380,
                  }}
                >
                  An illustrative 12-week trajectory. Value, reference range, trend since
                  baseline, and a plain-language clinical read — for every marker.
                </p>
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gap: "1rem",
              }}
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {BIOMARKERS.map((m, i) => (
                <Reveal key={m.name} delay={Math.min(i * 40, 240)}>
                  <BiomarkerCard m={m} />
                </Reveal>
              ))}
            </div>

            <p
              style={{
                fontFamily: FONT,
                fontSize: 11,
                color: "var(--nx-fg-muted)",
                marginTop: "1.75rem",
                letterSpacing: "0.02em",
              }}
            >
              Illustrative data for demonstration. Your actual Quest Diagnostics results appear
              in your member portal within 48–72 hours of collection.
            </p>
          </div>
        </section>

        {/* ── WHAT WE TEST ────────────────────────────────────── */}
        <section
          data-testid="section-what-we-test"
          style={{
            backgroundColor: "var(--nx-bg-cream)",
            borderTop: "1px solid var(--nx-border)",
            paddingTop: "5rem",
            paddingBottom: "5rem",
          }}
        >
          <div className="nx-container">
            <Reveal>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "0.75rem",
                }}
              >
                What we test
              </p>
              <h2
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.02,
                  color: "var(--nx-fg)",
                  marginBottom: "0.75rem",
                }}
              >
                {TOTAL_MARKERS} markers. Six systems.
              </h2>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--nx-fg-graphite)",
                  maxWidth: 520,
                  marginBottom: "2.5rem",
                }}
              >
                One draw covers the full endocrine, metabolic, and inflammatory picture — the
                systems peptide therapy moves, and the ones we monitor for safety.
              </p>
            </Reveal>

            <div
              style={{ display: "grid", gap: "1rem" }}
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {TEST_PANELS.map((panel, i) => (
                <Reveal key={panel.name} delay={Math.min(i * 50, 250)}>
                  <div
                    data-testid={`panel-cat-${panel.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid var(--nx-border)",
                      borderRadius: 16,
                      padding: "1.5rem",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "1px solid var(--nx-border)",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: FONT,
                          fontSize: 17,
                          fontWeight: 600,
                          color: "var(--nx-fg)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {panel.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--nx-cobalt)",
                          ...NUM,
                        }}
                      >
                        {panel.count}
                      </span>
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {panel.markers.map((mk) => (
                        <li
                          key={mk}
                          style={{
                            fontFamily: FONT,
                            fontSize: 13.5,
                            color: "var(--nx-fg-graphite)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            lineHeight: 1.4,
                          }}
                        >
                          <Check
                            size={13}
                            style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: 3 }}
                          />
                          {mk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS — 3 step ───────────────────────────── */}
        <section
          data-testid="section-how-it-works"
          style={{
            backgroundColor: "var(--nx-bg)",
            borderTop: "1px solid var(--nx-border)",
            paddingTop: "5rem",
            paddingBottom: "5rem",
          }}
        >
          <div className="nx-container">
            <Reveal>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "0.75rem",
                }}
              >
                How it works
              </p>
              <h2
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.02,
                  color: "var(--nx-fg)",
                  marginBottom: "2.5rem",
                }}
              >
                Baseline. Prescribe. Prove.
              </h2>
            </Reveal>
            <div
              style={{ display: "grid", gap: "1.25rem" }}
              className="grid-cols-1 md:grid-cols-3"
            >
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <div
                    data-testid={`step-${s.n}`}
                    style={{
                      backgroundColor: "var(--nx-bg-cream)",
                      border: "1px solid var(--nx-border)",
                      borderRadius: 20,
                      padding: "1.75rem",
                      height: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--nx-cobalt)",
                        letterSpacing: "0.1em",
                        ...NUM,
                      }}
                    >
                      {s.n}
                    </span>
                    <h3
                      style={{
                        fontFamily: FONT,
                        fontSize: 22,
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                        letterSpacing: "-0.02em",
                        margin: "0.75rem 0 0.75rem",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: FONT,
                        fontSize: 14.5,
                        lineHeight: 1.55,
                        color: "var(--nx-fg-graphite)",
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div style={{ marginTop: "2rem" }}>
                <Link
                  href="/lab-testing"
                  data-testid="link-lab-testing"
                  style={{
                    fontFamily: FONT,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--nx-cobalt)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    textDecoration: "none",
                  }}
                >
                  See draw locations, turnaround, and pricing
                  <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <FinalCTAStrip
          gender="men"
          title="Your chemistry. Read by a physician."
          sub={`A ${TOTAL_MARKERS}-marker Quest panel is included with every protocol. Complete your intake in 4 minutes.`}
        />
      </main>
    </SiteLayout>
  );
}
