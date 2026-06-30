import { Link } from "wouter";
import { Logo } from "./Logo";

interface FooterProps {
  variant?: "women" | "men" | "shared";
}

export function Footer({ variant = "shared" }: FooterProps) {
  const col1 =
    variant === "men"
      ? {
          heading: "PERFORMANCE",
          links: [
            { label: "CJC-1295 / Ipamorelin", href: "/men/peptides/cjc-1295" },
            { label: "Tesamorelin", href: "/men/peptides/tesamorelin" },
            { label: "Sermorelin", href: "/men/peptides/sermorelin" },
            { label: "All protocols", href: "/men/protocols" },
          ],
        }
      : {
          heading: "WEIGHT LOSS",
          links: [
            { label: "Tirzepatide", href: "/women/peptides/tirzepatide" },
            { label: "Semaglutide", href: "/women/peptides/semaglutide" },
            { label: "All weight loss", href: "/women/protocols" },
          ],
        };

  return (
    <footer className="nx-footer" data-testid="footer">
      <div className="nx-container py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {/* Brand + email */}
          <div className="md:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Inter Tight', sans-serif", lineHeight: 1.6 }}>
              Early access to new protocols, research, and member-only pricing.
            </p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
                data-testid="footer-email-input"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  backgroundColor: "var(--nx-cobalt)",
                  color: "#fff",
                  letterSpacing: "0.04em",
                }}
                data-testid="footer-email-submit"
              >
                Join
              </button>
            </form>
          </div>

          {/* Nav columns */}
          <FooterCol
            heading={col1.heading}
            links={col1.links}
          />
          <FooterCol
            heading="LONGEVITY"
            links={[
              { label: "NAD+", href: "/women/peptides/nad-plus" },
              { label: "MOTS-c", href: "/women/peptides/mots-c" },
              { label: "Epitalon", href: "/women/peptides/epitalon" },
              { label: "All longevity", href: "/women/protocols" },
            ]}
          />
          <FooterCol
            heading="COMPANY"
            links={[
              { label: "About", href: "/about" },
              { label: "Physicians", href: "/physicians" },
              { label: "Science", href: "/science" },
              { label: "How it works", href: "/how-it-works" },
              { label: "Lab testing", href: "/lab-testing" },
              { label: "Pricing", href: "/pricing" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter Tight', sans-serif" }}>
            © 2026 Nexphoria · All rights reserved
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Terms", href: "/legal/terms" },
              { label: "Privacy", href: "/legal/privacy" },
              { label: "Telehealth Consent", href: "/legal/telehealth-consent" },
              { label: "Refund Policy", href: "/legal/refund-policy" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs no-underline hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter Tight', sans-serif" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter Tight', sans-serif", maxWidth: "680px" }}>
          These statements have not been evaluated by the Food and Drug Administration. Nexphoria peptide protocols are prescribed off-label by licensed US physicians and compounded in FDA-registered 503A pharmacies. They are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p
        className="mb-4"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        {heading}
      </p>
      <ul className="flex flex-col gap-2 list-none">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm no-underline hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Inter Tight', sans-serif" }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
