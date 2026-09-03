/* ─────────────────────────────────────────────────────────────
   Site Trust Stats — single source of truth for duplicated numeric
   claims that appear verbatim across ≥2 pages/components.

   Rule (mirrors PANEL_TOTAL_MARKERS in biomarkerPanel.ts): never
   hardcode one of these figures inline. Reference SITE_STATS.<key>.display
   for rendered copy, or .value where the raw number drives logic
   (e.g. the count-up animation in TrustStatsStrip). The display string
   MUST reproduce the rendered text byte-for-byte — changing it is a
   sitewide visual change, not a refactor.

   Only figures duplicated across multiple files belong here. Single-site
   stats stay local to their component.
   ───────────────────────────────────────────────────────────── */

export const SITE_STATS = {
  /* labSites ("2,000+ partner laboratory locations") retired 2026-09-03: the
     lab partner is undecided (docs/LAB-PARTNER.md) and the figure belonged to
     a network we may not use. Re-add only with a figure Chiya can confirm. */
} as const;
