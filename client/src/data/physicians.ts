/* ──────────────────────────────────────────────────────────────
   Nexphoria physician-review model — single source of truth.
   No named individuals, no institution claims. This describes the
   review PROCESS and the standards every prescribing physician on
   the network meets. Used by: /physicians.

   Prescribing is performed by independent, U.S.-licensed physicians
   through our telehealth partner. Nexphoria does not employ
   physicians or direct clinical decision-making.
   ────────────────────────────────────────────────────────────── */

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
    { k: "100%", v: "Protocols physician-reviewed" },
    { k: "38", v: "Biomarkers reviewed first" },
    { k: "50", v: "States covered" },
    { k: "0", v: "Algorithmic approvals" },
  ],

  standards: [
    {
      label: "Board certification required",
      detail: "Every prescribing physician holds active board certification. Board certification is the minimum standard — not a differentiator.",
    },
    {
      label: "Laboratory review mandatory before any Rx",
      detail: "A CLIA-certified partner-laboratory panel must be on file. No prescription precedes labs.",
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
      label: "Labs First",
      body: "A 99-biomarker panel drawn at a CLIA-certified partner laboratory is required before any prescription. Your physician will not prescribe based on symptoms alone. The panel covers hormones, metabolic markers, inflammation, cardiovascular markers, and organ function.",
    },
    {
      n: "02",
      label: "Physician Review",
      body: "A board-certified physician reviews your full panel and intake — not an algorithm. They look for absolute contraindications, relative cautions, and protocol optimization based on your specific baseline, not population averages. You are notified when review is complete.",
    },
    {
      n: "03",
      label: "Telehealth Consult",
      body: "Your consult is scheduled through our licensed telehealth partner. Your physician finalizes your protocol, sets dose parameters, and answers clinical questions. Ongoing secure portal messaging is available between consult cycles.",
    },
  ],

  credentials: [
    { abbr: "ABIM", full: "American Board of Internal Medicine", note: "Internal medicine and endocrinology" },
    { abbr: "ABFM", full: "American Board of Family Medicine", note: "Primary and preventative care" },
    { abbr: "DEA", full: "Drug Enforcement Administration", note: "Active prescribing registration" },
    { abbr: "State licensure", full: "Matched to your state of residence", note: "Physician licensed where you live" },
  ],
};
