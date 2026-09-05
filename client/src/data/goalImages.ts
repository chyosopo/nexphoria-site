/* ═══ The goal gallery's photographs (2026-09-05) ═══
   One editorial photograph per goal, from the house library in public/img
   (Higgsfield/Bloom, July 2026, the cool porcelain palette). Paths are
   public, relative to the site base, so the prerender and the CDN see the
   same file. Every entry has a 1600w frame; the 800w variant is served to
   narrow screens where it exists. Swap a frame here, nowhere else. */
import type { PeptideCategory } from "@/data/peptides";

export interface GoalImage { src: string; src800?: string; alt: string }

const img = (id: string, alt: string, has800 = true): GoalImage => ({
  src: `img/img_${id}.webp`,
  src800: has800 ? `img/img_${id}-800w.webp` : undefined,
  alt,
});

export const GOAL_IMAGES: Record<PeptideCategory, GoalImage> = {
  metabolic: img("4f2bd889825e", "A woman in a white vest at a bright window, at ease"),
  growth: img("ca6ddc167d62", "A man lifting a dumbbell in a bright gym"),
  recovery: img("ebd08f5a334f", "A man lacing a running shoe at a window at dawn"),
  longevity: img("82c3e3ceeecf", "A couple running along a coastal path in the morning"),
  cognition: img("6d55c7017047", "A woman writing at a desk in morning light"),
  sleep: img("3eae89cb98a0", "A woman asleep on white linen"),
  "sexual-health": img("56a29d462771", "A couple laughing together on a mountain path"),
  hormone: img("84799b6e21dc", "A man at a window at dusk"),
  skin: img("84444e0185e3", "A woman with a towel wrapped, skin in soft light"),
};
