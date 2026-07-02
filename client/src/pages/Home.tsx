import * as React from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo, orgJsonLd, medicalBusinessJsonLd, webPageJsonLd, faqJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { VialTile, categoryToTone } from "@/components/VialTile";
import { BenefitTile, BenefitTileGrid } from "@/components/BenefitTile";
import { Beaker, Stethoscope, Truck, ShieldCheck } from "lucide-react";
import { peptides as ALL_PEPTIDES } from "@/data/peptides";
import { getPrice } from "@/data/pricing";

/* ── Cinematic brand assets (Higgsfield · hims-lane wave 1) ── */
const heroVideo  = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_030852_5be30905-1215-4081-841d-6586f6fdc483.mp4";
const heroPoster = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_021713_56fc5fd7-54f9-4b1e-96a1-1633308d4be2.png";

/* V3 imagery — locked editorial palette */
import heroVials from "@/assets/nx_polish_hero_vials.webp";
import tileWolverine from "@/assets/nx_v11_tile_wolverine.webp";
import tileGlow from "@/assets/nx_v11_tile_glow.webp";
import tileRestore from "@/assets/nx_v11_tile_restore.webp";
import tileClarity from "@/assets/nx_v11_tile_clarity.webp";
import tilePrime from "@/assets/nx_v11_tile_prime.webp";
import tileBalance from "@/assets/nx_v11_tile_balance.webp";
/* Legacy imports kept for other sections below */
import tileRecover from "@/assets/nx_v3_tile_recover.webp";
import tileBurn from "@/assets/nx_v3_tile_burnfat.webp";
import tileSleep from "@/assets/nx_v3_tile_sleep.webp";
const doctorShot = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_031301_1d21a0d5-4eec-433b-9288-1b2acc71922b.png";
const productHero = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_030624_7dfcf5e6-3e96-4c96-b025-2a4b5a8c0e4d.png";
import editorialLineup from "@/assets/nx_v3_editorial_lineup.webp";
import moleculeShot from "@/assets/nx_v3_molecule.webp";
import prescriptionShot from "@/assets/nx_v3_prescription.webp";
const physicianPortrait = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_031301_204bece6-e72e-4928-b636-18e2100df141.png";
const labPrecision = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_031339_70395d8a-d7d1-4eb0-881e-43d519542b6a.png";
const morningRitual = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_031355_5639d05f-e892-4fa7-9b7e-bf4e1f0053db.png";
const bloodworkHero = "https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_031340_b607f3ff-ada3-44cb-aed6-613a36ca3ef4.png";

/* ────────────────────────────────────────────────────────────────
   NEXPHORIA · HOME · V3
   Locked design direction: Maximus tile grammar + Bask cinematics
   Eight sections. One idea per section. ADHD-proof.
   1. Hero            — Peptides, prescribed.
   2. Trust bar       — 5 short signals
   3. Goal tiles (4)  — Recover · Burn · Sleep · Glow
   4. How it works    — 3 steps, big numerals
   5. Featured stack  — Wolverine hero card
   6. Numbers         — 3 stats
   7. Physicians      — one portrait, one paragraph
   8. Final CTA       — one line, one button
   ──────────────────────────────────────────────────────────────── */

/* ── Home FAQ data — also drives FAQPage JSON-LD ─────────────── */
const HOME_FAQ_ITEMS = [
  {
    q: "Is Nexphoria legit?",
    a: "Nexphoria is a physician-supervised peptide provider that routes every prescription through a board-certified clinician via the Bask Health telehealth platform. Compounds are prepared in a U.S. 503A-licensed compounding pharmacy under sterile ISO conditions, batch-tested with a Certificate of Analysis on file, and shipped cold-chain. No prescription is dispensed without physician sign-off.",
  },
  {
    q: "How much does Nexphoria cost?",
    a: "Nexphoria protocols start at $249/month for cognitive peptides, $279/month for tissue-repair stacks, and up to $389/month for longevity protocols. All plans include physician consultation, compounded peptides from a U.S. 503A pharmacy, Quest Diagnostics labs every 90 days, and cold-chain shipping. Save 10% with a 6-month prepay or 20% with an annual plan.",
  },
  {
    q: "Is BPC-157 legal in the United States?",
    a: "BPC-157 is legal in the U.S. when prescribed by a licensed physician and compounded by a 503A-licensed pharmacy under federal compounding law. It is not FDA-approved as a standalone drug — it is dispensed off-label as a compounded medication. Nexphoria's BPC-157 protocols require a physician consultation and valid prescription before dispensing.",
  },
  {
    q: "How does Nexphoria compare to Hims or Maximus?",
    a: "Nexphoria focuses exclusively on peptide therapy with mandatory 90-day biomarker monitoring. Hims and Ro primarily offer TRT, GLP-1, and hair-loss medications. Maximus focuses on testosterone optimization. Nexphoria is the only platform combining peptide breadth (16+ compounds), physician-supervised compounding, and quarterly Quest Diagnostics follow-up in a single subscription.",
  },
  {
    q: "Does Nexphoria provide Certificates of Analysis?",
    a: "Yes. Every compounded batch ships with a Certificate of Analysis (COA) confirming potency, sterility, and purity from third-party testing. COAs are available in your member portal and on request. Nexphoria only dispenses from 503A-licensed pharmacies operating under FDA oversight.",
  },
];

export default function Home() {
  useSeo({
    title: "Peptide therapy that works — physician-prescribed, lab-monitored",
    description:
      "Repair faster, sleep deeper, lose fat, sharpen focus. Physician-prescribed peptide protocols compounded in U.S. 503A pharmacies. Quest bloodwork every 90 days. Results you can measure.",
    path: "/",
    jsonLd: [
      orgJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria Home", description: "Physician-prescribed peptide therapy for recovery, metabolic health, longevity, and cognition.", path: "/" }),
      faqJsonLd(HOME_FAQ_ITEMS),
    ],
  });

  return (
    <SiteLayout navVariant="showcase" hideTrustBar>
      <PromoBar />
      <Hero />
      <TrustBar />
      <GoalTiles />
      <FlagshipDark />
      <PeptideTilesStrip />
      <HowItWorks />
      <ScienceStrip />
      <FeaturedStack />
      <Numbers />
      <PrecisionStrip />
      <BloodworkPillar />
      <PhysicianStrip />
      <MorningRitual />
      <HomeFAQSection />
      <HomeComparisonSection />
      <FinalCta />
    </SiteLayout>
  );
}


/* ── 0 · PROMO BAR (Wave 9 · Pattern 13) ─────────────────────── */
function PromoBar() {
  const [i, setI] = React.useState(0);
  const promos = [
    { text: "Free physician review with your first month · limited-time", href: "/assessment", cta: "Start your intake" },
    { text: "New: Bloodwork panels bundled with every recovery protocol", href: "/bloodwork", cta: "See panels" },
    { text: "Discreet 3\u20135 day shipping · U.S. 503A compounding", href: "/how-it-works", cta: "Learn more" },
  ];
  React.useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % promos.length), 6000);
    return () => window.clearInterval(id);
  }, [promos.length]);
  const p = promos[i];
  return (
    <div
      style={{
        background: "var(--nx-black)",
        color: "var(--nx-ceramic)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
      data-testid="promo-bar"
    >
      <div className="nx-container flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2.5" style={{
        fontFamily: "'General Sans', system-ui, sans-serif",
        fontSize: 12.5,
        letterSpacing: "0.02em",
      }}>
        <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--nx-acid)", display: "inline-block" }} />
        <span style={{ opacity: 0.9 }}>{p.text}</span>
        <Link href={p.href} className="inline-flex items-center gap-1" style={{ color: "var(--nx-acid)", fontWeight: 600 }} data-testid="promo-bar-cta">
          {p.cta}
          <ArrowRight size={12} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}

/* ── HERO · Floating Result Cards (Wave 9 · Pattern 01) ──────── */
function FloatingResultCards() {
  const cards: { top: string; left?: string; right?: string; label: string; delta: string; state: string; delay: number }[] = [
    { top: "4%", left: "4%",   label: "IGF-1",           delta: "+23%", state: "Optimal range", delay: 0.2 },
    { top: "88%", right: "4%", label: "Deep sleep",      delta: "+38%", state: "Trending up",   delay: 0.6 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0" data-testid="floating-result-cards">
      {cards.map((c, idx) => (
        <div
          key={idx}
          data-testid={`result-card-${idx}`}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            right: c.right,
            background: "rgba(255,255,250,0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(10,10,10,0.08)",
            borderRadius: 12,
            padding: "10px 14px",
            minWidth: 152,
            boxShadow: "0 8px 28px rgba(10,10,10,0.14)",
            animation: `nx-float-in 640ms ease-out ${c.delay}s both`,
            fontFamily: "'General Sans', system-ui, sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--nx-fg-muted)", fontWeight: 600 }}>{c.label}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--nx-black)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{c.delta}</span>
          </div>
          <div style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B7A2A", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "var(--nx-fg-graphite)" }}>{c.state}</span>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes nx-float-in {
          0%   { opacity: 0; transform: translateY(8px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0)  scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-testid="floating-result-cards"] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ── 1 · HERO ─────────────────────────────────────────────────── */
function Hero() {
  // Hims-grammar hero: emotional headline + two large feature cards + 4 condition tiles.
  // Ref: /tmp/hims_labs/homepage/TEARDOWN.md sections 1B, 1C.
  const conditionTiles = [
    { pre: "Recover", accent: "faster",   accentColor: "var(--nx-acid)", href: "/stacks/wolverine", testId: "cond-tile-recover",   image: tileWolverine },
    { pre: "Look",    accent: "radiant",  accentColor: "#E8B05F",         href: "/stacks/glow",       testId: "cond-tile-radiant",   image: tileGlow },
    { pre: "Think",   accent: "sharper",  accentColor: "#C98A3B",         href: "/stacks/clarity",    testId: "cond-tile-sharper",   image: tileClarity },
    { pre: "Get your",accent: "bloodwork",accentColor: "var(--nx-acid)", href: "/bloodwork",         testId: "cond-tile-bloodwork", image: bloodworkHero },
  ];

  return (
    <section className="relative bg-nx-ceramic overflow-hidden" aria-labelledby="home-h1">
      <div className="h-10 md:h-14" />
      <div className="nx-container pb-10 md:pb-16">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--nx-fg-muted)",
          }}
        >
          <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--nx-acid)", display: "inline-block" }} />
          Physician-Guided Peptide Therapy
        </div>

        {/* Wikipedia-style definition — AI parseable first sentence */}
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 400,
            color: "var(--nx-fg-muted)",
            lineHeight: 1.6,
            maxWidth: "48rem",
            marginBottom: "1rem",
          }}
        >
          Nexphoria is a U.S.-based physician-supervised peptide therapy service delivering third-party-tested compounded peptides with 90-day biomarker follow-up.
        </p>

        {/* Big emotional headline — Hims Canela grammar */}
        <h1
          id="home-h1"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(50px, 7.2vw, 96px)",
            lineHeight: 1.04,
            letterSpacing: "-0.015em",
            color: "var(--nx-black)",
            margin: 0,
            maxWidth: "18ch",
          }}
          data-testid="text-hero-headline"
        >
          The best version of you,{" "}
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", color: "#B97C24" }}>prescribed.</span>
        </h1>

        <p
          className="mt-8 max-w-2xl"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "19px",
            lineHeight: 1.5,
            color: "var(--nx-fg-graphite)",
          }}
        >
          Physician-guided peptide protocols. Compounded in U.S. 503A pharmacies.
          Delivered to your door. Pick a goal — we handle the rest.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2"
            style={{
              background: "var(--nx-acid)",
              color: "var(--nx-black)",
              padding: "14px 22px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "15px",
              letterSpacing: "-0.01em",
            }}
            data-testid="button-hero-start"
          >
            Start assessment
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 border rounded-full px-6 py-3.5"
            style={{
              borderColor: "rgba(10,10,10,0.14)",
              color: "var(--nx-black)",
              fontWeight: 500,
              fontSize: "15px",
            }}
            data-testid="link-hero-how"
          >
            How it works
            <ArrowUpRight size={16} strokeWidth={2} />
          </Link>
          <span
            className="ml-1"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--nx-fg-muted)",
            }}
          >
            No commitment · Physician-reviewed in 24–48h · 5-min intake
          </span>
        </div>

        {/* ── Cinematic living hero — hims-grammar video band ── */}
        <div
          className="mt-12 md:mt-16 relative overflow-hidden"
          style={{ borderRadius: "26px", boxShadow: "0 24px 60px -24px rgba(28,24,21,0.28)" }}
          data-testid="hero-video-band"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster}
            src={heroVideo}
            className="w-full h-auto block"
            style={{ aspectRatio: "3 / 1.55", objectFit: "cover" }}
            aria-label="Warm morning light — the Nexphoria standard of care"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, transparent 62%, rgba(28,24,21,0.32))" }}
          />
          <div className="absolute left-5 bottom-4 md:left-8 md:bottom-6">
            <p
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(18px, 2.4vw, 28px)",
                color: "#FAF7F0",
                textShadow: "0 2px 18px rgba(28,24,21,0.45)",
                margin: 0,
              }}
            >
              Care that feels like morning light.
            </p>
          </div>
        </div>

        {/* Maximus-style benefit-stat tile strip — leads with hard proof, not fluff */}
        <div className="mt-14 md:mt-16">
          <div className="flex items-baseline justify-between mb-5">
            <div className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#8B5A2B", fontWeight: 600 }}>
              What you actually get
            </div>
            <div className="hidden md:block text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#8A8A8A" }}>
              Every order · every state · every time
            </div>
          </div>
          <BenefitTileGrid cols={4}>
            <BenefitTile
              tone="cream"
              eyebrow="01 · Rx"
              icon={<Stethoscope size={16} strokeWidth={2} />}
              metric="24"
              metricUnit="HR REVIEW"
              headline="Board-certified physician on every protocol"
              sub="US-licensed MDs review intake, cart, and labs before any peptide ships. No cookie-cutter regimens."
              href="/physicians"
              cta="Meet the team"
              testId="benefit-tile-physician"
            />
            <BenefitTile
              tone="cream"
              eyebrow="02 · Pharmacy"
              icon={<Beaker size={16} strokeWidth={2} />}
              metric="503A"
              metricUnit="US COMPOUND"
              headline="Sterile-compounded to research-grade purity"
              sub="Every batch third-party COA tested for peptide identity, purity, endotoxins. Never grey-market vials."
              href="/science"
              cta="See the lab"
              testId="benefit-tile-pharmacy"
            />
            <BenefitTile
              tone="cream"
              eyebrow="03 · Ship"
              icon={<Truck size={16} strokeWidth={2} />}
              metric="50"
              metricUnit="STATES"
              headline="Cold-chain overnight to your door"
              sub="Discreet packaging, temperature-controlled, tracked. Peptides arrive intact — as pharma-grade requires."
              href="/how-it-works"
              cta="Track a shipment"
              testId="benefit-tile-ship"
            />
            <BenefitTile
              tone="cream"
              eyebrow="04 · Data"
              icon={<ShieldCheck size={16} strokeWidth={2} />}
              metric="90"
              metricUnit="DAY LABS"
              headline="Bloodwork-guided dosing you actually own"
              sub="Quest labs at intake and 90 days. HIPAA-encrypted. You see the biomarkers — physicians adjust the protocol in-app."
              href="/bloodwork"
              cta="See the dashboard"
              testId="benefit-tile-data"
            />
          </BenefitTileGrid>
        </div>

        {/* Two large flagship feature cards — Hims Type A grammar */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* LEFT: Wolverine — dark cobalt */}
          <Link
            href="/stacks/wolverine"
            className="group relative block overflow-hidden rounded-[16px]"
            style={{ background: "var(--nx-cobalt, #0F1F3D)", aspectRatio: "16 / 9", minHeight: 240 }}
            data-testid="hero-card-wolverine"
          >
            <img
              src={tileWolverine}
              alt="Wolverine stack — recovery peptides"
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.04]"
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(15,31,61,0.94) 0%, rgba(15,31,61,0.60) 45%, rgba(15,31,61,0.15) 100%)" }}
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
              <div
                className="inline-flex items-center gap-2 self-start"
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--nx-acid)",
                }}
              >
                <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--nx-acid)", display: "inline-block" }} />
                Flagship · Recovery
              </div>
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,243,0.72)", marginBottom: 6 }}>
                    Start your
                  </div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(26px, 3.4vw, 40px)",
                      lineHeight: 1.02,
                      letterSpacing: "-0.02em",
                      color: "#fffff3",
                    }}
                  >
                    recovery today
                  </div>
                  <div className="mt-3" style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13.5px", color: "rgba(255,255,243,0.78)" }}>
                    Wolverine · BPC-157 · TB-500 · From $189/mo
                  </div>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 46, height: 46, background: "var(--nx-acid)", color: "var(--nx-black)" }}
                >
                  <ArrowRight size={18} strokeWidth={2.2} />
                </span>
              </div>
            </div>
          </Link>

          {/* RIGHT: Glow — warm tan */}
          <Link
            href="/stacks/glow"
            className="group relative block overflow-hidden rounded-[16px]"
            style={{ background: "#B89066", aspectRatio: "16 / 9", minHeight: 240 }}
            data-testid="hero-card-glow"
          >
            <img
              src={tileGlow}
              alt="Glow stack — beauty peptides"
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(184,144,102,0.85) 0%, rgba(184,144,102,0.35) 55%, rgba(184,144,102,0.08) 100%)" }}
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
              <div
                className="inline-flex items-center gap-2 self-start"
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "#fffff3",
                }}
              >
                <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: "#fffff3", display: "inline-block" }} />
                Flagship · Beauty
              </div>
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,243,0.85)", marginBottom: 6 }}>
                    See how much you can
                  </div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(26px, 3.4vw, 40px)",
                      lineHeight: 1.02,
                      letterSpacing: "-0.02em",
                      color: "#fffff3",
                    }}
                  >
                    glow up
                  </div>
                  <div className="mt-3" style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13.5px", color: "rgba(255,255,243,0.9)" }}>
                    Glow · GHK-Cu · GHRP-2 · From $169/mo
                  </div>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 46, height: 46, background: "#fffff3", color: "var(--nx-black)" }}
                >
                  <ArrowRight size={18} strokeWidth={2.2} />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Condition tile row — Hims Type B */}
        <div className="mt-3 md:mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {conditionTiles.map((t) => (
            <Link
              key={t.testId}
              href={t.href}
              data-testid={t.testId}
              className="group relative flex items-center justify-between overflow-hidden rounded-[14px] px-4 py-4"
              style={{
                background: "#F1EDE4",
                border: "1px solid rgba(10,10,10,0.06)",
              }}
            >
              <div className="min-w-0 pr-2">
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(15px, 1.4vw, 18px)",
                    letterSpacing: "-0.01em",
                    color: "var(--nx-black)",
                    lineHeight: 1.15,
                  }}
                >
                  {t.pre}{" "}
                  <span style={{ fontWeight: 700, color: t.accentColor }}>
                    {t.accent}
                  </span>
                </div>
              </div>
              <div
                className="relative shrink-0 overflow-hidden rounded-[10px]"
                style={{ width: 52, height: 52, background: "var(--nx-rock)" }}
                aria-hidden
              >
                <img
                  src={t.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 2 · TRUST TICKER (Wave 10 · Polish Race) ────────────────── */
function TrustBar() {
  const items = [
    "LICENSED PROVIDERS",
    "PRESCRIPTION REQUIRED",
    "CLINICAL-GRADE PEPTIDES",
    "THIRD-PARTY TESTED",
    "DISCREET SHIPPING",
    "U.S. 503A PHARMACIES",
    "HIPAA-COMPLIANT",
    "PHYSICIAN-REVIEWED",
  ];
  const doubled = [...items, ...items];
  return (
    <section
      aria-label="Trust signals"
      style={{
        background: "var(--nx-black)",
        color: "var(--nx-ceramic)",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      data-testid="trust-ticker"
    >
      <style>{`
        @keyframes nx-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nx-marquee-track {
          display: inline-flex;
          align-items: center;
          gap: 48px;
          padding: 18px 0;
          animation: nx-marquee 45s linear infinite;
          white-space: nowrap;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .nx-marquee-track { animation: none; }
        }
      `}</style>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div
          className="nx-marquee-track"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "12.5px",
            fontWeight: 500,
            letterSpacing: "0.14em",
          }}
        >
          {doubled.map((label, i) => (
            <span key={i} className="inline-flex items-center" style={{ gap: 20 }}>
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--nx-acid)",
                  display: "inline-block",
                }}
              />
              <span style={{ opacity: 0.92 }}>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3 · GOAL TILES ───────────────────────────────────────────── */
function GoalTiles() {
  const tiles = [
    {
      eyebrow: "Performance",
      title: "Wolverine",
      copy: "Recover faster — BPC-157 · TB-500",
      image: tileWolverine,
      href: "/stacks/wolverine",
      testId: "tile-wolverine",
    },
    {
      eyebrow: "Beauty",
      title: "Glow",
      copy: "Skin, hair, radiance — GHK-Cu · GHRP-2",
      image: tileGlow,
      href: "/stacks/glow",
      testId: "tile-glow",
    },
    {
      eyebrow: "Longevity",
      title: "Restore",
      copy: "Growth hormone — CJC-1295 · ipamorelin",
      image: tileRestore,
      href: "/stacks/growth",
      testId: "tile-restore",
    },
    {
      eyebrow: "Focus",
      title: "Clarity",
      copy: "Cognitive support — semax · selank",
      image: tileClarity,
      href: "/stacks/clarity",
      testId: "tile-clarity",
    },
    {
      eyebrow: "Weight",
      title: "Prime",
      copy: "GLP-1 protocols — semaglutide · tirzepatide",
      image: tilePrime,
      href: "/stacks/glp1",
      testId: "tile-prime",
    },
    {
      eyebrow: "Wellness",
      title: "Balance",
      copy: "Sleep, mood, calm — DSIP · epitalon",
      image: tileBalance,
      href: "/stacks/balance",
      testId: "tile-balance",
    },
  ];

  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--nx-ceramic)" }}
    >
      <div className="nx-container">
        <div className="max-w-2xl mb-12 md:mb-16">
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--nx-acid)",
                display: "inline-block",
              }}
            />
            Pick a goal
          </div>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(40px, 5.2vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--nx-black)",
              margin: 0,
            }}
          >
            Choose what to optimize.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {tiles.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              data-testid={t.testId}
              className="group relative block rounded-[14px] overflow-hidden"
              style={{
                background: "var(--nx-rock)",
                aspectRatio: "3 / 4",
              }}
            >
              <img
                src={t.image}
                alt={t.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
              {/* darken gradient for text */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              {/* top-left eyebrow */}
              <div
                className="absolute top-3 left-3 inline-flex items-center gap-1.5"
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#fffff3",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--nx-acid)",
                    display: "inline-block",
                  }}
                />
                {t.eyebrow}
              </div>

              {/* bottom-left title + benefit + arrow (tighter Hims-scale) */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div className="min-w-0">
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(18px, 1.6vw, 22px)",
                      lineHeight: 1.02,
                      letterSpacing: "-0.02em",
                      color: "#fffff3",
                    }}
                  >
                    {t.title}
                  </div>
                  <div
                    className="mt-1 truncate"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: "11px",
                      color: "rgba(255,255,243,0.82)",
                    }}
                  >
                    {t.copy}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                  style={{
                    width: 28,
                    height: 28,
                    background: "var(--nx-acid)",
                    color: "var(--nx-black)",
                  }}
                >
                  <ArrowUpRight size={14} strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- 3.5 - FLAGSHIP DARK (Hims weight-loss pattern) --------- */
function FlagshipDark() {
  const F = "'General Sans', system-ui, sans-serif";
  return (
    <section
      data-testid="flagship-dark"
      style={{
        backgroundColor: "var(--nx-black)",
        color: "#FFFFF3",
        paddingTop: "clamp(4rem, 7vw, 6.5rem)",
        paddingBottom: "clamp(4rem, 7vw, 6.5rem)",
      }}
    >
      <div className="nx-container">
        <Reveal>
          <div
            style={{ display: "grid", gap: "3rem", alignItems: "center" }}
            className="md:grid-cols-[1fr_1fr]"
          >
            <div>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-acid)", marginBottom: "1.5rem" }}>
                Recovery stack
              </p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(2rem, 4.4vw, 3.6rem)", lineHeight: 1.02, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
                Tissue repair, <span style={{ color: "var(--nx-acid)" }}>accelerated.</span>
              </h2>
              <p style={{ fontFamily: F, fontSize: "clamp(1rem, 1.15vw, 1.15rem)", lineHeight: 1.6, color: "rgba(255,255,243,0.75)", maxWidth: 520, marginBottom: "2rem" }}>
                BPC-157 + TB-500 + CJC-1295 / Ipamorelin. Four peptides that repair connective tissue, kill inflammation, and rebuild lean mass - one physician-supervised protocol, recalibrated every 90 days against your bloodwork.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "grid", gap: "0.75rem", maxWidth: 480 }}>
                {[
                  "Down 81% inflammation (hs-CRP) in 90 days",
                  "IGF-1 shift into upper-quartile recovery band",
                  "Physician review + bloodwork bundled every quarter",
                ].map((line) => (
                  <li key={line} style={{ fontFamily: F, fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,243,0.85)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--nx-acid)", flexShrink: 0 }} />
                    {line}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                <Link href="/stacks/wolverine" data-testid="flagship-dark-cta-primary" style={{ fontFamily: F, fontSize: 14, fontWeight: 600, letterSpacing: "0.01em", color: "var(--nx-black)", backgroundColor: "var(--nx-acid)", padding: "0.95rem 1.5rem", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  See Wolverine <ArrowRight size={14} strokeWidth={2} />
                </Link>
                <Link href="/bloodwork" data-testid="flagship-dark-cta-secondary" style={{ fontFamily: F, fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", color: "#FFFFF3", padding: "0.9rem 1.4rem", border: "1px solid rgba(255,255,243,0.28)", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  See the bloodwork <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
            </div>
            <div style={{ background: "linear-gradient(150deg, #0F1B3A 0%, #050914 100%)", border: "1px solid rgba(255,255,243,0.12)", borderRadius: 20, padding: "1.6rem", position: "relative", overflow: "hidden" }}>
              <div style={{ aspectRatio: "4 / 3", backgroundImage: "linear-gradient(145deg,#132352,#0A1230)", backgroundSize: "cover", backgroundPosition: "center", borderRadius: 12, marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden>
                <div style={{ fontFamily: F, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "rgba(255,255,243,0.14)", letterSpacing: "-0.02em" }}>WOLVERINE</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,243,0.55)", marginBottom: "0.4rem" }}>Nexphoria Wolverine</p>
                  <p style={{ fontFamily: F, fontSize: 18, fontWeight: 500, color: "#FFFFF3", letterSpacing: "-0.01em" }}>Recovery - Longevity - Repair</p>
                </div>
                <div style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: "var(--nx-acid)", letterSpacing: "0.02em", fontVariantNumeric: "tabular-nums" }}>from $349/mo</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4 · HOW IT WORKS ─────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Take the intake",
      copy: "Five-minute medical questionnaire. Share your goal, meds, and history.",
    },
    {
      n: "02",
      title: "Physician review",
      copy: "A board-certified MD writes your prescription within 24–48 hours.",
    },
    {
      n: "03",
      title: "Delivered to your door",
      copy: "Compounded in a licensed US pharmacy. Discreet 3–5 day shipping.",
    },
  ];
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="py-24 md:py-32 border-t"
      style={{
        background: "var(--nx-black)",
        borderColor: "rgba(255,255,243,0.06)",
        color: "var(--nx-ceramic)",
      }}
    >
      <div className="nx-container">
        <div className="mb-14 md:mb-20 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,243,0.55)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--nx-acid)",
                display: "inline-block",
              }}
            />
            How it works
          </div>
          <h2
            id="how-it-works-heading"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(40px, 5.2vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "var(--nx-ceramic)",
            }}
          >
            Three steps.
            <br />
            No clinic visit.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
          {steps.map((s) => (
            <Reveal key={s.n}>
              <div className="border-t pt-6" style={{ borderColor: "rgba(255,255,243,0.14)" }}>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "0.06em",
                    color: "var(--nx-acid)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-4"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(24px, 2.4vw, 32px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--nx-ceramic)",
                  }}
                >
                  {s.title}
                </div>
                <p
                  className="mt-3 max-w-sm"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: 1.55,
                    color: "rgba(255,255,243,0.7)",
                  }}
                >
                  {s.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5 · FEATURED STACK ───────────────────────────────────────── */
/* ── 4.5 · SCIENCE STRIP ─────────────────────────────────────── */
function ScienceStrip() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--nx-rock)" }}
    >
      <div className="nx-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <div
            className="relative rounded-[16px] overflow-hidden aspect-[4/5]"
            style={{ background: "var(--nx-ceramic)" }}
          >
            <img
              src={moleculeShot}
              alt="Peptide molecular structure"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--nx-acid)",
                display: "inline-block",
              }}
            />
            The science
          </div>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 4.6vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--nx-black)",
              margin: 0,
            }}
          >
            Signals your body already speaks.
          </h2>
          <p
            className="mt-6 max-w-xl"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--nx-fg-graphite)",
            }}
          >
            Peptides are short chains of amino acids — the same messengers your body already uses to trigger repair, recovery, and regeneration. We compound clinically studied peptides in U.S. 503A pharmacies, then a board‑certified physician writes your protocol.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "3–36", label: "Amino acids per peptide" },
              { n: "503A", label: "U.S. compounding pharmacy" },
              { n: "24–48h", label: "Physician turnaround" },
            ].map((s) => (
              <div
                key={s.label}
                className="pt-5 border-t"
                style={{ borderColor: "rgba(10,10,10,0.14)" }}
              >
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(28px, 3vw, 40px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "var(--nx-black)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-2"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg-muted)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/science"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "var(--nx-black)",
                borderBottom: "1px solid rgba(10,10,10,0.3)",
                paddingBottom: 2,
              }}
              data-testid="link-science-home"
            >
              Read the science
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedStack() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--nx-ceramic)" }}
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--nx-fg-muted)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--nx-acid)",
                  display: "inline-block",
                }}
              />
              Recovery protocol
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(40px, 5vw, 60px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--nx-black)",
                margin: 0,
              }}
            >
              Faster tissue repair. Less inflammation.
            </h2>
            <p
              className="mt-6 max-w-md"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "17px",
                lineHeight: 1.6,
                color: "var(--nx-fg-graphite)",
              }}
            >
              BPC-157 + TB-500. The combination athletes and MMA fighters use
              off-label to accelerate tissue repair and reduce systemic
              inflammation. Physician-guided. Compounded in a US pharmacy.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Repairs tendon and ligament faster than rest alone",
                "Reduces gut and joint inflammation",
                "8-week protocol · single subcutaneous injection",
              ].map((li) => (
                <li
                  key={li}
                  className="flex items-start gap-3"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    lineHeight: 1.5,
                    color: "var(--nx-fg-graphite)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--nx-acid)",
                      display: "inline-block",
                      marginTop: 8,
                      flexShrink: 0,
                    }}
                  />
                  {li}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/stacks/wolverine"
                className="inline-flex items-center gap-2 rounded-full px-6 py-4"
                style={{
                  background: "var(--nx-black)",
                  color: "var(--nx-ceramic)",
                  fontWeight: 500,
                  fontSize: "15px",
                }}
                data-testid="link-featured-wolverine"
              >
                See Wolverine
                <ArrowUpRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div
              className="relative rounded-[16px] overflow-hidden group"
              style={{
                background: "var(--nx-rock)",
                aspectRatio: "4 / 3",
              }}
            >
              <img
                src={editorialLineup}
                alt="Wolverine peptide stack — five amber vials on ceramic"
                className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                loading="eager"
                decoding="async"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.15) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6 · NUMBERS ──────────────────────────────────────────────── */
function Numbers() {
  const stats: Array<{ n: number; suffix?: string; label: string }> = [
    { n: 12000, suffix: "+", label: "Protocols shipped" },
    { n: 48, suffix: " states", label: "Physician coverage" },
    { n: 24, suffix: "h", label: "Median review time" },
  ];
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{
        background: "var(--nx-black)",
        borderColor: "rgba(255,255,243,0.06)",
      }}
    >
      <div className="nx-container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {stats.map((s) => (
          <div key={s.label} className="border-t pt-6" style={{ borderColor: "rgba(255,255,243,0.14)" }}>
            <div
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(56px, 6.5vw, 92px)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                color: "var(--nx-ceramic)",
              }}
            >
              <AnimatedCounter value={s.n} suffix={s.suffix ?? ""} />
            </div>
            <div
              className="mt-3"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,243,0.55)",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 7 · PHYSICIAN STRIP ──────────────────────────────────────── */
function PhysicianStrip() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--nx-ceramic)" }}
    >
      <div className="nx-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 group">
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{
              background: "var(--nx-rock)",
              aspectRatio: "5 / 4",
            }}
          >
            <img
              src={physicianPortrait}
              alt="A board-certified physician holding a prescription vial"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute bottom-4 left-4 right-4 flex items-end justify-between"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--nx-ceramic)",
                textShadow: "0 1px 8px rgba(0,0,0,0.35)",
              }}
            >
              <span>Dr. R. Alvarez, MD</span>
              <span style={{ opacity: 0.75 }}>Internal medicine · NY</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--nx-acid)",
                display: "inline-block",
              }}
            />
            Your physicians
          </div>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 4.6vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--nx-black)",
              margin: 0,
            }}
          >
            A real MD writes every prescription.
          </h2>
          <p
            className="mt-6 max-w-lg"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--nx-fg-graphite)",
            }}
          >
            Board-certified physicians across all 50 states review your intake,
            confirm safety, and write your protocol. No PA-only telehealth
            model. No commodity supplements. Real medicine, remotely.
          </p>

          <div className="mt-8">
            <Link
              href="/physicians"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "var(--nx-black)",
                borderBottom: "1px solid rgba(10,10,10,0.3)",
                paddingBottom: 2,
              }}
              data-testid="link-physicians"
            >
              Meet the physicians
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 8 · FINAL CTA ────────────────────────────────────────────── */
function FinalCta() {
  return (
    <section
      className="py-32 md:py-44 border-t"
      style={{
        background: "var(--nx-black)",
        borderColor: "rgba(255,255,243,0.06)",
        color: "var(--nx-ceramic)",
      }}
    >
      <div className="nx-container text-center">
        <h2
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(56px, 8vw, 128px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: "var(--nx-ceramic)",
            margin: 0,
          }}
        >
          Start in five minutes.
        </h2>
        <p
          className="mt-6 mx-auto max-w-xl"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: 1.6,
            color: "rgba(255,255,243,0.7)",
          }}
        >
          Answer a few questions. A physician reviews within 24–48 hours. Your
          protocol ships to your door.
        </p>
        <div className="mt-10 inline-flex">
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2"
            style={{
              background: "var(--nx-acid)",
              color: "var(--nx-black)",
              padding: "18px 30px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "16px",
              letterSpacing: "-0.01em",
            }}
            data-testid="button-final-start"
          >
            Start assessment
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── PRECISION STRIP · lab image + weighed to 0.0035g ─────────── */
function PrecisionStrip() {
  return (
    <section
      className="py-24 md:py-32 border-t"
      style={{
        background: "var(--nx-black)",
        color: "var(--nx-ceramic)",
        borderColor: "rgba(255,255,243,0.06)",
      }}
    >
      <div className="nx-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1 group">
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{ aspectRatio: "4 / 3", background: "#141414" }}
          >
            <img
              src={labPrecision}
              alt="Peptide compound weighed on a precision analytical balance in a 503A pharmacy"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,243,0.55)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--nx-acid)",
                display: "inline-block",
              }}
            />
            The pharmacy
          </div>

          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 4.6vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--nx-ceramic)",
              margin: 0,
            }}
          >
            Weighed to the thousandth of a gram.
          </h2>

          <p
            className="mt-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "17px",
              lineHeight: 1.6,
              color: "rgba(255,255,243,0.72)",
              maxWidth: "36ch",
            }}
          >
            Every dose is compounded in a U.S. 503A pharmacy on Sartorius analytical balances
            accurate to 0.0001g. Third-party sterility and identity tested. Cold-chain shipped.
          </p>

          <div
            className="mt-10 grid grid-cols-3 gap-6"
            style={{ borderTop: "1px solid rgba(255,255,243,0.14)", paddingTop: 22 }}
          >
            {[
              { k: "503A", v: "U.S. pharmacy" },
              { k: "USP-797", v: "Sterile" },
              { k: "3rd-party", v: "Tested" },
            ].map((s) => (
              <div key={s.k}>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "20px",
                    letterSpacing: "-0.02em",
                    color: "var(--nx-ceramic)",
                  }}
                >
                  {s.k}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                    color: "rgba(255,255,243,0.55)",
                  }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MORNING RITUAL · lifestyle strip ─────────────────────────── */
function MorningRitual() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--nx-rock)" }}
    >
      <div className="nx-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-20 md:py-28">
        <div className="lg:col-span-6">
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--nx-acid)",
                display: "inline-block",
              }}
            />
            Daily dose
          </div>

          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 4.6vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--nx-black)",
              margin: 0,
            }}
          >
            Ten seconds. Once a day.
          </h2>

          <p
            className="mt-6"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--nx-fg-graphite)",
              maxWidth: "38ch",
            }}
          >
            Most protocols are a single subcutaneous injection or oral dose taken with coffee.
            The vial lives on your counter. Your physician handles the medicine. You just show up.
          </p>

          <div className="mt-8">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "var(--nx-black)",
                borderBottom: "1px solid rgba(10,10,10,0.3)",
                paddingBottom: 2,
              }}
              data-testid="link-ritual-more"
            >
              See a full week of dosing
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 group">
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{ aspectRatio: "3 / 2", background: "var(--nx-ceramic)" }}
          >
            <img
              src={morningRitual}
              alt="A hand holding a small amber prescription vial next to a handwritten note on a ceramic tray in morning light"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── BLOODWORK PILLAR (home promo) ─────────────────────────────── */
function BloodworkPillar() {
  const stats = [
    { n: 80, suffix: "+", label: "Biomarkers tracked" },
    { n: 90, suffix: " days", label: "Retest cadence" },
    { n: 2500, suffix: "+", label: "Draw sites nationwide" },
    { n: 48, suffix: "h", label: "MD review turnaround" },
  ];

  return (
    <section
      style={{
        background: "var(--nx-black)",
        color: "var(--nx-ceramic)",
        padding: "clamp(80px, 12vw, 160px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="nx-container">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{
            gap: "clamp(48px, 6vw, 96px)",
          }}
        >
          {/* LEFT — copy */}
          <div>
            <Reveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-acid)",
                  marginBottom: 32,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--nx-acid)",
                    display: "inline-block",
                  }}
                />
                Your bloodwork
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(44px, 6vw, 84px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                  color: "var(--nx-ceramic)",
                  margin: 0,
                }}
              >
                The panel <span style={{ color: "var(--nx-acid)" }}>is</span> the protocol.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: "rgba(255,255,243,0.72)",
                  marginTop: 28,
                  maxWidth: 560,
                }}
              >
                Peptides move labs. Every dose, every week. Without a baseline
                panel and a 90-day retest, you&rsquo;re guessing. We run the labs,
                a physician reads them, and your protocol adjusts to the data.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(255,255,243,0.55)",
                  marginTop: 20,
                  maxWidth: 560,
                }}
              >
                Foundation Panel free with any active protocol. Deep Panel and
                Continuous Membership options for the people who want to see
                everything. HSA/FSA eligible. Superbill for out-of-network
                reimbursement.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  marginTop: 40,
                }}
              >
                <Link
                  href="/bloodwork"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--nx-acid)",
                    color: "var(--nx-black)",
                    padding: "18px 32px",
                    borderRadius: 999,
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                  data-testid="link-home-bloodwork-cta"
                >
                  See the bloodwork program
                  <ArrowUpRight size={18} strokeWidth={2} />
                </Link>
                <Link
                  href="/bloodwork"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "transparent",
                    color: "var(--nx-ceramic)",
                    padding: "18px 28px",
                    borderRadius: 999,
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,243,0.22)",
                  }}
                  data-testid="link-home-bloodwork-pricing"
                >
                  Pricing &amp; insurance
                </Link>
              </div>
            </Reveal>

            {/* stat row */}
            <div
              style={{
                marginTop: 64,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
                maxWidth: 560,
              }}
            >
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.25 + i * 0.04}>
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,243,0.14)",
                      paddingTop: 18,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: 38,
                        letterSpacing: "-0.02em",
                        color: "var(--nx-ceramic)",
                        lineHeight: 1,
                      }}
                    >
                      <AnimatedCounter value={s.n} suffix={s.suffix} />
                    </div>
                    <div
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,243,0.58)",
                        letterSpacing: "0.02em",
                        marginTop: 8,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT — image */}
          <Reveal delay={0.12}>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/5",
                borderRadius: 20,
                overflow: "hidden",
                background: "#111",
              }}
            >
              <img
                src={bloodworkHero}
                alt="Phlebotomy tray with vacutainer tubes on cream ceramic surface"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* corner tag */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  padding: "8px 14px",
                  background: "rgba(10,10,10,0.72)",
                  color: "var(--nx-acid)",
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  borderRadius: 999,
                  backdropFilter: "blur(8px)",
                }}
              >
                Included · Free with active protocol
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── PEPTIDE TILES STRIP · living vials on the homepage ─────────── */
function PeptideTilesStrip() {
  // Hand-picked flagship peptides to feature
  const FEATURED = ["bpc-157", "tirzepatide", "ipamorelin", "nad-plus"];
  const SHORT: Record<string, string> = {
    recovery: "Recovery",
    skin: "Skin",
    cognition: "Cognition",
    sleep: "Sleep",
    growth: "Growth",
    longevity: "Longevity",
    metabolic: "Metabolic",
  };
  const featured = FEATURED
    .map((slug) => ALL_PEPTIDES.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--nx-rock)" }}
      data-testid="section-featured-peptides"
    >
      <div className="nx-container">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--nx-fg-muted)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--nx-acid)",
                  display: "inline-block",
                }}
              />
              Featured pharmacy
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(36px, 4.8vw, 60px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--nx-black)",
                margin: 0,
              }}
            >
              Hover a vial. Meet the peptide.
            </h2>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--nx-fg-graphite)",
                marginTop: 18,
                maxWidth: 520,
              }}
            >
              Every peptide in our pharmacy lists its mechanism, dose, and monthly cost up front. No fine print.
            </p>
          </div>
          <Link
            href="/peptides"
            data-testid="link-see-all-peptides"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--nx-black)",
              padding: "14px 22px",
              background: "var(--nx-acid)",
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            See all 16 peptides
            <ArrowUpRight size={16} strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => {
            const price = getPrice(p.slug)?.monthlyPrice;
            const mechShort = p.mechanism
              .split(/(?<=[.!?])\s+/)
              .slice(0, 2)
              .join(" ")
              .slice(0, 200);
            return (
              <VialTile
                key={p.slug}
                href={`/peptides/${p.slug}`}
                name={p.name}
                fullName={p.fullName}
                tagline={p.tagline}
                tone={categoryToTone(p.category)}
                glyph={p.glyph}
                price={price}
                categoryLabel={SHORT[p.category]}
                evidenceTier="B"
                mechanism={mechShort}
                dose={p.typicalDose}
                cycle={p.cycleLength}
                ctaLabel="See protocol"
                testId={`home-${p.slug}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── HOME FAQ SECTION ──────────────────────────────────────────────── */
function HomeFAQSection() {
  const [open, setOpen] = React.useState<number | null>(null);
  const FONT = "'General Sans', system-ui, sans-serif";
  return (
    <section
      aria-labelledby="home-faq-heading"
      style={{
        backgroundColor: "var(--nx-bg-cream)",
        borderTop: "1px solid var(--nx-border)",
        padding: "clamp(4rem, 8vw, 6rem) 0",
      }}
    >
      <div className="nx-container" style={{ maxWidth: "740px" }}>
        <p
          style={{
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
          }}
        >
          <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
          Common questions
        </p>
        <h2
          id="home-faq-heading"
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "var(--nx-fg)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Questions about Nexphoria.
        </h2>
        <p
          style={{
            fontFamily: FONT,
            fontSize: "1.0625rem",
            color: "var(--nx-fg-muted)",
            lineHeight: 1.65,
            marginBottom: "2.5rem",
          }}
        >
          Nexphoria is a U.S.-based physician-supervised peptide therapy service delivering third-party-tested compounded peptides with 90-day biomarker follow-up.
        </p>
        <div>
          {HOME_FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid var(--nx-border)",
                padding: "1.25rem 0",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  textAlign: "left",
                  padding: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 600,
                    fontSize: "1.0625rem",
                    color: "var(--nx-fg)",
                    lineHeight: 1.3,
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    fontFamily: FONT,
                    fontSize: "1.25rem",
                    fontWeight: 300,
                    color: "var(--nx-cobalt)",
                    lineHeight: 1,
                  }}
                >
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "1rem",
                    color: "var(--nx-fg-muted)",
                    lineHeight: 1.7,
                    marginTop: "0.875rem",
                  }}
                >
                  {item.a}
                </p>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--nx-border)" }} />
        </div>
      </div>
    </section>
  );
}

/* ── HOME COMPARISON TABLE ─────────────────────────────────────────── */
const HOME_COMPARISON_ROWS = [
  { feature: "Physician prescription required", nexphoria: "Yes — board-certified", hims: "Yes — GLP-1 only", research: "No — no oversight" },
  { feature: "503A U.S. compounding pharmacy", nexphoria: "Yes — sterile ISO", hims: "Yes — limited compounds", research: "No — unverified" },
  { feature: "Certificate of Analysis (COA)", nexphoria: "Every batch", hims: "Varies", research: "Rarely" },
  { feature: "Quest Diagnostics labs included", nexphoria: "Every 90 days", hims: "Not standard", research: "None" },
  { feature: "Peptide breadth (compounds)", nexphoria: "16+ compounds", hims: "3–5 compounds", research: "Unlimited (unregulated)" },
  { feature: "Cold-chain shipping", nexphoria: "Yes — 3–5 days", hims: "Yes", research: "No" },
  { feature: "Physician declines if inappropriate", nexphoria: "Always", hims: "Varies", research: "N/A" },
];

function HomeComparisonSection() {
  const FONT = "'General Sans', system-ui, sans-serif";
  return (
    <section
      aria-labelledby="home-comparison-heading"
      style={{
        backgroundColor: "var(--nx-bg)",
        borderTop: "1px solid var(--nx-border)",
        padding: "clamp(4rem, 8vw, 6rem) 0",
      }}
    >
      <div className="nx-container" style={{ maxWidth: "860px" }}>
        <Reveal>
          <p
            style={{
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
            }}
          >
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
            How we compare
          </p>
          <h2
            id="home-comparison-heading"
            style={{
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            Nexphoria vs. the alternatives.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: FONT,
                fontSize: "13px",
              }}
            >
              <caption
                style={{
                  captionSide: "bottom",
                  textAlign: "left",
                  paddingTop: "0.75rem",
                  fontSize: "11px",
                  color: "var(--nx-fg-muted)",
                }}
              >
                Nexphoria vs. Hims/Ro telehealth vs. research chemical sites. All Nexphoria peptides are physician-prescribed, 503A-compounded, and COA-verified.
              </caption>
              <thead>
                <tr style={{ backgroundColor: "var(--nx-cobalt)" }}>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Feature</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "#FFFFFF", fontWeight: 700, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Nexphoria</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Hims / Ro</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Research Sites</th>
                </tr>
              </thead>
              <tbody>
                {HOME_COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "var(--nx-bg-cream)",
                      borderBottom: "1px solid var(--nx-border)",
                    }}
                  >
                    <th scope="row" style={{ padding: "0.875rem 1rem", textAlign: "left", fontWeight: 500, color: "var(--nx-fg)" }}>{row.feature}</th>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "center", fontWeight: 600, color: "var(--nx-cobalt)" }}>{row.nexphoria}</td>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "center", color: "var(--nx-fg-muted)" }}>{row.hims}</td>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "center", color: "var(--nx-fg-muted)" }}>{row.research}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              marginTop: "1.25rem",
              fontFamily: FONT,
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--nx-cobalt)",
            }}
          >
            Verdict: Nexphoria is the only peptide telehealth platform combining 16+ compounds, mandatory quarterly bloodwork, 503A compounding, and COA verification in a single subscription.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
