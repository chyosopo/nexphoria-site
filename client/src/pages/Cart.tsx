/* JOB: confirm the selection and move to checkout; no competing noise. */
import { Link } from "wouter";
import { ArrowRight, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Stethoscope, Truck, RefreshCw } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import { stacks } from "@/data/stacks";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { CADENCE_DISCOUNTS, pricing, billingNote, type CadenceKey } from "@/data/pricing";
import { FONT } from "@/lib/typography";
import { PrescribedPromise } from "@/components/PrescribedPromise";
import { PayToday } from "@/components/PayToday";
import { RoadStrip } from "@/components/RoadStrip";
import { RETEST_WEEK } from "@/data/monitoring";
import { LAB_KIT } from "@/data/labs";
import { SkuPhoto, skuPhotoFor } from "@/components/SkuPhoto";

export default function Cart() {
  // Cart is a private transactional page — noindex (centralized in useSeo) to
  // keep crawl budget on content pages. A breadcrumb gives the trail navigational
  // context even though the page itself stays out of the index.
  useSeo({
    title: "Your cart",
    description: "Review your selection before the health questions and the physician's decision.",
    path: "/cart",
    noindex: true,
    jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cart", path: "/cart" }])],
  });
  const { lines, subtotal, itemCount, updateQty, updateCadence, removeItem, dueToday } = useCart();

  return (
    <SiteLayout variant="gate">
      <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
        {/* trimmed top padding — the nav offset + section padding stacked
            ~210px of empty porcelain above "Review your cart" */}
        <div className="nx-container nx-section-y" style={{ paddingTop: "1.25rem" }}>
          {/* Header */}
          <div className="mb-10">
            <p className="nx-eyebrow mb-3">Your cart</p>
            <h1
              className="text-4xl md:text-5xl"
              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "var(--nx-ls-tight)" }}
            >
              Review your cart
            </h1>
            <p
              className="mt-3 text-base max-w-xl"
              style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}
            >
              {itemCount === 0
                ? "Your cart is empty. Browse the medicines by what they treat."
                : "Review your plan, then continue to checkout. A licensed physician reviews your order before anything is dispensed."}
            </p>
          </div>

          {lines.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
              {/* Lines */}
              <Reveal>
              <section>
                <div
                  className="text-[11px] uppercase tracking-[var(--nx-ls-wide)] mb-4 pb-3"
                  style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)" }}
                >
                  Items · {itemCount}
                </div>
                <div className="mb-5"><RoadStrip current={1} testId="cart-page-road" /></div>
                <ul className="list-none p-0 space-y-4">
                  {lines.map((line) => {
                    const spec = getSpec(line.slug, line.type);
                    return (
                      <li
                        key={`${line.type}-${line.slug}`}
                        style={{
                          border: "1px solid var(--nx-border)",
                          borderRadius: "var(--nx-r-md)",
                          background: "var(--nx-ceramic)",
                          overflow: "hidden",
                        }}
                        data-testid={`cart-page-line-${line.type}-${line.slug}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-5 p-5 md:p-6">
                          {/* Vial visual */}
                          <div
                            className="hidden sm:flex flex-shrink-0 items-center justify-center"
                            style={{
                              width: 88,
                              height: 110,
                              background: "var(--nx-bg-cream)",
                              border: "1px solid var(--nx-border)",
                              borderRadius: "var(--nx-r-md)",
                              overflow: "hidden",
                            }}
                          >
                            {line.type === "peptide" && skuPhotoFor(line.slug) ? <SkuPhoto slug={line.slug} name={line.name} className="nx-sku-img nx-sku-img--card" /> : <VialGlyph label={line.type === "stack" ? "STACK" : glyphLetter(line.name)} />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div
                              className="text-[11px] uppercase tracking-[var(--nx-ls-wide)] mb-1.5"
                              style={{ fontFamily: FONT, color: line.type === "stack" ? "var(--nx-amber)" : "var(--nx-fg-graphite)" }}
                            >
                              {line.type === "stack" ? "Protocol" : line.type === "lab" ? "Blood test" : "Medicine"}
                            </div>
                            <h3
                              className="text-lg md:text-xl mb-1"
                              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "var(--nx-ls-normal)" }}
                            >
                              {line.name}
                            </h3>

                            {/* Dose + protocol */}
                            {spec ? (
                              <p className="text-[13.5px] mb-2" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.5 }}>
                                {spec.vialSpec}
                                <span style={{ color: "var(--nx-fg-muted)" }}> · {spec.vialDuration}</span>
                              </p>
                            ) : line.type === "stack" ? (
                              <StackContents slug={line.slug} />
                            ) : null}

                            <p className="text-sm" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                              <span style={{ color: "var(--nx-fg)", fontWeight: 500 }}>{line.complimentary ? "Complimentary" : formatUSD(line.unitPrice)}</span>
                              <span className="text-xs" style={{ color: "var(--nx-fg-graphite)" }}>{line.oneTime ? (line.complimentary ? " with your medication order" : " · one time") : " / month supply"}</span>
                            </p>
                            {!line.oneTime && (
                              <p className="text-[11px] mt-0.5" style={{ fontFamily: FONT, color: "var(--nx-fg-muted)" }}>
                                {billingNote(line.cadence, line.unitPrice)}
                              </p>
                            )}

                            {/* Chips — the physician's review is a fact of the plan.
                                The old "Save $X" chip was a you-save badge (law 3);
                                the term difference is stated on the cadence control
                                below as a plain per-month fact instead. */}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Chip icon={<Stethoscope size={11} aria-hidden="true" />}>Physician's review included</Chip>
                            </div>

                            {/* Cadence picker (medicines only) */}
                            {!line.oneTime && <div className="mt-4">
                              <div
                                className="text-[11px] uppercase tracking-[var(--nx-ls-wide)] mb-1.5"
                                style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}
                              >
                                Billing cadence
                              </div>
                              <div
                                className="flex w-full max-w-[360px]"
                                style={{ border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-pill)", overflow: "hidden" }}
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
                                      className="flex-1 inline-flex items-center justify-center px-2 text-[11px] uppercase tracking-[var(--nx-ls-caps)] transition-colors"
                                      style={{
                                        fontFamily: FONT,
                                        minHeight: 44,
                                        background: active ? "var(--nx-fg)" : "transparent",
                                        color: active ? "var(--nx-bg)" : "var(--nx-fg)",
                                        borderRight: c === "12mo" ? "none" : "1px solid var(--nx-border)",
                                      }}
                                      data-testid={`button-cadence-page-${c}-${line.type}-${line.slug}`}
                                    >
                                      <span>{meta.label}</span>
                                      {meta.savePct > 0 ? (
                                        <span
                                          className="ml-1.5 text-[11px]"
                                          style={{ color: active ? "var(--nx-bg)" : "var(--nx-fg-muted)", opacity: active ? 0.85 : 1 }}
                                        >
                                          {meta.savePct}% less
                                        </span>
                                      ) : null}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>}
                          </div>

                          {/* Price + qty + remove: inline row under the content on
                              mobile, right-aligned column beside it on sm+ — the
                              side-by-side squeeze is what clipped the cadence
                              control and shrank every tap target at 390px. */}
                          <div className="flex-shrink-0 flex items-center justify-between gap-4 sm:block sm:text-right">
                            <div
                              className="text-xl sm:mb-3"
                              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}
                              data-testid={`text-line-total-${line.type}-${line.slug}`}
                            >
                              {formatUSD(line.lineTotal)}
                            </div>
                            <div className="flex items-center gap-3 sm:block">
                            {/* Qty */}
                            <div
                              className="inline-flex items-center"
                              style={{ border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-pill)", overflow: "hidden" }}
                            >
                              <button
                                onClick={() => updateQty(line.slug, line.type, line.qty - 1)}
                                disabled={line.qty <= 1}
                                className="inline-flex items-center justify-center px-3 hover:bg-black/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                aria-label="Decrease quantity"
                                title={line.qty <= 1 ? "Use Remove to delete this item" : undefined}
                                data-testid={`button-qty-decrease-page-${line.type}-${line.slug}`}
                                style={{ color: "var(--nx-fg)", minHeight: 44, minWidth: 40 }}
                              >
                                <Minus size={13} />
                              </button>
                              <span
                                className="px-3 text-sm min-w-[28px] text-center"
                                style={{ fontFamily: FONT }}
                                data-testid={`text-qty-page-${line.type}-${line.slug}`}
                              >
                                {line.qty}
                              </span>
                              <button
                                onClick={() => updateQty(line.slug, line.type, line.qty + 1)}
                                className="inline-flex items-center justify-center px-3 hover:bg-black/5 transition-colors"
                                aria-label="Increase quantity"
                                data-testid={`button-qty-increase-page-${line.type}-${line.slug}`}
                                style={{ color: "var(--nx-fg)", minHeight: 44, minWidth: 40 }}
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <div className="sm:mt-1">
                              <button
                                onClick={() => removeItem(line.slug, line.type)}
                                className="text-xs inline-flex items-center gap-1 hover:underline"
                                style={{ fontFamily: FONT, color: "var(--nx-amber)", minHeight: 44, padding: "0 4px" }}
                                data-testid={`button-remove-page-${line.type}-${line.slug}`}
                              >
                                <Trash2 size={11} aria-hidden="true" /> Remove
                              </button>
                            </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link asChild href="/stacks">
                    <a
                      className="text-sm px-5 py-2.5 inline-flex items-center gap-1.5 hover:bg-black/5 transition-colors"
                      style={{ fontFamily: FONT, color: "var(--nx-fg)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-pill)" }}
                      data-testid="link-continue-stacks"
                    >
                      See the protocols
                    </a>
                  </Link>
                  <Link asChild href="/peptides">
                    <a
                      className="text-sm px-5 py-2.5 inline-flex items-center gap-1.5 hover:bg-black/5 transition-colors"
                      style={{ fontFamily: FONT, color: "var(--nx-fg)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-pill)" }}
                      data-testid="link-continue-peptides"
                    >
                      Add a peptide
                    </a>
                  </Link>
                </div>

                {/* Within the figure: the week-12 panel. The old "add-ons" block
                    sold a lab panel "required before your first prescription" and a
                    retired molecule; retired 2026-09-03. */}
                <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--nx-border)" }}>
                  <div className="flex items-start justify-between p-4 gap-4" style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)" }} data-testid="cart-panel-note">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-[var(--nx-ls-caps)] mb-0.5" style={{ fontFamily: FONT, color: "var(--nx-cobalt)" }}>Included in the price</p>
                      <p className="text-sm font-medium" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>{LAB_KIT.name}: {PANEL_TOTAL_MARKERS} markers at home before your first dose, included</p>
                      <p className="text-xs mt-0.5" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>Your physician sets your dose from it. The same blood test again at week {RETEST_WEEK} on plans of three months and longer. Additional tests from $19.</p>
                    </div>
                    <Link asChild href="/how-it-works">
                      <a className="text-xs px-3 py-1.5 flex-shrink-0 hover:bg-black/5 transition-colors" style={{ fontFamily: FONT, color: "var(--nx-fg)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-pill)" }} data-testid="link-cart-bloodwork">
                        Every marker
                      </a>
                    </Link>
                  </div>
                </div>
              </section>
              </Reveal>

              {/* Summary */}
              <aside
                className="lg:sticky lg:top-24 p-7"
                style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-lg)" }}
              >
                <Reveal delay={80}>
                <div
                  className="text-[11px] uppercase tracking-[var(--nx-ls-wide)] mb-4 pb-3"
                  style={{ fontFamily: FONT, color: "var(--nx-amber)", borderBottom: "1px solid var(--nx-border)" }}
                >
                  Order summary
                </div>

                <SummaryRow label="Monthly price" value={`${formatUSD(subtotal)} / mo`} />

                <div
                  className="flex items-baseline justify-between mt-5 pt-5"
                  style={{ borderTop: "1px solid var(--nx-border)" }}
                >
                  <span className="text-sm uppercase tracking-[var(--nx-ls-caps)]" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>
                    Today
                  </span>
                  <span
                    className="text-3xl"
                    style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}
                    data-testid="text-cart-page-subtotal"
                  >
                    {formatUSD(dueToday)}
                  </span>
                </div>
                <PayToday amount={formatUSD(subtotal)} dueToday={formatUSD(dueToday)} terms={lines.filter((l) => !l.oneTime).map((l) => `${l.months} ${l.months === 1 ? "month" : "months"} of ${l.name}`).join(" · ")} testid="cart-pay-today" style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                <PrescribedPromise testid="cart-promise" style={{ marginTop: "0.5rem", marginBottom: "1.25rem" }} />

                {/* Included list */}
                <div
                  className="mb-5 p-4"
                  style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)" }}
                >
                  <p className="text-[11px] uppercase tracking-[var(--nx-ls-wide)] mb-3" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                    Included in the price
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { icon: <Stethoscope size={13} aria-hidden="true" />, text: "Your physician's review" },
                      { icon: <Truck size={13} aria-hidden="true" />, text: "Cold shipping, plain packaging" },
                      { icon: <RefreshCw size={13} aria-hidden="true" />, text: "Blood kit, the week-12 blood test and dose review" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-xs" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                          <span style={{ color: "var(--nx-amber)" }}>{icon}</span>
                          {text}
                        </span>
                        <span className="text-[11px] uppercase tracking-[var(--nx-ls-caps)]" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                          Included
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link asChild href="/checkout">
                  <a
                    className="nx-cta-cobalt w-full justify-center"
                    data-testid="button-checkout-page"
                  >
                    Continue to checkout <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </Link>

                {/* Trust ticker */}
                <div className="mt-5 pt-5 space-y-2.5" style={{ borderTop: "1px solid var(--nx-border)" }}>
                  {[
                    { icon: <ShieldCheck size={13} aria-hidden="true" />, text: "Encrypted in transit" },
                    { icon: <ShieldCheck size={13} aria-hidden="true" />, text: "US-compounded · 503A pharmacy" },
                    { icon: <Stethoscope size={13} aria-hidden="true" />, text: "Licensed US physicians on every case" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-[11px]" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                      <span style={{ color: "var(--nx-amber)" }}>{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-4 pt-4 text-[11px] space-y-1.5"
                  style={{ borderTop: "1px solid var(--nx-border)", fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}
                >
                  <p>Intake screening at checkout (~3 min)</p>
                  <p>Physician sign-off upon review</p>
                  <p>Cold-chain packaging with temp indicators</p>
                </div>
                </Reveal>
              </aside>
            </div>
          )}
        </div>
      </div>
      {/* Sticky mobile checkout CTA — with an in-flow spacer so the fixed bar
          never covers the page's last content line on mobile */}
      {lines.length > 0 && <div className="lg:hidden" style={{ height: 76 }} aria-hidden />}
      {lines.length > 0 && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4"
          style={{ background: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
        >
          <Link asChild href="/checkout">
            <a
              className="nx-cta-cobalt w-full justify-center"
              data-testid="button-checkout-mobile"
            >
              Checkout · {formatUSD(dueToday)} today
            </a>
          </Link>
        </div>
      )}
    </SiteLayout>
  );
}

/* ─── Vial glyph — encodes the product as a peptide vial silhouette ─── */
function VialGlyph({ label }: { label: string }) {
  return (
    <svg width="52" height="76" viewBox="0 0 52 76" fill="none" aria-hidden="true">
      {/* cap */}
      <rect x="16" y="2" width="20" height="8" rx="2" fill="var(--nx-fg)" />
      <rect x="14" y="9" width="24" height="6" rx="2" fill="var(--nx-amber)" />
      {/* body */}
      <rect x="12" y="15" width="28" height="56" rx="6" fill="var(--nx-ceramic)" stroke="var(--nx-fg)" strokeWidth="1.5" />
      {/* fill line */}
      <rect x="14" y="40" width="24" height="29" rx="4" fill="var(--nx-bg-cream)" />
      <line x1="14" y1="40" x2="38" y2="40" stroke="var(--nx-fg)" strokeWidth="1" opacity="0.4" />
      {/* label band */}
      <rect x="12" y="46" width="28" height="16" fill="var(--nx-fg)" />
      <text
        x="26"
        y="57"
        textAnchor="middle"
        fill="var(--nx-bg)"
        // squeeze long labels into the 28px band instead of spilling past it
        textLength={label.length > 3 ? 24 : undefined}
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "0.05em" }}
      >
        {label}
      </text>
    </svg>
  );
}

function glyphLetter(name: string) {
  return name.replace(/[^A-Za-z0-9]/g, "").slice(0, 3).toUpperCase() || "RX";
}

function getSpec(slug: string, type: string) {
  if (type !== "peptide") return null;
  const p = pricing[slug];
  if (!p) return null;
  return { vialSpec: p.vialSpec, vialDuration: p.vialDuration };
}

function Chip({ children, icon, tone = "ink" }: { children: React.ReactNode; icon?: React.ReactNode; tone?: "ink" | "amber" }) {
  const isAmber = tone === "amber";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-[var(--nx-ls-caps)]"
      style={{
        fontFamily: FONT,
        borderRadius: "var(--nx-r-pill)",
        border: `1px solid ${isAmber ? "color-mix(in srgb, var(--nx-cobalt) 30%, var(--nx-border))" : "var(--nx-border)"}`,
        background: isAmber ? "var(--nx-bg-cream)" : "var(--nx-ceramic)",
        color: isAmber ? "var(--nx-amber)" : "var(--nx-fg)",
      }}
    >
      {icon ? <span style={{ color: isAmber ? "var(--nx-amber)" : "var(--nx-amber)" }}>{icon}</span> : null}
      {children}
    </span>
  );
}

function StackContents({ slug }: { slug: string }) {
  const stack = stacks.find((s) => s.slug === slug);
  if (!stack) return null;
  return (
    <p className="text-xs mb-2" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", letterSpacing: "0.05em" }}>
      INCLUDES · {stack.peptides.map((p) => p.toUpperCase()).join(" + ")}
    </p>
  );
}

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-1.5">
      <span className="text-sm" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
        {label}
      </span>
      <span className="text-sm" style={{ fontFamily: FONT, color: accent ? "var(--nx-amber)" : "var(--nx-fg)" }}>
        {value}
      </span>
    </div>
  );
}

function EmptyCart() {
  return (
    <div
      className="py-20 text-center max-w-md mx-auto"
      style={{ border: "1px solid var(--nx-border)", background: "var(--nx-ceramic)", borderRadius: "var(--nx-r-lg)" }}
    >
      <div className="inline-flex p-5 rounded-full mb-5" style={{ background: "var(--nx-bg-cream)", color: "var(--nx-amber)" }}>
        <ShoppingBag size={32} strokeWidth={1.25} aria-hidden="true" />
      </div>
      <h2 className="text-2xl mb-3" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}>
        Your cart is empty
      </h2>
      <p className="text-sm mb-6 px-6" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
        Every medicine shows what it treats and what it costs, grouped by goal.
      </p>
      <div className="flex flex-col gap-2 max-w-[240px] mx-auto">
        <Link asChild href="/peptides">
          <a
            className="block w-full px-5 py-3 transition-all text-center"
            style={{ background: "var(--nx-fg)", color: "var(--nx-bg)", fontFamily: FONT, fontSize: "var(--nx-t-sm)", fontWeight: 500, borderRadius: "var(--nx-r-md)" }}
            data-testid="link-empty-browse-peptides"
          >
            Browse medicines
          </a>
        </Link>
        <Link asChild href="/stacks">
          <a
            className="block w-full px-5 py-3 transition-colors hover:bg-black/5 text-center"
            style={{ color: "var(--nx-fg)", fontFamily: FONT, fontSize: "var(--nx-t-sm)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)" }}
            data-testid="link-empty-browse-stacks"
          >
            See protocols
          </a>
        </Link>
      </div>
    </div>
  );
}
