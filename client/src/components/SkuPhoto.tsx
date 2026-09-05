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
import sku_sermorelin_600 from "@/assets/vials/sku-sermorelin-600.webp";
import sku_ipamorelin from "@/assets/vials/sku-ipamorelin.webp";
import sku_ipamorelin_600 from "@/assets/vials/sku-ipamorelin-600.webp";
import sku_cjc_1295 from "@/assets/vials/sku-cjc-1295.webp";
import sku_cjc_1295_600 from "@/assets/vials/sku-cjc-1295-600.webp";
import sku_ipa_cjc from "@/assets/vials/sku-ipa-cjc.webp";
import sku_ipa_cjc_600 from "@/assets/vials/sku-ipa-cjc-600.webp";
import sku_tesamorelin from "@/assets/vials/sku-tesamorelin.webp";
import sku_tesamorelin_600 from "@/assets/vials/sku-tesamorelin-600.webp";
import sku_selank from "@/assets/vials/sku-selank.webp";
import sku_selank_600 from "@/assets/vials/sku-selank-600.webp";
import sku_semax from "@/assets/vials/sku-semax.webp";
import sku_semax_600 from "@/assets/vials/sku-semax-600.webp";
import sku_cerebrolysin from "@/assets/vials/sku-cerebrolysin.webp";
import sku_cerebrolysin_600 from "@/assets/vials/sku-cerebrolysin-600.webp";
import sku_methylene_blue from "@/assets/vials/sku-methylene-blue.webp";
import sku_methylene_blue_600 from "@/assets/vials/sku-methylene-blue-600.webp";
import sku_bpc_157 from "@/assets/vials/sku-bpc-157.webp";
import sku_bpc_157_600 from "@/assets/vials/sku-bpc-157-600.webp";
import sku_tb_500 from "@/assets/vials/sku-tb-500.webp";
import sku_tb_500_600 from "@/assets/vials/sku-tb-500-600.webp";
import sku_bpc_tb_combo from "@/assets/vials/sku-bpc-tb-combo.webp";
import sku_bpc_tb_combo_600 from "@/assets/vials/sku-bpc-tb-combo-600.webp";
import sku_ghk_cu from "@/assets/vials/sku-ghk-cu.webp";
import sku_ghk_cu_600 from "@/assets/vials/sku-ghk-cu-600.webp";
import sku_epitalon from "@/assets/vials/sku-epitalon.webp";
import sku_epitalon_600 from "@/assets/vials/sku-epitalon-600.webp";
import sku_nad_plus from "@/assets/vials/sku-nad-plus.webp";
import sku_nad_plus_600 from "@/assets/vials/sku-nad-plus-600.webp";
import sku_mots_c from "@/assets/vials/sku-mots-c.webp";
import sku_mots_c_600 from "@/assets/vials/sku-mots-c-600.webp";
import sku_semaglutide from "@/assets/vials/sku-semaglutide.webp";
import sku_semaglutide_600 from "@/assets/vials/sku-semaglutide-600.webp";
import sku_tirzepatide from "@/assets/vials/sku-tirzepatide.webp";
import sku_tirzepatide_600 from "@/assets/vials/sku-tirzepatide-600.webp";
import sku_dsip from "@/assets/vials/sku-dsip.webp";
import sku_dsip_600 from "@/assets/vials/sku-dsip-600.webp";
import sku_pt_141 from "@/assets/vials/sku-pt-141.webp";
import sku_pt_141_600 from "@/assets/vials/sku-pt-141-600.webp";
import sku_thymosin_a1 from "@/assets/vials/sku-thymosin-a1.webp";
import sku_thymosin_a1_600 from "@/assets/vials/sku-thymosin-a1-600.webp";
import sku_aod_9604 from "@/assets/vials/sku-aod-9604.webp";
import sku_aod_9604_600 from "@/assets/vials/sku-aod-9604-600.webp";
import sku_oxytocin from "@/assets/vials/sku-oxytocin.webp";
import sku_oxytocin_600 from "@/assets/vials/sku-oxytocin-600.webp";
import sku_tadalafil from "@/assets/vials/sku-tadalafil.webp";
import sku_tadalafil_600 from "@/assets/vials/sku-tadalafil-600.webp";
import sku_testosterone from "@/assets/vials/sku-testosterone.webp";
import sku_testosterone_600 from "@/assets/vials/sku-testosterone-600.webp";
import sku_kisspeptin from "@/assets/vials/sku-kisspeptin.webp";
import sku_kisspeptin_600 from "@/assets/vials/sku-kisspeptin-600.webp";

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
/* The 600 px variant of each, for cards and rails. */
export const SKU_PHOTO_600: Record<string, string> = {
  "sermorelin": sku_sermorelin_600,
  "ipamorelin": sku_ipamorelin_600,
  "cjc-1295": sku_cjc_1295_600,
  "ipa-cjc": sku_ipa_cjc_600,
  "tesamorelin": sku_tesamorelin_600,
  "selank": sku_selank_600,
  "semax": sku_semax_600,
  "cerebrolysin": sku_cerebrolysin_600,
  "methylene-blue": sku_methylene_blue_600,
  "bpc-157": sku_bpc_157_600,
  "tb-500": sku_tb_500_600,
  "bpc-tb-combo": sku_bpc_tb_combo_600,
  "ghk-cu": sku_ghk_cu_600,
  "epitalon": sku_epitalon_600,
  "nad-plus": sku_nad_plus_600,
  "mots-c": sku_mots_c_600,
  "semaglutide": sku_semaglutide_600,
  "tirzepatide": sku_tirzepatide_600,
  "dsip": sku_dsip_600,
  "pt-141": sku_pt_141_600,
  "thymosin-a1": sku_thymosin_a1_600,
  "aod-9604": sku_aod_9604_600,
  "oxytocin": sku_oxytocin_600,
  "tadalafil": sku_tadalafil_600,
  "testosterone": sku_testosterone_600,
  "kisspeptin": sku_kisspeptin_600,
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
function skuPhoto600For(slugOrName: string): string | undefined {
  const k = slugOrName.trim().toLowerCase();
  return SKU_PHOTO_600[k] ?? SKU_PHOTO_600[NAME_TO_SLUG[k] ?? ""];
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
  const src600 = skuPhoto600For(slug ?? name ?? "");
  if (!src) return <>{fallback}</>;
  return (
    <img
      src={src}
      srcSet={src600 ? `${src600} 600w, ${src} 1600w` : undefined}
      sizes={className.includes("--pdp") ? "(max-width: 1024px) 100vw, 42vw" : "(max-width: 700px) 60vw, 300px"}
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
