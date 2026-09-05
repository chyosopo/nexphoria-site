import { Children, useEffect, useLayoutEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Rise the direct children one after another (styles/motion.css staggers
      them --nx-m-stagger apart). Defaults to on when there is more than one
      direct child; pass false to keep a multi-child block moving as one. */
  stagger?: boolean;
}

/* Content is never hidden by default. The element renders settled; only if
   it is safely below the fold at mount does it ARM (nx-armed: faded and
   lifted), then reveal on intersection. The prerenderer strips nx-armed, so
   a crawler or a visitor whose JS is late always sees the content. A 4s
   failsafe reveals anything an observer never fires for.
   The entrance itself (14px rise, 600ms, the house ease) lives in
   client/src/styles/motion.css — one grammar for every Reveal on the site. */
function safelyOffscreen(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top > window.innerHeight + 80;
}

export function Reveal({ children, className = "", delay = 0, stagger }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  // settled drops will-change once the entrance finished (no lingering layer)
  const [settled, setSettled] = useState(false);
  const staggered = stagger ?? Children.count(children) > 1;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setSettled(true); return; }
    if (safelyOffscreen(el)) setArmed(true);
    else setSettled(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;
    let timer: number | undefined;
    const show = () => {
      if (delay > 0) timer = window.setTimeout(() => setVisible(true), delay);
      else setVisible(true);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) { show(); observer.disconnect(); }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    const failsafe = window.setTimeout(() => setVisible(true), 4000);
    return () => { observer.disconnect(); window.clearTimeout(failsafe); if (timer) window.clearTimeout(timer); };
  }, [armed, delay]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    const host = e.currentTarget;
    // Whole-block entrance: the host itself finished. Staggered entrance: the
    // host never moves, so settle when the LAST direct child lands.
    const done = staggered
      ? e.target instanceof Element && e.target.parentElement === host && e.target === host.lastElementChild
      : e.target === host;
    if (done) setSettled(true);
  };

  return (
    <div
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      className={["nx-reveal", armed ? "nx-armed" : "", staggered ? "nx-stagger" : "", visible ? "visible" : "", settled ? "nx-settled" : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
