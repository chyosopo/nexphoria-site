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
    label: "Peptides",
    items: [
      {
        q: "What is a peptide?",
        a: "A short chain of amino acids, the same building blocks as protein. Your body makes thousands of them as messengers. The ones prescribed here copy a signal your body already uses, so a cell does more of what it does anyway: release a hormone, handle sugar, start desire.",
      },
      {
        q: "Which peptides do you offer?",
        a: `${PEPTIDE_NAMES}. A U.S. licensed doctor picks yours from your questionnaire, and each one has its own page that explains what it does and how you take it.`,
      },
      {
        q: "How is this different from buying peptides online?",
        a: "Every medicine here is prescribed by a U.S. licensed doctor and made for you in a licensed 503A pharmacy in the United States, then shipped cold. You know what is in the vial, who made it, and who prescribed it.",
      },
      {
        q: "What does a 503A pharmacy mean?",
        a: "A pharmacy licensed to compound a medicine for one named patient, from a doctor's prescription. That is how your dose and formulation can be set for you rather than mass-produced.",
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
    label: "Your doctor",
    items: [
      {
        q: "How does it work, start to finish?",
        a: `You choose a plan and check out. You answer the questionnaire, which takes about two minutes. A U.S. licensed doctor reads every answer and decides. If it is a yes, your medicine is made for you in a licensed 503A pharmacy and ships cold. At week ${RETEST_WEEK} a full blood panel, included in your plan, shows your doctor what changed, and your dose follows it.`,
      },
      {
        q: "Do I actually talk to a doctor?",
        a: "A real one reads your full questionnaire and signs your prescription. The decision is theirs alone. If your doctor needs more from you before deciding, they ask.",
      },
      {
        q: "What if my doctor says no?",
        a: "Then it is a no, and your doctor tells you why. They may suggest a different plan. The refund policy sets out what is refunded.",
      },
      {
        q: "What bloodwork do I need?",
        a: `One full panel of ${PANEL_TOTAL_MARKERS} markers at week ${RETEST_WEEK}, included in your plan. You start first. We send you what you need for the draw as week ${RETEST_WEEK} approaches. If you have recent results from a CLIA-certified lab, your doctor may read those too.`,
      },
      {
        q: "Who reads my bloodwork?",
        a: "Your doctor. They read every marker against the plan you are on and come back with a decision: continue, adjust, or stop, and why.",
      },
      {
        q: "What if I have a health condition?",
        a: "Tell your doctor in the questionnaire. Some conditions rule a medicine out, such as certain cancers, pregnancy, or uncontrolled heart disease. Others change the dose or what your doctor watches. Every answer is read by the doctor who decides.",
      },
    ],
  },
  {
    label: "Price",
    items: [
      {
        q: "What does it cost?",
        a: `Single peptides start from ${SOLO_FROM_LABEL} a month. Three-month plans save 15% a month and twelve-month plans save 30%. The figure is complete: your doctor's review, your medicine, cold shipping and the week-${RETEST_WEEK} blood panel are within it.`,
      },
      {
        q: "What do I pay today?",
        a: "The monthly figure shown at checkout. What happens next is on the same page: questionnaire, doctor, then your medicine is made and shipped. If your doctor declines, the refund policy sets out what is refunded.",
      },
      {
        q: "Can I cancel?",
        a: "Yes. Cancellation takes effect at the end of your current cycle. Medicine that has already been dispensed cannot be returned under pharmacy regulations. The refund policy has the detail.",
      },
      {
        q: "Can I use insurance?",
        a: "Nexphoria is self-pay. Insurance does not cover compounded peptides.",
      },
    ],
  },
  {
    label: "Safety",
    items: [
      {
        q: "What are the common side effects?",
        a: "They depend on the medicine. GLP-1 medicines such as semaglutide and tirzepatide can cause nausea and a smaller appetite while the dose steps up. Tesamorelin can cause redness where you inject and some water retention. PT-141 can cause nausea and flushing, and raises blood pressure for a few hours. Your doctor reads your history for the risks that matter to you before prescribing.",
      },
      {
        q: "What do I do if something feels wrong?",
        a: "For chest pain, trouble breathing or a severe allergic reaction, call emergency services first. For anything else, stop and contact your doctor before your next dose.",
      },
      {
        q: "How do I store it?",
        a: "In the fridge, in its box, following the instructions that ship with it. Your box arrives cold with a temperature indicator. If the indicator shows the cold chain broke, do not use it, and email hello@nexphoria.com.",
      },
      {
        q: "What if I miss a dose?",
        a: "Follow the instructions in your box for your medicine. Never double a dose to catch up. If you are unsure, ask your doctor before the next one.",
      },
    ],
  },
  {
    label: "Shipping",
    items: [
      {
        q: "How is it shipped?",
        a: `Cold, in a plain box with a temperature indicator, to your door. We ship to all 50 states. Semaglutide and tirzepatide are excluded by law in ${GLP1_EXCLUDED}.`,
      },
      {
        q: "When does it arrive?",
        a: "After your doctor says yes, the pharmacy makes your medicine and ships it cold. You get a confirmation by email when it is on its way.",
      },
      {
        q: "Can I travel with it?",
        a: "Within the United States, yes, with your prescription label on the box. Keep it cold. Other countries have their own import rules and we ship inside the United States only.",
      },
      {
        q: "Do you ship internationally?",
        a: "No. We ship within the United States, to states where our doctors hold a licence.",
      },
    ],
  },
  {
    label: "Legal",
    items: [
      {
        q: "Are peptides legal?",
        a: "Prescribed by a U.S. licensed physician and compounded by a licensed 503A pharmacy, yes. Semaglutide and tirzepatide are also available as FDA-approved branded drugs. Tesamorelin and PT-141 exist as FDA-approved branded drugs too; the compounded versions here are prescribed off-label, which is a routine part of medical practice in the United States.",
      },
      {
        q: "Is this FDA-approved?",
        a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared for you by a state-licensed 503A compounding pharmacy under a physician's prescription. Where a branded, FDA-approved version of a molecule exists, ours is the compounded version, made for you, and is not the branded product.",
      },
      {
        q: "Is Nexphoria legit?",
        a: "Every prescription here is written by a U.S. licensed physician through the Bask Health telehealth platform. Your medicine is compounded in a licensed 503A pharmacy in the United States and shipped cold. The provider and the pharmacy are named on this page, with their addresses.",
      },
    ],
  },
];

export default function FAQPage() {
  // Flatten all FAQ items for JSON-LD
  const allFaqItems = categories.flatMap((c) => c.items);

  useSeo({
    title: "Your questions, answered: safety, legality, price, process",
    description: "Plain answers about doctor-prescribed peptides: what they are, who prescribes them, what they cost, side effects, shipping, and the week-12 blood panel.",
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
    Products: "What you're getting.",
    Process: "Clinical process and monitoring.",
    Pricing: "Pricing, billing, and cancellation.",
    Safety: "Safety, storage, and administration.",
    Shipping: "Cold-chain shipping and delivery.",
    Refills: "Refills, changes, and protocol adjustments.",
    Legality: "Legal status and compliance.",
    "Nexphoria vs. Alternatives": "How Nexphoria compares.",
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
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 62%, transparent)" }}>Everything you wanted</span><br />
                <span>to ask your doctor.</span>
              </>
            }
            subtitle="Plain answers on dosing, safety, side effects, shipping, insurance, and what to expect, before you start."
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
                Dosing, safety, shipping, price. Answered plainly, by the people who built it.
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
                <p
                  style={{
                    fontFamily: F,
                    fontSize: "var(--nx-t-2xs)",
                    fontWeight: 500,
                    letterSpacing: "var(--nx-ls-wide)",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.625rem",
                  }}
                >
                  {categories[activeCategory].label}
                </p>
                <h2
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 500,
                    fontSize: "var(--nx-t-h2)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                    marginBottom: "2rem",
                  }}
                >
                  {categoryHeadings[categories[activeCategory].label] ?? `${categories[activeCategory].label} questions.`}
                </h2>

                <FaqAccordion key={activeCategory} items={categories[activeCategory].items} openFirst={false} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FinalCTAStrip
        title="Still have questions?"
        sub="Email hello@nexphoria.com and a person answers. Clinical questions go to your doctor."
      />
    </SiteLayout>
  );
}
