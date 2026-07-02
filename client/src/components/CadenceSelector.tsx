import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartProvider";
import { cadenceCardsFor, formatUSD, type CadenceKey } from "@/data/pricing";
import { stacks, computeStackPrice } from "@/data/stacks";
import { pricing, CADENCE_DISCOUNTS } from "@/data/pricing";

/* ──────────────────────────────────────────────────────────────
   CadenceSelector — Maximus-style billing cadence picker.
   Three radio cards (Monthly / Quarterly / Annual) with savings,
   "Most popular" + "Best value" badges, and an Add-to-Cart button
   that respects the selected cadence.

   Works for both peptides and stacks via the `type` prop.
   ────────────────────────────────────────────────────────────── */

interface CadenceSelectorProps {
  slug: string;
  type: "peptide" | "stack";
  /** optional context — e.g. "Tirzepatide" — for the success-state aria-label */
  productName?: string;
}

interface CadenceCard {
  cadence: CadenceKey;
  pricePerMonth: number;
  label: string;
  sublabel: string;
  badge?: "Flexible" | "Most popular" | "Best value";
  savePct: number;
}

export function CadenceSelector({ slug, type, productName }: CadenceSelectorProps) {
  const { addPeptide, addStack } = useCart();
  const [selected, setSelected] = useState<CadenceKey>("3mo");
  const [justAdded, setJustAdded] = useState(false);

  // Build the three cards
  let cards: CadenceCard[] = [];
  if (type === "peptide") {
    cards = cadenceCardsFor(slug);
  } else {
    const stack = stacks.find((s) => s.slug === slug);
    if (stack) {
      const { bundle } = computeStackPrice(stack, pricing);
      const keys: CadenceKey[] = ["1mo", "3mo", "12mo"];
      cards = keys.map((c) => {
        const disc = CADENCE_DISCOUNTS[c].pct;
        return {
          cadence: c,
          pricePerMonth: Math.round(bundle * (1 - disc)),
          label: CADENCE_DISCOUNTS[c].label,
          sublabel: CADENCE_DISCOUNTS[c].sublabel,
          badge: CADENCE_DISCOUNTS[c].badge,
          savePct: CADENCE_DISCOUNTS[c].savePct,
        };
      });
    }
  }

  if (cards.length === 0) {
    return null;
  }

  const handleAdd = () => {
    if (type === "peptide") {
      addPeptide(slug, { cadence: selected });
    } else {
      addStack(slug, { cadence: selected });
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const fontMono = { fontFamily: "'General Sans', system-ui, sans-serif" as const };
  const fontSans = { fontFamily: "'General Sans', system-ui, sans-serif" as const };
  const fontSerif = { fontFamily: "'General Sans', system-ui, sans-serif" as const };

  return (
    <div data-testid={`cadence-selector-${slug}`}>
      {/* Eyebrow */}
      <p
        style={{
          ...fontMono,
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(21, 24, 28,0.5)",
          marginBottom: "16px",
        }}
      >
        CHOOSE YOUR PLAN · PHYSICIAN-SUPERVISED · CANCEL ANYTIME
      </p>

      {/* Three cadence cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px", marginBottom: "20px" }}>
        {cards.map((card) => {
          const isSelected = selected === card.cadence;
          const isMostPopular = card.badge === "Most popular";
          return (
            <button
              key={card.cadence}
              onClick={() => setSelected(card.cadence)}
              data-testid={`cadence-card-${slug}-${card.cadence}`}
              aria-pressed={isSelected}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "18px 20px",
                background: isSelected ? "var(--nx-fg)" : "transparent",
                color: isSelected ? "var(--nx-bg)" : "var(--nx-fg)",
                border: isSelected
                  ? "1px solid var(--nx-fg)"
                  : isMostPopular
                  ? "1px solid rgba(21, 24, 28,0.45)"
                  : "1px solid var(--nx-border, rgba(21, 24, 28,0.15))",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              {/* Radio dot */}
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: isSelected ? "1px solid var(--nx-bg)" : "1px solid rgba(21, 24, 28,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--nx-bg)",
                    }}
                  />
                )}
              </div>

              {/* Label + sublabel */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      ...fontSans,
                      fontSize: "15px",
                      fontWeight: 600,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {card.label}
                  </span>
                  {card.badge && card.badge !== "Flexible" && (
                    <span
                      style={{
                        ...fontMono,
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "3px 7px",
                        background: isSelected
                          ? "rgba(240, 244, 250,0.18)"
                          : card.badge === "Best value"
                          ? "rgba(43, 86, 139,0.12)"
                          : "rgba(21, 24, 28,0.08)",
                        color: isSelected
                          ? "var(--nx-bg)"
                          : card.badge === "Best value"
                          ? "var(--nx-amber)"
                          : "var(--nx-fg)",
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    ...fontMono,
                    fontSize: "10.5px",
                    color: isSelected ? "rgba(240, 244, 250,0.6)" : "rgba(21, 24, 28,0.5)",
                    marginTop: "3px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {card.sublabel}
                </p>
              </div>

              {/* Price */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    ...fontSerif,
                    fontSize: "22px",
                    fontWeight: 500,
                    lineHeight: 1,
                  }}
                >
                  {formatUSD(card.pricePerMonth)}
                </div>
                <p
                  style={{
                    ...fontMono,
                    fontSize: "9px",
                    color: isSelected ? "rgba(240, 244, 250,0.55)" : "rgba(21, 24, 28,0.45)",
                    marginTop: "3px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  / month
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Payment + trust line */}
      <p
        style={{
          ...fontMono,
          fontSize: "9.5px",
          color: "rgba(21, 24, 28,0.45)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "18px",
        }}
      >
        Klarna · HSA / FSA eligible · Free priority shipping
      </p>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        data-testid={`cadence-add-${type}-${slug}`}
        aria-label={`Add ${productName || slug} to cart`}
        style={{
          ...fontSans,
          width: "100%",
          padding: "16px 20px",
          background: justAdded ? "var(--nx-amber)" : "var(--nx-fg)",
          color: "var(--nx-bg)",
          border: "none",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.02em",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.2s ease",
        }}
      >
        {justAdded ? (
          <>
            <Check size={15} strokeWidth={2.5} /> Added to cart — review checkout
          </>
        ) : (
          <>
            <Plus size={15} strokeWidth={2.5} /> Add to cart · Begin intake
          </>
        )}
      </button>

      <p
        style={{
          ...fontMono,
          fontSize: "9.5px",
          color: "rgba(21, 24, 28,0.4)",
          letterSpacing: "0.06em",
          marginTop: "12px",
          textAlign: "center",
        }}
      >
        Prescription written after physician review · Compounded in U.S. 503A pharmacies
      </p>
    </div>
  );
}
