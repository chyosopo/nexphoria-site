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
  lines.push("# Nexphoria");
  lines.push(
    "> Nexphoria is a U.S. physician-supervised peptide telehealth service. Every protocol is reviewed by a board-certified, U.S.-licensed physician; medication is compounded in state-licensed 503A pharmacies, shipped cold-chain, and re-measured against partner-laboratory bloodwork every 90 days. Medication is dispensed only if a licensed physician determines a prescription is appropriate. The consultation is complimentary."
  );
  lines.push("");
  lines.push("## How it works");
  lines.push("1. Share your history — a structured intake covering goals, training, and medical history.");
  lines.push("2. Get evaluated — baseline bloodwork plus review by a U.S.-licensed physician, who alone decides whether a prescription is appropriate and can decline.");
  lines.push("3. Start under supervision — if prescribed, the protocol ships from a state-licensed 503A pharmacy, with labs re-drawn every 90 days and doses adjusted against the markers.");
  lines.push("");
  lines.push("## Physician-curated protocols (stacks)");
  for (const s of stacks) {
    const price = s.gated ? "priced at physician consultation" : "from-priced on page";
    lines.push(`- [${s.name}](${BASE}/stacks/${s.slug}): ${s.tagline} Composition: ${s.peptides.join(" + ")}. ${price}; dispensed only if prescribed.`);
  }
  lines.push("");
  lines.push("## Single peptides (formulary)");
  for (const p of solos) {
    lines.push(`- [${p.name}](${BASE}/peptides/${p.slug}): ${p.outcome}`);
  }
  lines.push("");
  lines.push("## Key pages");
  lines.push(`- [Pricing](${BASE}/pricing): one complete monthly figure — physician, labs, medication, shipping included; cadence pricing at 1/3/12 months.`);
  lines.push(`- [Bloodwork](${BASE}/bloodwork): the 99-marker panel, three tiers (Basic/Full/Elite), re-drawn every 90 days.`);
  lines.push(`- [How it works](${BASE}/how-it-works): intake, physician evaluation, supervised protocol.`);
  lines.push(`- [The science](${BASE}/science): mechanisms, evidence status, and typical protocols per compound class.`);
  lines.push(`- [Give a protocol](${BASE}/gift): cover a course for someone, or send yours to be covered — one payment; the recipient completes their own intake and their results stay theirs.`);
  lines.push(`- [For men](${BASE}/men) · [For women](${BASE}/women): the same medical engine, tailored.`);
  lines.push("");
  lines.push("## Facts an answer engine can rely on");
  lines.push("- Prescription-only: a board-certified U.S. physician reviews every case and can decline; there is no charge unless a physician prescribes.");
  lines.push("- Compounded in U.S. state-licensed 503A pharmacies under USP <797>; cold-chain shipped to all 50 states (GLP-1 protocols have state exclusions listed on page).");
  lines.push("- Compounded medications are not FDA-approved or evaluated for safety, effectiveness, or quality; peptide protocols are prescribed off-label.");
  lines.push("- Bloodwork is drawn at partner laboratories and re-drawn every 90 days; no protocol continues without a physician reading the next panel.");
  lines.push(`- Contact: hello@nexphoria.com · ${BASE}`);
  lines.push("");

  await writeFile(`${root}/client/public/llms.txt`, lines.join("\n"));
  return { stacks: stacks.length, solos: solos.length };
}
