/* ═══ The home page opening, verbatim ═══
   Voice chosen by Chiya, 2026-09-02: "You, you, you". Second person, plain,
   friendly, straight to the point. Change the words here, nowhere else. */
import heroKitchen from "@/assets/life/hero-kitchen.webp";
import heroKitchen1200 from "@/assets/life/hero-kitchen-1200.webp";

export const HERO = {
  kicker: "Prescribed by U.S. licensed doctors",
  lines: ["Your body.", "Your numbers.", "Your plan."],
  subline:
    "A U.S. doctor checks 99 markers in your blood, then writes a plan that is actually yours. Made for you in a licensed U.S. pharmacy. Delivered cold.",
  cta: "Start your assessment",
  /* billing claim OFF until Chiya confirms how billing runs (docs/COPY-DECK.md) */
  micro: "Two minutes to start.",
  /* 7am at the kitchen window: the morning photograph (2400w, 1200w) */
  image: heroKitchen,
  imageSrcSet: `${heroKitchen1200} 1200w, ${heroKitchen} 2400w`,
  chips: ["U.S. licensed doctors", "Licensed 503A pharmacy", "99 markers read first", "Ships cold, all 50 states"],
};
