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
function startStaticServer(root: string): Promise<{ server: Server; port: number }> {
  const shell = join(root, "index.html");
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

  async function snapshot(route: string): Promise<void> {
    const page = await browser.newPage();
    try {
      page.setDefaultNavigationTimeout(NAV_TIMEOUT);
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
      const html = "<!doctype html>\n" + (await page.content()).replace(/^<!doctype html>\s*/i, "");
      const out = outPathFor(route);
      await mkdir(join(out, ".."), { recursive: true });
      await writeFile(out, html, "utf-8");
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
