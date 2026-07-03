import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, orgJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ArrowUpRight, Microscope, ShieldCheck, Beaker, Scale, HeartPulse, MessageSquare } from "lucide-react";
import { BenefitTile, BenefitTileGrid } from "@/components/BenefitTile";

import lifestylePharmacyShelf from "@/assets/brand/lifestyle-pharmacy-shelf.webp";
import { FONT } from "@/lib/typography";

/* ─────────────────────────────────────────────────────────────
   About — founder + mission narrative. reference-tier.
   Hero + proof stats → The problem we saw → Our approach (3 pillars)
   → The team → Standards → manifesto + CTA.
   General Sans throughout. No italics. No serif.
   ───────────────────────────────────────────────────────────── */

// ─── Shared style helpers ──────────────────────────────────────────────────

const eyebrow: React.CSSProperties = {
  fontFamily: FONT,
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
  fontFamily: FONT,
  fontWeight: 600,
  fontSize: "clamp(2rem, 4.2vw, 3.25rem)",
  letterSpacing: "-0.03em",
  color: "var(--nx-fg)",
  lineHeight: 1.04,
  marginBottom: "1.25rem",
};

const bodyCopy: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: "var(--nx-t-body)",
  color: "var(--nx-fg-graphite)",
  lineHeight: 1.7,
};

const monoCaption: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--nx-fg-muted)",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const PROOF_STATS = [
  { value: "38", label: "Biomarkers per panel" },
  { value: "503A", label: "state-licensed pharmacy" },
  { value: "90 days", label: "Recalibration cadence" },
  { value: "100%", label: "Physician-reviewed" },
];

const PILLARS = [
  {
    num: "01",
    title: "Physician-guided",
    desc: "Board-certified US physicians review your labs and write every prescription. A patient, not a checkout flow. Protocols are designed by MDs reading your bloodwork, never by marketing or testimonial.",
  },
  {
    num: "02",
    title: "Compounded",
    desc: "Sterile-prepared in an state-licensed 503A US pharmacy under USP <797>. Batch-tested, third-party verified, cold-chain shipped. We publish what is in the vial and who made it.",
  },
  {
    num: "03",
    title: "Measured",
    desc: "A 38-biomarker panel drawn at a CLIA-certified partner laboratory is required before any prescription. Labs rerun every 90 days. Dose adjusted from measured data, not symptom report. Included, not an add-on.",
  },
];

// Role-based description of the functions accountable for care.
// No individual names, photos, or institution claims — prescribing is
// performed by independent, U.S.-licensed physicians via our telehealth partner.
const ROLES = [
  {
    title: "Medical leadership",
    desc: "Board-certified U.S. physicians own the clinical standard that gates every prescription — physician oversight first, always.",
  },
  {
    title: "Physician review",
    desc: "A licensed physician reads your labs and intake and writes every prescription. A patient, not a checkout flow — never an algorithm.",
  },
  {
    title: "Pharmacy operations",
    desc: "Sterile 503A compounding under USP <797>, batch-tested and third-party verified, with cold-chain integrity owned end to end.",
  },
  {
    title: "Patient experience",
    desc: "The intake-to-monitoring journey is built around clarity, consent, and patient agency.",
  },
];

// Fields of practice reviewed on the network — specialties, not named individuals or institutions.
const ADVISORY_SPECIALTIES = [
  "Internal Medicine",
  "Endocrinology",
  "Sports Medicine",
  "Preventive Medicine",
  "Clinical Pharmacology",
];

const STANDARDS = [
  {
    num: "01",
    title: "HIPAA-compliant",
    detail: "PHI encrypted in transit and at rest. Business Associate Agreements with every partner touching your data.",
  },
  {
    num: "02",
    title: "503A / USP <797>",
    detail: "Every prescription compounded to sterile-preparation standards in an state-licensed US pharmacy.",
  },
  {
    num: "03",
    title: "Third-party batch testing",
    detail: "Independent identity, purity, sterility, and endotoxin verification on every release.",
  },
  {
    num: "04",
    title: "Laboratory-gated prescribing",
    detail: "No labs, no protocol. CLIA-certified partner-laboratory panels required before and throughout therapy.",
  },
];

const PRESS = ["GQ", "Men's Health", "Forbes", "Bloomberg", "Biohacker"];

// ─── Page ─────────────────────────────────────────────────────────────────────

/* ── About FAQ data ──────────────────────────────────────────────── */
const ABOUT_FAQ_ITEMS = [
  {
    q: "Who founded Nexphoria?",
    a: "Nexphoria was founded by a team of physicians, pharmacists, and health-technology operators who saw firsthand the risks of unregulated peptide self-administration. The platform was built to provide the same level of clinical rigor patients expect from a specialist office — prescription review, pharmacy-grade compounding, and lab monitoring — through an accessible telehealth interface.",
  },
  {
    q: "What makes Nexphoria different from other peptide companies?",
    a: "Nexphoria is a physician-supervised platform, not a supplement company. Every compound is prescribed by a board-certified clinician, compounded in a 503A-licensed U.S. pharmacy, batch-tested with a Certificate of Analysis, and monitored with CLIA-certified partner-laboratory panels every 90 days. Most peptide providers online are supplement companies or research-chemical vendors with no physician oversight.",
  },
  {
    q: "Is Nexphoria affiliated with Bask Health?",
    a: "Nexphoria uses Bask Health as its telehealth infrastructure partner. Bask Health is a licensed telehealth platform that connects patients with board-certified physicians. The prescribing physicians you interact with through Nexphoria are independent licensed clinicians — Nexphoria does not employ physicians or influence clinical decision-making.",
  },
  {
    q: "Is Nexphoria accredited or regulated?",
    a: "Nexphoria operates as a telehealth platform under applicable U.S. state telehealth laws. The compounding pharmacies Nexphoria partners with are 503A-licensed and subject to state pharmacy board oversight and FDA inspection. Physicians are board-certified and licensed in the states where they practice. Nexphoria itself is not a pharmacy or a medical practice.",
  },
];

export default function About() {
  useSeo({
    title: "About Nexphoria — physician-founded, pharmacy-grade peptide care",
    description:
      "Nexphoria is a physician-guided peptide platform with 503A compounding, board-certified physician oversight, and CLIA-certified partner-laboratory monitoring.",
    path: "/about",
    jsonLd: [
      webPageJsonLd({
        name: "About Nexphoria",
        description: "Physician-guided peptide therapy platform with 503A compounding, board-certified physicians, and CLIA-certified partner-laboratory monitoring.",
        path: "/about",
      }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
      faqJsonLd(ABOUT_FAQ_ITEMS),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      {/* ════════════════ EDITORIAL HERO + PROOF STATS ════════════════ */}
      <section
        data-testid="about-hero"
        aria-labelledby="about-h1"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container" style={{ paddingTop: 76, paddingBottom: 0 }}>
          <Reveal>
            <p style={{ ...eyebrow, marginBottom: "1.25rem" }}>{eyebrowRule}About</p>
            {/* Wikipedia-style definition — AI parseable */}
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-base)",
                color: "var(--nx-fg-muted)",
                lineHeight: 1.6,
                marginBottom: "1rem",
                maxWidth: 680,
              }}
            >
              Nexphoria is a U.S.-based physician-supervised peptide therapy platform that delivers prescription compounded peptides through licensed telehealth, with every batch third-party tested and 90-day biomarker follow-up included in every subscription.
            </p>
            <h1
              id="about-h1"
              style={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: "clamp(2.75rem, 6vw, 4.75rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: "var(--nx-fg)",
                maxWidth: 960,
              }}
            >
              <span style={{ color: "color-mix(in oklab, var(--nx-fg) 34%, transparent)" }}>
                Peptide therapy needs a pharmacy,
              </span>{" "}
              not an influencer.
            </h1>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-lg)",
                lineHeight: 1.55,
                color: "var(--nx-fg-graphite)",
                maxWidth: 660,
                marginTop: 26,
              }}
            >
              We build physician-supervised peptide protocols for performance, longevity, and
              recovery. Designed by clinicians. Compounded in US 503A pharmacies. Gated on your
              bloodwork, not a testimonial.
            </p>
          </Reveal>
        </div>

        {/* Proof stat row */}
        <div className="nx-container" style={{ paddingTop: 56, paddingBottom: 0 }}>
          <Reveal>
          <div
            className="about-proof-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              borderTop: "1px solid var(--nx-border)",
            }}
          >
            {PROOF_STATS.map((s, i) => (
              <div
                key={s.label}
                data-testid={`about-proof-${i}`}
                className={`about-proof-cell about-proof-cell-${i}`}
                style={{
                  padding: "2rem 1.5rem 2.25rem",
                  borderBottom: "1px solid var(--nx-border)",
                }}
              >
                <p
                  style={{
                    fontFamily: FONT,
                    fontWeight: 600,
                    fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                    letterSpacing: "-0.03em",
                    color: "var(--nx-fg)",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.value}
                </p>
                <p style={monoCaption}>{s.label}</p>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════ THE PROBLEM WE SAW ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-problem"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}The problem</p>
            <h2 style={{ ...sectionHeading, maxWidth: "760px", marginBottom: "2.5rem" }}>
              You were buying peptides without a prescription. We built the alternative.
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
                  self-administer compounds with no pharmacist or physician in the chain. The
                  primary distribution channel was influencer testimonial, not clinical evidence.
                </p>
                <p style={bodyCopy}>
                  We started Nexphoria from a single conviction: peptide therapy is a clinical
                  practice, and a clinical practice needs a pharmacy behind it, not a personality.
                  A pharmacy is accountable to regulators, to sterility standards, to a chain of
                  custody. An influencer is accountable to an algorithm.
                </p>
                <p style={bodyCopy}>
                  So we built the company in the order a clinic would: physician oversight first,
                  503A compounding under USP &lt;797&gt; second, laboratory accountability gating
                  everything. Labs before guesswork. Physicians before protocols. Mechanism before
                  marketing claim.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: "4/5",
                  border: "1px solid var(--nx-border)",
                  height: "100%",
                }}
              >
                <img
                  src={lifestylePharmacyShelf}
                  alt="Licensed 503A compounding pharmacy shelf with labeled peptide preparations"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════ OUR APPROACH — 3 PILLARS ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-approach"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}Our approach</p>
            <h2 style={{ ...sectionHeading, maxWidth: "680px", marginBottom: "3rem" }}>
              Physician-guided. Compounded. Measured.
            </h2>
          </Reveal>
          <Reveal>
          <div
            className="about-pillars-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5px", backgroundColor: "var(--nx-border)", border: "1.5px solid var(--nx-border)", borderRadius: 16, overflow: "hidden" }}
          >
            {PILLARS.map((p, i) => (
              <div
                key={p.num}
                data-testid={`about-pillar-${i}`}
                style={{ backgroundColor: "var(--nx-ceramic)", padding: "2.75rem 2.25rem" }}
              >
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    color: "var(--nx-rust)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {p.num}
                </p>
                <h3
                  style={{
                    fontFamily: FONT,
                    fontWeight: 600,
                    fontSize: "var(--nx-t-xl)",
                    letterSpacing: "-0.02em",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "0.875rem",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ ...bodyCopy, fontSize: "var(--nx-t-base)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════ THE TEAM ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-team"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}How care is structured</p>
            <h2 style={{ ...sectionHeading, maxWidth: "680px", marginBottom: "1.25rem" }}>
              The functions accountable for your care.
            </h2>
            <p style={{ ...bodyCopy, maxWidth: "620px", marginBottom: "3rem" }}>
              Nexphoria is founder-led and physician-guided. Prescribing is performed by
              independent, U.S.-licensed physicians through our telehealth partner — Nexphoria
              coordinates the platform and does not direct clinical decision-making.
            </p>
          </Reveal>
          <div
            className="about-leadership-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}
          >
            {ROLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 50}>
                <div
                  data-testid={`about-role-${i}`}
                  className="nx-protocol-card"
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "var(--nx-ceramic)",
                    height: "100%",
                    borderTop: "2px solid var(--nx-cobalt)",
                  }}
                >
                  <div style={{ padding: "1.75rem 1.5rem" }}>
                    <h3
                      style={{
                        fontFamily: FONT,
                        fontWeight: 600,
                        fontSize: "var(--nx-t-lg)",
                        letterSpacing: "-0.01em",
                        color: "var(--nx-fg)",
                        lineHeight: 1.15,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ ...bodyCopy, fontSize: "var(--nx-t-sm)" }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Fields reviewed on the network — specialties, not named individuals */}
          <div style={{ marginTop: "4rem" }}>
            <Reveal>
              <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "1rem" }}>
                Specialties reviewed on the network
              </p>
              <p style={{ ...bodyCopy, maxWidth: "620px", marginBottom: "1.5rem" }}>
                Protocols are reviewed by board-certified physicians across the fields that peptide
                therapy touches. Physicians are matched to your state of residence.
              </p>
            </Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {ADVISORY_SPECIALTIES.map((s, i) => (
                <Reveal key={s} delay={i * 40}>
                  <span
                    data-testid={`about-specialty-${i}`}
                    style={{
                      fontFamily: FONT,
                      fontSize: "var(--nx-t-sm)",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      border: "1px solid var(--nx-border)",
                      borderRadius: "999px",
                      padding: "0.5rem 1rem",
                      backgroundColor: "var(--nx-ceramic)",
                    }}
                  >
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ STANDARDS ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-standards"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}Standards</p>
            <h2 style={{ ...sectionHeading, maxWidth: "680px", marginBottom: "0.75rem" }}>
              Four standards we hold on every order.
            </h2>
            <p style={{ ...bodyCopy, maxWidth: "620px", marginBottom: "3rem" }}>
              No exceptions, no add-on tiers.
            </p>
          </Reveal>
          <Reveal>
          <div
            className="about-standards-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {STANDARDS.map((item, i) => (
              <div
                key={item.num}
                data-testid={`about-standard-${i}`}
                style={{ backgroundColor: "var(--nx-ceramic)", padding: "2.5rem 2rem" }}
              >
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    color: "var(--nx-rust)",
                    marginBottom: "1rem",
                  }}
                >
                  {item.num}
                </p>
                <h3
                  style={{
                    fontFamily: FONT,
                    fontWeight: 600,
                    fontSize: "var(--nx-t-xl)",
                    letterSpacing: "-0.02em",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ ...bodyCopy, fontSize: "var(--nx-t-base)" }}>{item.detail}</p>
              </div>
            ))}
          </div>
          </Reveal>

          {/* Press strip */}
          <Reveal>
            <div
              data-testid="about-press-strip"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1.5rem 2.5rem",
                marginTop: "3.5rem",
                paddingTop: "2.5rem",
                borderTop: "1px solid var(--nx-border)",
              }}
            >
              <span style={{ ...monoCaption, flexShrink: 0 }}>Featured in —</span>
              {PRESS.map((p) => (
                <span
                  key={p}
                  style={{
                    fontFamily: FONT,
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
        </div>
      </section>

      {/* ════════════════ CONTACT CTA ════════════════ */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="about-contact-cta"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <Link href="/contact" data-testid="about-contact-link" style={{ textDecoration: "none" }}>
              <div
                className="about-contact-tile"
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: "16px",
                  backgroundColor: "var(--nx-ceramic)",
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
                  <p style={{ ...monoCaption, color: "var(--nx-rust)", marginBottom: "0.75rem" }}>
                    Questions before you start?
                  </p>
                  <h3
                    style={{
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      letterSpacing: "-0.02em",
                      color: "var(--nx-fg)",
                      lineHeight: 1.05,
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
                    fontFamily: FONT,
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.875rem 1.75rem",
                    borderRadius: "999px",
                    flexShrink: 0,
                  }}
                >
                  Contact us <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ════════════════ WHY NEXPHORIA — MAXIMUS TILES ════════════════ */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
        data-testid="about-why-tiles"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={{ ...eyebrow, marginBottom: "1rem" }}>{eyebrowRule}Why Nexphoria</p>
            <h2
              style={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              What you get that most platforms skip.
            </h2>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-body)",
                color: "var(--nx-fg-graphite)",
                lineHeight: 1.6,
                maxWidth: 640,
                marginBottom: "3rem",
              }}
            >
              Every choice we made — pharmacy, physicians, labs, price — answers to one question: would we hand this to our own family?
            </p>
          </Reveal>

          <BenefitTileGrid cols={3}>
            <BenefitTile
              tone="cream"
              eyebrow="Physicians"
              icon={<HeartPulse size={18} strokeWidth={1.5} />}
              headline="US board-certified physicians. Every case."
              sub="No forms. No AI triage. A licensed physician reads your intake and labs before we compound anything."
              testId="about-tile-physicians"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Compounding"
              icon={<ShieldCheck size={18} strokeWidth={1.5} />}
              headline="503A US pharmacies only."
              sub="Every vial compounded in a US 503A facility we audit. No overseas peptides. Ever."
              testId="about-tile-compounding"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Bloodwork"
              icon={<Microscope size={18} strokeWidth={1.5} />}
              headline="Partner-laboratory panels every 90 days."
              sub="Every plan includes full biomarker panels. Dose changes follow labs, not vibes."
              testId="about-tile-bloodwork"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Testing"
              icon={<Beaker size={18} strokeWidth={1.5} />}
              headline="Every batch third-party tested."
              sub="Independent labs verify identity, purity, and endotoxin. Certificates delivered on request."
              testId="about-tile-testing"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Pricing"
              icon={<Scale size={18} strokeWidth={1.5} />}
              headline="All-in. No hidden lab bill."
              sub="One monthly price. Consult, compound, labs, shipping — bundled. No consultation fee."
              testId="about-tile-pricing"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Care"
              icon={<MessageSquare size={18} strokeWidth={1.5} />}
              headline="Physician messaging between visits."
              sub="Side effect? Question about a dose? Message your care team — replies within one business day."
              testId="about-tile-care"
            />
          </BenefitTileGrid>
        </div>
      </section>

      {/* ════════════════ MANIFESTO ════════════════ */}
      <section
        style={{ backgroundColor: "var(--nx-fg)", padding: "6rem 0" }}
        data-testid="about-manifesto"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.02em",
                color: "var(--nx-ceramic)",
                lineHeight: 1.25,
                maxWidth: "860px",
              }}
            >
              "Precision medicine is not a marketing category. It is a commitment to treating every
              patient as a unique biological system, not a population average. Labs before
              guesswork. Physicians before protocols. Mechanism before marketing claim. That is
              Nexphoria."
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "color-mix(in oklab, var(--nx-ceramic) 55%, transparent)",
                marginTop: "2.5rem",
              }}
            >
              The Nexphoria medical team
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Your protocol, built on your bloodwork."
        sub="Start your intake and receive a physician-reviewed protocol built for your physiology. CLIA-certified partner-laboratory panel included."
      />

      <style>{`
        @media (min-width: 768px) {
          .about-proof-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .about-proof-cell { border-right: 1px solid var(--nx-border) !important; }
          .about-proof-cell-3 { border-right: none !important; }
          .about-pillars-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .about-leadership-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .about-advisory-grid { grid-template-columns: repeat(5, 1fr) !important; }
        }
        .about-contact-tile { transition: transform var(--nx-dur-2) var(--nx-ease), border-color var(--nx-dur-2) var(--nx-ease), box-shadow var(--nx-dur-2) var(--nx-ease); }
        .about-contact-tile:hover { border-color: var(--nx-fg) !important; transform: translateY(-3px); box-shadow: var(--nx-e-3); }
        @media (prefers-reduced-motion: reduce) { .about-contact-tile { transition: none; } .about-contact-tile:hover { transform: none; } }
      `}</style>
    </SiteLayout>
  );
}
