/* ═══ WHO THIS IS FOR — one honest line per medicine ═══
   The positive profile only, in the plain register; the limits live in
   "Who should not take it" and the physician decides. Consistent with the
   catalog's outcome/mechanism and the benefits layer. FLAGGED FOR PHYSICIAN
   REVIEW before apex launch. */
export const FOR_WHOM: Record<string, string> = {
  sermorelin: "Adults who want better sleep and recovery first, and lean mass over time, using their body's own growth-hormone rhythm rather than replacing it.",
  "ipa-cjc": "Adults who want recovery and lean mass, with sleep as the first change, from a single nightly injection.",
  tesamorelin: "Adults with stubborn deep abdominal fat that diet and training have not shifted, who want lean mass kept while it comes off.",
  selank: "People whose focus and mood fray under sustained stress, who want a steadier baseline.",
  semax: "People who want sharper focus, memory and mental stamina through long, demanding days.",
  "bpc-157": "People recovering from a tendon, muscle, joint or gut-lining injury who want to support the repair.",
  "tb-500": "People recovering from muscle, tendon or joint injury, especially where stiffness and slow recovery are the problem.",
  "bpc-tb-combo": "People whose recovery needs both the repair signal and the cells that carry it out.",
  "ghk-cu": "Adults who want firmer, more elastic skin and better healing, and can give it the eight to twelve weeks skin takes.",
  epitalon: "Adults interested in sleep and healthy ageing who prefer a short course a few times a year.",
  "nad-plus": "Adults who feel their energy and recovery have slipped with age and want to top up what their cells run on.",
  "mots-c": "People who train and want their metabolism and endurance to respond to it more.",
  semaglutide: "Adults with weight to lose who find appetite, portion size and constant thoughts of food the hardest part.",
  tirzepatide: "Adults with weight to lose, or whose blood sugar runs high alongside it, who want appetite and blood sugar addressed together.",
  dsip: "People who fall asleep slowly or wake without feeling rested.",
  "pt-141": "Men and women who want desire back on the days they choose, rather than a daily medicine.",
  "thymosin-a1": "People who get knocked down easily under stress or through a season, and want their immune resilience supported.",
  "aod-9604": "Adults already on a weight plan who want a fat-metabolism add-on, with the limits of the evidence understood.",
  oxytocin: "People who want closeness and arousal supported in intimate settings, on the days they choose.",
  tadalafil: "Men who want reliable performance with a fast onset, on the days they choose.",
  testosterone: "Men whose blood work shows low testosterone and who have the symptoms that go with it: low energy, drive, mood and muscle.",
  kisspeptin: "Men and women who want their own sex-hormone production supported rather than replaced, including fertility-minded plans.",
};
export const forWhom = (slug: string): string | undefined => FOR_WHOM[slug];
