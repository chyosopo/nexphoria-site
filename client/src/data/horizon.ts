/* ═══ The horizon: when you feel it, drawn ═══
   The catalog's feelBy / fullEffect lines, as numbers a bar can draw.
   Weeks-mode products sit on a twelve-week bar with the baseline kit at
   week 0 and the retest at week 12; hours-mode products (taken on the day)
   sit on a 24-hour bar with onset and the active window. Ranges are the
   catalog's own words; "beyond" means the full effect keeps building past
   the bar. Never a promised result: the bar says WHEN, the copy says WHAT. */
import { RETEST_WEEK } from "@/data/monitoring";

export type Horizon =
  | { kind: "weeks"; feel: [number, number]; feelLabel: string; full: [number, number] | "ongoing"; fullLabel: string }
  | { kind: "hours"; onset: [number, number]; onsetLabel: string; active: [number, number]; activeLabel: string };

export const BAR_WEEKS = RETEST_WEEK;
export const BAR_HOURS = 24;

const w = (feel: [number, number], feelLabel: string, full: [number, number] | "ongoing", fullLabel: string): Horizon => ({ kind: "weeks", feel, feelLabel, full, fullLabel });
const h = (onset: [number, number], onsetLabel: string, active: [number, number], activeLabel: string): Horizon => ({ kind: "hours", onset, onsetLabel, active, activeLabel });

export const HORIZON: Record<string, Horizon> = {
  sermorelin: w([2, 4], "Sleep first, weeks 2 to 4", [8, 12], "Body composition, weeks 8 to 12"),
  "ipa-cjc": w([1, 4], "Sleep in a week", [8, 12], "Body, weeks 8 to 12"),
  tesamorelin: w([4, 8], "Weeks 4 to 8", [12, 16], "Week 12 and beyond"),
  selank: w([0, 1], "Same day to a week", [2, 4], "Weeks 2 to 4"),
  semax: w([0, 1], "Same day to a week", [2, 4], "Weeks 2 to 4"),
  "bpc-157": w([0, 2], "Gut in days, tissue in 1 to 2 weeks", [4, 8], "Weeks 4 to 8"),
  "tb-500": w([2, 3], "Weeks 2 to 3", [6, 8], "Weeks 6 to 8"),
  "bpc-tb-combo": w([0, 3], "Gut in days, tissue in 1 to 3 weeks", [6, 8], "Weeks 6 to 8"),
  "ghk-cu": w([3, 4], "Skin, weeks 3 to 4", [8, 12], "Weeks 8 to 12"),
  epitalon: w([1, 2], "Sleep, weeks 1 to 2", [3, 3], "Per 20-day course"),
  "nad-plus": w([0, 2], "Energy, days to 2 weeks", "ongoing", "Builds while you take it"),
  "mots-c": w([2, 4], "Weeks 2 to 4", [8, 12], "Weeks 8 to 12"),
  semaglutide: w([1, 1], "Appetite in week 1", [24, 52], "Weight, months 6 to 12"),
  tirzepatide: w([1, 1], "Appetite in week 1", [24, 52], "Weight, months 6 to 12"),
  dsip: w([0, 1], "The first nights", "ongoing", "Nightly, while you take it"),
  "thymosin-a1": w([2, 4], "Weeks 2 to 4", "ongoing", "Through the season"),
  "aod-9604": w([2, 6], "Weeks", [12, 12], "Week 12"),
  testosterone: w([2, 6], "Energy and drive, weeks 2 to 6", [12, 26], "Body, months 3 to 6"),
  kisspeptin: w([2, 6], "Weeks", "ongoing", "The axis, while you take it"),
  "pt-141": h([0.75, 2], "About 45 minutes to 2 hours", [2, 10], "Active for several hours"),
  oxytocin: h([0.25, 1], "Within the hour", [1, 3], "A few hours"),
  tadalafil: h([0.33, 0.5], "20 to 30 minutes", [0.5, 24], "Active for more than a day"),
};

export function horizonFor(slug: string): Horizon | undefined {
  return HORIZON[slug];
}
