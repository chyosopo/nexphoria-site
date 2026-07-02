import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import {
  JOURNAL_ARTICLES,
  JOURNAL_CATEGORIES,
  type JournalCategory,
} from "@/data/journal";

/* ─────────────────────────────────────────────────────────────
   Journal — Editorial index. Hims-tier editorial layout.
   Featured post hero → category filter → type-first card grid →
   newsletter CTA. General Sans throughout, no italics, no serif.
   ───────────────────────────────────────────────────────────── */

const FONT = "'General Sans', system-ui, sans-serif";

const eyebrow: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--nx-cobalt)",
};

export default function Journal() {
  useSeo({
    title: "Nexphoria Journal — peptide science, protocols, and physician notes",
    description:
      "Long-form evidence reviews, protocol explainers, and physician notes on every peptide we prescribe. The science behind BPC-157, GLP-1, NAD+, Epitalon, and more — plainly written, rigorously sourced.",
    path: "/journal",
    jsonLd: [webPageJsonLd({
      name: "Nexphoria Journal",
      description: "Physician-written peptide science: evidence reviews, protocol guides, and clinical notes.",
      path: "/journal",
      type: "MedicalWebPage",
    })],
  });

  const [activeCategory, setActiveCategory] = useState<JournalCategory | "all">("all");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return JOURNAL_ARTICLES;
    return JOURNAL_ARTICLES.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const featured = JOURNAL_ARTICLES[0];
  // Grid excludes the featured article only in the unfiltered "all" view.
  const gridArticles =
    activeCategory === "all"
      ? filteredArticles.filter((a) => a.slug !== featured.slug)
      : filteredArticles;

  const catLabel = (slug: JournalCategory) =>
    JOURNAL_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

  return (
    <SiteLayout navVariant="showcase">
      {/* ══════════════ EDITORIAL MASTHEAD ══════════════ */}
      <section
        data-testid="journal-masthead"
        style={{
          backgroundColor: "var(--nx-bg)",
          borderBottom: "1px solid var(--nx-border)",
        }}
      >
        <div className="nx-container" style={{ paddingTop: 72, paddingBottom: 40 }}>
          <p style={{ ...eyebrow, marginBottom: 20 }}>The Journal</p>
          <h1
            style={{
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--nx-fg)",
              maxWidth: 900,
            }}
          >
            <span style={{ color: "color-mix(in oklab, var(--nx-fg) 34%, transparent)" }}>
              Peptide science,
            </span>
            <br />
            plainly written.
          </h1>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--nx-fg-graphite)",
              maxWidth: 620,
              marginTop: 24,
            }}
          >
            Evidence reviews, protocol explainers, and physician notes on the molecules we
            compound. Reviewed by our medical and pharmacy directors before publication.
          </p>
        </div>
      </section>

      {/* ══════════════ FEATURED POST HERO ══════════════ */}
      <section
        data-testid="journal-featured"
        style={{ backgroundColor: "var(--nx-bg)", paddingTop: 48, paddingBottom: 56 }}
      >
        <div className="nx-container">
          <Link asChild href={`/journal/${featured.slug}`}>
            <a
              data-testid={`link-featured-${featured.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="journal-featured-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.05fr 0.95fr",
                  backgroundColor: "var(--nx-ceramic)",
                  border: "1px solid var(--nx-border)",
                  borderRadius: 20,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Benefit image */}
                <div
                  className="journal-featured-img"
                  style={{ position: "relative", minHeight: 420, overflow: "hidden" }}
                >
                  <img
                    src={featured.imageSrc}
                    alt={featured.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      padding: "7px 14px",
                      backgroundColor: "rgba(21, 24, 28,0.92)",
                      color: "var(--nx-ceramic)",
                      fontFamily: FONT,
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      borderRadius: 999,
                    }}
                  >
                    Editor's pick
                  </span>
                </div>
                {/* Editorial copy */}
                <div
                  className="journal-featured-body"
                  style={{
                    padding: "48px 48px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--nx-rust)",
                      marginBottom: 20,
                    }}
                  >
                    {catLabel(featured.category)}
                  </p>
                  <h2
                    style={{
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: "clamp(1.9rem, 3.4vw, 2.85rem)",
                      lineHeight: 1.04,
                      letterSpacing: "-0.03em",
                      color: "var(--nx-fg)",
                      marginBottom: 20,
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 17,
                      lineHeight: 1.6,
                      color: "var(--nx-fg-graphite)",
                      marginBottom: 28,
                    }}
                  >
                    {featured.dek}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--nx-fg)",
                      }}
                    >
                      {featured.author.name}
                    </span>
                    <span style={{ color: "var(--nx-border)" }}>·</span>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--nx-fg-muted)",
                      }}
                    >
                      {featured.readTime} read
                    </span>
                  </div>
                </div>
              </motion.article>
            </a>
          </Link>
        </div>
      </section>

      {/* ══════════════ CATEGORY FILTER ROW ══════════════ */}
      <section
        data-testid="journal-categories"
        style={{
          backgroundColor: "var(--nx-bg)",
          borderTop: "1px solid var(--nx-border)",
          borderBottom: "1px solid var(--nx-border)",
          position: "sticky",
          top: 64,
          zIndex: 20,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="nx-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 0",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            <CategoryChip
              label="All"
              isActive={activeCategory === "all"}
              count={JOURNAL_ARTICLES.length}
              onClick={() => setActiveCategory("all")}
              testId="chip-category-all"
            />
            {JOURNAL_CATEGORIES.map((cat) => {
              const realCount = JOURNAL_ARTICLES.filter((a) => a.category === cat.slug).length;
              if (realCount === 0) return null;
              return (
                <CategoryChip
                  key={cat.slug}
                  label={cat.label}
                  isActive={activeCategory === cat.slug}
                  count={realCount}
                  onClick={() => setActiveCategory(cat.slug)}
                  testId={`chip-category-${cat.slug}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ ARTICLE GRID (type-first cards) ══════════════ */}
      <section
        data-testid="journal-grid"
        style={{ backgroundColor: "var(--nx-bg)", paddingTop: 48, paddingBottom: 96 }}
      >
        <div className="nx-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="journal-card-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 28,
              }}
            >
              {gridArticles.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={i}
                  categoryLabel={catLabel(article.category)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div
              data-testid="journal-empty"
              style={{
                padding: "80px 0",
                textAlign: "center",
                fontFamily: FONT,
                color: "var(--nx-fg-muted)",
              }}
            >
              <p style={{ fontSize: 18, marginBottom: 8, color: "var(--nx-fg)" }}>
                No articles in this category yet.
              </p>
              <p style={{ fontSize: 14 }}>New writing publishes every other week.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ NEWSLETTER CTA ══════════════ */}
      <section
        data-testid="journal-newsletter"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div
            className="journal-newsletter-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 40,
              alignItems: "center",
              backgroundColor: "var(--nx-fg)",
              borderRadius: 20,
              padding: "48px 48px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--nx-acid)",
                  marginBottom: 18,
                }}
              >
                The Journal · Weekly
              </p>
              <h2
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--nx-ceramic)",
                  marginBottom: 16,
                }}
              >
                Get the next issue in your inbox.
              </h2>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "rgba(243, 248, 255,0.72)",
                  maxWidth: 480,
                }}
              >
                Evidence reviews, protocol explainers, and physician notes, delivered the week they
                publish. No hype, no testimonials.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href="mailto:journal@nexphoria.com?subject=Subscribe%20to%20The%20Journal"
                data-testid="button-newsletter-subscribe"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  backgroundColor: "var(--nx-acid)",
                  color: "var(--nx-fg)",
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  padding: "16px 24px",
                  borderRadius: 12,
                  textDecoration: "none",
                }}
              >
                Subscribe by email
              </a>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "rgba(243, 248, 255,0.5)",
                  textAlign: "center",
                }}
              >
                journal@nexphoria.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .journal-card-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          .journal-featured-grid { grid-template-columns: 1fr !important; }
          .journal-featured-img { min-height: 260px !important; }
          .journal-featured-body { padding: 32px !important; }
          .journal-newsletter-card {
            grid-template-columns: 1fr !important;
            padding: 32px !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </SiteLayout>
  );
}

/* ─────────────────────────────────────────────────────────────
   CategoryChip
   ───────────────────────────────────────────────────────────── */

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  count: number;
  onClick: () => void;
  testId: string;
}

function CategoryChip({ label, isActive, count, onClick, testId }: CategoryChipProps) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      aria-pressed={isActive}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 16px",
        borderRadius: 999,
        border: `1px solid ${isActive ? "var(--nx-fg)" : "var(--nx-border)"}`,
        backgroundColor: isActive ? "var(--nx-fg)" : "transparent",
        color: isActive ? "var(--nx-ceramic)" : "var(--nx-fg)",
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.06em",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
    >
      {label}
      <span style={{ fontSize: 11, opacity: 0.55 }}>{count}</span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   ArticleCard — type-first: small image top, category chip,
   headline, dek, byline.
   ───────────────────────────────────────────────────────────── */

interface ArticleCardProps {
  article: (typeof JOURNAL_ARTICLES)[number];
  index: number;
  categoryLabel: string;
}

function ArticleCard({ article, index, categoryLabel }: ArticleCardProps) {
  return (
    <Link asChild href={`/journal/${article.slug}`}>
      <a
        data-testid={`link-article-${article.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
      >
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 + index * 0.05, duration: 0.4, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          style={{
            backgroundColor: "var(--nx-ceramic)",
            border: "1px solid var(--nx-border)",
            borderRadius: 16,
            overflow: "hidden",
            cursor: "pointer",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
            <img
              src={article.imageSrc}
              alt={article.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
            <span
              style={{
                alignSelf: "flex-start",
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--nx-rust)",
                border: "1px solid var(--nx-border)",
                borderRadius: 999,
                padding: "4px 12px",
                marginBottom: 18,
              }}
            >
              {categoryLabel}
            </span>
            <h3
              style={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 23,
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                color: "var(--nx-fg)",
                marginBottom: 12,
              }}
            >
              {article.title}
            </h3>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 15,
                lineHeight: 1.55,
                color: "var(--nx-fg-graphite)",
                marginBottom: 20,
                flex: 1,
              }}
            >
              {article.dek}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 16,
                borderTop: "1px solid var(--nx-border)",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  color: "var(--nx-fg)",
                  fontWeight: 500,
                }}
              >
                {article.author.name.split(",")[0]}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-muted)",
                }}
              >
                {article.readTime}
              </span>
            </div>
          </div>
        </motion.article>
      </a>
    </Link>
  );
}
