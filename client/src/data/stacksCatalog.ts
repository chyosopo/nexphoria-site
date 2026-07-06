/* ══════════════════════════════════════════════════════════════
   NEXPHORIA — FLAGSHIP STACK CATALOG (P5)
   Source of truth: MDI × Nexphoria offering handoff.
   Voice: institutional / bank register — NOT the doc's "Beyond
   Boundaries" hype line. Data is the doc's; tone is ours.
   Pricing is explicit per-stack (doc's real figures), not a
   global discount engine. GLP-1 (Ignite) is gated, not sold.
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

export const FLAGSHIP_STACKS: FlagshipStack[] = [
  {
    slug: "wolverine",
    name: "Wolverine",
    tagline: "Recovery, measured.",
    category: "Recovery & Injury",
    bestFor: "Athletes and post-surgical recovery, 30–55.",
    peptides: [
      { name: "BPC-157", dose: "500 mcg daily SC", spec: "5 mg/mL · 5 mL vial" },
      { name: "TB-500", dose: "2.5 mg 2×/week SC", spec: "10 mg/mL · 5 mL vial" },
    ],
    synergy: "BPC-157 drives systemic healing signaling; TB-500 directs tissue-specific repair across tendon, ligament, and muscle. Together they address both the signal and the site.",
    timeline: [
      { wk: "Wk 1", effect: "Inflammation begins to settle." },
      { wk: "Wk 4", effect: "Tendon-repair markers move." },
      { wk: "Wk 8", effect: "Measurable strength return." },
      { wk: "Wk 12", effect: "Full recovery cycle assessed." },
    ],
    panel: "Basic",
    panelNote: "Basic panel plus IL-6 and hs-CRP to confirm inflammatory resolution.",
    contraindications: ["Active malignancy", "Pregnancy or lactation"],
    cadences: cad(269, 686, 2260, 296, "Basic"),
    worldLean: "both",
  },
  {
    slug: "glow",
    name: "Glow",
    tagline: "Skin, at the cellular layer.",
    category: "Skin & Longevity",
    bestFor: "Aesthetics-focused adults, 30–60.",
    peptides: [
      { name: "GHK-Cu", dose: "2 mg daily SC", spec: "50 mg/mL · 3 mL vial" },
      { name: "Epitalon", dose: "10 mg daily · 20-day pulse Q3mo SC", spec: "100 mg/mL · 2 mL vial" },
    ],
    synergy: "GHK-Cu rebuilds the extracellular matrix while Epitalon acts on telomerase — surface repair paired with a cellular-age signal.",
    timeline: [
      { wk: "Wk 2", effect: "Skin texture shifts." },
      { wk: "Wk 6", effect: "Firmness improves." },
      { wk: "Wk 12", effect: "Longevity biomarkers reassessed." },
    ],
    panel: "Basic",
    contraindications: ["Active malignancy", "Copper allergy (GHK-Cu)"],
    cadences: cad(229, 584, 1923, 252, "Basic"),
    worldLean: "her",
  },
  {
    slug: "ascend",
    name: "Ascend",
    tagline: "Lean strength, measured.",
    category: "GH Axis & Body Composition",
    bestFor: "Performance and body-composition goals, 28–50.",
    peptides: [
      { name: "CJC-1295 (no-DAC)", dose: "100 mcg nightly SC", spec: "5 mg/mL · 5 mL blend vial" },
      { name: "Ipamorelin", dose: "200 mcg nightly SC", spec: "combined blend vial" },
    ],
    synergy: "CJC-1295 raises GH pulse amplitude; Ipamorelin raises pulse frequency without a cortisol or prolactin spike. Amplitude and frequency, together.",
    timeline: [
      { wk: "Wk 1", effect: "Sleep depth improves." },
      { wk: "Wk 4", effect: "Recovery and lean mass respond." },
      { wk: "Wk 12", effect: "Body-composition shift assessed." },
    ],
    panel: "Full",
    panelNote: "Full panel — IGF-1 is mandatory. A physician holds the protocol if IGF-1 exceeds 300 ng/mL.",
    contraindications: ["Active malignancy", "Pregnancy", "Uncontrolled type 2 diabetes", "Elevated IGF-1 at baseline"],
    cadences: cad(299, 762, 2512, 329, "Elite"),
    worldLean: "him",
  },
  {
    slug: "lucidity",
    name: "Lucidity",
    tagline: "Signal over noise.",
    category: "Cognitive & Focus",
    bestFor: "Founders and executives, 28–55.",
    peptides: [
      { name: "Selank", dose: "300 mcg 2×/day intranasal", spec: "5 mg/mL · 3 mL nasal spray" },
      { name: "Semax", dose: "600 mcg 1×/day intranasal", spec: "10 mg/mL · 3 mL nasal spray" },
    ],
    synergy: "Selank modulates GABA for an anxiolytic floor; Semax upregulates BDNF for focus. Calm and clarity from two directions.",
    timeline: [
      { wk: "Day 1–3", effect: "Focus onset." },
      { wk: "Wk 2", effect: "Mood floor steadies." },
      { wk: "Wk 8", effect: "Executive-function baseline set." },
    ],
    panel: "Basic",
    panelNote: "Basic panel plus TSH.",
    contraindications: ["Pregnancy", "Concurrent psychiatric medication (physician review required)"],
    cadences: cad(259, 660, 2176, 285, "Basic"),
    worldLean: "both",
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Longevity, on three hallmarks.",
    category: "Longevity & Mitochondrial",
    bestFor: "Healthspan-serious adults, 35–65.",
    peptides: [
      { name: "NAD+", dose: "100 mg 3×/week SC", spec: "200 mg/mL · 5 mL vial" },
      { name: "Epitalon", dose: "10 mg daily pulse", spec: "100 mg/mL · 2 mL vial" },
      { name: "MOTS-c", dose: "5 mg 2×/week SC", spec: "10 mg/mL · 2 mL vial" },
    ],
    synergy: "NAD+ restores cellular energy, Epitalon acts on the telomere, MOTS-c signals the mitochondria — three of the recognized hallmarks of aging, addressed in one protocol.",
    timeline: [
      { wk: "Wk 2", effect: "Energy and HRV respond." },
      { wk: "Wk 8", effect: "Metabolic markers move." },
      { wk: "Wk 12", effect: "Mitochondrial and telomere markers reassessed." },
    ],
    panel: "Elite",
    panelNote: "Elite panel, with optional epigenetic-age testing.",
    contraindications: ["Active malignancy", "Pregnancy"],
    cadences: cad(449, 1145, 3772, 494, "Elite"),
    worldLean: "both",
  },
  {
    slug: "ignite",
    name: "Ignite",
    tagline: "The metabolic reset.",
    category: "Metabolic (GLP-1)",
    bestFor: "BMI 27+, 25–65, after medical eligibility review.",
    peptides: [
      { name: "Tirzepatide", dose: "2.5 → 15 mg weekly titration SC", spec: "with glycine + B12 · physician-directed" },
    ],
    synergy: "A GLP-1 / GIP agonist titrated slowly under physician supervision, with metabolic bloodwork gating every dose increase.",
    timeline: [
      { wk: "Wk 1", effect: "Appetite signaling changes." },
      { wk: "Wk 4", effect: "Early metabolic response reviewed." },
      { wk: "Wk 12", effect: "Physician reassesses against bloodwork." },
    ],
    panel: "Full",
    panelNote: "Full panel plus fasting insulin and HOMA-IR for pancreatic safety.",
    contraindications: [
      "Personal or family history of medullary thyroid carcinoma",
      "MEN 2 syndrome",
      "Pregnancy",
      "History of pancreatitis",
    ],
    cadences: [],
    gated: true,
    stateExclusions: ["AK", "AR", "IN", "MI", "MN", "SC"],
    worldLean: "both",
  },
  {
    slug: "threshold",
    name: "Threshold",
    tagline: "Sleep, restored to architecture.",
    category: "Sleep & HRV",
    bestFor: "High-stress professionals, 30–60.",
    peptides: [
      { name: "DSIP", dose: "100 mcg nightly SC", spec: "2 mg/mL · 3 mL vial" },
      { name: "Epitalon", dose: "10 mg nightly SC", spec: "100 mg/mL · 2 mL vial" },
    ],
    synergy: "DSIP induces deep sleep; Epitalon regulates the pineal melatonin rhythm. Onset and architecture, addressed together.",
    timeline: [
      { wk: "Night 1", effect: "Onset improves." },
      { wk: "Wk 2", effect: "Deep-sleep percentage rises." },
      { wk: "Wk 8", effect: "HRV baseline shifts." },
    ],
    panel: "Basic",
    contraindications: ["Pregnancy", "Concurrent SSRI/SNRI (flagged for physician review)"],
    cadences: cad(199, 507, 1672, 219, "Basic"),
    worldLean: "both",
  },
];

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
    freeWith: "Free with any 12-month subscription",
    summary: "Baseline safety screen — the floor under any protocol.",
    adds: ["CBC with differential", "Comprehensive metabolic panel", "Lipid panel", "HbA1c", "Fasting glucose + insulin", "hs-CRP", "TSH"],
    retest: "Baseline · Month 3",
  },
  {
    tier: "Full",
    price: 199,
    freeWith: "Bundled in 3- and 12-month stacks",
    summary: "Everything in Basic, plus the hormonal and GH-axis panel.",
    adds: ["Total T · Free T · SHBG · Estradiol (sensitive)", "LH · FSH · Prolactin", "Free T3 · Free T4 · Reverse T3", "IGF-1 (mandatory for any GH-axis peptide)", "DHEA-S · AM Cortisol", "Vit D · B12 · Ferritin · Homocysteine", "ALT/AST/GGT", "Uric acid"],
    retest: "Baseline · Month 3 · Month 6",
  },
  {
    tier: "Elite",
    price: 399,
    freeWith: "Bundled in Meridian and 12-month Ignite / Ascend",
    summary: "Everything in Full, plus advanced cardiometabolic and inflammatory depth.",
    adds: ["Apolipoprotein B · Lp(a) · LDL particle count", "Fasting insulin · HOMA-IR · C-peptide", "Adiponectin · Leptin", "IL-6 · TNF-α", "Full iron panel", "HRV wearable integration (baseline)", "Optional: epigenetic age testing"],
    retest: "Baseline · Month 3 · Month 6 · Month 12",
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
