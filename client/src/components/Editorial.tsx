import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * SectionEyebrow — numbered DM Mono uppercase tracking-widest divider label.
 * e.g. <SectionEyebrow num="02" label="The Method" />  →  02 — THE METHOD
 */
export function SectionEyebrow({
  num,
  label,
  className = "",
}: {
  num?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`nx-section-eyebrow ${className}`}>
      {num && (
        <>
          <span className="num">{num}</span>
          <span aria-hidden="true">—</span>
        </>
      )}
      <span>{label}</span>
    </div>
  );
}

/**
 * PullQuote — editorial Gambarino pull quote with acid-green left rule.
 * One per interior page max (brief rule).
 */
export function PullQuote({
  children,
  cite,
  className = "",
}: {
  children: ReactNode;
  cite?: string;
  className?: string;
}) {
  return (
    <figure className={`border-l border-nx-acid pl-6 lg:pl-8 ${className}`}>
      <blockquote className="nx-pullquote">{children}</blockquote>
      {cite && (
        <figcaption className="mt-4 font-mono uppercase text-[11px] tracking-[0.18em] text-foreground/45">
          {cite}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * ClipReveal — wraps content (usually an image) and reveals it with a clip-path
 * wipe when it scrolls into view. Respects prefers-reduced-motion (instant show).
 */
export function ClipReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setArmed(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in-view");
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("in-view");
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${armed ? "nx-clip" : ""} ${className}`}>
      {children}
    </div>
  );
}
