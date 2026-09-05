/* How it works, drawn: three numbered tiles with arrows between them, then the
   measure the dose is set against. The arrow geometry lives in index.css
   (.nx-pathway); the tile is the product page's shared frame (styles/pdp.css). */
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { pathwayFor } from "@/data/pathway";

export function Pathway({ slug, testId }: { slug: string; testId?: string }) {
  const p = pathwayFor(slug);
  if (!p) return null;
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
        {p.context ? `${p.reads} are read at week 12 for context.` : `${p.reads}, read at week 12, is the measure the dose is set against.`}
      </p>
    </div>
  );
}
