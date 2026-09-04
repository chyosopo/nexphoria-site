/* ProductCard is the product tile (the Spine, Phase 2): one card for every
   shelf. Kept as a name so older callers keep working; new code imports
   ProductTile directly. priceLineFor stays for the few places that print
   a price line without a card. */
import { usd } from "@/data/stacksCatalog";
import { getPrice } from "@/data/pricing";
import type { SoloPeptide } from "@/data/soloCatalog";
import { ProductTile } from "@/components/ProductTile";

export function priceLineFor(s: SoloPeptide): string {
  if (s.gated) return "Priced after review";
  if (s.pricing) return `From ${usd(s.pricing.m12)}/mo`;
  const p = getPrice(s.slug);
  return p ? `From ${usd(p.monthlyPrice)}/mo` : "Priced at consultation";
}

export function ProductCard({ sku, testId, index = 0 }: { sku: SoloPeptide; testId?: string; index?: number }) {
  return <ProductTile sku={sku} index={index} testId={testId ?? `peptide-${sku.slug}`} />;
}
