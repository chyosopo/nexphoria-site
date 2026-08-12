// scripts/shoot.mjs
// Playwright screenshot QA harness for the Nexphoria marketing site.
//
// Captures full-page screenshots of every key route, in BOTH worlds
// (men = azure/steel, women = orchid/rose-quartz) at desktop + mobile
// viewports. World is selected by pre-seeding localStorage `nx-world`.
//
// Usage:
//   node scripts/shoot.mjs                       # local dev (npm run dev)
//   SHOOT_BASE=http://localhost:5173 node scripts/shoot.mjs
//   SHOOT_BASE=https://chyosopo.github.io/nexphoria-site node scripts/shoot.mjs
//
// Local dev uses path routing ("/pricing"); the github.io deploy is
// hash-routed ("#/pricing"). We detect the github.io host and switch.

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.SHOOT_BASE || 'http://localhost:5173';
const IS_HASH = /github\.io/i.test(BASE);
const OUT_DIR = path.resolve(process.cwd(), 'qa_shots', 'baseline');

const ROUTES = [
  'men',
  'women',
  'pricing',
  'science',
  'bloodwork',
  'stacks',
  'build',
  'goals/recovery',
  'goals/skin',
  'how-it-works',
];

const WORLDS = ['men', 'women'];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

// Build a full URL for a route given the routing mode.
function urlFor(route) {
  const base = BASE.replace(/\/+$/, '');
  return IS_HASH ? `${base}/#/${route}` : `${base}/${route}`;
}

// Sanitize a route into a filename-safe slug (goals/recovery -> goals-recovery).
function slug(route) {
  return route.replace(/\//g, '-');
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  let shot = 0;

  try {
    for (const world of WORLDS) {
      for (const vp of VIEWPORTS) {
        // Fresh context per (world, viewport). Pre-seed nx-world in
        // localStorage before any page script runs, so the app boots
        // straight into the right world without an entry click.
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: 1,
        });
        await context.addInitScript((w) => {
          try {
            localStorage.setItem('nx-world', w);
          } catch (e) {
            /* localStorage may be unavailable before origin load; ignored */
          }
        }, world);

        const page = await context.newPage();

        for (const route of ROUTES) {
          const file = path.join(OUT_DIR, `${world}-${slug(route)}-${vp.name}.png`);
          const target = urlFor(route);
          try {
            await page.goto(target, { waitUntil: 'networkidle', timeout: 30000 });
            await page.waitForTimeout(400);
            await page.screenshot({ path: file, fullPage: true });
            shot += 1;
            console.log(`  ✓ ${world}/${route} @ ${vp.name} -> ${path.relative(process.cwd(), file)}`);
          } catch (err) {
            console.log(`  ✗ ${world}/${route} @ ${vp.name} FAILED: ${err.message}`);
          }
        }

        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`\nSHOT ${shot} images to qa_shots/baseline/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
