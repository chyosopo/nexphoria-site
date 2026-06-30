import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { useSeo } from "@/lib/seo";

// Editorial images
import editorialPrescription from "@/assets/brand/editorial-prescription.webp";
import editorialBloodwork from "@/assets/brand/editorial-bloodwork.webp";
import lifestyleCompoundingRoom from "@/assets/brand/lifestyle-compounding-room.webp";
import lifestyleShippingPackage from "@/assets/brand/lifestyle-shipping-package.webp";

const steps = [
  {
    num: "01",
    title: "Assessment.",
    sub: "INTAKE — 5 MINUTES",
    detail:
      "Complete a structured medical intake covering your health history, current medications, and clinical objectives. Responses are passed through algorithmic safety checks that flag contraindications before physician review begins. The intake is not a commitment; it is the first step in clinical eligibility screening.",
    timeline: "~5 minutes",
    image: editorialPrescription,
    imageAlt: "Patient completing structured medical intake",
  },
  {
    num: "02",
    title: "Physician review.",
    sub: "BOARD-CERTIFIED · 24–48H TURNAROUND",
    detail:
      "A board-certified physician licensed in your state of residence reviews your intake and, once bloodwork is available, your complete laboratory panel. Review is completed within 24–48 hours. If a requested protocol is clinically inappropriate for your baseline, the physician declines it or proposes a modified protocol. Physician discretion is final.",
    timeline: "24–48 hours",
    image: editorialBloodwork,
    imageAlt: "Physician reviewing patient laboratory results",
  },
  {
    num: "03",
    title: "Pharmacy compounding.",
    sub: "503A LICENSED · USP-797 COMPLIANT",
    detail:
      "Approved protocols are compounded by a 503A-licensed compounding pharmacy operating within the United States under USP-797 sterile compounding standards. Compounds are batch-tested for potency and sterility prior to release. Packaging is cold-chain configured for temperature-sensitive peptides.",
    timeline: "3–5 business days",
    image: lifestyleCompoundingRoom,
    imageAlt: "Pharmacist working in 503A sterile compounding room with ISO-classified cleanroom equipment",
  },
  {
    num: "04",
    title: "Delivery and monitoring.",
    sub: "OVERNIGHT SHIPPING · QUARTERLY LABS",
    detail:
      "Your protocol ships overnight via cold-chain carrier. Included with every active protocol: Quest Diagnostics laboratory draws every 90 days, physician check-ins following each draw, and protocol adjustments based on measured biomarker changes. Monitoring is not an add-on — it is the standard.",
    timeline: "Overnight; quarterly reassessment",
    image: lifestyleShippingPackage,
    imageAlt: "Nexphoria protocol cold-chain shipping package prepared for overnight delivery",
  },
];

export default function HowItWorks() {
  useSeo({
    title: "How It Works | Nexphoria",
    description: "From assessment to physician review to compounded delivery in 4 steps.",
    path: "/how-it-works",
  });
  return (
    <SiteLayout navVariant="gate">
      {/* ── Hero ── */}
      <section
        className="py-32 md:py-40"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
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
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              HOW IT WORKS
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "0.5rem",
                maxWidth: "700px",
              }}
            >
              Peptide therapy is a clinical practice.
            </h1>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
                maxWidth: "700px",
              }}
            >
              It demands a clinical process.
            </h1>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                color: "#4A4A4A",
                lineHeight: 1.65,
                maxWidth: "560px",
              }}
            >
              Four steps from intake to protocol delivery. Every step is medically supervised,
              laboratory-gated, and fulfilled by a licensed US compounding pharmacy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Steps — alternating image/text ── */}
      {steps.map((step, i) => {
        const isEven = i % 2 === 0;
        const bg = isEven ? "var(--nx-bg)" : "var(--nx-bg-cream)";

        return (
          <section
            key={step.num}
            style={{
              backgroundColor: bg,
              borderTop: "1px solid var(--nx-border)",
            }}
            data-testid={`step-${step.num}`}
          >
            <div
              className="nx-container max-w-screen-xl py-24 md:py-32"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "3rem",
                alignItems: "center",
              }}
            >
              {/* Image */}
              <Reveal delay={isEven ? 0 : 60}>
                <div
                  style={{
                    gridColumn: isEven ? "1" : "1",
                    gridRow: "1",
                    borderRadius: "4px",
                    overflow: "hidden",
                    aspectRatio: "16/9",
                    backgroundColor: "var(--nx-bg-cream)",
                  }}
                  className={isEven ? "md:order-first" : "md:order-last"}
                >
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </Reveal>

              {/* Text */}
              <Reveal delay={isEven ? 60 : 0}>
                <div style={{ padding: "0" }} className={isEven ? "md:order-last" : "md:order-first"}>
                  {/* Huge step number */}
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 300,
                      fontSize: "clamp(6rem, 12vw, 9rem)",
                      color: "transparent",
                      lineHeight: 0.9,
                      marginBottom: "1rem",
                      WebkitTextStroke: "1.5px var(--nx-cobalt)",
                      userSelect: "none",
                      letterSpacing: "-0.04em",
                    }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--nx-cobalt)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.sub}
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 500,
                      fontStyle: "italic",
                      fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                      color: "var(--nx-fg)",
                      lineHeight: 1.15,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {step.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "1.0625rem",
                      color: "#4A4A4A",
                      lineHeight: 1.65,
                      marginBottom: "1.5rem",
                      maxWidth: "480px",
                    }}
                  >
                    {step.detail}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "1px",
                        backgroundColor: "var(--nx-fg-muted)",
                      }}
                    />
                    {step.timeline}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ── What we don't do ── */}
      <section
        style={{
          backgroundColor: "var(--nx-bg-cream)",
          borderTop: "1px solid var(--nx-border)",
          padding: "4rem 0",
        }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
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
                WHAT WE DON'T DO
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.2,
                  marginBottom: "1.25rem",
                }}
              >
                We are not telemedicine for everything.{" "}
                <em>We are a peptide pharmacy.</em>
              </h2>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1.0625rem",
                  color: "#4A4A4A",
                  lineHeight: 1.7,
                  marginBottom: "0.875rem",
                }}
              >
                If a board-certified physician determines that peptide therapy is
                inappropriate for your current health status, we say so. We do not
                issue approvals to preserve conversion rates. The physician's assessment
                is final, and declinations are documented in your file.
              </p>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1.0625rem",
                  color: "#4A4A4A",
                  lineHeight: 1.7,
                }}
              >
                We do not treat acute illness, primary care conditions, or psychiatric
                presentations. If your intake reveals a condition requiring a different
                clinical pathway, we will tell you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Ready to start CTA strip ── */}
      <section
        style={{
          backgroundColor: "var(--nx-cobalt)",
          padding: "5rem 0",
        }}
      >
        <div className="nx-container max-w-screen-xl text-center">
          <Reveal>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1rem",
              }}
            >
              — BEGIN YOUR INTAKE
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#FFFFFF",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              The intake takes five minutes.
            </h2>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#FFFFFF",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              The physician review takes 24–48 hours.
            </h2>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
                maxWidth: "480px",
                margin: "0 auto 2.5rem",
              }}
            >
              Quest Diagnostics labs included with every protocol. No contracts.
              Physician review at no additional charge.
            </p>
            <StartIntakeButton
              productSlug="how-it-works-cta"
              source="how-it-works"
              size="xl"
            >
              START YOUR INTAKE →
            </StartIntakeButton>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
