/* ═══ GOALS — the merchandising unit that replaces stacks ═══

   Why this exists (docs/IVYRX-STUDY.md §2, §7.1):
   the reference site triages on GOAL and attaches the molecule downstream.
   We were molecule-first — catalog → category → stack — which asks a visitor
   to already know what they want. Nobody arrives wanting tesamorelin; they
   arrive wanting a body that behaves differently. Goals invert that.

   Why goals rather than stacks, specifically:
   the launch scope leaves four SKUs, and six of the seven flagship stacks are
   composed entirely of retired molecules. At this catalog size a multi-peptide
   "stack" is not an honest unit — there is nothing to stack. Goals are.

   Why two and not three:
   the live categories are Growth (tesamorelin), Metabolic (semaglutide,
   tirzepatide) and Sexual Health (PT-141). Tesamorelin's actual outcome is
   visceral fat, which is the same thing a visitor means by "weight" — so it
   belongs WITH the GLP-1s, not in a third goal of its own. A third goal here
   would be a page with one molecule and nothing to compare it to: a dead end,
   which our own rules forbid. Add the third when the catalog earns it.

   Everything derives from SOLO_CATALOG, so the launch-scope filter propagates
   here automatically and a goal can never advertise a molecule we do not sell. */
import { SOLO_CATALOG, type SoloPeptide } from "@/data/soloCatalog";

export type GoalSlug = "weight" | "desire";

/** How a goal converts. The storefront never takes intake or PHI — see
 *  CLAUDE.md boundary watch. "intake" hands off to the medical engine exactly
 *  as the reference does (its marketing site sells nothing either); "cart" is
 *  reserved for SKUs that are genuinely priced and ungated. */
export type GoalConversion = "intake" | "cart";

export interface Goal {
  slug: GoalSlug;
  /** Outcome-first, never the molecule. */
  label: string;
  /** The one-line promise. Institutional register — no hype, no urgency. */
  lede: string;
  /** Her world speaks its own register (Chiya 2026-07-06). */
  ledeWomen?: string;
  /** Slugs claimed by this goal, in the order they should be presented. */
  skus: string[];
}

export const GOALS: Goal[] = [
  {
    slug: "weight",
    label: "Weight & metabolic",
    lede: "Appetite, visceral fat, and the markers underneath them — read at week 12.",
    ledeWomen: "Appetite and metabolism, addressed at the markers rather than by willpower.",
    // GLP-1s lead (what visitors come for); tesamorelin follows as the
    // visceral-fat route for those a physician steers there.
    skus: ["semaglutide", "tirzepatide", "tesamorelin"],
  },
  {
    slug: "desire",
    label: "Desire & intimacy",
    lede: "Arousal addressed centrally, on a physician's read rather than a guess.",
    ledeWomen: "Desire, addressed directly — and on your schedule.",
    skus: ["pt-141"],
  },
];

export function getGoal(slug: string): Goal | undefined {
  return GOALS.find((g) => g.slug === slug);
}

/** Live SKUs for a goal, resolved through the launch-scope filter. A goal
 *  whose molecules are all retired resolves to [] and must not be rendered —
 *  use `liveGoals()` rather than mapping GOALS directly. */
export function goalSkus(goal: Goal): SoloPeptide[] {
  return goal.skus
    .map((s) => SOLO_CATALOG.find((x) => x.slug === s))
    .filter((s): s is SoloPeptide => Boolean(s));
}

/** Goals that still have something behind them. This is the guard against the
 *  exact failure the stacks layer hit: a surface advertising molecules the
 *  catalog no longer carries. */
export function liveGoals(): Goal[] {
  return GOALS.filter((g) => goalSkus(g).length > 0);
}

/** A goal converts to cart only if every molecule behind it is genuinely
 *  priced and ungated; otherwise it routes to intake. Today that means both
 *  goals route to intake — the GLP-1s are gated and PT-141 is consult-priced,
 *  so only tesamorelin is directly sellable. Derived rather than hardcoded so
 *  this flips on its own when pricing lands. */
export function goalConversion(goal: Goal): GoalConversion {
  const skus = goalSkus(goal);
  const allSellable = skus.length > 0 && skus.every((s) => !s.gated && Boolean(s.pricing));
  return allSellable ? "cart" : "intake";
}

/** The goal a given SKU belongs to, for cross-linking from a PDP. */
export function goalOfSku(slug: string): Goal | undefined {
  return GOALS.find((g) => g.skus.includes(slug));
}

export function goalLede(goal: Goal, world?: "men" | "women"): string {
  return world === "women" ? (goal.ledeWomen ?? goal.lede) : goal.lede;
}
