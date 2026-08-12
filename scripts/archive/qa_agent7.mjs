import { spawn } from "node:child_process";
import { chromium } from "playwright";

const srv = spawn("node", ["dist/index.cjs"], {
  env: { ...process.env, NODE_ENV: "production" },
  stdio: "inherit",
});

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function up() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://localhost:5000/");
      if (res.ok) return true;
    } catch {}
    await wait(500);
  }
  return false;
}

try {
  if (!(await up())) throw new Error("server never came up");
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5000/", { waitUntil: "load" });
  await wait(1500);

  await page.locator('[data-testid="nav-link-pharmacy"]').hover();
  await wait(700);
  await page.screenshot({ path: "qa/agent7_nav_mega.png", clip: { x: 0, y: 0, width: 1280, height: 470 } });
  const megaCount = await page.locator('[data-testid="nav-mega-pharmacy"]').count();

  // move mouse off the nav so the mega-menu closes, then capture footer
  await page.mouse.move(20, 700);
  await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelector('[data-testid="footer"]').scrollIntoView());
  await wait(900);
  await page.screenshot({ path: "qa/agent7_footer.png" });
  const cols = await page.locator('[data-testid^="footer-col-"]').count();

  const m = await ctx.newPage();
  await m.setViewportSize({ width: 375, height: 720 });
  await m.goto("http://localhost:5000/", { waitUntil: "load" });
  await wait(1200);
  await m.locator('[data-testid="button-mobile-menu"]').click();
  await wait(600);
  await m.screenshot({ path: "qa/agent7_mobile_drawer.png" });
  const drawer = await m.locator('[data-testid="nav-mobile-drawer"]').count();
  const mobLinks = await m.locator('[data-testid^="nav-mobile-link-"]').count();
  const drawerBox = await m.locator('[data-testid="nav-mobile-drawer"]').boundingBox();
  console.log("mobLinks", mobLinks, "drawerBox", JSON.stringify(drawerBox));

  console.log(JSON.stringify({ megaCount, cols, drawer }));
  await b.close();
} catch (e) {
  console.error("QA ERROR:", e.message);
} finally {
  srv.kill("SIGKILL");
  process.exit(0);
}
