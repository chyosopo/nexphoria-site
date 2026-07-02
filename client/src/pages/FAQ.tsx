import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { Plus, Minus } from "lucide-react";
import { useSeo, faqJsonLd, webPageJsonLd } from "@/lib/seo";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";

interface FAQItem {
  q: string;
  a: string;
}

const categories: { label: string; items: FAQItem[] }[] = [
  {
    label: "Products",
    items: [
      {
        q: "What is a peptide?",
        a: "Peptides are short chains of amino acids — the same building blocks as proteins — that act as precise biological messengers. They signal cells to perform specific functions: repair tissue, stimulate hormone release, reduce inflammation, or regulate metabolism. Unlike hormone replacement, most peptides instruct your body to produce or optimize what it already makes.",
      },
      {
        q: "How is this different from buying research peptides online?",
        a: "Research-grade peptides sold online are not intended for human use, lack sterility testing, and have no dosing oversight. Nexphoria protocols are prescribed by a board-certified physician, compounded in a licensed 503A US pharmacy under sterile conditions, batch-tested for potency and purity, and shipped cold-chain. The compound you administer is the compound you were prescribed — not an unverified powder.",
      },
      {
        q: "What compounds do you offer?",
        a: "Our formulary includes GLP-1 agonists (semaglutide, tirzepatide), growth hormone secretagogues (CJC-1295, Ipamorelin, Sermorelin, Tesamorelin), tissue repair peptides (BPC-157, TB-500, GHK-Cu), cognitive peptides (Selank, Semax), HPG-axis modulators (Enclomiphene, Kisspeptin), and longevity protocols (NAD+, Epitalon, MOTS-c). Final compound selection is made by your physician after reviewing your labs.",
      },
      {
        q: "What does a 503A-licensed pharmacy mean?",
        a: "503A pharmacies compound medications for individual patients under a valid physician prescription. This allows dosage and formulation customization that mass-manufactured products cannot provide. Every Nexphoria compound is sterile-prepared in an ISO-compliant cleanroom, batch-tested for potency and purity, and ships with a certificate of analysis.",
      },
    ],
  },
  {
    label: "Process",
    items: [
      {
        q: "How does the process work start to finish?",
        a: "Complete the a structured medical intake. A Quest Diagnostics lab requisition is generated in your member portal. Draw at any of 2,500+ Quest locations nationwide. A board-certified physician reviews your labs and intake by a licensed physician. Your telehealth consult is scheduled through Bask Health. Protocol is prescribed, compounded, and shipped cold-chain.",
      },
      {
        q: "What if the physician declines my protocol?",
        a: "If your physician determines a requested protocol is clinically inappropriate, the prescription is not issued. The physician may propose a modified protocol or a different compound. You are not charged for pharmacy compounding if no prescription is issued. Declinations are documented in your file with clinical rationale.",
      },
      {
        q: "What labs do I need?",
        a: "A 38-biomarker Quest Diagnostics panel is required before any prescription is written. Your requisition is generated in your member portal. If you have CLIA-certified results from within the past 30 days, your physician may accept them in lieu of a new draw — subject to physician discretion.",
      },
      {
        q: "Who reviews my bloodwork?",
        a: "Your assigned board-certified physician reviews your Quest Diagnostics results within 24 hours of receipt. Results are not reviewed by algorithms, nurses, or non-physician staff. Your physician responds via secure portal message with either a prescription, a question, or a request for additional information.",
      },
      {
        q: "How quickly will I see results?",
        a: "Onset depends on compound and individual response. GLP-1 protocols show measurable weight change within 4–8 weeks. GHS protocols show IGF-1 elevation at 6–8 weeks; lean mass changes at 12–16 weeks. Tissue repair protocols (BPC-157) vary by indication. Your physician sets realistic outcome expectations at consultation.",
      },
    ],
  },
  {
    label: "Pricing",
    items: [
      {
        q: "What does a Nexphoria protocol cost?",
        a: "Protocols start from $249/month (single cognitive peptides) to $389/month (longevity stacks). 6-month plans save 10%. 12-month plans save 20% and are our best-value option. Your physician consult, lab interpretation, and cold-chain shipping are included — there are no hidden fees.",
      },
      {
        q: "Can I cancel after the first month?",
        a: "Yes. No long-term contracts or early termination fees. Cancel from your member portal; cancellation takes effect at end of your current cycle. Dispensed medications cannot be returned under pharmacy regulations.",
      },
      {
        q: "Can I use insurance or FSA/HSA?",
        a: "Nexphoria is self-pay. Insurance reimbursement for compounded off-label peptides is not available. Many compounded prescriptions qualify as FSA/HSA-eligible medical expenses. We provide itemized receipts meeting FSA/HSA documentation requirements. Confirm eligibility with your plan administrator.",
      },
      {
        q: "Is the physician consult included?",
        a: "Yes. Initial physician consultation and all follow-up consultations within your subscription cycle are included. There is no separate consult fee charged to your card.",
      },
    ],
  },
  {
    label: "Safety",
    items: [
      {
        q: "What if I have a pre-existing condition?",
        a: "Pre-existing conditions are assessed by your physician after reviewing your full intake and lab results. Active cancer, uncontrolled cardiovascular disease, and pregnancy are absolute contraindications for specific protocols. Others require modified dosing or additional monitoring. Your physician uses this information to protect you, not to exclude you.",
      },
      {
        q: "What are common side effects?",
        a: "Side effects vary by compound. GLP-1 agonists commonly cause mild nausea and reduced appetite during dose titration — typically resolving within 2–4 weeks. GH secretagogues may cause transient water retention. BPC-157 is generally well tolerated. Your physician reviews your history to identify compound-specific risk factors before prescribing.",
      },
      {
        q: "What should I do if I have an adverse reaction?",
        a: "For non-urgent symptoms, contact your physician via secure portal message. For urgent symptoms — chest pain, difficulty breathing, severe allergic reaction — seek emergency care immediately. Do not wait for portal response in an emergency. Contact your physician afterward to document the event for protocol review.",
      },
      {
        q: "How do I store my peptides?",
        a: "Most compounded peptides require refrigeration at 2–8°C (36–46°F). Lyophilized formulations are stable at room temperature until reconstituted. Your shipping kit includes temperature indicators. If the indicator shows breach during transit, do not use the medication. Your prescription instructions specify handling requirements.",
      },
    ],
  },
  {
    label: "Shipping",
    items: [
      {
        q: "How are peptides shipped?",
        a: "All orders ship cold-chain overnight with temperature-monitored packaging and temperature indicator cards. We currently ship to the contiguous 48 US states. Each shipment includes your prescription label, a certificate of analysis, and administration instructions from your physician.",
      },
      {
        q: "How long does it take to receive my order?",
        a: "After physician approval and pharmacy compounding (typically 3–5 business days), your order ships overnight. Total time from approval to delivery is typically 4–7 business days. Expedited compounding is available on select protocols — ask your physician.",
      },
      {
        q: "Can I travel with my peptides?",
        a: "Yes, domestically, with a copy of your prescription. For air travel, TSA permits medically necessary liquids above 3.4 oz with physician documentation. International travel is subject to destination country import laws — Nexphoria does not advise on international regulatory compliance.",
      },
    ],
  },
  {
    label: "Refills",
    items: [
      {
        q: "How do refills work?",
        a: "Active subscribers receive automatic refill shipments based on their protocol cadence. Your physician reviews your labs before each refill cycle and may adjust dosing. You can pause or reschedule refills from your member portal with at least 5 business days' notice.",
      },
      {
        q: "What if I want to change my protocol?",
        a: "Request a protocol modification through your member portal. Your physician reviews the request and your most recent labs before approving any change. Protocol changes may require a new lab draw if your last panel is more than 90 days old.",
      },
      {
        q: "What if I miss a dose?",
        a: "For most protocols, a single missed dose does not require correction — resume your regular schedule at the next scheduled time. Do not double-dose. GLP-1 protocols administered weekly: if fewer than 5 days have passed since the missed dose, administer as soon as you remember. If more than 5 days have passed, skip that dose and resume at your next scheduled date.",
      },
    ],
  },
  {
    label: "Legality",
    items: [
      {
        q: "Are peptides legal?",
        a: "Compounded peptides prescribed by a licensed US physician and prepared by a 503A-licensed US compounding pharmacy are legal to obtain and possess in the United States. Tirzepatide and semaglutide have FDA approval for specific indications and may also be compounded off-label. BPC-157, TB-500, CJC-1295, and Ipamorelin are compounded off-label without FDA approval for any indication. Nexphoria operates within US federal and state pharmacy law.",
      },
      {
        q: "Is this FDA-approved?",
        a: "Tirzepatide and semaglutide are FDA-approved drugs that may also be compounded. Most other peptides in our formulary are prescribed off-label — not FDA-approved for any specific indication. Off-label prescribing is a legal, routine component of clinical practice in the United States. Compounding under a physician's prescription is regulated by state pharmacy boards and the FDA.",
      },
      {
        q: "Do you ship internationally?",
        a: "No. Nexphoria ships within the United States only to states where our physicians hold active licensure. International shipping of compounded medications is prohibited under US export law and the laws of most destination countries.",
      },
    ],
  },
  {
    label: "Nexphoria vs. Alternatives",
    items: [
      {
        q: "Is Nexphoria legit?",
        a: "Nexphoria is a physician-supervised peptide provider that routes every prescription through a board-certified clinician via the Bask Health telehealth platform. Compounds are prepared in a U.S. 503A-licensed compounding pharmacy under sterile ISO conditions, batch-tested with a Certificate of Analysis on file, and shipped cold-chain. No prescription is dispensed without physician sign-off.",
      },
      {
        q: "What makes Nexphoria different for peptide therapy?",
        a: "Nexphoria combines 16+ physician-prescribed peptides, quarterly biomarker monitoring at CLIA-certified labs, sterile formulations from state-licensed 503A compounding pharmacies, and COA documentation — all in a single subscription, with every protocol reviewed against your own labs.",
      },
      {
        q: "What is the difference between Nexphoria and buying peptides from a research chemical site?",
        a: "Research-grade peptides sold online are labeled 'not for human use,' lack sterility certification, and carry no dosing guidance or physician oversight. Nexphoria peptides are prescribed by a board-certified clinician, compounded in a 503A-licensed sterile facility, batch-tested for potency and purity, and shipped cold-chain with full chain-of-custody documentation. The compound you inject is the compound you were prescribed.",
      },
      {
        q: "What is the difference between GLP-1 (Ozempic/Wegovy) and Retatrutide from Nexphoria?",
        a: "Semaglutide (Ozempic, Wegovy) is a GLP-1 receptor agonist producing ~15% body-weight reduction. Tirzepatide adds dual GIP/GLP-1 agonism, producing 18–28% reduction in trials. Retatrutide is a triple GIP/GLP-1/glucagon agonist showing 24–28% weight reduction in Phase 2 trials — with additional metabolic and NASH benefits. Nexphoria physicians prescribe based on your labs and clinical profile, not one-size-fits-all dosing.",
      },
    ],
  },
];

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--nx-cobalt)",
        borderColor: "rgba(51, 59, 66,0.15)",
      }}
    >
      <button
        className="w-full"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-testid={`faq-item-${index}`}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1.5rem",
          padding: "1.5rem 0",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontStyle: isOpen ? "" : "normal",
            fontWeight: 500,
            fontSize: "clamp(1rem, 2vw, 1.375rem)",
            color: isOpen ? "var(--nx-cobalt)" : "var(--nx-fg)",
            lineHeight: 1.3,
            transition: "color 0.2s, font-style 0.2s",
          }}
        >
          {item.q}
        </p>
        <span
          style={{
            flexShrink: 0,
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: `1px solid ${isOpen ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "3px",
            transition: "border-color 0.2s",
          }}
        >
          {isOpen ? (
            <Minus size={12} style={{ color: "var(--nx-cobalt)" }} />
          ) : (
            <Plus size={12} style={{ color: "var(--nx-fg-muted)" }} />
          )}
        </span>
      </button>
      {isOpen && (
        <div
          data-testid={`faq-answer-${index}`}
          style={{
            paddingBottom: "1.5rem",
            paddingRight: "2.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "var(--nx-fg-graphite)",
              lineHeight: 1.7,
            }}
          >
            {item.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  // Flatten all FAQ items for JSON-LD
  const allFaqItems = categories.flatMap((c) => c.items);

  useSeo({
    title: "Peptide therapy FAQ — safety, legality, pricing, process",
    description: "Answers to the most common questions about physician-prescribed peptide therapy: 503A compounding, side effects, pricing, how bloodwork works, and what to expect.",
    path: "/faq",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria FAQ", description: "Frequently asked questions about physician-prescribed peptide therapy at Nexphoria.", path: "/faq", type: "MedicalWebPage" }),
      faqJsonLd(allFaqItems),
    ],
  });
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
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
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">Frequently asked</PillBadge>}
            headline={
              <>
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>Everything you wanted</span><br />
                <span>to ask your doctor.</span>
              </>
            }
            subtitle="Answers on dosing, safety, side effects, shipping, insurance, and what to expect. Still curious? Message your physician any time."
          />

          <div className="mx-grid">
            <ColoredHeroTile
              href="/faq"
              tone="sand"
              glyph={TileGlyphs.hex}
              label={<>Protocol questions<br /><span>dosing &amp; timing</span></>}
              caption="Most common asks"
              ctaLabel="See answers"
            />
            <ColoredHeroTile
              href="/faq"
              tone="sky"
              glyph={TileGlyphs.circle}
              label={<>Safety &amp; science<br /><span>peer-reviewed</span></>}
              caption="Most common asks"
              ctaLabel="See answers"
            />
          </div>
        </div>
      </main>

      {/* EVERYTHING BELOW STAYS UNCHANGED */}


      {/* ── FAQ categories + accordion ── */}
      <section
        className="py-24 md:py-32"
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg-muted)",
                    marginBottom: "1rem",
                  }}
                >
                  CATEGORIES
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {categories.map((cat, i) => (
                    <li key={cat.label}>
                      <button
                        onClick={() => { setActiveCategory(i); setOpenItem(null); }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0.5rem 0",
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "14px",
                          fontWeight: activeCategory === i ? 600 : 400,
                          color: activeCategory === i ? "var(--nx-cobalt)" : "var(--nx-fg-muted)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          transition: "color 0.2s",
                        }}
                      >
                        {activeCategory === i && (
                          <span
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
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "9px",
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

            {/* Accordion */}
            <main>
              <Reveal>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.625rem",
                  }}
                >
                  {categories[activeCategory].label}
                </p>
                <h2
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                    marginBottom: "2rem",
                  }}
                >
                  {categoryHeadings[categories[activeCategory].label] ?? `${categories[activeCategory].label} questions.`}
                </h2>

                <div>
                  {categories[activeCategory].items.map((item, i) => {
                    const key = `${activeCategory}-${i}`;
                    return (
                      <AccordionItem
                        key={key}
                        item={item}
                        index={i}
                        isOpen={openItem === key}
                        onToggle={() => toggleItem(key)}
                      />
                    );
                  })}
                </div>
              </Reveal>
            </main>
          </div>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Still have questions?"
        sub="Your assigned physician answers clinical questions via secure portal message within 48 hours."
      />
    </SiteLayout>
  );
}
