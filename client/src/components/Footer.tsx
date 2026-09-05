import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { BUSINESS } from "@/data/compliance";
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
  /* Rise-in for the wordmark: one observer, fires once, then disconnects.
     The global reduced-motion floor collapses the transition to instant. */
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-inview");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-inview");
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Newsletter capture → /api/waitlist (same lead sink as ExitIntentModal).
  // Degrades gracefully on static hosts where the API isn't running.
  // Editorial footer — Explore / Legal / Contact. Trimmed to the spine
  // (Chiya 2026-09-05): the shelf, the protocols tier, the one teaching page,
  // and the FAQ. Blood testing and who-prescribes now live inside How it works.
  const columns: FooterColumn[] = [
    {
      heading: "Explore",
      testid: "footer-col-product",
      links: [
        { label: "All medicines", href: "/peptides" },
        { label: "Protocols", href: "/stacks" },
        { label: "How it works", href: "/how-it-works" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      heading: "Legal",
      testid: "footer-col-legal",
      links: [
        { label: "Terms of service", href: "/legal/terms" },
        { label: "Privacy policy", href: "/legal/privacy" },
        { label: "Messaging terms (SMS)", href: "/legal/messaging" },
        { label: "HIPAA notice", href: "/legal/hipaa-notice" },
        { label: "Telehealth consent", href: "/legal/telehealth-consent" },
        { label: "Prescribing policy", href: "/legal/prescribing-policy" },
        { label: "State availability", href: "/legal/state-availability" },
        { label: "Refund policy", href: "/legal/refund-policy" },
      ],
    },
    {
      heading: "Contact",
      testid: "footer-col-contact",
      links: [
        { label: "Support center", href: "/contact" },
        { label: "hello@nexphoria.com", href: "mailto:hello@nexphoria.com" },
        { label: BUSINESS.phone, href: `tel:${BUSINESS.phoneE164}` },
      ],
    },
  ];

  return (
    <footer className="nx-footer" data-testid="footer">
      {/* The wordmark, set large (enhanced.com study, 2026-09-05): the name
          once, at the size of the page, above the columns. Decorative; the
          logo below carries the accessible name. */}
      <div className="nx-container nx-footer__mark" aria-hidden="true">
        <span style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}>NEXPHORIA</span>
      </div>
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
              New medicines as they become available, and the research behind them. Nothing else.
            </p>
            <p className="mt-5 text-sm" style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: "34ch" }}>
              Questions: <a href="mailto:hello@nexphoria.com" style={{ color: "var(--nx-ceramic)", fontWeight: 600 }}>hello@nexphoria.com</a>
            </p>
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
            { label: "LegitScript", sub: "Certification in progress" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center text-center"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
            >
              <span
                style={{
                  fontSize: "var(--nx-t-2xs)",
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "var(--nx-ls-caps)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {b.label}
              </span>
              <span
                style={{
                  fontSize: "var(--nx-t-2xs)",
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
          data-testid="footer-fda-disclaimer"
        >
          These statements have not been evaluated by the Food and Drug Administration. Nexphoria peptide protocols are prescribed off-label by licensed US physicians and compounded in state-licensed 503A pharmacies. They are not intended to diagnose, treat, cure, or prevent any disease. From-pricing shown throughout the site; medication is dispensed only if a licensed provider determines a prescription is appropriate. Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. Ozempic®, Wegovy®, Mounjaro®, and Zepbound® are registered trademarks of their respective owners; Nexphoria is not affiliated with, or endorsed by, Novo Nordisk or Eli Lilly.
        </p>
        <p
          className="mt-3 text-xs"
          style={{ color: "rgba(255,255,255,0.66)", fontFamily: "'General Sans', system-ui, sans-serif", letterSpacing: "0.06em" }}
          data-testid="footer-usp-line"
        >
          Compounded under USP &lt;797&gt; in U.S. 503A pharmacies
        </p>
        <p
          className="mt-3 text-xs"
          style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'General Sans', system-ui, sans-serif" }}
          data-testid="footer-imagery-line"
        >
          Lifestyle imagery is illustrative. Product photography shows the actual vials.
        </p>
      </div>

      {/* The signature — full-bleed, outside the container */}
      <span ref={wordmarkRef} className="nx-footer-wordmark" aria-hidden="true" data-testid="footer-wordmark">
        NEXPHORIA
      </span>
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
          fontSize: "var(--nx-t-2xs)",
          fontWeight: 500,
          letterSpacing: "var(--nx-ls-caps)",
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
