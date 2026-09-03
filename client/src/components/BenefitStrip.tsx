/* The visual benefit layer, drawn from data/benefits.ts.
   Full: "Good for" chips, three effect rows with direction arrows, how you
   take it, and the body map with the region lit. Compact: chips and the
   rhythm only, for tiles and option cards. Copy system v4. */
import { ArrowDown, ArrowUp, MoveRight, Syringe, Wind, Pill } from "lucide-react";
import { BodyMap } from "@/components/BodyMap";
import { benefitFor, REGION_LABEL, ROUTE_LABEL, type EffectDir, type Route } from "@/data/benefits";
import { F } from "@/lib/typography";

const DirIcon: Record<EffectDir, typeof ArrowUp> = { up: ArrowUp, down: ArrowDown, steady: MoveRight };
const RouteIcon: Record<Route, typeof Syringe> = { injection: Syringe, spray: Wind, capsule: Pill };
const DIR_WORD: Record<EffectDir, string> = { up: "More", down: "Less", steady: "Steadier" };

export function GoodForChips({ slug, testId }: { slug: string; testId?: string }) {
  const b = benefitFor(slug);
  if (!b) return null;
  return (
    <ul className="nx-goodfor" aria-label="Good for" data-testid={testId}>
      {b.goodFor.map((g) => (
        <li key={g} className="nx-goodfor__chip" style={{ fontFamily: F }}>{g}</li>
      ))}
    </ul>
  );
}

export function BenefitStrip({ slug, compact = false, testId }: { slug: string; compact?: boolean; testId?: string }) {
  const b = benefitFor(slug);
  if (!b) return null;
  const RIcon = RouteIcon[b.how.route];
  if (compact) {
    return (
      <div className="nx-benefit nx-benefit--compact" data-testid={testId}>
        <GoodForChips slug={slug} />
        <p className="nx-benefit__how" style={{ fontFamily: F }}>
          <RIcon size={14} strokeWidth={2} aria-hidden="true" /> {b.how.rhythm}
        </p>
      </div>
    );
  }
  return (
    <div className="nx-benefit" data-testid={testId}>
      <div className="nx-benefit__body">
        <p className="nx-benefit__label" style={{ fontFamily: F }}>Good for</p>
        <GoodForChips slug={slug} />
        <p className="nx-benefit__label" style={{ fontFamily: F, marginTop: "0.9rem" }}>What it does</p>
        <ul className="nx-benefit__effects">
          {b.effects.map((e) => {
            const Icon = DirIcon[e.dir];
            return (
              <li key={e.text} className={`nx-benefit__effect nx-benefit__effect--${e.dir}`} style={{ fontFamily: F }}>
                <span className="nx-benefit__arrow" aria-hidden="true"><Icon size={14} strokeWidth={2.4} /></span>
                <span><span className="sr-only">{DIR_WORD[e.dir]}: </span>{e.text}</span>
              </li>
            );
          })}
        </ul>
        <p className="nx-benefit__label" style={{ fontFamily: F, marginTop: "0.9rem" }}>How you take it</p>
        <p className="nx-benefit__how" style={{ fontFamily: F }}>
          <RIcon size={15} strokeWidth={2} aria-hidden="true" /> {ROUTE_LABEL[b.how.route]} · {b.how.rhythm}
        </p>
      </div>
      <div className="nx-benefit__map">
        <BodyMap region={b.region} size={76} />
        <p className="nx-benefit__region" style={{ fontFamily: F }}>{REGION_LABEL[b.region]}</p>
      </div>
    </div>
  );
}
