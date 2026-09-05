/* When you feel it, drawn (the polish pass, 2026-09-04). A horizon bar with
   the baseline kit at the start, the retest at the end, and two bands:
   "feel it by" and "full effect", from data/horizon. On-the-day medicines
   draw a 24-hour bar instead. Nothing here is a result; it is a calendar.
   Compact mode is the bar alone, for option cards and shelf tiles. */
import { horizonFor, BAR_WEEKS, BAR_HOURS } from "@/data/horizon";
import { monitoringFor } from "@/data/monitoring";
import { F, S } from "@/lib/typography";

function pct(v: number, max: number) { return `${Math.min(100, Math.max(0, (v / max) * 100))}%`; }

export function ExpectTimeline({ slug, compact = false, testId }: { slug: string; compact?: boolean; testId?: string }) {
  const hz = horizonFor(slug);
  if (!hz) return null;
  const m = monitoringFor(slug);
  const watch = m?.watch.slice(0, 3).join(", ");

  if (hz.kind === "hours") {
    const max = BAR_HOURS;
    const beyond = hz.active[1] >= max;
    return (
      <div className={`nx-horizon${compact ? " nx-horizon--compact" : ""}`} data-testid={testId ?? `horizon-${slug}`}>
        {!compact && <p className="nx-horizon__h" style={{ fontFamily: F }}>On the day it is taken</p>}
        <div className="nx-horizon__bar" role="img" aria-label={`Works ${hz.onsetLabel.toLowerCase()}; ${hz.activeLabel.toLowerCase()}.`}>
          <span className="nx-horizon__band nx-horizon__band--feel" style={{ left: pct(hz.onset[0], max), width: `calc(${pct(hz.onset[1] - hz.onset[0], max)} + 10px)` }} />
          <span className={`nx-horizon__band nx-horizon__band--full${beyond ? " is-beyond" : ""}`} style={{ left: pct(hz.active[0], max), width: pct(hz.active[1] - hz.active[0], max) }} />
          <i className="nx-horizon__tick" style={{ left: "0%" }} /><i className="nx-horizon__tick" style={{ left: "100%" }} />
        </div>
        <div className="nx-horizon__axis" style={{ fontFamily: F }}><span>You take it</span><span>{beyond ? "A day, and more" : "24 hours"}</span></div>
        <ul className="nx-horizon__legend">
          <li><i className="nx-horizon__dot nx-horizon__dot--feel" /><span style={{ fontFamily: F }}><strong style={{ fontFamily: S }}>Works in</strong> {hz.onsetLabel}</span></li>
          <li><i className="nx-horizon__dot nx-horizon__dot--full" /><span style={{ fontFamily: F }}><strong style={{ fontFamily: S }}>Active</strong> {hz.activeLabel}</span></li>
        </ul>
      </div>
    );
  }

  const max = BAR_WEEKS;
  const fullBeyond = hz.full === "ongoing" || hz.full[1] > max;
  // A full effect that begins past the bar still shows as a stub at the end,
  // so the reader sees "it keeps building" rather than an empty bar.
  const fullStart = hz.full === "ongoing" ? hz.feel[1] : Math.min(hz.full[0], max * 0.8);
  const fullEnd = hz.full === "ongoing" ? max : Math.min(max, Math.max(hz.full[1], fullStart + 1));
  return (
    <div className={`nx-horizon${compact ? " nx-horizon--compact" : ""}`} data-testid={testId ?? `horizon-${slug}`}>
      {!compact && <p className="nx-horizon__h" style={{ fontFamily: F }}>Your first {max} weeks</p>}
      <div className="nx-horizon__bar" role="img" aria-label={`Typical onset ${hz.feelLabel.toLowerCase()}; full effect ${hz.fullLabel.toLowerCase()}. Blood kit at week 0, blood test at week ${max}.`}>
        <span className="nx-horizon__band nx-horizon__band--feel" style={{ left: pct(hz.feel[0], max), width: `calc(${pct(hz.feel[1] - hz.feel[0], max)} + 10px)` }} />
        <span className={`nx-horizon__band nx-horizon__band--full${fullBeyond ? " is-beyond" : ""}`} style={{ left: pct(fullStart, max), width: pct(fullEnd - fullStart, max) }} />
        <i className="nx-horizon__tick nx-horizon__tick--lab" style={{ left: "0%" }} /><i className="nx-horizon__tick nx-horizon__tick--lab" style={{ left: "100%" }} />
      </div>
      <div className="nx-horizon__axis" style={{ fontFamily: F }}>
        <span>Week 0: blood kit</span>
        <span>Week {max}: blood test{fullBeyond ? ", and on" : ""}</span>
      </div>
      {!compact && (
        <ul className="nx-horizon__legend">
          <li><i className="nx-horizon__dot nx-horizon__dot--feel" /><span style={{ fontFamily: F }}><strong style={{ fontFamily: S }}>Typical onset</strong> {hz.feelLabel}</span></li>
          <li><i className="nx-horizon__dot nx-horizon__dot--full" /><span style={{ fontFamily: F }}><strong style={{ fontFamily: S }}>Full effect</strong> {hz.fullLabel}</span></li>
          {watch && <li><i className="nx-horizon__dot nx-horizon__dot--lab" /><span style={{ fontFamily: F }}><strong style={{ fontFamily: S }}>Read at week {max}</strong> {watch}</span></li>}
        </ul>
      )}
    </div>
  );
}
