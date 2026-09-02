/* ═══ BUILD-TIME PRERENDER ═══
   The site ships one client-rendered index.html shell, so every non-Googlebot
   crawler (Bing freshness, social unfurlers, and ALL LLM crawlers —
   GPTBot/ClaudeBot/PerplexityBot) sees an empty <div id="root">. This snapshots
   the fully rendered HTML for every sitemap route at build time and writes a
   static <route>/index.html for each — so crawlers get real copy, real <head>
   SEO tags, and real JSON-LD, while browsers still boot the SPA and re-render
   (the module <script> is preserved → progressive enhancement).

   Single source of truth: the route list comes from collectRoutes() in
   genSitemap.ts — the SAME list that builds sitemap.xml, so snapshots and
   sitemap can never drift. See docs/LAUNCH-AUDIT.md §4.1. */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { extname, join, normalize } from "node:path";
import { collectRoutes } from "./genSitemap";

const DIST = `${process.cwd()}/dist/public`;
const CONCURRENCY = 4;
const NAV_TIMEOUT = 45_000;

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

/** Minimal static file server for dist/public with SPA fallback to index.html.
    Bound to 127.0.0.1 on an ephemeral port. Unknown paths (deep SPA routes)
    serve the shell so wouter can render them. */
async function startStaticServer(root: string): Promise<{ server: Server; port: number }> {
  const shell = join(root, "index.html");
  // Read the shell ONCE, up front, and serve THIS pristine copy for every SPA
  // fallback. CRITICAL: prerendering "/" writes its snapshot to
  // dist/public/index.html — the very file that is the SPA-fallback shell. If
  // the fallback re-read that file from disk, every route prerendered AFTER "/"
  // would boot from FrontDoor's fully-rendered snapshot and inherit its baked
  // <head> (JSON-LD identity nodes, canonical, OG…), cross-polluting the whole
  // site with the home page's structured data. Serving the in-memory original
  // keeps each route's snapshot clean — only its own useSeo output.
  const shellHtml = await readFile(shell);
  const server = createServer((req, res) => {
    try {
      const url = new URL(req.url || "/", "http://127.0.0.1");
      let pathname = decodeURIComponent(url.pathname);
      // Resolve within root; normalize away any ../ traversal.
      let filePath = normalize(join(root, pathname));
      if (!filePath.startsWith(root)) filePath = shell;
      if (existsSync(filePath) && statSync(filePath).isDirectory())
        filePath = join(filePath, "index.html");
      // SPA fallback: no real file / no extension → serve the shell.
      if (!existsSync(filePath) || !statSync(filePath).isFile()) filePath = shell;
      // Any resolution to the shell serves the pristine in-memory copy, never a
      // possibly-overwritten dist/public/index.html (see note above).
      if (filePath === shell) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(shellHtml);
        return;
      }
      const type = MIME[extname(filePath).toLowerCase()] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      createReadStream(filePath).pipe(res);
    } catch {
      res.writeHead(500).end("prerender static server error");
    }
  });
  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (addr && typeof addr === "object") resolve({ server, port: addr.port });
      else reject(new Error("could not determine ephemeral port"));
    });
  });
}

/** route "/" → dist/public/index.html; "/men/peptides/x" → dist/public/men/peptides/x/index.html */
function outPathFor(route: string): string {
  if (route === "/") return join(DIST, "index.html");
  return join(DIST, route.replace(/^\//, ""), "index.html");
}

export async function prerender(): Promise<{ pages: number }> {
  if (!existsSync(join(DIST, "index.html")))
    throw new Error(`prerender: ${DIST}/index.html not found — run the client build first`);

  const routes = await collectRoutes();
  const { chromium } = await import("playwright");
  const { server, port } = await startStaticServer(DIST);
  const base = `http://127.0.0.1:${port}`;

  // The browser binary is not part of `npm ci` — it lives in Playwright's
  // own cache. Locally it's usually present; on a fresh CI runner it is not,
  // and chromium.launch() then throws "Executable doesn't exist". Rather than
  // require a workflow-file edit (needs elevated push scope), self-heal here:
  // launch, and on a missing-executable error run `playwright install chromium`
  // once (idempotent — a no-op when already cached) and retry.
  async function launchChromium() {
    return chromium.launch({ headless: true });
  }
  let browser;
  try {
    browser = await launchChromium();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!/Executable doesn't exist|playwright install/i.test(msg)) throw err;
    console.log("prerender: chromium not found — installing via `playwright install chromium`\u2026");
    const { execFileSync } = await import("node:child_process");
    execFileSync("npx", ["playwright", "install", "chromium"], { stdio: "inherit" });
    browser = await launchChromium();
  }
  let done = 0;
  const failures: string[] = [];
  // Non-blocking SEO coverage report: how many snapshots carry a JSON-LD block.
  // Purely informational — a route without structured data is NOT a hard fail
  // (some routes legitimately may not), so this never throws; it just surfaces
  // coverage so a regression is visible in the build log.
  let withJsonLd = 0;
  const missingJsonLd: string[] = [];
  // BLOCKING structured-data validation: every emitted JSON-LD block must be
  // valid JSON and a real schema.org node (has @context + @type, or is a
  // @graph of such nodes). A malformed block is worse than none — it earns a
  // Search Console error and can suppress the whole page's rich results — so
  // this DOES throw at the end if any route ships invalid markup.
  const badJsonLd: string[] = [];

  /** Assert a parsed JSON-LD value is a schema.org node (or array/@graph of them). */
  function assertLdNode(v: unknown, where: string): void {
    if (Array.isArray(v)) {
      v.forEach((n, i) => assertLdNode(n, `${where}[${i}]`));
      return;
    }
    if (!v || typeof v !== "object") throw new Error(`${where}: not an object`);
    const obj = v as Record<string, unknown>;
    if (Array.isArray(obj["@graph"])) {
      if (!obj["@context"]) throw new Error(`${where}: @graph without @context`);
      (obj["@graph"] as unknown[]).forEach((n, i) => assertLdNode(n, `${where}.@graph[${i}]`));
      return;
    }
    if (!obj["@type"]) throw new Error(`${where}: missing @type`);
    // Node references ({"@id": …}) legitimately omit @context; every other node
    // that stands alone in a <script> block must carry it.
    if (!obj["@context"] && !obj["@id"]) throw new Error(`${where}: missing @context`);
  }

  async function snapshot(route: string): Promise<void> {
    const page = await browser.newPage();
    try {
      page.setDefaultNavigationTimeout(NAV_TIMEOUT);
      // Snapshots need markup, not webfonts. Behind a proxy that resets these
      // connections each route waited ~12s for them; with many routes in
      // flight that blew the navigation timeout. Abort them up front.
      await page.route(/fonts\.googleapis\.com|fonts\.gstatic\.com|fontshare\.com/, (r) => r.abort());
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      // Wait until the Suspense skeleton is gone and real content has mounted.
      // The lazy chunks (e.g. Bloodwork's heavy chunk) resolve via network, so
      // this DOM condition is more reliable than a fixed sleep.
      await page.waitForFunction(
        () => {
          const r = document.getElementById("root");
          if (!r || r.children.length === 0) return false;
          if (document.querySelector('[data-testid="route-skeleton"]')) return false;
          return (r.textContent || "").trim().length > 100;
        },
        { timeout: NAV_TIMEOUT },
      );
      // Drop the runtime-written <base> element: it exists only to anchor
      // relative asset URLs during this render. The shell has no static <base>;
      // the inline head script rewrites it at load time (custom domain → "/",
      // github.io project page → "/<repo>/"). Leaving a stale "/" base baked in
      // would fight that script on github.io. Keep the SPA module <script>.
      await page.evaluate(() => document.querySelectorAll("base").forEach((b) => b.remove()));
      // Collect the raw JSON-LD payloads from the live DOM (exact textContent —
      // no lossy HTML re-parse) so we can parse + validate each block.
      const ldBlocks: string[] = await page.evaluate(() =>
        Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
          (s) => s.textContent || "",
        ),
      );
      let html = "<!doctype html>\n" + (await page.content()).replace(/^<!doctype html>\s*/i, "");
      // Reveal arms only off-screen elements with nx-armed (opacity 0); a
      // snapshot must never carry it, or the static page hides its content.
      // nx-motion is the client-only flag that runs the hero entrance.
      html = html
        .replace(/\s*\bnx-armed\b/g, "")
        .replace(/\s*\bnx-motion\b/g, "")
        // The scrub hero's video src is a blob: URL minted in THIS browser. Baked
        // into the snapshot it becomes a dead "blob:./…" that errors on load and
        // flips the hero into its failed state before the real fetch runs.
        .replace(/(<video\b[^>]*?)\s+src="blob:[^"]*"/g, "$1");
      // ── Snapshot asset hygiene ──────────────────────────────────────────────
      // Two runtime artifacts of rendering the SPA against the ephemeral static
      // server must be cleaned before writing the crawlable snapshot (the same
      // spirit as the runtime <base> removal above — bake only what belongs).
      //
      // (1) Drop the SPA's runtime-injected lazy-chunk modulepreloads. Vite's
      // preload helper injects <link rel="modulepreload" as="script" …> for the
      // chunks THIS route happened to lazy-load in the browser (FrontDoor on "/",
      // SoloPDP/SafetyDisclosure on a PDP …). They vary per route, point at
      // page-specific chunks, and are re-injected correctly on hydration — so
      // baking them serves no crawler/no-JS client and would eager-preload the
      // wrong chunks per route. The four STATIC shell modulepreloads Vite emits
      // (react/router/lucide/components — no `as="script"`) are kept. The
      // `as="script"` marker cleanly distinguishes runtime-injected from static.
      html = html.replace(
        /<link\b(?=[^>]*\brel="modulepreload")(?=[^>]*\bas="script")[^>]*>\s*/g,
        "",
      );
      // (2) Rebase any leaked ephemeral-server origin back to the authored
      // base:"./" form. <img> content assets (and any srcset/preload href) are
      // resolved by the browser against the runtime <base href="http://127.0.0.1:
      // <port>/"> during this render, so they bake the throwaway localhost origin —
      // a snapshot-only defect leaving crawlers, LLM bots, and no-JS clients with
      // dead-host image URLs. absUrl() already fixes head og:image/JSON-LD to the
      // canonical domain; this fixes the rendered BODY. Strip the origin to "./" so
      // every asset ref matches the shell's own <script src="./assets/…"> convention
      // (host-agnostic; correct on both apex and the /nexphoria-site/ project base via
      // the same runtime <base> the shell already relies on). Bound to THIS run's port
      // so nothing legitimate is touched; a global replace covers src and multi-URL
      // srcset in one pass.
      const leakedOrigin = new RegExp(`http://(?:127\\.0\\.0\\.1|localhost):${port}/`, "g");
      html = html.replace(leakedOrigin, "./");
      const out = outPathFor(route);
      await mkdir(join(out, ".."), { recursive: true });
      await writeFile(out, html, "utf-8");
      if (ldBlocks.length) {
        withJsonLd++;
        ldBlocks.forEach((raw, i) => {
          try {
            assertLdNode(JSON.parse(raw), `${route} block#${i + 1}`);
          } catch (e: any) {
            badJsonLd.push(`${route} :: ${(e?.message || e).toString().slice(0, 120)}`);
          }
        });
      } else missingJsonLd.push(route);
      done++;
      if (done % 10 === 0 || done === routes.length)
        console.log(`  prerendered ${done}/${routes.length}`);
    } catch (e: any) {
      failures.push(`${route} :: ${(e?.message || e).toString().split("\n")[0].slice(0, 140)}`);
    } finally {
      await page.close();
    }
  }

  // Worker pool: cap pages in flight at CONCURRENCY.
  const queue = [...routes];
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) {
      const route = queue.shift();
      if (route === undefined) break;
      await snapshot(route);
    }
  });
  await Promise.all(workers);

  await browser.close();
  await new Promise<void>((resolve) => server.close(() => resolve()));

  // SEO coverage summary (non-blocking).
  console.log(`  seo: ${withJsonLd}/${done} prerendered routes carry a JSON-LD block`);
  if (missingJsonLd.length)
    console.log(`  seo: no JSON-LD on ${missingJsonLd.length} route(s): ${missingJsonLd.slice(0, 8).join(", ")}${missingJsonLd.length > 8 ? " …" : ""}`);

  // Structured-data validity (BLOCKING). Presence alone is not enough — a
  // malformed block hurts more than an absent one.
  if (badJsonLd.length) {
    console.error(`  seo: ${badJsonLd.length} invalid JSON-LD block(s):`);
    badJsonLd.forEach((b) => console.error(`  BAD  ${b}`));
    throw new Error(`prerender: ${badJsonLd.length} invalid JSON-LD block(s) — fix before shipping`);
  }
  console.log(`  seo: all JSON-LD blocks parsed and validated (schema.org @type + @context)`);

  if (failures.length) {
    console.error(`prerender: ${failures.length} route(s) failed:`);
    failures.forEach((f) => console.error(`  FAIL ${f}`));
    throw new Error(`prerender failed on ${failures.length}/${routes.length} route(s)`);
  }
  return { pages: done };
}

// Allow standalone invocation against an existing dist/public: `tsx script/prerender.ts`
if (import.meta.url === `file://${process.argv[1]}`) {
  prerender()
    .then(({ pages }) => console.log(`prerender complete — ${pages} static HTML snapshots`))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
