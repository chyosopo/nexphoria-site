/* ═══ VIAL HERO — one finished product shot per SKU ═══

   Four SKUs, four photographs, nothing composited. Chiya: "We just have four
   SKUs. Let's have them perfectly done, so it's great that we can advertise
   with it."

   That sentence killed the previous three approaches, and it was right to.
   Every one of them was a SYSTEM for generating vials — a vector drawing, then
   a photo with a live-DOM label, then a coloured wrap with a giant word — when
   the actual requirement is four finished images good enough to put in a
   Google Shopping ad. A system that renders four things is only worth building
   if the four need to differ at runtime. These do not. They are fixed product
   photography and should be treated the way every brand treats it: shot once,
   checked, shipped as files.

   WHAT WENT WRONG BEFORE, recorded so it is not repeated:
   · Label text as live DOM over a blank label. It never sat right on the
     curve, and it turned the vial into a layout problem instead of an image.
   · Then a full-bleed colour wrap with a huge lowercase short name. On PT-141
     the short name IS the full name, so it rendered as an enormous "pt-141"
     across the bottle. It looked absurd and I shipped it anyway.
   · Both were machinery built instead of looking at what competitors actually
     advertise with: a modest white label, a colour band, the molecule at
     readable size, "Rx only", on a light seamless ground.

   The images carry their own text, rendered in-image. The one thing NOT baked
   in is fine print — the first generation produced convincing-looking
   gibberish, and on a medical product that is worse than blank — so the label
   ends after "Rx only" and the real strength, route, compounder and storage
   live on the PDP spec plate, derived from the catalog and legible. */
import tirzepatide from "@/assets/vials/sku-tirzepatide.webp";
import semaglutide from "@/assets/vials/sku-semaglutide.webp";
import tesamorelin from "@/assets/vials/sku-tesamorelin.webp";
import pt141 from "@/assets/vials/sku-pt-141.webp";
/* Second set, shot on each goal's TINT rather than studio grey. Needed
   because a grey-ground photo dropped onto a coloured tile shows its own
   background as a visible rectangle — the thing that made the first goal band
   look broken. Background removal was tried first and returned the image
   unchanged: the matter cannot cut transparent glass, which is why the colour
   has to be in the photograph. */
import tirzepatideTint from "@/assets/vials/tint-tirzepatide.webp";
import semaglutideTint from "@/assets/vials/tint-semaglutide.webp";
import tesamorelinTint from "@/assets/vials/tint-tesamorelin.webp";
import pt141Tint from "@/assets/vials/tint-pt-141.webp";
import type { SoloPeptide } from "@/data/soloCatalog";

/** Slug → its finished product shot. A SKU with no photo renders NOTHING
 *  rather than borrowing another molecule's bottle: a vial is a claim about
 *  what arrives, so showing the wrong one is a misrepresentation, not a
 *  cosmetic fallback. */
export const VIAL_BY_SLUG: Record<string, string> = {
  tirzepatide,
  semaglutide,
  tesamorelin,
  "pt-141": pt141,
};

/** The same four bottles, photographed on their goal tint. Used wherever the
 *  vial sits on a coloured ground. */
export const VIAL_TINT_BY_SLUG: Record<string, string> = {
  tirzepatide: tirzepatideTint,
  semaglutide: semaglutideTint,
  tesamorelin: tesamorelinTint,
  "pt-141": pt141Tint,
};

export function vialFor(slug: string, onTint = false): string | undefined {
  return (onTint ? VIAL_TINT_BY_SLUG : VIAL_BY_SLUG)[slug];
}

export function VialHero({
  sku,
  width = "100%",
  priority = false,
  /** Use the goal-tint shot — for any surface where the vial sits on colour. */
  onTint = false,
  testId,
}: {
  sku: SoloPeptide;
  width?: string;
  /** True on the PDP hero, where the vial is the LCP element. */
  priority?: boolean;
  onTint?: boolean;
  testId?: string;
}) {
  const src = vialFor(sku.slug, onTint);
  if (!src) return null;

  return (
    <img
      src={src}
      alt={`${sku.name} vial — Nexphoria, prescription only`}
      width={1024}
      height={1024}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      data-testid={testId ?? `vialhero-${sku.slug}`}
      style={{ width, aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
    />
  );
}
