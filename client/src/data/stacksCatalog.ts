/* ══════════════════════════════════════════════════════════════
   NEXPHORIA — FLAGSHIP STACK CATALOG (P5)
   Source of truth: MDI × Nexphoria offering handoff.
   Voice: institutional / bank register — NOT the doc's "Beyond
   Boundaries" hype line. Data is the doc's; tone is ours.
   Pricing is explicit per-stack (doc's real figures), not a
   global discount engine. Ignite (GLP-1) is sold as of 2026-08-12.
   ══════════════════════════════════════════════════════════════ */

import { soloByName, isSellable, type SoloPeptide } from "@/data/soloCatalog";

export type PanelTier = "Basic" | "Full" | "Elite";

export interface StackPeptideLine {
  name: string;
  dose: string;         // e.g. "500 mcg daily SC"
  spec: string;         // e.g. "5 mg/mL · 5 mL vial"
}

export interface StackCadence {
  key: "1mo" | "3mo" | "6mo" | "12mo" | "fixed";
  label: string;
  sublabel: string;
  /** total charged for the period */
  total: number;
  /** monthly-equivalent for display, when useful */
  perMonth?: number;
  badge?: "Recommended" | "Best value" | "Doctor-defined" | "Try it";
  /** 12-mo tier surfaces an included panel */
  includesPanel?: PanelTier;
  /** the labs included at this term (the playbook) */
  labs?: string;
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

/* Term builder (the playbook, 2026-09-04): one month to try, or 3, 6 or 12
   months paid up front. Longer terms cost less per month and include more
   labs. Totals are the whole price for the term. */
const cad = (base: number): StackCadence[] => [
  { key: "1mo", label: "One month", sublabel: "Paid up front", total: base, perMonth: base, labs: "Blood kit before your first dose, included" },
  { key: "3mo", label: "3 months", sublabel: "Paid up front · 10% less per month", total: Math.round(base * 0.9) * 3, perMonth: Math.round(base * 0.9), labs: "Blood kit, and the same test at week 12, included" },
  { key: "6mo", label: "6 months", sublabel: "Paid up front · 15% less per month", total: Math.round(base * 0.85) * 6, perMonth: Math.round(base * 0.85), includesPanel: "Full", labs: "Blood kit, the week-12 test and a six-month test, included" },
  { key: "12mo", label: "12 months", sublabel: "Paid up front · 20% less per month", total: Math.round(base * 0.8) * 12, perMonth: Math.round(base * 0.8), includesPanel: "Full", labs: "Blood kit, then a test each quarter, included" },
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
export const LAUNCH_STACK_SLUGS = new Set(["recover", "ascend", "lucidity", "ignite", "vitality", "foundation"]);

const ALL_STACKS: FlagshipStack[] = [
  {
    slug: "recover",
    name: "Recovery protocol",
    tagline: "Ipamorelin / CJC-1295, BPC-157 and TB-500. For injury and recovery from training.",
    category: "Recovery",
    bestFor: "Injuries, hard training and recovery that has slowed with age.",
    peptides: [
      { name: "Ipamorelin / CJC-1295 Blend", dose: "300 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial" },
      { name: "BPC-157", dose: "500 mcg daily, under the skin", spec: "5 mg/mL · 5 mL vial" },
      { name: "TB-500", dose: "2.5 mg twice a week, under the skin", spec: "10 mg/mL · 5 mL vial" },
    ],
    synergy: "The growth hormone peptide for overnight repair, BPC-157 for the repair signal at the site, TB-500 for moving repair cells through the whole body. Each does a different job.",
    timeline: [
      { wk: "Wk 1", effect: "Your first doses." },
      { wk: "Wk 4", effect: "Nightly and daily, through your recovery." },
      { wk: "Wk 12", effect: "Your blood test. IGF-1 and inflammation markers are read first." },
    ],
    panel: "Full",
    panelNote: "A blood test before your first dose, and the same test at week 12.",
    contraindications: ["Active malignancy", "Pregnancy or breastfeeding", "Elevated IGF-1 at baseline"],
    cadences: cad(349),
    worldLean: "both",
  },
  {
    slug: "ascend",
    name: "Longevity protocol",
    tagline: "MOTS-c, NAD+, GHK-Cu and epitalon. For energy, metabolism and skin with age.",
    category: "Energy and healthy ageing",
    bestFor: "Energy, healthy ageing and skin, in one plan.",
    peptides: [
      { name: "MOTS-c", dose: "5 mg twice a week, under the skin", spec: "10 mg/mL · 2 mL vial" },
      { name: "NAD+", dose: "100 mg three times a week, under the skin", spec: "200 mg/mL · 5 mL vial" },
      { name: "GHK-Cu", dose: "2 mg daily, under the skin", spec: "50 mg/mL · 3 mL vial" },
      { name: "Epitalon", dose: "10 mg daily for 20 days, under the skin", spec: "100 mg/mL · 2 mL vial" },
    ],
    synergy: "NAD+ for cellular energy, MOTS-c for the pathways exercise switches on, GHK-Cu for collagen and skin, epitalon as a course for telomere maintenance. Each does a different job.",
    timeline: [
      { wk: "Wk 1", effect: "Your first doses." },
      { wk: "Wk 6", effect: "Taken on schedule. Skin renews on its own cycle." },
      { wk: "Wk 12", effect: "Your blood test. Metabolic and inflammation markers are read." },
    ],
    panel: "Full",
    panelNote: "A blood test before your first dose, and the same test at week 12.",
    contraindications: ["Active malignancy", "Pregnancy", "Copper allergy"],
    cadences: cad(379),
    worldLean: "both",
  },
  {
    slug: "lucidity",
    name: "Focus and sleep protocol",
    tagline: "Semax, Selank and DSIP. For focus by day, a steadier mood under stress, and deep sleep.",
    category: "Focus and mood",
    bestFor: "Focus and mental stamina by day, a steadier mood, deeper sleep at night.",
    peptides: [
      { name: "Semax", dose: "600 mcg once a day, nasal spray", spec: "10 mg/mL · 3 mL nasal spray" },
      { name: "Selank", dose: "300 mcg twice a day, nasal spray", spec: "5 mg/mL · 3 mL nasal spray" },
      { name: "DSIP", dose: "100 mcg nightly, under the skin", spec: "2 mg/mL · 3 mL vial" },
    ],
    synergy: "Semax for focus in the morning, Selank for a steadier mood through the day, DSIP for deeper sleep at night. Each does a different job.",
    timeline: [
      { wk: "Day 1", effect: "Your first sprays." },
      { wk: "Wk 2", effect: "Taken daily." },
      { wk: "Wk 12", effect: "Your blood test. Thyroid and cortisol are read for context." },
    ],
    panel: "Full",
    panelNote: "A blood test before your first dose, and the same test at week 12.",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review)"],
    cadences: cad(349),
    worldLean: "both",
  },
  {
    slug: "ignite",
    name: "Weight protocol",
    tagline: "Tirzepatide with Ipamorelin / CJC-1295. For weight loss while keeping muscle.",
    category: "Weight loss",
    bestFor: "Weight loss while keeping muscle.",
    peptides: [
      { name: "Tirzepatide", dose: "2.5 to 15 mg weekly, stepped up", spec: "Weekly injection · with glycine + B12" },
      { name: "Ipamorelin / CJC-1295 Blend", dose: "300 mcg nightly, under the skin", spec: "5 mg/mL · 5 mL vial" },
    ],
    synergy: "Tirzepatide quiets appetite on two hormones at once. The nightly growth hormone peptide protects the lean muscle you would otherwise lose while the weight comes off.",
    timeline: [
      { wk: "Wk 1", effect: "Your first dose, at the lowest step." },
      { wk: "Wk 4", effect: "Your dose steps up." },
      { wk: "Wk 12", effect: "Your blood test and a dose review." },
    ],
    panel: "Full",
    panelNote: "A blood test before your first dose, and the same test at week 12. Fasting insulin and lipase are read first.",
    contraindications: ["Personal/family history of medullary thyroid carcinoma", "MEN 2", "Pregnancy", "Pancreatitis history"],
    cadences: cad(399),
    stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
    worldLean: "both",
  },
  {
    slug: "vitality",
    name: "Sexual health protocol",
    tagline: "PT-141, oxytocin and tadalafil. For desire, closeness and erectile function, taken as needed.",
    category: "Sexual health",
    bestFor: "Desire and performance, for men and women.",
    peptides: [
      { name: "PT-141", dose: "1.75 mg as needed, under the skin", spec: "10 mg/mL · 3 mL vial" },
      { name: "Oxytocin Nasal", dose: "As needed, nasal spray", spec: "Nasal spray" },
      { name: "Tadalafil Nasal", dose: "As needed, nasal spray", spec: "Nasal spray" },
    ],
    synergy: "PT-141 works on desire in the brain, tadalafil on blood flow, oxytocin on closeness. Each does a different job, taken on the day you choose.",
    timeline: [
      { wk: "Dose 1", effect: "Taken about an hour ahead. Works the same day." },
      { wk: "Ongoing", effect: "On the days you choose, within the monthly limit." },
      { wk: "Wk 12", effect: "Your blood test. Hormones and heart markers are read for context." },
    ],
    panel: "Full",
    panelNote: "A blood test before your first dose, and the same test at week 12.",
    contraindications: ["Uncontrolled hypertension", "Cardiovascular disease (physician review)", "Nitrate medications", "Pregnancy"],
    cadences: [],
    gated: true,
    worldLean: "both",
  },
  {
    slug: "foundation",
    name: "Testosterone protocol",
    tagline: "Testosterone cypionate with kisspeptin. For low testosterone, keeping your own production working.",
    category: "Hormones",
    bestFor: "Men with low testosterone.",
    peptides: [
      { name: "Testosterone Cypionate", dose: "Weekly, under the skin or into muscle", spec: "200 mg/mL · 10 mL vial" },
      { name: "Kisspeptin", dose: "On your physician's schedule, under the skin", spec: "Vial" },
    ],
    synergy: "Testosterone replaces what is low; kisspeptin supports your own production so it keeps working. Monitored with blood work throughout.",
    timeline: [
      { wk: "Wk 1", effect: "Your first dose." },
      { wk: "Wk 6", effect: "Levels settle." },
      { wk: "Wk 12", effect: "Your blood test. Testosterone, estradiol and blood count are read first." },
    ],
    panel: "Full",
    panelNote: "A blood test before your first dose, and the same test at week 12. Hormones are read first.",
    contraindications: ["Prostate or breast cancer", "Untreated sleep apnea", "Planning to conceive (physician review)"],
    cadences: [],
    gated: true,
    worldLean: "him",
  },
];

export const FLAGSHIP_STACKS: FlagshipStack[] = ALL_STACKS.filter((s) => LAUNCH_STACK_SLUGS.has(s.slug));

/** Held off the shelf until their molecules return. Retained deliberately. */
export const RETIRED_STACKS: FlagshipStack[] = ALL_STACKS.filter((s) => !LAUNCH_STACK_SLUGS.has(s.slug));

export function getStack(slug: string): FlagshipStack | undefined {
  return FLAGSHIP_STACKS.find((s) => s.slug === slug);
}

/** The live SKUs inside a protocol, resolved by name. */
export function stackComponents(stack: FlagshipStack): SoloPeptide[] {
  return stack.peptides.map((p) => soloByName(p.name)).filter((s): s is SoloPeptide => Boolean(s));
}

/** A protocol is reservable, rather than sold, while any of its medicines
    is still pending (the playbook's Category 2 set). The price ladder shows
    so the reader can lock it; the action is a reservation. */
export function stackReservable(stack: FlagshipStack): boolean {
  if (stack.gated || stack.cadences.length === 0) return false;
  return stack.peptides.some((p) => { const s = soloByName(p.name); return !s || !isSellable(s); });
}

/** The medicines in a protocol still pending, by name. */
export function stackPending(stack: FlagshipStack): string[] {
  return stack.peptides.filter((p) => { const s = soloByName(p.name); return !s || !isSellable(s); }).map((p) => p.name);
}

/* ── Retired (the plain deck, 2026-09-04): the Full Stack band is removed from
   the index. The export stays only until pages/ProtocolsIndex.tsx drops its
   import; nothing new should read it. ── */
export const FULL_STACK = {
  slug: "full-stack",
  name: "The Full Stack",
  base: 1199,
  protocols: ["recover", "ascend", "lucidity", "ignite"],
  line: "The Recovery, Longevity, Focus and sleep, and Weight protocols, prescribed as one plan with one blood test.",
} as const;

/* ── Synergy rules (the playbook): what to combine, what to pick one of ── */
export interface SameJobGroup { name: string; members: string[]; note: string }
export const SAME_JOB: SameJobGroup[] = [
  { name: "Growth hormone peptides", members: ["Sermorelin", "Ipamorelin / CJC-1295 Blend", "Tesamorelin"], note: "All three raise your own growth hormone. Pick one; your physician chooses by goal." },
  { name: "GLP-1 medications", members: ["Semaglutide", "Tirzepatide"], note: "One at a time. Tirzepatide works on a second hormone; your physician picks." },
];
export const PAIRS_WELL = [
  { pair: ["BPC-157", "TB-500"], note: "Different jobs. BPC-157 sends the repair signal at the site; TB-500 moves repair cells through the whole body." },
  { pair: ["Tirzepatide", "Ipamorelin / CJC-1295 Blend"], note: "The GLP-1 takes the weight off; the nightly growth hormone peptide protects the muscle underneath it." },
  { pair: ["PT-141", "Tadalafil Nasal"], note: "Desire from the brain and blood flow from the vessels. Two mechanisms, taken the same day." },
  { pair: ["Testosterone Cypionate", "Kisspeptin"], note: "Testosterone replaces what is low; kisspeptin keeps your own production working." },
];

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
    freeWith: "Included with every first order, as your baseline",
    summary: "The full panel, drawn at home before your first dose.",
    adds: ["CBC with differential", "Comprehensive metabolic panel", "Lipid panel", "HbA1c", "Fasting glucose + insulin", "hs-CRP", "TSH"],
    retest: "Week 12",
  },
  {
    tier: "Full",
    price: 199,
    freeWith: "Included at six and twelve months, as your optimization panel",
    summary: "Everything in Basic, plus the hormonal and GH-axis panel.",
    adds: ["Total T · Free T · SHBG · Estradiol (sensitive)", "LH · FSH · Prolactin", "Free T3 · Free T4 · Reverse T3", "IGF-1 (mandatory for any GH-axis peptide)", "DHEA-S · AM Cortisol", "Vit D · B12 · Ferritin · Homocysteine", "ALT/AST/GGT", "Uric acid"],
    retest: "Week 12 · Month 6",
  },
  {
    tier: "Elite",
    price: 399,
    freeWith: "Included on the twelve-month term, quarterly",
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
