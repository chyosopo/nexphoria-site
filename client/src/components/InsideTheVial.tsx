/* The medicine as dispensed: what it is compounded at, how it is dispensed,
   and the figures that follow from the dose (lib/vial). House voice: the
   company and the physician act; the reader is not addressed. */
import { F, S } from "@/lib/typography";
import { BigFigureRow } from "@/components/DataPlate";
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

export function InsideTheVial({ sku, testId, compact = false }: { sku: SoloPeptide; testId?: string; compact?: boolean }) {
  const v = vialFacts(sku);
  const dose = doseLabel(sku);
  const figures: { value: string; unit?: string; caption?: string }[] = [];
  if (v.drawMl) figures.push({ value: String(parseFloat(v.drawMl.toFixed(3))), unit: "mL", caption: `a ${dose} dose` });
  if (v.units) figures.push({ value: String(v.units), unit: "units", caption: "on a standard insulin syringe" });
  if (v.dosesPerVial) figures.push({ value: String(v.dosesPerVial), unit: "doses", caption: "in one vial" });
  if (v.vialsPerMonth) figures.push({ value: String(v.vialsPerMonth), unit: v.vialsPerMonth === 1 ? "vial" : "vials", caption: v.course ? `for the course, ${v.course.replace("for ", "")}` : "for a month" });

  return (
    <div className="nx-card" data-testid={testId ?? `vial-${sku.slug}`} style={compact ? { padding: "1rem 1.1rem" } : undefined}>
      {compact && <p className="nx-eyebrow">{sku.name}</p>}
      <p style={{ fontFamily: S, fontWeight: 500, fontSize: compact ? "var(--nx-t-base)" : "var(--nx-t-lg)", lineHeight: 1.3, color: "var(--nx-fg)", marginTop: compact ? "0.5rem" : 0, maxWidth: "44ch" }}>{vialLede(sku)}</p>
      {figures.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <BigFigureRow figures={figures} testId={`vial-figures-${sku.slug}`} />
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.7rem", maxWidth: "58ch" }}>
            The figures follow from the stated dose and vial. The prescription states the exact volume.
          </p>
        </div>
      )}
    </div>
  );
}
