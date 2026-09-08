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
