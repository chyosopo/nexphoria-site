/* ═══ VIAL MOCKUP — the product, rendered ═══

   A compounded prescription arrives as a small glass vial with a crimped
   aluminium cap. That object IS the product, and the site had only a flat
   static drawing of it (VialArt). This is the same object built to be looked
   at: real glass behaviour (specular column, edge darkening, a meniscus rather
   than a flat fill), a knurled cap, and a printed label carrying the actual
   molecule and dose from the catalog.

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

export function VialMockup({
  name,
  dose,
  /** 0–1, how full the vial reads. Purely visual. */
  fill = 0.62,
  /** Any CSS length. The vial is fluid inside it, so a clamp() works and the
   *  object shrinks with its column instead of overflowing on mobile. */
  size = 280,
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
  size?: number | string;
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

  // Body interior spans y 74 → 236 in the viewBox; liquid grows from the base.
  const TOP = 74, BOT = 236;
  const liquidH = (BOT - TOP) * Math.max(0, Math.min(1, fill));
  const liquidY = BOT - liquidH;

  return (
    <div
      ref={ref}
      data-testid={testId}
      className={reduced ? undefined : "nx-vial-float"}
      style={{ position: "relative", width: size, aspectRatio: "1 / 1.12", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Contact shadow — grounds the object. Soft and small; a big blur reads
          as a sticker floating over the page rather than glass resting on it. */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: "6%", width: "44%", height: 12,
          borderRadius: "var(--nx-r-pill)",
          background: onDark
            ? "color-mix(in srgb, var(--nx-bg-dark) 70%, transparent)"
            : "color-mix(in srgb, var(--nx-fg) 18%, transparent)",
          filter: "blur(9px)",
        }}
      />

      <svg
        viewBox="0 0 140 300"
        width="100%"
        height="100%"
        role="img"
        aria-label={`${name} vial`}
        style={{ position: "relative", zIndex: 1, overflow: "visible" }}
      >
        <defs>
          {/* Glass: bright at the left specular edge, darkening to the right rim.
              On dark the whole body is lifted so it silhouettes; on light it
              stays nearly clear and is defined by its rim alone. */}
          <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="0">
            {onDark ? (
              <>
                <stop offset="0%"   stopColor="var(--nx-ceramic)"    stopOpacity="0.62" />
                <stop offset="20%"  stopColor="var(--nx-ceramic)"    stopOpacity="0.20" />
                <stop offset="58%"  stopColor="var(--nx-vial-cap)"   stopOpacity="0.16" />
                <stop offset="100%" stopColor="var(--nx-ceramic)"    stopOpacity="0.34" />
              </>
            ) : (
              <>
                <stop offset="0%"   stopColor="var(--nx-ceramic)"        stopOpacity="0.95" />
                <stop offset="18%"  stopColor="var(--nx-ceramic)"        stopOpacity="0.46" />
                <stop offset="62%"  stopColor="var(--nx-vial-cap-shadow)" stopOpacity="0.10" />
                <stop offset="100%" stopColor="var(--nx-vial-cap-shadow)" stopOpacity="0.34" />
              </>
            )}
          </linearGradient>

          {/* Liquid: the accent, deeper at the base where it pools. */}
          <linearGradient id={`l-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="var(--nx-cobalt)" stopOpacity="0.52" />
            <stop offset="100%" stopColor="var(--nx-cobalt)" stopOpacity="0.92" />
          </linearGradient>

          {/* Aluminium cap. Ground-independent on purpose: a crimped seal is a
              real metal colour, so it uses the vial tokens rather than the ink
              token, and reads as the same object on any band. */}
          <linearGradient id={`c-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--nx-vial-cap-shadow)" />
            <stop offset="26%"  stopColor="var(--nx-ceramic)" />
            <stop offset="55%"  stopColor="var(--nx-vial-cap)" />
            <stop offset="100%" stopColor="var(--nx-vial-cap-shadow)" />
          </linearGradient>

          {/* Travelling specular band. */}
          <linearGradient id={`s-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--nx-ceramic)" stopOpacity="0" />
            <stop offset="50%"  stopColor="var(--nx-ceramic)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--nx-ceramic)" stopOpacity="0" />
          </linearGradient>

          {/* Interior of the body — clips liquid and sweep to the glass. */}
          <clipPath id={`clip-${uid}`}>
            <path d="M32 74 L32 246 Q32 262 48 262 L92 262 Q108 262 108 246 L108 74 Z" />
          </clipPath>
        </defs>

        {/* ── CAP — crimped aluminium with knurling ── */}
        <rect x="42" y="12" width="56" height="14" rx="3" fill={`url(#c-${uid})`} />
        <rect x="38" y="24" width="64" height="30" rx="4" fill={`url(#c-${uid})`} />
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i} x1={43 + i * 6.8} y1="27" x2={43 + i * 6.8} y2="51"
            stroke="var(--nx-fg)" strokeOpacity="0.14" strokeWidth="1"
          />
        ))}
        {/* Crimp skirt — the ring that seals onto the neck flange. */}
        <path d="M38 52 Q70 62 102 52 L102 58 Q70 68 38 58 Z" fill={`url(#c-${uid})`} />

        {/* ── NECK + SHOULDER ── */}
        <path d="M46 58 L46 70 Q46 74 42 76 L32 82 L32 74 Q32 66 40 60 Z" fill={`url(#g-${uid})`} />
        <path d="M94 58 L94 70 Q94 74 98 76 L108 82 L108 74 Q108 66 100 60 Z" fill={`url(#g-${uid})`} />

        {/* ── BODY ── */}
        <path
          d="M32 74 L32 246 Q32 262 48 262 L92 262 Q108 262 108 246 L108 74 Z"
          fill={`url(#g-${uid})`}
          stroke={onDark ? "var(--nx-ceramic)" : "var(--nx-fg)"}
          strokeOpacity={onDark ? 0.30 : 0.24} strokeWidth="1.1"
        />

        <g clipPath={`url(#clip-${uid})`}>
          {/* LIQUID — grows from the base on entry. transform-origin at the
              bottom so it fills upward rather than scaling about its centre. */}
          <g
            style={{
              transform: filled ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: `0px ${BOT}px`,
              transition: reduced ? "none" : "transform var(--nx-dur-5) var(--nx-reveal-ease) var(--nx-dur-1)",
            }}
          >
            <rect x="32" y={liquidY} width="76" height={liquidH} fill={`url(#l-${uid})`} />
            {/* Meniscus — the curved surface. A flat top is the giveaway that
                a vial illustration was drawn rather than observed. */}
            <ellipse cx="70" cy={liquidY} rx="38" ry="5.5" fill="var(--nx-cobalt)" fillOpacity="0.34" />
            <ellipse cx="70" cy={liquidY - 1.2} rx="38" ry="5.5" fill="var(--nx-ceramic)" fillOpacity="0.30" />
          </g>

          {/* SPECULAR SWEEP — slow light travel across the glass. */}
          {!reduced && (
            <rect
              className="nx-vial-sweep"
              x="-70" y="60" width="46" height="210"
              fill={`url(#s-${uid})`} transform="skewX(-12)"
            />
          )}
        </g>

        {/* Fixed specular column — the constant highlight on the left curve. */}
        <rect x="40" y="86" width="7" height="150" rx="3.5" fill="var(--nx-ceramic)" fillOpacity="0.5" />

        {/* ── LABEL ── */}
        {label && (
          <>
            <rect
              x="34" y="150" width="72" height="62" rx="2"
              fill="var(--nx-ceramic)" fillOpacity="0.94"
              stroke="var(--nx-fg)" strokeOpacity="0.10"
            />
            {/* Label type uses SVG PRESENTATION ATTRIBUTES, not style props.
                These are viewBox user units — they scale with the drawing, so
                a 230px vial and a 140px vial keep an identically proportioned
                label. They are deliberately NOT --nx-t-* type tokens: a page
                type token is an absolute size, and pinning one here would make
                the printed label grow and shrink independently of the glass it
                is printed on. Do not "fix" these into tokens. */}
            <text x="70" y="168" textAnchor="middle" fontFamily={F} fontSize="8" fontWeight="700" letterSpacing="0.7" fill="var(--nx-cobalt)">
              NEXPHORIA
            </text>
            <text x="70" y="184" textAnchor="middle" fontFamily={F} fontSize="10" fontWeight="600" fill="var(--nx-fg)">
              {name.length > 13 ? `${name.slice(0, 12)}…` : name}
            </text>
            {dose && (
              <text x="70" y="197" textAnchor="middle" fontFamily={F} fontSize="7" fill="var(--nx-fg-muted)">
                {dose.length > 20 ? `${dose.slice(0, 19)}…` : dose}
              </text>
            )}
            <text x="70" y={dose ? 207 : 198} textAnchor="middle" fontFamily={F} fontSize="5.5" letterSpacing="0.75" fill="var(--nx-fg-muted)">
              Rx ONLY
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
