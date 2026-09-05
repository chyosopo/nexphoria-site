/* How you take it, as steps a reader can picture — templated by route and
   form from lib/vial. Educational, in the house register; the prescription
   and the physician's instructions are the authority, and every template
   says so. */
import { F, S } from "@/lib/typography";
import { vialFacts, ml, doseLabel } from "@/lib/vial";
import type { SoloPeptide } from "@/data/soloCatalog";

function steps(sku: SoloPeptide): { t: string; b: string }[] {
  const v = vialFacts(sku);
  const dose = doseLabel(sku);
  const when = v.when ?? "as prescribed";

  if (v.form === "vial" && (v.route === "subcutaneous" || v.route === "injection")) {
    return [
      { t: "Take the vial from the fridge.", b: "It ships cold and stays in the fridge between doses." },
      { t: v.drawMl ? `Draw ${ml(v.drawMl)}.` : `Draw your dose of ${dose}.`, b: v.units ? `That is ${v.units} units on a standard 100-unit insulin syringe, for a dose of ${dose}. Your prescription states your exact volume.` : "Your prescription states the exact volume." },
      { t: `Inject under the skin, ${when}.`, b: v.route === "injection" ? "Under the skin or into muscle, at the site your physician shows you." : "A small injection into the fat under the skin of the abdomen or thigh, at the site your physician shows you." },
      { t: "Back in the fridge.", b: v.course ? `The course runs ${v.course.replace("for ", "for ")}, then your physician reviews.` : "The vial goes back in the fridge until the next dose." },
    ];
  }
  if (v.form === "weekly-pen") {
    return [
      { t: "Once a week, the same day each week.", b: "A small injection under the skin of the abdomen or thigh. Most people choose a fixed day so it becomes routine." },
      { t: "Start low.", b: `Your physician starts you at the lowest step and raises the dose every few weeks as your body settles, up to the dose that fits you. The stated range is ${sku.dose.replace(/, stepped up$/, "")}.` },
      { t: "Keep it cold.", b: "It ships cold and lives in the fridge between doses." },
    ];
  }
  if (v.form === "nasal-spray") {
    return [
      { t: `A nasal spray, ${when}.`, b: v.doseMg ? `Each dose is ${dose}. Your physician's instructions state the number of sprays that make one dose.` : "Your physician's instructions state the number of sprays that make one dose." },
      { t: "Nothing to draw, nothing to inject.", b: "Store as the label says. Keep the tip clean." },
    ];
  }
  if (v.form === "capsule") {
    return [
      { t: `By mouth, ${when}.`, b: `${sku.dose}, with water. Your physician sets the exact amount.` },
    ];
  }
  if (v.form === "ampoule") {
    return [
      { t: "By injection, on your physician's schedule.", b: `${sku.dose}. Your physician's instructions cover the site and the course.` },
    ];
  }
  if (v.form === "protocol") {
    return [
      { t: "Two vials, two rhythms.", b: `${sku.dose}. Each medicine's own page shows its dose and volume; your prescription states both.` },
    ];
  }
  return [{ t: "On your physician's schedule.", b: `${sku.dose}. Your prescription states the exact dose and the site.` }];
}

export function Ritual({ sku, testId }: { sku: SoloPeptide; testId?: string }) {
  const list = steps(sku);
  return (
    <div className="nx-card" data-testid={testId ?? `ritual-${sku.slug}`}>
      <p className="nx-eyebrow">How you take it, step by step</p>
      <ol className="nx-road nx-road--ritual" style={{ marginTop: "0.9rem" }} aria-label="How you take it">
        {list.map((s, i) => (
          <li key={s.t} className="nx-road__step">
            <span className="nx-road__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p className="nx-road__t" style={{ fontFamily: S }}>{s.t}</p>
            <p className="nx-road__b" style={{ fontFamily: F }}>{s.b}</p>
          </li>
        ))}
      </ol>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.9rem", maxWidth: "58ch" }}>
        Your prescription and your physician's instructions are the authority. This page is educational.
      </p>
    </div>
  );
}
