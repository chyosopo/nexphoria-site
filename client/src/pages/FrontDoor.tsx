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
import { OUTCOME_CATEGORY, OUTCOME_STACK } from "@/data/outcomeImagery";
import { HeroTileRail, type RailTile } from "@/components/HeroTileRail";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { SOLO_FROM_LABEL } from "@/data/pricing";
import { outcomeSrcSet } from "@/data/outcomeImagery";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { PhysicianGate } from "@/components/PhysicianProofBand";
/* The dedicated per-world gate portraits (Bloom, 2026-07-06) — same faces
   that greet visitors at /gate, so the two-worlds moment is consistent. */
const gateHer = "img/img_8742acc94d7e.webp";
const gateHim = "img/img_84799b6e21dc.webp";

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

/* From-price of one stack — its lowest real per-month cadence. */
const stackFrom = (slug: string) => {
  const s = FLAGSHIP_STACKS.find((x) => x.slug === slug)!;
  return usd(Math.min(...s.cadences.map((c) => c.perMonth ?? c.total)));
};

/* The hero rail (hims grammar): six goals + two flagship protocols + the
   retest promise, all on existing Bloom photography and real prices. */
const HERO_TILES: RailTile[] = [
  { img: OUTCOME_CATEGORY.women.recovery!, label: CATEGORY_LABELS.recovery, sub: CATEGORY_FEELING.recovery, href: "/goals/recovery", testid: "rail-recovery" },
  { img: OUTCOME_STACK.wolverine, label: "The Wolverine protocol", sub: `from ${stackFrom("wolverine")}/mo`, href: "/stacks/wolverine", testid: "rail-wolverine" },
  { img: OUTCOME_CATEGORY.women.skin!, label: CATEGORY_LABELS.skin, sub: CATEGORY_FEELING.skin, href: "/goals/skin", testid: "rail-skin" },
  { img: OUTCOME_CATEGORY.men.growth!, label: CATEGORY_LABELS.growth, sub: CATEGORY_FEELING.growth, href: "/goals/growth", testid: "rail-growth" },
  { img: OUTCOME_STACK.glow, label: "The Glow protocol", sub: `from ${stackFrom("glow")}/mo`, href: "/stacks/glow", testid: "rail-glow" },
  { img: OUTCOME_CATEGORY.men.metabolic!, label: CATEGORY_LABELS.metabolic, sub: CATEGORY_FEELING.metabolic, href: "/goals/metabolic", testid: "rail-metabolic" },
  { img: HERO_ART, label: "Your bloodwork", sub: "Retested every 90 days.", href: "/bloodwork", testid: "rail-bloodwork" },
  { img: OUTCOME_CATEGORY.women.cognition!, label: CATEGORY_LABELS.cognition, sub: CATEGORY_FEELING.cognition, href: "/goals/cognition", testid: "rail-cognition" },
];

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
        <div className="nx-container relative" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]" style={{ gap: "clamp(1.6rem,4vw,3.2rem)", alignItems: "center" }}>
            <div className="nx-hero-seq">
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                Physician-prescribed peptide therapy
              </p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1.04, letterSpacing: "-0.018em", color: "var(--nx-fg)", maxWidth: "14ch", marginTop: "0.9rem" }}>
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
            {/* The weightless vertical tile rail — the hims-grammar hero:
                every goal and flagship on Bloom photography, drifting slowly.
                Desktop: two counter-scrolling columns. Mobile: snap strip. */}
            <HeroTileRail tiles={HERO_TILES} testid="frontdoor-rail" />
          </div>
        </div>
      </section>

      {/* ══ 1.4 · THE GATE — the for-her/for-him moment, restored to the entry
          (Chiya, 2026-07-10). Full-bleed cinematic split: breathing portraits,
          hover widens a panel and casts its world's tokens. The theatrical
          full-screen version lives on at /gate. ══ */}
      <section aria-labelledby="frontdoor-gate-heading" style={{ paddingTop: "var(--nx-sp-band)" }}>
        <div className="nx-container" style={{ marginBottom: "1.6rem" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            Two worlds · one clinical standard
          </p>
          <h2 id="frontdoor-gate-heading" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "22ch", lineHeight: 1.12 }}>
            Built for your biology.
          </h2>
        </div>
        <Reveal>
          <div className="nx-wgate">
            {([
              { side: "her", world: "women", to: "/women", img: gateHer, pos: "50% 20%", eyebrow: "Peptides built for women", label: "For her.", feel: "How you want to feel has a biology.", testId: "frontdoor-women" },
              { side: "him", world: "men", to: "/men", img: gateHim, pos: "50% 22%", eyebrow: "Peptides built for men", label: "For him.", feel: "The strongest version of you is measurable.", testId: "frontdoor-men" },
            ] as const).map((w) => (
              <Link
                key={w.to}
                href={w.to}
                className={`nx-wgate-panel ${w.side}`}
                data-world={w.world}
                data-testid={w.testId}
                aria-label={w.side === "her" ? "Enter the women's experience" : "Enter the men's experience"}
              >
                <img src={w.img} alt="" aria-hidden loading="lazy" width={1600} height={2000} style={{ objectPosition: w.pos }} />
                <div className="nx-wgate-scrim" aria-hidden />
                <div className="nx-wgate-copy">
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "color-mix(in srgb, var(--nx-ceramic) 85%, transparent)" }}>
                    {w.eyebrow}
                  </p>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.02, letterSpacing: "-0.015em", color: "var(--nx-ceramic)", marginTop: "0.5rem" }}>
                    {w.label}
                  </p>
                  <p style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-body)", lineHeight: 1.45, color: "color-mix(in srgb, var(--nx-ceramic) 92%, transparent)", marginTop: "0.55rem", maxWidth: "30ch" }}>
                    {w.feel}
                  </p>
                  <span className="nx-wgate-arrow" aria-hidden style={{ marginTop: "1.1rem" }}>
                    <ArrowRight size={20} strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ 1.5 · POSITIONING BAND (ROADMAP 8.2) — the register, stated once ══ */}
      <section aria-labelledby="frontdoor-positioning" style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)", padding: "var(--nx-sp-band) 0" }}>
        <div className="nx-container" style={{ textAlign: "center" }}>
          <h2 id="frontdoor-positioning" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-fg)", lineHeight: 1.08, letterSpacing: "-0.015em", maxWidth: "20ch", margin: "0 auto" }} data-testid="frontdoor-positioning">
            A protocol. <em style={{ color: "var(--nx-cobalt)" }}>Not a purchase.</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "56ch", margin: "1.1rem auto 0" }}>
            Nothing here is bought from a shelf. You bring a goal; a licensed physician brings
            judgment; your bloodwork decides. That is the entire model.
          </p>
        </div>
      </section>

      {/* ══ 1.6 · THREE PILLARS (ROADMAP 8.2) — what the model is made of ══ */}
      <section className="nx-container" aria-label="What the model is made of" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }}>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 18 }} data-testid="frontdoor-pillars">
          {[
            {
              t: "Medical-grade, compounded",
              b: "Compounded in state-licensed U.S. 503A pharmacies and shipped cold-chain. The compound you receive is the compound prescribed.",
            },
            {
              t: "A physician on every file",
              b: "Board-certified physicians review every intake against your bloodwork — and decline what your numbers don't support.",
            },
            {
              t: "Measured every 90 days",
              b: "The same panel, drawn again each quarter. Protocols continue on evidence, not momentum.",
            },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 60}>
              <div style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-lg)", padding: "clamp(1.4rem,3vw,1.9rem)", height: "100%" }}>
                <p aria-hidden style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", color: "var(--nx-cobalt)" }}>0{i + 1}</p>
                <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "0.5rem", lineHeight: 1.15 }}>{p.t}</h3>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", marginTop: "0.6rem" }}>{p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 3 · GOALS — what people come here for ══ */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)" }}>
            Start from the goal.
          </h2>
          <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            The complete catalog →
          </Link>
        </div>
        {/* Hims-style goal tiles (option B) — same anatomy as the world homes */}
        <div className="nx-goalgrid grid grid-cols-2 lg:grid-cols-4" style={{ gap: 12, marginTop: "1.6rem" }}>
          {GOAL_TILES.map(({ cat, img }, i) => (
            <Reveal key={cat} delay={i * 50}>
              <Link href={`/goals/${cat}`} className="nx-art-tile" data-testid={`frontdoor-goal-${cat}`}>
                <img src={img} srcSet={outcomeSrcSet(img)} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" alt="" aria-hidden loading="lazy" width={1632} height={2048} />
                <div className="nx-art-chip">
                  <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", lineHeight: 1.15 }}>
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <p style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-sm)", lineHeight: 1.35, color: "var(--nx-cobalt)", marginTop: "0.2rem" }}>
                    {CATEGORY_FEELING[cat]}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto", paddingTop: "0.6rem" }}>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
                      {countFor(cat)} {countFor(cat) === 1 ? "protocol" : "protocols"}
                    </p>
                    <ArrowRight size={15} strokeWidth={2.2} aria-hidden style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 3.5 · WHAT IS A PEPTIDE (ROADMAP 8.2) — the metaphor, ours ══ */}
      <section className="nx-container" aria-labelledby="frontdoor-education" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]" style={{ gap: "clamp(1.8rem,4vw,3rem)", alignItems: "center", background: "var(--nx-ceramic)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-lg)", padding: "var(--nx-sp-band)" }} data-testid="frontdoor-education">
          <div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
              Before anything else
            </p>
            <h2 id="frontdoor-education" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", marginTop: "0.8rem", lineHeight: 1.12, maxWidth: "18ch" }}>
              What is a peptide?
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.7, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "54ch" }}>
              Peptides are short chains of amino acids — the same building blocks as protein —
              shaped to fit receptors your cells already carry. Think of them as keys your body
              once cut for itself: a signal to repair, to release, to settle. A protocol selects
              the keys. Your bloodwork proves the doors opened.
            </p>
            <Link href="/science" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.1rem" }}>
              The science, in depth →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { t: "Amino-acid chains", b: "Biology's native signal language — not a synthetic stimulant." },
              { t: "Signals, not overrides", b: "They ask cells to do what cells already know how to do." },
              { t: "Prescription-only here", b: "Physician-prescribed, 503A-compounded, lab-monitored." },
            ].map((c) => (
              <div key={c.t} style={{ background: "var(--nx-bg)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)", padding: "0.95rem 1.15rem" }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)" }}>{c.t}</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.2rem" }}>{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3.6 · THE PATH, WITH THE FINE PRINT UP FRONT (ROADMAP 8.2) ══ */}
      <section className="nx-container" aria-labelledby="frontdoor-steps" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }}>
        <h2 id="frontdoor-steps" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.12 }}>
          How it works — fine print first.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 14, marginTop: "1.6rem" }} data-testid="frontdoor-steps">
          {[
            { n: "01", t: "Tell us the goal", b: "A structured assessment — about two minutes." },
            { n: "02", t: "Draw the panel", b: "A partner-laboratory requisition, drawn near you." },
            { n: "03", t: "A physician decides", b: "Board-certified review of your labs and history. Declines happen." },
            { n: "04", t: "Compounded, shipped, retested", b: "503A-compounded, cold-chain shipped, re-measured every 90 days." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 55}>
              <div style={{ border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)", padding: "1.15rem 1.25rem", height: "100%", background: "var(--nx-bg)" }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", color: "var(--nx-cobalt)" }}>{s.n}</p>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", marginTop: "0.45rem" }}>{s.t}</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.35rem" }}>{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {/* The footnotes ARE the trust — stated before anyone asks. All TRUE. */}
        <div style={{ marginTop: "1.1rem", display: "flex", flexDirection: "column", gap: 6 }} data-testid="frontdoor-fineprint">
          <PrescribedPromise testid="frontdoor-steps-promise" />
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: 0 }}>
            * If the physician declines, nothing is compounded and nothing is billed.
          </p>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: 0 }}>
            * Prices are monthly equivalents; 12-month plans include the blood panel.
          </p>
        </div>
      </section>

      {/* ══ 4 · PROOF — the physician and the process ══ */}
      <HomeTrust />

      {/* ══ 5 · THE PANEL — living texture ══ */}
      <section aria-label="Biomarkers we measure" style={{ paddingTop: "0", paddingBottom: "0" }}>
        <div className="nx-container" style={{ marginBottom: "1.1rem" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
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
      <section className="nx-gradient-hero-dark" style={{ padding: "var(--nx-sp-sec) 0", overflow: "hidden", marginTop: "clamp(3rem,5.5vw,4.5rem)" }}>
        <div className="nx-container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-acid)" }}>
            One number a month
          </p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "24ch", margin: "0.9rem auto 0", lineHeight: 1.1 }}>
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
