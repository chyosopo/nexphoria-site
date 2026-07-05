import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import gateHer from "@/assets/brand/gate-her.webp";
import gateHim from "@/assets/brand/gate-him.webp";
import { Logo } from "@/components/Logo";
import { useSeo, webPageJsonLd } from "@/lib/seo";

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Gate() {
  useSeo({
    title: "Nexphoria — peptide therapy, physician-prescribed and lab-monitored",
    description: "Single peptides, physician-curated stacks, or a fully custom protocol. Every compound prescribed by a board-certified physician and compounded in a U.S. 503A pharmacy. Tell us your goals.",
    path: "/gate",
    jsonLd: [webPageJsonLd({
      name: "Nexphoria Gateway",
      description: "Choose your path: single peptides, physician-curated stacks, or a custom protocol.",
      path: "/gate",
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
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginTop: "6px",
          }}
        >
          PEPTIDE PHARMACY · BY PHYSICIANS
        </p>
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            marginTop: "10px",
            letterSpacing: "0.02em",
            pointerEvents: "auto",
          }}
        >
          <a
            href="#/stacks"
            style={{ color: "rgba(255,255,255,0.75)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            data-testid="gate-link-stacks"
          >
            Browse stacks
          </a>
          <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.3)" }}>·</span>
          <a
            href="#/how-it-works"
            style={{ color: "rgba(255,255,255,0.75)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            data-testid="gate-link-how"
          >
            How it works
          </a>
          <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.3)" }}>·</span>
          <a
            href="#/assessment"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            data-testid="gate-link-assessment"
          >
            Start assessment
          </a>
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
                fontFamily: "'General Sans', system-ui, sans-serif",
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

const flagshipPeek: Record<
  "her" | "him",
  Array<{ num: string; name: string; peptides: string; from: string }>
> = {
  her: [
    { num: "01", name: "Metabolic", peptides: "Tirzepatide · Semaglutide", from: "$249/mo" },
    { num: "02", name: "Skin & Recovery", peptides: "GHK-Cu · BPC-157", from: "$199/mo" },
    { num: "03", name: "Longevity", peptides: "NAD+ · MOTS-c · Epitalon", from: "$299/mo" },
  ],
  him: [
    { num: "01", name: "Strength", peptides: "CJC-1295 · Ipamorelin", from: "$279/mo" },
    { num: "02", name: "Metabolic", peptides: "Tirzepatide · Semaglutide", from: "$249/mo" },
    { num: "03", name: "Longevity", peptides: "NAD+ · MOTS-c · Sermorelin", from: "$299/mo" },
  ],
};

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
  const stacks = flagshipPeek[side];

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
          borderRadius: 999,
          backgroundColor: "rgba(10,10,10,0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,243,0.12)",
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
            backgroundColor: "#C97A4A",
          }}
          animate={reducedMotion ? {} : { opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#FFFFF3",
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
              borderRadius: 4,
              backgroundColor: "rgba(10,10,10,0.72)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,243,0.14)",
              boxShadow: "0 24px 48px -16px rgba(0,0,0,0.5)",
              pointerEvents: "none",
            }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: side === "her" ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: side === "her" ? 12 : -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,243,0.55)",
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
                    borderBottom: i < stacks.length - 1 ? "1px solid rgba(255,255,243,0.08)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          
                          fontSize: 13,
                          color: "#C97A4A",
                          letterSpacing: "-0.01em",
                          lineHeight: 1,
                        }}
                      >
                        {s.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#FFFFF3",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: 11,
                        fontWeight: 500,
                        color: "rgba(255,255,243,0.75)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.from}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 12,
                      color: "rgba(255,255,243,0.6)",
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
            fontFamily: "'General Sans', system-ui, sans-serif",
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
            fontFamily: "'General Sans', system-ui, sans-serif",
            
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
          [data-testid="${testId}"] .gate-peek-panel {
            display: none !important;
          }
          [data-testid="${testId}"] .gate-card-top-chips {
            top: 92px !important;
            right: 16px !important;
            left: auto !important;
            padding: 6px 10px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
