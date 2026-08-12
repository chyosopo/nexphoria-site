import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BASE = 'https://nexphoria.pplx.app';

const ROUTES = [
  '/',
  '/#/men',
  '/#/women',
  '/#/gate',
  '/#/peptides',
  '/#/peptides/bpc-157',
  '/#/peptides/tb-500',
  '/#/peptides/ghk-cu',
  '/#/peptides/tirzepatide',
  '/#/peptides/retatrutide',
  '/#/peptides/cjc-1295',
  '/#/peptides/ipamorelin',
  '/#/peptides/tesamorelin',
  '/#/men/peptides',
  '/#/men/peptides/bpc-157',
  '/#/men/protocols',
  '/#/women/peptides',
  '/#/women/peptides/ghk-cu',
  '/#/women/protocols',
  '/#/stacks',
  '/#/stacks/wolverine',
  '/#/stacks/glow',
  '/#/stacks/prime',
  '/#/stacks/restore',
  '/#/stacks/balance',
  '/#/stacks/lean',
  '/#/stacks/build',
  '/#/pricing',
  '/#/assessment',
  '/#/how-it-works',
  '/#/science',
  '/#/bloodwork',
  '/#/lab-testing',
  '/#/testing',
  '/#/journal',
  '/#/journal/what-are-peptides',
  '/#/about',
  '/#/physicians',
  '/#/community',
  '/#/contact',
  '/#/faq',
  '/#/cart',
  '/#/legal',
  '/#/legal/privacy',
  '/#/legal/terms',
  '/#/legal/refund-policy',
  '/#/legal/telehealth-consent',
  '/#/privacy',
  '/#/terms',
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const results = [];

for (const route of ROUTES) {
  const routeErrors = [];

  // Wire error collection
  const consoleHandler = msg => {
    if (msg.type() === 'error') routeErrors.push({ type: 'console', text: msg.text() });
  };
  const pageerrorHandler = err => routeErrors.push({ type: 'pageerror', text: err.message });
  const requestfailedHandler = req => routeErrors.push({
    type: 'requestfailed',
    url: req.url(),
    failure: req.failure()?.errorText
  });
  const responseHandler = res => {
    if (res.status() >= 400) routeErrors.push({ type: 'http', url: res.url(), status: res.status() });
  };

  page.on('console', consoleHandler);
  page.on('pageerror', pageerrorHandler);
  page.on('requestfailed', requestfailedHandler);
  page.on('response', responseHandler);

  let title = '';
  let errorTextCount = 0;
  let notFoundCount = 0;
  let navError = null;

  try {
    await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    title = await page.title();

    // Check for "Application error" or "not found" text
    const bodyText = await page.evaluate(() => document.body?.innerText || '');
    const lower = bodyText.toLowerCase();
    errorTextCount = (bodyText.match(/Application error/gi) || []).length;
    notFoundCount = (lower.match(/not found/gi) || []).length;

    // Check for broken images
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => !img.naturalWidth && img.complete)
        .map(img => img.src);
    });
    for (const src of brokenImages) {
      routeErrors.push({ type: 'broken_image', url: src });
    }

  } catch (e) {
    navError = e.message;
    routeErrors.push({ type: 'nav_error', text: e.message });
  }

  // Remove listeners before next route
  page.off('console', consoleHandler);
  page.off('pageerror', pageerrorHandler);
  page.off('requestfailed', requestfailedHandler);
  page.off('response', responseHandler);

  results.push({
    route,
    title,
    errorTextCount,
    notFoundCount,
    errors: [...routeErrors],
  });

  console.log(`[${routeErrors.length === 0 ? 'OK' : 'ERR'}] ${route} — ${routeErrors.length} errors`);
}

await browser.close();

// Write raw JSON
writeFileSync('/home/user/workspace/nexphoria-site/qa_shots/audit_raw.json', JSON.stringify(results, null, 2));

// ---- Build Markdown Report ----
const date = '2026-07-02';
const totalRoutes = results.length;
const cleanRoutes = results.filter(r => r.errors.length === 0);
const errorRoutes = results.filter(r => r.errors.length > 0);

// Classify severity
function classifyErrors(errors) {
  const critical = errors.filter(e =>
    e.type === 'pageerror' ||
    e.type === 'nav_error' ||
    (e.type === 'http' && e.status >= 500) ||
    (e.type === 'console' && /uncaught|cannot read|is not a function|is not defined|typeerror|referenceerror/i.test(e.text || ''))
  );
  const minor = errors.filter(e => !critical.includes(e));
  return { critical, minor };
}

let totalCritical = 0;
let totalMinor = 0;

let md = `# Nexphoria Route Audit — ${date}\n\n`;
md += `**Tested:** ${totalRoutes} routes  \n`;
md += `**Clean (0 errors):** ${cleanRoutes.length}  \n`;
md += `**Routes with errors:** ${errorRoutes.length}  \n\n`;
md += `---\n\n`;

md += `## Routes with ZERO Errors\n\n`;
if (cleanRoutes.length === 0) {
  md += `_None — all routes had at least one error._\n\n`;
} else {
  for (const r of cleanRoutes) {
    md += `- \`${r.route}\` — "${r.title}"\n`;
  }
  md += '\n';
}

md += `---\n\n`;
md += `## Routes with Errors\n\n`;

const recommendations = [];

for (const r of errorRoutes) {
  const { critical, minor } = classifyErrors(r.errors);
  totalCritical += critical.length;
  totalMinor += minor.length;

  md += `### \`${r.route}\`\n`;
  md += `**Title:** ${r.title || '(no title)'}  \n`;
  if (r.errorTextCount > 0) md += `**"Application error" text on page:** ${r.errorTextCount}  \n`;
  if (r.notFoundCount > 0) md += `**"not found" text on page:** ${r.notFoundCount}  \n`;
  md += `**Errors (${r.errors.length}):**\n\n`;

  for (const e of r.errors) {
    if (e.type === 'console') {
      md += `- 🔴 **console error:** \`${e.text}\`\n`;
    } else if (e.type === 'pageerror') {
      md += `- 🔴 **page error (uncaught):** \`${e.text}\`\n`;
    } else if (e.type === 'requestfailed') {
      md += `- 🟡 **request failed:** \`${e.url}\` — ${e.failure || 'unknown'}\n`;
    } else if (e.type === 'http') {
      const sev = e.status >= 500 ? '🔴' : '🟡';
      md += `- ${sev} **HTTP ${e.status}:** \`${e.url}\`\n`;
    } else if (e.type === 'broken_image') {
      md += `- 🟡 **broken image:** \`${e.url}\`\n`;
    } else if (e.type === 'nav_error') {
      md += `- 🔴 **navigation error:** \`${e.text}\`\n`;
    } else {
      md += `- ⚪ **${e.type}:** \`${JSON.stringify(e)}\`\n`;
    }

    // Collect recommendations
    if (e.type === 'pageerror' || e.type === 'nav_error') {
      recommendations.push({ severity: 'CRITICAL', route: r.route, desc: `Uncaught JS error: ${e.text?.substring(0, 120)}` });
    } else if (e.type === 'http' && e.status >= 500) {
      recommendations.push({ severity: 'CRITICAL', route: r.route, desc: `Server error ${e.status} on: ${e.url?.substring(0, 100)}` });
    } else if (e.type === 'console' && /uncaught|typeerror|referenceerror|cannot read/i.test(e.text || '')) {
      recommendations.push({ severity: 'CRITICAL', route: r.route, desc: `Critical console error: ${e.text?.substring(0, 120)}` });
    } else if (e.type === 'http' && e.status === 404) {
      recommendations.push({ severity: 'MINOR', route: r.route, desc: `404 on asset: ${e.url?.substring(0, 100)}` });
    } else if (e.type === 'broken_image') {
      recommendations.push({ severity: 'MINOR', route: r.route, desc: `Broken image: ${e.url?.substring(0, 100)}` });
    } else if (e.type === 'requestfailed') {
      recommendations.push({ severity: 'MINOR', route: r.route, desc: `Request failed (${e.failure}): ${e.url?.substring(0, 100)}` });
    } else if (e.type === 'console') {
      recommendations.push({ severity: 'MINOR', route: r.route, desc: `Console error: ${e.text?.substring(0, 120)}` });
    }
  }
  md += '\n';
}

md += `---\n\n`;
md += `## Summary\n\n`;
md += `| Metric | Count |\n|---|---|\n`;
md += `| Total routes tested | ${totalRoutes} |\n`;
md += `| Clean routes | ${cleanRoutes.length} |\n`;
md += `| Routes with errors | ${errorRoutes.length} |\n`;
md += `| Critical errors (total) | ${totalCritical} |\n`;
md += `| Minor errors (total) | ${totalMinor} |\n\n`;

md += `---\n\n`;
md += `## Recommendations (sorted by severity)\n\n`;

const critRec = recommendations.filter(r => r.severity === 'CRITICAL');
const minorRec = recommendations.filter(r => r.severity === 'MINOR');

// Deduplicate by desc
const dedupRec = (arr) => {
  const seen = new Set();
  return arr.filter(r => {
    const key = r.desc;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const critDedup = dedupRec(critRec);
const minorDedup = dedupRec(minorRec);

if (critDedup.length > 0) {
  md += `### Critical\n\n`;
  for (const r of critDedup) {
    md += `1. **[${r.route}]** ${r.desc}\n`;
  }
  md += '\n';
}

if (minorDedup.length > 0) {
  md += `### Minor\n\n`;
  for (const r of minorDedup) {
    md += `- **[${r.route}]** ${r.desc}\n`;
  }
  md += '\n';
}

writeFileSync('/home/user/workspace/nexphoria-site/qa_shots/route_audit_2026-07-02.md', md);
console.log('\nAudit complete. Report written.');
console.log(`Clean: ${cleanRoutes.length}/${totalRoutes}, Critical errors: ${totalCritical}, Minor: ${totalMinor}`);
