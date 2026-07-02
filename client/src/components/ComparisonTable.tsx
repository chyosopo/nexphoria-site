import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Check, Minus } from "lucide-react";
import { analytics } from "@/lib/analytics";

/**
 * ComparisonTable — Nexphoria vs. the category.
 *
 * Competitor positioning is factual-as-of-build and intentionally conservative.
 * Columns: Nexphoria (acid-green highlight) · reference · Function Health · Levels · DIY.
 * Fires analytics.comparisonViewed once when scrolled into view.
 *
 * Cell value type: `true` (yes / included), `false` (no / not offered), or string (qualified).
 */

type Cell = true | false | string;

interface Column {
  key: string;
  name: string;
  sub: string;
  highlight?: boolean;
}

interface Row {
  label: string;
  cells: Cell[]; // order matches COLUMNS
}

const COLUMNS: Column[] = [
  { key: "nx", name: "Nexphoria", sub: "Peptide therapy, prescribed", highlight: true },
  { key: "maximus", name: "Maximus", sub: "Hormone telehealth" },
  { key: "function", name: "Function Health", sub: "Lab membership" },
  { key: "levels", name: "Levels", sub: "Glucose / metabolic" },
  { key: "diy", name: "DIY", sub: "\u201CResearch\u201D sellers" },
];

// Cell order: [Nexphoria, Maximus, Function, Levels, DIY]
const ROWS: Row[] = [
  { label: "Price / mo", cells: ["From $149/mo", "From $199/mo", "$499/yr", "$199/yr", "$40\u2013120"] },
  { label: "Physician oversight", cells: [true, true, false, false, false] },
  { label: "Lab testing included", cells: [true, "Add-on", true, "CGM only", false] },
  { label: "Peptides offered", cells: [true, "Limited", false, false, "Unverified"] },
  { label: "TRT", cells: ["Adjacent", true, false, false, false] },
  { label: "Cycle support", cells: [true, false, false, false, false] },
  { label: "Compounding pharmacy", cells: ["503A / 503B", true, false, false, false] },
  { label: "Refund policy", cells: ["Unused portion", "Limited", "Membership", "Membership", false] },
  { label: "Membership required", cells: [false, true, true, true, false] },
];

function CellValue({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center">
        <Check
          className={highlight ? "h-5 w-5 text-primary" : "h-5 w-5 text-primary"}
          strokeWidth={2.6}
        />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center">
        <Minus className="h-5 w-5 text-foreground/25" strokeWidth={2.2} />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return (
    <span
      className={
        highlight
          ? "text-fluid-sm font-medium text-primary"
          : "text-fluid-sm text-foreground/70"
      }
    >
      {value}
    </span>
  );
}

export function ComparisonTable({
  eyebrow = "The honest comparison",
  heading,
  intro,
  source = "home",
}: {
  eyebrow?: string;
  heading?: React.ReactNode;
  intro?: string;
  source?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || fired) return;
    if (typeof IntersectionObserver === "undefined") {
      analytics.comparisonViewed({ source });
      setFired(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            analytics.comparisonViewed({ source });
            setFired(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [fired, source]);

  return (
    <section ref={ref} className="nx-section bg-background text-foreground">
      <div className="nx-container">
        <Reveal>
          <div className="max-w-3xl mb-12 md:mb-16">
            <div className="nx-eyebrow text-foreground/55 mb-5">{eyebrow}</div>
            <h2 className="font-display text-fluid-4xl leading-[0.95] tracking-tight text-balance">
              {heading ?? (
                <>
                  How Nexphoria stacks up against{" "}
                  <span className="font-medium text-primary">the category.</span>
                </>
              )}
            </h2>
            {intro && (
              <p className="text-fluid-lg text-foreground/65 mt-6 leading-relaxed">{intro}</p>
            )}
          </div>
        </Reveal>

        {/* Desktop / tablet: full comparison table (md and up) */}
        <Reveal>
          <div className="hidden md:block w-full overflow-x-auto">
            <table
              className="w-full min-w-[760px] border-separate border-spacing-0"
              data-testid="table-comparison"
            >
              <thead>
                <tr>
                  <th className="text-left p-4 align-bottom w-[24%]">
                    <span className="nx-eyebrow text-foreground/40 font-normal">Feature</span>
                  </th>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={`text-left p-4 align-bottom ${
                        col.highlight ? "bg-primary/[0.07] rounded-t-2xl border-t border-x border-primary/30" : ""
                      }`}
                    >
                      <div
                        className={`nx-eyebrow mb-1 ${
                          col.highlight ? "text-primary" : "text-foreground/45"
                        }`}
                      >
                        {col.name}
                      </div>
                      <div
                        className={`font-display text-fluid-sm ${
                          col.highlight ? "text-foreground" : "text-foreground/65"
                        }`}
                      >
                        {col.sub}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => {
                  const last = ri === ROWS.length - 1;
                  return (
                    <tr key={row.label}>
                      <td className="p-4 font-display text-fluid-sm border-t border-foreground/10 text-foreground/85">
                        {row.label}
                      </td>
                      {row.cells.map((cell, ci) => {
                        const col = COLUMNS[ci];
                        return (
                          <td
                            key={col.key}
                            className={`p-4 border-t border-foreground/10 ${
                              col.highlight
                                ? `bg-primary/[0.07] border-x border-primary/30 ${
                                    last ? "rounded-b-2xl border-b" : ""
                                  }`
                                : ""
                            }`}
                          >
                            <CellValue value={cell} highlight={col.highlight} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile: stacked per-provider cards (no horizontal scroll) */}
        <Reveal>
          <div className="md:hidden space-y-4" data-testid="comparison-mobile">
            {COLUMNS.map((col, ci) => (
              <div
                key={col.key}
                className={`rounded-2xl border p-5 ${
                  col.highlight
                    ? "border-primary/40 bg-primary/[0.07]"
                    : "border-foreground/12 bg-background/[0.03]"
                }`}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <div
                    className={`nx-eyebrow ${
                      col.highlight ? "text-primary" : "text-foreground/45"
                    }`}
                  >
                    {col.name}
                  </div>
                  <div className="font-display text-fluid-xs text-foreground/55 text-right">
                    {col.sub}
                  </div>
                </div>
                <dl className="space-y-0">
                  {ROWS.map((row, ri) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between gap-4 py-2.5 ${
                        ri === 0 ? "" : "border-t border-foreground/10"
                      }`}
                    >
                      <dt className="text-fluid-sm text-foreground/65">{row.label}</dt>
                      <dd className="shrink-0 text-right">
                        <CellValue value={row.cells[ci]} highlight={col.highlight} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-6 text-xs text-foreground/40 max-w-2xl">
            Comparison reflects publicly available positioning at time of writing and is provided
            for general orientation. Competitor offerings change; verify current details with each
            provider.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
