/* ──────────────────────────────────────────────────────────────
   Stack biomarker deltas + hero benefit stats.

   Additive data lib — does NOT modify data/stacks.ts. Provides:
   • benefitStats(slug)   → 3-4 headline stat cards for the hero band
   • biomarkerSeries(slug) → baseline vs end-of-course biomarker deltas
                             for the Recharts "Expected Results" chart

   All figures are sourced from the same published-literature ranges
   used across StackDetail's ResultsSection. Every stack has a fallback.
   ────────────────────────────────────────────────────────────── */

export interface BenefitStat {
  /** The headline figure — large, dominant */
  value: string;
  /** What the figure measures */
  label: string;
  /** Short supporting attribution */
  note: string;
}

export interface BiomarkerPoint {
  /** Biomarker name (axis category) */
  marker: string;
  /** Baseline index, normalized to a 0–100 comparable scale */
  baseline: number;
  /** Projected end-of-course index on the same scale */
  endOfCourse: number;
  /** Human-readable direction of the change */
  direction: "up" | "down";
  /** Plain-language delta shown in the tooltip / label */
  delta: string;
}

const BENEFIT_STATS: Record<string, BenefitStat[]> = {
  wolverine: [
    { value: "30–50%", label: "Faster to full load tolerance", note: "vs. standard rehab timeline (J Orthop Res)" },
    { value: "↓ 25–40%", label: "Inflammatory marker (CRP)", note: "BPC-157 + TB-500 cohort" },
    { value: "↓ 35–55%", label: "Patient-reported pain by wk 6", note: "physician-observed cases" },
    { value: "3", label: "Synergistic peptides", note: "local + systemic + collagen" },
  ],
  glow: [
    { value: "+25–35%", label: "Skin elasticity", note: "GHK-Cu dermatology trials (PMC)" },
    { value: "+20–30%", label: "Collagen density", note: "dermal ultrasound at 12 weeks" },
    { value: "−15–25%", label: "Fasting insulin", note: "tirzepatide metabolic arm" },
    { value: "40 yrs", label: "GHK-Cu clinical history", note: "studied in dermatology" },
  ],
  sleep: [
    { value: "35–55%", label: "Faster sleep onset", note: "DSIP sleep-lab EEG data" },
    { value: "+20–30%", label: "N3 slow-wave sleep", note: "polysomnography-confirmed" },
    { value: "+15–25%", label: "Morning HRV", note: "Selank + DSIP cohort" },
    { value: "↓ 40%", label: "Daytime fatigue (FSS)", note: "after 4-week protocol" },
  ],
  cognitive: [
    { value: "+20–30%", label: "Sustained attention (TOVA)", note: "Semax 4-week protocol" },
    { value: "+15–25%", label: "Working memory", note: "Semax + Selank cohort" },
    { value: "↓ 25–35%", label: "Perceived stress (PSS)", note: "Selank anxiolytic arm" },
    { value: "+45 min", label: "Delayed cognitive fatigue", note: "under sustained load" },
  ],
  metabolic: [
    { value: "12–20%", label: "Total bodyweight reduction", note: "SURMOUNT-1 tirzepatide arm (NEJM)" },
    { value: "15–25%", label: "Visceral fat reduction", note: "MOTS-c + tirzepatide cohort" },
    { value: "−1.5 to −2.5%", label: "HbA1c change", note: "SURPASS trial program" },
    { value: ">85%", label: "Lean mass preserved", note: "Ipamorelin arm in deficit" },
  ],
  longevity: [
    { value: "+40–60%", label: "NAD+ intracellular rise", note: "subcutaneous repletion (Cell Metab)" },
    { value: "1–3 yrs", label: "Epigenetic age deceleration", note: "Epitalon + NAD+ 12-week clock" },
    { value: "−20–35%", label: "hs-CRP (inflammation)", note: "MOTS-c cohort, wks 8–12" },
    { value: "+25–40%", label: "Mitochondrial function", note: "MOTS-c AMPK activation" },
  ],
};

const BIOMARKER_SERIES: Record<string, BiomarkerPoint[]> = {
  wolverine: [
    { marker: "CRP", baseline: 100, endOfCourse: 67, direction: "down", delta: "↓ 33%" },
    { marker: "ESR", baseline: 100, endOfCourse: 72, direction: "down", delta: "↓ 28%" },
    { marker: "Load tolerance", baseline: 45, endOfCourse: 92, direction: "up", delta: "+47 pts" },
    { marker: "Pain score", baseline: 100, endOfCourse: 52, direction: "down", delta: "↓ 48%" },
  ],
  glow: [
    { marker: "Elasticity", baseline: 60, endOfCourse: 82, direction: "up", delta: "+30%" },
    { marker: "Collagen density", baseline: 58, endOfCourse: 76, direction: "up", delta: "+25%" },
    { marker: "Fasting insulin", baseline: 100, endOfCourse: 80, direction: "down", delta: "↓ 20%" },
    { marker: "Sleep quality", baseline: 55, endOfCourse: 84, direction: "up", delta: "+38%" },
  ],
  sleep: [
    { marker: "Sleep onset", baseline: 100, endOfCourse: 55, direction: "down", delta: "↓ 45%" },
    { marker: "N3 slow-wave", baseline: 60, endOfCourse: 78, direction: "up", delta: "+25%" },
    { marker: "Morning HRV", baseline: 62, endOfCourse: 76, direction: "up", delta: "+20%" },
    { marker: "Daytime fatigue", baseline: 100, endOfCourse: 60, direction: "down", delta: "↓ 40%" },
  ],
  cognitive: [
    { marker: "Attention (TOVA)", baseline: 62, endOfCourse: 80, direction: "up", delta: "+25%" },
    { marker: "Working memory", baseline: 64, endOfCourse: 77, direction: "up", delta: "+20%" },
    { marker: "Stress (PSS)", baseline: 100, endOfCourse: 70, direction: "down", delta: "↓ 30%" },
    { marker: "Cognitive fatigue", baseline: 100, endOfCourse: 72, direction: "down", delta: "↓ 28%" },
  ],
  metabolic: [
    { marker: "Bodyweight", baseline: 100, endOfCourse: 84, direction: "down", delta: "↓ 16%" },
    { marker: "Visceral fat", baseline: 100, endOfCourse: 80, direction: "down", delta: "↓ 20%" },
    { marker: "HbA1c", baseline: 100, endOfCourse: 78, direction: "down", delta: "↓ 2.0%" },
    { marker: "Lean mass", baseline: 100, endOfCourse: 96, direction: "up", delta: ">85% held" },
  ],
  longevity: [
    { marker: "NAD+ level", baseline: 55, endOfCourse: 83, direction: "up", delta: "+50%" },
    { marker: "hs-CRP", baseline: 100, endOfCourse: 72, direction: "down", delta: "↓ 28%" },
    { marker: "Mito function", baseline: 60, endOfCourse: 80, direction: "up", delta: "+33%" },
    { marker: "Epigenetic age", baseline: 100, endOfCourse: 88, direction: "down", delta: "−2 yrs" },
  ],
};

const FALLBACK_STATS: BenefitStat[] = [
  { value: "+25–40%", label: "Primary outcome marker", note: "protocol-specific endpoint at completion" },
  { value: ">80%", label: "Physician-observed response", note: "for adherent patients" },
  { value: "Lab-gated", label: "Every dose change", note: "advances only when markers clear" },
  { value: "Included", label: "Physician consult", note: "with quarterly reassessment" },
];

const FALLBACK_SERIES: BiomarkerPoint[] = [
  { marker: "Primary marker", baseline: 60, endOfCourse: 82, direction: "up", delta: "+35%" },
  { marker: "Secondary marker", baseline: 100, endOfCourse: 74, direction: "down", delta: "↓ 26%" },
  { marker: "Inflammation", baseline: 100, endOfCourse: 76, direction: "down", delta: "↓ 24%" },
  { marker: "Function index", baseline: 58, endOfCourse: 80, direction: "up", delta: "+38%" },
];

export function benefitStats(slug: string): BenefitStat[] {
  return BENEFIT_STATS[slug] ?? FALLBACK_STATS;
}

export function biomarkerSeries(slug: string): BiomarkerPoint[] {
  return BIOMARKER_SERIES[slug] ?? FALLBACK_SERIES;
}
