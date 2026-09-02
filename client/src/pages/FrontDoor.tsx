/* ═══ FRONT DOOR — the homepage, rebuilt to docs/DESIGN-PACKAGE.md (2026-09-01)

   One premise, "measured": a dose set from a 99-marker panel a doctor reads
   first, and set again from the same panel at 90 days. The hero performs it
   in footage, the checklist proves it in buyers' words, the hold performs it
   by hand, and the closer restates it. Every section funnels to one anchor:
   the assessment. Copy below is verbatim from the package; change it there. */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { ScrubHero } from "@/components/ScrubHero";
import { HoldToRun } from "@/components/HoldToRun";
import { SectionLine } from "@/components/SectionLine";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { useSeo, webPageJsonLd, orgJsonLd, websiteJsonLd, medicalBusinessJsonLd, faqJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { ArrowRight } from "lucide-react";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { CATEGORY_LABELS, CATEGORY_FEELING, peptides, type PeptideCategory, liveCategories } from "@/data/peptides";
import { OUTCOME_CATEGORY, outcomeSrcSet } from "@/data/outcomeImagery";
import { usd } from "@/data/stacksCatalog";
import { SOLO_CATALOG, type SoloPeptide } from "@/data/soloCatalog";
import skuTesamorelin from "@/assets/vials/sku-tesamorelin.webp";
import skuSemaglutide from "@/assets/vials/sku-semaglutide.webp";
import skuTirzepatide from "@/assets/vials/sku-tirzepatide.webp";
import skuPt141 from "@/assets/vials/sku-pt-141.webp";

/* One photograph per SKU, the actual vial. A SKU without a photo renders no
   image rather than borrowing a neighbour's: a vial is a claim about what
   arrives. */
const SKU_PHOTO: Record<string, string> = {
  tesamorelin: skuTesamorelin,
  semaglutide: skuSemaglutide,
  tirzepatide: skuTirzepatide,
  "pt-141": skuPt141,
};

/* Goal tiles: the two live goals with a sellable molecule behind them. Kept
   because the assessment funnel enters through them (audit:funnel). */
const GOAL_TILE_ART: Partial<Record<PeptideCategory, string>> = {
  growth: OUTCOME_CATEGORY.men.growth!,
  metabolic: OUTCOME_CATEGORY.men.metabolic!,
  "sexual-health": OUTCOME_CATEGORY.women.longevity ?? OUTCOME_CATEGORY.men.longevity!,
};
const GOAL_TILES = liveCategories(["metabolic", "growth", "sexual-health"])
  .map((cat) => ({ cat, img: GOAL_TILE_ART[cat] }))
  .filter((t): t is { cat: PeptideCategory; img: string } => !!t.img);

/* The price floor: lowest priced launch SKU at the 12-month cadence, derived. */
const PRICED = SOLO_CATALOG.filter((s) => s.pricing);
const FLOOR = PRICED.length ? Math.min(...PRICED.map((s) => s.pricing!.m12)) : NaN;

const CHECKLIST = [
  ["A licensed physician on record.", "A named, state-licensed doctor signs every prescription."],
  ["A 503A pharmacy.", "Your prescription is compounded for you, batch documented, in a licensed U.S. pharmacy."],
  ["Your labs, read first.", `A ${PANEL_TOTAL_MARKERS}-marker panel is drawn and reviewed before anything is prescribed.`],
  ["A retest on the calendar.", "The same panel again at 90 days, and the dose follows what it shows."],
] as const;

const STEPS = [
  ["Complete the assessment.", "Two minutes on your health, your history and your goal. It goes straight to a U.S. licensed physician."],
  ["Draw the panel.", `A ${PANEL_TOTAL_MARKERS}-marker panel at a CLIA-certified lab near you. Your physician reads the results.`],
  ["Start, and retest at 90 days.", "Your physician decides. If it fits, a 503A pharmacy compounds it and ships it cold. The same markers are drawn again at 90 days and the dose follows the data."],
] as const;

const FAQ = [
  { q: "Is this legit?", a: "Yes. A named, U.S. licensed physician reviews your intake and your labs and signs every prescription. The medication is compounded for you in a licensed 503A pharmacy and shipped cold. Your labs are drawn again at 90 days." },
  { q: "Do I actually talk to a doctor?", a: `A physician reads your full intake and your ${PANEL_TOTAL_MARKERS}-marker panel, and makes the call. You can message them through the portal, and your dose is reviewed at every retest.` },
  { q: "Do I need bloodwork?", a: "Yes, before anything is prescribed. It is drawn at a CLIA-certified lab near you, and it is inside the monthly figure. Without a baseline there is nothing to compare the retest against, and the retest is the point." },
  { q: "What if the doctor says no?", a: "Then nothing is compounded and nothing is billed. Some intakes end there, and that outcome carries no charge." },
  { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
  { q: "How is it shipped?", a: "Cold, in an unbranded package, to all 50 states." },
];

const kicker: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600,
  letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)",
};
const h2: React.CSSProperties = {
  fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)",
  lineHeight: 1.08, letterSpacing: "var(--nx-ls-tight)", marginTop: "0.7rem", textWrap: "balance",
};

function priceLine(s: SoloPeptide) {
  return s.pricing ? `from ${usd(s.pricing.m12)}/mo` : "Priced at consultation";
}

export default function FrontDoor() {
  useSeo({
    title: "Nexphoria: peptides, prescribed on your numbers",
    description:
      `Prescription peptides built on your bloodwork: a ${PANEL_TOTAL_MARKERS}-marker panel a U.S. physician reads first, a licensed 503A pharmacy, cold shipping, and the same panel again at 90 days.${Number.isFinite(FLOOR) ? ` From ${usd(FLOOR)}/mo.` : ""}`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria", description: "Prescription peptides, built on your bloodwork.", path: "/" }),
      faqJsonLd(FAQ),
    ],
  });

  const countFor = (c: PeptideCategory) => peptides.filter((p) => p.category === c).length;

  return (
    <SiteLayout navVariant="showcase" hideTrustBar>
      <div className="nx-env" aria-hidden="true" />

      {/* ══ 1 · THE HERO — the scroll-scrubbed shot ══ */}
      <ScrubHero />

      {/* ══ 6.1 · THE CHECKLIST — proof, in buyers' own words ══ */}
      <section className="nx-container" aria-labelledby="fd-checklist" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>What a real clinic has</p>
          <h2 id="fd-checklist" style={{ ...h2, maxWidth: "16ch" }}>Four things. We have all four.</h2>
        </Reveal>
        <ol className="nx-check-grid" data-testid="frontdoor-checklist">
          {CHECKLIST.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80}>
              <li className="nx-check-item">
                <span className="nx-check-n" aria-hidden="true" style={{ fontFamily: F }}>0{i + 1}</span>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", lineHeight: 1.2, color: "var(--nx-fg)", margin: 0 }}>{t}</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", margin: "0.5rem 0 0" }}>{b}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: "clamp(1.6rem,3vw,2.4rem)", maxWidth: "48ch" }}>
            That is the whole model. It is also the checklist people use to spot a real clinic.
          </p>
        </Reveal>
      </section>

      <SectionLine />

      {/* ══ 6.2 · THE FORMULARY — the four, with their real photographs ══ */}
      <section className="nx-container" aria-labelledby="fd-formulary">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <Reveal>
            <p style={kicker}>The formulary</p>
            <h2 id="fd-formulary" style={{ ...h2, maxWidth: "22ch" }}>What each one does, and when you will know.</h2>
          </Reveal>
          <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            The complete catalog <ArrowRight size={14} aria-hidden style={{ display: "inline", verticalAlign: "-2px" }} />
          </Link>
        </div>
        <div className="nx-sku-grid" data-testid="frontdoor-formulary">
          {SOLO_CATALOG.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70} className="nx-reveal-lift">
              <Link href={`/peptides/${s.slug}`} className="nx-sku-tile" data-testid={`frontdoor-sku-${s.slug}`}>
                {SKU_PHOTO[s.slug] && (
                  <div className="nx-sku-photo">
                    <img src={SKU_PHOTO[s.slug]} alt={`${s.name} vial`} width={1024} height={1024} loading="lazy" decoding="async" />
                  </div>
                )}
                <p style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.25, color: "var(--nx-fg)", margin: 0 }}>{s.outcome}</p>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: "0.6rem 0 0" }}>{s.name}</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: "0.25rem 0 0" }}>
                  <span className="nx-sku-mono">{s.timeline[0].wk}</span> {s.timeline[0].effect}
                </p>
                <p className="nx-sku-price" style={{ fontFamily: F }}>{priceLine(s)}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Or start from the goal: the assessment's second doorway. */}
        <div className="nx-goal-row" data-testid="frontdoor-goals">
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg-graphite)", margin: 0 }}>Or start from the goal</p>
          <div className="nx-goal-tiles">
            {GOAL_TILES.map(({ cat, img }) => (
              <Link key={cat} href={`/goals/${cat}`} className="nx-goal-tile" data-testid={`frontdoor-goal-${cat}`}>
                <img src={img} srcSet={outcomeSrcSet(img)} sizes="(max-width: 640px) 50vw, 25vw" alt="" aria-hidden loading="lazy" width={1632} height={2048} />
                <span className="nx-goal-chip">
                  <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", lineHeight: 1.15 }}>{CATEGORY_LABELS[cat]}</span>
                  <span style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-sm)", color: "var(--nx-cobalt)" }}>{CATEGORY_FEELING[cat]}</span>
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "auto" }}>
                    {countFor(cat)} {countFor(cat) === 1 ? "protocol" : "protocols"}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionLine />

      {/* ══ 6.3 · HOW IT WORKS — three steps, fine print in the open ══ */}
      <section aria-labelledby="fd-steps" className="nx-steps-band">
        <div className="nx-container">
          <Reveal>
            <p style={kicker}>How it works</p>
            <h2 id="fd-steps" style={{ ...h2, maxWidth: "22ch" }}>Three steps to a protocol built on your numbers.</h2>
          </Reveal>
          <ol className="nx-steps" data-testid="frontdoor-steps">
            {STEPS.map(([t, b], i) => (
              <Reveal key={t} delay={i * 90}>
                <li className="nx-step">
                  <span className="nx-step-n" aria-hidden="true" style={{ fontFamily: F }}>{i + 1}</span>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", lineHeight: 1.15, color: "var(--nx-fg)", margin: 0 }}>{t}</p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", margin: "0.6rem 0 0", maxWidth: "38ch" }}>{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div style={{ marginTop: "clamp(1.4rem,3vw,2rem)", display: "flex", flexDirection: "column", gap: 6 }} data-testid="frontdoor-fineprint">
            <PrescribedPromise testid="frontdoor-steps-promise" />
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: 0 }}>
              If the physician declines, nothing is compounded and nothing is billed.
            </p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: 0 }}>
              Prices are monthly figures. Twelve-month plans include the blood panel.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 6.4 · THE INTERACTIVE MOMENT — hold to run the 90 days ══ */}
      <section className="nx-container nx-hold-section" aria-labelledby="fd-hold">
        <div className="nx-hold-copy">
          <Reveal>
            <p style={kicker}>Try it</p>
            <h2 id="fd-hold" style={{ ...h2, maxWidth: "14ch" }}>Hold to run the 90 days.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "40ch" }}>
              A baseline panel, a physician's read, and the same panel again. The dose follows the data. Run it yourself.
            </p>
          </Reveal>
        </div>
        <Reveal className="nx-reveal-scale">
          <HoldToRun />
        </Reveal>
      </section>

      <SectionLine />

      {/* ══ 6.5 · PRICING — one number ══ */}
      <section className="nx-container" aria-labelledby="fd-pricing">
        <Reveal>
          <p style={kicker}>One number</p>
          <h2 id="fd-pricing" style={{ ...h2, maxWidth: "18ch" }}>One number a month. Everything within it.</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "58ch" }}>
            The consultation, the panel, the medication, the shipping and the 90-day retest are all inside the figure. Your physician sets the dose. The price does not change with it.
          </p>
        </Reveal>
        <Reveal>
          <div className="nx-price-table" role="table" aria-label="Monthly figures by plan length" data-testid="frontdoor-pricing">
            <div className="nx-price-row nx-price-head" role="row">
              <span role="columnheader" style={{ fontFamily: F }}>Peptide</span>
              <span role="columnheader" style={{ fontFamily: F }}>1 month</span>
              <span role="columnheader" style={{ fontFamily: F }}>3 months</span>
              <span role="columnheader" style={{ fontFamily: F }}>12 months</span>
            </div>
            {SOLO_CATALOG.map((s) => (
              <Link key={s.slug} href={`/peptides/${s.slug}`} className="nx-price-row" role="row" data-testid={`frontdoor-price-${s.slug}`}>
                <span role="cell" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{s.name}</span>
                {s.pricing ? (
                  <>
                    <span role="cell" className="nx-price-fig">{usd(s.pricing.m1)}<i>/mo</i></span>
                    <span role="cell" className="nx-price-fig">{usd(s.pricing.m3)}<i>/mo</i></span>
                    <span role="cell" className="nx-price-fig nx-price-best">{usd(s.pricing.m12)}<i>/mo</i></span>
                  </>
                ) : (
                  <span role="cell" className="nx-price-fig nx-price-span" style={{ fontFamily: F }}>Priced at consultation</span>
                )}
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <PrescribedPromise testid="frontdoor-pricing-promise" />
          </div>
        </Reveal>
      </section>

      <SectionLine />

      {/* ══ 6.6 · FAQ — the real objections, answered plainly ══ */}
      <section className="nx-container nx-faq-section" aria-labelledby="fd-faq">
        <Reveal>
          <p style={kicker}>Asked plainly</p>
          <h2 id="fd-faq" style={{ ...h2, maxWidth: "16ch" }}>The questions people actually ask.</h2>
        </Reveal>
        <div className="nx-faq-list" data-testid="frontdoor-faq">
          {FAQ.map((it, i) => (
            <Reveal key={it.q} delay={i * 50}>
              <details className="nx-faq-item" open={i === 0}>
                <summary>
                  <span>{it.q}</span>
                  <span className="nx-faq-plus" aria-hidden />
                </summary>
                <p className="nx-faq-a">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 6.7 · THE CLOSER ══ */}
      <section className="nx-gradient-hero-dark nx-closer" aria-labelledby="fd-closer">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 id="fd-closer" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-display)", maxWidth: "20ch", margin: "0 auto", textWrap: "balance" }}>
              Prescribed on your numbers. Reviewed on your numbers.
            </h2>
            <Link href="/assessment" className="nx-cta-ceramic" data-testid="frontdoor-closer-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              Start your assessment
            </Link>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-acid) 78%, transparent)", marginTop: "0.9rem" }}>
              Two minutes. Billed only if a physician prescribes.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
