import { Suspense, lazy } from "react";

/**
 * AnimatedCounterLazy — drop-in wrapper around AnimatedCounter that defers
 * framer-motion out of the first-paint graph. The eagerly-imported Home page
 * pulled framer-motion (~120KB) into the entry chunk solely through the
 * counter; loading it lazily lets first paint ship without motion, and the
 * static fallback renders the final value so there is no layout shift.
 */
const Impl = lazy(() =>
  import("@/components/AnimatedCounter").then((m) => ({ default: m.AnimatedCounter })),
);

type CounterProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export function AnimatedCounter(props: CounterProps) {
  const { value, prefix = "", suffix = "", decimals = 0, className = "" } = props;
  return (
    <Suspense
      fallback={
        <span className={`tabular ${className}`}>
          {prefix}
          {value.toFixed(decimals)}
          {suffix}
        </span>
      }
    >
      <Impl {...props} />
    </Suspense>
  );
}
