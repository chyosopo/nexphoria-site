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
import NotFound from "@/pages/not-found";

// Pages — lazy loaded (code-split)
const Showcase = lazy(() => import("@/pages/Showcase"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Science = lazy(() => import("@/pages/Science"));
const Journal = lazy(() => import("@/pages/Journal"));
const JournalArticle = lazy(() => import("@/pages/JournalArticle"));
const Physicians = lazy(() => import("@/pages/Physicians"));
const LabTesting = lazy(() => import("@/pages/LabTesting"));
const Bloodwork = lazy(() => import("@/pages/Bloodwork"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const FAQPage = lazy(() => import("@/pages/FAQ"));
const About = lazy(() => import("@/pages/About"));
const Community = lazy(() => import("@/pages/Community"));
const Contact = lazy(() => import("@/pages/Contact"));
const Peptides = lazy(() => import("@/pages/Peptides"));
const PeptideDetail = lazy(() => import("@/pages/PeptideDetail"));
const GenderPeptides = lazy(() => import("@/pages/GenderPeptides"));
const GenderPeptideDetail = lazy(() => import("@/pages/GenderPeptideDetail"));
const GenderProtocols = lazy(() => import("@/pages/GenderProtocols"));
const Assessment = lazy(() => import("@/pages/Assessment"));
const StackIndex = lazy(() => import("@/pages/StackIndex"));
const StackDetail = lazy(() => import("@/pages/StackDetail"));
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
        {/* Home — new V3 landing (Maximus tiles + Bask cinematics) */}
        <Route path="/" component={Home} />
        <Route path="/showcase" component={Showcase} />

        {/* Gender-neutral pharmacy shelf */}
        <Route path="/peptides" component={Peptides} />
        <Route path="/peptides/:slug" component={PeptideDetail} />

        {/* Old gender gate — kept reachable at /gate but not the home */}
        <Route path="/gate" component={Gate} />

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
        <Route path="/stacks/build" component={BuildYourStack} />
        <Route path="/stacks/:slug">
          {(params) => <StackDetail slug={(params as { slug: string }).slug} />}
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
        <Route path="/lab-testing" component={LabTesting} />
        <Route path="/bloodwork" component={Bloodwork} />
        <Route path="/testing" component={LabTesting} />
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
