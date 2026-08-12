/* ═══ PROTOCOL SELECTOR — the Maximus decision-surface (docs/MAXIMUS-STUDY.md
   §2), commissioned by Chiya 2026-07-13. Each goal page offers 2–4 ROUTES to
   the same outcome, each rendered as a "Best for: [persona]" comparison card
   so the visitor sees themselves and picks — and a physician confirms.
   Everything below is DERIVED from the flagship stacks and solo catalog;
   the persona lines are the only authored copy, and each one restates what
   the compound's own mechanism/panel data already says. */
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { peptides, type PeptideCategory } from "@/data/peptides";
import { getPrice } from "@/data/pricing";

/** Flagship → the goal it answers (mirrors StackPage's STACK_GOAL). */
export const GOAL_OF_STACK: Record<string, PeptideCategory> = {
  wolverine: "recovery",
  glow: "skin",
  ascend: "growth",
  lucidity: "cognition",
  meridian: "longevity",
  ignite: "metabolic",
  threshold: "sleep",
};

/* Persona lines, one per solo — institutional voice, no new claims: each
   line is the compound's mechanism/scope restated as "who picks this". */
const SOLO_BEST_FOR: Record<string, string> = {
  "sermorelin": "Those who want their own GH pulse restarted — the gentlest entry to the axis.",
  "ipamorelin": "Those who want pulse frequency without a cortisol or prolactin spike.",
  "cjc-1295": "Those focused on raising pulse amplitude, often alongside Ipamorelin.",
  "ipa-cjc": "Those who want amplitude and frequency covered in one nightly injection.",
  "tesamorelin": "Those whose specific target is visceral fat, on physician advice.",
  "selank": "Those who want a steadier mood floor through the day, without sedation.",
  "semax": "Those whose priority is focus and executive function under load.",
  "cerebrolysin": "Those pursuing a defined neurotrophic course under close physician direction.",
  "methylene-blue": "Those addressing mental energy at the mitochondrial level.",
  "bpc-157": "Those healing one thing — a tendon, a joint, a gut lining — and nothing else.",
  "tb-500": "Those whose repair needs to reach a specific tissue site.",
  "bpc-tb-combo": "Those who want the full repair pairing without the flagship protocol.",
  "ghk-cu": "Those whose single priority is skin quality, at the matrix level.",
  "epitalon": "Those focused on the cellular-age signal, run in short pulses.",
  "nad-plus": "Those addressing fatigue and cellular energy first.",
  "mots-c": "Those adding an exercise-mimetic metabolic signal to training.",
  "semaglutide": "Those pursuing appetite control under full physician titration.",
  "tirzepatide": "Those who need action on both GIP and GLP-1 receptors.",
  "dsip": "Those whose sleep breaks at onset and depth, not schedule.",
  "pt-141": "Those addressing desire centrally — on-demand, not daily.",
};

/** Format read from the dose string — a true, doc-sourced fact. */
function formatBadge(dose: string): string {
  if (/nasal/i.test(dose)) return "Nasal spray";
  if (/topical|cream/i.test(dose)) return "Topical";
  if (/troche|oral|capsule|tablet/i.test(dose)) return "Oral";
  if (/\bSC\b/i.test(dose)) return "Injection · SC";
  return "Compounded";
}

export interface SelectorRoute {
  kind: "protocol" | "compound";
  slug: string;
  name: string;
  href: string;
  badges: string[];
  bestFor: string;
  bullets: string[];
  priceLine: string;
  /** true → no price shown; the physician wall decides */
  gated?: boolean;
  /** small footer fact, e.g. the 12-month panel inclusion */
  note?: string;
}

/** The routes a goal page offers, in card order: the goal's flagship
 *  protocol first (unless it leans to the OTHER world), then the goal's
 *  solo compounds — priced ones first. */
export function selectorRoutes(goal: PeptideCategory, world: "men" | "women"): SelectorRoute[] {
  const oppositeLean = world === "women" ? "him" : "her";

  const stackRoutes: SelectorRoute[] = FLAGSHIP_STACKS
    .filter((s) => GOAL_OF_STACK[s.slug] === goal && s.worldLean !== oppositeLean)
    .map((s) => {
      const perMonths = s.cadences.map((c) => c.perMonth ?? c.total);
      return {
        kind: "protocol" as const,
        slug: s.slug,
        name: `The ${s.name} protocol`,
        href: `/stacks/${s.slug}`,
        badges: ["Complete protocol", `${s.peptides.length} compounds`, `${s.panel} panel`],
        bestFor: s.bestFor,
        bullets: s.peptides.slice(0, 3).map((p) => `${p.name} — ${p.dose}`),
        priceLine: s.gated ? "Physician-assessed" : `From ${usd(Math.min(...perMonths))}/mo`,
        gated: s.gated,
        note: !s.gated && s.cadences.some((c) => c.includesPanel)
          ? "12-month cadence includes the bloodwork panel."
          : undefined,
      };
    });

  const soloRoutes: SelectorRoute[] = peptides
    .filter((p) => p.category === goal)
    .map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .sort((a, b) => Number(Boolean(b.pricing)) - Number(Boolean(a.pricing)))
    .slice(0, stackRoutes.length > 0 ? 2 : 3)
    .map((s) => ({
      kind: "compound" as const,
      slug: s.slug,
      name: s.name,
      href: `/${world}/peptides/${s.slug}`,
      badges: [formatBadge(s.dose), "Single compound", `${s.panel} panel`],
      bestFor: SOLO_BEST_FOR[s.slug] ?? s.outcome,
      bullets: Array.from(new Set([
        s.outcome,
        ...s.timeline.slice(0, 1).map((t) => `${t.wk} — ${t.effect}`),
        ...s.timeline.slice(-1).map((t) => `${t.wk} — ${t.effect}`),
      ])),
      priceLine: s.gated
        ? "Physician-assessed"
        : s.pricing
          ? `From ${usd(s.pricing.m12)}/mo`
          : getPrice(s.slug)
            ? `From ${usd(getPrice(s.slug)!.monthlyPrice)}/mo`
            : "Priced at consult",
      gated: s.gated,
    }));

  return [...stackRoutes, ...soloRoutes];
}
