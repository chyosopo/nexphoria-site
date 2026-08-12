/* ═══ DISCLAIMER — C21 · one legal sentence, one source ═══
   The compounding/off-label disclaimer appears on every commercial
   surface. It now has exactly one home. Variants match the surface:
   "night" for the dark contraindication bands, "light" elsewhere. */
import { F } from "@/lib/typography";
import type { SoloRegulatory } from "@/data/soloCatalog";

/* ⚠ Precision note (2026-08-12, launch-scope change).
   The former blanket text read "These peptides are not FDA-approved." That
   became inaccurate the moment the catalog narrowed to the four launch SKUs:
   semaglutide, tirzepatide, tesamorelin and PT-141 all have FDA-approved
   ACTIVES. The true statement is narrower and is the one LegitScript reads
   for — the compounded PREPARATION is not approved, whatever the active's
   standing. Overclaiming non-approval is still a misstatement, so the copy is
   now keyed to regulatory status rather than asserted flatly. */
export const DISCLAIMER_TEXT_BY_STATUS: Record<SoloRegulatory, string> = {
  "compounded-approved-active":
    "Compounded preparations are not FDA-approved, and the FDA does not review them for safety or effectiveness. Where an active ingredient is FDA-approved in other products, that approval does not extend to a compounded preparation. Prescribed only where a licensed provider determines it appropriate. This page is educational and is not medical advice.",
  "compounded-no-approved-active":
    "Compounded preparations are not FDA-approved, and the FDA does not review them for safety or effectiveness. No FDA-approved product contains this active for any indication, so use is considered experimental or off-label. Prescribed only where a licensed provider determines it appropriate. This page is educational and is not medical advice.",
};

/** Catalog-wide default for surfaces that speak about no single SKU. Accurate
 *  across the whole shelf: it asserts nothing about any particular active. */
export const DISCLAIMER_TEXT = DISCLAIMER_TEXT_BY_STATUS["compounded-approved-active"];

export function Disclaimer({
  variant = "light",
  regulatory,
}: {
  variant?: "night" | "light";
  /** Omit on mixed-catalog surfaces; pass on a single-SKU surface. */
  regulatory?: SoloRegulatory;
}) {
  const night = variant === "night";
  const text = regulatory ? DISCLAIMER_TEXT_BY_STATUS[regulatory] : DISCLAIMER_TEXT;
  return (
    <p
      data-testid="disclaimer"
      style={{
        fontFamily: F,
        fontSize: "var(--nx-t-sm)",
        lineHeight: 1.6,
        maxWidth: "60ch",
        color: night ? "var(--nx-acid)" : "var(--nx-fg-muted)",
        opacity: night ? 0.85 : 1,
      }}
    >
      {text}
    </p>
  );
}
