/* JOB: the brand's community surface — belonging, never a second storefront. */
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/SignatureTile";
import { PillBadge } from "@/components/PillBadge";
import { F } from "@/lib/typography";
import communityDawnGroup from "@/assets/brand/community-dawn-group.webp";

// Forward-looking description of what the membership community will include at
// launch. No live threads, member counts, testimonials, or engagement metrics
// are presented — the community has not launched. This page is a waitlist gate.
const programFeatures = [
  {
    num: "01",
    title: "Monthly clinical roundtables",
    detail: "Physician-led webinars on a single protocol category. 60 minutes. Q&A included. Recorded for members who cannot attend live. Topics rotate through metabolic, hormonal, tissue repair, longevity, and cognitive protocols.",
  },
  {
    num: "02",
    title: "Patient-reported outcomes tracking",
    detail: "Structured PRO surveys at 30, 90, and 180 days. Aggregate anonymized data is shared back with the membership — you will be able to see how people with similar baselines responded to the same protocol.",
  },
  {
    num: "03",
    title: "Educational webinars",
    detail: "Bi-monthly educational sessions covering peptide pharmacology, laboratory interpretation, emerging research, and case discussions presented by our medical advisory panel.",
  },
  {
    num: "04",
    title: "Physician office hours",
    detail: "Monthly open-format Q&A with a rotating physician from our panel. Questions submitted in advance. Responses published to the knowledge base for all members.",
  },
];

export default function Community() {
  useSeo({
    title: "Nexphoria community — launching soon",
    description: "The Nexphoria member community is launching soon: monthly clinical roundtables with board-certified physicians, aggregate patient-reported outcomes, and educational webinars on peptide therapy. Join the waitlist.",
    path: "/community",
    jsonLd: [webPageJsonLd({
      name: "Nexphoria Community",
      description: "Clinical roundtables, patient outcomes, and physician-led education for Nexphoria members — launching soon.",
      path: "/community",
    }),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Community", path: "/community" }]),
    ],
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">Community · launching soon</PillBadge>}
            headline={
              <>
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 62%, transparent)" }}>Physician-led.</span><br />
                <span>Outcome-driven. Launching soon.</span>
              </>
            }
            subtitle="The Nexphoria member community launches alongside your protocol — clinical roundtables, aggregate patient-reported outcomes, and physician-led education. Join the waitlist to be there on day one."
          />

          <div className="mx-grid">
            <ColoredHeroTile
              href="/journal"
              tone="rose"
              glyph={TileGlyphs.wave}
              label={<>Clinical journal<br /><span>read now</span></>}
              caption="Physician case notes &amp; the science"
              ctaLabel="Read journal"
            />
            <ColoredHeroTile
              href="/assessment"
              tone="butter"
              glyph={TileGlyphs.leaf}
              label={<>Start your protocol<br /><span>take the assessment</span></>}
              caption="Physician-guided protocol match"
              ctaLabel="Take the assessment"
            />
          </div>
        </div>
      </main>


      {/* ── Launch notice ── */}
      <section
        className="nx-section-y"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
        data-testid="community-launch-notice"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <div
              style={{
                border: "1.5px solid var(--nx-border)",
                borderRadius: "var(--nx-r-md)",
                backgroundColor: "var(--nx-ceramic)",
                padding: "2.85rem 2.35rem",
                maxWidth: "760px",
              }}
            >
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-sm)",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "1rem",
                }}
              >
                Launching soon
              </p>
              <h2
                style={{
                  fontFamily: F,
                  fontWeight: 500,
                  fontSize: "var(--nx-t-h3)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.15,
                  marginBottom: "0.75rem",
                }}
              >
                The member community isn't live yet.
              </h2>
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-body)",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.7,
                }}
              >
                We're building the community around real protocols and measured outcomes — not
                engagement theater. There are no live threads, member counts, or testimonials to
                show yet, and we won't fabricate them. When it opens, membership includes the
                programs below. Join the waitlist and we'll notify you the day it launches.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Editorial — the community is people, shown before it's promised ── */}
      <section className="nx-container max-w-screen-xl" style={{ paddingBottom: "var(--nx-sp-band)" }}>
        <Reveal>
          <div style={{ borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-3)", aspectRatio: "3 / 1.4" }}>
            <img
              src={communityDawnGroup}
              alt="Four adults laugh together outside a gym at dawn after a shared workout, breath visible in the cold air"
              loading="lazy"
              decoding="async"
              width={1600}
              height={1063}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </Reveal>
      </section>

      {/* ── What membership will include ── */}
      <section
        className="nx-section-y"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: F,
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
              WHAT MEMBERSHIP WILL INCLUDE
            </p>
            <h2
              style={{
                fontFamily: F,
                fontWeight: 500,
                fontSize: "var(--nx-t-h2)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              Four programs. All physician-led.
            </h2>
          </Reveal>
          <div
            role="list"
            aria-label="What membership will include"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {programFeatures.map((feature, i) => (
              <Reveal key={feature.num} delay={i * 60}>
                <div
                  role="listitem"
                  style={{
                    backgroundColor: "var(--nx-ceramic)",
                    padding: "2.85rem 2.25rem",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: "var(--nx-cobalt)",
                      marginBottom: "1rem",
                    }}
                  >
                    {feature.num}
                  </p>
                  <h3
                    style={{
                      fontFamily: F,
                      fontWeight: 500,
                      fontSize: "var(--nx-t-lg)",
                      color: "var(--nx-fg)",
                      lineHeight: 1.2,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-sm)",
                      color: "var(--nx-fg-graphite)",
                      lineHeight: 1.65,
                    }}
                  >
                    {feature.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join the waitlist ── */}
      <section
        className="nx-section-y"
        style={{ backgroundColor: "var(--nx-cobalt)", borderTop: "1px solid var(--nx-border)" }}
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
                  fontFamily: F,
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "1.25rem",
                }}
              >
                JOIN THE WAITLIST
              </p>
              <h2
                style={{
                  fontFamily: F,
                  fontWeight: 500,
                  fontSize: "var(--nx-t-h2)",
                  color: "var(--nx-ceramic)",
                  lineHeight: 1.1,
                  marginBottom: "1.25rem",
                }}
              >
                Be there on launch day.
              </h2>
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-body)",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                }}
              >
                One email when the community opens — plus the first clinical roundtable
                schedule. No promotional content. Unsubscribe anytime.
              </p>
            </Reveal>
            <Reveal delay={100}>
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "var(--nx-r-sm)",
                    padding: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: F,
                      fontWeight: 500,
                      fontSize: "var(--nx-t-lg)",
                      color: "var(--nx-ceramic)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    You're on the waitlist.
                  </p>
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-sm)",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    We'll email you the day the community launches.
                    Written sparingly. Unsubscribe anytime.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label
                    style={{
                      fontFamily: F,
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.55)",
                    }}
                    htmlFor="community-email"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="community-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    aria-required="true"
                    aria-describedby="community-waitlist-note"
                    data-testid="community-email-input"
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-sm)",
                      padding: "0.875rem 1.25rem",
                      borderRadius: "4px",
                      border: "1px solid rgba(255,255,255,0.25)",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "var(--nx-ceramic)",
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
                      backgroundColor: "var(--nx-ceramic)",
                      color: "var(--nx-cobalt)",
                      fontFamily: F,
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.875rem 1.75rem",
                      borderRadius: "100px",
                      border: "none",
                      cursor: "pointer",
                      alignSelf: "flex-start",
                    }}
                  >
                    JOIN THE WAITLIST <span aria-hidden="true">→</span>
                  </button>
                  <p
                    id="community-waitlist-note"
                    style={{
                      fontFamily: F,
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    No promotional email. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
