/* ═══ The goals on the night (2026-09-16): every goal with a medicine behind it, the vial on its dark tint ═══ */
import { GoalTile } from "@/components/ivy/GoalTile";
import { liveCategories } from "@/data/peptides";
import { GOAL_ORDER } from "@/data/goalTeaching";
import { F } from "@/lib/typography";

export function GoalsCinema() {
  const goals = liveCategories(GOAL_ORDER);
  return (
    <section className="nx-container nx-cine-sec" aria-labelledby="fd-goals" data-testid="hero-tiles">
      <div className="nx-cine-head">
        <p className="nx-eyebrow">By goal</p>
        <h2 id="fd-goals" className="nx-cine-head__h2">Know what you're after? <span className="nx-grad">Start there.</span></h2>
        <p className="nx-cine-head__p" style={{ fontFamily: F }}>Every goal with a medicine behind it. Choose one and see what a physician can prescribe for it, with the price beside each.</p>
      </div>
      <ul className="nx-cine-goals" aria-label="Every goal">
        {goals.map((g) => (
          <li key={g}><GoalTile goal={g} href={`/peptides?goal=${g}`} testId={`goal-tile-${g}`} /></li>
        ))}
      </ul>
    </section>
  );
}
