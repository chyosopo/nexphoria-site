/* ══ Bloodwork page content — extracted from Bloodwork.tsx ══
   Static copy, artwork maps, tints, and sample readouts live here so the
   page component stays lean and the data is reviewable in one place.
   No PHI: every value below is illustrative marketing sample data. */
import { PANEL_TOTAL_MARKERS } from "./biomarkerPanel";

/* Organ/system icon keys — resolved to lucide components in the page */
export const PANEL_ICON_KEYS: Record<string, string> = {
  heart: "HeartPulse", metabolism: "Flame", hormones: "Activity", stress: "Brain",
  thyroid: "Gauge", kidneys: "Droplets", liver: "Filter", immunity: "Shield",
  nutrients: "Apple", blood: "TestTube", "bio-age": "Hourglass",
};

/* Porcelain-kintsugi organ artwork — one per system */
export const PANEL_ART: Record<string, string> = {
  "heart": "img/img_08bfaa5f6c9d.webp",
  "metabolism": "img/img_ffdd72440251.webp",
  "hormones": "img/img_427d5e7427b9.webp",
  "stress": "img/img_e9c5c7ee0119.webp",
  "thyroid": "img/img_6bee78326414.webp",
  "kidneys": "img/img_b4724ee2f1a5.webp",
  "liver": "img/img_73925dec188f.webp",
  "immunity": "img/img_0b920f85116d.webp",
  "nutrients": "img/img_3a64b1f2aca5.webp",
  "blood": "img/img_e5ee8619d3f5.webp",
  "bio-age": "img/img_c4bef27c5b72.webp",
};

/* Systems-mosaic tints — [background, ink] per system */
export const PANEL_TINTS: Record<string, [string, string]> = {
  heart: ["var(--nx-ice)", "#38568A"], metabolism: ["#CEE0F6", "#22518A"],
  hormones: ["#D2E3F7", "var(--nx-amber)"], stress: ["#D0DEEF", "#2E507A"],
  thyroid: ["#D3E3F7", "#2A558A"], kidneys: ["#DCE5EF", "#4A596B"],
  liver: ["#D3E1F3", "#1B4477"], immunity: ["#D2DCE9", "#34465B"],
  nutrients: ["#D9E1EA", "#3E545B"], blood: ["var(--nx-ice)", "#38568A"],
  "bio-age": ["#D2E1F3", "var(--nx-cobalt)"],
};

/* Hero glass-card sample readout — illustrative only, cast per world so her
   lab panel leads with her markers (not Total Testosterone). */
type SampleRow = { m: string; v: string; u: string; d: string };
export const HERO_SAMPLE_ROWS: SampleRow[] = [
  { m: "Total Testosterone", v: "742", u: "ng/dL", d: "+69%" },
  { m: "IGF-1", v: "218", u: "ng/mL", d: "+44%" },
  { m: "hs-CRP", v: "0.4", u: "mg/L", d: "−81%" },
  { m: "HbA1c", v: "5.1", u: "%", d: "−0.4" },
  { m: "Vitamin D", v: "62", u: "ng/mL", d: "+29" },
];
export const HERO_SAMPLE_ROWS_WOMEN: SampleRow[] = [
  { m: "Estradiol", v: "48", u: "pg/mL", d: "+22%" },
  { m: "Free T3", v: "3.4", u: "pg/mL", d: "+18%" },
  { m: "Ferritin", v: "68", u: "ng/mL", d: "+34" },
  { m: "hs-CRP", v: "0.4", u: "mg/L", d: "−81%" },
  { m: "Vitamin D", v: "62", u: "ng/mL", d: "+29" },
];
export const heroSampleRows = (world: "men" | "women"): SampleRow[] =>
  world === "women" ? HERO_SAMPLE_ROWS_WOMEN : HERO_SAMPLE_ROWS;

/* Results-dashboard sample rows — illustrative only */
export const RESULTS_ROWS: { m: string; v: number; lo: number; hi: number; opt: [number, number]; unit: string; s: string }[] = [
  { m: "Apolipoprotein B", v: 72, lo: 40, hi: 130, opt: [40, 80], unit: "mg/dL", s: "Optimal" },
  { m: "hs-CRP", v: 0.8, lo: 0, hi: 5, opt: [0, 1], unit: "mg/L", s: "Optimal" },
  { m: "Free T3", v: 3.1, lo: 2.0, hi: 4.4, opt: [3.0, 4.0], unit: "pg/mL", s: "In range" },
  { m: "HbA1c", v: 5.6, lo: 4.0, hi: 7.0, opt: [4.0, 5.4], unit: "%", s: "Watch" },
];

/* Glowing-body surface pills — what one draw can surface */
export const SURFACE_PILLS: { t: string; x: string; y: string; hot?: boolean }[] = [
  { t: "Insulin resistance", x: "4%", y: "12%", hot: true },
  { t: "Chronic inflammation", x: "62%", y: "8%", hot: true },
  { t: "Low testosterone", x: "72%", y: "30%" },
  { t: "Hypothyroidism", x: "2%", y: "36%" },
  { t: "Vitamin D deficiency", x: "68%", y: "56%", hot: true },
  { t: "Elevated ApoB", x: "6%", y: "62%", hot: true },
  { t: "B12 deficiency", x: "70%", y: "78%" },
  { t: "Liver stress", x: "8%", y: "84%" },
];

/* Bloodwork FAQ — feeds faqJsonLd AND renders visibly on /bloodwork (a
   FAQPage schema for invisible content risks a rich-result penalty).
   Fleet-audit fix: the old answer hardcoded a "38-Biomarker Panel" under a
   page that says 99 everywhere — the count now derives from the panel data. */
export const BLOODWORK_FAQ_ITEMS = [
  {
    q: "What bloodwork is part of my plan?",
    a: `A full blood panel of ${PANEL_TOTAL_MARKERS} markers is drawn at week 12 of your plan, included: sugar and insulin, cholesterol and heart, liver and kidneys, hormones, and blood and nutrients. You start first. We send you what you need for the draw as week 12 approaches.`,
  },
  {
    q: "How often is blood drawn?",
    a: "Once, at week 12 of your plan, and it is included. Your doctor reads it and may adjust your dose or your plan from what it shows.",
  },
  {
    q: "Who reads my bloodwork?",
    a: "Your doctor, a board-certified U.S. licensed physician. They read every marker against the plan you are on and come back with a decision: continue, adjust, or a question for you.",
  },
  {
    q: "Can I use bloodwork I already have?",
    a: "Often, yes. If you have recent results from a CLIA-certified lab that cover the markers in the panel, your doctor may read those. Bring them to your questionnaire. Your doctor decides.",
  },
];
