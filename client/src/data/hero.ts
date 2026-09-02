/* ═══ The home page opening, verbatim ═══
   Voice chosen by Chiya, 2026-09-02: "You, you, you". Second person, plain,
   friendly, straight to the point. Change the words here, nowhere else. */
import { OUTCOME_HERO, outcomeSrcSet } from "@/data/outcomeImagery";

export const HERO = {
  kicker: "Prescribed by U.S. licensed doctors",
  lines: ["Your body.", "Your numbers.", "Your plan."],
  subline:
    "A U.S. doctor checks 99 markers in your blood, then writes a plan that is actually yours. Made for you in a licensed U.S. pharmacy. Delivered cold.",
  cta: "Start your assessment",
  micro: "Two minutes. You pay only if a doctor prescribes.",
  /* dawn window after the workout: the morning photograph */
  image: OUTCOME_HERO.men,
  imageSrcSet: outcomeSrcSet(OUTCOME_HERO.men),
};
