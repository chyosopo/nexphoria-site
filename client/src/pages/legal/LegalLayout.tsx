import { SiteLayout } from "@/components/SiteLayout";
import { Link } from "wouter";

interface LegalLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated = "June 2026", children }: LegalLayoutProps) {
  return (
    <SiteLayout navVariant="gate">
      {/* Header */}
      <section className="py-14" style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}>
        <div className="nx-container max-w-3xl">
          <p className="nx-eyebrow mb-3">LEGAL</p>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.15, marginBottom: "0.5rem" }}>
            {title}
          </h1>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", color: "var(--nx-fg-muted)" }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="nx-section">
        <div className="nx-container max-w-3xl">
          <div className="legal-content" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--nx-fg-graphite)",
          }}>
            {children}
          </div>
        </div>
      </section>

      {/* Legal nav */}
      <section className="py-8 border-t" style={{ borderColor: "var(--nx-border)", backgroundColor: "var(--nx-bg-cream)" }}>
        <div className="nx-container">
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Terms of Service", href: "/legal/terms" },
              { label: "Privacy Policy", href: "/legal/privacy" },
              { label: "Telehealth Consent", href: "/legal/telehealth-consent" },
              { label: "Refund Policy", href: "/legal/refund-policy" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="no-underline"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--nx-cobalt)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", fontWeight: 700, color: "var(--nx-fg)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>{children}</p>;
}
