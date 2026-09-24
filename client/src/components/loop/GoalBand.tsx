/* ═══ The goals, as cards on the night (2026-09-15) ═══
   openloophealth.com's "Don't build it. Brand it." band: a night-to-accent
   panel with three cards over it. Ours: every goal with a medicine behind
   it, the vial on glass, the name as a white pill. The same GoalTile as the
   nav and the catalog, so one markup answers everywhere. */
import { GoalTile } from "@/components/ivy/GoalTile";
import { liveCategories } from "@/data/peptides";
import { GOAL_ORDER } from "@/data/goalTeaching";
import { F } from "@/lib/typography";

export function GoalBand() {
  const goals = liveCategories(GOAL_ORDER);
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-goals" data-testid="hero-tiles">
      <div className="nx-olband nx-dk">
        <div className="nx-ivhead nx-ivhead--center">
          <p className="nx-eyebrow">By goal</p>
          <h2 id="fd-goals" className="nx-ivhead__h2">Know what you're after? <span className="nx-grad">Start there.</span></h2>
          <p className="nx-ivhead__lede" style={{ fontFamily: F }}>Every goal with a medicine behind it. Choose one and see what a physician can prescribe for it.</p>
        </div>
        <ul className="nx-olgoals" aria-label="Every goal">
          {goals.map((g) => (
            <li key={g}><GoalTile goal={g} href={`/peptides?goal=${g}`} testId={`goal-tile-${g}`} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
