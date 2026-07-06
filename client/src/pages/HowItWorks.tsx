/* JOB: the seven-step path from intake to the 90-day retest, ending at the assessment. */
/* ═══ HOW IT WORKS — the institution's argument, in full ═══
   Seven steps on a drawn timeline, each with its mechanism, the objection it
   answers, and a Lucide glyph. Trust-stat row, one dramatic night band, one
   striking comparison. Bank voice. Tokens only; both worlds theme it. */
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { StickyAssessBar } from "@/components/StickyAssessBar";
import { Link, useLocation } from "wouter";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, howToJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";
import { OUTCOME_HERO } from "@/data/outcomeImagery";
import stepIntake from "@/assets/brand/hero-assessment.webp";
import stepBloodwork from "@/assets/brand/editorial-bloodwork.webp";
import stepPhysician from "@/assets/brand/hero-physicians.webp";
import stepCompounding from "@/assets/brand/lifestyle-compounding-room.webp";
import stepDelivery from "@/assets/brand/lifestyle-shipping-package.webp";
import stepRetest from "@/assets/brand/science-panel-read.webp";
import {
  Check, X, ClipboardList, TestTube, Stethoscope, FlaskConical,
  Snowflake, LayoutDashboard, RefreshCw, ShieldCheck, type LucideIcon,
} from "lucide-react";

interface Step {
  n: string; t: string; d: string;
  detail: string;      // the specific mechanism
  objection: string;   // the doubt it answers
  Icon: LucideIcon;
  /** editorial frame — a real human moment for this step (C29 law) */
  img?: string;
  imgAlt?: string;
}

const STEPS: Step[] = [
  {
    n: "01", t: "Structured intake", Icon: ClipboardList,
    img: stepIntake, imgAlt: "A man begins his intake on a tablet at a dawn-lit desk",
    d: "A medical questionnaire covering history, goals, current medications, and contraindications — reviewed in full before anything else happens.",
    detail: "Not a checkbox funnel. The intake screens for the conditions that make each peptide class unsafe — malignancy history, pregnancy, cardiovascular disease, drug interactions — and routes that information to the physician, not an algorithm.",
    objection: "“Is this just a form that rubber-stamps a sale?” No. It exists to disqualify people for whom a protocol is wrong, before a physician ever spends time on the file.",
  },
  {
    n: "02", t: "Bloodwork at the lab", Icon: TestTube,
    img: stepBloodwork, imgAlt: "Vacutainer tubes on a ceramic tray, prepared for a draw",
    d: "A single draw at a partner laboratory near you. A comprehensive panel across the systems a protocol can touch — cardiac, hormonal, metabolic, hepatic, renal — establishing your baseline.",
    detail: "Three panel tiers — Basic, Full, and Elite — matched to what a protocol actually requires. A GH-axis peptide mandates IGF-1; a metabolic protocol pulls insulin, HOMA-IR, and ApoB. You are not billed for markers your protocol doesn’t use.",
    objection: "“Why can’t I skip the labs?” Because without a baseline there is nothing to compare the retest against — and the retest is the entire point.",
  },
  {
    n: "03", t: "Physician review", Icon: Stethoscope,
    img: stepPhysician, imgAlt: "Two physicians review a patient chart together",
    d: "A licensed U.S. physician reads your intake against your markers. If a protocol is appropriate, it is prescribed. If it is not, you are told so plainly.",
    detail: "The physician is the only party who can authorize a prescription — not a questionnaire score, not a sales team. Some intakes end here with “not a candidate,” and that outcome carries no charge.",
    objection: "“Is there really a doctor, or a checkbox?” A named, state-licensed physician owns the decision and the liability for it.",
  },
  {
    n: "04", t: "503A compounding", Icon: FlaskConical,
    img: stepCompounding, imgAlt: "A sterile compounding room in a licensed pharmacy",
    d: "Prescriptions are compounded for you in a state-licensed 503A pharmacy — batch-documented and prescription-only.",
    detail: "503A pharmacies compound to an individual prescription under state board oversight. Every batch is documented. This is the same regulatory class that prepares countless everyday prescriptions — not a gray-market supplier.",
    objection: "“Where does the actual medication come from?” A licensed U.S. compounding pharmacy, dispensing against your specific prescription — never a bulk shelf.",
  },
  {
    n: "05", t: "Cold-chain delivery", Icon: Snowflake,
    img: stepDelivery, imgAlt: "An unbranded package at a front door",
    d: "Temperature-controlled from pharmacy to your door, in discreet, unbranded packaging.",
    detail: "Peptides are temperature-sensitive; a broken cold chain is a dead protocol. Shipments are packed to hold temperature in transit and arrive without anything on the box that announces what’s inside.",
    objection: "“Will it be obvious what this is?” No. The packaging is deliberately anonymous.",
  },
  {
    n: "06", t: "Your dashboard", Icon: LayoutDashboard,
    d: "Markers, reference ranges, trends, your active protocol, and physician messaging — in one place.",
    detail: "Every number sits next to its range and its trend line, so you read direction, not just a snapshot. Questions to your physician run through the same portal — no phone tag.",
    objection: "“Do I just get a vial and silence?” No — you get the data, the trend, and a line to the physician who owns it.",
  },
  {
    n: "07", t: "The 90-day retest", Icon: RefreshCw,
    img: stepRetest, imgAlt: "A physician reads a printed lab panel at a light table",
    d: "Your panel is drawn again. The trend is placed next to the protocol, and a physician decides what changes.",
    detail: "This is the step the rest of the market skips. The same markers are re-drawn, the movement is read against your protocol, and the physician holds, adjusts, or tapers accordingly. The loop is the product — not the vial.",
    objection: "“What am I actually paying for?” Ongoing physician oversight anchored to your own labs — not a subscription to a substance.",
  },
];

const STATS: { value: string; label: string }[] = [
  { value: "7", label: "Steps · fixed order" },
  { value: "503A", label: "State-licensed pharmacy" },
  { value: "90 days", label: "Retest cadence" },
  { value: "$0", label: "Until you’re prescribed" },
];

const COMPARE: { row: string; them: string; us: string }[] = [
  { row: "Who authorizes it", them: "A checkout button", us: "A licensed U.S. physician" },
  { row: "Baseline bloodwork", them: "Rarely, if ever", us: "Required before the first dose" },
  { row: "Where it’s made", them: "Often unnamed", us: "State-licensed 503A pharmacy" },
  { row: "After you buy", them: "Silence", us: "90-day retest and physician review" },
  { row: "What you’re buying", them: "A vial", us: "The measured loop around it" },
];

export default function HowItWorks() {
  // World-cast the hero (fleet audit: a woman arriving from /women saw a
  // male portrait under the orchid palette — the world read as a re-skin)
  const [loc] = useLocation();
  const world = resolveWorld(loc);
  useSeo({
    title: "How It Works — Nexphoria",
    description: "Intake, bloodwork, physician review, 503A compounding, cold-chain delivery, one dashboard, and 90-day retesting — in a fixed order that does not bend.",
    jsonLd: [
      webPageJsonLd({ name: "How It Works", description: "Intake, bloodwork, physician review, 503A compounding, cold-chain delivery, one dashboard, 90-day retesting.", path: "/how-it-works", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }]),
      howToJsonLd({
        name: "How Nexphoria peptide therapy works",
        description: "The fixed order of a Nexphoria protocol: structured intake, laboratory bloodwork, physician review, 503A compounding, cold-chain delivery, a monitoring dashboard, and a 90-day retest.",
        steps: STEPS.map((s) => ({ name: s.t, text: s.d })),
      }),
    ],
  });

  return (
    <SiteLayout>
      {/* ══ HERO — claim beside an outcome frame, over a gradient field ══ */}
      <section className="nx-gradient-hero relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative nx-hero-seq" style={{ paddingTop: "clamp(3.4rem,6vw,5.4rem)", paddingBottom: "clamp(1.8rem,3vw,2.6rem)", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]" style={{ gap: "clamp(1.6rem,4vw,3rem)", alignItems: "center" }}>
            <div>
              <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                <ShieldCheck size={14} strokeWidth={2.2} aria-hidden="true" /> How it works
              </p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1.03, letterSpacing: "-0.02em", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.9rem" }}>
                Seven steps. <em style={{ color: "var(--nx-cobalt)" }}>No improvisation.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1.1rem" }}>
                You shouldn't have to take a company's word for what happens to your body. So here is the entire path — from the first question to the first cold-chain shipment — in the fixed order it always runs, and why each step exists.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "1.6rem" }}>
                <Link href="/assessment" className="nx-cta-cobalt" data-testid="hiw-hero-cta">Start your assessment</Link>
                <Link href="/bloodwork" className="nx-cta-ghost">See the panels</Link>
              </div>
            </div>
            <div className="nx-hero-frame nx-hero-bleed" style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-4)", aspectRatio: "3 / 2" }}>
              <img src={OUTCOME_HERO[world === "women" ? "women" : "men"]} alt="" aria-hidden fetchPriority="high" width={2048} height={1360} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, transparent 55%, color-mix(in srgb, var(--nx-fg) 32%, transparent) 100%)" }} />
              {/* step-count chip — same live grammar as the world homes */}
              <div
                style={{
                  position: "absolute", top: 14, right: 14, display: "inline-flex", alignItems: "center", gap: 8,
                  background: "color-mix(in srgb, var(--nx-fg) 55%, transparent)",
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "var(--nx-r-pill)", padding: "8px 14px",
                }}
              >
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>
                  Seven steps · fixed order
                </span>
              </div>
            </div>
          </div>

          {/* trust-stat row */}
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 12, marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              {STATS.map((s) => (
                <div key={s.label} className="nx-stat-card">
                  <span className="nx-stat-num">{s.value}</span>
                  <span className="nx-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ THE TIMELINE — each step argues its own case ══ */}
      <section className="nx-container" style={{ paddingTop: "clamp(4rem,7vw,6rem)", paddingBottom: "clamp(3.5rem,6vw,5rem)" }}>
        <Reveal>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The fixed order</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", maxWidth: "22ch", marginTop: "0.6rem", lineHeight: 1.1 }}>
            From intake to retest, <em style={{ color: "var(--nx-cobalt)" }}>nothing is skipped.</em>
          </h2>
        </Reveal>

        <div className="nx-timeline" style={{ marginTop: "clamp(1.8rem,3.5vw,2.6rem)" }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={Math.min(i * 40, 200)}>
              <div className="nx-timeline-step" style={{ paddingBottom: i < STEPS.length - 1 ? "clamp(2.4rem,4.5vw,3.4rem)" : 0 }}>
                <span className="nx-timeline-node" aria-hidden>{s.n}</span>
                <div className="nx-glass-tile" style={{ display: "block" }}>
                  <div className={s.img ? "grid grid-cols-1 md:grid-cols-[1fr_220px]" : undefined} style={s.img ? { gap: "clamp(1rem,2.5vw,1.6rem)", alignItems: "start" } : undefined}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className="nx-icon-circle" aria-hidden><s.Icon size={19} strokeWidth={1.9} /></span>
                        <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-fg)", lineHeight: 1.1 }}>{s.t}</h3>
                      </div>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "62ch", marginTop: "0.9rem" }}>{s.d}</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "62ch", marginTop: "0.7rem" }}>{s.detail}</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-muted)", maxWidth: "62ch", marginTop: "0.9rem", paddingLeft: "0.9rem", borderLeft: "2px solid var(--nx-cobalt)" }}>{s.objection}</p>
                    </div>
                    {s.img && (
                      <div className="hidden md:block" style={{ borderRadius: "var(--nx-r-md)", overflow: "hidden", boxShadow: "var(--nx-e-2)", aspectRatio: "4 / 5" }}>
                        <img src={s.img} alt={s.imgAlt ?? ""} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="nx-divider-ornament" aria-hidden style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}><i /></div>

      {/* ══ NIGHT BAND — the loop, made dramatic ══ */}
      <section className="nx-gradient-hero-dark" style={{ padding: "clamp(4.5rem,8vw,7rem) 0", overflow: "hidden" }}>
        <div className="nx-container">
          <Reveal>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--nx-acid)" }}>Why the loop matters</p>
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", maxWidth: "20ch", marginTop: "1rem", lineHeight: 1.06, letterSpacing: "-0.015em" }}>
              A prescription is a hypothesis. <em style={{ color: "var(--nx-acid)" }}>The retest is the evidence.</em>
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-lg)", lineHeight: 1.65, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "58ch", marginTop: "1.3rem" }}>
              Most of this market sells vials and disappears. Here, every ninety days the same markers are drawn again, the trend is placed next to the protocol, and a physician decides what changes. Nothing is assumed. Everything is measured.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12, marginTop: "clamp(1.8rem,3.5vw,2.6rem)", maxWidth: 760 }}>
              {[
                { k: "Draw", v: "The same baseline markers, re-run at day 90." },
                { k: "Read", v: "Movement placed beside the active protocol." },
                { k: "Decide", v: "A physician holds, adjusts, or tapers the dose." },
              ].map((x) => (
                <div key={x.k} className="nx-stat-card on-dark" style={{ gap: 8 }}>
                  <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-ceramic)" }}>{x.k}</span>
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-acid)", opacity: 0.82 }}>{x.v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ COMPARISON — the argument made explicit, in two contrasted columns ══ */}
      <section className="nx-container" style={{ paddingTop: "clamp(4rem,7vw,6rem)", paddingBottom: "clamp(4rem,7vw,6rem)" }}>
        <Reveal>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The difference, plainly</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", maxWidth: "20ch", marginTop: "0.6rem", lineHeight: 1.1 }}>
            Same molecules. <em style={{ color: "var(--nx-cobalt)" }}>Different institution.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14, marginTop: "clamp(1.6rem,3vw,2.2rem)" }}>
          {/* THEM */}
          <Reveal>
            <div className="nx-feature-card" style={{ padding: "clamp(1.4rem,3vw,2rem)", background: "color-mix(in srgb, var(--nx-fg-muted) 8%, var(--nx-ceramic))" }}>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>The rest of the market</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "1.1rem 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
                {COMPARE.map((c) => (
                  <li key={c.row} style={{ display: "flex", gap: 11, alignItems: "flex-start", borderTop: "1px solid var(--nx-border)", paddingTop: 14 }}>
                    <X size={17} strokeWidth={2.4} aria-hidden="true" style={{ color: "var(--nx-fg-muted)", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>{c.row}</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", marginTop: 2 }}>{c.them}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* US */}
          <Reveal delay={80}>
            <div className="nx-feature-card edge-top" style={{ padding: "clamp(1.4rem,3vw,2rem)", background: "var(--nx-cobalt-soft)" }}>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Nexphoria</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "1.1rem 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
                {COMPARE.map((c) => (
                  <li key={c.row} style={{ display: "flex", gap: 11, alignItems: "flex-start", borderTop: "1px solid color-mix(in srgb, var(--nx-cobalt) 20%, transparent)", paddingTop: 14 }}>
                    <Check size={17} strokeWidth={2.6} aria-hidden="true" style={{ color: "var(--nx-cobalt)", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{c.row}</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-fg)", marginTop: 2 }}>{c.us}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CLOSE ══ */}
      <section className="nx-container" style={{ paddingTop: "clamp(2rem,4vw,3rem)", paddingBottom: "clamp(4.5rem,7vw,6rem)", textAlign: "center" }}>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
          Licensed physicians · State-licensed 503A pharmacies · Prescription required · One dashboard
        </p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "1.4rem auto 0", lineHeight: 1.1 }}>
          The consultation carries no charge. <em style={{ color: "var(--nx-cobalt)" }}>You pay only if prescribed.</em>
        </h2>
        <Link href="/assessment" className="nx-cta-cobalt" style={{ marginTop: "1.7rem" }} data-testid="hiw-cta">
          Start your assessment
        </Link>
      </section>
      {/* Sticky contextual CTA on long pages (ROADMAP 6.2) */}
      <StickyAssessBar label="A two-minute first step" testid="sticky-assess-howitworks" />
    </SiteLayout>
  );
}
