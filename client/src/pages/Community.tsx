import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";

const sampleTopics = [
  { channel: "#glp1-stack", title: "Tirzepatide week 8 — labs before/after posted", activity: "43 replies · 2h ago" },
  { channel: "#ghs-peptides", title: "CJC-1295 + Ipamorelin: when to dose relative to training", activity: "28 replies · 5h ago" },
  { channel: "#labs-sharing", title: "IGF-1 up 58% after 12 weeks on GHS protocol", activity: "61 replies · 1d ago" },
  { channel: "#longevity", title: "NAD+ panel — mitochondrial markers 3 months in", activity: "19 replies · 1d ago" },
  { channel: "#physician-qa", title: "Dr. Patel AMA: HPG axis modulators vs TRT", activity: "88 replies · 2d ago" },
  { channel: "#protocols", title: "First cycle complete — detailed writeup with photos", activity: "102 replies · 3d ago" },
];

const guideChapters = [
  { num: "01", title: "What peptides are and how they signal cells", pages: "pp. 4–14" },
  { num: "02", title: "GLP-1 agonists — mechanism, dosing, outcomes", pages: "pp. 15–26" },
  { num: "03", title: "Growth hormone secretagogues in depth", pages: "pp. 27–38" },
  { num: "04", title: "Tissue repair: BPC-157, TB-500, GHK-Cu", pages: "pp. 39–48" },
  { num: "05", title: "Longevity stack: NAD+, MOTS-c, Epitalon", pages: "pp. 49–58" },
  { num: "06", title: "Reading your blood panel — what each marker means", pages: "pp. 59–64" },
];

export default function Community() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

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
              COMMUNITY
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
              Join the Nexphoria community.
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
              Members sharing real labs, outcomes, and protocol experience.
              A place to ask questions, compare notes, and learn from the people living this.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Two big cards ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {/* Discord card */}
            <Reveal>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "3rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "1.25rem",
                  }}
                >
                  DISCORD SERVER
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "1.25rem",
                  }}
                >
                  Join the conversation.
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
                  2,400+ members sharing real lab results, protocol timelines, and honest outcome
                  data. Organized channels for each protocol, a physician Q&A thread, and a
                  member-only labs-sharing channel.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    marginBottom: "2rem",
                    paddingTop: "0.5rem",
                  }}
                >
                  {[
                    { num: "2,400+", label: "MEMBERS" },
                    { num: "18", label: "CHANNELS" },
                    { num: "48h", label: "PHYSICIAN Q&A" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 500,
                          fontSize: "1.625rem",
                          color: "var(--nx-fg)",
                          lineHeight: 1,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {stat.num}
                      </p>
                      <p
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "8px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          color: "var(--nx-fg-muted)",
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://discord.gg/nexphoria"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="community-discord-join"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "var(--nx-cobalt)",
                    color: "#FFFFFF",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.875rem 1.75rem",
                    borderRadius: "100px",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                  }}
                >
                  JOIN DISCORD
                  <ExternalLink size={13} />
                </a>
              </div>
            </Reveal>

            {/* eBook card */}
            <Reveal delay={100}>
              <div
                style={{
                  backgroundColor: "var(--nx-cobalt)",
                  padding: "3rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: "1.25rem",
                  }}
                >
                  FREE GUIDE · 64 PAGES
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    marginBottom: "1.25rem",
                  }}
                >
                  The Peptide Field Guide.
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  Every compound we offer — mechanism, outcomes, typical dosing, week-by-week
                  timeline. Written by our medical team. Free to any member or prospective member.
                </p>

                {submitted ? (
                  <div
                    style={{
                      backgroundColor: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      padding: "1.25rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      Check your inbox — the guide is on its way.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      data-testid="community-email-input"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "14px",
                        padding: "0.875rem 1.25rem",
                        borderRadius: "100px",
                        border: "1px solid rgba(255,255,255,0.25)",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "#FFFFFF",
                        outline: "none",
                      }}
                    />
                    <button
                      type="submit"
                      data-testid="community-guide-submit"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        backgroundColor: "#FFFFFF",
                        color: "var(--nx-cobalt)",
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.875rem 1.75rem",
                        borderRadius: "100px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      GET THE GUIDE →
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Recent Discord activity ── */}
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
              ACTIVE TOPICS
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "2.5rem",
              }}
            >
              What members are discussing.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {sampleTopics.map((topic, i) => (
              <Reveal key={topic.title} delay={i * 40}>
                <div
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--nx-bg)" : "var(--nx-bg-cream)",
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "var(--nx-cobalt)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {topic.channel}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      lineHeight: 1.4,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {topic.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    {topic.activity}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide chapters ── */}
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
              INSIDE THE GUIDE
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "2.5rem",
              }}
            >
              The Peptide Field Guide — chapter by chapter.
            </h2>
          </Reveal>

          <div
            style={{
              maxWidth: "640px",
              borderTop: "1px solid var(--nx-border)",
            }}
          >
            {guideChapters.map((ch, i) => (
              <Reveal key={ch.num} delay={i * 40}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.5rem",
                    padding: "1.25rem 0",
                    borderBottom: "1px solid var(--nx-border)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "var(--nx-cobalt)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {ch.num}
                  </p>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "14.5px",
                        fontWeight: 500,
                        color: "var(--nx-fg)",
                        lineHeight: 1.4,
                      }}
                    >
                      {ch.title}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      color: "var(--nx-fg-muted)",
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  >
                    {ch.pages}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
