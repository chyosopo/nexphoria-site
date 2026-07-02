import * as React from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo, orgJsonLd, medicalBusinessJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { VialTile, categoryToTone } from "@/components/VialTile";
import { peptides as ALL_PEPTIDES } from "@/data/peptides";
import { getPrice } from "@/data/pricing";

/* V3 imagery — locked editorial palette */
import heroVials from "@/assets/nx_polish_hero_vials.webp";
import tileWolverine from "@/assets/nx_polish_tile_wolverine.webp";
import tileGlow from "@/assets/nx_polish_tile_glow.webp";
import tileRestore from "@/assets/nx_polish_tile_restore.webp";
import tileClarity from "@/assets/nx_polish_tile_clarity.webp";
import tilePrime from "@/assets/nx_polish_tile_prime.webp";
import tileBalance from "@/assets/nx_polish_tile_balance.webp";
/* Legacy imports kept for other sections below */
import tileRecover from "@/assets/nx_v3_tile_recover.webp";
import tileBurn from "@/assets/nx_v3_tile_burnfat.webp";
import tileSleep from "@/assets/nx_v3_tile_sleep.webp";
import doctorShot from "@/assets/nx_v3_doctor.webp";
import productHero from "@/assets/nx_v3_product_hero.webp";
import editorialLineup from "@/assets/nx_v3_editorial_lineup.webp";
import moleculeShot from "@/assets/nx_v3_molecule.webp";
import prescriptionShot from "@/assets/nx_v3_prescription.webp";
import physicianPortrait from "@/assets/nx_v3_physician_portrait.webp";
import labPrecision from "@/assets/nx_v3_lab_precision.webp";
import morningRitual from "@/assets/nx_v3_morning_ritual.webp";
import bloodworkHero from "@/assets/nx_bloodwork_hero.webp";

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

export default function Home() {
  useSeo({
    title: "Nexphoria — Peptides, prescribed. Physician-guided protocols.",
    description:
      "Physician-guided peptide protocols. Compounded in U.S. 503A pharmacies. Delivered to your door. Pick a goal — we handle the rest.",
    path: "/",
    jsonLd: [orgJsonLd(), medicalBusinessJsonLd()],
  });

  return (
    <SiteLayout navVariant="showcase" hideTrustBar>
      <PromoBar />
      <Hero />
      <TrustBar />
      <GoalTiles />
      <PeptideTilesStrip />
      <HowItWorks />
      <ScienceStrip />
      <FeaturedStack />
      <Numbers />
      <PrecisionStrip />
      <BloodworkPillar />
      <PhysicianStrip />
      <MorningRitual />
      <FinalCta />
    </SiteLayout>
  );
}


/* ── 0 · PROMO BAR (Wave 9 · Pattern 13) ─────────────────────── */
function PromoBar() {
  const [i, setI] = React.useState(0);
  const promos = [
    { text: "Free physician review with your first month · limited-time", href: "/assessment", cta: "Start intake" },
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
  return (
    <section className="relative bg-nx-ceramic overflow-hidden">
      {/* subtle top spacer to clear the fixed nav */}
      <div className="h-16 md:h-20" />
      <div className="nx-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-16 md:pb-24 lg:pb-28">
        <div className="lg:col-span-7 pt-8 md:pt-12">
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
            Physician-Guided Peptide Therapy
          </div>

          <h1
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(56px, 8vw, 108px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--nx-black)",
              margin: 0,
            }}
            data-testid="text-hero-headline"
          >
            Peptides,
            <br />
            prescribed.
          </h1>

          <p
            className="mt-8 max-w-xl"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.55,
              color: "var(--nx-fg-graphite)",
            }}
          >
            Physician-guided protocols. Compounded in U.S. pharmacies.
            Delivered to your door. Pick a goal — we handle the rest.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--nx-acid)",
                color: "var(--nx-black)",
                padding: "16px 24px",
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
              className="inline-flex items-center gap-2 border rounded-full px-6 py-4"
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
          </div>

          <div
            className="mt-8"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "13px",
              letterSpacing: "0.02em",
              color: "var(--nx-fg-muted)",
            }}
          >
            No commitment · Physician-reviewed in 24–48h · 5-min intake
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className="relative rounded-[16px] overflow-hidden bg-nx-rock"
            style={{ aspectRatio: "4 / 5" }}
            data-testid="hero-image-frame"
          >
            <img
              src={heroVials}
              alt="Five peptide vials on a warm cream pedestal beneath the Nexphoria wordmark"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
            <FloatingResultCards />
          </div>
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
              fontFamily: "'General Sans', system-ui, sans-serif",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tiles.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              data-testid={t.testId}
              className="group relative block rounded-[16px] overflow-hidden"
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
                className="absolute top-6 left-6 inline-flex items-center gap-2"
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#fffff3",
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
                  }}
                />
                {t.eyebrow}
              </div>

              {/* bottom-left title + copy + arrow */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(28px, 3.4vw, 40px)",
                      lineHeight: 1.02,
                      letterSpacing: "-0.02em",
                      color: "#fffff3",
                    }}
                  >
                    {t.title}
                  </div>
                  <div
                    className="mt-2"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "rgba(255,255,243,0.78)",
                    }}
                  >
                    {t.copy}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                  style={{
                    width: 44,
                    height: 44,
                    background: "var(--nx-acid)",
                    color: "var(--nx-black)",
                  }}
                >
                  <ArrowUpRight size={20} strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
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
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
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
              fontFamily: "'General Sans', system-ui, sans-serif",
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
              Featured protocol
            </div>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(40px, 5vw, 60px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--nx-black)",
                margin: 0,
              }}
            >
              The Wolverine stack.
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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
            The physicians
          </div>
          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
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
            fontFamily: "'General Sans', system-ui, sans-serif",
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
              fontFamily: "'General Sans', system-ui, sans-serif",
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
            The ritual
          </div>

          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
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
                The Bloodwork Pillar
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
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
                  href="/bloodwork#bloodwork-pricing"
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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
