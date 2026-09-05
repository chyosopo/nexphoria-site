/* By goal: what each goal feels like, what the medicines do about it, and
   the medicines themselves as links — the teaching layer for the rail's
   tabs. Only live categories render (liveCategories), and the medicines
   under each are read from the catalog. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";
import { peptides, CATEGORY_LABELS, liveCategories, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { GOAL_TEACHING, GOAL_ORDER } from "@/data/goalTeaching";

function skusFor(goal: PeptideCategory): SoloPeptide[] {
  return peptides.filter((p) => p.category === goal).map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug)).filter((s): s is SoloPeptide => Boolean(s));
}
function priceOf(s: SoloPeptide): string {
  if (statusOf(s) !== "live") return "pending";
  if (s.gated) return "priced after review";
  return s.pricing ? `from ${usd(s.pricing.m12)}/mo` : "priced at consultation";
}

export function ByGoal() {
  const goals = liveCategories(GOAL_ORDER).filter((g) => skusFor(g).length > 0);
  if (goals.length === 0) return null;
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-goals" data-testid="frontdoor-goals">
      <Reveal>
        <div className="nx-sec-head">
          <p className="nx-eyebrow">By goal</p>
          <h2 id="fd-goals" className="nx-dsh2" style={{ maxWidth: "22ch" }}>What each goal means, and what treats it.</h2>
          <p className="nx-lede">The same medicines, by what they are for.</p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" style={{ gap: 14, marginTop: "clamp(1.4rem,3vw,2rem)" }}>
        {goals.map((g, i) => (
          <Reveal key={g} delay={Math.min(i * 40, 200)}>
            <div className="nx-card" style={{ height: "100%", display: "flex", flexDirection: "column" }} data-testid={`goal-card-${g}`}>
              <p className="nx-eyebrow">{CATEGORY_LABELS[g]}</p>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-base)", lineHeight: 1.4, color: "var(--nx-fg)", marginTop: "0.5rem" }}>{GOAL_TEACHING[g]}</p>
              <ul style={{ listStyle: "none", margin: "auto 0 0", padding: "0.9rem 0 0", display: "grid", gap: 6 }}>
                {skusFor(g).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/peptides/${s.slug}`} className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }} data-testid={`goal-link-${s.slug}`}>
                      {s.name} <span style={{ fontWeight: 500, color: "var(--nx-fg-muted)" }}>· {priceOf(s)}</span> <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
