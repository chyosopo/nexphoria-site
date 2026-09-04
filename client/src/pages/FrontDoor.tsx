/* ═══ FRONT DOOR — the homepage, to docs/COPY-DECK-PLAIN.md (2026-09-04)

   One premise, "measured": a licensed physician reviews your health
   history, prescribes if it is appropriate, and adjusts your dose from a
   blood test at week 12. The hero performs it in footage, the steps state
   it in order, the blood section shows the kit, and the closer restates
   it. Copy below is verbatim from the deck; change it there. */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { HeroR3 } from "@/components/HeroR3";
import { MenuRail } from "@/components/MenuRail";
import { Check } from "lucide-react";
import { ROAD } from "@/data/spine";
import { LabKitBox } from "@/components/LabKitBox";
import { LAB_KIT } from "@/data/labs";
import { RETEST_WEEK } from "@/data/monitoring";
import { GoalPicker } from "@/components/GoalPicker";
import { LIVE_CATEGORIES } from "@/data/peptides";
import { useSeo, webPageJsonLd, orgJsonLd, websiteJsonLd, medicalBusinessJsonLd, faqJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { peptides, type PeptideCategory } from "@/data/peptides";
import { usd } from "@/data/stacksCatalog";
import { SOLO_CATALOG } from "@/data/soloCatalog";

/* The price floor: lowest priced launch SKU at the 12-month cadence, derived. */
const PRICED = SOLO_CATALOG.filter((s) => s.pricing);
const FLOOR = PRICED.length ? Math.min(...PRICED.map((s) => s.pricing!.m12)) : NaN;

const FAQ = [
  { q: "Who prescribes it, and who makes it?", a: "Prescriptions are written by independent, U.S.-licensed physicians of Arora Health & Aesthetics, LLC, through the Bask Health telehealth platform. Medicines are compounded by VialsRX, a state-licensed 503A pharmacy in Houston, Texas. Both are listed with their addresses on the FAQ page." },
  { q: "Do I need to see a doctor?", a: `Everything happens online. A licensed U.S. physician reviews your health questions, writes your prescription if it is appropriate, and reads your blood test before your first dose and again at week ${RETEST_WEEK}.` },
  { q: "Is bloodwork required?", a: `Yes. An at-home blood kit of ${PANEL_TOTAL_MARKERS} markers ships with your first order, included.` },
  { q: "What if the physician says it is not right for me?", a: "Then you will hear why, and the refund policy explains what is refunded." },
  { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
  { q: "How is it shipped?", a: "Cold, in plain packaging, to all 50 states. Compounded GLP-1 medicines are restricted by law in some states; the health questions check." },
  { q: "How is it billed?", a: "One monthly price, paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. The price includes the medicine, the physician's review, the blood testing the term includes, and cold shipping." },
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
    title: "Nexphoria: prescription peptide therapy, with a physician and your blood work",
    description:
      `Twenty-two compounded peptide medicines for weight, body composition, recovery, sleep, focus, hormones and sexual health. A licensed U.S. physician reviews your health history, prescribes if it is appropriate, and adjusts your dose from a blood test at week ${RETEST_WEEK}. One monthly price covers the medicine, the physician and the blood work.${Number.isFinite(FLOOR) ? ` From ${usd(FLOOR)}/mo.` : ""}`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria", description: "Prescription peptide therapy, with a physician and your blood work.", path: "/" }),
      faqJsonLd(FAQ),
    ],
  });

  const countFor = (c: PeptideCategory) => peptides.filter((p) => p.category === c).length;

  return (
    <SiteLayout navVariant="showcase" hideTrustBar hideAnnouncementBar>
      <div className="nx-env" aria-hidden="true" />

      {/* ══ 01 · THE HERO — the claim, one action, four doors ══ */}
      <HeroR3 />

      {/* ══ 02 · GOALS — eight goals; each names its medicines ══ */}
      <section className="nx-container" aria-labelledby="fd-goals" style={{ paddingTop: "var(--nx-sp-sec)", scrollMarginTop: 96 }} id="fd-goals-anchor">
        <Reveal>
          <p style={kicker}>Goals</p>
          <h2 id="fd-goals" style={{ ...h2, maxWidth: "20ch" }}>What are you treating?</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "56ch" }}>
            Each goal lists the medicines a physician can prescribe for it, what each does, and what to expect.
          </p>
        </Reveal>
        <GoalPicker counts={Object.fromEntries(LIVE_CATEGORIES.map((c) => [c, countFor(c)]))} />
      </section>

      {/* ══ 03 · THE MEDICINES — every medicine and protocol, in one band ══ */}
      <MenuRail photo="img/img_d489ea4e9dbc.webp" />

      {/* ══ 04 · HOW IT WORKS — the five steps, once ══ */}
      <section className="nx-container" aria-labelledby="fd-road" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>How it works</p>
          <h2 id="fd-road" style={{ ...h2, maxWidth: "18ch" }}>Five steps.</h2>
        </Reveal>
        <Reveal><ol className="nx-road" aria-label="The five steps" data-testid="frontdoor-road" style={{ marginTop: "clamp(1.6rem,3vw,2.4rem)" }}>
          {ROAD.map((r, i) => (
            <li key={r.t} className="nx-road__step nx-stagger-item" style={{ ["--i" as string]: i }}>
              <span className="nx-road__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <p className="nx-road__t" style={{ fontFamily: S }}>{r.t}</p>
              <p className="nx-road__b" style={{ fontFamily: F }}>{r.b}</p>
            </li>
          ))}
        </ol></Reveal>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "1rem" }}>
          If the physician does not prescribe, nothing is made and the refund policy sets out what is refunded.{" "}
          <Link href="/how-it-works" className="nx-text-link" style={{ fontWeight: 600 }}>Every step in detail</Link>
        </p>
      </section>

      {/* ══ 05 · BLOOD TESTING — before the first dose, and again at week 12 ══ */}
      <section className="nx-container" aria-labelledby="fd-blood" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <div className="nx-blood">
          <Reveal className="nx-reveal-scale">
            <div className="nx-labs-art"><LabKitBox markers={LAB_KIT.markers} name={LAB_KIT.short} /></div>
          </Reveal>
          <Reveal delay={60}>
            <p style={kicker}>Blood testing</p>
            <h2 id="fd-blood" style={{ ...h2, maxWidth: "18ch" }}>A blood test before you start, and again at week {RETEST_WEEK}.</h2>
            <ul className="nx-blood__lines">
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>The kit ships with your first order.</strong> {LAB_KIT.markers} markers, drawn at home, included.</span></li>
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>Your physician sets your dose from the results.</strong></span></li>
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>At week {RETEST_WEEK} the same {LAB_KIT.markers} markers are tested again and compared.</strong></span></li>
            </ul>
            <Link href="/labs" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.2rem", display: "inline-block" }} data-testid="frontdoor-labs-link">Every marker, and the additional tests</Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 06 · PRICE — stated once, as a fact; the ladder lives on each product page ══ */}
      <section className="nx-container" aria-labelledby="fd-pricing" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Price</p>
          <h2 id="fd-pricing" style={{ ...h2, maxWidth: "18ch" }}>What it costs.</h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "58ch" }}>
            One monthly price, paid up front for a term of one, three, six or twelve months. It includes the medicine, the physician's review, the blood kit, the week-{RETEST_WEEK} test and cold shipping. Longer terms cost less per month.
          </p>
        </Reveal>
        <Reveal>
          <div className="nx-price-table" role="table" aria-label="Monthly prices by term" data-testid="frontdoor-pricing">
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
                    <span role="cell" className="nx-price-fig">{usd(s.pricing.m6)}<i>/mo</i></span>
                    <span role="cell" className="nx-price-fig">{usd(s.pricing.m12)}<i>/mo</i></span>
                  </>
                ) : (
                  <span role="cell" className="nx-price-fig nx-price-span" style={{ fontFamily: F }}>Priced at consultation</span>
                )}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
            <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }} data-testid="frontdoor-pricing-all">Every medicine, with its price</Link>
            <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>Monthly prices. Three months is 10% less per month, six 15%, twelve 20%.</span>
          </div>
        </Reveal>
      </section>

      {/* ══ QUESTIONS ══ */}
      <section className="nx-container nx-faq-section" aria-labelledby="fd-faq">
        <Reveal>
          <p style={kicker}>Questions</p>
          <h2 id="fd-faq" style={{ ...h2, maxWidth: "18ch" }}>Common questions.</h2>
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
              Start with the goal you are treating.
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
