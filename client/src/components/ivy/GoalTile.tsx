/* ═══ The goal tile (the ivy restyle, 2026-09-08) ═══
   The vial that stands for the goal on the goal's tint, the goal's name as
   a white pill. One markup for the home grid, the nav panel and the catalog
   filter: a link when it has somewhere to go, a button when it filters. */
import { Link } from "wouter";
import { Check } from "lucide-react";
import { F } from "@/lib/typography";
import { CATEGORY_LABELS, type PeptideCategory } from "@/data/peptides";
import { GOAL_REP, goalChips } from "@/data/goalRep";
import { SKU_PHOTO_600, SKU_PHOTO } from "@/components/SkuPhoto";

interface Props {
  goal: PeptideCategory;
  label?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  testId?: string;
  className?: string;
  tabIndex?: number;
  /** name the goal's medicines inside the tile (the nuform study, 2026-09-24) */
  chips?: boolean;
}

export function GoalTile({ goal, label, href, onClick, active = false, testId, className = "", tabIndex, chips = false }: Props) {
  const rep = GOAL_REP[goal];
  const name = label ?? CATEGORY_LABELS[goal];
  const img = <img src={SKU_PHOTO_600[rep] ?? SKU_PHOTO[rep]} alt="" width={600} height={600} loading="lazy" decoding="async" />;
  const names = chips ? goalChips(goal) : [];
  const chipRow = names.length > 0 ? (
    <span className="nx-gtile__chips" aria-hidden="true">
      {names.map((n) => <span key={n} className="nx-gtile__chip" style={{ fontFamily: F }}>{n}</span>)}
    </span>
  ) : null;
  const pill = (
    <span className="nx-gtile__pill" style={{ fontFamily: F }}>
      {active && <Check size={15} strokeWidth={3} aria-hidden="true" style={{ marginRight: 6 }} />}
      {name}
    </span>
  );
  const cls = `nx-gtile nx-tint${active ? " is-active" : ""}${names.length ? " nx-gtile--chips" : ""}${className ? ` ${className}` : ""}`;
  if (href) {
    return (
      <Link href={href} className={cls} data-goal={goal} onClick={onClick} data-testid={testId} aria-label={names.length ? `${name}: ${names.join(", ")}` : name}>
        {img}{chipRow}{pill}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} data-goal={goal} onClick={onClick} aria-pressed={active} data-testid={testId} tabIndex={tabIndex}>
      {img}{pill}
    </button>
  );
}
