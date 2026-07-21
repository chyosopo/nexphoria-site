/**
 * TrustBar — thin credibility strip that sits directly under the nav on every page.
 *
 * Design intent: not a marketing banner. Reads like a fine-print legal line —
 * quiet, precise, tiny caps mono-ish letterforms, dot separators. The kind of
 * detail that signals "this is a real medical brand" without shouting.
 */

import { ShieldCheck, Stethoscope, FlaskConical, Package, Star } from "lucide-react";

const items = [
  { icon: Stethoscope, label: "Board-certified physicians" },
  { icon: FlaskConical, label: "US-compounded via 503A partners" },
  { icon: ShieldCheck, label: "HIPAA-compliant" },
  { icon: Package, label: "Discreet 3–5 day shipping" },
  { icon: Star, label: "Lab-monitored every 90 days" },
];

export function TrustBar() {
  return (
    <div
      className="w-full border-b"
      style={{
        background: "var(--nx-bg)",
        borderColor: "color-mix(in oklab, var(--nx-fg) 8%, transparent)",
      }}
      data-testid="trust-bar"
      aria-label="Trust signals"
    >
      {/* One row always: horizontal scroll on phones instead of five stacked
          rows of micro-text (~110px of chrome) under the nav. */}
      <div
        className="nx-trustbar-scroll max-w-[1400px] mx-auto px-6 py-2 flex items-center justify-start md:justify-center flex-nowrap md:flex-wrap overflow-x-auto gap-x-6 gap-y-1.5"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className="flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "var(--nx-t-2xs)",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "color-mix(in oklab, var(--nx-fg) 68%, transparent)",
              lineHeight: 1,
            }}
          >
            <Icon
              size={12}
              strokeWidth={1.8}
              style={{ opacity: 0.75, flexShrink: 0 }}
              aria-hidden="true"
            />
            <span>{label}</span>
            {i < items.length - 1 && (
              <span
                className="hidden md:inline-block ml-6"
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "999px",
                  background: "color-mix(in oklab, var(--nx-fg) 30%, transparent)",
                }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
