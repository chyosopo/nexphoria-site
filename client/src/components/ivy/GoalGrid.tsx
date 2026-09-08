/* ═══ By goal, as ivy lays it out (2026-09-08) ═══
   Two big tinted tiles first (weight, body composition): the line, the vial
   bleeding off the edge, one white pill. Then every live goal as a small
   tile: the vial on its tint, the name as a pill. Only goals with a
   medicine behind them render. */
import { Link } from "wouter";
import { F } from "@/lib/typography";
import { liveCategories, type PeptideCategory } from "@/data/peptides";
import { GOAL_ORDER } from "@/data/goalTeaching";
import { SKU_PHOTO } from "@/components/SkuPhoto";
import { GoalTile } from "@/components/ivy/GoalTile";

const BIG: { goal: PeptideCategory; k: string; t: string; btn: string; sku: string }[] = [
  { goal: "metabolic", k: "Lose weight with", t: "GLP-1 injections", btn: "Lose weight", sku: "tirzepatide" },
  { goal: "growth", k: "Build lean mass with", t: "growth hormone peptides", btn: "Build muscle", sku: "sermorelin" },
];

export function GoalGrid() {
  const goals = liveCategories(GOAL_ORDER);
  return (
    <section className="nx-container" aria-label="Treatments by goal" data-testid="hero-tiles">
      <div className="nx-bigtiles">
        {BIG.map((b, i) => (
          <Link key={b.goal} href={`/peptides?goal=${b.goal}`} className="nx-bigtile nx-tint" data-goal={b.goal} data-testid={`hero-tile-${b.goal}`} aria-label={`${b.k} ${b.t}`}>
            <span className="nx-bigtile__copy">
              <span className="nx-bigtile__k">{b.k}</span>
              <span className="nx-bigtile__t">{b.t}</span>
            </span>
            <img className="nx-bigtile__img" src={SKU_PHOTO[b.sku]} alt="" width={1600} height={1600} fetchPriority={i === 0 ? "high" : undefined} decoding="async" />
            <span className="nx-bigtile__btn nx-cta-ceramic" style={{ fontFamily: F }}>{b.btn}</span>
          </Link>
        ))}
      </div>
      <ul className="nx-gtiles" aria-label="Every goal">
        {goals.map((g) => (
          <li key={g}><GoalTile goal={g} href={`/peptides?goal=${g}`} testId={`goal-tile-${g}`} /></li>
        ))}
      </ul>
    </section>
  );
}
