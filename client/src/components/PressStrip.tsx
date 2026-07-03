import { Reveal } from "@/components/Reveal";

/**
 * PressStrip — reference pattern: monochrome press wordmarks.
 * "As seen in:" + publication names in mono low-opacity treatment.
 * No logos — pure typographic marks.
 */

const outlets = [
  { name: "The Wall Street Journal", abbr: "WSJ" },
  { name: "Bloomberg", abbr: "Bloomberg" },
  { name: "GQ", abbr: "GQ" },
  { name: "Vogue", abbr: "Vogue" },
  { name: "Fortune", abbr: "Fortune" },
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
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--nx-fg-muted)",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              As covered in
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {outlets.map(({ name, abbr }) => (
                <span
                  key={abbr}
                  title={name}
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    color: "var(--nx-fg)",
                  }}
                  className="nx-press-abbr"
                >
                  {abbr}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: "var(--nx-fg-muted)",
            marginTop: "1.25rem",
          }}
        >
          Editorial references illustrative — verified placements ongoing.
        </p>
      </div>
    </section>
  );
}
