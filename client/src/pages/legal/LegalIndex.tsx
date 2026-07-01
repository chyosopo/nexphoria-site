import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";

const legalPages = [
  { label: "Terms of Service", href: "/legal/terms", desc: "Service agreements, user eligibility, and platform terms." },
  { label: "Privacy Policy", href: "/legal/privacy", desc: "How we collect, use, and protect your personal and health information." },
  { label: "Telehealth Consent", href: "/legal/telehealth-consent", desc: "Your consent to receive care via telehealth and off-label prescribing." },
  { label: "Refund Policy", href: "/legal/refund-policy", desc: "Cancellation, returns, and refund request procedures." },
];

export default function LegalIndex() {
  useSeo({
    title: "Legal | Nexphoria",
    description: "Terms of Service, Privacy Policy, Telehealth Consent, and Refund Policy for Nexphoria.",
    path: "/legal",
  });
  return (
    <SiteLayout navVariant="gate">
      <section className="py-20" style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}>
        <div className="nx-container">
          <Reveal>
            <p className="nx-eyebrow mb-4">LEGAL</p>
            <h1 className="nx-heading mb-4" style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}>Legal documents.</h1>
          </Reveal>
        </div>
      </section>
      <section className="nx-section">
        <div className="nx-container max-w-2xl">
          <div className="flex flex-col gap-0">
            {legalPages.map(({ label, href, desc }, i) => (
              <Reveal key={label} delay={i * 60}>
                <Link
                  href={href}
                  className="flex items-start justify-between py-6 no-underline group"
                  style={{ borderBottom: "1px solid var(--nx-border)" }}
                  data-testid={`legal-link-${href.split('/').pop()}`}
                >
                  <div>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "17px", fontWeight: 600, color: "var(--nx-fg)", marginBottom: "4px" }}>{label}</p>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", color: "var(--nx-fg-graphite)" }}>{desc}</p>
                  </div>
                  <span style={{ color: "var(--nx-cobalt)", marginTop: "4px", flexShrink: 0, marginLeft: "1rem" }}>→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
