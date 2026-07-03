import { Reveal } from "@/components/Reveal";
import { F } from "@/lib/typography";

/**
 * PressStrip — a credibility rail in the press-strip visual grammar.
 *
 * Honest pre-launch framing: Nexphoria has not (yet) earned named editorial
 * coverage, so this strip does NOT assert placements in outlets the brand
 * hasn't appeared in. Instead it surfaces the four verifiable pillars every
 * protocol actually rests on. Swap to real press wordmarks only once
 * placements are confirmed. (See CLAUDE.md — institutional bank voice, no
 * fabricated credibility.)
 */

const marks = [
  { label: "U.S.-licensed physicians", key: "md" },
  { label: "CLIA-certified labs", key: "labs" },
  { label: "503A compounding", key: "pharmacy" },
  { label: "HSA / FSA eligible", key: "hsa" },
];

export function PressStrip() {
  return (
    <section
      style={{
        backgroundColor: "var(--nx-bg-cream)",
        borderTop: "1px solid var(--nx-border)",
        borderBottom: "1px solid var(--nx-border)",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
      }}
      data-testid="press-strip"
    >
      <div className="nx-container">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-14">
            <div
              style={{
                fontFamily: F,
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--nx-fg-muted)",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              Every protocol is built on
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {marks.map(({ label, key }) => (
                <span
                  key={key}
                  style={{
                    fontFamily: F,
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    color: "var(--nx-fg)",
                  }}
                  className="nx-press-abbr"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
