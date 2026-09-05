/* ─────────────────────────────────────────────────────────────
   Biomarker panel: the full week-12 panel, derived from data/monitoring.ts
   (docs/MASTER-PLAN.md Part 1; Chiya 2026-09-02: one full panel for
   everyone, at week 12, included). PANEL_TOTAL_MARKERS is the site's single
   source of truth for every marker-count claim; never type the number.
   Each marker carries the reason it is drawn, in the reader's words.
   ───────────────────────────────────────────────────────────── */
import { FULL_PANEL } from "./monitoring";

export type PanelCategory = {
  id: string;
  name: string;
  eyebrow: string;
  count: number;
  blurb: string;
  markers: { name: string; note?: string }[];
};

const IDS: Record<string, string> = {
  "Sugar and insulin": "metabolism",
  "Cholesterol and heart": "heart",
  "Liver, kidneys and pancreas": "liver",
  "Hormones": "hormones",
  "Blood and nutrients": "blood",
};

const BLURBS: Record<string, string> = {
  "Sugar and insulin": "How the body handles food. Usually the first thing a weight plan changes, and the clearest proof it is working.",
  "Cholesterol and heart": "The numbers a physician tracks for heart risk over time, and what weight change and tesamorelin are expected to move.",
  "Liver, kidneys and pancreas": "The organs that process the medication. The physician checks they are handling it well.",
  "Hormones": "Energy, muscle, desire, thyroid and stress. Context for how a person feels, and the number tesamorelin's dose is set against.",
  "Blood and nutrients": "A general health check, plus the deficiencies that quietly drain energy and are easy to fix.",
};

export const BIOMARKER_PANEL: PanelCategory[] = FULL_PANEL.map((g, i) => ({
  id: IDS[g.name] ?? `group-${i + 1}`,
  name: g.name,
  eyebrow: `Group ${i + 1} of ${FULL_PANEL.length}`,
  count: g.markers.length,
  blurb: BLURBS[g.name] ?? "",
  markers: g.markers.map((m) => ({ name: m.name, note: m.why })),
}));

export const PANEL_TOTAL_MARKERS = BIOMARKER_PANEL.reduce((n, c) => n + c.count, 0);
export const PANEL_CATEGORY_COUNT = BIOMARKER_PANEL.length;
