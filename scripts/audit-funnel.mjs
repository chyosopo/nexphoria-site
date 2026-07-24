/* ═══ FUNNEL GATE (ROADMAP 6.1) — ≤3 clicks from any entry to price + buy ═══
   Serves the built client (dist/public) on an ephemeral port, walks each
   entry path in real Chromium, and FAILS (exit 1) if any path needs more
   than 3 clicks to reach a visible price AND an actionable buy/step CTA.
   Run: npm run audit:funnel   (requires `npm run build` first; local
   chromium via PLAYWRIGHT_CHROMIUM or /opt/pw-browsers/chromium)          */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "public");
const EXEC = process.env.PLAYWRIGHT_CHROMIUM || "/opt/pw-browsers/chromium";
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml", ".webmanifest": "application/manifest+json" };

if (!fs.existsSync(path.join(ROOT, "index.html"))) {
  console.error("audit:funnel — dist/public/index.html missing; run `npm run build` first");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let p = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
  if (!fs.existsSync(p)) p = path.join(ROOT, "404.html");
  res.setHeader("Content-Type", MIME[path.extname(p)] || "application/octet-stream");
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const BASE = `http://127.0.0.1:${server.address().port}`;

/* A step = a Playwright locator to click. After the last step, the page must
   show a price (US$ figure) and an actionable primary CTA. ≤3 steps, hard. */
const PRICE = /\$\s?\d{2,}/;
const CTA_SEL = '.nx-cta-cobalt:visible, .nx-cta-acid:visible, .nx-cta-ceramic:visible, [data-testid*="buybox"]:visible, [data-testid*="add-"]:visible';

const PATHS = [
  { name: "front door → goal → PDP", entry: "/", clicks: [
    '[data-testid="frontdoor-goal-recovery"]',
    'a[href*="/peptides/"]',
  ]},
  { name: "front door → nav pricing", entry: "/", clicks: ['nav >> text=Pricing'] },
  // the bento goal tiles, NOT the hero rail — the rail's marquee animation
  // never stabilizes for scrollIntoViewIfNeeded (same destination either way)
  { name: "men home → goal tile → PDP", entry: "/men", clicks: [
    '[data-testid^="men-goal-"]',
    'a[href*="/peptides/"]',
  ]},
  { name: "women home → goal tile → PDP", entry: "/women", clicks: [
    '[data-testid^="women-goal-"]',
    'a[href*="/peptides/"]',
  ]},
  { name: "catalog → PDP", entry: "/peptides", clicks: ['[data-testid^="peptide-"]'] },
  { name: "protocols index → stack page", entry: "/stacks", clicks: ['a[href*="/stacks/"]:not([href$="/stacks"]):not([href*="build"])'] },
  { name: "bloodwork (priced on entry)", entry: "/bloodwork", clicks: [] },
];

const browser = await chromium.launch({ executablePath: EXEC });
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
let failures = 0;

for (const { name, entry, clicks } of PATHS) {
  const page = await ctx.newPage();
  try {
    if (clicks.length > 3) throw new Error(`path defines ${clicks.length} clicks — the law is ≤3`);
    await page.goto(BASE + entry, { waitUntil: "networkidle", timeout: 30000 });
    for (const sel of clicks) {
      const loc = page.locator(sel).first();
      await loc.scrollIntoViewIfNeeded({ timeout: 10000 });
      await loc.click({ timeout: 10000 });
      await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(500);
    }
    // price anywhere on the final page + a visible primary CTA
    const body = await page.locator("body").innerText();
    if (!PRICE.test(body)) throw new Error(`no price visible on ${page.url()}`);
    const ctas = await page.locator(CTA_SEL).count();
    if (ctas < 1) throw new Error(`no actionable CTA on ${page.url()}`);
    console.log(`PASS  ${name} (${clicks.length} clicks → ${new URL(page.url()).pathname})`);
  } catch (e) {
    console.log(`FAIL  ${name} :: ${e.message.split("\n")[0].slice(0, 140)}`);
    failures++;
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();
console.log(failures ? `\nRESULT: ${failures} funnel path(s) broken — the ≤3-click law regressed` : "\nRESULT: all funnel paths reach price + buy in ≤3 clicks");
process.exit(failures ? 1 : 0);
