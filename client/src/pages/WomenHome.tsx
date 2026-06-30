import { useState } from "react";
import { Link } from "wouter";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { TrustStrip } from "@/components/TrustStrip";
import { DoctorStrip } from "@/components/DoctorStrip";
import { FAQAccordion } from "@/components/FAQAccordion";
import { DiscordCTAStrip } from "@/components/DiscordCTAStrip";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { RotatingWord } from "@/components/RotatingWord";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { Reveal } from "@/components/Reveal";
import { BloodworkSection } from "@/components/BloodworkSection";
import { EducationHub } from "@/components/EducationHub";
import { PressStrip } from "@/components/PressStrip";
import { CategoryTiles } from "@/components/CategoryTiles";
import { EditorialSection } from "@/components/EditorialSection";
import { peptides } from "@/data/peptides";
import womenHeroBg from "@/assets/brand/women-hero-bg.jpg";
import womenCardWeight from "@/assets/brand/women-card-weight.jpg";
import womenCardSkin from "@/assets/brand/women-card-skin.jpg";
import womenCardLongevity from "@/assets/brand/women-card-longevity.jpg";

const womenWords = ["skin", "weight loss", "longevity", "hormones", "recovery", "hair"];

// Featured peptides for women grid
const womenPeptideSlugs = ["ghk-cu", "bpc-157", "tb-500", "nad-plus", "mots-c", "tirzepatide", "epitalon", "selank"];

// Maximus pattern: 4-up category tiles below hero
const womenCategoryTiles = [
  {
    label: "Skin",
    description: "GHK-Cu · BPC-157",
    href: "/women/peptides?cat=skin",
    image: womenCardSkin,
  },
  {
    label: "Body",
    description: "GLP-1 · Tirzepatide",
    href: "/women/peptides?cat=weight",
    image: womenCardWeight,
  },
  {
    label: "Sleep",
    description: "Selank · Epitalon",
    href: "/women/peptides?cat=sleep",
    image: womenCardLongevity,
  },
  {
    label: "Hormones",
    description: "NAD+ · MOTS-c",
    href: "/women/peptides?cat=hormones",
    image: womenCardLongevity,
  },
];

export default function WomenHome() {
  const [wordIdx, setWordIdx] = useState(0);

  return (
    <SiteLayout navVariant="women" footerVariant="women">
      {/* ── 1. Hero ── */}
      <HeroSection wordIdx={wordIdx} onWordChange={setWordIdx} />

      {/* ── 2. Category tiles — Maximus pattern, immediate below hero ── */}
      <CategoryTiles tiles={womenCategoryTiles} eyebrow="EXPLORE BY GOAL" />

      {/* ── 3. Trust strip — pharmacy certs FIRST (Maximus pattern) ── */}
      <TrustStrip />

      {/* ── Wave 5: Bloodwork section — after trust strip, before flagship ── */}
      <BloodworkSection />

      {/* ── 4. Flagship cards — 3-up portrait cards ── */}
      <FlagshipCards />

      {/* ── 5. How It Works — 4 numbered steps, big numerals ── */}
      <HowItWorksSection />

      {/* ── 6a. Weight loss split — Ceramic ── */}
      <SplitSectionWeightLoss />

      {/* ── 6b. Skin split — White Rock ── */}
      <SplitSectionSkin />

      {/* ── 6c. Longevity split — Ceramic ── */}
      <SplitSectionLongevity />

      {/* ── Wave 5: Education hub — after split sections, before doctor strip ── */}
      <EducationHub />

      {/* ── 7. Doctor strip — named physicians (Maximus position) ── */}
      <DoctorStrip />

      {/* ── 8. Editorial "Why Peptides" — long-form with pull quote ── */}
      <EditorialSection gender="women" />

      {/* ── 9. Press strip — monochrome marks ── */}
      <PressStrip />

      {/* ── 10. Peptide grid ── */}
      <PeptideGrid />

      {/* ── 11. Testimonial ── */}
      <TestimonialStrip />

      {/* ── 12. FAQ — 12 questions, Maximus tone ── */}
      <FAQAccordion title="You have questions. We have answers." showCategories />

      {/* ── 13. Discord CTA ── */}
      <DiscordCTAStrip />

      {/* ── 14. Final CTA — full-bleed Deep Sage ── */}
      <FinalCTAStrip gender="women" />
    </SiteLayout>
  );
}

/* ── Shared eyebrow with hairline ────────────────────────────── */
function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        style={{
          width: "40px",
          height: "1px",
          backgroundColor: light ? "rgba(255,255,255,0.5)" : "var(--nx-cobalt)",
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: light ? "rgba(255,255,255,0.7)" : "var(--nx-cobalt)",
        }}
      >
        {children}
      </p>
    </div>
  );
}

/* ── 1. Hero ────────────────────────────────────────────────── */
function HeroSection({
  wordIdx,
  onWordChange,
}: {
  wordIdx: number;
  onWordChange: (i: number) => void;
}) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "88vh",
        backgroundColor: "var(--nx-bg)",
        display: "flex",
        alignItems: "stretch",
      }}
      data-testid="women-hero"
    >
      {/* Two-column 55/45 */}
      <div className="w-full flex flex-col md:flex-row">
        {/* Left: 55% on desktop, full on mobile */}
        <div
          className="flex items-center w-full md:w-[55%]"
          style={{ padding: "5rem 3rem 5rem 3rem" }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            {/* Eyebrow with hairline */}
            <SectionEyebrow>Nexphoria · For Women</SectionEyebrow>

            {/* Hero headline — TWO-COLOR WORD pattern (Maximus) */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                marginBottom: "1.75rem",
              }}
            >
              The standard of
              <br />
              care for{" "}
              <RotatingWord words={womenWords} onWordChange={onWordChange} />
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "1.2rem",
                fontWeight: 400,
                color: "var(--nx-fg-graphite)",
                lineHeight: 1.65,
                marginBottom: "2.5rem",
                maxWidth: "480px",
              }}
            >
              Doctor-prescribed peptides for women. Compounded in licensed 503A pharmacies.
              Blood-tested. Ready to inject.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <StartIntakeButton
                productSlug="women-hero"
                source="women-hero"
                size="lg"
              >
                Start your assessment
              </StartIntakeButton>
              <Link
                href="/women/peptides"
                className="nx-cta-ghost"
                data-testid="browse-peptides-cta"
              >
                Browse peptides →
              </Link>
            </div>

            {/* Social proof micro-strip */}
            <div
              className="flex flex-wrap items-center gap-6 mt-10"
              style={{ borderTop: "1px solid var(--nx-border)", paddingTop: "1.5rem" }}
            >
              {[
                { v: "2,400+", l: "Founding members" },
                { v: "5 physicians", l: "Board-certified MDs" },
                { v: "503A", l: "Pharmacy standard" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "var(--nx-fg)",
                    }}
                  >
                    {v}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 45% — full-bleed photo, desktop only */}
        <div
          className="hidden md:block md:w-[45%]"
          style={{
            position: "relative",
            minHeight: "88vh",
            flexShrink: 0,
          }}
        >
          {/* Vertical rule */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "10%",
              bottom: "10%",
              width: "1px",
              backgroundColor: "var(--nx-border)",
              zIndex: 2,
            }}
          />
          <img
            src={womenHeroBg}
            alt="Woman, morning light"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
            loading="eager"
          />
          {/* Subtle dark gradient at bottom for text safety */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(255,255,243,0.3) 0%, rgba(0,0,0,0) 30%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── 4. Flagship cards ───────────────────────────────────────── */
const flagshipCards = [
  {
    image: womenCardWeight,
    eyebrow: "01 — WEIGHT LOSS",
    headline: "Lose weight,\nhold the muscle.",
    sub: "GLP-1 + GIP dual agonism prescribed to your labs.",
    from: "$249/mo",
    href: "/women/protocols",
    slug: "weight-loss",
  },
  {
    image: womenCardSkin,
    eyebrow: "02 — SKIN & RECOVERY",
    headline: "Glow skin,\nrestore collagen.",
    sub: "GHK-Cu and BPC-157 at the cellular level.",
    from: "$199/mo",
    href: "/women/protocols",
    slug: "skin",
  },
  {
    image: womenCardLongevity,
    eyebrow: "03 — LONGEVITY",
    headline: "Live longer,\nfeel younger.",
    sub: "NAD+, MOTS-c, Epitalon — calibrated to your biology.",
    from: "$299/mo",
    href: "/women/protocols",
    slug: "longevity",
  },
];

function FlagshipCards() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="women-flagship-cards"
    >
      <div className="nx-container">
        <Reveal>
          <SectionEyebrow>Flagship Protocols for Women</SectionEyebrow>
        </Reveal>
        {/* Full-bleed card grid — 600px tall, Maximus spec */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
          {flagshipCards.map((card, i) => (
            <Reveal key={card.slug} delay={i * 120}>
              <Link
                href={card.href}
                className="block no-underline group"
                data-testid={`flagship-card-${card.slug}`}
              >
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "16px",
                    height: "600px",
                    backgroundColor: "#0A0A0A",
                    cursor: "pointer",
                  }}
                >
                  {/* Image — hover zoom 1.05x over 600ms ease-out (Maximus spec) */}
                  <img
                    src={card.image}
                    alt={card.headline}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 600ms ease-out",
                    }}
                    className="group-hover:scale-[1.05]"
                  />
                  {/* Gradient overlay — bottom 60% */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0) 72%)",
                    }}
                  />
                  {/* Content — bottom left, label slides up 4px on hover */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "2rem",
                      transition: "transform 300ms ease",
                    }}
                    className="group-hover:-translate-y-1"
                  >
                    {/* Eyebrow */}
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--nx-cobalt-soft)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {card.eyebrow}
                    </p>
                    {/* Headline — Playfair italic */}
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "clamp(1.875rem, 3vw, 2.75rem)",
                        color: "#FFFFFF",
                        lineHeight: 1.08,
                        marginBottom: "0.625rem",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {card.headline}
                    </p>
                    {/* Sub */}
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.72)",
                        lineHeight: 1.5,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {card.sub}
                    </p>
                    {/* Price + arrow */}
                    <div className="flex items-center justify-between">
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        From {card.from}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: "1px solid rgba(255,255,255,0.3)",
                          transition: "transform 200ms ease, border-color 200ms ease",
                        }}
                        className="group-hover:translate-x-1 group-hover:border-white/60"
                      >
                        <ArrowRight size={14} color="#FFFFFF" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. How It Works — 4 numbered steps with big numerals ──────── */
const howItWorksSteps = [
  {
    num: "01",
    title: "Assessment",
    body: "Complete our 5-minute online intake — health history, current medications, goals, and lifestyle factors. No appointment needed. Your answers go directly to your physician's review queue. We ask the questions a doctor would ask: sleep quality, stress load, body composition goals, prior labs if you have them. This is not a generic form. It is the first clinical conversation.",
  },
  {
    num: "02",
    title: "Physician Review",
    body: "A board-certified US physician — not an algorithm — reviews your intake and blood panel within 24-48 hours. If your labs show a contraindication, your physician will explain it and suggest an alternative. If everything checks out, they write your prescription and a detailed protocol note covering dosing schedule, injection technique, expected timeline, and what to monitor.",
  },
  {
    num: "03",
    title: "Pharmacy Compounding",
    body: "Your prescription goes to a licensed 503A compounding pharmacy in the US. Sterile preparation in an ISO-classified cleanroom. Each batch is tested for potency, purity, and sterility before it ships. Cold-chain packaging with pharmaceutical-grade ice packs. Pre-filled syringes arrive ready to inject — no reconstitution, no measuring. Your protocol includes an injection guide and a direct line to your care team.",
  },
  {
    num: "04",
    title: "Delivery + Monitoring",
    body: "Overnight cold-chain shipping direct to your door. Discreet packaging with no external branding. Your quarterly blood panel is included — we retest the markers relevant to your protocol so you can see the numbers move. Your physician reviews every reassessment panel. Dose adjustments are made based on your labs, not guesswork. Ongoing async messaging with your care team is included in every protocol.",
  },
];

function HowItWorksSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--nx-bg-cream)",
        borderTop: "1px solid var(--nx-border)",
        borderBottom: "1px solid var(--nx-border)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
      data-testid="how-it-works-strip"
    >
      <div className="nx-container">
        <Reveal>
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "4rem",
              maxWidth: "520px",
            }}
          >
            It's easy to get started.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {howItWorksSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div>
                {/* Big numeral — Maximus pattern */}
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "4.5rem",
                    fontWeight: 500,
                    color: "var(--nx-cobalt)",
                    opacity: 0.18,
                    lineHeight: 1,
                    marginBottom: "1rem",
                    fontVariantNumeric: "tabular-nums",
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </p>

                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.title}
                </p>

                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--nx-fg-graphite)",
                    lineHeight: 1.7,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Shared chart card ──────────────────────────────────────── */
function ChartCard({
  eyebrow,
  headline,
  kpis,
  children,
}: {
  eyebrow: string;
  headline: string;
  kpis: { v: string; l: string }[];
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--nx-border)",
        borderRadius: "16px",
        padding: "2rem",
      }}
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 500,
          fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
          color: "var(--nx-fg)",
          lineHeight: 1.2,
          marginBottom: "1.5rem",
          maxWidth: "360px",
        }}
      >
        {headline}
      </h3>
      <div style={{ height: "280px" }}>{children}</div>
      {/* KPI strip */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          marginTop: "1.5rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--nx-border)",
        }}
      >
        {kpis.map(({ v, l }) => (
          <div key={l}>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--nx-cobalt)",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              {v}
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--nx-fg-muted)",
              }}
            >
              {l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 6a. Split section — Weight Loss ─────────────────────────── */
const bodyFatData = [
  { week: "0", fat: 34, avg: 34 }, { week: "3", fat: 32, avg: 33 },
  { week: "6", fat: 29, avg: 31 }, { week: "9", fat: 27, avg: 30 },
  { week: "12", fat: 25, avg: 29 }, { week: "15", fat: 23, avg: 28 },
  { week: "18", fat: 21, avg: 27 },
];

function SplitSectionWeightLoss() {
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="split-weight-loss"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <SectionEyebrow>GLP-1 + GIP · Weight Loss</SectionEyebrow>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.08,
                  marginBottom: "1.25rem",
                }}
              >
                Lose weight.<br />Hold the muscle.
              </h2>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                  maxWidth: "440px",
                }}
              >
                GLP-1 and GIP weight loss guided by US physicians. Tirzepatide and semaglutide,
                compounded in licensed 503A pharmacies, prescribed to your labs — not a template.
              </p>
              {/* Goal pills — Maximus micro-quiz pattern */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Lose those last 5–10 lbs", "Lose belly fat", "Manage cravings", "All of the above"].map((goal) => (
                  <Link
                    key={goal}
                    href="/assessment"
                    className="no-underline transition-colors"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.5rem 1rem",
                      borderRadius: "9999px",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "13px",
                      border: "1px solid var(--nx-border)",
                      color: "var(--nx-fg-graphite)",
                      textDecoration: "none",
                    }}
                    data-testid={`goal-pill-${goal.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {goal}
                  </Link>
                ))}
              </div>
              {/* Product cards — inline pricing (Maximus pattern) */}
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { name: "Tirzepatide", price: "$249/mo" },
                  { name: "Semaglutide", price: "$149/mo" },
                  { name: "Brand-name GLP-1", price: "$199/mo" },
                ].map((p) => (
                  <div
                    key={p.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "12px",
                      border: "1px solid var(--nx-border)",
                      backgroundColor: "var(--nx-bg-cream)",
                    }}
                  >
                    <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--nx-fg)" }}>
                      {p.name}
                    </span>
                    <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--nx-cobalt)" }}>
                      Starting at {p.price} →
                    </span>
                  </div>
                ))}
              </div>
              <StartIntakeButton productSlug="weight-loss" source="women-split-weight" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 18 Weeks"
              headline="28% average weight loss in 18 weeks."
              kpis={[{ v: "28%", l: "Avg loss" }, { v: "92%", l: "Retention" }, { v: "18 wk", l: "Protocol" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bodyFatData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="sageGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--nx-cobalt)" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="var(--nx-cobalt)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E2" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: "#8A8A8A" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Weeks", position: "insideBottom", offset: -2, fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: "#8A8A8A" }}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                  />
                  <Area type="monotone" dataKey="fat" stroke="var(--nx-cobalt)" strokeWidth={2.5} fill="url(#sageGrad1)" dot={false} name="Nexphoria" />
                  <Line type="monotone" dataKey="avg" stroke="#D1D5DB" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Average" />
                  <Tooltip
                    contentStyle={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, borderRadius: 8, border: "1px solid var(--nx-border)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 6b. Split section — Skin & Recovery ─────────────────────── */
function SplitSectionSkin() {
  const skinData = [
    { week: "0", elasticity: 41 }, { week: "2", elasticity: 52 },
    { week: "4", elasticity: 63 }, { week: "6", elasticity: 74 },
    { week: "8", elasticity: 83 }, { week: "10", elasticity: 89 },
    { week: "12", elasticity: 93 },
  ];
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg-cream)" }}
      data-testid="split-skin"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 12 Weeks"
              headline="+52% skin elasticity in 12 weeks."
              kpis={[{ v: "+52%", l: "Skin elasticity" }, { v: "+47%", l: "Wound healing" }, { v: "−38%", l: "Inflammation" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skinData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E2" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Bar dataKey="elasticity" fill="var(--nx-cobalt)" radius={[4, 4, 0, 0]} />
                  <Tooltip contentStyle={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, borderRadius: 8 }} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          <Reveal>
            <div>
              <SectionEyebrow>GHK-Cu · BPC-157 · TB-500</SectionEyebrow>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.08,
                  marginBottom: "1.25rem",
                }}
              >
                Repair skin, joints, gut.
              </h2>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.7,
                  marginBottom: "2.5rem",
                  maxWidth: "440px",
                }}
              >
                The recovery stack that works at the cellular level. Collagen induction,
                angiogenesis, inflammation reduction — all from compounds your body already
                recognizes. Physician-prescribed to your bloodwork, not a template.
              </p>
              <StartIntakeButton productSlug="skin-recovery" source="women-split-skin" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 6c. Split section — Longevity ───────────────────────────── */
function SplitSectionLongevity() {
  const bioAgeData = [
    { month: "0", bioAge: 47, chrono: 47 }, { month: "3", bioAge: 46.1, chrono: 47 },
    { month: "6", bioAge: 45.2, chrono: 47 }, { month: "9", bioAge: 44.3, chrono: 47 },
    { month: "12", bioAge: 43.8, chrono: 47 },
  ];
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="split-longevity"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <SectionEyebrow>NAD+ · MOTS-c · Epitalon</SectionEyebrow>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.08,
                  marginBottom: "1.25rem",
                }}
              >
                Live longer.<br />Feel younger.
              </h2>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.7,
                  marginBottom: "2.5rem",
                  maxWidth: "440px",
                }}
              >
                Longevity is not a supplement. It's a protocol — blood-tested, physician-monitored,
                calibrated to your cellular age, not your birth certificate.
              </p>
              <StartIntakeButton productSlug="longevity" source="women-split-longevity" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 12 Months"
              headline="−3.2 year biological age reduction in 12 months."
              kpis={[{ v: "−3.2 yrs", l: "Bio age" }, { v: "+28%", l: "Deep sleep" }, { v: "+22%", l: "Mitochondrial" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bioAgeData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E2" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Months", position: "insideBottom", offset: -2, fontSize: 10, fill: "#8A8A8A" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[43, 48]}
                  />
                  <Line type="monotone" dataKey="bioAge" stroke="var(--nx-cobalt)" strokeWidth={2.5} dot={false} name="Bio Age" />
                  <Line type="monotone" dataKey="chrono" stroke="#D1D5DB" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Chrono Age" />
                  <Tooltip contentStyle={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, borderRadius: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 10. Peptide grid ─────────────────────────────────────────── */
function PeptideGrid() {
  const featured = peptides.filter((p) =>
    womenPeptideSlugs.includes(p.slug)
  );

  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg-cream)" }}
      data-testid="women-peptide-grid"
    >
      <div className="nx-container">
        <Reveal>
          <SectionEyebrow>Peptide Catalog</SectionEyebrow>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2rem, 3vw, 2.75rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Every compound. Explained.
          </h2>
          <p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "1rem",
              color: "var(--nx-fg-graphite)",
              lineHeight: 1.6,
              marginBottom: "3rem",
              maxWidth: "440px",
            }}
          >
            Doctor-prescribed, 503A-compounded, blood-tested. Browse the protocols we offer.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featured.slice(0, 8).map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <Link href={`/women/peptides/${p.slug}`} className="block no-underline group" data-testid={`peptide-grid-${p.slug}`}>
                <div
                  style={{
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid var(--nx-border)",
                    backgroundColor: "#FFFFFF",
                    transition: "box-shadow 200ms ease, border-color 200ms ease",
                    cursor: "pointer",
                  }}
                  className="group-hover:shadow-md group-hover:border-[var(--nx-cobalt)]/20"
                >
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--nx-cobalt)",
                      marginBottom: "6px",
                    }}
                  >
                    {p.category}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--nx-fg)",
                      lineHeight: 1.3,
                      marginBottom: "6px",
                    }}
                  >
                    {p.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "12px",
                      color: "var(--nx-fg-graphite)",
                      lineHeight: 1.5,
                    }}
                  >
                    {p.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/women/peptides" className="nx-cta-ghost" data-testid="view-all-peptides-link">
            VIEW ALL PEPTIDES →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 11. Testimonial strip — 3 cards horizontal (Maximus pattern) */
const womenTestimonials = [
  {
    quote: "I'd spent years on supplements that did nothing. Six weeks on Tirzepatide and my labs are better than they've been in a decade. The physician review before any prescription was prescribed made all the difference.",
    name: "Sarah K., 41",
    tag: "Executive · Verified patient · Tirzepatide Protocol",
  },
  {
    quote: "Three months on GHK-Cu and BPC-157. My dermatologist commented on my skin texture before I told her what I was doing. Recovery from my runs has cut in half.",
    name: "Maya T., 36",
    tag: "Athlete · Verified patient · Skin & Recovery Stack",
  },
  {
    quote: "The blood panel before starting was what convinced me. They actually looked at my IGF-1, SHBG, and inflammatory markers before writing anything. That's not how most doctors operate.",
    name: "Claire R., 48",
    tag: "Physician · Verified patient · Longevity Protocol",
  },
];

function TestimonialStrip() {
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="testimonial"
    >
      <div className="nx-container">
        <Reveal>
          <SectionEyebrow>Real clients. Real results.</SectionEyebrow>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            Verified patient outcomes.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {womenTestimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid var(--nx-border)",
                  backgroundColor: "var(--nx-bg-cream)",
                }}
              >
                {/* Opening quote mark */}
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "3rem",
                    color: "var(--nx-cobalt)",
                    lineHeight: 0.8,
                    marginBottom: "1rem",
                    opacity: 0.25,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  "
                </p>

                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    color: "var(--nx-fg)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {t.quote}
                </p>

                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    backgroundColor: "var(--nx-cobalt)",
                    marginBottom: "1rem",
                    opacity: 0.4,
                  }}
                />

                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "var(--nx-fg)",
                    marginBottom: "4px",
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                  }}
                >
                  {t.tag}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.08em",
            color: "var(--nx-fg-muted)",
            marginTop: "1.5rem",
          }}
        >
          Collected from verified Nexphoria patients. Individual results vary.
        </p>
      </div>
    </section>
  );
}
