import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Gate from "@/pages/Gate";
import WomenHome from "@/pages/WomenHome";
import MenHome from "@/pages/MenHome";
import GenderPeptides from "@/pages/GenderPeptides";
import GenderPeptideDetail from "@/pages/GenderPeptideDetail";
import GenderProtocols from "@/pages/GenderProtocols";
import HowItWorks from "@/pages/HowItWorks";
import Science from "@/pages/Science";
import Physicians from "@/pages/Physicians";
import LabTesting from "@/pages/LabTesting";
import Pricing from "@/pages/Pricing";
import FAQPage from "@/pages/FAQ";
import About from "@/pages/About";
import Community from "@/pages/Community";
import Contact from "@/pages/Contact";
import Assessment from "@/pages/Assessment";
import LegalIndex from "@/pages/legal/LegalIndex";
import Terms from "@/pages/legal/Terms";
import Privacy from "@/pages/legal/Privacy";
import TelehealthConsent from "@/pages/legal/TelehealthConsent";
import RefundPolicy from "@/pages/legal/RefundPolicy";
import NotFound from "@/pages/not-found";

function AppRouter() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useHashLocation}>
          <AppRouter />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
