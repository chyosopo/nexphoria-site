/* ═══ VIAL MOCKUP — the product, rendered ═══

   REBUILT 2026-08-13 (Chiya: "the vial mockups dont look realistic").

   The first pass drew a rounded rectangle with a gradient on it. That is a
   drawing OF a vial; it is not an object. Product renders on the references
   (ivyrx.com, goodlife) read as real because they carry the four cues a flat
   shape cannot fake, and this rebuild carries all four:

     1. CYLINDER, not rectangle. Every horizontal edge on a cylinder seen from
        slightly above is an ELLIPSE ARC bowing toward the viewer — the mouth,
        the base, and both edges of the wrapped label. A flat top edge is the
        single biggest tell that a vial was drawn rather than photographed.
     2. WRAP-AROUND SHADING. A cylinder's brightness runs dark-edge → specular
        → mid → dark-edge → thin rim-light. Five stops minimum; a two-stop
        left-to-right ramp reads as a card, not a tube.
     3. THICKNESS. Glass has walls. The interior sits inset from the outline,
        so the liquid never touches the silhouette and you see the far wall
        through the near one.
     4. A LABEL THAT WRAPS. Its edges follow the cylinder and it darkens where
        the surface turns away. A flat white rectangle reads as a sticker
        floating in front of the object.

   MOTION — three layers, all compositor-only, all reduced-motion aware:
     · ENTRY   the liquid fills once when the vial scrolls into view. It is the
               only "look at me" beat, and it is tied to arrival, not a loop.
     · IDLE    a ~7s float of a couple of pixels. Below conscious notice; it is
               what keeps the object from reading as a flat sticker.
     · SWEEP   a slow specular highlight travelling the glass, on a long
               interval so it reads as light moving, not a shimmer effect.

   Under prefers-reduced-motion every layer resolves to its finished state:
   liquid full, no float, highlight parked. Never a degraded animation.

   Everything is token-driven, so the vial repaints with the palette like the
   rest of the site. No hardcoded hex. */
import { useEffect, useId, useRef, useState } from "react";
import { F } from "@/lib/typography";

function prefersReduced(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** A vial label prints a CONCENTRATION or it prints nothing.
 *
 *  Catalog `spec` is a marketing line, not a label line: tesamorelin's reads
 *  "5 mg/mL · 3 mL vial", but both GLP-1s read "physician-directed · with
 *  glycine + B12" because their strength is titrated and genuinely not fixed.
 *  Passed through, that truncated to "physician-directed …" on the label —
 *  under a headline promising a stated concentration. So: take the spec only
 *  when it actually carries one, and leave the line off otherwise. An empty
 *  label line is honest; a filled one that says nothing is not. */
export function labelSpec(spec?: string): string | undefined {
  if (!spec) return undefined;
  const m = spec.match(/[\d.]+\s*m?c?g\s*\/\s*mL/i);
  return m ? m[0].replace(/\s+/g, "") : undefined;
}

/* ── GEOMETRY, in viewBox units (160 × 340) ──
   One source of truth, because the label, the liquid, the clip path and the
   sweep all have to agree about where the glass is. Named rather than inlined
   so the shape can be tuned without hunting magic numbers through the paths. */
const VB_W = 160, VB_H = 340;
const BODY_L = 34, BODY_R = 126;          // outer silhouette
const BODY_T = 112, BODY_B = 286;         // shoulder base → floor
const WALL = 3.5;                          // glass thickness
const IN_L = BODY_L + WALL, IN_R = BODY_R - WALL;
const IN_T = BODY_T + 2, IN_B = BODY_B - 3;
const CX = VB_W / 2;
const ELL = 9;                             // ellipse ry — the "seen from above" amount
const IN_ELL = ELL - 1;
const NECK_L = 60, NECK_R = 100;
const CAP_L = 46, CAP_R = 114;

/* A horizontal band on the cylinder: both edges arc toward the viewer. */
function band(l: number, r: number, top: number, h: number, ry: number): string {
  const mid = (l + r) / 2;
  return `M${l} ${top} Q${mid} ${top + ry} ${r} ${top} L${r} ${top + h} Q${mid} ${top + h + ry} ${l} ${top + h} Z`;
}

/* The glass interior — a cylinder with an elliptical floor. Clips the liquid,
   the sweep and the label so none of them can escape the silhouette. */
const INTERIOR = `M${IN_L} ${IN_T} L${IN_L} ${IN_B} Q${IN_L} ${IN_B + IN_ELL} ${CX} ${IN_B + IN_ELL} Q${IN_R} ${IN_B + IN_ELL} ${IN_R} ${IN_B} L${IN_R} ${IN_T} Q${CX} ${IN_T + IN_ELL} ${IN_L} ${IN_T} Z`;
/* ONE continuous glass silhouette — neck, shoulder, body, elliptical floor.
   The shoulder was previously a separate straight-sided trapezoid butted onto
   a rectangle, which read as a box stacked on a box (obvious on the dark
   band). A real vial's shoulder is an S-curve: the wall leaves the neck
   vertically, bows outward, and meets the body wall vertically again. Drawing
   the whole outline as one path also removes the seam where the two shapes
   met, which was catching the light as a false edge. */
const GLASS = `M${NECK_L} 80 L${NECK_L} 94 C${NECK_L} 105 ${BODY_L} 101 ${BODY_L} ${BODY_T} L${BODY_L} ${BODY_B} Q${BODY_L} ${BODY_B + ELL} ${CX} ${BODY_B + ELL} Q${BODY_R} ${BODY_B + ELL} ${BODY_R} ${BODY_B} L${BODY_R} ${BODY_T} C${BODY_R} 101 ${NECK_R} 105 ${NECK_R} 94 L${NECK_R} 80 Z`;

export function VialMockup({
  name,
  dose,
  /** 0–1, how full the vial reads. Purely visual. */
  fill = 0.66,
  /** The object's HEIGHT, as any CSS length — width follows from the viewBox.
   *  Height rather than width because the drawing is roughly 1:2.1 and the
   *  frames it sits in are landscape-ish: sizing by width letterboxed the vial
   *  into the middle third of its own panel with dead air either side. */
  size = "78%",
  label = true,
  /** Set on dark bands. Glass has no colour of its own — it takes the ground's,
   *  so a single gradient built from the ink token renders a black silhouette
   *  on a dark band and an invisible one on a pale photo. The vial therefore
   *  carries BOTH treatments and picks by ground: on dark it lifts (ceramic
   *  highlights over a lit interior), on light it recedes (ink rim, clear
   *  interior). The cap and liquid are the same in both — aluminium and the
   *  accent read correctly either way. */
  onDark = false,
  testId,
}: {
  name: string;
  dose?: string;
  fill?: number;
  size?: string;
  label?: boolean;
  onDark?: boolean;
  testId?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const reduced = prefersReduced();
  const [filled, setFilled] = useState(reduced);

  useEffect(() => {
    if (reduced || filled) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setFilled(true); io.disconnect(); } },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, filled]);

  const liquidY = IN_B - (IN_B - IN_T) * Math.max(0, Math.min(1, fill));
  const LBL_T = 198, LBL_H = 70;                    // wrapped label band

  const glass = onDark
    ? { hi: "0.66", mid: "0.13", core: "0.05", rim: "0.40" }
    : { hi: "0.96", mid: "0.34", core: "0.05", rim: "0.30" };

  return (
    <div
      ref={ref}
      data-testid={testId}
      className={reduced ? undefined : "nx-vial-float"}
      style={{ position: "relative", height: size, aspectRatio: `${VB_W} / ${VB_H}`, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        width="100%"
        height="100%"
        role="img"
        aria-label={`${name} vial`}
        style={{ position: "relative", zIndex: 1, overflow: "visible" }}
      >
        <defs>
          {/* CYLINDER SHADING — cue (2). Five stops: the turn away on the left,
              the specular column, the transparent core, the turn away on the
              right, and a thin rim-light where the far edge catches the light.
              This gradient is what makes a rectangle read as a tube. */}
          <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--nx-vial-cap-shadow)" stopOpacity={glass.rim} />
            <stop offset="9%"   stopColor="var(--nx-ceramic)"         stopOpacity={glass.mid} />
            <stop offset="21%"  stopColor="var(--nx-ceramic)"         stopOpacity={glass.hi} />
            <stop offset="33%"  stopColor="var(--nx-ceramic)"         stopOpacity={glass.mid} />
            <stop offset="58%"  stopColor="var(--nx-vial-cap)"        stopOpacity={glass.core} />
            <stop offset="84%"  stopColor="var(--nx-vial-cap-shadow)" stopOpacity={glass.rim} />
            <stop offset="95%"  stopColor="var(--nx-ceramic)"         stopOpacity={glass.mid} />
            <stop offset="100%" stopColor="var(--nx-vial-cap-shadow)" stopOpacity={glass.rim} />
          </linearGradient>

          {/* Liquid, deeper at the base where it pools and where the glass
              doubles back on itself. */}
          <linearGradient id={`l-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="var(--nx-cobalt)" stopOpacity="0.55" />
            <stop offset="55%"  stopColor="var(--nx-cobalt)" stopOpacity="0.80" />
            <stop offset="100%" stopColor="var(--nx-cobalt)" stopOpacity="0.95" />
          </linearGradient>
          {/* The liquid ALSO has to wrap — same five-stop logic, applied as a
              multiply-ish overlay so the column of fluid is not a flat slab. */}
          <linearGradient id={`lw-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--nx-bg-dark)" stopOpacity="0.30" />
            <stop offset="22%"  stopColor="var(--nx-ceramic)" stopOpacity="0.26" />
            <stop offset="50%"  stopColor="var(--nx-ceramic)" stopOpacity="0" />
            <stop offset="86%"  stopColor="var(--nx-bg-dark)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="var(--nx-bg-dark)" stopOpacity="0.10" />
          </linearGradient>

          {/* Aluminium. Ground-independent on purpose: a crimped seal is a real
              metal colour and should read as the same object on any band. */}
          <linearGradient id={`c-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--nx-vial-cap-shadow)" />
            <stop offset="14%"  stopColor="var(--nx-vial-cap)" />
            <stop offset="27%"  stopColor="var(--nx-ceramic)" />
            <stop offset="45%"  stopColor="var(--nx-vial-cap)" />
            <stop offset="72%"  stopColor="var(--nx-vial-cap-shadow)" />
            <stop offset="88%"  stopColor="var(--nx-vial-cap)" />
            <stop offset="100%" stopColor="var(--nx-vial-cap-shadow)" />
          </linearGradient>

          {/* Label edge shading — cue (4). Without this the label is a sticker. */}
          <linearGradient id={`le-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--nx-fg)" stopOpacity="0.30" />
            <stop offset="12%"  stopColor="var(--nx-fg)" stopOpacity="0.09" />
            <stop offset="30%"  stopColor="var(--nx-fg)" stopOpacity="0" />
            <stop offset="72%"  stopColor="var(--nx-fg)" stopOpacity="0" />
            <stop offset="90%"  stopColor="var(--nx-fg)" stopOpacity="0.13" />
            <stop offset="100%" stopColor="var(--nx-fg)" stopOpacity="0.34" />
          </linearGradient>

          {/* Travelling specular band. */}
          <linearGradient id={`s-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--nx-ceramic)" stopOpacity="0" />
            <stop offset="50%"  stopColor="var(--nx-ceramic)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--nx-ceramic)" stopOpacity="0" />
          </linearGradient>

          {/* Contact shadow — an ELLIPSE, because the vial stands on a round
              base. A soft pill under a cylinder is the giveaway of a sticker. */}
          <radialGradient id={`sh-${uid}`}>
            <stop offset="0%"   stopColor={onDark ? "var(--nx-bg-dark)" : "var(--nx-fg)"} stopOpacity={onDark ? "0.85" : "0.30"} />
            <stop offset="55%"  stopColor={onDark ? "var(--nx-bg-dark)" : "var(--nx-fg)"} stopOpacity={onDark ? "0.42" : "0.13"} />
            <stop offset="100%" stopColor={onDark ? "var(--nx-bg-dark)" : "var(--nx-fg)"} stopOpacity="0" />
          </radialGradient>

          <clipPath id={`clip-${uid}`}><path d={INTERIOR} /></clipPath>
          <clipPath id={`lclip-${uid}`}><path d={band(IN_L, IN_R, LBL_T, LBL_H, IN_ELL)} /></clipPath>
        </defs>

        {/* ── GROUND ── */}
        <ellipse cx={CX} cy={BODY_B + ELL + 4} rx="58" ry="12" fill={`url(#sh-${uid})`} />

        {/* ── CAP — flip-off centre disc, knurled aluminium skirt, crimp flange ── */}
        <path d={band(CAP_L, CAP_R, 34, 34, 7)} fill={`url(#c-${uid})`} />
        <ellipse cx={CX} cy="34" rx={(CAP_R - CAP_L) / 2} ry="7" fill="var(--nx-vial-cap)" />
        {/* the plastic flip-off button, recessed */}
        <ellipse cx={CX} cy="34" rx="17" ry="4.6" fill="var(--nx-cobalt)" fillOpacity="0.85" />
        <ellipse cx={CX} cy="32.6" rx="17" ry="4.6" fill="var(--nx-ceramic)" fillOpacity="0.22" />
        {/* knurling — fades at the turn so it wraps rather than tiling flat */}
        {Array.from({ length: 13 }, (_, i) => {
          const t = (i + 0.5) / 13;
          return (
            <line
              key={i}
              x1={CAP_L + t * (CAP_R - CAP_L)} y1={36 + Math.sin(Math.PI * t) * 5}
              x2={CAP_L + t * (CAP_R - CAP_L)} y2={66 + Math.sin(Math.PI * t) * 5}
              stroke="var(--nx-bg-dark)" strokeOpacity={0.05 + 0.16 * Math.abs(Math.cos(Math.PI * t))} strokeWidth="1.4"
            />
          );
        })}
        {/* crimp flange — the ring rolled under the neck lip */}
        <path d={band(CAP_L - 1, CAP_R + 1, 66, 10, 8)} fill={`url(#c-${uid})`} />

        {/* ── GLASS ── */}
        <path d={GLASS} fill={`url(#g-${uid})`} />

        <g clipPath={`url(#clip-${uid})`}>
          {/* LIQUID — grows from the base on entry, transform-origin at the
              floor so it fills upward rather than scaling about its centre. */}
          <g
            style={{
              transform: filled ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: `0px ${IN_B + IN_ELL}px`,
              transition: reduced ? "none" : "transform var(--nx-dur-5) var(--nx-reveal-ease) var(--nx-dur-1)",
            }}
          >
            <rect x={IN_L} y={liquidY} width={IN_R - IN_L} height={IN_B + IN_ELL - liquidY} fill={`url(#l-${uid})`} />
            <rect x={IN_L} y={liquidY} width={IN_R - IN_L} height={IN_B + IN_ELL - liquidY} fill={`url(#lw-${uid})`} />
            {/* MENISCUS — the surface, seen from above: a filled ellipse for
                the far half plus a bright leading edge for the near rim. */}
            <ellipse cx={CX} cy={liquidY} rx={(IN_R - IN_L) / 2} ry={IN_ELL} fill="var(--nx-cobalt)" fillOpacity="0.45" />
            <ellipse cx={CX} cy={liquidY - 1.6} rx={(IN_R - IN_L) / 2} ry={IN_ELL} fill="var(--nx-ceramic)" fillOpacity="0.34" />
          </g>

          {/* SPECULAR SWEEP — slow light travel across the glass. */}
          {!reduced && (
            <rect className="nx-vial-sweep" x="-80" y={BODY_T} width="44" height={BODY_B - BODY_T + ELL} fill={`url(#s-${uid})`} transform="skewX(-11)" />
          )}
        </g>

        {/* ── LABEL — wrapped, not stuck on ── */}
        {label && (
          <>
            <path d={band(IN_L, IN_R, LBL_T, LBL_H, IN_ELL)} fill="var(--nx-ceramic)" fillOpacity="0.97" />
            <g clipPath={`url(#lclip-${uid})`}>
              {/* Label type uses SVG PRESENTATION ATTRIBUTES, not style props.
                  These are viewBox user units — they scale with the drawing, so
                  a 230px vial and a 140px vial keep an identically proportioned
                  label. They are deliberately NOT --nx-t-* type tokens: a page
                  type token is an absolute size, and pinning one here would
                  make the printed label grow and shrink independently of the
                  glass it is printed on. Do not "fix" these into tokens. */}
              <text x={CX} y={LBL_T + 20} textAnchor="middle" fontFamily={F} fontSize="8.5" fontWeight="700" letterSpacing="0.9" fill="var(--nx-cobalt)">
                NEXPHORIA
              </text>
              <line x1={IN_L + 14} y1={LBL_T + 26} x2={IN_R - 14} y2={LBL_T + 26} stroke="var(--nx-fg)" strokeOpacity="0.14" strokeWidth="0.8" />
              <text x={CX} y={LBL_T + 42} textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="600" fill="var(--nx-fg)">
                {name.length > 13 ? `${name.slice(0, 12)}…` : name}
              </text>
              {dose && (
                <text x={CX} y={LBL_T + 56} textAnchor="middle" fontFamily={F} fontSize="7.5" fill="var(--nx-fg-muted)">
                  {dose}
                </text>
              )}
              <text x={CX} y={LBL_T + (dose ? 68 : 58)} textAnchor="middle" fontFamily={F} fontSize="6" letterSpacing="0.9" fill="var(--nx-fg-muted)">
                Rx ONLY
              </text>
              {/* the label turns away with the cylinder */}
              <path d={band(IN_L, IN_R, LBL_T, LBL_H, IN_ELL)} fill={`url(#le-${uid})`} />
            </g>
          </>
        )}

        {/* ── GLASS IN FRONT OF EVERYTHING — cue (3). The near wall re-tints
               the liquid and the label, which is what selling "you are looking
               THROUGH something" depends on. Then the outline and the standing
               specular column, which must sit above every other layer. ── */}
        <path d={GLASS} fill={`url(#g-${uid})`} fillOpacity="0.34" />
        <path
          d={GLASS}
          fill="none"
          stroke={onDark ? "var(--nx-ceramic)" : "var(--nx-fg)"}
          strokeOpacity={onDark ? 0.34 : 0.20}
          strokeWidth="1.2"
        />
        <rect x={BODY_L + 8} y={BODY_T + 14} width="7" height={BODY_B - BODY_T - 34} rx="3.5" fill="var(--nx-ceramic)" fillOpacity="0.62" />
        <rect x={BODY_R - 15} y={BODY_T + 26} width="3" height={BODY_B - BODY_T - 62} rx="1.5" fill="var(--nx-ceramic)" fillOpacity="0.34" />
      </svg>
    </div>
  );
}

/* ═══ VIAL PANEL — the product plinth ═══

   The reference shoots product exactly one way (IVYRX-STUDY-VISUAL §V2.4):
   upright, front-facing, on a white→pastel SEAMLESS gradient, soft shadow, no
   props. Props appear only on closing lifestyle bands, never on a product
   surface. This is that frame, drawn rather than photographed.

   It replaces editorial photography in two places where a photo was actively
   working against the product:
     · the PDP hero, where tirzepatide's frame is a branded AUTOINJECTOR PEN —
       the delivery device of an FDA-approved brand, not the vial a 503A
       pharmacy compounds and ships. Depicting one to sell the other is a
       product misrepresentation before it is a design mismatch.
     · the shelf card, where the same pen followed the SKU onto every surface
       that lists products.
   The lifestyle photography is not lost; it keeps the lower PDP band, where
   it belongs — that band's own headline is "we sell the measured loop, not
   the vial." */
export function VialPanel({
  name, dose, size = "76%", ratio = "1 / 1", fill = 0.66, onDark = false, testId,
}: {
  name: string;
  dose?: string;
  size?: string;
  ratio?: string;
  fill?: number;
  onDark?: boolean;
  testId?: string;
}) {
  return (
    <div className="nx-vial-panel" style={{ aspectRatio: ratio }} data-testid={testId}>
      <VialMockup name={name} dose={dose} size={size} fill={fill} onDark={onDark} />
    </div>
  );
}
