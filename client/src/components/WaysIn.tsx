/* Two ways in, then the road (the playbook, 2026-09-04). The default door is
   the shop: choose, check out, a physician reviews after. The other door is
   the assessment: answer health questions and a physician recommends. Then
   the five beats of the journey, so a reader knows the whole road before
   the first step. Copy system v4; every line is in docs/COPY-DECK.md. */
import { Link } from "wouter";
import { ArrowRight, ShoppingBag, Stethoscope } from "lucide-react";
import { F, S } from "@/lib/typography";
import { RETEST_WEEK } from "@/data/monitoring";
import { track } from "@/lib/analytics";

const DOORS = [
  {
    Icon: ShoppingBag, href: "/peptides", testId: "ways-shop",
    title: "Choose for yourself.",
    body: "Browse the menu, build your plan, and check out. A licensed physician reviews your order and your health questions before anything is made.",
    cta: "Shop the menu",
    note: "Most people start here.",
  },
  {
    Icon: Stethoscope, href: "/assessment", testId: "ways-assess",
    title: "Let a physician choose.",
    body: "Answer a few health questions about your goal and your history. A licensed physician recommends a medicine or a protocol, and you decide.",
    cta: "Get a recommendation",
    note: "Two minutes. Complimentary.",
  },
] as const;

const ROAD: [string, string][] = [
  ["Choose", "A medicine or a protocol, for one month to try it, or three, six or twelve months at a lower monthly figure."],
  ["Check out", "One figure, paid up front for the term. The figure is complete."],
  ["Physician review", "A licensed U.S. physician reads your health questions and writes your prescription if it is right for you."],
  ["Test, then start", "Your medication ships cold with a free at-home blood kit. Draw first, so your physician doses against your numbers."],
  [`Retest at week ${RETEST_WEEK}`, "The same panel again, included. Your physician reads what changed and adjusts your dose. Renew, expand, or stop."],
];

export function WaysIn() {
  return (
    <div className="nx-ways" data-testid="frontdoor-ways">
      <div className="nx-ways__doors">
        {DOORS.map((d) => (
          <Link key={d.href} href={d.href} className="nx-ways__door" data-testid={d.testId} onClick={() => track("ways_in", { door: d.testId })}>
            <span className="nx-icon-circle" aria-hidden="true"><d.Icon size={19} strokeWidth={1.9} /></span>
            <p className="nx-ways__title" style={{ fontFamily: S }}>{d.title}</p>
            <p className="nx-ways__body" style={{ fontFamily: F }}>{d.body}</p>
            <p className="nx-ways__cta" style={{ fontFamily: F }}>{d.cta} <ArrowRight size={15} strokeWidth={2} aria-hidden="true" /></p>
            <p className="nx-ways__note" style={{ fontFamily: F }}>{d.note}</p>
          </Link>
        ))}
      </div>
      <ol className="nx-road" aria-label="The road, start to retest">
        {ROAD.map(([t, b], i) => (
          <li key={t} className="nx-road__step">
            <span className="nx-road__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p className="nx-road__t" style={{ fontFamily: S }}>{t}</p>
            <p className="nx-road__b" style={{ fontFamily: F }}>{b}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
