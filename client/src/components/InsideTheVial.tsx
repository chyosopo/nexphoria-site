/* The medicine as dispensed: what it is compounded at, how it is dispensed,
   and the figures that follow from the dose (lib/vial), as one row of figure
   tiles. House voice: the company and the physician act; the reader is not
   addressed. This file also imports the product page's tile sheet, which
   every block on both product pages shares. */
import "@/styles/pdp.css";
import { F } from "@/lib/typography";
import { CountUp } from "@/components/Motion";
import { vialFacts, doseLabel } from "@/lib/vial";
import type { SoloPeptide } from "@/data/soloCatalog";

export function vialLede(sku: SoloPeptide): string {
  const v = vialFacts(sku);
  const dose = doseLabel(sku);
  if (v.form === "vial" && v.concMgPerMl && v.volumeMl) {
    return `${sku.name} is compounded to order at ${v.concMgPerMl} mg per millilitre and dispensed in ${v.volumeMl} mL vials${v.totalMg ? `, ${v.totalMg} mg in each` : ""}.`;
  }
  if (v.form === "weekly-pen") return `${sku.name} is dispensed for weekly injection. The physician begins at the lowest step and raises the dose every few weeks as the body settles, within ${sku.dose.replace(/, stepped up$/, "")}.`;
  if (v.form === "nasal-spray") return v.concMgPerMl && v.volumeMl ? `${sku.name} is dispensed as a ${v.volumeMl} mL nasal spray at ${v.concMgPerMl} mg per millilitre, ${dose} per dose, ${v.when ?? "as prescribed"}.` : `${sku.name} is dispensed as a nasal spray, ${sku.dose.toLowerCase()}.`;
  if (v.form === "capsule") return `${sku.name} is dispensed in capsules, ${sku.spec.toLowerCase()}. ${sku.dose}.`;
  if (v.form === "ampoule") return `${sku.name}: ${sku.spec}. ${sku.dose}.`;
  if (v.form === "protocol") return `Each medicine is dispensed in its own vial, at its own dose.`;
  return `${sku.name}. ${sku.dose}.`;
}

type Figure = { value: string; unit?: string; caption?: string };

/* One figure: the number counts up on entry when it is purely numeric; the unit
   sits beside it in sentence case ("mL", "units"), the caption beneath. */
function FigureBlock({ value, unit, caption }: Figure) {
  const numeric = /^\d+(\.\d+)?$/.test(value.trim());
  return (
    <div className="nx-pt-fig">
      <div className="nx-pt-fig__row">
        <span className="nx-pt-fig__v" style={{ fontFamily: F }}>
          {numeric ? <CountUp to={parseFloat(value)} decimals={Math.min(3, (value.trim().split(".")[1] ?? "").length)} /> : value}
        </span>
        {unit && <span className="nx-pt-fig__u" style={{ fontFamily: F }}>{unit}</span>}
      </div>
      {caption && <p className="nx-pt-fig__c" style={{ fontFamily: F }}>{caption}</p>}
    </div>
  );
}

function figuresFor(sku: SoloPeptide): Figure[] {
  const v = vialFacts(sku);
  const dose = doseLabel(sku);
  const figures: Figure[] = [];
  if (v.drawMl) figures.push({ value: String(parseFloat(v.drawMl.toFixed(3))), unit: "mL", caption: `a ${dose} dose` });
  if (v.units) figures.push({ value: String(v.units), unit: "units", caption: "on a standard insulin syringe" });
  if (v.dosesPerVial) figures.push({ value: String(v.dosesPerVial), unit: "doses", caption: "in one vial" });
  if (v.vialsPerMonth) figures.push({ value: String(v.vialsPerMonth), unit: v.vialsPerMonth === 1 ? "vial" : "vials", caption: v.course ? `for the course, ${v.course.replace("for ", "")}` : "for a month" });
  return figures;
}

export function InsideTheVial({ sku, testId, compact = false }: { sku: SoloPeptide; testId?: string; compact?: boolean }) {
  const figures = figuresFor(sku);

  /* Compact (a medicine inside a protocol): one tile, the figures ruled inside it. */
  if (compact) {
    return (
      <div className="nx-pt" data-testid={testId ?? `vial-${sku.slug}`}>
        <p className="nx-pt__k" style={{ fontFamily: F }}>{sku.name}</p>
        <p className="nx-pt__t" style={{ fontFamily: F, fontSize: "var(--nx-t-base)" }}>{vialLede(sku)}</p>
        {figures.length > 0 && (
          <div className="nx-pt-figs--in" data-testid={`vial-figures-${sku.slug}`}>
            {figures.map((f) => <FigureBlock key={f.value + (f.unit ?? "")} {...f} />)}
          </div>
        )}
      </div>
    );
  }

  /* Full (the medicine's own page): the lede, then one row of figure tiles. */
  return (
    <div data-testid={testId ?? `vial-${sku.slug}`}>
      <p className="nx-lede nx-pt-lede">{vialLede(sku)}</p>
      {figures.length > 0 && (
        <>
          <ul className={`nx-pt-grid nx-pt-grid--${Math.min(4, Math.max(2, figures.length))}`} aria-label="The figures that follow from the dose" data-testid={`vial-figures-${sku.slug}`}>
            {figures.map((f) => (
              <li key={f.value + (f.unit ?? "")} className="nx-pt"><FigureBlock {...f} /></li>
            ))}
          </ul>
          <p className="nx-pt-note" style={{ fontFamily: F }}>
            The figures follow from the stated dose and vial. The prescription states the exact volume.
          </p>
        </>
      )}
    </div>
  );
}
