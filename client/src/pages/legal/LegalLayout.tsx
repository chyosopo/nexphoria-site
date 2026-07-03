import { Children, isValidElement, useMemo } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Link } from "wouter";
import { FONT } from "@/lib/typography";

/* ─────────────────────────────────────────────────────────────
   LegalLayout — visual chrome only. Copy is LOCKED and passed in
   as children; this component never edits it. Polish applied:
   cleaner header, tighter typography scale, sticky left-rail ToC
   auto-derived from <LegalSection> titles, section anchors, and
   footer navigation. General Sans, no italics, no serif.
   ───────────────────────────────────────────────────────────── */

const LEGAL_NAV = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Telehealth Consent", href: "/legal/telehealth-consent" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
];

/** Slugify a section title into a stable anchor id. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

interface LegalLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated = "June 2026", children }: LegalLayoutProps) {
  // Auto-derive the ToC from LegalSection children — no copy is altered.
  const toc = useMemo(() => {
    const items: { id: string; label: string }[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child) && typeof child.props?.title === "string") {
        items.push({ id: slugify(child.props.title), label: child.props.title });
      }
    });
    return items;
  }, [children]);

  return (
    <SiteLayout navVariant="gate">
      {/* Header */}
      <section
        style={{
          backgroundColor: "var(--nx-bg)",
          borderBottom: "1px solid var(--nx-border)",
          paddingTop: "4.5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="nx-container">
          <Link
            href="/legal"
            data-testid="legal-breadcrumb"
            className="no-underline"
            style={{ ...eyebrowStyle, color: "var(--nx-fg-muted)", display: "inline-block", marginBottom: "1rem" }}
          >
            Legal
          </Link>
          <h1
            style={{
              fontFamily: FONT,
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--nx-fg)",
              lineHeight: 1.02,
              marginBottom: "0.75rem",
              maxWidth: 800,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content + sticky ToC rail */}
      <section style={{ backgroundColor: "var(--nx-bg)", paddingTop: "3.5rem", paddingBottom: "4rem" }}>
        <div className="nx-container">
          <div className="legal-shell">
            {/* Sticky left-rail ToC */}
            {toc.length > 0 && (
              <aside className="legal-toc" data-testid="legal-toc" aria-label="On this page">
                <div className="legal-toc-inner">
                  <p style={{ ...eyebrowStyle, color: "var(--nx-fg-muted)", marginBottom: "1rem" }}>
                    On this page
                  </p>
                  <nav>
                    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {toc.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => {
                              const el = document.getElementById(item.id);
                              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                            }}
                            data-testid={`legal-toc-link-${item.id}`}
                            className="legal-toc-link"
                            style={{
                              fontFamily: FONT,
                              fontSize: "13px",
                              lineHeight: 1.4,
                              color: "var(--nx-fg-graphite)",
                              textDecoration: "none",
                              display: "block",
                              textAlign: "left",
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              width: "100%",
                            }}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </aside>
            )}

            {/* Article body */}
            <article
              className="legal-content"
              style={{
                fontFamily: FONT,
                fontSize: "16px",
                lineHeight: 1.75,
                color: "var(--nx-fg-graphite)",
                maxWidth: "72ch",
              }}
            >
              {children}
            </article>
          </div>
        </div>
      </section>

      {/* Legal footer navigation */}
      <section
        style={{ borderTop: "1px solid var(--nx-border)", backgroundColor: "var(--nx-bg-cream)", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      >
        <div className="nx-container">
          <p style={{ ...eyebrowStyle, color: "var(--nx-fg-muted)", marginBottom: "1rem" }}>
            More legal documents
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {LEGAL_NAV.map(({ label, href }) => {
              const active = href === `/legal/${title.toLowerCase()}`;
              return (
                <Link
                  key={label}
                  href={href}
                  data-testid={`legal-footer-link-${href.split("/").pop()}`}
                  className="no-underline legal-footer-pill"
                  style={{
                    fontFamily: FONT,
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--nx-fg)",
                    border: "1px solid var(--nx-border)",
                    borderRadius: "999px",
                    padding: "0.5rem 1rem",
                    backgroundColor: active ? "var(--nx-cobalt-soft)" : "transparent",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .legal-shell { display: block; }
        .legal-toc { display: none; }
        .legal-toc-link:hover { color: var(--nx-fg) !important; }
        .legal-footer-pill:hover { border-color: var(--nx-fg) !important; }
        html { scroll-behavior: smooth; }
        .legal-content h2 { scroll-margin-top: 96px; }
        @media (min-width: 1024px) {
          .legal-shell {
            display: grid;
            grid-template-columns: 240px 1fr;
            gap: 4rem;
            align-items: start;
          }
          .legal-toc { display: block; }
          .legal-toc-inner { position: sticky; top: 96px; }
        }
      `}</style>
    </SiteLayout>
  );
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  const id = slugify(title);
  return (
    <div className="mb-10" data-testid={`legal-section-${id}`}>
      <h2
        id={id}
        style={{
          fontFamily: FONT,
          fontSize: "1.25rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--nx-fg)",
          marginBottom: "0.875rem",
          lineHeight: 1.25,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: "1rem", lineHeight: 1.75 }}>{children}</p>;
}
