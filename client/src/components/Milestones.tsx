/* What to expect, week by week: the catalog's timeline, enriched into
   milestones (data/milestones), as a vertical rail with the numbered pill on
   it and a tile beside each; falls back to the catalog's own marks. */
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";
import { milestonesFor } from "@/data/milestones";
import type { SoloPeptide } from "@/data/soloCatalog";

export function Milestones({ sku, testId }: { sku: SoloPeptide; testId?: string }) {
  const marks = milestonesFor(sku.slug) ?? sku.timeline.map((t) => ({ when: t.wk, head: t.effect, body: "" }));
  return (
    <ol className="nx-pt-tl" aria-label="The first twelve weeks" data-testid={testId ?? `milestones-${sku.slug}`}>
      {marks.map((m, i) => (
        <li key={`${m.when}-${i}`} className="nx-pt-tl__step">
          <span className="nx-pt__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <Reveal delay={Math.min(i * 55, 220)}>
            <div className="nx-pt">
              <p className="nx-pt__k" style={{ fontFamily: F }}>{m.when}</p>
              <p className="nx-pt__t" style={{ fontFamily: S }}>{m.head}</p>
              {m.body && <p className="nx-pt__b" style={{ fontFamily: F }}>{m.body}</p>}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
