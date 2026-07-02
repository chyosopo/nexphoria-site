import React from "react";
import { PillBadge } from "./PillBadge";

/**
 * One-giant-stat panel — a full-width section with a single confident number
 * and small supporting caption. Zero decoration.
 *
 * Inspired by Bask Health's "3,514,885 Orders" section.
 *
 * Usage:
 *   <GiantStatPanel
 *     badge="By the numbers"
 *     value="47,000+"
 *     label="Protocols dispensed"
 *     footnote="Since 2024 · US 503A pharmacies"
 *   />
 */
export function GiantStatPanel({
  badge,
  value,
  label,
  footnote,
  tone = "light",
}: {
  badge?: string;
  value: React.ReactNode;
  label: React.ReactNode;
  footnote?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <section
      data-testid="giant-stat-panel"
      style={{
        marginTop: 96,
        marginBottom: 96,
        borderRadius: "var(--mx-tile-radius, 20px)",
        padding: "clamp(64px, 8vw, 128px) clamp(24px, 4vw, 64px)",
        background: isDark ? "var(--nx-fg)" : "color-mix(in oklab, var(--nx-fg) 3%, var(--nx-bg-cream, var(--nx-ceramic)))",
        border: isDark
          ? "1px solid rgba(243, 248, 255,0.06)"
          : "1px solid color-mix(in oklab, var(--nx-fg) 8%, transparent)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {badge && (
        <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
          <PillBadge>{badge}</PillBadge>
        </div>
      )}
      <div
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500,
          fontSize: "clamp(64px, 12vw, 180px)",
          lineHeight: 0.94,
          letterSpacing: "-0.04em",
          color: isDark ? "var(--nx-ceramic)" : "var(--nx-fg)",
          fontVariantNumeric: "tabular-nums lining-nums",
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: "'General Sans', system-ui, sans-serif",
          
          fontSize: "clamp(20px, 2.4vw, 32px)",
          fontWeight: 400,
          color: isDark
            ? "rgba(243, 248, 255,0.72)"
            : "color-mix(in oklab, var(--nx-fg) 65%, transparent)",
          lineHeight: 1.2,
        }}
      >
        {label}
      </div>
      {footnote && (
        <div
          style={{
            marginTop: 32,
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: isDark
              ? "rgba(243, 248, 255,0.42)"
              : "color-mix(in oklab, var(--nx-fg) 45%, transparent)",
          }}
        >
          {footnote}
        </div>
      )}
    </section>
  );
}
