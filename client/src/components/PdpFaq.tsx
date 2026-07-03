/* ═══ PDP FAQ — C24 · honest answers, generated from the data ═══
   Every question is answered from the catalog itself: the panel it
   gates on, its cadence terms, its timeline, its gated status. No
   marketing claims the data can't back. buildPdpFaq() feeds both the
   rendered accordion and FAQPage JSON-LD (via faqJsonLd in seo.ts). */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { F, S } from "@/lib/typography";

export interface FaqItem { q: string; a: string }

export function buildPdpFaq(opts: {
  name: string;
  panel: string;
  gated?: boolean;
  gatedStates?: string[];
  hasPricing: boolean;
  firstMark?: { wk: string; effect: string };
}): FaqItem[] {
  const { name, panel, gated, gatedStates, hasPricing, firstMark } = opts;
  const items: FaqItem[] = [];

  items.push({
    q: `Is ${name} FDA-approved?`,
    a: `No. Like most therapeutic peptides, ${name} is not FDA-approved as a standalone drug. Where a licensed physician determines it appropriate, it is prescribed off-label and compounded for you in a state-licensed 503A pharmacy. Compounded medications are not evaluated by the FDA for safety, effectiveness, or quality.`,
  });

  items.push({
    q: "Do I need a prescription?",
    a: `Yes — always. Every Nexphoria protocol begins with a structured intake reviewed by a US-licensed physician. Nothing ships without a valid prescription, and the consultation carries no charge: you pay only if prescribed.`,
  });

  items.push({
    q: "What bloodwork is required?",
    a: `${name} is gated on the ${panel} panel — drawn at baseline before anything is prescribed, then retested on a fixed schedule so your physician reads the trend, not a snapshot.`,
  });

  if (firstMark) {
    items.push({
      q: "When do people typically notice changes?",
      a: `The protocol timeline outlines ${firstMark.effect.replace(/\.$/, "").toLowerCase()} around ${firstMark.wk}. Individual response varies — which is exactly why the protocol is monitored with scheduled bloodwork rather than assumed.`,
    });
  }

  if (gated) {
    items.push({
      q: "Why can't I just add it to a cart?",
      a: `GLP-1 therapy is dosed and titrated by a physician against your bloodwork and medical history — it isn't bought from a shelf. Begin the eligibility intake; if a protocol is appropriate, your physician prescribes it.${gatedStates?.length ? ` It is not currently available for shipping addresses in ${gatedStates.join(", ")}.` : ""}`,
    });
  } else if (hasPricing) {
    items.push({
      q: "Can I cancel?",
      a: "Yes. The 1-month cadence cancels anytime. Longer cadences trade flexibility for price — 15% off at 3 months, 30% off at 12 months with the panel included.",
    });
  }

  return items;
}

export function PdpFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} data-testid="pdp-faq">
      <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.4vw,34px)", color: "var(--nx-fg)" }}>
        Asked plainly, answered plainly
      </h2>
      <div style={{ borderTop: "1px solid var(--nx-border)", marginTop: "1rem" }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q} style={{ borderBottom: "1px solid var(--nx-border)" }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                data-testid={`faq-${i}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                  width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                  padding: "1rem 0", fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)",
                }}
              >
                {it.q}
                <ChevronDown
                  size={17}
                  style={{
                    color: "var(--nx-cobalt)", flexShrink: 0,
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform var(--nx-dur-2) var(--nx-ease)",
                  }}
                />
              </button>
              {isOpen && (
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "62ch", paddingBottom: "1.1rem" }}>
                  {it.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
