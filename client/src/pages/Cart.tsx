/* JOB: confirm the selection and move to checkout; no competing noise.
   The card grammar (2026-09-05): each line is a card with the SKU render,
   the name, the term, the monthly price and the term total; the summary is
   one tile with the figure once. Headings are sentences, not caps labels. */
import { Link, useSearch } from "wouter";
import { ArrowRight, ShieldCheck, Stethoscope, Truck, RefreshCw, FlaskConical } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { F, S } from "@/lib/typography";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { PayToday } from "@/components/PayToday";
import { RETEST_WEEK } from "@/data/monitoring";
import { LAB_KIT } from "@/data/labs";
import { CartLineCard } from "@/components/CartLineCard";

/* PayToday is the house block for the figure; inside the summary tile it
   sits flush so the tile stays one card. */
const FLUSH: React.CSSProperties = { background: "transparent", border: 0, padding: 0 };

export default function Cart() {
  // Cart is a private transactional page — noindex (centralized in useSeo) to
  // keep crawl budget on content pages. A breadcrumb gives the trail navigational
  // context even though the page itself stays out of the index.
  useSeo({
    title: "Your cart",
    description: "Review your selection before the physician's review.",
    path: "/cart",
    noindex: true,
    jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cart", path: "/cart" }])],
  });
  const { lines, subtotal, itemCount, dueToday } = useCart();
  const terms = lines.filter((l) => !l.oneTime).map((l) => `${l.months} ${l.months === 1 ? "month" : "months"} of ${l.name}`).join(" · ");
  /* Backing out of hosted Stripe Checkout returns here with ?cancelled=1
     (functions/api/checkout-session.ts). Say plainly that nothing was
     charged — a reader who abandons a payment and lands on an unchanged
     cart otherwise has to guess whether their card was touched. */
  const cancelled = new URLSearchParams(useSearch()).get("cancelled") === "1";

  return (
    <SiteLayout variant="gate">
      <div style={{ background: "var(--nx-bg)", minHeight: "100vh" }}>
        {/* the header is sticky and in flow: the page starts one breath below it */}
        <div className="nx-container nx-section-y" style={{ paddingTop: "clamp(2rem, 4vw, 3rem)" }}>
          <Reveal>
            <div>
              {cancelled && (
                <p className="nx-cart-cancelled" role="status" data-testid="cart-cancelled" style={{ fontFamily: F }}>
                  Payment was not completed, and nothing was charged. Your cart is as you left it.
                </p>
              )}
              <h1 className="nx-cartpage__h1" style={{ fontFamily: S }} data-testid="cart-title">
                {itemCount === 0 ? "Your cart is empty." : "Review what you chose."}
              </h1>
              <p className="nx-cartpage__lede" style={{ fontFamily: F }}>
                {itemCount === 0
                  ? "Nothing chosen yet."
                  : "Each medicine, its term, its price. Change any of them here. A licensed physician reviews the order before anything is made."}
              </p>
            </div>
          </Reveal>

          {lines.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="nx-cartgrid">
              <section aria-label="What you chose">
                <Reveal>
                  <ul className="nx-cartlines" data-testid="cart-page-lines">
                    {lines.map((line) => (
                      <CartLineCard key={`${line.type}-${line.slug}`} line={line} variant="page" />
                    ))}
                  </ul>
                </Reveal>

                <div className="nx-stepnav" style={{ marginTop: "1.2rem" }}>
                  <Link href="/peptides" className="nx-cta-ghost" style={{ fontFamily: F }} data-testid="link-continue-peptides">
                    Add a medicine
                  </Link>
                  <Link href="/stacks" className="nx-cta-ghost" style={{ fontFamily: F }} data-testid="link-continue-stacks">
                    See the protocols
                  </Link>
                </div>

                {/* Within the price: the panel before the first dose, and the
                    week-12 test. Stated as a fact of the plan. */}
                <div className="nx-note nx-note--row" style={{ marginTop: "1.2rem" }} data-testid="cart-panel-note">
                  <div style={{ display: "flex", gap: ".7rem", alignItems: "flex-start", flex: "1 1 24rem", minWidth: 0 }}>
                    <FlaskConical size={16} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: 2 }} />
                    <p>
                      <strong>{LAB_KIT.name}: {PANEL_TOTAL_MARKERS} markers at home before the first dose, included.</strong>{" "}
                      The physician sets the dose from it. The same panel again at week {RETEST_WEEK} on plans of three months and longer. Additional tests from $19.
                    </p>
                  </div>
                  <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }} data-testid="link-cart-bloodwork">
                    Every marker <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </section>

              {/* The summary: one tile, the figure once (PayToday states it). */}
              <Reveal delay={80}>
                <aside className="nx-summary" aria-label="What you pay" data-testid="cart-summary">
                  <PayToday amount={formatUSD(subtotal)} dueToday={formatUSD(dueToday)} terms={terms} testid="cart-pay-today" style={FLUSH} />
                  <div className="nx-summary__rule" />
                  <PrescribedPromise testid="cart-promise" />
                  <ul className="nx-summary__rows" aria-label="Included in the price">
                    <li style={{ fontFamily: F }}><Stethoscope size={13} aria-hidden="true" /> The physician's review, included</li>
                    <li style={{ fontFamily: F }}><Truck size={13} aria-hidden="true" /> Cold shipping, plain packaging, included</li>
                    <li style={{ fontFamily: F }}><RefreshCw size={13} aria-hidden="true" /> The blood kit, the week-{RETEST_WEEK} test and the dose review, included</li>
                  </ul>
                  <Link href="/checkout" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="button-checkout-page">
                    Continue to checkout <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <ul className="nx-summary__rows" aria-label="The facts">
                    <li style={{ fontFamily: F }}><ShieldCheck size={13} aria-hidden="true" /> Encrypted in transit</li>
                    <li style={{ fontFamily: F }}><ShieldCheck size={13} aria-hidden="true" /> Made to order in a licensed U.S. 503A pharmacy</li>
                    <li style={{ fontFamily: F }}><Stethoscope size={13} aria-hidden="true" /> A licensed U.S. physician on every case</li>
                  </ul>
                </aside>
              </Reveal>
            </div>
          )}
        </div>
      </div>

      {/* The phone bar: one action, with a spacer so it covers nothing. */}
      {lines.length > 0 && <div className="lg:hidden" style={{ height: 76 }} aria-hidden />}
      {lines.length > 0 && (
        <div className="lg:hidden nx-cartbar">
          <Link href="/checkout" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="button-checkout-mobile">
            Continue to checkout · {formatUSD(dueToday)} today
          </Link>
        </div>
      )}
    </SiteLayout>
  );
}

function EmptyCart() {
  return (
    <div className="nx-cart-empty" data-testid="cart-empty">
      <p style={{ fontFamily: F }}>Every medicine shows what it treats and what it costs, grouped by goal.</p>
      <div className="nx-stepnav">
        <Link href="/peptides" className="nx-cta-cobalt" style={{ fontFamily: F }} data-testid="link-empty-browse-peptides">
          Shop the medicines
        </Link>
        <Link href="/stacks" className="nx-cta-ghost" style={{ fontFamily: F }} data-testid="link-empty-browse-stacks">
          See the protocols
        </Link>
      </div>
    </div>
  );
}
