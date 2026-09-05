/* ═══ WHAT TO EXPECT — the weeks, as milestones ═══
   Four marks per medicine: the first days, the feel-by window, week 12 (the
   test, and what the physician looks for), and beyond. Built from the
   catalog's feelBy / fullEffect / timeline and data/monitoring, in the plain
   register. "May" throughout: the bar says WHEN, never a promised result.
   FLAGGED FOR PHYSICIAN REVIEW before apex launch. */
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";

export interface Milestone { when: string; head: string; body: string }

const wk12 = (reads: string, looksFor: string): Milestone => ({
  when: "Week 12",
  head: "Your blood test, and a dose review.",
  body: looksFor === "context"
    ? `The same ${PANEL_TOTAL_MARKERS} markers, drawn at home. Your physician reads ${reads} for context, and continues, adjusts or stops the dose.`
    : `The same ${PANEL_TOTAL_MARKERS} markers, drawn at home. Your physician reads ${reads} first, looking for ${looksFor}, and continues, adjusts or stops the dose.`,
});

export const MILESTONES: Record<string, Milestone[]> = {
  sermorelin: [
    { when: "Nights 1 to 7", head: "Your first doses, at bedtime.", body: "Many people notice deeper sleep in the first week. Body changes take longer." },
    { when: "Weeks 2 to 4", head: "Sleep first.", body: "Sleep quality and morning recovery are usually the first things you may notice." },
    { when: "Weeks 8 to 12", head: "Body composition.", body: "Lean mass and recovery build gradually, with training and protein doing their part." },
    wk12("your IGF-1", "a rise within the healthy range"),
  ],
  "ipa-cjc": [
    { when: "Night 1", head: "Your first dose, at bedtime.", body: "Sleep may deepen within the first week." },
    { when: "Weeks 2 to 4", head: "Recovery.", body: "Faster recovery between sessions is often the next thing you may notice." },
    { when: "Weeks 8 to 12", head: "Lean mass.", body: "Body composition changes build over the second and third month." },
    wk12("your IGF-1", "a rise within the healthy range"),
  ],
  tesamorelin: [
    { when: "Week 1", head: "Your first dose, in the evening.", body: "Nothing to feel yet. The medicine is working on your growth-hormone rhythm from the first dose." },
    { when: "Weeks 4 to 8", head: "The first change.", body: "Deep abdominal fat is usually the first thing to shift, often before the scale moves." },
    { when: "Week 12", head: "Your blood test.", body: "Your physician reads your IGF-1 first, looking for a rise within the healthy range, then HbA1c and fasting glucose, since the medicine can nudge blood sugar." },
    { when: "Beyond", head: "The full effect.", body: "In the pivotal trial the reduction in deep abdominal fat continued through six months. Your physician sets the term with you." },
  ],
  selank: [
    { when: "Day 1", head: "Your first spray.", body: "Some people notice a calmer edge the same day; for others it takes a week." },
    { when: "Weeks 2 to 4", head: "The steady state.", body: "A steadier mood and clearer focus under pressure, with the spray taken twice a day." },
    wk12("your cortisol and thyroid", "context"),
  ],
  semax: [
    { when: "Day 1", head: "Your first spray, in the morning.", body: "Focus may sharpen the same day; the build takes a week or two." },
    { when: "Weeks 2 to 4", head: "The steady state.", body: "Focus, memory and mental stamina, with the spray taken daily." },
    wk12("your cortisol and thyroid", "context"),
  ],
  "bpc-157": [
    { when: "Days 1 to 7", head: "Your first doses.", body: "Gut symptoms, where present, are often the first to ease, within days." },
    { when: "Weeks 1 to 2", head: "Tissue.", body: "Tendon, muscle and joint discomfort may begin to ease." },
    { when: "Weeks 4 to 8", head: "Repair.", body: "Recovery builds through the course, alongside the rest your tissue needs." },
    wk12("your hs-CRP and blood count", "inflammation settling"),
  ],
  "tb-500": [
    { when: "Week 1", head: "Your first dose.", body: "Twice a week from here." },
    { when: "Weeks 2 to 3", head: "The first change.", body: "Stiffness and recovery time are usually the first things you may notice." },
    { when: "Weeks 6 to 8", head: "Recovery.", body: "Muscle, tendon and joint recovery build through the second month." },
    wk12("your hs-CRP and blood count", "inflammation settling"),
  ],
  "bpc-tb-combo": [
    { when: "Days 1 to 7", head: "Your first doses.", body: "Gut symptoms, where present, often ease first." },
    { when: "Weeks 1 to 3", head: "Tissue.", body: "Discomfort may begin to ease as both peptides work on the same tissue." },
    { when: "Weeks 6 to 8", head: "Recovery.", body: "Recovery builds through the second month." },
    wk12("your hs-CRP and blood count", "inflammation settling"),
  ],
  "ghk-cu": [
    { when: "Week 1", head: "Your first dose.", body: "Skin renews on its own cycle of about four weeks, so the first weeks are quiet." },
    { when: "Weeks 3 to 4", head: "Skin.", body: "Texture and elasticity are usually the first things you may notice." },
    { when: "Weeks 8 to 12", head: "The full effect.", body: "Firmness and healing build over the second and third month." },
    wk12("your hs-CRP and blood count", "context"),
  ],
  epitalon: [
    { when: "Day 1", head: "Your course begins.", body: "Once a day for 20 days." },
    { when: "Weeks 1 to 2", head: "Sleep.", body: "Sleep is usually the first thing you may notice." },
    { when: "Day 20", head: "Your course ends.", body: "Courses are repeated a few times a year, on your physician's schedule." },
    wk12("your metabolic and inflammation markers", "context"),
  ],
  "nad-plus": [
    { when: "Days 1 to 14", head: "Energy.", body: "Energy is usually the first thing you may notice, within days to two weeks." },
    { when: "Weeks 2 to 8", head: "Recovery.", body: "Recovery and mental clarity build with three doses a week." },
    { when: "Ongoing", head: "It builds while you take it.", body: "NAD+ is replenished, not stored; the effect continues with the doses." },
    wk12("your metabolic and inflammation markers", "context"),
  ],
  "mots-c": [
    { when: "Week 1", head: "Your first dose.", body: "Twice a week, alongside training." },
    { when: "Weeks 2 to 4", head: "Endurance.", body: "Training capacity and recovery are usually the first things you may notice." },
    { when: "Weeks 8 to 12", head: "Metabolism.", body: "Metabolic changes build over the second and third month." },
    wk12("your fasting insulin and HbA1c", "steadier blood sugar"),
  ],
  semaglutide: [
    { when: "Week 1", head: "Your first dose, at the lowest step.", body: "Appetite usually quiets within the first week. Mild nausea is common early and usually settles." },
    { when: "Weeks 4 to 12", head: "Weight.", body: "Your dose steps up every few weeks. Weight change usually shows from week 4 onward." },
    { when: "Week 12", head: "Your blood test, and a dose review.", body: "Your physician reads HbA1c, fasting glucose and insulin, and lipase, and sets the next step." },
    { when: "Months 6 to 12", head: "The full effect.", body: "In the large trials, weight loss continued through the first year. Your physician sets the term with you." },
  ],
  tirzepatide: [
    { when: "Week 1", head: "Your first dose, at the lowest step.", body: "Appetite and food thoughts usually quiet within the first week. Mild nausea early is common and usually settles." },
    { when: "Weeks 4 to 12", head: "Weight.", body: "Your dose steps up every few weeks. Weight change usually shows from week 4 onward." },
    { when: "Week 12", head: "Your blood test, and a dose review.", body: "Your physician reads HbA1c, fasting glucose and insulin, and lipase, and sets the next step." },
    { when: "Months 6 to 12", head: "The full effect.", body: "In the large trials, weight loss continued through the first year. Your physician sets the term with you." },
  ],
  dsip: [
    { when: "Night 1", head: "Your first dose, at bedtime.", body: "Falling asleep faster is often noticed in the first nights." },
    { when: "Weeks 1 to 2", head: "Deep sleep.", body: "More deep sleep, and steadier nights." },
    { when: "Ongoing", head: "Nightly, while you take it.", body: "The effect continues with the doses." },
    wk12("your cortisol and thyroid", "context"),
  ],
  "pt-141": [
    { when: "Dose 1", head: "About an hour ahead.", body: "Works within 45 minutes to 2 hours, and stays active for several hours." },
    { when: "Ongoing", head: "On the days you choose.", body: "Within the monthly limit your physician sets. Some people notice flushing or nausea the first time." },
    wk12("your testosterone and estradiol", "context"),
  ],
  "thymosin-a1": [
    { when: "Week 1", head: "Your first doses.", body: "Twice a week from here." },
    { when: "Weeks 2 to 4", head: "Resilience.", body: "Fewer knocks under stress, and quicker recovery from them, are what people tend to notice." },
    { when: "Ongoing", head: "While you take it.", body: "Often taken through a season." },
    wk12("your blood count and hs-CRP", "context"),
  ],
  "aod-9604": [
    { when: "Week 1", head: "Your first dose.", body: "Daily, alongside your main plan." },
    { when: "Weeks 4 to 12", head: "Alongside the plan.", body: "Any change is gradual and rides on the broader plan. The human evidence is limited." },
    wk12("your fasting glucose, insulin and triglycerides", "context"),
  ],
  oxytocin: [
    { when: "Dose 1", head: "Shortly before.", body: "Within the hour, for a few hours." },
    { when: "Ongoing", head: "On the days you choose.", body: "Often taken alongside PT-141." },
    wk12("your hormones", "context"),
  ],
  tadalafil: [
    { when: "Dose 1", head: "About 20 to 30 minutes ahead.", body: "Active for more than a day." },
    { when: "Ongoing", head: "On the days you choose.", body: "Works on performance; PT-141 works on desire." },
    wk12("your lipid panel, glucose, liver and kidney markers", "context"),
  ],
  testosterone: [
    { when: "Weeks 2 to 6", head: "Energy and mood.", body: "Energy, drive and mood are usually the first things you may notice." },
    { when: "Week 6", head: "Levels settle.", body: "Your level reaches a steady state on the weekly rhythm." },
    { when: "Week 12", head: "Your blood test.", body: "Your physician reads total and free testosterone, estradiol and hematocrit first, and adjusts the dose." },
    { when: "Months 3 to 6", head: "Body.", body: "Muscle and body composition change over the first three to six months." },
  ],
  kisspeptin: [
    { when: "Weeks 1 to 6", head: "Your own production.", body: "The signal works upstream, so change is gradual and shows in your hormones before you feel it." },
    { when: "Week 12", head: "Your blood test.", body: "Your physician reads LH and FSH, testosterone, estradiol and SHBG first." },
    { when: "Ongoing", head: "While you take it.", body: "Supports your own axis rather than replacing it." },
  ],
};
export const milestonesFor = (slug: string): Milestone[] | undefined => MILESTONES[slug];
