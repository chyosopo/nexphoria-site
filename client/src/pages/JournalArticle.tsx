/* JOB: one article read cleanly end-to-end; one quiet next step. */
import { useEffect, useState } from "react";
import { anchor } from "@/lib/anchors";
import { Link, useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/SignatureTile";
import {
  getArticleBySlug,
  getRelatedArticles,
  JOURNAL_CATEGORIES,
} from "@/data/journal";
import { useSeo, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

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

  // Dynamic per-article SEO
  const seoTitle = article
    ? article.title.length > 55
      ? article.title.slice(0, 52) + "..."
      : article.title
    : "Article not found";
  const seoDescription = article
    ? article.dek.length > 155
      ? article.dek.slice(0, 152) + "..."
      : article.dek
    : "Physician-reviewed peptide science from the Nexphoria Journal.";

  useSeo({
    title: seoTitle,
    description: seoDescription,
    path: `/journal/${slug}`,
    jsonLd: article
      ? [
          // Article schema with real datePublished/author/image from the article data.
          articleJsonLd({
            headline: article.title,
            description: article.dek,
            path: `/journal/${slug}`,
            datePublished: article.publishedISO,
            authorName: article.author?.name,
            image: article.imageSrc,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: article.title, path: `/journal/${slug}` },
          ]),
        ]
      : [],
  });

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
      <SiteLayout navVariant="showcase">
        <section style={{ padding: "120px 0", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "var(--nx-t-lg)",
              color: "var(--nx-fg-muted)",
              marginBottom: 16,
            }}
          >
            Article not found.
          </p>
          <button
            data-testid="button-back-to-journal"
            onClick={() => navigate("/journal")}
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "var(--nx-t-xs)",
              padding: "10px 20px",
              border: "1px solid var(--nx-cobalt)",
              backgroundColor: "transparent",
              color: "var(--nx-cobalt)",
              cursor: "pointer",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span aria-hidden="true">← </span>Back to Journal
          </button>
        </section>
      </SiteLayout>
    );
  }

  const related = getRelatedArticles(article.related);
  const categoryMeta = JOURNAL_CATEGORIES.find((c) => c.slug === article.category);
  const articleDate = new Date(article.publishedISO).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            eyebrow={`${categoryMeta?.label ?? article.category} · Journal`}
            headline={<span>{article.title}</span>}
            subtitle={article.dek}
          />

          <div className="mx-grid">
            <ColoredHeroTile
              href={anchor(`#sec-${article.sections[0]?.id ?? ""}`)}
              tone="sand"
              glyph={TileGlyphs.leaf}
              label={<span>{article.title}</span>}
              caption={`${article.readTime} read · ${articleDate}`}
              ctaLabel="Start reading"
            />
            <ColoredHeroTile
              href="/journal"
              tone="butter"
              glyph={TileGlyphs.hex}
              label={<>More from<br /><span>the journal</span></>}
              caption="All articles"
              ctaLabel="Back to journal"
            />
          </div>
        </div>
      </main>

      {/* ── Editorial image ───────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--nx-bg-cream)", paddingTop: 0 }}
        data-testid="article-image"
      >
        <div className="nx-container">
          <Reveal>
          <div
            style={{
              marginTop: -48,
              borderRadius: "var(--nx-r-xs)",
              overflow: "hidden",
              aspectRatio: "16/9",
              border: "1px solid var(--nx-border)",
              maxWidth: 1080,
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "var(--nx-e-3)",
            }}
          >
            <img
              src={article.imageSrc}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          </Reveal>
        </div>
      </section>

      {/* ── Body + sticky TOC ─────────────────────────────── */}
      <section
        data-testid="article-body"
        className="nx-section-y"
        style={{ backgroundColor: "var(--nx-bg-cream)" }}
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
            <nav aria-labelledby="toc-heading">
            <p
              id="toc-heading"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--nx-fg-muted)",
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
                    href={anchor(`#sec-${s.id}`)}
                    aria-current={activeSection === `sec-${s.id}` ? "location" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{
                      display: "block",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-sm)",
                      lineHeight: 1.45,
                      color: activeSection === `sec-${s.id}` ? "var(--nx-cobalt)" : "var(--nx-fg-muted)",
                      fontWeight: activeSection === `sec-${s.id}` ? 600 : 400,
                      textDecoration: "none",
                      paddingLeft: 12,
                      borderLeft: `2px solid ${activeSection === `sec-${s.id}` ? "var(--nx-rust)" : "transparent"}`,
                      transition: "color var(--nx-dur-2) var(--nx-ease), border-left-color var(--nx-dur-2) var(--nx-ease)",
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            </nav>
          </aside>

          {/* Body — tighter reading measure for editorial calm (~68ch at 17px).
              minWidth 0 stops wide tables leaking intrinsic width into the 1fr
              track (they scroll internally instead of dragging copy off-screen). */}
          <article style={{ maxWidth: 680, minWidth: 0 }}>
            {article.sections.map((s) => (
              <div key={s.id} id={`sec-${s.id}`} style={{ marginBottom: 56, scrollMarginTop: 96 }}>
                <h2
                  style={{
                    // Fraunces display voice — the 400-weight cobalt sans read
                    // LIGHTER than the 17px body it was meant to head
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 500,
                    fontSize: "var(--nx-t-h2)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.012em",
                    color: "var(--nx-fg)",
                    marginBottom: 24,
                  }}
                >
                  {s.label}
                </h2>
                {s.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-body)",
                      lineHeight: 1.75,
                      color: "var(--nx-fg-graphite)",
                      marginBottom: 20,
                    }}
                  >
                    {para}
                  </p>
                ))}
                {s.callout && (
                  <Reveal>
                  <aside
                    style={{
                      borderLeft: "3px solid var(--nx-rust)",
                      paddingLeft: 24,
                      marginTop: 28,
                      marginBottom: 28,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",

                        fontWeight: 400,
                        fontSize: "var(--nx-t-xl)",
                        lineHeight: 1.35,
                        color: "var(--nx-cobalt)",
                      }}
                    >
                      "{s.callout}"
                    </p>
                  </aside>
                  </Reveal>
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
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "var(--nx-t-sm)",
                            fontWeight: 500,
                            color: "var(--nx-rust)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "var(--nx-t-body)",
                            lineHeight: 1.6,
                            color: "var(--nx-fg-graphite)",
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
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-sm)",
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
                                fontFamily: "'General Sans', system-ui, sans-serif",
                                fontSize: "var(--nx-t-xs)",
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
                                  fontSize: "var(--nx-t-sm)",
                                  lineHeight: 1.5,
                                  color: "var(--nx-fg-graphite)",
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

            {/* Share buttons */}
            <div
              data-testid="article-share"
              style={{
                marginTop: 56,
                paddingTop: 28,
                borderTop: "1px solid var(--nx-border)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-muted)",
                  marginRight: 8,
                }}
              >
                Share
              </p>
              <button
                data-testid="share-x"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(`"${article.title}" — from the Nexphoria Journal`);
                  window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  background: "transparent",
                  border: "1px solid var(--nx-cobalt)",
                  borderRadius: 2,
                  padding: "8px 14px",
                  cursor: "pointer",
                }}
              >
                Share on X
              </button>
              <button
                data-testid="share-linkedin"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  background: "transparent",
                  border: "1px solid var(--nx-cobalt)",
                  borderRadius: 2,
                  padding: "8px 14px",
                  cursor: "pointer",
                }}
              >
                Share on LinkedIn
              </button>
            </div>

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
                id="references-heading"
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-muted)",
                  marginBottom: 20,
                }}
              >
                References
              </p>
              <ol aria-labelledby="references-heading" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {article.references.map((ref) => (
                  <li
                    key={ref.n}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "32px 1fr",
                      gap: 12,
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-sm)",
                      lineHeight: 1.55,
                      color: "var(--nx-fg-muted)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-xs)",
                        color: "var(--nx-rust)",
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
                          aria-label={`Open source for reference ${ref.n}`}
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
            backgroundColor: "var(--nx-ceramic)",
            borderTop: "1px solid var(--nx-border)",
            paddingTop: 80,
            paddingBottom: 120,
          }}
        >
          <div className="nx-container">
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--nx-rust)",
                marginBottom: 16,
              }}
            >
              Keep reading
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.1,
                color: "var(--nx-fg)",
                marginBottom: 40,
              }}
            >
              Related research.
            </h2>
            <div
              role="list"
              aria-label="Related articles"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {related.map((r) => (
                <div role="listitem" key={r.slug}>
                <Link asChild href={`/journal/${r.slug}`}>
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
                      transition: "transform var(--nx-dur-3) var(--nx-ease), box-shadow var(--nx-dur-3) var(--nx-ease)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-xs)",
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--nx-rust)",
                        marginBottom: 16,
                      }}
                    >
                      {r.eyebrow}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        
                        fontWeight: 400,
                        fontSize: "var(--nx-t-lg)",
                        lineHeight: 1.2,
                        color: "var(--nx-cobalt)",
                        marginBottom: 12,
                      }}
                    >
                      {r.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-sm)",
                        lineHeight: 1.55,
                        color: "var(--nx-fg-muted)",
                      }}
                    >
                      {r.dek}
                    </p>
                  </a>
                </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ── Get the next issue ────────────────── */}
      <section
        data-testid="article-get-next-issue"
        style={{
          backgroundColor: "var(--nx-bg-dark)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <div className="nx-container" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "var(--nx-acid)",
              borderRadius: 4,
              padding: "48px 56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(21, 24, 28,0.55)",
                  marginBottom: 12,
                }}
              >
                The Nexphoria Journal · Monthly dispatch
              </p>
              <h2
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                <span>Get the next issue.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-body)",
                  lineHeight: 1.6,
                  color: "rgba(21, 24, 28,0.7)",
                  maxWidth: 440,
                }}
              >
                Evidence reviews, protocol explainers, physician notes — straight to your inbox the week they publish.
              </p>
            </div>
            <div>
              <a
                href="mailto:journal@nexphoria.com"
                data-testid="journal-subscribe-email"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "var(--nx-bg-dark)",
                  color: "var(--nx-acid)",
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "14px 24px",
                  borderRadius: 2,
                  textDecoration: "none",
                }}
              >
                Email journal@nexphoria.com <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .article-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .article-toc {
            position: static !important;
            order: -1;
            min-width: 0;
          }
          .article-grid > article {
            min-width: 0;
          }
        }
      `}</style>
    </SiteLayout>
  );
}
