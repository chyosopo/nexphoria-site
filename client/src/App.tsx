
function R({ to }: { to: string }) { const [, __n] = __uL(); useEffect(() => { __n(to, { replace: true }); }, []); return null; }
import { useEffect } from "react";
import { useLocation as __uL } from "wouter";
import { track } from "@/lib/analytics";
import { Suspense, lazy } from "react";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CartProvider } from "@/contexts/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MotionRoot } from "@/motion";
import { PageTransition } from "@/motion/PageTransition";

// Pages — eagerly loaded (fast/common paths)

import NotFound from "@/pages/not-found";

// Pages — lazy loaded (code-split)
// ─── CUT TO THE SPINE (Chiya 2026-09-05) ───────────────────────────────────
// The site had grown to ~30 rendered pages: two blood pages, two quiz pages,
// three overlapping education pages, a blog, and a scatter of brand pages.
// Chiya: "lean tight and loving amazing Peptides site … why does it need 5000
// different pages." The spine is now Home · Medicines · Product · How-it-works
// · Cart · Checkout, with protocols shown as a tier and compliance pages in the
// footer. Everything cut REDIRECTS (URLs are in the wild / sitemap history), and
// its real content folds into How-it-works.
const FrontDoor = lazy(() => import("@/pages/FrontDoor"));
const StackPage = lazy(() => import("@/pages/StackPage"));
const ProtocolsIndex = lazy(() => import("@/pages/ProtocolsIndex"));
const SoloPDP = lazy(() => import("@/pages/SoloPDP"));
const PeptidesCatalog = lazy(() => import("@/pages/PeptidesCatalog"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQPage = lazy(() => import("@/pages/FAQ"));
const LegalIndex = lazy(() => import("@/pages/legal/LegalIndex"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const Messaging = lazy(() => import("@/pages/legal/Messaging"));
const TelehealthConsent = lazy(() => import("@/pages/legal/TelehealthConsent"));
const RefundPolicy = lazy(() => import("@/pages/legal/RefundPolicy"));
const HipaaNotice = lazy(() => import("@/pages/legal/HipaaNotice"));
const PrescribingPolicy = lazy(() => import("@/pages/legal/PrescribingPolicy"));
const StateAvailability = lazy(() => import("@/pages/legal/StateAvailability"));

function AppRouter() {
  // SPA route changes emit no navigation to analytics on their own — fire a
  // page_view on every path change so traffic, entry pages, and funnel steps
  // become measurable the moment a vendor is wired.
  const [__loc] = __uL();
  useEffect(() => { track("page_view", { path: __loc }); }, [__loc]);
  return (
    <RouteErrorBoundary>
    <PageTransition>
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {/* ══ THE SPINE ══ Home · Medicines · Product · How-it-works · Cart · Checkout */}
        <Route path="/" component={FrontDoor} />

        {/* Medicines — the one shelf. Renders world-neutral so it self-canonicalizes to /peptides. */}
        <Route path="/peptides">{() => <PeptidesCatalog />}</Route>
        <Route path="/peptides/:slug">{(p) => <SoloPDP slug={(p as {slug:string}).slug} />}</Route>

        {/* Protocols — a tier of the shelf (multi-peptide bundles), surfaced inside Medicines */}
        <Route path="/stacks" component={ProtocolsIndex} />
        <Route path="/stacks/:slug">
          {(params) => <StackPage slug={(params as { slug: string }).slug} />}
        </Route>

        {/* How it works — the one page that teaches (journey · blood testing · who prescribes) */}
        <Route path="/how-it-works" component={HowItWorks} />

        {/* Cart + Checkout (pharmacy flow) */}
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />

        {/* Kept surfaces: FAQ carries the physician/pharmacy address disclosure LegitScript
            checks for; Contact is the support channel A2P/LegitScript require. */}
        <Route path="/faq" component={FAQPage} />
        <Route path="/contact" component={Contact} />

        {/* ── REDIRECTS ── every cut page keeps its URL alive (in the wild / sitemap
            history / possibly indexed) and lands on its nearest surviving surface.
            Cut 2026-09-05 (spine): the two worlds, the second blood page, both
            quiz pages, the blog, and the scattered brand/education pages. */}
        <Route path="/gate"><R to="/" /></Route>
        <Route path="/goals/:slug"><R to="/peptides" /></Route>
        <Route path="/men"><R to="/" /></Route>
        <Route path="/women"><R to="/" /></Route>
        <Route path="/men/peptides"><R to="/peptides" /></Route>
        <Route path="/women/peptides"><R to="/peptides" /></Route>
        <Route path="/men/peptides/:slug">
          {(params) => <R to={`/peptides/${(params as { slug: string }).slug}`} />}
        </Route>
        <Route path="/women/peptides/:slug">
          {(params) => <R to={`/peptides/${(params as { slug: string }).slug}`} />}
        </Route>
        <Route path="/men/protocols"><R to="/stacks" /></Route>
        <Route path="/women/protocols"><R to="/stacks" /></Route>
        <Route path="/protocols"><R to="/stacks" /></Route>
        <Route path="/stacks/build"><R to="/stacks" /></Route>
        {/* Education folds into /how-it-works */}
        <Route path="/what-happens-next"><R to="/how-it-works" /></Route>
        <Route path="/peptides-101"><R to="/how-it-works" /></Route>
        <Route path="/science"><R to="/peptides" /></Route>
        <Route path="/physicians"><R to="/how-it-works" /></Route>
        <Route path="/about"><R to="/how-it-works" /></Route>
        {/* Blood testing folds into /how-it-works */}
        <Route path="/labs"><R to="/how-it-works" /></Route>
        <Route path="/lab-testing"><R to="/how-it-works" /></Route>
        <Route path="/bloodwork"><R to="/how-it-works" /></Route>
        <Route path="/blood-work"><R to="/how-it-works" /></Route>
        {/* Guided quizzes retired — pure browse */}
        <Route path="/quiz"><R to="/peptides" /></Route>
        <Route path="/assessment"><R to="/peptides" /></Route>
        {/* Blog retired — education lives on each medicine's page */}
        <Route path="/journal"><R to="/" /></Route>
        <Route path="/journal/:slug"><R to="/" /></Route>
        <Route path="/catalog"><R to="/peptides" /></Route>
        <Route path="/pricing"><R to="/peptides" /></Route>
        <Route path="/community"><R to="/" /></Route>
        <Route path="/gift"><R to="/" /></Route>
        <Route path="/gift/claim"><R to="/" /></Route>
        <Route path="/booking"><R to="/" /></Route>

        {/* Legal */}
        <Route path="/legal" component={LegalIndex} />
        <Route path="/legal/terms" component={Terms} />
        <Route path="/legal/privacy" component={Privacy} />
        <Route path="/legal/messaging" component={Messaging} />
        <Route path="/legal/telehealth-consent" component={TelehealthConsent} />
        <Route path="/legal/refund-policy" component={RefundPolicy} />
        <Route path="/legal/hipaa-notice" component={HipaaNotice} />
        <Route path="/legal/prescribing-policy" component={PrescribingPolicy} />
        <Route path="/legal/state-availability" component={StateAvailability} />
        {/* Short-path aliases so external links to /privacy and /terms resolve */}
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
    </PageTransition>
    </RouteErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionRoot>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <ScrollProgress />
          {/* Real path routing (browser history). The app root is detected at
              runtime in client/index.html (github.io project page → /<repo>,
              custom domain → /) and exposed as __NX_APP_BASE__; the same
              script writes a <base> tag so relative asset/image URLs resolve
              against the app root. 404.html handles deep-link restores. */}
          <Router base={(window as unknown as { __NX_APP_BASE__?: string }).__NX_APP_BASE__ || ""}>
            <AppRouter />
            <CartDrawer />
          </Router>
        </CartProvider>
      </TooltipProvider>
      </MotionRoot>
    </QueryClientProvider>
  );
}

export default App;
