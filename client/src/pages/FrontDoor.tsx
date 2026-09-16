/* ═══ FRONT DOOR — the homepage, the cinema way (2026-09-16) ═══
   Chiya: "high-res, cinema-grade design and branding and everything else,
   copy, tone; mod.com, take inspiration, I like this way." mod.com,
   rendered offline and walked (docs/MOD-STUDY.md): a black canvas, the
   photograph as the design, three giant caps lines, four icon tiles, four
   numbered photographs, a full-bleed photograph with one line, a rail of
   articles, hairline questions, a sticky bar. The same order here, with
   our facts and our laws. The loop home (2026-09-15) is in git.
   PREVIOUS: the loop way (2026-09-15) ═══
   Chiya: "https://openloophealth.com/ … I love the design and layout, copy,
   everything; mirror our site to look like it as much as possible but give
   us a uniqueness." openloophealth.com, rendered offline and walked: a
   night hero with a device card; a muted strip; a two-column block beside
   an orbit diagram; a night band of cards; alternating feature blocks with
   dark device panels; the programs; 01/02/03 steps; a soft radial band;
   "Questions? We've got answers."; a night closer. The same order here,
   with our facts and our laws: no counts, no reviews, no press, no "free",
   no urgency. The previous home (the ivy journey, 2026-09-08) is in git.
   Copy is the loop register (docs/VOICE.md v8; client/src/data/hero.ts). */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { HeroCinema } from "@/components/cinema/HeroCinema";
import { CineBar } from "@/components/cinema/CineBar";
import { BloodChart } from "@/components/cinema/BloodChart";
import { Anatomy } from "@/components/cinema/Anatomy";
import { FactTiles } from "@/components/cinema/FactTiles";
import { Isi } from "@/components/cinema/Isi";
import { StepsCinema } from "@/components/cinema/StepsCinema";
import { TreatmentsRail } from "@/components/ivy/TreatmentsRail";
import { BaselineBleed } from "@/components/cinema/BaselineBleed";
import { GoalsCinema } from "@/components/cinema/GoalsCinema";
import { CloserCinema } from "@/components/cinema/CloserCinema";
import { MessageCircle } from "lucide-react";
import { RETEST_WEEK } from "@/data/monitoring";
import { useSeo, webPageJsonLd, orgJsonLd, websiteJsonLd, medicalBusinessJsonLd, faqJsonLd } from "@/lib/seo";
import { F } from "@/lib/typography";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import "@/styles/ivy.css";
const FAQ = [
  { q: "What is a peptide?", a: "A peptide is a short chain of amino acids, the same building blocks as protein. Your body already makes thousands of them as signals. The ones a physician prescribes here are precise versions of those signals, so your body does more of what it already does: releases growth hormone, feels full, or repairs tissue." },
  { q: "Who prescribes it, and who makes it?", a: "Prescriptions are written by independent, U.S.-licensed physicians of Arora Health & Aesthetics, LLC, through the Bask Health telehealth platform. Medicines are compounded by VialsRX, a state-licensed 503A pharmacy in Houston, Texas. Both are listed with their addresses on the FAQ page." },
  { q: "Do I need to see a doctor?", a: `Everything happens online. A licensed U.S. physician reviews your online visit, writes the prescription if it is appropriate, and reads the panel before the first dose and again at week ${RETEST_WEEK}.` },
  { q: "Is bloodwork required?", a: `Yes. An at-home blood kit of ${PANEL_TOTAL_MARKERS} markers ships with the first order, included.` },
  { q: "What if the physician says it is not right for me?", a: "Then you will hear why, and the refund policy explains what is refunded." },
  { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
  { q: "How is it billed?", a: "One monthly price, paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. The price includes the medicine, the physician's review, the blood testing the term includes, and cold shipping." },
];
/* The five on the home: what it is, who prescribes and makes it (the 503A
   line the LegitScript gate reads on this route), the doctor, the blood, the
   bill. The other two stay on the FAQ page. */
const HOME_FAQ = [FAQ[0], FAQ[1], FAQ[2], FAQ[3], FAQ[6]];


export default function FrontDoor() {
  useSeo({
    title: "Nexphoria: peptide medicine, personalized to you",
    description:
      `Prescription peptide therapy for weight, body composition, recovery, sleep, focus, hormones and sexual health. A licensed U.S. physician reviews your health history, prescribes if it is appropriate, and sets the dose from a ${PANEL_TOTAL_MARKERS}-marker blood panel, read again at week ${RETEST_WEEK}.`,
    path: "/",
    jsonLd: [
      orgJsonLd(),
      websiteJsonLd(),
      medicalBusinessJsonLd(),
      webPageJsonLd({ name: "Nexphoria", description: "Peptide medicine, personalized to you.", path: "/" }),
      faqJsonLd(HOME_FAQ),
    ],
  });

  return (
    <SiteLayout navVariant="showcase" hideTrustBar hideAnnouncementBar>
      <div className="nx-tight nx-cine-pad">

      {/* ══ 01 · HERO — the beaded surface, three lines, the carton ══ */}
      <HeroCinema />
      <CineBar />

      {/* ══ 02 · THE DOSE — the figure under a caps line (mod's chart slot, ours without a rival) ══ */}
      <BloodChart />

      {/* ══ 03 · RX PEPTIDES — the vial with callout lines ══ */}
      <Anatomy />

      {/* ══ 04 · WHAT A PEPTIDE IS — and the four facts ══ */}
      <FactTiles />

      {/* ══ 03 · GETTING STARTED — four photographs, 01 to 04 ══ */}
      <StepsCinema />

      {/* ══ 04 · TREATMENTS — every medicine as a card (id="treatments") ══ */}
      <TreatmentsRail />

      {/* ══ 05 · THE BLOOD PANEL — the full-bleed photograph ══ */}
      <BaselineBleed />

      {/* ══ 06 · BY GOAL ══ */}
      <GoalsCinema />

      {/* ══ 08 · PRICE — one statement; the ladder lives on each product page ══ */}
      <section className="nx-container nx-sec" aria-labelledby="fd-pricing">
        <Reveal>
          <div className="nx-ivhead nx-cine-price">
            <div>
              <p className="nx-eyebrow">Price</p>
              <h2 id="fd-pricing" className="nx-ivhead__h2">One price a month, <span className="nx-grad">everything within it.</span></h2>
              <p className="nx-ivhead__lede" style={{ fontFamily: F }}>
                The medicine, the physician's review and the blood work, in one monthly price. You pay it up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. Each medicine shows its own price on its page.
              </p>
            </div>
            <Link href="/peptides" className="nx-cta-ceramic" style={{ fontFamily: F }} data-testid="frontdoor-pricing-all">See every price</Link>
          </div>
        </Reveal>
      </section>

      {/* ══ 09 · IMPORTANT SAFETY INFORMATION ══ */}
      <Isi />

      {/* ══ 10 · QUESTIONS ══ */}
      <section className="nx-container nx-sec nx-faq-section" aria-labelledby="fd-faq">
        <div className="nx-ivhead nx-ivhead--center">
          <p className="nx-eyebrow">FAQ</p>
          <h2 id="fd-faq" className="nx-ivhead__h2">Questions? <span className="nx-grad">We have answers.</span></h2>
        </div>
        <div className="nx-ivfaq">
          <div className="nx-faq-list" data-testid="frontdoor-faq">
            {HOME_FAQ.map((it, i) => (
              <details key={it.q} className="nx-faq-item" open={i === 0}>
                <summary>
                  <span>{it.q}</span>
                  <span className="nx-faq-plus" aria-hidden />
                </summary>
                <p className="nx-faq-a">{it.a}</p>
              </details>
            ))}
          </div>
          <div className="nx-ivfaq__ask">
            <h3>Still have questions?</h3>
            <p style={{ fontFamily: F }}>Write to us, and a person answers.</p>
            <Link href="/contact" className="nx-cta-ceramic" style={{ fontFamily: F }} data-testid="frontdoor-ask">Message us <MessageCircle size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* ══ 11 · THE CLOSER ══ */}
      <CloserCinema />
      </div>
    </SiteLayout>
  );
}
