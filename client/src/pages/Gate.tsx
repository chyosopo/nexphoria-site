import { useState, useRef } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gateHer from "@/assets/brand/gate-her.webp";
import gateHim from "@/assets/brand/gate-him.webp";
import { Logo } from "@/components/Logo";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { F, S } from "@/lib/typography";

export default function Gate() {
  // Reactive OS-setting subscription (framer-motion) — respects a live toggle,
  // and never reads `window` at import time. `null` (SSR) coerces to false.
  const reducedMotion = useReducedMotion() ?? false;

  useSeo({
    title: "Nexphoria — peptide therapy, physician-prescribed and lab-monitored",
    description: "Single peptides, physician-curated stacks, or a fully custom protocol. Every compound prescribed by a board-certified physician and compounded in a U.S. 503A pharmacy. Tell us your goals.",
    path: "/",
    jsonLd: [webPageJsonLd({
      name: "Nexphoria Gateway",
      description: "Choose your path: single peptides, physician-curated stacks, or a custom protocol.",
      path: "/",
    })],
  });
  const [, setLocation] = useLocation();
  const [chosen, setChosen] = useState<null | "her" | "him">(null);
  const [hoveredCard, setHoveredCard] = useState<null | "her" | "him">(null);
  const isAnimating = useRef(false);

  const handleChoose = (side: "her" | "him") => {
    if (isAnimating.current || chosen) return;
    isAnimating.current = true;
    setChosen(side);
    const delay = reducedMotion ? 300 : 950;
    setTimeout(() => {
      setLocation(side === "her" ? "/women" : "/men");
    }, delay);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "var(--nx-bg, var(--nx-ceramic))",
      }}
      data-testid="gate-page"
    >
      {/* ── Top bar ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "32px",
          pointerEvents: "none",
        }}
      >
        <Logo variant="light" />
        <p
          style={{
            fontFamily: F,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(246, 249, 252,0.55)",
            marginTop: "6px",
          }}
        >
          PEPTIDE PROTOCOLS · PHYSICIAN-PRESCRIBED
        </p>
        <p
          style={{
            fontFamily: F,
            fontSize: "var(--nx-t-xs)",
            fontWeight: 400,
            color: "rgba(246, 249, 252,0.55)",
            marginTop: "10px",
            letterSpacing: "0.02em",
            pointerEvents: "auto",
          }}
        >
          <Link
            href="/stacks"
            style={{ color: "rgba(246, 249, 252,0.75)", textDecoration: "underline", textUnderlineOffset: "3px", display: "inline-block", padding: "14px 8px", margin: "-14px -8px" }}
            data-testid="gate-link-stacks"
          >
            Browse stacks
          </Link>
          <span aria-hidden="true" style={{ margin: "0 10px", color: "rgba(246, 249, 252,0.3)" }}>·</span>
          <Link
            href="/how-it-works"
            style={{ color: "rgba(246, 249, 252,0.75)", textDecoration: "underline", textUnderlineOffset: "3px", display: "inline-block", padding: "14px 8px", margin: "-14px -8px" }}
            data-testid="gate-link-how"
          >
            How it works
          </Link>
          <span aria-hidden="true" style={{ margin: "0 10px", color: "rgba(246, 249, 252,0.3)" }}>·</span>
          <Link
            href="/assessment"
            style={{ color: "rgba(246, 249, 252,0.85)", textDecoration: "underline", textUnderlineOffset: "3px", display: "inline-block", padding: "14px 8px", margin: "-14px -8px" }}
            data-testid="gate-link-assessment"
          >
            Start assessment
          </Link>
        </p>
      </div>

      {/* ── Two-panel split ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "row",
        }}
        className="gate-panels"
      >
        <GateCard
          side="her"
          image={gateHer}
          chosen={chosen}
          isHovered={hoveredCard === "her"}
          reducedMotion={reducedMotion}
          onHover={(v) => setHoveredCard(v ? "her" : null)}
          onClick={() => handleChoose("her")}
        />
        <GateCard
          side="him"
          image={gateHim}
          chosen={chosen}
          isHovered={hoveredCard === "him"}
          reducedMotion={reducedMotion}
          onHover={(v) => setHoveredCard(v ? "him" : null)}
          onClick={() => handleChoose("him")}
        />
      </div>

      {/* ── Entry caption overlay (fades in after click) ── */}
      <AnimatePresence>
        {chosen && (
          <motion.div
            key="entry-caption"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0.1 : 0.42, duration: 0.28 }}
            style={{
              position: "fixed",
              bottom: "48px",
              left: 0,
              right: 0,
              zIndex: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              pointerEvents: "none",
            }}
          >
            <p
              style={{
                fontFamily: F,
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                /* ceramic on a navy scrim chip — cobalt sat directly on the
                   dark photograph and failed contrast during the transition */
                color: "var(--nx-ceramic)",
                background: "color-mix(in srgb, var(--nx-fg) 58%, transparent)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                padding: "8px 14px",
                borderRadius: "var(--nx-r-pill)",
              }}
            >
              ENTERING — PEPTIDES FOR {chosen === "her" ? "HER" : "HIM"}
            </p>
            {/* animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: reducedMotion ? 0.15 : 0.52,
                duration: 0.25,
                ease: "easeOut",
              }}
              style={{
                height: "1px",
                // stretch to the caption chip's width (a fixed 180px rule
                // stopped ~55px short of the text) — ceramic to match it
                alignSelf: "stretch",
                backgroundColor: "color-mix(in srgb, var(--nx-ceramic) 70%, transparent)",
                transformOrigin: "left center",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile stacked styles */}
      <style>{`
        @media (max-width: 767px) {
          .gate-panels {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// GateCard
// ─────────────────────────────────────────────

/* Peek rows derive from the real catalog — the previous hardcoded protocol
   names and prices did not exist in FLAGSHIP_STACKS (TRUE-claims law). */
const peekFor = (side: "her" | "him") =>
  FLAGSHIP_STACKS
    .filter((s) => !s.gated && (s.worldLean === side || s.worldLean === "both" || !s.worldLean))
    .slice(0, 3)
    .map((s, i) => ({
      num: String(i + 1).padStart(2, "0"),
      name: s.name,
      peptides: s.peptides.slice(0, 3).map((p) => p.name).join(" · "),
      from: `${usd(s.cadences[2]?.perMonth ?? s.cadences[0]?.perMonth ?? s.cadences[0]?.total ?? 0)}/mo`,
    }));

const flagshipPeek: Record<
  "her" | "him",
  Array<{ num: string; name: string; peptides: string; from: string }>
> = { her: peekFor("her"), him: peekFor("him") };

interface GateCardProps {
  side: "her" | "him";
  image: string;
  chosen: null | "her" | "him";
  isHovered: boolean;
  reducedMotion: boolean;
  onHover: (v: boolean) => void;
  onClick: () => void;
}

function GateCard({
  side,
  image,
  chosen,
  isHovered,
  reducedMotion,
  onHover,
  onClick,
}: GateCardProps) {
  const isChosen = chosen === side;
  const isOther = chosen !== null && chosen !== side;
  const label = side === "her" ? "For her." : "For him.";
  const eyebrow =
    side === "her" ? "PEPTIDES BUILT FOR WOMEN" : "PEPTIDES BUILT FOR MEN";
  const ariaLabel =
    side === "her"
      ? "Enter the women's experience"
      : "Enter the men's experience";
  const testId = side === "her" ? "gate-card-her" : "gate-card-him";
  const stacks = flagshipPeek[side];

  // Button-reset base so the full-bleed <button> carries none of the UA chrome.
  const buttonReset: React.CSSProperties = {
    appearance: "none",
    WebkitAppearance: "none",
    border: "none",
    margin: 0,
    padding: 0,
    background: "transparent",
    font: "inherit",
    color: "inherit",
    textAlign: "inherit",
  };

  // Outer card: when chosen, expand to fixed full-viewport overlay
  const cardStyle: React.CSSProperties = isChosen
    ? {
        ...buttonReset,
        position: "fixed",
        inset: 0,
        zIndex: 100,
        cursor: "default",
        overflow: "hidden",
      }
    : {
        ...buttonReset,
        position: "relative",
        flex: 1,
        overflow: "hidden",
        cursor: "pointer",
      };

  return (
    <motion.button
      type="button"
      data-testid={testId}
      /* Theme each panel to its own world — azure for him, orchid for her — so
         every var(--nx-*) accent inside (dot, arrow, tint, focus ring) resolves
         per-world. Makes the two-world law literally visible while staying token-pure. */
      data-world={side === "her" ? "women" : "men"}
      aria-label={ariaLabel}
      /* Native <button> gives us Enter/Space activation + focus for free; the
         focus-visible ring uses the site-wide per-world cobalt token idiom,
         ring-inset so it stays visible on an edge-to-edge panel. */
      /* ceramic ring — the cobalt one disappeared against the photography */
      className="focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--nx-ceramic)] focus-visible:ring-inset"
      tabIndex={chosen ? -1 : 0}
      disabled={chosen !== null}
      onClick={onClick}
      onMouseEnter={() => !chosen && onHover(true)}
      onMouseLeave={() => onHover(false)}
      /* keyboard parity: tabbing onto a card surfaces the same peek panel
         and brightening the pointer hover gives */
      onFocus={() => !chosen && onHover(true)}
      onBlur={() => onHover(false)}
      style={cardStyle}
      animate={
        isOther
          ? { opacity: 0 }
          : isChosen
          ? { opacity: 1 }
          : { opacity: 1 }
      }
      transition={
        isOther
          ? { duration: reducedMotion ? 0.3 : 0.4, ease: "easeOut" }
          : { duration: 0.3 }
      }
    >
      {/* Background image with parallax scale on click */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          willChange: "transform",
        }}
        animate={{
          scale: isChosen && !reducedMotion ? 1.05 : isHovered && !reducedMotion ? 1.03 : 1.0,
          filter: isHovered && !isChosen && !reducedMotion ? "brightness(1.07) saturate(1.04)" : "brightness(1) saturate(1)",
        }}
        transition={{
          duration: isChosen ? 0.7 : 0.6,
          ease: "easeOut",
        }}
      >
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="eager"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            /* keep faces in the upper third through the half→full recrop */
            objectPosition: "50% 22%",
            display: "block",
          }}
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(21, 24, 28,0.45) 0%, rgba(21, 24, 28,0.15) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
        animate={{
          background: isHovered && !isChosen
            ? "linear-gradient(to top, rgba(21, 24, 28,0.58) 0%, rgba(21, 24, 28,0.2) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(21, 24, 28,0.45) 0%, rgba(21, 24, 28,0.15) 55%, transparent 100%)",
        }}
        transition={{ duration: 0.5 }}
      />
      {/* Top scrim — the top-bar tagline and nav links sat on bare photography */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(21, 24, 28,0.5) 0%, rgba(21, 24, 28,0.18) 12%, transparent 26%)",
          pointerEvents: "none",
        }}
      />

      {/* World-tint wash — orchid for her, azure for him (per-world var, soft-light
          blended so it colors the photograph without muddying it). Intensifies on hover. */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          mixBlendMode: "soft-light",
          background: "linear-gradient(to top, color-mix(in srgb, var(--nx-cobalt) 62%, transparent) 0%, color-mix(in srgb, var(--nx-cobalt) 18%, transparent) 45%, transparent 78%)",
        }}
        animate={{ opacity: isChosen ? 0.75 : isHovered ? 0.95 : 0.5 }}
        transition={{ duration: 0.5 }}
      />

      {/* Top chip strip: protocol count + pulsing dot — anchored to outer corners away from wordmark */}
      <motion.div
        className="gate-card-top-chips"
        style={{
          position: "absolute",
          top: 32,
          left: side === "her" ? 32 : "auto",
          right: side === "him" ? 32 : "auto",
          zIndex: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: "var(--nx-r-pill)",
          backgroundColor: "rgba(21, 24, 28,0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(246, 249, 252,0.12)",
        }}
        animate={{ opacity: isChosen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "var(--nx-rust)",
          }}
          animate={reducedMotion ? {} : { opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          style={{
            fontFamily: F,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--nx-ceramic)",
          }}
        >
          3 Flagship Protocols
        </span>
      </motion.div>

      {/* Hover peek panel (desktop only) */}
      <AnimatePresence>
        {isHovered && !isChosen && (
          <motion.div
            key="peek-panel"
            className="gate-peek-panel"
            style={{
              position: "absolute",
              top: "50%",
              right: side === "her" ? 48 : "auto",
              left: side === "him" ? 48 : "auto",
              transform: "translateY(-50%)",
              zIndex: 11,
              width: 320,
              padding: "24px 24px 20px",
              borderRadius: "var(--nx-r-md)",
              backgroundColor: "rgba(21, 24, 28,0.72)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(246, 249, 252,0.14)",
              boxShadow: "var(--nx-e-4)",
              pointerEvents: "none",
            }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: side === "her" ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: side === "her" ? 12 : -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p
              style={{
                fontFamily: F,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(246, 249, 252,0.55)",
                marginBottom: 16,
              }}
            >
              Built for {side === "her" ? "her" : "him"}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {stacks.map((s, i) => (
                <motion.li
                  key={s.name}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 + i * 0.07, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    paddingBottom: i < stacks.length - 1 ? 14 : 0,
                    borderBottom: i < stacks.length - 1 ? "1px solid rgba(246, 249, 252,0.08)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span
                        style={{
                          fontFamily: F,
                          
                          fontSize: 13,
                          color: "var(--nx-rust)",
                          letterSpacing: "-0.01em",
                          lineHeight: 1,
                        }}
                      >
                        {s.num}
                      </span>
                      <span
                        style={{
                          fontFamily: F,
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--nx-ceramic)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: F,
                        fontSize: 11,
                        fontWeight: 500,
                        color: "rgba(246, 249, 252,0.75)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.from}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: F,
                      fontSize: 12,
                      color: "rgba(246, 249, 252,0.6)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {s.peptides}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text content */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: "48px",
          zIndex: 10,
        }}
        className="gate-card-text"
        animate={{
          opacity: isChosen ? 0 : 1,
        }}
        transition={{
          delay: isChosen ? (reducedMotion ? 0 : 0.3) : 0,
          duration: 0.2,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: F,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(246, 249, 252,0.6)",
            marginBottom: "12px",
          }}
        >
          {eyebrow}
        </p>

        {/* Main label — the site's single biggest display moment carries the
            display serif, matching every other hero on the site */}
        <p
          style={{
            fontFamily: S,
            fontWeight: 500,
            fontSize: "clamp(3.5rem, 6vw, 6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.015em",
            color: "var(--nx-ceramic)",
            marginBottom: "20px",
          }}
        >
          {label}
        </p>

        {/* Arrow button */}
        <motion.div
          animate={{
            x: isHovered && !isChosen ? 4 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "var(--nx-cobalt)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="var(--nx-ceramic)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Mobile padding override */}
      <style>{`
        @media (max-width: 767px) {
          [data-testid="${testId}"] .gate-card-text {
            padding: 24px !important;
          }
          [data-testid="${testId}"] .gate-card-text p:nth-child(2) {
            font-size: clamp(2.5rem, 10vw, 3.5rem) !important;
          }
          [data-testid="${testId}"] .gate-peek-panel {
            display: none !important;
          }
          [data-testid="${testId}"] .gate-card-top-chips {
            /* clear the stacked top bar (logo + tagline + nav links) — at
               92px the chip landed directly on the link row */
            top: 150px !important;
            right: 16px !important;
            left: auto !important;
            padding: 6px 10px !important;
          }
        }
      `}</style>
    </motion.button>
  );
}
