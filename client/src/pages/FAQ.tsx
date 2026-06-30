import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const categories: { label: string; items: FAQItem[] }[] = [
  {
    label: "Medical",
    items: [
      {
        q: "What is a peptide?",
        a: "Peptides are short chains of amino acids — the building blocks of proteins — that act as biological messengers in the body. They signal cells to perform specific functions: repair tissue, regulate hormones, reduce inflammation, or stimulate growth-hormone release. Nexphoria protocols use clinically studied peptides compounded by licensed US pharmacies.",
      },
      {
        q: "How does a Nexphoria prescription work?",
        a: "You complete a short intake, followed by a comprehensive 65-marker blood panel (at home or at LabCorp). A board-certified US physician reviews your labs and goals, then writes a personalized prescription. Your compounded protocol ships cold-chain to your door within 5–7 business days.",
      },
      {
        q: "Are the peptides FDA-approved?",
        a: "Most peptides in our catalog are prescribed off-label — meaning they're used for purposes beyond an FDA-approved indication. They are compounded by licensed 503A pharmacies under a physician's prescription. We operate within the standard framework for compounded medications in the US.",
      },
      {
        q: "Why a 503A pharmacy?",
        a: "503A pharmacies are licensed US compounding pharmacies regulated by state boards of pharmacy and overseen by the FDA. They compound medications for individual patients under a valid prescription. Every Nexphoria compound is sterile-prepared, batch-tested, and ships in pre-filled syringes — ready to inject.",
      },
      {
        q: "What's in my blood panel?",
        a: "Your panel covers 65 biomarkers across 8 categories: hormonal (testosterone, estradiol, IGF-1, LH/FSH, DHEA-S, cortisol), metabolic (fasting glucose, HbA1c, fasting insulin, HOMA-IR), lipid (ApoB, LDL, HDL, Lp(a)), thyroid (TSH, Free T3/T4, Reverse T3), inflammation (hsCRP, homocysteine), vitamins/minerals, complete blood count, and kidney/liver function.",
      },
      {
        q: "How do I administer the peptides?",
        a: "Most peptides are subcutaneous injections — a small needle just under the skin, similar to insulin. Your kit includes needles, syringes, alcohol swabs, and a step-by-step guide written by your physician. Some compounds (Selank, Semax) are intranasal drops.",
      },
      {
        q: "Is there a minimum age?",
        a: "Nexphoria serves adults 21 and older. Some protocols require members to be 25+ (particularly when bone density data is relevant). Your physician assesses eligibility individually based on your blood work and health history.",
      },
    ],
  },
  {
    label: "Pricing & Shipping",
    items: [
      {
        q: "Can I use insurance?",
        a: "Nexphoria protocols are self-pay. We provide detailed receipts for FSA/HSA submission. Many members offset costs through their FSA/HSA — check your plan's eligible expense list. We're working on direct insurance partnerships.",
      },
      {
        q: "What does the blood panel cost?",
        a: "Your 65-marker panel is included at no additional cost with any active Nexphoria protocol. As a standalone service — no protocol — the panel is $199.",
      },
      {
        q: "How is shipping handled?",
        a: "All protocols ship cold-chain in insulated packaging with ice packs to maintain peptide stability. Standard delivery is 5–7 business days. Expedited shipping is available on the Premium tier and at checkout on other tiers.",
      },
      {
        q: "What happens if I want to stop?",
        a: "There are no long-term contracts or cancellation fees. Pause or cancel anytime from your member portal. Your physician can advise on proper taper protocols for compounds that benefit from tapering.",
      },
      {
        q: "Are there any setup fees?",
        a: "No setup fees. Your first physician consultation is free. You only pay your monthly protocol fee if you proceed after your initial consult and labs.",
      },
    ],
  },
  {
    label: "Protocols",
    items: [
      {
        q: "How are protocols personalized?",
        a: "Personalization starts with your blood panel. Your physician uses your actual lab values — testosterone, IGF-1, insulin, inflammation markers, and more — to calibrate your dose to your baseline. Goals, health history, and any current medications factor in too. No protocol is written from a template.",
      },
      {
        q: "How do my labs get reviewed?",
        a: "Lab results are uploaded to your member portal within 48–72 hours of collection. Your physician reviews within 24 hours of results receipt and sends your prescription — or a follow-up question — via secure message.",
      },
      {
        q: "What states do you operate in?",
        a: "We currently serve members in CA, TX, FL, NY, AZ, CO, IL, WA, GA, NV, MA, NJ, OH, PA, and VA. We're expanding regularly. Enter your zip code during intake to confirm availability.",
      },
      {
        q: "How long until I see results?",
        a: "Timeline varies by compound and goal. GLP-1 protocols typically show measurable fat-loss within 4–8 weeks. GHS (growth hormone secretagogue) protocols tend to peak benefits at 12–16 weeks. Your physician sets outcome expectations at your initial consult based on your labs.",
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
            fontFamily: "'Playfair Display', Georgia, serif",
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
              fontFamily: "'Inter Tight', sans-serif",
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
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
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
                fontFamily: "'JetBrains Mono', monospace",
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
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}
            >
              Questions answered.
            </h1>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "#4A4A4A",
                lineHeight: 1.6,
                maxWidth: "560px",
              }}
            >
              Everything you need to know about peptide protocols, our process, labs,
              and prescriptions. Still have a question?{" "}
              <a href="#/contact" style={{ color: "var(--nx-cobalt)", textDecoration: "underline" }}>
                Reach us.
              </a>
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
                    fontFamily: "'JetBrains Mono', monospace",
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
                        onClick={() => setActiveCategory(i)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0.5rem 0",
                          fontFamily: "'Inter Tight', sans-serif",
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
                            fontFamily: "'JetBrains Mono', monospace",
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
                    fontFamily: "'JetBrains Mono', monospace",
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
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                    marginBottom: "2rem",
                  }}
                >
                  {categories[activeCategory].label === "Medical"
                    ? "Medical & clinical questions."
                    : categories[activeCategory].label === "Pricing & Shipping"
                    ? "Pricing, billing, and shipping."
                    : "Protocol design and monitoring."}
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
        sub="Your Nexphoria physician can answer them during your free consultation."
      />
    </SiteLayout>
  );
}
