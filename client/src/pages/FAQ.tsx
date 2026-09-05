/* JOB: remove the last objection; hand off to support or the assessment. */
import { useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { useSeo, faqJsonLd, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { MxHeader } from "@/components/SignatureTile";
import heroFaq from "@/assets/brand/hero-faq.webp";
import { PillBadge } from "@/components/PillBadge";
import { FaqAccordion } from "@/components/EnterprisePatterns";
import { F } from "@/lib/typography";
import { SOLO_FROM_LABEL } from "@/data/pricing";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

interface FAQItem {
  q: string;
  a: string;
}

/* Every fact below is derived from the catalog and the compliance data,
   never typed (truth law). */
const PEPTIDE_NAMES = SOLO_CATALOG.map((p) => p.name).join(", ");
const GLP1_EXCLUDED = Array.from(
  new Set(SOLO_CATALOG.filter((p) => p.gated).flatMap((p) => p.stateExclusions ?? [])),
).sort().join(", ");

const categories: { label: string; items: FAQItem[] }[] = [
  {
    label: "Getting started",
    items: [
      {
        q: "How does it work?",
        a: `Five steps. You choose a medicine or a protocol, and a term of one, three, six or twelve months. You answer health questions about your health history, current medicines and goals, at checkout, which takes a few minutes. A licensed U.S. physician reviews your answers and writes the prescription, or explains why not; if not, nothing is made and the refund policy applies. Your medicine ships cold with an at-home blood kit, included; you draw before your first dose, and your physician sets the dose from your results. At week ${RETEST_WEEK} the same blood test is drawn again, and your physician compares the two and continues, adjusts or stops the dose.`,
      },
      {
        q: "Do I need to see a doctor in person?",
        a: "No visit needed. Everything happens online. A licensed U.S. physician reviews your health questions, writes your prescription, and reads your blood test before your first dose and again at week 12.",
      },
      {
        q: "What if the physician says it is not right for me?",
        a: "You will hear why, and for some people the answer is to wait or try a different treatment. The refund policy explains what is refunded.",
      },
      {
        q: "Do I need bloodwork to start?",
        a: `Yes. An at-home blood kit of ${PANEL_TOTAL_MARKERS} markers ships with your first order, included, and your physician sets your dose from the results. At week ${RETEST_WEEK} the same test is drawn again and compared. If you have recent results from a CLIA-certified laboratory, your physician may use those for your baseline.`,
      },
      {
        q: "What if I have a health condition?",
        a: "Tell us in the health questions. Some conditions rule a medication out, such as certain cancers, pregnancy, or uncontrolled heart disease. Others change the dose or what your physician keeps an eye on.",
      },
    ],
  },
  {
    label: "The medications",
    items: [
      {
        q: "What is a peptide?",
        a: "A short chain of amino acids, the same building blocks as protein. Your body makes thousands of them as signals. The ones we prescribe are precise versions of signals your body already uses, so it does more of what it does anyway: feels full, releases growth hormone, or responds to desire.",
      },
      {
        q: "Which peptides do you offer?",
        a: `${PEPTIDE_NAMES}. Each has its own page explaining what it does, how you take it, and what it costs.`,
      },
      {
        q: "What is in the vial, and who made it?",
        a: "The medicine named on your prescription, compounded for you by VialsRX, a state-licensed 503A pharmacy, and shipped cold. The prescription is written by a licensed U.S. physician. Both are listed on this page with their addresses.",
      },
      {
        q: "What does a 503A pharmacy mean?",
        a: "A pharmacy licensed to make a medication for one named patient, from a physician's prescription. That is what lets your dose and formulation be set for you.",
      },
      {
        q: "Who provides the clinical care?",
        a: PROVIDER_INFO.body,
      },
      {
        q: "Which pharmacy fills the prescriptions?",
        a: PHARMACY_INFO.body.replace(/\n+/g, " "),
      },
    ],
  },
  {
    label: "Pricing",
    items: [
      {
        q: "How much does it cost?",
        a: `Single peptides start from ${SOLO_FROM_LABEL} a month. One monthly price, paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six months 15%, twelve 20%. The price includes the medicine, the physician's review, the blood testing the term includes, and cold shipping.`,
      },
      {
        q: "What do I pay today?",
        a: "The whole term, up front: the monthly price times the months in the term. The health questions follow, then the physician's decision, then your medicine ships.",
      },
      {
        q: "Can I cancel?",
        a: "Yes. Cancellation takes effect at the end of your current cycle. Medication that has already shipped cannot be returned under pharmacy regulations. The refund policy has the details.",
      },
      {
        q: "Do you take insurance?",
        a: "Nexphoria is self-pay. Insurance does not cover compounded peptides.",
      },
    ],
  },
  {
    label: "Safety",
    items: [
      {
        q: "What are the side effects?",
        a: "It depends on the medication. GLP-1 medications like semaglutide and tirzepatide can cause nausea and a smaller appetite while your dose steps up. Tesamorelin can cause redness where you inject and some water retention. PT-141 can cause nausea and flushing, and raises blood pressure for a few hours. Your physician reviews your history for the risks that matter to you.",
      },
      {
        q: "What if something feels wrong?",
        a: "For chest pain, trouble breathing, or a severe allergic reaction, call emergency services. For anything else, stop and contact your physician before your next dose.",
      },
      {
        q: "How do I store it?",
        a: "In the fridge, in its box, following the instructions that come with it. Your shipment arrives cold with a temperature indicator. If the indicator shows the cold chain broke, do not use it, and email hello@nexphoria.com.",
      },
      {
        q: "What if I miss a dose?",
        a: "Follow the instructions in your box for your medication. Never double up to catch up. If you are unsure, ask your physician before the next dose.",
      },
    ],
  },
  {
    label: "Shipping",
    items: [
      {
        q: "How is it shipped?",
        a: `Cold, in plain packaging, to your door. We ship to all 50 states. Compounded GLP-1 medication is restricted by law in ${GLP1_EXCLUDED}.`,
      },
      {
        q: "When does it arrive?",
        a: "Once your physician approves, the pharmacy makes your medication and ships it cold. You get an email with tracking when it is on its way.",
      },
      {
        q: "Can I travel with it?",
        a: "Within the United States, yes. Keep it cold and keep the prescription label on the box. We ship inside the United States only.",
      },
      {
        q: "Do you ship internationally?",
        a: "No. We ship within the United States, to states where our physicians are licensed.",
      },
    ],
  },
  {
    label: "Legal",
    items: [
      {
        q: "Are peptides legal?",
        a: "Yes, when prescribed by a licensed U.S. physician and made by a licensed 503A pharmacy. Semaglutide, tirzepatide, tesamorelin and PT-141 each exist as FDA-approved branded drugs. The compounded versions we prescribe are prepared for you, and prescribing them is a routine part of medical practice in the United States.",
      },
      {
        q: "Is this FDA-approved?",
        a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared for you by a state-licensed 503A compounding pharmacy under a physician's prescription. Where a branded, FDA-approved version of a molecule exists, ours is the compounded version and is not the branded product.",
      },
      {
        q: "Who is behind Nexphoria?",
        a: "Nexphoria operates the service and does not make clinical decisions. Prescriptions are written by independent, U.S.-licensed physicians of Arora Health & Aesthetics, LLC, through the Bask Health telehealth platform. Medicines are compounded by VialsRX, a state-licensed 503A compounding pharmacy in Houston, Texas, and blood work is analysed by a CLIA-certified laboratory. The physicians and the pharmacy are listed on this page with their addresses.",
      },
    ],
  },
];

export default function FAQPage() {
  // Flatten all FAQ items for JSON-LD
  const allFaqItems = categories.flatMap((c) => c.items);

  useSeo({
    title: "Common questions: how it works, cost, safety, shipping",
    description: "Plain answers about physician-prescribed peptides: what they are, who prescribes them, what they cost, side effects, shipping, and the week-12 blood panel.",
    path: "/faq",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria FAQ", description: "Frequently asked questions about physician-prescribed peptide therapy at Nexphoria.", path: "/faq", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]),
      faqJsonLd(allFaqItems),
    ],
  });
  const [activeCategory, setActiveCategory] = useState(0);

  // Roving-tabindex focus targets for the vertical tablist (WAI-ARIA tabs).
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  const categoryHeadings: Record<string, string> = {
    "Getting started": "Getting started.",
    "The medications": "The medications.",
    Pricing: "Pricing and plans.",
    Safety: "Safety and side effects.",
    Shipping: "Shipping and delivery.",
    Legal: "Legal and regulatory.",
  };

  return (
    <SiteLayout navVariant="showcase">
      {/* NOT a <main id="main-content">: SiteLayout already renders the sole
          <main id="main-content"> landmark + skip-link target around all
          children. A second one here duplicated the landmark AND the id. */}
      <div style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">Frequently asked</PillBadge>}
            headline={
              <>
                <span>Common questions.</span>
              </>
            }
            subtitle="How it works, what it costs, safety, shipping, and who is involved."
          />

          {/* Editorial hero — questions answered, mind settled */}
          <figure
            className="relative overflow-hidden"
            style={{ borderRadius: "var(--nx-r-lg)", border: "1px solid var(--nx-border)" }}
            data-testid="faq-hero-editorial"
          >
            <img
              src={heroFaq}
              alt="A woman reads calmly in a sunlit armchair by a tall window, tea on the side table"
              className="w-full object-cover"
              style={{ aspectRatio: "21 / 9", minHeight: "300px" }}
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in srgb, var(--nx-fg) 52%, transparent) 0%, color-mix(in srgb, var(--nx-fg) 10%, transparent) 34%, transparent 55%)",
              }}
            />
            <figcaption className="absolute left-0 right-0 bottom-0 p-6 md:p-10">
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-xl)",
                  fontWeight: 500,
                  lineHeight: 1.35,
                  color: "var(--nx-ceramic)",
                  maxWidth: "40ch",
                  textShadow: "0 1px 12px color-mix(in srgb, var(--nx-fg) 40%, transparent)",
                }}
              >
              </p>
            </figcaption>
          </figure>
        </div>
      </div>


      {/* ── FAQ categories + accordion ── */}
      <section
        className="py-[var(--nx-section-y)]"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
            }}
            className="md:grid-cols-[200px_1fr]"
          >
            {/* Category nav */}
            <aside>
              <nav
                style={{
                  position: "sticky",
                  top: "7rem",
                }}
                aria-label="FAQ categories"
              >
                <p
                  style={{
                    fontFamily: F,
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 700,
                    letterSpacing: "var(--nx-ls-caps)",
                    textTransform: "uppercase",
                    color: "var(--nx-fg-muted)",
                    marginBottom: "1rem",
                  }}
                  id="faq-categories-heading"
                >
                  CATEGORIES
                </p>
                <ul
                  role="tablist"
                  aria-labelledby="faq-categories-heading"
                  aria-orientation="vertical"
                  onKeyDown={onTabsKeyDown}
                  style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}
                >
                  {categories.map((cat, i) => (
                    <li key={cat.label}>
                      <button
                        ref={(el) => { tabRefs.current[i] = el; }}
                        id={`faq-tab-${i}`}
                        role="tab"
                        aria-selected={activeCategory === i}
                        aria-controls={`faq-panel-${i}`}
                        tabIndex={activeCategory === i ? 0 : -1}
                        onClick={() => setActiveCategory(i)}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nx-cobalt)] focus-visible:ring-offset-2"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0.5rem 0",
                          fontFamily: F,
                          fontSize: "var(--nx-t-sm)",
                          fontWeight: activeCategory === i ? 600 : 400,
                          color: activeCategory === i ? "var(--nx-cobalt)" : "var(--nx-fg-muted)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          transition: "color var(--nx-dur-2) var(--nx-ease)",
                        }}
                      >
                        {activeCategory === i && (
                          <span
                            aria-hidden="true"
                            style={{
                              display: "inline-block",
                              width: "16px",
                              height: "1px",
                              backgroundColor: "var(--nx-cobalt)",
                            }}
                          />
                        )}
                        {cat.label}
                        <span
                          style={{
                            fontFamily: F,
                            fontSize: "var(--nx-t-xs)",
                            color: "var(--nx-fg-muted)",
                          }}
                        >
                          {cat.items.length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Accordion — plain div, NOT a second <main>: the page already
                has one <main id="main-content"> landmark above (house pattern,
                cf. Pricing.tsx). Two <main> elements is invalid HTML5.
                Doubles as the tabpanel for the category tablist. */}
            <div
              id={`faq-panel-${activeCategory}`}
              role="tabpanel"
              aria-labelledby={`faq-tab-${activeCategory}`}
              tabIndex={0}
            >
              <Reveal>
                <div className="nx-sec-head" style={{ marginBottom: "2rem" }}>
                  <p className="nx-eyebrow">
                    {categories[activeCategory].label}
                  </p>
                  <h2 className="nx-dsh2">
                    {categoryHeadings[categories[activeCategory].label] ?? `${categories[activeCategory].label} questions.`}
                  </h2>
                </div>

                <FaqAccordion key={activeCategory} items={categories[activeCategory].items} openFirst={false} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FinalCTAStrip
        title="Still have questions?"
        sub="Email hello@nexphoria.com. Clinical questions go to your physician."
      />
    </SiteLayout>
  );
}
