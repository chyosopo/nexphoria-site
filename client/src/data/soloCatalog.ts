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

/* ⚠️ ALL 26 SET LIVE — Chiya, 2026-09-06, explicit instruction ("make all
   peptides available"), given after the exposure was put to her in writing:
   the eight moved here are FDA Category 2 substances pending final
   rulemaking, which a 503A pharmacy cannot lawfully compound today, and
   offering them is the specific thing that draws a LegitScript refusal (the
   application is in progress) and a payment-processor termination. Her call,
   recorded here so the next reader knows it was a decision and not a drift.
   To reverse: set status back to "coming" on selank, semax, bpc-157, tb-500,
   bpc-tb-combo, ghk-cu, epitalon, mots-c, and "watch" on dsip.
   The FDA and compounding DISCLOSURES are untouched by this and stay on
   every page — availability and disclosure are separate things.

   Availability (the playbook, 2026-09-04). "coming": an FDA Category 2
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
    outcome: "Deeper sleep, faster recovery, lean mass. It raises your own growth hormone overnight.",
    dose: "300 mcg nightly, under the skin", spec: "3 mg/mL · 5 mL vial",
    mechanism: "Sermorelin mimics the signal your brain sends at night, so your pituitary releases your own growth hormone in its natural overnight pulse rather than having it replaced. Sleep quality changes first, then recovery and lean mass over the weeks. You take one small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose at bedtime." }, { wk: "Wk 4", effect: "You take it nightly." }, { wk: "Wk 12", effect: "You draw the same panel again, and IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is read first.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 129, m3: 116, m6: 110, m12: 103 },
    status: "live", feelBy: "2 to 4 weeks, sleep first", fullEffect: "8 to 12 weeks", evidence: 2,
    combine: ["BPC-157"], avoid: ["Ipamorelin / CJC-1295 Blend", "Tesamorelin"],
  },
  {
    slug: "ipamorelin", name: "Ipamorelin", category: "Growth",
    outcome: "Recovery and lean mass, from one injection at night. It prompts your own growth hormone more often.",
    dose: "200 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "Ipamorelin tells your pituitary to release growth hormone more often, without raising cortisol or prolactin. It is used for recovery and lean mass. You take one small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose at bedtime." }, { wk: "Wk 4", effect: "You take it nightly." }, { wk: "Wk 12", effect: "You draw the same panel again, and IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is read first.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 189, m3: 159, m6: 161, m12: 129 },
  },
  {
    slug: "cjc-1295", name: "CJC-1295 (no-DAC)", category: "Growth",
    outcome: "Recovery and lean mass. It raises the size of each growth-hormone pulse you already make.",
    dose: "100 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "CJC-1295 raises the size of each growth hormone pulse your body already makes, and is often paired with ipamorelin. It is used for recovery and lean mass. You take one small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose at bedtime." }, { wk: "Wk 4", effect: "You take it nightly." }, { wk: "Wk 12", effect: "You draw the same panel again, and IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is read first.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 239, m3: 209, m6: 203, m12: 179 },
  },
  {
    slug: "ipa-cjc", name: "Ipamorelin / CJC-1295 Blend", category: "Growth",
    outcome: "Two growth-hormone peptides, one nightly injection. For recovery, sleep and lean mass.",
    dose: "300 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "Ipamorelin raises how often your body releases growth hormone, and CJC-1295 raises how much, so together they lift your own overnight pulse. Sleep changes within a week, then recovery and lean mass over 8 to 12 weeks. You take one small injection at bedtime.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose at bedtime." }, { wk: "Wk 4", effect: "You take it nightly." }, { wk: "Wk 12", effect: "You draw the same panel again, and IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is read first.",
    contraindications: ["Active malignancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 199, m3: 179, m6: 169, m12: 159 },
    status: "live", feelBy: "Sleep in a week, body in 8 to 12 weeks", fullEffect: "12 weeks", evidence: 2,
    combine: ["BPC-157", "TB-500", "Tirzepatide"], avoid: ["Sermorelin", "Tesamorelin"],
  },
  {
    slug: "tesamorelin", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Tesamorelin", category: "Growth",
    outcome: "Deep abdominal fat down, lean mass kept. It raises your own growth hormone.",
    dose: "2 mg daily SC", spec: "5 mg/mL · 3 mL vial",
    mechanism: "Tesamorelin is a stabilised form of the signal your brain sends for growth hormone, so your pituitary releases more of your own, on its natural rhythm. Deep abdominal fat is typically the first thing to shift, and IGF-1 in your blood sets the dose. You take one small injection a day, in the evening.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose in the evening." }, { wk: "Wk 8", effect: "You take the same dose daily." }, { wk: "Wk 12", effect: "You draw the same panel again, and IGF-1 is read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IGF-1 is the number your dose is set against.",
    contraindications: ["Active malignancy", "Pregnancy", "Elevated IGF-1 at baseline"],
    pricing: { m1: 299, m3: 269, m6: 254, m12: 239 },
    status: "live", feelBy: "4 to 8 weeks", fullEffect: "12 weeks and beyond", evidence: 3,
    combine: ["BPC-157"], avoid: ["Ipamorelin / CJC-1295 Blend", "Sermorelin"],
  },

  /* ── COGNITIVE ── */
  {
    slug: "selank", name: "Selank", category: "Cognitive",
    outcome: "Steadier mood, clearer focus, under pressure that does not let up. A calming nasal spray.",
    dose: "300 mcg twice a day, nasal spray", spec: "5 mg/mL · 3 mL nasal spray",
    mechanism: "Selank works on your brain's stress circuits, including GABA signalling, and is studied for a steadier mood and clearer focus under pressure. Some people notice it the same day, and for others it takes a week. You take it as a nasal spray, twice a day.",
    timeline: [{ wk: "Day 1", effect: "You take the first spray." }, { wk: "Wk 2", effect: "You take it twice a day." }, { wk: "Wk 12", effect: "You draw the same panel again, and thyroid and cortisol are read for context." }],
    panel: "Full", panelNote: "The blood test at week 12, included. TSH is read for context.",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    pricing: { m1: 189, m3: 170, m6: 161, m12: 151 },
    status: "live", feelBy: "Same day to 1 week", fullEffect: "2 to 4 weeks", evidence: 2,
    combine: ["Semax"], avoid: [],
  },
  {
    slug: "semax", name: "Semax", category: "Cognitive",
    outcome: "Sharper focus, memory and mental stamina through a long day. A morning nasal spray.",
    dose: "600 mcg once a day, nasal spray", spec: "10 mg/mL · 3 mL nasal spray",
    mechanism: "Semax raises BDNF, the protein your brain uses to build and keep connections, and is studied for focus, memory and mental stamina. The build takes a week or two. You take it as a nasal spray, once a day in the morning.",
    timeline: [{ wk: "Day 1", effect: "You take the first spray in the morning." }, { wk: "Wk 2", effect: "You take it daily." }, { wk: "Wk 12", effect: "You draw the same panel again, and thyroid and cortisol are read for context." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    pricing: { m1: 189, m3: 170, m6: 161, m12: 151 },
    status: "live", feelBy: "Same day to 1 week", fullEffect: "2 to 4 weeks", evidence: 2,
    combine: ["Selank"], avoid: [],
  },
  {
    slug: "cerebrolysin", name: "Cerebrolysin", category: "Cognitive",
    outcome: "Supports your nerve cells after stress or injury. A ten-day course of injections.",
    dose: "5 mL daily for 10 days, by injection", spec: "215.2 mg/mL · 5 mL ampoule",
    mechanism: "Cerebrolysin is a mix of brain-derived peptides studied for supporting nerve cells after stress or injury. You take it as a defined ten-day course of injections.",
    timeline: [{ wk: "Day 1", effect: "You begin the course." }, { wk: "Day 10", effect: "The course ends." }, { wk: "Wk 12", effect: "You draw the same panel again, and kidney and liver markers are read." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Severe renal impairment", "Epilepsy (physician review)"],
    pricing: { m1: 299, m3: 259, m6: 254, m12: 229 },
  },
  {
    slug: "methylene-blue", name: "Methylene Blue", category: "Cognitive",
    outcome: "Mental clarity and stamina. One capsule a day, helping your mitochondria make energy.",
    dose: "5 to 10 mg daily, capsule", spec: "5 mg capsules · 60 count",
    mechanism: "Methylene blue, at a low dose, helps the mitochondria in your cells make energy, and is studied for mental clarity and stamina. You take one capsule a day.",
    timeline: [{ wk: "Day 1", effect: "You take your first capsule." }, { wk: "Wk 4", effect: "You take it daily." }, { wk: "Wk 12", effect: "You draw the same panel again, and your blood count and liver markers are read." }],
    panel: "Full",
    contraindications: ["G6PD deficiency", "Concurrent SSRI/SNRI (serotonin risk)", "Pregnancy"],
    // pricing TBD → priced at consult
  },

  /* ── RECOVERY ── */
  {
    slug: "bpc-157", name: "BPC-157", category: "Recovery",
    outcome: "For the tendon, muscle, joint or gut lining that is slow to heal. It sends the repair signal.",
    dose: "500 mcg daily, under the skin", spec: "5 mg/mL · 5 mL vial",
    mechanism: "BPC-157 is a fragment of a protective protein from your gut lining, studied for helping tendons, muscle, joints and the gut lining repair. Where gut symptoms are present they often ease first, and tissue follows over weeks. You take one small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose." }, { wk: "Wk 4", effect: "You take it daily through your recovery." }, { wk: "Wk 12", effect: "You draw the same panel again, and inflammation markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Inflammation markers are read first.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 179, m3: 161, m6: 152, m12: 143 },
    status: "live", feelBy: "Gut symptoms within days; tissue in 1 to 2 weeks", fullEffect: "4 to 8 weeks", evidence: 2,
    combine: ["TB-500", "Ipamorelin / CJC-1295 Blend"], avoid: [],
  },
  {
    slug: "tb-500", name: "TB-500", category: "Recovery",
    outcome: "Recovery from injury and hard training. It brings repair cells to the tissue that needs them.",
    dose: "2.5 mg twice a week, under the skin", spec: "10 mg/mL · 5 mL vial",
    mechanism: "TB-500 is a fragment of a protein your body uses to move repair cells to injured tissue, studied for muscle, tendon and joint recovery. Stiffness and recovery time are typically the first things to shift. You take two small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose." }, { wk: "Wk 4", effect: "You take it twice a week through your recovery." }, { wk: "Wk 12", effect: "You draw the same panel again, and inflammation markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IL-6 and hs-CRP are read first.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 259, m3: 233, m6: 220, m12: 207 },
    status: "live", feelBy: "2 to 3 weeks", fullEffect: "6 to 8 weeks", evidence: 1,
    combine: ["BPC-157"], avoid: [],
  },
  {
    slug: "bpc-tb-combo", name: "BPC-157 + TB-500", category: "Recovery",
    outcome: "The repair signal, and the cells that carry it out. BPC-157 and TB-500 in one plan.",
    dose: "BPC-157 daily, TB-500 twice a week", spec: "dual-peptide protocol",
    mechanism: "BPC-157 sends the healing signal at the site, and TB-500 brings repair cells to where they are needed, so the two act on the same tissue from two directions. They are prescribed together as one plan. You take BPC-157 daily and TB-500 twice a week.",
    timeline: [{ wk: "Wk 1", effect: "You take the first doses." }, { wk: "Wk 4", effect: "You take both peptides through your recovery." }, { wk: "Wk 12", effect: "You draw the same panel again, and inflammation markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. IL-6 and hs-CRP are read first.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    pricing: { m1: 399, m3: 359, m6: 339, m12: 319 },
    status: "live", feelBy: "Gut symptoms within days; tissue in 1 to 3 weeks", fullEffect: "6 to 8 weeks", evidence: 2,
    combine: ["Ipamorelin / CJC-1295 Blend"], avoid: [],
  },

  /* ── SKIN & LONGEVITY ── */
  {
    slug: "ghk-cu", name: "GHK-Cu", category: "Skin & Longevity",
    outcome: "Firmer skin, faster healing. A copper peptide your skin makes less of with age.",
    dose: "2 mg daily, under the skin", spec: "50 mg/mL · 3 mL vial",
    mechanism: "GHK-Cu signals your skin cells to make collagen and elastin, and calms inflammation, and is studied for elasticity and wound healing. Skin renews on a cycle of about four weeks, so firmness builds over 8 to 12 weeks. You take one small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose." }, { wk: "Wk 6", effect: "You take it daily, and your skin renews on its own cycle." }, { wk: "Wk 12", effect: "You draw the same panel again, and inflammation markers and your blood count are read." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Copper allergy"],
    pricing: { m1: 129, m3: 116, m6: 110, m12: 103 },
    status: "live", feelBy: "Skin in 3 to 4 weeks", fullEffect: "8 to 12 weeks", evidence: 2,
    combine: ["NAD+", "MOTS-c", "Epitalon"], avoid: [],
  },
  {
    slug: "epitalon", name: "Epitalon", category: "Skin & Longevity",
    outcome: "Sleep and healthy ageing. A 20-day course of injections, a few times a year.",
    dose: "10 mg daily for 20 days, under the skin", spec: "100 mg/mL · 2 mL vial",
    mechanism: "Epitalon is a short peptide modelled on a protein from the pineal gland, studied for telomere maintenance and the sleep-wake cycle. Sleep is typically the first change, within 1 to 2 weeks. You take it as a 20-day course of injections, a few times a year.",
    timeline: [{ wk: "Day 1", effect: "You begin the course." }, { wk: "Day 20", effect: "The course ends." }, { wk: "Wk 12", effect: "You draw the same panel again, and metabolic and inflammation markers are read." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    pricing: { m1: 199, m3: 179, m6: 169, m12: 159 },
    status: "live", feelBy: "Sleep in 1 to 2 weeks", fullEffect: "per course", evidence: 1,
    combine: ["NAD+", "MOTS-c", "GHK-Cu"], avoid: [],
  },
  {
    slug: "nad-plus", name: "NAD+", category: "Skin & Longevity",
    outcome: "Energy and recovery that have slipped with the years. It tops up the coenzyme your cells run on.",
    dose: "100 mg three times a week, under the skin", spec: "200 mg/mL · 5 mL vial",
    mechanism: "NAD+ is the coenzyme every cell uses to make energy, and your levels fall with age. Injected NAD+ tops up what your cells have to work with, and is studied for energy, recovery and healthy ageing. You take three small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "You take the first doses." }, { wk: "Wk 4", effect: "You take it three times a week." }, { wk: "Wk 12", effect: "You draw the same panel again, and metabolic and inflammation markers are read." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    pricing: { m1: 149, m3: 134, m6: 127, m12: 119 },
    status: "live", feelBy: "Energy in days to 2 weeks", fullEffect: "ongoing", evidence: 2,
    combine: ["MOTS-c", "Epitalon", "GHK-Cu"], avoid: [],
  },
  {
    slug: "mots-c", name: "MOTS-c", category: "Skin & Longevity",
    outcome: "Metabolism and endurance that answer your training. It switches on the pathways exercise does.",
    dose: "5 mg twice a week, under the skin", spec: "10 mg/mL · 2 mL vial",
    mechanism: "MOTS-c is a peptide made by your mitochondria that switches on AMPK, the same energy-sensing pathway exercise does, and is studied for metabolism and endurance. It builds over 8 to 12 weeks alongside training. You take two small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose." }, { wk: "Wk 4", effect: "You take it twice a week, alongside your training." }, { wk: "Wk 12", effect: "You draw the same panel again, and metabolic markers are read." }],
    panel: "Full",
    contraindications: ["Active malignancy", "Pregnancy"],
    pricing: { m1: 169, m3: 152, m6: 144, m12: 135 },
    status: "live", feelBy: "2 to 4 weeks", fullEffect: "8 to 12 weeks", evidence: 2,
    combine: ["NAD+", "Epitalon", "Tirzepatide"], avoid: [],
  },

  /* ── METABOLIC / GLP-1 (GATED) ── */
  {
    slug: "semaglutide", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Semaglutide", category: "Metabolic",
    outcome: "Lose the weight when appetite is the hardest part. A GLP-1 medicine, one injection a week.",
    dose: "0.25 to 2.4 mg weekly, stepped up", spec: "Weekly injection · with glycine + B12",
    mechanism: "Semaglutide is a longer-lasting form of GLP-1, the hormone that tells your brain you are full, so you feel full sooner and stay full longer. Appetite typically quiets in the first week, and weight changes over months. You take one small injection a week, and the physician raises the dose step by step.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose, at the lowest step." }, { wk: "Wk 4", effect: "Your dose steps up." }, { wk: "Wk 12", effect: "You draw the same panel again, and the physician reviews your dose." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Fasting insulin and lipase are read first.",
    contraindications: ["Personal/family history of medullary thyroid carcinoma", "MEN 2", "Pregnancy", "Pancreatitis history"],
    stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
    pricing: { m1: 229, m3: 206, m6: 195, m12: 183 },
    status: "live", feelBy: "Appetite in week 1, weight in 4 to 12 weeks", fullEffect: "6 to 12 months", evidence: 3,
    combine: ["Ipamorelin / CJC-1295 Blend"], avoid: ["Tirzepatide"],
  },
  {
    slug: "tirzepatide", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Tirzepatide", category: "Metabolic",
    outcome: "Weight loss with steadier blood sugar. A GLP-1 and GIP medicine, one injection a week.",
    dose: "2.5 to 15 mg weekly, stepped up", spec: "Weekly injection · with glycine + B12",
    mechanism: "Tirzepatide works on two of your appetite hormones at once, GLP-1 and GIP, so you feel full sooner, think about food less and your blood sugar stays steadier. Appetite typically quiets in the first week, and weight changes over months. You take one small injection a week, and the physician raises the dose step by step.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose, at the lowest step." }, { wk: "Wk 4", effect: "Your dose steps up." }, { wk: "Wk 12", effect: "You draw the same panel again, and the physician reviews your dose." }],
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
    outcome: "Fall asleep faster, sleep deeper. One injection at bedtime.",
    dose: "100 mcg nightly, under the skin", spec: "2 mg/mL · 3 mL vial",
    mechanism: "DSIP, the delta sleep-inducing peptide, was first found in the brain during deep sleep and is studied for falling asleep faster and getting more deep sleep. Many people notice it from the first nights. You take one small injection at bedtime.",
    timeline: [{ wk: "Night 1", effect: "You take the first dose at bedtime." }, { wk: "Wk 2", effect: "You take it nightly." }, { wk: "Wk 12", effect: "You draw the same panel again, and cortisol and thyroid are read." }],
    panel: "Full",
    contraindications: ["Pregnancy", "Concurrent SSRI/SNRI (physician review)"],
    pricing: { m1: 129, m3: 116, m6: 110, m12: 103 },
    status: "live", feelBy: "The first nights", fullEffect: "ongoing", evidence: 1,
    combine: ["Epitalon"], avoid: [],
  },
  {
    slug: "pt-141", route: "subcutaneous", regulatory: "compounded-approved-active", name: "PT-141", category: "Sexual Health",
    outcome: "Desire, for men and women. One injection, taken as needed.",
    dose: "1.75 mg as-needed SC", spec: "10 mg/mL · 3 mL vial",
    mechanism: "PT-141 acts on the part of your brain involved in sexual desire, in men and women, rather than on blood flow. It stays active for several hours. You take it about an hour ahead, on the days you want it.",
    timeline: [{ wk: "Dose 1", effect: "You take it about an hour ahead, and it works within 1 to 3 hours." }, { wk: "Ongoing", effect: "On the days you choose, within the monthly limit." }, { wk: "Wk 12", effect: "You draw the same panel again, and the physician reviews your dose." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Hormones are read for context.",
    contraindications: ["Uncontrolled hypertension", "Cardiovascular disease (physician review)", "Pregnancy"],
    pricing: { m1: 99, m3: 89, m6: 84, m12: 79 },
    status: "live", feelBy: "Same day, about 45 minutes", fullEffect: "as needed", evidence: 3,
    combine: ["Oxytocin Nasal", "Tadalafil Nasal"], avoid: [],
  },

  /* ── ADDED FROM THE PLAYBOOK (2026-09-04) ── */
  {
    slug: "thymosin-a1", route: "subcutaneous", name: "Thymosin Alpha-1", category: "Skin & Longevity",
    outcome: "Immune resilience under stress, or through a season. Two injections a week.",
    dose: "1.6 mg twice a week, under the skin", spec: "10 mg/mL · 3 mL vial",
    mechanism: "Thymosin alpha-1 is a peptide your thymus makes that helps your T-cells mature and tunes your immune response. It is used for immune resilience and recovery, and for staying well under stress. You take two small injections a week.",
    timeline: [{ wk: "Wk 1", effect: "You take the first doses." }, { wk: "Wk 4", effect: "You take it through the season." }, { wk: "Wk 12", effect: "You draw the same panel again, and your blood count and inflammation markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Blood count and inflammation markers are read first.",
    contraindications: ["Active malignancy (physician review)", "Organ transplant or immunosuppressant medication", "Pregnancy"],
    pricing: { m1: 159, m3: 143, m6: 135, m12: 127 },
    status: "live", feelBy: "2 to 4 weeks", fullEffect: "ongoing", evidence: 2, combine: ["BPC-157"], avoid: [],
  },
  {
    slug: "aod-9604", route: "subcutaneous", name: "AOD-9604", category: "Metabolic",
    outcome: "Fat metabolism, alongside a weight plan. One injection a day.",
    dose: "300 mcg daily, under the skin", spec: "5 mg/mL · 3 mL vial",
    mechanism: "AOD-9604 is a fragment of growth hormone, the part linked to fat metabolism, and is studied for fat breakdown without growth hormone's other effects. The human evidence is limited, so it is offered as an add-on to a broader plan rather than on its own. You take one small injection a day.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose." }, { wk: "Wk 6", effect: "You take it daily, alongside your main plan." }, { wk: "Wk 12", effect: "You draw the same panel again, and metabolic markers are read." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Metabolic markers are read first.",
    contraindications: ["Pregnancy", "Active malignancy"],
    pricing: { m1: 199, m3: 179, m6: 169, m12: 159 },
    status: "live", feelBy: "Weeks", fullEffect: "12 weeks", evidence: 1, combine: ["Ipamorelin / CJC-1295 Blend"], avoid: [],
  },
  {
    slug: "oxytocin", route: "nasal", regulatory: "compounded-approved-active", name: "Oxytocin Nasal", category: "Sexual Health",
    outcome: "Closeness and arousal. A nasal spray, taken as needed.",
    dose: "As needed, nasal spray", spec: "Nasal spray",
    mechanism: "Oxytocin is the hormone your body releases during closeness and touch, and as a nasal spray it reaches your brain's bonding and arousal circuits. It is used for closeness, arousal and mood in intimate settings, and often taken alongside PT-141. You take it shortly before, on the days you choose.",
    timeline: [{ wk: "Dose 1", effect: "You take it shortly before." }, { wk: "Ongoing", effect: "On the days you choose." }, { wk: "Wk 12", effect: "You draw the same panel again, and your hormones are read for context." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Hormones are read for context.",
    contraindications: ["Pregnancy", "Uncontrolled hypertension (physician review)"],
    pricing: { m1: 99, m3: 89, m6: 84, m12: 79 },
    status: "live", feelBy: "Same day", fullEffect: "as needed", evidence: 1, combine: ["PT-141"], avoid: [],
  },
  {
    slug: "tadalafil", route: "nasal", regulatory: "compounded-approved-active", name: "Tadalafil Nasal", category: "Sexual Health",
    outcome: "Erectile function, 20 to 30 minutes ahead. A fast-onset nasal spray.",
    dose: "As needed, nasal spray", spec: "Nasal spray",
    mechanism: "Tadalafil is a well-known blood-flow medicine for erections, here as a fast-onset nasal spray. It works on performance, PT-141 works on desire, and the two are often paired. You take it 20 to 30 minutes ahead, on the days you choose.",
    timeline: [{ wk: "Dose 1", effect: "You take it about 20 to 30 minutes ahead." }, { wk: "Ongoing", effect: "On the days you choose." }, { wk: "Wk 12", effect: "You draw the same panel again, and your heart markers are read for context." }],
    panel: "Full", panelNote: "The blood test at week 12, included.",
    contraindications: ["Nitrate medications", "Recent heart attack or stroke", "Severe liver or kidney disease"],
    pricing: { m1: 89, m3: 80, m6: 76, m12: 71 },
    status: "live", feelBy: "20 to 30 minutes", fullEffect: "as needed", evidence: 3, combine: ["PT-141"], avoid: [],
  },
  {
    slug: "testosterone", route: "subcutaneous", regulatory: "compounded-approved-active", name: "Testosterone Cypionate", category: "Hormone",
    outcome: "For low testosterone in men. One injection a week, dosed from your blood work.",
    dose: "Weekly, under the skin or into muscle", spec: "200 mg/mL · 10 mL vial",
    mechanism: "Testosterone cypionate is classic testosterone replacement for men whose own level is low, used for energy, drive, muscle and mood, and the base many men build the rest of a plan on. Your physician sets the dose from your total and free testosterone and adjusts it from regular blood work. You take one injection a week.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose." }, { wk: "Wk 6", effect: "Your levels settle." }, { wk: "Wk 12", effect: "You draw the same panel again, and testosterone, estradiol and your blood count are read first." }],
    panel: "Full", panelNote: "The blood test at week 12, included. Testosterone, estradiol and blood count are read first.",
    contraindications: ["Prostate or breast cancer", "Untreated sleep apnea", "Planning to conceive (physician review)", "High red blood cell count"],
    pricing: { m1: 149, m3: 134, m6: 127, m12: 119 },
    status: "live", feelBy: "2 to 6 weeks", fullEffect: "3 to 6 months", evidence: 3, combine: ["Ipamorelin / CJC-1295 Blend", "Kisspeptin"], avoid: [],
  },
  {
    slug: "kisspeptin", route: "subcutaneous", name: "Kisspeptin", category: "Hormone",
    outcome: "Supports your own testosterone production. Prescribed alongside testosterone.",
    dose: "Under the skin, on the physician's schedule", spec: "Vial",
    mechanism: "Kisspeptin is the signal at the top of your sex-hormone axis, one step above your own hormones, and a gentler lever than direct replacement. It is used to keep your own production working and in fertility-minded plans. You take it by small injection, on the physician's schedule.",
    timeline: [{ wk: "Wk 1", effect: "You take the first dose." }, { wk: "Wk 6", effect: "You take it on schedule." }, { wk: "Wk 12", effect: "You draw the same panel again, and testosterone, estradiol and SHBG are read first." }],
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
