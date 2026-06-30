import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { physicians } from "@/data/physicians";

export default function Physicians() {
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
              MEDICAL ADVISORY
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "0.5rem",
                maxWidth: "820px",
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
                maxWidth: "820px",
              }}
            >
              It demands a clinician.
            </h1>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                color: "#4A4A4A",
                lineHeight: 1.65,
                maxWidth: "640px",
              }}
            >
              Every Nexphoria protocol is reviewed and prescribed by a U.S.-licensed,
              board-certified physician. Physicians on our panel are DEA-registered and
              credentialed by ABIM, ABFM, or specialty board. They review your actual
              laboratory panel — not a questionnaire substitute.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Doctor grid ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)" }}
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
              THE PANEL
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              Five physicians.
            </h2>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3.5rem",
              }}
            >
              One clinical standard.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "2px",
            }}
          >
            {physicians.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 80}>
                <div
                  style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}
                  data-testid={`physician-card-${i}`}
                >
                  {/* Full-bleed headshot at 4:5 */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4/5",
                      backgroundColor: "var(--nx-bg-cream)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Deep Sage hairline */}
                  <div style={{ height: "2px", backgroundColor: "var(--nx-cobalt)" }} />

                  {/* Card content */}
                  <div style={{ padding: "1.5rem 1.25rem 2rem" }}>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "1.375rem",
                        color: "var(--nx-fg)",
                        lineHeight: 1.2,
                        marginBottom: "0.4rem",
                      }}
                    >
                      {doc.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--nx-cobalt)",
                        marginBottom: "0.375rem",
                      }}
                    >
                      {doc.specialty} · {doc.institution}
                    </p>
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "8px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--nx-fg-muted)",
                        marginBottom: "0.875rem",
                      }}
                    >
                      {doc.credentials}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "13px",
                        color: "#4A4A4A",
                        lineHeight: 1.65,
                        marginBottom: "1rem",
                      }}
                    >
                      {doc.bio}
                    </p>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--nx-cobalt)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                      aria-label={`Read more about ${doc.name}`}
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Medical standards ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
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
                  OUR STANDARDS
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "0.5rem",
                  }}
                >
                  Every physician on our panel
                </h2>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "2rem",
                  }}
                >
                  meets this standard.
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  Every physician on our panel is U.S.-licensed, board-certified, and
                  DEA-registered. We do not contract with international or non-licensed
                  providers. Every physician reviews actual laboratory results before
                  issuing a prescription — intake questionnaires alone are insufficient.
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {[
                    { label: "ABIM, ABFM, or specialty board certification required", detail: "No exceptions. Board certification is the minimum — not a differentiator." },
                    { label: "Laboratory review mandatory before any Rx", detail: "38-biomarker Quest Diagnostics panel must be on file. No prescription precedes labs." },
                    { label: "Licensed in member's state of residence", detail: "Physician licensure is state-specific. Members are matched to a licensed provider in their state." },
                    { label: "DEA registration active and current", detail: "Required for prescribing scheduled and controlled compounds within our formulary." },
                    { label: "Quarterly case review with medical director", detail: "All active protocols are reviewed against updated clinical literature on a rolling 90-day cycle." },
                  ].map((item) => (
                    <li
                      key={item.label}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                        paddingBottom: "1rem",
                        borderBottom: "1px solid var(--nx-border)",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "var(--nx-cobalt)",
                          flexShrink: 0,
                          marginTop: "8px",
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "var(--nx-fg)",
                            marginBottom: "2px",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: "13px",
                            color: "#4A4A4A",
                            lineHeight: 1.55,
                          }}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={120}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: "0",
                  borderLeft: "none",
                }}
                className="md:pl-16 md:border-l"
              >
                <div
                  style={{
                    borderLeft: "3px solid var(--nx-cobalt)",
                    paddingLeft: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: "var(--nx-fg)",
                      lineHeight: 1.35,
                      marginBottom: "2rem",
                    }}
                  >
                    "Peptide medicine is precision pharmacology — labs, dosing, monitoring,
                    and a physician who understands your individual baseline. Without all four,
                    it is guesswork with a syringe."
                  </p>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                        marginBottom: "2px",
                      }}
                    >
                      Dr. Arjun Patel, MD
                    </p>
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--nx-cobalt)",
                      }}
                    >
                      Endocrinology · Cleveland Clinic · ABIM Board-Certified
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Your physician review is included."
        sub="Quest Diagnostics labs drawn first. Board-certified MD review within 48 hours."
      />
    </SiteLayout>
  );
}
