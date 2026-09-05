/* ═══ Monitoring model: a baseline kit with the first order, the same
   full panel again at week 12 ═══

   The site's source of truth for bloodwork (docs/MASTER-PLAN.md, Part 1).
   The playbook (Chiya, 2026-09-04) supersedes the 2026-09-02 "start first"
   model: a baseline blood-work kit ships free with the first order, so the
   reader tests before they start and the physician doses against a number;
   the same full panel is drawn again at week 12 (the 90-day retest) and, on
   the twelve-month term, quarterly. The same panel for everyone. Every marker carries
   the reason it is drawn, in the reader's words, so a page prints the "why"
   next to the "what". Counts are DERIVED from this list, never typed.

   STATUS: PROPOSED. Standard monitoring practice for these drug classes,
   pending sign-off by the prescribing physicians (MDI). Until `SIGNED_OFF`
   is true the site describes the panel as typical and says the doctor sets
   the reader's panel. Nothing here is medical advice. */

export type Marker = { name: string; why: string };
export type PanelGroup = { name: string; markers: Marker[] };

export const SIGNED_OFF = false;
export const RETEST_WEEK = 12;
/** The baseline kit: the same full panel, drawn at home before the first
    dose. Included with the first order on every term (the playbook). */
export const BASELINE = {
  when: "Before the first dose",
  line: "An at-home blood kit ships with the first order, included. The physician sets the dose from the results, and the same panel is drawn again at week 12 and compared.",
  short: "Baseline panel with the first order, included",
} as const;

/* The full panel: what a doctor wants to see twelve weeks into a peptide
   plan. Grouped the way the results page will group them. */
export const FULL_PANEL: PanelGroup[] = [
  {
    name: "Sugar and insulin",
    markers: [
      { name: "HbA1c", why: "Your average blood sugar over the last three months, and the clearest single picture of metabolic change." },
      { name: "Fasting glucose", why: "Your blood sugar on the day, read alongside HbA1c." },
      { name: "Fasting insulin", why: "How hard your body is working to manage sugar, and often the first number to move." },
    ],
  },
  {
    name: "Cholesterol and heart",
    markers: [
      { name: "Total cholesterol", why: "The headline number your physician tracks over time." },
      { name: "LDL cholesterol", why: "The fraction of your cholesterol most linked to heart risk." },
      { name: "HDL cholesterol", why: "The protective fraction of your cholesterol." },
      { name: "Triglycerides", why: "The fats in your blood, which tesamorelin and weight change both move." },
      { name: "Apolipoprotein B", why: "A more precise count of the particles that carry your cholesterol." },
      { name: "hs-CRP", why: "Low-grade inflammation, which often falls as your metabolic health improves." },
    ],
  },
  {
    name: "Liver, kidneys and pancreas",
    markers: [
      { name: "ALT and AST", why: "Your liver enzymes, since your liver processes the medicine." },
      { name: "Creatinine and eGFR", why: "How well your kidneys are working." },
      { name: "Lipase", why: "A pancreas marker your physician watches, because GLP-1 medicines can strain the pancreas." },
    ],
  },
  {
    name: "Hormones",
    markers: [
      { name: "IGF-1", why: "The signal growth-hormone peptides raise, and the number tesamorelin's dose is set and capped against." },
      { name: "Total testosterone", why: "Your energy, muscle and desire all run through it." },
      { name: "Free testosterone", why: "The part of your testosterone your body can actually use." },
      { name: "Estradiol", why: "Estrogen, whose balance matters in men and women both." },
      { name: "SHBG", why: "The carrier protein that decides how much of your hormone is free." },
      { name: "TSH", why: "Your thyroid function, which affects weight and energy on its own." },
      { name: "Free T4", why: "The active thyroid hormone, read alongside TSH." },
      { name: "Cortisol", why: "Your stress hormone, and context for sleep, appetite and recovery." },
    ],
  },
  {
    name: "Blood and nutrients",
    markers: [
      { name: "Complete blood count", why: "Your red cells, white cells and platelets, as a general health check." },
      { name: "Ferritin", why: "Your iron stores, which drive energy." },
      { name: "Vitamin D", why: "Commonly low, and it affects bone, mood and immunity." },
      { name: "Vitamin B12", why: "What your energy and your nerves run on." },
    ],
  },
];

export const FULL_PANEL_MARKERS: Marker[] = FULL_PANEL.flatMap((g) => g.markers);
/** The honest "how many", derived. Never type this number on a page. */
export const FULL_PANEL_COUNT = FULL_PANEL_MARKERS.length;

/* What each peptide's doctor is looking for in that panel, and the screens
   that happen in the questionnaire, before the baseline kit is read, so a
   first dose. */
export interface PeptideMonitoring {
  slug: string;
  peptide: string;
  drugClass: string;
  why: string;
  /** the markers in the full panel the doctor reads first for this peptide */
  watch: string[];
  /** the marker the dose is set against, if any */
  doseMarker?: string;
  intakeScreens: string[];
}

export const PEPTIDE_MONITORING: PeptideMonitoring[] = [
  {
    slug: "semaglutide",
    peptide: "Semaglutide",
    drugClass: "GLP-1 receptor agonist",
    why: "Semaglutide changes how your body handles food and blood sugar. Your week-12 blood test shows your physician how you are responding and whether your dose is right.",
    watch: ["HbA1c", "Fasting glucose", "Fasting insulin", "Triglycerides", "Lipase", "ALT and AST"],
    intakeScreens: [
      "Personal or family history of medullary thyroid cancer or MEN 2",
      "History of pancreatitis",
      "Current medications, especially insulin and other diabetes drugs",
      "Pregnancy, or planning one",
    ],
  },
  {
    slug: "tirzepatide",
    peptide: "Tirzepatide",
    drugClass: "GIP and GLP-1 receptor agonist",
    why: "Tirzepatide works on two appetite and blood sugar hormones at once. Your week-12 blood test shows your physician how you are responding and whether your dose is right.",
    watch: ["HbA1c", "Fasting glucose", "Fasting insulin", "Triglycerides", "Lipase", "ALT and AST"],
    intakeScreens: [
      "Personal or family history of medullary thyroid cancer or MEN 2",
      "History of pancreatitis",
      "Current medications, especially insulin and other diabetes drugs",
      "Pregnancy, or planning one",
    ],
  },
  {
    slug: "tesamorelin",
    peptide: "Tesamorelin",
    drugClass: "Growth hormone releasing hormone analog",
    why: "Tesamorelin helps your body release more of its own growth hormone. The right dose shows up as IGF-1 in your blood, and the medication can nudge blood sugar, so your physician checks both at week 12.",
    watch: ["IGF-1", "HbA1c", "Fasting glucose", "Triglycerides"],
    doseMarker: "IGF-1",
    intakeScreens: ["Active cancer or a history of cancer", "Pituitary conditions", "Pregnancy, or planning one"],
  },
  {
    slug: "pt-141",
    peptide: "PT-141",
    drugClass: "Melanocortin receptor agonist",
    why: "PT-141 works on desire through the brain. Because a dose raises blood pressure for a few hours, your physician checks your heart and blood pressure first. At week 12, your hormones are checked for context.",
    watch: ["Total testosterone", "Free testosterone", "Estradiol"],
    intakeScreens: ["Blood pressure, measured", "Heart or blood-vessel conditions"],
  },
  {
    slug: "sermorelin",
    peptide: "Sermorelin",
    drugClass: "Growth hormone releasing peptide",
    why: "Sermorelin raises your body's own growth hormone. IGF-1 in your blood shows how much, and it can nudge blood sugar, so your physician checks both at week 12.",
    watch: ["IGF-1", "HbA1c", "Fasting glucose"],
    doseMarker: "IGF-1",
    intakeScreens: ["Active cancer or a history of cancer", "Pituitary conditions", "Pregnancy, or planning one"],
  },
  {
    slug: "ipamorelin",
    peptide: "Ipamorelin",
    drugClass: "Growth hormone releasing peptide",
    why: "Ipamorelin raises your body's own growth hormone. IGF-1 in your blood shows how much, and it can nudge blood sugar, so your physician checks both at week 12.",
    watch: ["IGF-1", "HbA1c", "Fasting glucose"],
    doseMarker: "IGF-1",
    intakeScreens: ["Active cancer or a history of cancer", "Pituitary conditions", "Pregnancy, or planning one"],
  },
  {
    slug: "cjc-1295",
    peptide: "CJC-1295",
    drugClass: "Growth hormone releasing peptide",
    why: "CJC-1295 raises your body's own growth hormone. IGF-1 in your blood shows how much, and it can nudge blood sugar, so your physician checks both at week 12.",
    watch: ["IGF-1", "HbA1c", "Fasting glucose"],
    doseMarker: "IGF-1",
    intakeScreens: ["Active cancer or a history of cancer", "Pituitary conditions", "Pregnancy, or planning one"],
  },
  {
    slug: "ipa-cjc",
    peptide: "Ipamorelin / CJC-1295",
    drugClass: "Growth hormone releasing peptide",
    why: "The blend raises your body's own growth hormone. IGF-1 in your blood shows how much, and it can nudge blood sugar, so your physician checks both at week 12.",
    watch: ["IGF-1", "HbA1c", "Fasting glucose"],
    doseMarker: "IGF-1",
    intakeScreens: ["Active cancer or a history of cancer", "Pituitary conditions", "Pregnancy, or planning one"],
  },
  {
    slug: "selank",
    peptide: "Selank",
    drugClass: "Neuropeptide",
    why: "Selank works on your brain's stress circuits. Your week-12 blood test checks thyroid and cortisol, which shape mood and focus on their own, so your physician can read the whole picture.",
    watch: ["TSH", "Free T4", "Cortisol"],
    intakeScreens: ["Current psychiatric medications", "Pregnancy, or planning one"],
  },
  {
    slug: "semax",
    peptide: "Semax",
    drugClass: "Neuropeptide",
    why: "Semax works on the pathways your brain uses for focus and memory. Your week-12 blood test checks thyroid and cortisol, which shape mood and focus on their own, so your physician can read the whole picture.",
    watch: ["TSH", "Free T4", "Cortisol"],
    intakeScreens: ["Current psychiatric medications", "Pregnancy, or planning one"],
  },
  {
    slug: "cerebrolysin",
    peptide: "Cerebrolysin",
    drugClass: "Neuropeptide preparation",
    why: "Cerebrolysin is a ten-day course by injection. Your week-12 blood test checks kidney and liver markers so your physician can confirm your body handled it well.",
    watch: ["Creatinine and eGFR", "ALT and AST"],
    intakeScreens: ["Kidney disease", "Epilepsy or seizures", "Pregnancy, or planning one"],
  },
  {
    slug: "methylene-blue",
    peptide: "Methylene Blue",
    drugClass: "Mitochondrial support compound",
    why: "Methylene blue is a capsule you take daily. Your week-12 blood test checks your blood count and liver markers.",
    watch: ["Complete blood count", "ALT and AST"],
    intakeScreens: ["G6PD deficiency", "SSRI or SNRI antidepressants", "Pregnancy, or planning one"],
  },
  {
    slug: "bpc-157",
    peptide: "BPC-157",
    drugClass: "Tissue repair peptide",
    why: "BPC-157 supports repair. Your week-12 blood test checks inflammation, blood count and liver markers so your physician can see how your body is responding.",
    watch: ["hs-CRP", "Complete blood count", "ALT and AST"],
    intakeScreens: ["Active cancer or a history of cancer", "Pregnancy or breastfeeding"],
  },
  {
    slug: "tb-500",
    peptide: "TB-500",
    drugClass: "Tissue repair peptide",
    why: "TB-500 supports repair. Your week-12 blood test checks inflammation, blood count and liver markers so your physician can see how your body is responding.",
    watch: ["hs-CRP", "Complete blood count", "ALT and AST"],
    intakeScreens: ["Active cancer or a history of cancer", "Pregnancy or breastfeeding"],
  },
  {
    slug: "bpc-tb-combo",
    peptide: "BPC-157 + TB-500",
    drugClass: "Tissue repair peptide",
    why: "Both peptides support repair. Your week-12 blood test checks inflammation, blood count and liver markers so your physician can see how your body is responding.",
    watch: ["hs-CRP", "Complete blood count", "ALT and AST"],
    intakeScreens: ["Active cancer or a history of cancer", "Pregnancy or breastfeeding"],
  },
  {
    slug: "ghk-cu",
    peptide: "GHK-Cu",
    drugClass: "Copper peptide",
    why: "GHK-Cu supports collagen and skin repair. Your week-12 blood test checks inflammation and your blood count.",
    watch: ["hs-CRP", "Complete blood count"],
    intakeScreens: ["Copper allergy", "Active cancer or a history of cancer"],
  },
  {
    slug: "epitalon",
    peptide: "Epitalon",
    drugClass: "Longevity peptide",
    why: "Epitalon is studied for the sleep-wake cycle and cellular ageing. Your week-12 blood test checks blood sugar, insulin, inflammation and cortisol so your physician can see the response.",
    watch: ["HbA1c", "Fasting insulin", "hs-CRP", "Cortisol"],
    intakeScreens: ["Active cancer or a history of cancer", "Pregnancy, or planning one"],
  },
  {
    slug: "nad-plus",
    peptide: "NAD+",
    drugClass: "Longevity peptide",
    why: "NAD+ tops up what your cells run on. Your week-12 blood test checks blood sugar, insulin, inflammation and cortisol so your physician can see the response.",
    watch: ["HbA1c", "Fasting insulin", "hs-CRP", "Cortisol"],
    intakeScreens: ["Active cancer or a history of cancer", "Pregnancy, or planning one"],
  },
  {
    slug: "mots-c",
    peptide: "MOTS-c",
    drugClass: "Longevity peptide",
    why: "MOTS-c works on your cells' energy and metabolism. Your week-12 blood test checks blood sugar, insulin, inflammation and cortisol so your physician can see the response.",
    watch: ["HbA1c", "Fasting insulin", "hs-CRP", "Cortisol"],
    intakeScreens: ["Active cancer or a history of cancer", "Pregnancy, or planning one"],
  },
  {
    slug: "dsip",
    peptide: "DSIP",
    drugClass: "Sleep peptide",
    why: "DSIP works on your sleep. Your week-12 blood test checks cortisol and thyroid, which shape sleep on their own.",
    watch: ["Cortisol", "TSH"],
    intakeScreens: ["SSRI or SNRI antidepressants", "Pregnancy, or planning one"],
  },
  {
    slug: "thymosin-a1",
    peptide: "Thymosin Alpha-1",
    drugClass: "Immune-modulating peptide",
    why: "Thymosin alpha-1 works on the immune system. Your baseline shows your physician your blood count and inflammation before you start, and the week-12 panel shows how they have moved.",
    watch: ["Complete blood count", "hs-CRP", "ALT and AST"],
    intakeScreens: ["Active cancer or a history of cancer", "Organ transplant or immunosuppressant medication", "Pregnancy, or planning one"],
  },
  {
    slug: "aod-9604",
    peptide: "AOD-9604",
    drugClass: "Growth hormone fragment",
    why: "AOD-9604 is studied for fat metabolism. Your physician reads your metabolic markers at baseline and at week 12 to see whether it is earning its place in your plan.",
    watch: ["Fasting glucose", "Fasting insulin", "Triglycerides", "HbA1c"],
    intakeScreens: ["Pregnancy, or planning one", "Active cancer"],
  },
  {
    slug: "oxytocin",
    peptide: "Oxytocin Nasal",
    drugClass: "Neuropeptide hormone",
    why: "Oxytocin works on closeness and arousal through the brain. Your physician checks your blood pressure first and reads your hormones at baseline and week 12 for context.",
    watch: ["Total testosterone", "Estradiol", "Prolactin"],
    intakeScreens: ["Blood pressure, measured", "Pregnancy, or planning one"],
  },
  {
    slug: "tadalafil",
    peptide: "Tadalafil Nasal",
    drugClass: "PDE5 inhibitor",
    why: "Tadalafil works on blood flow. Your physician checks your heart history and any nitrate medication first, and reads your heart markers at baseline and week 12.",
    watch: ["Lipid panel", "Fasting glucose", "ALT and AST", "Creatinine"],
    intakeScreens: ["Nitrate medications", "Recent heart attack or stroke", "Liver or kidney disease"],
  },
  {
    slug: "testosterone",
    peptide: "Testosterone Cypionate",
    drugClass: "Androgen replacement",
    why: "Testosterone is dosed against a number, so your baseline panel matters most here. Your physician sets your dose from your total and free testosterone, then reads testosterone, estradiol and red blood cell count at week 12 to adjust it.",
    watch: ["Total testosterone", "Free testosterone", "Estradiol", "Hematocrit", "PSA", "LH and FSH"],
    doseMarker: "Total testosterone",
    intakeScreens: ["Prostate or breast cancer", "Untreated sleep apnea", "Plans to conceive", "High red blood cell count"],
  },
  {
    slug: "kisspeptin",
    peptide: "Kisspeptin",
    drugClass: "GnRH secretagogue",
    why: "Kisspeptin works one step above your own hormones. Your physician reads LH, FSH and testosterone at baseline and week 12 to see the axis responding.",
    watch: ["LH and FSH", "Total testosterone", "Estradiol", "SHBG"],
    intakeScreens: ["Pregnancy, or planning one", "Hormone-sensitive cancer"],
  },
];

export function monitoringFor(slug: string): PeptideMonitoring | undefined {
  return PEPTIDE_MONITORING.find((m) => m.slug === slug);
}
