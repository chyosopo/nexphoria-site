/* ──────────────────────────────────────────────────────────────
   Nexphoria Flagship Stacks — physician-curated peptide combinations
   Each stack is a pre-filled cart users can buy as-is or customize.
   ────────────────────────────────────────────────────────────── */

export interface Stack {
  slug: string;
  name: string;
  tagline: string;
  /** one-line clinical purpose */
  purpose: string;
  /** physician who curated the stack */
  curator: string;
  /** longer narrative */
  description: string;
  /** peptide slugs included */
  peptides: string[];
  /** what bloodwork this stack tracks */
  labMarkers: string[];
  /** weeks the protocol runs */
  duration: string;
  /** who this is for */
  bestFor: string;
  /** brand image asset name (in assets/brand/) */
  image: string;
  /** gender targeting — controls where it surfaces */
  gender: "her" | "him" | "both";
  /** badge */
  badge?: "Flagship" | "Bestseller" | "New";
}

export const stacks: Stack[] = [
  {
    slug: "wolverine",
    name: "Wolverine",
    tagline: "The repair stack.",
    purpose: "Accelerate tendon, ligament, and soft-tissue recovery from training or injury.",
    curator: "Dr. Marcus Bennett, MD — Sports Medicine",
    description: "Three peptides working in concert: BPC-157 drives local repair signaling, TB-500 coordinates systemic cellular migration, GHK-Cu accelerates collagen synthesis. Tracks CRP, ESR, and CK-MB to confirm inflammatory resolution.",
    peptides: ["bpc-157", "tb-500", "ghk-cu"],
    labMarkers: ["CRP", "ESR", "CK-MB", "Vitamin D"],
    duration: "8-week course, optional 4-week consolidation",
    bestFor: "Active adults recovering from injury, surgery, or chronic overuse",
    image: "stack-wolverine",
    gender: "him",
    badge: "Flagship",
  },
  {
    slug: "glow",
    name: "Glow",
    tagline: "The skin stack.",
    purpose: "Restore dermal collagen, even skin tone, reduce visible aging from the inside.",
    curator: "Dr. Sofia Chen, MD — Endocrinology",
    description: "GHK-Cu, the copper-binding tripeptide that's been studied in dermatology for 40 years, pairs with BPC-157 for systemic repair and a low-dose tirzepatide micropulse for metabolic skin support. Tracks Vitamin D, fasting insulin, and HbA1c.",
    peptides: ["ghk-cu", "bpc-157", "tirzepatide"],
    labMarkers: ["Vitamin D", "Fasting Insulin", "HbA1c", "ALT/AST"],
    duration: "12-week course, taper to maintenance",
    bestFor: "Adults 35–60 prioritizing skin, sleep, and metabolic health",
    image: "stack-glow",
    gender: "her",
    badge: "Flagship",
  },
  {
    slug: "restore",
    name: "Restore",
    tagline: "The sleep stack.",
    purpose: "Deeper sleep, faster onset, more restorative REM cycles.",
    curator: "Dr. Aisha Patel, MD — Internal Medicine",
    description: "DSIP (delta sleep–inducing peptide) plus Epitalon for circadian regulation and Selank for pre-sleep anxiolysis. The combination has been studied for shift workers and chronic insomnia.",
    peptides: ["dsip", "epitalon", "selank"],
    labMarkers: ["Cortisol AM/PM", "DHEA-S", "Melatonin"],
    duration: "6-week course, repeat seasonally",
    bestFor: "Adults with chronic sleep onset issues, shift workers, frequent travelers",
    image: "stack-sleep",
    gender: "both",
  },
  {
    slug: "clarity",
    name: "Clarity",
    tagline: "The cognitive stack.",
    purpose: "Improved focus, mood resilience, and stress recovery without stimulants.",
    curator: "Dr. James Okafor, MD — Neurology",
    description: "Semax and Selank — both Russian-developed neuropeptides with decades of clinical literature — paired with low-dose Epitalon for circadian alignment. BDNF and inflammatory markers monitored quarterly.",
    peptides: ["semax", "selank", "epitalon"],
    labMarkers: ["hs-CRP", "Homocysteine", "Vitamin B12", "Ferritin"],
    duration: "8-week course, cyclical",
    bestFor: "High-performers managing chronic stress, founders, executives",
    image: "lifestyle-cognition",
    gender: "both",
  },
  {
    slug: "prime",
    name: "Prime",
    tagline: "The metabolic stack.",
    purpose: "Sustainable weight loss with muscle preservation and metabolic monitoring.",
    curator: "Dr. Sofia Chen, MD — Endocrinology",
    description: "Tirzepatide titrated by your physician, paired with MOTS-c for mitochondrial support and Ipamorelin to preserve lean mass during the deficit. Full metabolic panel monitored monthly.",
    peptides: ["tirzepatide", "mots-c", "ipamorelin"],
    labMarkers: ["HbA1c", "Fasting Insulin", "Lipid Panel", "ALT/AST", "IGF-1"],
    duration: "16-week initial course, ongoing maintenance",
    bestFor: "Adults pursuing 10%+ weight loss with metabolic biomarker tracking",
    image: "stack-weightloss",
    gender: "both",
    badge: "Bestseller",
  },
  {
    slug: "balance",
    name: "Balance",
    tagline: "The cellular stack.",
    purpose: "Mitochondrial function, telomere health, and biological-age regression markers.",
    curator: "Dr. Diego Reyes, MD — Internal Medicine",
    description: "NAD+ for cellular energetics, MOTS-c for mitochondrial signaling, Epitalon for telomerase support. Optional epigenetic-clock testing add-on to track biological age over the protocol.",
    peptides: ["nad-plus", "mots-c", "epitalon"],
    labMarkers: ["IGF-1", "hs-CRP", "Homocysteine", "Epigenetic Clock (opt)"],
    duration: "12-week course, repeat 2×/year",
    bestFor: "Adults 40+ optimizing healthspan with biomarker tracking",
    image: "stack-longevity",
    gender: "both",
  },
];

/** Slug aliases so old marketing/nav links keep resolving. */
const SLUG_ALIASES: Record<string, string> = {
  // legacy data slugs
  sleep: "restore",
  cognitive: "clarity",
  metabolic: "prime",
  longevity: "balance",
  // early marketing variants that shipped in Home tiles / other pages
  growth: "balance",
  glp1: "prime",
};

export function resolveStackSlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

export function getStack(slug: string): Stack | undefined {
  const resolved = resolveStackSlug(slug);
  return stacks.find((s) => s.slug === resolved);
}

export function getStacksForGender(g: "her" | "him"): Stack[] {
  return stacks.filter((s) => s.gender === g || s.gender === "both");
}

/** Compute discounted bundle price — 12% off sum of individual peptide prices */
export function computeStackPrice(stack: Stack, pricing: Record<string, { monthlyPrice: number }>): { sum: number; bundle: number; savings: number } {
  const sum = stack.peptides.reduce((acc, slug) => acc + (pricing[slug]?.monthlyPrice || 0), 0);
  const bundle = Math.round(sum * 0.88);
  return { sum, bundle, savings: sum - bundle };
}
