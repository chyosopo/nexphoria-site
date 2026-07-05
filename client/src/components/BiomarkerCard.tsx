import { memo } from "react";
import { ResponsiveContainer, LineChart, Line, YAxis, ReferenceArea } from "recharts";
import { FONT } from "@/lib/typography";

/* ─────────────────────────────────────────────────────────────
   BiomarkerCard — AGENT-3 · v11 data-credibility layer
   Hims-Labs-grade biomarker treatment. One row/card per marker:
   name · current value · reference range · delta arrow · sparkline
   (Recharts) · range visualization · clinical interpretation.

   Chart colors from the design lock only:
   - --nx-cobalt (biomarker highlight / primary stroke)
   - --nx-rock   (neutral range band)
   - --nx-acid   (in-range confirmation, used sparingly)
   All numeric values use tabular-nums lining-nums.
   NO ITALICS. NO decoration.
   ───────────────────────────────────────────────────────────── */

const NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums lining-nums",
  fontFeatureSettings: "'tnum'",
};

export type BiomarkerStatus = "optimal" | "in-range" | "watch" | "low";

export interface Biomarker {
  name: string;
  abbr?: string;
  value: number;
  unit: string;
  /** reference range low/high for the band */
  refLow: number;
  refHigh: number;
  /** display string for the reference range (can differ, e.g. "< 1.0") */
  refLabel: string;
  /** trailing history for sparkline, oldest → newest. Last point = current value. */
  history: number[];
  status: BiomarkerStatus;
  /** signed percent change vs. baseline (first history point) */
  interpretation: string;
  category: string;
}

const STATUS_META: Record<
  BiomarkerStatus,
  { label: string; color: string; bg: string }
> = {
  optimal: { label: "OPTIMAL", color: "var(--nx-fg)", bg: "var(--nx-acid)" },
  "in-range": { label: "IN RANGE", color: "var(--nx-fg-graphite)", bg: "var(--nx-rock)" },
  watch: { label: "WATCH", color: "var(--nx-amber)", bg: "#D6E4F6" },
  low: { label: "BELOW TARGET", color: "var(--nx-amber)", bg: "#D6E4F6" },
};

function deltaPct(history: number[]): number {
  if (history.length < 2) return 0;
  const first = history[0];
  const last = history[history.length - 1];
  if (first === 0) return 0;
  return ((last - first) / first) * 100;
}

/* ── Sparkline — Recharts line over the marker history ──────── */
function Sparkline({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ i, v }));
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pad = (max - min) * 0.25 || 1;
  return (
    <div style={{ width: "100%", height: 44 }} aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 6, right: 2, bottom: 4, left: 2 }}>
          <YAxis hide domain={[min - pad, max + pad]} />
          <Line
            type="monotone"
            dataKey="v"
            stroke="var(--nx-cobalt)"
            strokeWidth={1.75}
            dot={false}
            isAnimationActive={true}
            animationDuration={700}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Range visualization — value marker inside the ref band ── */
function RangeBar({ m }: { m: Biomarker }) {
  const span = m.refHigh - m.refLow;
  // show a track that extends 20% beyond each side of the ref range
  const trackLow = m.refLow - span * 0.35;
  const trackHigh = m.refHigh + span * 0.35;
  const trackSpan = trackHigh - trackLow;
  const pct = (x: number) => ((x - trackLow) / trackSpan) * 100;
  const valuePos = Math.max(2, Math.min(98, pct(m.value)));
  const bandLeft = pct(m.refLow);
  const bandWidth = pct(m.refHigh) - pct(m.refLow);
  const inRange = m.value >= m.refLow && m.value <= m.refHigh;

  return (
    <div style={{ marginTop: 4 }}>
      <div
        style={{
          position: "relative",
          height: 8,
          borderRadius: "var(--nx-r-pill)",
          backgroundColor: "var(--nx-bg-cream)",
          border: "1px solid var(--nx-border)",
        }}
      >
        {/* reference band */}
        <div
          style={{
            position: "absolute",
            top: -1,
            bottom: -1,
            left: `${bandLeft}%`,
            width: `${bandWidth}%`,
            backgroundColor: inRange ? "var(--nx-acid)" : "var(--nx-rock)",
            opacity: inRange ? 0.55 : 0.7,
            borderRadius: "var(--nx-r-pill)",
          }}
        />
        {/* current value marker */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${valuePos}%`,
            transform: "translate(-50%, -50%)",
            width: 12,
            height: 12,
            borderRadius: "var(--nx-r-pill)",
            backgroundColor: "var(--nx-cobalt)",
            border: "2px solid var(--nx-ceramic)",
            boxShadow: "0 0 0 1px var(--nx-cobalt)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          fontFamily: FONT,
          fontSize: 10,
          color: "var(--nx-fg-muted)",
          letterSpacing: "0.03em",
          ...NUM,
        }}
      >
        <span>{m.refLow}</span>
        <span style={{ letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 9 }}>
          Reference {m.refLabel}
        </span>
        <span>{m.refHigh}</span>
      </div>
    </div>
  );
}

/* ── Delta arrow — signed % vs baseline ─────────────────────── */
function Delta({ history }: { history: number[] }) {
  const d = deltaPct(history);
  const rounded = Math.abs(d) < 0.5 ? 0 : Math.round(d);
  const dir = rounded > 0 ? "up" : rounded < 0 ? "down" : "flat";
  const glyph = dir === "up" ? "↑" : dir === "down" ? "↓" : "→";
  const color =
    dir === "flat" ? "var(--nx-fg-muted)" : "var(--nx-fg)";
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: "var(--nx-t-xs)",
        fontWeight: 600,
        color,
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        ...NUM,
      }}
      aria-label={`${dir === "flat" ? "stable" : dir === "up" ? "up" : "down"} ${Math.abs(rounded)} percent vs baseline`}
    >
      <span aria-hidden="true">{glyph}</span>
      {rounded !== 0 && <span>{Math.abs(rounded)}%</span>}
    </span>
  );
}

/* ── The card ───────────────────────────────────────────────── */
function BiomarkerCardInner({ m }: { m: Biomarker }) {
  const meta = STATUS_META[m.status];
  const testId = `biomarker-${(m.abbr || m.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

  return (
    <div
      data-testid={testId}
      style={{
        backgroundColor: "var(--nx-ceramic)",
        border: "1px solid var(--nx-border)",
        borderRadius: "var(--nx-r-md)",
        padding: "18px 20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* top: name + status pill */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
              marginBottom: 3,
            }}
          >
            {m.category}
          </p>
          <h3
            style={{
              fontFamily: FONT,
              fontSize: "var(--nx-t-base)",
              fontWeight: 600,
              color: "var(--nx-fg)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {m.name}
            {m.abbr && (
              <span style={{ color: "var(--nx-fg-muted)", fontWeight: 500 }}><span aria-hidden="true"> · </span>{m.abbr}</span>
            )}
          </h3>
        </div>
        <span
          data-testid={`${testId}-status`}
          style={{
            flexShrink: 0,
            fontFamily: FONT,
            fontSize: 8.5,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: meta.color,
            backgroundColor: meta.bg,
            padding: "4px 8px",
            borderRadius: "var(--nx-r-pill)",
            whiteSpace: "nowrap",
          }}
        >
          {meta.label}
        </span>
      </div>

      {/* value + delta + sparkline */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            data-testid={`${testId}-value`}
            style={{
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 600,
              color: "var(--nx-fg)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              ...NUM,
            }}
          >
            {m.value}
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: "var(--nx-t-xs)",
              fontWeight: 500,
              color: "var(--nx-fg-muted)",
              ...NUM,
            }}
          >
            {m.unit}
          </span>
          <Delta history={m.history} />
        </div>
        <div style={{ width: 96, flexShrink: 0 }}>
          <Sparkline data={m.history} />
        </div>
      </div>

      {/* range visualization */}
      <RangeBar m={m} />

      {/* clinical interpretation */}
      <p
        data-testid={`${testId}-interpretation`}
        style={{
          fontFamily: FONT,
          fontSize: 12.5,
          fontWeight: 400,
          color: "var(--nx-fg-graphite)",
          lineHeight: 1.5,
          borderTop: "1px solid var(--nx-border)",
          paddingTop: 10,
          marginTop: 2,
        }}
      >
        {m.interpretation}
      </p>
    </div>
  );
}

/* m is a stable object from the BIOMARKERS catalog — shallow memo is safe. */
export const BiomarkerCard = memo(BiomarkerCardInner);

export default BiomarkerCard;
