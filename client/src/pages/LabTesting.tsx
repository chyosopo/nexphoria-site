import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";

import editorialBloodwork from "@/assets/brand/editorial-bloodwork.jpg";

const panels = [
  { name: "Hormonal", markers: 12, examples: ["Testosterone (total + free)", "Estradiol", "LH, FSH", "DHEA-S", "Progesterone", "Cortisol", "Prolactin", "SHBG", "IGF-1", "GH", "TSH"] },
  { name: "Metabolic", markers: 10, examples: ["Fasting glucose", "HbA1c", "Fasting insulin", "HOMA-IR", "Adiponectin", "Leptin", "C-peptide", "BUN", "Creatinine", "eGFR"] },
  { name: "Lipid", markers: 8, examples: ["Total cholesterol", "LDL (direct)", "HDL", "Triglycerides", "VLDL", "ApoB", "ApoA1", "Lp(a)"] },
  { name: "Thyroid", markers: 5, examples: ["TSH", "Free T3", "Free T4", "Reverse T3", "Anti-TPO antibodies"] },
  { name: "Inflammation", markers: 6, examples: ["hsCRP", "Homocysteine", "IL-6", "ESR", "Fibrinogen", "Ferritin"] },
  { name: "Vitamins & Minerals", markers: 8, examples: ["Vitamin D (25-OH)", "B12", "Folate", "Magnesium", "Zinc", "Iron", "TIBC", "Ferritin"] },
  { name: "Blood Count", markers: 10, examples: ["WBC differential", "RBC", "Hemoglobin", "Hematocrit", "MCV", "MCH", "MCHC", "Platelets"] },
  { name: "Kidney & Liver", markers: 6, examples: ["ALT", "AST", "GGT", "Alkaline phosphatase", "Total bilirubin", "Albumin"] },
];

// Mock sample report data for editorial preview
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

export default function LabTesting() {
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
                  fontFamily: "'JetBrains Mono', monospace",
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
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.05,
                  marginBottom: "1.5rem",
                }}
              >
                Blood work first. Always.
              </h1>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "#4A4A4A",
                  lineHeight: 1.6,
                  maxWidth: "560px",
                  marginBottom: "2.5rem",
                }}
              >
                No physician prescribes without labs. Your Nexphoria panel covers 65 biomarkers
                across 8 categories — a comprehensive baseline that guides every dose decision.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <div>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "2.75rem",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    65
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
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
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "2.75rem",
                      fontWeight: 500,
                      color: "var(--nx-cobalt)",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Free
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
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
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "2.75rem",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    $199
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    STANDALONE
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
                  src={editorialBloodwork}
                  alt="At-home blood draw kit"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="eager"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Biomarker panel grid ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
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
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              Eight categories. 65 markers.
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
                  backgroundColor: "var(--nx-bg)",
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
                      fontFamily: "'Playfair Display', Georgia, serif",
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
                      fontFamily: "'JetBrains Mono', monospace",
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
                        fontFamily: "'Inter Tight', sans-serif",
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
                        fontFamily: "'Inter Tight', sans-serif",
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

      {/* ── Sample report ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
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
                fontFamily: "'Playfair Display', Georgia, serif",
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
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "1rem",
                color: "#4A4A4A",
                lineHeight: 1.6,
                maxWidth: "560px",
                marginBottom: "2.5rem",
              }}
            >
              A mock panel for illustration. Your real results appear in your member portal
              within 48–72 hours of collection — reviewed by your physician within 24 hours.
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
                    fontFamily: "'JetBrains Mono', monospace",
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
                    fontFamily: "'JetBrains Mono', monospace",
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
                      fontFamily: "'JetBrains Mono', monospace",
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
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                    }}
                  >
                    {row.marker}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: row.status === "normal" ? "var(--nx-fg)" : "#C2440E",
                    }}
                  >
                    {row.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    {row.range}
                  </p>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
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

      {/* ── Process ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
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
              THE PROCESS
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              At-home or LabCorp. Your choice.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
              maxWidth: "860px",
            }}
          >
            {[
              { num: "01", title: "At-home collection", detail: "We ship a phlebotomy kit to your door. A certified phlebotomist comes to you. No clinic required." },
              { num: "02", title: "LabCorp draw", detail: "3,200+ LabCorp locations nationwide. Print your requisition from the member portal and walk in." },
              { num: "03", title: "Results in 48–72h", detail: "Results appear in your member portal. Your physician reviews within 24 hours of receipt." },
              { num: "04", title: "Quarterly retests", detail: "Every 12 weeks with an active protocol. Compare baseline vs. outcomes. Dose adjustments as needed." },
            ].map((item) => (
              <div
                key={item.num}
                style={{ backgroundColor: "var(--nx-bg)", padding: "2rem" }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.num}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--nx-fg)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "13px",
                    color: "#4A4A4A",
                    lineHeight: 1.6,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Your panel is included with every protocol."
        sub="65 biomarkers. Physician-reviewed. Free."
      />
    </SiteLayout>
  );
}
