/* ComparisonMatrix — the "not all X is created equal" diagram.
   A visually-informative matrix: dimensions down the left, options across
   the top, our column highlighted. Every cell states what a thing IS or
   DOES, so the reader learns the category and the verdict in one glance.
   Reusable sitewide (bloodwork tiers, peptides vs. gray-market, plan vs.
   plan). Token-only, world-aware (highlight follows --nx-cobalt/--nx-ice),
   semantic <table> for accessibility, contained horizontal scroll on
   narrow screens so the body never scrolls sideways. */
import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/EnterprisePatterns";
import { F } from "@/lib/typography";

/* A cell is plain prose, or prose tagged with a verdict tone. "neg" is
   muted graphite + a minus — never crimson (crimson is blood-only). */
export type MatrixCell = string | { text: string; tone?: "pos" | "neg" | "plain" };
export type MatrixColumn = { label: string; sub?: string; highlight?: boolean; badge?: string };
export type MatrixRow = { label: string; cells: MatrixCell[] };

const NUM: React.CSSProperties = { fontVariantNumeric: "tabular-nums lining-nums" };

function cellText(c: MatrixCell): string {
  return typeof c === "string" ? c : c.text;
}
function cellTone(c: MatrixCell): "pos" | "neg" | "plain" {
  return typeof c === "string" ? "plain" : c.tone ?? "plain";
}

export function ComparisonMatrix({
  eyebrow,
  title,
  lead,
  columns,
  rows,
  footnote,
  background = "var(--nx-bg)",
  testid = "comparison-matrix",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  columns: MatrixColumn[];
  rows: MatrixRow[];
  footnote?: React.ReactNode;
  background?: string;
  testid?: string;
}) {
  return (
    <section
      data-testid={testid}
      className="nx-section"
      style={{ backgroundColor: background }}
    >
      <div className="nx-container">
        <Reveal>
          <div style={{ marginBottom: "clamp(2rem,4vw,3rem)", maxWidth: "60ch" }}>
            <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
          </div>
        </Reveal>

        <Reveal>
          {/* Contained scroll: wide matrix scrolls inside its own box */}
          <div
            style={{
              overflowX: "auto",
              border: "1px solid var(--nx-border)",
              borderRadius: "var(--nx-r-md)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                minWidth: 640,
                fontFamily: F,
              }}
            >
              <thead>
                <tr>
                  {/* corner cell */}
                  <th
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.1rem",
                      verticalAlign: "bottom",
                      position: "sticky",
                      left: 0,
                      zIndex: 2,
                      background,
                      borderBottom: "1px solid var(--nx-border)",
                      minWidth: 148,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--nx-t-xs)",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--nx-fg-muted)",
                      }}
                    >
                      Compare
                    </span>
                  </th>
                  {columns.map((col, ci) => (
                    <th
                      key={ci}
                      scope="col"
                      data-testid={`${testid}-col-${ci}`}
                      style={{
                        textAlign: "left",
                        padding: "1rem 1.1rem",
                        verticalAlign: "bottom",
                        minWidth: 156,
                        background: col.highlight ? "var(--nx-ice)" : "transparent",
                        borderBottom: col.highlight
                          ? "2px solid var(--nx-cobalt)"
                          : "1px solid var(--nx-border)",
                      }}
                    >
                      {col.highlight && col.badge && (
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: "var(--nx-t-xs)",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--nx-cobalt)",
                            marginBottom: "0.4rem",
                          }}
                        >
                          {col.badge}
                        </span>
                      )}
                      <span
                        style={{
                          display: "block",
                          fontSize: "var(--nx-t-body)",
                          fontWeight: 600,
                          lineHeight: 1.2,
                          color: col.highlight ? "var(--nx-fg)" : "var(--nx-fg-graphite)",
                        }}
                      >
                        {col.label}
                      </span>
                      {col.sub && (
                        <span
                          style={{
                            display: "block",
                            fontSize: "var(--nx-t-xs)",
                            color: "var(--nx-fg-muted)",
                            marginTop: "0.3rem",
                            lineHeight: 1.35,
                          }}
                        >
                          {col.sub}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} data-testid={`${testid}-row-${ri}`}>
                    <th
                      scope="row"
                      style={{
                        textAlign: "left",
                        padding: "0.95rem 1.1rem",
                        verticalAlign: "top",
                        position: "sticky",
                        left: 0,
                        zIndex: 1,
                        background,
                        borderTop: "1px solid var(--nx-border)",
                        fontSize: "var(--nx-t-sm)",
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                        lineHeight: 1.35,
                      }}
                    >
                      {row.label}
                    </th>
                    {row.cells.map((cell, ci) => {
                      const tone = cellTone(cell);
                      const highlight = columns[ci]?.highlight;
                      return (
                        <td
                          key={ci}
                          style={{
                            padding: "0.95rem 1.1rem",
                            verticalAlign: "top",
                            borderTop: "1px solid var(--nx-border)",
                            background: highlight ? "var(--nx-ice)" : "transparent",
                            fontSize: "var(--nx-t-sm)",
                            lineHeight: 1.45,
                            color:
                              tone === "neg"
                                ? "var(--nx-fg-muted)"
                                : highlight
                                ? "var(--nx-fg)"
                                : "var(--nx-fg-graphite)",
                            ...NUM,
                          }}
                        >
                          <span style={{ display: "flex", gap: "0.4rem", alignItems: "flex-start" }}>
                            {tone === "pos" && (
                              <Check
                                size={14}
                                strokeWidth={2.4}
                                aria-hidden
                                style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: 3 }}
                              />
                            )}
                            {tone === "neg" && (
                              <Minus
                                size={14}
                                strokeWidth={2.4}
                                aria-hidden
                                style={{ color: "var(--nx-fg-muted)", flexShrink: 0, marginTop: 3 }}
                              />
                            )}
                            <span>{cellText(cell)}</span>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {footnote && (
          <Reveal>
            <p
              style={{
                fontFamily: F,
                fontSize: "var(--nx-t-xs)",
                lineHeight: 1.55,
                color: "var(--nx-fg-muted)",
                marginTop: "1rem",
                maxWidth: "70ch",
              }}
            >
              {footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
