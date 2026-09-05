/* ═══ By goal, as fade tiles (enhanced.com study, 2026-09-05; tightened the same evening) ═══
   Three fixed 4:5 tiles a row on the desktop, one snap rail on the phone:
   the photograph fading into navy, two chips (the goal, Rx), the goal's
   sentence as the title, one line of the teaching, the medicines as a row
   of pills with the price in each, and a round arrow to the goal's shelf.
   Only live categories render, and the medicines are read from the catalog.
   The home's section sheet (client/src/styles/home.css) is imported here. */
import { useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";
import { m, useSheen, PRESS_SPRING } from "@/motion";
import { peptides, CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { GOAL_TEACHING, GOAL_ORDER, GOAL_SHOUT } from "@/data/goalTeaching";
import { GOAL_IMAGES } from "@/data/goalImages";
import "@/styles/home.css";

function skusFor(goal: PeptideCategory): SoloPeptide[] {
  return peptides.filter((p) => p.category === goal).map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug)).filter((s): s is SoloPeptide => Boolean(s));
}
function priceOf(s: SoloPeptide): string {
  if (statusOf(s) !== "live") return "pending";
  if (s.gated) return "priced after review";
  return s.pricing ? `from ${usd(s.pricing.m12)}/mo` : "priced at consultation";
}
/* The first sentence of the teaching: what the goal feels like. */
function firstLine(line: string): string {
  const i = line.indexOf(". ");
  return i > 0 ? line.slice(0, i + 1) : line;
}

/* One goal tile: lights under the pointer, settles a touch when pressed
   (the links inside carry their own press through motion.css). */
function GoalTile({ g, i }: { g: PeptideCategory; i: number }) {
  const sheen = useSheen();
  const im = GOAL_IMAGES[g];
  const skus = skusFor(g);
  return (
    <Reveal delay={Math.min(i * 50, 250)} className="nx-goals__item">
      <m.article className="nx-goal nx-sheen" role="listitem" data-testid={`goal-card-${g}`} whileTap={{ scale: 0.985 }} transition={PRESS_SPRING} {...sheen}>
        <div className="nx-goal__media">
          <img src={im.src} srcSet={im.src800 ? `${im.src800} 800w, ${im.src} 1600w` : undefined} sizes="(max-width: 900px) 78vw, 33vw" alt={im.alt} loading="lazy" decoding="async" width={1600} height={1067} />
        </div>
        <Link href={`/peptides?goal=${g}`} className="nx-goal__arrow" aria-label={`${CATEGORY_LABELS[g]}: every medicine`} data-testid={`goal-more-${g}`}><ArrowRight size={18} /></Link>
        <div className="nx-goal__copy">
          <span className="nx-chips" aria-hidden="true"><span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{CATEGORY_LABELS[g]}</span><span className="nx-chip" style={{ fontFamily: F }}>Rx</span></span>
          <h3 className="nx-goal__t" style={{ fontFamily: S }}>{GOAL_SHOUT[g]}</h3>
          <p className="nx-goal__b" style={{ fontFamily: F }}>{firstLine(GOAL_TEACHING[g])}</p>
          <ul className="nx-goal__pills" aria-label={`${CATEGORY_LABELS[g]}: the medicines`}>
            {skus.map((s) => (
              <li key={s.slug}>
                <Link href={`/peptides/${s.slug}`} className="nx-goal__pill" style={{ fontFamily: F }} data-testid={`goal-link-${s.slug}`}>
                  <span>{s.name}</span><span className="nx-goal__dot" aria-hidden="true">·</span><span className="nx-goal__price">{priceOf(s)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </m.article>
    </Reveal>
  );
}

export function GoalGallery() {
  const rail = useRef<HTMLDivElement>(null);
  const goals = liveCategories(GOAL_ORDER).filter((g) => skusFor(g).length > 0);
  if (goals.length === 0) return null;
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.round(rail.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-goals" data-testid="frontdoor-goals">
      <Reveal>
        <div className="nx-sec-head">
          <p className="nx-eyebrow">By goal</p>
          <h2 id="fd-goals" className="nx-dsh2" style={{ maxWidth: "22ch" }}>Start with what you want to change.</h2>
          <p className="nx-lede">Each goal names what it feels like and the medicines a physician can prescribe for it, with the price on each one.</p>
        </div>
      </Reveal>
      <div className="nx-goals" ref={rail} role="list" aria-label="The goals">
        {goals.map((g, i) => <GoalTile key={g} g={g} i={i} />)}
      </div>
      <div className="nx-goals__nav">
        <button type="button" aria-label="Scroll back" onClick={() => scroll(-1)}><ArrowLeft size={16} /></button>
        <button type="button" aria-label="Scroll forward" onClick={() => scroll(1)}><ArrowRight size={16} /></button>
      </div>
    </section>
  );
}
