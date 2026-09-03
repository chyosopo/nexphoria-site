/* ═══ Find your treatment by concern ═══
   The way the big consumer-health brands open: "What can we help you
   with?" in the customer's words, each answered with a medicine. Slugs
   resolve through SOLO_CATALOG so a retired molecule never renders.
   Copy system v4 (docs/COPY-DECK.md). No outcome promised; each line
   says what the medicine is used for. */
import { SOLO_CATALOG, type SoloPeptide } from "@/data/soloCatalog";
import type { PeptideCategory } from "@/data/peptides";

export interface Concern {
  /** in the customer's words */
  concern: string;
  /** the plain answer */
  line: string;
  goal: PeptideCategory;
  slugs: string[];
}

export const CONCERNS: Concern[] = [
  { concern: "I want to lose weight", line: "GLP-1 medication that makes you feel full sooner and stay full longer.", goal: "metabolic", slugs: ["semaglutide", "tirzepatide"] },
  { concern: "Stubborn belly fat", line: "Tesamorelin, studied for the deep fat around the organs.", goal: "growth", slugs: ["tesamorelin"] },
  { concern: "Slow recovery, nagging injuries", line: "BPC-157 and TB-500, studied for tendon, muscle and joint repair.", goal: "recovery", slugs: ["bpc-tb-combo", "bpc-157", "tb-500"] },
  { concern: "Low energy", line: "NAD+ and MOTS-c, for energy at the cellular level.", goal: "longevity", slugs: ["nad-plus", "mots-c"] },
  { concern: "Brain fog", line: "Semax, a nasal spray studied for focus and mental stamina.", goal: "cognition", slugs: ["semax", "methylene-blue"] },
  { concern: "Stress and low mood", line: "Selank, a nasal spray for a steadier mood under pressure.", goal: "cognition", slugs: ["selank"] },
  { concern: "Poor sleep", line: "DSIP, studied for falling asleep faster and sleeping deeper.", goal: "sleep", slugs: ["dsip"] },
  { concern: "Skin that is losing its bounce", line: "GHK-Cu, a copper peptide studied for collagen and elasticity.", goal: "skin", slugs: ["ghk-cu", "epitalon"] },
  { concern: "Lean mass and recovery as I age", line: "Growth hormone peptides that raise your own supply.", goal: "growth", slugs: ["ipa-cjc", "sermorelin", "ipamorelin", "cjc-1295"] },
  { concern: "Low sexual desire", line: "PT-141, which works on desire itself, as needed.", goal: "sexual-health", slugs: ["pt-141"] },
];

/** Live medicines for a concern, in the order listed. */
export function concernSkus(c: Concern): SoloPeptide[] {
  return c.slugs.map((s) => SOLO_CATALOG.find((x) => x.slug === s)).filter((x): x is SoloPeptide => Boolean(x));
}

/** Concerns with at least one live medicine. */
export function liveConcerns(): Concern[] {
  return CONCERNS.filter((c) => concernSkus(c).length > 0);
}
