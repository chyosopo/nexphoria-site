/* ──────────────────────────────────────────────────────────────
   Nexphoria physician-review model — single source of truth.
   No named individuals, no institution claims. This describes the
   review PROCESS and the standards every prescribing physician on
   the network meets. Used by: /physicians.

   Prescribing is performed by independent, U.S.-licensed physicians
   through our telehealth partner. Nexphoria does not employ
   physicians or direct clinical decision-making.
   ────────────────────────────────────────────────────────────── */

import { PANEL_TOTAL_MARKERS } from "./biomarkerPanel";

export type ReviewStep = {
  /** Ordinal label, e.g. "01" */
  n: string;
  label: string;
  body: string;
};

export type PhysicianStandard = {
  label: string;
  detail: string;
};

export type Credential = {
  abbr: string;
  full: string;
  note: string;
};

export type PhysicianReview = {
  /** Headline stats about the review model — no individual credentials */
  stats: { k: string; v: string }[];
  /** Standards every prescribing physician meets */
  standards: PhysicianStandard[];
  /** How review works, end to end */
  steps: ReviewStep[];
  /** Board certifications / registrations referenced (no institutions) */
  credentials: Credential[];
};

export const physicianReview: PhysicianReview = {
  stats: [
    { k: "100%", v: "Plans read by a doctor" },
    { k: String(PANEL_TOTAL_MARKERS), v: "Markers in your week-12 panel" },
    { k: "50", v: "States covered" },
    { k: "1", v: "Doctor signs your prescription" },
  ],

  standards: [
    {
      label: "Board certification required",
      detail: "Every prescribing physician holds active board certification. We treat that as the floor to practice here, and start from it.",
    },
    {
      label: "Your week-12 panel, read by your doctor",
      detail: "A full blood panel at week 12, included in every plan, drawn at a CLIA-certified partner laboratory and read by your physician, who continues, adjusts or stops.",
    },
    {
      label: "Licensed in your state of residence",
      detail: "Physician licensure is state-specific. Members are matched to a physician licensed in their state.",
    },
    {
      label: "DEA registration active and current",
      detail: "Required to prescribe within the formulary.",
    },
    {
      label: "Case review against current literature",
      detail: "Active protocols are reviewed against updated clinical literature on a rolling 90-day cycle.",
    },
  ],

  steps: [
    {
      n: "01",
      label: "Your questionnaire",
      body: "A medical questionnaire covering your history, your goals, your medications and the screens that matter for your peptide. A licensed physician reads all of it before anything is prescribed.",
    },
    {
      n: "02",
      label: "Physician Review",
      body: "A board-certified physician reads your questionnaire themselves. They look for contraindications and cautions, then set your starting dose. You are notified when review is complete.",
    },
    {
      n: "03",
      label: "Telehealth Consult",
      body: "Your consult is scheduled through our licensed telehealth partner. Your physician finalizes your plan, sets dose parameters, and answers clinical questions. At week 12 a full blood panel, included, shows what changed, and your dose follows it.",
    },
  ],

  credentials: [
    { abbr: "ABIM", full: "American Board of Internal Medicine", note: "Internal medicine and endocrinology" },
    { abbr: "ABFM", full: "American Board of Family Medicine", note: "Primary and preventative care" },
    { abbr: "DEA", full: "Drug Enforcement Administration", note: "Active prescribing registration" },
    { abbr: "State licensure", full: "Matched to your state of residence", note: "Physician licensed where you live" },
  ],
};
