
function R({ to }: { to: string }) { const [, __n] = __uL(); useEffect(() => { __n(to, { replace: true }); }, []); return null; }
import { useEffect } from "react";
import { useLocation as __uL } from "wouter";
import { Suspense, lazy } from "react";
import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
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
import Gate from "@/pages/Gate";
import WomenHome from "@/pages/WomenHome";
import MenHome from "@/pages/MenHome";
import HowItWorks from "@/pages/HowItWorks";
import Science from "@/pages/Science";
import Journal from "@/pages/Journal";
import JournalArticle from "@/pages/JournalArticle";
import Physicians from "@/pages/Physicians";
import LabTesting from "@/pages/LabTesting";
import Bloodwork from "@/pages/Bloodwork";
import Pricing from "@/pages/Pricing";
import FAQPage from "@/pages/FAQ";
import About from "@/pages/About";
import Community from "@/pages/Community";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Pages — lazy loaded (code-split)
const Category = lazy(() => import("@/pages/Category"));
const GenderProtocols = lazy(() => import("@/pages/GenderProtocols"));
const Assessment = lazy(() => import("@/pages/Assessment"));
const StackPage = lazy(() => import("@/pages/StackPage"));
const ProtocolsIndex = lazy(() => import("@/pages/ProtocolsIndex"));
const BloodPanels = lazy(() => import("@/pages/BloodPanels"));
const SoloPDP = lazy(() => import("@/pages/SoloPDP"));
const PeptidesCatalog = lazy(() => import("@/pages/PeptidesCatalog"));
const BuildYourStack = lazy(() => import("@/pages/BuildYourStack"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const LegalIndex = lazy(() => import("@/pages/legal/LegalIndex"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const TelehealthConsent = lazy(() => import("@/pages/legal/TelehealthConsent"));
const RefundPolicy = lazy(() => import("@/pages/legal/RefundPolicy"));

function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {/* Home — new V3 landing (reference tiles + Bask cinematics) */}
        <Route path="/" component={Gate} />

        {/* Gender-neutral pharmacy shelf */}
        <Route path="/peptides">{() => <R to="/men/peptides" />}</Route>
        <Route path="/peptides/:slug">{(p) => <SoloPDP slug={(p as {slug:string}).slug} />}</Route>
        <Route path="/goals/:slug" component={Category} />

        {/* Old gender gate — kept reachable at /gate but not the home */}

        {/* Women routes */}
        <Route path="/women" component={WomenHome} />
        <Route path="/women/peptides">
          {() => <PeptidesCatalog world="women" />}
        </Route>
        <Route path="/women/peptides/:slug">
          {(params) => <SoloPDP world="women" slug={(params as { slug: string }).slug} />}
        </Route>
        <Route path="/women/protocols">
          {() => <GenderProtocols gender="women" />}
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
          {() => <GenderProtocols gender="men" />}
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
        <Route path="/blood-work" component={BloodPanels} />
        <Route path="/catalog">{() => <PeptidesCatalog />}</Route>
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
        {/* Short-path aliases so external links to /privacy and /terms resolve */}
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <ScrollProgress />
          <Router hook={useHashLocation}>
            <AppRouter />
            <CartDrawer />
          </Router>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
