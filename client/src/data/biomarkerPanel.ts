/* ─────────────────────────────────────────────────────────────
   Biomarker Panel — Hims Labs–style taxonomy (Nexphoria voice)
   11 categories · 76 individual markers · plus 21-factor Bio Age
   ───────────────────────────────────────────────────────────── */

export type PanelCategory = {
  id: string;
  name: string;
  eyebrow: string;
  count: number;
  blurb: string;
  markers: { name: string; note?: string }[];
};

const twoX = "Tested 2× / year";

export const BIOMARKER_PANEL: PanelCategory[] = [
  {
    id: "heart",
    name: "Heart",
    eyebrow: "Cardiovascular",
    count: 9,
    blurb:
      "Your heart delivers oxygen and nutrients to every cell. Cholesterol and inflammation markers are how we read cardiovascular risk — long before a symptom shows up.",
    markers: [
      { name: "Apolipoprotein B" },
      { name: "High-Sensitivity C-Reactive Protein", note: twoX },
      { name: "Lipoprotein (a)" },
      { name: "Non-HDL Cholesterol", note: twoX },
      { name: "HDL Cholesterol", note: twoX },
      { name: "LDL Cholesterol", note: twoX },
      { name: "Total Cholesterol", note: twoX },
      { name: "Cholesterol / HDL Ratio", note: twoX },
      { name: "Triglycerides", note: twoX },
    ],
  },
  {
    id: "metabolism",
    name: "Metabolism",
    eyebrow: "Energy · fuel",
    count: 4,
    blurb:
      "Your metabolism fuels every organ. Blood sugar and insulin markers tell us whether the engine is running smoothly — and whether a peptide is helping or hiding a problem.",
    markers: [
      { name: "Uric Acid" },
      { name: "Glucose", note: twoX },
      { name: "Hemoglobin A1c (HbA1c)", note: twoX },
      { name: "Insulin", note: twoX },
    ],
  },
  {
    id: "hormones",
    name: "Hormones",
    eyebrow: "Endocrine",
    count: 9,
    blurb:
      "Hormones are the messengers behind energy, mood, muscle, and sex drive. These markers show whether your endocrine system is in balance — and where a growth-hormone or HPTA-support peptide belongs.",
    markers: [
      { name: "Insulin-like Growth Factor 1 (IGF-1)" },
      { name: "IGF-1 Z-score" },
      { name: "Estradiol" },
      { name: "Follicle Stimulating Hormone (FSH)" },
      { name: "Luteinizing Hormone (LH)" },
      { name: "Prostate Specific Antigen (PSA)" },
      { name: "Sex Hormone Binding Globulin (SHBG)" },
      { name: "Free Testosterone", note: twoX },
      { name: "Total Testosterone", note: twoX },
    ],
  },
  {
    id: "stress",
    name: "Stress",
    eyebrow: "Cortisol axis",
    count: 2,
    blurb:
      "How your body handles stress shows up in inflammation and cortisol. These markers tell us whether recovery peptides are actually reaching the nervous system — not just the muscle.",
    markers: [{ name: "Cortisol" }, { name: "DHEA-S" }],
  },
  {
    id: "thyroid",
    name: "Thyroid",
    eyebrow: "Metabolic thermostat",
    count: 5,
    blurb:
      "Your thyroid sets the pace of everything from body temperature to weight. If it's over- or under-active, these markers surface it — and rule it out before we blame anything else.",
    markers: [
      { name: "Thyroglobulin Antibodies (TgAb)" },
      { name: "Thyroid Peroxidase Antibodies (TPOAb)" },
      { name: "Free Triiodothyronine (T3)" },
      { name: "Thyroid-Stimulating Hormone (TSH)", note: twoX },
      { name: "Free Thyroxine (T4)", note: twoX },
    ],
  },
  {
    id: "kidneys",
    name: "Kidneys",
    eyebrow: "Filtration",
    count: 4,
    blurb:
      "Your kidneys filter waste and balance fluids. Every peptide we prescribe passes their radar — so we test filtration before, during, and after every protocol.",
    markers: [
      { name: "Blood Urea Nitrogen (BUN)", note: twoX },
      { name: "BUN / Creatinine Ratio", note: twoX },
      { name: "Creatinine", note: twoX },
      { name: "Estimated Glomerular Filtration Rate (eGFR)", note: twoX },
    ],
  },
  {
    id: "liver",
    name: "Liver",
    eyebrow: "Detox · metabolism",
    count: 8,
    blurb:
      "Your liver processes nutrients, filters toxins, and clears every compound you take. Liver enzymes tell us it's doing that safely — the non-negotiable floor for any therapy.",
    markers: [
      { name: "Alanine Transaminase (ALT)", note: twoX },
      { name: "Aspartate Aminotransferase (AST)", note: twoX },
      { name: "Alkaline Phosphatase (ALP)", note: twoX },
      { name: "Albumin", note: twoX },
      { name: "Total Bilirubin", note: twoX },
      { name: "Total Protein", note: twoX },
      { name: "Globulin", note: twoX },
      { name: "Albumin / Globulin (A/G) Ratio", note: twoX },
    ],
  },
  {
    id: "immunity",
    name: "Immunity",
    eyebrow: "White cell lineage",
    count: 12,
    blurb:
      "Immunity is your readiness to fight infection, respond to allergens, and recover. White-blood-cell subtypes and the SII index gauge overall wellness in a single lens.",
    markers: [
      { name: "Basophils (absolute count)", note: twoX },
      { name: "Basophils (percentage)", note: twoX },
      { name: "Eosinophils (absolute count)", note: twoX },
      { name: "Eosinophils (percentage)", note: twoX },
      { name: "Lymphocytes (absolute count)", note: twoX },
      { name: "Lymphocytes (percentage)", note: twoX },
      { name: "Monocytes (absolute count)", note: twoX },
      { name: "Monocytes (percentage)", note: twoX },
      { name: "Neutrophils (absolute count)", note: twoX },
      { name: "Neutrophils (percentage)", note: twoX },
      { name: "White Blood Cell Count", note: twoX },
      { name: "Systemic Immune-Inflammation Index (SII)", note: twoX },
    ],
  },
  {
    id: "nutrients",
    name: "Nutrients",
    eyebrow: "Building blocks",
    count: 16,
    blurb:
      "Nutrients power immunity, energy, muscle function, and long-term health. These levels tell us whether your body is actually receiving what a peptide protocol needs to work.",
    markers: [
      { name: "Vitamin B12" },
      { name: "Ferritin" },
      { name: "Ferritin / CRP Ratio" },
      { name: "Folate, RBC" },
      { name: "Homocysteine" },
      { name: "Iron" },
      { name: "Iron Binding Capacity" },
      { name: "Iron % Saturation" },
      { name: "Magnesium, RBC" },
      { name: "Vitamin D" },
      { name: "Zinc" },
      { name: "Carbon Dioxide", note: twoX },
      { name: "Calcium", note: twoX },
      { name: "Chloride", note: twoX },
      { name: "Potassium", note: twoX },
      { name: "Sodium", note: twoX },
    ],
  },
  {
    id: "blood",
    name: "Blood",
    eyebrow: "Cellular transport",
    count: 9,
    blurb:
      "Your blood carries oxygen, nutrients, and immune cells while pulling toxins out. Red-cell and platelet counts confirm the transport layer is intact — a floor no protocol crosses.",
    markers: [
      { name: "Hematocrit", note: twoX },
      { name: "Hemoglobin", note: twoX },
      { name: "Mean Corpuscular Hemoglobin Concentration (MCHC)", note: twoX },
      { name: "Mean Corpuscular Hemoglobin (MCH)", note: twoX },
      { name: "Mean Corpuscular Volume (MCV)", note: twoX },
      { name: "Mean Platelet Volume (MPV)", note: twoX },
      { name: "Platelet Count", note: twoX },
      { name: "Red Blood Cell Count", note: twoX },
      { name: "Red Cell Distribution Width (RDW)", note: twoX },
    ],
  },
  {
    id: "bio-age",
    name: "Biological Age",
    eyebrow: "Longevity composite",
    count: 21,
    blurb:
      "A 21-factor composite that reveals how fast your body is aging — versus the calendar. Improving the levers behind it is how a longevity protocol earns its name.",
    markers: [{ name: "21-factor composite score" }],
  },
];

export const PANEL_TOTAL_MARKERS = BIOMARKER_PANEL.reduce((n, c) => n + c.count, 0);
export const PANEL_CATEGORY_COUNT = BIOMARKER_PANEL.length;
