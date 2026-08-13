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
import { useSeo, webPageJsonLd, orgJsonLd, websiteJsonLd, medicalBusinessJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { ArrowRight } from "lucide-react";
import { BIOMARKER_PANEL, PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { CATEGORY_LABELS, CATEGORY_FEELING, peptides, type PeptideCategory, liveCategories } from "@/data/peptides";
import { OUTCOME_CATEGORY, OUTCOME_STACK, outcomeSrcSet } from "@/data/outcomeImagery";
import { HeroTileRail, type RailTile } from "@/components/HeroTileRail";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { SOLO_FROM_LABEL } from "@/data/pricing";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { PhysicianGate } from "@/components/PhysicianProofBand";
import { RiseLines } from "@/components/Motion";
import { ProductShelf } from "@/components/ProductCard";
import { VialMockup, labelSpec } from "@/components/VialMockup";
/* Universal hero — couple on the morning trail (Bloom, C29 grammar). */
const HERO_ART = "img/img_82c3e3ceeecf.webp";

/* Neutral goal cast — mixed worlds on the shared front door.
   Filtered to goals with a sellable molecule behind them: four of the six
   listed here (recovery, skin, longevity, cognition) are retired, and their
   tiles led to /goals/<cat> pages with nothing in them — dead ends in the
   first viewport of the site's main entry, and one of the three paths
   audit:funnel reported broken. Imagery is kept per category so a returning
   goal keeps its art. */
const GOAL_TILE_ART: Partial<Record<PeptideCategory, string>> = {
  recovery: OUTCOME_CATEGORY.women.recovery!,
  growth: OUTCOME_CATEGORY.men.growth!,
  metabolic: OUTCOME_CATEGORY.men.metabolic!,
  skin: OUTCOME_CATEGORY.women.skin!,
  longevity: OUTCOME_CATEGORY.men.longevity!,
  cognition: OUTCOME_CATEGORY.women.cognition!,
  "sexual-health": OUTCOME_CATEGORY.women.longevity ?? OUTCOME_CATEGORY.men.longevity!,
};
const GOAL_TILES: { cat: PeptideCategory; img: string }[] = liveCategories([
  "recovery", "growth", "metabolic", "skin", "longevity", "cognition",
])
  .map((cat) => ({ cat, img: GOAL_TILE_ART[cat] ?? OUTCOME_CATEGORY.men.metabolic! }))
  .filter((t) => t.img);

// Goal tiles speak the goal's feeling line (ROADMAP 4.2) — one register per
// goal, shared with category heroes, catalog shelves, and the assessment.

/* Lowest real non-gated protocol per-month — derived, never hardcoded.
   Six of seven flagships are retired and the survivor (Ignite) is gated, so
   there is no ungated stack cadence left to reduce over. Math.min() of an
   empty list is Infinity, which would have rendered "from $Infinity" on the
   front door rather than failing loudly. Falls back to the solo catalog,
   which carries real prices, and the label follows what actually exists. */
const UNGATED_STACK_MONTHLY = FLAGSHIP_STACKS.filter((s) => !s.gated).flatMap((s) =>
  s.cadences.map((c) => c.perMonth ?? c.total),
);
const SOLO_MONTHLY = SOLO_CATALOG.filter((s) => !s.gated && s.pricing).map((s) => s.pricing!.m12);
const PROTOCOL_FROM = Math.min(...(UNGATED_STACK_MONTHLY.length ? UNGATED_STACK_MONTHLY : SOLO_MONTHLY));

/* The hero rail (hims grammar): six goals + two flagship protocols + the
   retest promise, all on existing Bloom photography and real prices. */
/* The rail previously carried the Wolverine and Glow protocol tiles plus goal
   links for recovery / skin / cognition. All of those are retired: the two
   stacks no longer exist on the shelf, and those categories have no sellable
   molecule behind them, so every one of those tiles was a dead end on the
   site's main entry point. It now shows only what the launch catalog can
   actually answer — the live goals, the panel, and the physician gate. */
const HERO_TILES: RailTile[] = [
  { img: OUTCOME_CATEGORY.men.metabolic!, label: CATEGORY_LABELS.metabolic, sub: CATEGORY_FEELING.metabolic, href: "/goals/metabolic", testid: "rail-metabolic" },
  { img: OUTCOME_CATEGORY.men.growth!, label: CATEGORY_LABELS.growth, sub: CATEGORY_FEELING.growth, href: "/goals/growth", testid: "rail-growth" },
  { img: HERO_ART, label: "Your bloodwork", sub: "Retested every 90 days.", href: "/bloodwork", testid: "rail-bloodwork" },
];

export default function FrontDoor() {
  useSeo({
    title: "Nexphoria — prescription peptides, built on your bloodwork",
    description:
      `Physician-prescribed peptide protocols: a ${PANEL_TOTAL_MARKERS}-marker panel, a licensed physician who reads it, state-licensed 503A compounding, and a 90-day retest. Protocols from ${usd(PROTOCOL_FROM)}/mo.`,
    path: "/",
    jsonLd: [
      // Identity graph — emitted once each on the site entry pages: who we are
      // (Organization), the site itself (WebSite), and the regulated business
      // (MedicalBusiness). Distinct @types, no duplication on the page.
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
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
      {/* ══ 1 · HERO — recomposed 2026-08-13 to the measured reference grammar.

          Was: a dense two-column split (copy left, an animated counter-scrolling
          photo rail right) over three blurred aurora discs. Every element
          competed, and the fold was ~100% full.

          Now: centred, one idea, with the fold deliberately mostly EMPTY.
          Atlas measured IvyRx heroes at 50–65% empty and Seed runs the same
          discipline — the confidence signal in this category is restraint, not
          density. Eye path is the one he recorded: credential chip → outcome
          headline → a single dark CTA. The photography moves BELOW the fold
          instead of fighting the sentence. ══ */}
      <section style={{ background: "var(--nx-bg)" }}>
        <div
          className="nx-container"
          style={{
            paddingTop: "clamp(5rem, 12vh, 9rem)",
            paddingBottom: "clamp(4rem, 10vh, 7.5rem)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Credential chip — first fixation, sits ABOVE the headline. Ours is
              a licence fact, not a star rating: we have no reviews and will not
              invent them. */}
          <p
            style={{
              fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600,
              letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase",
              color: "var(--nx-fg-muted)", border: "1px solid var(--nx-border)",
              borderRadius: "var(--nx-r-pill)", padding: "0.45rem 0.9rem",
              background: "var(--nx-ceramic)",
            }}
          >
            Prescribed by U.S.-licensed physicians
          </p>

          {/* Line-by-line rise. Break points are chosen typographically rather
              than left to container width, so the emphasis always lands on its
              own line. */}
          <RiseLines
            as="h1"
            delay={40}
            lines={[
              "Prescription peptides,",
              "built on",
              <em key="bw" style={{ color: "var(--nx-cobalt)" }}>your bloodwork.</em>,
            ]}
            style={{
              fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-giant)",
              lineHeight: 1.02, letterSpacing: "var(--nx-ls-display)",
              color: "var(--nx-fg)", maxWidth: "15ch", margin: "1.6rem 0 0",
            }}
          />

          <p
            style={{
              fontFamily: F, fontSize: "var(--nx-t-lg)", lineHeight: 1.55,
              color: "var(--nx-fg-graphite)", maxWidth: "52ch", margin: "1.5rem 0 0",
            }}
          >
            A {PANEL_TOTAL_MARKERS}-marker panel, a physician who reads it, and a retest
            every 90 days that decides what happens next.
          </p>

          {/* ONE action. The secondary route is a text link, not a second button. */}
          <div style={{ marginTop: "2.4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/assessment"
              data-testid="frontdoor-hero-cta"
              className="nx-cta-cobalt"
              style={{ fontSize: "var(--nx-t-base)", padding: "16px 34px" }}
            >
              Start your assessment
            </Link>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", margin: 0 }}>
              Two minutes · billed only if a physician prescribes
            </p>
          </div>
        </div>

        {/* Photography below the statement, not beside it. */}
        <div className="nx-container" style={{ paddingBottom: "var(--nx-sp-sec)" }}>
          <HeroTileRail tiles={HERO_TILES} testid="frontdoor-rail" />
        </div>
      </section>

      {/* ══ 1.4 · THE HER/HIM GATE — REMOVED 2026-08-13 with the two-worlds
          split. It was a full-bleed cinematic panel reading "Two worlds · one
          clinical standard", linking to /women and /men — both of which now
          redirect to this page. Left in place it would have been the second
          thing a visitor saw, offering a choice that no longer exists and
          pointing at its own URL. The standalone /gate route is untouched. ══ */}

      {/* ══ 1.45 · THE FORMULARY — what you can actually buy.

          Added 2026-08-13. The product row lived on the per-world homes, so
          deleting the two-worlds split took every product card off the front
          door: the home page showed goal tiles, a panel, a process and a price
          claim, but not one thing you could buy. The reference puts priced
          product cards on its home page and so should we.

          Uses the shared ProductShelf so this is the SAME block the catalog
          renders — one card grammar, not a second implementation. ══ */}
      <section className="nx-container" aria-labelledby="frontdoor-formulary" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "clamp(1.2rem,2.5vw,1.8rem)" }}>
          <div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
              The formulary
            </p>
            <h2 id="frontdoor-formulary" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, letterSpacing: "var(--nx-ls-snug)", marginTop: "0.6rem", maxWidth: "20ch" }}>
              Everything a physician can prescribe here.
            </h2>
          </div>
          <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            The complete catalog →
          </Link>
        </div>
        <ProductShelf skus={SOLO_CATALOG} testId="frontdoor-formulary-shelf" />
      </section>

      {/* ══ 1.47 · WHAT ARRIVES — the object, on the dark.

          The formulary above sells the outcome; this sells the thing in the
          box. Reference sites put a rendered product shot here, and ours is a
          drawn one — but drawn to be looked at rather than to fill a slot, and
          it carries the real molecule and the real concentration off the
          catalog, so a vial can never print a spec the PDP disagrees with.

          Also the site's SECOND dark band. The reference alternates light and
          dark to give a long page a spine; we had one dark band (the closer)
          and a long unbroken light run before it. ══ */}
      <section
        className="nx-gradient-hero-dark"
        aria-labelledby="frontdoor-arrives"
        style={{ padding: "var(--nx-sp-sec) 0", overflow: "hidden", marginTop: "var(--nx-sp-band)" }}
      >
        <div className="nx-container">
          <div style={{ textAlign: "center", maxWidth: "48ch", margin: "0 auto clamp(2rem,4vw,3.2rem)" }}>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-acid)" }}>
              What arrives
            </p>
            <h2 id="frontdoor-arrives" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", lineHeight: 1.1, letterSpacing: "var(--nx-ls-snug)", marginTop: "0.6rem" }}>
              A sealed vial, a named physician, a dose you can read.
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-acid) 82%, transparent)", marginTop: "0.9rem" }}>
              Compounded by a licensed United States pharmacy, shipped cold, labelled with your
              name and the physician who signed for it. One number a month. Everything within it.
            </p>
          </div>

          <div className="nx-vial-row">
            {SOLO_CATALOG.slice(0, 3).map((s) => (
              <div key={s.slug} className="nx-vial-cell">
                <VialMockup
                  name={s.name}
                  dose={labelSpec(s.spec)}
                  size="clamp(210px, 30vw, 330px)"
                  fill={0.58}
                  onDark
                  testId={`frontdoor-vial-${s.slug}`}
                />
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-ceramic)", marginTop: "0.9rem" }}>
                  {s.name}
                </p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-acid) 82%, transparent)", marginTop: "0.2rem" }}>
                  {s.spec}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-acid) 82%, transparent)", textAlign: "center", marginTop: "clamp(1.8rem,3.5vw,2.6rem)" }}>
            Illustrative. Prescription only · dispensed if prescribed after physician review.
          </p>
        </div>
      </section>

      {/* ══ 1.5 · POSITIONING BAND (ROADMAP 8.2) — the register, stated once ══ */}
      <section aria-labelledby="frontdoor-positioning" style={{ background: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)", padding: "var(--nx-sp-sec) 0" }}>
        <div className="nx-container" style={{ textAlign: "center" }}>
          <h2 id="frontdoor-positioning" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-fg)", lineHeight: 1.08, letterSpacing: "var(--nx-ls-snug)", maxWidth: "20ch", margin: "0 auto" }} data-testid="frontdoor-positioning">
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
