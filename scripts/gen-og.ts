/* ═══ OG SOCIAL-CARD GENERATOR ═══
   Renders the small set of section-branded 1200×630 Open Graph cards into
   client/public/og/ so every social share (LinkedIn, X, Slack, iMessage,
   Facebook) of a Nexphoria page unfurls a card that matches its SECTION —
   /science looks different from /peptides, /bloodwork, the journal, etc.
   Before this, all ~100 prerendered routes emitted the SAME generic
   og-default.png (a brand + CTR defect on every social surface).

   REPRODUCIBLE, ZERO NEW NATIVE DEPS: the cards are generated from typographic
   SVG/HTML templates, rasterized by the SAME headless chromium that
   script/prerender.ts already downloads (playwright, already a dep). No sharp /
   resvg / satori. Run:  npm run gen:og

   The generated PNGs are COMMITTED to client/public/og/ so `npm run build`
   stays hermetic (no network/browser needed at build time — vite copies
   client/public → dist/public/og verbatim). Re-run gen:og only when a card's
   copy or the brand palette changes; output is deterministic (same input →
   visually identical PNG) so re-runs don't churn.

   Route→card WIRING lives in client/src/lib/seo.ts (ogCardForPath) — keyed off
   each page's canonical `path`. This script only PRODUCES the assets; it does
   not decide which route gets which card. Keep the two in sync: every card name
   below must have a matching branch in ogCardForPath, and vice-versa.

   Brand fidelity: colors are the SHIPPED design tokens (client/src/index.css —
   Porcelain & Navy), the mark is the OFFICIAL three-cell logo (verbatim from
   client/src/components/Logo.tsx), and the type is the site's own Fraunces +
   General Sans (loaded from the same font CDNs as client/index.html). No
   invented brand colors, no off-palette art (Standing Law 1). */
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

// ── Palette — verbatim from client/src/index.css (:root, Porcelain & Navy) ──
const NAVY = "#132741"; // --nx-bg-dark: authoritative deep navy, world-neutral
const INK = "#0F2038"; // --nx-fg
const CERAMIC = "#FAFCFE"; // --nx-ceramic: elevated porcelain (light text on navy)
const COBALT = "#1E5A9E"; // --nx-cobalt: jewel cobalt accent
const ACID = "#9CBEE0"; // --nx-acid: light cobalt — mark + hairline on navy
const MUTED_ON_NAVY = "#9DB6D2"; // porcelain-muted for eyebrow/footer on navy

// Official Nexphoria mark — three linked cells (peptide bond). Path data lifted
// verbatim from client/src/components/Logo.tsx (viewBox 0 0 600 500).
const MARK = (fill: string, extra = "") =>
  `<svg viewBox="0 0 600 500" fill="${fill}" xmlns="http://www.w3.org/2000/svg" ${extra}>
    <circle cx="129.698" cy="380.792" r="71.864"/>
    <path d="M519.834,328.405c-17.864-16.774-41.141-22.533-62.628-18.55c-18.724,3.471-38.055-0.118-53.17-11.702l-6.86-5.257c-15.349-11.763-23.999-29.746-25.629-49.016c-1.685-19.927-11.623-39.039-29.014-51.808c-16.815-12.346-37.204-16.273-56.18-12.583c-18.19,3.537-37.03,0.099-51.739-11.173l-7.496-5.744c-15.472-11.857-24.203-29.973-25.892-49.393c-1.792-20.603-12.408-40.363-31.14-53.138c-29.987-20.451-71.799-14.725-95.228,12.998c-26.524,31.385-21.393,78.205,10.727,103.18c17.127,13.317,38.364,17.629,58.085,13.695c18.6-3.71,37.886,0.889,52.94,12.426l6.216,4.764c15.349,11.763,23.999,29.746,25.629,49.016c1.685,19.927,11.623,39.039,29.014,51.809c16.815,12.346,37.204,16.273,56.18,12.583c18.19-3.537,37.03-0.099,51.739,11.173l7.704,5.904c14.677,11.248,24.521,28.127,25.467,46.594c1.094,21.348,11.653,41.983,30.521,55.197c34.727,24.32,83.49,13.65,104.428-24.632C548.956,386.504,543.301,350.44,519.834,328.405z"/>
    <circle cx="470.305" cy="119.208" r="71.864"/>
  </svg>`;

/** The card set — SMALL and each genuinely distinct (depth over breadth).
    `name` MUST match a branch in seo.ts ogCardForPath. Voice is institutional:
    calm, precise, no hype, no exclamation, no defensive negation (Law 3). */
interface Card {
  name: string;
  eyebrow: string;
  /** Roman title; an optional trailing italic clause is set in Fraunces italic. */
  title: string;
  titleItalic?: string;
  subtitle: string;
}

const CARDS: Card[] = [
  {
    name: "og-home",
    eyebrow: "PHYSICIAN-GUIDED PEPTIDE THERAPY",
    title: "Science you can feel.",
    titleItalic: "Results you can measure.",
    subtitle: "Measured, prescribed, retested — by board-certified physicians.",
  },
  {
    name: "og-peptides",
    eyebrow: "THE CATALOG",
    title: "Peptides",
    subtitle: "Physician-prescribed protocols. Read properly, then treated.",
  },
  {
    name: "og-science",
    eyebrow: "THE EVIDENCE",
    title: "The Science",
    subtitle: "Mechanisms, trials, and what the data actually shows.",
  },
  {
    name: "og-bloodwork",
    eyebrow: "DIAGNOSTICS",
    title: "Bloodwork",
    subtitle: "A baseline read, a prescribed protocol, a retest to prove it.",
  },
  {
    name: "og-journal",
    eyebrow: "FIELD NOTES",
    title: "The Journal",
    subtitle: "Protocols, research, and practice — written plainly.",
  },
  {
    name: "og-stacks",
    eyebrow: "PROTOCOLS",
    title: "Protocols & Stacks",
    subtitle: "Physician-built peptide protocols, matched to a goal.",
  },
];

/** Full-page HTML for one card. 1200×630, deep-navy field, corner mark +
    wordmark, large Fraunces title, General Sans eyebrow/subtitle, a cobalt
    hairline footer, and a large low-opacity ghost mark for depth. */
function cardHtml(c: Card): string {
  return `<!doctype html><html><head><meta charset="utf-8"/>
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,500&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 1200px; height: 630px; }
    .card {
      position: relative; width: 1200px; height: 630px; overflow: hidden;
      background:
        radial-gradient(1100px 700px at 82% -12%, rgba(30,90,158,0.34), transparent 60%),
        radial-gradient(760px 520px at 6% 118%, rgba(30,90,158,0.20), transparent 62%),
        ${NAVY};
      color: ${CERAMIC};
      font-family: 'General Sans', system-ui, sans-serif;
      padding: 84px 92px;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    /* hairline frame — the private-bank register */
    .card::before {
      content: ""; position: absolute; inset: 30px;
      border: 1px solid rgba(156,190,224,0.22); border-radius: 4px; pointer-events: none;
    }
    .ghost { position: absolute; right: -90px; bottom: -140px; width: 620px; opacity: 0.06; }
    .brand { display: flex; align-items: center; gap: 18px; position: relative; }
    .brand .mark { width: 42px; height: 35px; display: block; }
    .wordmark {
      font-weight: 600; font-size: 25px; letter-spacing: 0.14em; text-transform: uppercase;
      color: ${CERAMIC}; line-height: 1;
    }
    .rule { width: 1px; height: 20px; background: rgba(156,190,224,0.4); }
    .submark {
      font-weight: 500; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase;
      color: ${MUTED_ON_NAVY}; line-height: 1;
    }
    .body { position: relative; max-width: 900px; }
    .eyebrow {
      font-weight: 600; font-size: 20px; letter-spacing: 0.2em; text-transform: uppercase;
      color: ${ACID}; margin-bottom: 26px;
    }
    .title {
      font-family: 'Fraunces', Georgia, serif; font-weight: 500; font-size: 86px; line-height: 1.02;
      letter-spacing: -0.01em; color: ${CERAMIC};
    }
    .title .it { display: block; font-style: italic; color: ${ACID}; }
    .subtitle {
      font-weight: 400; font-size: 27px; line-height: 1.4; color: ${MUTED_ON_NAVY};
      margin-top: 30px; max-width: 760px;
    }
    .foot { position: relative; display: flex; align-items: center; justify-content: space-between; }
    .foot .url { font-weight: 600; font-size: 20px; letter-spacing: 0.06em; color: ${CERAMIC}; }
    .foot .tag { font-weight: 500; font-size: 16px; letter-spacing: 0.16em; text-transform: uppercase; color: ${MUTED_ON_NAVY}; }
    .foot::before {
      content: ""; position: absolute; top: -26px; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, ${COBALT}, rgba(30,90,158,0) 78%);
    }
  </style></head>
  <body><div class="card">
    <div class="ghost">${MARK(ACID)}</div>
    <div class="brand">
      <span class="mark">${MARK(ACID)}</span>
      <span class="wordmark">Nexphoria</span>
      <span class="rule"></span>
      <span class="submark">Peptide Protocols</span>
    </div>
    <div class="body">
      <div class="eyebrow">${c.eyebrow}</div>
      <div class="title">${c.title}${c.titleItalic ? `<span class="it">${c.titleItalic}</span>` : ""}</div>
      <div class="subtitle">${c.subtitle}</div>
    </div>
    <div class="foot">
      <span class="url">nexphoria.com</span>
      <span class="tag">Science you can feel</span>
    </div>
  </div></body></html>`;
}

async function main() {
  const root = process.cwd();
  const outDir = `${root}/client/public/og`;
  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  try {
    for (const c of CARDS) {
      const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
      await page.setContent(cardHtml(c), { waitUntil: "networkidle" });
      // Ensure webfonts are fully laid out before the shot (else the first
      // render can capture a fallback-metrics flash → non-deterministic art).
      await page.evaluate(async () => {
        // @ts-ignore — document.fonts is the FontFaceSet API
        await (document as any).fonts.ready;
      });
      const outPath = `${outDir}/${c.name}.png`;
      await page.screenshot({ path: outPath, type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
      await page.close();
      console.log(`  og: wrote ${c.name}.png`);
    }
  } finally {
    await browser.close();
  }
  console.log(`gen:og complete — ${CARDS.length} section cards → client/public/og/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
