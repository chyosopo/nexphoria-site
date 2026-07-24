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
  return out;
}

async function readSolos(root: string): Promise<Solo[]> {
  const src = await readFile(`${root}/client/src/data/soloCatalog.ts`, "utf-8");
  const re = /slug:\s*"([a-z0-9-]+)",\s*name:\s*"([^"]+)",\s*category:\s*"[^"]+",\s*\n\s*outcome:\s*"([^"]+)"/g;
  const out: Solo[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) out.push({ slug: m[1], name: m[2], outcome: m[3] });
  return out;
}

export async function generateLlms(): Promise<{ stacks: number; solos: number }> {
  const root = process.cwd();
  const stacks = await readStacks(root);
  const solos = await readSolos(root);
  if (stacks.length < 5 || solos.length < 10) {
    throw new Error(`genLlms: implausible catalog sizes (stacks=${stacks.length}, solos=${solos.length}) — data shape changed?`);
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
