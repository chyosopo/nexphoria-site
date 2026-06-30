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
                fontStyle: "italic",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
                maxWidth: "820px",
              }}
            >
              Designed by US board-certified physicians.
            </h1>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "#4A4A4A",
                lineHeight: 1.6,
                maxWidth: "640px",
              }}
            >
              Every Nexphoria protocol is reviewed and prescribed by licensed US physicians,
              board-certified in internal medicine, endocrinology, and integrative health.
              They review your actual labs — not a questionnaire.
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
              THE TEAM
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3.5rem",
              }}
            >
              Five physicians. One standard.
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
                        marginBottom: "0.875rem",
                      }}
                    >
                      {doc.specialty} · {doc.institution}
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
                    marginBottom: "2rem",
                  }}
                >
                  What every Nexphoria protocol requires.
                </h2>
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
                    { label: "Every protocol MD-reviewed", detail: "Board-certified physician sign-off on every prescription. ABIM, ABFM, or specialty board-certified." },
                    { label: "Mandatory blood panel before Rx", detail: "65-marker comprehensive baseline required before any prescription is written. No labs, no protocol." },
                    { label: "503A compounding only", detail: "Sterile, FDA-registered 503A pharmacy. cGMP standards. Batch-tested for purity and potency." },
                    { label: "Continuous quarterly monitoring", detail: "Labs re-run every 12 weeks. Dose adjustments from real data, not guesswork." },
                    { label: "Secure physician messaging", detail: "Direct async access to your prescribing physician between scheduled check-ins." },
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
                            fontSize: "15px",
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
                    "Peptide medicine done right isn't a supplement category. It's precision
                    pharmacology — labs, dosing, monitoring, and a physician who knows
                    your baseline."
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
                      Endocrinology · Cleveland Clinic
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
        title="Your physician is waiting."
        sub="Blood panel included. MD review within 48 hours."
      />
    </SiteLayout>
  );
}
