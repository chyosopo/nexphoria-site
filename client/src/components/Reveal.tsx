import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ═══ REVEAL — scroll entrance that can never hide readable content ═══

   REWRITTEN 2026-08-20 after it shipped a broken home page to nexphoria.com.

   The previous design hid by default and relied on JavaScript to reveal:
   an inline script stamped `.nx-js` on <html> before first paint, CSS said
   `.nx-js .nx-reveal { opacity: 0 }`, and React cleared it once mounted. The
   prerendered HTML carries twelve reveal blocks with no `visible` class, so
   between first paint and hydration most of the page was INVISIBLE — a hero
   above a stretch of empty canvas. Chiya saw it as "a weird site." It is
   worst on a cold cache and a slow connection, which is precisely a
   first-time visitor.

   Hiding content by default is the mistake, and no amount of making
   hydration faster fixes it. So the polarity is inverted: nothing is hidden
   unless this component has decided, on the client, that the element is
   OFF-SCREEN and therefore safe to hide. Consequences:

   · Prerendered HTML is fully opaque. If JS never runs, never mounts, or
     throws, the page still reads correctly — that is the state the crawler,
     the reduced-motion user, and the failed-hydration user all get.
   · Nothing a visitor can already see is ever hidden. The hidden state is
     only ever applied below the fold, where it is invisible by definition,
     so there is no flash of content disappearing.
   · Motion is unchanged for everyone who scrolls: below-fold blocks arm,
     then fade and lift in as they enter view.

   The `.nx-js` opacity gate in index.css and its inline script are gone with
   this; they existed only to serve the inverted model. */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Hide only what is comfortably below the fold. The margin keeps an element
 *  that is a sliver on screen — or about to be — out of the hidden state, so
 *  a reveal never blinks at the boundary. */
function safelyOffscreen(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight + 80;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  /* armed: this element is off-screen and has been given the hidden start
     state. Never set on the server, so the prerendered markup is opaque. */
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  /* settled drops will-change once the entrance has finished, so an idle
     reveal does not hold a GPU layer for the life of the page. */
  const [settled, setSettled] = useState(false);

  /* Arm before paint, so an off-screen element is hidden in the same frame it
     is measured — never visible-then-hidden. */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSettled(true);
      return;
    }
    if (safelyOffscreen(el)) setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;

    const show = () => {
      if (delay > 0) {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
      }
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );
    observer.observe(el);

    /* A safety net, not decoration. If the observer never fires — a browser
       that mis-reports intersection, a scroll container we did not anticipate,
       a tab restored below the element — the content would stay hidden
       forever. This guarantees it becomes readable regardless. */
    const failsafe = setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [armed, delay]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.propertyName === "transform") {
      setSettled(true);
    }
  };

  return (
    <div
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      className={[
        "nx-reveal",
        armed ? "nx-armed" : "",
        visible ? "visible" : "",
        settled ? "nx-settled" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
