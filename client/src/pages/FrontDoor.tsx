/* ═══ FRONT DOOR — the homepage, rebuilt to docs/DESIGN-PACKAGE.md (2026-09-01)

   One premise, "measured": you start on your doctor's read of your
   questionnaire, and at week 12 a full blood panel sets the dose again. The hero performs it
   in footage, the checklist proves it in buyers' words, the hold performs it
   by hand, and the closer restates it. Every section funnels to one anchor:
   the assessment. Copy below is verbatim from the package; change it there. */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { PhotoHero } from "@/components/PhotoHero";
import { HoldToRun } from "@/components/HoldToRun";
import { SectionLine } from "@/components/SectionLine";
import { GoalPicker } from "@/components/GoalPicker";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import coldBox from "@/assets/life/cold-box.webp";
import coldBox800 from "@/assets/life/cold-box-800.webp";
import { useSeo, webPageJsonLd, orgJsonLd, websiteJsonLd, medicalBusinessJsonLd, faqJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { ArrowRight } from "lucide-react";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { peptides, type PeptideCategory } from "@/data/peptides";
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

/* The price floor: lowest priced launch SKU at the 12-month cadence, derived. */
const PRICED = SOLO_CATALOG.filter((s) => s.pricing);
const FLOOR = PRICED.length ? Math.min(...PRICED.map((s) => s.pricing!.m12)) : NaN;

const CHECKLIST = [
  ["Your own doctor.", "A named, state-licensed physician reads your file and signs your prescription."],
  ["Your own batch.", "Made for you in a licensed U.S. 503A pharmacy, batch documented, shipped cold."],
  ["Your blood, read at week 12.", `A full panel of ${PANEL_TOTAL_MARKERS} markers, included, drawn at week 12 and read by your doctor.`],
  ["Your dose, adjusted from it.", "Your doctor continues, adjusts or stops from what your blood shows. Every change has a number behind it."],
] as const;

const STEPS = [
  ["Choose your plan.", "Pick the peptide and the plan length, and check out. Two minutes."],
  ["Answer the questionnaire.", "Your health, your history, your goal, and the screens that matter for your peptide. All of it goes to a U.S. licensed doctor."],
  ["Your doctor decides. Then it ships.", "If it fits you, your prescription goes to a licensed 503A pharmacy, is made for you, and ships cold. At week 12 a full blood panel, included, shows your doctor what changed, and your dose follows it."],
] as const;

const FAQ = [
  { q: "Is this legit?", a: "Yes. A named, U.S. licensed doctor reviews your questionnaire and signs every prescription. Your medication is made for you in a licensed 503A pharmacy and shipped cold. At week 12 your blood is drawn and read." },
  { q: "Do I actually talk to a doctor?", a: `Yes. A doctor reads your full intake and your ${PANEL_TOTAL_MARKERS}-marker panel and makes the call. Your dose is reviewed at every retest.` },
  { q: "Do I need bloodwork?", a: "Yes, at week 12. You start first. Then a full panel, drawn at a lab near you and included in your plan, shows your doctor what changed, so your dose follows your numbers." },
  { q: "What if the doctor says no?", a: "Then nothing is made. Some questionnaires end there, and the refund policy sets out what is refunded." },
  { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
  { q: "How is it shipped?", a: "Cold, in a plain package, to your door in all 50 states." },
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
    title: "Nexphoria: your body, your numbers, your plan",
    description:
      `Prescription peptides, made for you: a U.S. doctor writes your plan from your questionnaire, a licensed U.S. pharmacy makes it, it ships cold, and at week 12 a full blood panel of ${PANEL_TOTAL_MARKERS} markers shows what changed.${Number.isFinite(FLOOR) ? ` From ${usd(FLOOR)}/mo.` : ""}`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria", description: "Your body. Your numbers. Your plan. Prescription peptides built around your blood test.", path: "/" }),
      faqJsonLd(FAQ),
    ],
  });

  const countFor = (c: PeptideCategory) => peptides.filter((p) => p.category === c).length;

  return (
    <SiteLayout navVariant="showcase" hideTrustBar hideAnnouncementBar>
      <div className="nx-env" aria-hidden="true" />

      {/* ══ 1 · THE HERO — the morning photograph, the you voice ══ */}
      <PhotoHero />

      {/* ══ 2 · START WITH YOUR GOAL — three photographed doors into the assessment ══ */}
      <section className="nx-container" aria-labelledby="fd-goals" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Start with your goal</p>
          <h2 id="fd-goals" style={{ ...h2, maxWidth: "20ch" }}>What do you want help with?</h2>
        </Reveal>
        <GoalPicker counts={{ metabolic: countFor("metabolic"), growth: countFor("growth"), "sexual-health": countFor("sexual-health") }} />
      </section>

      <SectionLine />

      {/* ══ 6.1 · THE CHECKLIST — proof, in buyers' own words ══ */}
      <section className="nx-container" aria-labelledby="fd-checklist">
        <Reveal>
          <p style={kicker}>What you get</p>
          <h2 id="fd-checklist" style={{ ...h2, maxWidth: "22ch" }}>Four things to expect from a real clinic. You get all four.</h2>
        </Reveal>
        <ol className="nx-check-grid" data-testid="frontdoor-checklist">
          {CHECKLIST.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80}>
              <li className="nx-check-item">
                <span className="nx-check-n" aria-hidden="true" style={{ fontFamily: F }}>0{i + 1}</span>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", lineHeight: 1.2, color: "var(--nx-fg)", margin: 0 }}>{t}</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", margin: "0.5rem 0 0" }}>
                  {i === 2 ? (
                    <>
                      A full panel of <AnimatedCounter value={PANEL_TOTAL_MARKERS} duration={1.4} className="nx-count" /> markers, included, drawn at week 12 and read by your doctor.
                    </>
                  ) : b}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: "clamp(1.6rem,3vw,2.4rem)", maxWidth: "48ch" }}>
            That is the whole model. It is also how you tell a real clinic from a website.
          </p>
          <Link href="/peptides-101" className="nx-text-link" data-testid="frontdoor-p101-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1rem", display: "inline-block" }}>
            New to peptides? Start with Peptides 101
          </Link>
        </Reveal>
      </section>

      <SectionLine />

      {/* ══ 6.2 · THE FORMULARY — the four, with their real photographs ══ */}
      <section className="nx-container" aria-labelledby="fd-formulary">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <Reveal>
            <p style={kicker}>Your options</p>
            <h2 id="fd-formulary" style={{ ...h2, maxWidth: "24ch" }}>What each one does for you, and when you will know.</h2>
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
      </section>

      {/* ══ 6.25 · WHAT ARRIVES — the plain cold box ══ */}
      <section className="nx-arrives" aria-labelledby="fd-arrives">
        <div className="nx-container nx-arrives-grid">
          <Reveal className="nx-reveal-lift">
            <div className="nx-arrives-art">
              <img src={coldBox} srcSet={`${coldBox800} 800w, ${coldBox} 1600w`} sizes="(max-width: 860px) 100vw, 56vw" alt="An open plain white insulated box with ice packs and four vials" loading="lazy" decoding="async" width={1600} height={893} />
            </div>
          </Reveal>
          <Reveal>
            <p style={kicker}>What arrives</p>
            <h2 id="fd-arrives" style={{ ...h2, maxWidth: "14ch" }}>A plain box, cold, at your door.</h2>
            <ul className="nx-arrives-list">
              {[
                ["Your vials, made for you.", "Compounded to your prescription in a licensed U.S. 503A pharmacy, packed on ice."],
                ["Your dose and your schedule, in writing.", "Set by your doctor from your numbers, and reviewed again at your retest."],
                ["The outside is plain.", "The inside is yours. Delivered cold to all 50 states."],
              ].map(([t, b]) => (
                <li key={t}>
                  <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{t}</span>
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg-graphite)" }}>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <SectionLine />

      {/* ══ 6.3 · HOW IT WORKS — three steps, fine print in the open ══ */}
      <section aria-labelledby="fd-steps" className="nx-steps-band">
        <div className="nx-container">
          <Reveal>
            <p style={kicker}>How it works</p>
            <h2 id="fd-steps" style={{ ...h2, maxWidth: "22ch" }}>Three steps. Your doctor is in every one.</h2>
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
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: 0 }}>
              If your doctor says no, nothing is made. The refund policy sets out what is refunded.
            </p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: 0 }}>
              Prices are per month. Twelve-month plans include your blood panel.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 6.4 · THE INTERACTIVE MOMENT — hold to run the 90 days ══ */}
      <section className="nx-container nx-hold-section" aria-labelledby="fd-hold">
        <div className="nx-hold-copy">
          <Reveal>
            <p style={kicker}>Try it</p>
            <h2 id="fd-hold" style={{ ...h2, maxWidth: "14ch" }}>Hold to run your 12 weeks.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "40ch" }}>
              You start. At week 12 your blood is drawn and your doctor reads it. Your dose follows your numbers. Run it yourself.
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
          <p style={kicker}>Your price</p>
          <h2 id="fd-pricing" style={{ ...h2, maxWidth: "18ch" }}>One number a month. Everything within it.</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "58ch" }}>
            Your doctor, your medication, shipping and your week-12 blood panel are all inside the figure. Your doctor sets the dose. The price does not change with it.
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
        </Reveal>
      </section>

      <SectionLine />

      {/* ══ 6.6 · FAQ — the real objections, answered plainly ══ */}
      <section className="nx-container nx-faq-section" aria-labelledby="fd-faq">
        <Reveal>
          <p style={kicker}>Your questions</p>
          <h2 id="fd-faq" style={{ ...h2, maxWidth: "18ch" }}>What people ask before they start.</h2>
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
              Your numbers decide. Your doctor signs. Your plan.
            </h2>
            <Link href="/assessment" className="nx-cta-ceramic" data-testid="frontdoor-closer-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              Start your assessment
            </Link>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-acid) 78%, transparent)", marginTop: "0.9rem" }}>
              Two minutes to start.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
