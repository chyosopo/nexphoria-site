import { useEffect } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo } from "@/lib/seo";

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
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6" data-testid="not-found-page">
        <p className="nx-eyebrow mb-4">404</p>
        <h1
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: "var(--nx-fg)",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Page not found.
        </h1>
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "1rem",
            color: "var(--nx-fg-graphite)",
            marginBottom: "2.5rem",
            maxWidth: "360px",
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="nx-cta-cobalt" data-testid="not-found-home-link">
            Return home →
          </Link>
          <Link href="/peptides" className="nx-cta-ghost" data-testid="not-found-peptides-link">
            Browse peptides
          </Link>
          <Link href="/assessment" className="nx-cta-ghost" data-testid="not-found-assessment-link">
            Take the assessment
          </Link>
          <Link href="/journal" className="nx-cta-ghost" data-testid="not-found-journal-link">
            Journal
          </Link>
          <Link href="/contact" className="nx-cta-ghost" data-testid="not-found-contact-link">
            Contact us
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
