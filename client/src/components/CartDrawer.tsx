import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import type { CadenceKey } from "@/data/pricing";
import { CADENCE_DISCOUNTS } from "@/data/pricing";

/* ──────────────────────────────────────────────────────────────
   CartDrawer — slide-in from right
   ────────────────────────────────────────────────────────────── */

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, totalSavings, itemCount, updateQty, updateCadence, removeItem } = useCart();
  const [location] = useLocation();

  // Close drawer on route change so it never blocks the page after navigation
  useEffect(() => {
    if (isOpen) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Lock scroll while open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(10,10,10,0.4)" }}
        onClick={close}
        aria-hidden={!isOpen}
        data-testid="cart-overlay"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[101] h-full w-full sm:w-[440px] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
        style={{ background: "var(--nx-bg)", borderLeft: "1px solid var(--nx-border)" }}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        aria-hidden={!isOpen}
        data-testid="cart-drawer"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header
            className="flex items-center justify-between px-6 py-5"
            style={{ borderBottom: "1px solid var(--nx-border)" }}
          >
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.18em] mb-1"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#8B5A2B" }}
              >
                Your Pharmacy
              </div>
              <h2
                className="text-xl"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#0A0A0A", fontWeight: 500 }}
              >
                {itemCount === 0 ? "Cart is empty" : `${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              </h2>
            </div>
            <button
              onClick={close}
              className="p-2 -m-2 rounded transition-colors hover:bg-black/5"
              aria-label="Close cart"
              data-testid="button-close-cart"
              style={{ color: "#0A0A0A" }}
            >
              <X size={20} />
            </button>
          </header>

          {/* Lines */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {lines.length === 0 ? (
              <EmptyCart onClose={close} />
            ) : (
              <ul className="space-y-5 list-none p-0">
                {lines.map((line) => (
                  <li
                    key={`${line.type}-${line.slug}`}
                    className="pb-5"
                    style={{ borderBottom: "1px solid var(--nx-border)" }}
                    data-testid={`cart-line-${line.type}-${line.slug}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[9px] uppercase tracking-[0.2em] mb-1.5"
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            color: line.type === "stack" ? "#8B5A2B" : "#6B6B6B",
                          }}
                        >
                          {line.type === "stack" ? "Curated Stack" : "Single Peptide"}
                        </div>
                        <div
                          className="text-base mb-1"
                          style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#0A0A0A", fontWeight: 500 }}
                        >
                          {line.name}
                        </div>
                        <div
                          className="text-sm"
                          style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#6B6B6B" }}
                        >
                          {formatUSD(line.unitPrice)} <span className="text-xs">/ month supply</span>
                        </div>
                        {line.savings && line.savings > 0 ? (
                          <div
                            className="text-xs mt-1"
                            style={{
                              fontFamily: "'General Sans', system-ui, sans-serif",
                              color: "#8B5A2B",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Save {formatUSD(line.savings)} on this cadence
                          </div>
                        ) : null}
                      </div>

                      <div className="text-right">
                        <div
                          className="text-base mb-2"
                          style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#0A0A0A", fontWeight: 600 }}
                        >
                          {formatUSD(line.lineTotal)}
                        </div>
                        <button
                          onClick={() => removeItem(line.slug, line.type)}
                          className="p-1 -m-1 rounded transition-colors hover:bg-black/5"
                          aria-label={`Remove ${line.name}`}
                          data-testid={`button-remove-${line.type}-${line.slug}`}
                          style={{ color: "#8B5A2B" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Cadence segmented control */}
                    <div className="mt-3">
                      <div
                        className="text-[9px] uppercase tracking-[0.18em] mb-1.5"
                        style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#6B6B6B" }}
                      >
                        Billing cadence
                      </div>
                      <div
                        className="inline-flex w-full"
                        style={{ border: "1px solid var(--nx-border)" }}
                        role="radiogroup"
                        aria-label="Billing cadence"
                      >
                        {(Object.keys(CADENCE_DISCOUNTS) as CadenceKey[]).map((c) => {
                          const meta = CADENCE_DISCOUNTS[c];
                          const active = line.cadence === c;
                          return (
                            <button
                              key={c}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() => updateCadence(line.slug, line.type, c)}
                              className="flex-1 px-2 py-1.5 text-[10px] uppercase tracking-[0.1em] transition-colors"
                              style={{
                                fontFamily: "'General Sans', system-ui, sans-serif",
                                background: active ? "#0A0A0A" : "transparent",
                                color: active ? "#FAF7F0" : "#0A0A0A",
                              }}
                              data-testid={`button-cadence-${c}-${line.type}-${line.slug}`}
                            >
                              {meta.label}
                              {meta.savePct > 0 ? (
                                <span
                                  className="block text-[8px] mt-0.5"
                                  style={{ color: active ? "#FAF7F0" : "#8B5A2B", opacity: active ? 0.85 : 1 }}
                                >
                                  −{meta.savePct}%
                                </span>
                              ) : (
                                <span className="block text-[8px] mt-0.5" style={{ opacity: 0 }}>
                                  &nbsp;
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Qty stepper */}
                    <div className="flex items-center gap-3 mt-3">
                      <div
                        className="inline-flex items-center"
                        style={{ border: "1px solid var(--nx-border)" }}
                      >
                        <button
                          onClick={() => updateQty(line.slug, line.type, line.qty - 1)}
                          className="px-2.5 py-1.5 hover:bg-black/5 transition-colors"
                          aria-label="Decrease quantity"
                          data-testid={`button-qty-decrease-${line.type}-${line.slug}`}
                          style={{ color: "#0A0A0A" }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="px-3 text-sm min-w-[28px] text-center"
                          style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#0A0A0A" }}
                          data-testid={`text-qty-${line.type}-${line.slug}`}
                        >
                          {line.qty}
                        </span>
                        <button
                          onClick={() => updateQty(line.slug, line.type, line.qty + 1)}
                          className="px-2.5 py-1.5 hover:bg-black/5 transition-colors"
                          aria-label="Increase quantity"
                          data-testid={`button-qty-increase-${line.type}-${line.slug}`}
                          style={{ color: "#0A0A0A" }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span
                        className="text-[10px] uppercase tracking-[0.15em]"
                        style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#6B6B6B" }}
                      >
                        {line.cadenceLabel} · billed monthly
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer / totals */}
          {lines.length > 0 ? (
            <footer
              className="px-6 py-5"
              style={{ borderTop: "1px solid var(--nx-border)", background: "var(--nx-bg-cream)" }}
            >
              {totalSavings > 0 ? (
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#8B5A2B" }}
                  >
                    You save
                  </span>
                  <span
                    className="text-sm"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#8B5A2B" }}
                  >
                    −{formatUSD(totalSavings)}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-sm uppercase tracking-[0.12em]"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#0A0A0A" }}
                >
                  Subtotal · monthly
                </span>
                <span
                  className="text-2xl"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#0A0A0A", fontWeight: 500 }}
                  data-testid="text-cart-subtotal"
                >
                  {formatUSD(subtotal)}
                </span>
              </div>
              <div
                className="flex items-center gap-2 mb-3 pb-3 flex-wrap"
                style={{ borderBottom: "1px dashed var(--nx-border)" }}
              >
                {["Klarna", "HSA/FSA", "Free Ship"].map((label) => (
                  <span
                    key={label}
                    className="text-[9px] uppercase tracking-[0.18em] px-2 py-1"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      background: "#FAF7F0",
                      color: "#0A0A0A",
                      border: "1px solid var(--nx-border)",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <p
                className="text-[11px] mb-4 leading-relaxed"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#6B6B6B" }}
              >
                Physician oversight, lab interpretation, and shipping included. Cancel or change cadence anytime.
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="block w-full text-center px-6 py-3.5 transition-all no-underline"
                style={{
                  background: "#0A0A0A",
                  color: "#FAF7F0",
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  letterSpacing: "0.02em",
                }}
                data-testid="button-checkout"
              >
                Continue to checkout →
              </Link>
              <Link
                href="/cart"
                onClick={close}
                className="block w-full text-center px-6 py-2.5 mt-2 transition-colors hover:bg-black/5 no-underline"
                style={{
                  color: "#0A0A0A",
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "0.8125rem",
                }}
                data-testid="button-view-cart"
              >
                View full cart
              </Link>
            </footer>
          ) : null}
        </div>
      </aside>
    </>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="mb-5 p-5 rounded-full"
        style={{ background: "var(--nx-bg-cream)", color: "#8B5A2B" }}
      >
        <ShoppingBag size={32} strokeWidth={1.25} />
      </div>
      <h3
        className="text-lg mb-2"
        style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#0A0A0A", fontWeight: 500 }}
      >
        Your pharmacy is empty
      </h3>
      <p
        className="text-sm mb-6 max-w-xs"
        style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "#6B6B6B", lineHeight: 1.5 }}
      >
        Browse single peptides, doctor-curated stacks, or take the intake to receive a custom protocol.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-[200px]">
        <Link
          href="/stacks"
          onClick={onClose}
          className="block w-full text-center px-4 py-2.5 transition-all no-underline"
          style={{
            background: "#0A0A0A",
            color: "#FAF7F0",
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            fontWeight: 500,
          }}
          data-testid="link-browse-stacks"
        >
          Browse stacks
        </Link>
        <Link
          href="/women/peptides"
          onClick={onClose}
          className="block w-full text-center px-4 py-2.5 transition-colors hover:bg-black/5 no-underline"
          style={{
            color: "#0A0A0A",
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            border: "1px solid var(--nx-border)",
          }}
          data-testid="link-browse-peptides"
        >
          Single peptides
        </Link>
      </div>
    </div>
  );
}
