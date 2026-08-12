import { spawn } from "node:child_process";
import { chromium } from "playwright";
const srv = spawn("node", ["dist/index.cjs"], { env: { ...process.env, NODE_ENV: "production" }, stdio: "inherit" });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function up(){for(let i=0;i<30;i++){try{const r=await fetch("http://localhost:5000/");if(r.ok)return true;}catch{}await wait(500);}return false;}
try{
  if(!(await up())) throw new Error("no server");
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5000/", { waitUntil: "load" });
  await wait(1500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(1200);
  await page.locator('[data-testid="footer"]').scrollIntoViewIfNeeded();
  await wait(500);
  const el = page.locator('[data-testid="footer"]');
  await el.screenshot({ path: "qa/agent7_footer.png" });
  console.log("footer shot done");
  await b.close();
}catch(e){console.error("ERR",e.message);}finally{srv.kill("SIGKILL");process.exit(0);}
