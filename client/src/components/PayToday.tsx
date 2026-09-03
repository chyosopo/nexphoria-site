/* JOB: the pre-checkout block (docs/MASTER-PLAN.md, step 6). What you pay
   today, in one figure, and what happens next, in four beats. Every line is
   in docs/COPY-DECK.md. Billing truth (Chiya 2026-09-02): something is
   charged at checkout; the questionnaire follows; the doctor decides; the
   refund policy governs a decline. The exact up-front amount beyond the
   monthly figure is OPEN, so the block states the monthly figure it can
   prove and never a second number. */
import { Link } from "wouter";
import { F, S } from "@/lib/typography";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

const STEPS: [string, string][] = [
  ["Check out at the monthly price.", "The figure above, once a month."],
  ["Complete the medical questionnaire.", "About two minutes: your history, your medications, your goal."],
  ["A licensed physician reviews and prescribes.", "If the medicine is appropriate, it is compounded for you and shipped cold."],
  ["If it is declined.", "The physician explains why, and the refund policy sets out what is refunded."],
];

export function PayToday({
  amount,
  testid = "pay-today",
  style,
}: {
  /** the monthly figure, already formatted */
  amount: string;
  testid?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      aria-labelledby={`${testid}-title`}
      data-testid={testid}
      style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-lg)", padding: "1.25rem 1.3rem", ...style }}
    >
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)", margin: 0 }}>
        What you pay today
      </p>
      <p id={`${testid}-title`} style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", lineHeight: 1.05, color: "var(--nx-fg)", margin: "0.5rem 0 0" }}>
        {amount}
        <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: "var(--nx-fg-graphite)", marginLeft: 6 }}>a month</span>
      </p>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", margin: "0.5rem 0 0" }}>
        Included: physician review, the medication, cold shipping, and the full blood panel of {PANEL_TOTAL_MARKERS} markers at week {RETEST_WEEK}.
      </p>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)", margin: "1.1rem 0 0" }}>
        What happens next
      </p>
      <ol style={{ listStyle: "none", margin: "0.5rem 0 0", padding: 0, display: "grid", gap: 8 }}>
        {STEPS.map(([t, d], i) => (
          <li key={t} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 10, alignItems: "start" }}>
            <span aria-hidden style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 700, color: "var(--nx-cobalt)", marginTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)" }}>{t}</span>{" "}
              <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)" }}>{d}</span>
            </span>
          </li>
        ))}
      </ol>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-muted)", margin: "0.9rem 0 0" }}>
        Prescription only. The physician can decline.{" "}
        <Link href="/legal/refund-policy" className="nx-text-link" style={{ fontWeight: 600 }}>Refund policy</Link>
      </p>
    </section>
  );
}
