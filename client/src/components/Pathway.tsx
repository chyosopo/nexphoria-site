/* How it works in your body, drawn: three tiles with arrows — the signal,
   where it acts, what changes — ending on the number the physician reads. */
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { pathwayFor } from "@/data/pathway";

const LABEL = ["The signal", "Where it acts", "What changes"];

export function Pathway({ slug, testId }: { slug: string; testId?: string }) {
  const p = pathwayFor(slug);
  if (!p) return null;
  return (
    <div data-testid={testId ?? `pathway-${slug}`}>
      <ol className="nx-pathway" aria-label="How it works in your body">
        {p.steps.map((s, i) => (
          <li key={s} className="nx-pathway__item">
            <div className="nx-glass-tile" style={{ display: "block", height: "100%" }}>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{i + 1} · {LABEL[i]}</p>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-base)", lineHeight: 1.35, color: "var(--nx-fg)", marginTop: "0.45rem" }}>{s}</p>
            </div>
            {i < 2 && <span className="nx-pathway__arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={2.2} /></span>}
          </li>
        ))}
      </ol>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: "0.9rem", maxWidth: "58ch", lineHeight: 1.55 }}>
        {p.context
          ? <><strong style={{ color: "var(--nx-fg)", fontWeight: 600 }}>Read for context at week 12:</strong> {p.reads}.</>
          : <><strong style={{ color: "var(--nx-fg)", fontWeight: 600 }}>The number that shows it:</strong> your {p.reads}, read at week 12 and used to set your dose.</>}
      </p>
    </div>
  );
}
