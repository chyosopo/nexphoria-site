/* ══════════════════════════════════════════════════════════════
   NEXPHORIA — SOLO PEPTIDE CATALOG (P5 wave 2)
   Source: MDI × Nexphoria handoff. 19 solos, real dosing + specs.
   Voice = ours (institutional). Data = doc's.
   Pricing tiers are [1-month, 3-month/mo, 12-month/mo] per doc.
   "priceAtConsult" solos are held off the shelf (doc TBD).
   GLP-1 solos (semaglutide, tirzepatide) are GATED, not sold.
   ══════════════════════════════════════════════════════════════ */

export type SoloCategory =
  | "Growth" | "Cognitive" | "Recovery" | "Skin & Longevity"
  | "Metabolic" | "Sleep" | "Sexual Health";

export interface SoloPricing {
  /** monthly-equivalent at 1-mo / 3-mo / 12-mo cadence */
  m1: number; m3: number; m12: number;
}

export interface SoloPeptide {
  slug: string;
  name: string;
  category: SoloCategory;
  dose: string;
  spec: string;
  mechanism: string;
  timeline: { wk: string; effect: string }[];
  panel: "Basic" | "Full" | "Elite";
  panelNote?: string;
  contraindications: string[];
  pricing?: SoloPricing;      // omit => priced at consult
  gated?: boolean;            // GLP-1
  stateExclusions?: string[];
}

export const SOLO_CATALOG: SoloPeptide[] = [
  /* ── GROWTH / GH-AXIS ── */
  {
    slug: "sermorelin", name: "Sermorelin", category: "Growth",
    dose: "300 mcg nightly SC", spec: "3 mg/mL · 5 mL vial",
    mechanism: "A GHRH analog that prompts the pituitary to release growth hormone in its natural nocturnal pulse, rather than replacing it.",
    timeline: [{ wk: "Wk 1", effect: "Sleep depth improves." }, { wk: "Wk 4", effect: "Recovery response." }, { wk: "Wk 12", effect: "Body-composition reassessed." }],
    panel: "Full", panelNote: "Full panel — IGF-1 monitored.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 189, m3: 159, m12: 129 },
  },
  {
    slug: "ipamorelin", name: "Ipamorelin", category: "Growth",
    dose: "200 mcg nightly SC", spec: "5 mg/mL · 5 mL vial",
    mechanism: "A selective GH secretagogue that raises pulse frequency without a cortisol or prolactin spike.",
    timeline: [{ wk: "Wk 1", effect: "Sleep depth." }, { wk: "Wk 4", effect: "Recovery + lean mass." }, { wk: "Wk 12", effect: "Composition shift." }],
    panel: "Full", panelNote: "Full panel — IGF-1 mandatory.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 189, m3: 159, m12: 129 },
  },
  {
    slug: "cjc-1295", name: "CJC-1295 (no-DAC)", category: "Growth",
    dose: "100 mcg nightly SC", spec: "5 mg/mL · 5 mL vial",
    mechanism: "A GHRH analog that amplifies GH pulse amplitude; paired with a secretagogue for amplitude and frequency together.",
    timeline: [{ wk: "Wk 1", effect: "Sleep depth." }, { wk: "Wk 4", effect: "Recovery response." }, { wk: "Wk 12", effect: "Composition reassessed." }],
    panel: "Full", panelNote: "Full panel — IGF-1 monitored.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 239, m3: 209, m12: 179 },
  },
  {
    slug: "ipa-cjc", name: "Ipamorelin / CJC-1295 Blend", category: "Growth",
    dose: "300 mcg nightly SC", spec: "5 mg/mL · 5 mL vial",
    mechanism: "The combined blend: CJC raises pulse amplitude, Ipamorelin raises frequency — the standard GH-axis pairing in one vial.",
    timeline: [{ wk: "Wk 1", effect: "Sleep depth." }, { wk: "Wk 4", effect: "Recovery + lean mass." }, { wk: "Wk 12", effect: "Composition shift." }],
    panel: "Full", panelNote: "Full panel — IGF-1 mandatory.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 249, m3: 219, m12: 179 },
  },
  {
    slug: "tesamorelin", name: "Tesamorelin", category: "Growth",
    dose: "2 mg daily SC", spec: "5 mg/mL · 3 mL vial",
    mechanism: "A stabilized GHRH analog studied for visceral-fat reduction, acting on the GH/IGF-1 axis.",
    timeline: [{ wk: "Wk 2", effect: "Early metabolic response." }, { wk: "Wk 8", effect: "Visceral markers move." }, { wk: "Wk 12", effect: "Composition reassessed." }],
    panel: "Full", panelNote: "Full panel — IGF-1 mandatory.",
    contraindications: ["Active malignancy", "Pregnancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 349, m3: 299, m12: 249 },
  },

  /* ── COGNITIVE ── */
  {
    slug: "selank", name: "Selank", category: "Cognitive",
    dose: "300 mcg 2×/day intranasal", spec: "5 mg/mL · 3 mL nasal spray",
    mechanism: "An anxiolytic peptide that modulates GABA and select cytokines, steadying the mood floor without sedation.",
    timeline: [{ wk: "Day 1–3", effect: "Calming onset." }, { wk: "Wk 2", effect: "Mood floor steadies." }, { wk: "Wk 8", effect: "Baseline set." }],
    panel: "Basic", panelNote: "Basic panel plus TSH.",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    pricing: { m1: 159, m3: 139, m12: 119 },
  },
  {
    slug: "semax", name: "Semax", category: "Cognitive",
    dose: "600 mcg 1×/day intranasal", spec: "10 mg/mL · 3 mL nasal spray",
    mechanism: "A nootropic peptide that upregulates BDNF, supporting focus and executive function.",
    timeline: [{ wk: "Day 1–3", effect: "Focus onset." }, { wk: "Wk 2", effect: "Sustained attention." }, { wk: "Wk 8", effect: "Executive baseline." }],
    panel: "Basic",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    pricing: { m1: 179, m3: 149, m12: 129 },
  },
  {
    slug: "cerebrolysin", name: "Cerebrolysin", category: "Cognitive",
    dose: "5 mL IM daily × 10 days", spec: "215.2 mg/mL · 5 mL ampoule",
    mechanism: "A neuropeptide preparation studied for neurotrophic support, given as a defined short course.",
    timeline: [{ wk: "Course", effect: "10-day cycle." }, { wk: "Wk 4", effect: "Cognitive reassessment." }, { wk: "Wk 8", effect: "Physician review." }],
    panel: "Basic",
    contraindications: ["Pregnancy", "Severe renal impairment", "Epilepsy (physician review)"],
    pricing: { m1: 299, m3: 259, m12: 229 },
  },
  {
    slug: "methylene-blue", name: "Methylene Blue", category: "Cognitive",
    dose: "5–10 mg daily PO", spec: "5 mg capsules · 60 count",
    mechanism: "A low-dose mitochondrial electron cycler studied for cellular energy and cognitive support.",
    timeline: [{ wk: "Wk 1", effect: "Energy response." }, { wk: "Wk 4", effect: "Cognitive reassessment." }, { wk: "Wk 8", effect: "Physician review." }],
    panel: "Basic",
    contraindications: ["G6PD deficiency", "Concurrent SSRI/SNRI (serotonin risk)", "Pregnancy"],
    // pricing TBD → priced at consult
  },

  /* ── RECOVERY ── */
  {
    slug: "bpc-157", name: "BPC-157", category: "Recovery",
    dose: "500 mcg daily SC", spec: "5 mg/mL · 5 mL vial",
    mechanism: "A synthetic pentadecapeptide studied for systemic healing signaling across soft tissue and gut.",
    timeline: [{ wk: "Wk 1", effect: "Inflammation settles." }, { wk: "Wk 4", effect: "Repair markers move." }, { wk: "Wk 8", effect: "Strength return." }],
    panel: "Basic", panelNote: "Basic panel plus hs-CRP.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 149, m3: 129, m12: 99 },
  },
  {
    slug: "tb-500", name: "TB-500", category: "Recovery",
    dose: "2.5 mg 2×/week SC", spec: "10 mg/mL · 5 mL vial",
    mechanism: "A synthetic fragment of thymosin beta-4 studied for tissue-specific cellular migration and repair.",
    timeline: [{ wk: "Wk 1", effect: "Inflammation settles." }, { wk: "Wk 4", effect: "Tissue repair." }, { wk: "Wk 8", effect: "Function returns." }],
    panel: "Basic", panelNote: "Basic panel plus IL-6 / hs-CRP.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 189, m3: 159, m12: 129 },
  },
  {
    slug: "bpc-tb-combo", name: "BPC-157 + TB-500", category: "Recovery",
    dose: "combined daily / 2×week SC", spec: "dual-peptide protocol",
    mechanism: "The Wolverine pairing as a solo protocol: systemic healing signal plus tissue-specific repair.",
    timeline: [{ wk: "Wk 1", effect: "Inflammation settles." }, { wk: "Wk 4", effect: "Repair markers." }, { wk: "Wk 8", effect: "Strength return." }],
    panel: "Basic", panelNote: "Basic panel plus IL-6 / hs-CRP.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 269, m3: 229, m12: 189 },
  },

  /* ── SKIN & LONGEVITY ── */
  {
    slug: "ghk-cu", name: "GHK-Cu", category: "Skin & Longevity",
    dose: "2 mg daily SC", spec: "50 mg/mL · 3 mL vial",
    mechanism: "A copper-binding tripeptide studied for extracellular-matrix repair and skin remodeling.",
    timeline: [{ wk: "Wk 2", effect: "Texture shifts." }, { wk: "Wk 6", effect: "Firmness improves." }, { wk: "Wk 12", effect: "Reassessment." }],
    panel: "Basic",
    contraindications: ["Active malignancy", "Copper allergy"],
    // pricing TBD
  },
  {
    slug: "epitalon", name: "Epitalon", category: "Skin & Longevity",
    dose: "10 mg daily · 20-day pulse", spec: "100 mg/mL · 2 mL vial",
    mechanism: "A tetrapeptide studied for telomerase activity and circadian regulation, given in pulses.",
    timeline: [{ wk: "Pulse", effect: "20-day course." }, { wk: "Wk 8", effect: "Marker reassessment." }, { wk: "Q3mo", effect: "Repeat pulse." }],
    panel: "Basic",
    contraindications: ["Active malignancy", "Pregnancy"],
    // pricing TBD
  },
  {
    slug: "nad-plus", name: "NAD+", category: "Skin & Longevity",
    dose: "100 mg 3×/week SC", spec: "200 mg/mL · 5 mL vial",
    mechanism: "A cellular-energy cofactor studied for mitochondrial function and metabolic support.",
    timeline: [{ wk: "Wk 2", effect: "Energy / HRV." }, { wk: "Wk 8", effect: "Metabolic markers." }, { wk: "Wk 12", effect: "Reassessment." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    pricing: { m1: 199, m3: 169, m12: 139 },
  },
  {
    slug: "mots-c", name: "MOTS-c", category: "Skin & Longevity",
    dose: "5 mg 2×/week SC", spec: "10 mg/mL · 2 mL vial",
    mechanism: "A mitochondrial-derived peptide studied for exercise-mimetic metabolic signaling.",
    timeline: [{ wk: "Wk 2", effect: "Energy response." }, { wk: "Wk 8", effect: "Metabolic markers." }, { wk: "Wk 12", effect: "Reassessment." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    // pricing TBD
  },

  /* ── METABOLIC / GLP-1 (GATED) ── */
  {
    slug: "semaglutide", name: "Semaglutide", category: "Metabolic",
    dose: "0.25 → 2.4 mg weekly SC (titrated)", spec: "physician-directed · with glycine + B12",
    mechanism: "A GLP-1 receptor agonist, titrated slowly under physician supervision with metabolic bloodwork gating each increase.",
    timeline: [{ wk: "Wk 1", effect: "Appetite signaling changes." }, { wk: "Wk 4", effect: "Physician reviews response." }, { wk: "Wk 12", effect: "Reassessed against bloodwork." }],
    panel: "Full", panelNote: "Full panel plus insulin / HOMA-IR.",
    contraindications: ["Personal/family history of medullary thyroid carcinoma", "MEN 2", "Pregnancy", "Pancreatitis history"],
    gated: true, stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
  },
  {
    slug: "tirzepatide", name: "Tirzepatide", category: "Metabolic",
    dose: "2.5 → 15 mg weekly SC (titrated)", spec: "physician-directed · with glycine + B12",
    mechanism: "A dual GLP-1 / GIP agonist, titrated under physician supervision with metabolic bloodwork gating each dose step.",
    timeline: [{ wk: "Wk 1", effect: "Appetite signaling changes." }, { wk: "Wk 4", effect: "Physician reviews response." }, { wk: "Wk 12", effect: "Reassessed against bloodwork." }],
    panel: "Full", panelNote: "Full panel plus insulin / HOMA-IR.",
    contraindications: ["Personal/family history of medullary thyroid carcinoma", "MEN 2", "Pregnancy", "Pancreatitis history"],
    gated: true, stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
  },

  /* ── SLEEP + SEXUAL HEALTH ── */
  {
    slug: "dsip", name: "DSIP", category: "Sleep",
    dose: "100 mcg nightly SC", spec: "2 mg/mL · 3 mL vial",
    mechanism: "Delta sleep-inducing peptide, studied for deep-sleep onset and architecture.",
    timeline: [{ wk: "Night 1", effect: "Onset improves." }, { wk: "Wk 2", effect: "Deep-sleep % rises." }, { wk: "Wk 8", effect: "HRV baseline shifts." }],
    panel: "Basic",
    contraindications: ["Pregnancy", "Concurrent SSRI/SNRI (physician review)"],
    // pricing TBD
  },
  {
    slug: "pt-141", name: "PT-141", category: "Sexual Health",
    dose: "1.75 mg as-needed SC", spec: "10 mg/mL · 3 mL vial",
    mechanism: "A melanocortin agonist studied for sexual arousal, acting centrally rather than vascularly.",
    timeline: [{ wk: "As needed", effect: "Onset 1–3 hrs." }, { wk: "Ongoing", effect: "Response reviewed." }, { wk: "—", effect: "Physician adjusts." }],
    panel: "Basic",
    contraindications: ["Uncontrolled hypertension", "Cardiovascular disease (physician review)", "Pregnancy"],
    // pricing TBD
  },
];

export function getSolo(slug: string): SoloPeptide | undefined {
  return SOLO_CATALOG.find((s) => s.slug === slug);
}

export const SOLO_CATEGORIES: SoloCategory[] = [
  "Growth", "Cognitive", "Recovery", "Skin & Longevity", "Metabolic", "Sleep", "Sexual Health",
];
