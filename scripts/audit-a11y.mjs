/* ═══ ACCESSIBILITY GATE — WCAG 2.1 A + AA, against the BUILT site ═══
   Serves dist/public on an ephemeral port, loads each route in real
   Chromium at desktop and phone widths, runs axe-core in the page, and
   FAILS (exit 1) on any violation.

   Why it exists: the design sheet in CLAUDE.md promises "Every pair
   verified WCAG AA in both worlds", and on 2026-09-06 an axe run found
   five serious violations on every page — three colour pairs measuring
   4.11 to 4.49 against a 4.5 floor, list markup that stopped being a
   list for a screen reader, and an off-canvas cart drawer that was
   aria-hidden while still holding focusable links. A promise nobody can
   check is a preference; this is the check.

   Run: npm run audit:a11y   (requires `npm run build` first; local
   chromium via PLAYWRIGHT_CHROMIUM or /opt/pw-browsers/chromium)        */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..", "dist", "public");
const AXE_PATH = path.join(HERE, "..", "node_modules", "axe-core", "axe.min.js");
const EXEC = process.env.PLAYWRIGHT_CHROMIUM || "/opt/pw-browsers/chromium";
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json" };

/* One route per page TYPE, at both widths. A PDP and a protocol page carry
   the same components as their 25 siblings, so two of each is the whole
   surface without a five-minute gate. */
const ROUTES = [
  "/", "/quiz", "/peptides", "/peptides/semaglutide", "/peptides/testosterone",
  "/stacks", "/stacks/recover", "/how-it-works", "/faq", "/contact",
  "/cart", "/legal", "/legal/terms", "/no-such-page",
];
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "phone", width: 390, height: 844 },
];

if (!fs.existsSync(path.join(ROOT, "index.html"))) {
  console.error("audit:a11y — dist/public/index.html missing; run `npm run build` first");
  process.exit(1);
}
if (!fs.existsSync(AXE_PATH)) {
  console.error("audit:a11y — axe-core not installed; run `npm install`");
  process.exit(1);
}
const AXE = fs.readFileSync(AXE_PATH, "utf-8");

const server = http.createServer((req, res) => {
  let p = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
  if (!fs.existsSync(p)) p = path.join(ROOT, "index.html"); // SPA fallback
  res.setHeader("Content-Type", MIME[path.extname(p)] || "application/octet-stream");
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const BASE = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ executablePath: fs.existsSync(EXEC) ? EXEC : undefined });
/* Grouped by rule, because one broken component reports on 26 pages and a
   reader needs the cause once, not 26 times. */
const findings = new Map();
let checks = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(350);
    await page.addScriptTag({ content: AXE });
    const res = await page.evaluate(async () =>
      await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      }));
    checks++;
    for (const v of res.violations) {
      if (!findings.has(v.id)) findings.set(v.id, { impact: v.impact, help: v.help, where: new Set(), nodes: new Set() });
      const f = findings.get(v.id);
      f.where.add(`${vp.name}${route}`);
      for (const n of v.nodes.slice(0, 3)) f.nodes.add(n.target.join(" ").slice(0, 100));
    }
  }
  await ctx.close();
}
await browser.close();
server.close();

const RANK = { critical: 0, serious: 1, moderate: 2, minor: 3 };
const sorted = [...findings].sort((a, b) => (RANK[a[1].impact] ?? 9) - (RANK[b[1].impact] ?? 9));
for (const [id, f] of sorted) {
  console.log(`\n[${f.impact}] ${id} — ${f.help}`);
  console.log(`  on ${f.where.size} of ${checks} page loads: ${[...f.where].slice(0, 6).join(", ")}${f.where.size > 6 ? ` (+${f.where.size - 6})` : ""}`);
  for (const n of [...f.nodes].slice(0, 4)) console.log(`  ↳ ${n}`);
}

console.log(`\n═ SUMMARY ═\n  checked : ${ROUTES.length} routes × ${VIEWPORTS.length} widths = ${checks} page loads\n  rules   : WCAG 2.0 A/AA + WCAG 2.1 A/AA\n  failures: ${findings.size}`);
if (findings.size) {
  console.log("\nRESULT: FAIL — see each rule above");
  process.exit(1);
}
console.log("\nRESULT: PASS — no WCAG 2.1 AA violations on any checked route");
