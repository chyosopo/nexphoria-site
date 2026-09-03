/* ═══ PDP FAQ — C24 · honest answers, generated from the data ═══
   Every question is answered from the catalog itself: the panel it
   gates on, its cadence terms, its timeline, its gated status. No
   marketing claims the data can't back. buildPdpFaq() feeds both the
   rendered accordion and FAQPage JSON-LD (via faqJsonLd in seo.ts). */
import { S } from "@/lib/typography";

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
    a: `Yes, always. Your questionnaire goes to a U.S. licensed physician, who reviews it with your blood panel. Nothing ships without a valid prescription.`,
  });

  items.push({
    q: "What bloodwork is required?",
    a: `You start first. At week 12 of your plan a full blood panel, included, is drawn and read by your physician, so the dose of ${name} follows what actually changed.`,
  });

  if (firstMark) {
    items.push({
      q: "When do people typically notice changes?",
      a: `The protocol timeline outlines ${firstMark.effect.replace(/\.$/, "").toLowerCase()} around ${firstMark.wk}. Everyone responds differently, which is why your blood is read at week 12 and your dose follows it.`,
    });
  }

  if (gated) {
    items.push({
      q: "Why can't I just add it to a cart?",
      a: `GLP-1 medicines are dosed and stepped up by your doctor from your history, and read against your blood at week 12. Begin the eligibility intake; if a protocol is appropriate, your physician prescribes it.${gatedStates?.length ? ` It is not currently available for shipping addresses in ${gatedStates.join(", ")}.` : ""}`,
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
  return (
    <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} data-testid="pdp-faq">
      <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>
        Asked plainly, answered plainly
      </h2>
      <div style={{ marginTop: "clamp(1.2rem,2vw,1.6rem)" }}>
        {items.map((it, i) => (
          <details key={it.q} className="nx-faq-item" data-testid={`faq-${i}`} open={i === 0}>
            <summary>
              <span>{it.q}</span>
              <span className="nx-faq-plus" aria-hidden />
            </summary>
            <p className="nx-faq-a">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
