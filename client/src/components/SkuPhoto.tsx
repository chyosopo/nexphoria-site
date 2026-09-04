/* ═══ SkuPhoto — the real photograph of a launch vial, by slug.

   One file per SKU (client/src/assets/vials), the four finished product
   shots. A SKU without a photograph renders the caller's fallback (the drawn
   vial) rather than a neighbour's photo: a vial is a claim about what
   arrives. Used by the catalog cards, the catalog hero lineup, the product
   page hero and the protocol pages. */
import type { ReactNode } from "react";
import skuTesamorelin from "@/assets/vials/sku-tesamorelin.webp";
import skuSemaglutide from "@/assets/vials/sku-semaglutide.webp";
import skuTirzepatide from "@/assets/vials/sku-tirzepatide.webp";
import skuPt141 from "@/assets/vials/sku-pt-141.webp";
import skuIpamorelin from "@/assets/vials/sku-ipamorelin.webp";
import skuSemax from "@/assets/vials/sku-semax.webp";
import skuMethyleneBlue from "@/assets/vials/sku-methylene-blue.webp";
import skuTb500 from "@/assets/vials/sku-tb-500.webp";
import skuBpcTb from "@/assets/vials/sku-bpc-tb-combo.webp";

export const SKU_PHOTO: Record<string, string> = {
  tesamorelin: skuTesamorelin,
  semaglutide: skuSemaglutide,
  tirzepatide: skuTirzepatide,
  "pt-141": skuPt141,
  ipamorelin: skuIpamorelin,
  semax: skuSemax,
  "methylene-blue": skuMethyleneBlue,
  "tb-500": skuTb500,
  "bpc-tb-combo": skuBpcTb,
};

/* Names as written in the stack catalogs map to slugs. */
const NAME_TO_SLUG: Record<string, string> = {
  tesamorelin: "tesamorelin",
  semaglutide: "semaglutide",
  tirzepatide: "tirzepatide",
  "pt-141": "pt-141",
  "pt 141": "pt-141",
  bremelanotide: "pt-141",
  ipamorelin: "ipamorelin",
  semax: "semax",
  "methylene blue": "methylene-blue",
  "tb-500": "tb-500",
  "bpc-157 + tb-500": "bpc-tb-combo",
};

export function skuPhotoFor(slugOrName: string): string | undefined {
  const k = slugOrName.trim().toLowerCase();
  return SKU_PHOTO[k] ?? SKU_PHOTO[NAME_TO_SLUG[k] ?? ""];
}

export function SkuPhoto({
  slug,
  name,
  fallback = null,
  className = "nx-sku-img",
  eager = false,
  testId,
}: {
  slug?: string;
  name?: string;
  fallback?: ReactNode;
  className?: string;
  eager?: boolean;
  testId?: string;
}) {
  const src = skuPhotoFor(slug ?? name ?? "");
  if (!src) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={`${name ?? slug} vial`}
      className={className}
      width={1024}
      height={1024}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      data-testid={testId}
    />
  );
}
