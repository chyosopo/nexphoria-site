import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   BloodworkDashboard — Wave 5
   A fully JSX/Tailwind mockup of a patient bloodwork report.
   No images. Framer Motion stagger reveal on rows.
   ───────────────────────────────────────────────────────────── */

type TrendDir = "up" | "down" | "flat";

interface BiomarkerRow {
  name: string;
  value: string;
  unit: string;
  range: string;
  trend: TrendDir;
  annotation?: string;
  annotationAmber?: boolean;
}

const biomarkers: BiomarkerRow[] = [
  { name: "Total Testosterone", value: "524", unit: "ng/dL", range: "264–916", trend: "up" },
  { name: "Free Testosterone", value: "12.4", unit: "pg/mL", range: "9.3–26.5", trend: "flat" },
  { name: "Estradiol (Sensitive)", value: "28", unit: "pg/mL", range: "11–44", trend: "flat" },
  { name: "SHBG", value: "32", unit: "nmol/L", range: "16.5–55.9", trend: "flat" },
  { name: "IGF-1", value: "184", unit: "ng/mL", range: "88–246", trend: "up" },
  { name: "HbA1c", value: "5.2", unit: "%", range: "4.0–5.6", trend: "down" },
  { name: "Fasting Glucose", value: "84", unit: "mg/dL", range: "65–99", trend: "flat" },
  { name: "hsCRP", value: "0.6", unit: "mg/L", range: "< 1.0", trend: "down" },
  {
    name: "Vitamin D, 25-OH",
    value: "48",
    unit: "ng/mL",
    range: "30–100",
    trend: "up",
    annotation: "↑ Improved from 31 last quarter",
    annotationAmber: true,
  },
  { name: "TSH", value: "1.8", unit: "µIU/mL", range: "0.4–4.5", trend: "flat" },
];

/* ── Tiny inline sparkline SVG ──────────────────────────── */
function Sparkline({ trend }: { trend: TrendDir }) {
  // 6-point paths for each direction
  const paths: Record<TrendDir, string> = {
    up: "M0,18 L6,14 L12,10 L18,7 L24,4 L30,2",
    down: "M0,4 L6,7 L12,10 L18,13 L24,15 L30,18",
    flat: "M0,10 L6,11 L12,10 L18,9 L24,10 L30,10",
  };
  const dots: Record<TrendDir, number[][]> = {
    up: [[0,18],[6,14],[12,10],[18,7],[24,4],[30,2]],
    down: [[0,4],[6,7],[12,10],[18,13],[24,15],[30,18]],
    flat: [[0,10],[6,11],[12,10],[18,9],[24,10],[30,10]],
  };

  return (
    <svg
      width="30"
      height="20"
      viewBox="0 0 30 20"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <polyline
        points={dots[trend].map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="var(--nx-fg)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.45}
      />
      {dots[trend].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="var(--nx-fg)" opacity={0.55} />
      ))}
    </svg>
  );
}

/* ── Trend arrow (used alongside sparkline) ─────────────── */
function TrendArrow({ trend }: { trend: TrendDir }) {
  if (trend === "flat") {
    return (
      <span
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: "10px",
          color: "var(--nx-fg-muted)",
          marginLeft: "6px",
        }}
        aria-label="stable"
      >
        →
      </span>
    );
  }
  const isUp = trend === "up";
  return (
    <span
      style={{
        fontSize: "10px",
        marginLeft: "6px",
        color: isUp ? "var(--nx-fg)" : "var(--nx-fg-graphite)",
        fontWeight: 600,
      }}
      aria-label={isUp ? "trending up" : "trending down"}
    >
      {isUp ? "↑" : "↓"}
    </span>
  );
}

/* ── Row variants ───────────────────────────────────────── */
const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/* ── Main component ─────────────────────────────────────── */
export function BloodworkDashboard() {
  return (
    <motion.div
      data-testid="bloodwork-dashboard"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      style={{
        backgroundColor: "var(--nx-bg-cream)",
        border: "1px solid var(--nx-fg)",
        borderRadius: "2px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        maxWidth: "860px",
        minWidth: "560px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* ── Header bar ──────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#E6E0D4",
          borderBottom: "1px solid var(--nx-fg)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--nx-fg)",
          }}
        >
          PATIENT REPORT · WK 0 BASELINE
        </span>
        <span
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--nx-fg-muted)",
          }}
        >
          Q90D RECHECK INCLUDED
        </span>
      </div>

      {/* ── Patient meta row ────────────────────────────── */}
      <div
        style={{
          padding: "8px 20px",
          borderBottom: "1px solid var(--nx-border)",
          backgroundColor: "var(--nx-bg-cream)",
        }}
      >
        <span
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.08em",
            color: "var(--nx-fg-muted)",
            textTransform: "uppercase",
          }}
        >
          Patient: J. Reyes&nbsp;&nbsp;/&nbsp;&nbsp;DOB 1978-06-12&nbsp;&nbsp;/&nbsp;&nbsp;Drawn
          2026-06-15&nbsp;&nbsp;/&nbsp;&nbsp;Quest Diagnostics
        </span>
      </div>

      {/* ── Column headers ──────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 110px 130px 64px",
          padding: "7px 20px",
          borderBottom: "1px solid var(--nx-border)",
          backgroundColor: "#EAE4D8",
        }}
      >
        {["BIOMARKER", "VALUE", "REF RANGE", "TREND"].map((col) => (
          <span
            key={col}
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "8.5px",
              fontWeight: 600,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            {col}
          </span>
        ))}
      </div>

      {/* ── Biomarker rows ──────────────────────────────── */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        {biomarkers.map((row, i) => {
          const hasAnnotation = !!row.annotation;
          return (
            <motion.div
              key={row.name}
              custom={i}
              variants={rowVariants}
              data-testid={`bw-row-${row.name.toLowerCase().replace(/[\s,()]/g, "-").replace(/-+/g, "-")}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 110px 130px 64px",
                padding: hasAnnotation ? "10px 20px 6px" : "9px 20px",
                borderBottom: i < biomarkers.length - 1 ? "1px solid var(--nx-border)" : "none",
                alignItems: "start",
                backgroundColor: i % 2 === 0 ? "var(--nx-bg-cream)" : "rgba(240,235,224,0.4)",
              }}
            >
              {/* Biomarker name */}
              <div>
                <span
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg)",
                    display: "block",
                    paddingBottom: hasAnnotation ? "4px" : "0",
                    borderBottom: hasAnnotation ? `1px solid #8B5A2B` : "none",
                    marginBottom: hasAnnotation ? "4px" : "0",
                  }}
                >
                  {row.name}
                </span>
                {hasAnnotation && (
                  <span
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "8.5px",
                      letterSpacing: "0.06em",
                      color: "#8B5A2B",
                      display: "block",
                    }}
                  >
                    {row.annotation}
                  </span>
                )}
              </div>

              {/* Value */}
              <span
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--nx-fg)",
                  fontVariantNumeric: "tabular-nums lining-nums",
                  letterSpacing: "0.02em",
                  paddingTop: "1px",
                }}
              >
                {row.value}&thinsp;
                <span style={{ fontSize: "10px", fontWeight: 400, color: "var(--nx-fg-muted)" }}>
                  {row.unit}
                </span>
              </span>

              {/* Reference range */}
              <span
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "9.5px",
                  color: "var(--nx-fg-muted)",
                  letterSpacing: "0.04em",
                  paddingTop: "2px",
                }}
              >
                {row.range}
              </span>

              {/* Trend */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px", paddingTop: "1px" }}>
                <Sparkline trend={row.trend} />
                <TrendArrow trend={row.trend} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Footer ──────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--nx-border)",
          padding: "10px 20px",
          backgroundColor: "#E6E0D4",
        }}
      >
        <span
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            
            fontSize: "10px",
            letterSpacing: "0.08em",
            color: "var(--nx-fg-muted)",
          }}
        >
          Reviewed by Dr. Sarah Chen, MD — UCSF / Internal Medicine · Board Certified
        </span>
      </div>
    </motion.div>
  );
}
