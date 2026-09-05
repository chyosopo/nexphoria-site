/* ═══ FRONT DOOR — the homepage (2026-09-05, decluttered) ═══

   Chiya, 2026-09-05: "Everything is a big mess. No clarity, no reasoning. It
   confuses customers." The home had five ways to browse the same catalog
   stacked together (hero goal chips, a goal grid, the medicines rail, the
   example plans, a price table), three of them the same goal-picker. Now
   there is ONE path: land, understand in a sentence, shop the medicines,
   then the reasoning after it (what happens, why we test, what it costs),
   then questions, then one action. One navigator, one action, room to read.
   Copy is the plain deck (docs/COPY-DECK-PLAIN.md). */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { HeroR3 } from "@/components/HeroR3";
import { MenuRail } from "@/components/MenuRail";
import { Check, ArrowRight } from "lucide-react";
import { ROAD } from "@/data/spine";
import { LabKitBox } from "@/components/LabKitBox";
import { LAB_KIT } from "@/data/labs";
import { RETEST_WEEK } from "@/data/monitoring";
import { useSeo, webPageJsonLd, orgJsonLd, websiteJsonLd, medicalBusinessJsonLd, faqJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { usd } from "@/data/stacksCatalog";
import { SOLO_CATALOG } from "@/data/soloCatalog";

/* The price floor: lowest priced launch SKU at the 12-month cadence, derived. */
const PRICED = SOLO_CATALOG.filter((s) => s.pricing);
const FLOOR = PRICED.length ? Math.min(...PRICED.map((s) => s.pricing!.m12)) : NaN;

const FAQ = [
  { q: "What is a peptide?", a: "A peptide is a short chain of amino acids, the same building blocks as protein. Your body already makes thousands of them as signals. The ones a physician prescribes here are precise versions of those signals, so your body does more of what it already does: releases growth hormone, feels full, or repairs tissue." },
  { q: "Who prescribes it, and who makes it?", a: "Prescriptions are written by independent, U.S.-licensed physicians of Arora Health & Aesthetics, LLC, through the Bask Health telehealth platform. Medicines are compounded by VialsRX, a state-licensed 503A pharmacy in Houston, Texas. Both are listed with their addresses on the FAQ page." },
  { q: "Do I need to see a doctor?", a: `Everything happens online. A licensed U.S. physician reviews your health questions, writes your prescription if it is appropriate, and reads your blood test before your first dose and again at week ${RETEST_WEEK}.` },
  { q: "Is bloodwork required?", a: `Yes. An at-home blood kit of ${PANEL_TOTAL_MARKERS} markers ships with your first order, included.` },
  { q: "What if the physician says it is not right for me?", a: "Then you will hear why, and the refund policy explains what is refunded." },
  { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
  { q: "How is it billed?", a: "One monthly price, paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. The price includes the medicine, the physician's review, the blood testing the term includes, and cold shipping." },
];


export default function FrontDoor() {
  useSeo({
    title: "Nexphoria: prescription peptide therapy, with a physician and your blood work",
    description:
      `Prescription peptide therapy for weight, body composition, recovery, sleep, focus, hormones and sexual health. A licensed U.S. physician reviews your health history, prescribes if it is appropriate, and adjusts your dose from a blood test at week ${RETEST_WEEK}. One monthly price covers the medicine, the physician and the blood work.${Number.isFinite(FLOOR) ? ` From ${usd(FLOOR)}/mo.` : ""}`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria", description: "Prescription peptide therapy, with a physician and your blood work.", path: "/" }),
      faqJsonLd(FAQ),
    ],
  });

  return (
    <SiteLayout navVariant="showcase" hideTrustBar hideAnnouncementBar>
      <div className="nx-env" aria-hidden="true" />

      {/* ══ 01 · HERO — the claim, one action, the fact strip ══ */}
      <HeroR3 />

      {/* ══ 02 · WHAT THIS IS — one sentence of reasoning, before the shop ══ */}
      <section className="nx-container nx-sec" aria-labelledby="fd-what">
        <Reveal>
          <div className="nx-premise">
            <p className="nx-premise__k" style={{ fontFamily: F }}>New to peptides</p>
            <p id="fd-what" className="nx-premise__t" style={{ fontFamily: S }}>
              A peptide is a signal your body already makes. A licensed physician prescribes the right one for your goal, and doses it against your own blood work.
            </p>
            <Link href="/how-it-works" className="nx-text-link nx-premise__link" style={{ fontFamily: F, fontWeight: 600 }} data-testid="frontdoor-learn">
              How peptides work <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ══ 03 · THE MEDICINES — the one place to browse (id="treatments") ══ */}
      <MenuRail photo="img/img_band_porcelain.webp" />

      {/* ══ 04 · HOW IT WORKS — the five steps, once ══ */}
      <section className="nx-container nx-sec" aria-labelledby="fd-road">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">How it works</p>
            <h2 id="fd-road" className="nx-dsh2" style={{ maxWidth: "18ch" }}>Five steps, from choosing to your first dose.</h2>
          </div>
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

      {/* ══ 05 · BLOOD TESTING — why we measure ══ */}
      <section className="nx-container nx-sec" aria-labelledby="fd-blood">
        <div className="nx-blood">
          <Reveal className="nx-reveal-scale">
            <div className="nx-labs-art"><LabKitBox markers={LAB_KIT.markers} name={LAB_KIT.short} /></div>
          </Reveal>
          <Reveal delay={60}>
            <p className="nx-eyebrow">Why we test</p>
            <h2 id="fd-blood" className="nx-dsh2" style={{ maxWidth: "20ch" }}>Your dose is set from your own blood work.</h2>
            <ul className="nx-blood__lines">
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>A blood kit ships with your first order.</strong> {LAB_KIT.markers} markers, drawn at home, included.</span></li>
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>Your physician sets your dose from the results,</strong> before your first dose.</span></li>
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>At week {RETEST_WEEK} the same {LAB_KIT.markers} markers are tested again</strong> and compared, so the dose follows what changed.</span></li>
            </ul>
            <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.2rem", display: "inline-block" }} data-testid="frontdoor-labs-link">Every marker, and the additional tests</Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 06 · PRICE — one statement, no table; the ladder lives on each product page ══ */}
      <section className="nx-container nx-sec" aria-labelledby="fd-pricing">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">Price</p>
            <h2 id="fd-pricing" className="nx-dsh2" style={{ maxWidth: "18ch" }}>One monthly price. Everything within it.</h2>
          </div>
          <p className="nx-prose" style={{ marginTop: "1rem", maxWidth: "58ch" }}>
            Paid up front for a term of one, three, six or twelve months. It covers the medicine, the physician's review, the blood kit, the week-{RETEST_WEEK} test and cold shipping. Longer terms cost less per month. Each medicine shows its own price on its page.
          </p>
          <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.2rem", display: "inline-block" }} data-testid="frontdoor-pricing-all">Every medicine, with its price <ArrowRight size={14} aria-hidden="true" /></Link>
        </Reveal>
      </section>

      {/* ══ 07 · QUESTIONS ══ */}
      <section className="nx-container nx-faq-section" aria-labelledby="fd-faq">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">Questions</p>
            <h2 id="fd-faq" className="nx-dsh2" style={{ maxWidth: "18ch" }}>Common questions.</h2>
          </div>
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

      {/* ══ 08 · THE CLOSER — the same one action as the hero ══ */}
      <section className="nx-gradient-hero-dark nx-closer" aria-labelledby="fd-closer">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 id="fd-closer" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-display)", maxWidth: "20ch", margin: "0 auto", textWrap: "balance" }}>
              See what a physician can prescribe for you.
            </h2>
            <a href="#treatments" className="nx-cta-ceramic" data-testid="frontdoor-closer-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              See the treatments
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
