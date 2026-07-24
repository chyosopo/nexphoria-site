/* ═══ OUTCOME IMAGERY — the C29 photography law, resolved to local assets ═══
   Hyper-real lifestyle frames per ART-DIRECTION.md. Every image sells the
   OUTCOME, never the vial: capability restored, fog lifted, years handed back.
   All paths are workflow-localized WebP (q82, ≤1600w) — zero external deps.
   Category art is world-cast where gender matters (sleep, metabolic).
   Paths are RELATIVE (img/…) and resolve against the <base> tag that
   client/index.html writes at boot (app root: /<repo>/ on github.io project
   pages, / on a custom domain). The base tag — not a leading slash — is what
   pins them to the app root at any route depth on any host; root-absolute
   /img/… would 404 on the github.io project page. */

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

/* Cast fixes for shared protocol shelves (Chiya 2026-07-13: everything
   tailored). Several canonical stack frames carry a visible cast —
   wolverine / threshold / ignite are men, lucidity is a woman — which is
   a leak when the OTHER world browses the shared /stacks shelf. These
   overrides swap in the browsing world's own category frame; own-lean
   stacks (glow, ascend) keep their cast, badged as made-for. */
const STACK_ART_OVERRIDES: Record<"men" | "women", Record<string, string>> = {
  women: {
    wolverine: "img/img_1217733ee45f.webp", // her recovery — chalked grip at the wall (W)
    threshold: "img/img_3eae89cb98a0.webp", // her sleep — waking before the alarm (W)
    ignite: "img/img_4f2bd889825e.webp", // her metabolic — jeans button easily (W)
  },
  men: {
    lucidity: "img/img_916e52b67436.webp", // his cognition — three moves ahead
  },
};

/** The frame a stack card shows in this world — cast override first. */
export function stackArt(slug: string, world?: "men" | "women"): string | undefined {
  return (world && STACK_ART_OVERRIDES[world][slug]) || OUTCOME_STACK[slug];
}

/** Category → outcome tile, per world where casting differs. */
export const OUTCOME_CATEGORY: Record<
  "men" | "women",
  Partial<Record<PeptideCategory, string>>
> = {
  men: {
    growth: "img/img_ca6ddc167d62.webp", // bright home gym, tape on the bench (M)
    recovery: "img/img_fad0fee022a9.webp", // chalking up at the crag, morning light (M)
    metabolic: "img/img_ff10791a8167.webp", // belt, one notch in
    longevity: "img/img_cf1396d09b4a.webp", // fastest one at the picnic
    cognition: "img/img_916e52b67436.webp", // three moves ahead
    sleep: "img/img_928775d1e9c1.webp", // waking before the alarm (M)
  },
  women: {
    skin: "img/img_3678caab4727.webp", // golden profile, cream robe — skin that holds the light
    growth: "img/img_5072e4db8390.webp", // navy set, quiet power — lean strength (W)
    recovery: "img/img_1217733ee45f.webp", // chalked grip at the wall (W)
    metabolic: "img/img_4f2bd889825e.webp", // jeans button easily (W)
    longevity: "img/img_40db6393468a.webp", // fastest one at the picnic (W)
    cognition: "img/img_6d55c7017047.webp", // three moves ahead (W)
    sleep: "img/img_3eae89cb98a0.webp", // waking before the alarm (W)
    "sexual-health": "img/img_ba067fd9f405.webp", // golden-hour ease — desire, on her schedule (W)
  },
};

/** World-home hero frames (3:2, 2048×1360; left third clear for the headline). */
export const OUTCOME_HERO: Record<"men" | "women", string> = {
  men: "img/img_d489ea4e9dbc.webp", // dawn window after the workout
  women: "img/img_08691e05b412.webp", // golden stretch, time to spare
};

/**
 * srcSet for an outcome image. Every workflow-localized `img/…` frame has a
 * build-time 800w companion (img_x-800w.webp) so ~400px tile slots stop
 * downloading the full 1632w frame. Vite-BUNDLED assets (./assets/…) have
 * NO companion — generating one 404s and blanks the tile (found on the
 * hero-rail physician tile) — so those get no srcSet at all.
 */
export function outcomeSrcSet(src: string): string | undefined {
  if (!src.startsWith("img/")) return undefined;
  return `${src.replace(/\.webp$/, "-800w.webp")} 800w, ${src} 1632w`;
}
