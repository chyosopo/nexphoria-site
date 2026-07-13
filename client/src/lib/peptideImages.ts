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

/* Card-safe frame selection. The pep_hero library mixes two kinds of frame:
   - PRODUCT still-lifes (vial / ampoule / dropper / pen, no people) — safe
     on any card in either world.
   - Gendered LIFESTYLE scenes (a man running, a woman sleeping) — right on
     their own PDP, but a world leak when they land on a card in the other
     world. Cards must only show a lifestyle frame whose cast matches the
     visitor's world, and fall back to the world's own category art. */
const PRODUCT_FRAMES = new Set([bpc157, cjc1295, ghkCu, ipamorelin, retatrutide, semax, tesamorelin, tirzepatide]);
const FEMALE_CAST = new Set([dsip, epitalon, selank]);
const MALE_CAST = new Set([methyleneBlue, motsC, nadPlus, semaglutide, sermorelin, tb500]);
const NEUTRAL_CAST = new Set([pt141]); // couple frame — reads in both worlds

export function getPeptideProductImage(slug: string): string | null {
  const img = getPeptideHeroImage(slug);
  return img && PRODUCT_FRAMES.has(img) ? img : null;
}

/** The frame a shared CARD may show for this compound in this world —
 *  product still-lifes always; lifestyle only when the cast matches.
 *  Returns null when the caller should use its world's category art. */
export function getPeptideCardImage(slug: string, world?: "men" | "women"): string | null {
  const img = getPeptideHeroImage(slug);
  if (!img) return null;
  if (PRODUCT_FRAMES.has(img) || NEUTRAL_CAST.has(img)) return img;
  if (world === "women" && FEMALE_CAST.has(img)) return img;
  if (world === "men" && MALE_CAST.has(img)) return img;
  return null; // unworlded surfaces stay product-only
}

export function hasPeptideHeroImage(slug: string): boolean {
  return getPeptideHeroImage(slug) !== null;
}
