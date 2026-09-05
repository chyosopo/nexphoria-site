/* ═══ SkuPhoto — the product render of every SKU, by slug.

   One file per SKU (client/src/assets/vials), rendered from the house
   studio (review/studio: the vial, the nasal spray bottle, the capsule
   bottle and the ampoule, drawn in the Porcelain & Navy sheet and rendered
   at 1600 px). Re-render with `node review/studio/render.mjs
   review/studio/scene-skus.mjs --out review/studio/out/skus` and copy the
   WebPs in. A SKU without a file renders the caller's fallback (the drawn
   vial) rather than a neighbour's picture. Used by the catalog cards, the
   rail, the product page hero, the protocol pages and the cart. */
import type { ReactNode } from "react";
import sku_sermorelin from "@/assets/vials/sku-sermorelin.webp";
import sku_ipamorelin from "@/assets/vials/sku-ipamorelin.webp";
import sku_cjc_1295 from "@/assets/vials/sku-cjc-1295.webp";
import sku_ipa_cjc from "@/assets/vials/sku-ipa-cjc.webp";
import sku_tesamorelin from "@/assets/vials/sku-tesamorelin.webp";
import sku_selank from "@/assets/vials/sku-selank.webp";
import sku_semax from "@/assets/vials/sku-semax.webp";
import sku_cerebrolysin from "@/assets/vials/sku-cerebrolysin.webp";
import sku_methylene_blue from "@/assets/vials/sku-methylene-blue.webp";
import sku_bpc_157 from "@/assets/vials/sku-bpc-157.webp";
import sku_tb_500 from "@/assets/vials/sku-tb-500.webp";
import sku_bpc_tb_combo from "@/assets/vials/sku-bpc-tb-combo.webp";
import sku_ghk_cu from "@/assets/vials/sku-ghk-cu.webp";
import sku_epitalon from "@/assets/vials/sku-epitalon.webp";
import sku_nad_plus from "@/assets/vials/sku-nad-plus.webp";
import sku_mots_c from "@/assets/vials/sku-mots-c.webp";
import sku_semaglutide from "@/assets/vials/sku-semaglutide.webp";
import sku_tirzepatide from "@/assets/vials/sku-tirzepatide.webp";
import sku_dsip from "@/assets/vials/sku-dsip.webp";
import sku_pt_141 from "@/assets/vials/sku-pt-141.webp";
import sku_thymosin_a1 from "@/assets/vials/sku-thymosin-a1.webp";
import sku_aod_9604 from "@/assets/vials/sku-aod-9604.webp";
import sku_oxytocin from "@/assets/vials/sku-oxytocin.webp";
import sku_tadalafil from "@/assets/vials/sku-tadalafil.webp";
import sku_testosterone from "@/assets/vials/sku-testosterone.webp";
import sku_kisspeptin from "@/assets/vials/sku-kisspeptin.webp";

export const SKU_PHOTO: Record<string, string> = {
  "sermorelin": sku_sermorelin,
  "ipamorelin": sku_ipamorelin,
  "cjc-1295": sku_cjc_1295,
  "ipa-cjc": sku_ipa_cjc,
  "tesamorelin": sku_tesamorelin,
  "selank": sku_selank,
  "semax": sku_semax,
  "cerebrolysin": sku_cerebrolysin,
  "methylene-blue": sku_methylene_blue,
  "bpc-157": sku_bpc_157,
  "tb-500": sku_tb_500,
  "bpc-tb-combo": sku_bpc_tb_combo,
  "ghk-cu": sku_ghk_cu,
  "epitalon": sku_epitalon,
  "nad-plus": sku_nad_plus,
  "mots-c": sku_mots_c,
  "semaglutide": sku_semaglutide,
  "tirzepatide": sku_tirzepatide,
  "dsip": sku_dsip,
  "pt-141": sku_pt_141,
  "thymosin-a1": sku_thymosin_a1,
  "aod-9604": sku_aod_9604,
  "oxytocin": sku_oxytocin,
  "tadalafil": sku_tadalafil,
  "testosterone": sku_testosterone,
  "kisspeptin": sku_kisspeptin,
};

/* Names as written in the catalogs map to slugs. */
const NAME_TO_SLUG: Record<string, string> = {
  "sermorelin": "sermorelin",
  "ipamorelin": "ipamorelin",
  "cjc-1295 (no-dac)": "cjc-1295",
  "ipamorelin / cjc-1295 blend": "ipa-cjc",
  "tesamorelin": "tesamorelin",
  "selank": "selank",
  "semax": "semax",
  "cerebrolysin": "cerebrolysin",
  "methylene blue": "methylene-blue",
  "bpc-157": "bpc-157",
  "tb-500": "tb-500",
  "bpc-157 + tb-500": "bpc-tb-combo",
  "ghk-cu": "ghk-cu",
  "epitalon": "epitalon",
  "nad+": "nad-plus",
  "mots-c": "mots-c",
  "semaglutide": "semaglutide",
  "tirzepatide": "tirzepatide",
  "dsip": "dsip",
  "pt-141": "pt-141",
  "thymosin alpha-1": "thymosin-a1",
  "aod-9604": "aod-9604",
  "oxytocin nasal": "oxytocin",
  "tadalafil nasal": "tadalafil",
  "testosterone cypionate": "testosterone",
  "kisspeptin": "kisspeptin",
  "pt 141": "pt-141",
  bremelanotide: "pt-141",
  "cjc 1295": "cjc-1295",
  "nad plus": "nad-plus",
  "mots c": "mots-c",
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
