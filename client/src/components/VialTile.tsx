/* ──────────────────────────────────────────────────────────────
   VialTile — living product tile for peptides + stacks.

   Front face: illustrated vial with molecular glyph inside the liquid,
               peptide name, one-line tagline, price, quiet chrome.
   Back face:  mechanism (2-sentence), typical dose, cycle length,
               category + evidence tier, "See protocol →" CTA.

   Interaction:
     - Desktop: rotateY 180° on hover
     - Mobile:  tap to toggle flip state (uses onClick with preventDefault)
     - Both faces are fully accessible; back is aria-hidden until flipped
   ────────────────────────────────────────────────────────────── */

import { useState, useRef, useEffect, memo } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { MolecularGlyph } from "@/components/MolecularGlyph";

export type Tone = "cream" | "sage" | "rose" | "sky" | "dusk" | "butter" | "cobalt" | "mineral";

const TONE_MAP: Record<Tone, { bg: string; ink: string; liquid: string; label: string }> = {
  cream:   { bg: "var(--nx-ceramic)", ink: "var(--nx-fg)", liquid: "var(--nx-acid)", label: "Peptide" },
  sage:    { bg: "var(--nx-vial-sage-bg)", ink: "var(--nx-fg)", liquid: "var(--nx-vial-sage-liq)", label: "Recovery" },
  rose:    { bg: "var(--nx-vial-rose-bg)", ink: "var(--nx-fg)", liquid: "var(--nx-vial-rose-liq)", label: "Skin" },
  sky:     { bg: "var(--nx-vial-sky-bg)", ink: "var(--nx-fg)", liquid: "var(--nx-vial-sky-liq)", label: "Cognition" },
  dusk:    { bg: "var(--nx-vial-dusk-bg)", ink: "var(--nx-fg)", liquid: "var(--nx-vial-dusk-liq)", label: "Sleep" },
  butter:  { bg: "var(--nx-vial-butter-bg)", ink: "var(--nx-fg)", liquid: "var(--nx-vial-butter-liq)", label: "Growth" },
  cobalt:  { bg: "var(--nx-vial-cobalt-bg)", ink: "var(--nx-fg)", liquid: "var(--nx-vial-cobalt-liq)", label: "Longevity" },
  mineral: { bg: "var(--nx-ice)", ink: "var(--nx-fg)", liquid: "var(--nx-vial-mineral-liq)", label: "Metabolic" },
};

/* Detect touch — we swap hover behavior for tap on mobile */
function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const check = () =>
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setTouch(check());
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const l = () => setTouch(check());
    mq.addEventListener?.("change", l);
    return () => mq.removeEventListener?.("change", l);
  }, []);
  return touch;
}

/* ── Illustrated Vial ─────────────────────────────────────────── */
export function VialArt({
  tone,
  glyph,
  size = 260,
}: {
  tone: Tone;
  glyph:
    | "chain"
    | "ring"
    | "copper"
    | "helix"
    | "branch"
    | "ghrh"
    | "secretagogue"
    | "fragment"
    | "flask"
    | "leaf"
    | "spark"
    | "crescent"
    | "bolt"
    | "drop";
  size?: number;
}) {
  const t = TONE_MAP[tone];
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden
    >
      {/* Ambient shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          width: "58%",
          height: 14,
          borderRadius: "50%",
          background: "rgba(21, 24, 28,0.14)",
          filter: "blur(8px)",
        }}
      />
      {/* Vial SVG */}
      <svg
        width={size * 0.55}
        height={size * 0.92}
        viewBox="0 0 110 220"
        style={{ position: "relative", zIndex: 2 }}
      >
        <defs>
          <linearGradient id={`glass-${tone}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(21, 24, 28,0.10)" />
          </linearGradient>
          <linearGradient id={`liquid-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.liquid} stopOpacity="0.55" />
            <stop offset="100%" stopColor={t.liquid} stopOpacity="0.95" />
          </linearGradient>
          <clipPath id={`bottle-clip-${tone}`}>
            <path d="M 30 60 L 30 200 Q 30 210 40 210 L 70 210 Q 80 210 80 200 L 80 60 Z" />
          </clipPath>
        </defs>

        {/* Aluminum crimp cap */}
        <rect x="32" y="10" width="46" height="14" rx="2" fill="var(--nx-vial-cap)" />
        <rect x="32" y="10" width="46" height="4" rx="1" fill="var(--nx-vial-cap-shadow)" />
        {/* Rubber stopper */}
        <rect x="35" y="24" width="40" height="16" rx="1" fill="var(--nx-vial-label)" />
        <rect x="35" y="24" width="40" height="3" rx="1" fill="var(--nx-vial-label-shadow)" />
        {/* Neck */}
        <rect x="38" y="40" width="34" height="18" fill="rgba(255,255,255,0.9)" />
        <rect x="38" y="40" width="34" height="18" fill={`url(#glass-${tone})`} />

        {/* Bottle body — glass */}
        <path
          d="M 30 60 L 30 200 Q 30 210 40 210 L 70 210 Q 80 210 80 200 L 80 60 Z"
          fill="rgba(255,255,255,0.95)"
        />
        <path
          d="M 30 60 L 30 200 Q 30 210 40 210 L 70 210 Q 80 210 80 200 L 80 60 Z"
          fill={`url(#glass-${tone})`}
        />

        {/* Liquid fill — clipped inside bottle */}
        <g clipPath={`url(#bottle-clip-${tone})`}>
          <rect x="30" y="105" width="50" height="105" fill={`url(#liquid-${tone})`} />
          {/* meniscus */}
          <ellipse cx="55" cy="105" rx="25" ry="3" fill={t.liquid} opacity="0.9" />
          <ellipse cx="55" cy="105" rx="25" ry="1.5" fill="rgba(255,255,255,0.6)" />
        </g>

        {/* Highlight (left) */}
        <rect x="34" y="70" width="4" height="130" rx="2" fill="rgba(255,255,255,0.7)" />
        {/* Shadow (right) */}
        <rect x="72" y="70" width="3" height="130" rx="1.5" fill="rgba(21, 24, 28,0.08)" />

        {/* Label band */}
        <rect x="30" y="135" width="50" height="42" fill="rgba(246, 249, 252,0.94)" />
        <rect x="30" y="135" width="50" height="1" fill="rgba(21, 24, 28,0.08)" />
        <rect x="30" y="176" width="50" height="1" fill="rgba(21, 24, 28,0.08)" />

        {/* Glyph inside label */}
        <g transform="translate(37, 141) scale(0.18)">
          <foreignObject width="200" height="200">
            <div
              // eslint-disable-next-line
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ width: 200, height: 200, color: t.ink }}
            >
              <MolecularGlyph glyph={glyph} size={200} />
            </div>
          </foreignObject>
        </g>

        {/* Outer glass outline for definition */}
        <path
          d="M 30 60 L 30 200 Q 30 210 40 210 L 70 210 Q 80 210 80 200 L 80 60 Z"
          fill="none"
          stroke="rgba(21, 24, 28,0.12)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

/* ── Main VialTile ────────────────────────────────────────────── */
export interface VialTileProps {
  href: string;
  name: string;
  fullName?: string;
  tagline: string;
  tone?: Tone;
  glyph:
    | "chain"
    | "ring"
    | "copper"
    | "helix"
    | "branch"
    | "ghrh"
    | "secretagogue"
    | "fragment"
    | "flask"
    | "leaf"
    | "spark"
    | "crescent"
    | "bolt"
    | "drop";
  price?: number;      // $/mo
  categoryLabel?: string;
  evidenceTier?: "A" | "B" | "C";
  mechanism?: string;  // short 1-2 sentence
  dose?: string;
  cycle?: string;
  ctaLabel?: string;
  badge?: string;      // e.g. "In Wolverine stack" or "Best-seller"
  fdaStatus?: string;  // regulatory status text (Wave 8)
  testId?: string;
}

function VialTileInner({
  href,
  name,
  fullName,
  tagline,
  tone = "cream",
  glyph,
  price,
  categoryLabel,
  evidenceTier,
  mechanism,
  dose,
  cycle,
  ctaLabel = "See details",
  badge,
  fdaStatus,
  testId,
}: VialTileProps) {
  // Wave 8 · Regulatory chip classifier
  const reg = (() => {
    if (!fdaStatus) return null;
    const s = fdaStatus.toLowerCase();
    if (s.startsWith("fda-approved")) return { label: "FDA-approved molecule", bg: "var(--nx-chip-fda-bg)", color: "var(--nx-chip-fda-fg)", border: "var(--nx-chip-fda-edge)" };
    if (s.includes("development halted") || s.includes("phase 2") || s.includes("phase 3") || s.includes("clinical trial")) return { label: "In trials", bg: "var(--nx-chip-trial-bg)", color: "var(--nx-chip-trial-fg)", border: "var(--nx-chip-trial-edge)" };
    if (s.startsWith("not fda-approved") || s.includes("investigational") || s.includes("compounded") || s.includes("registered as a drug in russia")) return { label: "Rx \u00b7 Compounded", bg: "var(--nx-ice)", color: "var(--nx-chip-rx-fg)", border: "var(--nx-chip-rx-edge)" };
    return { label: "Rx", bg: "var(--nx-ice)", color: "var(--nx-chip-rx-fg)", border: "var(--nx-chip-rx-edge)" };
  })();
  const [flipped, setFlipped] = useState(false);
  const isTouch = useIsTouch();
  const tileId = testId ?? name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const t = TONE_MAP[tone];
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (isTouch) {
      // On touch: first tap flips, second tap follows the link
      if (!flipped) {
        e.preventDefault();
        setFlipped(true);
      }
    }
  };

  const handleFocus = () => {
    // Reveal on keyboard focus too
    setFlipped(true);
  };

  const handleBlur = () => {
    setFlipped(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="vial-tile-perspective"
      style={{
        perspective: "1600px",
        width: "100%",
        aspectRatio: "1 / 1.32",
      }}
      data-testid={`vial-tile-${tileId}`}
    >
      <div
        className={`vial-tile-inner ${flipped ? "flipped" : ""}`}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform var(--nx-dur-4) var(--nx-ease)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onMouseEnter={() => !isTouch && setFlipped(true)}
        onMouseLeave={() => !isTouch && setFlipped(false)}
      >
        {/* ── FRONT FACE ─────────────────────────────────────── */}
        <Link
          href={href}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-hidden={flipped}
          tabIndex={flipped ? -1 : 0}
          data-testid={`vial-tile-front-${tileId}`}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(20px, 2.2vw, 30px)",
            borderRadius: 24,
            background: t.bg,
            color: t.ink,
            textDecoration: "none",
            border: "1px solid rgba(21, 24, 28,0.08)",
            boxShadow: flipped
              ? "0 30px 60px -20px rgba(21, 24, 28,0.25)"
              : "0 4px 18px -6px rgba(21, 24, 28,0.10)",
            transition: "box-shadow var(--nx-dur-slow)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            overflow: "hidden",
          }}
        >
          {/* Top row — pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
              zIndex: 3,
            }}
          >
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {categoryLabel && (
                <span
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: t.ink,
                    opacity: 0.62,
                    padding: "5px 10px",
                    border: "1px solid rgba(21, 24, 28,0.12)",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.6)",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {categoryLabel}
                </span>
              )}
              {evidenceTier && (
                <span
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: t.ink,
                    padding: "5px 10px",
                    background: "rgba(152, 182, 213,0.55)",
                    borderRadius: 999,
                  }}
                >
                  Tier {evidenceTier}
                </span>
              )}
              {reg && (
                <span
                  data-testid={`regulatory-chip-${tileId}`}
                  title={fdaStatus}
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: reg.color,
                    padding: "5px 10px",
                    background: reg.bg,
                    border: `1px solid ${reg.border}`,
                    borderRadius: 999,
                  }}
                >
                  {reg.label}
                </span>
              )}
            </div>
            {badge && (
              <span
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--nx-ceramic)",
                  padding: "5px 10px",
                  background: "var(--nx-fg)",
                  borderRadius: 999,
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Vial art — centered */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "clamp(-8px, -0.5vw, 0px) 0",
              zIndex: 2,
              transition: "transform var(--nx-dur-slow) var(--nx-ease)",
              transform: flipped ? "translateY(-6px)" : "translateY(0)",
            }}
          >
            <VialArt tone={tone} glyph={glyph} size={180} />
          </div>

          {/* Bottom — name + price */}
          <div style={{ zIndex: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 12,
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(18px, 1.9vw, 24px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    color: t.ink,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </h3>
                {fullName && (
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      color: t.ink,
                      opacity: 0.5,
                      marginTop: 4,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {fullName}
                  </div>
                )}
              </div>
              {price != null && (
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(16px, 1.7vw, 22px)",
                      letterSpacing: "-0.02em",
                      color: t.ink,
                      lineHeight: 1,
                    }}
                  >
                    ${price}
                  </div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: t.ink,
                      opacity: 0.55,
                      marginTop: 3,
                    }}
                  >
                    per month
                  </div>
                </div>
              )}
            </div>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: 14,
                lineHeight: 1.4,
                color: t.ink,
                opacity: 0.68,
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              {tagline}
            </p>
          </div>

          {/* Micro flip hint */}
          {!flipped && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: 14,
                right: 14,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(21, 24, 28,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 4,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: t.ink, opacity: 0.5 }}>
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 3v6h6" />
              </svg>
            </div>
          )}
        </Link>

        {/* ── BACK FACE ──────────────────────────────────────── */}
        <div
          aria-hidden={!flipped}
          data-testid={`vial-tile-back-${tileId}`}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(22px, 2.4vw, 32px)",
            borderRadius: 24,
            background: "var(--nx-fg)",
            color: "var(--nx-ceramic)",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            border: "1px solid rgba(246, 249, 252,0.10)",
            boxShadow: "0 30px 60px -20px rgba(21, 24, 28,0.35)",
            overflow: "hidden",
          }}
        >
          {/* Ambient acid glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(152, 182, 213,0.24), rgba(152, 182, 213,0) 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(246, 249, 252,0.06)",
                  border: "1px solid rgba(246, 249, 252,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--nx-acid)",
                }}
              >
                <MolecularGlyph glyph={glyph} size={26} title={`${name} glyph`} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 18,
                    letterSpacing: "-0.01em",
                    color: "var(--nx-ceramic)",
                    lineHeight: 1,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--nx-acid)",
                    marginTop: 4,
                  }}
                >
                  {categoryLabel ?? "Peptide"}
                </div>
              </div>
            </div>

            {mechanism && (
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "rgba(246, 249, 252,0.82)",
                  margin: 0,
                }}
              >
                {mechanism}
              </p>
            )}

            {/* Data rows */}
            <div
              style={{
                marginTop: 22,
                borderTop: "1px solid rgba(246, 249, 252,0.10)",
                paddingTop: 16,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {dose && (
                <div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(246, 249, 252,0.42)",
                    }}
                  >
                    Typical dose
                  </div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 13,
                      color: "var(--nx-ceramic)",
                      marginTop: 4,
                      lineHeight: 1.3,
                    }}
                  >
                    {dose}
                  </div>
                </div>
              )}
              {cycle && (
                <div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(246, 249, 252,0.42)",
                    }}
                  >
                    Cycle
                  </div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 13,
                      color: "var(--nx-ceramic)",
                      marginTop: 4,
                      lineHeight: 1.3,
                    }}
                  >
                    {cycle}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {price != null && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingBottom: 14,
                  borderBottom: "1px solid rgba(246, 249, 252,0.10)",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(246, 249, 252,0.48)",
                  }}
                >
                  Starts at
                </div>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 22,
                    color: "var(--nx-ceramic)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  ${price}
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(246, 249, 252,0.48)",
                      marginLeft: 4,
                    }}
                  >
                    /mo
                  </span>
                </div>
              </div>
            )}
            <Link
              href={href}
              tabIndex={flipped ? 0 : -1}
              data-testid={`vial-tile-cta-${tileId}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--nx-acid)",
                color: "var(--nx-fg)",
                padding: "14px 22px",
                borderRadius: 999,
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {ctaLabel}
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* All props are primitives (strings/numbers), so a shallow-compare memo skips
   re-renders when a cart mutation elsewhere re-renders the tile list. */
export const VialTile = memo(VialTileInner);

/* Utility — map peptide category to a Tone */
export function categoryToTone(cat: string): Tone {
  switch (cat) {
    case "recovery":
      return "sage";
    case "skin":
      return "rose";
    case "cognition":
      return "sky";
    case "sleep":
      return "dusk";
    case "growth":
      return "butter";
    case "longevity":
      return "cobalt";
    case "metabolic":
      return "mineral";
    default:
      return "cream";
  }
}
