/* ═══ HOW IT WORKS — the institution's argument, in full ═══
   Seven steps, each with the specific "how" and the objection it answers.
   One outcome frame, one night-band loop, one comparison. Bank voice.
   Tokens only; both worlds theme it. Marker counts kept honest — the
   panel is described by its named tiers, not an unbacked total. */
import { SiteLayout } from "@/components/SiteLayout";
import { Link } from "wouter";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, howToJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";
import { OUTCOME_HERO } from "@/data/outcomeImagery";
import { Check, X } from "lucide-react";

interface Step {
  n: string; t: string; d: string;
  detail: string;      // the specific mechanism
  objection: string;   // the doubt it answers
}

const STEPS: Step[] = [
  {
    n: "01", t: "Structured intake",
    d: "A medical questionnaire covering history, goals, current medications, and contraindications — reviewed in full before anything else happens.",
    detail: "Not a checkbox funnel. The intake screens for the conditions that make each peptide class unsafe — malignancy history, pregnancy, cardiovascular disease, drug interactions — and routes that information to the physician, not an algorithm.",
    objection: "“Is this just a form that rubber-stamps a sale?” No. It exists to disqualify people for whom a protocol is wrong, before a physician ever spends time on the file.",
  },
  {
    n: "02", t: "Bloodwork at the lab",
    d: "A single draw at a partner laboratory near you. A comprehensive panel across the systems a protocol can touch — cardiac, hormonal, metabolic, hepatic, renal — establishing your baseline.",
    detail: "Three panel tiers — Basic, Full, and Elite — matched to what a protocol actually requires. A GH-axis peptide mandates IGF-1; a metabolic protocol pulls insulin, HOMA-IR, and ApoB. You are not billed for markers your protocol doesn’t use.",
    objection: "“Why can’t I skip the labs?” Because without a baseline there is nothing to compare the retest against — and the retest is the entire point.",
  },
  {
    n: "03", t: "Physician review",
    d: "A licensed U.S. physician reads your intake against your markers. If a protocol is appropriate, it is prescribed. If it is not, you are told so plainly.",
    detail: "The physician is the only party who can authorize a prescription — not a questionnaire score, not a sales team. Some intakes end here with “not a candidate,” and that outcome carries no charge.",
    objection: "“Is there really a doctor, or a checkbox?” A named, state-licensed physician owns the decision and the liability for it.",
  },
  {
    n: "04", t: "503A compounding",
    d: "Prescriptions are compounded for you in a state-licensed 503A pharmacy — batch-documented and prescription-only.",
    detail: "503A pharmacies compound to an individual prescription under state board oversight. Every batch is documented. This is the same regulatory class that prepares countless everyday prescriptions — not a gray-market supplier.",
    objection: "“Where does the actual medication come from?” A licensed U.S. compounding pharmacy, dispensing against your specific prescription — never a bulk shelf.",
  },
  {
    n: "05", t: "Cold-chain delivery",
    d: "Temperature-controlled from pharmacy to your door, in discreet, unbranded packaging.",
    detail: "Peptides are temperature-sensitive; a broken cold chain is a dead protocol. Shipments are packed to hold temperature in transit and arrive without anything on the box that announces what’s inside.",
    objection: "“Will it be obvious what this is?” No. The packaging is deliberately anonymous.",
  },
  {
    n: "06", t: "Your dashboard",
    d: "Markers, reference ranges, trends, your active protocol, and physician messaging — in one place.",
    detail: "Every number sits next to its range and its trend line, so you read direction, not just a snapshot. Questions to your physician run through the same portal — no phone tag.",
    objection: "“Do I just get a vial and silence?” No — you get the data, the trend, and a line to the physician who owns it.",
  },
  {
    n: "07", t: "The 90-day retest",
    d: "Your panel is drawn again. The trend is placed next to the protocol, and a physician decides what changes.",
    detail: "This is the step the rest of the market skips. The same markers are re-drawn, the movement is read against your protocol, and the physician holds, adjusts, or tapers accordingly. The loop is the product — not the vial.",
    objection: "“What am I actually paying for?” Ongoing physician oversight anchored to your own labs — not a subscription to a substance.",
  },
];

const COMPARE: { row: string; them: string; us: string }[] = [
  { row: "Who authorizes it", them: "A checkout button", us: "A licensed U.S. physician" },
  { row: "Baseline bloodwork", them: "Rarely, if ever", us: "Required before the first dose" },
  { row: "Where it’s made", them: "Often unnamed", us: "State-licensed 503A pharmacy" },
  { row: "After you buy", them: "Silence", us: "90-day retest and physician review" },
  { row: "What you’re buying", them: "A vial", us: "The measured loop around it" },
];

export default function HowItWorks() {
  useSeo({
    title: "How It Works — Nexphoria",
    description: "Intake, bloodwork, physician review, 503A compounding, cold-chain delivery, one dashboard, and 90-day retesting — in a fixed order that does not bend.",
    jsonLd: [
      webPageJsonLd({ name: "How It Works", description: "Intake, bloodwork, physician review, 503A compounding, cold-chain delivery, one dashboard, 90-day retesting.", path: "/how-it-works" }),
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
      {/* hero — claim beside an outcome frame */}
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ padding: "clamp(3rem,6vw,5rem) 0 clamp(1.6rem,3vw,2.4rem)", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]" style={{ gap: "clamp(1.6rem,4vw,3rem)", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>How it works</p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(36px,5.6vw,64px)", lineHeight: 1.06, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "17ch", marginTop: "0.9rem" }}>
                Seven steps. <em style={{ color: "var(--nx-cobalt)" }}>No improvisation.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: 16.5, lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1rem" }}>
                Physician oversight, laboratory bloodwork, state-licensed compounding, and one dashboard — in a fixed order that does not bend. Here is exactly what happens, and why each step exists.
              </p>
            </div>
            <div style={{ borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-3)", aspectRatio: "3 / 2" }}>
              <img src={OUTCOME_HERO.men} alt="" aria-hidden fetchPriority="high" width={2048} height={1360} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* the timeline — each step argues */}
      <section className="nx-container" style={{ paddingBottom: "3.5rem" }}>
        <div style={{ borderTop: "1px solid var(--nx-border)" }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={Math.min(i * 40, 160)}>
              <div className="grid md:grid-cols-[110px_1fr] gap-2 md:gap-8 py-8" style={{ borderBottom: "1px solid var(--nx-border)" }}>
                <p style={{ fontFamily: S, fontSize: 30, color: "var(--nx-rust)", lineHeight: 1 }}>{s.n}</p>
                <div>
                  <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(21px,2.6vw,27px)", color: "var(--nx-fg)" }}>{s.t}</h2>
                  <p style={{ fontFamily: F, fontSize: 15.5, lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "60ch", marginTop: "0.5rem" }}>{s.d}</p>
                  <p style={{ fontFamily: F, fontSize: 14.5, lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "60ch", marginTop: "0.7rem" }}>{s.detail}</p>
                  <p style={{ fontFamily: F, fontSize: 14, lineHeight: 1.6, color: "var(--nx-fg-muted)", maxWidth: "60ch", marginTop: "0.7rem", paddingLeft: "0.9rem", borderLeft: "2px solid var(--nx-cobalt)" }}>{s.objection}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* night band — the loop */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "clamp(3rem,6vw,4.5rem) 0" }}>
        <div className="nx-container">
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>Why the loop matters</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.4vw,46px)", color: "var(--nx-ceramic)", maxWidth: "22ch", marginTop: "0.8rem" }}>
            A prescription is a hypothesis. <em style={{ color: "var(--nx-acid)" }}>The retest is the evidence.</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: 15.5, lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "56ch", marginTop: "1rem" }}>
            Most of this market sells vials and disappears. Here, every ninety days the same markers are drawn again, the trend is placed next to the protocol, and a physician decides what changes. Nothing is assumed. Everything is measured.
          </p>
        </div>
      </section>

      {/* comparison — the argument made explicit */}
      <section className="nx-container" style={{ padding: "clamp(2.8rem,5vw,4rem) 0" }}>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>The difference, plainly</p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,4vw,40px)", color: "var(--nx-fg)", maxWidth: "20ch", marginTop: "0.7rem", lineHeight: 1.12 }}>
          Same molecules. <em style={{ color: "var(--nx-cobalt)" }}>Different institution.</em>
        </h2>
        <div style={{ marginTop: "1.6rem", borderTop: "1px solid var(--nx-border)", maxWidth: 760 }}>
          {COMPARE.map((c) => (
            <div key={c.row} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] gap-1 sm:gap-6 py-4" style={{ borderBottom: "1px solid var(--nx-border)" }}>
              <p style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--nx-fg-muted)", alignSelf: "center" }}>{c.row}</p>
              <p style={{ fontFamily: F, fontSize: 14.5, color: "var(--nx-fg-muted)", alignSelf: "center", display: "flex", gap: 7, alignItems: "center" }}>
                <X size={14} strokeWidth={2.4} style={{ color: "var(--nx-fg-muted)", flexShrink: 0 }} /> {c.them}
              </p>
              <p style={{ fontFamily: F, fontSize: 14.5, fontWeight: 600, color: "var(--nx-fg)", alignSelf: "center", display: "flex", gap: 7, alignItems: "center" }}>
                <Check size={14} strokeWidth={2.6} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} /> {c.us}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* terms strip + close */}
      <section className="nx-container" style={{ padding: "1.5rem 0 4.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
          Licensed physicians · State-licensed 503A pharmacies · Prescription required · One dashboard
        </p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.2vw,44px)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "1.4rem auto 0", lineHeight: 1.12 }}>
          The consultation carries no charge. <em style={{ color: "var(--nx-cobalt)" }}>You pay only if prescribed.</em>
        </h2>
        <Link href="/assessment" style={{ display: "inline-block", fontFamily: F, fontWeight: 600, fontSize: 15, background: "var(--nx-cobalt)", color: "var(--nx-ceramic)", borderRadius: "var(--nx-r-pill)", padding: "14px 28px", marginTop: "1.6rem", textDecoration: "none" }} data-testid="hiw-cta">
          Begin your intake
        </Link>
      </section>
    </SiteLayout>
  );
}
