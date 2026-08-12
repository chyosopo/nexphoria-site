import { chromium } from "playwright";

const BASE = "http://localhost:5000";
const SLUGS = ["wolverine", "glow", "longevity", "sleep", "lean"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];
const OUT = "/home/user/workspace/nexphoria-site/qa-screenshots-protocol-v3";

const results = [];

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 600;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight + 1200) {
          clearInterval(timer);
          resolve();
        }
      }, 60);
    });
  });
  await page.waitForTimeout(300);
}

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });

  for (const slug of SLUGS) {
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    page.on("pageerror", (e) => pageErrors.push(String(e)));

    const url = `${BASE}/#/protocols/${slug}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(400);
    await autoScroll(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // ── Assertions ──
    // 1. Italic count (font-serif elements)
    const italicCount = await page.evaluate(
      () => document.querySelectorAll(".font-serif").length
    );

    // 2. Sticky rail aside present + sticky-positioned
    const railInfo = await page.evaluate(() => {
      const aside = document.querySelector("aside");
      if (!aside) return { exists: false };
      const sticky = aside.querySelector(".sticky");
      const style = sticky ? getComputedStyle(sticky) : null;
      const visible = aside.offsetParent !== null && aside.getClientRects().length > 0;
      return {
        exists: true,
        visible,
        position: style ? style.position : null,
      };
    });

    // 3. Hero image present, no blur, object-cover
    const heroInfo = await page.evaluate((s) => {
      const img = document.querySelector(`[data-testid="img-hero-${s}"]`);
      if (!img) return { exists: false };
      const cs = getComputedStyle(img);
      return {
        exists: true,
        filter: cs.filter,
        objectFit: cs.objectFit,
        naturalWidth: img.naturalWidth,
        src: img.getAttribute("src"),
      };
    }, slug);

    // 4. KPI count
    const kpiCount = await page.evaluate(
      (s) => document.querySelectorAll(`[data-testid^="kpi-${s}-"]`).length,
      slug
    );

    // 5. FAQ count
    const faqCount = await page.evaluate(
      (s) => document.querySelectorAll(`[data-testid^="faq-${s}-"]`).length,
      slug
    );

    // 6. nootropics text
    const hasNootropic = await page.evaluate(() =>
      /nootropic/i.test(document.body.innerText)
    );

    // screenshot
    const file = `${OUT}/${slug}-${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });

    results.push({
      slug,
      viewport: vp.name,
      italicCount,
      railExists: railInfo.exists,
      railVisible: railInfo.visible,
      railPosition: railInfo.position,
      heroExists: heroInfo.exists,
      heroFilter: heroInfo.filter,
      heroObjectFit: heroInfo.objectFit,
      heroNaturalWidth: heroInfo.naturalWidth,
      heroSrc: heroInfo.src,
      kpiCount,
      faqCount,
      hasNootropic,
      consoleErrors: consoleErrors.length,
      pageErrors: pageErrors.length,
      consoleErrorSamples: consoleErrors.slice(0, 3),
      pageErrorSamples: pageErrors.slice(0, 3),
    });

    await page.close();
  }
  await context.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
