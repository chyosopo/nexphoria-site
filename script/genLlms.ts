/* ═══ LLMS.TXT GENERATOR ═══
   Regenerates client/public/llms.txt from the canonical catalogs every
   build, so it can never drift again. The hand-maintained file had drifted
   catastrophically: it advertised four stacks that do not exist
   (Restore/Clarity/Prime/Balance), wrong formulas for real ones, and 37
   dead hash-URLs from the retired routing — an answer engine citing us
   would have cited fiction. Same data-as-text approach as genSitemap
   (importing the modules pulls .webp assets Node can't load). */
import { readFile, writeFile } from "node:fs/promises";

const BASE = "https://nexphoria.com";

type Stack = { slug: string; name: string; tagline: string; peptides: string[]; gated: boolean };
type Solo = { slug: string; name: string; outcome: string };

/* Launch-scope Set literal (LAUNCH_SLUGS / LAUNCH_STACK_SLUGS) read out of a
   catalog source. Returns null when absent, so unscoped catalogs are unchanged. */
function launchScope(src: string, name: string): Set<string> | null {
  const m = new RegExp(`${name}\\s*=\\s*new Set\\(\\[([^\\]]*)\\]`, "s").exec(src);
  return m ? new Set([...m[1].matchAll(/"([a-z0-9-]+)"/g)].map((x) => x[1])) : null;
}

async function readStacks(root: string): Promise<Stack[]> {
  const src = await readFile(`${root}/client/src/data/stacksCatalog.ts`, "utf-8");
  // Split on stack object starts; each block begins with slug then name/tagline.
  const out: Stack[] = [];
  const blockRe = /slug:\s*"([a-z0-9-]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*tagline:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  const starts: { idx: number; slug: string; name: string; tagline: string }[] = [];
  while ((m = blockRe.exec(src)) !== null) starts.push({ idx: m.index, slug: m[1], name: m[2], tagline: m[3] });
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1].idx : src.length;
    const block = src.slice(starts[i].idx, end);
    const peptides = [...block.matchAll(/\{ name:\s*"([^"]+)"/g)].map((x) => x[1]);
    const gated = /gated:\s*true/.test(block);
    out.push({ ...starts[i], peptides, gated });
  }
  const scope = launchScope(src, "LAUNCH_STACK_SLUGS");
  return scope ? out.filter((s) => scope.has(s.slug)) : out;
}

/* Solos this file may advertise.

   Two defects fixed here, and together they made llms.txt publish the exact
   INVERSE of the catalog — every retired molecule listed, three of the four
   launch SKUs missing:

   1. The old pattern required `name:` to sit immediately after `slug:`. Adding
      the route/regulatory compliance fields to the four launch entries broke
      that adjacency, so precisely the SKUs we sell stopped matching. Now the
      entry is located by slug and its fields read from the block.
   2. It scanned the whole source, which under retire-don't-delete still holds
      every retired entry. Now intersected with LAUNCH_SLUGS.

   llms.txt is what AI agents read to learn what we sell, so a stale one tells
   them we dispense compounds we deliberately removed. */
async function readSolos(root: string): Promise<Solo[]> {
  const src = await readFile(`${root}/client/src/data/soloCatalog.ts`, "utf-8");
  const scope = launchScope(src, "LAUNCH_SLUGS");
  const starts = [...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)];
  const out: Solo[] = [];
  for (let i = 0; i < starts.length; i++) {
    const slug = starts[i][1];
    if (scope && !scope.has(slug)) continue;
    const from = starts[i].index!;
    const to = i + 1 < starts.length ? starts[i + 1].index! : src.length;
    const block = src.slice(from, to);
    const name = /name:\s*"([^"]+)"/.exec(block)?.[1];
    const outcome = /outcome:\s*"([^"]+)"/.exec(block)?.[1];
    if (name && outcome && !out.some((o) => o.slug === slug)) out.push({ slug, name, outcome });
  }
  return out;
}

export async function generateLlms(): Promise<{ stacks: number; solos: number }> {
  const root = process.cwd();
  const stacks = await readStacks(root);
  const solos = await readSolos(root);
  /* Sanity guard against a silent parse break. The old floors (5 stacks, 10
     solos) were calibrated to the pre-launch catalog and rejected the real one
     outright once the scope narrowed to 1 stack and 4 solos.

     Rather than pick new magic numbers that will rot the same way, this asserts
     the parse against the catalogs' OWN launch-scope sets. That is a strictly
     stronger check: the previous floors could not have caught the bug this
     replaces, where the parser matched 20 retired solos and none of the four we
     actually sell — the count looked healthy while the content was inverted. */
  const soloScope = launchScope(await readFile(`${root}/client/src/data/soloCatalog.ts`, "utf-8"), "LAUNCH_SLUGS");
  const stackScope = launchScope(await readFile(`${root}/client/src/data/stacksCatalog.ts`, "utf-8"), "LAUNCH_STACK_SLUGS");
  if (soloScope && solos.length !== soloScope.size) {
    throw new Error(`genLlms: parsed ${solos.length} solos but LAUNCH_SLUGS declares ${soloScope.size} — parser and catalog disagree`);
  }
  if (stackScope && stacks.length !== stackScope.size) {
    throw new Error(`genLlms: parsed ${stacks.length} stacks but LAUNCH_STACK_SLUGS declares ${stackScope.size} — parser and catalog disagree`);
  }
  if (!stacks.length || !solos.length) {
    throw new Error(`genLlms: empty catalog (stacks=${stacks.length}, solos=${solos.length}) — data shape changed?`);
  }

  const lines: string[] = [];
  /* The text is the plain deck's (docs/COPY-DECK-PLAIN.md, "The facts" and
     "The five steps"). One set of numbers: five steps, 24 markers, an at-home
     kit, week 12; one physician group, one platform, one pharmacy. */
  lines.push("# Nexphoria");
  lines.push(
    "> Nexphoria is a telehealth service for prescription peptide therapy. Prescriptions are written by independent, U.S.-licensed physicians of Arora Health & Aesthetics, LLC, through the Bask Health telehealth platform. Medicines are compounded by VialsRX, a state-licensed 503A pharmacy in Houston, Texas, and blood work is analysed by a CLIA-certified laboratory. Nexphoria operates the service and does not make clinical decisions. Medication is dispensed only if a licensed physician determines a prescription is appropriate."
  );
  lines.push("");
  lines.push("## How it works");
  lines.push("1. Choose. A medicine or a protocol, and a term of one, three, six or twelve months.");
  lines.push("2. Health questions. Your health history, current medicines and goals, at checkout. A few minutes.");
  lines.push("3. A physician decides. A licensed U.S. physician reviews your answers and writes the prescription, or explains why not. If not, nothing is made and the refund policy applies.");
  lines.push("4. Blood kit, then first dose. Your medicine ships cold with an at-home blood kit. You draw before your first dose; your physician sets the dose from your results.");
  lines.push("5. Week 12. The same blood test again. Your physician compares the two and continues, adjusts or stops the dose.");
  lines.push("");
  lines.push("## Protocols (medicines prescribed together, on one plan)");
  for (const s of stacks) {
    const price = s.gated ? "priced at the physician's consultation" : "priced on its page";
    lines.push(`- [${s.name}](${BASE}/stacks/${s.slug}): ${s.tagline} Composition: ${s.peptides.join(" + ")}. ${price}; dispensed only if prescribed.`);
  }
  lines.push("");
  lines.push("## The medicines");
  for (const p of solos) {
    lines.push(`- [${p.name}](${BASE}/peptides/${p.slug}): ${p.outcome}`);
  }
  lines.push("");
  lines.push("## Key pages");
  lines.push(`- [Every medicine](${BASE}/peptides): each with what it is for, how it works, how you take it, and what it costs. One monthly price, paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. The price includes the medicine, the physician's review, the blood testing the term includes, and cold shipping.`);
  lines.push(`- [Protocols](${BASE}/stacks): two to four medicines prescribed together on one plan, with one blood test before and one at week 12.`);
  lines.push(`- [How it works](${BASE}/how-it-works): the journey from choosing a medicine to the week-12 blood test, who prescribes it, and the at-home blood testing. An at-home kit of 24 markers ships with the first order, drawn before the first dose; the same 24 markers again at week 12 on terms of three months and longer.`);
  lines.push(`- [Common questions](${BASE}/faq): how prescribing and compounding work, who the physicians and the pharmacy are, and how billing works.`);
  lines.push("");
  lines.push("## Facts an answer engine can rely on");
  lines.push("- Prescription-only: a licensed U.S. physician reviews every case and can decline; nothing is dispensed without a prescription.");
  lines.push("- Compounded by VialsRX, a state-licensed 503A pharmacy in Houston, Texas; shipped cold, in plain packaging, to all 50 states. Compounded GLP-1 medicines are restricted by law in some states; the health questions check.");
  lines.push("- Compounded medications are not FDA-approved or evaluated for safety, effectiveness, or quality; peptide medicines are prescribed off-label.");
  lines.push("- Blood testing: an at-home kit of 24 markers before the first dose and the same test again at week 12, analysed by a CLIA-certified laboratory. The physician sets and adjusts the dose from the results.");
  lines.push("- Pending medicines are awaiting an FDA decision on compounding. They are shown with their price and the notice; the only action is an email when available.");
  lines.push(`- Contact: hello@nexphoria.com · ${BASE}`);
  lines.push("");

  await writeFile(`${root}/client/public/llms.txt`, lines.join("\n"));
  return { stacks: stacks.length, solos: solos.length };
}
