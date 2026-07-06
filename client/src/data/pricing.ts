/* ──────────────────────────────────────────────────────────────
   Nexphoria Pricing — single source of truth for peptide MSRPs
   Pricing reflects compounded research-grade vial cost / 4-week supply.
   All peptides require physician sign-off at checkout intake.

   SUBSCRIPTION CADENCE (reference-style):
     1 month   → full price (showcased as "Flexible")
     3 months  → 15% off / month ("Most popular")
     12 months → 30% off / month ("Best value", billed monthly)
   ────────────────────────────────────────────────────────────── */

import { getSolo, SOLO_CATALOG } from "@/data/soloCatalog";
import { getStack } from "@/data/stacksCatalog";

export type CadenceKey = "1mo" | "3mo" | "12mo";

export interface CadencePrice {
  /** monthly equivalent price after the cadence discount */
  pricePerMonth: number;
  /** label shown next to the option */
  label: string;
  /** copy under the label */
  sublabel: string;
  /** badge for the cadence card */
  badge?: "Flexible" | "Most popular" | "Best value";
  /** percent saved vs 1-month */
  savePct: number;
}

export interface PeptidePricing {
  slug: string;
  /** monthly cost at 1-month cadence (the headline / "starting at" price) */
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
  "bpc-157": { slug: "bpc-157", monthlyPrice: 149, vialSpec: "5 mg vial · 250 mcg/dose", vialDuration: "~4 weeks at 1×/day", requiresOversight: ["general"], badge: "Most popular" },
  "tb-500": { slug: "tb-500", monthlyPrice: 189, vialSpec: "5 mg vial · 2 mg/dose", vialDuration: "~4 weeks at 2×/week", requiresOversight: ["general"] },
  "ghk-cu": { slug: "ghk-cu", monthlyPrice: 159, vialSpec: "50 mg vial · topical / SC", vialDuration: "~6 weeks", requiresOversight: ["general"] },
  "semax": { slug: "semax", monthlyPrice: 179, vialSpec: "30 mg vial · 600 mcg intranasal", vialDuration: "~3–4 weeks", requiresOversight: ["general"] },
  "selank": { slug: "selank", monthlyPrice: 159, vialSpec: "30 mg vial · 750 mcg intranasal", vialDuration: "~3–4 weeks", requiresOversight: ["general"] },
  "tesamorelin": { slug: "tesamorelin", monthlyPrice: 349, vialSpec: "10 mg vial · 1–2 mg/day SC", vialDuration: "~5–10 days", requiresOversight: ["metabolic", "hormonal"] },
  "ipamorelin": { slug: "ipamorelin", monthlyPrice: 189, vialSpec: "10 mg vial · 200–300 mcg SC", vialDuration: "~4 weeks", requiresOversight: ["hormonal"], badge: "Most popular" },
  "cjc-1295": { slug: "cjc-1295", monthlyPrice: 239, vialSpec: "5 mg vial · DAC variant", vialDuration: "~4–5 weeks", requiresOversight: ["hormonal"] },
  "epitalon": { slug: "epitalon", monthlyPrice: 219, vialSpec: "20 mg vial · 5–10 mg/day SC", vialDuration: "~10–20 day course", requiresOversight: ["general"] },
  "thymosin-a1": { slug: "thymosin-a1", monthlyPrice: 289, vialSpec: "10 mg vial · 1.6 mg SC", vialDuration: "~3–4 weeks", requiresOversight: ["general"] },
  "nad-plus": { slug: "nad-plus", monthlyPrice: 199, vialSpec: "500 mg vial · 100–250 mg SC", vialDuration: "~4 weeks", requiresOversight: ["general"], badge: "Most popular" },
  "mots-c": { slug: "mots-c", monthlyPrice: 269, vialSpec: "10 mg vial · 5–10 mg/week SC", vialDuration: "~4 weeks", requiresOversight: ["metabolic"] },
  "dsip": { slug: "dsip", monthlyPrice: 149, vialSpec: "5 mg vial · 100–300 mcg SC", vialDuration: "~4 weeks", requiresOversight: ["general"] },
  "tirzepatide": { slug: "tirzepatide", monthlyPrice: 399, vialSpec: "10 mg/40 mg vial · weekly titration", vialDuration: "~4 weeks", requiresOversight: ["metabolic", "cardiac"], badge: "GLP-1" },
  "retatrutide": { slug: "retatrutide", monthlyPrice: 489, vialSpec: "12 mg vial · weekly titration", vialDuration: "~4 weeks", requiresOversight: ["metabolic", "cardiac"], badge: "New" },
  "aod-9604": { slug: "aod-9604", monthlyPrice: 179, vialSpec: "5 mg vial · 300 mcg/day SC", vialDuration: "~4 weeks", requiresOversight: ["general"] },
};

/** Cadence discount engine — doc model: 3-mo −15%, 12-mo −30%.
    Where a product exists in the new catalogs (soloCatalog / stacksCatalog),
    priceAtCadence returns that catalog's EXACT tier price so the cart can
    never contradict the product page. The percentage math below is only the
    fallback for slugs not yet migrated. */
export const CADENCE_DISCOUNTS: Record<CadenceKey, { pct: number; label: string; sublabel: string; badge?: CadencePrice["badge"]; savePct: number; months: number }> = {
  "1mo":  { pct: 0,    months: 1,  label: "Monthly",     sublabel: "Cancel anytime",                  badge: "Flexible",      savePct: 0 },
  "3mo":  { pct: 0.15, months: 3,  label: "Quarterly",   sublabel: "Billed quarterly · save 15%",      badge: "Most popular",  savePct: 15 },
  "12mo": { pct: 0.30, months: 12, label: "Annual",      sublabel: "Billed monthly · save 30%",        badge: "Best value",    savePct: 30 },
};

const CADENCE_TO_TIER: Record<CadenceKey, "m1" | "m3" | "m12"> = { "1mo": "m1", "3mo": "m3", "12mo": "m12" };

/** Multi-peptide bundle discount — 2 = 10%, 3 = 12%, 4+ = 15%.
    Single source of truth: the builder ADVERTISES it and the cart engine
    APPLIES it; both import from here so the totals can never disagree. */
export function bundleDiscount(distinctPeptides: number): number {
  if (distinctPeptides >= 4) return 0.15;
  if (distinctPeptides === 3) return 0.12;
  if (distinctPeptides === 2) return 0.10;
  return 0;
}

/** Compute price-per-month at a given cadence.
    Catalog tier price wins; discount math is the legacy fallback. */
export function priceAtCadence(slug: string, cadence: CadenceKey): number {
  const solo = getSolo(slug);
  if (solo?.pricing) return solo.pricing[CADENCE_TO_TIER[cadence]];
  const stack = getStack(slug);
  if (stack) {
    const c = stack.cadences.find((x) => (x.key as string) === cadence);
    if (c?.perMonth != null) return c.perMonth;
  }
  const p = pricing[slug];
  if (!p) return 0;
  const disc = CADENCE_DISCOUNTS[cadence].pct;
  return Math.round(p.monthlyPrice * (1 - disc));
}

/** Build all three cadence cards for a peptide */
export function cadenceCardsFor(slug: string): { cadence: CadenceKey; pricePerMonth: number; label: string; sublabel: string; badge?: CadencePrice["badge"]; savePct: number }[] {
  const cadences: CadenceKey[] = ["1mo", "3mo", "12mo"];
  return cadences.map((c) => ({
    cadence: c,
    pricePerMonth: priceAtCadence(slug, c),
    label: CADENCE_DISCOUNTS[c].label,
    sublabel: CADENCE_DISCOUNTS[c].sublabel,
    badge: CADENCE_DISCOUNTS[c].badge,
    savePct: CADENCE_DISCOUNTS[c].savePct,
  }));
}

export function getPrice(slug: string): PeptidePricing | undefined {
  return pricing[slug];
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

/** Honest recurring-billing disclosure for a per-month price at a cadence.
   Quarterly plans bill a real lump every three months; annual bills monthly on
   a 12-month term. Enterprise price transparency: never show a "/mo" figure
   without the actual amount and cadence the customer is committing to. */
export function billingNote(cadence: CadenceKey, perMonth: number): string {
  const months = CADENCE_DISCOUNTS[cadence].months;
  if (cadence === "3mo") return `Billed quarterly — ${formatUSD(perMonth * months)} every 3 months`;
  if (cadence === "12mo") return `Billed monthly · 12-month term — ${formatUSD(perMonth * months)}/year`;
  return "Billed monthly · cancel anytime";
}

/* Lowest shelf-priced single-peptide monthly (1-mo cadence). Single source for
   the "single peptides from $X/mo" copy that recurs across the site, so the
   headline "from" price can never drift from the catalog. Currently bpc-157 @ $149. */
export const SOLO_FROM_PRICE: number = Math.min(
  ...SOLO_CATALOG.filter((s) => s.pricing).map((s) => s.pricing!.m1),
);
export const SOLO_FROM_LABEL: string = formatUSD(SOLO_FROM_PRICE);
