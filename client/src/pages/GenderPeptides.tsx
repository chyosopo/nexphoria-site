/**
 * Gender-scoped peptide catalog pages.
 * /women/peptides and /men/peptides
 * Accepts `gender` prop, filters and labels accordingly.
 */
import { useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { peptides, CATEGORY_LABELS, PeptideCategory } from "@/data/peptides";
import { getPrice, formatUSD } from "@/data/pricing";
import { AddToCartButton } from "@/components/AddToCartButton";
import { useSeo } from "@/lib/seo";

type PriceRange = "all" | "under-200" | "200-300" | "over-300";

// Gender affinity map — which categories are relevant per gender
const womenCategories: PeptideCategory[] = ["skin", "recovery", "metabolic", "longevity", "cognition", "sleep"];
const menCategories: PeptideCategory[] = ["growth", "recovery", "metabolic", "longevity", "cognition", "sleep"];

interface GenderPeptidesProps {
  gender: "women" | "men";
}

export default function GenderPeptides({ gender }: GenderPeptidesProps) {
  useSeo({
    title: "Peptide Catalog | Nexphoria",
    description: "Browse our complete catalog of compounded peptides. Each protocol is physician-reviewed and lab-driven.",
    path: `/${gender}/peptides`,
  });
  const relevantCategories = gender === "women" ? womenCategories : menCategories;
  const filteredPeptides = peptides.filter((p) => relevantCategories.includes(p.category));

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<PeptideCategory | "all">("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");

  const displayed = filteredPeptides.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    if (!matchesSearch || !matchesCat) return false;
    if (priceRange === "all") return true;
    const price = getPrice(p.slug)?.monthlyPrice;
    if (price == null) return false;
    if (priceRange === "under-200") return price < 200;
    if (priceRange === "200-300") return price >= 200 && price < 300;
    if (priceRange === "over-300") return price >= 300;
    return true;
  });

  const usedCategories = [...new Set(filteredPeptides.map((p) => p.category))];

  const detailBase = `/${gender}/peptides`;
  const navVariant = gender;
  const eyebrow = gender === "women" ? "NEXPHORIA · FOR WOMEN" : "NEXPHORIA · FOR MEN";
  const heading = gender === "women" ? "Peptides for women." : "Peptides for men.";
  const sub =
    gender === "women"
      ? "Compounded protocols tuned to the female endocrine system. Prescribed by US physicians."
      : "Compounded protocols tuned to the male endocrine system. Prescribed by US physicians.";

  return (
    <SiteLayout navVariant={navVariant} footerVariant={gender}>
      {/* Page header */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid={`${gender}-peptides-header`}
      >
        <div className="nx-container">
          <Reveal>
            <p className="nx-eyebrow mb-4">{eyebrow}</p>
            <h1 className="nx-heading mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{heading}</h1>
            <p className="nx-body" style={{ maxWidth: "520px" }}>{sub}</p>
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-14 z-40 bg-white border-b" style={{ borderColor: "var(--nx-border)" }}>
        <div className="nx-container py-3 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--nx-fg-muted)" }} />
            <input
              type="text"
              placeholder="Search compounds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-sm rounded-full border focus:outline-none focus:border-blue-500 transition-colors"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                borderColor: "var(--nx-border)",
                fontSize: "13px",
              }}
              data-testid="peptide-search-input"
            />
          </div>
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            <CategoryPill
              label="All"
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {usedCategories.map((cat) => (
              <CategoryPill
                key={cat}
                label={CATEGORY_LABELS[cat]}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>
        {/* Price range row */}
        <div
          className="nx-container py-2 flex items-center gap-2 flex-wrap"
          style={{ borderTop: "1px solid var(--nx-border)" }}
        >
          <span
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
              marginRight: 4,
            }}
          >
            Price
          </span>
          <CategoryPill label="All" active={priceRange === "all"} onClick={() => setPriceRange("all")} />
          <CategoryPill label="Under $200" active={priceRange === "under-200"} onClick={() => setPriceRange("under-200")} />
          <CategoryPill label="$200–$300" active={priceRange === "200-300"} onClick={() => setPriceRange("200-300")} />
          <CategoryPill label="Over $300" active={priceRange === "over-300"} onClick={() => setPriceRange("over-300")} />
          <span
            className="ml-auto"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
            data-testid="text-peptide-count"
          >
            {displayed.length} of {filteredPeptides.length} peptides
          </span>
        </div>
      </section>

      {/* Peptide grid */}
      <section className="nx-section" data-testid={`${gender}-peptides-grid`}>
        <div className="nx-container">
          {displayed.length === 0 ? (
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "var(--nx-fg-graphite)", fontSize: "15px" }}>
              No compounds match your filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map((p, i) => {
                const price = getPrice(p.slug);
                return (
                <Reveal key={p.slug} delay={i * 40}>
                  <div
                    className="flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md"
                    style={{ border: "1px solid var(--nx-border)", backgroundColor: "#FFFFFF" }}
                    data-testid={`peptide-card-${p.slug}`}
                  >
                  <Link
                    href={`${detailBase}/${p.slug}`}
                    className="block no-underline group flex-1"
                  >
                    <div
                      className="p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "4px" }}>
                            {CATEGORY_LABELS[p.category]}
                          </p>
                          <h2 style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--nx-fg)", lineHeight: 1.2 }}>
                            {p.name}
                          </h2>
                          {price?.badge && (
                            <span style={{ display: "inline-block", marginTop: 6, fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B5A2B" }}>
                              {price.badge}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: "18px", color: "var(--nx-cobalt)", fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 300, lineHeight: 1 }}>→</span>
                      </div>
                      <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13px", color: "var(--nx-fg-graphite)", lineHeight: 1.6, marginBottom: "1rem" }}>
                        {p.tagline}
                      </p>
                      <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13px", color: "var(--nx-fg-graphite)", lineHeight: 1.5, marginBottom: "1rem" }}>
                        {p.summary.slice(0, 120)}…
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <MetaChip label="Half-life" value={p.halfLife} />
                        <MetaChip label="Cycle" value={p.cycleLength} />
                      </div>
                    </div>
                  </Link>
                  {price && (
                    <div
                      className="flex items-center justify-between px-6 py-4"
                      style={{ borderTop: "1px solid var(--nx-border)" }}
                    >
                      <div
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "1.25rem",
                          fontWeight: 500,
                          color: "var(--nx-fg)",
                        }}
                        data-testid={`card-price-${p.slug}`}
                      >
                        {formatUSD(price.monthlyPrice)}
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--nx-fg-muted)",
                            marginLeft: 4,
                          }}
                        >
                          / mo
                        </span>
                      </div>
                      <AddToCartButton slug={p.slug} type="peptide" variant="compact" label="Add" />
                    </div>
                  )}
                  </div>
                </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <FinalCTAStrip gender={gender} />
    </SiteLayout>
  );
}

function CategoryPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs transition-all"
      style={{
        fontFamily: "'General Sans', system-ui, sans-serif",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        backgroundColor: active ? "var(--nx-cobalt)" : "transparent",
        color: active ? "#FFFFFF" : "var(--nx-fg-graphite)",
        border: `1px solid ${active ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
        cursor: "pointer",
      }}
      data-testid={`filter-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {label}
    </button>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col" style={{ minWidth: "70px" }}>
      <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>{label}</p>
      <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--nx-fg)" }}>{value}</p>
    </div>
  );
}
