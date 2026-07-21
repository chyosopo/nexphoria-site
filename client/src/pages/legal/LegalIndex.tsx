import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import { FONT } from "@/lib/typography";

/* ─────────────────────────────────────────────────────────────
   LegalIndex — visual chrome only. Document copy is LOCKED.
   General Sans, no italics, no serif.
   ───────────────────────────────────────────────────────────── */

const legalPages = [
  { label: "Terms of Service", href: "/legal/terms", desc: "Service agreements, user eligibility, and platform terms." },
  { label: "Privacy Policy", href: "/legal/privacy", desc: "How we collect, use, and protect your personal and health information." },
  { label: "HIPAA Notice", href: "/legal/hipaa-notice", desc: "How medical information about you may be used and disclosed, and your rights." },
  { label: "Telehealth Consent", href: "/legal/telehealth-consent", desc: "Your consent to receive care via telehealth and off-label prescribing." },
  { label: "Prescribing Policy", href: "/legal/prescribing-policy", desc: "Physician review standards, lab gating, compounding disclosures, and when we decline." },
  { label: "State Availability", href: "/legal/state-availability", desc: "Where care is available and which protocols carry state restrictions." },
  { label: "Refund Policy", href: "/legal/refund-policy", desc: "Cancellation, returns, and refund request procedures." },
];

export default function LegalIndex() {
  useSeo({
    title: "Legal — Terms, Privacy, Telehealth Consent, Refund Policy",
    description: "Nexphoria legal documents: Terms of Service, Privacy Policy, Telehealth Consent, and Refund Policy. Physician-prescribed peptide therapy governed by U.S. telehealth and compounding pharmacy law.",
    path: "/legal",
    jsonLd: [
      webPageJsonLd({ name: "Legal", description: "Nexphoria legal documents: Terms of Service, Privacy Policy, Telehealth Consent, and Refund Policy.", path: "/legal" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Legal", path: "/legal" }]),
      itemListJsonLd({ name: "Nexphoria legal documents", items: legalPages.map((p) => ({ name: p.label, path: p.href })) }),
    ],
  });
  return (
    <SiteLayout navVariant="gate">
      <section
        style={{
          backgroundColor: "var(--nx-bg)",
          borderBottom: "1px solid var(--nx-border)",
          paddingTop: "4.5rem",
          paddingBottom: "3rem",
        }}
      >
        {/* Same centered measure as the card column below — a full-width
            hero next to a max-w-2xl list read as two misaligned pages */}
        <div className="nx-container max-w-2xl">
          <Reveal>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-2xs)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-caps)",
                textTransform: "uppercase",
                color: "var(--nx-fg-muted)",
                marginBottom: "1rem",
              }}
            >
              Legal
            </p>
            <h1
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-h1)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "var(--nx-fg)",
                lineHeight: 1.02,
                marginBottom: "0.75rem",
              }}
            >
              Legal documents.
            </h1>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "var(--nx-t-body)",
                lineHeight: 1.6,
                color: "var(--nx-fg-graphite)",
                maxWidth: 560,
              }}
            >
              The agreements, policies, and consents that govern your care at Nexphoria.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--nx-bg)", paddingTop: "3.5rem", paddingBottom: "5rem" }}>
        <div className="nx-container max-w-2xl">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {legalPages.map(({ label, href, desc }, i) => (
              <Reveal key={label} delay={i * 60}>
                <Link
                  href={href}
                  className="no-underline legal-index-card"
                  data-testid={`legal-link-${href.split("/").pop()}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.5rem 1.75rem",
                    border: "1px solid var(--nx-border)",
                    borderRadius: "var(--nx-r-md)",
                    backgroundColor: "var(--nx-ceramic)",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: FONT,
                        fontSize: "var(--nx-t-lg)",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: "var(--nx-fg)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: FONT,
                        fontSize: "var(--nx-t-sm)",
                        lineHeight: 1.55,
                        color: "var(--nx-fg-graphite)",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                  <span style={{ color: "var(--nx-fg)", marginTop: "2px", flexShrink: 0 }}>
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .legal-index-card { transition: border-color 0.2s ease; }
        .legal-index-card:hover { border-color: var(--nx-fg) !important; }
      `}</style>
    </SiteLayout>
  );
}
