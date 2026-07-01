import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartProvider";
import type { CadenceKey } from "@/data/pricing";

/* AddToCartButton — reusable on peptide PDPs, catalog cards, stack pages */

interface AddToCartButtonProps {
  slug: string;
  type: "peptide" | "stack";
  /** visual variant */
  variant?: "primary" | "ghost" | "compact";
  /** override label */
  label?: string;
  className?: string;
  /** optional billing cadence; defaults to "3mo" (most-popular) */
  cadence?: CadenceKey;
}

export function AddToCartButton({ slug, type, variant = "primary", label, className = "", cadence }: AddToCartButtonProps) {
  const { addPeptide, addStack } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    if (type === "peptide") {
      addPeptide(slug, { cadence });
    } else {
      addStack(slug, { cadence });
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const baseClass =
    "inline-flex items-center justify-center gap-2 transition-all";
  const fontStyle = { fontFamily: "'General Sans', system-ui, sans-serif" as const };

  if (variant === "compact") {
    return (
      <button
        onClick={handleAdd}
        className={`${baseClass} px-3 py-1.5 text-xs ${className}`}
        style={{
          ...fontStyle,
          background: justAdded ? "#8B5A2B" : "#0A0A0A",
          color: "#FAF7F0",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
        aria-label={`Add ${slug} to cart`}
        data-testid={`button-add-cart-${type}-${slug}`}
      >
        {justAdded ? (
          <>
            <Check size={12} strokeWidth={2.5} /> Added
          </>
        ) : (
          <>
            <Plus size={12} strokeWidth={2.5} /> {label || "Add"}
          </>
        )}
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        onClick={handleAdd}
        className={`${baseClass} px-5 py-2.5 text-sm hover:bg-black/5 ${className}`}
        style={{
          ...fontStyle,
          color: "#0A0A0A",
          border: "1px solid var(--nx-border)",
          fontWeight: 500,
        }}
        aria-label={`Add ${slug} to cart`}
        data-testid={`button-add-cart-${type}-${slug}`}
      >
        {justAdded ? (
          <>
            <Check size={14} strokeWidth={2.5} /> Added to cart
          </>
        ) : (
          <>
            <Plus size={14} strokeWidth={2.5} /> {label || "Add to cart"}
          </>
        )}
      </button>
    );
  }

  // primary
  return (
    <button
      onClick={handleAdd}
      className={`${baseClass} px-6 py-3 text-sm ${className}`}
      style={{
        ...fontStyle,
        background: justAdded ? "#8B5A2B" : "#0A0A0A",
        color: "#FAF7F0",
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
      aria-label={`Add ${slug} to cart`}
      data-testid={`button-add-cart-${type}-${slug}`}
    >
      {justAdded ? (
        <>
          <Check size={14} strokeWidth={2.5} /> Added to cart
        </>
      ) : (
        <>
          <Plus size={14} strokeWidth={2.5} /> {label || "Add to cart"}
        </>
      )}
    </button>
  );
}
