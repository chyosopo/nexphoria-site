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
      <Nav variant={navVariant} />
      <main className="flex-1 pt-14">{children}</main>
      {!hideFooter && <Footer variant={footerVariant} />}
    </div>
  );
}
