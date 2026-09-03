/* ═══ Monitoring model: the panel each peptide needs, and why ═══

   Replaces the flat 99-marker panel as the site's source of truth for
   bloodwork (docs/MASTER-PLAN.md, Part 1). Every marker carries the reason
   it is drawn, in the reader's words, so a page can print the "why" next to
   the "what".

   STATUS: PROPOSED. Standard monitoring practice for these drug classes,
   pending sign-off by the prescribing physicians (MDI). Until `signedOff`
   is true the site describes these as typical and says the doctor sets the
   reader's panel. Nothing here is medical advice. */

export type Marker = { name: string; why: string };

export interface MonitoringPlan {
  /** catalog slug, or a class key for stacks */
  slug: string;
  peptide: string;
  drugClass: string;
  /** one breath on why blood is part of this peptide */
  why: string;
  baseline: Marker[];
  /** the week-12 retest */
  retest: Marker[];
  /** screens that are questions or measurements, not blood */
  intakeScreens: string[];
  /** the marker the dose is set against, if any */
  doseMarker?: string;
  retestWeek: number;
  signedOff: boolean;
}

const cmp: Marker = { name: "Comprehensive metabolic panel", why: "Your kidneys and liver, which process the medication." };
const cbc: Marker = { name: "Complete blood count", why: "A general health check before starting anything." };
const lipids: Marker = { name: "Lipid panel", why: "Cholesterol and triglycerides, which these plans are expected to move." };
const hba1c: Marker = { name: "HbA1c", why: "Your three-month blood sugar average, the clearest picture of metabolic change." };
const glucose: Marker = { name: "Fasting glucose", why: "Blood sugar on the day, read with HbA1c." };
const insulin: Marker = { name: "Fasting insulin", why: "How hard your body works to manage sugar. Often the first thing to improve." };
const tsh: Marker = { name: "TSH", why: "Thyroid function, which affects weight and energy on its own." };
const lipase: Marker = { name: "Lipase", why: "A pancreas marker. GLP-1 medicines can strain the pancreas, so your doctor watches it." };
const igf1: Marker = { name: "IGF-1", why: "The signal growth-hormone peptides raise. Your dose is set and capped against it." };

const glp1 = (slug: string, peptide: string): MonitoringPlan => ({
  slug,
  peptide,
  drugClass: "GLP-1 receptor agonist",
  why: "This medicine changes how your body handles food and sugar. Blood shows your doctor it is safe to start, and later shows what it changed.",
  baseline: [hba1c, glucose, insulin, lipids, cmp, cbc, tsh, lipase],
  retest: [hba1c, glucose, lipids, cmp, lipase],
  intakeScreens: [
    "Personal or family history of medullary thyroid cancer or MEN 2",
    "History of pancreatitis",
    "Current medications, especially insulin and other diabetes drugs",
    "Pregnancy, or planning one",
  ],
  retestWeek: 12,
  signedOff: false,
});

export const MONITORING: MonitoringPlan[] = [
  glp1("semaglutide", "Semaglutide"),
  glp1("tirzepatide", "Tirzepatide"),
  {
    slug: "tesamorelin",
    peptide: "Tesamorelin",
    drugClass: "Growth hormone releasing hormone analog",
    why: "Tesamorelin asks your body to release more of its own growth hormone. The right dose is a number in your blood, IGF-1, and the medicine can nudge blood sugar, so both are watched.",
    baseline: [igf1, hba1c, glucose, lipids, cmp],
    retest: [igf1, hba1c, glucose, lipids],
    intakeScreens: ["Active cancer or a history of cancer", "Pituitary conditions", "Pregnancy, or planning one"],
    doseMarker: "IGF-1",
    retestWeek: 12,
    signedOff: false,
  },
  {
    slug: "pt-141",
    peptide: "PT-141",
    drugClass: "Melanocortin receptor agonist",
    why: "PT-141 works on desire through the brain, not through hormones, so there is no blood marker to chase. The screen is your heart and your blood pressure, because the medicine raises pressure for a few hours after a dose.",
    baseline: [],
    retest: [],
    intakeScreens: [
      "Blood pressure, measured",
      "Heart or blood-vessel conditions",
      "Optional: testosterone and estradiol, if low desire may be hormonal",
    ],
    retestWeek: 12,
    signedOff: false,
  },
];

export function monitoringFor(slug: string): MonitoringPlan | undefined {
  return MONITORING.find((m) => m.slug === slug);
}

/** Distinct baseline markers across the launch plans: the honest "how many" if a page needs one. */
export const BASELINE_MARKER_COUNT = new Set(MONITORING.flatMap((m) => m.baseline.map((x) => x.name))).size;
