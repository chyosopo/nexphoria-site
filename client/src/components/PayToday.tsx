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
  ["Check out.", "The figure above, paid up front for your term. That is the whole figure."],
  ["A quick online visit.", "About two minutes: your history, your medicines, your goal."],
  ["The physician reviews.", "If appropriate, the medication is made in a licensed U.S. pharmacy and shipped cold, with the baseline blood kit, included."],
  ["Test, then start.", "The draw at home, the dose set against the results, and the first dose. If not prescribed, the physician explains why, and the refund policy covers what is refunded."],
];

export function PayToday({
  amount,
  dueToday,
  terms,
  testid = "pay-today",
  style,
}: {
  /** the monthly figure, already formatted */
  amount: string;
  /** the whole figure, paid up front for the term, already formatted */
  dueToday?: string;
  /** "3 months of Semaglutide · The Panel, complimentary" */
  terms?: string;
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
        {dueToday ?? amount}
        <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: "var(--nx-fg-graphite)", marginLeft: 6 }}>{dueToday ? "today, for the whole term" : "a month"}</span>
      </p>
      {dueToday && (
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", margin: "0.35rem 0 0" }} data-testid={`${testid}-terms`}>
          {terms ? `${terms}. ` : ""}The monthly figure is {amount}. Renewing at the end is a choice.
        </p>
      )}
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", margin: "0.5rem 0 0" }}>
        Includes the medication, the physician's review, cold shipping, the baseline blood kit, and the same {PANEL_TOTAL_MARKERS}-marker panel again at week {RETEST_WEEK}.
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
        Prescription only, if a licensed physician determines it is appropriate.{" "}
        <Link href="/legal/refund-policy" className="nx-text-link" style={{ fontWeight: 600 }}>Refund policy</Link>
      </p>
    </section>
  );
}
