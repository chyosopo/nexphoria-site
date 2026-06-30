import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import gateHer from "@/assets/brand/gate-her.jpg";
import gateHim from "@/assets/brand/gate-him.jpg";
import { Logo } from "@/components/Logo";

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Gate() {
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
        backgroundColor: "var(--nx-bg, #FFFFF3)",
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
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginTop: "6px",
          }}
        >
          PEPTIDE PHARMACY · BY PHYSICIANS
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
          onHover={(v) => setHoveredCard(v ? "her" : null)}
          onClick={() => handleChoose("her")}
        />
        <GateCard
          side="him"
          image={gateHim}
          chosen={chosen}
          isHovered={hoveredCard === "him"}
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
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
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
                width: "180px",
                backgroundColor: "var(--nx-cobalt)",
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

interface GateCardProps {
  side: "her" | "him";
  image: string;
  chosen: null | "her" | "him";
  isHovered: boolean;
  onHover: (v: boolean) => void;
  onClick: () => void;
}

function GateCard({
  side,
  image,
  chosen,
  isHovered,
  onHover,
  onClick,
}: GateCardProps) {
  const isChosen = chosen === side;
  const isOther = chosen !== null && chosen !== side;
  const label = side === "her" ? "For her." : "For him.";
  const eyebrow =
    side === "her" ? "PEPTIDES BUILT FOR WOMEN" : "PEPTIDES BUILT FOR MEN";
  const ariaLabel =
    side === "her" ? "Enter peptides for her" : "Enter peptides for him";
  const testId = side === "her" ? "gate-card-her" : "gate-card-him";

  // Outer card: when chosen, expand to fixed full-viewport overlay
  const cardStyle: React.CSSProperties = isChosen
    ? {
        position: "fixed",
        inset: 0,
        zIndex: 100,
        cursor: "default",
        overflow: "hidden",
      }
    : {
        position: "relative",
        flex: 1,
        overflow: "hidden",
        cursor: "pointer",
      };

  return (
    <motion.div
      data-testid={testId}
      aria-label={ariaLabel}
      role="button"
      tabIndex={chosen ? -1 : 0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      onMouseEnter={() => !chosen && onHover(true)}
      onMouseLeave={() => onHover(false)}
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
        }}
        transition={{
          duration: isChosen ? 0.7 : 0.6,
          ease: "easeOut",
        }}
      >
        <img
          src={image}
          alt={label}
          loading="eager"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
            "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
        animate={{
          background: isHovered && !isChosen
            ? "linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
        }}
        transition={{ duration: 0.5 }}
      />

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
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "12px",
          }}
        >
          {eyebrow}
        </p>

        {/* Main label */}
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(3.5rem, 6vw, 6rem)",
            lineHeight: 1.0,
            color: "#FFFFF3",
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
              stroke="#FFFFF3"
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
        }
      `}</style>
    </motion.div>
  );
}
