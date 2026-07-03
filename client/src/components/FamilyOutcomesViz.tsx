import { useEffect, useState } from "react";

/**
 * FamilyOutcomesViz
 * -----------------
 * Parses a "·"-separated outcomes string like:
 *   "Body fat −18–28% over 52 weeks · HbA1c −0.8–1.4 pts · Waist −3–5 in"
 * into up to 4 mini horizontal delta bars showing the peak of the numeric range.
 *
 * Handles:
 *   1. Whitespace-prefixed signs:   "Body fat −18–28% over 52 weeks"
 *   2. Phrased deltas:              "Biological age reduction of 3.2 years"
 *   3. Qualitative statements:      "LH/FSH normalized to mid-range"  (no bar, just note row)
 * Guards against "IGF-1" style hyphens inside labels by requiring whitespace
 * before the sign character.
 */

const SANS = "'General Sans', ui-sans-serif, system-ui, sans-serif";
const MONO = "ui-monospace, monospace";

type Segment = {
  label: string;
  peak: number | null;   // null when segment has no numeric delta (qualitative row)
  unit: string;
  sign: 1 | -1 | 0;
  raw: string;
};

const RX_SIGNED = /^(.+?)\s+([+−])\s*(\d+(?:\.\d+)?)(?:\s*[–-]\s*(\d+(?:\.\d+)?))?\s*(%|pts?|pt|lb|lbs?|in|kg|years?)?\b(.*)$/i;
const RX_PHRASED_NEG = /^(.+?)\b(reduction|decrease|drop)\s+of\s+(\d+(?:\.\d+)?)(?:\s*[–-]\s*(\d+(?:\.\d+)?))?\s*(%|pts?|pt|lb|lbs?|in|kg|years?)?\b(.*)$/i;
const RX_PHRASED_POS = /^(.+?)\b(increase|elevation|gain|improvement)\s+of\s+(\d+(?:\.\d+)?)(?:\s*[–-]\s*(\d+(?:\.\d+)?))?\s*(%|pts?|pt|lb|lbs?|in|kg|years?)?\b(.*)$/i;

function parseSegment(seg: string): Segment | null {
  const trimmed = seg.trim();
  if (!trimmed) return null;

  const signedMatch = trimmed.match(RX_SIGNED);
  if (signedMatch) {
    const [, label, signChar, aStr, bStr, unit, tail] = signedMatch;
    const a = parseFloat(aStr);
    const b = bStr ? parseFloat(bStr) : a;
    return {
      label: label.trim(),
      peak: Math.max(a, b),
      unit: unit || "",
      sign: signChar === "+" ? 1 : -1,
      raw: (tail || "").trim(),
    };
  }

  const negPhrased = trimmed.match(RX_PHRASED_NEG);
  if (negPhrased) {
    const [, label, , aStr, bStr, unit, tail] = negPhrased;
    const a = parseFloat(aStr);
    const b = bStr ? parseFloat(bStr) : a;
    return {
      label: label.trim().replace(/[\s,.]+$/, ""),
      peak: Math.max(a, b),
      unit: unit || "",
      sign: -1,
      raw: (tail || "").trim(),
    };
  }

  const posPhrased = trimmed.match(RX_PHRASED_POS);
  if (posPhrased) {
    const [, label, , aStr, bStr, unit, tail] = posPhrased;
    const a = parseFloat(aStr);
    const b = bStr ? parseFloat(bStr) : a;
    return {
      label: label.trim().replace(/[\s,.]+$/, ""),
      peak: Math.max(a, b),
      unit: unit || "",
      sign: 1,
      raw: (tail || "").trim(),
    };
  }

  // Qualitative fallback — render as bare note row.
  return { label: trimmed, peak: null, unit: "", sign: 0, raw: "" };
}

function parseOutcomes(outcomes: string): Segment[] {
  return outcomes
    .split("·")
    .map(parseSegment)
    .filter((s): s is Segment => s !== null)
    .slice(0, 4);
}

// Normalize peak into 0-100% bar width so different-unit metrics coexist.
function barWidthPct(peak: number, unit: string): number {
  const ref: Record<string, number> = {
    "%": 100,
    "pt": 3,
    "pts": 3,
    "lb": 20,
    "lbs": 20,
    "in": 8,
    "kg": 15,
    "year": 5,
    "years": 5,
  };
  const cap = ref[unit.toLowerCase()] ?? 100;
  return Math.min(100, Math.max(15, (peak / cap) * 100));
}

export function FamilyOutcomesViz({ outcomes }: { outcomes: string }) {
  const segments = parseOutcomes(outcomes);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  if (segments.length === 0) return null;

  return (
    <div
      style={{
        border: "1px solid var(--nx-border)",
        backgroundColor: "var(--nx-bg)",
        padding: "1.25rem 1.5rem",
        marginBottom: "1.75rem",
        maxWidth: 680,
      }}
      data-testid="family-outcomes-viz"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          paddingBottom: "0.85rem",
          borderBottom: "1px solid var(--nx-border)",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--nx-cobalt)",
          }}
        >
          Reported outcomes
        </span>
        <span style={{ flex: 1, height: 1, background: "var(--nx-border)" }} />
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--nx-fg-muted)",
          }}
        >
          Peak range · {segments.length} markers
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {segments.map((s, i) => {
          if (s.peak === null) {
            // Qualitative fallback row — no bar, just a labeled note
            return (
              <div key={i} data-testid={`outcome-bar-${i}`} style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--nx-cobalt)",
                    letterSpacing: "0.08em",
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--nx-fg)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </span>
              </div>
            );
          }
          const w = barWidthPct(s.peak, s.unit);
          const signLabel = s.sign === 1 ? "+" : "−";
          return (
            <div key={i} data-testid={`outcome-bar-${i}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.4rem",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--nx-fg)",
                    lineHeight: 1.3,
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--nx-cobalt)",
                    letterSpacing: "0.02em",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {signLabel}
                  {s.peak}
                  {s.unit && (
                    <span style={{ fontSize: 10, marginLeft: 2, color: "var(--nx-fg-muted)", fontWeight: 500 }}>
                      {s.unit}
                    </span>
                  )}
                </span>
              </div>
              <div
                style={{
                  position: "relative",
                  height: 6,
                  width: "100%",
                  background: "var(--nx-border)",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: visible ? `${w}%` : "0%",
                    background: "var(--nx-cobalt)",
                    borderRadius: 1,
                    transition: `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms`,
                  }}
                />
              </div>
              {s.raw && (
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 11,
                    color: "var(--nx-fg-muted)",
                    marginTop: "0.35rem",
                    lineHeight: 1.4,
                  }}
                >
                  {s.raw}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
