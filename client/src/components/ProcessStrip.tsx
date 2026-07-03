import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   ProcessStrip — reference-grade 4-step protocol journey
   Editorial typography with numbered steps and connecting line.
   ───────────────────────────────────────────────────────────── */

export interface ProcessStep {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  timing: string;
}

interface ProcessStripProps {
  eyebrow?: string;
  heading?: string;
  sub?: string;
  steps?: ProcessStep[];
  variant?: "light" | "dark";
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    number: "01",
    eyebrow: "Assessment",
    title: "Telehealth intake.",
    body: "A 12-minute medical questionnaire covering health history, current medications, goals, and contraindications. Reviewed by a licensed physician within one business day.",
    timing: "~12 minutes",
  },
  {
    number: "02",
    eyebrow: "Bloodwork",
    title: "Baseline biomarkers.",
    body: "Quest Diagnostics order routed to a lab near you — over 2,000 sites nationwide. CBC, CMP, lipid panel, HbA1c, hormonal panel calibrated to your protocol. Results in 3-5 days.",
    timing: "3-5 days",
  },
  {
    number: "03",
    eyebrow: "Prescription",
    title: "Your custom protocol.",
    body: "A physician designs your peptide protocol based on your goals and bloodwork. Your prescription routes to a 503A compounding pharmacy under USP 797/795 sterile-fill standards.",
    timing: "2-3 days",
  },
  {
    number: "04",
    eyebrow: "Delivery",
    title: "Cold-chain to your door.",
    body: "Discreet packaging, temperature-monitored shipping, in your hands within 5-7 business days. Re-dose monthly, quarterly, or annually depending on plan. Cancel any time.",
    timing: "5-7 days",
  },
];

export function ProcessStrip({
  eyebrow = "How it works",
  heading = "From intake to injection in under two weeks.",
  sub = "Every step physician-supervised. Every prescription pharmacy-grade. No middlemen, no markup, no guesswork.",
  steps = DEFAULT_STEPS,
  variant = "light",
}: ProcessStripProps) {
  const isDark = variant === "dark";

  return (
    <section
      data-testid="process-strip"
      style={{
        backgroundColor: isDark ? "var(--nx-cobalt)" : "var(--nx-bg-cream)",
        color: isDark ? "var(--nx-ceramic)" : "var(--nx-cobalt)",
        paddingTop: 120,
        paddingBottom: 120,
        borderTop: `1px solid ${isDark ? "rgba(246, 249, 252,0.08)" : "var(--nx-border)"}`,
        borderBottom: `1px solid ${isDark ? "rgba(246, 249, 252,0.08)" : "var(--nx-border)"}`,
      }}
    >
      <div className="nx-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ maxWidth: 720, marginBottom: 80 }}
        >
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: isDark ? "rgba(246, 249, 252,0.55)" : "var(--nx-fg-muted)",
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              
              fontWeight: 400,
              fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              marginBottom: 24,
            }}
          >
            {heading}
          </h2>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: isDark ? "rgba(246, 249, 252,0.7)" : "var(--nx-fg-muted)",
              maxWidth: 580,
            }}
          >
            {sub}
          </p>
        </motion.div>

        <div
          className="process-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            borderTop: `1px solid ${isDark ? "rgba(246, 249, 252,0.12)" : "var(--nx-border)"}`,
            position: "relative",
          }}
        >
          {/* Animated progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: -1,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: "var(--nx-rust)",
              transformOrigin: "left center",
            }}
          />

          {steps.map((step, i) => (
            <StepCell
              key={step.number}
              step={step}
              index={i}
              isDark={isDark}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

interface StepCellProps {
  step: ProcessStep;
  index: number;
  isDark: boolean;
  isLast: boolean;
}

function StepCell({ step, index, isDark, isLast }: StepCellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.12, ease: "easeOut" }}
      style={{
        padding: "48px 32px 32px 32px",
        borderRight: isLast
          ? "none"
          : `1px solid ${isDark ? "rgba(246, 249, 252,0.12)" : "var(--nx-border)"}`,
        position: "relative",
      }}
      className="process-cell"
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            
            fontWeight: 400,
            fontSize: 56,
            lineHeight: 1,
            color: "var(--nx-rust)",
            letterSpacing: "-0.02em",
          }}
        >
          {step.number}
        </p>
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: isDark ? "rgba(246, 249, 252,0.55)" : "var(--nx-fg-muted)",
          }}
        >
          {step.timing}
        </p>
      </div>
      <p
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--nx-rust)",
          marginBottom: 12,
        }}
      >
        {step.eyebrow}
      </p>
      <h3
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          
          fontWeight: 400,
          fontSize: 24,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          marginBottom: 16,
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: 14,
          lineHeight: 1.6,
          color: isDark ? "rgba(246, 249, 252,0.7)" : "var(--nx-fg-muted)",
        }}
      >
        {step.body}
      </p>
    </motion.div>
  );
}
