/* Static map of editorial peptide hero images — Vite bundles these at build time */
import bpc157 from "@/assets/peptides/pep_hero_bpc157.webp";
import tirzepatide from "@/assets/peptides/pep_hero_tirzepatide.webp";
import ghkCu from "@/assets/peptides/pep_hero_ghk_cu.webp";
import tesamorelin from "@/assets/peptides/pep_hero_tesamorelin.webp";
import ipamorelin from "@/assets/peptides/pep_hero_ipamorelin.webp";
import semax from "@/assets/peptides/pep_hero_semax.webp";
import cjc1295 from "@/assets/peptides/pep_hero_cjc1295.webp";
import retatrutide from "@/assets/peptides/pep_hero_retatrutide.webp";
import semaglutide from "@/assets/peptides/pep_hero_semaglutide.webp";
import sermorelin from "@/assets/peptides/pep_hero_sermorelin.webp";
import tb500 from "@/assets/peptides/pep_hero_tb500.webp";
import dsip from "@/assets/peptides/pep_hero_dsip.webp";
import nadPlus from "@/assets/peptides/pep_hero_nad_plus.webp";
import selank from "@/assets/peptides/pep_hero_selank.webp";
import motsC from "@/assets/peptides/pep_hero_mots_c.webp";
import epitalon from "@/assets/peptides/pep_hero_epitalon.webp";
import pt141 from "@/assets/peptides/pep_hero_pt141.webp";
import methyleneBlue from "@/assets/peptides/pep_hero_methylene_blue.webp";

// Keyed by peptide slug (lowercased). Also maps common alternate slugs.
// Combo entries reuse the lead compound's frame (ipa-cjc → cjc,
// bpc-tb-combo → bpc) so no formulary entry falls back to category art.
export const peptideHeroImages: Record<string, string> = {
  "bpc-157": bpc157,
  "bpc157": bpc157,
  "bpc-tb-combo": bpc157,
  "tirzepatide": tirzepatide,
  "ghk-cu": ghkCu,
  "ghkcu": ghkCu,
  "tesamorelin": tesamorelin,
  "ipamorelin": ipamorelin,
  "semax": semax,
  "cjc-1295": cjc1295,
  "cjc1295": cjc1295,
  "cjc-1295-ipamorelin": cjc1295,
  "ipa-cjc": cjc1295,
  "retatrutide": retatrutide,
  "semaglutide": semaglutide,
  "sermorelin": sermorelin,
  "tb-500": tb500,
  "tb500": tb500,
  "dsip": dsip,
  "nad-plus": nadPlus,
  "nad+": nadPlus,
  "selank": selank,
  "mots-c": motsC,
  "epitalon": epitalon,
  "pt-141": pt141,
  "methylene-blue": methyleneBlue,
  "cerebrolysin": methyleneBlue, // cognition-axis share until a dedicated frame ships
};

export function getPeptideHeroImage(slug: string): string | null {
  const key = slug.toLowerCase();
  return peptideHeroImages[key] || null;
}

export function hasPeptideHeroImage(slug: string): boolean {
  return getPeptideHeroImage(slug) !== null;
}
