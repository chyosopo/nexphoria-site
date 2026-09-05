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
  metabolic: "Appetite runs the day, and the weight will not move. A GLP-1 medicine makes you feel full sooner and stay full longer. Your physician steps the dose up as your body settles.",
  growth: "You want lean mass you can keep, and the deep abdominal fat has not moved through diet or training. These peptides raise your own growth hormone on its natural overnight rhythm. IGF-1 in your blood shows it working.",
  recovery: "A tendon, a joint, a muscle or your gut lining is repairing slower than it used to. These peptides send the repair signal, and bring repair cells to the tissue that needs them.",
  longevity: "Energy and recovery slip as the years add up. These medicines top up what your cells run on, or switch on the same pathways exercise does.",
  cognition: "Focus frays and mood follows when the pressure does not let up. These nasal-spray peptides work on your brain's stress circuits, and on the protein it uses to build connections.",
  sleep: "You fall asleep slowly, or you wake without feeling rested. These peptides are taken at bedtime. They work on your sleep-wake cycle and on your deep sleep.",
  "sexual-health": "You want desire, closeness and performance back, on the days you choose. These medicines work on your brain's desire circuits, on bonding, or on blood flow. You take them as needed.",
  hormone: "Energy, drive and mood drop when testosterone is low. Testosterone is prescribed where your blood work shows it, and kisspeptin prompts your own production instead of replacing it.",
  skin: "Firmness goes first, and healing takes longer than it did. A copper peptide your skin makes less of with age signals it to build collagen and elastin.",
};

/** The order the band reads in: the goals most people arrive with first. */
export const GOAL_ORDER: PeptideCategory[] = ["metabolic", "growth", "recovery", "longevity", "cognition", "sleep", "sexual-health", "hormone", "skin"];

/* The headline per goal (docs/VOICE-V5.md, the power register). Verb first,
   two beats, a period between them — the shape the field writes in ("Reduce
   fat. Recover faster." / "Meds to lose the weight. Noom to keep it off.").
   v4 wrote these as one sentence chained with "and", which buried the second
   half:
     v4  "Lose the weight and keep the muscle you trained for."
     v5  "Lose the weight. Keep the muscle you trained for."
   A goal named, never a result promised. Renders on the hero tiles, the goal
   gallery and the product page. */
export const GOAL_SHOUT: Record<PeptideCategory, string> = {
  metabolic: "Lose the weight. Keep the muscle you trained for.",
  growth: "Build lean mass. Shed the deep fat diet alone has not moved.",
  recovery: "Repair the tissue. Get back to training.",
  longevity: "Steady energy. Recovery that keeps up with you.",
  cognition: "Stay sharp. Stay steady under pressure.",
  sleep: "Fall asleep sooner. Wake up rested.",
  "sexual-health": "Bring back the drive, on the days you choose.",
  hormone: "Lift your testosterone. From your own baseline.",
  skin: "Firm the skin. Speed the healing.",
};

/* The catalog's SoloCategory, mapped to the goal key the shouts and tiles use. */
export const CATEGORY_TO_GOAL: Record<string, PeptideCategory> = {
  Metabolic: "metabolic", Growth: "growth", Recovery: "recovery", "Skin & Longevity": "longevity",
  Cognitive: "cognition", Sleep: "sleep", "Sexual Health": "sexual-health", Hormone: "hormone",
};
