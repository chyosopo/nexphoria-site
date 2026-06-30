import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout navVariant="gate" hideFooter>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6" data-testid="not-found-page">
        <p className="nx-eyebrow mb-4">404</p>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
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
            fontFamily: "'Inter Tight', sans-serif",
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
          <Link href="/women" className="nx-cta-ghost" data-testid="not-found-women-link">
            For women
          </Link>
          <Link href="/men" className="nx-cta-ghost" data-testid="not-found-men-link">
            For men
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
