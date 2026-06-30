import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { Plus, Minus } from "lucide-react";
import { useSeo } from "@/lib/seo";

interface FAQItem {
  q: string;
  a: string;
}

const categories: { label: string; items: FAQItem[] }[] = [
  {
    label: "Safety",
    items: [
      {
        q: "What if I have a pre-existing condition?",
        a: "Pre-existing conditions are assessed by your assigned physician after reviewing your full intake and laboratory results. Some conditions — active cancer, uncontrolled cardiovascular disease, pregnancy — are absolute contraindications for specific peptide protocols. Others require modified dosing, additional monitoring, or a different compound selection. Honesty in your intake is clinically essential; your physician uses that information to protect you, not to exclude you.",
      },
      {
        q: "How do I store the peptides?",
        a: "Most compounded peptides require refrigeration at 2–8°C (36–46°F). Lyophilized (freeze-dried) formulations are stable at room temperature until reconstituted, then require refrigeration. Your shipping kit includes temperature indicators; if the indicator has been breached during transit, do not use the medication. Your physician's instructions will specify handling requirements for your specific compounds.",
      },
      {
        q: "What if I miss a dose?",
        a: "For most protocols, a single missed dose does not require correction — resume your regular schedule at the next scheduled time. Do not double-dose to compensate. GLP-1 protocols (semaglutide, tirzepatide) administered weekly: if fewer than 5 days have passed since the missed dose, administer as soon as you remember and resume your weekly schedule. If more than 5 days have passed, skip that dose and resume at your next scheduled injection date.",
      },
      {
        q: "Can I travel with peptides?",
        a: "Compounded peptides may be transported domestically with a copy of your prescription. For air travel, peptides requiring refrigeration may be packed with a physician's letter in an insulated carry-on container — TSA allows medically necessary liquids exceeding 3.4 oz with appropriate documentation. International travel is subject to destination country regulations and import restrictions on compounded medications; Nexphoria does not advise on international regulatory compliance.",
      },
    ],
  },
  {
    label: "Legality",
    items: [
      {
        q: "Are peptides legal?",
        a: "Compounded peptides prescribed by a licensed US physician and prepared by a 503A-licensed US compounding pharmacy are legal to obtain and possess in the United States. The regulatory status of individual compounds varies: tirzepatide and semaglutide have FDA approval for specific indications and may also be compounded off-label; BPC-157 and TB-500 are compounded off-label without FDA approval for any indication. Legality of possession and import varies by country. Nexphoria operates within US federal and state pharmacy law.",
      },
      {
        q: "Is this FDA-approved?",
        a: "Tirzepatide (Mounjaro, Zepbound) and semaglutide (Ozempic, Wegovy) are FDA-approved drugs that may also be compounded under certain conditions. Most other peptides in our formulary — BPC-157, TB-500, CJC-1295, Ipamorelin, Selank, Semax — are prescribed off-label and are not FDA-approved for any indication. They are compounded by 503A pharmacies under a physician's prescription. Off-label prescribing is a standard, legal component of clinical practice in the United States.",
      },
      {
        q: "Do you ship internationally?",
        a: "No. Nexphoria ships within the United States only. We serve members in states where our physicians hold active licensure. International shipping of compounded medications is prohibited under US export law and the laws of most destination countries.",
      },
    ],
  },
  {
    label: "Process",
    items: [
      {
        q: "What if the physician declines my protocol?",
        a: "If your assigned physician determines that a requested protocol is clinically inappropriate based on your labs or health history, the prescription will not be issued. The physician may propose a modified protocol, a different compound, or recommend evaluation by a specialist before proceeding. Declinations are documented in your file. You are not charged for pharmacy compounding if no prescription is issued.",
      },
      {
        q: "What labs do I need?",
        a: "A 38-biomarker Quest Diagnostics panel is required before any prescription is written. The panel covers hormones, metabolic markers, inflammation, nutrients, cardiovascular markers, thyroid, kidney and liver function, and a complete blood count. Your requisition is generated in your member portal. You draw at any Quest Diagnostics patient service center or arrange a home draw. If you have comprehensive lab results from within the past 30 days from a CLIA-certified laboratory, your physician may accept them in lieu of a new draw — subject to physician discretion.",
      },
      {
        q: "How quickly will I see results?",
        a: "Onset depends on the compound and your individual response. GLP-1 agonist protocols (semaglutide, tirzepatide) typically produce measurable weight reduction within 4–8 weeks at therapeutic dose; full efficacy is assessed at 12–16 weeks. Growth hormone secretagogue protocols show IGF-1 elevation within 4–6 weeks; lean-mass changes are typically measurable at 12–16 weeks. Tissue repair protocols such as BPC-157 vary significantly by indication and tissue type. Your physician will set outcome expectations at your initial consultation based on your baseline biomarkers.",
      },
      {
        q: "Who reviews my bloodwork?",
        a: "Your assigned board-certified physician reviews your Quest Diagnostics results within 24 hours of receipt in the member portal. Lab results are not reviewed by algorithms, nurses, or non-physician staff as the primary clinical reviewer. Your physician sends a structured response via secure portal message — either a prescription, a request for additional information, or a follow-up question about your health history.",
      },
    ],
  },
  {
    label: "Pricing",
    items: [
      {
        q: "Can I cancel after the first month?",
        a: "Yes. There are no long-term contracts or early termination fees. Cancel anytime from your member portal; cancellation takes effect at the end of your current billing cycle. Compounded medications that have already been dispensed cannot be returned or refunded under pharmacy regulations. Upcoming shipments scheduled after your cancellation date will not be processed.",
      },
      {
        q: "Can I use insurance or FSA/HSA?",
        a: "Nexphoria protocols are self-pay. Insurance reimbursement for compounded off-label peptides is not available. For FSA/HSA accounts: many compounded prescriptions qualify as eligible medical expenses. We provide itemized receipts at checkout that meet FSA/HSA documentation requirements. Consult your FSA/HSA plan administrator to confirm eligibility for your specific protocol.",
      },
    ],
  },
  {
    label: "Side Effects",
    items: [
      {
        q: "What are the common side effects?",
        a: "Side effects vary by compound. GLP-1 agonists (semaglutide, tirzepatide) most commonly cause nausea, reduced appetite, and mild GI disturbance during dose titration — typically resolving within 2–4 weeks. Growth hormone secretagogues may cause water retention and mild joint discomfort during initial weeks. BPC-157 is generally well tolerated with limited reported adverse effects in human case series. Your physician reviews your health history specifically to identify patients at elevated risk for compound-specific adverse effects.",
      },
      {
        q: "What should I do if I have an adverse reaction?",
        a: "For non-urgent symptoms such as mild nausea, site irritation, or fatigue, contact your physician via secure portal message. For urgent or severe symptoms — chest pain, difficulty breathing, allergic reaction, severe abdominal pain — seek emergency medical care immediately and do not wait for portal response. Nexphoria does not provide emergency medical services. After an acute event, contact your physician via portal with a description of the event so your protocol can be reviewed.",
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
        borderColor: "rgba(45,74,43,0.15)",
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
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: isOpen ? "italic" : "normal",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "#4A4A4A",
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
  useSeo({
    title: "Frequently Asked Questions | Nexphoria",
    description: "Safety. Legality. Pricing. Process. Side effects. Direct answers.",
    path: "/faq",
  });
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  const categoryHeadings: Record<string, string> = {
    Safety: "Safety and administration.",
    Legality: "Legal status and compliance.",
    Process: "Clinical process and monitoring.",
    Pricing: "Pricing, billing, and cancellation.",
    "Side Effects": "Adverse effects and response.",
  };

  return (
    <SiteLayout navVariant="gate">
      {/* ── Hero ── */}
      <section
        className="py-32 md:py-40"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              FAQ
            </p>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "0.5rem",
              }}
            >
              Direct answers.
            </h1>
            <p
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}
            >
              No spin.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                color: "#4A4A4A",
                lineHeight: 1.65,
                maxWidth: "560px",
              }}
            >
              If the answer is no or it depends, we say so. Peptide therapy involves real
              pharmacology, real regulatory complexity, and real clinical judgment. These
              questions deserve accurate answers.{" "}
              <a href="#/contact" style={{ color: "var(--nx-cobalt)", textDecoration: "underline" }}>
                Contact us
              </a>{" "}
              if your question isn't here.
            </p>
          </Reveal>
        </div>
      </section>

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
                    fontFamily: "'DM Mono', monospace",
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
                          fontFamily: "'Inter', sans-serif",
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
                            fontFamily: "'DM Mono', monospace",
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
                    fontFamily: "'DM Mono', monospace",
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
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
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
