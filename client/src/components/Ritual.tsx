/* How it is taken, in three plain steps by route (lib/vial). House voice;
   the prescription and the physician's instructions govern. */
import { F, S } from "@/lib/typography";
import { vialFacts, ml, doseLabel } from "@/lib/vial";
import type { SoloPeptide } from "@/data/soloCatalog";

function steps(sku: SoloPeptide): { t: string; b: string }[] {
  const v = vialFacts(sku);
  const dose = doseLabel(sku);
  const when = v.when ?? "as prescribed";
  if (v.form === "vial" && (v.route === "subcutaneous" || v.route === "injection")) {
    return [
      { t: "Refrigerate on arrival.", b: "It ships cold and stays refrigerated between doses." },
      { t: v.drawMl ? `Draw ${ml(v.drawMl)}.` : `Draw the ${dose} dose.`, b: v.units ? `${v.units} units on a standard 100-unit insulin syringe, for a ${dose} dose. The prescription states the exact volume.` : "The prescription states the exact volume." },
      { t: `Inject under the skin, ${when}.`, b: v.route === "injection" ? "Under the skin or into muscle, at the site the physician indicates." : "Into the fat of the abdomen or thigh, at the site the physician indicates." },
    ];
  }
  if (v.form === "weekly-pen") {
    return [
      { t: "Once a week, on a fixed day.", b: "Under the skin of the abdomen or thigh." },
      { t: "The dose is stepped up.", b: `From the lowest step, raised every few weeks by the physician as the body settles, within ${sku.dose.replace(/, stepped up$/, "")}.` },
      { t: "Refrigerate between doses.", b: "It ships cold." },
    ];
  }
  if (v.form === "nasal-spray") {
    return [
      { t: `A nasal spray, ${when}.`, b: v.doseMg ? `${dose} per dose. The prescription states the sprays that make one dose.` : "The prescription states the sprays that make one dose." },
      { t: "Store as labelled.", b: "Nothing to draw or inject." },
    ];
  }
  if (v.form === "capsule") return [{ t: `By mouth, ${when}.`, b: `${sku.dose}, with water.` }];
  if (v.form === "ampoule") return [{ t: "By injection, on the physician's schedule.", b: `${sku.dose}.` }];
  if (v.form === "protocol") return [{ t: "Two vials, two rhythms.", b: `${sku.dose}. Each medicine's page states its dose and volume.` }];
  return [{ t: "On the physician's schedule.", b: `${sku.dose}.` }];
}

export function Ritual({ sku, testId }: { sku: SoloPeptide; testId?: string }) {
  const list = steps(sku);
  return (
    <div data-testid={testId ?? `ritual-${sku.slug}`}>
      <ol className="nx-road nx-road--ritual" style={{ marginTop: "1rem" }} aria-label="How it is taken">
        {list.map((s, i) => (
          <li key={s.t} className="nx-road__step">
            <span className="nx-road__n" style={{ fontFamily: F }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p className="nx-road__t" style={{ fontFamily: S }}>{s.t}</p>
            <p className="nx-road__b" style={{ fontFamily: F }}>{s.b}</p>
          </li>
        ))}
      </ol>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.8rem", maxWidth: "58ch" }}>
        The prescription and the physician's instructions govern. It ships cold, in plain packaging, with the blood kit.
      </p>
    </div>
  );
}
