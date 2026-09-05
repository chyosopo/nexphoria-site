/* ═══ By goal, as fade tiles (enhanced.com study, 2026-09-05) ═══
   One wide tile per goal: the photograph on the right fading into navy on
   the left, two chips (the goal, Rx), the goal's plain line, the medicines
   with their prices, and a round arrow. Only live categories render, and
   the medicines are read from the catalog. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";
import { peptides, CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { GOAL_TEACHING, GOAL_ORDER, GOAL_SHOUT } from "@/data/goalTeaching";
import { GOAL_IMAGES } from "@/data/goalImages";

function skusFor(goal: PeptideCategory): SoloPeptide[] {
  return peptides.filter((p) => p.category === goal).map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug)).filter((s): s is SoloPeptide => Boolean(s));
}
function priceOf(s: SoloPeptide): string {
  if (statusOf(s) !== "live") return "pending";
  if (s.gated) return "priced after review";
  return s.pricing ? `from ${usd(s.pricing.m12)}/mo` : "priced at consultation";
}
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
          <h2 id="fd-goals" className="nx-dsh2" style={{ maxWidth: "22ch" }}>Start with what you want to change.</h2>
          <p className="nx-lede">Each goal below says what it feels like and which medicines a physician can prescribe for it, with the price beside each one.</p>
        </div>
      </Reveal>
      <div className="nx-tiles nx-tiles--2">
        {goals.map((g, i) => {
          const [feel, does] = split(GOAL_TEACHING[g]);
          const body = does ? `${feel} ${does}` : feel;
          const im = GOAL_IMAGES[g];
          const skus = skusFor(g);
          return (
            <Reveal key={g} delay={Math.min(i * 50, 250)} className="nx-tiles__item">
              <article className="nx-tile nx-tile--fade" data-testid={`goal-card-${g}`}>
                <img src={im.src} srcSet={im.src800 ? `${im.src800} 800w, ${im.src} 1600w` : undefined} sizes="(max-width: 900px) 100vw, 50vw" alt={im.alt} loading="lazy" decoding="async" width={1600} height={1067} />
                <div className="nx-tile__fadecopy">
                  <span className="nx-chips" aria-hidden="true"><span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{CATEGORY_LABELS[g]}</span><span className="nx-chip" style={{ fontFamily: F }}>Rx</span></span>
                  <h3 className="nx-tile__t" style={{ fontFamily: S }}>{GOAL_SHOUT[g]}</h3>
                  <p className="nx-tile__b" style={{ fontFamily: F }}>{body}</p>
                  <ul className="nx-tile__list">
                    {skus.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/peptides/${s.slug}`} style={{ fontFamily: F }} data-testid={`goal-link-${s.slug}`}>
                          <span>{s.name}</span><span className="nx-tile__price">{priceOf(s)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/peptides?goal=${g}`} className="nx-tile__arrow nx-tile__arrow--always" aria-label={`${CATEGORY_LABELS[g]}: every medicine`} data-testid={`goal-more-${g}`}><ArrowRight size={18} /></Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
