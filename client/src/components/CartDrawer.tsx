import { LAB_KIT } from "@/data/labs";
import { RETEST_WEEK } from "@/data/monitoring";
import { RoadStrip } from "@/components/RoadStrip";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X, Trash2, Plus, Minus, ShoppingBag, Stethoscope, Truck, Shield, Check, FlaskConical } from "lucide-react";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import type { CadenceKey } from "@/data/pricing";
import { CADENCE_DISCOUNTS, pricing, billingNote } from "@/data/pricing";
import { FONT } from "@/lib/typography";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { resolveWorld } from "@/components/SiteLayout";

/* ──────────────────────────────────────────────────────────────
   CartDrawer — Hims-tier slide-in
   ────────────────────────────────────────────────────────────── */

const MONO = "ui-monospace, SFMono-Regular, monospace";


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
    itemCount,
    updateQty,
    updateCadence,
    removeItem,
    items,
    dueToday,
    lastAdded,
  } = useCart();
  const [location] = useLocation();
  // The drawer mounts at the App root, outside every page's data-world
  // wrapper — so without this it always rendered azure/navy even in her
  // orchid world. Re-declare the world on the drawer itself.
  const world = resolveWorld(location);

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

  const hasMedicine = items.some((i) => i.type === "peptide" || i.type === "stack");
  const justAdded = lastAdded && isOpen && Date.now() - lastAdded.at < 8000 ? lines.find((l) => l.slug === lastAdded.slug && l.type === lastAdded.type) : undefined;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(21, 24, 28,0.55)", backdropFilter: "blur(3px)" }}
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
          boxShadow: "-24px 0 60px rgba(21, 24, 28,0.18)",
        }}
        data-world={world}
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
              <h2
                className="text-[1.35rem] leading-tight"
                style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "var(--nx-ls-normal)" }}
              >
                {itemCount === 0 ? "Your cart is empty" : "The plan"}
              </h2>
              <div style={{ marginTop: 8 }}><RoadStrip current={itemCount === 0 ? 0 : 1} testId="cart-road" /></div>
            </div>
            <button
              onClick={close}
              className="p-2 -m-2 rounded-full transition-colors hover:bg-black/5"
              aria-label="Close cart"
              data-testid="button-close-cart"
              style={{ color: "var(--nx-fg)" }}
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
              <PrescribedPromise testid="cart-drawer-promise" detail="Card is held; billing runs through Bask Health after review." />
            </div>
          ) : null}

          {/* Lines */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {lines.length === 0 ? (
              <EmptyCart onClose={close} />
            ) : (
              <>
                {justAdded && (
                  <div className="nx-added" role="status" data-testid="cart-added">
                    <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                    <p style={{ fontFamily: FONT }}>
                      <strong>{justAdded.name}</strong> is in the plan{justAdded.oneTime ? "" : ` for ${justAdded.months} ${justAdded.months === 1 ? "month" : "months"}`}. {hasMedicine ? "Your baseline blood kit ships with it, complimentary." : ""}
                    </p>
                  </div>
                )}
                {hasMedicine && (
                  <div className="nx-included" data-testid="cart-included">
                    <p className="nx-included__h" style={{ fontFamily: FONT }}>Included in the price</p>
                    <ul>
                      <li style={{ fontFamily: FONT }}><FlaskConical size={13} aria-hidden="true" /> {LAB_KIT.name}, {LAB_KIT.markers} markers, at home before the first dose <em>Complimentary</em></li>
                      <li style={{ fontFamily: FONT }}><Stethoscope size={13} aria-hidden="true" /> A licensed physician reviews the order and sets the dose <em>Included</em></li>
                      <li style={{ fontFamily: FONT }}><Truck size={13} aria-hidden="true" /> Cold shipping, plain packaging <em>Included</em></li>
                      <li style={{ fontFamily: FONT }}><Check size={13} aria-hidden="true" /> The same blood test again at week {RETEST_WEEK}, on plans of three months and longer <em>Included</em></li>
                    </ul>
                  </div>
                )}
                <ul className="space-y-4 list-none p-0">
                  {lines.map((line) => {
                    const isPeptide = line.type === "peptide";
                    const spec = isPeptide ? pricing[line.slug] : null;
                    return (
                      <li
                        key={`${line.type}-${line.slug}`}
                        className="p-4"
                        style={{
                          background: "var(--nx-ceramic)",
                          border: "1px solid var(--nx-border)",
                          borderRadius: "var(--nx-r-md)",
                        }}
                        data-testid={`cart-line-${line.type}-${line.slug}`}
                      >
                        {/* Header row: type chip + name + price */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span
                                className="text-[11px] uppercase tracking-[var(--nx-ls-wide)] px-1.5 py-0.5"
                                style={{
                                  fontFamily: FONT,
                                  background: line.type === "stack" ? "var(--nx-fg)" : "var(--nx-bg-cream)",
                                  color: line.type === "stack" ? "var(--nx-bg)" : "var(--nx-amber)",
                                  border: line.type === "stack" ? "none" : "1px solid var(--nx-border)",
                                  fontWeight: 600,
                                  borderRadius: "var(--nx-r-2xs)",
                                }}
                              >
                                {line.type === "stack" ? "Protocol" : line.type === "lab" ? "Blood test" : "Medicine"}
                              </span>
                            </div>
                            <div
                              className="text-base leading-tight mb-1"
                              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "var(--nx-ls-normal)" }}
                            >
                              {line.name}
                            </div>
                            {spec ? (
                              <div
                                className="text-[11px]"
                                style={{ fontFamily: MONO, color: "var(--nx-fg-graphite)", letterSpacing: "0.02em" }}
                              >
                                {spec.vialSpec}
                              </div>
                            ) : null}
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div
                              className="text-base leading-none"
                              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 700 }}
                            >
                              {formatUSD(line.lineTotal)}
                            </div>
                            <div
                              className="text-[11px] mt-1"
                              style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", letterSpacing: "0.05em" }}
                            >
                              {line.oneTime ? (line.complimentary ? "Complimentary" : "One time") : `${formatUSD(line.unitPrice)}/mo`}
                            </div>
                            {!line.oneTime && (
                              <div
                                className="text-[11px] mt-0.5"
                                style={{ fontFamily: FONT, color: "var(--nx-fg-muted)", letterSpacing: "0.02em" }}
                              >
                                {billingNote(line.cadence, line.unitPrice)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Cadence segmented control (medicines only; a lab kit is one time) */}
                        {!line.oneTime && <div className="mt-3">
                          <div
                            className="text-[11px] uppercase tracking-[var(--nx-ls-wide)] mb-1.5"
                            style={{ fontFamily: FONT, color: "var(--nx-fg-muted)", fontWeight: 600 }}
                          >
                            Billing cadence
                          </div>
                          <div
                            className="grid grid-cols-4 w-full overflow-hidden"
                            style={{ border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-sm)" }}
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
                                  className="px-2 py-2 text-[11px] uppercase tracking-[var(--nx-ls-caps)] transition-colors"
                                  style={{
                                    fontFamily: FONT,
                                    background: active ? "var(--nx-fg)" : "transparent",
                                    color: active ? "var(--nx-bg)" : "var(--nx-fg)",
                                    fontWeight: active ? 600 : 500,
                                  }}
                                  data-testid={`button-cadence-${c}-${line.type}-${line.slug}`}
                                >
                                  <span className="block leading-tight">{meta.label}</span>
                                  {meta.savePct > 0 ? (
                                    <span
                                      className="block text-[11px] mt-0.5"
                                      style={{ color: active ? "#A8CBF5" : "var(--nx-amber)", opacity: 1, fontWeight: 600 }}
                                    >
                                      −{meta.savePct}% a month
                                    </span>
                                  ) : (
                                    <span
                                      className="block text-[11px] mt-0.5"
                                      style={{ opacity: 0.6, color: active ? "#A8CBF5" : "var(--nx-fg-muted)" }}
                                    >
                                      Flex
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>}

                        {/* Bottom row: qty stepper + delete */}
                        <div className="flex items-center justify-between mt-3">
                          <div
                            className="inline-flex items-center"
                            style={{ border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-sm)" }}
                          >
                            <button
                              onClick={() => updateQty(line.slug, line.type, line.qty - 1)}
                              disabled={line.qty <= 1}
                              className="px-2.5 py-1.5 hover:bg-black/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                              aria-label="Decrease quantity"
                              title={line.qty <= 1 ? "Use Remove to delete this item" : undefined}
                              data-testid={`button-qty-decrease-${line.type}-${line.slug}`}
                              style={{ color: "var(--nx-fg)" }}
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              className="px-3 text-sm min-w-[28px] text-center"
                              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}
                              data-testid={`text-qty-${line.type}-${line.slug}`}
                            >
                              {line.qty}
                            </span>
                            <button
                              onClick={() => updateQty(line.slug, line.type, line.qty + 1)}
                              className="px-2.5 py-1.5 hover:bg-black/5 transition-colors"
                              aria-label="Increase quantity"
                              data-testid={`button-qty-increase-${line.type}-${line.slug}`}
                              style={{ color: "var(--nx-fg)" }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(line.slug, line.type)}
                            className="flex items-center gap-1.5 text-[11px] uppercase tracking-[var(--nx-ls-caps)] px-2 py-1.5 rounded-md transition-colors hover:bg-black/5"
                            aria-label={`Remove ${line.name}`}
                            data-testid={`button-remove-${line.type}-${line.slug}`}
                            style={{ color: "var(--nx-amber)", fontFamily: FONT, fontWeight: 500 }}
                          >
                            <Trash2 size={11} /> Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

              </>
            )}
          </div>

          {/* Footer / totals */}
          {lines.length > 0 ? (
            <footer
              className="px-6 pt-5 pb-6"
              style={{ borderTop: "1px solid var(--nx-border)", background: "var(--nx-ceramic)" }}
            >
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div
                    className="text-[11px] uppercase tracking-[var(--nx-ls-caps)] mb-0.5"
                    style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", fontWeight: 500 }}
                  >
                    Today, for the whole term
                  </div>
                  <div
                    className="text-[11px]"
                    style={{ fontFamily: FONT, color: "var(--nx-fg-muted)" }}
                    data-testid="text-cart-subtotal"
                  >
                    {formatUSD(subtotal)} a month · paid up front
                  </div>
                </div>
                <span
                  className="text-[1.75rem] leading-none"
                  style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 700, letterSpacing: "var(--nx-ls-tight)" }}
                  data-testid="text-cart-due-today"
                >
                  {formatUSD(dueToday)}
                </span>
              </div>

              {/* Payment badges */}
              <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                {[
                  { label: "Physician review", detail: "before anything is made" },
                  { label: "Shipping", detail: "included · cold" },
                  { label: "Refund policy", detail: "if declined" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[var(--nx-ls-caps)] px-2 py-1"
                    style={{
                      fontFamily: FONT,
                      background: "var(--nx-bg-cream)",
                      color: "var(--nx-fg)",
                      border: "1px solid var(--nx-border)",
                      borderRadius: "var(--nx-r-2xs)",
                      fontWeight: 600,
                    }}
                  >
                    <Check size={9} strokeWidth={3} style={{ color: "var(--nx-amber)" }} />
                    <span>{b.label}</span>
                    <span style={{ color: "var(--nx-fg-muted)", fontWeight: 500 }}>· {b.detail}</span>
                  </span>
                ))}
              </div>

              {/* Primary CTA */}
              <Link
                href="/checkout"
                onClick={close}
                className="block w-full text-center px-6 py-4 transition-all no-underline hover:opacity-95"
                style={{
                  background: "var(--nx-fg)",
                  color: "var(--nx-bg)",
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: "var(--nx-t-base)",
                  letterSpacing: "0.02em",
                  borderRadius: "var(--nx-r-md)",
                  boxShadow: "0 2px 8px rgba(21, 24, 28,0.15)",
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
                className="block w-full text-center px-6 py-2 mt-3 text-[11px] uppercase tracking-[var(--nx-ls-caps)] transition-colors no-underline hover:underline"
                style={{
                  color: "var(--nx-fg-graphite)",
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
      <span style={{ color: "var(--nx-amber)" }}>{icon}</span>
      <span
        className="text-[11px] uppercase tracking-[var(--nx-ls-caps)] leading-tight"
        style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", fontWeight: 600 }}
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
        style={{ background: "var(--nx-bg-cream)", color: "var(--nx-amber)" }}
      >
        <ShoppingBag size={32} strokeWidth={1.25} />
      </div>
      <h3
        className="text-lg mb-2"
        style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "var(--nx-ls-normal)" }}
      >
        Nothing here yet
      </h3>
      <p
        className="text-sm mb-6 max-w-xs"
        style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.55 }}
      >
        Every medicine shows what it treats and what it costs, grouped by goal.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-[220px]">
        <Link
          href="/peptides"
          onClick={onClose}
          className="block w-full text-center px-4 py-3 transition-all no-underline"
          style={{
            background: "var(--nx-fg)",
            color: "var(--nx-bg)",
            fontFamily: FONT,
            fontSize: "var(--nx-t-sm)",
            fontWeight: 600,
            borderRadius: "var(--nx-r-sm)",
          }}
          data-testid="link-browse-stacks"
        >
          Browse medicines
        </Link>
        <Link
          href="/stacks"
          onClick={onClose}
          className="block w-full text-center px-4 py-3 transition-colors hover:bg-black/5 no-underline"
          style={{
            color: "var(--nx-fg)",
            fontFamily: FONT,
            fontSize: "var(--nx-t-sm)",
            fontWeight: 500,
            border: "1px solid var(--nx-border)",
            borderRadius: "var(--nx-r-sm)",
          }}
          data-testid="link-browse-peptides"
        >
          See protocols
        </Link>
      </div>
    </div>
  );
}
