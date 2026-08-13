/* Verify the consent gates RENDER and genuinely BLOCK submit.

   Driving the intake step-by-step kept failing on per-step validation, so this
   seeds the draft the flow already autosaves (DRAFT_KEY "nx-assessment-draft",
   {v:1, form, step}) and lands directly on the review step. Synthetic values
   only — no real person, no real health data. */
import { createRequire } from "node:module";
const require = createRequire("/home/user/nexphoria-site/package.json");
const { chromium } = require("playwright");
const OUT = "/tmp/claude-0/-home-user-nexphoria-site/879e755e-4e72-5062-bfe4-4ef0e3861870/scratchpad/preview";

const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  args: ["--no-sandbox", "--proxy-bypass-list=*", "--proxy-server=direct://"],
});

async function run(label, medicalHistory, expectGates) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto("http://127.0.0.1:5055/assessment", { waitUntil: "domcontentloaded", timeout: 25000 });
  await p.evaluate((hist) => {
    localStorage.setItem("nx-assessment-draft", JSON.stringify({
      v: 1, step: 7,
      form: {
        gender: "male", goal: "weight", age: "35",
        medications: "", noMedications: true,
        medicalHistory: hist, recentLabs: "no",
        name: "Test Person", email: "test@example.com",
        phone: "5555550123", state: "WA",
      },
    }));
  }, medicalHistory);
  await p.reload({ waitUntil: "domcontentloaded" });
  await p.waitForTimeout(2200);

  // Dismiss the restore banner if it intercepts.
  await p.locator('[data-testid="assessment-restore-dismiss"]').click({ timeout: 1500 }).catch(() => {});
  await p.waitForTimeout(600);

  const before = await p.evaluate(() => {
    const btn = document.querySelector('[data-testid="assessment-next"]');
    return {
      gates: [...document.querySelectorAll('[data-testid^="consent-"]')].map((e) => e.getAttribute("data-testid")),
      label: btn?.textContent?.trim().slice(0, 30) ?? null,
      disabled: btn?.getAttribute("aria-disabled") ?? null,
    };
  });
  console.log(`\n[${label}] expect ${expectGates} gates`);
  console.log("  rendered:", JSON.stringify(before));

  if (before.gates.length) {
    await p.screenshot({ path: `${OUT}/CONSENT-${label}-blocked.jpg`, type: "jpeg", quality: 82 });
    for (const t of before.gates) {
      await p.locator(`[data-testid="${t}"] input`).click({ timeout: 2500 }).catch(() => {});
      await p.waitForTimeout(180);
    }
    const after = await p.evaluate(() =>
      document.querySelector('[data-testid="assessment-next"]')?.getAttribute("aria-disabled") ?? null);
    console.log(`  after ticking all ${before.gates.length}: disabled=${after}`);
    await p.screenshot({ path: `${OUT}/CONSENT-${label}-unlocked.jpg`, type: "jpeg", quality: 82 });
  }
  await ctx.close();
}

// No flagged condition -> 2 gates. Flagged cancer -> 3 gates.
await run("clean", ["none"], 2);
await run("flagged", ["cancer"], 3);
await b.close();
