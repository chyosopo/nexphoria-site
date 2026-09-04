/* The four terms of a single medicine, as buy-box tiers, from one source
   (data/pricing CADENCE_DISCOUNTS) so a PDP, a card and the cart agree. */
import type { BuyTier } from "@/components/BuyBox";
import { CADENCE_DISCOUNTS, type CadenceKey } from "@/data/pricing";
import type { SoloPricing } from "@/data/soloCatalog";

const KEYS: { tier: keyof SoloPricing; cad: CadenceKey }[] = [
  { tier: "m1", cad: "1mo" }, { tier: "m3", cad: "3mo" }, { tier: "m6", cad: "6mo" }, { tier: "m12", cad: "12mo" },
];

export function soloTiers(p: SoloPricing): BuyTier[] {
  return KEYS.map(({ tier, cad }) => {
    const c = CADENCE_DISCOUNTS[cad];
    return {
      key: tier, label: c.label, sub: c.sublabel, badge: c.badge, amount: p[tier], per: "/mo" as const,
      includesPanel: c.months >= 6 ? "Full" : undefined, labs: c.labs,
    };
  });
}
