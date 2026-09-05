/* What is actually in the vial, and what one dose is — derived from the
   catalog's dose and spec (lib/vial). The Happy Head lesson: a reader who
   can picture the thing feels they can benefit from it. */
import { F, S } from "@/lib/typography";
import { BigFigureRow } from "@/components/DataPlate";
import { vialFacts, doseLabel } from "@/lib/vial";
import type { SoloPeptide } from "@/data/soloCatalog";

export function InsideTheVial({ sku, testId, compact = false }: { sku: SoloPeptide; testId?: string; compact?: boolean }) {
  const v = vialFacts(sku);
  const dose = doseLabel(sku);

  let lede: string;
  if (v.form === "vial" && v.concMgPerMl && v.volumeMl) {
    lede = `${sku.name}, ${v.concMgPerMl} mg per millilitre, in sterile solution. A ${v.volumeMl} mL vial${v.totalMg ? `, ${v.totalMg} mg in all` : ""}.`;
  } else if (v.form === "weekly-pen") {
    lede = `${sku.name} for injection, once a week. Your physician starts you at the lowest step and raises the dose every few weeks as your body settles, from ${sku.dose.replace(/, stepped up$/, "")}.`;
  } else if (v.form === "nasal-spray") {
    lede = v.concMgPerMl && v.volumeMl
      ? `${sku.name}, ${v.concMgPerMl} mg per millilitre, as a ${v.volumeMl} mL nasal spray. ${dose} per dose, ${v.when ?? "as prescribed"}.`
      : `${sku.name} as a nasal spray, ${sku.dose.toLowerCase()}.`;
  } else if (v.form === "capsule") {
    lede = `${sku.name} in capsules: ${sku.spec}. ${sku.dose}.`;
  } else if (v.form === "ampoule") {
    lede = `${sku.name}: ${sku.spec}. ${sku.dose}.`;
  } else if (v.form === "protocol") {
    lede = `Two medicines, each in its own vial. ${sku.dose}.`;
  } else {
    lede = `${sku.name}. ${sku.dose}.`;
  }

  const figures: { value: string; unit?: string; caption?: string }[] = [];
  if (v.drawMl) figures.push({ value: String(parseFloat(v.drawMl.toFixed(3))), unit: "mL", caption: `one dose of ${dose}` });
  if (v.units) figures.push({ value: String(v.units), unit: "units", caption: "on a standard 100-unit insulin syringe" });
  if (v.dosesPerVial) figures.push({ value: String(v.dosesPerVial), unit: "doses", caption: "in one vial" });
  if (v.vialsPerMonth) figures.push({ value: String(v.vialsPerMonth), unit: v.vialsPerMonth === 1 ? "vial" : "vials", caption: v.course ? `for the course, ${v.course.replace("for ", "")}` : "for a month" });

  return (
    <div className="nx-card" data-testid={testId ?? `vial-${sku.slug}`} style={compact ? { padding: "1rem 1.1rem" } : undefined}>
      <p className="nx-eyebrow">{compact ? sku.name : "Inside the vial"}</p>
      <p style={{ fontFamily: S, fontWeight: 500, fontSize: compact ? "var(--nx-t-base)" : "var(--nx-t-lg)", lineHeight: 1.3, color: "var(--nx-fg)", marginTop: "0.5rem", maxWidth: "40ch" }}>{lede}</p>
      {figures.length > 0 && (
        <div style={{ marginTop: "1.1rem" }}>
          <BigFigureRow figures={figures} testId={`vial-figures-${sku.slug}`} />
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.7rem", maxWidth: "58ch" }}>
            Worked out from the stated dose and the vial. Your prescription states your exact volume; if your physician changes the dose, the volume changes with it.
          </p>
        </div>
      )}
      {v.form === "vial" && !v.drawMl && (
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: "0.7rem", maxWidth: "58ch", lineHeight: 1.55 }}>
          The dose, and so the volume you draw, is set by your physician against your blood work and stated on your prescription.
        </p>
      )}
    </div>
  );
}
