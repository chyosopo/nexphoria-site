/* What to expect, week by week — the catalog's timeline, enriched into
   milestones (data/milestones); falls back to the catalog's own marks. */
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";
import { milestonesFor } from "@/data/milestones";
import type { SoloPeptide } from "@/data/soloCatalog";

export function Milestones({ sku, testId }: { sku: SoloPeptide; testId?: string }) {
  const marks = milestonesFor(sku.slug) ?? sku.timeline.map((t) => ({ when: t.wk, head: t.effect, body: "" }));
  return (
    <div className="nx-timeline" style={{ marginTop: "1.2rem" }} data-testid={testId ?? `milestones-${sku.slug}`}>
      {marks.map((m, i) => (
        <Reveal key={`${m.when}-${i}`} delay={Math.min(i * 55, 220)}>
          <div className="nx-timeline-step" style={{ paddingBottom: i < marks.length - 1 ? "1.1rem" : 0 }}>
            <span className="nx-timeline-node" aria-hidden>{i + 1}</span>
            <div className="nx-glass-tile" style={{ display: "block" }}>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{m.when}</p>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.2, color: "var(--nx-fg)", marginTop: "0.3rem" }}>{m.head}</p>
              {m.body && <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.4rem", maxWidth: "58ch" }}>{m.body}</p>}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
