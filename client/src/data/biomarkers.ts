import type { Biomarker } from "@/components/BiomarkerCard";

/* ─────────────────────────────────────────────────────────────
   Biomarker sample dataset — AGENT-3
   Illustrative 90-day trajectory data for the Bloodwork panel.
   History arrays run oldest → newest (baseline → wk 12).
   Not real patient data.
   ───────────────────────────────────────────────────────────── */

export const BIOMARKERS: Biomarker[] = [
  {
    name: "IGF-1",
    abbr: "Somatomedin C",
    value: 218,
    unit: "ng/mL",
    refLow: 88,
    refHigh: 246,
    refLabel: "88–246",
    history: [151, 168, 186, 201, 212, 218],
    status: "optimal",
    interpretation:
      "Up 44% from baseline after CJC-1295 / Ipamorelin. Now in the upper-quartile band that tracks with lean-mass gain and connective-tissue repair.",
    category: "Growth axis",
  },
  {
    name: "Total Testosterone",
    abbr: "Total T",
    value: 742,
    unit: "ng/dL",
    refLow: 264,
    refHigh: 916,
    refLabel: "264–916",
    history: [438, 512, 604, 671, 718, 742],
    status: "optimal",
    interpretation:
      "Endogenous production restored via HPG-axis support. A 69% rise without exogenous hormone preserves testicular function and fertility.",
    category: "Androgen",
  },
  {
    name: "hs-CRP",
    abbr: "Inflammation",
    value: 0.4,
    unit: "mg/L",
    refLow: 0,
    refHigh: 1.0,
    refLabel: "< 1.0",
    history: [2.1, 1.6, 1.1, 0.8, 0.6, 0.4],
    status: "optimal",
    interpretation:
      "High-sensitivity CRP fell 81% into the low-cardiovascular-risk band. BPC-157 and systemic recovery reduced background inflammatory load.",
    category: "Inflammation",
  },
  {
    name: "HbA1c",
    abbr: "Glycation",
    value: 5.1,
    unit: "%",
    refLow: 4.0,
    refHigh: 5.6,
    refLabel: "4.0–5.6",
    history: [5.9, 5.7, 5.5, 5.3, 5.2, 5.1],
    status: "optimal",
    interpretation:
      "Three-month glucose average moved out of pre-diabetic range. MOTS-c-driven insulin sensitivity lowered glycation by 14%.",
    category: "Metabolic",
  },
  {
    name: "Cortisol, AM",
    abbr: "Stress axis",
    value: 13.2,
    unit: "µg/dL",
    refLow: 6.2,
    refHigh: 19.4,
    refLabel: "6.2–19.4",
    history: [22.4, 19.8, 17.1, 15.0, 13.9, 13.2],
    status: "in-range",
    interpretation:
      "Morning cortisol normalized from an elevated baseline. Sleep-architecture recovery and DSIP support lowered HPA-axis drive by 41%.",
    category: "Adrenal",
  },
  {
    name: "DHEA-S",
    abbr: "Adrenal reserve",
    value: 348,
    unit: "µg/dL",
    refLow: 138,
    refHigh: 475,
    refLabel: "138–475",
    history: [206, 244, 281, 309, 332, 348],
    status: "optimal",
    interpretation:
      "Adrenal androgen reserve up 69%, restoring the DHEA-to-cortisol ratio that governs recovery capacity and libido.",
    category: "Adrenal",
  },
  {
    name: "Fasting Glucose",
    abbr: "FBG",
    value: 86,
    unit: "mg/dL",
    refLow: 65,
    refHigh: 99,
    refLabel: "65–99",
    history: [104, 98, 94, 90, 88, 86],
    status: "optimal",
    interpretation:
      "Fasting glucose down 17% into the optimal band, confirming improved hepatic insulin sensitivity ahead of any HbA1c shift.",
    category: "Metabolic",
  },
  {
    name: "Free Testosterone",
    abbr: "Free T",
    value: 19.8,
    unit: "pg/mL",
    refLow: 9.3,
    refHigh: 26.5,
    refLabel: "9.3–26.5",
    history: [10.1, 12.8, 15.4, 17.2, 18.9, 19.8],
    status: "optimal",
    interpretation:
      "Bioavailable testosterone nearly doubled as SHBG normalized, driving the fraction that actually reaches androgen receptors.",
    category: "Androgen",
  },
  {
    name: "Vitamin D, 25-OH",
    abbr: "25(OH)D",
    value: 52,
    unit: "ng/mL",
    refLow: 30,
    refHigh: 100,
    refLabel: "30–100",
    history: [24, 31, 38, 44, 49, 52],
    status: "in-range",
    interpretation:
      "Corrected from insufficiency into the immune-optimal band. Repletion supports testosterone synthesis and recovery signaling.",
    category: "Micronutrient",
  },
  {
    name: "Estradiol, Sensitive",
    abbr: "E2",
    value: 27,
    unit: "pg/mL",
    refLow: 8,
    refHigh: 43,
    refLabel: "8–43",
    history: [19, 21, 24, 26, 27, 27],
    status: "in-range",
    interpretation:
      "Estradiol held in the balanced band as testosterone rose — aromatase kept in check without an inhibitor, protecting bone and mood.",
    category: "Androgen",
  },
  {
    name: "SHBG",
    abbr: "Binding globulin",
    value: 34,
    unit: "nmol/L",
    refLow: 16.5,
    refHigh: 55.9,
    refLabel: "16.5–55.9",
    history: [48, 44, 40, 37, 35, 34],
    status: "in-range",
    interpretation:
      "Sex-hormone-binding globulin trended down 29%, freeing bound testosterone as metabolic health improved.",
    category: "Androgen",
  },
  {
    name: "TSH",
    abbr: "Thyroid",
    value: 1.8,
    unit: "µIU/mL",
    refLow: 0.4,
    refHigh: 4.5,
    refLabel: "0.4–4.5",
    history: [2.6, 2.3, 2.1, 1.9, 1.8, 1.8],
    status: "in-range",
    interpretation:
      "Thyroid-stimulating hormone stable in the mid-optimal band, confirming the protocol did not stress thyroid output.",
    category: "Thyroid",
  },
];

/* ── "What we test" categorized panel list ──────────────────── */
export interface PanelCategory {
  name: string;
  count: number;
  markers: string[];
}

export const TEST_PANELS: PanelCategory[] = [
  {
    name: "Hormone & Androgen",
    count: 9,
    markers: [
      "Total Testosterone",
      "Free Testosterone",
      "Estradiol (Sensitive)",
      "SHBG",
      "LH",
      "FSH",
      "Prolactin",
      "DHEA-S",
      "Progesterone",
    ],
  },
  {
    name: "Growth & Recovery",
    count: 4,
    markers: ["IGF-1", "IGFBP-3", "Creatine Kinase", "Ferritin"],
  },
  {
    name: "Metabolic",
    count: 7,
    markers: [
      "Fasting Glucose",
      "HbA1c",
      "Fasting Insulin",
      "HOMA-IR",
      "Total Cholesterol",
      "LDL / HDL",
      "Triglycerides",
    ],
  },
  {
    name: "Inflammation & Cardiac",
    count: 4,
    markers: ["hs-CRP", "Homocysteine", "Lipoprotein(a)", "ApoB"],
  },
  {
    name: "Thyroid & Adrenal",
    count: 5,
    markers: ["TSH", "Free T4", "Free T3", "Cortisol AM", "Reverse T3"],
  },
  {
    name: "Organ & Micronutrient",
    count: 9,
    markers: [
      "Comprehensive Metabolic Panel",
      "CBC with Differential",
      "Vitamin D, 25-OH",
      "Vitamin B12",
      "Folate",
      "Magnesium",
      "PSA (male)",
      "Liver Enzymes",
      "eGFR",
    ],
  },
];

export const TOTAL_MARKERS = TEST_PANELS.reduce((s, p) => s + p.count, 0);
