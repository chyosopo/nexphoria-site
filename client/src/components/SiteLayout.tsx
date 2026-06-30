import { Nav } from "./Nav";
import { Footer } from "./Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
  navVariant?: "women" | "men" | "gate";
  footerVariant?: "women" | "men" | "shared";
  hideFooter?: boolean;
}

export function SiteLayout({
  children,
  navVariant = "gate",
  footerVariant = "shared",
  hideFooter = false,
}: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-[var(--nx-fg)] focus:text-[var(--nx-bg)] focus:px-4 focus:py-2 focus:z-50"
      >
        Skip to main content
      </a>
      <Nav variant={navVariant} />
      <main id="main-content" className="flex-1 pt-14">{children}</main>
      {!hideFooter && <Footer variant={footerVariant} />}
    </div>
  );
}
