/* ═══ Monitoring model: one full panel, at week 12, for everyone ═══

   The site's source of truth for bloodwork (docs/MASTER-PLAN.md, Part 1).
   Chiya's decisions, 2026-09-02: start first (the doctor prescribes from the
   questionnaire, no draw before the first dose); one full panel at week 12,
   included in every plan; the same panel for everyone. Every marker carries
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

/* The full panel: what a doctor wants to see twelve weeks into a peptide
   plan. Grouped the way the results page will group them. */
export const FULL_PANEL: PanelGroup[] = [
  {
    name: "Sugar and insulin",
    markers: [
      { name: "HbA1c", why: "Your three-month blood sugar average. The clearest single picture of metabolic change." },
      { name: "Fasting glucose", why: "Blood sugar on the day, read with HbA1c." },
      { name: "Fasting insulin", why: "How hard your body works to manage sugar. Often the first thing to move." },
    ],
  },
  {
    name: "Cholesterol and heart",
    markers: [
      { name: "Total cholesterol", why: "The headline number your doctor tracks over time." },
      { name: "LDL cholesterol", why: "The fraction most linked to heart risk." },
      { name: "HDL cholesterol", why: "The protective fraction." },
      { name: "Triglycerides", why: "Blood fats. Tesamorelin and weight change move this." },
      { name: "Apolipoprotein B", why: "A more precise count of the particles that carry cholesterol." },
      { name: "hs-CRP", why: "Low-grade inflammation, which often falls as metabolic health improves." },
    ],
  },
  {
    name: "Liver, kidneys and pancreas",
    markers: [
      { name: "ALT and AST", why: "Liver enzymes. The liver processes your medication." },
      { name: "Creatinine and eGFR", why: "Kidney function." },
      { name: "Lipase", why: "A pancreas marker. GLP-1 medicines can strain the pancreas, so your doctor watches it." },
    ],
  },
  {
    name: "Hormones",
    markers: [
      { name: "IGF-1", why: "The signal growth-hormone peptides raise. Tesamorelin's dose is set and capped against it." },
      { name: "Total testosterone", why: "Energy, muscle and desire all run through it." },
      { name: "Free testosterone", why: "The part your body can actually use." },
      { name: "Estradiol", why: "Balance matters in men and women both." },
      { name: "SHBG", why: "The carrier protein that decides how much hormone is free." },
      { name: "TSH", why: "Thyroid function, which affects weight and energy on its own." },
      { name: "Free T4", why: "The active thyroid hormone, read with TSH." },
      { name: "Cortisol", why: "Stress hormone. Context for sleep, appetite and recovery." },
    ],
  },
  {
    name: "Blood and nutrients",
    markers: [
      { name: "Complete blood count", why: "Red cells, white cells and platelets. A general health check." },
      { name: "Ferritin", why: "Iron stores, which drive energy." },
      { name: "Vitamin D", why: "Low in most adults, and easy to fix." },
      { name: "Vitamin B12", why: "Energy and nerve function." },
    ],
  },
];

export const FULL_PANEL_MARKERS: Marker[] = FULL_PANEL.flatMap((g) => g.markers);
/** The honest "how many", derived. Never type this number on a page. */
export const FULL_PANEL_COUNT = FULL_PANEL_MARKERS.length;

/* What each peptide's doctor is looking for in that panel, and the screens
   that happen in the questionnaire because there is no draw before the
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
    why: "Semaglutide changes how your body handles food and blood sugar. Your week-12 panel shows your physician how you are responding and whether your dose is right.",
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
    why: "Tirzepatide works on two appetite and blood sugar hormones at once. Your week-12 panel shows your physician how you are responding and whether your dose is right.",
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
];

export function monitoringFor(slug: string): PeptideMonitoring | undefined {
  return PEPTIDE_MONITORING.find((m) => m.slug === slug);
}
