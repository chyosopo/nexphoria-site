/* ═══ PDP FAQ: the common questions, answered from the data ═══
   Every question is answered from the catalog itself: the regulatory
   standing of the active, its onset and full effect, its terms. No claim
   the data cannot back. buildPdpFaq() feeds both the rendered accordion and
   FAQPage JSON-LD (via faqJsonLd in seo.ts). The strings are the plain
   deck's (docs/COPY-DECK-PLAIN.md, "PdpFaq"). */
import type { SoloRegulatory } from "@/data/soloCatalog";

export interface FaqItem { q: string; a: string }

/** A medicine inside a protocol, as the FDA answer needs it. */
export interface FaqComponent { name: string; regulatory?: SoloRegulatory }

const NOT_EVALUATED = "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality.";

function fdaAnswer(name: string, regulatory: SoloRegulatory): string {
  if (regulatory === "compounded-approved-active") {
    return `${name} is an FDA-approved active ingredient. The compounded preparation made for you by a licensed 503A pharmacy is not itself FDA-approved, and compounded medications are not evaluated by the FDA for safety, effectiveness, or quality.`;
  }
  return `No. There is no FDA-approved product containing ${name}. Compounded ${name} is prepared by a licensed 503A pharmacy under a physician's prescription. ${NOT_EVALUATED}`;
}

function fdaAnswerForProtocol(components: FaqComponent[]): string {
  const parts = components.map((c) =>
    (c.regulatory ?? "compounded-no-approved-active") === "compounded-approved-active"
      ? `${c.name} is an FDA-approved active ingredient.`
      : `There is no FDA-approved product containing ${c.name}.`,
  );
  return `${parts.join(" ")} Each is prepared for you by a licensed 503A pharmacy under a physician's prescription; the compounded preparation is not itself FDA-approved. ${NOT_EVALUATED}`;
}

export function buildPdpFaq(opts: {
  name: string;
  /** accepted for existing callers; the bloodwork answer no longer names a tier */
  panel?: string;
  gated?: boolean;
  /** accepted for existing callers; state availability is stated once, in the buy box */
  gatedStates?: string[];
  hasPricing: boolean;
  /** fallback for the first-weeks answer when feelBy / fullEffect are not passed */
  firstMark?: { wk: string; effect: string };
  /** regulatory standing of the active (a single medicine); defaults to the conservative reading */
  regulatory?: SoloRegulatory;
  /** the medicines in a protocol; when present the FDA answer is written per component */
  components?: FaqComponent[];
  feelBy?: string;
  fullEffect?: string;
}): FaqItem[] {
  const { name, hasPricing, firstMark, regulatory, components, feelBy, fullEffect } = opts;
  const items: FaqItem[] = [];

  if (components && components.length > 0) {
    items.push({
      q: "Are the medicines in this protocol FDA-approved?",
      a: fdaAnswerForProtocol(components),
    });
  } else {
    items.push({
      q: `Is ${name} FDA-approved?`,
      a: fdaAnswer(name, regulatory ?? "compounded-no-approved-active"),
    });
  }

  items.push({
    q: "Do I need a prescription?",
    a: "Yes. A licensed U.S. physician reviews your online visit and writes the prescription if it is appropriate. Everything happens online.",
  });

  if (feelBy && fullEffect) {
    items.push({
      q: "What should I expect in the first weeks?",
      a: `Typical onset is ${feelBy.charAt(0).toLowerCase() + feelBy.slice(1)}, with the full effect by ${fullEffect}. Response varies, which is why the week-12 panel and a dose review are part of the plan.`,
    });
  } else if (firstMark) {
    items.push({
      q: "What should I expect in the first weeks?",
      a: `${firstMark.effect.replace(/\.$/, "")}, in ${firstMark.wk.replace(/^Wk /, "week ")}. Response varies, which is why the week-12 panel and a dose review are part of the plan.`,
    });
  }

  if (hasPricing) {
    items.push({
      q: "How is it billed?",
      a: "You pay a term up front: one month, or three, six or twelve months at 10, 15 or 20% less per month. Longer terms include more blood testing. At the end of the term, renewing is a choice.",
    });
  }

  return items;
}

export function PdpFaq({ items }: { items: FaqItem[] }) {
  return (
    <section className="nx-pdp-sec nx-pdp-faq" data-testid="pdp-faq">
      <h2 className="nx-dsh3">Common questions.</h2>
      <div className="nx-faq-list" style={{ marginTop: "1rem" }}>
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
