/* ═══ Blood testing as a product (Chiya, 2026-09-04) ═══
   The panel is a box: added to the cart, complimentary with any medication
   order, priced on its own, and extendable with add-on tests. One panel for
   everyone (data/monitoring FULL_PANEL, counts derived); add-ons go deeper
   where a medicine or a goal calls for it. Modelled on the white-label
   at-home kit partners under review (docs/LAB-PARTNER.md: SiPhox,
   MyLabsDirect); collection, turnaround and the laboratory name stay generic
   until a partner is signed. PRICES ARE PROPOSED (OPEN in docs/COPY-DECK.md). */
import { FULL_PANEL, FULL_PANEL_COUNT, RETEST_WEEK } from "@/data/monitoring";

export const LAB_KIT = {
  slug: "panel",
  name: "The Nexphoria Panel",
  short: "The Panel",
  /** on its own, without a medication order */
  price: 149,
  /** a further panel for someone already on a plan, outside the included schedule */
  retestPrice: 99,
  markers: FULL_PANEL_COUNT,
  systems: FULL_PANEL.length,
  groups: FULL_PANEL,
  line: "Every marker a peptide plan can move, drawn at home and read by the physician.",
  collection: "At home. The kit holds everything, with a prepaid return box. If a marker needs a full draw, we arrange one at a partner site near you.",
  turnaround: "Results arrive within days of the laboratory receiving the sample, with the physician's note.",
  fasting: "Draw in the morning before you eat, so sugar, insulin and cholesterol read true. The kit says so on the lid.",
} as const;

export interface LabAddon {
  slug: string;
  name: string;
  price: number;
  line: string;
  markers: string[];
  /** medicine or goal slugs this is worth adding with */
  recommendedFor: string[];
  /** in the reader's words */
  recommendedLine?: string;
}

/* Add-ons: depth beyond the panel, grouped the way a physician orders them.
   Every marker here is ABSENT from FULL_PANEL, so nothing is charged twice. */
export const LAB_ADDONS: LabAddon[] = [
  {
    slug: "hormone-deep", name: "Hormones, in depth", price: 49,
    line: "The signals above and around testosterone and estradiol: the pituitary, the adrenals, prolactin.",
    markers: ["LH", "FSH", "Prolactin", "DHEA-S", "Progesterone"],
    recommendedFor: ["testosterone", "kisspeptin", "hormone", "pt-141", "sexual-health"],
    recommendedLine: "Relevant with testosterone and kisspeptin, where the axis is the point.",
  },
  {
    slug: "prostate", name: "Prostate", price: 19,
    line: "PSA, the marker every physician wants before and during testosterone.",
    markers: ["PSA, total"],
    recommendedFor: ["testosterone", "hormone", "foundation"],
    recommendedLine: "Relevant with testosterone.",
  },
  {
    slug: "thyroid-full", name: "Thyroid, complete", price: 39,
    line: "Beyond TSH and free T4: the active hormone, the reverse form, and the antibodies.",
    markers: ["Free T3", "Reverse T3", "TPO antibodies"],
    recommendedFor: ["semax", "selank", "dsip", "cognition", "sleep", "longevity"],
    recommendedLine: "Relevant where energy, mood or sleep is the goal.",
  },
  {
    slug: "heart-advanced", name: "Heart, advanced", price: 59,
    line: "The particle-level picture of cardiovascular risk that a standard lipid panel misses.",
    markers: ["Lipoprotein(a)", "LDL particle number", "Homocysteine", "Remnant cholesterol"],
    recommendedFor: ["semaglutide", "tirzepatide", "metabolic", "nad-plus", "mots-c", "longevity"],
    recommendedLine: "Relevant with a GLP-1 plan, and for healthy ageing.",
  },
  {
    slug: "metabolic-deep", name: "Metabolism, in depth", price: 49,
    line: "How your insulin, fat tissue and appetite hormones are actually behaving.",
    markers: ["C-peptide", "HOMA-IR", "Adiponectin", "Leptin", "Uric acid"],
    recommendedFor: ["semaglutide", "tirzepatide", "aod-9604", "tesamorelin", "metabolic", "growth", "ignite"],
    recommendedLine: "Relevant with semaglutide, tirzepatide and tesamorelin.",
  },
  {
    slug: "inflammation-immune", name: "Inflammation and immune", price: 49,
    line: "The cytokines behind slow recovery, and the full iron picture.",
    markers: ["IL-6", "TNF-alpha", "Iron and TIBC", "Vitamin D"],
    recommendedFor: ["thymosin-a1", "bpc-157", "tb-500", "bpc-tb-combo", "recovery", "recover"],
    recommendedLine: "Relevant with thymosin alpha-1 and the recovery peptides.",
  },
  {
    slug: "nutrients", name: "Nutrients", price: 39,
    line: "The vitamins and minerals that limit energy, sleep and repair when they run low.",
    markers: ["Vitamin B12", "Folate", "Magnesium", "Zinc", "Omega-3 index"],
    recommendedFor: ["nad-plus", "dsip", "epitalon", "longevity", "sleep", "ascend"],
    recommendedLine: "Relevant for energy and sleep goals.",
  },
  {
    slug: "liver-kidney-extended", name: "Liver and kidneys, extended", price: 29,
    line: "Two further liver enzymes and a sharper measure of kidney filtration.",
    markers: ["GGT", "Alkaline phosphatase", "Cystatin C", "Bilirubin"],
    recommendedFor: ["testosterone", "tadalafil", "ghk-cu", "hormone"],
    recommendedLine: "Relevant where a medicine is cleared by the liver or the kidneys.",
  },
];

export function labAddon(slug: string): LabAddon | undefined {
  return LAB_ADDONS.find((a) => a.slug === slug);
}

/** Add-ons worth showing next to a medicine, a protocol or a goal. */
export function addonsFor(key: string): LabAddon[] {
  return LAB_ADDONS.filter((a) => a.recommendedFor.includes(key));
}

/** Cart identity: the panel itself, or "addon:<slug>". */
export function labSlugFor(a: LabAddon): string { return `addon:${a.slug}`; }
export function labItem(slug: string): { name: string; price: number; kind: "panel" | "addon"; markers: number } | undefined {
  if (slug === LAB_KIT.slug) return { name: LAB_KIT.name, price: LAB_KIT.price, kind: "panel", markers: LAB_KIT.markers };
  if (slug.startsWith("addon:")) { const a = labAddon(slug.slice(6)); if (a) return { name: `${a.name} (add-on)`, price: a.price, kind: "addon", markers: a.markers.length }; }
  return undefined;
}

/* When you test, on every term (the playbook's ladder, in the reader's words). */
export const LAB_SCHEDULE: { when: string; what: string; included: string }[] = [
  { when: "Before the first dose", what: "The baseline. The kit ships with the first order and is drawn at home before the first dose.", included: "Complimentary with every first order" },
  { when: `Week ${RETEST_WEEK}`, what: "The same panel again, beside the baseline, so the physician doses from what changed.", included: "Included on plans of three months and longer" },
  { when: "Month 6", what: "Your optimization panel, once the plan has had time to work.", included: "Included on six- and twelve-month terms" },
  { when: "Every quarter", what: "A panel each quarter, for the length of the plan.", included: "Included on the twelve-month term" },
  { when: "Any time", what: "A further panel, whenever wanted.", included: `$${LAB_KIT.retestPrice} for anyone on a plan` },
];
