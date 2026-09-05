/* ═══ BY GOAL — what each goal feels like, and what the medicines do about it ═══
   One plain line per category for the home's teaching band (Happy Head's
   "Solutions for every stage", in the house register). The medicines under
   each line are read from the catalog, so a goal can never show a medicine
   we do not sell. FLAGGED FOR PHYSICIAN REVIEW before apex launch.
   Copy v4 (2026-09-05 evening): each line is two sentences to the reader.
   The first says what the goal feels like, in "you"; the second says what
   the medicines do in the body. GoalGallery splits on the first ". ", so
   the first sentence must stay a single sentence. */
import type { PeptideCategory } from "@/data/peptides";

export const GOAL_TEACHING: Record<PeptideCategory, string> = {
  metabolic: "You are hungry more often than you would like, and the weight will not move. A GLP-1 medicine makes you feel full sooner and stay full longer, and your physician steps the dose up as your body settles.",
  growth: "You want lean mass you can keep, and the deep abdominal fat has stayed put through diet and training. These peptides raise your own growth hormone on its natural overnight rhythm, and IGF-1 in your blood shows it working.",
  recovery: "A tendon, a joint, a muscle or your gut lining is taking longer to repair than it used to. These peptides send the repair signal and bring repair cells to the tissue that needs them.",
  longevity: "Your energy and your recovery have slipped as the years have added up. These medicines top up what your cells run on, or switch on the same pathways exercise does.",
  cognition: "Your focus and your mood fray when the pressure does not let up. These nasal-spray peptides work on your brain's stress circuits and on the protein it uses to build connections.",
  sleep: "You fall asleep slowly, or you wake without feeling rested. These peptides are taken at bedtime and work on your sleep-wake cycle and your deep sleep.",
  "sexual-health": "You want desire, closeness and performance back, on the days you choose. These medicines work on your brain's desire circuits, on bonding or on blood flow, and you take them as needed.",
  hormone: "Your energy, drive and mood have dropped with low testosterone, or you would rather support your own hormone axis than replace it. Testosterone is prescribed where your blood work shows it is low, and kisspeptin prompts your own production.",
  skin: "Your skin has lost some of its firmness, and healing takes longer than it did. A copper peptide your skin makes less of with age signals it to make collagen and elastin.",
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
