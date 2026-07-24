import { Suspense, lazy } from "react";
import { anchor } from "@/lib/anchors";
import { useLocation } from "wouter";

type World = "men" | "women";
let __worldMemory: World = "men";
function readStoredWorld(): World {
  try {
    const v = window.localStorage.getItem("nx-world");
    if (v === "women" || v === "men") return v;
  } catch { /* sandboxed iframe — memory fallback */ }
  return __worldMemory;
}
function storeWorld(w: World) {
  __worldMemory = w;
  try { window.localStorage.setItem("nx-world", w); } catch { /* ignore */ }
}
export function resolveWorld(path: string): World {
  if (path.startsWith("/women")) { storeWorld("women"); return "women"; }
  if (path.startsWith("/men"))   { storeWorld("men");   return "men"; }
  if (path === "/" || path === "/gate") return "men"; // neutral choosing surfaces keep the base palette
  return readStoredWorld();
}
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { AnnouncementBar } from "./AnnouncementBar";
import { TrustBar } from "./TrustBar";
// Lazy — pulls framer-motion; keep it off the first-paint critical path.
const ExitIntentModal = lazy(() =>
  import("./ExitIntentModal").then((m) => ({ default: m.ExitIntentModal })),
);

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
  const [__loc] = useLocation();
  /* ── World resolution with persistence ──
     Entering /women or /men declares the visitor's world; every SHARED page
     (stacks, blood work, assessment, cart, checkout, legal…) then inherits it,
     so a woman never snaps back to azure the moment she leaves /women.
     The gate and the showcase root stay neutral (base palette) — they are
     the choosing surfaces. Storage is best-effort: in sandboxed iframes
     (no localStorage) the world still persists for the session in memory. */
  const __world = resolveWorld(__loc);
  const resolvedNavVariant = navVariant ?? variant ?? "showcase";
  return (
    <div className="min-h-screen flex flex-col" data-world={__world}>
      <a
        href={anchor("#main-content")}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-[var(--nx-fg)] focus:text-[var(--nx-bg)] focus:px-4 focus:py-2 focus:z-50"
      >
        Skip to main content
      </a>
      {!hideAnnouncementBar && <AnnouncementBar />}
      <Nav variant={resolvedNavVariant} />
      {!hideTrustBar && <TrustBar />}
      <main id="main-content" className="flex-1">{children}</main>
      {!hideFooter && <Footer variant={footerVariant === "shared" ? "shared" : footerVariant} />}
      <Suspense fallback={null}>
        <ExitIntentModal />
      </Suspense>
    </div>
  );
}
