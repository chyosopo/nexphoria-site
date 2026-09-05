/* ═══ By goal, as a gallery (2026-09-05) ═══
   Replaces the text-only ByGoal cards. One photograph per goal, the goal's
   plain line (what it feels like, what the medicines do about it), and the
   medicines for it with their prices, each a link to its page. Only live
   categories render, and the medicines under each are read from the
   catalog, so a goal can never show a medicine we do not sell. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";
import { peptides, CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { GOAL_TEACHING, GOAL_ORDER } from "@/data/goalTeaching";
import { GOAL_IMAGES } from "@/data/goalImages";

function skusFor(goal: PeptideCategory): SoloPeptide[] {
  return peptides.filter((p) => p.category === goal).map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug)).filter((s): s is SoloPeptide => Boolean(s));
}
function priceOf(s: SoloPeptide): string {
  if (statusOf(s) !== "live") return "pending";
  if (s.gated) return "priced after review";
  return s.pricing ? `from ${usd(s.pricing.m12)}/mo` : "priced at consultation";
}
/* The teaching line splits at its first full stop: the feeling, then what
   the medicines do about it. */
function split(line: string): [string, string] {
  const i = line.indexOf(". ");
  return i > 0 ? [line.slice(0, i + 1), line.slice(i + 2)] : [line, ""];
}

export function GoalGallery() {
  const goals = liveCategories(GOAL_ORDER).filter((g) => skusFor(g).length > 0);
  if (goals.length === 0) return null;
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-goals" data-testid="frontdoor-goals">
      <Reveal>
        <div className="nx-sec-head">
          <p className="nx-eyebrow">By goal</p>
          <h2 id="fd-goals" className="nx-dsh2" style={{ maxWidth: "22ch" }}>What each goal means, and what treats it.</h2>
          <p className="nx-lede">The same medicines, by what they are for. Each line links to the medicine, its evidence and its price.</p>
        </div>
      </Reveal>
      <div className="nx-goalgal">
        {goals.map((g, i) => {
          const [feel, does] = split(GOAL_TEACHING[g]);
          const im = GOAL_IMAGES[g];
          return (
            <Reveal key={g} delay={Math.min(i * 50, 250)} className="nx-goalgal__item">
              <article className="nx-goalgal__card" data-testid={`goal-card-${g}`}>
                <div className="nx-goalgal__media">
                  <img src={im.src} srcSet={im.src800 ? `${im.src800} 800w, ${im.src} 1600w` : undefined} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" alt={im.alt} loading="lazy" decoding="async" width={1600} height={1067} />
                  <p className="nx-goalgal__label" style={{ fontFamily: F }}>{CATEGORY_LABELS[g]}</p>
                </div>
                <div className="nx-goalgal__body">
                  <p className="nx-goalgal__feel" style={{ fontFamily: S }}>{feel}</p>
                  {does && <p className="nx-goalgal__does" style={{ fontFamily: F }}>{does}</p>}
                  <ul className="nx-goalgal__list">
                    {skusFor(g).map((s) => (
                      <li key={s.slug}>
                        <Link href={`/peptides/${s.slug}`} className="nx-goalgal__link" style={{ fontFamily: F }} data-testid={`goal-link-${s.slug}`}>
                          <span className="nx-goalgal__name">{s.name}</span>
                          <span className="nx-goalgal__price">{priceOf(s)}</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
