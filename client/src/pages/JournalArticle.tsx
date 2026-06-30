import { useEffect, useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import {
  getArticleBySlug,
  getRelatedArticles,
  JOURNAL_CATEGORIES,
} from "@/data/journal";

/* ─────────────────────────────────────────────────────────────
   JournalArticle — Long-form editorial article page with
   sticky TOC, footnotes, references, and related reading.
   ───────────────────────────────────────────────────────────── */

export default function JournalArticle() {
  const [, params] = useRoute<{ slug: string }>("/journal/:slug");
  const [, navigate] = useLocation();
  const slug = params?.slug ?? "";
  const article = getArticleBySlug(slug);
  const [activeSection, setActiveSection] = useState<string>("");

  /* Scroll-spy for sticky TOC */
  useEffect(() => {
    if (!article) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    article.sections.forEach((s) => {
      const el = document.getElementById(`sec-${s.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <SiteLayout variant="cream">
        <section style={{ padding: "120px 0", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              color: "var(--nx-text-muted)",
              marginBottom: 16,
            }}
          >
            Article not found.
          </p>
          <button
            data-testid="button-back-to-journal"
            onClick={() => navigate("/journal")}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              padding: "10px 20px",
              border: "1px solid var(--nx-cobalt)",
              backgroundColor: "transparent",
              color: "var(--nx-cobalt)",
              cursor: "pointer",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ← Back to Journal
          </button>
        </section>
      </SiteLayout>
    );
  }

  const related = getRelatedArticles(article.related);
  const categoryMeta = JOURNAL_CATEGORIES.find((c) => c.slug === article.category);

  return (
    <SiteLayout variant="cream">
      {/* ── Article hero ──────────────────────────────────── */}
      <section
        data-testid="article-hero"
        style={{
          backgroundColor: "var(--nx-cobalt)",
          color: "#FFFFF3",
          paddingTop: 120,
          paddingBottom: 64,
        }}
      >
        <div className="nx-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ maxWidth: 820, margin: "0 auto" }}
          >
            <Link href="/journal">
              <a
                data-testid="link-back-journal"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "rgba(255,255,243,0.6)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 32,
                  textDecoration: "none",
                }}
              >
                ← The Journal
              </a>
            </Link>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C97A4A",
                marginBottom: 28,
              }}
            >
              {categoryMeta?.label ?? article.category} · {article.readTime}
            </p>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.015em",
                marginBottom: 28,
              }}
            >
              {article.title}
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgba(255,255,243,0.78)",
                marginBottom: 40,
              }}
            >
              {article.dek}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,243,0.12)",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#FFFFF3",
                    marginBottom: 2,
                  }}
                >
                  {article.author.name}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,243,0.55)",
                  }}
                >
                  {article.author.title}
                </p>
              </div>
              {article.reviewers && article.reviewers.length > 0 && (
                <>
                  <span style={{ color: "rgba(255,255,243,0.25)" }}>·</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,243,0.45)",
                        marginBottom: 4,
                      }}
                    >
                      Reviewed by
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(255,255,243,0.75)",
                      }}
                    >
                      {article.reviewers.map((r) => r.name).join(", ")}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Editorial image ───────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--nx-bg-cream)", paddingTop: 0 }}
        data-testid="article-image"
      >
        <div className="nx-container">
          <div
            style={{
              marginTop: -48,
              borderRadius: 4,
              overflow: "hidden",
              aspectRatio: "16/9",
              border: "1px solid var(--nx-border)",
              maxWidth: 1080,
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 24px 48px -16px rgba(10,10,10,0.18)",
            }}
          >
            <img
              src={article.imageSrc}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ── Body + sticky TOC ─────────────────────────────── */}
      <section
        data-testid="article-body"
        style={{ backgroundColor: "var(--nx-bg-cream)", paddingTop: 80, paddingBottom: 120 }}
      >
        <div
          className="nx-container article-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 64,
            maxWidth: 1180,
            margin: "0 auto",
          }}
        >
          {/* Sticky TOC */}
          <aside
            className="article-toc"
            style={{
              position: "sticky",
              top: 100,
              alignSelf: "start",
              paddingTop: 8,
            }}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--nx-text-muted)",
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: "1px solid var(--nx-border)",
              }}
            >
              In this article
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {article.sections.map((s) => (
                <li key={s.id}>
                  <a
                    data-testid={`toc-link-${s.id}`}
                    href={`#sec-${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{
                      display: "block",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: activeSection === `sec-${s.id}` ? "var(--nx-cobalt)" : "var(--nx-text-muted)",
                      fontWeight: activeSection === `sec-${s.id}` ? 600 : 400,
                      textDecoration: "none",
                      paddingLeft: 12,
                      borderLeft: `2px solid ${activeSection === `sec-${s.id}` ? "#C97A4A" : "transparent"}`,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Body */}
          <article style={{ maxWidth: 720 }}>
            {article.sections.map((s) => (
              <div key={s.id} id={`sec-${s.id}`} style={{ marginBottom: 56, scrollMarginTop: 96 }}>
                <h2
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 32,
                    lineHeight: 1.15,
                    letterSpacing: "-0.012em",
                    color: "var(--nx-cobalt)",
                    marginBottom: 24,
                  }}
                >
                  {s.label}
                </h2>
                {s.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 17,
                      lineHeight: 1.75,
                      color: "var(--nx-text)",
                      marginBottom: 20,
                    }}
                  >
                    {para}
                  </p>
                ))}
                {s.callout && (
                  <aside
                    style={{
                      borderLeft: "3px solid #C97A4A",
                      paddingLeft: 24,
                      marginTop: 28,
                      marginBottom: 28,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: 22,
                        lineHeight: 1.35,
                        color: "var(--nx-cobalt)",
                      }}
                    >
                      "{s.callout}"
                    </p>
                  </aside>
                )}
                {s.steps && (
                  <ol
                    style={{
                      counterReset: "step",
                      listStyle: "none",
                      padding: 0,
                      margin: "24px 0",
                      borderTop: "1px solid var(--nx-border)",
                    }}
                  >
                    {s.steps.map((step, i) => (
                      <li
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "48px 1fr",
                          gap: 20,
                          padding: "18px 0",
                          borderBottom: "1px solid var(--nx-border)",
                          alignItems: "baseline",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#C97A4A",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: "var(--nx-text)",
                          }}
                        >
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
                {s.table && (
                  <div style={{ overflowX: "auto", margin: "24px 0" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: "2px solid var(--nx-cobalt)" }}>
                          {s.table.headers.map((h, i) => (
                            <th
                              key={i}
                              style={{
                                textAlign: "left",
                                padding: "12px 16px 12px 0",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 10,
                                fontWeight: 500,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "var(--nx-cobalt)",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid var(--nx-border)" }}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                style={{
                                  padding: "14px 16px 14px 0",
                                  fontSize: 14,
                                  lineHeight: 1.5,
                                  color: "var(--nx-text)",
                                  verticalAlign: "top",
                                }}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {/* References */}
            <div
              data-testid="article-references"
              style={{
                marginTop: 64,
                paddingTop: 32,
                borderTop: "1px solid var(--nx-border)",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--nx-text-muted)",
                  marginBottom: 20,
                }}
              >
                References
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {article.references.map((ref) => (
                  <li
                    key={ref.n}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "32px 1fr",
                      gap: 12,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: "var(--nx-text-muted)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        color: "#C97A4A",
                      }}
                    >
                      [{ref.n}]
                    </span>
                    <span>
                      {ref.citation}{" "}
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--nx-cobalt)", textDecoration: "underline", textUnderlineOffset: 2 }}
                        >
                          Link
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </div>
      </section>

      {/* ── Related articles ──────────────────────────────── */}
      {related.length > 0 && (
        <section
          data-testid="article-related"
          style={{
            backgroundColor: "#FFFFF3",
            borderTop: "1px solid var(--nx-border)",
            paddingTop: 80,
            paddingBottom: 120,
          }}
        >
          <div className="nx-container">
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C97A4A",
                marginBottom: 16,
              }}
            >
              Keep reading
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.1,
                color: "var(--nx-cobalt)",
                marginBottom: 40,
              }}
            >
              Related research.
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {related.map((r) => (
                <Link key={r.slug} href={`/journal/${r.slug}`}>
                  <a
                    data-testid={`link-related-${r.slug}`}
                    style={{
                      display: "block",
                      padding: 28,
                      border: "1px solid var(--nx-border)",
                      borderRadius: 4,
                      textDecoration: "none",
                      color: "inherit",
                      backgroundColor: "var(--nx-bg-cream)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
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
                      {r.eyebrow}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: 20,
                        lineHeight: 1.2,
                        color: "var(--nx-cobalt)",
                        marginBottom: 12,
                      }}
                    >
                      {r.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "var(--nx-text-muted)",
                      }}
                    >
                      {r.dek}
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 900px) {
          .article-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .article-toc {
            position: static !important;
            order: -1;
          }
        }
      `}</style>
    </SiteLayout>
  );
}
