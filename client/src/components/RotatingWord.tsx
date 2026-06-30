import { useState, useEffect, useRef } from "react";

interface RotatingWordProps {
  words: string[];
  interval?: number;
  onWordChange?: (index: number) => void;
}

export function RotatingWord({ words, interval = 5500, onWordChange }: RotatingWordProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hovering, setHovering] = useState(false);
  const prefersReduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (prefersReduced.current || hovering) return;

    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => {
          const next = (c + 1) % words.length;
          onWordChange?.(next);
          return next;
        });
        setAnimating(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval, onWordChange, hovering]);

  return (
    <span
      className="nx-rotating-word inline-block"
      style={{
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(-8px)" : "translateY(0)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        minWidth: "1px",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-live="polite"
      data-testid="rotating-word"
    >
      {words[current]}
    </span>
  );
}
