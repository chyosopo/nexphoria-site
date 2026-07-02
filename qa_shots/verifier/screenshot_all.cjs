const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:5000/#';
const OUT_DIR = '/home/user/workspace/nexphoria-site/qa_shots/verifier';

const routes = [
  { path: '/', name: 'home' },
  { path: '/peptides', name: 'peptides' },
  { path: '/peptides/tirzepatide', name: 'peptides_tirzepatide' },
  { path: '/stacks', name: 'stacks' },
  { path: '/stacks/wolverine', name: 'stacks_wolverine' },
  { path: '/how-it-works', name: 'how-it-works' },
  { path: '/pricing', name: 'pricing' },
  { path: '/bloodwork', name: 'bloodwork' },
  { path: '/about', name: 'about' },
  { path: '/science', name: 'science' },
  { path: '/physicians', name: 'physicians' },
  { path: '/faq', name: 'faq' },
  { path: '/lab-testing', name: 'lab-testing' },
  { path: '/men', name: 'men' },
  { path: '/women', name: 'women' },
  { path: '/men/peptides', name: 'men_peptides' },
  { path: '/women/peptides', name: 'women_peptides' },
  { path: '/assessment', name: 'assessment' },
  { path: '/cart', name: 'cart' },
  { path: '/checkout', name: 'checkout' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
];

const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 375, height: 800 },
];

const consoleErrors = {};
const routeResults = {};

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const vp of viewports) {
    console.log(`\n=== ${vp.name.toUpperCase()} (${vp.width}px) ===`);
    
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    // Collect console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      errors.push(`PAGE ERROR: ${err.message}`);
    });
    page.on('requestfailed', req => {
      errors.push(`REQUEST FAILED: ${req.url()} - ${req.failure()?.errorText}`);
    });

    for (const route of routes) {
      const url = BASE + route.path;
      const filename = `${route.name}_${vp.name}.png`;
      const filepath = path.join(OUT_DIR, filename);
      
      errors.length = 0; // reset per page
      
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(1500);
        
        // Full page screenshot
        await page.screenshot({ path: filepath, fullPage: true });
        
        // Store console errors
        const key = `${route.name}_${vp.name}`;
        consoleErrors[key] = [...errors];
        
        if (!routeResults[route.name]) routeResults[route.name] = {};
        routeResults[route.name][vp.name] = {
          status: 'ok',
          consoleErrors: [...errors],
          screenshot: filepath,
        };
        
        console.log(`  ✓ ${route.path} → ${filename} (errors: ${errors.length})`);
      } catch (e) {
        console.error(`  ✗ ${route.path} → ERROR: ${e.message}`);
        if (!routeResults[route.name]) routeResults[route.name] = {};
        routeResults[route.name][vp.name] = {
          status: 'error',
          error: e.message,
          consoleErrors: [...errors],
        };
      }
    }

    await context.close();
  }

  await browser.close();

  // Save results JSON
  fs.writeFileSync(
    path.join(OUT_DIR, 'console_errors.json'),
    JSON.stringify(routeResults, null, 2)
  );
  console.log('\nDone. Results written to console_errors.json');
}

run().catch(console.error);
