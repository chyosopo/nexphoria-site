/* JOB: the pre-checkout block (docs/MASTER-PLAN.md, step 6). What you pay
   today, in one amount, and what happens next, in four beats. Every line is
   in docs/COPY-DECK.md. Billing truth (Chiya 2026-09-02): something is
   charged at checkout; the questionnaire follows; the doctor decides; the
   refund policy governs a decline. The exact up-front amount beyond the
   monthly figure is OPEN, so the block states the monthly figure it can
   prove and never a second number. Styles in client/src/styles/buy.css. */
import { Link } from "wouter";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";
import "@/styles/buy.css";

const STEPS: [string, string][] = [
  ["Check out.", "The amount above, paid up front for your term, and everything is within it."],
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
  /** the whole amount, paid up front for the term, already formatted */
  dueToday?: string;
  /** "3 months of Semaglutide · The Panel, complimentary" */
  terms?: string;
  testid?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section aria-labelledby={`${testid}-title`} data-testid={testid} className="nx-paytoday" style={style}>
      <p className="nx-paytoday__kicker">What you pay today</p>
      <p id={`${testid}-title`} className="nx-paytoday__figure">
        {dueToday ?? amount}
        <small>{dueToday ? "today, for the whole term" : "a month"}</small>
      </p>
      {dueToday && (
        <p className="nx-paytoday__terms" data-testid={`${testid}-terms`}>
          {terms ? `${terms}. ` : ""}The monthly figure is {amount}. Renewing at the end is a choice.
        </p>
      )}
      <p className="nx-paytoday__body">
        Includes the medication, the physician's review, cold shipping, the baseline blood kit, and the same {PANEL_TOTAL_MARKERS}-marker panel again at week {RETEST_WEEK}.
      </p>
      <p className="nx-paytoday__next">What happens next</p>
      <ol className="nx-paytoday__steps">
        {STEPS.map(([t, d], i) => (
          <li key={t}>
            <span aria-hidden="true" className="nx-paytoday__n">{String(i + 1).padStart(2, "0")}</span>
            <span><strong>{t}</strong> {d}</span>
          </li>
        ))}
      </ol>
      <p className="nx-paytoday__legal">
        Prescription only, if a licensed physician determines it is appropriate.{" "}
        <Link href="/legal/refund-policy" className="nx-text-link">Refund policy</Link>
      </p>
    </section>
  );
}
