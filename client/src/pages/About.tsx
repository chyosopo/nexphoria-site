import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";

import editorialPharmacy from "@/assets/brand/editorial-pharmacy.jpg";
import editorialPrescription from "@/assets/brand/editorial-prescription.jpg";

export default function About() {
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
              ABOUT NEXPHORIA
            </p>
            <h1
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
              We build peptide protocols the way pharmacies used to be built — by physicians,
              for patients.
            </h1>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "#4A4A4A",
                lineHeight: 1.6,
                maxWidth: "560px",
              }}
            >
              That is our mission. Nothing more. Nothing less.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Why we exist ── */}
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
                  WHY WE EXIST
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
                  The standard of care was missing.
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
                    For decades, the peptide market operated in an unregulated gray zone — powders
                    of unclear provenance, unstated concentrations, no physician involvement, no
                    blood work, and no accountability. Members were left to research and self-administer
                    without a pharmacist or physician in the chain.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "1.0625rem",
                      color: "#4A4A4A",
                      lineHeight: 1.7,
                    }}
                  >
                    Nexphoria exists to change that. We bring the pharmacy back — prescribed by
                    licensed physicians, compounded under cGMP in FDA-registered 503A facilities,
                    and shipped ready to inject. Blood-tested before and after. Physician-monitored
                    throughout.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "1.0625rem",
                      color: "#4A4A4A",
                      lineHeight: 1.7,
                    }}
                  >
                    This is the standard of care that should have existed from the beginning.
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
                  src={editorialPharmacy}
                  alt="Nexphoria 503A compounding pharmacy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How we differ ── */}
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
              HOW WE DIFFER
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
              Four commitments. Non-negotiable.
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
                title: "Blood-tested",
                detail:
                  "65-marker panel before every prescription. Quarterly retests with active protocols. No guessing. No one-size-fits-all dosing.",
              },
              {
                num: "02",
                title: "MD-prescribed",
                detail:
                  "Board-certified US physicians review your labs and write your prescription. You are a patient, not a customer in a checkout funnel.",
              },
              {
                num: "03",
                title: "503A-compounded",
                detail:
                  "Every compound is sterile-prepared in an FDA-registered 503A US pharmacy under cGMP standards. Batch-tested. Cold-chain shipped.",
              },
              {
                num: "04",
                title: "Ready to inject",
                detail:
                  "Pre-filled syringes. No reconstitution. No measuring. Your kit arrives complete — with instructions reviewed by your physician.",
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

      {/* ── Where we operate ── */}
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
                  alt="Physician prescribing peptide protocol"
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
                  Licensed where you live.
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
                  We currently serve members in: California, Texas, Florida, New York, Arizona,
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
                  Our 503A pharmacy partners hold licenses in each state. Telehealth physicians
                  are licensed to prescribe where you reside. We're expanding continuously —
                  enter your zip code during intake to confirm availability.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What we promise ── */}
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
              WHAT WE PROMISE
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
              The promises that bind us.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "0",
              maxWidth: "720px",
              borderTop: "1px solid var(--nx-border)",
            }}
          >
            {[
              { label: "You will always be a patient, not a customer.", sub: "Every decision is clinical first. Your physician has final say." },
              { label: "Your labs will always precede your prescription.", sub: "No exceptions. No workarounds. No one-size defaults." },
              { label: "Your compounds will always be made in the United States.", sub: "503A compounding under cGMP. Batch-tested. No foreign sourcing." },
              { label: "Your data will never be sold.", sub: "Health data stays with your care team. Full stop." },
            ].map((promise) => (
              <Reveal key={promise.label}>
                <div
                  style={{
                    padding: "1.75rem 0",
                    borderBottom: "1px solid var(--nx-border)",
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--nx-cobalt)",
                      flexShrink: 0,
                      marginTop: "10px",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "1.125rem",
                        color: "var(--nx-fg)",
                        lineHeight: 1.35,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {promise.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "13px",
                        color: "var(--nx-fg-muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {promise.sub}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
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
              "Precision medicine isn't a marketing category. It's the commitment to treating
              every patient as a unique biological system — not an average. Labs before
              guesswork. Physicians before protocols. Science before sales. That's Nexphoria."
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
        sub="Start your intake. Blood panel included with every protocol."
      />
    </SiteLayout>
  );
}
