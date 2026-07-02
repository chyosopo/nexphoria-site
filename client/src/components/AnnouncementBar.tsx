import { useState } from "react";
import { X } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   AnnouncementBar — Maximus-style sticky promo strip.
   Sits above the nav. Cobalt (ink) background, cream text,
   one rust accent. Dismissable, no localStorage (session only).
   ────────────────────────────────────────────────────────────── */

interface AnnouncementBarProps {
  /** primary copy (left side) */
  message?: string;
  /** small accent tag on the left */
  tag?: string;
  /** optional CTA link */
  ctaLabel?: string;
  ctaHref?: string;
}

export function AnnouncementBar({
  message = "Free physician consult on your first protocol \u00B7 503A compounded in the U.S. \u00B7 Cold-chain shipped to all 50 states",
  tag = "Pharmacy",
  ctaLabel = "Start intake",
  ctaHref = "/assessment",
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className="w-full"
      style={{
        background: "#1C1815",
        color: "#FAF7F0",
        borderBottom: "1px solid rgba(250,247,240,0.08)",
      }}
      data-testid="announcement-bar"
      role="region"
      aria-label="Promotional announcement"
    >
      <div className="nx-container flex items-center gap-3 py-2.5">
        <span
          className="hidden sm:inline-flex items-center px-2 py-0.5 text-[9px] uppercase tracking-[0.22em]"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            color: "#1C1815",
            background: "#F3C87A",
            letterSpacing: "0.22em",
            fontWeight: 600,
          }}
        >
          {tag}
        </span>
        <span
          className="flex-1 text-[11px] sm:text-[12px] leading-tight"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            color: "#FAF7F0",
            fontWeight: 400,
          }}
        >
          {message}
        </span>
        <a
          href={`#${ctaHref}`}
          className="hidden sm:inline text-[10px] uppercase tracking-[0.18em] hover:opacity-80 transition-opacity"
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            color: "#FAF7F0",
            borderBottom: "1px solid rgba(250,247,240,0.4)",
            paddingBottom: 1,
          }}
          data-testid="link-announcement-cta"
        >
          {ctaLabel} →
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 -mr-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
          data-testid="button-dismiss-announcement"
          style={{ color: "#FAF7F0" }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
