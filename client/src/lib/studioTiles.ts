/* ═══ The studio tiles (2026-09-05): every product on a glossy panel toned
   by its goal, and one tile per goal for the catalog row. Rendered by
   review/studio/scene-pdp.mjs; re-render and copy the WebPs in. */
import type { SoloCategory } from "@/data/soloCatalog";

import pdp_sermorelin from "@/assets/studio/pdp/pdp-sermorelin.webp";
import pdp_sermorelin_600 from "@/assets/studio/pdp/pdp-sermorelin-600.webp";
import pdp_ipamorelin from "@/assets/studio/pdp/pdp-ipamorelin.webp";
import pdp_ipamorelin_600 from "@/assets/studio/pdp/pdp-ipamorelin-600.webp";
import pdp_cjc_1295 from "@/assets/studio/pdp/pdp-cjc-1295.webp";
import pdp_cjc_1295_600 from "@/assets/studio/pdp/pdp-cjc-1295-600.webp";
import pdp_ipa_cjc from "@/assets/studio/pdp/pdp-ipa-cjc.webp";
import pdp_ipa_cjc_600 from "@/assets/studio/pdp/pdp-ipa-cjc-600.webp";
import pdp_tesamorelin from "@/assets/studio/pdp/pdp-tesamorelin.webp";
import pdp_tesamorelin_600 from "@/assets/studio/pdp/pdp-tesamorelin-600.webp";
import pdp_selank from "@/assets/studio/pdp/pdp-selank.webp";
import pdp_selank_600 from "@/assets/studio/pdp/pdp-selank-600.webp";
import pdp_semax from "@/assets/studio/pdp/pdp-semax.webp";
import pdp_semax_600 from "@/assets/studio/pdp/pdp-semax-600.webp";
import pdp_cerebrolysin from "@/assets/studio/pdp/pdp-cerebrolysin.webp";
import pdp_cerebrolysin_600 from "@/assets/studio/pdp/pdp-cerebrolysin-600.webp";
import pdp_methylene_blue from "@/assets/studio/pdp/pdp-methylene-blue.webp";
import pdp_methylene_blue_600 from "@/assets/studio/pdp/pdp-methylene-blue-600.webp";
import pdp_bpc_157 from "@/assets/studio/pdp/pdp-bpc-157.webp";
import pdp_bpc_157_600 from "@/assets/studio/pdp/pdp-bpc-157-600.webp";
import pdp_tb_500 from "@/assets/studio/pdp/pdp-tb-500.webp";
import pdp_tb_500_600 from "@/assets/studio/pdp/pdp-tb-500-600.webp";
import pdp_bpc_tb_combo from "@/assets/studio/pdp/pdp-bpc-tb-combo.webp";
import pdp_bpc_tb_combo_600 from "@/assets/studio/pdp/pdp-bpc-tb-combo-600.webp";
import pdp_ghk_cu from "@/assets/studio/pdp/pdp-ghk-cu.webp";
import pdp_ghk_cu_600 from "@/assets/studio/pdp/pdp-ghk-cu-600.webp";
import pdp_epitalon from "@/assets/studio/pdp/pdp-epitalon.webp";
import pdp_epitalon_600 from "@/assets/studio/pdp/pdp-epitalon-600.webp";
import pdp_nad_plus from "@/assets/studio/pdp/pdp-nad-plus.webp";
import pdp_nad_plus_600 from "@/assets/studio/pdp/pdp-nad-plus-600.webp";
import pdp_mots_c from "@/assets/studio/pdp/pdp-mots-c.webp";
import pdp_mots_c_600 from "@/assets/studio/pdp/pdp-mots-c-600.webp";
import pdp_semaglutide from "@/assets/studio/pdp/pdp-semaglutide.webp";
import pdp_semaglutide_600 from "@/assets/studio/pdp/pdp-semaglutide-600.webp";
import pdp_tirzepatide from "@/assets/studio/pdp/pdp-tirzepatide.webp";
import pdp_tirzepatide_600 from "@/assets/studio/pdp/pdp-tirzepatide-600.webp";
import pdp_dsip from "@/assets/studio/pdp/pdp-dsip.webp";
import pdp_dsip_600 from "@/assets/studio/pdp/pdp-dsip-600.webp";
import pdp_pt_141 from "@/assets/studio/pdp/pdp-pt-141.webp";
import pdp_pt_141_600 from "@/assets/studio/pdp/pdp-pt-141-600.webp";
import pdp_thymosin_a1 from "@/assets/studio/pdp/pdp-thymosin-a1.webp";
import pdp_thymosin_a1_600 from "@/assets/studio/pdp/pdp-thymosin-a1-600.webp";
import pdp_aod_9604 from "@/assets/studio/pdp/pdp-aod-9604.webp";
import pdp_aod_9604_600 from "@/assets/studio/pdp/pdp-aod-9604-600.webp";
import pdp_oxytocin from "@/assets/studio/pdp/pdp-oxytocin.webp";
import pdp_oxytocin_600 from "@/assets/studio/pdp/pdp-oxytocin-600.webp";
import pdp_tadalafil from "@/assets/studio/pdp/pdp-tadalafil.webp";
import pdp_tadalafil_600 from "@/assets/studio/pdp/pdp-tadalafil-600.webp";
import pdp_testosterone from "@/assets/studio/pdp/pdp-testosterone.webp";
import pdp_testosterone_600 from "@/assets/studio/pdp/pdp-testosterone-600.webp";
import pdp_kisspeptin from "@/assets/studio/pdp/pdp-kisspeptin.webp";
import pdp_kisspeptin_600 from "@/assets/studio/pdp/pdp-kisspeptin-600.webp";
import goal_metabolic from "@/assets/studio/pdp/goal-metabolic.webp";
import goal_metabolic_600 from "@/assets/studio/pdp/goal-metabolic-600.webp";
import goal_growth from "@/assets/studio/pdp/goal-growth.webp";
import goal_growth_600 from "@/assets/studio/pdp/goal-growth-600.webp";
import goal_sexual from "@/assets/studio/pdp/goal-sexual.webp";
import goal_sexual_600 from "@/assets/studio/pdp/goal-sexual-600.webp";
import goal_recovery from "@/assets/studio/pdp/goal-recovery.webp";
import goal_recovery_600 from "@/assets/studio/pdp/goal-recovery-600.webp";
import goal_longevity from "@/assets/studio/pdp/goal-longevity.webp";
import goal_longevity_600 from "@/assets/studio/pdp/goal-longevity-600.webp";
import goal_cognition from "@/assets/studio/pdp/goal-cognition.webp";
import goal_cognition_600 from "@/assets/studio/pdp/goal-cognition-600.webp";
import goal_sleep from "@/assets/studio/pdp/goal-sleep.webp";
import goal_sleep_600 from "@/assets/studio/pdp/goal-sleep-600.webp";
import goal_hormone from "@/assets/studio/pdp/goal-hormone.webp";
import goal_hormone_600 from "@/assets/studio/pdp/goal-hormone-600.webp";
import goal_skin from "@/assets/studio/pdp/goal-skin.webp";
import goal_skin_600 from "@/assets/studio/pdp/goal-skin-600.webp";

export interface StudioTile { src: string; src600: string }
export const PDP_TILE: Record<string, StudioTile> = {
  "sermorelin": { src: pdp_sermorelin, src600: pdp_sermorelin_600 },
  "ipamorelin": { src: pdp_ipamorelin, src600: pdp_ipamorelin_600 },
  "cjc-1295": { src: pdp_cjc_1295, src600: pdp_cjc_1295_600 },
  "ipa-cjc": { src: pdp_ipa_cjc, src600: pdp_ipa_cjc_600 },
  "tesamorelin": { src: pdp_tesamorelin, src600: pdp_tesamorelin_600 },
  "selank": { src: pdp_selank, src600: pdp_selank_600 },
  "semax": { src: pdp_semax, src600: pdp_semax_600 },
  "cerebrolysin": { src: pdp_cerebrolysin, src600: pdp_cerebrolysin_600 },
  "methylene-blue": { src: pdp_methylene_blue, src600: pdp_methylene_blue_600 },
  "bpc-157": { src: pdp_bpc_157, src600: pdp_bpc_157_600 },
  "tb-500": { src: pdp_tb_500, src600: pdp_tb_500_600 },
  "bpc-tb-combo": { src: pdp_bpc_tb_combo, src600: pdp_bpc_tb_combo_600 },
  "ghk-cu": { src: pdp_ghk_cu, src600: pdp_ghk_cu_600 },
  "epitalon": { src: pdp_epitalon, src600: pdp_epitalon_600 },
  "nad-plus": { src: pdp_nad_plus, src600: pdp_nad_plus_600 },
  "mots-c": { src: pdp_mots_c, src600: pdp_mots_c_600 },
  "semaglutide": { src: pdp_semaglutide, src600: pdp_semaglutide_600 },
  "tirzepatide": { src: pdp_tirzepatide, src600: pdp_tirzepatide_600 },
  "dsip": { src: pdp_dsip, src600: pdp_dsip_600 },
  "pt-141": { src: pdp_pt_141, src600: pdp_pt_141_600 },
  "thymosin-a1": { src: pdp_thymosin_a1, src600: pdp_thymosin_a1_600 },
  "aod-9604": { src: pdp_aod_9604, src600: pdp_aod_9604_600 },
  "oxytocin": { src: pdp_oxytocin, src600: pdp_oxytocin_600 },
  "tadalafil": { src: pdp_tadalafil, src600: pdp_tadalafil_600 },
  "testosterone": { src: pdp_testosterone, src600: pdp_testosterone_600 },
  "kisspeptin": { src: pdp_kisspeptin, src600: pdp_kisspeptin_600 },
};
export const GOAL_TILE: Record<string, StudioTile> = {
  metabolic: { src: goal_metabolic, src600: goal_metabolic_600 },
  growth: { src: goal_growth, src600: goal_growth_600 },
  sexual: { src: goal_sexual, src600: goal_sexual_600 },
  recovery: { src: goal_recovery, src600: goal_recovery_600 },
  longevity: { src: goal_longevity, src600: goal_longevity_600 },
  cognition: { src: goal_cognition, src600: goal_cognition_600 },
  sleep: { src: goal_sleep, src600: goal_sleep_600 },
  hormone: { src: goal_hormone, src600: goal_hormone_600 },
  skin: { src: goal_skin, src600: goal_skin_600 },
};
/* The catalog groups by SoloCategory; the tile for each. */
export const CATEGORY_TILE: Record<SoloCategory, StudioTile> = {
  Metabolic: GOAL_TILE.metabolic, Growth: GOAL_TILE.growth, "Sexual Health": GOAL_TILE.sexual, Recovery: GOAL_TILE.recovery,
  "Skin & Longevity": GOAL_TILE.longevity, Cognitive: GOAL_TILE.cognition, Sleep: GOAL_TILE.sleep, Hormone: GOAL_TILE.hormone,
};
/* Which goals read light (navy type) and which read dark (ceramic type). */
export const TILE_DARK: Record<SoloCategory, boolean> = { Metabolic: false, Growth: true, "Sexual Health": true, Recovery: false, "Skin & Longevity": false, Cognitive: true, Sleep: true, Hormone: true };
