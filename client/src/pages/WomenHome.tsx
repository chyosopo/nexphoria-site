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
import { ThreeTierMenu } from "@/components/ThreeTierMenu";
import { EditorialSection } from "@/components/EditorialSection";
import { BloodworkSection } from "@/components/BloodworkSection";
import { DoctorChoiceBadge } from "@/components/DoctorChoiceBadge";
import { TrustStatsStrip } from "@/components/TrustStatsStrip";
import { peptides } from "@/data/peptides";
import womenHeroBg from "@/assets/brand/women-hero-bg.webp";
import womenCardWeight from "@/assets/brand/women-card-weight.webp";
import womenCardSkin from "@/assets/brand/women-card-skin.webp";
import womenCardLongevity from "@/assets/brand/women-card-longevity.webp";
import lifestyleMorningRoutine from "@/assets/brand/lifestyle-morning-routine.webp";
const lifestyleWindowPortrait = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_021713_45c52586-6350-45b1-b676-54fa57078490.png";
import lifestyleCoupleKitchen from "@/assets/brand/lifestyle-couple-kitchen.webp";
import lifestyleEveningProtocol from "@/assets/brand/lifestyle-evening-protocol.webp";
import { useSeo, webPageJsonLd, orgJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";

const womenWords = ["skin", "weight loss", "longevity", "hormones", "recovery"];

const womenPeptideSlugs = ["ghk-cu", "bpc-157", "tb-500", "nad-plus", "mots-c", "tirzepatide", "epitalon", "selank"];

// Maximus 4-up category tiles — women: SKIN · METABOLIC · LONGEVITY · HORMONAL
const womenCategoryTiles = [
  {
    label: "Skin",
    description: "GHK-Cu · BPC-157",
    href: "/women/peptides",
    image: womenCardSkin,
  },
  {
    label: "Metabolic",
    description: "GLP-1 · Tirzepatide",
    href: "/women/peptides",
    image: womenCardWeight,
  },
  {
    label: "Longevity",
    description: "NAD+ · Epitalon",
    href: "/women/peptides",
    image: womenCardLongevity,
  },
  {
    label: "Hormonal",
    description: "MOTS-c · Selank",
    href: "/women/peptides",
    image: womenCardWeight,
  },
];

export default function WomenHome() {
  useSeo({
    title: "Peptide protocols for women — glow, metabolic, longevity",
    description: "Smoother skin, leaner metabolism, deeper sleep, sharper cognition. Physician-prescribed peptide protocols for women — GHK-Cu, Tirzepatide, Epitalon and more. 503A compounded, lab-monitored.",
    path: "/women",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria for Women", description: "Physician-prescribed peptide protocols for women: skin, metabolic, sleep, and longevity stacks.", path: "/women" }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "For Women", path: "/women" }]),
    ],
  });
  const [wordIdx, setWordIdx] = useState(0);

  return (
    <SiteLayout navVariant="showcase" footerVariant="women">
      {/* ── 1. Hero — Hims-Labs dark cobalt ── */}
      <main id="main-content">
        <WomenHeroDark />
      </main>

      {/* ── 1b. Three-tier pharmacy menu — Single | Stacks | Custom ── */}
      <ThreeTierMenu gender="women" />

      {/* ── 2. Category tiles — 4-up, right below hero (Maximus pattern) ── */}
      <div id="women-categories">
        <CategoryTiles tiles={womenCategoryTiles} eyebrow="EXPLORE BY GOAL" />
      </div>

      {/* ── 3. BLOODWORK CENTERPIECE — dark section, dashboard mockup ── */}
      <BloodworkSection gender="women" />

      {/* ── 4. Trust strip — pharmacy certs FIRST ── */}
      <TrustStrip />

      {/* ── 5. Flagship protocol cards — 600px tall, hover zoom ── */}
      <FlagshipCards />

      {/* ── 5b. Editorial banner — lifestyle full-bleed ── */}
      <EditorialBannerWomen />

      {/* ── 6. How It Works — 4 numbered steps, big numerals ── */}
      <HowItWorksSection />

      {/* ── 7a. Weight loss split section ── */}
      <SplitSectionWeightLoss />

      {/* ── 7b. Skin & Recovery split section ── */}
      <SplitSectionSkin />

      {/* ── 7c. Longevity split section ── */}
      <SplitSectionLongevity />

      {/* ── 8. Doctor strip — named physicians ── */}
      <DoctorStrip />

      {/* ── 9. Editorial "Why Peptides" — journal voice ── */}
      <EditorialSection gender="women" />

      {/* ── 10. Press strip — monochrome marks ── */}
      <PressStrip />

      {/* ── 11. Peptide catalog grid ── */}
      <PeptideGrid />

      {/* ── 12. Testimonial strip — 3 verified patient cards ── */}
      <TestimonialStrip />

      {/* ── 12b. Trust stats — Maximus-style proof strip ── */}
      <TrustStatsStrip
        eyebrow="Track record"
        heading="Built on evidence, not vibes."
      />

      {/* ── 13. FAQ — 12 questions, educational tone ── */}
      <FAQAccordion title="You have questions. We have answers." showCategories />

      {/* ── 13b. Evening protocol atmospheric strip ── */}
      <EveningProtocolStrip />

      {/* ── 14. Discord + eBook CTA ── */}
      <DiscordCTAStrip />

      {/* ── 15. Final CTA — full-bleed ink ── */}
      <FinalCTAStrip gender="women" />
    </SiteLayout>
  );
}

/* ── 13b. Evening protocol atmospheric strip ────────────── */
function EveningProtocolStrip() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "360px" }}
      data-testid="women-evening-protocol-strip"
    >
      <img
        src={lifestyleEveningProtocol}
        alt="Woman preparing evening peptide protocol at home in warm ambient light"
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.15) 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 3rem",
        }}
      >
        <div style={{ maxWidth: "480px" }}>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(250,247,240,0.6)",
              marginBottom: "1rem",
            }}
          >
            YOUR PROTOCOL
          </p>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              
              fontWeight: 400,
              fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
              color: "#FAF7F0",
              lineHeight: 1.4,
            }}
          >
            Consistent. Measured. Adjusted from your labs.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 5b. Editorial lifestyle banner — post FlagshipCards ────── */
function EditorialBannerWomen() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "480px" }}
      data-testid="women-editorial-banner"
    >
      <img
        src={lifestyleCoupleKitchen}
        alt="Couple reviewing morning peptide protocol together in home kitchen"
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      {/* Ink overlay 5% */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(10,10,10,0.52)",
        }}
      />
      {/* Pull quote centered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            
            fontWeight: 400,
            fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
            color: "#FAF7F0",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            textAlign: "center",
            maxWidth: "720px",
          }}
        >
          "Built around lab values. Adjusted every 90 days."
        </p>
      </div>
    </section>
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
          fontFamily: "'General Sans', system-ui, sans-serif",
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

/* ── HeroSection removed — replaced by Maximus MxHeader + HeroTile grid above ── */
function HeroSection_REMOVED({
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
      <div className="w-full flex flex-col md:flex-row">
        {/* Left: 55% copy block */}
        <div
          className="flex items-center w-full md:w-[55%]"
          style={{ padding: "5rem 3rem 5rem 3rem" }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            {/* Eyebrow — pharmacy positioning */}
            <SectionEyebrow>Physician-Led Peptide Protocols</SectionEyebrow>

            {/* Hero headline — "two-color" = roman + (Maximus pattern, ink version) */}
            <h1
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
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
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                
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
              <RotatingWord words={womenWords} onWordChange={onWordChange} />
              <span style={{ fontStyle: "normal", opacity: 0.3 }}>supervised.</span>
            </p>

            {/* Sub-headline — 1 line, Maximus spec */}
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
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
                productSlug="women-hero"
                source="women-hero"
                size="lg"
              >
                Begin assessment
              </StartIntakeButton>
            </div>
            <Link
              href="/how-it-works"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
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
              data-testid="how-it-works-link"
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
            src={lifestyleMorningRoutine}
            alt="Woman examining peptide vial in window light during morning protocol"
            loading="eager"
            decoding="async"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
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
    image: womenCardWeight,
    eyebrow: "01 — METABOLIC",
    headline: "Lose weight,\nhold the muscle.",
    sub: "GLP-1 + GIP dual agonism. Prescribed to your baseline labs.",
    from: "$249/mo",
    href: "/women/protocols",
    slug: "weight-loss",
    doctorsChoice: true,
  },
  {
    image: womenCardSkin,
    eyebrow: "02 — SKIN & RECOVERY",
    headline: "Restore skin.\nResolve inflammation.",
    sub: "GHK-Cu and BPC-157 — cellular repair, physician-supervised.",
    from: "$199/mo",
    href: "/women/protocols",
    slug: "skin",
    doctorsChoice: false,
  },
  {
    image: womenCardLongevity,
    eyebrow: "03 — LONGEVITY",
    headline: "Extend healthspan.\nReduce biological age.",
    sub: "NAD+, MOTS-c, Epitalon — calibrated to your cellular markers.",
    from: "$299/mo",
    href: "/women/protocols",
    slug: "longevity",
    doctorsChoice: false,
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
                    backgroundColor: "#1C1815",
                    cursor: "pointer",
                  }}
                >
                  {/* DOCTOR'S CHOICE badge — top-left, only when flagged */}
                  {card.doctorsChoice && (
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        zIndex: 5,
                      }}
                    >
                      <DoctorChoiceBadge size="md" variant="dark" />
                    </div>
                  )}
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
                        fontFamily: "'General Sans', system-ui, sans-serif",
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
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        
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
                        fontFamily: "'General Sans', system-ui, sans-serif",
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
                          fontFamily: "'General Sans', system-ui, sans-serif",
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
      data-testid="how-it-works-strip"
    >
      <div className="nx-container">
        <Reveal>
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "4.5rem",
                    fontWeight: 500,
                    color: "var(--nx-fg)",
                    opacity: 0.1,
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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

/* ── Shared chart card ────────────────────────────────────────── */
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
          fontFamily: "'General Sans', system-ui, sans-serif",
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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

/* ── 7a. Split — Weight Loss ──────────────────────────────────── */
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
              <SectionEyebrow>GLP-1 + GIP · Metabolic</SectionEyebrow>
              <h2
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.08,
                  marginBottom: "1.25rem",
                }}
              >
                Lose weight.<br />
                <span style={{  }}>Hold the muscle.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                  maxWidth: "440px",
                }}
              >
                GLP-1 and GIP dual agonism — tirzepatide and semaglutide — compounded in licensed 503A pharmacies and prescribed to your baseline A1c, fasting glucose, and lipid panel. Not a weight-loss template. A calibrated metabolic intervention.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Lose those last 5–10 lbs", "Lose belly fat", "Manage cravings", "All of the above"].map((goal) => (
                  <Link
                    key={goal}
                    href="/assessment"
                    className="no-underline"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.5rem 1rem",
                      borderRadius: "9999px",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "13px",
                      border: "1px solid var(--nx-border)",
                      color: "var(--nx-fg-graphite)",
                    }}
                    data-testid={`goal-pill-${goal.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {goal}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { name: "Tirzepatide (Compounded)", price: "$249/mo" },
                  { name: "Semaglutide (Compounded)", price: "$149/mo" },
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
                    <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--nx-fg)" }}>
                      {p.name}
                    </span>
                    <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--nx-fg)" }}>
                      Starting at {p.price} →
                    </span>
                  </div>
                ))}
              </div>
              <StartIntakeButton productSlug="weight-loss" source="women-split-weight" size="lg">
                Begin assessment
              </StartIntakeButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 18 Weeks"
              headline="28% average body fat reduction in 18 weeks."
              kpis={[{ v: "28%", l: "Avg reduction" }, { v: "92%", l: "Retention" }, { v: "18 wk", l: "Protocol" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bodyFatData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="inkGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1C1815" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#1C1815" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--nx-border)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fontFamily: "'General Sans', system-ui, sans-serif", fill: "#8A8A8A" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Weeks", position: "insideBottom", offset: -2, fontSize: 10, fill: "#8A8A8A" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fontFamily: "'General Sans', system-ui, sans-serif", fill: "#8A8A8A" }}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                  />
                  <Area type="monotone" dataKey="fat" stroke="#1C1815" strokeWidth={2.5} fill="url(#inkGrad1)" dot={false} name="Nexphoria" />
                  <Line type="monotone" dataKey="avg" stroke="#C5BFB0" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Average" />
                  <Tooltip
                    contentStyle={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 12, borderRadius: 8, border: "1px solid var(--nx-border)" }}
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

/* ── 7b. Split — Skin & Recovery ─────────────────────────────── */
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
              headline="+52% skin elasticity. +47% wound healing. −38% inflammation."
              kpis={[{ v: "+52%", l: "Skin elasticity" }, { v: "+47%", l: "Wound healing" }, { v: "−38%", l: "Inflammation" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skinData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--nx-border)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'General Sans', system-ui, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'General Sans', system-ui, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Bar dataKey="elasticity" fill="#1C1815" radius={[4, 4, 0, 0]} />
                  <Tooltip contentStyle={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 12, borderRadius: 8 }} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          <Reveal>
            <div>
              <SectionEyebrow>GHK-Cu · BPC-157 · TB-500</SectionEyebrow>
              <h2
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
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
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.75,
                  marginBottom: "2.5rem",
                  maxWidth: "440px",
                }}
              >
                GHK-Cu is a naturally occurring copper peptide that activates collagen synthesis, angiogenesis, and cellular repair pathways. BPC-157 and TB-500 address systemic inflammation and tissue healing — particularly at joints, tendons, and gut mucosa. All three are physician-prescribed to your inflammatory baseline markers.
              </p>
              <StartIntakeButton productSlug="skin-recovery" source="women-split-skin" size="lg">
                Begin assessment
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 7c. Split — Longevity ────────────────────────────────────── */
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
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.08,
                  marginBottom: "1.25rem",
                }}
              >
                Extend healthspan.
                <br />
                <span style={{  }}>Reduce biological age.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1rem",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.75,
                  marginBottom: "2.5rem",
                  maxWidth: "440px",
                }}
              >
                NAD+ precursors restore mitochondrial function and DNA repair enzyme activity. MOTS-c is a mitochondria-derived peptide that regulates insulin sensitivity and metabolic resilience. Epitalon modulates telomerase activity in the pineal gland. Together, they address the molecular hallmarks of aging — calibrated to your epigenetic age baseline.
              </p>
              <StartIntakeButton productSlug="longevity" source="women-split-longevity" size="lg">
                Begin assessment
              </StartIntakeButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ChartCard
              eyebrow="Outcome Data · 12 Months"
              headline="−3.2 year biological age reduction over 12 months."
              kpis={[{ v: "−3.2 yrs", l: "Bio age" }, { v: "+28%", l: "Deep sleep" }, { v: "+22%", l: "Mitochondrial" }]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bioAgeData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--nx-border)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'General Sans', system-ui, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Months", position: "insideBottom", offset: -2, fontSize: 10, fill: "#8A8A8A" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#8A8A8A", fontFamily: "'General Sans', system-ui, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[43, 48]}
                  />
                  <Line type="monotone" dataKey="bioAge" stroke="#1C1815" strokeWidth={2.5} dot={false} name="Bio Age" />
                  <Line type="monotone" dataKey="chrono" stroke="#C5BFB0" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Chrono Age" />
                  <Tooltip contentStyle={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 12, borderRadius: 8 }} />
                </LineChart>
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
  const featured = peptides.filter((p) => womenPeptideSlugs.includes(p.slug));

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
              fontFamily: "'General Sans', system-ui, sans-serif",
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
              fontFamily: "'General Sans', system-ui, sans-serif",
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
                  className="group-hover:shadow-md group-hover:border-neutral-300"
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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

/* ── 12. Testimonial strip — 3 verified patient cards ────────── */
const womenTestimonials = [
  {
    quote: "I'd spent years on supplements that did nothing. Six weeks on Tirzepatide and my labs are better than they've been in a decade. The physician review before any prescription made all the difference.",
    name: "Sarah K., 41",
    tag: "Executive · Verified patient · Tirzepatide Protocol",
  },
  {
    quote: "Three months on GHK-Cu and BPC-157. My dermatologist commented on my skin texture before I told her what I was doing. Recovery from training has cut in half.",
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
              fontFamily: "'General Sans', system-ui, sans-serif",
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
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
            fontFamily: "'General Sans', system-ui, sans-serif",
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

// ── WomenHeroDark — Warm apothecary hero for /women (differentiated from men) ──
function WomenHeroDark() {
  const tiles = [
    { label: "Skin", price: "$95 / mo", desc: "GHK-Cu · BPC-157", href: "/women/peptides", img: womenCardSkin },
    { label: "Metabolic", price: "$140 / mo", desc: "GLP-1 · Tirzepatide", href: "/women/peptides", img: womenCardWeight },
    { label: "Longevity", price: "$120 / mo", desc: "NAD+ · Epitalon", href: "/women/peptides", img: womenCardLongevity },
    { label: "Hormonal", price: "$110 / mo", desc: "MOTS-c · Selank", href: "/women/peptides", img: womenCardWeight },
  ];
  const chips = [
    "Hormone-aware dosing",
    "Female-specific research",
    "MD-reviewed protocols",
    "Ships every 30 days",
  ];
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #F5EFE4 0%, #EDE5D5 55%, #E8DEC9 100%)",
        color: "#2A2418",
        fontFamily: "'General Sans', system-ui, sans-serif",
      }}
    >
      {/* warm ambient washes */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(1200px 500px at 88% 12%, rgba(196,120,140,0.16), transparent 60%), radial-gradient(900px 500px at 10% 92%, rgba(214,178,102,0.20), transparent 60%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "88px 32px 72px",
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
        className="women-hero-grid"
      >
        {/* LEFT: copy */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <span style={{ width: 28, height: 1, background: "#8A6A3E" }} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.28em",
                color: "#8A6A3E",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              For her · Female physiology
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(48px, 6.4vw, 84px)",
              lineHeight: 0.98,
              letterSpacing: "-0.028em",
              fontWeight: 500,
              margin: 0,
              color: "#1E1811",
              fontFamily: "'Instrument Serif', Georgia, serif",
            }}
          >
            Protocols tuned to <br />
            <span style={{ color: "#B25778", fontWeight: 500 }}>her</span> physiology.
          </h1>
          <p
            style={{
              fontSize: "1.08rem",
              lineHeight: 1.6,
              color: "rgba(42,36,24,0.72)",
              maxWidth: 540,
              margin: "26px 0 30px",
            }}
          >
            Hormone-aware peptide therapy. Skin, sleep, longevity, metabolic — dosed for women,
            not scaled-down men's plans. Physician-reviewed, biomarker-driven, shipped monthly.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {chips.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: 12,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(138,106,62,0.22)",
                  color: "rgba(42,36,24,0.82)",
                  letterSpacing: "0.02em",
                }}
              >
                {c}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <StartIntakeButton variant="primary" source="women-hero">
              Start medical intake
            </StartIntakeButton>
            <a
              href="#women-categories"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("women-categories")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 22px",
                borderRadius: 999,
                border: "1px solid rgba(30,24,17,0.22)",
                color: "#1E1811",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                background: "rgba(255,255,255,0.35)",
              }}
            >
              Explore protocols ↓
            </a>
          </div>
        </div>

        {/* RIGHT: 4 category preview tiles — softer treatment */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
          className="women-hero-tiles"
        >
          {tiles.map((t) => (
            <Link key={t.label} href={t.href}>
              <a
                style={{
                  position: "relative",
                  display: "block",
                  aspectRatio: "1 / 1.05",
                  borderRadius: 22,
                  overflow: "hidden",
                  border: "1px solid rgba(138,106,62,0.18)",
                  background: "rgba(255,253,247,0.4)",
                  textDecoration: "none",
                  color: "#1E1811",
                  boxShadow: "0 6px 24px -12px rgba(138,106,62,0.35)",
                }}
              >
                <img
                  src={t.img}
                  alt={`${t.label} peptide protocol for women`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.92,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(245,239,228,0.05) 0%, rgba(30,24,17,0.15) 55%, rgba(30,24,17,0.72) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    right: 16,
                    bottom: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    color: "#FFFFFF",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      color: "#F3D7A6",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {t.price}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em", fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {t.label}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>{t.desc}</div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* bottom stat strip — warm palette */}
      <div
        style={{
          position: "relative",
          borderTop: "1px solid rgba(138,106,62,0.20)",
          background: "rgba(255,253,247,0.4)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "22px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
          className="women-hero-stats"
        >
          {[
            { k: "8", v: "Female-tuned peptides" },
            { k: "38", v: "Biomarkers reviewed" },
            { k: "5", v: "MDs on protocol" },
            { k: "50", v: "States shipped" },
          ].map((s) => (
            <div key={s.v}>
              <div style={{ fontSize: 30, fontWeight: 500, color: "#1E1811", letterSpacing: "-0.02em", fontFamily: "'Instrument Serif', Georgia, serif" }}>
                {s.k}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(42,36,24,0.6)",
                  marginTop: 4,
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .women-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 56px 20px 48px !important; }
          .women-hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
