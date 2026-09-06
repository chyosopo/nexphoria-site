/* How it works, drawn: three numbered tiles with arrows between them, then the
   measure the dose is set against. The arrow geometry lives in index.css
   (.nx-pathway); the tile is the product page's shared frame (styles/pdp.css). */
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { pathwayFor } from "@/data/pathway";
import { RETEST_WEEK } from "@/data/monitoring";

export function Pathway({ slug, testId }: { slug: string; testId?: string }) {
  const p = pathwayFor(slug);
  if (!p) return null;
  /* The sentence was hard-coded plural, so a medicine measured against one
     marker read "HbA1c are read at week 12" — and the singular branch put
     "LH and FSH ... is the measure". The markers are catalog data, so the
     sentence follows them: the comma list reads as prose ("Cortisol and
     thyroid", not "Cortisol, thyroid"), and a list or a plural noun
     ("Hormones", "Metabolic markers") takes the plural verb. */
  const parts = p.reads.split(/,\s*/);
  const reads = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : p.reads;
  const many = parts.length > 1 || / and |s$/.test(p.reads);
  return (
    <div data-testid={testId ?? `pathway-${slug}`}>
      <ol className="nx-pathway" aria-label="How it works">
        {p.steps.map((s, i) => (
          <li key={s} className="nx-pathway__item">
            <div className="nx-pt">
              <span className="nx-pt__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <p className="nx-pt__t" style={{ fontFamily: S }}>{s}</p>
            </div>
            {i < 2 && <span className="nx-pathway__arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={2.2} /></span>}
          </li>
        ))}
      </ol>
      <p className="nx-pt-note" style={{ fontFamily: F }}>
        {p.context
          ? `${reads} ${many ? "are" : "is"} read at week ${RETEST_WEEK} for context.`
          : many
            ? `${reads}, read at week ${RETEST_WEEK}, are what the dose is set against.`
            : `${reads}, read at week ${RETEST_WEEK}, is the measure the dose is set against.`}
      </p>
    </div>
  );
}
