/* ═══ The home page opening, verbatim ═══
   Position chosen by Chiya, 2026-09-03: "the formulary". The medicines lead;
   what each does, for whom, and how it is done. Institutional but warm:
   complete sentences, specifics, one plain human line per section. Physician
   involvement is stated once, as a fact. Change the words here, nowhere else. */
import heroKitchen from "@/assets/life/hero-kitchen.webp";
import heroKitchen1200 from "@/assets/life/hero-kitchen-1200.webp";

export const HERO = {
  kicker: "Prescription peptide therapy",
  lines: ["Peptide therapy,", "done properly."],
  subline:
    "A licensed physician sets your dose against your own blood work. One figure covers all of it: the medicine, the physician, and the blood work on both sides.",
  cta: "Choose a goal",
  /* billing claim OFF until Chiya confirms how billing runs (docs/COPY-DECK.md) */
  micro: "Prescribed online. Made in a licensed U.S. pharmacy. Ships cold to all 50 states.",
  /* 7am at the kitchen window: the morning photograph (2400w, 1200w) */
  image: heroKitchen,
  imageSrcSet: `${heroKitchen1200} 1200w, ${heroKitchen} 2400w`,
  chips: ["Licensed U.S. physicians", "Made in a licensed U.S. pharmacy", "Free baseline blood kit with your first order", "Ships cold to all 50 states"],
};
