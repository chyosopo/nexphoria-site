import { useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { X, Trash2, Plus, Minus, ShoppingBag, Stethoscope, Truck, Shield, Beaker, Plus as PlusIcon, Check } from "lucide-react";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import type { CadenceKey } from "@/data/pricing";
import { CADENCE_DISCOUNTS, pricing } from "@/data/pricing";

/* ──────────────────────────────────────────────────────────────
   CartDrawer — Hims-tier slide-in
   ────────────────────────────────────────────────────────────── */

const FONT = "'General Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

/* Suggested pairings for cross-sell — surfaced when a matching seed peptide is in the cart */
const PAIRINGS: Record<string, { slug: string; reason: string }[]> = {
  "bpc-157": [{ slug: "tb-500", reason: "Stacks for connective tissue + systemic repair" }],
  "tb-500": [{ slug: "bpc-157", reason: "Cellular repair + tissue healing synergy" }],
  "ipamorelin": [{ slug: "cjc-1295", reason: "Pulsatile + sustained GH release protocol" }],
  "cjc-1295": [{ slug: "ipamorelin", reason: "Pulsatile release completes the GH stack" }],
  "tirzepatide": [{ slug: "aod-9604", reason: "Fat oxidation while preserving lean mass" }],
  "retatrutide": [{ slug: "aod-9604", reason: "Amplifies lipolysis on the same schedule" }],
  "ghk-cu": [{ slug: "bpc-157", reason: "Skin renewal + underlying tissue repair" }],
  "nad-plus": [{ slug: "epitalon", reason: "Cellular energy + telomere maintenance" }],
  "epitalon": [{ slug: "nad-plus", reason: "Telomere protocol + mitochondrial fuel" }],
  "semax": [{ slug: "selank", reason: "Cognitive drive + calm focus balance" }],
  "selank": [{ slug: "semax", reason: "Anxiolytic + drive combination" }],
};

const PEPTIDE_LABELS: Record<string, string> = {
  "bpc-157": "BPC-157",
  "tb-500": "TB-500",
  "ghk-cu": "GHK-Cu",
  "semax": "Semax",
  "selank": "Selank",
  "tesamorelin": "Tesamorelin",
  "ipamorelin": "Ipamorelin",
  "cjc-1295": "CJC-1295",
  "epitalon": "Epitalon",
  "thymosin-a1": "Thymosin α-1",
  "nad-plus": "NAD+",
  "mots-c": "MOTS-c",
  "dsip": "DSIP",
  "tirzepatide": "Tirzepatide",
  "retatrutide": "Retatrutide",
  "aod-9604": "AOD-9604",
};

export function CartDrawer() {
  const {
    isOpen,
    close,
    lines,
    subtotal,
    totalSavings,
    itemCount,
    updateQty,
    updateCadence,
    removeItem,
    addPeptide,
    items,
  } = useCart();
  const [location] = useLocation();

  // Close drawer on route change
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

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Compute suggested add-ons based on current cart contents
  const suggestions = useMemo(() => {
    const inCartSlugs = new Set(items.filter((i) => i.type === "peptide").map((i) => i.slug));
    const seen = new Set<string>();
    const out: { slug: string; reason: string }[] = [];
    for (const item of items) {
      if (item.type !== "peptide") continue;
      const pairs = PAIRINGS[item.slug] || [];
      for (const p of pairs) {
        if (inCartSlugs.has(p.slug) || seen.has(p.slug)) continue;
        seen.add(p.slug);
        out.push(p);
        if (out.length >= 2) return out;
      }
    }
    // fallback: recommend biomarker retest concept via BPC if cart is only stack-based
    return out;
  }, [items]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(10,10,10,0.55)", backdropFilter: "blur(3px)" }}
        onClick={close}
        aria-hidden={!isOpen}
        data-testid="cart-overlay"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[101] h-full w-full sm:w-[460px] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
        style={{
          background: "var(--nx-bg)",
          borderLeft: "1px solid var(--nx-border)",
          boxShadow: "-24px 0 60px rgba(10,10,10,0.18)",
        }}
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
            style={{ borderBottom: "1px solid var(--nx-border)", background: "var(--nx-bg)" }}
          >
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.22em] mb-1"
                style={{ fontFamily: FONT, color: "#8B5A2B", fontWeight: 500 }}
              >
                Your Pharmacy
              </div>
              <h2
                className="text-[1.35rem] leading-tight"
                style={{ fontFamily: FONT, color: "#0A0A0A", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                {itemCount === 0 ? "Cart is empty" : `${itemCount} ${itemCount === 1 ? "item" : "items"} · pending physician review`}
              </h2>
            </div>
            <button
              onClick={close}
              className="p-2 -m-2 rounded-full transition-colors hover:bg-black/5"
              aria-label="Close cart"
              data-testid="button-close-cart"
              style={{ color: "#0A0A0A" }}
            >
              <X size={20} />
            </button>
          </header>

          {/* Physician banner */}
          {lines.length > 0 ? (
            <div
              className="flex items-center gap-2.5 px-6 py-3"
              style={{ background: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
            >
              <Stethoscope size={14} style={{ color: "#8B5A2B", flexShrink: 0 }} />
              <p className="text-[11px]" style={{ fontFamily: FONT, color: "#4A4A4A", lineHeight: 1.45 }}>
                <strong style={{ color: "#0A0A0A", fontWeight: 600 }}>No charge today.</strong>{" "}
                Card is held — physician reviews then bills through Bask Health.
              </p>
            </div>
          ) : null}

          {/* Lines */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {lines.length === 0 ? (
              <EmptyCart onClose={close} />
            ) : (
              <>
                <ul className="space-y-4 list-none p-0">
                  {lines.map((line) => {
                    const isPeptide = line.type === "peptide";
                    const spec = isPeptide ? pricing[line.slug] : null;
                    return (
                      <li
                        key={`${line.type}-${line.slug}`}
                        className="p-4"
                        style={{
                          background: "#fff",
                          border: "1px solid var(--nx-border)",
                          borderRadius: 14,
                        }}
                        data-testid={`cart-line-${line.type}-${line.slug}`}
                      >
                        {/* Header row: type chip + name + price */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span
                                className="text-[9px] uppercase tracking-[0.2em] px-1.5 py-0.5"
                                style={{
                                  fontFamily: FONT,
                                  background: line.type === "stack" ? "#0A0A0A" : "var(--nx-bg-cream)",
                                  color: line.type === "stack" ? "#FAF7F0" : "#8B5A2B",
                                  border: line.type === "stack" ? "none" : "1px solid var(--nx-border)",
                                  fontWeight: 600,
                                  borderRadius: 3,
                                }}
                              >
                                {line.type === "stack" ? "Curated Stack" : "Single Peptide"}
                              </span>
                              {spec?.badge ? (
                                <span
                                  className="text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5"
                                  style={{
                                    fontFamily: FONT,
                                    background: "transparent",
                                    color: "#8B5A2B",
                                    border: "1px solid #E8D9C4",
                                    fontWeight: 600,
                                    borderRadius: 3,
                                  }}
                                >
                                  {spec.badge}
                                </span>
                              ) : null}
                            </div>
                            <div
                              className="text-base leading-tight mb-1"
                              style={{ fontFamily: FONT, color: "#0A0A0A", fontWeight: 600, letterSpacing: "-0.01em" }}
                            >
                              {line.name}
                            </div>
                            {spec ? (
                              <div
                                className="text-[11px]"
                                style={{ fontFamily: MONO, color: "#6B6B6B", letterSpacing: "0.02em" }}
                              >
                                {spec.vialSpec}
                              </div>
                            ) : null}
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div
                              className="text-base leading-none"
                              style={{ fontFamily: FONT, color: "#0A0A0A", fontWeight: 700 }}
                            >
                              {formatUSD(line.lineTotal)}
                            </div>
                            <div
                              className="text-[10px] mt-1"
                              style={{ fontFamily: FONT, color: "#6B6B6B", letterSpacing: "0.05em" }}
                            >
                              {formatUSD(line.unitPrice)}/mo
                            </div>
                          </div>
                        </div>

                        {/* Savings line */}
                        {line.savings && line.savings > 0 ? (
                          <div
                            className="text-[11px] mb-3 inline-flex items-center gap-1 px-2 py-0.5"
                            style={{
                              fontFamily: FONT,
                              color: "#8B5A2B",
                              background: "var(--nx-bg-cream)",
                              border: "1px solid #E8D9C4",
                              borderRadius: 3,
                              letterSpacing: "0.04em",
                              fontWeight: 500,
                            }}
                          >
                            <Check size={10} strokeWidth={2.5} /> Saving {formatUSD(line.savings)} on this cadence
                          </div>
                        ) : null}

                        {/* Cadence segmented control */}
                        <div className="mt-3">
                          <div
                            className="text-[9px] uppercase tracking-[0.18em] mb-1.5"
                            style={{ fontFamily: FONT, color: "#8A8A8A", fontWeight: 600 }}
                          >
                            Billing cadence
                          </div>
                          <div
                            className="grid grid-cols-3 w-full overflow-hidden"
                            style={{ border: "1px solid var(--nx-border)", borderRadius: 8 }}
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
                                  className="px-2 py-2 text-[10px] uppercase tracking-[0.1em] transition-colors"
                                  style={{
                                    fontFamily: FONT,
                                    background: active ? "#0A0A0A" : "transparent",
                                    color: active ? "#FAF7F0" : "#0A0A0A",
                                    fontWeight: active ? 600 : 500,
                                  }}
                                  data-testid={`button-cadence-${c}-${line.type}-${line.slug}`}
                                >
                                  <span className="block leading-tight">{meta.label}</span>
                                  {meta.savePct > 0 ? (
                                    <span
                                      className="block text-[8px] mt-0.5"
                                      style={{ color: active ? "#F5D9A8" : "#8B5A2B", opacity: 1, fontWeight: 600 }}
                                    >
                                      SAVE {meta.savePct}%
                                    </span>
                                  ) : (
                                    <span
                                      className="block text-[8px] mt-0.5"
                                      style={{ opacity: 0.6, color: active ? "#F5D9A8" : "#8A8A8A" }}
                                    >
                                      Flex
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Bottom row: qty stepper + delete */}
                        <div className="flex items-center justify-between mt-3">
                          <div
                            className="inline-flex items-center"
                            style={{ border: "1px solid var(--nx-border)", borderRadius: 8 }}
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
                              style={{ fontFamily: FONT, color: "#0A0A0A", fontWeight: 600 }}
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
                          <button
                            onClick={() => removeItem(line.slug, line.type)}
                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] px-2 py-1.5 rounded-md transition-colors hover:bg-black/5"
                            aria-label={`Remove ${line.name}`}
                            data-testid={`button-remove-${line.type}-${line.slug}`}
                            style={{ color: "#8B5A2B", fontFamily: FONT, fontWeight: 500 }}
                          >
                            <Trash2 size={11} /> Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Cross-sell / add-on shelf */}
                {suggestions.length > 0 ? (
                  <div
                    className="mt-6 p-4"
                    style={{
                      background: "var(--nx-bg-cream)",
                      border: "1px dashed #D4B98F",
                      borderRadius: 14,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Beaker size={13} style={{ color: "#8B5A2B" }} />
                      <span
                        className="text-[10px] uppercase tracking-[0.2em]"
                        style={{ fontFamily: FONT, color: "#8B5A2B", fontWeight: 600 }}
                      >
                        Physicians often pair with
                      </span>
                    </div>
                    <ul className="space-y-2 list-none p-0">
                      {suggestions.map((s) => {
                        const p = pricing[s.slug];
                        if (!p) return null;
                        return (
                          <li
                            key={s.slug}
                            className="flex items-start justify-between gap-3 p-3"
                            style={{ background: "#fff", border: "1px solid var(--nx-border)", borderRadius: 10 }}
                            data-testid={`suggestion-${s.slug}`}
                          >
                            <div className="flex-1 min-w-0">
                              <div
                                className="text-sm leading-tight mb-0.5"
                                style={{ fontFamily: FONT, color: "#0A0A0A", fontWeight: 600 }}
                              >
                                {PEPTIDE_LABELS[s.slug] || s.slug}
                              </div>
                              <div
                                className="text-[11px] leading-snug"
                                style={{ fontFamily: FONT, color: "#6B6B6B" }}
                              >
                                {s.reason}
                              </div>
                              <div
                                className="text-[10px] mt-1"
                                style={{ fontFamily: MONO, color: "#8B5A2B", letterSpacing: "0.02em", fontWeight: 600 }}
                              >
                                from {formatUSD(p.monthlyPrice)}/mo
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => addPeptide(s.slug, { qty: 1, cadence: "3mo" })}
                              className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-2 text-[10px] uppercase tracking-[0.15em] transition-all hover:opacity-90"
                              style={{
                                fontFamily: FONT,
                                background: "#0A0A0A",
                                color: "#FAF7F0",
                                fontWeight: 600,
                                borderRadius: 8,
                              }}
                              data-testid={`button-add-suggestion-${s.slug}`}
                            >
                              <PlusIcon size={11} strokeWidth={2.5} /> Add
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </>
            )}
          </div>

          {/* Footer / totals */}
          {lines.length > 0 ? (
            <footer
              className="px-6 pt-5 pb-6"
              style={{ borderTop: "1px solid var(--nx-border)", background: "#fff" }}
            >
              {totalSavings > 0 ? (
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[11px] uppercase tracking-[0.15em]"
                    style={{ fontFamily: FONT, color: "#8B5A2B", fontWeight: 600 }}
                  >
                    You save
                  </span>
                  <span
                    className="text-sm"
                    style={{ fontFamily: FONT, color: "#8B5A2B", fontWeight: 600 }}
                  >
                    −{formatUSD(totalSavings)}
                  </span>
                </div>
              ) : null}
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div
                    className="text-[11px] uppercase tracking-[0.12em] mb-0.5"
                    style={{ fontFamily: FONT, color: "#6B6B6B", fontWeight: 500 }}
                  >
                    Subtotal
                  </div>
                  <div
                    className="text-[10px]"
                    style={{ fontFamily: FONT, color: "#8A8A8A" }}
                  >
                    Billed monthly · physician oversight included
                  </div>
                </div>
                <span
                  className="text-[1.75rem] leading-none"
                  style={{ fontFamily: FONT, color: "#0A0A0A", fontWeight: 700, letterSpacing: "-0.02em" }}
                  data-testid="text-cart-subtotal"
                >
                  {formatUSD(subtotal)}
                </span>
              </div>

              {/* Payment badges */}
              <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                {[
                  { label: "Klarna", detail: "4× interest-free" },
                  { label: "HSA/FSA", detail: "eligible" },
                  { label: "Free ship", detail: "cold-chain" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.15em] px-2 py-1"
                    style={{
                      fontFamily: FONT,
                      background: "var(--nx-bg-cream)",
                      color: "#0A0A0A",
                      border: "1px solid var(--nx-border)",
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    <Check size={9} strokeWidth={3} style={{ color: "#8B5A2B" }} />
                    <span>{b.label}</span>
                    <span style={{ color: "#8A8A8A", fontWeight: 500 }}>· {b.detail}</span>
                  </span>
                ))}
              </div>

              {/* Primary CTA */}
              <Link
                href="/checkout"
                onClick={close}
                className="block w-full text-center px-6 py-4 transition-all no-underline hover:opacity-95"
                style={{
                  background: "#0A0A0A",
                  color: "#FAF7F0",
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  letterSpacing: "0.02em",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(10,10,10,0.15)",
                }}
                data-testid="button-checkout"
              >
                Continue to checkout →
              </Link>

              {/* Trust cluster */}
              <div
                className="mt-4 pt-4 grid grid-cols-3 gap-2"
                style={{ borderTop: "1px solid var(--nx-border)" }}
              >
                <TrustMini icon={<Stethoscope size={13} />} label="Physician review" />
                <TrustMini icon={<Truck size={13} />} label="Cold-chain ship" />
                <TrustMini icon={<Shield size={13} />} label="US 503A pharmacy" />
              </div>

              <Link
                href="/cart"
                onClick={close}
                className="block w-full text-center px-6 py-2 mt-3 text-[11px] uppercase tracking-[0.14em] transition-colors no-underline hover:underline"
                style={{
                  color: "#6B6B6B",
                  fontFamily: FONT,
                  fontWeight: 500,
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

function TrustMini({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <span style={{ color: "#8B5A2B" }}>{icon}</span>
      <span
        className="text-[9px] uppercase tracking-[0.1em] leading-tight"
        style={{ fontFamily: FONT, color: "#4A4A4A", fontWeight: 600 }}
      >
        {label}
      </span>
    </div>
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
        style={{ fontFamily: FONT, color: "#0A0A0A", fontWeight: 600, letterSpacing: "-0.01em" }}
      >
        Your pharmacy is empty
      </h3>
      <p
        className="text-sm mb-6 max-w-xs"
        style={{ fontFamily: FONT, color: "#6B6B6B", lineHeight: 1.55 }}
      >
        Browse single peptides, doctor-curated stacks, or take the intake to receive a custom protocol.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-[220px]">
        <Link
          href="/stacks"
          onClick={onClose}
          className="block w-full text-center px-4 py-3 transition-all no-underline"
          style={{
            background: "#0A0A0A",
            color: "#FAF7F0",
            fontFamily: FONT,
            fontSize: "0.8125rem",
            fontWeight: 600,
            borderRadius: 10,
          }}
          data-testid="link-browse-stacks"
        >
          Browse curated stacks
        </Link>
        <Link
          href="/women/peptides"
          onClick={onClose}
          className="block w-full text-center px-4 py-3 transition-colors hover:bg-black/5 no-underline"
          style={{
            color: "#0A0A0A",
            fontFamily: FONT,
            fontSize: "0.8125rem",
            fontWeight: 500,
            border: "1px solid var(--nx-border)",
            borderRadius: 10,
          }}
          data-testid="link-browse-peptides"
        >
          Single peptides
        </Link>
      </div>
    </div>
  );
}
