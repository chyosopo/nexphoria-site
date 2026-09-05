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
import { HeroTiles } from "@/components/HeroTiles";
import { HowTiles } from "@/components/HowTiles";
import { MenuRail } from "@/components/MenuRail";
import { Explainer } from "@/components/Explainer";
import { GoalGallery } from "@/components/GoalGallery";
import { WhatArrives } from "@/components/WhatArrives";
import { FeaturedProtocol } from "@/components/FeaturedProtocol";
import { Check, ArrowRight } from "lucide-react";
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
  { q: "Do I need to see a doctor?", a: `Everything happens online. A licensed U.S. physician reviews the health questions, writes the prescription if it is appropriate, and reads the panel before the first dose and again at week ${RETEST_WEEK}.` },
  { q: "Is bloodwork required?", a: `Yes. An at-home blood kit of ${PANEL_TOTAL_MARKERS} markers ships with the first order, included.` },
  { q: "What if the physician says it is not right for me?", a: "Then you will hear why, and the refund policy explains what is refunded." },
  { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
  { q: "How is it billed?", a: "One monthly price, paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. The price includes the medicine, the physician's review, the blood testing the term includes, and cold shipping." },
];


export default function FrontDoor() {
  useSeo({
    title: "Nexphoria: prescription peptide therapy, prescribed against blood work",
    description:
      `Prescription peptide therapy for weight, body composition, recovery, sleep, focus, hormones and sexual health. A licensed U.S. physician reviews the health history, prescribes if it is appropriate, and adjusts the dose from a blood test at week ${RETEST_WEEK}. One monthly price covers the medicine, the physician and the blood work.${Number.isFinite(FLOOR) ? ` From ${usd(FLOOR)}/mo.` : ""}`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria", description: "Prescription peptide therapy, prescribed against blood work.", path: "/" }),
      faqJsonLd(FAQ),
    ],
  });

  return (
    <SiteLayout navVariant="showcase" hideTrustBar hideAnnouncementBar>
      <div className="nx-env" aria-hidden="true" />

      {/* ══ 01 · HERO — the claim, one action, the fact strip ══ */}
      <HeroTiles />

      {/* ══ 01b · HOW IT WORKS — three tall tiles ══ */}
      <HowTiles />

      {/* ══ 02 · WHAT A PEPTIDE DOES — three frames, the teaching before the shop ══ */}
      <Explainer />

      {/* ══ 03 · THE MEDICINES — the one place to browse (id="treatments") ══ */}
      <MenuRail photo="img/img_band_porcelain.webp" />

      {/* ══ 03b · BY GOAL — one photograph per goal, the medicines under it ══ */}
      <GoalGallery />

      {/* ══ 03b2 · A PROTOCOL — the medicines prescribed together, one wide tile ══ */}
      <FeaturedProtocol slug="recover" />

      {/* ══ 03c · WHAT ARRIVES — the box, and what a month includes ══ */}
      <WhatArrives />

      {/* ══ 05 · BLOOD TESTING — why we measure ══ */}
      <section className="nx-container nx-sec" aria-labelledby="fd-blood">
        <div className="nx-blood">
          <Reveal className="nx-reveal-scale">
            <div className="nx-labs-art"><LabKitBox markers={LAB_KIT.markers} name={LAB_KIT.short} /></div>
          </Reveal>
          <Reveal delay={60}>
            <p className="nx-eyebrow">Why we test</p>
            <h2 id="fd-blood" className="nx-dsh2 nx-shout" style={{ maxWidth: "20ch" }}>The dose is set from blood.</h2>
            <ul className="nx-blood__lines">
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>A blood kit ships with the first order.</strong> {LAB_KIT.markers} markers, drawn at home, included.</span></li>
              <li><i><Check size={13} strokeWidth={2.6} aria-hidden="true" /></i><span><strong>The physician sets the dose from the results,</strong> before the first dose.</span></li>
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
            <h2 id="fd-pricing" className="nx-dsh2 nx-shout" style={{ maxWidth: "18ch" }}>One number a month.</h2>
          </div>
          <p className="nx-prose" style={{ marginTop: "1rem", maxWidth: "58ch" }}>
            Paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. Each medicine shows its own price on its page, and the box above is what the price includes.
          </p>
          <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "1.2rem", display: "inline-block" }} data-testid="frontdoor-pricing-all">Every medicine, with its price <ArrowRight size={14} aria-hidden="true" /></Link>
        </Reveal>
      </section>

      {/* ══ 07 · QUESTIONS ══ */}
      <section className="nx-container nx-faq-section" aria-labelledby="fd-faq">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">Questions</p>
            <h2 id="fd-faq" className="nx-dsh2 nx-shout" style={{ maxWidth: "18ch" }}>Questions.</h2>
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

      {/* ══ 08 · THE CLOSER — one tile, the same one action as the hero ══ */}
      <section className="nx-container nx-sec" aria-labelledby="fd-closer" style={{ paddingBottom: "var(--nx-sp-sec)" }}>
        <Reveal>
          <div className="nx-closer-tile">
            <div>
              <h2 id="fd-closer" className="nx-shout" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "16ch", margin: 0, textWrap: "balance" }}>
                Know what you're after?
              </h2>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", marginTop: ".8rem", maxWidth: "44ch" }}>
                Every medicine, by what it treats. Prescribed by a licensed U.S. physician, if appropriate.
              </p>
              <Link href="/peptides" className="nx-cta-ceramic" data-testid="frontdoor-closer-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.6rem" }}>
                Shop all medicines
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
