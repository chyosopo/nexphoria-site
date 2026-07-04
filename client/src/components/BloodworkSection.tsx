import { motion } from "framer-motion";
import { BloodworkDashboard } from "@/components/BloodworkDashboard";

/* ─────────────────────────────────────────────────────────────
   BloodworkSection — Wave 5
   Two-column homepage section wrapping the BloodworkDashboard.
   Left: editorial copy. Right: dashboard mockup.
   ───────────────────────────────────────────────────────────── */

const pillLabels = ["38 BIOMARKERS", "CLIA-CERTIFIED", "PARTNER LABORATORY"];

interface BloodworkSectionProps {
  gender?: "women" | "men";
}

export function BloodworkSection({ gender = "women" }: BloodworkSectionProps) {
  return (
    <section
      data-testid="bloodwork-section"
      style={{
        backgroundColor: "var(--nx-bg)",
        borderTop: "1px solid var(--nx-border)",
        borderBottom: "1px solid var(--nx-border)",
      }}
      className="py-20 lg:py-32"
    >
      <div className="nx-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT: Editorial copy ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "var(--nx-fg)",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg)",
                }}
              >
                INCLUDED IN EVERY PROTOCOL
              </p>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
                maxWidth: "520px",
              }}
            >
              Every protocol begins with bloodwork.{" "}
              <span>Every 90 days, it repeats.</span>
            </h2>

            {/* Body */}
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "17px",
                fontWeight: 400,
                color: "var(--nx-fg-graphite)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "440px",
              }}
            >
              Lab-driven from day one. Your initial draw establishes a quantitative baseline
              across 38 biomarkers. A CLIA-certified partner laboratory performs the labs. Your physician reviews
              them. Your protocol is built to your numbers — not someone else's average. At
              90 days, we re-draw and adjust.
            </p>

            {/* Pill labels */}
            <div
              className="flex flex-wrap gap-2 mb-6"
              data-testid="bloodwork-pill-labels"
            >
              {pillLabels.map((label) => (
                <span
                  key={label}
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg)",
                    border: "1px solid var(--nx-fg)",
                    padding: "4px 10px",
                    display: "inline-block",
                    borderRadius: "1px",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Inline link */}
            <a
              href="#how-we-read-labs"
              data-testid="bloodwork-how-we-read-link"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--nx-fg)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                transition: "opacity 150ms ease",
              }}
              className="hover:opacity-60"
            >
              How we read your labs →
            </a>
          </motion.div>

          {/* ── RIGHT: Dashboard mockup ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            data-testid="bloodwork-dashboard-wrapper"
            className="overflow-x-auto"
          >
            <BloodworkDashboard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
