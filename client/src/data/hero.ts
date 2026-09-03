/* ═══ The home page opening, verbatim ═══
   Position chosen by Chiya, 2026-09-03: "the formulary". The medicines lead;
   what each does, for whom, and how it is done. Institutional but warm:
   complete sentences, specifics, one plain human line per section. Physician
   involvement is stated once, as a fact. Change the words here, nowhere else. */
import heroKitchen from "@/assets/life/hero-kitchen.webp";
import heroKitchen1200 from "@/assets/life/hero-kitchen-1200.webp";

export const HERO = {
  kicker: "Weight · Strength · Desire",
  lines: ["Prescription peptides,", "delivered."],
  subline:
    "Semaglutide, tirzepatide, tesamorelin and PT-141, prescribed online by licensed U.S. physicians and made in a licensed U.S. pharmacy. One monthly price, with a full blood panel at week 12 included.",
  cta: "Get started",
  /* billing claim OFF until Chiya confirms how billing runs (docs/COPY-DECK.md) */
  micro: "Online visit. Ships cold to all 50 states.",
  /* 7am at the kitchen window: the morning photograph (2400w, 1200w) */
  image: heroKitchen,
  imageSrcSet: `${heroKitchen1200} 1200w, ${heroKitchen} 2400w`,
  chips: ["Licensed U.S. physicians", "Made in a licensed U.S. pharmacy", "Blood panel at week 12 included", "Ships to all 50 states"],
};
