/* ═══ VIAL HERO — the cinematic product object ═══

   Direction C, chosen by Chiya from a four-option board, after she sent the
   Google Shopping row for "ivyrx" — six competitor vials side by side. That
   screenshot is the brief, and it says something the site teardowns did not:

     THE LABEL IS A SOLID SATURATED COLOUR WRAPPING THE WHOLE VIAL, WITH ONE
     HUGE LOWERCASE SHORT NAME ON IT.

   IvyRx ships purple "tirz" and green "GLP-1"; SnagRx ships orange "sema".
   Not a white clinical label with a small colour band and six lines of
   pharmacy fine print — which is exactly what I had built, and why ours
   disappeared next to theirs in a shopping row. At thumbnail size the only
   things that survive are the colour and one word, so the design has to be
   the colour and one word.

   HOW IT IS ASSEMBLED
     · GLASS + COLOURED WRAP are photographed (higgsfield / Recraft V4.1),
       one shot per goal colour, on a graphite ground with rim light and haze.
       The colour is in the photograph rather than a CSS tint over grey, so it
       carries real specular falloff around the cylinder.
     · TYPE is live DOM over it — the short name, the full molecule, and the
       Rx line. Never baked in: generated label text arrives warped and
       misspelled, and on a MEDICAL product that is a compliance problem
       before it is an ugly one. Live type also re-renders per SKU from the
       catalog, so a vial cannot print a molecule the PDP disagrees with.

   The fine print that used to crowd the label did not vanish — it moved to
   the PDP spec plate, where it is readable. A vial label is a poster, not a
   package insert. */
import { F } from "@/lib/typography";
import wrapMetabolic from "@/assets/vials/wrap-metabolic.webp";
import wrapGrowth from "@/assets/vials/wrap-growth.webp";
import wrapSexual from "@/assets/vials/wrap-sexual-health.webp";
import wrapNeutral from "@/assets/vials/wrap-neutral.webp";
import { goalKeyFor, type GoalKey } from "@/data/goalAccent";
import type { SoloPeptide } from "@/data/soloCatalog";

const WRAP: Record<GoalKey, string> = {
  metabolic: wrapMetabolic,
  growth: wrapGrowth,
  "sexual-health": wrapSexual,
  neutral: wrapNeutral,
};

/** The short name printed large on the wrap — the competitors' "tirz" / "sema"
 *  move. Explicit per SKU rather than truncated: an algorithm would render
 *  PT-141 as "pt-1", and a clipped drug name on a label is worse than a long
 *  one. Any SKU without an entry falls back to its full name. */
const SHORT_NAME: Record<string, string> = {
  tirzepatide: "tirz",
  semaglutide: "sema",
  tesamorelin: "tesa",
  "pt-141": "pt-141",
};

/* Where the coloured wrap sits inside the photographs, as fractions of the
   frame. All four were generated from one prompt skeleton so they share a
   box; re-measure if a shot is ever replaced. */
const WRAP_BOX = { left: 31, right: 69, top: 31, bottom: 88 };

export function VialHero({
  sku,
  width = "100%",
  testId,
}: {
  sku: SoloPeptide;
  width?: string;
  testId?: string;
}) {
  const goal = goalKeyFor(sku.category);
  const short = SHORT_NAME[sku.slug] ?? sku.name.toLowerCase();

  return (
    <figure
      data-testid={testId ?? `vialhero-${sku.slug}`}
      className="nx-vialhero"
      style={{ width, position: "relative", margin: 0, aspectRatio: "1 / 1" }}
    >
      <img
        src={WRAP[goal]}
        alt={`${sku.name} vial`}
        width={2048}
        height={2048}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: `${WRAP_BOX.left}%`,
          right: `${100 - WRAP_BOX.right}%`,
          top: `${WRAP_BOX.top}%`,
          bottom: `${100 - WRAP_BOX.bottom}%`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* THE ONE WORD. Sized in container units so it scales with the object
            — the whole point is that this survives at thumbnail size. */}
        <span
          style={{
            fontFamily: F,
            fontSize: "18cqw",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "var(--nx-ceramic)",
            /* The wrap curves away at both edges, so flat type reads as a
               decal. A soft inner shading matches the cylinder's falloff. */
            textShadow: "0 1px 2px rgba(16,19,23,0.22)",
          }}
        >
          {short}
        </span>

        <span
          style={{
            fontFamily: F,
            fontSize: "3.6cqw",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "color-mix(in srgb, var(--nx-ceramic) 88%, transparent)",
            marginTop: "6%",
            lineHeight: 1.2,
          }}
        >
          {sku.name}
        </span>

        <span
          style={{
            fontFamily: F,
            fontSize: "2.6cqw",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "color-mix(in srgb, var(--nx-ceramic) 66%, transparent)",
            marginTop: "3%",
          }}
        >
          Rx only
        </span>
      </div>

      {/* The wordmark, small, at the foot of the wrap — where a pharmaceutical
          label carries the manufacturer. Ours, not a generated approximation. */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: `${WRAP_BOX.left}%`,
          right: `${100 - WRAP_BOX.right}%`,
          bottom: `${100 - WRAP_BOX.bottom + 3}%`,
          textAlign: "center",
          fontFamily: F,
          fontSize: "2.4cqw",
          fontWeight: 700,
          letterSpacing: "0.28em",
          color: "color-mix(in srgb, var(--nx-ceramic) 55%, transparent)",
        }}
      >
        NEXPHORIA
      </span>
    </figure>
  );
}
