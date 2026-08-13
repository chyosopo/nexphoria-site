/* ═══ VIAL PHOTO — real glass, real label ═══

   Chiya, on the first pass of generated vials: "They don't have our brand.
   They're not close to excellent." Correct, and the fault was the brief, not
   the render. I generated photorealistic vials with BLANK labels intending to
   print the name over them — which produces a photo of a generic vial. On the
   references the LABEL IS THE PRODUCT DESIGN. It is where the brand lives, and
   a vial without one is a stock photo of nothing.

   So the object is composited, not generated whole:

     · THE GLASS is a photograph. Real refraction, a real crimped aluminium
       seal, a real meniscus — the things a vector drawing cannot fake and the
       reason the SVG never looked right.
     · THE LABEL is ours, rendered as live DOM over it. Not baked into the
       image, because (a) generated label text arrives warped and misspelled,
       which on a MEDICAL product is a compliance problem and not just an ugly
       one, and (b) live text stays crisp at any size, is selectable, is
       readable by a screen reader, and re-renders per SKU from the catalog —
       so a label can never print a molecule or a strength the PDP disagrees
       with.

   The label carries the goal's colour from the P2 accent family, so the same
   green that marks metabolic on a tile marks it on the vial. Colour is
   navigation on this site; the product is not exempt from the map. */
import { F } from "@/lib/typography";
import vialLight from "@/assets/vials/vial-light.png";
import vialDark from "@/assets/vials/vial-dark.png";
import { labelSpec } from "@/components/VialMockup";
import { PHARMACY_INFO } from "@/data/compliance";
import { accentFor } from "@/data/goalAccent";
import type { SoloPeptide } from "@/data/soloCatalog";

/* Where the blank label sits inside each photograph, as fractions of the
   frame. Measured off the assets rather than guessed: the two shots are
   framed differently, so one shared rectangle would float the label off the
   glass on one of them. If a photo is ever replaced, re-measure these. */
const LABEL_BOX = {
  light: { left: 31.8, right: 68.4, top: 48.2, bottom: 83.0 },
  dark:  { left: 29.5, right: 67.0, top: 47.8, bottom: 76.5 },
} as const;

export function VialPhoto({
  sku,
  variant = "light",
  width = "100%",
  testId,
}: {
  sku: SoloPeptide;
  variant?: "light" | "dark";
  width?: string;
  testId?: string;
}) {
  const box = LABEL_BOX[variant];
  const accent = accentFor(sku.category);
  const strength = labelSpec(sku.spec);

  return (
    <figure
      data-testid={testId ?? `vial-${sku.slug}`}
      className="nx-vialphoto"
      style={{ width, position: "relative", margin: 0, aspectRatio: "1 / 1" }}
    >
      <img
        src={variant === "dark" ? vialDark : vialLight}
        alt={`${sku.name} vial`}
        width={2048}
        height={2048}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />

      {/* THE LABEL — live DOM, positioned onto the glass. */}
      <div
        className="nx-vialphoto__label"
        style={{
          position: "absolute",
          left: `${box.left}%`,
          right: `${100 - box.right}%`,
          top: `${box.top}%`,
          bottom: `${100 - box.bottom}%`,
          display: "flex",
          flexDirection: "column",
          /* The paper itself. The photo's label is bright white and slightly
             blown out; laying our own stock over it gives the type a
             consistent ground on both the light and the dark shot. */
          background: "linear-gradient(90deg, #E8E9EC 0%, #FBFBFC 16%, #FFFFFF 42%, #F4F5F7 74%, #D9DBE0 100%)",
          border: "1px solid color-mix(in srgb, var(--nx-fg) 7%, transparent)",
          overflow: "hidden",
        }}
      >
        {/* The goal band. On a real pharmaceutical label this stripe is how a
            pharmacist tells two products apart at a glance in a drawer; here it
            does the same job for a visitor across the site. */}
        <span
          aria-hidden
          style={{
            height: "13%",
            background: accent.ink,
            borderRadius: "var(--nx-r-3xs) var(--nx-r-3xs) 0 0",
          }}
        />

        <span
          style={{
            fontFamily: F,
            fontSize: "clamp(4px, 1.05cqw, 11px)",
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: accent.ink,
            marginTop: "7%",
            lineHeight: 1,
            padding: "0 7%",
          }}
        >
          NEXPHORIA
        </span>

        <span
          style={{
            fontFamily: F,
            fontSize: "clamp(6px, 1.75cqw, 19px)",
            fontWeight: 600,
            color: "var(--nx-fg)",
            lineHeight: 1.05,
            marginTop: "3%",
            letterSpacing: "-0.01em",
            padding: "0 7%",
          }}
        >
          {sku.name}
        </span>

        <span
          style={{
            fontFamily: F,
            fontSize: "clamp(4px, 1.15cqw, 12px)",
            color: "var(--nx-fg-graphite)",
            marginTop: "2.5%",
            lineHeight: 1.2,
            padding: "0 7%",
          }}
        >
          {strength ?? "Titrated · physician-directed"}
        </span>

        {/* The dose line. A vial label states its regimen; without it the
            middle of the label was empty, which is most of why the first pass
            still read as a mock-up rather than a product. */}
        <span
          style={{
            fontFamily: F,
            fontSize: "clamp(3.5px, 0.95cqw, 10px)",
            color: "var(--nx-fg-muted)",
            marginTop: "6%",
            lineHeight: 1.35,
            padding: "0 7%",
          }}
        >
          {sku.dose}
        </span>

        {/* The compounder + storage block. This is what a 503A vial actually
            carries in the space a two-line mock-up leaves empty, and the
            pharmacy is the real one from compliance.ts rather than filler. */}
        <span
          style={{
            fontFamily: F,
            fontSize: "clamp(3px, 0.8cqw, 8.5px)",
            color: "var(--nx-fg-muted)",
            marginTop: "auto",
            lineHeight: 1.5,
            padding: "0 7%",
          }}
        >
          For subcutaneous use only.<br />
          Compounded by {PHARMACY_INFO.name}, a state-licensed 503A pharmacy.<br />
          Store 2–8&nbsp;°C. Protect from light.
        </span>

        {/* CYLINDER SHADING over the whole label. Without this the label is a
            flat rectangle pasted on a round object — the single biggest tell,
            and the reason the first composite still read as a mock-up. Same
            wrap logic the SVG vial uses: dark at both turns, bright down the
            specular side. Sits above the type so the type wraps with it. */}
        <span
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "linear-gradient(90deg, rgba(23,25,28,0.34) 0%, rgba(23,25,28,0.10) 7%, rgba(255,255,255,0.30) 20%, rgba(255,255,255,0) 42%, rgba(23,25,28,0.05) 72%, rgba(23,25,28,0.22) 92%, rgba(23,25,28,0.40) 100%)",
          }}
        />

        {/* The fine-print row. A real vial label carries a route, a storage
            line and a lot/expiry block, and its absence is a large part of why
            a clean two-line label reads as a mock-up. These are the true
            constants for a compounded subcutaneous preparation; nothing here
            is a fabricated lot number or date. */}
        <span
          style={{
            fontFamily: F,
            fontSize: "clamp(3px, 0.85cqw, 9px)",
            color: "var(--nx-fg-muted)",
            marginTop: "5%",
            lineHeight: 1.35,
            display: "flex",
            justifyContent: "space-between",
            gap: "4%",
            borderTop: "1px solid color-mix(in srgb, var(--nx-fg) 22%, transparent)",
            padding: "3% 7% 4%",
          }}
        >
          <span>Rx ONLY · SUBCUTANEOUS</span>
          <span>REFRIGERATE</span>
        </span>
      </div>
    </figure>
  );
}
