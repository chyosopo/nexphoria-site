import { useState } from "react";
import { X } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   AnnouncementBar — reference-grade sticky promo strip.
   Sits above the nav. Cobalt (ink) background, cream text,
   one rust accent. Dismissable, no localStorage (session only).
   ────────────────────────────────────────────────────────────── */

interface AnnouncementBarProps {
  /** primary copy (left side) */
  message?: string;
  /** small accent tag on the left */
  tag?: string;
}

export function AnnouncementBar({
  message = "Your first consultation is complimentary \u00B7 503A compounded in the U.S. \u00B7 Cold-chain shipped to all 50 states",
  tag = "Peptides",
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className="w-full"
      style={{
        background: "var(--nx-fg)",
        color: "var(--nx-bg)",
        borderBottom: "1px solid rgba(243, 245, 247,0.08)",
      }}
      data-testid="announcement-bar"
      role="region"
      aria-label="Promotional announcement"
    >
      <div className="nx-container flex items-center gap-3 py-2.5">
        <span
          className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] uppercase tracking-[0.22em]"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            color: "var(--nx-fg)",
            background: "var(--nx-acid)",
            letterSpacing: "0.22em",
            fontWeight: 600,
          }}
        >
          {tag}
        </span>
        <span
          className="flex-1 text-[11px] sm:text-xs leading-tight"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            color: "var(--nx-bg)",
            fontWeight: 400,
          }}
        >
          {message}
        </span>
        {/* CTA law (ROADMAP 1.1): the bar carries the message only — its CTA
            competed with the nav's primary button in the same viewport */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 -mr-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
          data-testid="button-dismiss-announcement"
          style={{ color: "var(--nx-bg)" }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
