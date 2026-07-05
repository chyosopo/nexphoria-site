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
import { F } from "@/lib/typography";
// Note: AssessmentParts exports shared UI pieces used by Assessment.tsx.
// SEO for the assessment flow is set in Assessment.tsx.

// Labels for the top progress bar — one per tracked step. The bar renders for
// flow steps 1–7 (biological sex is the preliminary choice on the landing),
// so index 0 is the goal step and index 6 is review. These MUST stay in sync
// with the step order in Assessment.tsx or the "Step N of 7 — name" reads wrong.
export const STEP_LABELS = [
  "Your goal",
  "Age",
  "Medications",
  "Medical history",
  "Bloodwork",
  "Contact",
  "Review",
];

// "Why we ask" clinical rationale shown under each question.
// Keyed by the funnel step index (0 = sex, 1 = goal, ... 6 = contact).
export const WHY_WE_ASK: Record<number, string> = {
  0: "Peptide receptor sensitivity, dosing thresholds, and contraindications differ by physiology. Sex is the first input your physician uses to scope a safe protocol.",
  1: "Your primary goal determines which peptide classes are even candidates. A metabolic goal and a recovery goal point to different compounds and different lab targets.",
  2: "Hormone reference intervals shift by decade. Age calibrates how your labs are interpreted and where safe dosing windows fall.",
  3: "Drug interactions are the most common reason a protocol is modified or declined. Your physician screens every medication against the proposed compound before prescribing.",
  4: "Certain conditions change the risk-benefit calculus entirely. Disclosing them lets your physician flag contraindications before — not after — a prescription is written.",
  5: "A current lab panel is the clinical floor for dosing. Without baseline biomarkers, dosing would be an estimate; we calibrate to your measured values instead.",
  6: "Your physician contacts you directly to confirm the protocol and answer questions. State of residence determines which licensed physician reviews your file.",
};

const SIDEBAR_TILES = [
  { icon: Stethoscope, title: "Physician review", desc: "A board-certified MD reads your file — no algorithms, no auto-approvals." },
  { icon: FlaskConical, title: "Bloodwork arranged", desc: "A partner-laboratory draw is arranged once a physician reviews your intake." },
  { icon: ClipboardCheck, title: "Protocol designed within 5 days", desc: "Compounded and cold-chain shipped after physician sign-off." },
];

// ─── Top progress bar — segmented step indicator ──────────────────────────
// hims-tier: one calm track split into N hairline segments — each fills as its
// step completes, so "how far / how many left" reads at a glance on mobile
// (far more legible than a single thin fill). Colour only (background-color
// transition, compositor-cheap, no layout thrash), guarded under
// prefers-reduced-motion. Casts azure or orchid via the --nx-* tokens.

export function LabeledProgress({ step }: { step: number }) {
  const total = STEP_LABELS.length; // 7
  // step 1..7 maps to STEP_LABELS index 0..6
  const activeIndex = Math.min(Math.max(step - 1, 0), total - 1);
  return (
    <div
      data-testid="assessment-progress"
      style={{
        borderBottom: "1px solid var(--nx-border)",
        backgroundColor: "var(--nx-bg)",
        flexShrink: 0,
        padding: "1.125rem var(--nx-gutter)",
      }}
    >
      <style>{`
        .nx-prog-seg { transition: background-color var(--nx-dur-3) var(--nx-ease); }
        @media (prefers-reduced-motion: reduce) {
          .nx-prog-seg { transition: none; }
        }
      `}</style>
      {/* 1040px matches the in-flow layout container (question column +
          sidebar) — a 640px centered bar floated offset from both */}
      <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: F,
              fontSize: "var(--nx-t-xs)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--nx-cobalt)",
            }}
          >
            Step {step} of {total}
          </span>
          <span
            data-testid="assessment-progress-label"
            className="assessment-progress-label"
            style={{
              fontFamily: F,
              fontSize: "var(--nx-t-xs)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {STEP_LABELS[activeIndex]}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Intake progress"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={step}
          aria-valuetext={`Step ${step} of ${total} — ${STEP_LABELS[activeIndex]}`}
          data-testid="assessment-progress-fill"
          style={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          {Array.from({ length: total }).map((_, i) => {
            const done = i < step; // step 1..7 fills segments 0..(step-1)
            return (
              <span
                key={i}
                className="nx-prog-seg"
                data-active={i === activeIndex}
                data-done={done}
                aria-hidden="true"
                style={{
                  flex: 1,
                  height: "3px",
                  borderRadius: "var(--nx-r-pill)",
                  backgroundColor: done ? "var(--nx-cobalt)" : "var(--nx-border)",
                }}
              />
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
        gap: "0.75rem",
        marginTop: "2.5rem",
        padding: "1.125rem 1.25rem",
        borderRadius: "var(--nx-r-sm)",
        backgroundColor: "var(--nx-cobalt-soft)",
      }}
    >
      <Info size={15} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: "2px" }} />
      <div>
        <p
          style={{
            fontFamily: F,
            fontSize: "var(--nx-t-xs)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--nx-cobalt)",
            marginBottom: "0.5rem",
          }}
        >
          Why we ask
        </p>
        <p
          id={`assessment-why-text-${funnelStep}`}
          style={{
            fontFamily: F,
            fontSize: "var(--nx-t-sm)",
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
        borderRadius: "var(--nx-r-xs)",
        overflow: "hidden",
        backgroundColor: "var(--nx-ceramic)",
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
            fontFamily: F,
            fontSize: "var(--nx-t-sm)",
            fontWeight: 600,
            color: "var(--nx-fg)",
          }}
        >
          See a sample protocol
        </span>
        {open ? (
          <Minus size={16} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
        ) : (
          <Plus size={16} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
        )}
      </button>
      {open && (
        <div
          data-testid="assessment-sample-protocol-body"
          style={{ padding: "0 1.125rem 1.25rem", borderTop: "1px solid var(--nx-border)" }}
        >
          <p
            style={{
              fontFamily: F,
              fontSize: "var(--nx-t-xs)",
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
            { k: "Reassessment", v: "Lab redraw at day 90"},
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
                  fontFamily: F,
                  fontSize: "var(--nx-t-xs)",
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
                  fontFamily: F,
                  fontSize: "var(--nx-t-sm)",
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
    <aside
      aria-label="What happens after you submit"
      data-testid="assessment-sidebar"
      // display lives in classes: on phones the sidebar stacked BELOW the
      // sticky Continue bar's column, detaching the bar mid-scroll and
      // padding the intake with chrome. Desktop-rail only.
      className="hidden lg:flex"
      style={{ flexDirection: "column", gap: "1.5rem" }}
    >
      <div>
        <p
          style={{
            fontFamily: F,
            fontSize: "var(--nx-t-xs)",
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
                  borderRadius: "var(--nx-r-xs)",
                  backgroundColor: "var(--nx-ceramic)",
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
                    borderRadius: "var(--nx-r-pill)",
                    border: "1.5px solid var(--nx-cobalt)",
                    color: "var(--nx-cobalt)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-sm)",
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
                      fontFamily: F,
                      fontSize: "var(--nx-t-xs)",
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
      <ShieldCheck size={14} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
      {/* one span per claim so narrow columns wrap BETWEEN claims,
          never mid-claim */}
      {["HIPAA-compliant", "End-to-end encrypted", "Reviewed by U.S. physicians", "Cancel anytime before dispense"].map((claim, i, arr) => (
        <span
          key={claim}
          style={{
            fontFamily: F,
            fontSize: "var(--nx-t-xs)",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--nx-fg-muted)",
            lineHeight: 1.6,
            whiteSpace: "nowrap",
          }}
        >
          {claim}
          {i < arr.length - 1 ? <span aria-hidden style={{ marginLeft: "0.5rem" }}>·</span> : null}
        </span>
      ))}
    </div>
  );
}
