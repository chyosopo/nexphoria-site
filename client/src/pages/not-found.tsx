import { useEffect } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { Compass, Search, MapPin, ArrowRight, Layers, FlaskConical, Stethoscope, Mail } from "lucide-react";

const DESTINATIONS: { href: string; label: string; note: string; Icon: typeof Layers; testid: string }[] = [
  { href: "/stacks", label: "Protocols", note: "Seven physician-curated stacks", Icon: Layers, testid: "not-found-protocols-link" },
  { href: "/peptides", label: "Peptides", note: "The full nineteen-item formulary", Icon: FlaskConical, testid: "not-found-peptides-link" },
  { href: "/how-it-works", label: "How it works", note: "Intake, bloodwork, retest", Icon: Stethoscope, testid: "not-found-hiw-link" },
  { href: "/contact", label: "Contact", note: "Reach a coordinator", Icon: Mail, testid: "not-found-contact-link" },
];

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "This page doesn’t exist or has moved. Browse physician-prescribed peptide protocols at Nexphoria.",
    path: "/404",
  });

  // noindex — 404 page should never be crawled
  useEffect(() => {
    let metaRobots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex, nofollow");
    return () => {
      metaRobots?.setAttribute("content", "index, follow, max-image-preview:large");
    };
  }, []);

  return (
    <SiteLayout navVariant="gate" hideFooter>
      <section className="nx-gradient-hero relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ minHeight: "82vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)", zIndex: 1 }} data-testid="not-found-page">

          {/* icon composition — a compass that has lost its bearing */}
          <div className="nx-hero-frame" aria-hidden style={{ position: "relative", width: 132, height: 132, marginBottom: "1.8rem" }}>
            <span className="nx-icon-circle" style={{ width: 108, height: 108, position: "absolute", left: 12, top: 12 }}>
              <Compass size={46} strokeWidth={1.5} />
            </span>
            <span className="nx-icon-circle" style={{ width: 42, height: 42, position: "absolute", right: 0, top: 4 }}>
              <Search size={18} strokeWidth={2} />
            </span>
            <span className="nx-icon-circle" style={{ width: 38, height: 38, position: "absolute", left: 0, bottom: 6 }}>
              <MapPin size={16} strokeWidth={2} />
            </span>
          </div>

          <p className="nx-eyebrow" style={{ marginBottom: "0.9rem" }}>Error 404</p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", letterSpacing: "-0.015em", color: "var(--nx-fg)", lineHeight: 1.05, maxWidth: "16ch" }}>
            This page isn’t on the shelf.
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", maxWidth: "44ch", lineHeight: 1.6, marginTop: "1rem" }}>
            The address you followed doesn’t exist or has moved. Here are the routes most people are looking for.
          </p>

          <div style={{ marginTop: "1.9rem" }}>
            <Link href="/" className="nx-cta-cobalt" data-testid="not-found-home-link">
              Return home →
            </Link>
          </div>

          {/* suggested destinations */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, marginTop: "2.6rem", width: "100%", maxWidth: 640, textAlign: "left" }}>
            {DESTINATIONS.map((d) => (
              <Link key={d.href} href={d.href} className="nx-feature-card" data-testid={d.testid} style={{ display: "flex", alignItems: "center", gap: 14, padding: "1rem 1.15rem", textDecoration: "none" }}>
                <span className="nx-icon-circle" aria-hidden><d.Icon size={19} strokeWidth={1.9} /></span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.1 }}>{d.label}</span>
                  <span style={{ display: "block", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: 2 }}>{d.note}</span>
                </span>
                <ArrowRight size={17} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
