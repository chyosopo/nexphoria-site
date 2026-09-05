/* ═══ EVIDENCE STRIP — the citations, at the decision point ═══

   Replaces the Science page's role on the surface that actually converts. The
   teardown's finding was that education loses when it is a DESTINATION: a
   visitor weighing tirzepatide does not leave the product page to go read a
   library. So the evidence for this molecule sits on this molecule's page,
   between the mechanism and the price.

   Renders NOTHING when there is no evidence for the SKU. That is deliberate
   and load-bearing: PT-141 has no citation in our set, and a component that
   quietly fell back to a neighbour's studies — or padded with something
   adjacent — would be putting a claim behind a molecule that does not support
   it. An absent block is honest; a borrowed one is not.

   Voice: each entry states what a study FOUND, never what the visitor will
   experience. "Produced mean reductions of 15-21% over 72 weeks" is a result.
   "You will lose 15-21%" is a promise we cannot make and will not imply. */
import { useState } from "react";
import { F, S } from "@/lib/typography";
import { evidenceFor } from "@/data/evidence";

export function EvidenceStrip({ slug, name }: { slug: string; name: string }) {
  const items = evidenceFor(slug);
  const [open, setOpen] = useState<number | null>(0);
  if (items.length === 0) return null;

  return (
    <section
      data-testid={`evidence-${slug}`}
      style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }}
      aria-labelledby={`evidence-title-${slug}`}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.7rem", flexWrap: "wrap" }}>
        <h2 id={`evidence-title-${slug}`} className="nx-dsh3 nx-shout">
          The evidence.
        </h2>
        <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>
          {items.length} peer-reviewed {items.length === 1 ? "study" : "studies"} on {name}
        </span>
      </div>

      <div style={{ display: "grid", gap: 10, marginTop: "0.9rem" }}>
        {items.map((e, i) => {
          const isOpen = open === i;
          return (
            <div
              key={e.cite}
              className="nx-evidence-row"
              data-open={isOpen}
              style={{
                border: "1px solid var(--nx-border)",
                borderRadius: "var(--nx-r-md)",
                background: "var(--nx-ceramic)",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                data-testid={`evidence-toggle-${slug}-${i}`}
                style={{
                  width: "100%", textAlign: "left", cursor: "pointer",
                  display: "flex", gap: "0.8rem", alignItems: "flex-start",
                  padding: "0.9rem 1rem", background: "none", border: "none",
                }}
              >
                {/* The index is a citation number, not decoration — it is how a
                    reviewer cross-references a claim to its source. */}
                <span
                  aria-hidden
                  style={{
                    fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 700,
                    color: "var(--nx-cobalt)", background: "var(--nx-cobalt-soft)",
                    borderRadius: "var(--nx-r-pill)", padding: "2px 8px", flexShrink: 0, marginTop: 2,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  {e.key && (
                    <span style={{ display: "block", fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.25, color: "var(--nx-fg)" }}>
                      {e.key}
                    </span>
                  )}
                  <span style={{ display: "block", fontFamily: F, fontSize: e.key ? "var(--nx-t-xs)" : "var(--nx-t-base)", lineHeight: 1.45, color: e.key ? "var(--nx-fg-muted)" : "var(--nx-fg)", marginTop: e.key ? "0.35rem" : 0 }}>
                    {e.cite}
                  </span>
                </span>
                <span className="nx-evidence-chev" aria-hidden style={{ color: "var(--nx-fg-muted)", flexShrink: 0, marginTop: 3 }}>+</span>
              </button>
              {isOpen && (
                <p
                  style={{
                    fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.65,
                    color: "var(--nx-fg-graphite)", padding: "0 1rem 1rem 3rem", margin: 0,
                  }}
                >
                  {e.finding}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* The line that keeps a study list from reading as an outcome promise. */}
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", lineHeight: 1.55, color: "var(--nx-fg-muted)", marginTop: "0.8rem", maxWidth: "72ch" }}>
        Published findings for the molecule, not predictions for any individual. Populations, doses
        and durations differ from any protocol; the physician decides what applies.
      </p>
    </section>
  );
}
