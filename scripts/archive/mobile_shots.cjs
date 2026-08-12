const { chromium } = require('playwright');
const fs = require('fs');

const routes = [
  ['/', 'home'],
  ['/peptides', 'peptides'],
  ['/stacks', 'stacks'],
  ['/pricing', 'pricing'],
  ['/how-it-works', 'howitworks'],
  ['/bloodwork', 'bloodwork'],
  ['/science', 'science'],
  ['/about', 'about'],
  ['/journal', 'journal'],
  ['/faq', 'faq'],
  ['/assessment', 'assessment'],
  ['/cart', 'cart'],
  ['/men', 'men'],
  ['/women', 'women'],
  ['/contact', 'contact'],
  ['/lab-testing', 'labtesting'],
  ['/physicians', 'physicians'],
];

(async () => {
  const outDir = '/home/user/workspace/nexphoria-site/qa_shots/mobile';
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const page = await ctx.newPage();
  const problems = [];
  for (const [route, name] of routes) {
    const url = `http://localhost:5000/#${route}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(400);
      // Measure horizontal overflow
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const overflowX = Math.max(body.scrollWidth, doc.scrollWidth) - doc.clientWidth;
        // Find offending elements
        const offenders = [];
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > doc.clientWidth + 1 && rect.width > 0 && el.offsetParent !== null) {
            offenders.push({
              tag: el.tagName,
              cls: (el.className || '').toString().slice(0, 60),
              width: Math.round(rect.width),
              right: Math.round(rect.right),
            });
          }
        });
        return { overflowX, offenders: offenders.slice(0, 5) };
      });
      await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
      if (overflow.overflowX > 4) {
        problems.push({ route, name, overflowX: overflow.overflowX, offenders: overflow.offenders });
        console.log(`XX ${route}  overflow ${overflow.overflowX}px`);
      } else {
        console.log(`OK ${route}`);
      }
    } catch (e) {
      console.log(`ERR ${route}: ${e.message.slice(0, 100)}`);
    }
  }
  fs.writeFileSync(`${outDir}/problems.json`, JSON.stringify(problems, null, 2));
  console.log(`\nProblems: ${problems.length}`);
  await browser.close();
})();
