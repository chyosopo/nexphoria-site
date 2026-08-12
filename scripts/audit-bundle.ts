/* ═══ BUNDLE GATE — E35 · the 223KB first paint, defended ═══
   Asserts against dist/public after a build:
   1. index-*.js stays under budget (raw bytes)
   2. recharts (the 509KB regression we already fought once) is NOT
      in the entry bundle and NOT modulepreloaded from index.html
   3. index.html modulepreloads stay a short list (no eager page chunks)
   Run: npm run audit:bundle (after vite build). Exit 1 on breach. */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist/public";
const ASSETS = join(DIST, "assets");
const ENTRY_BUDGET = 300 * 1024; // bytes, raw — current ~249KB + headroom
const PRELOAD_BUDGET = 6; // index.html modulepreload count ceiling

let fail = 0;
const flunk = (msg: string) => { console.error("FAIL  " + msg); fail = 1; };
const pass = (msg: string) => console.log("ok    " + msg);

const files = readdirSync(ASSETS);
const entry = files.find((f) => /^index-.*\.js$/.test(f));
if (!entry) { flunk("no index-*.js entry found"); process.exit(1); }

const entryPath = join(ASSETS, entry);
const size = statSync(entryPath).size;
size <= ENTRY_BUDGET
  ? pass(`entry ${entry} ${(size / 1024).toFixed(0)}KB ≤ budget ${(ENTRY_BUDGET / 1024).toFixed(0)}KB`)
  : flunk(`entry ${entry} ${(size / 1024).toFixed(0)}KB exceeds budget ${(ENTRY_BUDGET / 1024).toFixed(0)}KB`);

const entrySrc = readFileSync(entryPath, "utf8");
// recharts signature strings that survive minification
const rechartsLeak = /recharts|CartesianGrid|ResponsiveContainer/.test(entrySrc);
rechartsLeak
  ? flunk("recharts code detected inside the ENTRY bundle — chart split regressed")
  : pass("entry bundle is recharts-free");

const html = readFileSync(join(DIST, "index.html"), "utf8");
const preloads = [...html.matchAll(/rel="modulepreload"[^>]*href="\.\/assets\/([^"]+)"/g)].map((m) => m[1]);
preloads.length <= PRELOAD_BUDGET
  ? pass(`modulepreloads: ${preloads.length} ≤ ${PRELOAD_BUDGET} (${preloads.join(", ") || "none"})`)
  : flunk(`modulepreloads: ${preloads.length} > ${PRELOAD_BUDGET} — eager chunks crept into first paint: ${preloads.join(", ")}`);

const bloodworkPreloaded = preloads.some((f) => /Bloodwork/i.test(f));
bloodworkPreloaded
  ? flunk("Bloodwork (recharts) chunk is modulepreloaded — everyone pays for charts again")
  : pass("Bloodwork chunk rides lazy, not preloaded");

process.exit(fail);
