/* ═══ ROUTE SMOKE HARNESS ═══
   Renders every route to string under jsdom. Catches runtime crashes
   (undefined data, bad hooks, missing providers) that static checks cannot.
   Run: npx tsx scripts/smoke-routes.tsx */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "https://x.test/" });
const g = globalThis as any;
g.window = dom.window; g.document = dom.window.document;
Object.defineProperty(g, "navigator", { value: dom.window.navigator, configurable: true });
g.localStorage = dom.window.localStorage;
g.sessionStorage = dom.window.sessionStorage;
g.HTMLElement = dom.window.HTMLElement; g.Element = dom.window.Element;
g.SVGElement = dom.window.SVGElement; g.SVGSVGElement = dom.window.SVGSVGElement;
g.Image = dom.window.Image; g.Node = dom.window.Node;
g.getComputedStyle = dom.window.getComputedStyle;
g.matchMedia = g.window.matchMedia = (q: string) => ({ matches: false, media: q, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
class Obs { observe(){} unobserve(){} disconnect(){} takeRecords(){ return []; } }
g.IntersectionObserver = g.window.IntersectionObserver = Obs;
g.ResizeObserver = g.window.ResizeObserver = Obs;
g.scrollTo = g.window.scrollTo = () => {};
g.requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
g.cancelAnimationFrame = (id: any) => clearTimeout(id);

async function main() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: new URL("../vite.config.ts", import.meta.url).pathname,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });
  const load = (p: string) => vite.ssrLoadModule(p);
  const React = (await import("react")).default;
  const { renderToString } = await import("react-dom/server");
  const { Router } = await import("wouter");
    const { QueryClient, QueryClientProvider } = await import("@tanstack/react-query");
  const { CartProvider } = (await load("/src/contexts/CartProvider.tsx")) as any;

  // route → [module, props, path]
  const routes: [string, string, Record<string, any>][] = [
    ["/",                "/src/pages/FrontDoor.tsx", {}],
    ["/men",             "/src/pages/MenHome.tsx", {}],
    ["/women",           "/src/pages/WomenHome.tsx", {}],
    ["/stacks",          "/src/pages/ProtocolsIndex.tsx", {}],
    ["/stacks/wolverine","/src/pages/StackPage.tsx", { slug: "wolverine" }],
    ["/stacks/ignite",   "/src/pages/StackPage.tsx", { slug: "ignite" }],
    ["/peptides/bpc-157","/src/pages/SoloPDP.tsx", { slug: "bpc-157" }],
    ["/peptides/semaglutide","/src/pages/SoloPDP.tsx", { slug: "semaglutide" }],
    ["/peptides/nope",   "/src/pages/SoloPDP.tsx", { slug: "does-not-exist" }],
    ["/men/peptides",    "/src/pages/PeptidesCatalog.tsx", { world: "men" }],
    ["/women/peptides",  "/src/pages/PeptidesCatalog.tsx", { world: "women" }],
    ["/women/peptides/ghk-cu", "/src/pages/SoloPDP.tsx", { slug: "ghk-cu", world: "women" }],
    ["/men/peptides/sermorelin", "/src/pages/SoloPDP.tsx", { slug: "sermorelin", world: "men" }],
    ["/peptides",        "/src/pages/PeptidesCatalog.tsx", { world: "men" }],
    ["/catalog",         "/src/pages/PeptidesCatalog.tsx", { world: "men" }],
    ["/bloodwork",       "/src/pages/Bloodwork.tsx", {}],
    ["/blood-work",      "/src/pages/Bloodwork.tsx", {}],
    ["/how-it-works",    "/src/pages/HowItWorks.tsx", {}],
    ["/assessment",      "/src/pages/Assessment.tsx", {}],
    ["/cart",            "/src/pages/Cart.tsx", {}],
    ["/checkout",        "/src/pages/Checkout.tsx", {}],
    ["/pricing",         "/src/pages/Pricing.tsx", {}],
    ["/gift",            "/src/pages/Gift.tsx", {}],
    ["/gift/claim",      "/src/pages/GiftClaim.tsx", {}],
    ["/science",         "/src/pages/Science.tsx", {}],
    ["/physicians",      "/src/pages/Physicians.tsx", {}],
    ["/lab-testing",     "/src/pages/Bloodwork.tsx", {}], // alias → /bloodwork (LabTesting.tsx deleted — dead page, no route rendered it)
    ["/journal",         "/src/pages/Journal.tsx", {}],
    ["/journal/what-is-a-peptide", "/src/pages/JournalArticle.tsx", {}],
    ["/about",           "/src/pages/About.tsx", {}],
    ["/faq",             "/src/pages/FAQ.tsx", {}],
    ["/contact",         "/src/pages/Contact.tsx", {}],
    ["/community",       "/src/pages/Community.tsx", {}],
    ["/booking",         "/src/pages/Booking.tsx", {}],

    ["/stacks/build",    "/src/pages/BuildYourStack.tsx", {}],
    ["/gate",            "/src/pages/Gate.tsx", {}],
    ["/goals/recovery",  "/src/pages/Category.tsx", { slug: "recovery" }],
    ["/goals/sleep",     "/src/pages/Category.tsx", { slug: "sleep" }],
    ["/women/protocols", "/src/pages/ProtocolsIndex.tsx", {}],
    ["/men/protocols",   "/src/pages/ProtocolsIndex.tsx", {}],
    ["/protocols",       "/src/pages/ProtocolsIndex.tsx", {}],
    ["/legal",           "/src/pages/legal/LegalIndex.tsx", {}],
    ["/legal/terms",     "/src/pages/legal/Terms.tsx", {}],
    ["/legal/privacy",   "/src/pages/legal/Privacy.tsx", {}],
    ["/legal/telehealth-consent", "/src/pages/legal/TelehealthConsent.tsx", {}],
    ["/legal/refund-policy",      "/src/pages/legal/RefundPolicy.tsx", {}],
    ["/privacy",         "/src/pages/legal/Privacy.tsx", {}],
    ["/terms",           "/src/pages/legal/Terms.tsx", {}],
    ["/404",             "/src/pages/not-found.tsx", {}],
  ];

  let pass = 0, fail = 0;
  for (const [path, mod, props] of routes) {
    try {
      const M = await load(mod);
      const Comp = M.default ?? Object.values(M).find((v) => typeof v === "function");
      const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
      const html = renderToString(
        React.createElement(QueryClientProvider, { client: qc },
          React.createElement(CartProvider, null,
            React.createElement(Router, { ssrPath: path },
              React.createElement(Comp as any, props))))
      );
      if (!html || html.length < 200) throw new Error(`suspiciously empty render (${html.length} chars)`);
      console.log(`PASS ${path} (${(html.length/1024).toFixed(1)}kb)`);
      pass++;
    } catch (e: any) {
      console.log(`FAIL ${path} :: ${(e?.message || e).toString().split("\n")[0].slice(0, 140)}`);
      fail++;
    }
  }
  console.log(`\nRESULT: ${pass} pass / ${fail} fail of ${routes.length}`);
  await vite.close();
  process.exit(fail ? 1 : 0);
}
main();
