/* ═══ DATA-PLATE SYSTEM — SEED-STUDY S1 (design only) ═══
   Numbers as identity, taxonomy as design. Three primitives:

   - <BigFigure>     giant tabular numeral + small-caps unit + caption —
                     precision figures ARE the display type.
   - <BigFigureRow>  ruled row of BigFigures, paper-like hairline dividers.
   - <SpecPlate>     specimen-label block for a compound: serif name,
                     italic nomenclature line, then LABEL → value rows in
                     tabular numerals, hairline-ruled like a monograph.

   Tokens only; both worlds theme through --nx-cobalt. No new claims —
   these are presentation primitives for numbers the site already states. */
import { F, S } from "@/lib/typography";
import { CountUp } from "@/components/Motion";

type Tone = "light" | "dark";

const fgOf = (t: Tone) => (t === "dark" ? "var(--nx-bg)" : "var(--nx-fg)");
const mutedOf = (t: Tone) => (t === "dark" ? "rgba(243,245,247,0.62)" : "var(--nx-fg-muted)");
const ruleOf = (t: Tone) => (t === "dark" ? "rgba(255,255,255,0.14)" : "var(--nx-border)");

export function BigFigure({
  value,
  unit,
  caption,
  tone = "light",
}: {
  /** The figure itself — "99", "90", "503A", "≤3". Set huge, tabular. */
  value: string;
  /** Small-caps unit/qualifier beside the numeral — "markers", "days". */
  unit?: string;
  /** One quiet line under the figure. */
  caption?: string;
  tone?: Tone;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, whiteSpace: "nowrap" }}>
        <span
          style={{
            fontFamily: F,
            fontWeight: 600,
            fontSize: "var(--nx-t-h1)",
            lineHeight: 0.95,
            letterSpacing: "var(--nx-ls-display)",
            fontVariantNumeric: "tabular-nums",
            color: fgOf(tone),
          }}
        >
          {/* Purely numeric figures COUNT to their value on entry; anything
              with letters ("503A", "≤3") renders as-is. Splitting on that test
              rather than on a prop means no call site has to know, and a figure
              can never animate to a number it does not actually contain. */}
          {/^\d+(\.\d+)?$/.test(value.trim())
            ? <CountUp to={parseFloat(value)} decimals={Math.min(3, (value.trim().split(".")[1] ?? "").length)} />
            : value}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: F,
              fontSize: "var(--nx-t-xs)",
              fontWeight: 600,
              letterSpacing: "var(--nx-ls-caps)",
              textTransform: "uppercase",
              color: "var(--nx-cobalt)",
            }}
          >
            {unit}
          </span>
        )}
      </div>
      {caption && (
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.45, color: mutedOf(tone), marginTop: "0.55rem", maxWidth: "24ch" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

export function BigFigureRow({
  figures,
  tone = "light",
  testId,
}: {
  figures: { value: string; unit?: string; caption?: string }[];
  tone?: Tone;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 170px), 1fr))`,
        borderTop: `1px solid ${ruleOf(tone)}`,
        borderBottom: `1px solid ${ruleOf(tone)}`,
      }}
    >
      {figures.map((f, i) => (
        <div
          key={f.value + (f.unit ?? "")}
          style={{
            padding: "1.4rem 1.2rem 1.4rem 0",
            paddingLeft: i === 0 ? 0 : "1.2rem",
            borderLeft: i === 0 ? "none" : `1px solid ${ruleOf(tone)}`,
          }}
        >
          <BigFigure {...f} tone={tone} />
        </div>
      ))}
    </div>
  );
}

export function SpecPlate({
  name,
  nomenclature,
  rows,
  tone = "light",
  testId,
}: {
  /** Compound display name, set in the serif. */
  name: string;
  /** Italic taxonomy line — "pentadecapeptide · systemic repair signal". */
  nomenclature?: string;
  rows: { label: string; value: string }[];
  tone?: Tone;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      style={{
        background: tone === "dark" ? "rgba(255,255,255,0.05)" : "var(--nx-ceramic)",
        border: `1px solid ${ruleOf(tone)}`,
        borderRadius: "var(--nx-r-md)",
        padding: "1.1rem 1.25rem 0.4rem",
      }}
    >
      <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.15, color: fgOf(tone) }}>{name}</p>
      {nomenclature && (
        <p style={{ fontFamily: S, fontStyle: "italic", fontSize: "var(--nx-t-sm)", color: "var(--nx-cobalt)", marginTop: "0.15rem" }}>
          {nomenclature}
        </p>
      )}
      <dl style={{ margin: "0.75rem 0 0", padding: 0 }}>
        {rows.map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 16,
              padding: "0.55rem 0",
              borderTop: `1px solid ${ruleOf(tone)}`,
            }}
          >
            <dt
              style={{
                fontFamily: F,
                fontSize: "var(--nx-t-2xs)",
                fontWeight: 600,
                letterSpacing: "var(--nx-ls-caps)",
                textTransform: "uppercase",
                color: mutedOf(tone),
                flexShrink: 0,
              }}
            >
              {r.label}
            </dt>
            <dd
              style={{
                fontFamily: F,
                fontSize: "var(--nx-t-sm)",
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
                color: fgOf(tone),
                margin: 0,
                textAlign: "right",
              }}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
