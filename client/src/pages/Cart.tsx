import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Stethoscope, Truck, RefreshCw } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo } from "@/lib/seo";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import { stacks } from "@/data/stacks";
import { CADENCE_DISCOUNTS, pricing, type CadenceKey } from "@/data/pricing";
import { FONT } from "@/lib/typography";

export default function Cart() {
  useSeo({ title: "Your cart — Nexphoria", description: "Review your selected protocols before physician intake." });
  const { lines, subtotal, totalSavings, itemCount, updateQty, updateCadence, removeItem } = useCart();

  // Cart is a private transactional page — noindex to keep crawl budget on content pages
  useEffect(() => {
    document.title = "Your Cart | Nexphoria";
    let metaRobots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex, nofollow");
    return () => {
      metaRobots?.setAttribute("content", "index, follow, max-image-preview:large");
    };
  }, []);

  return (
    <SiteLayout variant="gate">
      <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
        <div className="nx-container py-12 md:py-16">
          {/* Header */}
          <div className="mb-10">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-3"
              style={{ fontFamily: FONT, color: "var(--nx-amber)" }}
            >
              Your Pharmacy
            </div>
            <h1
              className="text-4xl md:text-5xl"
              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Review your cart
            </h1>
            <p
              className="mt-3 text-base max-w-xl"
              style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}
            >
              {itemCount === 0
                ? "Your protocol is empty. Add single peptides or a curated stack to begin."
                : "Confirm your selections, then continue to checkout for physician review and shipping."}
            </p>
          </div>

          {lines.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
              {/* Lines */}
              <section>
                <div
                  className="text-[10px] uppercase tracking-[0.2em] mb-4 pb-3"
                  style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)" }}
                >
                  Items · {itemCount}
                </div>
                <ul className="list-none p-0 space-y-4">
                  {lines.map((line) => {
                    const spec = getSpec(line.slug, line.type);
                    return (
                      <li
                        key={`${line.type}-${line.slug}`}
                        style={{
                          border: "1px solid var(--nx-border)",
                          borderRadius: 16,
                          background: "var(--nx-ceramic)",
                          overflow: "hidden",
                        }}
                        data-testid={`cart-page-line-${line.type}-${line.slug}`}
                      >
                        <div className="flex items-start gap-5 p-5 md:p-6">
                          {/* Vial visual */}
                          <div
                            className="hidden sm:flex flex-shrink-0 items-center justify-center"
                            style={{
                              width: 88,
                              height: 110,
                              background: "var(--nx-bg-cream)",
                              border: "1px solid var(--nx-border)",
                              borderRadius: 12,
                            }}
                          >
                            <VialGlyph label={line.type === "stack" ? "STACK" : glyphLetter(line.name)} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div
                              className="text-[10px] uppercase tracking-[0.2em] mb-1.5"
                              style={{ fontFamily: FONT, color: line.type === "stack" ? "var(--nx-amber)" : "var(--nx-fg-graphite)" }}
                            >
                              {line.type === "stack" ? "Curated Stack" : "Single Peptide"}
                            </div>
                            <h3
                              className="text-lg md:text-xl mb-1"
                              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "-0.01em" }}
                            >
                              {line.name}
                            </h3>

                            {/* Dose + protocol */}
                            {spec ? (
                              <p className="text-[13px] mb-2" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.5 }}>
                                {spec.vialSpec}
                                <span style={{ color: "var(--nx-fg-muted)" }}> · {spec.vialDuration}</span>
                              </p>
                            ) : line.type === "stack" ? (
                              <StackContents slug={line.slug} />
                            ) : null}

                            <p className="text-sm" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                              <span style={{ color: "var(--nx-fg)", fontWeight: 500 }}>{formatUSD(line.unitPrice)}</span>
                              <span className="text-xs" style={{ color: "var(--nx-fg-graphite)" }}> / month supply</span>
                            </p>

                            {/* Chips */}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Chip icon={<Stethoscope size={11} />}>Physician review included</Chip>
                              {line.savings && line.savings > 0 ? (
                                <Chip tone="amber">
                                  Save {formatUSD(line.savings)} · {line.cadenceLabel}
                                </Chip>
                              ) : null}
                            </div>

                            {/* Cadence picker */}
                            <div className="mt-4">
                              <div
                                className="text-[9px] uppercase tracking-[0.2em] mb-1.5"
                                style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}
                              >
                                Billing cadence
                              </div>
                              <div
                                className="inline-flex"
                                style={{ border: "1px solid var(--nx-border)", borderRadius: 999, overflow: "hidden" }}
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
                                      className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-colors"
                                      style={{
                                        fontFamily: FONT,
                                        background: active ? "var(--nx-fg)" : "transparent",
                                        color: active ? "var(--nx-bg)" : "var(--nx-fg)",
                                        borderRight: c === "12mo" ? "none" : "1px solid var(--nx-border)",
                                      }}
                                      data-testid={`button-cadence-page-${c}-${line.type}-${line.slug}`}
                                    >
                                      <span>{meta.label}</span>
                                      {meta.savePct > 0 ? (
                                        <span
                                          className="ml-1.5 text-[9px]"
                                          style={{ color: active ? "var(--nx-bg)" : "var(--nx-amber)", opacity: active ? 0.85 : 1 }}
                                        >
                                          −{meta.savePct}%
                                        </span>
                                      ) : null}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div
                              className="text-xl mb-3"
                              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}
                              data-testid={`text-line-total-${line.type}-${line.slug}`}
                            >
                              {formatUSD(line.lineTotal)}
                            </div>
                            {/* Qty */}
                            <div
                              className="inline-flex items-center"
                              style={{ border: "1px solid var(--nx-border)", borderRadius: 999, overflow: "hidden" }}
                            >
                              <button
                                onClick={() => updateQty(line.slug, line.type, line.qty - 1)}
                                className="px-2.5 py-1.5 hover:bg-black/5 transition-colors"
                                aria-label="Decrease quantity"
                                data-testid={`button-qty-decrease-page-${line.type}-${line.slug}`}
                                style={{ color: "var(--nx-fg)" }}
                              >
                                <Minus size={12} />
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
                                className="px-2.5 py-1.5 hover:bg-black/5 transition-colors"
                                aria-label="Increase quantity"
                                data-testid={`button-qty-increase-page-${line.type}-${line.slug}`}
                                style={{ color: "var(--nx-fg)" }}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <div className="mt-2">
                              <button
                                onClick={() => removeItem(line.slug, line.type)}
                                className="text-xs inline-flex items-center gap-1 hover:underline"
                                style={{ fontFamily: FONT, color: "var(--nx-amber)" }}
                                data-testid={`button-remove-page-${line.type}-${line.slug}`}
                              >
                                <Trash2 size={11} /> Remove
                              </button>
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
                      style={{ fontFamily: FONT, color: "var(--nx-fg)", border: "1px solid var(--nx-border)", borderRadius: 999 }}
                      data-testid="link-continue-stacks"
                    >
                      Browse more stacks
                    </a>
                  </Link>
                  <Link asChild href="/peptides">
                    <a
                      className="text-sm px-5 py-2.5 inline-flex items-center gap-1.5 hover:bg-black/5 transition-colors"
                      style={{ fontFamily: FONT, color: "var(--nx-fg)", border: "1px solid var(--nx-border)", borderRadius: 999 }}
                      data-testid="link-continue-peptides"
                    >
                      Add single peptides
                    </a>
                  </Link>
                </div>

                {/* Add-on suggestions */}
                <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--nx-border)" }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                    Recommended add-ons
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between p-4 gap-4" style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: 12 }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-[0.12em] mb-0.5" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>Lab Testing Add-On</p>
                        <p className="text-sm font-medium" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>38-Biomarker Partner-Laboratory Panel</p>
                        <p className="text-xs mt-0.5" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>Required before your first prescription. Included with most protocols.</p>
                      </div>
                      <Link asChild href="/lab-testing">
                        <a className="text-xs px-3 py-1.5 flex-shrink-0 hover:bg-black/5 transition-colors" style={{ fontFamily: FONT, color: "var(--nx-fg)", border: "1px solid var(--nx-border)", borderRadius: 999, whiteSpace: "nowrap" }} data-testid="link-addon-labs">
                          See panel details
                        </a>
                      </Link>
                    </div>
                    <div className="flex items-start justify-between p-4 gap-4" style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: 12 }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-[0.12em] mb-0.5" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>Recovery Support</p>
                        <p className="text-sm font-medium" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>BPC-157 — Tissue Repair Adjunct</p>
                        <p className="text-xs mt-0.5" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>Commonly paired with performance and metabolic protocols.</p>
                      </div>
                      <Link asChild href="/stacks">
                        <a className="text-xs px-3 py-1.5 flex-shrink-0 hover:bg-black/5 transition-colors" style={{ fontFamily: FONT, color: "var(--nx-fg)", border: "1px solid var(--nx-border)", borderRadius: 999, whiteSpace: "nowrap" }} data-testid="link-addon-recovery">
                          View stack
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* Summary */}
              <aside
                className="lg:sticky lg:top-24 p-7"
                style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: 20 }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.2em] mb-4 pb-3"
                  style={{ fontFamily: FONT, color: "var(--nx-amber)", borderBottom: "1px solid var(--nx-border)" }}
                >
                  Order summary
                </div>

                <SummaryRow label="Monthly supply" value={formatUSD(subtotal + totalSavings)} />
                {totalSavings > 0 ? (
                  <SummaryRow label="You save" value={`−${formatUSD(totalSavings)}`} accent />
                ) : null}

                <div
                  className="flex items-baseline justify-between mt-5 pt-5"
                  style={{ borderTop: "1px solid var(--nx-border)" }}
                >
                  <span className="text-sm uppercase tracking-[0.12em]" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>
                    Subtotal
                  </span>
                  <span
                    className="text-3xl"
                    style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}
                    data-testid="text-cart-page-subtotal"
                  >
                    {formatUSD(subtotal)}
                  </span>
                </div>
                <p className="text-[11px] mt-2 mb-5 leading-relaxed" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                  Final pricing confirmed after intake review.
                </p>

                {/* Included list */}
                <div
                  className="mb-5 p-4"
                  style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-border)", borderRadius: 12 }}
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] mb-3" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                    Included at no extra cost
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { icon: <Stethoscope size={13} />, text: "Physician review + follow-ups" },
                      { icon: <Truck size={13} />, text: "Cold-chain overnight shipping" },
                      { icon: <RefreshCw size={13} />, text: "Quarterly lab re-evaluation" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-[12px]" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                          <span style={{ color: "var(--nx-amber)" }}>{icon}</span>
                          {text}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: FONT, color: "var(--nx-success)" }}>
                          Included
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link asChild href="/checkout">
                  <a
                    className="block w-full text-center px-6 py-3.5 transition-all"
                    style={{
                      background: "var(--nx-fg)",
                      color: "var(--nx-bg)",
                      fontFamily: FONT,
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      letterSpacing: "0.02em",
                      borderRadius: 12,
                    }}
                    data-testid="button-checkout-page"
                  >
                    Continue to checkout <ArrowRight size={14} className="inline ml-1" />
                  </a>
                </Link>

                {/* Trust ticker */}
                <div className="mt-5 pt-5 space-y-2.5" style={{ borderTop: "1px solid var(--nx-border)" }}>
                  {[
                    { icon: <ShieldCheck size={13} />, text: "HIPAA-compliant data handling" },
                    { icon: <ShieldCheck size={13} />, text: "US-compounded · 503A pharmacy" },
                    { icon: <Stethoscope size={13} />, text: "Licensed US physicians on every case" },
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
              </aside>
            </div>
          )}
        </div>
      </div>
      {/* Sticky mobile checkout CTA */}
      {lines.length > 0 && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4"
          style={{ background: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
        >
          <Link asChild href="/checkout">
            <a
              className="block w-full text-center py-3.5 font-medium"
              style={{ background: "var(--nx-fg)", color: "var(--nx-bg)", fontFamily: FONT, fontSize: "var(--nx-t-base)", letterSpacing: "0.02em", borderRadius: 12 }}
              data-testid="button-checkout-mobile"
            >
              Checkout — {formatUSD(subtotal)}
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
      <text x="26" y="57" textAnchor="middle" fill="var(--nx-bg)" style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.05em" }}>
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
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em]"
      style={{
        fontFamily: FONT,
        borderRadius: 999,
        border: `1px solid ${isAmber ? "#B3C8E2" : "var(--nx-border)"}`,
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
      style={{ border: "1px solid var(--nx-border)", background: "var(--nx-ceramic)", borderRadius: 20 }}
    >
      <div className="inline-flex p-5 rounded-full mb-5" style={{ background: "var(--nx-bg-cream)", color: "var(--nx-amber)" }}>
        <ShoppingBag size={32} strokeWidth={1.25} />
      </div>
      <h2 className="text-2xl mb-3" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}>
        Your protocol is empty
      </h2>
      <p className="text-sm mb-6 px-6" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
        Start with a curated stack, browse single peptides, or take the assessment for a custom physician-built protocol.
      </p>
      <div className="flex flex-col gap-2 max-w-[240px] mx-auto">
        <Link asChild href="/stacks">
          <a
            className="block w-full px-5 py-3 transition-all text-center"
            style={{ background: "var(--nx-fg)", color: "var(--nx-bg)", fontFamily: FONT, fontSize: "0.875rem", fontWeight: 500, borderRadius: 12 }}
            data-testid="link-empty-browse-stacks"
          >
            Browse curated stacks
          </a>
        </Link>
        <Link asChild href="/assessment">
          <a
            className="block w-full px-5 py-3 transition-colors hover:bg-black/5 text-center"
            style={{ color: "var(--nx-fg)", fontFamily: FONT, fontSize: "0.875rem", border: "1px solid var(--nx-border)", borderRadius: 12 }}
            data-testid="link-empty-take-assessment"
          >
            Take the assessment
          </a>
        </Link>
        <Link asChild href="/peptides">
          <a
            className="block w-full px-5 py-3 transition-colors hover:bg-black/5 text-center"
            style={{ color: "var(--nx-fg-graphite)", fontFamily: FONT, fontSize: "0.875rem", border: "1px solid var(--nx-border)", borderRadius: 12 }}
            data-testid="link-empty-browse-peptides"
          >
            Browse single peptides
          </a>
        </Link>
      </div>
    </div>
  );
}
