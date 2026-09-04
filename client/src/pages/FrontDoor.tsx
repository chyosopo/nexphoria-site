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
import { Check } from "lucide-react";
import { SpineStrip } from "@/components/SpineStrip";
import { ROAD } from "@/data/spine";
import { LabKitBox } from "@/components/LabKitBox";
import { LAB_KIT } from "@/data/labs";
import { RETEST_WEEK, BASELINE } from "@/data/monitoring";
import { SectionLine } from "@/components/SectionLine";
import { GoalPicker } from "@/components/GoalPicker";
import { CATEGORY_LABELS, LIVE_CATEGORIES } from "@/data/peptides";
import { useSeo, webPageJsonLd, orgJsonLd, websiteJsonLd, medicalBusinessJsonLd, faqJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { ArrowRight } from "lucide-react";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { peptides, type PeptideCategory } from "@/data/peptides";
import { usd } from "@/data/stacksCatalog";
import { SOLO_CATALOG, type SoloPeptide } from "@/data/soloCatalog";

/* The price floor: lowest priced launch SKU at the 12-month cadence, derived. */
const PRICED = SOLO_CATALOG.filter((s) => s.pricing);
const FLOOR = PRICED.length ? Math.min(...PRICED.map((s) => s.pricing!.m12)) : NaN;

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

export default function FrontDoor() {
  useSeo({
    title: "Nexphoria: peptide therapy, done properly",
    description:
      `A licensed physician sets your dose against your own blood work. Semaglutide, tirzepatide, testosterone, PT-141 and the full peptide menu, made in a licensed U.S. pharmacy. One figure covers all of it.${Number.isFinite(FLOOR) ? ` From ${usd(FLOOR)}/mo.` : ""}`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria", description: "Prescription peptide therapy, prescribed online and dosed against your own blood work.", path: "/" }),
      faqJsonLd(FAQ),
    ],
  });

  const countFor = (c: PeptideCategory) => peptides.filter((p) => p.category === c).length;

  return (
    <SiteLayout navVariant="showcase" hideTrustBar hideAnnouncementBar>
      <div className="nx-env" aria-hidden="true" />

      {/* ══ 01 · LAND — the claim, one action, four doors ══ */}
      <HeroR3 />
      <SpineStrip stop={1} testId="frontdoor-spine" />

      {/* ══ 02 · CHOOSE — eight goals; each names its medicines ══ */}
      <section className="nx-container" aria-labelledby="fd-goals" style={{ paddingTop: "var(--nx-sp-sec)", scrollMarginTop: 96 }} id="fd-goals-anchor">
        <Reveal>
          <p style={kicker}>Choose</p>
          <h2 id="fd-goals" style={{ ...h2, maxWidth: "20ch" }}>What can we help you with?</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "56ch" }}>
            Start with the goal. Each one names the medicines a physician can prescribe for it, what they do, and what to expect.
          </p>
        </Reveal>
        <GoalPicker counts={Object.fromEntries(LIVE_CATEGORIES.map((c) => [c, countFor(c)]))} />
      </section>

      {/* ══ 02 · THE MENU — every medicine and protocol, in one band ══ */}
      <MenuRail photo="img/img_d489ea4e9dbc.webp" />

      {/* ══ 03 → 06 · WHAT HAPPENS — the road, once ══ */}
      <section className="nx-container" aria-labelledby="fd-road" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>What happens</p>
          <h2 id="fd-road" style={{ ...h2, maxWidth: "18ch" }}>Five steps, in order. Then it repeats.</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "56ch" }}>
            You choose. A physician decides. You test before you start, and again at week 12, so every dose answers to a number.
          </p>
        </Reveal>
        <Reveal><ol className="nx-road" aria-label="The road" data-testid="frontdoor-road" style={{ marginTop: "clamp(1.6rem,3vw,2.4rem)" }}>
          {ROAD.map((r, i) => (
            <li key={r.t} className="nx-road__step nx-stagger-item" style={{ ["--i" as string]: i }}>
              <span className="nx-road__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <p className="nx-road__t" style={{ fontFamily: S }}>{r.t}</p>
              <p className="nx-road__b" style={{ fontFamily: F }}>{r.b}</p>
            </li>
          ))}
        </ol></Reveal>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "1rem" }}>
          If the physician says no, nothing is made, and the refund policy sets out what is refunded.{" "}
          <Link href="/how-it-works" className="nx-text-link" style={{ fontWeight: 600 }}>The whole road, step by step</Link>
        </p>
      </section>

      {/* ══ 06 · AFTER — blood work is the proof ══ */}
      <section className="nx-container" aria-labelledby="fd-blood" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <div className="nx-blood">
          <Reveal className="nx-reveal-scale">
            <div className="nx-labs-art"><LabKitBox markers={LAB_KIT.markers} name={LAB_KIT.short} /></div>
          </Reveal>
          <Reveal delay={60}>
            <p style={kicker}>Blood work</p>
            <h2 id="fd-blood" style={{ ...h2, maxWidth: "16ch" }}>You test before you start.</h2>
            <ul className="nx-blood__lines">
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>A kit ships with your first order.</strong> {LAB_KIT.markers} markers, drawn at home, complimentary.</span></li>
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>Your physician doses against your numbers.</strong> The first dose answers to the panel, never to a guess.</span></li>
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>The same panel again at week {RETEST_WEEK}.</strong> Baseline beside retest, marker by marker, with your physician's note.</span></li>
            </ul>
            <Link href="/labs" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.2rem", display: "inline-block" }} data-testid="frontdoor-labs-link">See every marker, and the add-on tests</Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 04 · DECIDE — the figure ══ */}
      <section className="nx-container" aria-labelledby="fd-pricing" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>The figure</p>
          <h2 id="fd-pricing" style={{ ...h2, maxWidth: "18ch" }}>One figure. Everything within it.</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "58ch" }}>
            The medicine, the physician, cold shipping, the baseline kit and the week-{RETEST_WEEK} panel. Paid once for the term you choose. Your dose can change; the figure does not.
          </p>
        </Reveal>
        <Reveal>
          <div className="nx-price-table" role="table" aria-label="Monthly figures by term" data-testid="frontdoor-pricing">
            <div className="nx-price-row nx-price-head" role="row">
              <span role="columnheader" style={{ fontFamily: F }}>Medicine</span>
              <span role="columnheader" style={{ fontFamily: F }}>1 month</span>
              <span role="columnheader" style={{ fontFamily: F }}>3 months</span>
              <span role="columnheader" style={{ fontFamily: F }}>6 months</span>
              <span role="columnheader" style={{ fontFamily: F }}>12 months</span>
            </div>
            {SOLO_CATALOG.slice(0, 8).map((s) => (
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
            <Link href="/pricing" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }} data-testid="frontdoor-pricing-all">Every medicine and protocol, priced</Link>
            <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>Monthly figures, paid up front for the term. Six months is the best value.</span>
          </div>
        </Reveal>
      </section>

      {/* ══ QUESTIONS ══ */}
      <section className="nx-container nx-faq-section" aria-labelledby="fd-faq">
        <Reveal>
          <p style={kicker}>Questions</p>
          <h2 id="fd-faq" style={{ ...h2, maxWidth: "18ch" }}>Asked plainly, answered plainly.</h2>
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

      {/* ══ THE CLOSER ══ */}
      <section className="nx-gradient-hero-dark nx-closer" aria-labelledby="fd-closer">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 id="fd-closer" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-display)", maxWidth: "20ch", margin: "0 auto", textWrap: "balance" }}>
              Start with the goal.
            </h2>
            <a href="#fd-goals" className="nx-cta-ceramic" data-testid="frontdoor-closer-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              Choose a goal
            </a>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-ceramic) 70%, transparent)", marginTop: "0.9rem" }}>
              Prescription only, if a licensed physician determines it is appropriate for you.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
