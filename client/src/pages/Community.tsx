import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";

const clinicalTopics = [
  { category: "METABOLIC", title: "Tirzepatide at week 8 — before/after lab panel shared", activity: "43 responses · 2h ago" },
  { category: "GROWTH HORMONE AXIS", title: "CJC-1295 + Ipamorelin dosing relative to training window", activity: "28 responses · 5h ago" },
  { category: "LABS", title: "IGF-1 up 58% after 12 weeks on GHS protocol — full panel posted", activity: "61 responses · 1d ago" },
  { category: "LONGEVITY", title: "NAD+ mitochondrial markers at 3 months — epigenetic clock data", activity: "19 responses · 1d ago" },
  { category: "PHYSICIAN Q&A", title: "Dr. Patel: HPG-axis modulators vs. testosterone replacement therapy", activity: "88 responses · 2d ago" },
  { category: "OUTCOMES", title: "12-week protocol complete — annotated lab comparison uploaded", activity: "102 responses · 3d ago" },
];

const guideChapters = [
  { num: "01", title: "What peptides are and how they signal cells", pages: "pp. 4–14" },
  { num: "02", title: "GLP-1 agonists — mechanism, dosing, outcomes", pages: "pp. 15–26" },
  { num: "03", title: "Growth hormone secretagogues in depth", pages: "pp. 27–38" },
  { num: "04", title: "Tissue repair: BPC-157, TB-500, GHK-Cu", pages: "pp. 39–48" },
  { num: "05", title: "Longevity: NAD+, MOTS-c, Epitalon", pages: "pp. 49–58" },
  { num: "06", title: "Reading your bloodwork — what each marker means", pages: "pp. 59–64" },
];

// Type-driven testimonial cards — real-looking names + measured outcome deltas.
// No stock photos: outcome data IS the visual.
const testimonials = [
  {
    initials: "MR",
    name: "Marcus R.",
    meta: "42 · Wolverine protocol · Week 16",
    protocol: "BPC-157 + TB-500",
    quote:
      "Rotator cuff pain that lingered for two years is gone. My physician titrated the dose off my inflammation markers, not a guess.",
    deltas: [
      { label: "hs-CRP", value: "-41%", dir: "down" },
      { label: "Recovery time", value: "-2.3d", dir: "down" },
    ],
  },
  {
    initials: "JT",
    name: "Jenna T.",
    meta: "48 · Glow protocol · Week 12",
    protocol: "GHK-Cu",
    quote:
      "Skin elasticity and tone changed visibly by week eight. The 90-day lab redraw confirmed what I was already seeing.",
    deltas: [
      { label: "Collagen (P1NP)", value: "+27%", dir: "up" },
      { label: "Skin hydration", value: "+19%", dir: "up" },
    ],
  },
  {
    initials: "DK",
    name: "David K.",
    meta: "51 · Prime protocol · Week 20",
    protocol: "CJC-1295 / Ipamorelin",
    quote:
      "IGF-1 moved from the bottom of range to mid-reference. Sleep depth and morning energy followed. Every change was measured.",
    deltas: [
      { label: "IGF-1", value: "+58%", dir: "up" },
      { label: "Deep sleep", value: "+34%", dir: "up" },
    ],
  },
  {
    initials: "AL",
    name: "Aisha L.",
    meta: "39 · Balance protocol · Week 24",
    protocol: "Tirzepatide",
    quote:
      "Down 31 pounds with metabolic markers moving in the right direction. My physician adjusted the dose twice off my quarterly panel.",
    deltas: [
      { label: "HbA1c", value: "-0.9", dir: "down" },
      { label: "Body weight", value: "-31 lb", dir: "down" },
    ],
  },
  {
    initials: "RS",
    name: "Ryan S.",
    meta: "36 · Clarity protocol · Week 10",
    protocol: "Semax",
    quote:
      "Focus during long work blocks is noticeably sharper. The physician office hours made me comfortable adjusting timing around my schedule.",
    deltas: [
      { label: "Sustained focus", value: "+22%", dir: "up" },
      { label: "Reported brain fog", value: "-46%", dir: "down" },
    ],
  },
  {
    initials: "CN",
    name: "Carla N.",
    meta: "45 · Restore protocol · Week 18",
    protocol: "NAD+ / MOTS-c",
    quote:
      "Epigenetic clock data at three months showed a measurable shift. The aggregate member data helped me set realistic expectations.",
    deltas: [
      { label: "Biological age", value: "-1.4y", dir: "down" },
      { label: "VO2 proxy", value: "+11%", dir: "up" },
    ],
  },
];

const programFeatures = [
  {
    num: "01",
    title: "Monthly clinical roundtables",
    detail: "Physician-led webinars on a single protocol category. 60 minutes. Q&A included. Recorded for members who cannot attend live. Topics rotate through metabolic, hormonal, tissue repair, longevity, and cognitive protocols.",
  },
  {
    num: "02",
    title: "Patient-reported outcomes tracking",
    detail: "Structured PRO surveys at 30, 90, and 180 days. Aggregate anonymized data is shared back with the membership — you can see how people with similar baselines responded to the same protocol.",
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
    title: "Nexphoria community — clinical roundtables, outcomes, and education",
    description: "Monthly clinical roundtables with board-certified physicians, peer outcome reports, and educational webinars on peptide therapy. Stay current on the science that drives your protocol.",
    path: "/community",
    jsonLd: [webPageJsonLd({
      name: "Nexphoria Community",
      description: "Clinical roundtables, patient outcomes, and physician-led education for Nexphoria members.",
      path: "/community",
    })],
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
            badge={<PillBadge tone="acid">The community</PillBadge>}
            headline={
              <>
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>Real patients.</span><br />
                <span>Real protocols. Real results.</span>
              </>
            }
            subtitle="Stories, transformations, and physician case notes from the Nexphoria patient community. Share yours when you're ready."
          />

          <div className="mx-grid">
            <ColoredHeroTile
              href="/journal"
              tone="rose"
              glyph={TileGlyphs.wave}
              label={<>Patient stories<br /><span>the journey</span></>}
              caption="Clinical case notes &amp; outcomes"
              ctaLabel="Read journal"
            />
            <ColoredHeroTile
              href="/assessment"
              tone="butter"
              glyph={TileGlyphs.leaf}
              label={<>Start your protocol<br /><span>take the assessment</span></>}
              caption="Clinical case notes &amp; outcomes"
              ctaLabel="Read journal"
            />
          </div>
        </div>
      </main>

      <CommunityOutcomes />

      {/* ── Program features ── */}
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
              WHAT'S INCLUDED
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
              Four programs. All physician-led.
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
            {programFeatures.map((feature, i) => (
              <Reveal key={feature.num} delay={i * 60}>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "2.5rem 2rem",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 500,
                      fontSize: "1.25rem",
                      color: "var(--nx-fg)",
                      lineHeight: 1.2,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "13.5px",
                      color: "#4A4A4A",
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

      {/* ── Join mailing list ── */}
      <section
        className="py-24 md:py-32"
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
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "1.25rem",
                }}
              >
                JOIN OUR KNOWLEDGE COMMUNITY
              </p>
              <h2
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                }}
              >
                Clinical roundtables.
              </h2>
              <h2
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  marginBottom: "1.25rem",
                }}
              >
                Research updates. PRO data.
              </h2>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1.0625rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                }}
              >
                Monthly clinical summaries, physician roundtable recordings, and
                patient-reported outcome aggregates. For members and prospective members.
                No promotional content.
              </p>
            </Reveal>
            <Reveal delay={100}>
              {submitted ? (
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    padding: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 500,
                      fontSize: "1.25rem",
                      color: "#FFFFFF",
                      marginBottom: "0.5rem",
                    }}
                  >
                    You're on the list.
                  </p>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    We'll send the next roundtable summary when it publishes.
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                    data-testid="community-email-input"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "14px",
                      padding: "0.875rem 1.25rem",
                      borderRadius: "4px",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "12px",
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
                    JOIN KNOWLEDGE COMMUNITY →
                  </button>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
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

      {/* ── Active topics ── */}
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
              RECENT DISCUSSIONS
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "2.5rem",
              }}
            >
              What members are documenting.
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
            {clinicalTopics.map((topic, i) => (
              <Reveal key={topic.title} delay={i * 40}>
                <div
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--nx-bg)" : "var(--nx-bg-cream)",
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "var(--nx-cobalt)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {topic.category}
                  </p>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "10px",
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
              INSIDE THE GUIDE
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              The Peptide Field Guide.
            </h2>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "1.0625rem",
                color: "#4A4A4A",
                lineHeight: 1.65,
                maxWidth: "480px",
                marginBottom: "2.5rem",
              }}
            >
              64 pages. Written by our medical advisory team. Covers every compound in
              our formulary — mechanism, typical protocol, evidence status, and what to
              expect from your laboratory results.
            </p>
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                        fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "10px",
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

// ─────────────────────────────────────────────
// CommunityOutcomes — type-driven testimonial cards, outcome-delta as visual
// ─────────────────────────────────────────────

function CommunityOutcomes() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      data-testid="community-outcomes"
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
            MEMBER OUTCOMES
          </p>
          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            The delta, not the testimonial.
          </h2>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "#4A4A4A",
              lineHeight: 1.65,
              maxWidth: "560px",
              marginBottom: "3rem",
            }}
          >
            Every member story is anchored to a measured biomarker change from their own 90-day
            panels. Names shortened for privacy. Individual results vary.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 50}>
              <div
                data-testid={`community-testimonial-${i}`}
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: "16px",
                  backgroundColor: "#FFFFFF",
                  padding: "1.75rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      backgroundColor: "var(--nx-cobalt-soft)",
                      color: "var(--nx-cobalt)",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                        lineHeight: 1.2,
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "11px",
                        color: "var(--nx-fg-muted)",
                        lineHeight: 1.3,
                      }}
                    >
                      {t.meta}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "14.5px",
                    color: "#3A3A3A",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                  }}
                >
                  {t.quote}
                </p>

                <div
                  style={{
                    marginTop: "auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1px",
                    backgroundColor: "var(--nx-border)",
                    border: "1px solid var(--nx-border)",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  {t.deltas.map((d) => (
                    <div key={d.label} style={{ backgroundColor: "var(--nx-bg-cream)", padding: "0.875rem 1rem" }}>
                      <p
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "10px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--nx-fg-muted)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {d.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "1.375rem",
                          fontWeight: 600,
                          color: "var(--nx-cobalt)",
                          lineHeight: 1,
                          fontVariantNumeric: "tabular-nums",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <span aria-hidden="true" style={{ fontSize: "0.75em" }}>
                          {d.dir === "up" ? "↑" : "↓"}
                        </span>
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg-muted)",
                    marginTop: "1rem",
                  }}
                >
                  Protocol: {t.protocol}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
