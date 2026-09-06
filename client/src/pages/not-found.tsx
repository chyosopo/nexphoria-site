/* ═══ 404 — one tile (2026-09-05)
   The address that did not resolve, the way home, and the four routes most
   people are looking for, in one ceramic tile. The page's own classes live
   in client/src/styles/support.css. */
import { useEffect } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { ArrowRight, Layers, FlaskConical, Stethoscope, Mail } from "lucide-react";
import "@/styles/support.css";

const DESTINATIONS: { href: string; label: string; note: string; Icon: typeof Layers; testid: string }[] = [
  { href: "/stacks", label: "Protocols", note: "Medicines prescribed together", Icon: Layers, testid: "not-found-protocols-link" },
  { href: "/peptides", label: "Medicines", note: "Every one, by what it treats", Icon: FlaskConical, testid: "not-found-peptides-link" },
  { href: "/how-it-works", label: "How it works", note: "The five steps, and the panel", Icon: Stethoscope, testid: "not-found-hiw-link" },
  { href: "/contact", label: "Contact", note: "Support and press", Icon: Mail, testid: "not-found-contact-link" },
];

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "This page does not exist or has moved. The medicines, the protocols and how it works are a click away.",
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
      <section className="nx-container sp-404" aria-labelledby="not-found-title" data-testid="not-found-page">
        <div className="sp-404__tile">
          <p className="nx-eyebrow">Error 404</p>
          <h1 id="not-found-title" className="nx-dsh1" style={{ fontFamily: S }}>That page does not exist.</h1>
          <p className="nx-lede" style={{ fontFamily: F }}>
            These are the pages people are usually looking for.
          </p>
          <div className="sp-404__cta">
            <Link href="/" className="nx-cta-cobalt" data-testid="not-found-home-link" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)" }}>
              Return home
            </Link>
          </div>
          <ul className="sp-404__links" aria-label="Where most people are going">
            {DESTINATIONS.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="sp-404__link" data-testid={d.testid}>
                  <d.Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontFamily: F }}>{d.label}</strong>
                    <small style={{ fontFamily: F }}>{d.note}</small>
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
