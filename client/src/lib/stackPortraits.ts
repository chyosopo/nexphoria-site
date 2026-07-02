/* ──────────────────────────────────────────────────────────────
   Stack portrait resolver — maps each flagship stack slug to its
   v11 benefit-encoded editorial portrait. Each portrait PROVES the
   stack's outcome (visible vascularity for recovery, luminous skin
   for the skin stack, focused executive for cognition, etc.).

   This is an additive lib — it does NOT modify data/stacks.ts.
   Portraits are bundled by Vite at build time.
   ────────────────────────────────────────────────────────────── */
import portraitWolverine from "@/assets/nx_v11_tile_wolverine.webp";
import portraitGlow from "@/assets/nx_v11_tile_glow.webp";
import portraitRestore from "@/assets/nx_v11_tile_restore.webp";
import portraitClarity from "@/assets/nx_v11_tile_clarity.webp";
import portraitPrime from "@/assets/nx_v11_tile_prime.webp";
import portraitBalance from "@/assets/nx_v11_tile_balance.webp";

/* Slug → portrait. Keyed to each stack's clinical purpose so the image
   proves the benefit rather than decorating the page. */
const PORTRAIT_BY_SLUG: Record<string, string> = {
  wolverine: portraitWolverine, // visible vascularity, recovered athlete
  glow: portraitGlow, // luminous, hyper-detailed skin
  sleep: portraitBalance, // Restore/sleep — calm, restored
  cognitive: portraitClarity, // focused executive, sharp gaze
  metabolic: portraitPrime, // lean, defined midsection
  longevity: portraitRestore, // vital, ageless
};

/* Short benefit line the portrait proves — surfaced as a hero overlay. */
export const PORTRAIT_PROOF: Record<string, string> = {
  wolverine: "Visible vascularity · full load tolerance regained",
  glow: "Dermal collagen restored · luminous skin texture",
  sleep: "Deeper slow-wave sleep · restored circadian rhythm",
  cognitive: "Sustained focus · stress resilience without stimulants",
  metabolic: "Lean mass preserved · visceral fat reduced",
  longevity: "Cellular energy restored · biological age decelerated",
};

export function getStackPortrait(slug: string): string {
  return PORTRAIT_BY_SLUG[slug] ?? portraitWolverine;
}

export function getPortraitProof(slug: string): string {
  return PORTRAIT_PROOF[slug] ?? "Physician-formulated peptide protocol";
}
