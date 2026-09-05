/* ═══ The motion layer (2026-09-05, Chiya: "I don't see things moving when
   I touch it") ═══
   One place for the interaction motion the site runs through framer-motion:
   the press, the lift, the pointer sheen, the staggered entrance, the page
   crossfade. styles/motion.css carries the CSS half (hover lifts, the
   touch press, the sheen gradient). Rules:
     · First paint is static. Nothing here hides content on mount; entrances
       run only after an interaction (a filter, a menu, a route change), so
       the prerendered HTML never carries opacity:0.
     · Every surface answers the hand: whileTap on tiles, cards, terms and
       buttons; a sheen follows the pointer and lights where a finger lands.
     · Reduced motion: MotionConfig reducedMotion="user" strips transforms
       and the CSS off switch in motion.css strips the rest.
   Loaded through LazyMotion + domAnimation so the entry carries the small
   runtime; use `m.*`, never `motion.*` (strict mode throws on it). */
import { LazyMotion, MotionConfig, domAnimation, m, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useScroll, useTransform, type Variants, type Transition } from "framer-motion";
import { useCallback, useMemo, type PointerEvent } from "react";

export { m, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useScroll, useTransform };
export type { Variants, Transition };

export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/* The house curve, as framer wants it (index.css --nx-ease). */
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/* Springs. The press is quick and settles without a bounce; the lift is a
   touch softer so a hover reads as weight, not a twitch. */
export const PRESS_SPRING: Transition = { type: "spring", stiffness: 520, damping: 34, mass: 0.7 };
export const LIFT_SPRING: Transition = { type: "spring", stiffness: 300, damping: 26, mass: 0.9 };

/* The gestures. A tile settles to 97%; a button to 96%; a pill to 94%. */
export const TAP_TILE = { scale: 0.97 };
export const TAP_BUTTON = { scale: 0.96 };
export const TAP_PILL = { scale: 0.94 };
export const HOVER_LIFT = { y: -3 };

/* The staggered entrance a grid runs when its contents change. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};
export const stagger = (gap = 0.035, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/* The sheen: a soft radial light that follows the pointer across a tile
   and lights where a finger lands. Writes --mx/--my (percent) on the
   element and toggles is-lit; styles/motion.css draws it as ::after on
   .nx-sheen. Pointer events cover mouse, pen and touch alike. */
export function useSheen() {
  const move = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    el.classList.add("is-lit");
  }, []);
  const leave = useCallback((e: PointerEvent<HTMLElement>) => {
    e.currentTarget.classList.remove("is-lit");
  }, []);
  return useMemo(() => ({ onPointerMove: move, onPointerDown: move, onPointerLeave: leave, onPointerUp: leave, onPointerCancel: leave }), [move, leave]);
}

/* The tilt: a hero tile leans a few degrees toward the pointer and springs
   back. Mouse and pen only (a finger cannot hover); on touch the handlers
   do nothing and the tile keeps its press. */
export function useTilt(max = 5) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.6 });
  const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * max * 2);
    ry.set(px * max * 2);
  }, [rx, ry, max]);
  const onPointerLeave = useCallback(() => { rx.set(0); ry.set(0); }, [rx, ry]);
  return { style: { rotateX, rotateY, transformPerspective: 900 }, onPointerMove, onPointerLeave };
}
