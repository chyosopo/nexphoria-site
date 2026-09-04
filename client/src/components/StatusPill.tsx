/* Availability, said once, the same way everywhere (the playbook, 2026-09-04).
   Live products render nothing: availability is the default and needs no
   badge. Pending products carry a quiet pill so a card, a goal page and a
   PDP can never disagree about what can be bought today. */
import { STATUS_LABEL, type SoloStatus } from "@/data/soloCatalog";
import { F } from "@/lib/typography";

export function StatusPill({ status, testId, style, short = false }: { status: SoloStatus | "reserve"; testId?: string; style?: React.CSSProperties; short?: boolean }) {
  if (status === "live") return null;
  const label = short ? (status === "watch" ? "Under review" : "Pending") : status === "reserve" ? "Not yet available" : STATUS_LABEL[status];
  return (
    <span className={`nx-status nx-status--${status}`} style={{ fontFamily: F, ...style }} data-testid={testId}>
      {label}
    </span>
  );
}
