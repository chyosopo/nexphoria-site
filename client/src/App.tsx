
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

// Pages — eagerly loaded (fast/common paths)

import NotFound from "@/pages/not-found";

// Pages — lazy loaded (code-split)
const Category = lazy(() => import("@/pages/Category"));
const Booking = lazy(() => import("@/pages/Booking"));
const FrontDoor = lazy(() => import("@/pages/FrontDoor"));
const Peptides101 = lazy(() => import("@/pages/Peptides101"));
const Assessment = lazy(() => import("@/pages/Assessment"));
const StackPage = lazy(() => import("@/pages/StackPage"));
const ProtocolsIndex = lazy(() => import("@/pages/ProtocolsIndex"));
const SoloPDP = lazy(() => import("@/pages/SoloPDP"));
const PeptidesCatalog = lazy(() => import("@/pages/PeptidesCatalog"));
const BuildYourStack = lazy(() => import("@/pages/BuildYourStack"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const WhatHappensNext = lazy(() => import("@/pages/WhatHappensNext"));
const Gate = lazy(() => import("@/pages/Gate"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Journal = lazy(() => import("@/pages/Journal"));
const JournalArticle = lazy(() => import("@/pages/JournalArticle"));
const Physicians = lazy(() => import("@/pages/Physicians"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const About = lazy(() => import("@/pages/About"));
const Community = lazy(() => import("@/pages/Community"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQPage = lazy(() => import("@/pages/FAQ"));
const Bloodwork = lazy(() => import("@/pages/Bloodwork"));
const Labs = lazy(() => import("@/pages/Labs"));
const Gift = lazy(() => import("@/pages/Gift"));
const GiftClaim = lazy(() => import("@/pages/GiftClaim"));
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
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {/* Front door (ROADMAP 1.2) — value prop in 5 seconds; the old
            her/him photo gate lives on at /gate for returning users */}
        <Route path="/" component={FrontDoor} />
        <Route path="/gate" component={Gate} />

        {/* Gender-neutral pharmacy shelf — render the world-neutral catalog
            DIRECTLY (no redirect). A prior `<R to="/men/peptides">` bounced this
            route into the men world, so the prerendered /peptides/index.html
            snapshotted the men catalog and self-canonicalized to /men/peptides.
            But /peptides is its OWN canonical route in sitemap.xml (STATIC_ROUTES),
            so the snapshot's canonical+og:url=/men/peptides was a sitemap↔canonical
            contradiction — Search Console drops it as "Duplicate, submitted URL not
            selected as canonical". Rendering PeptidesCatalog with no world makes it
            self-canonicalize to /peptides; the /men|/women variants are unchanged. */}
        <Route path="/peptides">{() => <PeptidesCatalog />}</Route>
        <Route path="/peptides/:slug">{(p) => <SoloPDP slug={(p as {slug:string}).slug} />}</Route>
        <Route path="/goals/:slug" component={Category} />

        {/* ── TWO WORLDS RETIRED (Chiya 2026-08-13) ──────────────────
            The men/women split doubled every surface — two homes, two
            catalogs, two PDP variants, two imagery casts — to differentiate a
            four-SKU formulary that is identical for both. It also forced every
            component to thread a `world` prop and every goal tile to have two
            photographs. One site now.

            The old URLs REDIRECT rather than 404: they are in the wild, in the
            sitemap history, and possibly indexed. /men and /women land on the
            home page; the per-slug PDPs land on their neutral canonical, which
            is the URL they already declared via <link rel="canonical"> anyway. */}
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

        {/* Stacks (pharmacy tier 2) */}
        <Route path="/stacks" component={ProtocolsIndex} />
        <Route path="/stacks/build" component={BuildYourStack} />
        <Route path="/stacks/:slug">
          {(params) => <StackPage slug={(params as { slug: string }).slug} />}
        </Route>

        {/* Blood testing as a product (2026-09-04) */}
        <Route path="/labs" component={Labs} />

        {/* Cart + Checkout (pharmacy flow) */}
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/what-happens-next" component={WhatHappensNext} />

        {/* Shared informational */}
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/peptides-101" component={Peptides101} />
        {/* SCIENCE — DELETED 2026-08-13 (Chiya: "I think we can kill the
            science page, it doesn't make sense"). 1,376 lines carrying 20
            citations for a 20-SKU catalog, of which 4 SKUs remain. Education
            as a DESTINATION loses: nobody weighing tirzepatide detours to a
            library. The citations were not lost — they are re-keyed by
            molecule in data/evidence.ts and render on the PDP of the molecule
            they support, between the mechanism and the price. Redirects rather
            than 404s: the URL is in the sitemap history and possibly indexed. */}
        <Route path="/science"><R to="/peptides" /></Route>
        <Route path="/journal" component={Journal} />
        <Route path="/journal/:slug" component={JournalArticle} />
        <Route path="/physicians" component={Physicians} />
        <Route path="/lab-testing">{() => <R to="/bloodwork" />}</Route>
        <Route path="/bloodwork" component={Bloodwork} />
        <Route path="/protocols" component={ProtocolsIndex} />
        {/* /blood-work consolidated → canonical /bloodwork (BloodPanels retired) */}
        <Route path="/blood-work">{() => <R to="/bloodwork" />}</Route>
        <Route path="/catalog">{() => <R to="/peptides" />}</Route>
        <Route path="/pricing" component={Pricing} />
        <Route path="/gift" component={Gift} />
        <Route path="/gift/claim" component={GiftClaim} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/about" component={About} />
        <Route path="/community" component={Community} />
        <Route path="/contact" component={Contact} />
        <Route path="/assessment" component={Assessment} />

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

        <Route path="/booking" component={Booking} />
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
    </RouteErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
