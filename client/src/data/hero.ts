/* ═══ The home page opening, verbatim ═══
   Position chosen by Chiya, 2026-09-03: "the formulary". The medicines lead;
   what each does, for whom, and how it is done. Institutional but warm:
   complete sentences, specifics, one plain human line per section. Physician
   involvement is stated once, as a fact. Change the words here, nowhere else. */
import heroKitchen from "@/assets/life/hero-kitchen.webp";
import heroKitchen1200 from "@/assets/life/hero-kitchen-1200.webp";

/* The plain deck (docs/COPY-DECK-PLAIN.md, Chiya 2026-09-04): every string
   here is the deck's Home hero string. The micro line is the only place on
   the home page where the physician, the pharmacy and cold shipping appear. */
export const HERO = {
  kicker: "Prescription peptide therapy",
  lines: ["Prescription peptide therapy,", "prescribed against blood work."],
  /* The rotating word (Chiya 2026-09-05, after alyvewellness.com): the H1 is
     "Peptide therapy, prescribed for your [sleep]" and the word cycles. The
     first word renders statically, so the prerendered page and a reader with
     reduced motion see a complete sentence. */
  /* The headline (docs/VOICE.md v3, Chiya 2026-09-05 afternoon): one
     flowing sentence in second person about the reader's goal, then the
     line with the rotating goal word. The staccato shout was rejected. */
  shout: "Stronger, sharper and better rested, with the dose set from your blood.",
  lead: "Prescribed for your",
  rotating: ["sleep", "focus", "recovery", "weight", "energy", "skin", "desire"],
  subline:
    "A licensed U.S. physician reads your answers, prescribes if it is appropriate, and a licensed U.S. pharmacy compounds it to order.",
  cta: "Shop the medicines",
  ctaSecondary: "See how it works",
  micro: "Prescribed by licensed U.S. physicians. Compounded in a licensed U.S. pharmacy. Shipped cold to all 50 states.",
  /* The fact strip under the hero buttons (2026-09-05, after alyverx.com):
     six facts, an icon each, the only place these appear on the home. */
  facts: ["Licensed U.S. physicians", "Compounded in a U.S. pharmacy", "Blood test included", "100% online", "Ships cold to all 50 states", "Self-pay, one monthly price"],
  /* The woman at the kitchen window, cool morning light (Higgsfield soul_2, 2026-09-05; 2400w, 1200w) */
  image: heroKitchen,
  imageSrcSet: `${heroKitchen1200} 1200w, ${heroKitchen} 2400w`,
  /* the four goal chips under the hero */
  chips: ["Weight loss", "Body composition", "Sexual health", "Hormones"],
};
