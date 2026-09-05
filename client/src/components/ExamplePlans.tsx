/* ═══ Example plans (2026-09-05, after alyvewellness.com's three people) ═══
   Alyve shows three named people with the formula built for each. We do the
   same shape without inventing a person: three goals, the medicine a physician
   can prescribe for it, how it is taken, the blood markers read first at week
   12, and its price. Everything is derived from the catalog and the monitoring
   data, so a card can never advertise a medicine we do not carry or a marker a
   physician does not read. Labelled an example, never a patient record. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { peptides, CATEGORY_LABELS, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, isSellable, type SoloPeptide } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { monitoringFor } from "@/data/monitoring";
import { F, S } from "@/lib/typography";

/* Three goals with a live, priced medicine behind them. Derived, not hand-set:
   the first sellable medicine in the category leads the card. */
const PLAN_GOALS: PeptideCategory[] = ["metabolic", "growth", "hormone"];

function leadFor(goal: PeptideCategory): SoloPeptide | undefined {
  const inGoal = peptides.filter((p) => p.category === goal).map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug)).filter((s): s is SoloPeptide => Boolean(s));
  return inGoal.find((s) => isSellable(s)) ?? inGoal[0];
}

export function ExamplePlans() {
  const cards = PLAN_GOALS.map((goal) => {
    const lead = leadFor(goal);
    if (!lead) return null;
    const mon = monitoringFor(lead.slug);
    const markers = (mon?.watch ?? []).slice(0, 4);
    const price = lead.pricing ? usd(lead.pricing.m12) : undefined;
    return { goal, lead, markers, price };
  }).filter((c): c is { goal: PeptideCategory; lead: SoloPeptide; markers: string[]; price: string | undefined } => Boolean(c));

  if (!cards.length) return null;

  return (
    <section className="nx-container" aria-labelledby="fd-plans" style={{ paddingTop: "var(--nx-sp-sec)" }}>
      <Reveal>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Example plans</p>
        <h2 id="fd-plans" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.08, letterSpacing: "var(--nx-ls-tight)", marginTop: "0.7rem", textWrap: "balance", maxWidth: "22ch" }}>How a plan comes together.</h2>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "56ch" }}>
          A medicine for the goal, taken on its own schedule, dosed against the blood markers a physician reads first. These are examples, not patient records; a physician sets your own plan from your health questions and your blood test.
        </p>
      </Reveal>
      <Reveal>
        <ul className="nx-plans" role="list" data-testid="frontdoor-plans">
          {cards.map(({ goal, lead, markers, price }, i) => (
            <li key={goal} className="nx-plan nx-stagger-item" style={{ ["--i" as string]: i }}>
              <p className="nx-plan__goal" style={{ fontFamily: F }}>{CATEGORY_LABELS[goal]}</p>
              <p className="nx-plan__name" style={{ fontFamily: S }}>{lead.name}</p>
              <p className="nx-plan__line" style={{ fontFamily: F }}>{lead.outcome}</p>
              <dl className="nx-plan__rows">
                <div><dt style={{ fontFamily: F }}>Read first at week 12</dt><dd style={{ fontFamily: F }}>{markers.length ? markers.join(" · ") : "The full 24-marker panel"}</dd></div>
                <div><dt style={{ fontFamily: F }}>Price</dt><dd style={{ fontFamily: F }}>{price ? `From ${price}/mo` : "Priced at consultation"}</dd></div>
              </dl>
              <Link href={`/goals/${goal}`} className="nx-plan__link" style={{ fontFamily: F }} data-testid={`plan-link-${goal}`}>
                Read about {CATEGORY_LABELS[goal].toLowerCase()} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
