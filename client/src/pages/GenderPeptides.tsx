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
import { useSeo, webPageJsonLd } from "@/lib/seo";

type PriceRange = "all" | "under-200" | "200-300" | "over-300";

// Gender affinity map — which categories are relevant per gender
const womenCategories: PeptideCategory[] = ["skin", "recovery", "metabolic", "longevity", "cognition", "sleep"];
const menCategories: PeptideCategory[] = ["growth", "recovery", "metabolic", "longevity", "cognition", "sleep"];

interface GenderPeptidesProps {
  gender: "women" | "men";
}

export default function GenderPeptides({ gender }: GenderPeptidesProps) {
  useSeo({
    title: gender === "men"
      ? "Peptides for men — BPC-157, Ipamorelin, GLP-1, NAD+ and more"
      : "Peptides for women — GHK-Cu, Tirzepatide, Epitalon and more",
    description: gender === "men"
      ? "Physician-prescribed peptides for men: strength, fat loss, recovery, cognition. Every compound 503A compounded, batch-tested, and lab-monitored by a board-certified physician."
      : "Physician-prescribed peptides for women: skin, metabolic, longevity, hormonal balance. Every compound 503A compounded, batch-tested, and lab-monitored by a board-certified physician.",
    path: `/${gender}/peptides`,
    jsonLd: [webPageJsonLd({
      name: gender === "men" ? "Nexphoria Peptides for Men" : "Nexphoria Peptides for Women",
      description: `Physician-prescribed peptide catalog for ${gender} at Nexphoria.`,
      path: `/${gender}/peptides`,
    })],
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
      {/* Page header — gender-differentiated */}
      {gender === "men" ? <MenPeptidesHero count={filteredPeptides.length} cats={usedCategories.length} sub={sub} /> : <WomenPeptidesHero count={filteredPeptides.length} cats={usedCategories.length} sub={sub} />}

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
                          <h2 style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "18px", fontWeight: 600, color: "var(--nx-fg)", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                            {p.name}
                          </h2>
                          {price?.badge && (
                            <span style={{ display: "inline-block", marginTop: 6, fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: ((gender === "women") ? "#C93A73" : "var(--nx-amber)") }}>
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

/* ── MEN — Obsidian pharmacy grid: hard, dense, ember accent ── */
function MenPeptidesHero({ count, cats, sub }: { count: number; cats: number; sub: string }) {
  const chips = ["Growth · Recovery · Metabolic", "GLP-1 · GHS · TB-500 · NAD+", "Testosterone-safe", "Compounded 503A"];
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: ((gender === "women") ? "linear-gradient(180deg, #3C1830 0%, #111111 60%, #3E1030 100%)" : "linear-gradient(180deg, var(--nx-fg) 0%, #111111 60%, var(--nx-bg-dark) 100%)"),
        color: ((gender === "women") ? "#FAF0F5" : "var(--nx-bg)"),
        fontFamily: "'General Sans', system-ui, sans-serif",
        borderBottom: "1px solid #1F1D1A",
      }}
    >
      {/* engineering grid backdrop */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.11 }}
      >
        <defs>
          <pattern id="menGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke={(gender === "women") ? "#E8558F" : "var(--nx-accent)"} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#menGrid)" />
      </svg>
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(700px 320px at 92% 10%, rgba(102, 143, 185,0.16), transparent 65%), radial-gradient(500px 300px at 4% 100%, rgba(102, 143, 185,0.08), transparent 65%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "72px 32px 56px",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 48,
          alignItems: "end",
        }}
        className="gp-hero-grid"
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <span style={{ width: 32, height: 2, background: ((gender === "women") ? "#E8558F" : "var(--nx-accent)") }} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.28em",
                color: ((gender === "women") ? "#E8558F" : "var(--nx-accent)"),
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Nexphoria · For men
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(44px, 6vw, 76px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              fontWeight: 700,
              margin: 0,
              color: "#FFFFFF",
            }}
          >
            Built for <br />
            the <span style={{ color: ((gender === "women") ? "#E8558F" : "var(--nx-accent)") }}>male</span> engine.
          </h1>
          <p
            style={{
              fontSize: "1.02rem",
              lineHeight: 1.55,
              color: "rgba(232, 237, 241,0.68)",
              maxWidth: 560,
              margin: "22px 0 24px",
            }}
          >
            {sub} Compounded protocols for strength, recovery, sleep, cognition, and fat-loss — dosed for a male HPG axis and reviewed by MDs before every refill.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {chips.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: 11,
                  padding: "7px 12px",
                  borderRadius: 4,
                  background: "rgba(102, 143, 185,0.06)",
                  border: "1px solid rgba(102, 143, 185,0.28)",
                  color: "rgba(232, 237, 241,0.9)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        {/* Right — stat block, harder edges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0,
            border: "1px solid rgba(102, 143, 185,0.28)",
          }}
          className="gp-hero-stats"
        >
          {[
            { k: String(count).padStart(2, "0"), v: "Compounds" },
            { k: String(cats).padStart(2, "0"), v: "Categories" },
            { k: "05", v: "MDs on file" },
            { k: "503A", v: "US pharmacy" },
          ].map((s, i) => (
            <div
              key={s.v}
              style={{
                padding: "22px 20px",
                borderRight: i % 2 === 0 ? "1px solid rgba(102, 143, 185,0.20)" : "none",
                borderBottom: i < 2 ? "1px solid rgba(102, 143, 185,0.20)" : "none",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                }}
              >
                {s.k}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(232, 237, 241,0.55)",
                  marginTop: 6,
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .gp-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding: 48px 20px 40px !important; }
        }
      `}</style>
    </section>
  );
}

/* ── WOMEN — Warm apothecary: cream backdrop, editorial serif, butter/rose accent ── */
function WomenPeptidesHero({ count, cats, sub }: { count: number; cats: number; sub: string }) {
  const chips = ["Skin · Metabolic · Longevity", "Hormone-aware dosing", "MD-reviewed protocols", "Female research base"];
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: ((gender === "women") ? "linear-gradient(180deg, #F5E4EB 0%, #EDD5DF 55%, #E8C9D6 100%)" : "linear-gradient(180deg, #E4ECF5 0%, #D5E0ED 55%, #C9D7E8 100%)"),
        color: ((gender === "women") ? "#2A181F" : "#18202A"),
        fontFamily: "'General Sans', system-ui, sans-serif",
        borderBottom: ((gender === "women") ? "1px solid #D9B6C5" : "1px solid #B6C6D9"),
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(1000px 400px at 90% 18%, rgba(139, 158, 177,0.14), transparent 65%), radial-gradient(700px 400px at 8% 92%, rgba(130, 158, 186,0.18), transparent 65%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 32px 64px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 56,
          alignItems: "end",
        }}
        className="gp-hero-grid"
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <span style={{ width: 28, height: 1, background: ((gender === "women") ? "#8A3E5E" : "#3E608A") }} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.28em",
                color: ((gender === "women") ? "#8A3E5E" : "#3E608A"),
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Nexphoria · For women
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(44px, 6vw, 76px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              margin: 0,
              color: ((gender === "women") ? "#3C0B1F" : "var(--nx-bg-dark)"),
              fontFamily: "'Instrument Serif', 'General Sans', Georgia, serif",
            }}
          >
            Peptides tuned to <br />
            <span style={{ color: ((gender === "women") ? "#B2577D" : "#5778B2"), fontWeight: 500 }}>her</span> physiology.
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "rgba(28, 33, 38,0.72)",
              maxWidth: 560,
              margin: "24px 0 26px",
            }}
          >
            {sub} Skin, sleep, longevity, metabolic — dosed for the female endocrine system. Physician-reviewed, biomarker-driven, shipped monthly.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {chips.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: 12,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(81, 100, 119,0.22)",
                  color: "rgba(28, 33, 38,0.82)",
                  letterSpacing: "0.02em",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        {/* Right — soft rounded stat block */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
          className="gp-hero-stats"
        >
          {[
            { k: String(count), v: "Compounded peptides" },
            { k: String(cats), v: "Protocol categories" },
            { k: "5 MDs", v: "Reviewing every order" },
            { k: "503A", v: "US compounding pharmacy" },
          ].map((s) => (
            <div
              key={s.v}
              style={{
                padding: "22px 20px",
                borderRadius: 18,
                border: "1px solid rgba(81, 100, 119,0.18)",
                background: "rgba(249, 251, 253,0.65)",
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  color: ((gender === "women") ? "#3C0B1F" : "var(--nx-bg-dark)"),
                  letterSpacing: "-0.02em",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                }}
              >
                {s.k}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(28, 33, 38,0.55)",
                  marginTop: 6,
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
