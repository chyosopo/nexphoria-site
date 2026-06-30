/* ──────────────────────────────────────────────────────────────
   Nexphoria Pricing — single source of truth for peptide MSRPs
   Pricing reflects compounded research-grade vial cost / 4-week supply.
   All peptides require physician sign-off at checkout intake.
   ────────────────────────────────────────────────────────────── */

export interface PeptidePricing {
  slug: string;
  /** monthly cost for a typical course (1 vial of standard concentration) */
  monthlyPrice: number;
  /** vial spec shown on PDP */
  vialSpec: string;
  /** how many weeks a single vial typically lasts at standard dose */
  vialDuration: string;
  /** physician oversight is built in — these flags decide which questions show on intake */
  requiresOversight: ("metabolic" | "hormonal" | "cardiac" | "general")[];
  /** Display badge */
  badge?: "Most popular" | "New" | "Limited" | "GLP-1";
}

export const pricing: Record<string, PeptidePricing> = {
  "bpc-157": { slug: "bpc-157", monthlyPrice: 189, vialSpec: "5 mg vial · 250 mcg/dose", vialDuration: "~4 weeks at 1×/day", requiresOversight: ["general"], badge: "Most popular" },
  "tb-500": { slug: "tb-500", monthlyPrice: 269, vialSpec: "5 mg vial · 2 mg/dose", vialDuration: "~4 weeks at 2×/week", requiresOversight: ["general"] },
  "ghk-cu": { slug: "ghk-cu", monthlyPrice: 159, vialSpec: "50 mg vial · topical / SC", vialDuration: "~6 weeks", requiresOversight: ["general"] },
  "semax": { slug: "semax", monthlyPrice: 149, vialSpec: "30 mg vial · 600 mcg intranasal", vialDuration: "~3–4 weeks", requiresOversight: ["general"] },
  "selank": { slug: "selank", monthlyPrice: 159, vialSpec: "30 mg vial · 750 mcg intranasal", vialDuration: "~3–4 weeks", requiresOversight: ["general"] },
  "tesamorelin": { slug: "tesamorelin", monthlyPrice: 459, vialSpec: "10 mg vial · 1–2 mg/day SC", vialDuration: "~5–10 days", requiresOversight: ["metabolic", "hormonal"] },
  "ipamorelin": { slug: "ipamorelin", monthlyPrice: 219, vialSpec: "10 mg vial · 200–300 mcg SC", vialDuration: "~4 weeks", requiresOversight: ["hormonal"], badge: "Most popular" },
  "cjc-1295": { slug: "cjc-1295", monthlyPrice: 239, vialSpec: "5 mg vial · DAC variant", vialDuration: "~4–5 weeks", requiresOversight: ["hormonal"] },
  "epitalon": { slug: "epitalon", monthlyPrice: 219, vialSpec: "20 mg vial · 5–10 mg/day SC", vialDuration: "~10–20 day course", requiresOversight: ["general"] },
  "thymosin-a1": { slug: "thymosin-a1", monthlyPrice: 289, vialSpec: "10 mg vial · 1.6 mg SC", vialDuration: "~3–4 weeks", requiresOversight: ["general"] },
  "nad-plus": { slug: "nad-plus", monthlyPrice: 329, vialSpec: "500 mg vial · 100–250 mg SC", vialDuration: "~4 weeks", requiresOversight: ["general"], badge: "Most popular" },
  "mots-c": { slug: "mots-c", monthlyPrice: 269, vialSpec: "10 mg vial · 5–10 mg/week SC", vialDuration: "~4 weeks", requiresOversight: ["metabolic"] },
  "dsip": { slug: "dsip", monthlyPrice: 149, vialSpec: "5 mg vial · 100–300 mcg SC", vialDuration: "~4 weeks", requiresOversight: ["general"] },
  "tirzepatide": { slug: "tirzepatide", monthlyPrice: 399, vialSpec: "10 mg/40 mg vial · weekly titration", vialDuration: "~4 weeks", requiresOversight: ["metabolic", "cardiac"], badge: "GLP-1" },
  "retatrutide": { slug: "retatrutide", monthlyPrice: 489, vialSpec: "12 mg vial · weekly titration", vialDuration: "~4 weeks", requiresOversight: ["metabolic", "cardiac"], badge: "New" },
  "aod-9604": { slug: "aod-9604", monthlyPrice: 179, vialSpec: "5 mg vial · 300 mcg/day SC", vialDuration: "~4 weeks", requiresOversight: ["general"] },
};

export function getPrice(slug: string): PeptidePricing | undefined {
  return pricing[slug];
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}
