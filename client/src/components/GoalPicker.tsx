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
  { slug: "metabolic", title: "Weight loss", line: "GLP-1 medication. Less appetite, steadier blood sugar.", img: goalMetabolic, img500: goalMetabolic500 },
  { slug: "growth", title: "Body composition", line: "Tesamorelin. More of your own growth hormone.", img: goalGrowth, img500: goalGrowth500 },
  { slug: "sexual-health", title: "Sexual desire", line: "PT-141. Works on desire itself, as needed.", img: goalDesire, img500: goalDesire500 },
  { slug: "recovery", title: "Recovery", line: "BPC-157 and TB-500. Support for healing.", img: "img/img_fad0fee022a9.webp", img500: "img/img_fad0fee022a9.webp" },
  { slug: "cognition", title: "Focus and mood", line: "Semax and Selank. Nasal sprays for a clearer head.", img: "img/img_916e52b67436.webp", img500: "img/img_916e52b67436.webp" },
  { slug: "sleep", title: "Sleep", line: "DSIP. Deeper sleep, once a night.", img: "img/img_928775d1e9c1.webp", img500: "img/img_928775d1e9c1.webp" },
  { slug: "longevity", title: "Energy and healthy ageing", line: "NAD+, MOTS-c and epitalon.", img: "img/img_cf1396d09b4a.webp", img500: "img/img_cf1396d09b4a.webp" },
  { slug: "skin", title: "Skin and ageing", line: "GHK-Cu and epitalon. Skin support from within.", img: "img/img_3678caab4727.webp", img500: "img/img_3678caab4727.webp" },
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
                {counts[g.slug] ?? 0} {counts[g.slug] === 1 ? "treatment" : "treatments"} · Learn more
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="nx-goal-chips" role="list" aria-label="Start the assessment with a goal">
        <span className="nx-goal-chips-label" style={{ fontFamily: F }}>Or start now with</span>
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
