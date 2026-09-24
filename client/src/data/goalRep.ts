/* ═══ One representative medicine per goal (the ivy restyle, 2026-09-08) ═══
   The vial that stands for a goal wherever a goal is a tile: the home's goal
   grid, the nav panel, the catalog filter. Every render is transparent, so
   the tile's CSS tint carries the goal's colour behind it. */
import type { PeptideCategory } from "@/data/peptides";

export const GOAL_REP: Record<PeptideCategory, string> = {
  metabolic: "tirzepatide",
  growth: "sermorelin",
  recovery: "bpc-157",
  longevity: "nad-plus",
  cognition: "semax",
  sleep: "dsip",
  "sexual-health": "oxytocin",
  hormone: "testosterone",
  skin: "ghk-cu",
};

/* The medicines a goal tile names (the nuform study, 2026-09-24): up to three
   sellable medicines of the goal, by name, so the reader sees the shelf
   before the click. Read from the catalog, never typed. */
import { SOLO_CATALOG, isSellable, type SoloCategory } from "@/data/soloCatalog";

const GOAL_TO_CATEGORY: Record<PeptideCategory, SoloCategory> = {
  metabolic: "Metabolic", growth: "Growth", recovery: "Recovery", longevity: "Skin & Longevity",
  cognition: "Cognitive", sleep: "Sleep", "sexual-health": "Sexual Health", hormone: "Hormone", skin: "Skin & Longevity",
};

/* Two goals share one catalog category (skin and longevity both draw from
   "Skin & Longevity"), so each names its own medicines first, then tops up
   from the category. Slugs, so a retired medicine drops out on its own. */
const GOAL_FIRST: Partial<Record<PeptideCategory, string[]>> = {
  skin: ["ghk-cu", "epitalon", "thymosin-a1"],
  longevity: ["nad-plus", "mots-c", "epitalon"],
};

export function goalChips(goal: PeptideCategory, max = 3): string[] {
  const cat = GOAL_TO_CATEGORY[goal];
  const pool = SOLO_CATALOG.filter((s) => s.category === cat && isSellable(s));
  const first = (GOAL_FIRST[goal] ?? []).map((slug) => pool.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const rest = pool.filter((s) => !first.includes(s));
  return [...first, ...rest].slice(0, max).map((s) => s.name);
}
