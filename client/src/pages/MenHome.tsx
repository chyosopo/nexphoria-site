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
import { peptides } from "@/data/peptides";
import menHeroBg from "@/assets/brand/men-hero-bg.jpg";
import menCardStrength from "@/assets/brand/men-card-strength.jpg";
import menCardWeight from "@/assets/brand/men-card-weight.jpg";
import menCardLongevity from "@/assets/brand/men-card-longevity.jpg";

const menWords = ["performance", "testosterone", "weight loss", "recovery", "longevity", "hair"];
const menPeptideSlugs = ["cjc-1295", "ipamorelin", "tesamorelin", "bpc-157", "tb-500", "nad-plus", "tirzepatide", "sermorelin"];

export default function MenHome() {
  const [wordIdx, setWordIdx] = useState(0);

  return (
    <SiteLayout navVariant="men" footerVariant="men">
      {/* ── 1. Hero ── */}
      <HeroSection wordIdx={wordIdx} onWordChange={setWordIdx} />

      {/* ── 2. Trust strip — White Rock ── */}
      <TrustStrip />

      {/* ── Wave 5: Bloodwork section — after trust strip, before flagship ── */}
      <BloodworkSection />

      {/* ── 3. Flagship cards — Ceramic ── */}
      <FlagshipCards />

      {/* ── 4. How it works — White Rock ── */}
      <HowItWorksStrip />

      {/* ── 5a. Performance — Ceramic ── */}
      <SplitSectionPerformance />

      {/* ── 5b. Testosterone — White Rock ── */}
      <SplitSectionTestosterone />

      {/* ── 5c. Weight loss — Ceramic ── */}
      <SplitSectionWeightLoss />

      {/* ── Wave 5: Education hub — after flagship/split sections, before doctor strip ── */}
      <EducationHub />

      {/* ── 6. Doctor strip — White Rock ── */}
      <DoctorStrip />

      {/* ── 7. Peptide grid — White Rock ── */}
      <PeptideGrid />

      {/* ── 8. Testimonial — Ceramic ── */}
      <TestimonialQuote />

      {/* ── 9. FAQ — White Rock ── */}
      <FAQAccordion />

      {/* ── 10. Discord — Ceramic ── */}
      <DiscordCTAStrip />

      {/* ── 11. Final CTA — Deep Sage ── */}
      <FinalCTAStrip
        gender="men"
        title="Your protocol. Your physician. Your results."
        sub="Complete your intake in 4 minutes. Blood panel included with every protocol."
      />
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
      data-testid="men-hero"
    >
      <div className="w-full flex flex-col md:flex-row">
        {/* Left: 55% on desktop, full on mobile */}
        <div
          className="flex items-center w-full md:w-[55%]"
          style={{ padding: "5rem 3rem 5rem 3rem" }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <SectionEyebrow>Nexphoria · For Men</SectionEyebrow>

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
              The standard of<br />
              care for{" "}
              <RotatingWord words={menWords} onWordChange={onWordChange} />
            </h1>

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
              Doctor-prescribed peptide protocols for men. Compounded in licensed 503A pharmacies.
              Blood-tested. Ready to inject.
            </p>

            <div className="flex flex-wrap gap-4">
              <StartIntakeButton productSlug="men-hero" source="men-hero" size="lg">
                Start your assessment
              </StartIntakeButton>
              <Link href="/men/peptides" className="nx-cta-ghost" data-testid="browse-men-peptides-cta">
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

        {/* Right: 45% full-bleed photo — desktop only */}
        <div
          className="hidden md:block md:w-[45%]"
          style={{
            position: "relative",
            minHeight: "88vh",
            flexShrink: 0,
          }}
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
            alt="Man, morning light"
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
              background: "linear-gradient(to right, rgba(255,255,243,0.3) 0%, rgba(0,0,0,0) 30%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── 3. Flagship cards ───────────────────────────────────────── */
const menFlagshipCards = [
  {
    image: menCardStrength,
    eyebrow: "01 — PERFORMANCE",
    headline: "Build strength,\nraise IGF-1.",
    sub: "GH secretagogues prescribed to your labs. Zero suppression.",
    from: "$299/mo",
    href: "/men/protocols",
    slug: "strength",
  },
  {
    image: menCardWeight,
    eyebrow: "02 — WEIGHT LOSS",
    headline: "Lose weight,\nhold the muscle.",
    sub: "GLP-1 + GIP dual agonism. Physician-guided. 503A-compounded.",
    from: "$249/mo",
    href: "/men/protocols",
    slug: "weight",
  },
  {
    image: menCardLongevity,
    eyebrow: "03 — LONGEVITY",
    headline: "Live longer,\nfeel younger.",
    sub: "NAD+, MOTS-c, Epitalon — calibrated to your biology.",
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
          {menFlagshipCards.map((card, i) => (
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
                    borderRadius: "12px",
                    height: "600px",
                    backgroundColor: "#0A0A0A",
                    cursor: "pointer",
                  }}
                >
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
                      transition: "transform 800ms ease-out",
                    }}
                    className="group-hover:scale-[1.04]"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 70%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "2rem",
                    }}
                  >
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

/* ── 4. How it works 5-step strip ────────────────────────────── */
const steps = [
  { num: "01", label: "INTAKE", detail: "4-minute questionnaire" },
  { num: "02", label: "BLOODWORK", detail: "65-marker panel" },
  { num: "03", label: "MD REVIEW", detail: "Board-certified physician" },
  { num: "04", label: "COMPOUNDS", detail: "503A pharmacy ships" },
  { num: "05", label: "REASSESS", detail: "Quarterly blood retest" },
];

function HowItWorksStrip() {
  return (
    <section
      style={{
        backgroundColor: "var(--nx-bg-cream)",
        borderTop: "1px solid var(--nx-border)",
        borderBottom: "1px solid var(--nx-border)",
        padding: "5rem 0",
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
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "3rem",
              maxWidth: "480px",
            }}
          >
            Five steps. One protocol. One physician.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "1px",
                      backgroundColor: "var(--nx-cobalt)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      color: "var(--nx-cobalt)",
                    }}
                  >
                    {step.num}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg)",
                    marginBottom: "0.375rem",
                  }}
                >
                  {step.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "13px",
                    color: "var(--nx-fg-graphite)",
                    lineHeight: 1.5,
                  }}
                >
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Shared dramatic chart card ──────────────────────────────── */
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

/* ── 5a. Split section — Performance ─────────────────────────── */
function SplitSectionPerformance() {
  const igf1Data = [
    { week: "0", igf1: 100 }, { week: "4", igf1: 135 }, { week: "8", igf1: 162 },
    { week: "12", igf1: 185 }, { week: "16", igf1: 203 }, { week: "20", igf1: 210 },
  ];
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="split-performance"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <SectionEyebrow>CJC-1295 · Ipamorelin · Tesamorelin</SectionEyebrow>
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
                Perform.<br />Recover. Repeat.
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
                Growth-hormone secretagogues that pulse naturally with your physiology.
                IGF-1 elevation drives lean mass, VO2 max, and recovery speed — without
                suppressing your own endocrine axis.
              </p>
              <StartIntakeButton productSlug="performance" source="men-split-performance" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 20 Weeks"
              headline="+110% IGF-1 elevation in 20 weeks."
              kpis={[{ v: "+11 lb", l: "Lean mass" }, { v: "+19%", l: "VO2 max" }, { v: "+110%", l: "IGF-1" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={igf1Data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="sageGradMen1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--nx-cobalt)" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="var(--nx-cobalt)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E2" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Weeks", position: "insideBottom", offset: -2, fontSize: 10, fill: "#8A8A8A" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[80, 230]}
                  />
                  <Area type="monotone" dataKey="igf1" stroke="var(--nx-cobalt)" strokeWidth={2.5} fill="url(#sageGradMen1)" dot={false} />
                  <Tooltip contentStyle={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, borderRadius: 8 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 5b. Split section — Testosterone ────────────────────────── */
function SplitSectionTestosterone() {
  const testoData = [
    { week: "0", testo: 380 }, { week: "4", testo: 620 }, { week: "8", testo: 890 },
    { week: "12", testo: 1050 }, { week: "16", testo: 1140 }, { week: "20", testo: 1180 },
  ];
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg-cream)" }}
      data-testid="split-testosterone"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 20 Weeks"
              headline="+210% total testosterone without suppression."
              kpis={[{ v: "+210%", l: "Total T" }, { v: "8.4/10", l: "Libido score" }, { v: "7.8/10", l: "Mood score" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={testoData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
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
                  />
                  <Bar dataKey="testo" fill="var(--nx-cobalt)" radius={[4, 4, 0, 0]} />
                  <Tooltip contentStyle={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, borderRadius: 8 }} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          <Reveal>
            <div>
              <SectionEyebrow>Enclomiphene · Kisspeptin</SectionEyebrow>
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
                Optimize testosterone.<br />Keep fertility.
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
                Unlike TRT, Enclomiphene stimulates your own production through the HPG axis —
                testosterone rises without testicular suppression. Monitored by a board-certified endocrinologist.
              </p>
              <StartIntakeButton productSlug="testosterone" source="men-split-testosterone" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 5c. Split section — Weight Loss ─────────────────────────── */
function SplitSectionWeightLoss() {
  const fatData = [
    { week: "0", fat: 24, avg: 24 }, { week: "4", fat: 22, avg: 23 },
    { week: "8", fat: 20, avg: 22 }, { week: "12", fat: 19, avg: 21 },
    { week: "16", fat: 18, avg: 21 }, { week: "20", fat: 17, avg: 20.5 },
    { week: "24", fat: 17, avg: 20 },
  ];
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="split-men-weight"
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
                  marginBottom: "2.5rem",
                  maxWidth: "440px",
                }}
              >
                Tirzepatide and semaglutide prescribed to your labs. GLP-1 + GIP dual agonism — the
                most effective weight-loss mechanism in clinical literature. Physician-guided. 503A-compounded.
              </p>
              <StartIntakeButton productSlug="men-weight-loss" source="men-split-weight" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 24 Weeks"
              headline="-18% body fat in 24 weeks on Tirzepatide."
              kpis={[{ v: "−18%", l: "Body fat" }, { v: "−4.3 in", l: "Waist" }, { v: "−1.2 pts", l: "A1C" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fatData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="sageGradMen3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--nx-cobalt)" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="var(--nx-cobalt)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E2" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Weeks", position: "insideBottom", offset: -2, fontSize: 10, fill: "#8A8A8A" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                  />
                  <Area type="monotone" dataKey="fat" stroke="var(--nx-cobalt)" strokeWidth={2.5} fill="url(#sageGradMen3)" dot={false} name="Nexphoria" />
                  <Line type="monotone" dataKey="avg" stroke="#D1D5DB" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Average" />
                  <Tooltip contentStyle={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, borderRadius: 8 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 7. Peptide grid ─────────────────────────────────────────── */
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
          <Link href="/men/peptides" className="nx-cta-ghost" data-testid="men-view-all-peptides-link">
            VIEW ALL PEPTIDES →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 8. Testimonial ─────────────────────────────────────────── */
function TestimonialQuote() {
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="men-testimonial"
    >
      <div
        className="nx-container"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "5rem",
              color: "var(--nx-cobalt)",
              lineHeight: 0.8,
              marginBottom: "1.5rem",
              opacity: 0.25,
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            "
          </div>

          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.625rem, 3vw, 2.5rem)",
              fontWeight: 400,
              color: "var(--nx-fg)",
              lineHeight: 1.45,
              marginBottom: "2rem",
              letterSpacing: "-0.01em",
            }}
          >
            Six months in. IGF-1 from 110 to 198. Lean mass up 9 pounds. Having a physician
            actually look at my labs before prescribing anything is what changed the results.
          </p>

          <div
            style={{
              width: "64px",
              height: "1px",
              backgroundColor: "var(--nx-cobalt)",
              margin: "0 auto 1.75rem",
            }}
          />

          <div>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--nx-fg)",
                marginBottom: "4px",
              }}
            >
              Marcus T., 44
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
              }}
            >
              Executive · Verified patient · CJC-1295 + Ipamorelin Protocol
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
