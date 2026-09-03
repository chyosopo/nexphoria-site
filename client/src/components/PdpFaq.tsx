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
    a: `Compounded ${name} is prepared for you by a licensed 503A pharmacy under a physician's prescription, and compounded medications are not FDA-approved. Where a branded, FDA-approved version of the active ingredient exists, that approval does not extend to the compounded preparation. Compounded medications are not evaluated by the FDA for safety, effectiveness, or quality.`,
  });

  items.push({
    q: "Do I need a prescription?",
    a: `Yes. A licensed U.S. physician reviews your health questions and writes the prescription if it is right for you. Everything happens online.`,
  });

  items.push({
    q: "What bloodwork is required?",
    a: `None to start. At week 12, a full blood panel is included in your plan. It shows your physician how your body is responding to ${name}, and your dose is adjusted from it.`,
  });

  if (firstMark) {
    items.push({
      q: "What should I expect in the first weeks?",
      a: `${firstMark.wk}: ${firstMark.effect} Everyone responds differently, which is why your blood panel at week 12 is part of the plan and your dose is adjusted from it.`,
    });
  }

  if (gated) {
    items.push({
      q: "Why can't I just add it to a cart?",
      a: `GLP-1 medication is dosed and increased step by step by your physician, based on your health history. Answer a few health questions first; if it is right for you, your physician prescribes it.${gatedStates?.length ? ` It is not currently available for shipping addresses in ${gatedStates.join(", ")}.` : ""}`,
    });
  } else if (hasPricing) {
    items.push({
      q: "Can I cancel?",
      a: "Yes. The monthly plan cancels anytime. Longer plans cost less per month: 15% off at 3 months and 30% off at 12 months, with your blood panel included.",
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
