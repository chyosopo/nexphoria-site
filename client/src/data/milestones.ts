/* ═══ THE FIRST TWELVE WEEKS — milestones, per medicine ═══
   Four marks each, in the house voice: what typically changes and when, and
   what is read at week 12. Nothing here is a promised result. FLAGGED FOR
   PHYSICIAN REVIEW before apex launch. */
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";

export interface Milestone { when: string; head: string; body: string }

const panel = (reads: string, looksFor?: string): Milestone => ({
  when: "Week 12",
  head: "The panel is repeated.",
  body: `The same ${PANEL_TOTAL_MARKERS} markers, drawn at home. ${reads} ${looksFor ? `${looksFor}. ` : ""}The physician continues, adjusts or stops the dose.`,
});

export const MILESTONES: Record<string, Milestone[]> = {
  sermorelin: [
    { when: "Week 1", head: "The first doses, at bedtime.", body: "Deeper sleep is often the first thing noticed. Body composition takes longer." },
    { when: "Weeks 2 to 4", head: "Sleep, then recovery.", body: "Sleep quality and morning recovery are typically the first changes." },
    { when: "Weeks 8 to 12", head: "Body composition.", body: "Lean mass and recovery build gradually, with training and protein doing their part." },
    panel("IGF-1 is read first,", "for a rise within the healthy range"),
  ],
  "ipa-cjc": [
    { when: "Week 1", head: "The first dose, at bedtime.", body: "Sleep often deepens within the first week." },
    { when: "Weeks 2 to 4", head: "Recovery.", body: "Faster recovery between sessions is typically the next change." },
    { when: "Weeks 8 to 12", head: "Lean mass.", body: "Body composition changes build over the second and third month." },
    panel("IGF-1 is read first,", "for a rise within the healthy range"),
  ],
  tesamorelin: [
    { when: "Weeks 1 to 4", head: "The rhythm is re-established.", body: "The medicine acts on the growth-hormone rhythm from the first evening. Nothing outward changes yet." },
    { when: "Weeks 4 to 8", head: "The first change.", body: "Deep abdominal fat is typically the first thing to shift, often before weight does." },
    { when: "Week 12", head: "The panel is repeated.", body: "IGF-1 is read first, for a rise within the healthy range, then HbA1c and fasting glucose, since the medicine can nudge blood sugar." },
    { when: "Beyond", head: "The full effect.", body: "In the pivotal trial, deep abdominal fat fell and lipid profiles improved. The term is set with the physician." },
  ],
  selank: [
    { when: "Day 1", head: "The first spray.", body: "A calmer edge is sometimes noticed the same day; for others it takes a week." },
    { when: "Weeks 2 to 4", head: "The steady state.", body: "A steadier mood and clearer focus under pressure, with the spray taken twice a day." },
    panel("Cortisol and thyroid are read for context."),
  ],
  semax: [
    { when: "Day 1", head: "The first spray, in the morning.", body: "Focus may sharpen the same day; the build takes a week or two." },
    { when: "Weeks 2 to 4", head: "The steady state.", body: "Focus, memory and mental stamina, with the spray taken daily." },
    panel("Cortisol and thyroid are read for context."),
  ],
  "bpc-157": [
    { when: "Week 1", head: "The first doses.", body: "Where gut symptoms are present, they are often the first to ease." },
    { when: "Weeks 1 to 2", head: "Tissue.", body: "Tendon, muscle and joint discomfort may begin to ease." },
    { when: "Weeks 4 to 8", head: "Repair.", body: "Recovery builds through the course, alongside the rest the tissue needs." },
    panel("hs-CRP and the blood count are read,", "for inflammation settling"),
  ],
  "tb-500": [
    { when: "Week 1", head: "The first dose.", body: "Twice a week from here." },
    { when: "Weeks 2 to 3", head: "The first change.", body: "Stiffness and recovery time are typically the first things to shift." },
    { when: "Weeks 6 to 8", head: "Recovery.", body: "Muscle, tendon and joint recovery build through the second month." },
    panel("hs-CRP and the blood count are read,", "for inflammation settling"),
  ],
  "bpc-tb-combo": [
    { when: "Week 1", head: "The first doses.", body: "Where gut symptoms are present, they often ease first." },
    { when: "Weeks 1 to 3", head: "Tissue.", body: "Discomfort may begin to ease as both peptides act on the same tissue." },
    { when: "Weeks 6 to 8", head: "Recovery.", body: "Recovery builds through the second month." },
    panel("hs-CRP and the blood count are read,", "for inflammation settling"),
  ],
  "ghk-cu": [
    { when: "Week 1", head: "The first dose.", body: "Skin renews on a cycle of about four weeks, so the first weeks are quiet." },
    { when: "Weeks 3 to 4", head: "Skin.", body: "Texture and elasticity are typically the first changes." },
    { when: "Weeks 8 to 12", head: "The full effect.", body: "Firmness and healing build over the second and third month." },
    panel("hs-CRP and the blood count are read for context."),
  ],
  epitalon: [
    { when: "Day 1", head: "The course begins.", body: "Once a day for 20 days." },
    { when: "Weeks 1 to 2", head: "Sleep.", body: "Sleep is typically the first change." },
    { when: "Day 20", head: "The course ends.", body: "Courses are repeated a few times a year, on the physician's schedule." },
    panel("Metabolic and inflammation markers are read for context."),
  ],
  "nad-plus": [
    { when: "Days 1 to 14", head: "Energy.", body: "Energy is typically the first change, within days to two weeks." },
    { when: "Weeks 2 to 8", head: "Recovery.", body: "Recovery and mental clarity build with three doses a week." },
    { when: "Ongoing", head: "It builds while taken.", body: "NAD+ is replenished, not stored; the effect continues with the doses." },
    panel("Metabolic and inflammation markers are read for context."),
  ],
  "mots-c": [
    { when: "Week 1", head: "The first dose.", body: "Twice a week, alongside training." },
    { when: "Weeks 2 to 4", head: "Endurance.", body: "Training capacity and recovery are typically the first changes." },
    { when: "Weeks 8 to 12", head: "Metabolism.", body: "Metabolic changes build over the second and third month." },
    panel("Fasting insulin and HbA1c are read,", "for steadier blood sugar"),
  ],
  semaglutide: [
    { when: "Week 1", head: "The first dose, at the lowest step.", body: "Appetite typically quiets within the first week. Mild nausea early on is common and usually settles." },
    { when: "Weeks 4 to 12", head: "Weight.", body: "The dose steps up every few weeks. Weight change typically shows from week 4." },
    { when: "Week 12", head: "The panel is repeated.", body: "HbA1c, fasting glucose and insulin, and lipase are read, and the next step is set." },
    { when: "Months 6 to 12", head: "The full effect.", body: "In the large trials, weight loss continued through the first year. The term is set with the physician." },
  ],
  tirzepatide: [
    { when: "Week 1", head: "The first dose, at the lowest step.", body: "Appetite and thoughts of food typically quiet within the first week. Mild nausea early on is common and usually settles." },
    { when: "Weeks 4 to 12", head: "Weight.", body: "The dose steps up every few weeks. Weight change typically shows from week 4." },
    { when: "Week 12", head: "The panel is repeated.", body: "HbA1c, fasting glucose and insulin, and lipase are read, and the next step is set." },
    { when: "Months 6 to 12", head: "The full effect.", body: "In the large trials, weight loss continued through the first year. The term is set with the physician." },
  ],
  dsip: [
    { when: "Night 1", head: "The first dose, at bedtime.", body: "Falling asleep faster is often noticed in the first nights." },
    { when: "Weeks 1 to 2", head: "Deep sleep.", body: "More deep sleep, and steadier nights." },
    { when: "Ongoing", head: "Nightly, while taken.", body: "The effect continues with the doses." },
    panel("Cortisol and thyroid are read for context."),
  ],
  "pt-141": [
    { when: "Dose 1", head: "About an hour ahead.", body: "It acts within 45 minutes to 2 hours and stays active for several hours." },
    { when: "Ongoing", head: "On the days chosen.", body: "Within the monthly limit the physician sets. Flushing or nausea is sometimes noticed the first time." },
    panel("Testosterone and estradiol are read for context."),
  ],
  "thymosin-a1": [
    { when: "Week 1", head: "The first doses.", body: "Twice a week from here." },
    { when: "Weeks 2 to 4", head: "Resilience.", body: "Fewer knocks under stress, and quicker recovery from them." },
    { when: "Ongoing", head: "While taken.", body: "Often taken through a season." },
    panel("The blood count and hs-CRP are read for context."),
  ],
  "aod-9604": [
    { when: "Week 1", head: "The first dose.", body: "Daily, alongside the main plan." },
    { when: "Weeks 4 to 12", head: "Alongside the plan.", body: "Any change is gradual and rides on the broader plan. The human evidence is limited." },
    panel("Fasting glucose, insulin and triglycerides are read for context."),
  ],
  oxytocin: [
    { when: "Dose 1", head: "Shortly before.", body: "Within the hour, for a few hours." },
    { when: "Ongoing", head: "On the days chosen.", body: "Often taken alongside PT-141." },
    panel("Hormones are read for context."),
  ],
  tadalafil: [
    { when: "Dose 1", head: "About 20 to 30 minutes ahead.", body: "Active for more than a day." },
    { when: "Ongoing", head: "On the days chosen.", body: "It works on performance; PT-141 works on desire." },
    panel("The lipid panel, glucose, liver and kidney markers are read for context."),
  ],
  testosterone: [
    { when: "Weeks 2 to 6", head: "Energy and mood.", body: "Energy, drive and mood are typically the first changes." },
    { when: "Week 6", head: "Levels settle.", body: "A steady state is reached on the weekly rhythm." },
    { when: "Week 12", head: "The panel is repeated.", body: "Total and free testosterone, estradiol and hematocrit are read first, and the dose is adjusted." },
    { when: "Months 3 to 6", head: "Body.", body: "Muscle and body composition change over the first three to six months." },
  ],
  kisspeptin: [
    { when: "Weeks 1 to 6", head: "Own production.", body: "The signal acts upstream, so change is gradual and shows in the hormones before it is felt." },
    { when: "Week 12", head: "The panel is repeated.", body: "LH and FSH, testosterone, estradiol and SHBG are read first." },
    { when: "Ongoing", head: "While taken.", body: "It supports the body's own axis rather than replacing it." },
  ],
};
export const milestonesFor = (slug: string): Milestone[] | undefined => MILESTONES[slug];
