/* The five steps, in one line: where the reader is. Used in the cart drawer,
   the cart page and checkout. The words are the deck's five step words
   (docs/COPY-DECK-PLAIN.md) and match the home page's step list. */
import { F } from "@/lib/typography";

export const ROAD_STEPS = ["Choose", "Online visit", "Physician's decision", "Blood kit and first dose", "Week 12"] as const;

export function RoadStrip({ current, testId }: { current: number; testId?: string }) {
  return (
    <ol className="nx-roadstrip" aria-label="Where you are" data-testid={testId}>
      {ROAD_STEPS.map((s, i) => (
        <li key={s} className={i < current ? "is-done" : i === current ? "is-now" : undefined} aria-current={i === current ? "step" : undefined} style={{ fontFamily: F }}>
          <span className="nx-roadstrip__n">{i + 1}</span><span className="nx-roadstrip__t">{s}</span>
        </li>
      ))}
    </ol>
  );
}
