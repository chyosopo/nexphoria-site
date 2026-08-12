/* ═══ DISCLAIMER — C21 · one legal sentence, one source ═══
   The compounding/off-label disclaimer appears on every commercial
   surface. It now has exactly one home. Variants match the surface:
   "night" for the dark contraindication bands, "light" elsewhere. */
import { F } from "@/lib/typography";

export const DISCLAIMER_TEXT =
  "These peptides are not FDA-approved and are prescribed off-label where a physician determines it appropriate. This page is educational and is not medical advice.";

export function Disclaimer({ variant = "light" }: { variant?: "night" | "light" }) {
  const night = variant === "night";
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
      {DISCLAIMER_TEXT}
    </p>
  );
}
