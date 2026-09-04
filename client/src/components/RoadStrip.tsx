/* The road, in one line: where the reader is in the five beats. Used in the
   cart drawer, the cart page and checkout so every commerce surface tells
   the same story the home page told. */
import { F } from "@/lib/typography";

export const ROAD_STEPS = ["Choose", "Check out", "Physician review", "Test, then start", "Retest"] as const;

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
