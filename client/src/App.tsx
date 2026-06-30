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

// Pages — eagerly loaded (fast/common paths)
import Gate from "@/pages/Gate";
import WomenHome from "@/pages/WomenHome";
import MenHome from "@/pages/MenHome";
import HowItWorks from "@/pages/HowItWorks";
import Science from "@/pages/Science";
import Physicians from "@/pages/Physicians";
import LabTesting from "@/pages/LabTesting";
import Pricing from "@/pages/Pricing";
import FAQPage from "@/pages/FAQ";
import About from "@/pages/About";
import Community from "@/pages/Community";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Pages — lazy loaded (code-split)
const GenderPeptides = lazy(() => import("@/pages/GenderPeptides"));
const GenderPeptideDetail = lazy(() => import("@/pages/GenderPeptideDetail"));
const GenderProtocols = lazy(() => import("@/pages/GenderProtocols"));
const Assessment = lazy(() => import("@/pages/Assessment"));
const StackIndex = lazy(() => import("@/pages/StackIndex"));
const StackDetail = lazy(() => import("@/pages/StackDetail"));
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
        {/* Gate — "/" */}
        <Route path="/" component={Gate} />

        {/* Women routes */}
        <Route path="/women" component={WomenHome} />
        <Route path="/women/peptides">
          {() => <GenderPeptides gender="women" />}
        </Route>
        <Route path="/women/peptides/:slug">
          {(params) => <GenderPeptideDetail gender="women" slug={(params as { slug: string }).slug} />}
        </Route>
        <Route path="/women/protocols">
          {() => <GenderProtocols gender="women" />}
        </Route>

        {/* Men routes */}
        <Route path="/men" component={MenHome} />
        <Route path="/men/peptides">
          {() => <GenderPeptides gender="men" />}
        </Route>
        <Route path="/men/peptides/:slug">
          {(params) => <GenderPeptideDetail gender="men" slug={(params as { slug: string }).slug} />}
        </Route>
        <Route path="/men/protocols">
          {() => <GenderProtocols gender="men" />}
        </Route>

        {/* Stacks (pharmacy tier 2) */}
        <Route path="/stacks" component={StackIndex} />
        <Route path="/stacks/:slug">
          {(params) => <StackDetail slug={(params as { slug: string }).slug} />}
        </Route>

        {/* Cart + Checkout (pharmacy flow) */}
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />

        {/* Shared informational */}
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/science" component={Science} />
        <Route path="/physicians" component={Physicians} />
        <Route path="/lab-testing" component={LabTesting} />
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
          <Router hook={useHashLocation}>
            <AppRouter />
          </Router>
          <CartDrawer />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
