/* ═══ The home page opening, verbatim ═══
   Position chosen by Chiya, 2026-09-03: "the formulary". The medicines lead;
   what each does, for whom, and how it is done. Institutional but warm:
   complete sentences, specifics, one plain human line per section. Physician
   involvement is stated once, as a fact. Change the words here, nowhere else. */
import heroKitchen from "@/assets/life/hero-kitchen.webp";
import heroKitchen1200 from "@/assets/life/hero-kitchen-1200.webp";

export const HERO = {
  kicker: "Prescription peptides, compounded in the United States",
  lines: ["Four medicines.", "One standard."],
  subline:
    "Semaglutide, tirzepatide, tesamorelin and PT-141. Each is prescribed by a licensed U.S. physician, compounded to order in a licensed 503A pharmacy, shipped cold, and followed by a full blood panel at week 12.",
  cta: "Start your assessment",
  /* billing claim OFF until Chiya confirms how billing runs (docs/COPY-DECK.md) */
  micro: "Prescription only. Ships to all 50 states.",
  /* 7am at the kitchen window: the morning photograph (2400w, 1200w) */
  image: heroKitchen,
  imageSrcSet: `${heroKitchen1200} 1200w, ${heroKitchen} 2400w`,
  chips: ["Licensed U.S. physicians", "Licensed 503A pharmacy", "Full blood panel at week 12, included", "Cold shipping, all 50 states"],
};
