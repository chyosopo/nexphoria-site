/* How it works, drawn: three tiles with arrows, then the measure. */
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
            <div className="nx-glass-tile" style={{ display: "block", height: "100%" }}>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", color: "var(--nx-fg-muted)" }}>{String(i + 1).padStart(2, "0")}</p>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-base)", lineHeight: 1.35, color: "var(--nx-fg)", marginTop: "0.4rem" }}>{s}</p>
            </div>
            {i < 2 && <span className="nx-pathway__arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={2.2} /></span>}
          </li>
        ))}
      </ol>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: "0.9rem", maxWidth: "58ch", lineHeight: 1.55 }}>
        {p.context ? `${p.reads} are read at week 12 for context.` : `${p.reads}, read at week 12, is the measure the dose is set against.`}
      </p>
    </div>
  );
}
