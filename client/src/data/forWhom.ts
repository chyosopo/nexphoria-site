/* ═══ WHO THIS IS FOR — one honest line per medicine ═══
   The positive profile only, in the plain register; the limits live in
   "Who should not take it" and the physician decides. Consistent with the
   catalog's outcome/mechanism and the benefits layer. FLAGGED FOR PHYSICIAN
   REVIEW before apex launch. SoloPDP renders each line after "{Name} suits",
   lower-cased, so every line starts with the people it names. */
export const FOR_WHOM: Record<string, string> = {
  sermorelin: "Adults who want deeper sleep and faster recovery first, and lean mass over time, raised from their own growth-hormone rhythm.",
  "ipa-cjc": "Adults who want recovery and lean mass from one injection at bedtime, with sleep as the first change.",
  tesamorelin: "Adults with deep abdominal fat that diet and training have left in place, who want to keep their lean mass while it comes off.",
  selank: "Anyone whose focus and mood fray under sustained stress and who wants a steadier baseline.",
  semax: "Anyone who wants sharper focus, a better memory and more mental stamina through long, demanding days.",
  "bpc-157": "Anyone recovering from a tendon, muscle, joint or gut-lining injury who wants to support the repair.",
  "tb-500": "Anyone recovering from a muscle, tendon or joint injury, especially where stiffness and slow recovery are the problem.",
  "bpc-tb-combo": "Anyone whose recovery needs both the repair signal and the cells that carry it out.",
  "ghk-cu": "Adults who want firmer, more elastic skin and better healing, and can give it the eight to twelve weeks skin takes.",
  epitalon: "Adults interested in sleep and healthy ageing who prefer a short course a few times a year.",
  "nad-plus": "Adults who feel their energy and recovery have slipped with age and want to top up what their cells run on.",
  "mots-c": "Anyone who trains and wants their metabolism and endurance to respond to it more.",
  semaglutide: "Adults with weight to lose who find appetite, portion size and constant thoughts of food the hardest part.",
  tirzepatide: "Adults with weight to lose, or whose blood sugar runs high alongside it, who want appetite and blood sugar addressed together.",
  dsip: "Anyone who falls asleep slowly or wakes without feeling rested.",
  "pt-141": "Men and women who want desire back on the days they choose, from a dose taken about an hour ahead.",
  "thymosin-a1": "Anyone who gets knocked down easily under stress or through a season and wants their immune resilience supported.",
  "aod-9604": "Adults already on a weight plan who want a fat-metabolism add-on, with the limits of the evidence understood.",
  oxytocin: "Anyone who wants closeness and arousal supported in intimate settings, on the days they choose.",
  tadalafil: "Men who want reliable performance with a fast onset, on the days they choose.",
  testosterone: "Men whose blood work shows low testosterone and who feel it: low energy, low drive, a flat mood and muscle that is harder to keep.",
  kisspeptin: "Men and women who want their own sex-hormone production supported rather than replaced, including fertility-minded plans.",
};
export const forWhom = (slug: string): string | undefined => FOR_WHOM[slug];
