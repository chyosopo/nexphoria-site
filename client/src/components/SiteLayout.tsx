import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { AnnouncementBar } from "./AnnouncementBar";
import { TrustBar } from "./TrustBar";
import { ExitIntentModal } from "./ExitIntentModal";

interface SiteLayoutProps {
  children: React.ReactNode;
  navVariant?: "showcase" | "women" | "men" | "gate";
  footerVariant?: "women" | "men" | "shared";
  hideFooter?: boolean;
  hideAnnouncementBar?: boolean;
  hideTrustBar?: boolean;
  /** Legacy prop alias used by Cart.tsx & friends */
  variant?: "showcase" | "women" | "men" | "gate";
}

export function SiteLayout({
  children,
  navVariant,
  footerVariant = "shared",
  hideFooter = false,
  hideAnnouncementBar = false,
  hideTrustBar = false,
  variant,
}: SiteLayoutProps) {
  const resolvedNavVariant = navVariant ?? variant ?? "showcase";
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-[var(--nx-fg)] focus:text-[var(--nx-bg)] focus:px-4 focus:py-2 focus:z-50"
      >
        Skip to main content
      </a>
      {!hideAnnouncementBar && <AnnouncementBar />}
      <Nav variant={resolvedNavVariant} />
      {!hideTrustBar && <TrustBar />}
      <main id="main-content" className="flex-1">{children}</main>
      {!hideFooter && <Footer variant={footerVariant === "shared" ? "shared" : footerVariant} />}
      <ExitIntentModal />
    </div>
  );
}
