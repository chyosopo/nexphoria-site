/* ═══ FRONT DOOR — the homepage, rebuilt to docs/DESIGN-PACKAGE.md (2026-09-01)

   One premise, "measured": you start on your doctor's read of your
   questionnaire, and at week 12 a full blood panel sets the dose again. The hero performs it
   in footage, the checklist proves it in buyers' words, the hold performs it
   by hand, and the closer restates it. Every section funnels to one anchor:
   the assessment. Copy below is verbatim from the package; change it there. */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { HeroR3 } from "@/components/HeroR3";
import { MenuRail } from "@/components/MenuRail";
import { ProtocolRail } from "@/components/ProtocolRail";
import { Stethoscope, FlaskConical, Microscope } from "lucide-react";
import vialLineup from "@/assets/brand/vial-lineup-master.webp";
import { HoldToRun } from "@/components/HoldToRun";
import { WaysIn } from "@/components/WaysIn";
import { RETEST_WEEK, BASELINE } from "@/data/monitoring";
import { SectionLine } from "@/components/SectionLine";
import { GoalPicker } from "@/components/GoalPicker";
import { liveConcerns, concernSkus } from "@/data/concerns";
import { CATEGORY_LABELS, LIVE_CATEGORIES } from "@/data/peptides";
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
  ["Physician review", "A licensed U.S. physician reviews your health questions and writes your prescription."],
  ["Your medication", "Made for you in a licensed U.S. pharmacy and shipped cold, in plain packaging."],
  ["Baseline blood kit, complimentary", "An at-home kit ships with your first order. You draw first, so your physician doses against your numbers."],
  [`Blood panel at week ${RETEST_WEEK}`, `${PANEL_TOTAL_MARKERS} markers, included. The same panel again, so you see what changed.`],
  ["Dose adjustments", "Your physician adjusts your dose from your results. The price stays the same."],
  ["One figure, paid up front", "One month to try it, or three, six or twelve months at a lower monthly figure. The figure is complete."],
] as const;

const STEPS = [
  ["Pick your treatment.", "Choose the medicine and plan that fit your goal, or answer a few questions and let a physician choose. Checkout takes two minutes."],
  ["Answer a few health questions.", "Your history, your medications and your goal. A licensed U.S. physician reviews every answer."],
  ["Test, then start.", `If it is right for you, your medication ships cold with a free baseline blood kit. Draw at home, start on your physician's dose, and retest at week ${RETEST_WEEK}.`],
] as const;

const FAQ = [
  { q: "Is this legitimate?", a: "Yes. Every prescription is written by a licensed U.S. physician, and your medication is made in a licensed U.S. pharmacy. Both are named on our FAQ page, with their addresses." },
  { q: "Do I need to see a doctor?", a: "Everything happens online. A licensed U.S. physician reviews your health questions, writes your prescription if it is right for you, and reads your baseline and your week-12 blood panel." },
  { q: "Is bloodwork required?", a: `Yes, and it is included. A free at-home blood kit of ${PANEL_TOTAL_MARKERS} markers ships with your first order, so your physician doses against your numbers. At week ${RETEST_WEEK} the same panel is drawn again, included, and your dose is adjusted from what changed.` },
  { q: "What if the physician says it is not right for me?", a: "Then you will hear why, and the refund policy explains what is refunded." },
  { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
  { q: "How is it shipped?", a: "Cold, in plain packaging, to all 50 states. A few states restrict compounded GLP-1 medication by law; the health questions check this first." },
  { q: "How is it billed?", a: "You buy a block of time, paid up front: one month to try it, or three, six or twelve months at 10, 15 or 20% less per month. Longer terms include more blood work. When your term ends, renewing is your choice." },
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
    title: "Nexphoria: prescription peptides, delivered to your door",
    description:
      `Semaglutide, tirzepatide, tesamorelin and PT-141, prescribed online by licensed U.S. physicians and made in a licensed U.S. pharmacy. One price, paid up front, with a free ${PANEL_TOTAL_MARKERS}-marker baseline blood kit on your first order and the same panel again at week ${RETEST_WEEK}.${Number.isFinite(FLOOR) ? ` From ${usd(FLOOR)}/mo.` : ""}`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria", description: "Prescription peptides for weight, strength and desire, prescribed online and delivered to your door.", path: "/" }),
      faqJsonLd(FAQ),
    ],
  });

  const countFor = (c: PeptideCategory) => peptides.filter((p) => p.category === c).length;

  return (
    <SiteLayout navVariant="showcase" hideTrustBar hideAnnouncementBar>
      <div className="nx-env" aria-hidden="true" />

      {/* ══ 1 · THE HERO — R3 grammar: photograph, glass card, four doors ══ */}
      <HeroR3 />

      {/* ══ 1.5 · THE TRUST ROW — three facts, one sentence ══ */}
      <section className="nx-container nx-trustrow" aria-label="What stands behind every order" data-testid="frontdoor-trustrow">
        <ul>
          {[
            [Stethoscope, "Licensed U.S. physicians"],
            [FlaskConical, "Made in a licensed U.S. pharmacy"],
            [Microscope, "Blood work before and after"],
          ].map(([Icon, t]) => {
            const I = Icon as typeof Stethoscope;
            return <li key={t as string} style={{ fontFamily: F }}><span className="nx-trustrow__i" aria-hidden="true"><I size={13} strokeWidth={2.2} /></span>{t as string}</li>;
          })}
        </ul>
        <p style={{ fontFamily: F }}>Prescription peptides, chosen with a physician and dosed against your own blood work. Every order is reviewed before anything is made, and the price is one figure, paid up front for the term you choose.</p>
      </section>

      {/* ══ 1.6 · THE MENU RAIL — every medicine, filtered by goal ══ */}
      <MenuRail photo="img/img_d489ea4e9dbc.webp" />

      {/* ══ 1.7 · THE PROTOCOL RAIL ══ */}
      <ProtocolRail />

      {/* ══ 1.8 · TWO DOORS — build your own, or let a physician choose ══ */}
      <section className="nx-container nx-promo" aria-label="Two ways in" data-testid="frontdoor-promo">
        <Link href="/stacks/build" className="nx-promo__card nx-promo__card--dark" data-testid="frontdoor-promo-build">
          <img src={skuTesamorelin} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1024} height={1024} />
          <div className="nx-promo__copy">
            <h2 style={{ fontFamily: S }}>Build your own plan.</h2>
            <p style={{ fontFamily: F }}>Choose the medicines, pick your term, check out. A licensed physician reviews it before anything is made.</p>
            <span className="nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }}>Start building <ArrowRight size={14} aria-hidden="true" /></span>
          </div>
        </Link>
        <Link href="/assessment" className="nx-promo__card nx-promo__card--light" data-testid="frontdoor-promo-assess">
          <img src={vialLineup} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1600} height={2000} />
          <div className="nx-promo__copy">
            <h2 style={{ fontFamily: S }}>Which treatment is right for you?</h2>
            <p style={{ fontFamily: F }}>Answer a few health questions. A licensed physician recommends a medicine or a protocol, and you decide.</p>
            <span className="nx-cta-acid nx-cta--sm" style={{ fontFamily: F }}>Get a recommendation <ArrowRight size={14} aria-hidden="true" /></span>
          </div>
        </Link>
      </section>

      {/* ══ 2 · START WITH YOUR GOAL — three photographed doors into the assessment ══ */}
      <section className="nx-container" aria-labelledby="fd-goals" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Your everyday support</p>
          <h2 id="fd-goals" style={{ ...h2, maxWidth: "20ch" }}>What can we help you with?</h2>
        </Reveal>
        <GoalPicker counts={Object.fromEntries(LIVE_CATEGORIES.map((c) => [c, countFor(c)]))} />
      </section>

      {/* ══ 2.5 · FIND YOUR TREATMENT — the concern, in the customer's words, and the medicine ══ */}
      <section className="nx-container" aria-labelledby="fd-concerns" style={{ paddingTop: "var(--nx-sp-band)" }}>
        <Reveal>
          <p style={kicker}>Find your treatment</p>
          <h2 id="fd-concerns" style={{ ...h2, maxWidth: "20ch" }}>Tell us what is going on. We will tell you what helps.</h2>
        </Reveal>
        <div className="nx-concern-grid" data-testid="frontdoor-concerns">
          {liveConcerns().map((c, i) => {
            const skus = concernSkus(c);
            return (
              <Reveal key={c.concern} delay={i * 40}>
                <Link href={`/goals/${c.goal}`} className="nx-concern-card" data-testid={`frontdoor-concern-${c.goal}-${i}`}>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.2, color: "var(--nx-fg)", margin: 0 }}>{c.concern}</p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: "0.5rem 0 0" }}>{c.line}</p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: "var(--nx-cobalt)", margin: "0.8rem 0 0" }}>
                    {skus.map((x) => x.name).join(" · ")}
                    {skus.some((x) => x.pricing) && <span style={{ fontWeight: 500, color: "var(--nx-fg-muted)" }}> · from {usd(Math.min(...skus.filter((x) => x.pricing).map((x) => x.pricing!.m12)))}/mo</span>}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ══ 2.75 · TWO WAYS IN, THEN THE ROAD — the playbook's journey ══ */}
      <section className="nx-container" aria-labelledby="fd-ways" style={{ paddingTop: "var(--nx-sp-band)" }}>
        <Reveal>
          <p style={kicker}>How you buy</p>
          <h2 id="fd-ways" style={{ ...h2, maxWidth: "20ch" }}>Two ways in. One road after.</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "58ch" }}>
            Choose for yourself, or let a physician choose for you. Either way you test before you start, and the same panel at week {RETEST_WEEK} shows what changed.
          </p>
        </Reveal>
        <Reveal delay={60}><WaysIn /></Reveal>
      </section>

      <SectionLine />

      {/* ══ 6.1 · THE CHECKLIST — proof, in buyers' own words ══ */}
      <section className="nx-container" aria-labelledby="fd-checklist">
        <Reveal>
          <p style={kicker}>What you get</p>
          <h2 id="fd-checklist" style={{ ...h2, maxWidth: "20ch" }}>Everything is included in one price.</h2>
        </Reveal>
        <ol className="nx-check-grid" data-testid="frontdoor-checklist">
          {CHECKLIST.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80}>
              <li className="nx-check-item">
                <span className="nx-check-n" aria-hidden="true" style={{ fontFamily: F }}>0{i + 1}</span>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", lineHeight: 1.2, color: "var(--nx-fg)", margin: 0 }}>{t}</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", margin: "0.5rem 0 0" }}>
                  {i === 3 ? (
                    <>
                      A full panel of <AnimatedCounter value={PANEL_TOTAL_MARKERS} duration={1.4} className="nx-count" /> markers, included. The same panel again, so you see what changed.
                    </>
                  ) : b}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: "clamp(1.6rem,3vw,2.4rem)", maxWidth: "48ch" }}>
            Your medication, your physician, and the blood work on both sides of it. One figure.
          </p>
          <Link href="/peptides-101" className="nx-text-link" data-testid="frontdoor-p101-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1rem", display: "inline-block" }}>
            New to peptides? Start with Peptides 101
          </Link>
        </Reveal>
      </section>

      <SectionLine />

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
            <h2 id="fd-arrives" style={{ ...h2, maxWidth: "16ch" }}>Delivered cold, in plain packaging.</h2>
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
            <h2 id="fd-steps" style={{ ...h2, maxWidth: "20ch" }}>Getting started is simple.</h2>
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
              Prices are the monthly figure, paid up front for the term. Every first order includes a free baseline blood kit; six and twelve months add the optimization panel.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 6.4 · THE INTERACTIVE MOMENT — hold to run the 90 days ══ */}
      <section className="nx-container nx-hold-section" aria-labelledby="fd-hold">
        <div className="nx-hold-copy">
          <Reveal>
            <p style={kicker}>What to expect</p>
            <h2 id="fd-hold" style={{ ...h2, maxWidth: "16ch" }}>Your first twelve weeks.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "40ch" }}>
              {BASELINE.line} Hold the button to see it play out.
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
          <h2 id="fd-pricing" style={{ ...h2, maxWidth: "18ch" }}>Simple monthly pricing.</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "58ch" }}>
            Your physician, your medication, shipping, your baseline blood kit and your week-12 panel are all inside the figure. Your physician sets the dose. The price stays the same.
          </p>
        </Reveal>
        <Reveal>
          <div className="nx-price-table" role="table" aria-label="Monthly figures by plan length" data-testid="frontdoor-pricing">
            <div className="nx-price-row nx-price-head" role="row">
              <span role="columnheader" style={{ fontFamily: F }}>Peptide</span>
              <span role="columnheader" style={{ fontFamily: F }}>1 month</span>
              <span role="columnheader" style={{ fontFamily: F }}>3 months</span>
              <span role="columnheader" style={{ fontFamily: F }}>6 months</span>
              <span role="columnheader" style={{ fontFamily: F }}>12 months</span>
            </div>
            {SOLO_CATALOG.map((s) => (
              <Link key={s.slug} href={`/peptides/${s.slug}`} className="nx-price-row" role="row" data-testid={`frontdoor-price-${s.slug}`}>
                <span role="cell" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{s.name}</span>
                {s.pricing ? (
                  <>
                    <span role="cell" className="nx-price-fig">{usd(s.pricing.m1)}<i>/mo</i></span>
                    <span role="cell" className="nx-price-fig">{usd(s.pricing.m3)}<i>/mo</i></span>
                    <span role="cell" className="nx-price-fig nx-price-best">{usd(s.pricing.m6)}<i>/mo</i></span>
                    <span role="cell" className="nx-price-fig">{usd(s.pricing.m12)}<i>/mo</i></span>
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
          <h2 id="fd-faq" style={{ ...h2, maxWidth: "18ch" }}>Questions? We have answers.</h2>
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
              Ready when you are.
            </h2>
            <Link href="/assessment" className="nx-cta-ceramic" data-testid="frontdoor-closer-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              Get started
            </Link>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-acid) 78%, transparent)", marginTop: "0.9rem" }}>
              Pick your treatment, answer a few health questions, and a licensed physician takes it from there.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
