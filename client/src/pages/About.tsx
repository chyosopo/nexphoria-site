import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";

import editorialPharmacy from "@/assets/brand/editorial-pharmacy.webp";
import editorialPrescription from "@/assets/brand/editorial-prescription.webp";
import lifestylePharmacyShelf from "@/assets/brand/lifestyle-pharmacy-shelf.webp";

export default function About() {
  useSeo({
    title: "About | Nexphoria",
    description: "Peptide therapy needs a pharmacy, not an influencer.",
    path: "/about",
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
              OUR ORIGIN
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.08,
                marginBottom: "0.5rem",
                maxWidth: "900px",
              }}
            >
              Peptide therapy needs a pharmacy,
            </h1>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.08,
                marginBottom: "1.5rem",
                maxWidth: "900px",
              }}
            >
              not an influencer.
            </p>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                color: "#4A4A4A",
                lineHeight: 1.65,
                maxWidth: "560px",
              }}
            >
              That observation is the reason Nexphoria exists. Not to grow a community,
              sell a lifestyle, or occupy a market segment. To provide clinical-grade
              peptide pharmacy services the way pharmacies are supposed to operate —
              with physician oversight, licensed compounding, and laboratory accountability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── What's wrong with peptide commerce ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
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
              <div>
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
                  WHAT'S WRONG WITH PEPTIDE COMMERCE TODAY
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "1.5rem",
                  }}
                >
                  The market matured faster than the standards did.
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "1.0625rem",
                      color: "#4A4A4A",
                      lineHeight: 1.7,
                    }}
                  >
                    For years, the peptide market operated in an unregulated gray zone — powders
                    of unknown provenance, unstated concentrations, no physician involvement, and
                    no laboratory accountability. Consumers were left to source, reconstitute, and
                    self-administer compounds with no pharmacist or physician in the chain. The
                    primary distribution channel was influencer testimonial, not clinical evidence.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "1.0625rem",
                      color: "#4A4A4A",
                      lineHeight: 1.7,
                    }}
                  >
                    Even as legitimate compounding pharmacies entered the market, the information
                    ecosystem remained distorted by marketing incentives. Outcome claims circulated
                    without laboratory substantiation. Protocols were designed around product
                    availability, not individual physiology.
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
                  src={lifestylePharmacyShelf}
                  alt="Licensed 503A compounding pharmacy shelf with precisely labeled peptide preparations"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The Nexphoria standard ── */}
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
              THE NEXPHORIA STANDARD
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              Four requirements. No exceptions.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {[
              {
                num: "01",
                title: "Laboratory-gated",
                detail:
                  "A 38-biomarker Quest Diagnostics panel is required before any prescription is issued. No labs, no protocol. This is not a policy — it is the clinical minimum for safe dose calibration.",
              },
              {
                num: "02",
                title: "Physician-prescribed",
                detail:
                  "Board-certified US physicians review your labs and write your prescription. You are a patient under a physician's care, not a consumer executing a checkout flow.",
              },
              {
                num: "03",
                title: "503A-compounded",
                detail:
                  "Every compound is sterile-prepared in an FDA-registered 503A US pharmacy under USP-797 standards. Batch-tested for identity, potency, and sterility. Cold-chain shipped.",
              },
              {
                num: "04",
                title: "Monitored quarterly",
                detail:
                  "Labs rerun every 90 days with every active protocol. Dose adjustments are made from measured data, not subjective symptom report. Monitoring is included, not an add-on.",
              },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  backgroundColor: "var(--nx-bg-cream)",
                  padding: "2.5rem 2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--nx-cobalt)",
                    marginBottom: "1rem",
                  }}
                >
                  {item.num}
                </p>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "1.375rem",
                    color: "var(--nx-fg)",
                    lineHeight: 1.2,
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "14px",
                    color: "#4A4A4A",
                    lineHeight: 1.65,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who we serve / who we don't ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "start",
            }}
            className="md:grid-cols-2"
          >
            <Reveal>
              <div>
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
                  WHO WE SERVE
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                    marginBottom: "1.25rem",
                  }}
                >
                  Adults who want clinical accountability.
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  Adults 21 and older, resident in a state where our physicians hold active
                  licensure, who are seeking peptide therapy prescribed and monitored by a
                  board-certified physician. Patients who have had a prior peptide or hormonal
                  protocol from another provider and want to move to a supervised, laboratory-
                  verified approach. People who want to understand the mechanism of what
                  they are taking, not just the marketing claim.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
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
                  WHO WE DON'T SERVE
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                    marginBottom: "1.25rem",
                  }}
                >
                  We are not the right fit for everyone.
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  We do not serve patients seeking prescriptions to confirm decisions they have
                  already made. We do not serve patients who decline laboratory evaluation.
                  We do not serve individuals with active cancer, uncontrolled cardiovascular
                  disease, or pregnancy seeking peptide protocols — the clinical risk profile
                  for these populations requires specialist management outside our scope.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                  }}
                >
                  If a physician determines that peptide therapy is inappropriate for you,
                  we say so. That is not a failure of service. That is the service.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Where we operate ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
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
            <Reveal delay={100}>
              <div
                style={{
                  borderRadius: "4px",
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  backgroundColor: "var(--nx-bg-cream)",
                }}
              >
                <img
                  src={editorialPrescription}
                  alt="Physician reviewing patient file"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal>
              <div>
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
                  WHERE WE OPERATE
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "1.25rem",
                  }}
                >
                  Licensed where you reside.
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  Currently serving members in: California, Texas, Florida, New York, Arizona,
                  Colorado, Illinois, Washington, Georgia, Nevada, Massachusetts, New Jersey,
                  Ohio, Pennsylvania, and Virginia.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                  }}
                >
                  Our 503A pharmacy partners hold active licenses in each operating state.
                  Physicians are licensed to prescribe in the state where you reside at time
                  of prescription. Expanding continuously — confirm availability at intake.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Manifesto closing ── */}
      <section
        style={{
          backgroundColor: "var(--nx-cobalt)",
          padding: "6rem 0",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                color: "#FFFFFF",
                lineHeight: 1.4,
                maxWidth: "800px",
              }}
            >
              "Precision medicine is not a marketing category. It is a commitment to treating
              every patient as a unique biological system — not a population average. Labs before
              guesswork. Physicians before protocols. Mechanism before marketing claim. That is Nexphoria."
            </p>
            <div style={{ marginTop: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                THE NEXPHORIA MEDICAL TEAM
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Pharmacy-grade. Physician-prescribed."
        sub="Start your intake. Quest Diagnostics labs included with every protocol."
      />
    </SiteLayout>
  );
}
