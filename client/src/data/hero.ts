/* ═══ The home page opening, verbatim ═══
   Position chosen by Chiya, 2026-09-03: "the formulary". The medicines lead;
   what each does, for whom, and how it is done. Institutional but warm:
   complete sentences, specifics, one plain human line per section. Physician
   involvement is stated once, as a fact. Change the words here, nowhere else. */
import heroKitchen from "@/assets/life/hero-kitchen.webp";
import heroKitchen1200 from "@/assets/life/hero-kitchen-1200.webp";

/* VOICE v5 — the power register (docs/VOICE-V5.md, Chiya 2026-09-05 night:
   "rewrite everything from scratch … I like using power words").
   Written from copy pulled off the live competitor sites the same evening.
   The v4 rule was "one flowing sentence"; it produced lines whose power word
   was buried behind a comma and a subordinate clause:

     v4  "Stronger, sharper and better rested, with the dose set from your blood."
     v5  "Stronger, sharper, better rested. Prescribed to your blood."

   The period is the tool. The power word leads. The hedge gets its own
   sentence instead of hanging off a promise. Change the words here, nowhere
   else. */
export const HERO = {
  /* THE IVY REGISTER (Chiya 2026-09-08: "make our site look like ivyrx.com: the
     design, the feel, the copy, the journey"). Plain, warm, second person,
     one gradient phrase. The facts stay facts. */
  kicker: "Licensed U.S. physicians · Compounded in a U.S. pharmacy",
  lines: ["Stronger, sharper, better rested.", "Prescribed to your blood."],
  /* The headline: the triad the reader wants, then the fact nobody else on
     the shelf can state. Two sentences, nine words. */
  shout: "Stronger, sharper, better rested. Prescribed to your blood.",
  /* The rotating word keeps the second line personal. The first word renders
     statically, so the prerendered page and a reader with reduced motion see
     a complete sentence. */
  /* The headline: the first words, then a drawn chip, then the gradient phrase. */
  lead: "Peptide medicine, ",
  gradient: "personalized to you",
  rotating: ["sleep", "focus", "recovery", "weight", "energy", "skin", "drive"],
  /* Compound qualifiers, the way the field writes them: one hyphenated word
     doing the work of a clause. Twelve words where v4 spent twenty-one. */
  subline:
    "This is where your care takes shape: a licensed physician, a medicine compounded for you, and a dose set from your own blood work.",
  /* The assessment leads (Chiya 2026-09-06, after enhanced.com): a reader
     who knows the symptom and not the molecule was being handed a shelf.
     Browsing is the second path now, not the first. */
  cta: "Find my treatment",
  ctaSecondary: "Browse every medicine",
  micro: "Prescribed by a licensed U.S. physician, if appropriate. Compounded in a licensed U.S. pharmacy. Shipped cold to all 50 states.",
  /* The fact strip under the hero buttons: six facts, an icon each, the only
     place these appear on the home. Each is a fact, not a claim. */
  facts: ["Licensed U.S. physicians", "Compounded in a U.S. pharmacy", "Blood test included", "Entirely online", "Ships cold to all 50 states", "One price a month"],
  /* The woman at the kitchen window, cool morning light (Higgsfield soul_2, 2026-09-05; 2400w, 1200w) */
  image: heroKitchen,
  imageSrcSet: `${heroKitchen1200} 1200w, ${heroKitchen} 2400w`,
  /* THE CINEMA REGISTER (Chiya 2026-09-16, after mod.com: "high-res,
     cinema-grade … copy, tone"). Three caps lines, each a goal a reader
     names in the quiz's own words, never a guarantee; one line of what it
     is; the bar's line. */
  cinema: {
    lines: ["Lose the weight.", "Recover faster.", "Sleep deeper."],
    sub: "Prescription peptides, compounded for you and set from your own blood work. Entirely online.",
    bar: "Prescription peptides, personalized to you. Prescribed by a licensed U.S. physician, if appropriate.",
  },
  /* the four goal chips under the hero */
  chips: ["Weight loss", "Body composition", "Sexual health", "Hormones"],
};
