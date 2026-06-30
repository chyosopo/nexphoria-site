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
import { PressStrip } from "@/components/PressStrip";
import { CategoryTiles } from "@/components/CategoryTiles";
import { EditorialSection } from "@/components/EditorialSection";
import { BloodworkSection } from "@/components/BloodworkSection";
import { peptides } from "@/data/peptides";
import menHeroBg from "@/assets/brand/men-hero-bg.jpg";
import menCardStrength from "@/assets/brand/men-card-strength.jpg";
import menCardWeight from "@/assets/brand/men-card-weight.jpg";
import menCardLongevity from "@/assets/brand/men-card-longevity.jpg";

const menWords = ["performance", "testosterone", "weight loss", "recovery", "longevity"];

const menPeptideSlugs = ["cjc-1295", "ipamorelin", "tesamorelin", "bpc-157", "tb-500", "nad-plus", "tirzepatide", "sermorelin"];

// Maximus 4-up category tiles — men: STRENGTH · METABOLIC · LONGEVITY · COGNITIVE
const menCategoryTiles = [
  {
    label: "Strength",
    description: "CJC-1295 · Ipamorelin",
    href: "/men/peptides?cat=strength",
    image: menCardStrength,
  },
  {
    label: "Metabolic",
    description: "GLP-1 · Tirzepatide",
    href: "/men/peptides?cat=metabolic",
    image: menCardWeight,
  },
  {
    label: "Longevity",
    description: "NAD+ · Sermorelin",
    href: "/men/peptides?cat=longevity",
    image: menCardLongevity,
  },
  {
    label: "Cognitive",
    description: "Selank · Semax",
    href: "/men/peptides?cat=cognitive",
    image: menCardStrength,
  },
];

export default function MenHome() {
  const [wordIdx, setWordIdx] = useState(0);

  return (
    <SiteLayout navVariant="men" footerVariant="men">
      {/* ── 1. Hero — educational, compact Maximus-pattern ── */}
      <HeroSection wordIdx={wordIdx} onWordChange={setWordIdx} />

      {/* ── 2. Category tiles — 4-up, right below hero (Maximus pattern) ── */}
      <CategoryTiles tiles={menCategoryTiles} eyebrow="EXPLORE BY GOAL" />

      {/* ── 3. BLOODWORK CENTERPIECE — dark section, dashboard mockup ── */}
      <BloodworkSection gender="men" />

      {/* ── 4. Trust strip — pharmacy certs FIRST ── */}
      <TrustStrip />

      {/* ── 5. Flagship protocol cards — 600px tall, hover zoom ── */}
      <FlagshipCards />

      {/* ── 6. How It Works — 4 numbered steps, big numerals ── */}
      <HowItWorksSection />

      {/* ── 7a. Performance + IGF-1 split section ── */}
      <SplitSectionPerformance />

      {/* ── 7b. Testosterone split section ── */}
      <SplitSectionTestosterone />

      {/* ── 7c. Weight loss split section ── */}
      <SplitSectionWeightLoss />

      {/* ── 8. Doctor strip — named physicians ── */}
      <DoctorStrip />

      {/* ── 9. Editorial "Why Peptides" — journal voice ── */}
      <EditorialSection gender="men" />

      {/* ── 10. Press strip — monochrome marks ── */}
      <PressStrip />

      {/* ── 11. Peptide catalog grid ── */}
      <PeptideGrid />

      {/* ── 12. Testimonial strip — 3 verified patient cards ── */}
      <TestimonialStrip />

      {/* ── 13. FAQ — 12 questions, educational tone ── */}
      <FAQAccordion title="You have questions. We have answers." showCategories />

      {/* ── 14. Discord + eBook CTA ── */}
      <DiscordCTAStrip />

      {/* ── 15. Final CTA — full-bleed ink ── */}
      <FinalCTAStrip
        gender="men"
        title="Your protocol. Your physician. Your results."
        sub="Complete your intake in 4 minutes. Blood panel included with every protocol."
      />
    </SiteLayout>
  );
}

/* ── Shared eyebrow component ────────────────────────────────── */
function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        style={{
          width: "40px",
          height: "1px",
          backgroundColor: light ? "rgba(250,247,240,0.35)" : "var(--nx-cobalt)",
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
          color: light ? "rgba(250,247,240,0.6)" : "var(--nx-cobalt)",
        }}
      >
        {children}
      </p>
    </div>
  );
}

/* ── 1. Hero — Educational, informational, pharmacy positioning ── */
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
      data-testid="men-hero"
    >
      <div className="w-full flex flex-col md:flex-row">
        {/* Left: 55% copy block */}
        <div
          className="flex items-center w-full md:w-[55%]"
          style={{ padding: "5rem 3rem 5rem 3rem" }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            {/* Eyebrow — pharmacy positioning */}
            <SectionEyebrow>NEXPHORIA · FOR MEN</SectionEyebrow>

            {/* Hero headline — roman + italic (Maximus pattern, ink version) */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2.75rem, 5.2vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                letterSpacing: "-0.015em",
                marginBottom: "0.5rem",
              }}
            >
              Peptide protocols,
            </h1>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(2.75rem, 5.2vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                letterSpacing: "-0.015em",
                marginBottom: "1.75rem",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0 0.3em",
              }}
            >
              <RotatingWord words={menWords} onWordChange={onWordChange} />
              <span style={{ fontStyle: "normal", opacity: 0.3 }}>supervised.</span>
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "var(--nx-fg-graphite)",
                lineHeight: 1.5,
                marginBottom: "2.5rem",
                maxWidth: "480px",
              }}
            >
              Bloodwork. Physician review. Pharmacy compounding. Delivered.
            </p>

            {/* CTAs — Maximus: primary pill + ghost secondary */}
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <StartIntakeButton
                productSlug="men-hero"
                source="men-hero"
                size="lg"
              >
                Begin assessment
              </StartIntakeButton>
            </div>
            <Link
              href="/how-it-works"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "var(--nx-fg-graphite)",
                textDecoration: "underline",
                textDecorationColor: "var(--nx-border)",
                textUnderlineOffset: "3px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
              data-testid="men-how-it-works-link"
            >
              How it works →
            </Link>

            {/* Pharmacy credentialing micro-strip */}
            <div
              className="flex flex-wrap items-center gap-6 mt-10"
              style={{ borderTop: "1px solid var(--nx-border)", paddingTop: "1.5rem" }}
            >
              {[
                { v: "503A", l: "Licensed pharmacy" },
                { v: "65", l: "Biomarkers tracked" },
                { v: "Board-certified", l: "US physicians" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "var(--nx-fg)",
                      fontVariantNumeric: "tabular-nums",
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

        {/* Right: 45% lifestyle photo */}
        <div
          className="hidden md:block md:w-[45%]"
          style={{ position: "relative", minHeight: "88vh", flexShrink: 0 }}
        >
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
            src={menHeroBg}
            alt="Man in athletic lifestyle setting"
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(250,247,240,0.35) 0%, rgba(0,0,0,0) 25%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── 5. Flagship cards — 600px, hover zoom 1.05x/600ms ──────── */
const flagshipCards = [
  {
    image: menCardStrength,
    eyebrow: "01 — STRENGTH & PERFORMANCE",
    headline: "Build lean mass,\nrecover faster.",
    sub: "CJC-1295 + Ipamorelin GH stack. Prescribed to your IGF-1 and testosterone baseline.",
    from: "$279/mo",
    href: "/men/protocols",
    slug: "strength",
  },
  {
    image: menCardWeight,
    eyebrow: "02 — METABOLIC",
    headline: "Lose fat.\nKeep testosterone.",
    sub: "Tirzepatide and semaglutide — compounded and prescribed to your fasting metabolic labs.",
    from: "$249/mo",
    href: "/men/protocols",
    slug: "metabolic",
  },
  {
    image: menCardLongevity,
    eyebrow: "03 — LONGEVITY",
    headline: "Extend healthspan.\nReduce biological age.",
    sub: "NAD+, MOTS-c, Sermorelin — calibrated to your epigenetic and hormonal markers.",
    from: "$299/mo",
    href: "/men/protocols",
    slug: "longevity",
  },
];

function FlagshipCards() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="men-flagship-cards"
    >
      <div className="nx-container">
        <Reveal>
          <SectionEyebrow>Flagship Protocols for Men</SectionEyebrow>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
          {flagshipCards.map((card, i) => (
            <Reveal key={card.slug} delay={i * 120}>
              <Link
                href={card.href}
                className="block no-underline group"
                data-testid={`men-flagship-card-${card.slug}`}
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
                  {/* Image — zoom 1.05x over 600ms ease-out (Maximus spec) */}
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
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.42) 48%, rgba(0,0,0,0) 72%)",
                    }}
                  />
                  {/* Label slides up 4px on hover (Maximus spec) */}
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
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(250,247,240,0.55)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {card.eyebrow}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "clamp(1.875rem, 3vw, 2.75rem)",
                        color: "#FAF7F0",
                        lineHeight: 1.08,
                        marginBottom: "0.625rem",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {card.headline}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "13px",
                        color: "rgba(250,247,240,0.68)",
                        lineHeight: 1.5,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {card.sub}
                    </p>
                    <div className="flex items-center justify-between">
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "rgba(250,247,240,0.9)",
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
                          border: "1px solid rgba(250,247,240,0.3)",
                          transition: "transform 200ms ease, border-color 200ms ease",
                        }}
                        className="group-hover:translate-x-1 group-hover:border-white/60"
                      >
                        <ArrowRight size={14} color="#FAF7F0" />
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

/* ── 6. How It Works — 4 steps, big numerals ─────────────────── */
const howItWorksSteps = [
  {
    num: "01",
    title: "Assessment",
    body: "Complete our 5-minute online intake — health history, current medications, goals, and lifestyle factors. No appointment required. Your answers go directly to your physician's review queue. This is the first clinical conversation: not a checkout flow, not a marketing funnel. We ask the questions a board-certified MD would ask.",
  },
  {
    num: "02",
    title: "Physician Review",
    body: "A board-certified US physician reviews your intake and blood panel within 24–48 hours. If your labs show a contraindication, they explain it and suggest an alternative. If everything checks out, they write your prescription with a protocol note covering dosing schedule, injection technique, expected timeline, and monitoring parameters.",
  },
  {
    num: "03",
    title: "Pharmacy Compounding",
    body: "Your prescription is sent to a licensed 503A compounding pharmacy. Sterile preparation in an ISO-classified cleanroom. Each batch is tested for potency, purity, and sterility before shipment. Pre-filled syringes arrive ready to inject — no reconstitution, no measuring. Every shipment includes a certificate of analysis.",
  },
  {
    num: "04",
    title: "Delivery + Monitoring",
    body: "Overnight cold-chain shipping direct to your door. Your quarterly blood panel is included — we retest the markers relevant to your protocol so you can see the numbers move. Your physician reviews every reassessment panel. Dose adjustments are made from your labs. Ongoing async messaging with your care team is included in every protocol tier.",
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
      data-testid="men-how-it-works-strip"
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
                    color: "var(--nx-fg)",
                    lineHeight: 1,
                    opacity: 0.08,
                    marginBottom: "0.75rem",
                    fontVariantNumeric: "lining-nums",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  {step.num}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--nx-fg)",
                    letterSpacing: "0.02em",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  {step.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "0.9375rem",
                    color: "var(--nx-fg-graphite)",
                    lineHeight: 1.75,
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

/* ── ChartCard — reusable chart wrapper ──────────────────────── */
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
                color: "var(--nx-fg)",
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

/* ── 7a. Split — Performance (IGF-1 / GH peptides) ───────────── */
const igf1Data = [
  { week: "0", igf: 142, avg: 142 }, { week: "3", igf: 155, avg: 144 },
  { week: "6", igf: 168, avg: 146 }, { week: "9", igf: 179, avg: 147 },
  { week: "12", igf: 188, avg: 148 }, { week: "15", igf: 194, avg: 149 },
  { week: "18", igf: 201, avg: 149 },
];

function SplitSectionPerformance() {
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="men-split-performance"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <SectionEyebrow>CJC-1295 · Ipamorelin · GH Axis</SectionEyebrow>
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
                Build lean mass.<br />
                <span style={{ fontStyle: "italic" }}>Recover in half the time.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                  maxWidth: "440px",
                }}
              >
                CJC-1295 and Ipamorelin act synergistically on the GH axis — stimulating pulsatile growth hormone release and raising serum IGF-1 within 4–6 weeks. The result: accelerated muscle protein synthesis, improved recovery window, and reduced adipose accumulation. All prescriptions are anchored to your baseline IGF-1, fasting insulin, and body composition markers.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Build lean mass", "Improve recovery", "Raise IGF-1", "Reduce body fat"].map((goal) => (
                  <Link
                    key={goal}
                    href="/assessment"
                    className="no-underline"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.5rem 1rem",
                      borderRadius: "9999px",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "13px",
                      border: "1px solid var(--nx-border)",
                      color: "var(--nx-fg-graphite)",
                    }}
                    data-testid={`men-goal-pill-${goal.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {goal}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { name: "CJC-1295 + Ipamorelin Stack", price: "$279/mo" },
                  { name: "Tesamorelin (Visceral Fat)", price: "$249/mo" },
                  { name: "Sermorelin (Starter GH)", price: "$179/mo" },
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
                    <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--nx-fg)" }}>
                      Starting at {p.price} →
                    </span>
                  </div>
                ))}
              </div>
              <StartIntakeButton productSlug="men-performance" source="men-split-performance" size="lg">
                Begin assessment
              </StartIntakeButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 18 Weeks"
              headline="+41% IGF-1 increase. Lean mass up 8.3 lbs on average."
              kpis={[{ v: "+41%", l: "IGF-1 rise" }, { v: "+8.3 lbs", l: "Lean mass" }, { v: "18 wk", l: "Protocol" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={igf1Data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="inkGradM1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A0A0A" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--nx-border)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: "#8A8A8A" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Weeks", position: "insideBottom", offset: -2, fontSize: 10, fill: "#8A8A8A" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: "#8A8A8A" }}
                    axisLine={false}
                    tickLine={false}
                    unit=" ng/mL"
                    width={60}
                  />
                  <Area type="monotone" dataKey="igf" stroke="#0A0A0A" strokeWidth={2.5} fill="url(#inkGradM1)" dot={false} name="Nexphoria" />
                  <Line type="monotone" dataKey="avg" stroke="#C5BFB0" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Average" />
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

/* ── 7b. Split — Testosterone ─────────────────────────────────── */
const testosteroneData = [
  { month: "0", total: 312, ft: 7.2 }, { month: "1", total: 388, ft: 9.1 },
  { month: "2", total: 451, ft: 10.8 }, { month: "3", total: 498, ft: 12.3 },
  { month: "4", total: 534, ft: 13.4 }, { month: "5", total: 559, ft: 14.1 },
  { month: "6", total: 578, ft: 14.7 },
];

function SplitSectionTestosterone() {
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg-cream)" }}
      data-testid="men-split-testosterone"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 6 Months"
              headline="+85% Total T. +104% Free T. No suppression at 6 months."
              kpis={[{ v: "+85%", l: "Total T" }, { v: "+104%", l: "Free T" }, { v: "0%", l: "Suppression" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={testosteroneData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--nx-border)" vertical={false} />
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
                    domain={[250, 650]}
                    unit=" ng/dL"
                    width={60}
                  />
                  <Line type="monotone" dataKey="total" stroke="#0A0A0A" strokeWidth={2.5} dot={false} name="Total T (ng/dL)" />
                  <Tooltip contentStyle={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, borderRadius: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          <Reveal>
            <div>
              <SectionEyebrow>Enclomiphene · Kisspeptin · HCG</SectionEyebrow>
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
                Restore testosterone.<br />
                <span style={{ fontStyle: "italic" }}>Keep fertility intact.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.75,
                  marginBottom: "2.5rem",
                  maxWidth: "440px",
                }}
              >
                Enclomiphene blocks estrogen receptors at the hypothalamus, stimulating endogenous LH and FSH — your body produces more testosterone without external hormone suppression. Kisspeptin amplifies GnRH pulsatility for men where the HPG axis has become dysregulated. Both are prescribed only after a complete panel: Total T, Free T, LH, FSH, Estradiol, SHBG, Prolactin.
              </p>
              <StartIntakeButton productSlug="men-testosterone" source="men-split-testosterone" size="lg">
                Begin assessment
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 7c. Split — Weight Loss ──────────────────────────────────── */
const menBodyFatData = [
  { week: "0", fat: 28, avg: 28 }, { week: "3", fat: 26.5, avg: 27.5 },
  { week: "6", fat: 24, avg: 26.5 }, { week: "9", fat: 22, avg: 25.8 },
  { week: "12", fat: 20, avg: 25.1 }, { week: "15", fat: 18.2, avg: 24.5 },
  { week: "18", fat: 16.8, avg: 24.1 },
];

function SplitSectionWeightLoss() {
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="men-split-weight-loss"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <SectionEyebrow>GLP-1 + GIP · Metabolic</SectionEyebrow>
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
                Lose the visceral fat.<br />
                <span style={{ fontStyle: "italic" }}>Not the muscle.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                  maxWidth: "440px",
                }}
              >
                GLP-1 and GIP dual agonism — tirzepatide and semaglutide — compounded in licensed 503A pharmacies and prescribed to your baseline A1c, fasting glucose, and lipid panel. Tesamorelin specifically targets visceral adipose tissue at the abdomen by raising IGF-1. Not a template. A calibrated metabolic intervention.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Cut body fat", "Target visceral fat", "Manage appetite", "Preserve muscle"].map((goal) => (
                  <Link
                    key={goal}
                    href="/assessment"
                    className="no-underline"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.5rem 1rem",
                      borderRadius: "9999px",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "13px",
                      border: "1px solid var(--nx-border)",
                      color: "var(--nx-fg-graphite)",
                    }}
                    data-testid={`men-weight-goal-pill-${goal.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {goal}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { name: "Tirzepatide (Compounded)", price: "$249/mo" },
                  { name: "Tesamorelin (Visceral)", price: "$229/mo" },
                  { name: "Semaglutide (Compounded)", price: "$149/mo" },
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
                    <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--nx-fg)" }}>
                      Starting at {p.price} →
                    </span>
                  </div>
                ))}
              </div>
              <StartIntakeButton productSlug="men-weight-loss" source="men-split-weight" size="lg">
                Begin assessment
              </StartIntakeButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 18 Weeks"
              headline="40% average body fat reduction in 18 weeks."
              kpis={[{ v: "40%", l: "Avg reduction" }, { v: "94%", l: "Retention" }, { v: "18 wk", l: "Protocol" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={menBodyFatData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="inkGradM2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A0A0A" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--nx-border)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: "#8A8A8A" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Weeks", position: "insideBottom", offset: -2, fontSize: 10, fill: "#8A8A8A" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: "#8A8A8A" }}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                  />
                  <Area type="monotone" dataKey="fat" stroke="#0A0A0A" strokeWidth={2.5} fill="url(#inkGradM2)" dot={false} name="Nexphoria" />
                  <Line type="monotone" dataKey="avg" stroke="#C5BFB0" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Average" />
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

/* ── 11. Peptide catalog grid ─────────────────────────────────── */
function PeptideGrid() {
  const featured = peptides.filter((p) => menPeptideSlugs.includes(p.slug));

  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg-cream)" }}
      data-testid="men-peptide-grid"
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
              lineHeight: 1.65,
              marginBottom: "3rem",
              maxWidth: "440px",
            }}
          >
            Doctor-prescribed. 503A-compounded. Blood-tested. Each compound page includes mechanism of action, study citations, dosing protocols, and expected lab changes.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featured.slice(0, 8).map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <Link href={`/men/peptides/${p.slug}`} className="block no-underline group" data-testid={`men-peptide-grid-${p.slug}`}>
                <div
                  style={{
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid var(--nx-border)",
                    backgroundColor: "#FFFFFF",
                    transition: "box-shadow 200ms ease, border-color 200ms ease",
                    cursor: "pointer",
                  }}
                  className="group-hover:shadow-md group-hover:border-neutral-300"
                >
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg-muted)",
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
          <Link href="/men/peptides" className="nx-cta-ghost" data-testid="men-view-all-peptides-link">
            VIEW ALL PEPTIDES →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 12. Testimonial strip — 3 verified patient cards ────────── */
const menTestimonials = [
  {
    quote: "My total testosterone went from 312 to 578 ng/dL in six months on Enclomiphene. No injections, no suppression. My endocrinologist reviewed the labs and couldn't argue with the numbers.",
    name: "Marcus L., 38",
    tag: "Engineer · Verified patient · Testosterone Protocol",
  },
  {
    quote: "12 weeks on CJC-1295 and Ipamorelin. Up 9 lbs of lean mass, down 4% body fat. My recovery between training sessions went from 48 hours to under 24. The IGF-1 panel confirmed what I was feeling.",
    name: "Derek A., 44",
    tag: "Athlete · Verified patient · Strength & Performance Stack",
  },
  {
    quote: "The process is what sold me. They reviewed my full panel before writing anything — LH, FSH, estradiol, SHBG, the whole picture. That's just good medicine. The results followed.",
    name: "James R., 51",
    tag: "Surgeon · Verified patient · Longevity Protocol",
  },
];

function TestimonialStrip() {
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="men-testimonial"
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
          {menTestimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid var(--nx-border)",
                  backgroundColor: "var(--nx-bg-cream)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "3rem",
                    color: "var(--nx-fg)",
                    lineHeight: 0.8,
                    marginBottom: "1rem",
                    opacity: 0.15,
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
                    lineHeight: 1.75,
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
                    backgroundColor: "var(--nx-fg)",
                    marginBottom: "1rem",
                    opacity: 0.2,
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
                    color: "var(--nx-fg-muted)",
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
