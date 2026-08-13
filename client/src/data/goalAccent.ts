/* ═══ GOAL ACCENTS — colour as navigation ═══

   Chiya (2026-08-13): "Everything should be coloured tiles, even menu items."
   The rule that keeps that from becoming decoration is that a colour
   identifies a GOAL — metabolic is always this green, growth always this
   amber — so a returning visitor learns the map. Two surfaces share a colour
   only if they lead to the same place.

   WHY THIS FILE EXISTS RATHER THAN `var(--nx-goal-${key}-ink)` INLINE:
   building a CSS variable name at runtime defeats the token-integrity check
   in audit:design, which caught exactly that on the first pass — it could see
   `--nx-goal-` and nothing more, so a typo in a key would have produced a
   silently missing colour with no build failure. Every reference here is a
   literal string the checker can verify against the sheet. */

export type GoalKey = "metabolic" | "growth" | "sexual-health" | "neutral";

export interface GoalAccent {
  /** Pale fill for tiles. */
  tint: string;
  /** Hairline, so a pale fill does not dissolve into a pale canvas. */
  edge: string;
  /** The ONLY colour allowed for text on this tint — every pair is asserted
   *  at WCAG AA by audit:design on every build. */
  ink: string;
}

export const GOAL_ACCENT: Record<GoalKey, GoalAccent> = {
  metabolic:       { tint: "var(--nx-goal-metabolic-tint)",       edge: "var(--nx-goal-metabolic-edge)",       ink: "var(--nx-goal-metabolic-ink)" },
  growth:          { tint: "var(--nx-goal-growth-tint)",          edge: "var(--nx-goal-growth-edge)",          ink: "var(--nx-goal-growth-ink)" },
  "sexual-health": { tint: "var(--nx-goal-sexual-health-tint)",   edge: "var(--nx-goal-sexual-health-edge)",   ink: "var(--nx-goal-sexual-health-ink)" },
  neutral:         { tint: "var(--nx-goal-neutral-tint)",         edge: "var(--nx-goal-neutral-edge)",         ink: "var(--nx-goal-neutral-ink)" },
};

/** A catalog category → its goal key. Only LIVE goals carry a colour; anything
 *  else resolves to neutral rather than inventing one, because a colour that
 *  exists invites a tile and a tile invites a dead end. */
export function goalKeyFor(category: string): GoalKey {
  const k = category.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-");
  return k === "metabolic" || k === "growth" || k === "sexual-health" ? k : "neutral";
}

/** The accent for a catalog category, in one call. */
export function accentFor(category: string): GoalAccent {
  return GOAL_ACCENT[goalKeyFor(category)];
}
