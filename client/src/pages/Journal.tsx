/* JOB: editorial trust and SEO; every article advances one next step. */
import { useState, useMemo, useRef, forwardRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { FONT } from "@/lib/typography";
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

const eyebrow: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: "var(--nx-t-xs)",
  fontWeight: 500,
  letterSpacing: "var(--nx-ls-wide)",
  textTransform: "uppercase",
  color: "var(--nx-cobalt)",
};

export default function Journal() {
  useSeo({
    title: "Nexphoria Journal — peptide science, protocols, and physician notes",
    description:
      // Named BPC-157, NAD+ and Epitalon as things "we prescribe". After the
      // launch-scope cut that is simply untrue of our catalog, and naming a
      // Category 2 substance as something we prescribe is the worst version of
      // the error. Describes the archive without claiming a formulary.
      "Long-form evidence reviews, protocol explainers, and physician notes. The science behind GLP-1 therapy, the GH axis, and peptide pharmacology — plainly written, rigorously sourced.",
    path: "/journal",
    jsonLd: [webPageJsonLd({
      name: "Nexphoria Journal",
      description: "Physician-written peptide science: evidence reviews, protocol guides, and clinical notes.",
      path: "/journal",
      type: "MedicalWebPage",
    }),
    // Enumerate the real published articles in display order so the editorial
    // index is a crawlable ItemList (titles/paths sourced from JOURNAL_ARTICLES,
    // the single source of truth — no hand-duplicated list).
    itemListJsonLd({
      name: "Nexphoria Journal articles",
      items: JOURNAL_ARTICLES.map((a) => ({ name: a.title, path: `/journal/${a.slug}` })),
    }),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }]),
    ],
  });

  const reduce = useReducedMotion();
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

  // Filter toolbar model: "All" + every category that actually has articles.
  // Single derived list so the roving-tabindex handler, the render, and the
  // ref array all index the same sequence.
  const chips = useMemo(() => {
    const list: { key: JournalCategory | "all"; label: string; count: number }[] = [
      { key: "all", label: "All", count: JOURNAL_ARTICLES.length },
    ];
    for (const cat of JOURNAL_CATEGORIES) {
      const count = JOURNAL_ARTICLES.filter((a) => a.category === cat.slug).length;
      if (count > 0) list.push({ key: cat.slug, label: cat.label, count });
    }
    return list;
  }, []);

  const activeIdx = Math.max(0, chips.findIndex((c) => c.key === activeCategory));

  // Roving tabindex: exactly one chip is Tab-reachable at a time. `focusIdx`
  // is the roving tab stop, seeded to the selected filter. Arrow/Home/End move
  // focus ONLY (focus-follows, no auto-activation) — a filter toolbar must not
  // swap the grid on mere arrow traversal; Enter/Space/click still activate.
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusIdx, setFocusIdx] = useState(activeIdx);

  const onToolbarKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const n = chips.length;
    let next = focusIdx;
    switch (e.key) {
      case "ArrowRight":
        next = (focusIdx + 1) % n;
        break;
      case "ArrowLeft":
        next = (focusIdx - 1 + n) % n;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = n - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setFocusIdx(next);
    chipRefs.current[next]?.focus();
  };

  // sr-only announcement: chip counts (filteredArticles) is what the visible
  // chip badges promise, so the spoken count matches the number the user sees.
  const resultCount = filteredArticles.length;
  const resultStatus =
    activeCategory === "all"
      ? `Showing ${resultCount} ${resultCount === 1 ? "article" : "articles"} across all categories.`
      : `Showing ${resultCount} ${resultCount === 1 ? "article" : "articles"} in ${catLabel(activeCategory)}.`;

  return (
    <SiteLayout navVariant="showcase">
      {/* ══════════════ EDITORIAL MASTHEAD ══════════════ */}
      <section
        data-testid="journal-masthead"
        aria-labelledby="journal-masthead-title"
        style={{
          backgroundColor: "var(--nx-bg)",
          borderBottom: "1px solid var(--nx-border)",
        }}
      >
        <div className="nx-container" style={{ paddingTop: 72, paddingBottom: 40 }}>
          <p style={{ ...eyebrow, marginBottom: 20 }}>The Journal</p>
          <h1
            id="journal-masthead-title"
            style={{
              // Fraunces — the site's one display voice (this masthead was the
              // last General Sans holdout among page headlines)
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 500,
              fontSize: "var(--nx-t-display)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--nx-fg)",
              maxWidth: 900,
            }}
          >
            <span style={{ color: "color-mix(in oklab, var(--nx-fg) 40%, transparent)" }}>
              Peptide science,
            </span>
            <br />
            plainly written.
          </h1>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "var(--nx-t-lg)",
              lineHeight: 1.65,
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
        aria-label="Featured article"
        style={{ backgroundColor: "var(--nx-bg)", paddingTop: 48, paddingBottom: 56 }}
      >
        <div className="nx-container">
          <Link asChild href={`/journal/${featured.slug}`}>
            <a
              data-testid={`link-featured-${featured.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <motion.article
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="journal-featured-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.05fr 0.95fr",
                  backgroundColor: "var(--nx-ceramic)",
                  border: "1px solid var(--nx-border)",
                  borderRadius: "var(--nx-r-lg)",
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
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 500,
                      letterSpacing: "var(--nx-ls-caps)",
                      textTransform: "uppercase",
                      borderRadius: "var(--nx-r-pill)",
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
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 500,
                      letterSpacing: "var(--nx-ls-caps)",
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
                      fontSize: "var(--nx-t-h2)",
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
                      fontSize: "var(--nx-t-body)",
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
                        fontSize: "var(--nx-t-sm)",
                        fontWeight: 500,
                        color: "var(--nx-fg)",
                      }}
                    >
                      {featured.author.name}
                    </span>
                    <span aria-hidden="true" style={{ color: "var(--nx-border)" }}>·</span>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: "var(--nx-t-xs)",
                        letterSpacing: "var(--nx-ls-caps)",
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
        aria-label="Filter articles by category"
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
          {/* Inner flex row is the ARIA toolbar. The accessible name lives on
              the parent <section aria-label> only — the toolbar deliberately
              carries NO aria-label so the rotor reads a single name, not a
              doubled one. aria-orientation reflects the horizontal scroll row. */}
          <div
            role="toolbar"
            aria-orientation="horizontal"
            onKeyDown={onToolbarKeyDown}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 0",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {chips.map((chip, i) => (
              <CategoryChip
                key={chip.key}
                ref={(el) => (chipRefs.current[i] = el)}
                label={chip.label}
                isActive={activeCategory === chip.key}
                count={chip.count}
                tabIndex={i === focusIdx ? 0 : -1}
                onClick={() => {
                  setActiveCategory(chip.key);
                  setFocusIdx(i);
                }}
                testId={`chip-category-${chip.key}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ARTICLE GRID (type-first cards) ══════════════ */}
      <section
        data-testid="journal-grid"
        id="journal-results"
        aria-label="Articles"
        className="nx-section-y"
        style={{ backgroundColor: "var(--nx-bg)" }}
      >
        {/* Polite, screen-reader-only status inside the results region so AT
            users hear the new filtered count without the whole card grid being
            re-read (aria-live lives here, not on the card container). */}
        <p
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
          data-testid="journal-sr-status"
        >
          {resultStatus}
        </p>
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
                gap: 36,
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
              <p style={{ fontSize: "var(--nx-t-lg)", marginBottom: 8, color: "var(--nx-fg)" }}>
                No articles in this category yet.
              </p>
              <p style={{ fontSize: "var(--nx-t-sm)" }}>New writing publishes every other week.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ NEWSLETTER CTA ══════════════ */}
      <section
        data-testid="journal-newsletter"
        aria-labelledby="journal-newsletter-title"
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
              borderRadius: "var(--nx-r-lg)",
              padding: "48px 48px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "var(--nx-ls-wide)",
                  textTransform: "uppercase",
                  color: "var(--nx-acid)",
                  marginBottom: 18,
                }}
              >
                The Journal · Weekly
              </p>
              <h2
                id="journal-newsletter-title"
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: "var(--nx-t-h2)",
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
                  fontSize: "var(--nx-t-body)",
                  lineHeight: 1.6,
                  color: "rgba(246, 249, 252,0.72)",
                  maxWidth: 480,
                }}
              >
                Evidence reviews, protocol explainers, and physician notes, delivered the week they
                publish. Cited, reviewed, and plainly written.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href="mailto:journal@nexphoria.com?subject=Subscribe%20to%20The%20Journal"
                data-testid="button-newsletter-subscribe"
                className="journal-subscribe"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  backgroundColor: "var(--nx-acid)",
                  color: "var(--nx-fg)",
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-sm)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  padding: "16px 24px",
                  borderRadius: "var(--nx-r-md)",
                  textDecoration: "none",
                  willChange: "transform",
                  transition: "transform var(--nx-dur-2) var(--nx-ease)",
                }}
              >
                Subscribe by email
              </a>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  letterSpacing: "0.06em",
                  color: "rgba(246, 249, 252,0.5)",
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
        .journal-chip:not([aria-pressed="true"]):hover { border-color: var(--nx-fg); color: var(--nx-fg); }
        .journal-subscribe:hover { transform: translateY(-2px); }
        .journal-subscribe:active { transform: translateY(0); transition-duration: var(--nx-dur-1); }
        @media (prefers-reduced-motion: reduce) {
          .journal-subscribe { transition: none; }
          .journal-subscribe:hover, .journal-subscribe:active { transform: none; }
        }
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
  tabIndex: number;
}

const CategoryChip = forwardRef<HTMLButtonElement, CategoryChipProps>(function CategoryChip(
  { label, isActive, count, onClick, testId, tabIndex },
  ref,
) {
  return (
    <button
      ref={ref}
      data-testid={testId}
      onClick={onClick}
      aria-pressed={isActive}
      aria-controls="journal-results"
      tabIndex={tabIndex}
      className="journal-chip"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        minHeight: 44,
        padding: "0 16px",
        borderRadius: "var(--nx-r-pill)",
        border: `1px solid ${isActive ? "var(--nx-fg)" : "var(--nx-border)"}`,
        backgroundColor: isActive ? "var(--nx-fg)" : "transparent",
        color: isActive ? "var(--nx-ceramic)" : "var(--nx-fg)",
        fontFamily: FONT,
        fontSize: "var(--nx-t-xs)",
        fontWeight: 500,
        letterSpacing: "0.06em",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "border-color var(--nx-dur-2) var(--nx-ease), background-color var(--nx-dur-2) var(--nx-ease), color var(--nx-dur-2) var(--nx-ease)",
      }}
    >
      {label}
      <span style={{ fontSize: "var(--nx-t-xs)", opacity: 0.55 }}>{count}</span>
    </button>
  );
});

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
  const reduce = useReducedMotion();
  return (
    <Link asChild href={`/journal/${article.slug}`}>
      <a
        data-testid={`link-article-${article.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
      >
        <motion.article
          // Entrance is a JS (framer) animation, so it bypasses the global CSS
          // reduced-motion floor — guard it explicitly like every other reveal.
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.04 + index * 0.05, duration: 0.4, ease: "easeOut" }}
          whileHover={reduce ? undefined : { y: -4 }}
          style={{
            backgroundColor: "var(--nx-ceramic)",
            border: "1px solid var(--nx-border)",
            borderRadius: "var(--nx-r-md)",
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
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-caps)",
                textTransform: "uppercase",
                color: "var(--nx-rust)",
                border: "1px solid var(--nx-border)",
                borderRadius: "var(--nx-r-pill)",
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
                fontSize: "var(--nx-t-xl)",
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
                fontSize: "var(--nx-t-base)",
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
                  fontSize: "var(--nx-t-sm)",
                  color: "var(--nx-fg)",
                  fontWeight: 500,
                }}
              >
                {article.author.name.split(",")[0]}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: "var(--nx-t-xs)",
                  letterSpacing: "var(--nx-ls-caps)",
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
