import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

interface FooterProps {
  variant?: "women" | "men" | "shared";
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  testid: string;
  links: FooterLink[];
}

export function Footer({ variant = "shared" }: FooterProps) {
  const pharmacyBase =
    variant === "men" ? "/men/peptides" :
    variant === "women" ? "/women/peptides" :
    "/peptides";
  const assessmentBase = "/assessment";

  // 4-column editorial footer — Product / Company / Legal / Contact.
  const columns: FooterColumn[] = [
    {
      heading: "Product",
      testid: "footer-col-product",
      links: [
        { label: "All peptides", href: pharmacyBase },
        { label: "Doctor-built stacks", href: "/stacks" },
        { label: "Build a stack", href: "/stacks/build" },
        { label: "Bloodwork", href: "/bloodwork" },
        { label: "Custom protocol", href: assessmentBase },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      heading: "Company",
      testid: "footer-col-company",
      links: [
        { label: "About", href: "/about" },
        { label: "Physicians", href: "/physicians" },
        { label: "The science", href: "/science" },
        { label: "How it works", href: "/how-it-works" },
        { label: "Journal", href: "/journal" },
        { label: "Lab testing", href: "/lab-testing" },
      ],
    },
    {
      heading: "Legal",
      testid: "footer-col-legal",
      links: [
        { label: "Terms of service", href: "/legal/terms" },
        { label: "Privacy policy", href: "/legal/privacy" },
        { label: "Telehealth consent", href: "/legal/telehealth-consent" },
        { label: "Refund policy", href: "/legal/refund-policy" },
      ],
    },
    {
      heading: "Contact",
      testid: "footer-col-contact",
      links: [
        { label: "Support center", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "care@nexphoria.com", href: "mailto:care@nexphoria.com" },
        { label: "Member login", href: "/assessment" },
      ],
    },
  ];

  return (
    <footer className="nx-footer" data-testid="footer">
      <div className="nx-container py-16">
        {/* Top row — brand/newsletter (left) + 4 nav columns (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2.6fr] gap-12 pb-12 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {/* Brand + newsletter capture */}
          <div>
            <Logo variant="light" markSize={26} />
            <p
              className="mt-4 text-sm"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'General Sans', system-ui, sans-serif",
                lineHeight: 1.6,
                maxWidth: "34ch",
              }}
            >
              Early access to new protocols, published research, and member-only pricing.
            </p>
            <form
              className="mt-5 flex gap-2 max-w-sm"
              onSubmit={(e) => e.preventDefault()}
              data-testid="footer-newsletter-form"
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address for the newsletter"
                className="flex-1 px-4 py-2.5 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/50 transition-colors"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
                data-testid="footer-email-input"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  backgroundColor: "var(--nx-acid)",
                  color: "var(--nx-fg)",
                  letterSpacing: "0.04em",
                }}
                data-testid="footer-email-submit"
              >
                Join
              </button>
            </form>
          </div>

          {/* 4 nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <FooterCol key={col.heading} column={col} />
            ))}
          </div>
        </div>

        {/* Regulatory / trust badges row */}
        <div
          className="py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
          data-testid="footer-trust-badges"
        >
          {[
            { label: "503A · state-licensed", sub: "Compounding pharmacy" },
            { label: "All 50 states", sub: "US-licensed physicians" },
            { label: "HIPAA", sub: "Encrypted intake" },
            { label: "CLIA-Certified Laboratories", sub: "Lab partners" },
            { label: "LegitScript", sub: "Pending verification" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center text-center"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {b.label}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.66)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {b.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom bar — copyright + small logo repeat + quick legal */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Logo variant="light" withSubmark={false} markSize={18} />
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.66)", fontFamily: "'General Sans', system-ui, sans-serif" }}
              data-testid="footer-copyright"
            >
              © 2026 Nexphoria · All rights reserved
            </span>
          </div>
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
                style={{ color: "rgba(255,255,255,0.66)", fontFamily: "'General Sans', system-ui, sans-serif" }}
                data-testid={`footer-legal-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Regulatory disclaimers */}
        <p
          className="mt-6 text-xs leading-relaxed"
          style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'General Sans', system-ui, sans-serif", maxWidth: "720px" }}
          data-testid="footer-research-disclaimer"
        >
          For research purposes only. These statements have not been evaluated by the Food and Drug Administration. Nexphoria peptide protocols are prescribed off-label by licensed US physicians and compounded in state-licensed 503A pharmacies. They are not intended to diagnose, treat, cure, or prevent any disease. From-pricing shown throughout the site; medication is dispensed only if a licensed provider determines a prescription is appropriate. Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. Ozempic®, Wegovy®, Mounjaro®, and Zepbound® are registered trademarks of their respective owners; Nexphoria is not affiliated with, or endorsed by, Novo Nordisk or Eli Lilly.
        </p>
        <p
          className="mt-3 text-xs"
          style={{ color: "rgba(255,255,255,0.66)", fontFamily: "'General Sans', system-ui, sans-serif", letterSpacing: "0.06em" }}
          data-testid="footer-usp-line"
        >
          Compounded under USP &lt;797&gt; in U.S. 503A pharmacies
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ column }: { column: FooterColumn }) {
  return (
    <div data-testid={column.testid}>
      <p
        className="mb-4"
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.66)",
        }}
      >
        {column.heading}
      </p>
      <ul className="flex flex-col gap-2 list-none m-0">
        {column.links.map(({ label, href }) => {
          const external = href.startsWith("mailto:") || href.startsWith("http");
          const testid = `footer-link-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
          const cls = "group inline-flex items-center gap-1 text-sm no-underline hover:text-white transition-colors";
          const style = { color: "rgba(255,255,255,0.65)", fontFamily: "'General Sans', system-ui, sans-serif" };
          if (external) {
            return (
              <li key={label}>
                <a href={href} className={cls} style={style} data-testid={testid}>
                  {label}
                </a>
              </li>
            );
          }
          return (
            <li key={label}>
              <Link href={href} className={cls} style={style} data-testid={testid}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
