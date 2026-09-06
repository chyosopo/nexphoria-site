/* JOB: remove the last objection; hand off to support or the medicines. */
/* ═══ FAQ — the tile grammar (2026-09-05)
   The categories as a left rail on desktop and a sticky pill row on the
   phone; the questions as the FAQ tiles; sentence-case headings in the v3
   register. The physician and pharmacy answers are the compliance blocks
   verbatim (data/compliance.ts), which audit:legitscript asserts on /faq.
   Every fact is derived from the catalog and the compliance data, never
   typed. The page's own classes live in client/src/styles/support.css. */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, faqJsonLd, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { SOLO_FROM_LABEL, SOLO_FROM_LABEL_M12 } from "@/data/pricing";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";
import "@/styles/support.css";

interface FAQItem {
  q: string;
  a: string;
}

/* Every fact below is derived from the catalog and the compliance data,
   never typed (truth law). */
const PEPTIDE_NAMES = SOLO_CATALOG.map((p) => p.name).join(", ");
/* Read from the exclusions themselves, not from `gated`. When the catalog
   went live every solo became ungated, this list emptied, and the shipping
   answer rendered "restricted by law in ." on the page. */
const GLP1_EXCLUDED = Array.from(
  new Set(SOLO_CATALOG.flatMap((p) => p.stateExclusions ?? [])),
).sort().join(", ");

const categories: { label: string; heading: string; items: FAQItem[] }[] = [
  {
    label: "Getting started",
    heading: "How you start.",
    items: [
      {
        q: "How does it work?",
        a: `Five steps. You choose a medicine or a protocol, and a term of one, three, six or twelve months. At checkout you answer a few questions on your history, your current medicines and your goal. A licensed U.S. physician reads them and writes the prescription, or explains why not; if not, nothing is made and the refund policy applies. The medicine ships cold with an at-home blood kit, included. You draw before the first dose, and the physician sets the dose from the results. At week ${RETEST_WEEK} the same panel is drawn again, and the physician continues, adjusts or stops the dose.`,
      },
      {
        q: "Do I need to see a doctor in person?",
        a: `No visit is needed. Everything happens online. A licensed U.S. physician reviews your online visit, writes the prescription, and reads the panel before the first dose and again at week ${RETEST_WEEK}.`,
      },
      {
        q: "What if the physician says it is not right for me?",
        a: "The physician explains why, and for some people the answer is to wait or to try a different treatment. The refund policy explains what is refunded.",
      },
      {
        q: "Do I need bloodwork to start?",
        a: `Yes. An at-home blood kit of ${PANEL_TOTAL_MARKERS} markers ships with the first order, included, and the physician sets the dose from the results. At week ${RETEST_WEEK} the same test is drawn again and compared. Recent results from a CLIA-certified laboratory may serve as the baseline, at the physician's discretion.`,
      },
      {
        q: "What if I have a health condition?",
        a: "It is asked in the online visit. Some conditions rule a medication out, such as certain cancers, pregnancy, or uncontrolled heart disease. Others change the dose or what the physician watches.",
      },
    ],
  },
  {
    label: "The medicines",
    heading: "What the medicines are.",
    items: [
      {
        q: "What is a peptide?",
        a: "A short chain of amino acids, the same building blocks as protein. Your body makes thousands of them as signals. The ones a physician prescribes here are precise versions of signals your body already uses, so it does more of what it does anyway: feels full, releases growth hormone, or responds to desire.",
      },
      {
        q: "Which medicines can be prescribed here?",
        a: `${PEPTIDE_NAMES}. Each has its own page explaining what it does, how you take it, and what it costs.`,
      },
      {
        q: "What is in the vial, and who made it?",
        a: `The medicine named on the prescription, compounded to order by ${PHARMACY_INFO.name}, a state-licensed 503A pharmacy, and shipped cold. The prescription is written by a licensed U.S. physician. Both are listed on this page with their addresses.`,
      },
      {
        q: "What does a 503A pharmacy mean?",
        a: "A pharmacy licensed to make a medication for one named patient, from a physician's prescription. That is what lets the dose and formulation be set for one person.",
      },
      {
        q: "Who provides the clinical care?",
        a: PROVIDER_INFO.body,
      },
      {
        q: "Which pharmacy fills the prescriptions?",
        a: PHARMACY_INFO.body,
      },
    ],
  },
  {
    label: "Price",
    heading: "What it costs.",
    items: [
      {
        q: "How much does it cost?",
        a: `Single medicines start from ${SOLO_FROM_LABEL} a month on a one-month term, and ${SOLO_FROM_LABEL_M12} a month on twelve. One monthly price, paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six months 15%, twelve 20%. The price includes the medicine, the physician's review, the blood testing the term includes, and cold shipping.`,
      },
      {
        q: "What do I pay today?",
        a: "The whole term, up front: the monthly price times the months in the term. The online visit follows, then the physician's decision, then the medicine ships.",
      },
      {
        q: "Can I cancel?",
        a: "Yes. Cancellation takes effect at the end of your current cycle. Medication that has already shipped cannot be returned under pharmacy regulations. The refund policy has the details.",
      },
      {
        q: "Is insurance accepted?",
        a: "Nexphoria is self-pay. Insurance does not cover compounded peptides.",
      },
    ],
  },
  {
    label: "Safety",
    heading: "What to know about safety and side effects.",
    items: [
      {
        q: "What are the side effects?",
        a: "It depends on the medication. GLP-1 medications like semaglutide and tirzepatide can cause nausea and a smaller appetite while the dose steps up. Tesamorelin can cause redness where you inject and some water retention. PT-141 can cause nausea and flushing, and raises blood pressure for a few hours. The physician reviews your history for the risks that matter to you.",
      },
      {
        q: "What if something feels wrong?",
        a: "For chest pain, trouble breathing, or a severe allergic reaction, call emergency services. For anything else, stop and contact the physician before the next dose.",
      },
      {
        q: "How do I store it?",
        a: "In the fridge, in its box, following the instructions that come with it. Your shipment arrives cold with a temperature indicator. If the indicator shows the cold chain broke, do not use it, and email hello@nexphoria.com.",
      },
      {
        q: "What if I miss a dose?",
        a: "Follow the instructions that come with the medication. Do not double a dose to catch up. If unsure, ask the physician before the next dose.",
      },
    ],
  },
  {
    label: "Shipping",
    heading: "How it ships.",
    items: [
      {
        q: "How is it shipped?",
        a: `Cold, in plain packaging, to your door. We ship to all 50 states.${GLP1_EXCLUDED ? ` Compounded GLP-1 medication is restricted by law in ${GLP1_EXCLUDED}.` : ""}`,
      },
      {
        q: "When does it arrive?",
        a: "Once the physician approves, the pharmacy makes the medication and ships it cold. An email with tracking follows when it is on its way.",
      },
      {
        q: "Can I travel with it?",
        a: "Within the United States, yes. Keep it cold and keep the prescription label on the box. We ship inside the United States only.",
      },
      {
        q: "Is international shipping available?",
        a: "No. We ship within the United States, to states where the physicians are licensed.",
      },
    ],
  },
  {
    label: "Legal",
    heading: "Where it stands legally.",
    items: [
      {
        q: "Are peptides legal?",
        a: "Yes, when prescribed by a licensed U.S. physician and made by a licensed 503A pharmacy. Semaglutide, tirzepatide, tesamorelin and PT-141 each exist as FDA-approved branded drugs. The compounded versions prescribed here are prepared for you, and prescribing them is a routine part of medical practice in the United States.",
      },
      {
        q: "Is this FDA-approved?",
        a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared for you by a state-licensed 503A compounding pharmacy under a physician's prescription. Where a branded, FDA-approved version of a molecule exists, ours is the compounded version and is not the branded product.",
      },
      {
        q: "Who is behind Nexphoria?",
        a: `Nexphoria operates the service and does not make clinical decisions. Prescriptions are written by independent, U.S.-licensed physicians of ${PROVIDER_INFO.name}, through the Bask Health telehealth platform. Medicines are compounded by ${PHARMACY_INFO.name}, a state-licensed 503A compounding pharmacy in Houston, Texas, and blood work is analysed by a CLIA-certified laboratory. The physicians and the pharmacy are listed on this page with their addresses.`,
      },
    ],
  },
];

export default function FAQPage() {
  // Flatten all FAQ items for JSON-LD
  const allFaqItems = categories.flatMap((c) => c.items);

  useSeo({
    title: "Common questions: how it works, cost, safety, shipping",
    description: `Plain answers about physician-prescribed peptides: what they are, who prescribes them, what they cost, side effects, shipping, and the week-${RETEST_WEEK} blood panel.`,
    path: "/faq",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria FAQ", description: "Frequently asked questions about physician-prescribed peptide therapy at Nexphoria.", path: "/faq", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]),
      faqJsonLd(allFaqItems),
    ],
  });
  const [activeCategory, setActiveCategory] = useState(0);
  const pinned = useRef<number | null>(null);
  // Roving-tabindex focus targets for the category list (WAI-ARIA tabs).
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Scroll-spy: the active pill follows the group in view, and on the
     phone the row scrolls so the active pill stays visible. A click pins
     the choice until the chosen group arrives, so the spy cannot fight the
     smooth scroll on its way there. */
  useEffect(() => {
    const groups = categories.map((_, i) => document.getElementById(`faq-panel-${i}`)).filter((el): el is HTMLElement => !!el);
    if (!groups.length || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!hit) return;
        const i = groups.indexOf(hit.target as HTMLElement);
        if (pinned.current !== null && pinned.current !== i) return;
        pinned.current = null;
        setActiveCategory(i);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    groups.forEach((g) => obs.observe(g));
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    tabRefs.current[activeCategory]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeCategory]);

  const go = (i: number) => {
    pinned.current = i;
    setActiveCategory(i);
    document.getElementById(`faq-panel-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onTabsKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const count = categories.length;
    let next = activeCategory;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (activeCategory + 1) % count;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = (activeCategory - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActiveCategory(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <SiteLayout navVariant="showcase">
      {/* ── Hero ── */}
      <section className="nx-tilehero" aria-labelledby="faq-title">
        <div className="nx-container" style={{ paddingBottom: "var(--nx-sp-tight)" }}>
          <div className="nx-tilehero__head nx-hero-seq">
            <p className="nx-eyebrow">Questions</p>
            <h1 id="faq-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>What people ask before they start.</h1>
            <p className="nx-tilehero__sub" style={{ fontFamily: F }}>How it works, what it costs, what to know about safety, how it ships, and who is involved.</p>
          </div>
        </div>
      </section>

      {/* ── The categories and the question tiles ── */}
      <section className="nx-container" aria-label="Questions by category" style={{ paddingTop: "var(--nx-sp-tight)" }}>
        <div className="sp-faq">
          {/* Category rail: a left rail on desktop, a sticky pill row on the phone */}
          <nav className="sp-faq__rail" aria-label="FAQ categories">
            <p className="sp-faq__rail-title" id="faq-categories-heading">Categories</p>
            <ul className="sp-faq__tabs" aria-labelledby="faq-categories-heading" onKeyDown={onTabsKeyDown}>
              {categories.map((cat, i) => (
                <li key={cat.label}>
                  <button
                    ref={(el) => { tabRefs.current[i] = el; }}
                    id={`faq-tab-${i}`}
                    type="button"
                    className={activeCategory === i ? "sp-faq__tab is-active" : "sp-faq__tab"}
                    aria-current={activeCategory === i ? "true" : undefined}
                    tabIndex={activeCategory === i ? 0 : -1}
                    onClick={() => go(i)}
                    data-testid={`faq-tab-${i}`}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* The groups. A plain div, never a second <main>: SiteLayout owns
              the one <main id="main-content"> landmark. */}
          <div className="sp-faq__groups">
            {categories.map((cat, i) => (
              <section
                key={cat.label}
                id={`faq-panel-${i}`}
                className="sp-faq__group"
                aria-labelledby={`faq-heading-${i}`}
                data-testid={`faq-section-${i}`}
              >
                <Reveal>
                  <div className="nx-sec-head">
                    <p className="nx-eyebrow">{cat.label}</p>
                    <h2 id={`faq-heading-${i}`} className="nx-dsh3">{cat.heading}</h2>
                  </div>
                  <div className="nx-faq-list">
                    {cat.items.map((item, j) => (
                      <details key={item.q} className="nx-faq-item" data-testid={`faq-${i}-${j}`}>
                        <summary>
                          <span>{item.q}</span>
                          <span className="nx-faq-plus" aria-hidden />
                        </summary>
                        <p className="nx-faq-a">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </Reveal>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closer, as one tile ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="faq-closer">
        <div className="nx-closer-tile">
          <div>
            <h2 id="faq-closer" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0, textWrap: "balance" }}>Ask us anything this page left open.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", maxWidth: "46ch", marginTop: ".8rem" }}>Email hello@nexphoria.com, and a person answers on a business day. Clinical questions go to the physician.</p>
            <Link href="/contact" className="nx-cta-ceramic" data-testid="faq-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.6rem" }}>Ask us</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
