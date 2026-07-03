import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // `settled` drops will-change once the entrance transition has finished so
  // idle reveals don't permanently hold a GPU compositor layer (memory bloat).
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      setSettled(true); // no animation runs → never promote a layer
      return;
    }

    const el = ref.current;
    if (!el) return;

    // If already in viewport on mount (e.g. above the fold), show immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      if (delay > 0) {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
      } else {
        setVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setVisible(true), delay);
            } else {
              setVisible(true);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // When the entrance transform finishes, mark settled so CSS drops will-change.
  // Guard to this element's own transform so child transitions don't trip it.
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.propertyName === "transform") {
      setSettled(true);
    }
  };

  return (
    <div
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      className={`nx-reveal ${visible ? "visible" : ""} ${settled ? "nx-settled" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
