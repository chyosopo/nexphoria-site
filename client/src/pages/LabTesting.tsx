import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd } from "@/lib/seo";

import editorialBloodwork from "@/assets/brand/editorial-bloodwork.webp";
import lifestyleLabVials from "@/assets/brand/lifestyle-lab-vials.webp";
import lifestyleBloodworkDashboard from "@/assets/brand/lifestyle-bloodwork-dashboard-mood.webp";
import bloodworkHero from "@/assets/nx_bloodwork_hero.webp";
import bloodworkReport from "@/assets/nx_bloodwork_report.webp";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Check, MapPin, Clock, Home, Building2, FlaskConical, Truck } from "lucide-react";
import atHomeKit from "@/assets/nx_v11_bloodwork_athome_kit.webp";
import { MxHeader } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";

type PanelTone = { bg: string; accent: string; ring: string };
const PANEL_TONES: Record<string, PanelTone> = {
  Hormones:       { bg: "#F2DDD0", accent: "#8E4A26", ring: "#D8B69A" }, // rose/terracotta
  Metabolic:      { bg: "#D6E2E8", accent: "#2D5663", ring: "#A8BFCB" }, // sky
  Inflammation:   { bg: "#F0D4C8", accent: "#A23E1F", ring: "#D8AC97" }, // terra
  Nutrients:      { bg: "#E2E6C8", accent: "#566526", ring: "#BDC498" }, // sage
  Cardiovascular: { bg: "#DCD0C0", accent: "#5E4421", ring: "#BFAB8C" }, // sand
  Thyroid:        { bg: "#E6DFC1", accent: "#615620", ring: "#C1B68C" }, // butter
  "Kidney & Liver": { bg: "#CFDFD8", accent: "#2D5046", ring: "#9DB8AB" }, // cobalt-soft
  "Blood Count":  { bg: "#E2D2C2", accent: "#6A3A22", ring: "#C1A286" }, // clay
};

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
    title: "At-home lab testing — 38 biomarkers, Quest Diagnostics, every 90 days",
    description: "Requisition in your portal, draw at 2,500+ Quest locations, physician-reviewed results in 48 hours. 38 biomarkers calibrate and track your peptide protocol from first dose to completion.",
    path: "/lab-testing",
    jsonLd: [webPageJsonLd({
      name: "Nexphoria Lab Testing",
      description: "38-biomarker Quest Diagnostics panel included with every Nexphoria peptide protocol. Results reviewed by a board-certified physician within 48 hours.",
      path: "/lab-testing",
      type: "MedicalWebPage",
    })],
  });
  return (
    <SiteLayout navVariant="showcase">
      <BloodworkManifesto />
      <BloodworkPillars />
      <BloodworkPricing />
      <BloodworkInsurance />
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">Bloodwork &amp; biomarkers</PillBadge>}
            headline={
              <>
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>Test</span> before.<br />
                <span>Verify</span> after.
              </>
            }
            subtitle="Comprehensive panels before your protocol begins and after it ends. We track 50+ biomarkers so dose decisions stay data-driven."
          />

          {/* Editorial hero — the draw itself: calm, clinical, real */}
          <figure
            className="relative overflow-hidden"
            style={{ borderRadius: "20px", border: "1px solid var(--nx-border)" }}
            data-testid="labtesting-hero-editorial"
          >
            <img
              src={editorialBloodwork}
              alt="Vacutainer tubes arranged on a cream ceramic tray in warm directional light, ready for a lab draw"
              className="w-full object-cover"
              style={{ aspectRatio: "21 / 9", minHeight: "320px" }}
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 36%, transparent 58%)",
              }}
            />
            <figcaption className="absolute left-0 right-0 bottom-0 p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "#FFFFF3",
                    maxWidth: "38ch",
                    textShadow: "0 1px 12px rgba(10,10,10,0.35)",
                  }}
                >
                  50+ biomarkers drawn at Quest and read by your physician — before your first dose and after your last.
                </p>
                <StartIntakeButton source="labtesting-hero" size="lg">
                  Start your assessment
                </StartIntakeButton>
              </div>
            </figcaption>
          </figure>
        </div>
      </main>

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
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Quest Diagnostics
                </p>
                <h2
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Reference ranges
                </p>
                <h2
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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

      {/* ── Partner labs · draw options · turnaround — AGENT-3 ── */}
      <PartnerLabsSection />

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
                fontFamily: "'General Sans', system-ui, sans-serif",
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
              Your panel
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
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
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
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
            {panels.map((panel) => {
              const tone = PANEL_TONES[panel.name] ?? { bg: "var(--nx-bg-cream)", accent: "var(--nx-cobalt)", ring: "var(--nx-cobalt-soft)" };
              return (
              <div
                key={panel.name}
                style={{
                  backgroundColor: tone.bg,
                  padding: "1.75rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: -40,
                    top: -40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: `1.5px solid ${tone.ring}`,
                    opacity: 0.7,
                    pointerEvents: "none",
                  }}
                />
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: tone.accent,
                      backgroundColor: "rgba(255,255,255,0.75)",
                      border: `1px solid ${tone.ring}`,
                      padding: "2px 8px",
                      borderRadius: "100px",
                      flexShrink: 0,
                      marginLeft: "0.5rem",
                      position: "relative",
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
                        fontFamily: "'General Sans', system-ui, sans-serif",
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
                        fontFamily: "'General Sans', system-ui, sans-serif",
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
              );
            })}
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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
              Key biomarkers
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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
              Retest cadence
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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
              Sample report
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                    }}
                  >
                    {row.marker}
                  </p>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: row.status === "normal" ? "var(--nx-fg)" : "#C2440E",
                    }}
                  >
                    {row.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "11px",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    {row.range}
                  </p>
                  <span
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
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

      {/* ── Lab testing pricing ── */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              Lab testing pricing
            </p>
          </Reveal>

          {/* {PLACEHOLDER} Panel tier names, prices, and marker counts are provisional
              until the lab menu is finalized with Quest. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              alignItems: "stretch",
            }}
            data-testid="labtesting-panel-tiers"
          >
            {[
              {
                key: "essential",
                label: "Essential",
                price: "$99",
                note: "Baseline screen",
                markers: "22 biomarkers",
                popular: false,
                features: [
                  "Hormone baseline (total & free testosterone, estradiol)",
                  "Metabolic core (glucose, HbA1c, lipid panel)",
                  "Liver and kidney function",
                  "Results in your portal in 2–4 business days",
                ],
              },
              {
                key: "comprehensive",
                label: "Comprehensive",
                price: "$199",
                note: "Included with 3- and 12-month protocols",
                markers: "38 biomarkers",
                popular: true,
                features: [
                  "Everything in Essential",
                  "IGF-1, thyroid cascade, full hormone axis",
                  "Inflammation markers (hs-CRP, homocysteine)",
                  "Physician review within 24 hours of receipt",
                  "90-day retest included on protocol plans",
                ],
              },
              {
                key: "executive",
                label: "Executive",
                price: "$399",
                note: "Deep-dive panel",
                markers: "50+ biomarkers",
                popular: false,
                features: [
                  "Everything in Comprehensive",
                  "ApoB, Lp(a), fasting insulin, cortisol rhythm",
                  "Micronutrient and iron studies",
                  "Home phlebotomy visit included",
                  "30-minute physician results consult",
                ],
              },
            ].map(({ key, label, price, note, markers, popular, features }, i) => (
              <Reveal key={key} delay={i * 60}>
                <div
                  data-testid={`panel-tier-${key}`}
                  style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: popular ? "var(--nx-fg)" : "#FFFFFF",
                    border: popular ? "1.5px solid var(--nx-fg)" : "1px solid var(--nx-border)",
                    borderRadius: "20px",
                    padding: "2rem",
                  }}
                >
                  {popular && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-11px",
                        left: "2rem",
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--nx-fg)",
                        background: "var(--nx-acid)",
                        padding: "4px 12px",
                        borderRadius: "999px",
                      }}
                    >
                      Most popular
                    </span>
                  )}
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: popular ? "var(--nx-acid)" : "var(--nx-cobalt)",
                      marginBottom: "0.625rem",
                    }}
                  >
                    {label}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "2.5rem",
                        fontWeight: 500,
                        lineHeight: 1,
                        color: popular ? "#FFFFF3" : "var(--nx-fg)",
                      }}
                    >
                      {price}
                    </p>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "12px",
                        color: popular ? "rgba(255,255,243,0.6)" : "var(--nx-fg-muted)",
                      }}
                    >
                      {markers}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      color: popular ? "rgba(255,255,243,0.7)" : "var(--nx-fg-graphite)",
                      marginTop: "0.5rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {note}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", flex: 1, margin: 0, padding: 0, listStyle: "none" }}>
                    {features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                        <Check
                          size={15}
                          strokeWidth={2.2}
                          style={{ color: popular ? "var(--nx-acid)" : "var(--nx-cobalt)", flexShrink: 0, marginTop: "2px" }}
                        />
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "13.5px",
                            lineHeight: 1.55,
                            color: popular ? "rgba(255,255,243,0.85)" : "#4A4A4A",
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "1.75rem" }}>
                    <StartIntakeButton
                      source={`labtesting-tier-${key}`}
                      variant={popular ? "primary" : "outline-light"}
                      size="md"
                      className="w-full"
                    >
                      Begin intake
                    </StartIntakeButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--nx-fg-muted)",
                marginTop: "1.5rem",
                maxWidth: "640px",
              }}
            >
              On 3- and 12-month protocol plans, the Comprehensive panel and every 90-day
              retest are already included — you never pay for labs separately. Home
              phlebotomy can be added to any panel for $149 in most major U.S. metros.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={80}>
            <div className="mt-12">
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500,  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--nx-fg)", marginBottom: "1rem", maxWidth: "480px" }}>
                Every protocol decision starts with a number.
              </p>
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "1rem", color: "#4A4A4A", lineHeight: 1.7, maxWidth: "460px", marginBottom: "1.75rem" }}>
                Your lab panel is the foundation of every Nexphoria protocol. Take the assessment and receive your Quest Diagnostics requisition within 24 hours.
              </p>
              <StartIntakeButton source="labtesting-page" size="lg">
                Start your assessment
              </StartIntakeButton>
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

/* ══════════════════════════════════════════════════════════════════
   BLOODWORK PILLAR — Added as brand-level positioning
   Placed above the existing page so the whole story opens with:
   1. Manifesto  — "Bloodwork isn't a feature. It's the medicine."
   2. Pillars    — 4 reasons peptides without bloodwork = malpractice
   3. Pricing    — Free foundation + paid deep panel + membership
   4. Insurance  — HSA/FSA + superbill path
   ══════════════════════════════════════════════════════════════════ */

/* ── 1 · MANIFESTO ────────────────────────────────────────────── */
function BloodworkManifesto() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--nx-black)", color: "var(--nx-ceramic)" }}
    >
      <div className="h-16 md:h-20" />
      <div className="nx-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-16 md:pb-24">
        <div className="lg:col-span-7">
          <div
            className="inline-flex items-center gap-2 mb-8"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,243,0.55)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--nx-acid)", display: "inline-block",
              }}
            />
            Nexphoria Bloodwork
          </div>

          <h1
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--nx-ceramic)",
              margin: 0,
            }}
          >
            Bloodwork isn't a feature.<br />
            <span style={{ color: "var(--nx-acid)" }}>It&rsquo;s the medicine.</span>
          </h1>

          <p
            className="mt-8"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "19px",
              lineHeight: 1.55,
              color: "rgba(255,255,243,0.75)",
              maxWidth: "56ch",
            }}
          >
            A peptide protocol without a full panel is a guess wearing a lab coat. Nexphoria
            begins every treatment with a physician-ordered blood panel — up to 80 biomarkers,
            drawn at any of 2,500+ Quest locations — and re-tests every 90 days so dose changes
            follow data, not vibes.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="#bloodwork-pricing"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--nx-acid)",
                color: "var(--nx-black)",
                padding: "18px 30px",
                borderRadius: "999px",
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 600, fontSize: "16px",
                letterSpacing: "-0.01em",
              }}
              data-testid="button-blood-pricing"
            >
              See panels &amp; pricing
              <ArrowRight size={18} strokeWidth={2} />
            </Link>

            <Link
              href="/assessment"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500, fontSize: "15px",
                color: "var(--nx-ceramic)",
                borderBottom: "1px solid rgba(255,255,243,0.35)",
                paddingBottom: 2,
              }}
              data-testid="link-blood-assessment"
            >
              Start with the free foundation panel
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </div>

          <div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ borderTop: "1px solid rgba(255,255,243,0.12)", paddingTop: 28 }}
          >
            {[
              { k: "80+", v: "Biomarkers" },
              { k: "2,500+", v: "Quest locations" },
              { k: "48h", v: "Physician review" },
              { k: "90 days", v: "Re-test cadence" },
            ].map((s) => (
              <div key={s.k}>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600, fontSize: "28px",
                    letterSpacing: "-0.02em",
                    color: "var(--nx-ceramic)",
                    lineHeight: 1,
                  }}
                >
                  {s.k}
                </div>
                <div
                  className="mt-2"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 400, fontSize: "12px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,243,0.55)",
                  }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 group">
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{ aspectRatio: "4 / 5", background: "#141414" }}
          >
            <img
              src={bloodworkHero}
              alt="Sterile phlebotomy tray with vacutainer blood collection tubes in soft window light"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2 · PILLARS · why peptides without bloodwork = malpractice ─ */
function BloodworkPillars() {
  const items = [
    {
      k: "01",
      title: "Every peptide changes your labs.",
      body: "Sermorelin and CJC-1295 raise IGF-1 — the same marker linked to cancer risk when elevated. GLP-1s alter lipids and thyroid markers. AOD-9604 shifts liver enzymes. Not measuring is not conservative — it&rsquo;s reckless.",
    },
    {
      k: "02",
      title: "Population &lsquo;normal&rsquo; is a lie.",
      body: "A testosterone of 300 ng/dL is technically in-range and functionally low. Reference ranges are built from the general population — sedentary, aging, unwell. Nexphoria targets the top quartile of healthy peers, age-adjusted.",
    },
    {
      k: "03",
      title: "Dose without data is a wish.",
      body: "If you don&rsquo;t know your baseline free-T, cortisol, SHBG, ApoB, hsCRP, ferritin and homocysteine, no honest physician can dose you. We refuse protocols that skip labs. So should every clinic.",
    },
    {
      k: "04",
      title: "Progress is a graph, not a feeling.",
      body: "&lsquo;I feel better&rsquo; is not a data point. Re-testing at week 12 tells us whether IGF-1 climbed, ApoB stabilized, testosterone reached the top quartile, and whether cortisol crashed. That&rsquo;s medicine.",
    },
  ];

  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--nx-ceramic)" }}
    >
      <div className="nx-container">
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--nx-fg-muted)",
          }}
        >
          <span
            aria-hidden
            style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--nx-acid)", display: "inline-block" }}
          />
          Why it matters
        </div>

        <h2
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "var(--nx-black)",
            margin: 0,
            maxWidth: "22ch",
          }}
        >
          Four reasons every peptide protocol lives or dies on the panel.
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {items.map((it) => (
            <div key={it.k}>
              <div
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-muted)",
                  marginBottom: 12,
                }}
              >
                {it.k}
              </div>
              <h3
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 2.4vw, 28px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "var(--nx-black)",
                  margin: 0,
                }}
                dangerouslySetInnerHTML={{ __html: it.title }}
              />
              <p
                className="mt-4"
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--nx-fg-graphite)",
                  maxWidth: "44ch",
                }}
                dangerouslySetInnerHTML={{ __html: it.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3 · PRICING · Free / Deep / Membership ───────────────────── */
function BloodworkPricing() {
  const tiers = [
    {
      badge: "Included",
      name: "Foundation Panel",
      price: "Free",
      priceNote: "with any active protocol",
      valueNote: "$300 retail value",
      accent: false,
      dark: false,
      features: [
        "40 core biomarkers",
        "Hormones + metabolic + lipids + CBC",
        "Physician review within 48 hours",
        "Quest Diagnostics · walk-in draw",
        "Re-tested every 90 days",
        "Trend dashboard in your portal",
      ],
      cta: "Start assessment",
      href: "/assessment",
    },
    {
      badge: "Most complete",
      name: "Deep Panel",
      price: "$299",
      priceNote: "per quarter",
      valueNote: "or included in membership",
      accent: true,
      dark: true,
      features: [
        "80+ biomarkers — the full workup",
        "ApoB, Lp(a), homocysteine, insulin, HOMA-IR",
        "Thyroid full — TSH, fT3, fT4, rT3, TPO",
        "Inflammatory — hsCRP, IL-6, ferritin, GGT",
        "Longevity — IGF-1, DHEA-S, sex hormones binding globulin",
        "30-minute 1-on-1 physician review call",
      ],
      cta: "Add Deep Panel",
      href: "/assessment",
      hrefQuery: "panel=deep",
    },
    {
      badge: "Recurring",
      name: "Continuous Membership",
      price: "$89",
      priceNote: "per month",
      valueNote: "billed annually · save $228 vs à la carte",
      accent: false,
      dark: false,
      features: [
        "Deep Panel every 90 days (4× / year)",
        "Unlimited async physician messaging",
        "Quarterly 30-min review calls",
        "Personalized biomarker targets",
        "Trend graphs across all 80+ markers",
        "10% off all protocols and add-ons",
      ],
      cta: "Join membership",
      href: "/assessment",
      hrefQuery: "plan=membership",
    },
  ];

  return (
    <section
      id="bloodwork-pricing"
      className="py-24 md:py-32 border-t"
      style={{
        background: "var(--nx-rock)",
        borderColor: "rgba(10,10,10,0.08)",
      }}
    >
      <div className="nx-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--nx-fg-muted)",
              }}
            >
              <span
                aria-hidden
                style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--nx-acid)", display: "inline-block" }}
              />
              Panels &amp; membership
            </div>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--nx-black)",
                margin: 0,
                maxWidth: "22ch",
              }}
            >
              Start free. Go deep when you&rsquo;re ready.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--nx-fg-graphite)",
              maxWidth: "34ch",
            }}
          >
            The Foundation Panel is included with every protocol. Upgrade to Deep or Membership for
            longevity-grade biomarker coverage. All tiers are HSA/FSA eligible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col"
              style={{
                background: t.dark ? "var(--nx-black)" : "var(--nx-ceramic)",
                color: t.dark ? "var(--nx-ceramic)" : "var(--nx-black)",
                borderRadius: 20,
                padding: "36px 32px",
                border: t.accent ? "2px solid var(--nx-acid)" : "1px solid rgba(10,10,10,0.08)",
                boxShadow: t.accent ? "0 30px 60px -20px rgba(198,241,132,0.35)" : "none",
              }}
            >
              {t.badge && (
                <div
                  className="absolute"
                  style={{
                    top: -12, left: 24,
                    background: t.accent ? "var(--nx-acid)" : (t.dark ? "var(--nx-ceramic)" : "var(--nx-black)"),
                    color: t.accent ? "var(--nx-black)" : (t.dark ? "var(--nx-black)" : "var(--nx-ceramic)"),
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600, fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    borderRadius: 999,
                  }}
                >
                  {t.badge}
                </div>
              )}

              <div>
                <h3
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "22px",
                    letterSpacing: "-0.02em",
                    margin: 0,
                    color: "inherit",
                  }}
                >
                  {t.name}
                </h3>
                <div
                  className="mt-6"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "56px",
                    letterSpacing: "-0.035em",
                    lineHeight: 0.95,
                    color: "inherit",
                  }}
                >
                  {t.price}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: t.dark ? "rgba(255,255,243,0.55)" : "var(--nx-fg-muted)",
                  }}
                >
                  {t.priceNote}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.04em",
                    color: t.accent ? "var(--nx-acid)" : (t.dark ? "rgba(255,255,243,0.55)" : "var(--nx-fg-muted)"),
                  }}
                >
                  {t.valueNote}
                </div>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: t.dark ? "rgba(255,255,243,0.85)" : "var(--nx-fg-graphite)",
                    }}
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      style={{
                        flexShrink: 0,
                        marginTop: 2,
                        color: t.accent ? "var(--nx-acid)" : (t.dark ? "var(--nx-acid)" : "var(--nx-black)"),
                      }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href={t.href}
                  className="inline-flex items-center justify-center gap-2 w-full"
                  style={{
                    background: t.accent ? "var(--nx-acid)" : (t.dark ? "var(--nx-ceramic)" : "var(--nx-black)"),
                    color: t.accent ? "var(--nx-black)" : (t.dark ? "var(--nx-black)" : "var(--nx-ceramic)"),
                    padding: "16px 24px",
                    borderRadius: 999,
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    letterSpacing: "-0.01em",
                  }}
                  data-testid={`button-tier-${t.name.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  {t.cta}
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-10 text-center"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "13px",
            color: "var(--nx-fg-muted)",
            letterSpacing: "0.02em",
          }}
        >
          All panels are physician-ordered. All results are reviewed by a board-certified MD before release.
          Add-on panels available: Advanced Longevity ($149), Female Hormone Cycle ($99), Nutrient &amp; Toxin ($129).
        </p>
      </div>
    </section>
  );
}

/* ── 4 · INSURANCE · HSA/FSA + superbill ─────────────────────── */
function BloodworkInsurance() {
  return (
    <section
      className="py-24 md:py-32 border-t"
      style={{ background: "var(--nx-ceramic)", borderColor: "rgba(10,10,10,0.08)" }}
    >
      <div className="nx-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 group order-2 lg:order-1">
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{ aspectRatio: "4 / 3", background: "var(--nx-rock)" }}
          >
            <img
              src={bloodworkReport}
              alt="A printed bloodwork report on a physician's desk with hand-annotated notes and a prescription vial"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            <span
              aria-hidden
              style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--nx-acid)", display: "inline-block" }}
            />
            HSA · FSA · Insurance
          </div>

          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 4.6vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--nx-black)",
              margin: 0,
            }}
          >
            Use your HSA. Submit for reimbursement.
          </h2>

          <p
            className="mt-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--nx-fg-graphite)",
              maxWidth: "44ch",
            }}
          >
            Every Nexphoria panel is physician-ordered under a valid diagnostic code, which means
            it qualifies for HSA and FSA spending. For patients with insurance, we provide an
            itemized superbill you can submit to your carrier for out-of-network reimbursement.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                title: "HSA / FSA eligible on every panel",
                body: "Pay directly with your HSA/FSA debit card at checkout, or reimburse yourself after the fact with your itemized receipt.",
              },
              {
                title: "Letter of Medical Necessity included",
                body: "For FSA reimbursement or IRS documentation, your physician provides an LMN referencing your diagnosis, prescribed protocol, and clinical rationale.",
              },
              {
                title: "Superbill for insurance submission",
                body: "Downloadable, CPT/ICD-10 coded superbill for the physician consult and lab panel. Submit to your carrier for out-of-network reimbursement — many members recover 40–80%.",
              },
              {
                title: "Employer wellness reimbursement",
                body: "If your employer offers a wellness stipend, our panels typically qualify. We provide the documentation. You submit — most see it back within 30 days.",
              },
            ].map((row) => (
              <div key={row.title} className="flex items-start gap-4">
                <Check size={20} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2, color: "var(--nx-black)" }} />
                <div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                      letterSpacing: "-0.01em",
                      color: "var(--nx-black)",
                    }}
                  >
                    {row.title}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: 1.55,
                      color: "var(--nx-fg-graphite)",
                    }}
                  >
                    {row.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-10"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: 1.55,
              color: "var(--nx-fg-muted)",
              maxWidth: "50ch",
            }}
          >
            Reimbursement is subject to your specific HSA/FSA plan rules and insurance carrier
            policy. Nexphoria does not bill insurance directly and cannot guarantee reimbursement.
            We provide the documentation you need to submit.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PartnerLabsSection — AGENT-3
   Partner labs (Quest + Labcorp), three draw options incl. at-home
   kit, and a turnaround timeline. Tokens only. No italics.
   ───────────────────────────────────────────────────────────── */
const PL_FONT = "'General Sans', system-ui, sans-serif";
const PL_NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums lining-nums",
  fontFeatureSettings: "'tnum'",
};

const PARTNER_LABS = [
  {
    name: "Quest Diagnostics",
    stat: "2,500+",
    statLabel: "Patient service centers",
    detail: "Primary draw network. Walk-in at most locations, no appointment required.",
  },
  {
    name: "Labcorp",
    stat: "2,000+",
    statLabel: "Patient service centers",
    detail: "Secondary network for coverage where a Quest center is not nearby.",
  },
];

const DRAW_OPTIONS = [
  {
    icon: Building2,
    title: "Walk-in draw",
    body: "Bring your portal requisition to any Quest or Labcorp center. Most locations accept walk-ins; the draw takes under ten minutes.",
    meta: "No appointment · nationwide",
  },
  {
    icon: Home,
    title: "At-home collection kit",
    body: "A pre-paid kit ships to your door with a guided collection card, lancet, and return mailer. Post it back the same day.",
    meta: "Free shipping both ways",
  },
  {
    icon: Truck,
    title: "Mobile phlebotomist",
    body: "A certified phlebotomist comes to your home or office and performs a full venous draw at a time you choose.",
    meta: "Select metros · scheduled",
  },
];

const TURNAROUND = [
  { day: "Day 0", label: "Collection", desc: "Sample drawn at a center, at home, or by a mobile phlebotomist." },
  { day: "Day 1–2", label: "Lab analysis", desc: "Partner lab runs the full panel and transmits results to your physician." },
  { day: "Day 2–3", label: "Physician review", desc: "Board-certified physician reads every marker within 24 hours of receipt." },
  { day: "Day 3", label: "In your portal", desc: "Results, interpretation, and any dose change appear in your member portal." },
];

function PartnerLabsSection() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      data-testid="section-partner-labs"
    >
      <div className="nx-container max-w-screen-xl">
        <Reveal>
          <p
            style={{
              fontFamily: PL_FONT,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--nx-cobalt)",
              marginBottom: "0.75rem",
            }}
          >
            PARTNER LABS
          </p>
          <h2
            style={{
              fontFamily: PL_FONT,
              fontWeight: 500,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Two national labs. One requisition.
          </h2>
          <p
            style={{
              fontFamily: PL_FONT,
              fontSize: "1.0625rem",
              color: "#4A4A4A",
              lineHeight: 1.65,
              maxWidth: 560,
              marginBottom: "2.5rem",
            }}
          >
            Your portal requisition works at both Quest Diagnostics and Labcorp, so a draw
            site is always within reach — or we bring the draw to you.
          </p>
        </Reveal>

        {/* Partner lab brand cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: "3.5rem" }}>
          {PARTNER_LABS.map((lab, i) => (
            <Reveal key={lab.name} delay={i * 60}>
              <div
                data-testid={`partner-lab-${lab.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: 16,
                  padding: "1.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  backgroundColor: "var(--nx-bg-cream)",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: "var(--nx-cobalt)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FlaskConical size={24} style={{ color: "#FFFFF3" }} strokeWidth={1.75} />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: PL_FONT,
                      fontSize: 20,
                      fontWeight: 600,
                      color: "var(--nx-fg)",
                      letterSpacing: "-0.01em",
                      marginBottom: 4,
                    }}
                  >
                    {lab.name}
                  </p>
                  <p style={{ fontFamily: PL_FONT, fontSize: 13.5, color: "#4A4A4A", lineHeight: 1.5 }}>
                    {lab.detail}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontFamily: PL_FONT,
                      fontSize: 26,
                      fontWeight: 600,
                      color: "var(--nx-fg)",
                      letterSpacing: "-0.02em",
                      ...PL_NUM,
                    }}
                  >
                    {lab.stat}
                  </p>
                  <p
                    style={{
                      fontFamily: PL_FONT,
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
                      marginTop: 2,
                    }}
                  >
                    {lab.statLabel}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Three draw options */}
        <Reveal>
          <p
            style={{
              fontFamily: PL_FONT,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--nx-cobalt)",
              marginBottom: "1.25rem",
            }}
          >
            THREE WAYS TO DRAW
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: "1rem" }}>
          {DRAW_OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            const isKit = opt.title === "At-home collection kit";
            return (
              <Reveal key={opt.title} delay={i * 60}>
                <div
                  data-testid={`draw-option-${opt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: 20,
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {isKit && (
                    <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                      <img
                        src={atHomeKit}
                        alt="Nexphoria at-home blood collection kit — matte box, lancet, collection card, alcohol wipe, and pre-paid return mailer laid out on a warm surface."
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <Icon size={22} strokeWidth={1.6} style={{ color: "var(--nx-cobalt)", marginBottom: 14 }} />
                    <h3
                      style={{
                        fontFamily: PL_FONT,
                        fontSize: 19,
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                        letterSpacing: "-0.01em",
                        marginBottom: 8,
                      }}
                    >
                      {opt.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: PL_FONT,
                        fontSize: 14,
                        color: "#4A4A4A",
                        lineHeight: 1.55,
                        marginBottom: 14,
                        flex: 1,
                      }}
                    >
                      {opt.body}
                    </p>
                    <span
                      style={{
                        fontFamily: PL_FONT,
                        fontSize: 10.5,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--nx-cobalt)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <MapPin size={12} strokeWidth={2} />
                      {opt.meta}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Turnaround timeline */}
        <Reveal>
          <div
            data-testid="turnaround-timeline"
            style={{
              marginTop: "3.5rem",
              border: "1px solid var(--nx-border)",
              borderRadius: 20,
              padding: "1.75rem",
              backgroundColor: "var(--nx-bg-cream)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
              <Clock size={18} strokeWidth={1.8} style={{ color: "var(--nx-cobalt)" }} />
              <p
                style={{
                  fontFamily: PL_FONT,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                }}
              >
                TURNAROUND · 48–72 HOURS END TO END
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TURNAROUND.map((t, i) => (
                <div
                  key={t.day}
                  data-testid={`turnaround-step-${i}`}
                  style={{
                    paddingTop: "1rem",
                    borderTop: "2px solid var(--nx-cobalt)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: PL_FONT,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--nx-cobalt)",
                      marginBottom: 6,
                      ...PL_NUM,
                    }}
                  >
                    {t.day}
                  </p>
                  <p
                    style={{
                      fontFamily: PL_FONT,
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--nx-fg)",
                      marginBottom: 6,
                    }}
                  >
                    {t.label}
                  </p>
                  <p style={{ fontFamily: PL_FONT, fontSize: 13, color: "#4A4A4A", lineHeight: 1.5 }}>
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
