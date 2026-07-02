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
const menHeroBg = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_060557_6021ad2d-4161-421e-9705-0cf200fe9de8.png";
import menCardStrength from "@/assets/brand/men-card-strength.webp";
import menCardWeight from "@/assets/brand/men-card-weight.webp";
import menCardLongevity from "@/assets/brand/men-card-longevity.webp";
import lifestyleManProtocol from "@/assets/brand/lifestyle-man-protocol.webp";
import lifestyleProtocolCounter from "@/assets/brand/lifestyle-protocol-counter.webp";
import { useSeo, webPageJsonLd, orgJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";

const menWords = ["performance", "testosterone", "weight loss", "recovery", "longevity"];

const menPeptideSlugs = ["cjc-1295", "ipamorelin", "tesamorelin", "bpc-157", "tb-500", "nad-plus", "tirzepatide", "sermorelin"];

// Maximus 4-up category tiles — men: STRENGTH · METABOLIC · LONGEVITY · COGNITIVE
const menCategoryTiles = [
  {
    label: "Strength",
    description: "CJC-1295 · Ipamorelin",
    href: "/men/peptides",
    image: menCardStrength,
  },
  {
    label: "Metabolic",
    description: "GLP-1 · Tirzepatide",
    href: "/men/peptides",
    image: menCardWeight,
  },
  {
    label: "Longevity",
    description: "NAD+ · Sermorelin",
    href: "/men/peptides",
    image: menCardLongevity,
  },
  {
    label: "Cognitive",
    description: "Selank · Semax",
    href: "/men/peptides",
    image: menCardStrength,
  },
];

export default function MenHome() {
  useSeo({
    title: "Peptide protocols for men — strength, fat loss, recovery, drive",
    description: "Build muscle, cut fat, recover faster, sharpen focus. Physician-prescribed peptide protocols for men — GLP-1, BPC-157, Ipamorelin and more. 503A compounded, lab-monitored.",
    path: "/men",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria for Men", description: "Physician-prescribed peptide protocols for men: metabolic, recovery, cognitive, and longevity stacks.", path: "/men" }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "For Men", path: "/men" }]),
    ],
  });
  const [wordIdx, setWordIdx] = useState(0);

  return (
    <SiteLayout navVariant="showcase" footerVariant="men">
      {/* ── 1. Hero — Hims-grammar dark full-bleed + Maximus tile duo ── */}
      <MenHeroDark />
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <div className="mx-grid">
            <ColoredHeroTile
              href="/stacks/wolverine"
              tone="cobalt"
              glyph={TileGlyphs.hex}
              label={<>Wolverine stack <br /><span>repair &amp; recovery</span></>}
              caption="BPC-157 + TB-500 + Ipamorelin"
              ctaLabel="Explore stack"
            />
            <ColoredHeroTile
              href="/men/peptides"
              tone="sage"
              glyph={TileGlyphs.wave}
              label={<>Men's library <br /><span>all peptides</span></>}
              caption="16 compounds · From $149/mo · À la carte"
              ctaLabel="Browse peptides"
            />
          </div>
        </div>
      </main>

      {/* ── 1b. Three-tier pharmacy menu — Single | Stacks | Custom ── */}
      <ThreeTierMenu gender="men" />

      {/* ── 2. Category tiles — 4-up, right below hero (Maximus pattern) ── */}
      <CategoryTiles tiles={menCategoryTiles} eyebrow="EXPLORE BY GOAL" />

      {/* ── 3. BLOODWORK CENTERPIECE — dark section, dashboard mockup ── */}
      <BloodworkSection gender="men" />

      {/* ── 4. Trust strip — pharmacy certs FIRST ── */}
      <TrustStrip />

      {/* ── 5. Flagship protocol cards — 600px tall, hover zoom ── */}
      <FlagshipCards />

      {/* ── 5b. Editorial banner — protocol counter still life ── */}
      <EditorialBannerMen />

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

      {/* ── 12b. Trust stats — Maximus-style proof strip ── */}
      <TrustStatsStrip
        eyebrow="Track record"
        heading="Built on evidence, not vibes."
      />

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

/* ── Men Hero Dark — Hims-grammar full-bleed ─────────────────── */
function MenHeroDark() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--nx-fg) 0%, #101010 55%, #1A1A1A 100%)",
        color: "var(--nx-ceramic)",
      }}
      data-testid="men-hero-dark"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 45% at 82% 30%, rgba(79, 211, 255,0.14) 0%, rgba(79, 211, 255,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(80% 60% at 15% 90%, rgba(80,140,220,0.22) 0%, rgba(80,140,220,0) 55%)",
        }}
      />

      <div className="mx-auto max-w-[1360px] px-6 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr,0.95fr] gap-10 md:gap-14 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(79, 211, 255,0.10)",
                border: "1px solid rgba(79, 211, 255,0.28)",
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "var(--nx-acid)",
              }}
            >
              <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--nx-acid)" }} />
              For him · male physiology
            </div>

            <h1
              className="mt-6"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(44px, 6.4vw, 88px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
                color: "var(--nx-ceramic)",
              }}
            >
              Peak <span style={{ color: "var(--nx-acid)" }}>performance</span>,
              <br />
              engineered for men.
            </h1>

            <p
              className="mt-6 max-w-[560px]"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "clamp(16px, 1.15vw, 19px)",
                lineHeight: 1.55,
                color: "rgba(243, 248, 255,0.78)",
              }}
            >
              Testosterone-aware peptide therapy — recovery, strength, longevity, and metabolic
              protocols dosed for male physiology. Physician-supervised. Compounded in U.S. 503A pharmacies. Delivered to your door.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "+21% IGF-1 in 12 wks",
                "Recovery in days, not weeks",
                "Physician-reviewed 24–48h",
                "503A cold-chain",
              ].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-full text-[12.5px]"
                  style={{
                    background: "rgba(243, 248, 255,0.06)",
                    border: "1px solid rgba(243, 248, 255,0.14)",
                    color: "rgba(243, 248, 255,0.90)",
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <StartIntakeButton variant="primary" size="lg" source="men-hero-dark">
                Start intake — 4 min
              </StartIntakeButton>
              <Link
                href="/stacks/wolverine"
                className="inline-flex items-center gap-2 text-[14px] font-medium"
                style={{
                  color: "var(--nx-ceramic)",
                  borderBottom: "1px solid rgba(243, 248, 255,0.35)",
                  paddingBottom: 2,
                  fontFamily: "'General Sans', system-ui, sans-serif",
                }}
                data-testid="link-see-wolverine"
              >
                See the Wolverine protocol <ArrowRight size={16} />
              </Link>
            </div>

            <div
              className="mt-8 text-[13px]"
              style={{
                color: "rgba(243, 248, 255,0.55)",
                fontFamily: "'General Sans', system-ui, sans-serif",
              }}
            >
              Free physician consult on your first protocol · No obligation · HSA/FSA eligible
            </div>
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[20px]"
              style={{
                aspectRatio: "4/5",
                border: "1px solid rgba(243, 248, 255,0.10)",
                boxShadow: "0 30px 80px rgba(21, 24, 28,0.45)",
              }}
            >
              <img
                src={lifestyleManProtocol}
                alt="Male peptide protocol lifestyle"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,18,32,0.0) 45%, rgba(11,18,32,0.85) 100%)",
                }}
              />
              <div
                className="absolute left-5 right-5 bottom-5 md:left-7 md:right-7 md:bottom-7 rounded-[14px] p-5 md:p-6"
                style={{
                  background: "rgba(11,18,32,0.72)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(243, 248, 255,0.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: "var(--nx-acid)",
                    marginBottom: 8,
                  }}
                >
                  <span aria-hidden style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "var(--nx-acid)", marginRight: 8 }} />
                  Flagship · Wolverine
                </div>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(22px, 2.6vw, 30px)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    color: "var(--nx-ceramic)",
                  }}
                >
                  Repair, recover, come back stronger.
                </div>
                <div
                  className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 13,
                    color: "rgba(243, 248, 255,0.85)",
                  }}
                >
                  <span>BPC-157</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>TB-500</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>Ipamorelin</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span style={{ color: "var(--nx-acid)", fontWeight: 600 }}>From $189/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Shared eyebrow component ────────────────────────────────── */
/* ── 5b. Editorial lifestyle banner — men ──────────────── */
function EditorialBannerMen() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "480px" }}
      data-testid="men-editorial-banner"
    >
      <img
        src={lifestyleProtocolCounter}
        alt="Peptide compounding vials and syringe arranged on marble counter in clinical still life"
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
          backgroundColor: "rgba(21, 24, 28,0.50)",
        }}
      />
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
            color: "var(--nx-bg)",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            textAlign: "center",
            maxWidth: "720px",
          }}
        >
          "Compounded by U.S. 503A pharmacy. Cold-chain shipped overnight."
        </p>
      </div>
    </section>
  );
}

function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        style={{
          width: "40px",
          height: "1px",
          backgroundColor: light ? "rgba(240, 244, 250,0.35)" : "var(--nx-cobalt)",
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
          color: light ? "rgba(240, 244, 250,0.6)" : "var(--nx-cobalt)",
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

            {/* Hero headline — roman + (Maximus pattern, ink version) */}
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
              <RotatingWord words={menWords} onWordChange={onWordChange} />
              <span style={{ fontStyle: "normal", opacity: 0.3 }}>supervised.</span>
            </p>

            {/* Sub-headline */}
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
            src={lifestyleManProtocol}
            alt="Man reading peptide protocol document at desk in natural light"
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
              background: "linear-gradient(to right, rgba(240, 244, 250,0.35) 0%, rgba(21, 24, 28,0) 25%)",
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
    doctorsChoice: true,
  },
  {
    image: menCardWeight,
    eyebrow: "02 — METABOLIC",
    headline: "Lose fat.\nKeep testosterone.",
    sub: "Tirzepatide and semaglutide — compounded and prescribed to your fasting metabolic labs.",
    from: "$249/mo",
    href: "/men/protocols",
    slug: "metabolic",
    doctorsChoice: false,
  },
  {
    image: menCardLongevity,
    eyebrow: "03 — LONGEVITY",
    headline: "Extend healthspan.\nReduce biological age.",
    sub: "NAD+, MOTS-c, Sermorelin — calibrated to your epigenetic and hormonal markers.",
    from: "$299/mo",
    href: "/men/protocols",
    slug: "longevity",
    doctorsChoice: false,
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
                    backgroundColor: "var(--nx-fg)",
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
                        "linear-gradient(to top, rgba(21, 24, 28,0.88) 0%, rgba(21, 24, 28,0.42) 48%, rgba(21, 24, 28,0) 72%)",
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
                        color: "rgba(240, 244, 250,0.55)",
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
                        color: "var(--nx-bg)",
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
                        color: "rgba(240, 244, 250,0.68)",
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
                          color: "rgba(240, 244, 250,0.9)",
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
                          border: "1px solid rgba(240, 244, 250,0.3)",
                          transition: "transform 200ms ease, border-color 200ms ease",
                        }}
                        className="group-hover:translate-x-1 group-hover:border-white/60"
                      >
                        <ArrowRight size={14} color="var(--nx-bg)" />
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
    body: "Complete our A structured intake — health history, current medications, goals, and lifestyle factors. No appointment required. Your answers go directly to your physician's review queue. This is the first clinical conversation: not a checkout flow, not a marketing funnel. We ask the questions a board-certified MD would ask.",
  },
  {
    num: "02",
    title: "Physician Review",
    body: "A board-certified US physician reviews your intake and blood panel by a licensed physician. If your labs show a contraindication, they explain it and suggest an alternative. If everything checks out, they write your prescription with a protocol note covering dosing schedule, injection technique, expected timeline, and monitoring parameters.",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.08,
                  marginBottom: "1.25rem",
                }}
              >
                Build lean mass.<br />
                <span style={{  }}>Recover in half the time.</span>
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                    <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--nx-fg)" }}>
                      {p.name}
                    </span>
                    <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--nx-fg)" }}>
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
                      <stop offset="5%" stopColor="var(--nx-fg)" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="var(--nx-fg)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--nx-border)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fontFamily: "'General Sans', system-ui, sans-serif", fill: "var(--nx-fg-muted)" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Weeks", position: "insideBottom", offset: -2, fontSize: 10, fill: "var(--nx-fg-muted)" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fontFamily: "'General Sans', system-ui, sans-serif", fill: "var(--nx-fg-muted)" }}
                    axisLine={false}
                    tickLine={false}
                    unit=" ng/mL"
                    width={60}
                  />
                  <Area type="monotone" dataKey="igf" stroke="var(--nx-fg)" strokeWidth={2.5} fill="url(#inkGradM1)" dot={false} name="Nexphoria" />
                  <Line type="monotone" dataKey="avg" stroke="#B0B9C5" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Average" />
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
                    tick={{ fontSize: 10, fill: "var(--nx-fg-muted)", fontFamily: "'General Sans', system-ui, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Months", position: "insideBottom", offset: -2, fontSize: 10, fill: "var(--nx-fg-muted)" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "var(--nx-fg-muted)", fontFamily: "'General Sans', system-ui, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[250, 650]}
                    unit=" ng/dL"
                    width={60}
                  />
                  <Line type="monotone" dataKey="total" stroke="var(--nx-fg)" strokeWidth={2.5} dot={false} name="Total T (ng/dL)" />
                  <Tooltip contentStyle={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 12, borderRadius: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          <Reveal>
            <div>
              <SectionEyebrow>Enclomiphene · Kisspeptin · HCG</SectionEyebrow>
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
                Restore testosterone.<br />
                <span style={{  }}>Keep fertility intact.</span>
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
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.08,
                  marginBottom: "1.25rem",
                }}
              >
                Lose the visceral fat.<br />
                <span style={{  }}>Not the muscle.</span>
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                    <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--nx-fg)" }}>
                      {p.name}
                    </span>
                    <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--nx-fg)" }}>
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
                      <stop offset="5%" stopColor="var(--nx-fg)" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="var(--nx-fg)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--nx-border)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fontFamily: "'General Sans', system-ui, sans-serif", fill: "var(--nx-fg-muted)" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Weeks", position: "insideBottom", offset: -2, fontSize: 10, fill: "var(--nx-fg-muted)" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fontFamily: "'General Sans', system-ui, sans-serif", fill: "var(--nx-fg-muted)" }}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                  />
                  <Area type="monotone" dataKey="fat" stroke="var(--nx-fg)" strokeWidth={2.5} fill="url(#inkGradM2)" dot={false} name="Nexphoria" />
                  <Line type="monotone" dataKey="avg" stroke="#B0B9C5" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Average" />
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
