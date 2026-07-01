import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { TrustStatsStrip } from "@/components/TrustStatsStrip";
import { useSeo } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";

import lifestylePharmacyShelf from "@/assets/brand/lifestyle-pharmacy-shelf.webp";
import md1 from "@/assets/brand/physicians/md-1.webp";
import md2 from "@/assets/brand/physicians/md-2.webp";
import md3 from "@/assets/brand/physicians/md-3.webp";
import md4 from "@/assets/brand/physicians/md-4.webp";

// ─── Shared style helpers ──────────────────────────────────────────────────

const eyebrow: React.CSSProperties = {
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
};

const eyebrowRule = (
  <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
);

const sectionHeading: React.CSSProperties = {
  fontFamily: "'General Sans', system-ui, sans-serif",
  fontWeight: 500,
  
  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
  color: "var(--nx-fg)",
  lineHeight: 1.12,
  marginBottom: "1.25rem",
};

const bodyCopy: React.CSSProperties = {
  fontFamily: "'General Sans', system-ui, sans-serif",
  fontSize: "1.0625rem",
  color: "#4A4A4A",
  lineHeight: 1.7,
};

const monoCaption: React.CSSProperties = {
  fontFamily: "'General Sans', system-ui, sans-serif",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--nx-fg-muted)",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Founded", value: "2024" },
  { label: "Team", value: "12 people" },
  { label: "Medical advisors", value: "5" },
  { label: "Headquarters", value: "New York City" },
];

const TIMELINE = [
  { date: "2024 · Q1", title: "Founded", desc: "Nexphoria incorporated in New York with a pharmacy-first thesis." },
  { date: "2024 · Q3", title: "First 100 patients", desc: "Initial cohort onboarded under full physician supervision." },
  { date: "2025 · Q2", title: "Medical advisory board", desc: "Five board-certified specialists formalized clinical governance." },
  { date: "2025 · Q4", title: "Pharmacy partnership", desc: "Exclusive 503A compounding partnership under USP <797>." },
  { date: "2026 · Q1", title: "Telehealth license expansion", desc: "Physician licensure extended across 15 states." },
  { date: "2026 · Q2", title: "Third-party labs", desc: "Independent batch verification added to every release." },
];

const LEADERSHIP = [
  {
    photo: md4,
    name: "Chiya Yosopov",
    title: "Founder & CEO",
    bio: "New York City. Built Nexphoria after watching the peptide market scale on testimonial instead of clinical evidence. The conviction: if peptide therapy is a clinical practice, it requires a pharmacy, a physician, and laboratory accountability behind it — not a personality. Chiya structured the company in the order a clinic would: physician oversight first, 503A compounding second, labs gating everything. Peak Potential, Pinnacle Performance — through mechanism, not marketing.",
  },
  {
    photo: md1,
    name: "Dr. Sarah Chen, MD",
    title: "Chief Medical Officer",
    bio: "ABIM board-certified endocrinologist, 12 years at NYU Langone; sets all clinical protocols.",
  },
  {
    photo: md2,
    name: "Marcus Torres",
    title: "Head of Pharmacy Ops",
    bio: "Two decades in 503A sterile compounding; owns cold-chain integrity end to end.",
  },
  {
    photo: md3,
    name: "Aliyah Park",
    title: "Head of Patient Experience",
    bio: "Designs the intake-to-monitoring journey around clarity, consent, and patient agency.",
  },
];

const ADVISORS = [
  { name: "Dr. Elena Rossi, MD", cred: "Endocrinology", inst: "Johns Hopkins" },
  { name: "Dr. James Okafor, MD", cred: "Internal Medicine", inst: "Mayo Clinic" },
  { name: "Dr. Priya Nair, PharmD", cred: "Clinical Pharmacology", inst: "UCSF" },
  { name: "Dr. Daniel Weiss, MD", cred: "Sports Medicine", inst: "Stanford Health" },
  { name: "Dr. Maya Lindqvist, MD", cred: "Preventive Medicine", inst: "Cleveland Clinic" },
];

const MISSION = [
  { num: "01", title: "Clinical-grade above all", desc: "Every protocol meets the standard a physician would accept for their own patient. No shortcuts for conversion." },
  { num: "02", title: "Physician oversight, not influencers", desc: "Protocols are designed by board-certified MDs reviewing your labs — never by marketing or testimonial." },
  { num: "03", title: "Transparency in compounding", desc: "503A, USP <797>, batch-tested, third-party verified. We publish what's in the vial and who made it." },
  { num: "04", title: "Patient agency through data", desc: "You see your own biomarkers and the reasoning behind every dose. Mechanism before marketing claim." },
];

const PRESS = ["GQ", "Men's Health", "Forbes", "Bloomberg", "Biohacker"];

const PRO_QUOTES = [
  {
    quote: "Finally a peptide provider that gates everything on bloodwork. This is how compounded therapy is supposed to work.",
    name: "Dr. R. Alvarez, MD",
    role: "Internal Medicine",
  },
  {
    quote: "The 503A compliance and batch testing put Nexphoria in a different category from the gray-market sellers.",
    name: "Dr. K. Mbeki, PharmD",
    role: "Clinical Pharmacology",
  },
  {
    quote: "Quarterly recalibration off measured labs — not symptom report — is the part most providers skip. They don't.",
    name: "Dr. L. Tanaka, MD",
    role: "Preventive Medicine",
  },
];

const FEATURED_IN = [
  { outlet: "GQ", line: "On the men\'s health category growing up: physician-supervised peptide protocols as the next tier of personal optimization." },
  { outlet: "Men\'s Health", line: "Profiled as part of a wave of clinical-grade alternatives to the gray-market peptide supplement sector." },
  { outlet: "Forbes", line: "Named among clinical-first health startups rewriting the rules of compounded therapy." },
  { outlet: "Bloomberg", line: "Cited for its 503A pharmacy standards, batch-testing transparency, and cold-chain logistics infrastructure." },
  { outlet: "Biohacker", line: "Featured for insisting on laboratory accountability as a prerequisite rather than a premium add-on." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  useSeo({
    title: "About | Nexphoria",
    description: "Peptide therapy needs a pharmacy, not an influencer. Meet the team behind clinical-grade peptide care.",
    path: "/about",
  });

  return (
    <SiteLayout navVariant="showcase">
      {/* ════════════════ MAXIMUS HERO ════════════════ */}
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">About Nexphoria</PillBadge>}
            headline={
              <><span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>A pharmacy for people</span><br /><span>who refuse to settle</span>.</>
            }
            subtitle="We build physician-supervised peptide protocols for performance, longevity, and recovery. Built by clinicians. Compounded in U.S. 503A pharmacies."
          />

          <div className="mx-grid">
            <ColoredHeroTile
              href="/about"
              tone="sand"
              glyph={TileGlyphs.leaf}
              label={<>Physician-led</>}
              caption="Board-certified medical directors"
              ctaLabel="Our team"
            />
            <ColoredHeroTile
              href="/about"
              tone="sage"
              glyph={TileGlyphs.wave}
              label={<>Pharmacy-grade</>}
              caption="Board-certified medical directors"
              ctaLabel="Our team"
            />
          </div>
        </div>
      </main>

      {/* ════════════════ ORIGIN STORY (editorial, 2 columns) ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-origin"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}WHY WE EXIST</p>
            <h2 style={{ ...sectionHeading, maxWidth: "700px", marginBottom: "2.5rem" }}>
              The market matured faster than the standards did.
            </h2>
          </Reveal>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}
            className="md:grid-cols-2"
          >
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <p style={bodyCopy}>
                  For years, the peptide market operated in an unregulated gray zone — powders of
                  unknown provenance, unstated concentrations, no physician involvement, and no
                  laboratory accountability. Consumers were left to source, reconstitute, and
                  self-administer compounds with no pharmacist or physician in the chain. The primary
                  distribution channel was influencer testimonial, not clinical evidence.
                </p>
                <p style={bodyCopy}>
                  We started Nexphoria from a single conviction: peptide therapy is a clinical
                  practice, and a clinical practice needs a pharmacy behind it — not a personality.
                  A pharmacy is accountable to regulators, to sterility standards, to a chain of
                  custody. An influencer is accountable to an algorithm.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <p style={bodyCopy}>
                  So we built the company in the order a clinic would: physician oversight first,
                  503A compounding under USP &lt;797&gt; second, laboratory accountability gating
                  everything. Labs before guesswork. Physicians before protocols. Mechanism before
                  marketing claim.
                </p>
                <div
                  style={{
                    borderRadius: "6px",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    border: "1px solid var(--nx-border)",
                  }}
                >
                  <img
                    src={lifestylePharmacyShelf}
                    alt="Licensed 503A compounding pharmacy shelf with labeled peptide preparations"
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════ TIMELINE ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-timeline"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}THE MILESTONES</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "3rem" }}>
              How we got here, in order.
            </h2>
          </Reveal>
          <div className="about-timeline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {TIMELINE.map((m, i) => (
              <Reveal key={m.date} delay={i * 40}>
                <div
                  data-testid={`about-milestone-${i}`}
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: "6px",
                    backgroundColor: "#FFFFFF",
                    padding: "1.75rem 1.5rem",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "var(--nx-cobalt)",
                      marginBottom: "1rem",
                    }}
                  />
                  <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "0.625rem" }}>{m.date}</p>
                  <h3
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 500,
                      fontSize: "1.375rem",
                      color: "var(--nx-fg)",
                      lineHeight: 1.15,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {m.title}
                  </h3>
                  <p style={{ ...bodyCopy, fontSize: "0.875rem" }}>{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ LEADERSHIP ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-leadership"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}LEADERSHIP</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "3rem" }}>
              The people accountable for your care.
            </h2>
          </Reveal>
          <div
            className="about-leadership-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}
          >
            {LEADERSHIP.map((p, i) => (
              <Reveal key={p.name} delay={i * 50}>
                <div
                  data-testid={`about-leader-${i}`}
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                    height: "100%",
                  }}
                >
                  <div style={{ aspectRatio: "1/1", overflow: "hidden", backgroundColor: "var(--nx-bg-cream)" }}>
                    <img
                      src={p.photo}
                      alt={p.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "1.5rem 1.375rem" }}>
                    <h3
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontWeight: 500,
                        fontSize: "1.25rem",
                        color: "var(--nx-fg)",
                        lineHeight: 1.15,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "0.875rem" }}>{p.title}</p>
                    <p style={{ ...bodyCopy, fontSize: "0.8125rem" }}>{p.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ MEDICAL ADVISORY BOARD ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-advisory"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}MEDICAL ADVISORY BOARD</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "3rem" }}>
              Clinical governance, by name.
            </h2>
          </Reveal>
          <div
            className="about-advisory-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}
          >
            {ADVISORS.map((a, i) => (
              <Reveal key={a.name} delay={i * 40}>
                <div
                  data-testid={`about-advisor-${i}`}
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: "6px",
                    backgroundColor: "#FFFFFF",
                    padding: "1.75rem 1.5rem",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      backgroundColor: "var(--nx-cobalt-soft)",
                      color: "var(--nx-fg)",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 500,
                      fontSize: "1.125rem",
                      marginBottom: "1rem",
                    }}
                    aria-hidden="true"
                  >
                    {a.name.split(" ")[1]?.[0] ?? a.name[0]}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "1.125rem",
                      color: "var(--nx-fg)",
                      lineHeight: 1.2,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {a.name}
                  </h3>
                  <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "0.25rem" }}>{a.cred}</p>
                  <p style={{ ...monoCaption }}>{a.inst}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ MISSION TILES ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-mission"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}OUR PRINCIPLES</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "3rem" }}>
              Four commitments. No exceptions.
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
            {MISSION.map((m, i) => (
              <div
                key={m.num}
                data-testid={`about-mission-${i}`}
                style={{ backgroundColor: "var(--nx-bg-cream)", padding: "2.5rem 2rem" }}
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
                  {m.num}
                </p>
                <h3
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    
                    fontWeight: 500,
                    fontSize: "1.375rem",
                    color: "var(--nx-fg)",
                    lineHeight: 1.2,
                    marginBottom: "0.75rem",
                  }}
                >
                  {m.title}
                </h3>
                <p style={{ ...bodyCopy, fontSize: "14px" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ PRESS + RECOGNITION ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-press"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}PRESS & RECOGNITION</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "2.5rem" }}>
              Covered for the standard, not the hype.
            </h2>
          </Reveal>

          {/* Press wordmarks */}
          <Reveal>
            <div
              data-testid="about-press-strip"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1.5rem 2.5rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid var(--nx-border)",
                marginBottom: "3rem",
              }}
            >
              <span style={{ ...monoCaption, flexShrink: 0 }}>FEATURED IN —</span>
              {PRESS.map((p) => (
                <span
                  key={p}
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    color: "var(--nx-fg)",
                    opacity: 0.55,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>

          {/* 3-quote testimonial row */}
          <div
            className="about-quotes-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "3rem" }}
          >
            {PRO_QUOTES.map((q, i) => (
              <Reveal key={i} delay={i * 50}>
                <figure
                  data-testid={`about-quote-${i}`}
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: "6px",
                    backgroundColor: "#FFFFFF",
                    padding: "1.75rem",
                    height: "100%",
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <blockquote
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 400,
                      fontSize: "1.0625rem",
                      color: "var(--nx-fg)",
                      lineHeight: 1.5,
                      margin: 0,
                      marginBottom: "1.5rem",
                    }}
                  >
                    "{q.quote}"
                  </blockquote>
                  <figcaption style={{ marginTop: "auto" }}>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                      }}
                    >
                      {q.name}
                    </p>
                    <p style={{ ...monoCaption }}>{q.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Detailed featured-in list */}
          <Reveal>
            <div
              data-testid="about-featured-list"
              style={{
                border: "1px solid var(--nx-border)",
                borderRadius: "6px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
              }}
            >
              {FEATURED_IN.map((f, i) => (
                <div
                  key={f.outlet}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    padding: "1.25rem 1.5rem",
                    borderBottom: i < FEATURED_IN.length - 1 ? "1px solid var(--nx-border)" : "none",
                  }}
                  className="about-featured-row"
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "1.0625rem",
                      color: "var(--nx-fg)",
                    }}
                  >
                    {f.outlet}
                  </p>
                  <p style={{ ...bodyCopy, fontSize: "0.875rem" }}>{f.line}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════ THE NEXPHORIA STANDARD (retained) ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-standard"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}THE NEXPHORIA STANDARD</p>
            <h2 style={{ ...sectionHeading, marginBottom: "3rem" }}>Four requirements. No exceptions.</h2>
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
              { num: "01", title: "Laboratory-gated", detail: "A 38-biomarker Quest panel is required before any prescription is issued. No labs, no protocol." },
              { num: "02", title: "Physician-prescribed", detail: "Board-certified US physicians review your labs and write your prescription. A patient, not a checkout flow." },
              { num: "03", title: "503A-compounded", detail: "Sterile-prepared in an FDA-registered 503A US pharmacy under USP <797>. Batch-tested, cold-chain shipped." },
              { num: "04", title: "Monitored quarterly", detail: "Labs rerun every 90 days. Dose adjusted from measured data, not symptom report. Included, not an add-on." },
            ].map((item) => (
              <div key={item.num} style={{ backgroundColor: "var(--nx-bg-cream)", padding: "2.5rem 2rem" }}>
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
                  {item.num}
                </p>
                <h3
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    
                    fontWeight: 500,
                    fontSize: "1.375rem",
                    color: "var(--nx-fg)",
                    lineHeight: 1.2,
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ ...bodyCopy, fontSize: "14px" }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CONTACT CTA ════════════════ */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-contact-cta"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <Link href="/contact" data-testid="about-contact-link" style={{ textDecoration: "none" }}>
              <div
                className="about-contact-tile"
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  padding: "2.5rem 2.25rem",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  cursor: "pointer",
                }}
              >
                <div>
                  <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "0.75rem" }}>
                    QUESTIONS BEFORE YOU START?
                  </p>
                  <h3
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: "var(--nx-fg)",
                      lineHeight: 1.1,
                    }}
                  >
                    Talk to our team.
                  </h3>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "var(--nx-fg)",
                    color: "var(--nx-bg-cream)",
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.875rem 1.75rem",
                    borderRadius: "100px",
                    flexShrink: 0,
                  }}
                >
                  CONTACT US <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>


      {/* ════════════════ WHO WE SERVE ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-who-we-serve"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}DARE TO DEFY</p>
            <h2 style={{ ...sectionHeading, maxWidth: "700px", marginBottom: "2.5rem" }}>
              We serve the ones who <span>refuse to accept the average.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-2">
            <Reveal>
              <div
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: 6,
                  backgroundColor: "#FFFFFF",
                  padding: "2.5rem 2rem",
                  height: "100%",
                }}
              >
                <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "1.25rem" }}>WHO WE\'RE BUILT FOR</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    "High-performers who want clinical-grade protocols backed by mechanism, not influencer endorsement.",
                    "Athletes and executives who measure outcomes with bloodwork, not subjective feeling.",
                    "Anyone who has maxed out lifestyle optimization and wants the next level of physiological precision.",
                    "Patients who want a physician who actually reads their labs before prescribing.",
                    "The type of person who asks \"why\" before \"how much\".",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--nx-cobalt)", flexShrink: 0, marginTop: 7 }} />
                      <p style={{ ...bodyCopy, fontSize: "0.9375rem", margin: 0 }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: 6,
                  backgroundColor: "var(--nx-bg-cream)",
                  padding: "2.5rem 2rem",
                  height: "100%",
                }}
              >
                <p style={{ ...monoCaption, color: "#8B5A2B", marginBottom: "1.25rem" }}>WHO WE\'RE NOT FOR</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    "Anyone who wants to skip bloodwork and go straight to a protocol. That is not how this works.",
                    "Patients seeking a physician who will approve whatever they request.",
                    "Those expecting overnight results from a two-week cycle with no follow-up.",
                    "Anyone sourcing from overseas research suppliers or gray-market providers.",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ display: "inline-block", width: 8, height: 2, backgroundColor: "#8B5A2B", flexShrink: 0, marginTop: 10 }} />
                      <p style={{ ...bodyCopy, fontSize: "0.9375rem", margin: 0, color: "#6B6B6B" }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════ Manifesto + stats + final CTA (retained) ════════════════ */}
      <section
        style={{ backgroundColor: "var(--nx-cobalt)", padding: "6rem 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                color: "#FFFFFF",
                lineHeight: 1.4,
                maxWidth: "800px",
              }}
            >
              "Precision medicine is not a marketing category. It is a commitment to treating every
              patient as a unique biological system — not a population average. Labs before
              guesswork. Physicians before protocols. Mechanism before marketing claim. That is
              Nexphoria."
            </p>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginTop: "2.5rem",
              }}
            >
              THE NEXPHORIA MEDICAL TEAM
            </p>
          </Reveal>
        </div>
      </section>

      <TrustStatsStrip
        eyebrow="By the numbers"
        heading="The Nexphoria record — in receipts, not adjectives."
        variant="dark"
      />

      <FinalCTAStrip
        gender="women"
        title="Beyond Boundaries. Beyond Limits."
        sub="Start your intake and receive a physician-reviewed protocol built for your physiology. Quest Diagnostics labs included."
      />

      <style>{`
        @media (min-width: 768px) {
          .about-stat-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .about-stat-grid .about-stat-cell { border-top: none !important; }
          .about-stat-grid .about-stat-cell-0 { border-left: none !important; }
          .about-stat-grid .about-stat-cell-1,
          .about-stat-grid .about-stat-cell-2,
          .about-stat-grid .about-stat-cell-3 { border-left: 1px solid var(--nx-border) !important; }
          .about-timeline-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .about-leadership-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .about-advisory-grid { grid-template-columns: repeat(5, 1fr) !important; }
          .about-quotes-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        .about-contact-tile:hover { border-color: var(--nx-cobalt) !important; }
      `}</style>
    </SiteLayout>
  );
}
