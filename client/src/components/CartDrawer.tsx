/* ═══ CartDrawer — the slide-in, in the card grammar (2026-09-05) ═══
   The lines are the same card as the cart page (CartLineCard); the footer
   states the figure once and offers one action. */
import { LAB_KIT } from "@/data/labs";
import { RETEST_WEEK } from "@/data/monitoring";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X, Stethoscope, Truck, Shield, Check, FlaskConical, ArrowRight } from "lucide-react";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import { F, S } from "@/lib/typography";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { resolveWorld } from "@/components/SiteLayout";
import { CartLineCard } from "@/components/CartLineCard";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, itemCount, items, dueToday, lastAdded } = useCart();
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
        className={`fixed inset-0 z-[100] nx-drawer__scrim transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden={!isOpen}
        data-testid="cart-overlay"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[101] h-full w-full sm:w-[460px] nx-drawer transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
        style={{ background: "var(--nx-bg)", borderLeft: "1px solid var(--nx-border)" }}
        data-world={world}
        role="dialog"
        aria-labelledby="nx-cart-drawer-title"
        aria-modal="true"
        aria-hidden={!isOpen}
        data-testid="cart-drawer"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header
            className="flex items-start justify-between gap-4 px-6 py-5"
            style={{ borderBottom: "1px solid var(--nx-border)", background: "var(--nx-bg)" }}
          >
            <div>
              <p id="nx-cart-drawer-title" className="nx-drawer__h" style={{ fontFamily: S }}>
                {itemCount === 0 ? "Your cart is empty." : "Your cart."}
              </p>
            </div>
            <button
              onClick={close}
              className="inline-flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
              aria-label="Close cart"
              data-testid="button-close-cart"
              style={{ color: "var(--nx-fg)", width: 40, height: 40, flexShrink: 0, margin: "-8px -8px 0 0" }}
            >
              <X size={20} />
            </button>
          </header>

          {/* The promise, beside every figure */}
          {lines.length > 0 ? (
            <div className="px-6 py-3" style={{ background: "var(--nx-ceramic)", borderBottom: "1px solid var(--nx-border)" }}>
              <PrescribedPromise testid="cart-drawer-promise" />
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
                    <p style={{ fontFamily: F }}>
                      {/* Adding a medicine that is already in the cart raises its
                          quantity and rewrites its term (CartProvider.addPeptide).
                          Both are reasonable, but silent: a reader who picks six
                          months, adds, then returns and picks twelve has two of
                          them on the longer term and was told neither. The
                          confirmation states the quantity whenever it is above
                          one, so nothing about the line changes unannounced. */}
                      <strong>{justAdded.name}</strong>{justAdded.qty > 1 ? ` ×${justAdded.qty}` : ""} is in the cart{justAdded.oneTime ? "" : ` for ${justAdded.months} ${justAdded.months === 1 ? "month" : "months"}`}. {hasMedicine ? "The baseline blood kit ships with it, complimentary." : ""}
                    </p>
                  </div>
                )}
                <ul className="nx-cartlines" style={{ gap: ".8rem" }}>
                  {lines.map((line) => (
                    <CartLineCard key={`${line.type}-${line.slug}`} line={line} variant="drawer" />
                  ))}
                </ul>
                {hasMedicine && (
                  <div className="nx-included" style={{ marginTop: "1rem", marginBottom: 0 }} data-testid="cart-included">
                    <p className="nx-included__h" style={{ fontFamily: F }}>Included in the price</p>
                    <ul>
                      <li style={{ fontFamily: F }}><FlaskConical size={13} aria-hidden="true" /> {LAB_KIT.name}, {LAB_KIT.markers} markers, at home before the first dose <em>Complimentary</em></li>
                      <li style={{ fontFamily: F }}><Stethoscope size={13} aria-hidden="true" /> A licensed physician reviews the order and sets the dose <em>Included</em></li>
                      <li style={{ fontFamily: F }}><Truck size={13} aria-hidden="true" /> Cold shipping, plain packaging <em>Included</em></li>
                      <li style={{ fontFamily: F }}><Check size={13} aria-hidden="true" /> The same blood test again at week {RETEST_WEEK}, on plans of three months and longer <em>Included</em></li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer: the figure once, one action */}
          {lines.length > 0 ? (
            <footer
              className="px-6 pt-5 pb-6"
              style={{ borderTop: "1px solid var(--nx-border)", background: "var(--nx-ceramic)", display: "grid", gap: "0.9rem" }}
            >
              <div className="nx-drawer__figure">
                <span style={{ fontFamily: F }}>
                  <b>Today, for the whole term</b>
                  <span data-testid="text-cart-subtotal">{formatUSD(subtotal)} a month · paid up front</span>
                </span>
                <strong style={{ fontFamily: S }} data-testid="text-cart-due-today">{formatUSD(dueToday)}</strong>
              </div>

              <Link href="/checkout" onClick={close} className="nx-cta-cobalt" style={{ fontFamily: F, justifyContent: "center", width: "100%" }} data-testid="button-checkout">
                Continue to checkout <ArrowRight size={14} aria-hidden="true" />
              </Link>

              <ul className="nx-summary__rows" aria-label="The facts">
                <li style={{ fontFamily: F }}><Stethoscope size={13} aria-hidden="true" /> The physician's review, before anything is made</li>
                <li style={{ fontFamily: F }}><Truck size={13} aria-hidden="true" /> Cold shipping, included</li>
                <li style={{ fontFamily: F }}><Shield size={13} aria-hidden="true" /> Made to order in a licensed U.S. 503A pharmacy · the refund policy, if declined</li>
              </ul>

              <Link
                href="/cart"
                onClick={close}
                className="nx-text-link"
                style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, justifySelf: "center" }}
                data-testid="button-view-cart"
              >
                See the full cart
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
    <div className="nx-cart-empty" style={{ margin: "1rem 0 0" }}>
      <p style={{ fontFamily: F }}>Three questions, and we point you at the medicine for what you want to change.</p>
      <div className="nx-stepnav">
        <Link href="/quiz" onClick={onClose} className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="link-drawer-quiz">
          Find what fits
        </Link>
        <Link href="/peptides" onClick={onClose} className="nx-cta-ghost" style={{ fontFamily: F }} data-testid="link-browse-peptides">
          Browse every medicine
        </Link>
      </div>
    </div>
  );
}
