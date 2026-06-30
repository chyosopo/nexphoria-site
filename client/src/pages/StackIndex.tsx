import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { stacks, computeStackPrice } from "@/data/stacks";
import { pricing, formatUSD } from "@/data/pricing";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getStackImage } from "@/lib/stackImages";

/* Stack catalog — pharmacy tier 2: doctor-curated combinations */

export default function StackIndex() {
  return (
    <SiteLayout variant="gate">
      <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
        {/* Hero */}
        <section className="nx-container py-14 md:py-20 max-w-4xl">
          <div
            className="text-[11px] uppercase tracking-[0.22em] mb-3"
            style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
          >
            Tier 02 · Doctor-Curated Stacks
          </div>
          <h1
            className="text-4xl md:text-6xl mb-5 leading-[1.05]"
            style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
          >
            Pre-built protocols, <em style={{ fontStyle: "italic" }}>physician-formulated</em>.
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.6 }}
          >
            Six flagship stacks designed by our medical directors — each tested against published clinical
            literature and our internal outcomes data. Add full stacks to cart or customize before checkout.
          </p>
        </section>

        {/* Grid */}
        <section className="nx-container pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {stacks.map((stack) => {
              const { sum, bundle, savings } = computeStackPrice(stack, pricing);
              return (
                <Link key={stack.slug} href={`/stacks/${stack.slug}`}>
                  <a
                    className="block group transition-all hover:shadow-lg"
                    style={{
                      background: "#fff",
                      border: "1px solid var(--nx-border)",
                      textDecoration: "none",
                    }}
                    data-testid={`card-stack-${stack.slug}`}
                  >
                    {/* Image */}
                    <div
                      className="aspect-[16/10] w-full overflow-hidden relative"
                      style={{ background: "var(--nx-bg-cream)" }}
                    >
                      <img
                        src={getStackImage(stack.image)}
                        alt={`${stack.name} stack`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      {stack.badge ? (
                        <span
                          className="absolute top-4 left-4 px-2 py-1 text-[9px] uppercase tracking-[0.2em]"
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

                    {/* Body */}
                    <div className="p-6 md:p-7">
                      <div
                        className="text-[10px] uppercase tracking-[0.2em] mb-2"
                        style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
                      >
                        {stack.peptides.length} peptides · {stack.gender === "him" ? "For Him" : stack.gender === "her" ? "For Her" : "Unisex"}
                      </div>
                      <h2
                        className="text-3xl mb-1.5"
                        style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
                      >
                        {stack.name}
                      </h2>
                      <p
                        className="text-base mb-4"
                        style={{ fontFamily: "'Fraunces', serif", color: "#4A4A4A", fontStyle: "italic" }}
                      >
                        {stack.tagline}
                      </p>
                      <p
                        className="text-sm mb-5"
                        style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.6 }}
                      >
                        {stack.purpose}
                      </p>

                      {/* Peptides chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {stack.peptides.map((p) => (
                          <span
                            key={p}
                            className="text-[10px] uppercase tracking-[0.12em] px-2 py-1"
                            style={{
                              background: "var(--nx-bg-cream)",
                              color: "#0A0A0A",
                              fontFamily: "'DM Mono', monospace",
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* Price + action */}
                      <div
                        className="flex items-end justify-between pt-5"
                        style={{ borderTop: "1px solid var(--nx-border)" }}
                      >
                        <div>
                          <div
                            className="text-[10px] uppercase tracking-[0.18em] mb-0.5"
                            style={{ fontFamily: "'DM Mono', monospace", color: "#6B6B6B" }}
                          >
                            Monthly · stack price
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span
                              className="text-2xl"
                              style={{
                                fontFamily: "'Fraunces', serif",
                                color: "#0A0A0A",
                                fontWeight: 500,
                              }}
                            >
                              {formatUSD(bundle)}
                            </span>
                            <span
                              className="text-sm line-through"
                              style={{ fontFamily: "'DM Mono', monospace", color: "#9A9A95" }}
                            >
                              {formatUSD(sum)}
                            </span>
                          </div>
                          <div
                            className="text-[10px] uppercase tracking-[0.12em] mt-0.5"
                            style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
                          >
                            Save {formatUSD(savings)}
                          </div>
                        </div>
                        <div onClick={(e) => e.preventDefault()}>
                          <AddToCartButton slug={stack.slug} type="stack" variant="compact" label="Add stack" />
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>

          {/* Footer CTA — alternative tier 3 */}
          <div
            className="mt-16 p-8 md:p-12 text-center max-w-3xl mx-auto"
            style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)" }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.22em] mb-2"
              style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
            >
              Tier 03
            </div>
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
            >
              Want a <em style={{ fontStyle: "italic" }}>fully custom</em> protocol?
            </h2>
            <p
              className="text-base mb-5 max-w-xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.6 }}
            >
              Take the 5-minute intake. Our physicians design a peptide protocol around your bloodwork, goals, and
              medical history — no off-the-shelf bundle required.
            </p>
            <Link href="/assessment">
              <a
                className="inline-block px-7 py-3.5"
                style={{
                  background: "#0A0A0A",
                  color: "#FAF7F0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
                data-testid="link-custom-protocol"
              >
                Take the intake →
              </a>
            </Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
