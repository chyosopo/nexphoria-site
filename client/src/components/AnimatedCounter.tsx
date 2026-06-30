import { useEffect, useRef, useState } from "react";
import { useInView, motion, animate } from "framer-motion";

/**
 * AnimatedCounter — counts from 0 to value when scrolled into view.
 * Supports decimals, suffixes (×, %, +), and prefix.
 */
export function AnimatedCounter({
  value,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals]);

  return (
    <motion.span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
