/* ═══ OUTCOME IMAGERY — the C29 photography law, resolved to local assets ═══
   Hyper-real lifestyle frames per ART-DIRECTION.md. Every image sells the
   OUTCOME, never the vial: capability restored, fog lifted, years handed back.
   All paths are workflow-localized WebP (q82, ≤1600w) — zero external deps.
   Category art is world-cast where gender matters (sleep, metabolic). */

import type { PeptideCategory } from "@/data/peptides";

/** Stack slug → its canonical outcome frame (4:5, 1632×2048). */
export const OUTCOME_STACK: Record<string, string> = {
  wolverine: "img/img_ebd08f5a334f.webp", // dawn doorway, trail shoes — capability restored
  glow: "img/img_1d040e499a7a.webp", // golden mirror — there she is
  ascend: "img/img_f6cb022cc6fe.webp", // top of the pull-up — quiet power
  lucidity: "img/img_44f7a8ee7f92.webp", // dawn desk, coffee gone cold — the fog lifted
  meridian: "img/img_56a29d462771.webp", // couple on the pass — years handed back
  ignite: "img/img_f8d241785924.webp", // lacing shoes, physician letter — clinical hope
  threshold: "img/img_72c3a0233fe1.webp", // empty track, first light — the edge, found again
};

/** Category → outcome tile, per world where casting differs. */
export const OUTCOME_CATEGORY: Record<
  "men" | "women",
  Partial<Record<PeptideCategory, string>>
> = {
  men: {
    growth: "img/img_1b972aa3c417.webp", // tape measure abandoned
    recovery: "img/img_e90c14c4f953.webp", // chalked grip, honest scar
    metabolic: "img/img_ff10791a8167.webp", // belt, one notch in
    longevity: "img/img_cf1396d09b4a.webp", // fastest one at the picnic
    cognition: "img/img_916e52b67436.webp", // three moves ahead
    sleep: "img/img_928775d1e9c1.webp", // waking before the alarm (M)
  },
  women: {
    skin: "img/img_3678caab4727.webp", // golden profile, cream robe — skin that holds the light
    recovery: "img/img_e90c14c4f953.webp",
    metabolic: "img/img_4f2bd889825e.webp", // jeans button easily (W)
    longevity: "img/img_cf1396d09b4a.webp",
    cognition: "img/img_916e52b67436.webp",
    sleep: "img/img_3eae89cb98a0.webp", // waking before the alarm (W)
  },
};

/** World-home hero frames (3:2, 2048×1360; left third clear for the headline). */
export const OUTCOME_HERO: Record<"men" | "women", string> = {
  men: "img/img_d489ea4e9dbc.webp", // dawn window after the workout
  women: "img/img_08691e05b412.webp", // golden stretch, time to spare
};
