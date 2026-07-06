
function R({ to }: { to: string }) { const [, __n] = __uL(); useEffect(() => { __n(to, { replace: true }); }, []); return null; }
import { useEffect } from "react";
import { useLocation as __uL } from "wouter";
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
import Home from "@/pages/Home";
import WomenHome from "@/pages/WomenHome";
import MenHome from "@/pages/MenHome";

import NotFound from "@/pages/not-found";

// Pages — lazy loaded (code-split)
const Category = lazy(() => import("@/pages/Category"));
const Booking = lazy(() => import("@/pages/Booking"));
const FrontDoor = lazy(() => import("@/pages/FrontDoor"));
const Assessment = lazy(() => import("@/pages/Assessment"));
const StackPage = lazy(() => import("@/pages/StackPage"));
const ProtocolsIndex = lazy(() => import("@/pages/ProtocolsIndex"));
const SoloPDP = lazy(() => import("@/pages/SoloPDP"));
const PeptidesCatalog = lazy(() => import("@/pages/PeptidesCatalog"));
const BuildYourStack = lazy(() => import("@/pages/BuildYourStack"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Gate = lazy(() => import("@/pages/Gate"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Science = lazy(() => import("@/pages/Science"));
const Journal = lazy(() => import("@/pages/Journal"));
const JournalArticle = lazy(() => import("@/pages/JournalArticle"));
const Physicians = lazy(() => import("@/pages/Physicians"));
const LabTesting = lazy(() => import("@/pages/LabTesting"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const About = lazy(() => import("@/pages/About"));
const Community = lazy(() => import("@/pages/Community"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQPage = lazy(() => import("@/pages/FAQ"));
const Bloodwork = lazy(() => import("@/pages/Bloodwork"));
const LegalIndex = lazy(() => import("@/pages/legal/LegalIndex"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const TelehealthConsent = lazy(() => import("@/pages/legal/TelehealthConsent"));
const RefundPolicy = lazy(() => import("@/pages/legal/RefundPolicy"));
const HipaaNotice = lazy(() => import("@/pages/legal/HipaaNotice"));
const PrescribingPolicy = lazy(() => import("@/pages/legal/PrescribingPolicy"));
const StateAvailability = lazy(() => import("@/pages/legal/StateAvailability"));

function AppRouter() {
  return (
    <RouteErrorBoundary>
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {/* Front door (ROADMAP 1.2) — value prop in 5 seconds; the old
            her/him photo gate lives on at /gate for returning users */}
        <Route path="/" component={FrontDoor} />
        <Route path="/gate" component={Gate} />

        {/* Gender-neutral pharmacy shelf */}
        <Route path="/peptides">{() => <R to="/men/peptides" />}</Route>
        <Route path="/peptides/:slug">{(p) => <SoloPDP slug={(p as {slug:string}).slug} />}</Route>
        <Route path="/goals/:slug" component={Category} />

        {/* Old gender gate — kept reachable at /gate for returning users, not the home */}
        <Route path="/gate" component={Gate} />

        {/* Women routes */}
        <Route path="/women" component={WomenHome} />
        <Route path="/women/peptides">
          {() => <PeptidesCatalog world="women" />}
        </Route>
        <Route path="/women/peptides/:slug">
          {(params) => <SoloPDP world="women" slug={(params as { slug: string }).slug} />}
        </Route>
        <Route path="/women/protocols">
          {() => <ProtocolsIndex />}
        </Route>

        {/* Men routes */}
        <Route path="/men" component={MenHome} />
        <Route path="/men/peptides">
          {() => <PeptidesCatalog world="men" />}
        </Route>
        <Route path="/men/peptides/:slug">
          {(params) => <SoloPDP world="men" slug={(params as { slug: string }).slug} />}
        </Route>
        <Route path="/men/protocols">
          {() => <ProtocolsIndex />}
        </Route>

        {/* Stacks (pharmacy tier 2) */}
        <Route path="/stacks" component={ProtocolsIndex} />
        <Route path="/stacks/build" component={BuildYourStack} />
        <Route path="/stacks/:slug">
          {(params) => <StackPage slug={(params as { slug: string }).slug} />}
        </Route>

        {/* Cart + Checkout (pharmacy flow) */}
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />

        {/* Shared informational */}
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/science" component={Science} />
        <Route path="/journal" component={Journal} />
        <Route path="/journal/:slug" component={JournalArticle} />
        <Route path="/physicians" component={Physicians} />
        <Route path="/lab-testing">{() => <R to="/bloodwork" />}</Route>
        <Route path="/bloodwork" component={Bloodwork} />
        <Route path="/protocols" component={ProtocolsIndex} />
        {/* /blood-work consolidated → canonical /bloodwork (BloodPanels retired) */}
        <Route path="/blood-work">{() => <R to="/bloodwork" />}</Route>
        <Route path="/catalog">{() => <R to="/men/peptides" />}</Route>
        <Route path="/pricing" component={Pricing} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/about" component={About} />
        <Route path="/community" component={Community} />
        <Route path="/contact" component={Contact} />
        <Route path="/assessment" component={Assessment} />

        {/* Legal */}
        <Route path="/legal" component={LegalIndex} />
        <Route path="/legal/terms" component={Terms} />
        <Route path="/legal/privacy" component={Privacy} />
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
