/* ═══ GoalPicker — start with your goal (Chiya, 2026-09-02, the 1000x pass)

   Three photographed goal cards plus a row of quick chips. Every card and
   chip lands in the assessment with the goal already chosen (?goal=), so a
   visitor is one tap from the intake. Cards breathe slowly while on screen;
   reduced motion shows them still. */
import { Link } from "wouter";
import { F, S } from "@/lib/typography";
import goalMetabolic from "@/assets/life/goal-metabolic.webp";
import goalMetabolic500 from "@/assets/life/goal-metabolic-500.webp";
import goalGrowth from "@/assets/life/goal-growth.webp";
import goalGrowth500 from "@/assets/life/goal-growth-500.webp";
import goalDesire from "@/assets/life/goal-desire.webp";
import goalDesire500 from "@/assets/life/goal-desire-500.webp";

export interface GoalCard {
  slug: string;
  title: string;
  line: string;
  img: string;
  img500: string;
  count: number;
}

export const GOAL_CARDS: Omit<GoalCard, "count">[] = [
  { slug: "metabolic", title: "Weight", line: "Appetite, finally quiet.", img: goalMetabolic, img500: goalMetabolic500 },
  { slug: "growth", title: "Strength", line: "Strength, with receipts.", img: goalGrowth, img500: goalGrowth500 },
  { slug: "sexual-health", title: "Desire", line: "Desire, addressed directly.", img: goalDesire, img500: goalDesire500 },
];

export function GoalPicker({ counts }: { counts: Record<string, number> }) {
  return (
    <div className="nx-goals" data-testid="frontdoor-goals">
      <div className="nx-goal-cards">
        {GOAL_CARDS.map((g, i) => (
          <Link
            key={g.slug}
            href={`/goals/${g.slug}`}
            className="nx-goal-card"
            style={{ ["--i" as string]: i }}
            data-testid={`frontdoor-goal-${g.slug}`}
          >
            <img
              src={g.img}
              srcSet={`${g.img500} 500w, ${g.img} 1000w`}
              sizes="(max-width: 720px) 90vw, 30vw"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              width={1000}
              height={1250}
            />
            <span className="nx-goal-card-copy">
              <span className="nx-goal-card-title" style={{ fontFamily: S }}>{g.title}</span>
              <span className="nx-goal-card-line" style={{ fontFamily: S }}>{g.line}</span>
              <span className="nx-goal-card-meta" style={{ fontFamily: F }}>
                {counts[g.slug] ?? 0} {counts[g.slug] === 1 ? "option" : "options"} · Start here
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="nx-goal-chips" role="list" aria-label="Start the assessment with a goal">
        <span className="nx-goal-chips-label" style={{ fontFamily: F }}>Or jump straight in with</span>
        {GOAL_CARDS.map((g) => (
          <Link key={g.slug} href={`/assessment?goal=${g.slug}`} className="nx-chip" role="listitem" style={{ fontFamily: F }} data-testid={`frontdoor-chip-${g.slug}`}>
            {g.title}
          </Link>
        ))}
        <Link href="/assessment" className="nx-chip nx-chip-ghost" role="listitem" style={{ fontFamily: F }} data-testid="frontdoor-chip-unsure">
          Not sure yet
        </Link>
      </div>
    </div>
  );
}
