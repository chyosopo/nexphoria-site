/* ═══ HOW IT WORKS IN YOUR BODY — three steps, per molecule ═══
   The signal → where it acts → what changes, ending on the number the
   physician reads at week 12 (data/monitoring). Written from the published
   pharmacology of each molecule in the plain register; educational, and
   consistent with the catalog's mechanism line. FLAGGED FOR PHYSICIAN REVIEW
   before apex launch (Arora Health): every line here is a claim about the
   body. (Happy Head study, 2026-09-05: explain it, then draw it.) */
export interface Pathway {
  steps: [string, string, string];
  /** the marker that shows it, or the context markers */
  reads: string;
  /** true when `reads` is context, not a dose-setting number */
  context?: boolean;
}

export const PATHWAY: Record<string, Pathway> = {
  sermorelin: { steps: ["Sermorelin mimics GHRH, the signal your brain sends at night.", "Your pituitary releases your own growth hormone in its natural overnight pulse.", "IGF-1 rises. Sleep quality first, then recovery and lean mass over weeks."], reads: "IGF-1" },
  "ipa-cjc": { steps: ["Ipamorelin mimics the growth-hormone signal ghrelin sends; CJC-1295 mimics GHRH.", "Your pituitary releases growth hormone more often, and more of it, in one nightly injection.", "IGF-1 rises. Sleep in a week; recovery and lean mass over 8 to 12 weeks."], reads: "IGF-1" },
  tesamorelin: { steps: ["Tesamorelin is a stabilised form of GHRH, the signal for growth hormone.", "Your pituitary releases more of your own growth hormone, on its natural rhythm.", "IGF-1 rises. Deep abdominal fat falls and lean mass is kept, over 12 weeks and beyond."], reads: "IGF-1" },
  selank: { steps: ["Selank is a short peptide related to tuftsin, an immune-signalling fragment.", "It acts on the brain's stress circuits, including GABA signalling.", "A steadier mood and clearer focus under pressure, usually within days."], reads: "Cortisol, thyroid", context: true },
  semax: { steps: ["Semax is a fragment of ACTH, without the hormone effect.", "It raises BDNF, the protein your brain uses to build and keep connections.", "Focus, memory and mental stamina, over days to weeks."], reads: "Cortisol, thyroid", context: true },
  "bpc-157": { steps: ["BPC-157 is a fragment of a protective protein found in the gut lining.", "It promotes new blood vessels and the signals tissue uses to repair itself.", "Tendon, muscle, joint and gut-lining repair over weeks."], reads: "hs-CRP", context: true },
  "tb-500": { steps: ["TB-500 is a fragment of thymosin beta-4, a protein in nearly every cell.", "It helps repair cells move to injured tissue and calms inflammation there.", "Muscle, tendon and joint recovery over 6 to 8 weeks."], reads: "hs-CRP", context: true },
  "bpc-tb-combo": { steps: ["BPC-157 sends the repair signal; TB-500 moves repair cells to where they are needed.", "Together they act on the same injured tissue from two directions.", "Recovery over 6 to 8 weeks; gut symptoms often sooner."], reads: "hs-CRP", context: true },
  "ghk-cu": { steps: ["GHK-Cu is a copper-binding peptide your skin makes less of with age.", "It signals skin cells to make collagen and elastin, and calms inflammation.", "Firmer, more elastic skin and better wound healing over 8 to 12 weeks."], reads: "hs-CRP", context: true },
  epitalon: { steps: ["Epitalon is a four-amino-acid peptide modelled on a pineal-gland protein.", "It is studied for telomerase activity and for the pineal gland's sleep-wake signalling.", "Sleep first, within 1 to 2 weeks. Given as a 20-day course a few times a year."], reads: "Cortisol", context: true },
  "nad-plus": { steps: ["NAD+ is the coenzyme every cell uses to turn food into energy.", "Levels fall with age; injected NAD+ tops up what your cells have to work with.", "Energy in days to 2 weeks. It builds while you take it."], reads: "Metabolic markers", context: true },
  "mots-c": { steps: ["MOTS-c is a peptide encoded by your mitochondria.", "It switches on AMPK, the energy-sensing pathway exercise switches on.", "Metabolism and endurance over 8 to 12 weeks, alongside training."], reads: "Fasting insulin, HbA1c", context: true },
  semaglutide: { steps: ["Semaglutide is a long-acting form of GLP-1, the fullness hormone your gut releases after eating.", "It acts on the brain's appetite centres and slows how fast the stomach empties.", "You feel full sooner and stay full longer. Appetite in week 1; weight over months."], reads: "HbA1c", context: true },
  tirzepatide: { steps: ["Tirzepatide mimics two gut hormones at once, GLP-1 and GIP.", "It acts on the brain's appetite centres and on how your body handles blood sugar.", "Less appetite, fewer thoughts about food, steadier blood sugar. Weight over months."], reads: "HbA1c", context: true },
  dsip: { steps: ["DSIP is a peptide first found in the brain during deep sleep.", "It is studied for its effect on the sleep-wake cycle and night-time stress hormones.", "Falling asleep faster and more deep sleep, from the first nights."], reads: "Cortisol", context: true },
  "pt-141": { steps: ["PT-141 is a melanocortin peptide.", "It acts on melanocortin receptors in the brain involved in sexual desire, in men and women.", "Desire within about 45 minutes to 2 hours, on the days you take it."], reads: "Testosterone, estradiol", context: true },
  "thymosin-a1": { steps: ["Thymosin alpha-1 is a peptide your thymus makes.", "It helps T-cells mature and tunes the immune response.", "Immune resilience and recovery over weeks, and while you take it."], reads: "Complete blood count", context: true },
  "aod-9604": { steps: ["AOD-9604 is a fragment of growth hormone, the part linked to fat metabolism.", "It is studied for stimulating fat breakdown without growth hormone's other effects.", "Fat metabolism alongside a broader plan. The human evidence is limited."], reads: "Fasting glucose, triglycerides", context: true },
  oxytocin: { steps: ["Oxytocin is the hormone released during closeness and touch.", "As a nasal spray it reaches the brain's bonding and arousal circuits.", "Closeness, arousal and mood in intimate settings, within the hour."], reads: "Hormones", context: true },
  tadalafil: { steps: ["Tadalafil is a PDE5 inhibitor, the class behind the well-known erection medicines.", "It relaxes blood-vessel walls so blood flow to erectile tissue increases.", "Performance within 20 to 30 minutes, active for more than a day."], reads: "Lipid panel, glucose", context: true },
  testosterone: { steps: ["Testosterone is the primary male sex hormone. This is replacement for men whose own level is low.", "It acts on receptors in muscle, bone, brain and fat.", "Energy, drive, mood and muscle over 3 to 6 months, with regular blood work."], reads: "Total testosterone" },
  kisspeptin: { steps: ["Kisspeptin is the signal at the top of your sex-hormone axis.", "It prompts the brain to release GnRH, then LH and FSH, which drive your own testosterone or estrogen.", "Supports your own production rather than replacing it. Used in fertility-minded plans."], reads: "LH and FSH" },
};
export const pathwayFor = (slug: string): Pathway | undefined => PATHWAY[slug];
