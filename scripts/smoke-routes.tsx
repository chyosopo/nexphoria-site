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
  // CUT TO THE SPINE (Chiya 2026-09-05): every deleted page is gone from here;
  // its URL is now a redirect (no page module to smoke). Only surviving page
  // components are rendered. Blood testing and who-prescribes fold into
  // HowItWorks; quizzes and the blog are retired.
  const routes: [string, string, Record<string, any>][] = [
    ["/",                "/src/pages/FrontDoor.tsx", {}],
    ["/stacks",          "/src/pages/ProtocolsIndex.tsx", {}],
    ["/stacks/recover", "/src/pages/StackPage.tsx", { slug: "recover" }],
    ["/stacks/ignite",   "/src/pages/StackPage.tsx", { slug: "ignite" }],
    ["/peptides/tirzepatide","/src/pages/SoloPDP.tsx", { slug: "tirzepatide" }],
    ["/peptides/semaglutide","/src/pages/SoloPDP.tsx", { slug: "semaglutide" }],
    ["/peptides/nope",   "/src/pages/SoloPDP.tsx", { slug: "does-not-exist" }],
    ["/peptides",        "/src/pages/PeptidesCatalog.tsx", {}],
    ["/how-it-works",    "/src/pages/HowItWorks.tsx", {}],
    ["/cart",            "/src/pages/Cart.tsx", {}],
    ["/checkout",        "/src/pages/Checkout.tsx", {}],
    ["/faq",             "/src/pages/FAQ.tsx", {}],
    ["/contact",         "/src/pages/Contact.tsx", {}],
    ["/legal",           "/src/pages/legal/LegalIndex.tsx", {}],
    ["/legal/terms",     "/src/pages/legal/Terms.tsx", {}],
    ["/legal/privacy",   "/src/pages/legal/Privacy.tsx", {}],
    ["/legal/messaging", "/src/pages/legal/Messaging.tsx", {}],
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
