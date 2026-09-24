/* ═══ WHY NEXPHORIA (the nuform study, 2026-09-24) ═══
   nuformhealth.com's "Why Nuform" argues its model in one page: a team, a
   founder, honest pricing, a comparison table against "typical telehealth".
   Ours argues our model as completeness (law 3): four facts, each stated
   once and in full, the panel the reader can see, the retest, the price.
   No comparison table, no rival named, no negation. The cinema register. */
import { Link } from "wouter";
import { ArrowRight, Stethoscope, Droplets, FlaskConical, MessageCircle, RefreshCw, Snowflake } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { BloodChart } from "@/components/cinema/BloodChart";
import { CloserCinema } from "@/components/cinema/CloserCinema";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

export default function Why() {
  useSeo({
    title: "Why Nexphoria | One price, one physician, your own blood",
    description: `What every order includes: a licensed U.S. physician on every order and every dose change, a ${PANEL_TOTAL_MARKERS}-marker blood panel read before the first dose and again at week ${RETEST_WEEK}, a medicine compounded for you in a licensed U.S. pharmacy, and one monthly price with everything within it.`,
    path: "/why",
    jsonLd: [
      webPageJsonLd({ name: "Why Nexphoria", description: "One price, one physician, your own blood.", path: "/why", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Why Nexphoria", path: "/why" }]),
    ],
  });

  const FACTS = [
    { n: "01", t: "One price a month. Everything within it.", p: ["The medicine, the physician's review, the blood testing the term includes and cold shipping, in one monthly price, paid up front for a term of one, three, six or twelve months.", "Three months is 10% less per month, six 15%, twelve 20%. Each medicine shows its own price on its page, and the buy box shows the term total beside the monthly rate."] },
    { n: "02", t: "A licensed physician on every order.", p: ["A U.S.-licensed physician reviews your health history and your goal, prescribes if it is appropriate, and reviews every dose change after that.", "If the physician decides a medicine is wrong for you, you hear why, and the refund policy states what is refunded."] },
    { n: "03", t: `A ${PANEL_TOTAL_MARKERS}-marker panel, read twice.`, p: [`An at-home kit of ${PANEL_TOTAL_MARKERS} markers across five systems ships with the first order, included. The physician reads it before the first dose.`, `At week ${RETEST_WEEK} the same markers are drawn again and read against the first draw, marker by marker. What changed decides what happens to the dose.`] },
    { n: "04", t: "Compounded for you. A person answers.", p: ["Your medicine is compounded to the prescription by a licensed U.S. 503A pharmacy and shipped cold, in a plain carton, to all 50 states.", "Questions go to the care team on any business day, and a person answers in writing. Clinical questions go to the physician through the secure portal."] },
  ];

  const LINES = [
    { Icon: Stethoscope, t: "The physician reviews every dose change before it takes effect." },
    { Icon: Droplets, t: `The week-${RETEST_WEEK} panel is included on terms of three months and longer.` },
    { Icon: RefreshCw, t: "Six- and twelve-month terms add further tests, stated on each product page." },
    { Icon: FlaskConical, t: "Every preparation states its regulatory standing and the FDA clause on its page." },
    { Icon: Snowflake, t: "Each month's carton carries the medicine, the syringes and swabs, and an ice pack." },
    { Icon: MessageCircle, t: "A person answers on business days; the physician answers clinical questions in the portal." },
  ];

  return (
    <SiteLayout>
      <section className="nx-tilehero" aria-labelledby="why-title">
        <div className="nx-container" style={{ paddingBottom: "var(--nx-sp-tight)" }}>
          <div className="nx-tilehero__head nx-hero-seq">
            <p className="nx-eyebrow">Why Nexphoria</p>
            <h1 id="why-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>One price. One physician. <span className="nx-grad">Your own blood.</span></h1>
            <p className="nx-tilehero__sub" style={{ fontFamily: F }}>Everything an order includes, on one page. The price sits on each medicine's page, next to the medicine.</p>
            <div className="nx-tilehero__foot">
              <Link href="/quiz" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="why-hero-cta">Find my treatment <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span></Link>
              <Link href="/peptides" className="nx-cta-ceramic" style={{ fontFamily: F }} data-testid="why-hero-browse">Every medicine</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="nx-container nx-cine-sec" aria-labelledby="why-facts" data-testid="why-facts">
        <div className="nx-cine-head">
          <p className="nx-eyebrow">The four facts</p>
          <h2 id="why-facts" className="nx-cine-head__h2">Everything <span className="nx-grad">within the price.</span></h2>
        </div>
        <ol className="nx-why-facts">
          {FACTS.map((f) => (
            <li key={f.n} className="nx-why-fact">
              <span className="nx-why-fact__n" style={{ fontFamily: F }}>{f.n}</span>
              <h3 className="nx-why-fact__t">{f.t}</h3>
              {f.p.map((line) => <p key={line} className="nx-why-fact__p" style={{ fontFamily: F }}>{line}</p>)}
            </li>
          ))}
        </ol>
      </section>

      <BloodChart />

      <section className="nx-container nx-cine-sec" aria-labelledby="why-after" data-testid="why-after">
        <div className="nx-cine-head">
          <p className="nx-eyebrow">After the first dose</p>
          <h2 id="why-after" className="nx-cine-head__h2">The prescription <span className="nx-grad">is where the care starts.</span></h2>
          <p className="nx-cine-head__p" style={{ fontFamily: F }}>What follows the first dose, stated before the first order.</p>
        </div>
        <ul className="nx-why-lines" aria-label="What continues after the first dose">
          {LINES.map(({ Icon, t }) => (
            <li key={t} style={{ fontFamily: F }}><Icon size={17} strokeWidth={2} aria-hidden="true" />{t}</li>
          ))}
        </ul>
        <div className="nx-steps__cta" style={{ justifyContent: "flex-start" }}>
          <Link href="/how-it-works" className="nx-cta-ceramic" style={{ fontFamily: F }} data-testid="why-how">How it works, step by step</Link>
        </div>
      </section>

      <CloserCinema id="why-closer" />
    </SiteLayout>
  );
}
