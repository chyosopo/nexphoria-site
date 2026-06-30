import { Link } from "wouter";
import { ArrowRight, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import { stacks } from "@/data/stacks";

export default function Cart() {
  const { lines, subtotal, totalSavings, itemCount, updateQty, removeItem } = useCart();

  return (
    <SiteLayout variant="gate">
      <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
        <div className="nx-container py-12 md:py-16">
          {/* Header */}
          <div className="mb-10">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8B5A2B" }}
            >
              Your Pharmacy
            </div>
            <h1
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif", color: "#0A0A0A", fontWeight: 500 }}
            >
              <em style={{ fontStyle: "italic" }}>Review</em> your cart
            </h1>
            <p
              className="mt-3 text-base max-w-xl"
              style={{ fontFamily: "'Inter Tight', sans-serif", color: "#4A4A4A", lineHeight: 1.6 }}
            >
              {itemCount === 0
                ? "Your pharmacy is empty. Add single peptides or a curated stack to begin."
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
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#6B6B6B",
                    borderBottom: "1px solid var(--nx-border)",
                  }}
                >
                  Items · {itemCount}
                </div>
                <ul className="list-none p-0 space-y-0">
                  {lines.map((line) => (
                    <li
                      key={`${line.type}-${line.slug}`}
                      className="py-6"
                      style={{ borderBottom: "1px solid var(--nx-border)" }}
                      data-testid={`cart-page-line-${line.type}-${line.slug}`}
                    >
                      <div className="flex items-start gap-6">
                        {/* Marker */}
                        <div
                          className="hidden sm:flex w-14 h-14 flex-shrink-0 items-center justify-center"
                          style={{
                            background: line.type === "stack" ? "var(--nx-bg-cream)" : "#fff",
                            border: "1px solid var(--nx-border)",
                            color: line.type === "stack" ? "#8B5A2B" : "#0A0A0A",
                            fontFamily: "'Playfair Display', serif",
                            fontStyle: "italic",
                            fontSize: 22,
                          }}
                        >
                          {line.type === "stack" ? "S" : "P"}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div
                            className="text-[10px] uppercase tracking-[0.2em] mb-1"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              color: line.type === "stack" ? "#8B5A2B" : "#6B6B6B",
                            }}
                          >
                            {line.type === "stack" ? "Curated Stack" : "Single Peptide"}
                          </div>
                          <h3
                            className="text-lg md:text-xl mb-1"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              color: "#0A0A0A",
                              fontWeight: 500,
                            }}
                          >
                            {line.name}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ fontFamily: "'Inter Tight', sans-serif", color: "#4A4A4A" }}
                          >
                            {formatUSD(line.unitPrice)} <span className="text-xs text-[#6B6B6B]">/ month supply</span>
                          </p>
                          {line.type === "stack" && (
                            <StackContents slug={line.slug} />
                          )}
                          {line.savings && line.savings > 0 ? (
                            <div
                              className="text-xs mt-2 inline-block px-2 py-0.5"
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                color: "#8B5A2B",
                                background: "var(--nx-bg-cream)",
                                letterSpacing: "0.05em",
                              }}
                            >
                              SAVE {formatUSD(line.savings)} BUNDLED
                            </div>
                          ) : null}
                        </div>

                        <div className="text-right">
                          <div
                            className="text-xl mb-3"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              color: "#0A0A0A",
                              fontWeight: 500,
                            }}
                          >
                            {formatUSD(line.lineTotal)}
                          </div>
                          {/* Qty */}
                          <div
                            className="inline-flex items-center"
                            style={{ border: "1px solid var(--nx-border)" }}
                          >
                            <button
                              onClick={() => updateQty(line.slug, line.type, line.qty - 1)}
                              className="px-2.5 py-1.5 hover:bg-black/5 transition-colors"
                              aria-label="Decrease quantity"
                              data-testid={`button-qty-decrease-page-${line.type}-${line.slug}`}
                              style={{ color: "#0A0A0A" }}
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              className="px-3 text-sm min-w-[28px] text-center"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                              data-testid={`text-qty-page-${line.type}-${line.slug}`}
                            >
                              {line.qty}
                            </span>
                            <button
                              onClick={() => updateQty(line.slug, line.type, line.qty + 1)}
                              className="px-2.5 py-1.5 hover:bg-black/5 transition-colors"
                              aria-label="Increase quantity"
                              data-testid={`button-qty-increase-page-${line.type}-${line.slug}`}
                              style={{ color: "#0A0A0A" }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="mt-2">
                            <button
                              onClick={() => removeItem(line.slug, line.type)}
                              className="text-xs inline-flex items-center gap-1 hover:underline"
                              style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                color: "#8B5A2B",
                              }}
                              data-testid={`button-remove-page-${line.type}-${line.slug}`}
                            >
                              <Trash2 size={11} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/stacks">
                    <a
                      className="text-sm px-5 py-2.5 inline-flex items-center gap-1.5 hover:bg-black/5 transition-colors"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        color: "#0A0A0A",
                        border: "1px solid var(--nx-border)",
                      }}
                      data-testid="link-continue-stacks"
                    >
                      Browse more stacks
                    </a>
                  </Link>
                  <Link href="/women/peptides">
                    <a
                      className="text-sm px-5 py-2.5 inline-flex items-center gap-1.5 hover:bg-black/5 transition-colors"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        color: "#0A0A0A",
                        border: "1px solid var(--nx-border)",
                      }}
                      data-testid="link-continue-peptides"
                    >
                      Add single peptides
                    </a>
                  </Link>
                </div>
              </section>

              {/* Summary */}
              <aside
                className="lg:sticky lg:top-24 p-7"
                style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)" }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.2em] mb-4 pb-3"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#8B5A2B",
                    borderBottom: "1px solid var(--nx-border)",
                  }}
                >
                  Order summary
                </div>

                <SummaryRow label="Items" value={`${itemCount}`} mono />
                <SummaryRow label="Monthly supply" value={formatUSD(subtotal + totalSavings)} mono />
                {totalSavings > 0 ? (
                  <SummaryRow label="Stack savings" value={`−${formatUSD(totalSavings)}`} accent mono />
                ) : null}
                <SummaryRow label="Physician oversight" value="Included" />
                <SummaryRow label="Lab interpretation" value="Included" />
                <SummaryRow label="Cold-chain shipping" value="Included" />

                <div
                  className="flex items-baseline justify-between mt-5 pt-5"
                  style={{ borderTop: "1px solid var(--nx-border)" }}
                >
                  <span
                    className="text-sm uppercase tracking-[0.12em]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#0A0A0A" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="text-3xl"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#0A0A0A",
                      fontWeight: 500,
                    }}
                    data-testid="text-cart-page-subtotal"
                  >
                    {formatUSD(subtotal)}
                  </span>
                </div>
                <p
                  className="text-[11px] mt-2 mb-5 leading-relaxed"
                  style={{ fontFamily: "'Inter Tight', sans-serif", color: "#6B6B6B" }}
                >
                  Final pricing confirmed after intake review.
                </p>

                <Link href="/checkout">
                  <a
                    className="block w-full text-center px-6 py-3.5 transition-all"
                    style={{
                      background: "#0A0A0A",
                      color: "#FAF7F0",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      letterSpacing: "0.02em",
                    }}
                    data-testid="button-checkout-page"
                  >
                    Continue to checkout <ArrowRight size={14} className="inline ml-1" />
                  </a>
                </Link>

                <div
                  className="mt-5 pt-5 text-[11px] space-y-2"
                  style={{
                    borderTop: "1px solid var(--nx-border)",
                    fontFamily: "'Inter Tight', sans-serif",
                    color: "#6B6B6B",
                    lineHeight: 1.6,
                  }}
                >
                  <p>↳ Intake screening at checkout (~3 min)</p>
                  <p>↳ Physician sign-off in 24–48 hours</p>
                  <p>↳ Ships in cold-chain packaging</p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}

function StackContents({ slug }: { slug: string }) {
  const stack = stacks.find((s) => s.slug === slug);
  if (!stack) return null;
  return (
    <p
      className="text-xs mt-1"
      style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6B6B", letterSpacing: "0.05em" }}
    >
      INCLUDES · {stack.peptides.map((p) => p.toUpperCase()).join(" + ")}
    </p>
  );
}

function SummaryRow({
  label,
  value,
  accent,
  mono,
}: {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between py-1.5">
      <span
        className="text-sm"
        style={{ fontFamily: "'Inter Tight', sans-serif", color: "#4A4A4A" }}
      >
        {label}
      </span>
      <span
        className="text-sm"
        style={{
          fontFamily: mono ? "'JetBrains Mono', monospace" : "'Inter Tight', sans-serif",
          color: accent ? "#8B5A2B" : "#0A0A0A",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function EmptyCart() {
  return (
    <div
      className="py-20 text-center max-w-md mx-auto"
      style={{ border: "1px solid var(--nx-border)", background: "#fff" }}
    >
      <div
        className="inline-flex p-5 rounded-full mb-5"
        style={{ background: "var(--nx-bg-cream)", color: "#8B5A2B" }}
      >
        <ShoppingBag size={32} strokeWidth={1.25} />
      </div>
      <h2
        className="text-2xl mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: "#0A0A0A", fontWeight: 500 }}
      >
        Your pharmacy is empty
      </h2>
      <p
        className="text-sm mb-6 px-6"
        style={{ fontFamily: "'Inter Tight', sans-serif", color: "#6B6B6B", lineHeight: 1.6 }}
      >
        Start with a curated stack, browse single peptides, or take the assessment for a custom physician-built protocol.
      </p>
      <div className="flex flex-col gap-2 max-w-[220px] mx-auto">
        <Link href="/stacks">
          <a
            className="block w-full px-5 py-3 transition-all"
            style={{
              background: "#0A0A0A",
              color: "#FAF7F0",
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
            data-testid="link-empty-browse-stacks"
          >
            Browse curated stacks
          </a>
        </Link>
        <Link href="/women/peptides">
          <a
            className="block w-full px-5 py-3 transition-colors hover:bg-black/5"
            style={{
              color: "#0A0A0A",
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "0.875rem",
              border: "1px solid var(--nx-border)",
            }}
            data-testid="link-empty-browse-peptides"
          >
            Single peptides
          </a>
        </Link>
      </div>
    </div>
  );
}
