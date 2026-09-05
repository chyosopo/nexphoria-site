import { useEffect, useState } from "react";
import { Link } from "wouter";
import { BUSINESS } from "@/data/compliance";
import { Logo } from "./Logo";
import "@/styles/footer.css";

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

const DESKTOP = "(min-width: 1024px)";

/* Above 1024 px the groups are a plain grid, so every group is open; below
   it they are collapsible and none is open until the reader opens it. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window === "undefined" ? true : window.matchMedia(DESKTOP).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP);
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

// Editorial footer — Explore / Legal / Contact. Trimmed to the spine
// (Chiya 2026-09-05): the shelf, the protocols tier, the one teaching page,
// and the FAQ. Blood testing and who-prescribes now live inside How it works.
const COLUMNS: FooterColumn[] = [
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

/* The compliance line. Each chip is a fact; LegitScript is stated as in
   progress until the certification is granted. */
const CHIPS: { label: string; fact: string }[] = [
  { label: "503A pharmacy", fact: "Compounded in state-licensed 503A pharmacies" },
  { label: "All 50 states", fact: "US-licensed physicians in all 50 states" },
  { label: "HIPAA", fact: "Encrypted intake, handled under HIPAA" },
  { label: "CLIA-certified labs", fact: "CLIA-certified laboratory partners" },
  { label: "LegitScript in progress", fact: "LegitScript certification in progress" },
];

const QUICK_LEGAL: FooterLink[] = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Telehealth consent", href: "/legal/telehealth-consent" },
  { label: "Refund policy", href: "/legal/refund-policy" },
];

export function Footer({ variant = "shared" }: FooterProps) {
  void variant;
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <footer className="nx-footer" data-testid="footer">
      {/* The wordmark, set large (enhanced.com study, 2026-09-05): the name
          once, at the width of the page, above the columns. Decorative; the
          logo below carries the accessible name. */}
      <div className="nx-container nx-footer__mark" aria-hidden="true">
        <span data-testid="footer-wordmark">NEXPHORIA</span>
      </div>

      <div className="nx-container nx-footer__body">
        <div className="nx-footer__top">
          <div className="nx-footer__brand">
            <Logo variant="light" markSize={26} />
            <p className="nx-footer__lede">
              New medicines as they become available, and the research behind them. Nothing else.
            </p>
            <p className="nx-footer__lede">
              Questions: <a href="mailto:hello@nexphoria.com">hello@nexphoria.com</a>
            </p>
          </div>

          <nav className="nx-footer__cols" aria-label="Footer">
            {COLUMNS.map((col) => (
              <details
                key={col.heading}
                className="nx-footer__group"
                data-testid={col.testid}
                open={isDesktop || !!open[col.heading]}
                onToggle={(e) => {
                  const next = (e.currentTarget as HTMLDetailsElement).open;
                  setOpen((prev) => (prev[col.heading] === next ? prev : { ...prev, [col.heading]: next }));
                }}
              >
                <summary className="nx-footer__summary">
                  {col.heading}
                  <svg className="nx-footer__caret" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <ul className="nx-footer__list">
                  {col.links.map(({ label, href }) => {
                    const external = href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http");
                    const testid = `footer-link-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
                    return (
                      <li key={label}>
                        {external ? (
                          <a href={href} data-testid={testid}>{label}</a>
                        ) : (
                          <Link href={href} data-testid={testid}>{label}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </details>
            ))}
          </nav>
        </div>

        {/* The compliance line */}
        <ul className="nx-footer__chips" data-testid="footer-trust-badges">
          {CHIPS.map((chip) => (
            <li key={chip.label} className="nx-footer__chip" title={chip.fact}>{chip.label}</li>
          ))}
        </ul>

        {/* Copyright with the quick legal links */}
        <div className="nx-footer__bottom">
          <div className="nx-footer__copy">
            <span className="nx-footer__copylogo"><Logo variant="light" withSubmark={false} markSize={18} /></span>
            <span data-testid="footer-copyright">© 2026 Nexphoria · All rights reserved</span>
          </div>
          <ul className="nx-footer__quick">
            {QUICK_LEGAL.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} data-testid={`footer-legal-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Regulatory disclaimers, verbatim */}
        <div className="nx-footer__fine">
          <p data-testid="footer-fda-disclaimer">
            These statements have not been evaluated by the Food and Drug Administration. Nexphoria peptide protocols are prescribed off-label by licensed US physicians and compounded in state-licensed 503A pharmacies. They are not intended to diagnose, treat, cure, or prevent any disease. From-pricing shown throughout the site; medication is dispensed only if a licensed provider determines a prescription is appropriate. Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. Ozempic®, Wegovy®, Mounjaro®, and Zepbound® are registered trademarks of their respective owners; Nexphoria is not affiliated with, or endorsed by, Novo Nordisk or Eli Lilly.
          </p>
          <p data-testid="footer-usp-line">Compounded under USP &lt;797&gt; in U.S. 503A pharmacies</p>
          <p data-testid="footer-imagery-line">Lifestyle imagery is illustrative. Product photography shows the actual vials.</p>
        </div>
      </div>
    </footer>
  );
}
