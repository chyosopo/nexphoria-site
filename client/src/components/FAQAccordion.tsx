import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

/**
 * FAQAccordion — reference pattern: 10-12 questions.
 * Categories: Safety · Legality · Efficacy · Pricing · Process · Side effects.
 * Tone: direct and confident, not defensive.
 * Direct answers. No hedging on the science, honest on limitations.
 */

const defaultFAQs: FAQItem[] = [
  {
    category: "PROCESS",
    q: "How does the Nexphoria prescription process work?",
    a: "You complete a 4-minute intake form, then schedule a blood draw — at home or at your nearest LabCorp. A board-certified US physician reviews your 65-marker panel and medical history, then writes a personalized prescription. Your compounded protocol ships cold-chain within 5-7 business days. Quarterly reassessments are included.",
  },
  {
    category: "PROCESS",
    q: "What is a peptide?",
    a: "Peptides are short chains of amino acids — the same building blocks as proteins — that act as precise biological messengers. They signal cells to perform specific functions: repair tissue, stimulate hormone release, reduce inflammation, or regulate metabolism. Unlike hormones, most peptides work by instructing your body to produce or optimize what it already makes, rather than replacing it.",
  },
  {
    category: "SAFETY",
    q: "Are peptides safe?",
    a: "When prescribed at clinical doses and monitored by a licensed physician, GHRH peptides like sermorelin, ipamorelin, and CJC-1295 have a well-established safety profile supported by years of clinical observation. Nexphoria protocols are always initiated after a full blood panel — not guesswork — and reassessed quarterly. Side effects are protocol-specific; your physician reviews risk and contraindications before prescribing.",
  },
  {
    category: "SAFETY",
    q: "What are the potential side effects?",
    a: "Side effects vary by compound. GH secretagogues like ipamorelin occasionally cause mild water retention or tingling in early weeks — this typically resolves. GLP-1 agonists (tirzepatide, semaglutide) may cause nausea during dose escalation, which is why we start low and titrate up. Your physician will advise on compound-specific considerations before you begin. We do not prescribe protocols where the risk-benefit profile is unclear.",
  },
  {
    category: "LEGALITY",
    q: "Are these peptides legal to prescribe?",
    a: "Yes. All Nexphoria protocols are prescribed by US-licensed, board-certified physicians. Compounds are dispensed by licensed 503A compounding pharmacies — not overseas suppliers. Peptides like ipamorelin, sermorelin, and tirzepatide are prescribed off-label under a valid physician's prescription, which is standard medical practice for compounded medications in the US. We do not ship research-grade compounds or powders.",
  },
  {
    category: "LEGALITY",
    q: "Why a 503A pharmacy? Why not a commercial manufacturer?",
    a: "503A pharmacies compound medications for individual patients under a valid prescription. This allows us to customize dosing, formulation, and concentration to your specific protocol — something mass-manufactured products cannot do. Every Nexphoria compound is sterile-prepared in ISO-compliant cleanrooms, batch-tested for potency and purity, and ships with a full certificate of analysis. This is the standard for prescription compounding in the US.",
  },
  {
    category: "EFFICACY",
    q: "How long until I see results?",
    a: "Timelines vary by compound and goal. GLP-1 protocols typically show meaningful weight change within 4-8 weeks at therapeutic dose. IGF-1 elevation from GH secretagogues is measurable at 6-8 weeks. Skin and tissue repair peptides like GHK-Cu and BPC-157 show structural changes at 8-12 weeks. Your quarterly blood panel tells you exactly what's moving — we don't rely on subjective reporting alone.",
  },
  {
    category: "EFFICACY",
    q: "How is this different from buying peptides online?",
    a: "Research-grade peptides sold online are not intended for human use, lack sterility testing, and have no dosing oversight. Nexphoria protocols are prescribed by a physician after reviewing your labs, compounded in a licensed 503A pharmacy under sterile conditions, batch-tested for potency, and shipped cold-chain. The compound you inject is the compound you were prescribed — not an unverified powder you reconstituted yourself.",
  },
  {
    category: "PRICING",
    q: "What does a Nexphoria protocol cost?",
    a: "Protocols start at $149/month (semaglutide) and range to $299/month for combination GH secretagogue stacks. Your first physician consult is included. Blood panels are $199 standalone or included in select protocol tiers. 12-month plans include 20% savings and are our best-value option. There are no hidden fees — lab costs, physician consultations, and shipping are itemized at checkout.",
  },
  {
    category: "PRICING",
    q: "Can I use my HSA or FSA?",
    a: "Yes. Nexphoria protocols are self-pay, but we provide detailed receipts that are accepted by most HSA and FSA accounts. Many members fully offset their protocol costs through their health spending accounts. Check your plan's eligible expense list — prescription compounds and physician consultations are typically eligible.",
  },
  {
    category: "PROCESS",
    q: "What happens during a physician consultation?",
    a: "Your Nexphoria physician reviews your blood panel results, health history, current medications, and goals before writing any prescription. Consultations are asynchronous — no scheduled video calls required. Your physician may ask follow-up questions through your member portal before finalizing your protocol. If anything in your labs raises a contraindication, they will advise accordingly and may recommend an alternative.",
  },
  {
    category: "PROCESS",
    q: "What if I want to stop or change my protocol?",
    a: "There are no long-term contracts or cancellation fees. You can pause, change, or cancel your protocol at any time through your member portal. If your compound requires a taper (some GHS peptides benefit from a gradual wind-down), your physician will advise on the appropriate exit protocol. Unused medication can be returned to the pharmacy.",
  },
];

interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  showCategories?: boolean;
}

export function FAQAccordion({
  items = defaultFAQs,
  title = "Common questions.",
  showCategories = false,
}: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="faq-accordion"
    >
      <div className="nx-container" style={{ maxWidth: "760px", margin: "0 auto" }}>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "var(--nx-cobalt)",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
              }}
            >
              FAQ
            </p>
          </div>

          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            {title}
          </h2>
        </Reveal>

        <div>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 30}>
              <div
                style={{
                  borderBottom: "1px solid var(--nx-border)",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.25rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  data-testid={`faq-item-${i}`}
                >
                  <div>
                    {showCategories && item.category && (
                      <p
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "9px",
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--nx-cobalt)",
                          marginBottom: "4px",
                          opacity: 0.75,
                        }}
                      >
                        {item.category}
                      </p>
                    )}
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "var(--nx-fg)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.q}
                    </span>
                  </div>
                  {open === i ? (
                    <Minus
                      size={16}
                      style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: "4px" }}
                    />
                  ) : (
                    <Plus
                      size={16}
                      style={{ color: "var(--nx-fg-graphite)", flexShrink: 0, marginTop: "4px" }}
                    />
                  )}
                </button>

                {open === i && (
                  <div
                    style={{ paddingBottom: "1.5rem" }}
                    data-testid={`faq-answer-${i}`}
                  >
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "0.9375rem",
                        lineHeight: 1.75,
                        color: "var(--nx-fg-graphite)",
                        maxWidth: "640px",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
