/* ══════════════════════════════════════════════════════════════
   NEXPHORIA — SOLO PEPTIDE CATALOG (P5 wave 2)
   Source: MDI × Nexphoria handoff. 19 solos, real dosing + specs.
   Voice = ours (institutional). Data = doc's.
   Pricing tiers are [1-month, 3-month/mo, 12-month/mo] per doc.
   "priceAtConsult" solos are held off the shelf (doc TBD).
   GLP-1 solos are DIRECTLY SELLABLE as of 2026-08-12 (Chiya) — priced and
   ungated. State exclusions remain: gating and legal availability are
   separate things, and BuyBox renders the exclusions on every path.
   ══════════════════════════════════════════════════════════════ */

export type SoloCategory =
  | "Growth" | "Cognitive" | "Recovery" | "Skin & Longevity"
  | "Metabolic" | "Sleep" | "Sexual Health" | "Hormone";

/* Availability (the playbook, 2026-09-04). "coming": an FDA Category 2
   peptide pending final rulemaking, shown and reservable at the founding
   price, never sold. "watch": status unresolved (DSIP), shown with caution. */
export type SoloStatus = "live" | "coming" | "watch";

export interface SoloPricing {
  /** monthly-equivalent at 1-mo / 3-mo / 12-mo cadence */
  m1: number; m3: number; m6: number; m12: number;
}

/* Route of administration is a first-class compliance field, not a detail.
   The IvyRx teardown (docs/IVYRX-STUDY.md §5) established the operative rule:
   sterile injectables carry 503A/503B exposure and are defensible only for
   actives with real regulatory standing; anything without an approved active
   belongs in a non-sterile route. Route therefore determines both what may be
   offered and which disclosure the surface must render. */
export type SoloRoute = "subcutaneous" | "oral" | "nasal" | "topical";

/* Regulatory standing of the ACTIVE, which is not the same as approval of the
   preparation. A compounded preparation is never itself FDA-approved — that is
   true even when its active is. We state that plainly everywhere rather than
   letting the distinction blur (LegitScript reads our exact wording). */
export type SoloRegulatory =
  /** Active is an FDA-approved drug; dispensed as a compounded preparation. */
  | "compounded-approved-active"
  /** No FDA-approved active for any indication. Experimental / off-label. */
  | "compounded-no-approved-active";

export interface SoloPeptide {
  slug: string;
  name: string;
  category: SoloCategory;
  dose: string;
  spec: string;
  mechanism: string;
  /** outcome-first tagline (goals before chemistry) — derived from mechanism, no new claims */
  outcome: string;
  timeline: { wk: string; effect: string }[];
  panel: "Basic" | "Full" | "Elite";
  panelNote?: string;
  contraindications: string[];
  pricing?: SoloPricing;      // omit => priced at consult
  gated?: boolean;            // GLP-1
  stateExclusions?: string[];
  /** Falls back to subcutaneous, which is the strictest reading (sterile).
      Not a claim that every entry is SC — Selank, for one, is intranasal.
      Annotate explicitly before offering anything; do not lean on the default. */
  route?: SoloRoute;
  /** Defaults to the conservative reading: no approved active. */
  regulatory?: SoloRegulatory;
  /** Defaults to "live". */
  status?: SoloStatus;
  /** the playbook's honest expectation lines */
  feelBy?: string;
  fullEffect?: string;
  /** 1 emerging · 2 moderate · 3 strong */
  evidence?: 1 | 2 | 3;
  /** stacks well with (product names) */
  combine?: string[];
  /** does the same job; pick one (product names) */
  avoid?: string[];
}

export function statusOf(s: SoloPeptide): SoloStatus {
  return s.status ?? "live";
}
export function isSellable(s: SoloPeptide): boolean {
  return statusOf(s) === "live" && Boolean(s.pricing);
}

export const STATUS_LABEL: Record<SoloStatus, string> = {
  live: "Available now",
  coming: "Not yet available",
  watch: "Under review",
};
export const EVIDENCE_LABEL: Record<1 | 2 | 3, string> = { 1: "Emerging", 2: "Moderate", 3: "Strong" };
export const EVIDENCE_NOTE: Record<1 | 2 | 3, string> = {
  1: "Animal studies and early human reports. Offered with that said plainly.",
  2: "Small human trials and consistent clinical use.",
  3: "Large human trials, or an FDA-approved active.",
};

export function routeOf(s: SoloPeptide): SoloRoute {
  return s.route ?? "subcutaneous";
}
export function regulatoryOf(s: SoloPeptide): SoloRegulatory {
  return s.regulatory ?? "compounded-no-approved-active";
}

/* ── LAUNCH SCOPE (Chiya, 2026-08-12) ──────────────────────────
   The LegitScript application ships with these four and only these four.
   Each is a compounded preparation of an active with real regulatory
   standing — semaglutide (Ozempic/Wegovy), tirzepatide (Mounjaro/Zepbound),
   tesamorelin (Egrifta), bremelanotide/PT-141 (Vyleesi). That shared property
   is precisely why they are the launch set.

   Everything else is RETIRED, not deleted. The data below stays intact so
   that restoring a molecule is a one-line change to this set rather than a
   rebuild — and per the teardown, several retired entries have a legitimate
   route back as ORAL preparations, which carry no sterile-compounding
   exposure. Do not delete retired entries to "clean up"; the retention is
   deliberate and load-bearing. */
/* 2026-09-03 (Chiya): the FULL menu is on. Every molecule from the MDI
   handoff is shown and priced. The four with an FDA-approved active keep
   their regulatory flag; the rest render the no-approved-active disclosure.
   The four-SKU LegitScript launch set is preserved below for a fast revert. */
export const LEGITSCRIPT_FOUR = new Set([
  "semaglutide", "tirzepatide", "tesamorelin", "pt-141",
]);
export const LAUNCH_SLUGS = new Set([
  "sermorelin", "ipa-cjc", "tesamorelin", "ghk-cu", "thymosin-a1", "nad-plus", "mots-c", "epitalon",
  "semax", "selank", "dsip", "tirzepatide", "semaglutide", "aod-9604", "pt-141", "oxytocin", "tadalafil",
  "testosterone", "kisspeptin", "bpc-157", "tb-500", "bpc-tb-combo",
]);

const ALL_SOLO: SoloPeptide[] = [
  /* ── GROWTH / GH-AXIS ── */
  {
    slug: "sermorelin", name: "Sermorelin", category: "Growth",
    outcome: "For body composition. Raises your own growth hormone release. One injection at night.",
    dose: "300 mcg nightly, under the skin", spec: "3 mg/mL · 5 mL vial",
    mechanism: "Prompts your body to release its own growth hormone in its natural overnight pulse, rather than replacing it. Used for recovery, sleep quality and lean mass. One small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "The first dose, at bedtime." }, { wk: "Wk 4", effect: "Taken nightly." }, { wk: "Wk 12", effect: "The panel is repeated. IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is read first.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 129, m3: 116, m6: 110, m12: 103 },
    status: "live", feelBy: "2 to 4 weeks, sleep first", fullEffect: "8 to 12 weeks", evidence: 2,
    combine: ["BPC-157"], avoid: ["Ipamorelin / CJC-1295 Blend", "Tesamorelin"],
  },
  {
    slug: "ipamorelin", name: "Ipamorelin", category: "Growth",
    outcome: "For body composition. A selective growth hormone releasing peptide. One injection at night.",
    dose: "200 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "Tells your pituitary to release growth hormone more often, without raising cortisol or prolactin. Used for recovery and lean mass. One small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "The first dose, at bedtime." }, { wk: "Wk 4", effect: "Taken nightly." }, { wk: "Wk 12", effect: "The panel is repeated. IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is read first.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 189, m3: 159, m6: 161, m12: 129 },
  },
  {
    slug: "cjc-1295", name: "CJC-1295 (no-DAC)", category: "Growth",
    outcome: "For body composition. A longer-acting growth hormone releasing peptide. One injection at night.",
    dose: "100 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "Raises the size of each growth hormone pulse your body already makes. Often paired with ipamorelin. Used for recovery and lean mass. One small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "The first dose, at bedtime." }, { wk: "Wk 4", effect: "Taken nightly." }, { wk: "Wk 12", effect: "The panel is repeated. IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is read first.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 239, m3: 209, m6: 203, m12: 179 },
  },
  {
    slug: "ipa-cjc", name: "Ipamorelin / CJC-1295 Blend", category: "Growth",
    outcome: "For body composition. Two growth hormone releasing peptides in one vial. One injection at night.",
    dose: "300 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "Ipamorelin raises how often your body releases growth hormone; CJC-1295 raises how much. Together in one nightly injection, for recovery and lean mass.",
    timeline: [{ wk: "Wk 1", effect: "The first dose, at bedtime." }, { wk: "Wk 4", effect: "Taken nightly." }, { wk: "Wk 12", effect: "The panel is repeated. IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is read first.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 199, m3: 179, m6: 169, m12: 159 },
    status: "live", feelBy: "Sleep in a week, body in 8 to 12 weeks", fullEffect: "12 weeks", evidence: 2,
    combine: ["BPC-157", "TB-500", "Tirzepatide"], avoid: ["Sermorelin", "Tesamorelin"],
  },
  {
    slug: "tesamorelin", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Tesamorelin", category: "Growth",
    outcome: "For abdominal fat and lean mass. Raises your own growth hormone release. One injection a day.",
    dose: "2 mg daily SC", spec: "5 mg/mL · 3 mL vial",
    mechanism: "Helps your body release more of its own growth hormone, on its own natural rhythm. Used for stubborn abdominal fat and lean mass. One small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "The first dose, in the evening." }, { wk: "Wk 8", effect: "The same dose daily." }, { wk: "Wk 12", effect: "The panel is repeated. IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is the number your dose is set against.",
    contraindications: ["Active malignancy", "Pregnancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 299, m3: 269, m6: 254, m12: 239 },
    status: "live", feelBy: "4 to 8 weeks", fullEffect: "12 weeks and beyond", evidence: 3,
    combine: ["BPC-157"], avoid: ["Ipamorelin / CJC-1295 Blend", "Sermorelin"],
  },

  /* ── COGNITIVE ── */
  {
    slug: "selank", name: "Selank", category: "Cognitive",
    outcome: "For a steadier mood under stress. A nasal spray, twice a day.",
    dose: "300 mcg twice a day, nasal spray", spec: "5 mg/mL · 3 mL nasal spray",
    mechanism: "A calming peptide that works on the brain's stress response, studied for a steadier mood and clearer focus under pressure. A nasal spray, twice a day.",
    timeline: [{ wk: "Day 1", effect: "The first spray." }, { wk: "Wk 2", effect: "Taken twice a day." }, { wk: "Wk 12", effect: "The panel is repeated. Thyroid and cortisol are read for context." }],
    panel: "Full", panelNote: "The blood test at week 12, included. TSH is read for context.",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    pricing: { m1: 189, m3: 170, m6: 161, m12: 151 },
    status: "coming", feelBy: "Same day to 1 week", fullEffect: "2 to 4 weeks", evidence: 2,
    combine: ["Semax"], avoid: [],
  },
  {
    slug: "semax", name: "Semax", category: "Cognitive",
    outcome: "For focus and mental stamina. A nasal spray, once a day.",
    dose: "600 mcg once a day, nasal spray", spec: "10 mg/mL · 3 mL nasal spray",
    mechanism: "Supports BDNF, a protein your brain uses to build and maintain connections, studied for focus, memory and mental stamina. A nasal spray, once a day.",
    timeline: [{ wk: "Day 1", effect: "The first spray, in the morning." }, { wk: "Wk 2", effect: "Taken daily." }, { wk: "Wk 12", effect: "The panel is repeated. Thyroid and cortisol are read for context." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    pricing: { m1: 189, m3: 170, m6: 161, m12: 151 },
    status: "coming", feelBy: "Same day to 1 week", fullEffect: "2 to 4 weeks", evidence: 2,
    combine: ["Selank"], avoid: [],
  },
  {
    slug: "cerebrolysin", name: "Cerebrolysin", category: "Cognitive",
    outcome: "For nerve cell support after stress or injury. A ten-day course of injections.",
    dose: "5 mL daily for 10 days, by injection", spec: "215.2 mg/mL · 5 mL ampoule",
    mechanism: "A mix of brain-derived peptides studied for supporting nerve cells after stress or injury, given as a defined ten-day course by injection.",
    timeline: [{ wk: "Day 1", effect: "The course begins." }, { wk: "Day 10", effect: "The course ends." }, { wk: "Wk 12", effect: "The panel is repeated. Kidney and liver markers are read." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Severe renal impairment", "Epilepsy (physician review)"],
    pricing: { m1: 299, m3: 259, m6: 254, m12: 229 },
  },
  {
    slug: "methylene-blue", name: "Methylene Blue", category: "Cognitive",
    outcome: "For mental clarity and stamina. One capsule a day.",
    dose: "5 to 10 mg daily, capsule", spec: "5 mg capsules · 60 count",
    mechanism: "A low-dose compound that helps the mitochondria in your cells make energy, studied for mental clarity and stamina. One capsule a day.",
    timeline: [{ wk: "Day 1", effect: "Your first capsule." }, { wk: "Wk 4", effect: "Taken daily." }, { wk: "Wk 12", effect: "The panel is repeated. Blood count and liver markers are read." }],
    panel: "Full",
    contraindications: ["G6PD deficiency", "Concurrent SSRI/SNRI (serotonin risk)", "Pregnancy"],
    // pricing TBD → priced at consult
  },

  /* ── RECOVERY ── */
  {
    slug: "bpc-157", name: "BPC-157", category: "Recovery",
    outcome: "For tendon, muscle, joint and gut-lining repair. One injection a day.",
    dose: "500 mcg daily, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "A peptide studied for helping tendons, muscle, joints and the gut lining repair. One small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "The first dose." }, { wk: "Wk 4", effect: "Taken daily through your recovery." }, { wk: "Wk 12", effect: "The panel is repeated. Inflammation markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Inflammation markers are read first.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 179, m3: 161, m6: 152, m12: 143 },
    status: "coming", feelBy: "Gut symptoms within days; tissue in 1 to 2 weeks", fullEffect: "4 to 8 weeks", evidence: 2,
    combine: ["TB-500", "Ipamorelin / CJC-1295 Blend"], avoid: [],
  },
  {
    slug: "tb-500", name: "TB-500", category: "Recovery",
    outcome: "For recovery from injury and training. Two injections a week.",
    dose: "2.5 mg twice a week, under the skin", spec: "10 mg/mL · 5 mL vial",
    mechanism: "A fragment of a protein your body uses to move repair cells to injured tissue, studied for muscle, tendon and joint recovery. Two small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "The first dose." }, { wk: "Wk 4", effect: "Twice a week through your recovery." }, { wk: "Wk 12", effect: "The panel is repeated. Inflammation markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IL-6 and hs-CRP are read first.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 259, m3: 233, m6: 220, m12: 207 },
    status: "coming", feelBy: "2 to 3 weeks", fullEffect: "6 to 8 weeks", evidence: 1,
    combine: ["BPC-157"], avoid: [],
  },
  {
    slug: "bpc-tb-combo", name: "BPC-157 + TB-500", category: "Recovery",
    outcome: "BPC-157 and TB-500 together, for injury and recovery. One plan.",
    dose: "BPC-157 daily, TB-500 twice a week", spec: "dual-peptide protocol",
    mechanism: "BPC-157 for the healing signal, TB-500 for moving repair cells where they are needed. Prescribed together as one plan.",
    timeline: [{ wk: "Wk 1", effect: "The first doses." }, { wk: "Wk 4", effect: "Both peptides through your recovery." }, { wk: "Wk 12", effect: "The panel is repeated. Inflammation markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IL-6 and hs-CRP are read first.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 399, m3: 359, m6: 339, m12: 319 },
    status: "coming", feelBy: "Gut symptoms within days; tissue in 1 to 3 weeks", fullEffect: "6 to 8 weeks", evidence: 2,
    combine: ["Ipamorelin / CJC-1295 Blend"], avoid: [],
  },

  /* ── SKIN & LONGEVITY ── */
  {
    slug: "ghk-cu", name: "GHK-Cu", category: "Skin & Longevity",
    outcome: "For skin firmness and collagen. One injection a day.",
    dose: "2 mg daily, under the skin", spec: "50 mg/mL · 3 mL vial",
    mechanism: "A copper peptide your skin makes less of with age, studied for collagen, elasticity and wound healing. One small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "The first dose." }, { wk: "Wk 6", effect: "Taken daily. Skin renews on its own cycle." }, { wk: "Wk 12", effect: "The panel is repeated. Inflammation markers and blood count are read." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Copper allergy"],
    pricing: { m1: 129, m3: 116, m6: 110, m12: 103 },
    status: "coming", feelBy: "Skin in 3 to 4 weeks", fullEffect: "8 to 12 weeks", evidence: 2,
    combine: ["NAD+", "MOTS-c", "Epitalon"], avoid: [],
  },
  {
    slug: "epitalon", name: "Epitalon", category: "Skin & Longevity",
    outcome: "For healthy ageing. A 20-day course of injections, a few times a year.",
    dose: "10 mg daily for 20 days, under the skin", spec: "100 mg/mL · 2 mL vial",
    mechanism: "A short peptide studied for telomere maintenance and the sleep-wake cycle, given as a 20-day course a few times a year.",
    timeline: [{ wk: "Day 1", effect: "The course begins." }, { wk: "Day 20", effect: "The course ends." }, { wk: "Wk 12", effect: "The panel is repeated. Metabolic and inflammation markers are read." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    pricing: { m1: 199, m3: 179, m6: 169, m12: 159 },
    status: "coming", feelBy: "Sleep in 1 to 2 weeks", fullEffect: "per course", evidence: 1,
    combine: ["NAD+", "MOTS-c", "GHK-Cu"], avoid: [],
  },
  {
    slug: "nad-plus", name: "NAD+", category: "Skin & Longevity",
    outcome: "For cellular energy. Three injections a week.",
    dose: "100 mg three times a week, under the skin", spec: "200 mg/mL · 5 mL vial",
    mechanism: "The coenzyme every cell uses to make energy, and one that falls with age. Studied for energy, recovery and healthy ageing. Three small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "The first doses." }, { wk: "Wk 4", effect: "Three times a week." }, { wk: "Wk 12", effect: "The panel is repeated. Metabolic and inflammation markers are read." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    pricing: { m1: 149, m3: 134, m6: 127, m12: 119 },
    status: "live", feelBy: "Energy in days to 2 weeks", fullEffect: "ongoing", evidence: 2,
    combine: ["MOTS-c", "Epitalon", "GHK-Cu"], avoid: [],
  },
  {
    slug: "mots-c", name: "MOTS-c", category: "Skin & Longevity",
    outcome: "For metabolism and exercise capacity. Two injections a week.",
    dose: "5 mg twice a week, under the skin", spec: "10 mg/mL · 2 mL vial",
    mechanism: "A peptide made by your mitochondria that signals the same pathways exercise does, studied for metabolism and endurance. Two small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "The first dose." }, { wk: "Wk 4", effect: "Twice a week, alongside training." }, { wk: "Wk 12", effect: "The panel is repeated. Metabolic markers are read." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    pricing: { m1: 169, m3: 152, m6: 144, m12: 135 },
    status: "coming", feelBy: "2 to 4 weeks", fullEffect: "8 to 12 weeks", evidence: 2,
    combine: ["NAD+", "Epitalon", "Tirzepatide"], avoid: [],
  },

  /* ── METABOLIC / GLP-1 (GATED) ── */
  {
    slug: "semaglutide", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Semaglutide", category: "Metabolic",
    outcome: "For weight loss. A GLP-1 medicine, one injection a week.",
    dose: "0.25 to 2.4 mg weekly, stepped up", spec: "Weekly injection · with glycine + B12",
    mechanism: "A longer-lasting version of GLP-1, the hormone that tells your brain you are full. You feel full sooner and stay full longer. One small injection a week, increased step by step by the physician.",
    timeline: [{ wk: "Wk 1", effect: "The first dose, at the lowest step." }, { wk: "Wk 4", effect: "The dose steps up." }, { wk: "Wk 12", effect: "The panel and a dose review." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Fasting insulin and lipase are read first.",
    contraindications: ["Personal/family history of medullary thyroid carcinoma", "MEN 2", "Pregnancy", "Pancreatitis history"],
    stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
    pricing: { m1: 229, m3: 206, m6: 195, m12: 183 },
    status: "live", feelBy: "Appetite in week 1, weight in 4 to 12 weeks", fullEffect: "6 to 12 months", evidence: 3,
    combine: ["Ipamorelin / CJC-1295 Blend"], avoid: ["Tirzepatide"],
  },
  {
    slug: "tirzepatide", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Tirzepatide", category: "Metabolic",
    outcome: "For weight loss. A GLP-1 and GIP medicine, one injection a week.",
    dose: "2.5 to 15 mg weekly, stepped up", spec: "Weekly injection · with glycine + B12",
    mechanism: "Works on two appetite hormones at once, GLP-1 and GIP. You feel full sooner, think about food less, and your blood sugar stays steadier. One small injection a week, increased step by step by the physician.",
    timeline: [{ wk: "Wk 1", effect: "The first dose, at the lowest step." }, { wk: "Wk 4", effect: "The dose steps up." }, { wk: "Wk 12", effect: "The panel and a dose review." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Fasting insulin and lipase are read first.",
    contraindications: ["Personal/family history of medullary thyroid carcinoma", "MEN 2", "Pregnancy", "Pancreatitis history"],
    stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
    pricing: { m1: 399, m3: 359, m6: 339, m12: 319 },
    status: "live", feelBy: "Appetite in week 1, weight in 4 to 12 weeks", fullEffect: "6 to 12 months", evidence: 3,
    combine: ["Ipamorelin / CJC-1295 Blend", "MOTS-c"], avoid: ["Semaglutide"],
  },

  /* ── SLEEP + SEXUAL HEALTH ── */
  {
    slug: "dsip", name: "DSIP", category: "Sleep",
    outcome: "For deep sleep. One injection at bedtime.",
    dose: "100 mcg nightly, under the skin", spec: "2 mg/mL · 3 mL vial",
    mechanism: "Delta sleep-inducing peptide, studied for falling asleep faster and getting more deep sleep. One small injection at bedtime.",
    timeline: [{ wk: "Night 1", effect: "The first dose, at bedtime." }, { wk: "Wk 2", effect: "Taken nightly." }, { wk: "Wk 12", effect: "The panel is repeated. Cortisol and thyroid are read." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Concurrent SSRI/SNRI (physician review)"],
    pricing: { m1: 129, m3: 116, m6: 110, m12: 103 },
    status: "watch", feelBy: "The first nights", fullEffect: "ongoing", evidence: 1,
    combine: ["Epitalon"], avoid: [],
  },
  {
    slug: "pt-141", route: "subcutaneous", regulatory: "compounded-approved-active", name: "PT-141", category: "Sexual Health",
    outcome: "For sexual desire, in men and women. One injection, taken as needed.",
    dose: "1.75 mg as-needed SC", spec: "10 mg/mL · 3 mL vial",
    mechanism: "Works on the part of the brain involved in sexual desire, for men and women. You take it about an hour ahead, on the days you want it.",
    timeline: [{ wk: "Dose 1", effect: "Taken about an hour ahead. Works within 1 to 3 hours." }, { wk: "Ongoing", effect: "On the days chosen, within the monthly limit." }, { wk: "Wk 12", effect: "The panel and a dose review." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Hormones are read for context.",
    contraindications: ["Uncontrolled hypertension", "Cardiovascular disease (physician review)", "Pregnancy"],
    pricing: { m1: 99, m3: 89, m6: 84, m12: 79 },
    status: "live", feelBy: "Same day, about 45 minutes", fullEffect: "as needed", evidence: 3,
    combine: ["Oxytocin Nasal", "Tadalafil Nasal"], avoid: [],
  },

  /* ── ADDED FROM THE PLAYBOOK (2026-09-04) ── */
  {
    slug: "thymosin-a1", route: "subcutaneous", name: "Thymosin Alpha-1", category: "Skin & Longevity",
    outcome: "For immune support. Injections a few times a week.",
    dose: "1.6 mg twice a week, under the skin", spec: "10 mg/mL · 3 mL vial",
    mechanism: "A peptide your thymus makes that helps regulate and strengthen the immune system. Used for immune resilience and recovery, and for staying well under stress.",
    timeline: [{ wk: "Wk 1", effect: "The first doses." }, { wk: "Wk 4", effect: "Taken through the season." }, { wk: "Wk 12", effect: "The panel is repeated. Blood count and inflammation markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Blood count and inflammation markers are read first.",
    contraindications: ["Active malignancy (physician review)", "Organ transplant or immunosuppressant medication", "Pregnancy"],
    pricing: { m1: 159, m3: 143, m6: 135, m12: 127 },
    status: "live", feelBy: "2 to 4 weeks", fullEffect: "ongoing", evidence: 2, combine: ["BPC-157"], avoid: [],
  },
  {
    slug: "aod-9604", route: "subcutaneous", name: "AOD-9604", category: "Metabolic",
    outcome: "For fat metabolism, alongside a weight plan. One injection a day.",
    dose: "300 mcg daily, under the skin", spec: "5 mg/mL · 3 mL vial",
    mechanism: "A fragment of growth hormone studied for fat metabolism. The human evidence is limited, so it is offered as an add-on to a broader plan rather than on its own.",
    timeline: [{ wk: "Wk 1", effect: "The first dose." }, { wk: "Wk 6", effect: "Taken daily alongside your main plan." }, { wk: "Wk 12", effect: "The panel is repeated. Metabolic markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Metabolic markers are read first.",
    contraindications: ["Pregnancy", "Active malignancy"],
    pricing: { m1: 199, m3: 179, m6: 169, m12: 159 },
    status: "live", feelBy: "Weeks", fullEffect: "12 weeks", evidence: 1, combine: ["Ipamorelin / CJC-1295 Blend"], avoid: [],
  },
  {
    slug: "oxytocin", route: "nasal", regulatory: "compounded-approved-active", name: "Oxytocin Nasal", category: "Sexual Health",
    outcome: "For closeness and arousal. A nasal spray, taken as needed.",
    dose: "As needed, nasal spray", spec: "Nasal spray",
    mechanism: "The bonding hormone as a nasal spray, used for closeness, arousal and mood in intimate settings. Often taken alongside PT-141.",
    timeline: [{ wk: "Dose 1", effect: "Taken shortly before." }, { wk: "Ongoing", effect: "On the days chosen." }, { wk: "Wk 12", effect: "The panel is repeated. Hormones are read for context." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Hormones are read for context.",
    contraindications: ["Pregnancy", "Uncontrolled hypertension (physician review)"],
    pricing: { m1: 99, m3: 89, m6: 84, m12: 79 },
    status: "live", feelBy: "Same day", fullEffect: "as needed", evidence: 1, combine: ["PT-141"], avoid: [],
  },
  {
    slug: "tadalafil", route: "nasal", regulatory: "compounded-approved-active", name: "Tadalafil Nasal", category: "Sexual Health",
    outcome: "For erectile function. A nasal spray, 20 to 30 minutes before.",
    dose: "As needed, nasal spray", spec: "Nasal spray",
    mechanism: "A fast-onset nasal form of a well-known blood-flow medication for erections. Works on performance; PT-141 works on desire, and the two are often paired.",
    timeline: [{ wk: "Dose 1", effect: "About 20 to 30 minutes ahead." }, { wk: "Ongoing", effect: "On the days chosen." }, { wk: "Wk 12", effect: "The panel is repeated. Heart markers are read for context." }],
    panel: "Full", panelNote: "The blood test at week 12, included.",
    contraindications: ["Nitrate medications", "Recent heart attack or stroke", "Severe liver or kidney disease"],
    pricing: { m1: 89, m3: 80, m6: 76, m12: 71 },
    status: "live", feelBy: "20 to 30 minutes", fullEffect: "as needed", evidence: 3, combine: ["PT-141"], avoid: [],
  },
  {
    slug: "testosterone", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Testosterone Cypionate", category: "Hormone",
    outcome: "For low testosterone in men. One injection a week, dosed from blood work.",
    dose: "Weekly, under the skin or into muscle", spec: "200 mg/mL · 10 mL vial",
    mechanism: "Classic testosterone replacement for men with low testosterone, monitored with regular blood work. Used for energy, drive, muscle and mood, and the base many men build the rest of a plan on.",
    timeline: [{ wk: "Wk 1", effect: "The first dose." }, { wk: "Wk 6", effect: "Levels settle." }, { wk: "Wk 12", effect: "The panel is repeated. Testosterone, estradiol and blood count are read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Testosterone, estradiol and blood count are read first.",
    contraindications: ["Prostate or breast cancer", "Untreated sleep apnea", "Planning to conceive (physician review)", "High red blood cell count"],
    pricing: { m1: 149, m3: 134, m6: 127, m12: 119 },
    status: "live", feelBy: "2 to 6 weeks", fullEffect: "3 to 6 months", evidence: 3, combine: ["Ipamorelin / CJC-1295 Blend", "Kisspeptin"], avoid: [],
  },
  {
    slug: "kisspeptin", route: "subcutaneous", name: "Kisspeptin", category: "Hormone",
    outcome: "Supports your own testosterone production. Prescribed with testosterone.",
    dose: "Under the skin, on the physician's schedule", spec: "Vial",
    mechanism: "A signalling peptide upstream of your natural sex-hormone production. A gentler lever than direct hormones, used to support the body's own axis and in fertility-minded plans.",
    timeline: [{ wk: "Wk 1", effect: "The first dose." }, { wk: "Wk 6", effect: "Taken on schedule." }, { wk: "Wk 12", effect: "The panel is repeated. Testosterone, estradiol and SHBG are read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Hormones are read first.",
    contraindications: ["Pregnancy", "Hormone-sensitive cancer"],
    pricing: { m1: 169, m3: 152, m6: 144, m12: 135 },
    status: "live", feelBy: "Weeks", fullEffect: "ongoing", evidence: 2, combine: ["Testosterone Cypionate"], avoid: [],
  },
];

/** What the site sells and shows. Every consumer reads this, so the launch
    scope propagates to catalog, PDPs, sitemap, structured data and pricing
    from one place. */
export const SOLO_CATALOG: SoloPeptide[] = ALL_SOLO.filter((s) => LAUNCH_SLUGS.has(s.slug));

/** Held off the shelf pending an oral formulation or a scope decision.
    Retained deliberately — see LAUNCH_SLUGS. */
export const RETIRED_SOLO: SoloPeptide[] = ALL_SOLO.filter((s) => !LAUNCH_SLUGS.has(s.slug));

export function getSolo(slug: string): SoloPeptide | undefined {
  return SOLO_CATALOG.find((s) => s.slug === slug);
}

/** A live SKU by its display name, for stack component lines and the
    "stacks well with" lists, which are written as names. */
export function soloByName(name: string): SoloPeptide | undefined {
  const k = name.trim().toLowerCase();
  return SOLO_CATALOG.find((s) => s.name.toLowerCase() === k);
}

export const SOLO_CATEGORIES: SoloCategory[] = [
  "Growth", "Cognitive", "Recovery", "Skin & Longevity", "Metabolic", "Sleep", "Sexual Health", "Hormone",
];
