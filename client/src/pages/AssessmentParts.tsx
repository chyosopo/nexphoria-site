import { useState } from "react";
import {
  Plus,
  Minus,
  Stethoscope,
  FlaskConical,
  ClipboardCheck,
  ShieldCheck,
  Info,
} from "lucide-react";
// Note: AssessmentParts exports shared UI pieces used by Assessment.tsx.
// SEO for the assessment flow is set in Assessment.tsx.

// Labels for the top progress bar — one per intake topic (7 steps)
export const STEP_LABELS = [
  "Biological sex",
  "Goals",
  "Medical history",
  "Current meds",
  "Activity",
  "Sleep",
  "Bloodwork",
];

// "Why we ask" clinical rationale shown under each question.
// Keyed by the funnel step index (0 = sex, 1 = goal, ... 6 = contact).
export const WHY_WE_ASK: Record<number, string> = {
  0: "Peptide receptor sensitivity, dosing thresholds, and contraindications differ by physiology. Sex is the first input your physician uses to scope a safe protocol.",
  1: "Your primary goal determines which peptide classes are even candidates. A metabolic goal and a recovery goal point to different compounds and different lab targets.",
  2: "Hormone reference intervals shift by decade. Age calibrates how your labs are interpreted and where safe dosing windows fall.",
  3: "Drug interactions are the most common reason a protocol is modified or declined. Your physician screens every medication against the proposed compound before prescribing.",
  4: "Certain conditions change the risk-benefit calculus entirely. Disclosing them lets your physician flag contraindications before — not after — a prescription is written.",
  5: "A current lab panel is the clinical floor for dosing. Without baseline biomarkers, dose calibration is guesswork — which is exactly what we refuse to do.",
  6: "Your physician contacts you directly to confirm the protocol and answer questions. State of residence determines which licensed physician reviews your file.",
};

const SIDEBAR_TILES = [
  { icon: Stethoscope, title: "Physician review in 24h", desc: "A board-certified MD reads your file within one business day." },
  { icon: FlaskConical, title: "Lab kit shipped", desc: "At-home Quest kit dispatched the same day you submit." },
  { icon: ClipboardCheck, title: "Protocol designed within 5 days", desc: "Compounded and cold-chain shipped after physician sign-off." },
];

// ─── Top labeled progress bar ──────────────────────────────────────────────

export function LabeledProgress({ step }: { step: number }) {
  // step 1..7 maps to STEP_LABELS index 0..6
  const activeIndex = Math.min(Math.max(step - 1, 0), STEP_LABELS.length - 1);
  return (
    <div
      data-testid="assessment-progress"
      style={{
        borderBottom: "1px solid var(--nx-border)",
        backgroundColor: "var(--nx-bg)",
        flexShrink: 0,
        padding: "1rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--nx-cobalt)",
            marginBottom: "0.75rem",
          }}
        >
          STEP {String(step).padStart(2, "0")}/07
        </p>
        <div
          className="assessment-progress-track"
          style={{ display: "grid", gridTemplateColumns: `repeat(${STEP_LABELS.length}, 1fr)`, gap: "6px" }}
        >
          {STEP_LABELS.map((label, i) => {
            const done = i < activeIndex;
            const current = i === activeIndex;
            return (
              <div key={label} data-testid={`assessment-progress-step-${i}`}>
                <div
                  style={{
                    height: "3px",
                    borderRadius: "100px",
                    backgroundColor: done || current ? "var(--nx-cobalt)" : "var(--nx-border)",
                    opacity: current ? 1 : done ? 0.7 : 1,
                    transition: "background-color 0.3s",
                    marginBottom: "0.5rem",
                  }}
                />
                <p
                  className="assessment-progress-label"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "9px",
                    fontWeight: current ? 700 : 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: current ? "var(--nx-fg)" : "var(--nx-fg-muted)",
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── "Why we ask" clinical footnote ────────────────────────────────────────

export function WhyWeAsk({ funnelStep }: { funnelStep: number }) {
  const text = WHY_WE_ASK[funnelStep];
  if (!text) return null;
  return (
    <div
      data-testid={`assessment-why-${funnelStep}`}
      style={{
        display: "flex",
        gap: "0.625rem",
        marginTop: "1.5rem",
        padding: "0.875rem 1rem",
        borderRadius: "6px",
        backgroundColor: "var(--nx-cobalt-soft)",
        border: "1px solid var(--nx-border)",
      }}
    >
      <Info size={14} style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: "2px" }} />
      <div>
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--nx-cobalt)",
            marginBottom: "0.375rem",
          }}
        >
          Why we ask
        </p>
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "13px",
            color: "var(--nx-fg-graphite)",
            lineHeight: 1.55,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

// ─── Sample protocol preview (collapsible, React state only) ───────────────

export function SampleProtocolPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-testid="assessment-sample-protocol"
      style={{
        border: "1px solid var(--nx-border)",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        data-testid="assessment-sample-protocol-toggle"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          padding: "1rem 1.125rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--nx-fg)",
          }}
        >
          See a sample protocol
        </span>
        {open ? (
          <Minus size={16} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
        ) : (
          <Plus size={16} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
        )}
      </button>
      {open && (
        <div
          data-testid="assessment-sample-protocol-body"
          style={{ padding: "0 1.125rem 1.25rem", borderTop: "1px solid var(--nx-border)" }}
        >
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
              margin: "1rem 0 0.875rem",
            }}
          >
            Redacted sample · not a prescription
          </p>
          {[
            { k: "Peptide", v: "Ipamorelin / CJC-1295" },
            { k: "Dose", v: "200 mcg + 100 mcg" },
            { k: "Schedule", v: "5 nights/week, subcutaneous, pre-sleep" },
            { k: "Lab target", v: "IGF-1 to mid-reference; fasting glucose stable" },
            { k: "Reassessment", v: "Quest redraw at day 90" },
          ].map((row, i, arr) => (
            <div
              key={row.k}
              style={{
                display: "flex",
                gap: "0.75rem",
                padding: "0.625rem 0",
                borderBottom: i < arr.length - 1 ? "1px solid var(--nx-border)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-muted)",
                  minWidth: "82px",
                  flexShrink: 0,
                  paddingTop: "2px",
                }}
              >
                {row.k}
              </span>
              <span
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "13px",
                  color: "var(--nx-fg)",
                  lineHeight: 1.45,
                }}
              >
                {row.v}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sidebar: what happens next + sample protocol ──────────────────────────

export function IntakeSidebar() {
  return (
    <aside data-testid="assessment-sidebar" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--nx-cobalt)",
            marginBottom: "1rem",
          }}
        >
          What happens next
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {SIDEBAR_TILES.map((t, i) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                data-testid={`assessment-sidebar-tile-${i}`}
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: "6px",
                  backgroundColor: "#FFFFFF",
                  padding: "1rem 1.125rem",
                  display: "flex",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1.5px solid var(--nx-cobalt)",
                    color: "var(--nx-cobalt)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--nx-fg)",
                      lineHeight: 1.3,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {t.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      color: "var(--nx-fg-muted)",
                      lineHeight: 1.45,
                    }}
                  >
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SampleProtocolPreview />
    </aside>
  );
}

// ─── Trust strip shown beneath the question card ───────────────────────────

export function TrustStrip() {
  return (
    <div
      data-testid="assessment-trust-strip"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        marginTop: "2rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--nx-border)",
      }}
    >
      <ShieldCheck size={13} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
      <p
        style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: "9px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--nx-fg-muted)",
          lineHeight: 1.6,
        }}
      >
        HIPAA-compliant · End-to-end encrypted · Reviewed by U.S. physicians · Cancel anytime before dispense
      </p>
    </div>
  );
}
