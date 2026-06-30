import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";

import editorialBloodwork from "@/assets/brand/editorial-bloodwork.webp";
import lifestyleLabVials from "@/assets/brand/lifestyle-lab-vials.webp";
import lifestyleBloodworkDashboard from "@/assets/brand/lifestyle-bloodwork-dashboard-mood.webp";

const panels = [
  { name: "Hormones", markers: 11, examples: ["Testosterone (total + free)", "Estradiol", "LH, FSH", "DHEA-S", "Progesterone", "Cortisol", "Prolactin", "SHBG", "IGF-1", "GH", "TSH"] },
  { name: "Metabolic", markers: 7, examples: ["Fasting glucose", "HbA1c", "Fasting insulin", "HOMA-IR", "C-peptide", "BUN", "Creatinine"] },
  { name: "Inflammation", markers: 4, examples: ["hsCRP", "Homocysteine", "IL-6", "Ferritin"] },
  { name: "Nutrients", markers: 5, examples: ["Vitamin D (25-OH)", "B12", "Folate", "Magnesium", "Zinc"] },
  { name: "Cardiovascular", markers: 5, examples: ["ApoB", "LDL (direct)", "HDL", "Triglycerides", "Lp(a)"] },
  { name: "Thyroid", markers: 4, examples: ["TSH", "Free T3", "Free T4", "Reverse T3"] },
  { name: "Kidney & Liver", markers: 6, examples: ["ALT", "AST", "GGT", "Alkaline phosphatase", "Total bilirubin", "Albumin"] },
  { name: "Blood Count", markers: 8, examples: ["WBC differential", "RBC", "Hemoglobin", "Hematocrit", "MCV", "Platelets"] },
];

const sampleReport = [
  { marker: "Total Testosterone", value: "342 ng/dL", range: "264–916", status: "low" },
  { marker: "Free Testosterone", value: "6.2 pg/mL", range: "8.7–25.1", status: "low" },
  { marker: "IGF-1", value: "118 ng/mL", range: "115–307", status: "low" },
  { marker: "SHBG", value: "62 nmol/L", range: "16.5–55.9", status: "high" },
  { marker: "DHEA-S", value: "156 μg/dL", range: "211–492", status: "low" },
  { marker: "HbA1c", value: "5.6%", range: "< 5.7%", status: "normal" },
  { marker: "Fasting Insulin", value: "12.4 μIU/mL", range: "2.6–24.9", status: "normal" },
  { marker: "hsCRP", value: "2.8 mg/L", range: "< 1.0 mg/L", status: "high" },
  { marker: "Vitamin D (25-OH)", value: "28 ng/mL", range: "30–100", status: "low" },
  { marker: "ApoB", value: "98 mg/dL", range: "< 90 mg/dL", status: "high" },
];

const statusColor: Record<string, string> = {
  normal: "var(--nx-success)",
  low: "#C2440E",
  high: "#C2440E",
};

const statusBg: Record<string, string> = {
  normal: "#EDFAF1",
  low: "#FEF2EC",
  high: "#FEF2EC",
};

const biomarkerCards = [
  {
    name: "Total Testosterone",
    unit: "ng/dL",
    populationRange: "264–916 ng/dL",
    why: "Population reference ranges for testosterone are derived from men ages 19–39. A 55-year-old at 300 ng/dL is technically within range but may be functionally hypogonadal relative to his own decade-earlier baseline. Nexphoria physicians assess testosterone in context of free fraction, SHBG, LH, and symptom profile.",
  },
  {
    name: "IGF-1",
    unit: "ng/mL",
    populationRange: "115–307 ng/mL (ages 30–50)",
    why: "IGF-1 is the primary downstream marker for growth hormone axis activity. A value in the lower third of the reference range in a 40-year-old may reflect GH decline sufficient to warrant secretagogue consideration. Context matters: low-normal IGF-1 combined with poor sleep quality and reduced lean mass strengthens the clinical picture.",
  },
  {
    name: "HbA1c",
    unit: "%",
    populationRange: "< 5.7% (normal); 5.7–6.4% (pre-diabetic)",
    why: "HbA1c reflects average blood glucose over approximately 90 days. Before initiating any GLP-1 agonist protocol, baseline glycemic status is essential — both to document starting point and to identify contraindications. Serial HbA1c values at 90 and 180 days quantify metabolic response.",
  },
  {
    name: "hsCRP",
    unit: "mg/L",
    populationRange: "< 1.0 mg/L (low cardiovascular risk)",
    why: "High-sensitivity C-reactive protein is a sensitive marker for systemic low-grade inflammation. Values between 1.0–3.0 mg/L indicate intermediate cardiovascular risk. Elevated hsCRP at baseline — in the absence of acute infection — may support protocols with anti-inflammatory mechanisms such as BPC-157 or omega-3-based adjuncts.",
  },
];

export default function LabTesting() {
  useSeo({
    title: "Lab Testing | Nexphoria",
    description: "38 biomarkers per draw. Quest Diagnostics. Every 90 days. Always included.",
    path: "/lab-testing",
  });
  return (
    <SiteLayout navVariant="gate">
      {/* ── Hero ── */}
      <section
        className="py-32 md:py-40"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="md:grid-cols-2"
          >
            <Reveal>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                LAB TESTING
              </p>
              <h1
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.05,
                  marginBottom: "0.5rem",
                }}
              >
                No prescription without bloodwork.
              </h1>
              <p
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.05,
                  marginBottom: "1.5rem",
                }}
              >
                No exceptions.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                  color: "#4A4A4A",
                  lineHeight: 1.65,
                  maxWidth: "560px",
                  marginBottom: "2.5rem",
                }}
              >
                A physician cannot calibrate a peptide protocol without knowing your baseline.
                Every Nexphoria protocol requires a 38-biomarker panel drawn through Quest
                Diagnostics before a prescription is written. Labs are included with every
                active protocol at no additional charge.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <div>
                  <p
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: "2.75rem",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    38
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    BIOMARKERS
                  </p>
                </div>
                <div style={{ width: "1px", height: "48px", backgroundColor: "var(--nx-border)" }} />
                <div>
                  <p
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: "2.75rem",
                      fontWeight: 500,
                      color: "var(--nx-cobalt)",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Included
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    WITH PROTOCOL
                  </p>
                </div>
                <div style={{ width: "1px", height: "48px", backgroundColor: "var(--nx-border)" }} />
                <div>
                  <p
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: "2.75rem",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    2,500+
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    QUEST LOCATIONS
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div
                style={{
                  borderRadius: "4px",
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  backgroundColor: "var(--nx-bg-cream)",
                }}
              >
                <img
                  src={lifestyleLabVials}
                  alt="Blood draw collection tubes arranged top-down for clinical panel review"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="eager"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Quest Diagnostics partnership ── */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "2.5rem",
              }}
              className="md:grid-cols-2"
            >
              <div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.75rem",
                  }}
                >
                  QUEST DIAGNOSTICS PARTNERSHIP
                </p>
                <h2
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.2,
                    marginBottom: "1.25rem",
                  }}
                >
                  Draw anywhere. Results in 48–72 hours.
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  Laboratory requisitions are generated in your member portal. You draw at any of
                  2,500+ Quest Diagnostics patient service centers nationwide — no appointment
                  required at walk-in locations. Results are transmitted directly to your Nexphoria
                  physician, who reviews within 24 hours of receipt.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                  }}
                >
                  Kits can also be shipped to your home address with instructions for a
                  certified phlebotomist visit if a nearby Quest location is unavailable.
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.75rem",
                  }}
                >
                  ON REFERENCE RANGES
                </p>
                <h2
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.2,
                    marginBottom: "1.25rem",
                  }}
                >
                  "Normal" is not the same as optimal.
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  Population reference ranges are statistical constructs derived from the middle
                  95% of a tested population — which includes people who are sedentary, overweight,
                  and asymptomatic but not healthy. A testosterone value of 300 ng/dL is technically
                  within range; it is also at the 8th percentile for a 40-year-old male.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                  }}
                >
                  Nexphoria physicians interpret your results in the context of your age,
                  symptoms, and the full panel — not in isolation against a population average.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Bloodwork dashboard mood image ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "400px" }}
        data-testid="labtesting-mood-strip"
      >
        <img
          src={lifestyleBloodworkDashboard}
          alt="Patient reviewing bloodwork results on digital dashboard, illustrating how Nexphoria presents lab data"
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.35) 100%)",
          }}
        />
      </section>

      {/* ── Biomarker panel grid ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              YOUR PANEL
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              Seven categories.
            </h2>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              38 clinically selected biomarkers.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {panels.map((panel) => (
              <div
                key={panel.name}
                style={{
                  backgroundColor: "var(--nx-bg-cream)",
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontWeight: 500,
                      fontSize: "1.125rem",
                      color: "var(--nx-fg)",
                      lineHeight: 1.2,
                    }}
                  >
                    {panel.name}
                  </p>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--nx-cobalt)",
                      backgroundColor: "var(--nx-cobalt-soft)",
                      padding: "2px 8px",
                      borderRadius: "100px",
                      flexShrink: 0,
                      marginLeft: "0.5rem",
                    }}
                  >
                    {panel.markers}
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                  }}
                >
                  {panel.examples.slice(0, 5).map((ex) => (
                    <li
                      key={ex}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        color: "#4A4A4A",
                        lineHeight: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <span
                        style={{
                          width: "3px",
                          height: "3px",
                          borderRadius: "50%",
                          backgroundColor: "var(--nx-cobalt)",
                          flexShrink: 0,
                        }}
                      />
                      {ex}
                    </li>
                  ))}
                  {panel.examples.length > 5 && (
                    <li
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        color: "var(--nx-fg-muted)",
                        marginTop: "0.25rem",
                      }}
                    >
                      +{panel.examples.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Biomarker explainer cards ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              KEY BIOMARKERS EXPLAINED
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              What four markers tell your physician.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {biomarkerCards.map((card) => (
              <Reveal key={card.name}>
                <div
                  style={{
                    backgroundColor: "var(--nx-bg)",
                    padding: "2rem",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontWeight: 500,
                      fontStyle: "italic",
                      fontSize: "1.25rem",
                      color: "var(--nx-fg)",
                      lineHeight: 1.2,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {card.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-cobalt)",
                      marginBottom: "1rem",
                    }}
                  >
                    {card.unit} · RANGE: {card.populationRange}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13.5px",
                      color: "#4A4A4A",
                      lineHeight: 1.65,
                    }}
                  >
                    {card.why}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Retest cadence ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              RETEST CADENCE
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              The monitoring schedule that makes dose adjustment possible.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
              maxWidth: "860px",
            }}
          >
            {[
              { label: "Baseline", timeframe: "Before first dose", purpose: "Establishes individual reference values. Documents contraindications. Sets dose starting point. Required before any prescription is issued." },
              { label: "Day 30 — Safety", timeframe: "30 days post-start", purpose: "Screens for early adverse marker changes. Confirms dose tolerability. Evaluates GI, hepatic, and hematologic indicators for GLP-1 protocols specifically." },
              { label: "Day 90 — Efficacy", timeframe: "3 months post-start", purpose: "First meaningful efficacy assessment. Quantifies IGF-1 response to GHS protocols. Measures HbA1c trajectory. Adjusts dose based on measured changes, not subjective report." },
              { label: "Day 180+", timeframe: "Every 6 months thereafter", purpose: "Confirms sustained effects. Documents long-term safety. Tracks secondary biomarkers for unforeseen directional changes. Basis for protocol continuation or modification." },
            ].map((item) => (
              <div
                key={item.label}
                style={{ backgroundColor: "var(--nx-bg-cream)", padding: "2rem" }}
              >
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.375rem",
                  }}
                >
                  {item.timeframe.toUpperCase()}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--nx-fg)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    color: "#4A4A4A",
                    lineHeight: 1.6,
                  }}
                >
                  {item.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample report ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              SAMPLE REPORT
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}
            >
              What your results look like.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#4A4A4A",
                lineHeight: 1.6,
                maxWidth: "560px",
                marginBottom: "2.5rem",
              }}
            >
              An illustrative panel. Your actual Quest Diagnostics results appear in your
              member portal within 48–72 hours of collection. Your physician reviews within
              24 hours of results receipt and responds via secure message.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div
              style={{
                border: "1px solid var(--nx-border)",
                borderRadius: "4px",
                overflow: "hidden",
                maxWidth: "720px",
              }}
            >
              {/* Report header */}
              <div
                style={{
                  backgroundColor: "var(--nx-cobalt)",
                  padding: "1rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                  }}
                >
                  NEXPHORIA MEMBER PORTAL — LAB RESULTS
                </p>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  SAMPLE · NOT REAL DATA
                </p>
              </div>

              {/* Column headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1.5fr 1fr",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "var(--nx-bg-cream)",
                  borderBottom: "1px solid var(--nx-border)",
                }}
              >
                {["MARKER", "VALUE", "REFERENCE RANGE", "STATUS"].map((h) => (
                  <p
                    key={h}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    {h}
                  </p>
                ))}
              </div>

              {/* Rows */}
              {sampleReport.map((row, i) => (
                <div
                  key={row.marker}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1.5fr 1fr",
                    padding: "0.875rem 1.5rem",
                    backgroundColor: i % 2 === 0 ? "#FFFFFF" : "var(--nx-bg-cream)",
                    borderBottom: i < sampleReport.length - 1 ? "1px solid var(--nx-border)" : "none",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                    }}
                  >
                    {row.marker}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: row.status === "normal" ? "var(--nx-fg)" : "#C2440E",
                    }}
                  >
                    {row.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    {row.range}
                  </p>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: statusColor[row.status],
                      backgroundColor: statusBg[row.status],
                      padding: "3px 8px",
                      borderRadius: "100px",
                      display: "inline-block",
                    }}
                  >
                    {row.status === "normal" ? "NORMAL" : row.status === "low" ? "LOW" : "HIGH"}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Your panel is included with every protocol."
        sub="38 biomarkers. Quest Diagnostics. Physician-reviewed within 24 hours."
      />
    </SiteLayout>
  );
}
