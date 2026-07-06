/* JOB: make a stranger understand the offer in 5 seconds and start the assessment. */
/* ═══ FRONT DOOR — the homepage (ROADMAP 1.2) ═══
   JOB: a skeptical first-time visitor understands in 5 seconds what this
   is, who it's for, what it costs, and the ONE thing to do next.
   Story beats: feeling → possibility → proof → path.
   The old her/him photo gate lives on at /gate. */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { HomeTrust } from "@/components/HomeTrust";
import { useSeo, webPageJsonLd, orgJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { ArrowRight } from "lucide-react";
import { BIOMARKER_PANEL, PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { CATEGORY_LABELS, CATEGORY_FEELING, peptides, type PeptideCategory } from "@/data/peptides";
import { OUTCOME_CATEGORY } from "@/data/outcomeImagery";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { SOLO_FROM_LABEL } from "@/data/pricing";
import { outcomeSrcSet } from "@/data/outcomeImagery";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { PhysicianGate } from "@/components/PhysicianProofBand";
import gateHer from "@/assets/brand/gate-her.webp";
import gateHim from "@/assets/brand/gate-him.webp";

/* Universal hero — couple on the morning trail (Bloom, C29 grammar). */
const HERO_ART = "img/img_82c3e3ceeecf.webp";

/* Neutral goal cast — mixed worlds on the shared front door. */
const GOAL_TILES: { cat: PeptideCategory; img: string }[] = [
  { cat: "recovery", img: OUTCOME_CATEGORY.women.recovery! },
  { cat: "growth", img: OUTCOME_CATEGORY.men.growth! },
  { cat: "metabolic", img: OUTCOME_CATEGORY.men.metabolic! },
  { cat: "skin", img: OUTCOME_CATEGORY.women.skin! },
  { cat: "longevity", img: OUTCOME_CATEGORY.men.longevity! },
  { cat: "cognition", img: OUTCOME_CATEGORY.women.cognition! },
];

// Goal tiles speak the goal's feeling line (ROADMAP 4.2) — one register per
// goal, shared with category heroes, catalog shelves, and the assessment.

/* Lowest real non-gated protocol per-month — derived, never hardcoded. */
const PROTOCOL_FROM = Math.min(
  ...FLAGSHIP_STACKS.filter((s) => !s.gated).flatMap((s) =>
    s.cadences.map((c) => c.perMonth ?? c.total),
  ),
);

export default function FrontDoor() {
  useSeo({
    title: "Nexphoria — prescription peptides, built on your bloodwork",
    description:
      `Physician-prescribed peptide protocols: a ${PANEL_TOTAL_MARKERS}-marker panel, a licensed physician who reads it, state-licensed 503A compounding, and a 90-day retest. Protocols from ${usd(PROTOCOL_FROM)}/mo.`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      webPageJsonLd({
        name: "Nexphoria",
        description: "Physician-prescribed peptide protocols, built on your bloodwork.",
        path: "/",
      }),
    ],
  });

  const countFor = (c: PeptideCategory) => peptides.filter((p) => p.category === c).length;

  return (
    <SiteLayout navVariant="showcase">
      {/* ══ 1 · HERO — what this is + the one action, in 5 seconds ══ */}
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ paddingTop: "clamp(3.2rem,6.5vw,5.4rem)", paddingBottom: "clamp(2.4rem,4.5vw,3.6rem)", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]" style={{ gap: "clamp(1.6rem,4vw,3.2rem)", alignItems: "center" }}>
            <div className="nx-hero-seq">
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                Physician-prescribed peptide therapy
              </p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(40px,6vw,74px)", lineHeight: 1.04, letterSpacing: "-0.018em", color: "var(--nx-fg)", maxWidth: "14ch", marginTop: "0.9rem" }}>
                Prescription peptides, built on <em style={{ color: "var(--nx-cobalt)", whiteSpace: "nowrap" }}>your bloodwork.</em>
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "50ch", marginTop: "1.1rem" }}>
                A {PANEL_TOTAL_MARKERS}-marker panel, a licensed physician who reads it, protocols
                compounded in state-licensed U.S. pharmacies — and a retest every 90 days that
                decides what happens next.
              </p>
              <div style={{ marginTop: "1.8rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.4rem" }}>
                <Link href="/assessment" data-testid="frontdoor-hero-cta" className="nx-cta-cobalt" style={{ fontSize: "var(--nx-t-base)", padding: "15px 30px" }}>
                  Start your assessment
                </Link>
                <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
                  How it works →
                </Link>
              </div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.9rem" }}>
                2 minutes · no charge unless a physician prescribes
              </p>
              {/* Physician presence at the decision moment (ROADMAP 5.1) */}
              <PhysicianGate testid="frontdoor-hero-physician" style={{ marginTop: "0.9rem" }} />
            </div>
            <div className="nx-hero-frame nx-hero-bleed" style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-3)", aspectRatio: "3 / 2" }}>
              <img src={HERO_ART} alt="" aria-hidden fetchPriority="high" width={2048} height={1360} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} data-testid="frontdoor-hero-art" />
              <div
                style={{
                  position: "absolute", top: 14, right: 14, display: "inline-flex", alignItems: "center", gap: 8,
                  background: "color-mix(in srgb, var(--nx-fg) 55%, transparent)",
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "var(--nx-r-pill)", padding: "8px 14px",
                }}
              >
                <span className="nx-pulse-dot" aria-hidden style={{ width: 7, height: 7, borderRadius: "var(--nx-r-pill)", background: "var(--nx-acid)", flexShrink: 0 }} />
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>
                  Retested every 90 days
                </span>
              </div>
              <div
                style={{
                  position: "absolute", left: 14, bottom: 14,
                  background: "color-mix(in srgb, var(--nx-ceramic) 82%, transparent)",
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid color-mix(in srgb, var(--nx-accent) 24%, transparent)",
                  borderRadius: "var(--nx-r-sm)", padding: "10px 14px", minWidth: 168, boxShadow: "var(--nx-e-2)",
                }}
              >
                <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
                  Sample 90-day trajectory
                </p>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 3 }}>
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)" }}>hs-CRP</span>
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 700, color: "var(--nx-cobalt)", fontVariantNumeric: "tabular-nums" }}>−41%</span>
                </div>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-graphite)", marginTop: 2 }}>Inflammation trending down</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2 · TWO WORLDS — is this for someone like me? ══ */}
      <section className="nx-container" style={{ paddingTop: "clamp(2.4rem,4.5vw,3.6rem)", paddingBottom: "0" }}>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
          Two worlds · one clinical standard
        </p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.6vw,38px)", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "22ch", lineHeight: 1.12 }}>
          Built for your biology.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 18, marginTop: "1.6rem" }}>
          {[
            { side: "For women", to: "/women", img: gateHer, pos: "50% 20%", testId: "frontdoor-women" },
            { side: "For men", to: "/men", img: gateHim, pos: "50% 22%", testId: "frontdoor-men" },
          ].map((w) => (
            <Reveal key={w.to}>
              <Link href={w.to} className="nx-art-tile" data-testid={w.testId}>
                <img src={w.img} alt="" aria-hidden loading="lazy" width={1600} height={2000} style={{ objectPosition: w.pos }} />
                <div className="nx-art-chip">
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                    <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,2.6vw,28px)", color: "var(--nx-fg)", lineHeight: 1.1 }}>{w.side}</h3>
                    <ArrowRight size={18} strokeWidth={2.2} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                  </div>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-fg-graphite)", marginTop: "0.3rem" }}>
                    {w.to === "/women" ? "Hormonal context changes what a marker means — protocols read against it." : "Performance is a number. It gets measured before it gets treated."}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 3 · GOALS — what people come here for ══ */}
      <section className="nx-container" style={{ paddingTop: "clamp(3rem,5.5vw,4.5rem)", paddingBottom: "0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.6vw,38px)", color: "var(--nx-fg)" }}>
            Start from the goal.
          </h2>
          <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            The complete catalog →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 18, marginTop: "1.6rem" }}>
          {GOAL_TILES.map(({ cat, img }, i) => (
            <Reveal key={cat} delay={i * 50}>
              <Link href={`/goals/${cat}`} className="nx-art-tile" data-testid={`frontdoor-goal-${cat}`}>
                <img src={img} srcSet={outcomeSrcSet(img)} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="" aria-hidden loading="lazy" width={1632} height={2048} />
                <div className="nx-art-chip">
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                    <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(19px,2.1vw,23px)", color: "var(--nx-fg)", lineHeight: 1.12 }}>
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <ArrowRight size={16} strokeWidth={2.2} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0, transform: "translateY(2px)" }} />
                  </div>
                  <p style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: "var(--nx-cobalt)", marginTop: "0.3rem" }}>
                    {CATEGORY_FEELING[cat]}
                  </p>
                  <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "0.55rem" }}>
                    {countFor(cat)} {countFor(cat) === 1 ? "protocol" : "protocols"}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 4 · PROOF — the physician and the process ══ */}
      <HomeTrust />

      {/* ══ 5 · THE PANEL — living texture ══ */}
      <section aria-label="Biomarkers we measure" style={{ paddingTop: "0", paddingBottom: "0" }}>
        <div className="nx-container" style={{ marginBottom: "1.1rem" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            {PANEL_TOTAL_MARKERS} biomarkers · drawn at baseline · re-drawn every 90 days
          </p>
        </div>
        {[BIOMARKER_PANEL.slice(0, 5), BIOMARKER_PANEL.slice(5)].map((half, r) => (
          <div key={r} className="nx-marquee" style={{ marginBottom: r === 0 ? 10 : 0 }} aria-hidden>
            <div className={`nx-marquee-track ${r === 1 ? "reverse" : ""}`}>
              {(() => {
                const row = half.flatMap((c) => c.markers.map((m) => ({ n: m.name.split(" (")[0], c: c.name })));
                return [...row, ...row].map((m, j) => (
                  <span key={j} className="nx-marquee-chip">
                    <span style={{ color: "var(--nx-cobalt)", fontWeight: 600 }}>{m.c}</span>&nbsp;·&nbsp;{m.n}
                  </span>
                ));
              })()}
            </div>
          </div>
        ))}
      </section>

      {/* ══ 6 · PRICE ANCHOR + THE ONE ACTION — the closer ══ */}
      <section className="nx-gradient-hero-dark" style={{ padding: "clamp(3.4rem,6.5vw,5.2rem) 0", overflow: "hidden", marginTop: "clamp(3rem,5.5vw,4.5rem)" }}>
        <div className="nx-container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--nx-acid)" }}>
            One number a month
          </p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.4vw,48px)", color: "var(--nx-ceramic)", maxWidth: "24ch", margin: "0.9rem auto 0", lineHeight: 1.1 }}>
            Protocols from {usd(PROTOCOL_FROM)}/mo. Single peptides from {SOLO_FROM_LABEL}/mo.
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-acid)", opacity: 0.9, maxWidth: "52ch", margin: "1rem auto 0" }}>
            Physician review, the lab panel, cold-chain shipping, and the 90-day retest are inside the number.
          </p>
          <PrescribedPromise onDark centered testid="frontdoor-closer-promise" style={{ marginTop: "0.8rem" }} />
          <Link href="/assessment" className="nx-cta-ceramic" data-testid="frontdoor-closer-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.8rem" }}>
            Start your assessment
          </Link>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-acid) 75%, transparent)", marginTop: "0.9rem" }}>
            2 minutes · a licensed physician decides — and can decline
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
