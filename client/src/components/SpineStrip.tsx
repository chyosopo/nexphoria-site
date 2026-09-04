/* Where you are, on every page: the five stops, the current one lit.
   The reader always knows what came before and what is next. */
import { STOPS, type Stop } from "@/data/spine";
import { F } from "@/lib/typography";

export function SpineStrip({ stop, testId }: { stop: Stop; testId?: string }) {
  return (
    <div className="nx-spine" data-testid={testId ?? "spine"}>
      <ol className="nx-container nx-spine__list" aria-label="Where you are">
        {STOPS.map((s, i) => (
          <li key={s} className={i + 1 < stop ? "is-done" : i + 1 === stop ? "is-now" : undefined} aria-current={i + 1 === stop ? "step" : undefined} style={{ fontFamily: F }}>
            <span className="nx-spine__n">{i + 1}</span><span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
