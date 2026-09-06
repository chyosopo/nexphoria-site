import { chromium, devices } from "playwright";
const b=await chromium.launch();
const p=await (await b.newContext({...devices["iPhone 13"]})).newPage();
for (const r of ["/how-it-works","/"]) {
  await p.goto("http://127.0.0.1:4173"+r,{waitUntil:"networkidle"});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}});
  await p.waitForTimeout(2500);
  const q = await p.evaluate(async()=>{
    const out=[];
    for (const i of [...document.images]) {
      const w = i.getBoundingClientRect().width;
      if (w < 200) continue;
      try { await i.decode(); } catch {}
      out.push({f:(i.currentSrc||"").split("/").pop().slice(0,34), got:i.naturalWidth, need:Math.round(w*devicePixelRatio)});
    }
    return out;
  });
  console.log(`── ${r}`);
  q.forEach(x=>console.log(`   ${x.f.padEnd(36)} got ${String(x.got).padStart(4)}w  needs ${String(x.need).padStart(4)}w  ${x.got>=x.need?"✓":"✗ SOFTER"}`));
}
await b.close();
