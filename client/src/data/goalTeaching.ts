/* ═══ BY GOAL — what each goal feels like, and what the medicines do about it ═══
   One plain line per category for the home's teaching band (Happy Head's
   "Solutions for every stage", in the house register). The medicines under
   each line are read from the catalog, so a goal can never show a medicine
   we do not sell. FLAGGED FOR PHYSICIAN REVIEW before apex launch. */
import type { PeptideCategory } from "@/data/peptides";

export const GOAL_TEACHING: Record<PeptideCategory, string> = {
  metabolic: "Appetite that is hard to argue with, and weight that will not move. GLP-1 medicines make you feel full sooner and stay full longer; a physician steps the dose up as your body settles.",
  growth: "Deep abdominal fat that diet and training have not shifted, and lean mass you want to keep. These medicines raise your own growth hormone on its natural rhythm, and IGF-1 in the panel shows it working.",
  recovery: "A tendon, muscle, joint or gut lining that is slow to repair. These peptides send the repair signal and move repair cells to where they are needed.",
  longevity: "Energy and recovery that have slipped with age. These medicines top up what your cells run on, or switch on the same pathways exercise does.",
  cognition: "Focus and mood that fray under sustained stress. Nasal-spray peptides that work on the brain's stress circuits and the protein it uses to build connections.",
  sleep: "Falling asleep slowly, or waking without feeling rested. Peptides taken at bedtime that work on the sleep-wake cycle and deep sleep.",
  "sexual-health": "Desire, closeness and performance, on the days you choose. Medicines that work on the brain's desire circuits, on bonding, or on blood flow, taken as needed.",
  hormone: "Low testosterone with the symptoms that go with it, or a hormone axis you would rather support than replace. Replacement where blood work shows it is low; kisspeptin to prompt your own production.",
  skin: "Skin that has lost firmness and elasticity, and healing that takes longer. A copper peptide your skin makes less of with age, signalling collagen and elastin.",
};

/** The order the band reads in: the goals most people arrive with first. */
export const GOAL_ORDER: PeptideCategory[] = ["metabolic", "growth", "recovery", "longevity", "cognition", "sleep", "sexual-health", "hormone", "skin"];

/* The headline per goal (docs/VOICE.md v3): one flowing sentence in the
   reader's own words, second person, about what they are after. A goal,
   never a promised result. Renders on the hero tiles, the goal gallery
   and the product page. */
export const GOAL_SHOUT: Record<PeptideCategory, string> = {
  metabolic: "Lose the weight and keep the muscle you trained for.",
  growth: "Build lean mass and lose the deep fat that diet alone has not shifted.",
  recovery: "Repair the tendon, the joint or the gut, and get back to training.",
  longevity: "Keep your energy and your recovery as the years add up.",
  cognition: "Stay sharper and steadier when the pressure does not let up.",
  sleep: "Fall asleep sooner, sleep deeper and wake up rested.",
  "sexual-health": "Bring back the desire, the blood flow and the drive, on the days you choose.",
  hormone: "Support your testosterone from your own baseline, read from your blood.",
  skin: "Firm the skin and speed the healing that has slowed with age.",
};

/* The catalog's SoloCategory, mapped to the goal key the shouts and tiles use. */
export const CATEGORY_TO_GOAL: Record<string, PeptideCategory> = {
  Metabolic: "metabolic", Growth: "growth", Recovery: "recovery", "Skin & Longevity": "longevity",
  Cognitive: "cognition", Sleep: "sleep", "Sexual Health": "sexual-health", Hormone: "hormone",
};
