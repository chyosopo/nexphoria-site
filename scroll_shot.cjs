const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/home/user/workspace/nexphoria-site/qa_shots/scroll_home_800.png', fullPage: false });
  const val = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--nx-scroll-progress'));
  console.log('progress at 800:', val.trim());
  await browser.close();
})();
