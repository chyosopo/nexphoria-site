import React from "react";

/**
 * Small outlined pill badge that sits above section headings.
 * Inspired by Bask Health's section-label pattern.
 *
 * Usage:
 *   <PillBadge>Physician-directed</PillBadge>
 *   <PillBadge tone="acid">New protocol</PillBadge>
 */
type Tone = "default" | "acid" | "cobalt";

export function PillBadge({
  children,
  tone = "default",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const dotColor =
    tone === "acid"
      ? "var(--nx-acid, var(--nx-acid))"
      : tone === "cobalt"
      ? "var(--nx-cobalt, var(--nx-fg))"
      : "var(--nx-acid, var(--nx-acid))";

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      style={{
        border:
          "1px solid color-mix(in oklab, var(--nx-fg) 22%, transparent)",
        borderRadius: 999,
        padding: "6px 14px 6px 10px",
        fontFamily: "'General Sans', system-ui, sans-serif",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "color-mix(in oklab, var(--nx-fg) 78%, transparent)",
        background: "transparent",
        lineHeight: 1,
      }}
      data-testid="pill-badge"
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: 999,
          background: dotColor,
          boxShadow: `0 0 0 3px color-mix(in oklab, ${dotColor} 28%, transparent)`,
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}
