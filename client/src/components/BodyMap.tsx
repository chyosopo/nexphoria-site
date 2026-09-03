/* A small body silhouette with the region a medicine works on lit up.
   Tokens only: the figure is the border colour, the highlight is the ice
   accent (never crimson, which is reserved for blood imagery). Decorative:
   the region's meaning is written next to it by the caller. */
import type { Region } from "@/data/benefits";

const SPOT: Record<Region, { cx: number; cy: number; r: number }[]> = {
  brain: [{ cx: 50, cy: 16, r: 11 }],
  sleep: [{ cx: 50, cy: 16, r: 11 }],
  desire: [{ cx: 50, cy: 16, r: 11 }],
  gut: [{ cx: 50, cy: 62, r: 12 }],
  abdomen: [{ cx: 50, cy: 70, r: 13 }],
  muscle: [{ cx: 31, cy: 46, r: 8 }, { cx: 69, cy: 46, r: 8 }, { cx: 42, cy: 118, r: 8 }, { cx: 58, cy: 118, r: 8 }],
  joints: [{ cx: 27, cy: 40, r: 6 }, { cx: 73, cy: 40, r: 6 }, { cx: 42, cy: 130, r: 6 }, { cx: 58, cy: 130, r: 6 }],
  skin: [],
  cells: [{ cx: 50, cy: 40, r: 7 }, { cx: 38, cy: 78, r: 6 }, { cx: 62, cy: 92, r: 6 }, { cx: 45, cy: 140, r: 5 }],
};

export function BodyMap({ region, size = 88, className }: { region: Region; size?: number; className?: string }) {
  const spots = SPOT[region];
  const whole = region === "skin";
  return (
    <svg
      viewBox="0 0 100 180"
      width={size}
      height={size * 1.8}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <radialGradient id={`nx-bm-${region}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--nx-cobalt)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--nx-cobalt)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* the figure: head, torso, arms, legs */}
      <g fill={whole ? "var(--nx-cobalt-soft)" : "var(--nx-ceramic)"} stroke={whole ? "var(--nx-cobalt)" : "var(--nx-border)"} strokeWidth={whole ? 2 : 1.5}>
        <circle cx="50" cy="16" r="11" />
        <path d="M36 30 h28 a6 6 0 0 1 6 6 v50 a6 6 0 0 1 -6 6 h-28 a6 6 0 0 1 -6 -6 v-50 a6 6 0 0 1 6 -6 z" />
        <path d="M30 32 l-10 40 a4 4 0 0 0 4 5 l4 -1 l9 -34 z" />
        <path d="M70 32 l10 40 a4 4 0 0 1 -4 5 l-4 -1 l-9 -34 z" />
        <path d="M34 92 h13 v78 a4 4 0 0 1 -4 4 h-6 a4 4 0 0 1 -4 -4 z" />
        <path d="M53 92 h13 v78 a4 4 0 0 1 -4 4 h-6 a4 4 0 0 1 -4 -4 z" />
      </g>
      {spots.map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r={s.r * 2.2} fill={`url(#nx-bm-${region})`} />
          <circle cx={s.cx} cy={s.cy} r={s.r * 0.55} fill="var(--nx-cobalt)" />
        </g>
      ))}
    </svg>
  );
}
