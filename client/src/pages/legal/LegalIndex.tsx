/* ═══ LEGAL INDEX — the tile grammar (2026-09-05)
   The documents as a list of tiles, one line each. Visual chrome only:
   document copy lives in the individual pages and is LOCKED. The page's
   own classes live in client/src/styles/support.css. */
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import "@/styles/support.css";

const legalPages = [
  { label: "Terms of Service", href: "/legal/terms", desc: "The agreement between you and Nexphoria: eligibility, the service, and its terms." },
  { label: "Privacy Policy", href: "/legal/privacy", desc: "How your personal and health information is collected, used and protected." },
  { label: "HIPAA Notice", href: "/legal/hipaa-notice", desc: "How medical information about you may be used and disclosed, and your rights." },
  { label: "Telehealth Consent", href: "/legal/telehealth-consent", desc: "Your consent to receive care by telehealth, including off-label prescribing." },
  { label: "Prescribing Policy", href: "/legal/prescribing-policy", desc: "How the physician reviews, when blood work is required, and when a prescription is declined." },
  { label: "State Availability", href: "/legal/state-availability", desc: "Where care is available, and which medicines carry state restrictions." },
  { label: "Refund Policy", href: "/legal/refund-policy", desc: "Cancellation, returns, and what is refunded when the physician does not prescribe." },
  { label: "Messaging Terms", href: "/legal/messaging", desc: "The text-message program: what is sent, how often, and how to stop." },
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
      {/* ── Hero ── */}
      <section className="nx-tilehero" aria-labelledby="legal-title">
        <div className="nx-container" style={{ paddingBottom: "var(--nx-sp-tight)" }}>
          <div className="nx-tilehero__head nx-hero-seq">
            <p className="nx-eyebrow">Legal</p>
            <h1 id="legal-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>The documents that govern your care, in full.</h1>
            <p className="nx-tilehero__sub" style={{ fontFamily: F }}>The agreements, policies and consents that apply to care at Nexphoria. The business contact sits at the foot of every one.</p>
          </div>
        </div>
      </section>

      {/* ── The documents, as tiles ── */}
      <section className="nx-container" aria-label="Legal documents" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-sec)" }}>
        <ul className="sp-legal" data-testid="legal-index">
          {legalPages.map(({ label, href, desc }, i) => (
            <Reveal key={label} as="li" delay={Math.min(i * 40, 200)}>
                <Link href={href} className="sp-legal__tile" data-testid={`legal-link-${href.split("/").pop()}`}>
                  <span>
                    <span className="sp-legal__t" style={{ display: "block", fontFamily: S }}>{label}</span>
                    <span className="sp-legal__b" style={{ display: "block", fontFamily: F }}>{desc}</span>
                  </span>
                  <span className="sp-legal__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
                </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
