import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getStack, computeStackPrice } from "@/data/stacks";
import { pricing, formatUSD, getPrice } from "@/data/pricing";
import { AddToCartButton } from "@/components/AddToCartButton";
import { CadenceSelector } from "@/components/CadenceSelector";
import { getStackImage } from "@/lib/stackImages";

/* Stack detail page — full clinical case + add-to-cart + customize */

interface StackDetailProps {
  slug: string;
}

export default function StackDetail({ slug }: StackDetailProps) {
  const stack = getStack(slug);

  if (!stack) {
    return (
      <SiteLayout variant="gate">
        <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 120 }}>
          <div className="nx-container py-20 text-center">
            <h1
              className="text-4xl mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
            >
              Stack not found
            </h1>
            <Link href="/stacks">
              <a
                className="inline-block px-6 py-3 text-sm"
                style={{
                  background: "#0A0A0A",
                  color: "#FAF7F0",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
                data-testid="link-back-to-stacks"
              >
                Browse all stacks
              </a>
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const { sum, bundle, savings } = computeStackPrice(stack, pricing);
  const audienceLabel =
    stack.gender === "him" ? "For Him" : stack.gender === "her" ? "For Her" : "Unisex";

  return (
    <SiteLayout variant="gate">
      <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
        {/* Back nav */}
        <div className="nx-container pt-6 pb-2">
          <Link href="/stacks">
            <a
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em]"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#6B6B6B",
              }}
              data-testid="link-back-stack-index"
            >
              <ArrowLeft size={12} strokeWidth={2} /> All stacks
            </a>
          </Link>
        </div>

        {/* Hero — image + summary */}
        <section className="nx-container pt-8 pb-14 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start">
            {/* Image */}
            <div
              className="aspect-[5/6] w-full overflow-hidden relative"
              style={{ background: "var(--nx-bg-cream)" }}
            >
              <img
                src={getStackImage(stack.image)}
                alt={`${stack.name} stack`}
                className="w-full h-full object-cover"
                data-testid={`img-stack-${stack.slug}`}
              />
              {stack.badge ? (
                <span
                  className="absolute top-5 left-5 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em]"
                  style={{
                    background: "#0A0A0A",
                    color: "#FAF7F0",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {stack.badge}
                </span>
              ) : null}
            </div>

            {/* Summary */}
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.22em] mb-4"
                style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
              >
                Doctor-Curated Stack · {audienceLabel}
              </div>
              <h1
                className="text-5xl md:text-6xl mb-3 leading-[1.04]"
                style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
                data-testid={`text-stack-name-${stack.slug}`}
              >
                {stack.name}
              </h1>
              <p
                className="text-xl md:text-2xl mb-7"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: "#4A4A4A",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                {stack.tagline}
              </p>
              <p
                className="text-base mb-8"
                style={{ fontFamily: "'Inter', sans-serif", color: "#28251D", lineHeight: 1.65 }}
              >
                {stack.description}
              </p>

              {/* Meta rows */}
              <dl className="space-y-3 mb-8" style={{ borderTop: "1px solid var(--nx-border)", paddingTop: 16 }}>
                <MetaRow label="Curated by" value={stack.curator} />
                <MetaRow label="Duration" value={stack.duration} />
                <MetaRow label="Best for" value={stack.bestFor} />
              </dl>

              {/* Price block */}
              <div
                className="p-5 md:p-6 mb-6"
                style={{
                  background: "#fff",
                  border: "1px solid var(--nx-border)",
                }}
              >
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-[0.2em] mb-1"
                      style={{ fontFamily: "'DM Mono', monospace", color: "#6B6B6B" }}
                    >
                      Monthly · full stack
                    </div>
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className="text-4xl"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          color: "#0A0A0A",
                          fontWeight: 500,
                        }}
                        data-testid={`text-stack-price-${stack.slug}`}
                      >
                        {formatUSD(bundle)}
                      </span>
                      <span
                        className="text-base line-through"
                        style={{ fontFamily: "'DM Mono', monospace", color: "#9A9A95" }}
                      >
                        {formatUSD(sum)}
                      </span>
                    </div>
                    <div
                      className="text-[11px] uppercase tracking-[0.14em] mt-1"
                      style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
                    >
                      Bundle savings — {formatUSD(savings)} / month
                    </div>
                  </div>
                </div>
                {/* Cadence selector with built-in Add-to-Cart */}
                <div className="mb-5">
                  <CadenceSelector slug={stack.slug} type="stack" productName={stack.name} />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/peptides/${stack.peptides[0]}`}>
                    <a
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "#0A0A0A",
                        border: "1px solid var(--nx-border)",
                        fontWeight: 500,
                      }}
                      data-testid={`link-customize-stack-${stack.slug}`}
                    >
                      Customize — start with peptides
                    </a>
                  </Link>
                </div>
              </div>

              {/* Trust ribbon */}
              <div
                className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.16em]"
                style={{ fontFamily: "'DM Mono', monospace", color: "#6B6B6B" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Check size={11} strokeWidth={2.5} /> Physician-reviewed
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={11} strokeWidth={2.5} /> 503A-compounded
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={11} strokeWidth={2.5} /> Lab-tracked outcomes
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Peptides included */}
        <section
          className="py-16 md:py-20"
          style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
        >
          <div className="nx-container">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-3"
              style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
            >
              Peptides included · {stack.peptides.length}
            </div>
            <h2
              className="text-3xl md:text-4xl mb-10 max-w-3xl leading-[1.1]"
              style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
            >
              The active compounds, <em style={{ fontStyle: "italic" }}>each individually sourced</em>.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stack.peptides.map((peptideSlug) => {
                const p = getPrice(peptideSlug);
                if (!p) return null;
                return (
                  <Link key={peptideSlug} href={`/peptides/${peptideSlug}`}>
                    <a
                      className="block p-6 transition-all hover:shadow-md"
                      style={{
                        background: "#fff",
                        border: "1px solid var(--nx-border)",
                        textDecoration: "none",
                      }}
                      data-testid={`card-peptide-${peptideSlug}`}
                    >
                      <div
                        className="text-[10px] uppercase tracking-[0.2em] mb-2"
                        style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
                      >
                        {p.badge || "Active compound"}
                      </div>
                      <h3
                        className="text-xl mb-2"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          color: "#0A0A0A",
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {p.slug.toUpperCase().replace(/-/g, "-")}
                      </h3>
                      <div
                        className="text-xs mb-3"
                        style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.5 }}
                      >
                        {p.vialSpec}
                      </div>
                      <div className="flex items-end justify-between pt-3" style={{ borderTop: "1px solid var(--nx-border)" }}>
                        <div
                          className="text-lg"
                          style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
                        >
                          {formatUSD(p.monthlyPrice)}
                          <span
                            className="text-[10px] ml-1 uppercase tracking-[0.12em]"
                            style={{ fontFamily: "'DM Mono', monospace", color: "#6B6B6B" }}
                          >
                            / mo
                          </span>
                        </div>
                        <span
                          className="text-[10px] uppercase tracking-[0.16em] inline-flex items-center gap-1"
                          style={{ fontFamily: "'DM Mono', monospace", color: "#0A0A0A" }}
                        >
                          Details <ArrowRight size={10} strokeWidth={2.5} />
                        </span>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lab markers tracked */}
        <section className="py-16 md:py-20">
          <div className="nx-container max-w-5xl">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-3"
              style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
            >
              Bloodwork tracked
            </div>
            <h2
              className="text-3xl md:text-4xl mb-10 leading-[1.1]"
              style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
            >
              The biomarkers <em style={{ fontStyle: "italic" }}>that confirm the protocol is working</em>.
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--nx-border)" }}>
              {stack.labMarkers.map((marker) => (
                <div
                  key={marker}
                  className="p-5 md:p-6"
                  style={{ background: "var(--nx-bg)" }}
                  data-testid={`marker-${marker.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.18em] mb-1.5"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#6B6B6B" }}
                  >
                    Marker
                  </div>
                  <div
                    className="text-base"
                    style={{ fontFamily: "'Inter', sans-serif", color: "#0A0A0A", fontWeight: 500 }}
                  >
                    {marker}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="mt-8 text-sm max-w-2xl"
              style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.65 }}
            >
              Bloodwork is drawn at baseline and at intervals throughout the protocol. Results return to
              your physician, who adjusts the stack based on what your body is doing — not what the
              average patient does.
            </p>
          </div>
        </section>

        {/* Final CTA bar */}
        <section
          className="py-14 md:py-16"
          style={{ background: "#0A0A0A", color: "#FAF7F0" }}
        >
          <div className="nx-container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.22em] mb-2"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
                >
                  Ready to start?
                </div>
                <h2
                  className="text-3xl md:text-4xl leading-[1.1]"
                  style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F0", fontWeight: 500 }}
                >
                  Add <em style={{ fontStyle: "italic" }}>{stack.name}</em> to cart — physician
                  consult included.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <AddToCartButton
                  slug={stack.slug}
                  type="stack"
                  variant="primary"
                  label={`Add — ${formatUSD(bundle)}`}
                />
                <Link href="/assessment">
                  <a
                    className="inline-flex items-center justify-center px-5 py-3 text-sm"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "#FAF7F0",
                      border: "1px solid rgba(250,247,240,0.3)",
                      fontWeight: 500,
                    }}
                    data-testid="link-take-assessment"
                  >
                    Or take the 5-min intake →
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-3" style={{ borderBottom: "1px solid var(--nx-border)" }}>
      <dt
        className="text-[10px] uppercase tracking-[0.2em] pt-0.5"
        style={{ fontFamily: "'DM Mono', monospace", color: "#6B6B6B" }}
      >
        {label}
      </dt>
      <dd
        className="text-sm"
        style={{ fontFamily: "'Inter', sans-serif", color: "#28251D", lineHeight: 1.55 }}
      >
        {value}
      </dd>
    </div>
  );
}
