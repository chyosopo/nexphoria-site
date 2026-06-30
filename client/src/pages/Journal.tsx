import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import {
  JOURNAL_ARTICLES,
  JOURNAL_CATEGORIES,
  type JournalCategory,
} from "@/data/journal";

/* ─────────────────────────────────────────────────────────────
   Journal — Editorial hub for long-form peptide research,
   protocols, and safety writing. Maximus-tier depth.
   ───────────────────────────────────────────────────────────── */

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState<JournalCategory | "all">("all");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return JOURNAL_ARTICLES;
    return JOURNAL_ARTICLES.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const featured = JOURNAL_ARTICLES[0];
  const rest = filteredArticles.filter((a) => a.slug !== featured.slug || activeCategory !== "all");

  return (
    <SiteLayout variant="cream">
      {/* ── Editorial masthead ────────────────────────────── */}
      <section
        data-testid="journal-masthead"
        style={{
          backgroundColor: "var(--nx-cobalt)",
          color: "#FFFFF3",
          paddingTop: "120px",
          paddingBottom: "80px",
          borderBottom: "1px solid rgba(255,255,243,0.08)",
        }}
      >
        <div className="nx-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ maxWidth: 880 }}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,243,0.55)",
                marginBottom: 28,
              }}
            >
              The Nexphoria Journal
            </p>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                marginBottom: 32,
              }}
            >
              Long-form writing on the science, protocols, and ethics of peptide therapy.
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgba(255,255,243,0.75)",
                maxWidth: 640,
              }}
            >
              Edited by our medical director. Peer-reviewed in-house. Every claim sourced — every reference cited. We write the journal we wish existed when we started.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category filter strip ─────────────────────────── */}
      <section
        data-testid="journal-categories"
        style={{
          backgroundColor: "var(--nx-bg-cream)",
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
              padding: "20px 0",
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

      {/* ── Featured article (only when no filter) ────────── */}
      {activeCategory === "all" && (
        <section
          data-testid="journal-featured"
          style={{ backgroundColor: "var(--nx-bg-cream)", paddingTop: 64, paddingBottom: 64 }}
        >
          <div className="nx-container">
            <Link href={`/journal/${featured.slug}`}>
              <a
                data-testid={`link-featured-${featured.slug}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 1fr",
                    gap: 48,
                    alignItems: "center",
                    backgroundColor: "#FFFFF3",
                    border: "1px solid var(--nx-border)",
                    borderRadius: 4,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  className="journal-featured-grid"
                >
                  <div style={{ position: "relative", aspectRatio: "5/4", overflow: "hidden" }}>
                    <img
                      src={featured.imageSrc}
                      alt={featured.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        padding: "6px 12px",
                        backgroundColor: "rgba(10,10,10,0.92)",
                        color: "#FFFFF3",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        fontWeight: 500,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      Editor's Pick
                    </div>
                  </div>
                  <div style={{ padding: "48px 48px 48px 0" }}>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#C97A4A",
                        marginBottom: 20,
                      }}
                    >
                      {featured.eyebrow}
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "clamp(2rem, 3.5vw, 3rem)",
                        lineHeight: 1.08,
                        letterSpacing: "-0.015em",
                        color: "var(--nx-cobalt)",
                        marginBottom: 24,
                      }}
                    >
                      {featured.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: "var(--nx-text-muted)",
                        marginBottom: 28,
                      }}
                    >
                      {featured.dek}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--nx-cobalt)",
                        }}
                      >
                        {featured.author.name}
                      </span>
                      <span style={{ color: "var(--nx-border)" }}>·</span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          color: "var(--nx-text-muted)",
                        }}
                      >
                        {featured.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </a>
            </Link>
          </div>
        </section>
      )}

      {/* ── Article grid ──────────────────────────────────── */}
      <section
        data-testid="journal-grid"
        style={{ backgroundColor: "var(--nx-bg-cream)", paddingTop: activeCategory === "all" ? 0 : 64, paddingBottom: 120 }}
      >
        <div className="nx-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 32,
                marginTop: 48,
              }}
              className="journal-card-grid"
            >
              {(activeCategory === "all" ? rest : filteredArticles).map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div
              style={{
                padding: "80px 0",
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                color: "var(--nx-text-muted)",
              }}
            >
              <p style={{ fontSize: 18, marginBottom: 8 }}>No articles in this category yet.</p>
              <p style={{ fontSize: 14 }}>New writing publishes every other week.</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .journal-featured-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .journal-featured-grid > div:last-child {
            padding: 32px !important;
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 999,
        border: `1px solid ${isActive ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
        backgroundColor: isActive ? "var(--nx-cobalt)" : "transparent",
        color: isActive ? "#FFFFF3" : "var(--nx-cobalt)",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
    >
      {label}
      <span
        style={{
          fontSize: 10,
          opacity: 0.6,
        }}
      >
        {count}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   ArticleCard
   ───────────────────────────────────────────────────────────── */

interface ArticleCardProps {
  article: (typeof JOURNAL_ARTICLES)[number];
  index: number;
}

function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <Link href={`/journal/${article.slug}`}>
      <a
        data-testid={`link-article-${article.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 + index * 0.06, duration: 0.4, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          style={{
            backgroundColor: "#FFFFF3",
            border: "1px solid var(--nx-border)",
            borderRadius: 4,
            overflow: "hidden",
            cursor: "pointer",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
            <img
              src={article.imageSrc}
              alt={article.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C97A4A",
                marginBottom: 16,
              }}
            >
              {article.eyebrow}
            </p>
            <h3
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1.18,
                letterSpacing: "-0.01em",
                color: "var(--nx-cobalt)",
                marginBottom: 12,
              }}
            >
              {article.title}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                lineHeight: 1.55,
                color: "var(--nx-text-muted)",
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
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "var(--nx-cobalt)",
                  fontWeight: 500,
                }}
              >
                {article.author.name.split(",")[0]}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "var(--nx-text-muted)",
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
