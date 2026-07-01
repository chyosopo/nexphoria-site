/* Static map of editorial peptide hero images — Vite bundles these at build time */
import bpc157 from "@/assets/peptides/pep_hero_bpc157.webp";
import tirzepatide from "@/assets/peptides/pep_hero_tirzepatide.webp";
import ghkCu from "@/assets/peptides/pep_hero_ghk_cu.webp";
import tesamorelin from "@/assets/peptides/pep_hero_tesamorelin.webp";
import ipamorelin from "@/assets/peptides/pep_hero_ipamorelin.webp";
import semax from "@/assets/peptides/pep_hero_semax.webp";
import cjc1295 from "@/assets/peptides/pep_hero_cjc1295.webp";
import retatrutide from "@/assets/peptides/pep_hero_retatrutide.webp";

// Keyed by peptide slug (lowercased). Also maps common alternate slugs.
export const peptideHeroImages: Record<string, string> = {
  "bpc-157": bpc157,
  "bpc157": bpc157,
  "tirzepatide": tirzepatide,
  "ghk-cu": ghkCu,
  "ghkcu": ghkCu,
  "tesamorelin": tesamorelin,
  "ipamorelin": ipamorelin,
  "semax": semax,
  "cjc-1295": cjc1295,
  "cjc1295": cjc1295,
  "cjc-1295-ipamorelin": cjc1295,
  "retatrutide": retatrutide,
};

export function getPeptideHeroImage(slug: string): string | null {
  const key = slug.toLowerCase();
  return peptideHeroImages[key] || null;
}

export function hasPeptideHeroImage(slug: string): boolean {
  return getPeptideHeroImage(slug) !== null;
}
