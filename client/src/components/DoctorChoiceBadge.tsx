/**
 * DoctorChoiceBadge — reference-tier trust signal
 *
 * A pill with a tiny pulsing dot + "DOCTOR'S CHOICE" label.
 * Used on flagship product cards and the most-prescribed PDPs.
 *
 * Variants:
 *   - dark : light text on cobalt pill (default; lives on photo cards)
 *   - light: cobalt text on cream pill (use on light backgrounds)
 *
 * Sizes:
 *   - sm : 10px label, 22px tall — for PDP body
 *   - md : 11px label, 26px tall — for flagship cards
 */

import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface DoctorChoiceBadgeProps {
  variant?: "dark" | "light";
  size?: "sm" | "md";
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function DoctorChoiceBadge({
  variant = "dark",
  size = "md",
  label = "DOCTOR'S CHOICE",
  className,
  style,
}: DoctorChoiceBadgeProps) {
  const isDark = variant === "dark";
  const isSm = size === "sm";

  // Color tokens
  const bg = isDark ? "rgba(21, 24, 28,0.92)" : "var(--nx-bg)";
  const fg = isDark ? "var(--nx-bg)" : "var(--nx-cobalt)";
  const dotColor = "var(--nx-rust)"; // brand rust — used for "Limited" tag etc.
  const border = isDark ? "1px solid rgba(243, 245, 247,0.18)" : "1px solid rgba(21, 24, 28,0.10)";

  return (
    <div
      data-testid="doctor-choice-badge"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSm ? "6px" : "7px",
        padding: isSm ? "5px 10px" : "7px 12px",
        height: isSm ? 22 : 26,
        borderRadius: "var(--nx-r-pill)",
        backgroundColor: bg,
        border,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        ...style,
      }}
    >
      {/* Pulsing dot */}
      <div style={{ position: "relative", width: 6, height: 6 }}>
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundColor: dotColor,
            opacity: 0.5,
          }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundColor: dotColor,
          }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: isSm ? "9px" : "10px",
          fontWeight: 600,
          letterSpacing: "0.16em",
          color: fg,
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}
