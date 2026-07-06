import { ShieldCheck } from "lucide-react";
import { F } from "@/lib/typography";

/* ROADMAP 5.2 — THE promise, one phrasing, beside every price display:
   "No charge unless a physician prescribes — the review is free."
   Reuse this component wherever a price is shown; never restate the promise
   in ad-hoc copy. `detail` appends operational specifics (e.g. card holds). */
export function PrescribedPromise({
  onDark = false,
  centered = false,
  detail,
  testid = "prescribed-promise",
  style,
}: {
  onDark?: boolean;
  centered?: boolean;
  /** optional operational detail appended after the promise */
  detail?: string;
  testid?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p
      data-testid={testid}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: centered ? "center" : "flex-start",
        textAlign: centered ? "center" : "left",
        gap: 7,
        fontFamily: F,
        fontSize: "var(--nx-t-xs)",
        fontWeight: 500,
        lineHeight: 1.5,
        color: onDark ? "color-mix(in srgb, var(--nx-acid) 85%, transparent)" : "var(--nx-fg-graphite)",
        margin: 0,
        ...style,
      }}
    >
      <ShieldCheck size={13} aria-hidden style={{ flexShrink: 0, marginTop: 2, color: onDark ? "var(--nx-acid)" : "var(--nx-cobalt)" }} />
      <span>
        <strong style={{ fontWeight: 600, color: onDark ? "var(--nx-acid)" : "var(--nx-fg)" }}>
          No charge unless a physician prescribes
        </strong>
        {" "}— the review is free.{detail ? ` ${detail}` : ""}
      </span>
    </p>
  );
}
