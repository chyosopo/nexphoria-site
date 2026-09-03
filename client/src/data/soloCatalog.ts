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
  | "Metabolic" | "Sleep" | "Sexual Health";

export interface SoloPricing {
  /** monthly-equivalent at 1-mo / 3-mo / 12-mo cadence */
  m1: number; m3: number; m12: number;
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
}

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
  "sermorelin", "ipamorelin", "cjc-1295", "ipa-cjc", "tesamorelin", "selank", "semax", "cerebrolysin", "methylene-blue", "bpc-157", "tb-500", "bpc-tb-combo", "ghk-cu", "epitalon", "nad-plus", "mots-c", "semaglutide", "tirzepatide", "dsip", "pt-141",
]);

const ALL_SOLO: SoloPeptide[] = [
  /* ── GROWTH / GH-AXIS ── */
  {
    slug: "sermorelin", name: "Sermorelin", category: "Growth",
    outcome: "More of your own growth hormone, gently. Once a night.",
    dose: "300 mcg nightly, under the skin", spec: "3 mg/mL · 5 mL vial",
    mechanism: "Prompts your body to release its own growth hormone in its natural overnight pulse, rather than replacing it. Used for recovery, sleep quality and lean mass. One small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose, at bedtime." }, { wk: "Wk 4", effect: "The nightly rhythm settles in." }, { wk: "Wk 12", effect: "Your blood panel. IGF-1 checked first." }],
    panel: "Full", panelNote: "Full panel — IGF-1 monitored.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 189, m3: 159, m12: 129 },
  },
  {
    slug: "ipamorelin", name: "Ipamorelin", category: "Growth",
    outcome: "A cleaner growth hormone pulse. Once a night.",
    dose: "200 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "Tells your pituitary to release growth hormone more often, without raising cortisol or prolactin. Used for recovery and lean mass. One small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose, at bedtime." }, { wk: "Wk 4", effect: "The nightly rhythm settles in." }, { wk: "Wk 12", effect: "Your blood panel. IGF-1 checked first." }],
    panel: "Full", panelNote: "Full panel — IGF-1 mandatory.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 189, m3: 159, m12: 129 },
  },
  {
    slug: "cjc-1295", name: "CJC-1295 (no-DAC)", category: "Growth",
    outcome: "Bigger growth hormone pulses. Once a night.",
    dose: "100 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "Raises the size of each growth hormone pulse your body already makes. Often paired with ipamorelin. Used for recovery and lean mass. One small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose, at bedtime." }, { wk: "Wk 4", effect: "The nightly rhythm settles in." }, { wk: "Wk 12", effect: "Your blood panel. IGF-1 checked first." }],
    panel: "Full", panelNote: "Full panel — IGF-1 monitored.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 239, m3: 209, m12: 179 },
  },
  {
    slug: "ipa-cjc", name: "Ipamorelin / CJC-1295 Blend", category: "Growth",
    outcome: "Two growth hormone signals in one vial. Once a night.",
    dose: "300 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "Ipamorelin raises how often your body releases growth hormone; CJC-1295 raises how much. Together in one nightly injection, for recovery and lean mass.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose, at bedtime." }, { wk: "Wk 4", effect: "The nightly rhythm settles in." }, { wk: "Wk 12", effect: "Your blood panel. IGF-1 checked first." }],
    panel: "Full", panelNote: "Full panel — IGF-1 mandatory.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 249, m3: 219, m12: 179 },
  },
  {
    slug: "tesamorelin", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Tesamorelin", category: "Growth",
    outcome: "More of your own growth hormone. Once a day.",
    dose: "2 mg daily SC", spec: "5 mg/mL · 3 mL vial",
    mechanism: "Helps your body release more of its own growth hormone, on its own natural rhythm. Used for stubborn abdominal fat and lean mass. One small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose, in the evening." }, { wk: "Wk 8", effect: "The same dose daily. The effect builds." }, { wk: "Wk 12", effect: "Your blood panel. IGF-1 checked first." }],
    panel: "Full", panelNote: "The full panel at week 12, included. IGF-1 is the number your dose is set against.",
    contraindications: ["Active malignancy", "Pregnancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 349, m3: 299, m12: 249 },
  },

  /* ── COGNITIVE ── */
  {
    slug: "selank", name: "Selank", category: "Cognitive",
    outcome: "A steadier mood, without sedation. A nasal spray.",
    dose: "300 mcg twice a day, nasal spray", spec: "5 mg/mL · 3 mL nasal spray",
    mechanism: "A calming peptide that works on the brain's stress response, studied for a steadier mood and clearer focus under pressure. A nasal spray, twice a day.",
    timeline: [{ wk: "Day 1", effect: "Your first spray. Most people feel it within the hour." }, { wk: "Wk 2", effect: "Taken twice a day, the effect evens out." }, { wk: "Wk 12", effect: "Your blood panel, with thyroid and cortisol checked for context." }],
    panel: "Full", panelNote: "Basic panel plus TSH.",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    pricing: { m1: 159, m3: 139, m12: 119 },
  },
  {
    slug: "semax", name: "Semax", category: "Cognitive",
    outcome: "Sharper focus. A nasal spray, once a day.",
    dose: "600 mcg once a day, nasal spray", spec: "10 mg/mL · 3 mL nasal spray",
    mechanism: "Supports BDNF, a protein your brain uses to build and maintain connections, studied for focus, memory and mental stamina. A nasal spray, once a day.",
    timeline: [{ wk: "Day 1", effect: "Your first spray, in the morning." }, { wk: "Wk 2", effect: "Taken daily, the effect evens out." }, { wk: "Wk 12", effect: "Your blood panel, with thyroid and cortisol checked for context." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    pricing: { m1: 179, m3: 149, m12: 129 },
  },
  {
    slug: "cerebrolysin", name: "Cerebrolysin", category: "Cognitive",
    outcome: "A short course for brain support.",
    dose: "5 mL daily for 10 days, by injection", spec: "215.2 mg/mL · 5 mL ampoule",
    mechanism: "A mix of brain-derived peptides studied for supporting nerve cells after stress or injury, given as a defined ten-day course by injection.",
    timeline: [{ wk: "Day 1", effect: "Your course begins." }, { wk: "Day 10", effect: "Your course ends." }, { wk: "Wk 12", effect: "Your blood panel, with kidney and liver markers checked." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Severe renal impairment", "Epilepsy (physician review)"],
    pricing: { m1: 299, m3: 259, m12: 229 },
  },
  {
    slug: "methylene-blue", name: "Methylene Blue", category: "Cognitive",
    outcome: "Cellular energy for the brain. One capsule a day.",
    dose: "5 to 10 mg daily, capsule", spec: "5 mg capsules · 60 count",
    mechanism: "A low-dose compound that helps the mitochondria in your cells make energy, studied for mental clarity and stamina. One capsule a day.",
    timeline: [{ wk: "Day 1", effect: "Your first capsule." }, { wk: "Wk 4", effect: "Taken daily, the effect evens out." }, { wk: "Wk 12", effect: "Your blood panel, with blood count and liver markers checked." }],
    panel: "Full",
    contraindications: ["G6PD deficiency", "Concurrent SSRI/SNRI (serotonin risk)", "Pregnancy"],
    // pricing TBD → priced at consult
  },

  /* ── RECOVERY ── */
  {
    slug: "bpc-157", name: "BPC-157", category: "Recovery",
    outcome: "Support for healing, head to toe. Once a day.",
    dose: "500 mcg daily, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "A peptide studied for helping tendons, muscle, joints and the gut lining repair. One small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose." }, { wk: "Wk 4", effect: "Taken daily through your recovery." }, { wk: "Wk 12", effect: "Your blood panel, with inflammation markers checked." }],
    panel: "Full", panelNote: "Basic panel plus hs-CRP.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 149, m3: 129, m12: 99 },
  },
  {
    slug: "tb-500", name: "TB-500", category: "Recovery",
    outcome: "Repair, where your body needs it. Twice a week.",
    dose: "2.5 mg twice a week, under the skin", spec: "10 mg/mL · 5 mL vial",
    mechanism: "A fragment of a protein your body uses to move repair cells to injured tissue, studied for muscle, tendon and joint recovery. Two small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose." }, { wk: "Wk 4", effect: "Twice a week through your recovery." }, { wk: "Wk 12", effect: "Your blood panel, with inflammation markers checked." }],
    panel: "Full", panelNote: "Basic panel plus IL-6 / hs-CRP.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 189, m3: 159, m12: 129 },
  },
  {
    slug: "bpc-tb-combo", name: "BPC-157 + TB-500", category: "Recovery",
    outcome: "The recovery pair. Together in one plan.",
    dose: "BPC-157 daily, TB-500 twice a week", spec: "dual-peptide protocol",
    mechanism: "BPC-157 for the healing signal, TB-500 for moving repair cells where they are needed. The most common recovery pairing, as one plan.",
    timeline: [{ wk: "Wk 1", effect: "Your first doses." }, { wk: "Wk 4", effect: "Both peptides through your recovery." }, { wk: "Wk 12", effect: "Your blood panel, with inflammation markers checked." }],
    panel: "Full", panelNote: "Basic panel plus IL-6 / hs-CRP.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 269, m3: 229, m12: 189 },
  },

  /* ── SKIN & LONGEVITY ── */
  {
    slug: "ghk-cu", name: "GHK-Cu", category: "Skin & Longevity",
    outcome: "Firmer skin from within. Once a day.",
    dose: "2 mg daily, under the skin", spec: "50 mg/mL · 3 mL vial",
    mechanism: "A copper peptide your skin makes less of with age, studied for collagen, elasticity and wound healing. One small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose." }, { wk: "Wk 6", effect: "Taken daily. Skin renews on its own cycle." }, { wk: "Wk 12", effect: "Your blood panel, with inflammation and blood count checked." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Copper allergy"],
    // pricing TBD
  },
  {
    slug: "epitalon", name: "Epitalon", category: "Skin & Longevity",
    outcome: "A 20-day course for healthy ageing.",
    dose: "10 mg daily for 20 days, under the skin", spec: "100 mg/mL · 2 mL vial",
    mechanism: "A short peptide studied for telomere maintenance and the sleep-wake cycle, given as a 20-day course a few times a year.",
    timeline: [{ wk: "Day 1", effect: "Your course begins." }, { wk: "Day 20", effect: "Your course ends." }, { wk: "Wk 12", effect: "Your blood panel, with metabolic and inflammation markers checked." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    // pricing TBD
  },
  {
    slug: "nad-plus", name: "NAD+", category: "Skin & Longevity",
    outcome: "More cellular energy. Three times a week.",
    dose: "100 mg three times a week, under the skin", spec: "200 mg/mL · 5 mL vial",
    mechanism: "The coenzyme every cell uses to make energy, and one that falls with age. Studied for energy, recovery and healthy ageing. Three small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "Your first doses." }, { wk: "Wk 4", effect: "Three times a week, the level builds." }, { wk: "Wk 12", effect: "Your blood panel, with metabolic and inflammation markers checked." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    pricing: { m1: 199, m3: 169, m12: 139 },
  },
  {
    slug: "mots-c", name: "MOTS-c", category: "Skin & Longevity",
    outcome: "Exercise signalling, in a vial. Twice a week.",
    dose: "5 mg twice a week, under the skin", spec: "10 mg/mL · 2 mL vial",
    mechanism: "A peptide made by your mitochondria that signals the same pathways exercise does, studied for metabolism and endurance. Two small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose." }, { wk: "Wk 4", effect: "Twice a week, alongside training." }, { wk: "Wk 12", effect: "Your blood panel, with metabolic markers checked." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    // pricing TBD
  },

  /* ── METABOLIC / GLP-1 (GATED) ── */
  {
    slug: "semaglutide", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Semaglutide", category: "Metabolic",
    outcome: "Less appetite, steadier blood sugar. Once a week.",
    dose: "0.25 to 2.4 mg weekly, stepped up", spec: "Weekly injection · with glycine + B12",
    mechanism: "A longer-lasting version of GLP-1, the hormone that tells your brain you are full. You feel full sooner and stay full longer. One small injection a week, increased step by step by your physician.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose, at the lowest step." }, { wk: "Wk 4", effect: "Your dose steps up." }, { wk: "Wk 12", effect: "Your blood panel and a dose review." }],
    panel: "Full", panelNote: "The full panel at week 12, included, with fasting insulin and lipase read first.",
    contraindications: ["Personal/family history of medullary thyroid carcinoma", "MEN 2", "Pregnancy", "Pancreatitis history"],
    stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
    pricing: { m1: 299, m3: 254, m12: 209 },
  },
  {
    slug: "tirzepatide", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Tirzepatide", category: "Metabolic",
    outcome: "Two appetite hormones, one weekly dose.",
    dose: "2.5 to 15 mg weekly, stepped up", spec: "Weekly injection · with glycine + B12",
    mechanism: "Works on two appetite hormones at once, GLP-1 and GIP. You feel full sooner, think about food less, and your blood sugar stays steadier. One small injection a week, increased step by step by your physician.",
    timeline: [{ wk: "Wk 1", effect: "Your first dose, at the lowest step." }, { wk: "Wk 4", effect: "Your dose steps up." }, { wk: "Wk 12", effect: "Your blood panel and a dose review." }],
    panel: "Full", panelNote: "The full panel at week 12, included, with fasting insulin and lipase read first.",
    contraindications: ["Personal/family history of medullary thyroid carcinoma", "MEN 2", "Pregnancy", "Pancreatitis history"],
    stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
    pricing: { m1: 399, m3: 339, m12: 279 },
  },

  /* ── SLEEP + SEXUAL HEALTH ── */
  {
    slug: "dsip", name: "DSIP", category: "Sleep",
    outcome: "Deeper sleep. Once a night.",
    dose: "100 mcg nightly, under the skin", spec: "2 mg/mL · 3 mL vial",
    mechanism: "Delta sleep-inducing peptide, studied for falling asleep faster and getting more deep sleep. One small injection at bedtime.",
    timeline: [{ wk: "Night 1", effect: "Your first dose, at bedtime." }, { wk: "Wk 2", effect: "Taken nightly, sleep settles into a rhythm." }, { wk: "Wk 12", effect: "Your blood panel, with cortisol and thyroid checked." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Concurrent SSRI/SNRI (physician review)"],
    // pricing TBD
  },
  {
    slug: "pt-141", route: "subcutaneous", regulatory: "compounded-approved-active", name: "PT-141", category: "Sexual Health",
    outcome: "Works on desire itself. Taken as needed.",
    dose: "1.75 mg as-needed SC", spec: "10 mg/mL · 3 mL vial",
    mechanism: "Works on the part of the brain involved in sexual desire, for men and women. You take it about an hour ahead, on the days you want it.",
    timeline: [{ wk: "Dose 1", effect: "About an hour ahead. Works within 1 to 3 hours." }, { wk: "Ongoing", effect: "On the days you choose, within your monthly limit." }, { wk: "Wk 12", effect: "Your blood panel and a dose review." }],
    panel: "Full", panelNote: "The full panel at week 12, included, with your hormones read for context.",
    contraindications: ["Uncontrolled hypertension", "Cardiovascular disease (physician review)", "Pregnancy"],
    // pricing TBD
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

export const SOLO_CATEGORIES: SoloCategory[] = [
  "Growth", "Cognitive", "Recovery", "Skin & Longevity", "Metabolic", "Sleep", "Sexual Health",
];
