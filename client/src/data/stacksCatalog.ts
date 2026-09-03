/* ══════════════════════════════════════════════════════════════
   NEXPHORIA — FLAGSHIP STACK CATALOG (P5)
   Source of truth: MDI × Nexphoria offering handoff.
   Voice: institutional / bank register — NOT the doc's "Beyond
   Boundaries" hype line. Data is the doc's; tone is ours.
   Pricing is explicit per-stack (doc's real figures), not a
   global discount engine. Ignite (GLP-1) is sold as of 2026-08-12.
   ══════════════════════════════════════════════════════════════ */

export type PanelTier = "Basic" | "Full" | "Elite";

export interface StackPeptideLine {
  name: string;
  dose: string;         // e.g. "500 mcg daily SC"
  spec: string;         // e.g. "5 mg/mL · 5 mL vial"
}

export interface StackCadence {
  key: "1mo" | "3mo" | "12mo" | "fixed";
  label: string;
  sublabel: string;
  /** total charged for the period */
  total: number;
  /** monthly-equivalent for display, when useful */
  perMonth?: number;
  badge?: "Recommended" | "Best value" | "Doctor-defined";
  /** 12-mo tier surfaces an included panel */
  includesPanel?: PanelTier;
}

export interface StackTimelineMark {
  wk: string;
  effect: string;
}

export interface FlagshipStack {
  slug: string;
  name: string;
  tagline: string;          // ours, quiet — not the doc's hype tagline
  category: string;
  bestFor: string;
  peptides: StackPeptideLine[];
  synergy: string;
  timeline: StackTimelineMark[];
  panel: PanelTier;
  panelNote?: string;
  contraindications: string[];
  cadences: StackCadence[];
  /** true = do not sell; route to physician intake wall */
  gated?: boolean;
  /** state exclusions for GLP-1 */
  stateExclusions?: string[];
  /** category art already in the Bloom family (reused) */
  worldLean?: "him" | "her" | "both";
}

/* Cadence builder — doc model: 3-mo default-recommended, 12-mo best value. */
const cad = (
  one: number, three: number, twelve: number, fixed: number, panel: PanelTier,
): StackCadence[] => [
  { key: "1mo", label: "1-Month", sublabel: "Try it · cancel anytime", total: one, perMonth: one },
  { key: "3mo", label: "3-Month", sublabel: "Billed quarterly · save 15%", total: three, perMonth: Math.round(three / 3), badge: "Recommended" },
  { key: "12mo", label: "12-Month", sublabel: "Billed monthly · save 30%", total: twelve, perMonth: Math.round(twelve / 12), badge: "Best value", includesPanel: panel },
  { key: "fixed", label: "Fixed 8–12 wk Cycle", sublabel: "Physician-defined protocol", total: fixed, perMonth: fixed, badge: "Doctor-defined" },
];

/* ── LAUNCH SCOPE (2026-08-12) ─────────────────────────────────
   Six of the seven flagships are composed ENTIRELY of retired molecules —
   Wolverine (BPC-157, TB-500), Glow (GHK-Cu, Epitalon), Ascend (CJC-1295,
   Ipamorelin), Lucidity (Selank, Semax), Meridian (NAD+, Epitalon, MOTS-c)
   and Threshold (DSIP, Epitalon). Leaving them visible would mean actively
   offering compounds we do not sell, which is the exact LegitScript failure
   the launch scope exists to remove.

   Only Ignite survives, because tirzepatide is in the launch set. It is sold
   at the solo's own tiers — see the note on its cadences; no price was
   invented to keep a surface populated.

   Retired, not deleted — same discipline as LAUNCH_SLUGS in soloCatalog. The
   compositions are intact and a stack returns by adding its slug back once its
   molecules are sellable again. Goals (data/goals.ts) are the merchandising
   unit now; stacks are no longer load-bearing for conversion. */
/* 2026-09-03 (Chiya): full menu; every flagship protocol is on. */
export const LAUNCH_STACK_SLUGS = new Set(["wolverine", "glow", "ascend", "lucidity", "meridian", "ignite", "threshold"]);

const ALL_STACKS: FlagshipStack[] = [
  {
    slug: "wolverine",
    name: "Wolverine",
    tagline: "The recovery pair. Repair signal plus repair cells.",
    category: "Recovery & Injury",
    bestFor: "Injuries, post-surgery recovery and hard training.",
    peptides: [
      { name: "BPC-157", dose: "500 mcg daily SC", spec: "5 mg/mL · 5 mL vial" },
      { name: "TB-500", dose: "2.5 mg 2×/week SC", spec: "10 mg/mL · 5 mL vial" },
    ],
    synergy: "BPC-157 sends the repair signal; TB-500 moves repair cells to where they are needed. Together they cover tendon, ligament, muscle and the gut lining.",
    timeline: [
      { wk: "Wk 1", effect: "Your first doses. Medication arrives cold, with instructions." },
      { wk: "Wk 4", effect: "BPC-157 daily and TB-500 twice a week, through your recovery." },
      { wk: "Wk 12", effect: "Your blood panel, with inflammation markers checked." },
    ],
    panel: "Full",
    panelNote: "The full panel at week 12, included, with inflammation markers checked first.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    cadences: cad(269, 686, 2260, 296, "Basic"),
    worldLean: "both",
  },
  {
    slug: "glow",
    name: "Glow",
    tagline: "Skin support from within, plus a healthy-ageing course.",
    category: "Skin & Longevity",
    bestFor: "Skin quality, elasticity and healthy ageing.",
    peptides: [
      { name: "GHK-Cu", dose: "2 mg daily SC", spec: "50 mg/mL · 3 mL vial" },
      { name: "Epitalon", dose: "10 mg daily · 20-day pulse Q3mo SC", spec: "100 mg/mL · 2 mL vial" },
    ],
    synergy: "GHK-Cu supports collagen and skin repair every day; epitalon runs as a 20-day course for telomere maintenance and the sleep-wake cycle.",
    timeline: [
      { wk: "Wk 1", effect: "Your first doses." },
      { wk: "Wk 6", effect: "GHK-Cu daily. Skin renews on its own cycle." },
      { wk: "Wk 12", effect: "Your blood panel, with inflammation and blood count checked." },
    ],
    panel: "Full",
    panelNote: "The full panel at week 12, included.",
    contraindications: ["Active malignancy", "Copper allergy (GHK-Cu)"],
    cadences: cad(229, 584, 1923, 252, "Basic"),
    worldLean: "her",
  },
  {
    slug: "ascend",
    name: "Ascend",
    tagline: "Growth hormone, more often and more. Once a night.",
    category: "GH Axis & Body Composition",
    bestFor: "Lean mass, recovery and body composition.",
    peptides: [
      { name: "CJC-1295 (no-DAC)", dose: "100 mcg nightly SC", spec: "5 mg/mL · 5 mL blend vial" },
      { name: "Ipamorelin", dose: "200 mcg nightly SC", spec: "combined blend vial" },
    ],
    synergy: "CJC-1295 raises how much growth hormone each pulse releases; ipamorelin raises how often, without a cortisol spike. One nightly injection covers both.",
    timeline: [
      { wk: "Wk 1", effect: "Your first dose, at bedtime." },
      { wk: "Wk 4", effect: "The nightly rhythm settles in." },
      { wk: "Wk 12", effect: "Your blood panel. IGF-1 checked first." },
    ],
    panel: "Full",
    panelNote: "The full panel at week 12, included. IGF-1 is the number the dose is set against.",
    contraindications: ["Active malignancy", "Pregnancy", "Uncontrolled type 2 diabetes", "Elevated IGF-1 at baseline"],
    cadences: cad(299, 762, 2512, 329, "Elite"),
    worldLean: "him",
  },
  {
    slug: "lucidity",
    name: "Lucidity",
    tagline: "Focus in the morning, calm through the day. Two nasal sprays.",
    category: "Cognitive & Focus",
    bestFor: "Focus, mental stamina and a steadier mood under stress.",
    peptides: [
      { name: "Selank", dose: "300 mcg 2×/day intranasal", spec: "5 mg/mL · 3 mL nasal spray" },
      { name: "Semax", dose: "600 mcg 1×/day intranasal", spec: "10 mg/mL · 3 mL nasal spray" },
    ],
    synergy: "Semax in the morning for focus and mental stamina; Selank through the day for a steadier mood under pressure. Both are nasal sprays.",
    timeline: [
      { wk: "Day 1", effect: "Your first sprays. Many people notice something within the hour." },
      { wk: "Wk 2", effect: "Taken daily, the effect evens out." },
      { wk: "Wk 12", effect: "Your blood panel, with thyroid and cortisol checked for context." },
    ],
    panel: "Full",
    panelNote: "The full panel at week 12, included, with thyroid and cortisol checked for context.",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review required)"],
    cadences: cad(259, 660, 2176, 285, "Basic"),
    worldLean: "both",
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Energy, metabolism and healthy ageing, in one plan.",
    category: "Longevity & Mitochondrial",
    bestFor: "Energy, endurance and healthy ageing.",
    peptides: [
      { name: "NAD+", dose: "100 mg 3×/week SC", spec: "200 mg/mL · 5 mL vial" },
      { name: "Epitalon", dose: "10 mg daily pulse", spec: "100 mg/mL · 2 mL vial" },
      { name: "MOTS-c", dose: "5 mg 2×/week SC", spec: "10 mg/mL · 2 mL vial" },
    ],
    synergy: "NAD+ for cellular energy, MOTS-c for the pathways exercise switches on, and epitalon as a 20-day course for telomere maintenance.",
    timeline: [
      { wk: "Wk 1", effect: "Your first doses." },
      { wk: "Wk 4", effect: "On schedule, the levels build." },
      { wk: "Wk 12", effect: "Your blood panel, with metabolic and inflammation markers checked." },
    ],
    panel: "Full",
    panelNote: "The full panel at week 12, included, with metabolic and inflammation markers checked first.",
    contraindications: ["Active malignancy", "Pregnancy"],
    cadences: cad(449, 1145, 3772, 494, "Elite"),
    worldLean: "both",
  },
  {
    slug: "ignite",
    name: "Ignite",
    tagline: "Two appetite hormones, one weekly dose.",
    category: "Metabolic (GLP-1)",
    bestFor: "Weight loss, after a physician's review.",
    peptides: [
      { name: "Tirzepatide", dose: "2.5 to 15 mg weekly, stepped up", spec: "Weekly injection · with glycine + B12" },
    ],
    synergy: "Tirzepatide works on GLP-1 and GIP at once. You feel full sooner, think about food less, and your blood sugar stays steadier. Your physician increases the dose step by step.",
    timeline: [
      { wk: "Wk 1", effect: "Your first dose, at the lowest step." },
      { wk: "Wk 4", effect: "Your dose steps up." },
      { wk: "Wk 12", effect: "Your blood panel and a dose review." },
    ],
    panel: "Full",
    panelNote: "The full panel at week 12, included, with fasting insulin and lipase checked first.",
    contraindications: [
      "Personal or family history of medullary thyroid carcinoma",
      "MEN 2 syndrome",
      "Pregnancy",
      "History of pancreatitis",
    ],
    /* Ignite is the tirzepatide protocol, and tirzepatide became directly
       purchasable on 2026-08-12. Leaving the protocol gated and unpriced while
       selling the same molecule on its PDP was incoherent, and it left /stacks
       unable to reach a price at all — audit:funnel's third broken path.
       Cadences are the solo's OWN tiers (399 / 339 / 279 per month), not new
       numbers: the solo already includes the panel, physician review and
       retest, so the protocol is the same offer with the method made explicit.
       State exclusions stay — those are legal, not a gate. */
    cadences: cad(399, 1017, 3348, 439, "Full"),
    stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
    worldLean: "both",
  },
  {
    slug: "threshold",
    name: "Threshold",
    tagline: "Deeper sleep, and a steadier sleep-wake rhythm.",
    category: "Sleep & HRV",
    bestFor: "Falling asleep, deep sleep and waking rested.",
    peptides: [
      { name: "DSIP", dose: "100 mcg nightly SC", spec: "2 mg/mL · 3 mL vial" },
      { name: "Epitalon", dose: "10 mg nightly SC", spec: "100 mg/mL · 2 mL vial" },
    ],
    synergy: "DSIP for falling asleep faster and getting more deep sleep; epitalon for the sleep-wake rhythm. Both at bedtime.",
    timeline: [
      { wk: "Night 1", effect: "Your first dose, at bedtime." },
      { wk: "Wk 2", effect: "Taken nightly, sleep settles into a rhythm." },
      { wk: "Wk 12", effect: "Your blood panel, with cortisol and thyroid checked." },
    ],
    panel: "Full",
    panelNote: "The full panel at week 12, included, with cortisol and thyroid checked first.",
    contraindications: ["Pregnancy", "Concurrent SSRI/SNRI (flagged for physician review)"],
    cadences: cad(199, 507, 1672, 219, "Basic"),
    worldLean: "both",
  },
];

/** Stacks the site shows and sells. Every consumer reads this. */
export const FLAGSHIP_STACKS: FlagshipStack[] = ALL_STACKS.filter((s) => LAUNCH_STACK_SLUGS.has(s.slug));

/** Held off the shelf until their molecules return. Retained deliberately. */
export const RETIRED_STACKS: FlagshipStack[] = ALL_STACKS.filter((s) => !LAUNCH_STACK_SLUGS.has(s.slug));

export function getStack(slug: string): FlagshipStack | undefined {
  return FLAGSHIP_STACKS.find((s) => s.slug === slug);
}

/* ── Blood-panel tiers (doc's real markers) ── */
export interface PanelDef {
  tier: PanelTier;
  price: number;
  freeWith?: string;
  summary: string;
  adds: string[];
  retest: string;
}

export const PANELS: PanelDef[] = [
  {
    tier: "Basic",
    price: 99,
    freeWith: "Included with any 12-month plan",
    summary: "The full panel, the floor under any protocol.",
    adds: ["CBC with differential", "Comprehensive metabolic panel", "Lipid panel", "HbA1c", "Fasting glucose + insulin", "hs-CRP", "TSH"],
    retest: "Week 12",
  },
  {
    tier: "Full",
    price: 199,
    freeWith: "Bundled in 3- and 12-month stacks",
    summary: "Everything in Basic, plus the hormonal and GH-axis panel.",
    adds: ["Total T · Free T · SHBG · Estradiol (sensitive)", "LH · FSH · Prolactin", "Free T3 · Free T4 · Reverse T3", "IGF-1 (mandatory for any GH-axis peptide)", "DHEA-S · AM Cortisol", "Vit D · B12 · Ferritin · Homocysteine", "ALT/AST/GGT", "Uric acid"],
    retest: "Week 12 · Month 6",
  },
  {
    tier: "Elite",
    price: 399,
    freeWith: "Bundled in Meridian and 12-month Ignite / Ascend",
    summary: "Everything in Full, plus advanced cardiometabolic and inflammatory depth.",
    adds: ["Apolipoprotein B · Lp(a) · LDL particle count", "Fasting insulin · HOMA-IR · C-peptide", "Adiponectin · Leptin", "IL-6 · TNF-α", "Full iron panel", "HRV wearable integration (baseline)", "Optional: epigenetic age testing"],
    retest: "Week 12 · Month 6 · Month 12",
  },
];

export function usd(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

/* GLP-1 state exclusions — enforce at checkout when GLP-1 solos ship (P5 wave 2). */
export const GLP1_STATE_EXCLUSIONS = ["AK", "AR", "IN", "MI", "MN", "SC"];
export function isGLP1Excluded(state: string): boolean {
  return GLP1_STATE_EXCLUSIONS.includes(state.toUpperCase());
}
