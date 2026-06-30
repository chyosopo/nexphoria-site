import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   TrustStatsStrip — Maximus-style proof-strip with animated
   counters. Drops into Home, About, Physicians, Pharmacy.
   ───────────────────────────────────────────────────────────── */

export interface TrustStat {
  /** Number portion (e.g. 50000). Used for count-up animation. */
  number: number;
  /** Suffix shown after the number (e.g. "+", "x"). Optional. */
  suffix?: string;
  /** Prefix shown before the number (e.g. "$"). Optional. */
  prefix?: string;
  /** Label shown under the number. */
  label: string;
  /** Optional sub-line (small caption beneath label). */
  caption?: string;
}

export interface TrustStatsStripProps {
  eyebrow?: string;
  heading?: string;
  stats?: TrustStat[];
  variant?: "light" | "dark";
}

const DEFAULT_STATS: TrustStat[] = [
  { number: 50000, suffix: "+", label: "Patients served", caption: "Across all 50 states" },
  { number: 7, label: "Peer-reviewed publications", caption: "By our medical team" },
  { number: 3, label: "Formulation patents", caption: "Filed in the United States" },
  { number: 2000, suffix: "+", label: "Lab testing sites", caption: "Nationwide partnership network" },
];

export function TrustStatsStrip({
  eyebrow = "Track record",
  heading = "Built on evidence, not vibes.",
  stats = DEFAULT_STATS,
  variant = "light",
}: TrustStatsStripProps) {
  const isDark = variant === "dark";

  return (
    <section
      data-testid="trust-stats-strip"
      style={{
        backgroundColor: isDark ? "var(--nx-cobalt)" : "#FFFFF3",
        color: isDark ? "#FFFFF3" : "var(--nx-cobalt)",
        borderTop: `1px solid ${isDark ? "rgba(255,255,243,0.08)" : "var(--nx-border)"}`,
        borderBottom: `1px solid ${isDark ? "rgba(255,255,243,0.08)" : "var(--nx-border)"}`,
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      <div className="nx-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,243,0.55)" : "var(--nx-text-muted)",
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            {heading}
          </h2>
        </motion.div>

        <div
          className="trust-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            borderTop: `1px solid ${isDark ? "rgba(255,255,243,0.12)" : "var(--nx-border)"}`,
            borderBottom: `1px solid ${isDark ? "rgba(255,255,243,0.12)" : "var(--nx-border)"}`,
          }}
        >
          {stats.map((stat, i) => (
            <StatCell key={i} stat={stat} index={i} isDark={isDark} isLast={i === stats.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .trust-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .trust-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

interface StatCellProps {
  stat: TrustStat;
  index: number;
  isDark: boolean;
  isLast: boolean;
}

function StatCell({ stat, index, isDark, isLast }: StatCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.number, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, stat.number]);

  const formatted = display >= 1000 ? display.toLocaleString("en-US") : String(display);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: "easeOut" }}
      style={{
        padding: "48px 32px",
        textAlign: "center",
        borderRight: isLast
          ? "none"
          : `1px solid ${isDark ? "rgba(255,255,243,0.12)" : "var(--nx-border)"}`,
      }}
      className="stat-cell"
    >
      <p
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          marginBottom: 16,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {stat.prefix}
        {formatted}
        {stat.suffix && (
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontStyle: "normal",
              fontSize: "0.45em",
              fontWeight: 500,
              color: "#C97A4A",
              marginLeft: 4,
              verticalAlign: "top",
              position: "relative",
              top: "0.3em",
            }}
          >
            {stat.suffix}
          </span>
        )}
      </p>
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: isDark ? "rgba(255,255,243,0.85)" : "var(--nx-cobalt)",
          marginBottom: 6,
        }}
      >
        {stat.label}
      </p>
      {stat.caption && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            lineHeight: 1.45,
            color: isDark ? "rgba(255,255,243,0.55)" : "var(--nx-text-muted)",
          }}
        >
          {stat.caption}
        </p>
      )}
    </motion.div>
  );
}
