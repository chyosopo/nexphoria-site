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
import { OUTCOME_HERO, outcomeSrcSet } from "@/data/outcomeImagery";
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
  /** render the abstract dashboard sample instead of a photo (step 06 —
      the dashboard IS the subject; no PHI, clearly labeled a sample) */
  dashboardMock?: boolean;
}

const STEPS: Step[] = [
  {
    n: "01", t: "Your plan, then your questionnaire", Icon: ClipboardList,
    img: stepIntake, imgAlt: "A man begins his intake on a tablet at a dawn-lit desk",
    d: "Choose your peptide and your plan length, and check out. Then a medical questionnaire covering your history, goals, current medications and contraindications, reviewed in full before anything else happens.",
    detail: "The intake screens for the conditions that make each peptide class unsafe: malignancy history, pregnancy, cardiovascular disease, drug interactions, and puts every answer in front of the physician who decides.",
    objection: "“Is this just a form that rubber-stamps a sale?” It exists to rule out people for whom a protocol is wrong, before a physician spends time on the file, and it can end there.",
  },
  {
    n: "02", t: "Your doctor decides", Icon: Stethoscope,
    img: stepPhysician, imgAlt: "Two physicians review a patient chart together",
    d: "A licensed U.S. doctor reads your questionnaire. If a plan is appropriate, it is prescribed. If it is not, you are told so plainly.",
    detail: "A physician is the only party who can authorize a prescription here, and that authority sits with them alone. Some intakes end at this step with “not a candidate.” The refund policy sets out what is refunded.",
    objection: "“Is there really a doctor, or a checkbox?” A named, state-licensed physician owns the decision and the liability for it.",
  },
  {
    n: "03", t: "503A compounding", Icon: FlaskConical,
    img: stepCompounding, imgAlt: "A sterile compounding room in a licensed pharmacy",
    d: "Prescriptions are compounded for you in a state-licensed 503A pharmacy, batch documented and prescription only.",
    detail: "503A pharmacies compound to an individual prescription under state board oversight. Every batch is documented. This is the same regulatory class that prepares countless everyday prescriptions.",
    objection: "“Where does the actual medication come from?” A licensed U.S. compounding pharmacy, preparing your vial against your specific prescription, batch by documented batch.",
  },
  {
    n: "04", t: "Cold-chain delivery", Icon: Snowflake,
    img: stepDelivery, imgAlt: "An unbranded package at a front door",
    d: "Temperature-controlled from pharmacy to your door, in discreet, unbranded packaging.",
    detail: "Peptides are temperature-sensitive; a broken cold chain is a dead protocol. Shipments are packed to hold temperature in transit and arrive without anything on the box that announces what’s inside.",
    objection: "“Will it be obvious what this is?” No. The packaging is deliberately anonymous.",
  },
  {
    n: "05", t: "Your dashboard", Icon: LayoutDashboard,
    dashboardMock: true,
    d: "Markers, reference ranges, trends and your active protocol, in one place.",
    detail: "Every number sits next to its range and its trend line, so you read direction, not just a snapshot.",
    objection: "“Do I just get a vial and silence?” You get the data, the trend, and the doctor who owns the decision.",
  },
  {
    n: "06", t: "The week-12 panel", Icon: TestTube,
    img: stepBloodwork, imgAlt: "Vacutainer tubes on a ceramic tray, prepared for a draw",
    d: "Twelve weeks in, a single draw at a partner laboratory near you. A full panel across the systems a plan can touch: sugar and insulin, cholesterol and heart, liver and kidneys, hormones, blood and nutrients.",
    detail: "One full panel for every plan, included. Your doctor reads the markers that matter for your peptide first: IGF-1 for tesamorelin, sugar and insulin for a GLP-1, hormones for context.",
    objection: "“Why test at all?” Because how you feel and what changed are two different things, and your doctor adjusts your dose from the second one.",
  },
  {
    n: "07", t: "Your dose, adjusted", Icon: RefreshCw,
    img: stepRetest, imgAlt: "A physician reads a printed lab panel at a light table",
    d: "Your week-12 panel is placed next to your plan, and your doctor decides what changes.",
    detail: "This is the step most of the market skips. The markers are read against your plan, and your doctor continues, adjusts, or stops accordingly. The loop is the product, and the vial is part of it.",
    objection: "“What am I actually paying for?” A doctor who stays with you, anchored to your own blood at week 12.",
  },
];

const STATS: { value: string; label: string }[] = [
  { value: "7", label: "Steps · fixed order" },
  { value: "503A", label: "State-licensed pharmacy" },
  { value: "Week 12", label: "Full panel, included" },
  { value: "50", label: "States shipped to" },
];

const COMPARE: { row: string; them: string; us: string }[] = [
  { row: "Who authorizes it", them: "A checkout button", us: "A licensed U.S. doctor" },
  { row: "Blood panel", them: "Rarely, if ever", us: "A full panel at week 12, included" },
  { row: "Where it’s made", them: "Often unnamed", us: "State-licensed 503A pharmacy" },
  { row: "After you buy", them: "Silence", us: "A week-12 panel and your doctor's read of it" },
  { row: "What you’re buying", them: "A vial", us: "The measured loop around it" },
];

export default function HowItWorks() {
  // World-cast the hero (fleet audit: a woman arriving from /women saw a
  // male portrait under the orchid palette — the world read as a re-skin)
  const [loc] = useLocation();
  const world = resolveWorld(loc);
  const heroImg = OUTCOME_HERO[world === "women" ? "women" : "men"];
  useSeo({
    title: "How It Works | Nexphoria",
    description: "Your plan and questionnaire, physician review, 503A compounding, cold-chain delivery, one dashboard, a full blood panel at week 12 and a dose review, in a fixed order.",
    path: "/how-it-works",
    jsonLd: [
      webPageJsonLd({ name: "How It Works", description: "Plan and questionnaire, physician review, 503A compounding, cold-chain delivery, one dashboard, a week-12 blood panel, a dose review.", path: "/how-it-works", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }]),
      howToJsonLd({
        name: "How Nexphoria peptide therapy works",
        description: "The fixed order of a Nexphoria plan: your plan and questionnaire, physician review, 503A compounding, cold-chain delivery, a monitoring dashboard, a full blood panel at week 12, and a dose review.",
        steps: STEPS.map((s) => ({ name: s.t, text: s.d })),
      }),
    ],
  });

  return (
    <SiteLayout>
      {/* ══ HERO — claim beside an outcome frame, over a gradient field ══ */}
      <section className="nx-gradient-hero relative" style={{ overflow: "hidden" }}>
        <div className="nx-container relative nx-hero-seq" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]" style={{ gap: "clamp(1.6rem,4vw,3rem)", alignItems: "center" }}>
            <div>
              <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                <ShieldCheck size={14} strokeWidth={2.2} aria-hidden="true" /> How it works
              </p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1.03, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.9rem" }}>
                Getting started <em style={{ color: "var(--nx-cobalt)" }}>is simple.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1.1rem" }}>
                From checkout to your first cold shipment to your week-12 blood panel. Here is every step, in order, and why it is there.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "1.6rem" }}>
                <Link href="/assessment" className="nx-cta-cobalt" data-testid="hiw-hero-cta">Get started</Link>
                <Link href="/bloodwork" className="nx-cta-ghost">See the panels</Link>
              </div>
            </div>
            <div className="nx-hero-frame nx-hero-bleed" style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-4)", aspectRatio: "3 / 2" }}>
              <img src={heroImg} srcSet={outcomeSrcSet(heroImg)} sizes="(max-width: 1024px) 100vw, 45vw" alt="" aria-hidden fetchPriority="high" width={2048} height={1360} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>
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
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The fixed order</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", maxWidth: "22ch", marginTop: "0.6rem", lineHeight: 1.1 }}>
            From intake to retest, <em style={{ color: "var(--nx-cobalt)" }}>every step is on the record.</em>
          </h2>
        </Reveal>

        <div className="nx-timeline" style={{ marginTop: "clamp(1.8rem,3.5vw,2.6rem)" }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={Math.min(i * 40, 200)}>
              <div className="nx-timeline-step" style={{ paddingBottom: i < STEPS.length - 1 ? "clamp(2.4rem,4.5vw,3.4rem)" : 0 }}>
                <span className="nx-timeline-node" aria-hidden>{s.n}</span>
                <div className="nx-glass-tile" style={{ display: "block" }}>
                  <div className={s.img || s.dashboardMock ? "grid grid-cols-1 md:grid-cols-[1fr_220px]" : undefined} style={s.img || s.dashboardMock ? { gap: "clamp(1rem,2.5vw,1.6rem)", alignItems: "start" } : undefined}>
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
                    {s.dashboardMock && (
                      <div className="nx-mini-panel hidden md:block" aria-hidden style={{ alignSelf: "center" }}>
                        <div className="nx-mini-head">
                          <span className="nx-mini-title">Biomarker index</span>
                          <span className="nx-mini-pill">Sample</span>
                        </div>
                        <div className="nx-mini-bars">
                          <div className="nx-mini-bar" style={{ height: "44%" }} />
                          <div className="nx-mini-bar" style={{ height: "58%" }} />
                          <div className="nx-mini-bar" style={{ height: "52%" }} />
                          <div className="nx-mini-bar" style={{ height: "71%" }} />
                          <div className="nx-mini-bar hi" style={{ height: "88%" }} />
                        </div>
                        <div className="nx-mini-row">
                          <span>Start → week 12 → week 24</span>
                        </div>
                        <div className="nx-mini-row">
                          <span className="nx-mini-cap">Illustrative, not a patient record</span>
                        </div>
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
      <section className="nx-gradient-hero-dark" style={{ padding: "var(--nx-sp-sec) 0", overflow: "hidden" }}>
        <div className="nx-container">
          <Reveal>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-acid)" }}>Why the loop matters</p>
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", maxWidth: "20ch", marginTop: "1rem", lineHeight: 1.06, letterSpacing: "var(--nx-ls-snug)" }}>
              A prescription is a hypothesis. <em style={{ color: "var(--nx-acid)" }}>The retest is the evidence.</em>
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-lg)", lineHeight: 1.65, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "58ch", marginTop: "1.3rem" }}>
              Most of this market sells vials and disappears. Here, your blood is drawn at week 12, placed next to your plan, and your doctor decides what changes. Everything is measured.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12, marginTop: "clamp(1.8rem,3.5vw,2.6rem)", maxWidth: 760 }}>
              {[
                { k: "Draw", v: "A full panel at week 12, read against your start." },
                { k: "Read", v: "Movement placed beside the active protocol." },
                { k: "Decide", v: "Your doctor continues, adjusts, or stops the dose." },
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
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The difference, plainly</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", maxWidth: "20ch", marginTop: "0.6rem", lineHeight: 1.1 }}>
            Same molecules. <em style={{ color: "var(--nx-cobalt)" }}>Different institution.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14, marginTop: "clamp(1.6rem,3vw,2.2rem)" }}>
          {/* THEM */}
          <Reveal>
            <div className="nx-feature-card" style={{ padding: "clamp(1.4rem,3vw,2rem)", background: "color-mix(in srgb, var(--nx-fg-muted) 8%, var(--nx-ceramic))" }}>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>The rest of the market</p>
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
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Nexphoria</p>
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
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-sec)", textAlign: "center" }}>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
          Licensed physicians · State-licensed 503A pharmacies · Prescription required · One dashboard
        </p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "1.4rem auto 0", lineHeight: 1.1 }}>
          Your doctor decides first. <em style={{ color: "var(--nx-cobalt)" }}>Then your medicine is made for you.</em>
        </h2>
        <Link href="/assessment" className="nx-cta-cobalt" style={{ marginTop: "1.7rem" }} data-testid="hiw-cta">
          Get started
        </Link>
      </section>
      {/* Sticky contextual CTA on long pages (ROADMAP 6.2) */}
      <StickyAssessBar label="A two-minute first step" testid="sticky-assess-howitworks" />
    </SiteLayout>
  );
}
