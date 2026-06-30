import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { useSeo, orgJsonLd, medicalBusinessJsonLd } from "@/lib/seo";
import { stacks, getPeptidesForStack } from "@/lib/protocols";
import vialHero from "@/assets/brand/vial-lineup-hero.jpg";
import editorialHero from "@/assets/brand/editorial/editorial-hero-home.png";
import editorialMorning from "@/assets/brand/editorial/editorial-lifestyle-morning.png";
import editorialHandsKit from "@/assets/brand/editorial/editorial-hands-kit-select.png";
import editorialHandsCommit from "@/assets/brand/editorial/editorial-hands-commit.png";
import { EditorialHands } from "@/components/EditorialHands";
import { PressStrip } from "@/components/PressStrip";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";

/* ──────────────────────────────────────────────────────────────
   NEXPHORIA — HOME (Maximus)
   Editorial poster composition. Dark obsidian + acid green.
   Matches REFERENCE_HOME_HERO.jpg / REFERENCE_HOME_FULL.jpg.
   ────────────────────────────────────────────────────────────── */

export default function Home() {
  useSeo({
    title: "Nexphoria — Science you can feel. Results you can measure.",
    description:
      "Prescribed peptide protocols. Compounded in U.S. 503A pharmacies. Reviewed by board-certified MDs. Quarterly labs. Science you can feel. Results you can measure.",
    path: "/",
    jsonLd: [orgJsonLd(), medicalBusinessJsonLd()],
  });

  return (
    <SiteLayout
      navVariant="dark"
      footerCtaHeadline={
        <>
          The molecules that matter,{" "}
          <span className="font-serif italic text-primary">prescribed.</span>
          <br />
          Begin in four minutes.
        </>
      }
    >
      <CinematicOpener />
      <Hero />
      <EditorialHands
        src={editorialHandsKit}
        alt="Hands selecting a peptide kit — the deliberate ritual of a prescribed protocol"
        caption="FIG. 01 · PRESCRIBED · COMPOUNDED IN U.S. PHARMACIES"
        objectPosition="center 42%"
      />
      <IndexStrip />
      <PressStrip />
      <HowItWorks />
      <FeaturedProtocols />
      <EditorialBreak />
      <ProtocolCatalog />
      <ByTheNumbers />
      <EditorialHands
        src={editorialHandsCommit}
        alt="A morning ritual — forearm, vial, and cup at the start of the day"
        ratio="21/9"
        caption="FIG. 02 · YOUR MORNING · YOUR PROTOCOL"
        objectPosition="center 45%"
      />
      <Outcomes />
      <TrustStrip />
      <ClosingCta />
    </SiteLayout>
  );
}

/* ── ACT 1 · CINEMATIC OPENER ─────────────────────────────────── */
/* Full-bleed editorial brand moment before the product hero.
   NO blur, NO parallax, NO scroll motion (locked). */
function CinematicOpener() {
  return (
    <section className="relative w-full bg-black overflow-hidden h-[70vh] min-h-[520px] md:h-screen md:min-h-[760px]">
      <img
        src={editorialHero}
        alt="Editorial portrait — sunlit, sweat on the jawline, the discipline of a measured protocol"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      {/* Cinematic gradient — bottom 40% fades to page black for type legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg,rgba(10,10,10,.55) 0%,transparent 26%,transparent 50%,rgba(10,10,10,.78) 82%,#0a0a0a 100%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg,rgba(10,10,10,.72) 0%,rgba(10,10,10,.18) 38%,transparent 70%)" }}
      />

      {/* Top-left eyebrow */}
      <div className="absolute top-0 left-0 right-0 z-[3] flex justify-between items-start px-6 lg:px-14 pt-24 md:pt-28">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-nx-faint">
          Nexphoria · Circa 2026
        </div>
        <div className="hidden md:block font-mono text-[10.5px] uppercase tracking-[0.18em] text-nx-faint text-right leading-[1.7]">
          Editorial · No.01
        </div>
      </div>

      {/* Center-left headline */}
      <div className="absolute inset-0 z-[3] flex flex-col justify-center px-6 lg:px-14">
        <h2
          className="font-display font-semibold max-w-[16ch]"
          style={{ fontSize: "clamp(52px,8vw,120px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
        >
          The body,{" "}
          <span
            className="font-serif italic text-primary"
            style={{ fontWeight: 400, letterSpacing: "-0.022em" }}
          >
            prescribed.
          </span>
        </h2>
      </div>

      {/* Bottom-left subhead + bottom-right scroll cue */}
      <div className="absolute left-0 right-0 bottom-0 z-[3] flex flex-col md:flex-row md:items-end md:justify-between gap-4 px-6 lg:px-14 pb-10 md:pb-12">
        <p className="text-[14px] md:text-[15px] text-[#cdcdc6] max-w-[420px] leading-[1.55]">
          Peptide protocols. Compounded in U.S. pharmacies. Reviewed by MDs.
        </p>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-nx-faint md:text-right">
          ↓ continue
        </div>
      </div>
    </section>
  );
}

/* ── EDITORIAL BREAK · between FeaturedProtocols + ProtocolCatalog */
function EditorialBreak() {
  return (
    <section className="relative w-full bg-black overflow-hidden h-[70vh] min-h-[440px] max-h-[760px]">
      <img
        src={editorialMorning}
        alt="Golden-hour morning — a vial on the kitchen counter, the quiet routine of a measured protocol"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 45%" }}
        loading="lazy"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg,rgba(7,7,7,.85) 0%,rgba(7,7,7,.35) 42%,transparent 72%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg,rgba(7,7,7,.55) 0%,transparent 30%,transparent 70%,rgba(7,7,7,.55) 100%)" }}
      />
      <div className="absolute inset-0 z-[2] flex items-center px-6 lg:px-14">
        <div className="max-w-[620px]">
          <div className="nx-eyebrow text-primary mb-6">Eight weeks in</div>
          <p
            className="font-display font-semibold"
            style={{ fontSize: "clamp(30px,4.4vw,60px)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            The difference is in the data —{" "}
            <span className="font-serif italic text-primary" style={{ fontWeight: 400 }}>
              and in the mirror.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── HERO ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* DESKTOP / TABLET hero — vial row anchored at bottom, type above */}
      <div className="hidden md:flex relative flex-col min-h-[860px]">
        {/* Top zone: eyebrow + coordinate marker */}
        <div className="relative z-[3] flex justify-between items-start px-6 lg:px-14 pt-28">
          <div className="nx-eyebrow flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            A New Standard for Peptide Therapy
          </div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-nx-faint text-right leading-[1.7]">
            N · 40.7128°<br />W · 74.0060°<br />2026 · ED.04
          </div>
        </div>

        {/* Display headline */}
        <div className="relative z-[3] px-6 lg:px-14 pt-8">
          <h1
            className="font-display font-semibold"
            style={{ fontSize: "clamp(56px,7.4vw,108px)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
          >
            <span className="block">Science you can feel.</span>
            <span
              className="block font-serif italic text-primary"
              style={{ fontWeight: 400, letterSpacing: "-0.022em" }}
            >
              Results you can measure.
            </span>
          </h1>
        </div>

        {/* Vial lineup — anchored at bottom, framed by gradients */}
        <div className="relative mt-auto w-full h-[540px] overflow-hidden">
          <img
            src={vialHero}
            alt="Nexphoria peptide lineup — BPC-157, TB-500, CJC-1295, Ipamorelin, GHK-Cu, Epitalon, PT-141"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 50%" }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{ background: "linear-gradient(180deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.35) 14%,transparent 42%,rgba(0,0,0,.65) 100%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{ background: "linear-gradient(90deg,rgba(0,0,0,.45) 0%,transparent 12%,transparent 88%,rgba(0,0,0,.45) 100%)" }}
          />
        </div>

        {/* Footer band — sits over bottom of image */}
        <div
          className="absolute left-0 right-0 bottom-0 z-[4] grid items-end gap-8 px-6 lg:px-14 pt-8 pb-10 border-t"
          style={{
            gridTemplateColumns: "1.1fr auto 1fr",
            borderTopColor: "rgba(255,255,243,.18)",
            background: "linear-gradient(180deg,transparent 0%,rgba(0,0,0,.55) 40%,#000 100%)",
          }}
        >
          <div className="text-[15px] text-[#cdcdc6] max-w-[380px] leading-[1.55]">
            Prescribed peptide protocols. Compounded in U.S. 503A pharmacies. Reviewed by board-certified MDs. Quarterly labs.
          </div>
          <div className="flex gap-3 justify-center">
            <StartIntakeButton source="home_hero" size="lg" className="rounded-none uppercase tracking-tight">
              Begin
            </StartIntakeButton>
            <Link
              href="/protocols"
              className="nx-cta-outline-dark inline-flex items-center px-7 py-3.5 text-[14px] font-medium uppercase tracking-tight"
              data-testid="link-hero-browse"
            >
              Browse
            </Link>
          </div>
          <div className="text-right font-mono text-[10.5px] uppercase tracking-[0.18em] text-nx-faint leading-[1.7]">
            EST. 2026<br />MIAMI · NEW YORK<br />FDA-NOTICED
          </div>
        </div>
      </div>

      {/* MOBILE hero — headline above, image below, CTAs stacked */}
      <div className="md:hidden px-6 pt-24 pb-0">
        <div className="nx-eyebrow flex items-center gap-2.5 mb-7">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          A New Standard for Peptide Therapy
        </div>
        <h1
          className="font-display font-semibold"
          style={{ fontSize: "clamp(40px,12vw,60px)", lineHeight: 0.94, letterSpacing: "-0.035em" }}
        >
          <span className="block">Science you can feel.</span>
          <span className="block font-serif italic text-primary" style={{ fontWeight: 400 }}>
            Results you can measure.
          </span>
        </h1>
        <p className="mt-6 text-[15px] text-nx-muted leading-[1.55]">
          Prescribed peptide protocols. Compounded in U.S. 503A pharmacies. Reviewed by board-certified MDs. Quarterly labs.
        </p>
        <div className="relative mt-8 -mx-6 h-[340px] overflow-hidden">
          <img
            src={vialHero}
            alt="Nexphoria peptide lineup — BPC-157, TB-500, CJC-1295, Ipamorelin, GHK-Cu, Epitalon, PT-141"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 50%" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg,transparent 60%,rgba(0,0,0,.85) 100%)" }}
          />
        </div>
        <div className="flex flex-col gap-3 mt-7 pb-2">
          <StartIntakeButton source="home_hero" size="lg" className="rounded-none uppercase tracking-tight w-full">
            Begin
          </StartIntakeButton>
          <Link
            href="/protocols"
            className="nx-cta-outline-dark inline-flex items-center justify-center px-7 py-3.5 text-[14px] font-medium uppercase tracking-tight w-full"
          >
            Browse
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── INDEX STRIP ──────────────────────────────────────────────── */
const indexStats = [
  { num: "14", lbl: "Peptides in formulary" },
  { num: "12", lbl: "503A pharmacy partners" },
  { num: "04", lbl: "Physicians on staff" },
  { num: "96%", lbl: "Quarterly lab adherence" },
];
function IndexStrip() {
  return (
    <div className="bg-black border-b border-foreground/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 px-6 lg:px-14 py-10">
        {indexStats.map((s) => (
          <div key={s.lbl} className="flex flex-col gap-1.5">
            <span className="font-serif italic text-primary text-[26px] leading-none">{s.num}</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-nx-faint">{s.lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── HOW IT WORKS ─────────────────────────────────────────────── */
const acts = [
  { n: "i.", h: "Assess", p: "Anonymous 4-minute intake matched to your goals and medical history." },
  { n: "ii.", h: "Review", p: "Board-certified MD reviews your case within 24 hours." },
  { n: "iii.", h: "Ship", p: "Compounded in a U.S. 503A pharmacy. Cold-chain to your door." },
  { n: "iv.", h: "Measure", p: "Quarterly labs. Dose titrated by your MD based on data." },
];
function HowItWorks() {
  return (
    <section className="bg-background px-6 lg:px-14 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-end mb-16 md:mb-20">
        <div>
          <div className="nx-eyebrow mb-5">How it works · 04 Acts</div>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: "clamp(40px,6vw,88px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}
          >
            A clinical <span className="font-serif italic text-primary">act,</span><br />not a checkout.
          </h2>
        </div>
        <div>
          <p className="text-[17px] text-nx-muted leading-[1.65]">
            Every Nexphoria protocol begins with an anonymous intake and ends with measured outcomes. In between: a physician reviews your case, a U.S. 503A pharmacy compounds your prescription, and quarterly labs confirm what you feel.
          </p>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-nx-faint mt-6">— The Method</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-foreground/15">
        {acts.map((a, i) => (
          <div
            key={a.h}
            className={`py-10 pr-8 ${i < acts.length - 1 ? "lg:border-r border-foreground/[0.08]" : ""} border-b lg:border-b-0 border-foreground/[0.08]`}
          >
            <span className="font-serif italic text-primary text-5xl leading-none block mb-6">{a.n}</span>
            <h3 className="text-lg font-semibold mb-3 uppercase tracking-[0.06em]">{a.h}</h3>
            <p className="text-sm text-nx-faint leading-[1.6]">{a.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FEATURED PROTOCOLS ───────────────────────────────────────── */
const featured = [
  {
    num: "i.",
    kicker: "Recovery & Performance",
    name: "Wolverine.",
    desc: "Accelerated tissue repair, training capacity, and metabolic recovery. Built for athletes and high-output professionals.",
    peps: ["BPC-157", "TB-500", "GHK-Cu", "Ipamorelin"],
    price: "$262",
    slug: "wolverine",
  },
  {
    num: "ii.",
    kicker: "Skin, Hair & Vitality",
    name: "Glow.",
    desc: "Collagen production, hair density, and dermal radiance. Backed by quarterly labs and physician dose titration.",
    peps: ["GHK-Cu", "Epitalon", "Thymosin α1", "PT-141"],
    price: "$298",
    slug: "glow",
  },
];
function FeaturedProtocols() {
  return (
    <section className="px-6 lg:px-14 py-24 md:py-32 border-t border-foreground/[0.06]" style={{ background: "#070707" }}>
      <div className="mb-12 md:mb-16">
        <div className="nx-eyebrow mb-5">Featured Protocols · 02</div>
        <h2
          className="font-display font-semibold"
          style={{ fontSize: "clamp(40px,6vw,88px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}
        >
          Two flagship <span className="font-serif italic text-primary">stacks.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {featured.map((s) => (
          <div
            key={s.slug}
            className="relative overflow-hidden border border-foreground/10 nx-card-lift p-10 md:p-12"
            style={{ background: "linear-gradient(180deg,#101010 0%,#0a0a0a 100%)" }}
          >
            <div
              className="absolute pointer-events-none"
              style={{ top: -100, right: -100, width: 300, height: 300, background: "radial-gradient(circle,rgba(198,241,132,.08) 0%,transparent 70%)" }}
            />
            <div className="absolute top-8 right-10 font-serif italic text-primary text-2xl opacity-50">{s.num}</div>
            <div className="nx-eyebrow mb-8">{s.kicker}</div>
            <h3
              className="font-display font-semibold mb-5"
              style={{ fontSize: "clamp(44px,5vw,64px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}
            >
              {s.name}
            </h3>
            <p className="text-base text-nx-muted mb-9 leading-[1.55] max-w-[420px]">{s.desc}</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {s.peps.map((p) => (
                <span
                  key={p}
                  className="font-mono text-[10.5px] uppercase tracking-[0.14em] px-3 py-1.5 text-primary border"
                  style={{ background: "rgba(198,241,132,.08)", borderColor: "rgba(198,241,132,.25)" }}
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-end pt-7 border-t border-foreground/[0.12]">
              <span className="font-serif italic text-foreground text-[40px] leading-none">
                {s.price}
                <span className="font-sans not-italic text-sm text-nx-faint ml-1">/mo</span>
              </span>
              <Link
                href={`/protocols/${s.slug}`}
                className="text-primary text-[13px] font-semibold inline-flex items-center gap-1.5 uppercase tracking-[0.08em] group"
                data-testid={`link-protocol-${s.slug}`}
              >
                View protocol
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* PROTOCOL CATALOG (all five stacks) */
const KICKERS: Record<string, string> = {
  wolverine: "Recovery & Performance",
  glow: "Skin, Hair & Vitality",
  longevity: "Longevity & Cellular",
  sleep: "Sleep & Recovery",
  lean: "Weight & Metabolic",
};
function ProtocolCatalog() {
  const ordered = ["wolverine", "glow", "longevity", "sleep", "lean"]
    .map((slug) => stacks.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <section className="bg-background px-6 lg:px-14 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-end mb-14 md:mb-16">
        <div>
          <div className="nx-eyebrow mb-5">The Formulary · 05</div>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: "clamp(40px,6vw,88px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}
          >
            Five protocols.<br />One <span className="font-serif italic text-primary">standard.</span>
          </h2>
        </div>
        <div>
          <p className="text-[17px] text-nx-muted leading-[1.65]">
            Each protocol is a physician-designed sequence of peptides, doses, and timing — built for one outcome, reviewed by a board-certified MD, and confirmed with quarterly labs.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/[0.1] border border-foreground/[0.1]">
        {ordered.map((stack) => {
          const peps = getPeptidesForStack(stack);
          const from = Math.min(...stack.pricing.map((t) => t.pricePerMonth));
          return (
            <Link
              key={stack.slug}
              href={`/protocols/${stack.slug}`}
              className="group relative bg-background p-8 md:p-9 flex flex-col transition-colors hover:bg-card/40"
              data-testid={`card-catalog-${stack.slug}`}
            >
              <div className="nx-eyebrow text-muted-foreground mb-5">{KICKERS[stack.slug]}</div>
              <h3 className="font-display text-3xl font-semibold mb-3" style={{ letterSpacing: "-0.03em" }}>
                {stack.name}
              </h3>
              <p className="text-sm text-nx-muted leading-[1.55] mb-6">{stack.tagline}</p>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {peps.map((pp) => (
                  <span
                    key={pp.slug}
                    className="font-mono text-[9.5px] uppercase tracking-[0.12em] px-2 py-1 text-primary border"
                    style={{ background: "rgba(198,241,132,.06)", borderColor: "rgba(198,241,132,.22)" }}
                  >
                    {pp.name}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-end justify-between pt-5 border-t border-foreground/[0.1]">
                <span className="text-sm text-nx-muted">
                  From{" "}
                  <span className="font-display text-xl font-semibold text-foreground">${from}</span>
                  <span className="text-xs text-nx-faint">/mo</span>
                </span>
                <span className="text-primary text-[12px] font-semibold inline-flex items-center gap-1 uppercase tracking-[0.08em]">
                  View
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
        <div className="hidden lg:flex bg-background p-8 md:p-9 flex-col justify-center">
          <p className="font-serif italic text-primary text-2xl leading-tight mb-4">Not sure?</p>
          <p className="text-sm text-nx-muted leading-[1.55] mb-6">
            Take the 4-minute assessment. A physician routes you to the right protocol.
          </p>
          <Link
            href="/assessment"
            className="text-primary text-[12px] font-semibold inline-flex items-center gap-1.5 uppercase tracking-[0.08em] group"
            data-testid="link-catalog-assessment"
          >
            Start assessment
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── BY THE NUMBERS ───────────────────────────────────────────── */
const byNumbers = [
  { value: 7, suffix: "", label: "Peptides screened" },
  { value: 92, suffix: "%", label: "Adherence at 60 days" },
  { value: 3, suffix: "", label: "Licensed pharmacies" },
  { value: 48, prefix: "<", suffix: "h", label: "Avg MD response" },
];
function ByTheNumbers() {
  return (
    <section className="bg-black border-t border-foreground/10 px-6 lg:px-14 py-20 md:py-28">
      <Reveal>
        <div className="nx-section-eyebrow mb-12">
          <span className="num">06</span>
          <span aria-hidden="true">—</span>
          <span>BY THE NUMBERS</span>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {byNumbers.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="flex flex-col gap-3">
              <span
                className="font-display font-semibold text-foreground tabular"
                style={{ fontSize: "clamp(48px,6vw,84px)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
              >
                <AnimatedCounter value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix} />
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-nx-faint">
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── OUTCOMES ─────────────────────────────────────────────────── */
const outcomes = [
  { lbl: "Recovery time", big: "–31", unit: "%", p: "Reduction in self-reported soreness window by week 6." },
  { lbl: "Sleep efficiency", big: "+18", unit: "%", p: "Mean deep-sleep improvement measured by wearables." },
  { lbl: "Skin / hair", big: "84", unit: "%", p: "Members reporting visible change by month 4." },
  { lbl: "Lab adherence", big: "96", unit: "%", p: "Quarterly lab completion among active members." },
];
function Outcomes() {
  return (
    <section className="bg-background px-6 lg:px-14 py-24 md:py-32">
      <div className="mb-16 md:mb-20">
        <div className="nx-eyebrow mb-5">Outcomes · Aggregated · 12 Months</div>
        <h2
          className="font-display font-semibold max-w-[1200px]"
          style={{ fontSize: "clamp(40px,6vw,88px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}
        >
          Measured, <span className="font-serif italic text-primary">not</span> marketed.
        </h2>
        <p className="text-lg text-nx-muted mt-7 max-w-[620px] leading-[1.6]">
          Aggregated member outcomes from intake through month 12. Reviewed quarterly by our medical board.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-foreground/[0.18]">
        {outcomes.map((o, i) => (
          <div
            key={o.lbl}
            className={`py-12 pr-8 ${i < outcomes.length - 1 ? "lg:border-r border-foreground/[0.08]" : ""} border-b lg:border-b-0 border-foreground/[0.08]`}
          >
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-nx-faint mb-3">{o.lbl}</div>
            <div
              className="font-display font-semibold text-foreground mb-4 tabular"
              style={{ fontSize: "clamp(64px,7vw,96px)", lineHeight: 0.95, letterSpacing: "-0.04em" }}
            >
              {o.big}
              <span className="font-serif italic text-primary text-2xl ml-0.5">{o.unit}</span>
            </div>
            <p className="text-sm text-nx-faint leading-[1.55]">{o.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* TRUST STRIP */
const trustItems = [
  { num: "1,200+", lbl: "Patients treated" },
  { num: "04", lbl: "Board-certified physicians" },
  { num: "50", lbl: "States served" },
  { num: "503A", lbl: "U.S. compounding pharmacies" },
];
function TrustStrip() {
  return (
    <section className="bg-black border-t border-foreground/10 px-6 lg:px-14 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
        {trustItems.map((t) => (
          <div key={t.lbl} className="flex flex-col gap-2">
            <span
              className="font-display font-semibold text-foreground tabular"
              style={{ fontSize: "clamp(34px,4vw,52px)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
            >
              {t.num}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-nx-faint">{t.lbl}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CLOSING CTA ──────────────────────────────────────────────── */
function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-black text-center px-6 lg:px-14 py-32 md:py-44">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,rgba(198,241,132,.06) 0%,transparent 60%)" }}
      />
      <div className="relative z-[2]">
        <div className="nx-section-eyebrow mb-8 justify-center">
          <span className="num">07</span>
          <span aria-hidden="true">—</span>
          <span>BEGIN IN FOUR MINUTES</span>
        </div>
        <h2
          className="font-display font-semibold max-w-[1200px] mx-auto mb-6"
          style={{ fontSize: "clamp(48px,9vw,128px)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
        >
          When you're <span className="font-serif italic text-primary">ready,</span><br />the molecules that matter.
        </h2>
        <p className="text-fluid-base text-nx-muted max-w-[44ch] mx-auto mb-12 leading-relaxed">
          Prescribed. Compounded. Measured. One assessment is all it takes to decide.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3.5">
          <StartIntakeButton source="home_closing" size="lg" className="rounded-none uppercase tracking-tight">
            Find your protocol
          </StartIntakeButton>
          <Link
            href="/physicians"
            className="nx-cta-outline-dark inline-flex items-center justify-center px-7 py-3.5 text-[14px] font-medium uppercase tracking-tight"
            data-testid="link-closing-physicians"
          >
            Talk to a physician
          </Link>
        </div>
      </div>
    </section>
  );
}
