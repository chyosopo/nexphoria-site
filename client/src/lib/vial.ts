/* ═══ INSIDE THE VIAL — derived, never claimed ═══
   Turns the catalog's `dose` and `spec` strings into the figures a reader can
   picture: milligrams in the vial, millilitres per dose, syringe units, doses
   per vial, vials a month. Every figure is arithmetic on numbers the page
   already states; anything that cannot be derived cleanly is left out rather
   than guessed. The physician's prescription is the authority — the ritual
   copy says so. (Happy Head study, 2026-09-05: "explain it in detail and
   visualize it".) */
import type { SoloPeptide } from "@/data/soloCatalog";

export type Route = "subcutaneous" | "nasal" | "oral" | "injection" | "unknown";
export type Form = "vial" | "nasal-spray" | "capsule" | "ampoule" | "weekly-pen" | "protocol" | "unknown";

export interface VialFacts {
  route: Route;
  form: Form;
  /** mg per mL, from the spec */
  concMgPerMl?: number;
  /** mL in the vial */
  volumeMl?: number;
  /** total mg in the vial */
  totalMg?: number;
  /** the single dose, in mg (mcg converted) */
  doseMg?: number;
  /** true when the catalog states a range (stepped GLP-1 titration) */
  doseIsRange: boolean;
  /** mL to draw for one dose */
  drawMl?: number;
  /** units on a standard 100-unit (U-100) insulin syringe */
  units?: number;
  dosesPerVial?: number;
  takesPerWeek?: number;
  /** "in the evening" · "once a day" · "twice a week" … */
  when?: string;
  vialsPerMonth?: number;
  /** a course, e.g. "for 20 days" */
  course?: string;
  asNeeded: boolean;
}

const num = (s: string | undefined) => (s ? parseFloat(s) : undefined);
const round = (v: number, d = 2) => Math.round(v * 10 ** d) / 10 ** d;

export function inferRoute(sku: SoloPeptide): Route {
  if (sku.route === "nasal") return "nasal";
  if (sku.route === "subcutaneous") return "subcutaneous";
  const t = `${sku.dose} ${sku.spec}`.toLowerCase();
  if (t.includes("nasal")) return "nasal";
  if (t.includes("capsule")) return "oral";
  if (t.includes("into muscle")) return "injection";
  if (t.includes("under the skin") || /\bsc\b/.test(t) || t.includes("injection")) return "subcutaneous";
  return "unknown";
}

export function inferForm(sku: SoloPeptide): Form {
  const s = sku.spec.toLowerCase();
  if (s.includes("nasal")) return "nasal-spray";
  if (s.includes("capsule")) return "capsule";
  if (s.includes("ampoule")) return "ampoule";
  if (s.includes("weekly injection")) return "weekly-pen";
  if (s.includes("protocol")) return "protocol";
  if (s.includes("vial")) return "vial";
  return "unknown";
}

function frequency(dose: string): { takesPerWeek?: number; when?: string; asNeeded: boolean; course?: string } {
  const d = dose.toLowerCase();
  const course = /for (\d+) days/.exec(d)?.[0];
  if (/as[- ]needed/.test(d)) return { asNeeded: true, when: "as needed", course };
  if (d.includes("twice a day")) return { takesPerWeek: 14, when: "twice a day", asNeeded: false, course };
  if (d.includes("three times a week")) return { takesPerWeek: 3, when: "three times a week", asNeeded: false, course };
  if (d.includes("twice a week")) return { takesPerWeek: 2, when: "twice a week", asNeeded: false, course };
  if (d.includes("nightly")) return { takesPerWeek: 7, when: "in the evening", asNeeded: false, course };
  if (d.includes("once a day") || d.includes("daily")) return { takesPerWeek: 7, when: "once a day", asNeeded: false, course };
  if (d.includes("weekly")) return { takesPerWeek: 1, when: "once a week", asNeeded: false, course };
  return { asNeeded: false, course };
}

export function vialFacts(sku: SoloPeptide): VialFacts {
  const route = inferRoute(sku);
  const form = inferForm(sku);
  const spec = sku.spec;
  const concMgPerMl = num(/(\d+(?:\.\d+)?)\s*mg\s*\/\s*mL/i.exec(spec)?.[1]);
  const volumeMl = num(/(\d+(?:\.\d+)?)\s*mL\s*(?:vial|nasal spray|ampoule)/i.exec(spec)?.[1]);
  const totalMg = concMgPerMl && volumeMl ? round(concMgPerMl * volumeMl, 1) : undefined;

  const doseIsRange = /\d\s*to\s*\d/.test(sku.dose);
  const dm = /(\d+(?:\.\d+)?)\s*(mg|mcg)/i.exec(sku.dose);
  const doseMg = !doseIsRange && dm ? (dm[2].toLowerCase() === "mcg" ? parseFloat(dm[1]) / 1000 : parseFloat(dm[1])) : undefined;

  const f = frequency(sku.dose);
  const out: VialFacts = { route, form, concMgPerMl, volumeMl, totalMg, doseMg, doseIsRange, asNeeded: f.asNeeded, when: f.when, takesPerWeek: f.takesPerWeek, course: f.course };

  if (form === "vial" && concMgPerMl && totalMg && doseMg && doseMg > 0) {
    const drawMl = round(doseMg / concMgPerMl, 3);
    out.drawMl = drawMl;
    out.units = Math.round(drawMl * 100);
    out.dosesPerVial = Math.floor(totalMg / doseMg);
    if (f.takesPerWeek && out.dosesPerVial > 0) {
      const daysPerVial = out.dosesPerVial / (f.takesPerWeek / 7);
      const courseDays = f.course ? parseInt(/(\d+)/.exec(f.course)![1], 10) : undefined;
      // a course ("for 20 days") is counted for the course, not for a month
      out.vialsPerMonth = Math.max(1, Math.ceil((courseDays ?? 30) / daysPerVial));
    }
  }
  return out;
}

/** "0.4 mL" — trimmed, never "0.400" */
export const ml = (v: number) => `${parseFloat(v.toFixed(3))} mL`;
/** dose as the reader says it: 300 mcg stays 300 mcg */
export function doseLabel(sku: SoloPeptide): string {
  const m = /(\d+(?:\.\d+)?\s*(?:mg|mcg))/i.exec(sku.dose);
  return m ? m[1] : sku.dose;
}
