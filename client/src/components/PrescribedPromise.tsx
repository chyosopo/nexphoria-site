import { ShieldCheck } from "lucide-react";
import "@/styles/buy.css";

/* ROADMAP 5.2 — THE promise, one phrasing, beside every price display:
   "Every order is reviewed by a licensed physician before anything is made. Refund terms apply."
   Chiya, 2026-09-02: checkout can precede the questionnaire, so the old
   "no charge unless prescribed" line was untrue and is retired sitewide.
   Reuse this component wherever a price is shown; never restate the promise
   in ad-hoc copy. `detail` appends operational specifics (e.g. card holds).
   `variant="card"` sets it as a hairline card (the buy box). */
export function PrescribedPromise({
  onDark = false,
  centered = false,
  variant = "inline",
  detail,
  testid = "prescribed-promise",
  className,
  style,
}: {
  onDark?: boolean;
  centered?: boolean;
  variant?: "inline" | "card";
  /** optional operational detail appended after the promise */
  detail?: string;
  testid?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cls = ["nx-promise", onDark && "nx-promise--dark", centered && "nx-promise--center", variant === "card" && "nx-promise--card", className]
    .filter(Boolean).join(" ");
  return (
    <p data-testid={testid} className={cls} style={style}>
      <ShieldCheck size={14} aria-hidden="true" />
      <span>
        <strong>Every order is reviewed by a licensed physician before anything is made.</strong>
        {" "}Refund terms apply.{detail ? ` ${detail}` : ""}
      </span>
    </p>
  );
}
