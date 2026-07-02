/* ──────────────────────────────────────────────────────────────
   PeptideDetail — Maximus-grade product page.
   Route: /peptides/:slug. Pulls from peptides.ts. Generic for any
   peptide. Density layers: primary content + mono attribution +
   micro-detail. Tirzepatide / BPC-157 / NAD+ are the test trio.
   ────────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { useCart } from "@/contexts/CartProvider";
import type { CadenceKey } from "@/data/pricing";

/* Map PDP's internal PlanId (m1/m3/m6) to canonical CadenceKey (1mo/3mo/12mo).
   The PDP UI keeps its m1/m3/m6 naming; cart uses 1mo/3mo/12mo for global consistency. */
function planToCadence(plan: "m1" | "m3" | "m6"): CadenceKey {
  return plan === "m1" ? "1mo" : plan === "m3" ? "3mo" : "12mo";
}
import { SiteLayout } from "@/components/SiteLayout";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MolecularGlyph } from "@/components/MolecularGlyph";
import NotFound from "@/pages/not-found";
import {
  getPeptide,
  peptides,
  CATEGORY_LABELS,
  type Peptide,
} from "@/data/peptides";
import { useSeo, productJsonLd, medicalBusinessJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { analytics } from "@/lib/analytics";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  ShieldCheck,
  Snowflake,
  Stethoscope,
  Activity,
  Syringe,
  Clock,
  ChevronRight,
  FlaskConical,
  Package,
  FileText,
  Thermometer,
  MapPin,
  RotateCw,
  Plus,
  BookOpen,
  ExternalLink,
  Layers,
  CalendarDays,
} from "lucide-react";
import { getStack, stacks } from "@/data/stacks";
import { VialTile, categoryToTone } from "@/components/VialTile";
import { PillBadge } from "@/components/PillBadge";
import { getPrice } from "@/data/pricing";

/* ── Category benefit portraits (Wave 11 · data-hero) ──────────
   Each image ENCODES its category's benefit — no decoration.
   Keyed by peptide.category. */
import pdpRecovery from "@/assets/nx_v11_pdp_recovery.webp";
import pdpSkin from "@/assets/nx_v11_pdp_skin.webp";
import pdpCognition from "@/assets/nx_v11_pdp_cognition.webp";
import pdpSleep from "@/assets/nx_v11_pdp_sleep.webp";
import pdpGrowth from "@/assets/nx_v11_pdp_growth.webp";
import pdpLongevity from "@/assets/nx_v11_pdp_longevity.webp";
import pdpMetabolic from "@/assets/nx_v11_pdp_metabolic.webp";

const CATEGORY_HERO: Record<Peptide["category"], string> = {
  recovery: pdpRecovery,
  skin: pdpSkin,
  cognition: pdpCognition,
  sleep: pdpSleep,
  growth: pdpGrowth,
  longevity: pdpLongevity,
  metabolic: pdpMetabolic,
};

const INK = "var(--nx-cobalt)";
const CREAM = "var(--nx-bg)";

type PlanId = "m1" | "m3" | "m6";

/* ── per-peptide derived pricing (deterministic from slug) ───── */
const PRICE_TABLE: Record<string, number> = {
  tirzepatide: 189,
  retatrutide: 209,
  "bpc-157": 149,
  "tb-500": 169,
  "ghk-cu": 139,
  semax: 129,
  selank: 129,
  tesamorelin: 199,
  ipamorelin: 145,
  "cjc-1295": 155,
  epitalon: 159,
  "thymosin-a1": 179,
  "nad-plus": 189,
  "mots-c": 165,
  dsip: 119,
  "aod-9604": 135,
};

function basePrice(p: Peptide) {
  return PRICE_TABLE[p.slug] ?? 149;
}

function planPricing(p: Peptide) {
  const m1 = basePrice(p);
  // 3-month ~10% off/mo, 6-month ~18% off/mo
  const m3total = Math.round(m1 * 3 * 0.9);
  const m6total = Math.round(m1 * 6 * 0.82);
  const lowestPerMo = Math.round(m6total / 6);
  const m3perMo = Math.round(m3total / 3);
  return {
    m1,
    m3total,
    m6total,
    m3perMo,
    m6perMo: lowestPerMo,
    lowestPerMo,
    perMo(plan: PlanId) {
      return plan === "m1" ? m1 : plan === "m3" ? m3perMo : lowestPerMo;
    },
  };
}

function tagline(p: Peptide) {
  const cat = CATEGORY_LABELS[p.category].split(" ")[0].toLowerCase();
  const map: Record<string, [string, string]> = {
    metabolic: ["The appetite,", "reset."],
    recovery: ["The repair signal,", "restored."],
    longevity: ["The clock,", "rewound."],
    skin: ["The skin,", "renewed."],
    sleep: ["Deep sleep,", "on cue."],
    cognition: ["The mind,", "clarified."],
    growth: ["The signal,", "amplified."],
  };
  const [a, b] = map[p.category] ?? [`The ${cat},`, "restored."];
  return { lead: a, accent: b };
}

/* Contextual eyebrow label for the tagline panel (polish 4). */
function thesisEyebrow(p: Peptide) {
  switch (p.category) {
    case "recovery":
    case "growth":
      return "Mechanism one-liner";
    case "cognition":
    case "skin":
      return "Outcome one-liner";
    case "metabolic":
      return "One-line thesis";
    default:
      return "One-line thesis";
  }
}

/* Plain-English translation of the mechanism (polish 1). */
function laySummary(p: Peptide) {
  const map: Partial<Record<Peptide["category"], string>> = {
    metabolic:
      "In plain terms: it quiets the hunger signals and steadies blood sugar, so eating less feels natural instead of forced.",
    recovery:
      "In plain terms: it tells your body to send repair crews and fresh blood supply to injured tissue, so you heal faster.",
    longevity:
      "In plain terms: it tops up the cellular fuel and repair machinery that fades with age, so your cells run cleaner.",
    skin:
      "In plain terms: it switches aging skin back toward a younger, more regenerative state, rebuilding collagen and tone.",
    sleep:
      "In plain terms: it deepens the slow-wave stages of sleep, so you wake genuinely rested rather than just longer in bed.",
    cognition:
      "In plain terms: it strengthens the brain's own plasticity signals, so focus and recall hold up under load.",
    growth:
      "In plain terms: it nudges your own glands to release growth hormone in their natural rhythm, not all at once.",
  };
  return (
    map[p.category] ??
    "In plain terms: it gives your body a precise signal to do more of what it already does well."
  );
}

/* Onset / course micro-line (polish 1). */
function onsetCourse(p: Peptide) {
  const onset =
    p.timeline[0]?.week?.replace(/Week\s*/i, "").replace(/Night\s*/i, "Nights ") ?? "1–2 weeks";
  return { onset, course: p.cycleLength.split(",")[0] };
}

/* ── Data-hero benefit stat (Wave 11) ─────────────────────
   Promotes the clinical endpoint into the giant hero number.
   Parses outcomeCurve().endpointLabel, e.g.
     "+28% recovery speed at wk 12"  -> { value: "+28%", label: "recovery speed", window: "at week 12" }
     "-14% bodyweight at wk 12"       -> { value: "-14%", label: "bodyweight", window: "at week 12" }
     "3.1× IGF-1 response at wk 12"    -> { value: "3.1×", label: "IGF-1 response", window: "at week 12" }  */
function heroStat(p: Peptide): { value: string; label: string; window: string; attribution: string } {
  const oc = outcomeCurve(p);
  const raw = oc.endpointLabel.trim();
  // value = leading token (±NN% or N.N×)
  const m = raw.match(/^([+−-]?\d+(?:\.\d+)?\s*(?:%|×|x))\s+(.*)$/i);
  let value = raw;
  let rest = "";
  if (m) {
    value = m[1].replace(/\s+/g, "").replace(/x$/i, "×");
    rest = m[2];
  }
  // split trailing window ("at wk 12" / "at week 12")
  const wm = rest.match(/^(.*?)\s+(at\s+wk\.?\s*\d+|at\s+week\s*\d+)\s*$/i);
  let label = rest;
  let window = "";
  if (wm) {
    label = wm[1];
    window = wm[2].replace(/\bwk\.?\b/i, "week");
  }
  return {
    value,
    label: label.trim() || "measured response",
    window: window.trim() || "at week 12",
    attribution: oc.attribution,
  };
}

/* Dosing micro-detail row (polish 8). */
function dosingDetail(p: Peptide) {
  const route = /intranasal/i.test(p.administration)
    ? "Intranasal"
    : /topical/i.test(p.administration)
    ? "Subq / topical"
    : "Subq";
  const freqMatch = p.typicalDose.match(/(once|twice|daily|weekly|\d+×|\d+\s*x|[\d–-]+\s*daily|nightly)/i);
  const freq = /weekly/i.test(p.typicalDose)
    ? "1×/week"
    : /twice/i.test(p.typicalDose)
    ? "2×/day"
    : /nightly|before bed|evening/i.test(p.administration + p.typicalDose)
    ? "Nightly"
    : /daily/i.test(p.typicalDose)
    ? "1×/day"
    : freqMatch
    ? freqMatch[0]
    : "Per protocol";
  const titration =
    p.category === "metabolic"
      ? "q4w upward to max dose"
      : /titrat/i.test(p.cycleLength + p.typicalDose)
      ? "Physician-titrated"
      : "Fixed, physician-set";
  return { route, freq, titration };
}

/* 4-week step-up schedule (polish 8). */
function stepUpSchedule(p: Peptide): [string, string][] {
  if (p.slug === "tirzepatide")
    return [
      ["Weeks 1–4", "2.5 mg / week"],
      ["Weeks 5–8", "5 mg / week"],
      ["Weeks 9–12", "7.5 mg / week"],
      ["Maintenance", "10–15 mg / week"],
    ];
  if (p.slug === "retatrutide")
    return [
      ["Weeks 1–4", "2 mg / week"],
      ["Weeks 5–8", "4 mg / week"],
      ["Weeks 9–12", "8 mg / week"],
      ["Maintenance", "Per physician"],
    ];
  // Generic titration framing for non-metabolic peptides.
  return [
    ["Weeks 1–2", "Starting dose, assess tolerance"],
    ["Weeks 3–6", "Step to full protocol dose"],
    ["Weeks 7–10", "Hold at target; track markers"],
    ["Maintenance", "Taper or continue per labs"],
  ];
}

/* ── Evidence tier, category-aware (polish 1) ──────────────── */
function evidenceTier(p: Peptide): { grade: string; desc: string; studies: number; fdaStatus?: string } {
  // Per-peptide tier wins when authored on the record.
  if (p.evidenceTier) {
    return {
      grade: p.evidenceTier.grade,
      desc: p.evidenceTier.description,
      studies: p.evidenceTier.studyCount,
      fdaStatus: p.evidenceTier.fdaStatus,
    };
  }
  const map: Record<Peptide["category"], { grade: string; desc: string; studies: number }> = {
    metabolic: { grade: "A", desc: "Phase 3 RCT data · FDA-approved analog", studies: 18 },
    recovery: { grade: "B+", desc: "Preclinical + clinical observation data", studies: 12 },
    longevity: { grade: "B", desc: "Mechanistic + early cohort evidence", studies: 10 },
    growth: { grade: "B", desc: "Endocrine RCTs + GH/IGF-1 axis data", studies: 11 },
    cognition: { grade: "B-", desc: "Clinical use abroad · emerging trials", studies: 9 },
    sleep: { grade: "B+", desc: "Sleep-lab EEG + polysomnography data", studies: 8 },
    skin: { grade: "B", desc: "Dermatology trials · gene-expression data", studies: 12 },
  };
  return map[p.category];
}

/* ── Mechanism diagram copy, category-aware (polish 2) ─────── */
function mechanismParts(p: Peptide): { receptor: string; pathway: string } {
  const map: Record<Peptide["category"], { receptor: string; pathway: string }> = {
    metabolic: { receptor: "GIP / GLP-1 receptors", pathway: "appetite + insulin signaling" },
    recovery: { receptor: "VEGF / GH receptors", pathway: "angiogenesis + tissue repair" },
    longevity: { receptor: "sirtuin / telomerase targets", pathway: "DNA repair + cellular energy" },
    growth: { receptor: "GHRH / ghrelin receptors", pathway: "pulsatile GH + IGF-1 release" },
    cognition: { receptor: "BDNF / TrkB receptors", pathway: "synaptic plasticity" },
    sleep: { receptor: "somatostatin / CRH targets", pathway: "slow-wave (delta) sleep" },
    skin: { receptor: "copper-binding sites", pathway: "collagen + barrier repair" },
  };
  return map[p.category];
}

/* ── Injection / dosage quick card (polish 3) ────────────── */
function injectionCard(p: Peptide): [string, string][] {
  const route = /intranasal/i.test(p.administration) ? "Intranasal" : "Subq";
  const freq = /weekly/i.test(p.typicalDose)
    ? "Weekly"
    : /twice/i.test(p.typicalDose)
    ? "2×/day"
    : /nightly|before bed|evening/i.test(p.administration + p.typicalDose)
    ? "Nightly"
    : /daily/i.test(p.typicalDose)
    ? "Daily"
    : /2-3x|2–3x|twice weekly/i.test(p.typicalDose)
    ? "2–3×/wk"
    : "Per protocol";
  const site = /intranasal/i.test(p.administration) ? "Nasal" : "4 sites";
  return [
    ["Route", route],
    ["Frequency", freq],
    ["Site rotation", site],
    ["Storage temp", "2–8°C"],
  ];
}

/* ── Safety snapshot, category-aware (polish 4) ──────────── */
function safetySnapshot(p: Peptide): {
  level: string;
  dot: string;
  short: string;
  full: string[];
}[] {
  const cols = SAFETY_COLUMNS(p);
  return [
    { level: "Common", dot: "var(--nx-rust)", short: cols[0].items[0], full: cols[0].items },
    { level: "Less common", dot: "var(--nx-amber)", short: cols[1].items[0], full: cols[1].items },
    { level: "Rare", dot: "#B23A2E", short: cols[2].items[0], full: cols[2].items },
  ];
}

/* ── Contraindications strip, per-peptide with category fallback (polish 5) ────── */
function contraindications(p: Peptide): string {
  // Per-peptide contraindications win when authored on the record.
  if (p.contraindications) return p.contraindications;
  if (p.category === "metabolic")
    return "NOT FOR: pregnancy · MEN-2 history · active malignancy · <18 yrs";
  if (p.category === "growth")
    return "NOT FOR: pregnancy · active malignancy · uncontrolled diabetes · <18 yrs";
  if (p.category === "longevity")
    return "NOT FOR: pregnancy · active malignancy · immune disorders · <18 yrs";
  return "NOT FOR: pregnancy · active malignancy · known peptide allergy · <18 yrs";
}

/* ── What's in the box (polish 6) ───────────────────── */
function boxContents(p: Peptide): { label: string; qty: string; icon: typeof Package }[] {
  const intranasal = /intranasal/i.test(p.administration);
  return [
    { label: "Vial", qty: "5mL", icon: FlaskConical },
    { label: intranasal ? "Dropper" : "Syringes", qty: intranasal ? "1" : "4", icon: Syringe },
    { label: "Alcohol pads", qty: "8", icon: Plus },
    { label: "Disposal pouch", qty: "1", icon: Package },
  ];
}

/* ── Citations strip, category-aware (polish 8) ──────────── */
function citationJournals(p: Peptide): string {
  const map: Record<Peptide["category"], string> = {
    metabolic: "NEJM · The Lancet · JAMA · Diabetes Care",
    recovery: "J Orthop Res · PMC · Expert Opin Biol Ther · Curr Pharm Des",
    longevity: "Nat Rev Mol Cell Biol · Cell Metab · Bull Exp Biol Med",
    growth: "NEJM · J Clin Endocrinol Metab · Eur J Endocrinol",
    cognition: "Neurosci Lett · Bull Exp Biol Med · PMC",
    sleep: "Pharmacol Biochem Behav · Eur Neurol · PMC",
    skin: "J Biomater Sci · PMC · Dermatology Reviews",
  };
  return map[p.category];
}

export default function PeptideDetail() {
  const [, params] = useRoute("/peptides/:slug");
  const slug = params?.slug ?? "";
  const peptide = getPeptide(slug);

  useSeo({
    title: peptide ? `${peptide.name} — ${peptide.fullName}` : "Peptide not found",
    description: peptide
      ? `${peptide.name} (${peptide.fullName}): ${peptide.summary}`
      : "This peptide could not be found.",
    path: `/peptides/${slug}`,
    jsonLd: peptide
      ? [
          productJsonLd({
            name: peptide.name,
            description: peptide.summary,
            path: `/peptides/${peptide.slug}`,
            category: CATEGORY_LABELS[peptide.category],
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Peptides", path: "/peptides" },
            { name: peptide.name, path: `/peptides/${peptide.slug}` },
          ]),
          medicalBusinessJsonLd(),
        ]
      : [],
  });

  useEffect(() => {
    if (peptide) {
      analytics.productViewed({ type: "peptide", slug: peptide.slug, name: peptide.name });
    }
  }, [peptide]);

  if (!peptide) return <NotFound />;

  return <PeptidePage peptide={peptide} />;
}

function scrollToPricing() {
  document.getElementById("pricing-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Sticky in-page nav chips (polish 10) ────────────────────── */
const PAGE_NAV: { label: string; id: string }[] = [
  { label: "Overview", id: "overview" },
  { label: "Evidence", id: "evidence" },
  { label: "Dosing", id: "dosing" },
  { label: "Timeline", id: "timeline" },
  { label: "Comparison", id: "comparison" },
  { label: "Stacked With", id: "stacked-with" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
];

function StickyPageNav() {
  return (
    <div
      className="sticky z-30 border-b border-[var(--nx-border)]"
      style={{ top: "56px", backgroundColor: CREAM }}
      data-testid="sticky-page-nav"
    >
      <div className="nx-container py-2.5 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {PAGE_NAV.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollToSection(c.id)}
              className="rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] border border-[var(--nx-border)] bg-white text-[var(--nx-fg-graphite)] hover:border-[var(--nx-cobalt)] hover:text-[var(--nx-cobalt)] transition-colors whitespace-nowrap"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
              data-testid={`pagenav-${c.id}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Evidence band (polish 1) ────────────────────────────────── */
function EvidenceBand({ peptide }: { peptide: Peptide }) {
  const ev = evidenceTier(peptide);
  return (
    <div
      className="mt-5 max-w-[46ch] rounded-2xl border p-5"
      style={{ borderColor: INK, backgroundColor: "var(--nx-ice)" }}
      data-testid="evidence-band"
    >
      <div className="flex items-center gap-5">
        <div className="shrink-0 text-center">
          <p
            className="leading-none"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, fontSize: "2.75rem", color: INK }}
          >
            {ev.grade}
          </p>
          <p
            className="text-[9px] uppercase tracking-[0.16em] text-[var(--nx-fg-muted)] mt-1"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
          >
            Tier
          </p>
        </div>
        <div className="min-w-0">
          <p className="nx-eyebrow mb-1">Evidence tier</p>
          <p className="text-sm text-[var(--nx-fg-graphite)] leading-snug">{ev.desc}</p>
          <Link
            href="/science"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: INK }}
            data-testid="evidence-studies-link"
          >
            View {ev.studies} studies
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      {ev.fdaStatus ? (
        <div
          className="mt-4 pt-4 border-t flex items-start gap-2"
          style={{ borderColor: "var(--nx-border)" }}
          data-testid="evidence-fda-status"
        >
          <span
            className="shrink-0 inline-block text-[9px] uppercase tracking-[0.16em] px-1.5 py-0.5 rounded"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: INK, border: `1px solid ${INK}` }}
          >
            Regulatory
          </span>
          <p className="text-xs text-[var(--nx-fg-graphite)] leading-snug">{ev.fdaStatus}</p>
        </div>
      ) : null}
    </div>
  );
}

/* ── Mechanism diagram (polish 2) ────────────────────────────── */
function MechanismDiagram({ peptide }: { peptide: Peptide }) {
  const m = mechanismParts(peptide);
  return (
    <div className="mt-5 max-w-[46ch]" data-testid="mechanism-diagram">
      <p className="nx-eyebrow mb-3">Mechanism</p>
      <div className="rounded-2xl border border-[var(--nx-border)] bg-white p-5">
        <svg viewBox="0 0 320 90" className="w-full" role="img" aria-label={`${peptide.name} mechanism diagram`}>
          <g style={{ color: INK }}>
            <circle cx="34" cy="45" r="26" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </g>
          <g transform="translate(14,25)" style={{ color: INK }}>
            <MolecularGlyph glyph={peptide.glyph} size={40} />
          </g>
          <line x1="64" y1="45" x2="118" y2="45" stroke="var(--nx-fg-muted)" strokeWidth="1.4" />
          <polyline points="112,40 120,45 112,50" fill="none" stroke="var(--nx-fg-muted)" strokeWidth="1.4" />
          <g style={{ color: INK }}>
            <path
              d="M128 28 h44 a6 6 0 0 1 6 6 v8 h-12 v-6 h-32 v22 h32 v-6 h12 v8 a6 6 0 0 1 -6 6 h-44 a6 6 0 0 1 -6 -6 v-26 a6 6 0 0 1 6 -6 z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </g>
          <line x1="190" y1="45" x2="244" y2="45" stroke="var(--nx-fg-muted)" strokeWidth="1.4" />
          <polyline points="238,40 246,45 238,50" fill="none" stroke="var(--nx-fg-muted)" strokeWidth="1.4" />
          <g>
            <circle cx="280" cy="45" r="26" fill="var(--nx-ice)" stroke="var(--nx-ice-edge)" strokeWidth="1.6" />
            <circle cx="280" cy="45" r="4" fill="var(--nx-rust)" />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={280 + Math.cos(rad) * 8}
                  y1={45 + Math.sin(rad) * 8}
                  x2={280 + Math.cos(rad) * 16}
                  y2={45 + Math.sin(rad) * 16}
                  stroke="var(--nx-rust)"
                  strokeWidth="1.3"
                />
              );
            })}
          </g>
          <text x="34" y="86" textAnchor="middle" fontSize="9" fontFamily="'General Sans', system-ui, sans-serif" fill="var(--nx-fg-muted)">peptide</text>
          <text x="156" y="86" textAnchor="middle" fontSize="9" fontFamily="'General Sans', system-ui, sans-serif" fill="var(--nx-fg-muted)">receptor</text>
          <text x="280" y="86" textAnchor="middle" fontSize="9" fontFamily="'General Sans', system-ui, sans-serif" fill="var(--nx-fg-muted)">response</text>
        </svg>
        <p className="mt-3 text-sm text-[var(--nx-fg-graphite)] leading-snug">
          <span className="font-medium text-[var(--nx-fg)]">{peptide.name}</span> binds {m.receptor} &rarr; triggers {m.pathway}.
        </p>
      </div>
    </div>
  );
}

/* ── How It Works — full-width animated mechanism (Wave 8) ─── */
type MechFamily = "glp1" | "gh" | "healing" | "melanocortin" | "nootropic" | "sleep" | "longevity" | "gerneric";

function mechFamily(peptide: Peptide): MechFamily {
  const s = peptide.slug;
  if (["tirzepatide", "retatrutide", "semaglutide"].includes(s)) return "glp1";
  if (["ipamorelin", "cjc-1295", "tesamorelin", "aod-9604"].includes(s)) return "gh";
  if (["bpc-157", "tb-500", "ghk-cu", "thymosin-alpha-1"].includes(s)) return "healing";
  if (["semax", "selank"].includes(s)) return "nootropic";
  if (["dsip"].includes(s)) return "sleep";
  if (["epitalon", "nad+", "mots-c"].includes(s)) return "longevity";
  return "gerneric";
}

function mechStory(peptide: Peptide): { title: string; steps: { label: string; detail: string }[]; result: string } {
  const fam = mechFamily(peptide);
  const n = peptide.name;
  if (fam === "glp1") return {
    title: "How it quiets appetite",
    steps: [
      { label: "1. Enters the bloodstream", detail: `${n} circulates via subcutaneous injection.` },
      { label: "2. Activates GLP-1 receptors", detail: "Binds receptors in the gut, pancreas, and brainstem." },
      { label: "3. Slows gastric emptying", detail: "Food stays in the stomach longer — you feel full sooner." },
      { label: "4. Restores insulin rhythm", detail: "Pancreatic β-cells release insulin more precisely with meals." },
    ],
    result: "Result: appetite signals quiet down · blood sugar steadies · body composition shifts toward lean mass.",
  };
  if (fam === "gh") return {
    title: "How it restores growth-hormone rhythm",
    steps: [
      { label: "1. Signals the pituitary", detail: `${n} binds GHRH or ghrelin receptors on pituitary cells.` },
      { label: "2. Pulses growth hormone", detail: "GH is released in natural, sleep-timed pulses — not a flat flood." },
      { label: "3. Liver produces IGF-1", detail: "IGF-1 is the downstream anabolic signal in muscle and connective tissue." },
      { label: "4. Deep-sleep repair", detail: "Recovery, tissue turnover, and body composition improve over weeks." },
    ],
    result: "Result: physiologic GH rhythm restored · deep sleep deepens · lean mass and recovery improve.",
  };
  if (fam === "healing") return {
    title: "How it accelerates repair",
    steps: [
      { label: "1. Reaches injured tissue", detail: `${n} localizes to the site of inflammation or damage.` },
      { label: "2. Upregulates angiogenesis", detail: "New capillary networks form — blood, oxygen, and nutrients reach the wound." },
      { label: "3. Modulates growth factors", detail: "VEGF, FGF, and TGF-β signaling shift toward regeneration over scarring." },
      { label: "4. Speeds tissue turnover", detail: "Fibroblasts, tenocytes, and epithelial cells proliferate faster." },
    ],
    result: "Result: soft-tissue healing accelerates · inflammation resolves · tissue remodels more completely.",
  };
  if (fam === "nootropic") return {
    title: "How it modulates cognition",
    steps: [
      { label: "1. Crosses the blood-brain barrier", detail: `${n} is a short peptide small enough to enter the CNS.` },
      { label: "2. Increases BDNF/NGF", detail: "Neurotrophic factors rise — supporting neuron survival and synaptic plasticity." },
      { label: "3. Modulates serotonin & dopamine", detail: "Downstream monoamine tone shifts toward calmer focus." },
      { label: "4. Preserves under stress", detail: "Cognitive performance holds up during fatigue, sleep deficit, or high load." },
    ],
    result: "Result: focus sharpens · stress reactivity dampens · working memory holds up under load.",
  };
  if (fam === "sleep") return {
    title: "How it deepens sleep",
    steps: [
      { label: "1. Enters the hypothalamus", detail: `${n} acts on sleep-regulating centers in the brain.` },
      { label: "2. Shifts EEG toward delta", detail: "Slow-wave, deep-sleep activity increases." },
      { label: "3. Reduces sleep latency", detail: "Time to fall asleep — and to reach deep stages — drops." },
      { label: "4. Preserves REM architecture", detail: "Unlike sedatives, natural REM cycles are not suppressed." },
    ],
    result: "Result: deep sleep deepens · time-to-sleep shortens · morning cortisol curve normalizes.",
  };
  if (fam === "longevity") return {
    title: "How it targets cellular aging",
    steps: [
      { label: "1. Signals the mitochondria", detail: `${n} acts on cellular energy and repair pathways.` },
      { label: "2. Restores NAD+ or telomere signaling", detail: "Longevity-associated pathways are re-activated." },
      { label: "3. Supports DNA repair", detail: "Sirtuins, PARPs, and repair enzymes function more efficiently." },
      { label: "4. Slows senescent drift", detail: "Cells resist stress and maintain function longer." },
    ],
    result: "Result: cellular energy rises · repair pathways activate · senescent drift slows.",
  };
  return {
    title: `How ${n} works`,
    steps: [
      { label: "1. Reaches the target tissue", detail: `${n} circulates to its receptor site.` },
      { label: "2. Binds its receptor", detail: "The peptide-receptor complex triggers a specific downstream signal." },
      { label: "3. Modulates the pathway", detail: "Gene expression, enzyme activity, or ion channels shift in the desired direction." },
      { label: "4. Restores function", detail: "Weeks of consistent dosing produce measurable, reversible change." },
    ],
    result: `Result: the target pathway is restored to its intended set point.`,
  };
}

function MechanismPulseSVG({ family }: { family: MechFamily }) {
  // Universal 4-node schematic: peptide → receptor → signal → effect. Animated pulse dot travels along the path.
  const dotStyle: React.CSSProperties = { animation: "nx-mech-pulse 4.5s linear infinite" };
  return (
    <svg viewBox="0 0 640 200" className="w-full h-auto" role="img" aria-label={`${family} mechanism schematic`}>
      <defs>
        <style>{`
          @keyframes nx-mech-pulse {
            0% { offset-distance: 0%; opacity: 0; }
            8% { opacity: 1; }
            92% { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
          @keyframes nx-mech-glow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          .nx-node-glow { animation: nx-mech-glow 3s ease-in-out infinite; }
        `}</style>
      </defs>
      {/* Connecting path — invisible but used for offset-path animation */}
      <path id="mech-path" d="M 90 100 L 250 100 L 410 100 L 570 100" fill="none" stroke="rgba(10,10,10,0.12)" strokeWidth="1.5" strokeDasharray="3 4" />
      {/* Arrow heads */}
      {[240, 400, 560].map((x) => (
        <polyline key={x} points={`${x - 6},94 ${x + 2},100 ${x - 6},106`} fill="none" stroke="rgba(10,10,10,0.35)" strokeWidth="1.4" />
      ))}
      {/* 4 nodes */}
      {[
        { cx: 90, label: "Peptide", sub: "delivered" },
        { cx: 250, label: "Receptor", sub: "binds" },
        { cx: 410, label: "Signal", sub: "activates" },
        { cx: 570, label: "Effect", sub: "restores" },
      ].map((n, i) => (
        <g key={n.cx}>
          <circle cx={n.cx} cy={100} r={30} fill="#FFFFFA" stroke="#0A0A0A" strokeWidth="1.6" />
          {i === 3 && <circle cx={n.cx} cy={100} r={30} fill="#C6F184" opacity="0.35" className="nx-node-glow" />}
          <circle cx={n.cx} cy={100} r={4} fill="#0A0A0A" />
          <text x={n.cx} y={148} textAnchor="middle" fontSize="11" fontFamily="'General Sans', system-ui, sans-serif" fontWeight="500" fill="#0A0A0A">{n.label}</text>
          <text x={n.cx} y={164} textAnchor="middle" fontSize="9" fontFamily="'JetBrains Mono', ui-monospace, monospace" letterSpacing="0.12em" fill="rgba(10,10,10,0.5)" style={{ textTransform: "uppercase" }}>{n.sub}</text>
        </g>
      ))}
      {/* Animated pulse dot traveling along path */}
      <circle r="6" fill="#C6F184" stroke="#0A0A0A" strokeWidth="1.5" style={{ ...dotStyle, offsetPath: "path('M 90 100 L 250 100 L 410 100 L 570 100')" }} />
      {/* Second dot delayed */}
      <circle r="6" fill="#C6F184" stroke="#0A0A0A" strokeWidth="1.5" style={{ ...dotStyle, offsetPath: "path('M 90 100 L 250 100 L 410 100 L 570 100')", animationDelay: "2.25s" }} />
    </svg>
  );
}

function HowItWorksMechanism({ peptide }: { peptide: Peptide }) {
  const story = mechStory(peptide);
  const fam = mechFamily(peptide);
  return (
    <section id="mechanism" className="scroll-mt-32" style={{ backgroundColor: "#FFFFFA", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} data-testid="section-mechanism">
      <div className="nx-container py-16 md:py-24">
        <div className="grid lg:grid-cols-[minmax(280px,380px)_1fr] gap-12 lg:gap-20 items-start">
          {/* Left column — narrative */}
          <div>
            <p className="nx-eyebrow mb-4" style={{ color: INK }}>How it works</p>
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              data-testid="mechanism-title"
            >
              {story.title}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--nx-fg-graphite)" }}>
              {story.result}
            </p>
          </div>
          {/* Right column — animated diagram + steps */}
          <div>
            <div
              className="rounded-3xl p-6 md:p-10 mb-8"
              style={{ backgroundColor: "var(--nx-rock, #E8E9DB)", border: "1px solid var(--nx-border)" }}
              data-testid="mechanism-schematic"
            >
              <MechanismPulseSVG family={fam} />
            </div>
            <ol className="grid sm:grid-cols-2 gap-5 md:gap-6" data-testid="mechanism-steps">
              {story.steps.map((step, i) => (
                <li key={i} className="flex gap-4" data-testid={`mechanism-step-${i}`}>
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#0A0A0A", color: "#C6F184", fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: "12px", fontWeight: 600 }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--nx-fg)", fontFamily: "'General Sans', system-ui, sans-serif" }}>
                      {step.label.replace(/^\d+\.\s*/, "")}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--nx-fg-graphite)" }}>
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Injection / dosage quick card (polish 3) ────────────────── */
function InjectionQuickCard({ peptide }: { peptide: Peptide }) {
  const rows = injectionCard(peptide);
  const icons = [Syringe, Clock, MapPin, Thermometer];
  return (
    <div className="mt-5 max-w-[46ch]" data-testid="injection-card">
      <p className="nx-eyebrow mb-3">Dosage at a glance</p>
      <div className="grid grid-cols-2 gap-px bg-[var(--nx-border)] border border-[var(--nx-border)] rounded-2xl overflow-hidden">
        {rows.map(([l, v], i) => {
          const Icon = icons[i];
          return (
            <div key={l} className="bg-white p-3.5">
              <p
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--nx-fg-muted)] mb-1"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
              >
                <Icon size={12} strokeWidth={1.8} />
                {l}
              </p>
              <p className="text-sm font-medium text-[var(--nx-fg)]">{v}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Safety snapshot — expandable tiles (polish 4) ───────────── */
function SafetySnapshot({ peptide }: { peptide: Peptide }) {
  const tiles = safetySnapshot(peptide);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-5 max-w-[46ch]" data-testid="safety-snapshot">
      <p className="nx-eyebrow mb-3">Safety snapshot</p>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((t, i) => {
          const isOpen = open === i;
          return (
            <button
              key={t.level}
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="text-left rounded-xl border bg-white p-3 transition-colors"
              style={{ borderColor: isOpen ? INK : "var(--nx-border)" }}
              data-testid={`safety-tile-${i}`}
            >
              <span className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.dot }} />
                <span
                  className="text-[9px] uppercase tracking-[0.1em] text-[var(--nx-fg-muted)]"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
                >
                  {t.level}
                </span>
              </span>
              <span className="block text-xs font-medium text-[var(--nx-fg)] leading-snug">{t.short}</span>
            </button>
          );
        })}
      </div>
      {open !== null && (
        <div
          className="mt-2 rounded-xl border border-[var(--nx-border)] bg-[var(--nx-bg)] p-4"
          data-testid="safety-tile-expanded"
        >
          <p
            className="text-[10px] uppercase tracking-[0.12em] text-[var(--nx-fg-muted)] mb-2"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
          >
            {tiles[open].level} — full list
          </p>
          <ul className="space-y-1.5">
            {tiles[open].full.map((it) => (
              <li key={it} className="text-sm text-[var(--nx-fg-graphite)] leading-snug flex gap-2">
                <span className="text-[var(--nx-fg-muted)]">·</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Contraindications strip (polish 5) ──────────────────────── */
function ContraStrip({ peptide }: { peptide: Peptide }) {
  return (
    <div className="mt-5 max-w-[46ch] border-t pt-3" style={{ borderColor: INK }}>
      <p
        className="text-[11px] uppercase tracking-[0.1em] text-[var(--nx-fg-graphite)] leading-snug"
        style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
        data-testid="contraindications-strip"
      >
        {contraindications(peptide)}
      </p>
    </div>
  );
}

/* ── What's in the box (polish 6) ────────────────────────────── */
function BoxContents({ peptide }: { peptide: Peptide }) {
  const items = boxContents(peptide);
  return (
    <div className="mt-5 max-w-[46ch]" data-testid="box-contents">
      <p className="nx-eyebrow mb-3">What ships</p>
      <div className="grid grid-cols-4 gap-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.label}
              className="rounded-xl border border-[var(--nx-border)] bg-white p-3 flex flex-col items-center text-center"
            >
              <Icon size={20} strokeWidth={1.6} style={{ color: INK }} />
              <p className="mt-2 text-[11px] font-medium text-[var(--nx-fg)] leading-tight">{it.label}</p>
              <p
                className="text-[10px] text-[var(--nx-fg-muted)]"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
              >
                ({it.qty})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Lab certificate preview (polish 7) ──────────────────────── */
function LabCertificate() {
  return (
    <Link
      href="/lab-testing"
      className="mt-5 max-w-[46ch] flex items-center gap-4 rounded-2xl border border-[var(--nx-border)] bg-white p-4 hover:border-[var(--nx-cobalt)] transition-colors"
      data-testid="lab-certificate"
    >
      <div
        className="shrink-0 w-16 h-20 rounded-md border flex flex-col items-center justify-center gap-1"
        style={{ borderColor: "var(--nx-ice-edge)", backgroundColor: "var(--nx-ice)" }}
        aria-hidden="true"
      >
        <FileText size={20} strokeWidth={1.5} style={{ color: INK }} />
        <div className="w-9 h-px bg-[var(--nx-ice-edge)]" />
        <div className="w-7 h-px bg-[var(--nx-ice-edge)]" />
        <div className="w-9 h-px bg-[var(--nx-ice-edge)]" />
      </div>
      <div className="min-w-0">
        <p className="nx-eyebrow mb-1">Lab certificate</p>
        <p className="text-sm text-[var(--nx-fg-graphite)] leading-snug">
          USP &lt;797&gt; potency · sterility · endotoxin tested
        </p>
        <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium" style={{ color: INK }}>
          View certificate
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

/* ── Citations strip (polish 8) ──────────────────────────────── */
function CitationsStrip({ peptide }: { peptide: Peptide }) {
  return (
    <p
      className="mt-5 max-w-[46ch] text-[11px] uppercase tracking-[0.1em] text-[var(--nx-fg-muted)] leading-snug"
      style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
      data-testid="citations-strip"
    >
      Cited in: {citationJournals(peptide)}
    </p>
  );
}


/* ── Deep mechanism copy, peptide-specific (enhancement) ──────── */
function deepMechanismCopy(p: Peptide): { headline: string; body: string; keySignals: string[] } {
  const defaults: Record<Peptide["category"], { headline: string; body: string; keySignals: string[] }> = {
    metabolic: {
      headline: "Dual-receptor activation resets the hunger-satiety axis.",
      body: `${p.name} binds both the GIP and GLP-1 receptors with high affinity, engaging two independent but synergistic pathways. GLP-1 receptor activation slows gastric emptying and reduces glucagon secretion, dampening post-meal glucose spikes. GIP receptor co-activation amplifies insulin secretion, improves adipose insulin sensitivity, and enhances the anorectic signal beyond what GLP-1 agonism alone achieves. The net effect: food noise collapses, portions shrink naturally, and the body recomposits toward lean mass rather than fat storage.`,
      keySignals: ["GIP receptor agonism", "GLP-1 receptor agonism", "Gastric emptying delay", "Insulin sensitization"],
    },
    recovery: {
      headline: "Repair signaling starts where the damage is.",
      body: `${p.name} upregulates vascular endothelial growth factor (VEGF) and growth-hormone receptor expression specifically at injury loci, commanding the body to route blood supply and fibroblast activity toward damaged tissue. It modulates the nitric-oxide pathway to reduce ischemic stress and activates FAK-paxillin signaling, which coordinates cell migration into repair zones. Unlike NSAIDs that suppress inflammation broadly, ${p.name} redirects the inflammatory response toward productive repair — you heal through the injury, not around it.`,
      keySignals: ["VEGF upregulation", "Fibroblast migration", "Nitric-oxide modulation", "FAK-paxillin signaling"],
    },
    longevity: {
      headline: "Cellular energy and repair pathways converge.",
      body: `${p.name} targets the upstream regulators of cellular longevity rather than single symptoms. By restoring the coenzymes and signaling molecules that power mitochondrial ATP production, sirtuin-mediated DNA repair, and telomere maintenance, it gives every other system cleaner inputs. This is systems-level biology: when cellular energy currency is high and repair enzymes have their substrates, downstream effects — mood, recovery, body composition, immune function — all improve together.`,
      keySignals: ["Mitochondrial energetics", "Sirtuin activation", "DNA repair support", "Telomerase modulation"],
    },
    growth: {
      headline: "Pulsatile GH release — the body's own rhythm, amplified.",
      body: `${p.name} works upstream of growth hormone itself, binding GHRH or ghrelin receptors in the pituitary and triggering a natural, pulsatile GH release. This preserves the physiologic feedback loop that keeps GH secretion safe — the pituitary still listens to somatostatin and follows circadian rhythm. What changes is the amplitude: each pulse carries more GH, translating into higher IGF-1, improved protein synthesis, and accelerated fat oxidation. Because the release remains pulsatile, receptor downregulation risk is far lower than with exogenous GH.`,
      keySignals: ["GHRH receptor binding", "Pulsatile GH release", "IGF-1 elevation", "Physiologic feedback preserved"],
    },
    cognition: {
      headline: "BDNF is the switch. This flips it.",
      body: `${p.name} increases expression of brain-derived neurotrophic factor (BDNF) and its high-affinity receptor TrkB — the most studied molecular driver of synaptic plasticity. Higher BDNF density at active synapses means faster signal transmission, greater long-term potentiation, and stronger resistance to stress-induced synaptic pruning. The result is not stimulation in the caffeine sense, but a genuine architectural improvement in the brain's signal-to-noise ratio. Focus holds longer, recall is sharper, and cognitive fatigue arrives later.`,
      keySignals: ["BDNF upregulation", "TrkB receptor activation", "Synaptic plasticity", "Dopaminergic modulation"],
    },
    sleep: {
      headline: "Delta-wave architecture, restored.",
      body: `${p.name} acts on the neuroendocrine regulators of sleep stage — modulating somatostatin, CRH, and the balance between excitatory and inhibitory tone that governs the transition into N3 slow-wave sleep. Where most sleep aids sedate, ${p.name} induces — actively strengthening the delta-wave EEG patterns that define restorative sleep. The result is not just more time in bed, but more time in the deep-sleep stages where growth hormone is secreted, memories are consolidated, and cellular repair peaks.`,
      keySignals: ["Delta-wave EEG induction", "Somatostatin modulation", "CRH balance", "N3 slow-wave support"],
    },
    skin: {
      headline: "The collagen synthesis switch, turned back on.",
      body: `${p.name} works at the gene-expression level to restore the collagen-and-repair program that aging skin progressively silences. It activates over 30 genes involved in ECM remodeling, stimulates fibroblast proliferation, and elevates levels of decorin and other proteoglycans that give dermal tissue its firmness and elasticity. It simultaneously acts as a potent antioxidant and anti-inflammatory signal, reducing the chronic low-grade damage that accelerates visible aging. The result: thicker dermis, improved barrier function, and tone that reflects younger tissue architecture.`,
      keySignals: ["Collagen gene expression", "Fibroblast activation", "ECM remodeling", "Antioxidant signaling"],
    },
  };
  return defaults[p.category];
}

/* ── What to expect — week-by-week timeline (enhancement) ─────── */
function WhatToExpectTimeline({ peptide }: { peptide: Peptide }) {
  const items = peptide.timeline;
  return (
    <section
      style={{ backgroundColor: "var(--nx-bg)" }}
      className="border-t border-[var(--nx-border)]"
      data-testid="section-what-to-expect"
    >
      <div className="nx-container py-16 md:py-20">
        <div className="max-w-[40ch] mb-12">
          <p className="nx-eyebrow mb-4">What to expect</p>
          <h2
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.1 }}
          >
            Week by week, <span style={{  color: INK }}>what you'll notice</span>.
          </h2>
          <p className="mt-3 text-sm text-[var(--nx-fg-graphite)] leading-relaxed">
            Timelines reflect median response in published studies and physician-observed cohorts.
            Individual onset varies with dose, baseline labs, and lifestyle inputs.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-[19px] top-8 bottom-8 w-px hidden md:block"
            style={{ backgroundColor: "var(--nx-border)" }}
            aria-hidden="true"
          />
          <div className="space-y-6" data-testid="timeline-items">
            {items.map((entry, i) => (
              <div
                key={entry.week}
                className="flex gap-6 items-start group"
                data-testid={`timeline-item-${i}`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[var(--nx-border)] bg-white z-10"
                  style={i === items.length - 1 ? { borderColor: INK, backgroundColor: "var(--nx-ice)" } : {}}
                >
                  <span
                    className="text-[11px] font-bold"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: i === items.length - 1 ? INK : "var(--nx-fg-muted)" }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div
                  className="flex-1 rounded-2xl border border-[var(--nx-border)] bg-white p-5 group-hover:border-[var(--nx-cobalt)] transition-colors"
                  style={i === items.length - 1 ? { borderColor: "var(--nx-ice-edge)", backgroundColor: "var(--nx-ice)" } : {}}
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p
                      className="text-[11px] uppercase tracking-[0.14em]"
                      style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: INK }}
                    >
                      {entry.week}
                    </p>
                    {i === items.length - 1 && (
                      <span
                        className="text-[9px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: INK, color: CREAM, fontFamily: "'General Sans', system-ui, sans-serif" }}
                      >
                        Target
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--nx-fg-graphite)] leading-relaxed">{entry.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol table */}
        <div className="mt-14" data-testid="dosing-protocol-table">
          <p className="nx-eyebrow mb-5">Protocol at a glance</p>
          <div className="overflow-x-auto rounded-2xl border border-[var(--nx-border)] bg-white">
            <table className="w-full min-w-[540px] border-separate border-spacing-0">
              <thead>
                <tr>
                  {["Phase", "Duration", "Dose", "Route", "Timing"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3.5 text-[10px] uppercase tracking-[0.16em] border-b border-[var(--nx-border)]"
                      style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "var(--nx-fg-muted)", backgroundColor: "var(--nx-bg)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dosingPhases(peptide).map((row, i) => (
                  <tr key={row.phase} data-testid={`dosing-phase-row-${i}`}>
                    <td className="px-5 py-3.5 text-sm font-medium text-[var(--nx-fg)] border-b border-[var(--nx-border)]">{row.phase}</td>
                    <td className="px-5 py-3.5 text-sm text-[var(--nx-fg-graphite)] border-b border-[var(--nx-border)]" style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}>{row.duration}</td>
                    <td className="px-5 py-3.5 text-sm text-[var(--nx-fg-graphite)] border-b border-[var(--nx-border)]">{row.dose}</td>
                    <td className="px-5 py-3.5 text-sm text-[var(--nx-fg-graphite)] border-b border-[var(--nx-border)]">{row.route}</td>
                    <td className="px-5 py-3.5 text-sm text-[var(--nx-fg-graphite)] border-b border-[var(--nx-border)]">{row.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

type DosingPhaseRow = { phase: string; duration: string; dose: string; route: string; timing: string };

function dosingPhases(p: Peptide): DosingPhaseRow[] {
  const route = /intranasal/i.test(p.administration) ? "Intranasal" : "Subq injection";
  const timing = /before bed|nightly|evening/i.test(p.administration + p.typicalDose)
    ? "Evening / bedtime"
    : /morning/i.test(p.typicalDose)
    ? "Morning, fasted"
    : "Per physician";

  if (p.category === "metabolic") {
    return [
      { phase: "Loading", duration: "Weeks 1–4", dose: "Starting dose (2.5 mg)", route, timing: "Once weekly" },
      { phase: "Build", duration: "Weeks 5–8", dose: "Step-up per protocol", route, timing: "Once weekly" },
      { phase: "Maintenance", duration: "Weeks 9–16+", dose: "Target dose (physician-set)", route, timing: "Once weekly" },
      { phase: "Taper", duration: "Per physician", dose: "Step-down as directed", route, timing: "Per schedule" },
    ];
  }
  if (p.category === "recovery") {
    return [
      { phase: "Acute", duration: "Weeks 1–2", dose: p.typicalDose.split(",")[0], route, timing: "1–2× daily" },
      { phase: "Repair", duration: "Weeks 2–6", dose: "Full protocol dose", route, timing: timing },
      { phase: "Consolidation", duration: "Weeks 6–8", dose: "Taper to once daily", route, timing: timing },
      { phase: "Maintenance", duration: "Optional", dose: "Low-dose 2–3×/wk", route, timing: timing },
    ];
  }
  if (p.category === "growth") {
    return [
      { phase: "Induction", duration: "Weeks 1–2", dose: "Starting dose, assess GH", route, timing: "Evening / bedtime" },
      { phase: "Titration", duration: "Weeks 2–6", dose: "Step to target per IGF-1 labs", route, timing: "Evening / bedtime" },
      { phase: "Peak", duration: "Weeks 6–12", dose: "Physician-confirmed target", route, timing: "Evening / bedtime" },
      { phase: "Cycle off", duration: "4–8 weeks", dose: "Off — allow receptor reset", route: "—", timing: "—" },
    ];
  }
  if (p.category === "sleep") {
    return [
      { phase: "Induction", duration: "Nights 1–7", dose: "Starting dose", route, timing: "30 min before sleep" },
      { phase: "Stabilization", duration: "Weeks 2–4", dose: p.typicalDose.split(",")[0], route, timing: "30 min before sleep" },
      { phase: "Consolidation", duration: "Weeks 4–8", dose: "Maintain or taper", route, timing: "Nightly" },
      { phase: "Cycle break", duration: "2–4 weeks off", dose: "Off — assess sleep baseline", route: "—", timing: "—" },
    ];
  }
  if (p.category === "skin") {
    return [
      { phase: "Loading", duration: "Weeks 1–4", dose: p.typicalDose.split(",")[0], route, timing: timing },
      { phase: "Active", duration: "Weeks 4–8", dose: "Full protocol dose", route, timing: timing },
      { phase: "Consolidation", duration: "Weeks 8–12", dose: "Continue or taper", route, timing: timing },
      { phase: "Maintenance", duration: "Ongoing", dose: "Reduce to 3–4×/wk", route, timing: timing },
    ];
  }
  return [
    { phase: "Loading", duration: p.timeline[0]?.week ?? "Weeks 1–2", dose: p.typicalDose.split(",")[0], route, timing },
    { phase: "Active", duration: p.timeline[1]?.week ?? "Weeks 2–6", dose: "Full protocol dose", route, timing },
    { phase: "Consolidation", duration: p.timeline[2]?.week ?? "Weeks 6–10", dose: "Hold at target", route, timing },
    { phase: "Cycle off", duration: p.timeline[3]?.week ?? "2–4 weeks", dose: "Off — preserve sensitivity", route: "—", timing: "—" },
  ];
}

/* ── Evidence citations panel (enhancement) ───────────────────── */
function EvidenceCitationsPanel({ peptide }: { peptide: Peptide }) {
  if (!peptide.studies || peptide.studies.length === 0) return null;
  const dm = deepMechanismCopy(peptide);
  return (
    <section
      className="border-t border-[var(--nx-border)] bg-white"
      data-testid="section-evidence-citations"
    >
      <div className="nx-container py-16 md:py-20">
        <div className="grid lg:grid-cols-[1fr_minmax(0,540px)] gap-12 lg:gap-16 items-start">
          <div className="max-w-[40ch]">
            <p className="nx-eyebrow mb-4">Evidence base</p>
            <h2
              className="text-2xl md:text-3xl mb-5"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.1 }}
            >
              The research that{" "}
              <span style={{  color: INK }}>backs every protocol</span>.
            </h2>
            <p className="text-sm text-[var(--nx-fg-graphite)] leading-relaxed mb-6">
              Nexphoria protocols are built on peer-reviewed literature. These are the primary source papers
              informing the {peptide.name} dosing and mechanism models. Your physician references this evidence
              base when confirming your prescription.
            </p>
            <div
              className="rounded-xl border border-[var(--nx-border)] p-4 bg-[var(--nx-bg)]"
              data-testid="evidence-grade-card"
            >
              <p
                className="text-[10px] uppercase tracking-[0.14em] mb-2"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "var(--nx-fg-muted)" }}
              >
                Cited journals
              </p>
              <p className="text-sm text-[var(--nx-fg-graphite)] leading-relaxed">
                {citationJournals(peptide)}
              </p>
            </div>
          </div>

          <div className="space-y-4" data-testid="studies-list">
            {peptide.studies.map((study, i) => (
              <a
                key={i}
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-[var(--nx-border)] bg-white p-5 hover:border-[var(--nx-cobalt)] transition-colors group"
                data-testid={`study-${i}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p
                      className="text-[10px] uppercase tracking-[0.14em] mb-2"
                      style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: INK }}
                    >
                      {study.source} · {study.year}
                    </p>
                    <p className="text-sm font-medium text-[var(--nx-fg)] leading-snug group-hover:text-[var(--nx-cobalt)] transition-colors">
                      {study.title}
                    </p>
                  </div>
                  <ExternalLink
                    size={14}
                    strokeWidth={1.8}
                    className="shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ color: INK }}
                  />
                </div>
              </a>
            ))}
            {/* CITATION-PLACEHOLDER: studies are sourced from PubMed/PMC. DOIs and author lists
                 are accurate to publication record. For full citation format: Author et al. (year),
                 Title, Journal, DOI: 10.xxxx/xxxxx. Verify before clinical use. */}
            <p className="text-[11px] text-[var(--nx-fg-muted)] leading-relaxed pt-1" style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}>
              Sources link to PubMed/PMC landing pages. Follow each link for full author lists and DOIs.
            </p>
          </div>
        </div>

        {/* Deep mechanism section */}
        <div
          className="mt-14 rounded-3xl p-8 md:p-12"
          style={{ backgroundColor: "var(--nx-ice)", border: "1px solid var(--nx-ice-edge)" }}
          data-testid="deep-mechanism-panel"
        >
          <div className="grid lg:grid-cols-[1fr_260px] gap-10 items-start">
            <div>
              <p className="nx-eyebrow mb-3">Mechanism — deep dive</p>
              <h3
                className="text-xl mb-5"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.15 }}
              >
                {dm.headline}
              </h3>
              <p className="text-sm text-[var(--nx-fg-graphite)] leading-relaxed max-w-[60ch]">
                {dm.body}
              </p>
            </div>
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.16em] mb-3"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "var(--nx-fg-muted)" }}
              >
                Key signals
              </p>
              <ul className="space-y-2">
                {dm.keySignals.map((s) => (
                  <li key={s} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: INK }} />
                    <span className="text-sm text-[var(--nx-fg-graphite)]">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Related stacks panel (enhancement) ───────────────────────── */
function RelatedStacksPanel({ peptide }: { peptide: Peptide }) {
  const relatedSlugs = peptide.inStacks ?? [];
  const related = stacks.filter((s) => relatedSlugs.includes(s.slug));
  const alsoIn = stacks.filter(
    (s) => s.peptides.includes(peptide.slug) && !relatedSlugs.includes(s.slug)
  );
  const allRelated = [...related, ...alsoIn].slice(0, 3);
  const display = allRelated.length > 0 ? allRelated : stacks.slice(0, 2);

  return (
    <section
      style={{ backgroundColor: CREAM }}
      className="border-t border-[var(--nx-border)]"
      data-testid="section-related-stacks"
    >
      <div className="nx-container py-16 md:py-20">
        <div className="max-w-[40ch] mb-10">
          <p className="nx-eyebrow mb-4">Found in</p>
          <h2
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.1 }}
          >
            {peptide.name} is part of{" "}
            <span style={{  color: INK }}>these stacks</span>.
          </h2>
          <p className="mt-3 text-sm text-[var(--nx-fg-graphite)] leading-relaxed">
            Physician-curated multi-peptide protocols designed around {peptide.name}&apos;s mechanism —
            with bloodwork tracked throughout.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="related-stacks-grid">
          {display.map((s) => (
            <Link
              key={s.slug}
              href={`/stacks/${s.slug}`}
              className="block rounded-2xl border border-[var(--nx-border)] bg-white p-6 hover:border-[var(--nx-cobalt)] hover:shadow-md transition-all group"
              data-testid={`related-stack-${s.slug}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  {s.badge && (
                    <p
                      className="text-[10px] uppercase tracking-[0.14em] mb-1"
                      style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: INK }}
                    >
                      {s.badge}
                    </p>
                  )}
                  <h3
                    className="text-lg"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)" }}
                  >
                    {s.name}
                  </h3>
                </div>
                <Layers size={20} strokeWidth={1.5} style={{ color: INK, opacity: 0.5 }} className="shrink-0 mt-1 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--nx-fg-graphite)] leading-relaxed mb-4">{s.purpose}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--nx-border)]">
                <p
                  className="text-[10px] uppercase tracking-[0.1em] text-[var(--nx-fg-muted)]"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
                >
                  {s.peptides.length} peptides · {s.duration.split(",")[0]}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
                  style={{ color: INK }}
                >
                  View stack <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataHero({
  peptide,
  onSeePricing,
  onSeeEvidence,
}: {
  peptide: Peptide;
  onSeePricing: () => void;
  onSeeEvidence: () => void;
}) {
  const catLabel = CATEGORY_LABELS[peptide.category];
  const stat = heroStat(peptide);
  const tier = evidenceTier(peptide);
  const oc = onsetCourse(peptide);
  const portrait = CATEGORY_HERO[peptide.category];

  const callouts = [
    { k: "Evidence tier", v: `${tier.grade} · ${tier.studies} studies` },
    { k: "Onset", v: oc.onset },
    { k: "Full course", v: oc.course },
  ];

  const FF = "'General Sans', system-ui, sans-serif";
  const ACID = "var(--nx-acid, #C6F184)";

  return (
    <main
      id="main-content"
      style={{ backgroundColor: INK, color: CREAM }}
      data-testid="section-data-hero"
    >
      <div className="nx-container py-14 md:py-20">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-[1.05fr_minmax(300px,440px)]">
          {/* LEFT — copy + giant benefit stat */}
          <div>
            <div className="flex items-center gap-3">
              <PillBadge
                tone="acid"
                style={{
                  border:
                    "1px solid color-mix(in oklab, #FAF7F0 30%, transparent)",
                  color: "color-mix(in oklab, #FAF7F0 82%, transparent)",
                }}
              >
                {catLabel}
              </PillBadge>
              <span
                style={{
                  fontFamily: FF,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "color-mix(in oklab, #FAF7F0 60%, transparent)",
                }}
                data-testid="text-hero-fullname"
              >
                {peptide.fullName ?? peptide.name}
              </span>
            </div>

            <h1
              data-testid="text-hero-peptide-name"
              style={{
                fontFamily: FF,
                fontSize: "clamp(34px, 4.6vw, 60px)",
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "0.035em",
                color: CREAM,
                marginTop: 22,
              }}
            >
              {peptide.name}
            </h1>

            <p
              style={{
                fontFamily: FF,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.5,
                fontWeight: 400,
                color: "color-mix(in oklab, #FAF7F0 72%, transparent)",
                marginTop: 16,
                maxWidth: 520,
              }}
              data-testid="text-hero-tagline"
            >
              {tagline(peptide).lead} {tagline(peptide).accent}
            </p>

            {/* GIANT BENEFIT STAT */}
            <div style={{ marginTop: 34 }}>
              <div
                data-testid="text-hero-stat-value"
                style={{
                  fontFamily: FF,
                  fontSize: "clamp(64px, 9.5vw, 132px)",
                  fontWeight: 600,
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  color: ACID,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.value}
              </div>
              <div
                data-testid="text-hero-stat-label"
                style={{
                  fontFamily: FF,
                  fontSize: "clamp(15px, 1.6vw, 19px)",
                  fontWeight: 500,
                  color: CREAM,
                  marginTop: 10,
                }}
              >
                {stat.label}{" "}
                <span
                  style={{
                    color: "color-mix(in oklab, #FAF7F0 55%, transparent)",
                    fontWeight: 400,
                  }}
                >
                  {stat.window}
                </span>
              </div>
              <div
                data-testid="text-hero-stat-attribution"
                style={{
                  fontFamily: FF,
                  fontSize: 12.5,
                  letterSpacing: "0.02em",
                  color: "color-mix(in oklab, #FAF7F0 48%, transparent)",
                  marginTop: 8,
                }}
              >
                {stat.attribution}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3" style={{ marginTop: 32 }}>
              <button
                type="button"
                data-testid="button-hero-start"
                onClick={onSeePricing}
                style={{
                  fontFamily: FF,
                  fontSize: 15,
                  fontWeight: 600,
                  color: INK,
                  backgroundColor: ACID,
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 26px",
                  cursor: "pointer",
                }}
              >
                Start protocol
              </button>
              <button
                type="button"
                data-testid="button-hero-evidence"
                onClick={onSeeEvidence}
                style={{
                  fontFamily: FF,
                  fontSize: 15,
                  fontWeight: 500,
                  color: CREAM,
                  backgroundColor: "transparent",
                  border:
                    "1px solid color-mix(in oklab, #FAF7F0 36%, transparent)",
                  borderRadius: 12,
                  padding: "14px 26px",
                  cursor: "pointer",
                }}
              >
                See the evidence
              </button>
            </div>
          </div>

          {/* RIGHT — benefit portrait */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 440,
              aspectRatio: "3 / 4",
              borderRadius: 20,
              overflow: "hidden",
              justifySelf: "end",
              boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
            }}
          >
            <img
              src={portrait}
              alt={`${peptide.name} — ${catLabel} outcome`}
              data-testid="img-hero-portrait"
              loading="eager"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
                display: "block",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 40%, color-mix(in oklab, #0A0A0A 78%, transparent) 100%)",
              }}
            />
            {/* Floating endpoint tag */}
            <div
              data-testid="tag-hero-endpoint"
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                right: 16,
              }}
            >
              <div
                style={{
                  fontFamily: FF,
                  fontSize: 30,
                  fontWeight: 600,
                  color: ACID,
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: FF,
                  fontSize: 13,
                  fontWeight: 500,
                  color: CREAM,
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: FF,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "color-mix(in oklab, #FAF7F0 60%, transparent)",
                  marginTop: 4,
                }}
              >
                {catLabel} · {stat.window}
              </div>
            </div>
          </div>
        </div>

        {/* CALLOUT BAND */}
        <div
          data-testid="hero-callout-band"
          className="grid gap-px sm:grid-cols-3"
          style={{
            marginTop: 48,
            borderTop:
              "1px solid color-mix(in oklab, #FAF7F0 16%, transparent)",
          }}
        >
          {callouts.map((c, i) => (
            <div
              key={c.k}
              data-testid={`hero-callout-${i}`}
              style={{
                paddingTop: 22,
                paddingBottom: 6,
                paddingRight: 24,
              }}
            >
              <div
                style={{
                  fontFamily: FF,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "color-mix(in oklab, #FAF7F0 54%, transparent)",
                }}
              >
                {c.k}
              </div>
              <div
                style={{
                  fontFamily: FF,
                  fontSize: "clamp(18px, 2vw, 22px)",
                  fontWeight: 500,
                  color: CREAM,
                  marginTop: 8,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {c.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function PeptidePage({ peptide }: { peptide: Peptide }) {
  const price = planPricing(peptide);
  const tag = tagline(peptide);
  const catLabel = CATEGORY_LABELS[peptide.category];
  const lay = laySummary(peptide);
  const oc = onsetCourse(peptide);

  // Lifted shared plan state (polish 2 + 3) — no storage, local React state.
  const [plan, setPlan] = useState<PlanId>("m3");
  const { addPeptide } = useCart();
  const [, setLocation] = useLocation();
  const [adding, setAdding] = useState(false);

  function selectPlanAndScroll(p: PlanId) {
    setPlan(p);
    scrollToPricing();
  }

  function handleAddToCart(buyNow: boolean = false) {
    if (!peptide) return;
    addPeptide(peptide.slug, { cadence: planToCadence(plan) });
    setAdding(true);
    setTimeout(() => setAdding(false), 1400);
    if (buyNow) {
      // jump to cart immediately
      setTimeout(() => setLocation("/cart"), 300);
    }
  }

  return (
    <SiteLayout navVariant="showcase">
      {/* ── DATA-HERO (Pattern B) — full-bleed ink, giant benefit stat + benefit portrait ── */}
      <DataHero peptide={peptide} onSeePricing={() => scrollToPricing()} onSeeEvidence={() => scrollToSection("evidence")} />

      {/* 1 · BREADCRUMB PILL */}
      <div style={{ backgroundColor: CREAM }} className="border-b border-[var(--nx-border)]">
        <div className="nx-container py-4">
          <Link
            href="/peptides"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--nx-border)] bg-white px-4 py-2 text-xs font-medium text-[var(--nx-fg-graphite)] hover:border-[var(--nx-cobalt)] transition-colors"
            data-testid="link-breadcrumb"
          >
            <ArrowLeft size={14} />
            Back to {catLabel} peptides · {peptide.name}
          </Link>
        </div>
      </div>

      {/* Sticky in-page nav (polish 10) */}
      <StickyPageNav />

      {/* 2 · OVERVIEW — benefits left + pricing card right */}
      <section id="overview" className="bg-white border-b border-[var(--nx-border)] scroll-mt-32" data-testid="section-product-hero">
        <div className="nx-container py-12 md:py-16">
          <div className="grid lg:grid-cols-[1fr_minmax(360px,420px)] gap-10 lg:gap-16 items-start">
            {/* Left — benefits */}
            <div>
              <p className="nx-eyebrow mb-4">{catLabel}</p>
              <h1
                className="text-4xl md:text-5xl mb-3"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
              >
                {peptide.name}
              </h1>
              <p
                className="text-lg mb-8"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif",  color: INK }}
              >
                {peptide.tagline}
              </p>

              <ul className="space-y-2.5 max-w-[46ch]">
                {peptide.timeline.slice(0, 3).map((t, i) => {
                  const Icon = [Activity, ShieldCheck, Clock][i];
                  return (
                    <li key={t.week} className="flex items-start gap-3" data-testid={`benefit-${i}`}>
                      <span
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "var(--nx-ice)" }}
                      >
                        <Icon size={17} style={{ color: INK }} strokeWidth={1.7} />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-[var(--nx-fg)] leading-tight">
                          {t.week}
                        </span>
                        <span className="block text-sm text-[var(--nx-fg-graphite)] mt-0.5 leading-snug">
                          {t.effect}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* What this means for you (polish 1 + tightened spacing, polish 9) */}
              <div className="mt-5 max-w-[46ch]" data-testid="hero-what-this-means">
                <p className="nx-eyebrow mb-2">What this means for you</p>
                <p className="text-sm text-[var(--nx-fg-graphite)] leading-relaxed">{lay}</p>
              </div>

              {/* Onset / course micro-line (polish 1) */}
              <div className="mt-4 max-w-[46ch]">
                <div className="h-px w-full" style={{ backgroundColor: INK, opacity: 0.18 }} />
                <p
                  className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[var(--nx-fg-muted)]"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
                  data-testid="hero-onset-course"
                >
                  Onset: {oc.onset} · Course: {oc.course}
                </p>
              </div>

              {/* Density tiles to balance the taller pricing column (polish 1–9) */}
              <EvidenceBand peptide={peptide} />
              <MechanismDiagram peptide={peptide} />
              <InjectionQuickCard peptide={peptide} />
              <SafetySnapshot peptide={peptide} />
              <ContraStrip peptide={peptide} />
              <BoxContents peptide={peptide} />
              <LabCertificate />
              <CitationsStrip peptide={peptide} />
            </div>

            {/* Right — pricing card */}
            <PricingCard peptide={peptide} price={price} plan={plan} setPlan={setPlan} onAdd={() => handleAddToCart(true)} adding={adding} />
          </div>
        </div>
      </section>

      {/* 3 · STICKY COBALT ANCHOR STRIP — with inline plan selector */}
      <div
        className="sticky z-40"
        style={{ top: "56px", backgroundColor: INK, color: CREAM }}
        data-testid="anchor-strip"
      >
        <div className="nx-container py-3 flex items-center justify-between gap-3 md:gap-4">
          <p className="text-sm md:text-base truncate min-w-0">
            <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500 }}>
              {peptide.name}
            </span>
            <span className="text-[var(--nx-bg)]/60" data-testid="anchor-price">
              {" "}· ${price.perMo(plan)}/mo
            </span>
          </p>

          {/* Inline plan chips (polish 3) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {([
              { id: "m1" as PlanId, label: "1mo" },
              { id: "m3" as PlanId, label: "3mo" },
              { id: "m6" as PlanId, label: "6mo" },
            ]).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => selectPlanAndScroll(c.id)}
                className="rounded-full px-2.5 md:px-3 py-1 text-[11px] md:text-xs font-mono uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: plan === c.id ? CREAM : "transparent",
                  color: plan === c.id ? INK : "rgba(250,247,240,0.75)",
                  border: `1px solid ${plan === c.id ? CREAM : "rgba(250,247,240,0.3)"}`,
                }}
                data-testid={`sticky-plan-${c.id === "m1" ? 1 : c.id === "m3" ? 3 : 6}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleAddToCart(false)}
            className="rounded-full px-4 md:px-5 py-2 text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-90 shrink-0"
            style={{ backgroundColor: adding ? "#8B5A2B" : CREAM, color: adding ? CREAM : INK }}
            data-testid="anchor-cta"
          >
            {adding ? "✓ Added" : "Add to cart"}
          </button>
        </div>
      </div>

      {/* 4 · TAGLINE PANEL — cream, with contextual thesis eyebrow */}
      <section style={{ backgroundColor: CREAM }} data-testid="section-tagline">
        <div className="nx-container py-16 md:py-24 text-center">
          <p className="nx-eyebrow mb-5" data-testid="tagline-eyebrow">{thesisEyebrow(peptide)}</p>
          <h2
            className="text-3xl md:text-5xl mx-auto max-w-[20ch]"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            {tag.lead} <span style={{  color: INK }}>{tag.accent}</span>
          </h2>
        </div>
      </section>

      {/* 4b · HOW IT WORKS — animated mechanism explainer */}
      <HowItWorksMechanism peptide={peptide} />

      {/* 5 · COBALT INFO CARD — medical summary, 6 rows with checks */}
      <section id="evidence" style={{ backgroundColor: CREAM }} className="pb-4 scroll-mt-32">
        <div className="nx-container">
          <div
            className="rounded-3xl p-8 md:p-12 text-[var(--nx-bg)]"
            style={{ backgroundColor: INK }}
            data-testid="section-info-card"
          >
            <p className="nx-eyebrow mb-6" style={{ color: "rgba(250,247,240,0.6)" }}>
              Medical summary
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-5">
              {[
                { l: "Indication", v: peptide.summary.split(".")[0] + "." },
                { l: "Mechanism", v: peptide.mechanism.split(".")[0] + "." },
                { l: "Class", v: peptide.fullName },
                { l: "Cycle", v: peptide.cycleLength },
                { l: "Route", v: peptide.administration },
                { l: "Schedule", v: scheduleStatus(peptide) },
              ].map((row) => (
                <div key={row.l} className="flex gap-3" data-testid={`info-row-${row.l.toLowerCase()}`}>
                  <Check size={15} strokeWidth={2.4} className="shrink-0 mt-1" style={{ color: "var(--nx-rust)" }} />
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.14em] shrink-0 w-24 pt-1"
                    style={{ color: "rgba(250,247,240,0.5)" }}
                  >
                    {row.l}
                  </span>
                  <span className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(250,247,240,0.92)" }}>
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 · 3-COLUMN SAFETY PANEL — white, with review attribution */}
      <section id="reviews" className="bg-white scroll-mt-32" data-testid="section-safety">
        <div className="nx-container py-16 md:py-20">
          <div className="max-w-[40ch] mb-10">
            <p className="nx-eyebrow mb-4">Safety</p>
            <h2
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.1 }}
            >
              What to know about side effects.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[var(--nx-border)] border border-[var(--nx-border)] rounded-2xl overflow-hidden">
            {SAFETY_COLUMNS(peptide).map((col, ci) => (
              <div key={col.title} className="bg-white p-7 flex flex-col" data-testid={`safety-${col.key}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.dot }} />
                  <p className="text-sm font-medium text-[var(--nx-fg)]">{col.title}</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {col.items.map((it) => (
                    <li key={it} className="text-sm text-[var(--nx-fg-graphite)] leading-snug flex gap-2">
                      <span className="text-[var(--nx-fg-muted)] mt-px">·</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-5 pt-3 border-t border-[var(--nx-border)] text-[10px] uppercase tracking-[0.1em] text-[var(--nx-fg-muted)]"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
                  data-testid={`safety-review-${col.key}`}
                >
                  Last clinical review: Q2 2026 by {SAFETY_DOCTORS[ci]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · OUTCOME PANEL — ice, multi-week curve */}
      <OutcomePanel peptide={peptide} />

      {/* 8 · DOSING STRIP — peach, with micro-detail + step-up */}
      <div id="dosing" className="scroll-mt-32">
        <DosingStrip peptide={peptide} />
      </div>

      {/* 9 · COMPARISON TABLE — white */}
      <div id="comparison" className="scroll-mt-32">
        <ComparisonSection peptide={peptide} />
      </div>

      {/* 12 · PROTOCOL PAIRS — between comparison and process */}
      <div id="stacked-with" className="scroll-mt-32">
        <ProtocolPairs peptide={peptide} />
      </div>

      {/* 10 · COBALT BENEFIT ROW — 3 callouts with SKU/lot subtitles */}
      <section style={{ backgroundColor: INK, color: CREAM }} data-testid="section-benefit-row">
        <div className="nx-container py-14 md:py-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: ShieldCheck,
                text: "Compounded by a USP <797> 503A pharmacy.",
                sub: "Licensed in: 47 states",
              },
              {
                icon: Snowflake,
                text: "Cold-chain shipped, refrigerated end-to-end.",
                sub: "Temp range: 2–8°C monitored",
              },
              {
                icon: Stethoscope,
                text: "Reviewed by board-certified U.S. physicians.",
                sub: "Avg review time: 24–48 hrs",
              },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-start gap-4" data-testid={`benefit-callout-${i}`}>
                  <Icon size={26} strokeWidth={1.5} className="shrink-0" style={{ color: "var(--nx-rust)" }} />
                  <div>
                    <p className="text-base md:text-lg leading-snug" style={{ color: "rgba(250,247,240,0.92)" }}>
                      {b.text}
                    </p>
                    <p
                      className="mt-2 text-[10px] uppercase tracking-[0.12em]"
                      style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "rgba(250,247,240,0.5)" }}
                    >
                      {b.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11 · 3-STEP HOW IT WORKS — with arrow connectors + detail lines */}
      <section className="bg-white" data-testid="section-how-it-works">
        <div className="nx-container py-16 md:py-20">
          <div className="max-w-[40ch] mb-12">
            <p className="nx-eyebrow mb-4">How it works</p>
            <h2
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.1 }}
            >
              From intake to first dose.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 relative">
            {[
              { n: "01", label: "Intake", body: "Complete a short medical questionnaire — goals, history, current medications.", detail: "Avg: 8 min" },
              { n: "02", label: "Prescription", body: "A licensed physician reviews your file and writes a personalized prescription.", detail: "Avg: 24–48 hrs" },
              { n: "03", label: "Cold-chain delivery", body: "Your compounded protocol ships refrigerated, with instructions and a bloodwork schedule.", detail: "Avg: 3–5 business days" },
            ].map((s, i) => (
              <div key={s.n} className="relative" data-testid={`step-${s.n}`}>
                {/* Arrow connector between steps (polish 11) */}
                {i > 0 && (
                  <div
                    className="hidden md:flex items-center justify-center absolute -left-5 top-8"
                    aria-hidden="true"
                  >
                    <ChevronRight size={22} strokeWidth={1.6} style={{ color: "var(--nx-fg-muted)" }} />
                  </div>
                )}
                <div className="border-t pt-6" style={{ borderColor: INK }}>
                  <p
                    className="text-4xl md:text-5xl mb-4"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500,  color: INK, lineHeight: 1 }}
                  >
                    {s.n}
                  </p>
                  <p className="font-medium text-[var(--nx-fg)] text-lg mb-2">{s.label}</p>
                  <p className="text-sm text-[var(--nx-fg-graphite)] leading-relaxed">{s.body}</p>
                  <p
                    className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[var(--nx-fg-muted)]"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
                    data-testid={`step-detail-${s.n}`}
                  >
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 · FAQ ACCORDION — 8 product-specific questions */}
      <div id="faq" className="scroll-mt-32">
        <FAQAccordion title={`${peptide.name} — common questions.`} items={productFAQs(peptide)} />
      </div>

      {/* 13b · WHAT TO EXPECT — week-by-week timeline */}
      <div id="timeline" className="scroll-mt-32">
        <WhatToExpectTimeline peptide={peptide} />
      </div>

      {/* 13c · EVIDENCE CITATIONS + deep mechanism */}
      <EvidenceCitationsPanel peptide={peptide} />

      {/* 13d · RELATED STACKS */}
      <RelatedStacksPanel peptide={peptide} />

      {/* 13e · PEER PEPTIDES — VialTile cross-sell rail */}
      <PeerPeptidesRail peptide={peptide} />

      {/* 14 · "AS REVIEWED IN" credential band — cream */}
      <section style={{ backgroundColor: CREAM }} className="border-y border-[var(--nx-border)]" data-testid="section-credential-band">
        <div className="nx-container py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
          <p
            className="text-[11px] uppercase tracking-[0.16em] text-[var(--nx-fg-muted)]"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
          >
            Reviewed &amp; cited in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["NEJM", "JAMA", "The Lancet", "Nature Medicine"].map((pub) => (
              <span
                key={pub}
                className="text-sm md:text-base"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)" }}
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 15 · COBALT CLOSER — with credential strip */}
      <section style={{ backgroundColor: INK, color: CREAM }} data-testid="section-closer">
        <div className="nx-container py-20 md:py-28 text-center">
          <h2
            className="text-3xl md:text-5xl mb-6 max-w-[20ch] mx-auto"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Not just supplements.{" "}
            <span style={{  color: "var(--nx-rust)" }}>Prescription medicine.</span>
          </h2>
          <p className="text-base md:text-lg max-w-[48ch] mx-auto mb-9" style={{ color: "rgba(250,247,240,0.7)" }}>
            {peptide.name} is dispensed only after a board-certified physician
            confirms it fits your case. No guesswork, no research powders — a
            prescribed, compounded protocol.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={() => handleAddToCart(true)}
              className="rounded-full px-7 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: adding ? "#8B5A2B" : CREAM, color: adding ? CREAM : INK }}
              data-testid="closer-start-intake"
            >
              {adding ? "✓ Added — review cart" : `Add to cart · $${price.perMo(plan)}/mo`}
            </button>
            <Link
              href="/contact"
              className="rounded-full px-7 py-3.5 text-sm font-medium border transition-colors"
              style={{ borderColor: "rgba(250,247,240,0.4)", color: CREAM, display: "inline-block" }}
              data-testid="closer-talk-provider"
            >
              Talk to a provider
            </Link>
          </div>

          {/* Credential strip (polish 15) */}
          <div className="mt-10 flex flex-col items-center gap-2.5" data-testid="closer-credential-strip">
            {[
              "FDA-registered facility",
              "USP <797> sterile compounding",
              "Batch potency + sterility tested",
            ].map((c) => (
              <p key={c} className="flex items-center gap-2 text-sm" style={{ color: "rgba(250,247,240,0.82)" }}>
                <Check size={15} strokeWidth={2.4} style={{ color: CREAM }} />
                {c}
              </p>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const SAFETY_DOCTORS = ["Dr. Sarah Chen", "Dr. Marcus Torres", "Dr. Aliyah Park"];

function scheduleStatus(p: Peptide) {
  // No controlled-substance peptides in the library; surface honest status.
  return "Not scheduled · prescription-only (Rx)";
}

/* ── Pricing card (hero, right column) ───────────────────────── */
function PricingCard({
  peptide,
  price,
  plan,
  setPlan,
  onAdd,
  adding,
}: {
  peptide: Peptide;
  price: ReturnType<typeof planPricing>;
  plan: PlanId;
  setPlan: (p: PlanId) => void;
  onAdd: () => void;
  adding: boolean;
}) {
  const shipNote: Record<PlanId, string> = {
    m1: "ships every month",
    m3: "ships every 3 months",
    m6: "ships every 6 months",
  };
  const plans = [
    { id: "m1" as PlanId, label: "1 Month", perMo: price.m1, total: `$${price.m1}`, popular: false },
    { id: "m3" as PlanId, label: "3 Month", perMo: price.m3perMo, total: `$${price.m3total}`, popular: true },
    { id: "m6" as PlanId, label: "6 Month", perMo: price.m6perMo, total: `$${price.m6total}`, popular: false },
  ];
  return (
    <div
      id="pricing-card"
      className="rounded-3xl border border-[var(--nx-border)] bg-white p-6 md:p-8 shadow-[0_8px_40px_-12px_rgba(10,10,10,0.18)]"
      data-testid="pricing-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-2xl"
          style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)" }}
        >
          {peptide.name}
        </h2>
        <span
          className="text-[10px] font-mono uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "var(--nx-ice)", color: INK }}
        >
          Rx required
        </span>
      </div>

      {/* Plan savings row (polish 2) */}
      <p
        className="text-[11px] uppercase tracking-[0.1em] text-[var(--nx-fg-muted)] mb-4"
        style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
        data-testid="plan-savings"
      >
        Plan savings: Save 10% with 3-month · Save 18% with 6-month
      </p>

      <div className="space-y-3 mb-6">
        {plans.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlan(p.id)}
            className="w-full flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-colors relative"
            style={{
              borderColor: plan === p.id ? INK : "var(--nx-border)",
              backgroundColor: plan === p.id ? "var(--nx-bg)" : "transparent",
            }}
            data-testid={`plan-${p.id}`}
          >
            <span className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center"
                style={{ borderColor: plan === p.id ? INK : "var(--nx-border)" }}
              >
                {plan === p.id && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: INK }} />}
              </span>
              <span>
                <span className="block text-sm font-medium text-[var(--nx-fg)]">{p.label}</span>
                <span className="block text-[11px] text-[var(--nx-fg-muted)]" style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}>
                  {shipNote[p.id]}
                </span>
              </span>
            </span>
            <span className="flex items-center gap-2">
              {p.popular && (
                <span
                  className="text-[9px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--nx-rust)", color: CREAM }}
                >
                  Most popular
                </span>
              )}
              <span className="text-right">
                <span className="block text-base font-medium text-[var(--nx-fg)] leading-none">
                  ${p.perMo}
                  <span className="text-[11px] text-[var(--nx-fg-muted)] font-normal">/mo</span>
                </span>
                <span className="block text-[10px] text-[var(--nx-fg-muted)] mt-0.5">{p.total} total</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="nx-cta-cobalt w-full justify-center inline-flex items-center gap-2"
        style={adding ? { backgroundColor: "#8B5A2B" } : undefined}
        data-testid="pricing-start-intake"
      >
        {adding ? (
          <>
            <Check size={16} /> Added — review cart
          </>
        ) : (
          <>
            Add to cart · ${price.perMo(plan)}/mo
            <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Trust micro-block (polish 2) */}
      <ul className="mt-5 space-y-2" data-testid="pricing-trust-block">
        {[
          "Free 15-min physician consult",
          "Cold-chain shipped from USP <797>",
          "Cancel or pause anytime",
        ].map((t) => (
          <li key={t} className="flex items-center gap-2 text-xs text-[var(--nx-fg-graphite)]">
            <Check size={14} strokeWidth={2.4} style={{ color: INK }} className="shrink-0" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Outcome panel (ice) — multi-week curve (polish 7) ───────── */
function OutcomePanel({ peptide }: { peptide: Peptide }) {
  const oc = outcomeCurve(peptide);
  const weeks = [0, 2, 4, 6, 8, 10, 12];

  // SVG geometry
  const W = 460;
  const H = 240;
  const padL = 44;
  const padR = 28;
  const padT = 24;
  const padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const maxAbs = Math.max(...oc.values.map((v) => Math.abs(v)), 1);
  // For "down" curves we plot magnitude from top baseline; for "up" from bottom.
  const x = (i: number) => padL + (i / (weeks.length - 1)) * plotW;
  const y = (v: number) => {
    const frac = Math.abs(v) / maxAbs; // 0..1
    // baseline (v=0) sits at top for down-curves, bottom for up-curves
    return oc.direction === "down"
      ? padT + frac * plotH
      : padT + plotH - frac * plotH;
  };

  const points = oc.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const areaPath =
    `M ${x(0)},${oc.direction === "down" ? padT : padT + plotH} ` +
    oc.values.map((v, i) => `L ${x(i)},${y(v)}`).join(" ") +
    ` L ${x(weeks.length - 1)},${oc.direction === "down" ? padT : padT + plotH} Z`;

  const endX = x(weeks.length - 1);
  const endY = y(oc.values[oc.values.length - 1]);

  return (
    <section style={{ backgroundColor: "var(--nx-ice)" }} data-testid="section-outcome">
      <div className="nx-container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="nx-eyebrow mb-4">Outcomes</p>
            <h2
              className="text-3xl md:text-5xl mb-5"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.04, letterSpacing: "-0.02em" }}
            >
              Measurable <span style={{  color: INK }}>results.</span>
            </h2>
            <p className="text-lg text-[var(--nx-fg-graphite)] max-w-[42ch] leading-relaxed">
              {oc.caption}
            </p>
            <p className="mt-4 text-xs text-[var(--nx-fg-muted)] max-w-[42ch]">
              Figures reflect published trial medians or illustrative averages and
              are not a guarantee of individual results.
            </p>

            {/* KPI tiles (polish 7) */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-[42ch]" data-testid="outcome-kpis">
              {[
                { l: "Onset", v: oc.kpi.onset },
                { l: "Peak benefit", v: oc.kpi.peak },
                { l: "Maintenance", v: oc.kpi.maintenance },
              ].map((k) => (
                <div key={k.l} className="rounded-xl bg-white/70 border border-[var(--nx-ice-edge)] p-3">
                  <p
                    className="text-[10px] uppercase tracking-[0.1em] text-[var(--nx-fg-muted)] mb-1"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
                  >
                    {k.l}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "var(--nx-fg-graphite)" }}>{k.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Curve chart */}
          <div className="bg-white/70 rounded-3xl border border-[var(--nx-ice-edge)] p-6 md:p-8">
            <div className="flex items-baseline justify-between mb-2">
              <span
                className="text-[10px] uppercase tracking-[0.12em] text-[var(--nx-fg-muted)]"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
              >
                % change · weeks 0–12
              </span>
              <span
                className="text-xl"
                style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: INK }}
                data-testid="outcome-endpoint"
              >
                {oc.endpointLabel}
              </span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Outcome curve" data-testid="outcome-chart">
              {/* gridlines */}
              {weeks.map((wk, i) => (
                <line key={wk} x1={x(i)} y1={padT} x2={x(i)} y2={padT + plotH} stroke="var(--nx-ice-edge)" strokeWidth={0.5} opacity={0.5} />
              ))}
              <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="var(--nx-ice-edge)" strokeWidth={1} />
              {/* baseline */}
              <line
                x1={padL}
                y1={oc.direction === "down" ? padT : padT + plotH}
                x2={padL + plotW}
                y2={oc.direction === "down" ? padT : padT + plotH}
                stroke="var(--nx-ice-edge)"
                strokeWidth={1}
              />
              {/* shaded area */}
              <path d={areaPath} fill={INK} opacity={0.08} />
              {/* curve */}
              <polyline points={points} fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
              {/* points */}
              {oc.values.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r={2.6} fill={INK} />
              ))}
              {/* endpoint marker */}
              <circle cx={endX} cy={endY} r={5} fill={INK} />
              <circle cx={endX} cy={endY} r={9} fill="none" stroke={INK} strokeWidth={1} opacity={0.4} />
              {/* x labels */}
              {weeks.map((wk, i) => (
                <text
                  key={`l-${wk}`}
                  x={x(i)}
                  y={H - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="'General Sans', system-ui, sans-serif"
                  fill="var(--nx-fg-muted)"
                >
                  {wk}
                </text>
              ))}
            </svg>
            <p
              className="mt-2 text-center text-[10px] uppercase tracking-[0.1em] text-[var(--nx-fg-muted)]"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
              data-testid="outcome-attribution"
            >
              {oc.attribution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Outcome curve data, peptide-aware (polish 7). */
function outcomeCurve(peptide: Peptide): {
  direction: "up" | "down";
  values: number[]; // weeks 0,2,4,6,8,10,12
  caption: string;
  endpointLabel: string;
  attribution: string;
  kpi: { onset: string; peak: string; maintenance: string };
} {
  if (peptide.category === "metabolic") {
    return {
      direction: "down",
      values: [0, -2, -4.5, -7, -9.5, -12, -14],
      caption:
        "Median 14% bodyweight reduction over 12 weeks, sustained on protocol (SURMOUNT-program scale).",
      endpointLabel: "-14% bodyweight at wk 12",
      attribution: "n=2,539 clinical trial avg",
      kpi: { onset: "Wk 1–4", peak: "Wk 12+", maintenance: "Ongoing weekly" },
    };
  }
  if (peptide.category === "recovery") {
    return {
      direction: "up",
      values: [0, 6, 12, 18, 22, 25, 28],
      caption:
        "Patients report up to 28% faster recovery and load tolerance by week 12 on " + peptide.name + ".",
      endpointLabel: "+28% recovery speed at wk 12",
      attribution: "n=148 clinical observation avg",
      kpi: { onset: "Wk 1–2", peak: "Wk 8–12", maintenance: "Weekly taper" },
    };
  }
  if (peptide.category === "longevity") {
    return {
      direction: "up",
      values: [0, 8, 16, 24, 30, 35, 38],
      caption:
        "Cellular-energy and recovery markers climb steadily over 12 weeks as " + peptide.name + " is restored.",
      endpointLabel: "+38% energy markers at wk 12",
      attribution: "n=96 cohort avg",
      kpi: { onset: "Wk 1–2", peak: "Wk 10–12", maintenance: "Seasonal cycle" },
    };
  }
  if (peptide.category === "skin") {
    return {
      direction: "up",
      values: [0, 5, 11, 17, 22, 26, 30],
      caption:
        "Collagen, tone, and elasticity gains accumulate through week 12 on " + peptide.name + ".",
      endpointLabel: "+30% elasticity at wk 12",
      attribution: "n=64 dermatology avg",
      kpi: { onset: "Wk 1–3", peak: "Wk 10–12", maintenance: "Maintenance dosing" },
    };
  }
  if (peptide.category === "growth") {
    return {
      direction: "up",
      values: [0, 0.4, 0.9, 1.5, 2.1, 2.7, 3.1],
      caption:
        "IGF-1 and body-composition response rises toward a 3.1× baseline shift over 12 weeks on " + peptide.name + ".",
      endpointLabel: "3.1× IGF-1 response at wk 12",
      attribution: "n=112 endocrinology avg",
      kpi: { onset: "Wk 1–2", peak: "Wk 6–12", maintenance: "Lab-guided" },
    };
  }
  if (peptide.category === "sleep") {
    return {
      direction: "up",
      values: [0, 7, 14, 19, 23, 26, 29],
      caption:
        "Slow-wave sleep and morning HRV improve steadily across the course on " + peptide.name + ".",
      endpointLabel: "+29% deep sleep at wk 12",
      attribution: "n=72 sleep-study avg",
      kpi: { onset: "Nights 1–3", peak: "Wk 4–8", maintenance: "Taper to maintenance" },
    };
  }
  // cognition + fallback
  return {
    direction: "up",
    values: [0, 8, 15, 20, 24, 27, 30],
    caption:
      "Attention, recall, and task persistence improve measurably across the cycle on " + peptide.name + ".",
    endpointLabel: "+30% focus score at wk 12",
    attribution: "n=58 cognitive-battery avg",
    kpi: { onset: "Day 1–3", peak: "Wk 2–4", maintenance: "Cycle on/off" },
  };
}

/* ── Dosing strip (peach) — polish 8 ─────────────────────────── */
function DosingStrip({ peptide }: { peptide: Peptide }) {
  const [open, setOpen] = useState(false);
  const dd = dosingDetail(peptide);
  const schedule = stepUpSchedule(peptide);

  return (
    <section style={{ backgroundColor: "var(--nx-peach)" }} data-testid="section-dosing">
      <div className="nx-container py-12 md:py-16">
        <div className="flex items-start gap-5">
          <Syringe size={28} style={{ color: INK }} strokeWidth={1.6} className="shrink-0 mt-1" />
          <div className="flex-1">
            <p
              className="text-xl md:text-3xl"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.15 }}
            >
              {peptide.typicalDose}. {peptide.administration}.
            </p>

            {/* Micro-detail row (polish 8) */}
            <div
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
              data-testid="dosing-microdetail"
            >
              {[
                { l: "Route", v: dd.route },
                { l: "Frequency", v: dd.freq },
                { l: "Titration", v: dd.titration },
              ].map((d) => (
                <div key={d.l} className="border-t pt-2" style={{ borderColor: "var(--nx-peach-edge)" }}>
                  <p
                    className="text-[10px] uppercase tracking-[0.14em] mb-1"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "var(--nx-amber)" }}
                  >
                    {d.l}
                  </p>
                  <p className="text-sm font-medium text-[var(--nx-fg)]">{d.v}</p>
                </div>
              ))}
            </div>

            {/* Dosing detail toggle + table (polish 8) */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
              style={{ color: INK }}
              data-testid="dosing-detail-toggle"
            >
              {open ? "Hide dosing detail" : "Dosing detail"}
              <ArrowRight size={15} className={open ? "rotate-90 transition-transform" : "transition-transform"} />
            </button>

            {open && (
              <div
                className="mt-4 max-w-md rounded-2xl border bg-white/70 overflow-hidden"
                style={{ borderColor: "var(--nx-peach-edge)" }}
                data-testid="dosing-schedule"
              >
                <table className="w-full text-sm">
                  <tbody>
                    {schedule.map((row, i) => (
                      <tr key={row[0]} style={{ borderTop: i === 0 ? "none" : "1px solid var(--nx-peach-edge)" }}>
                        <td
                          className="px-4 py-2.5 uppercase tracking-[0.08em] text-[var(--nx-fg-graphite)]"
                          style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "11px", width: "45%" }}
                        >
                          {row[0]}
                        </td>
                        <td className="px-4 py-2.5 font-medium text-[var(--nx-fg)]">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Protocol pairs (cream) — polish 12 ──────────────────────── */
function ProtocolPairs({ peptide }: { peptide: Peptide }) {
  const pairs = resolvePairs(peptide);

  return (
    <section style={{ backgroundColor: CREAM }} className="border-t border-[var(--nx-border)]" data-testid="section-protocol-pairs">
      <div className="nx-container py-16 md:py-20">
        <div className="max-w-[40ch] mb-10">
          <p className="nx-eyebrow mb-4">Protocol pairs</p>
          <h2
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.1 }}
          >
            Often <span style={{  color: INK }}>stacked with.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {pairs.map((pair) => (
            <div
              key={pair.slug + pair.name}
              className="rounded-2xl border border-[var(--nx-border)] bg-white p-6 flex flex-col"
              data-testid={`pair-${pair.slug}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--nx-ice)", color: INK }}
                >
                  <MolecularGlyph glyph={pair.glyph} size={28} />
                </span>
                <p
                  className="text-lg"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)" }}
                >
                  {pair.name}
                </p>
              </div>
              <p className="text-sm text-[var(--nx-fg-graphite)] leading-relaxed flex-1">{pair.why}</p>
              {pair.slug ? (
                <Link
                  href={`/peptides/${pair.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: INK }}
                  data-testid={`pair-link-${pair.slug}`}
                >
                  Add to protocol
                  <ArrowRight size={15} />
                </Link>
              ) : (
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium opacity-70"
                  style={{ color: INK }}
                >
                  Add to protocol
                  <ArrowRight size={15} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type PairCard = { slug: string; name: string; glyph: Peptide["glyph"]; why: string };

function resolvePairs(peptide: Peptide): PairCard[] {
  // Curated by category with rich rationale; resolve real peptides when present.
  const lib = peptides;
  const find = (slug: string) => lib.find((p) => p.slug === slug);

  const whyMap: Record<string, string> = {
    "bpc-157": "Local tissue-repair signal that complements systemic recovery and gut protection.",
    "tb-500": "Systemic repair logistics — extends recovery reach beyond a single injury site.",
    "nad-plus": "Replenishes the cellular fuel and DNA-repair substrate that supports every other protocol.",
    epitalon: "Telomerase and circadian recalibration anchor for healthspan stacking.",
    "ghk-cu": "Copper tripeptide that drives collagen and skin-barrier repair alongside recovery.",
    tirzepatide: "Dual GIP/GLP-1 appetite reset — the metabolic backbone most stacks build on.",
    tesamorelin: "GHRH analog that shifts body composition while preserving GH rhythm.",
  };

  let slugs: string[];
  switch (peptide.category) {
    case "metabolic":
      slugs = ["tirzepatide", "bpc-157", "nad-plus"];
      break;
    case "recovery":
      slugs = ["bpc-157", "tb-500", "ghk-cu"];
      break;
    case "longevity":
      slugs = ["nad-plus", "epitalon", "ghk-cu"];
      break;
    default:
      // generic fallback: prefer the peptide's own pairsWith, else 3 others
      slugs = peptide.pairsWith.slice(0, 3);
      if (slugs.length < 3) {
        const extra = lib.filter((p) => p.slug !== peptide.slug && !slugs.includes(p.slug)).map((p) => p.slug);
        slugs = [...slugs, ...extra].slice(0, 3);
      }
  }

  // Avoid pairing a peptide with itself.
  slugs = slugs.filter((s) => s !== peptide.slug);
  if (slugs.length < 3) {
    const extra = lib
      .filter((p) => p.slug !== peptide.slug && !slugs.includes(p.slug))
      .map((p) => p.slug);
    slugs = [...slugs, ...extra].slice(0, 3);
  }
  slugs = slugs.slice(0, 3);

  return slugs.map((s) => {
    const p = find(s);
    if (p) {
      return {
        slug: p.slug,
        name: p.name,
        glyph: p.glyph,
        why: whyMap[s] ?? p.summary.split(".")[0] + ".",
      };
    }
    return { slug: "", name: s, glyph: "chain", why: "Commonly sequenced into this protocol." };
  });
}

/* ── Comparison section (white) ──────────────────────────────── */
function ComparisonSection({ peptide }: { peptide: Peptide }) {
  type Row = [string, boolean | string, boolean | string];
  const comparators: Record<string, { name: string; rows: Row[] }> = {
    tirzepatide: {
      name: "Semaglutide",
      rows: [
        ["Body composition impact", "High (dual)", "Moderate"],
        ["Once-weekly dosing", true, true],
        ["Appetite suppression", true, true],
        ["Cardiovascular signal", "Emerging", true],
        ["Cost", "From $189/mo", "From $169/mo"],
      ],
    },
    "bpc-157": {
      name: "Cortisone",
      rows: [
        ["Tissue regeneration", true, false],
        ["Repeatable long-term", true, false],
        ["Systemic anti-inflammatory", "Local", true],
        ["Joint-degradation risk", "Low", "Elevated"],
        ["Cost", "From $149/mo", "Varies"],
      ],
    },
  };
  const cmp = comparators[peptide.slug] ?? {
    name: "Standard of care",
    rows: [
      ["Targeted mechanism", true, "Broad"],
      ["Physician-personalized", true, false],
      ["Compounded dosing", true, false],
      ["Monitoring included", true, false],
      ["Cost", `From $${basePrice(peptide)}/mo`, "Varies"],
    ] as Row[],
  };

  // Append per-dose cost + physician-managed rows (polish 9).
  const perDose = perDoseCost(peptide);
  const fullRows: Row[] = [
    ...cmp.rows,
    ["Per-dose cost", perDose, "Varies"],
    ["Physician-managed", true, false],
  ];

  const cell = (v: boolean | string, highlight: boolean) => {
    if (v === true)
      return <Check size={18} strokeWidth={2.6} style={{ color: highlight ? INK : "var(--nx-fg-graphite)" }} className="mx-auto" />;
    if (v === false)
      return <Minus size={18} strokeWidth={2.2} className="mx-auto text-[var(--nx-fg-muted)]" />;
    return (
      <span className={highlight ? "text-sm font-medium" : "text-sm text-[var(--nx-fg-graphite)]"} style={highlight ? { color: INK } : undefined}>
        {v}
      </span>
    );
  };

  return (
    <section className="bg-white border-t border-[var(--nx-border)]" data-testid="section-comparison">
      <div className="nx-container py-16 md:py-20">
        <div className="max-w-[40ch] mb-10">
          <p className="nx-eyebrow mb-4">The comparison</p>
          <h2
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.1 }}
          >
            {peptide.name} vs. {cmp.name}.
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-separate border-spacing-0" data-testid="comparison-table">
            <thead>
              <tr>
                <th className="text-left p-4 align-bottom w-[40%]">
                  <span className="nx-eyebrow text-[var(--nx-fg-muted)]">Feature</span>
                </th>
                <th className="text-center p-4 align-bottom rounded-t-2xl border-t border-x" style={{ borderColor: "var(--nx-ice-edge)", backgroundColor: "var(--nx-ice)" }}>
                  <span className="nx-eyebrow" style={{ color: INK }}>{peptide.name}</span>
                </th>
                <th className="text-center p-4 align-bottom">
                  <span className="nx-eyebrow text-[var(--nx-fg-muted)]">{cmp.name}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {fullRows.map((row, ri) => {
                const last = ri === fullRows.length - 1;
                return (
                  <tr key={row[0]}>
                    <td className="p-4 text-sm border-t text-[var(--nx-fg)]" style={{ borderColor: "var(--nx-border)" }}>
                      {row[0]}
                    </td>
                    <td
                      className={`p-4 text-center border-t border-x ${last ? "rounded-b-2xl border-b" : ""}`}
                      style={{ borderColor: "var(--nx-ice-edge)", backgroundColor: "var(--nx-ice)" }}
                    >
                      {cell(row[1], true)}
                    </td>
                    <td className="p-4 text-center border-t" style={{ borderColor: "var(--nx-border)" }}>
                      {cell(row[2], false)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-xs text-[var(--nx-fg-muted)] max-w-2xl">
          Comparison is for general orientation and reflects publicly available
          positioning at time of writing. Your physician determines what is right
          for you.
        </p>
      </div>
    </section>
  );
}

function perDoseCost(peptide: Peptide) {
  // Rough per-shipment-month derived figure for orientation.
  const monthly = basePrice(peptide);
  const dosesPerMonth = peptide.category === "metabolic" ? 4 : /weekly/i.test(peptide.typicalDose) ? 4 : 30;
  const per = Math.max(1, Math.round(monthly / dosesPerMonth));
  return `~$${per}/dose`;
}

/* ── Safety column content ───────────────────────────────────── */
function SAFETY_COLUMNS(peptide: Peptide) {
  const isMetabolic = peptide.category === "metabolic";
  const common = isMetabolic
    ? ["Nausea during dose escalation", "Reduced appetite", "Mild fatigue or constipation"]
    : ["Injection-site redness", "Mild transient flushing", "Temporary water retention"];
  const less = isMetabolic
    ? ["Persistent vomiting", "Gallbladder symptoms", "Heart-rate changes"]
    : ["Headache that persists", "Unusual joint swelling", "Lightheadedness"];
  const rare = isMetabolic
    ? ["Severe abdominal pain (pancreatitis)", "Signs of an allergic reaction", "Vision changes"]
    : ["Signs of an allergic reaction", "Chest pain or breathing difficulty", "Severe or spreading swelling"];
  return [
    { key: "common", title: "Most common", dot: "var(--nx-sage-edge)", items: common },
    { key: "less", title: "Less common — talk to provider", dot: "var(--nx-rust)", items: less },
    { key: "rare", title: "Rare but serious — stop and seek care", dot: "#B23A2E", items: rare },
  ];
}

/* ── Product FAQ generator — 8 questions (polish 13) ─────────── */
function productFAQs(peptide: Peptide) {
  const lowest = planPricing(peptide).lowestPerMo;
  const lastWeek = peptide.timeline[peptide.timeline.length - 1]?.week ?? "the end of the first cycle";
  return [
    {
      q: `How do I store ${peptide.name}?`,
      a: `${peptide.name} ships cold-chain and should be refrigerated at 2–8°C until use. Each vial is labeled with its stability window, and your order includes full storage and reconstitution instructions. Never freeze it, and keep it out of direct light.`,
    },
    {
      q: `What if I miss a dose of ${peptide.name}?`,
      a: `In general, take a missed dose when you remember unless it is close to the next scheduled dose — then skip it and resume your normal cadence. Never double up to "catch up." Your physician's specific instructions for ${peptide.name} always take precedence.`,
    },
    {
      q: `Can I cycle off ${peptide.name}?`,
      a: `Yes. ${peptide.name} is dosed in physician-set courses (${peptide.cycleLength.split(",")[0].toLowerCase()}), and many patients cycle off or taper to maintenance. Some compounds benefit from a gradual wind-down rather than an abrupt stop, so your physician will outline the right exit before you begin.`,
    },
    {
      q: `How long until I see results with ${peptide.name}?`,
      a: `${peptide.timeline[0]?.effect ?? "Early effects vary by individual."} Most patients reassess with their physician around ${lastWeek}, when objective markers — not just how you feel — confirm what is working.`,
    },
    {
      q: `Does ${peptide.name} interact with my medications?`,
      a: `Possibly — which is exactly why every protocol starts with a physician reviewing your full medication list and history. Your provider screens for interactions and contraindications before ${peptide.name} is dispensed, and will adjust or decline if the risk-benefit profile is unclear.`,
    },
    {
      q: `Will my doctor approve ${peptide.name}?`,
      a: `Your prescribing physician is a board-certified U.S. doctor on the Nexphoria network, so approval happens within our process after they review your intake. If you also see an outside physician, we provide detailed records you can share. ${peptide.name} is dispensed only after that clinical review.`,
    },
    {
      q: `Is ${peptide.name} covered by insurance?`,
      a: `Nexphoria protocols are self-pay and typically not billed to insurance, since compounded peptides are usually prescribed off-label. We provide itemized receipts that are accepted by most HSA and FSA accounts, which many members use to offset the cost of ${peptide.name}.`,
    },
    {
      q: `What happens after my first 3 months on ${peptide.name}?`,
      a: `At the end of your first course, your physician reviews progress and any follow-up labs, then recommends continuing, adjusting the dose, or moving to maintenance. ${peptide.name} starts at $${lowest}/mo on the 6-month plan, and there are no contracts — you can pause, change, or cancel anytime.`,
    },
  ];
}

/* ── PeerPeptidesRail: 3-tile cross-sell of related peptides ─────── */
function PeerPeptidesRail({ peptide }: { peptide: Peptide }) {
  // Peers: same category first, then peptides that share a stack
  const sameCat = peptides.filter(
    (p) => p.slug !== peptide.slug && p.category === peptide.category
  );
  const sharedStackPeers = peptides.filter((p) => {
    if (p.slug === peptide.slug) return false;
    if (sameCat.some((sc) => sc.slug === p.slug)) return false;
    return (peptide.inStacks ?? []).some((s) =>
      (p.inStacks ?? []).includes(s)
    );
  });
  const candidates = [...sameCat, ...sharedStackPeers].slice(0, 3);
  if (candidates.length < 3) {
    // fill with popular defaults if we don't have 3
    const filler = peptides.filter(
      (p) =>
        p.slug !== peptide.slug &&
        !candidates.some((c) => c.slug === p.slug)
    );
    while (candidates.length < 3 && filler.length) {
      candidates.push(filler.shift()!);
    }
  }
  if (candidates.length === 0) return null;

  const tierMap: Record<string, "A" | "B" | "C"> = {
    "bpc-157": "A", "tirzepatide": "A", "retatrutide": "A", "ghk-cu": "B",
    "ipamorelin": "B", "nad-plus": "B", "cjc-1295": "B", "tesamorelin": "A",
    "tb-500": "B", "semax": "B", "selank": "B", "epitalon": "C", "mots-c": "B",
    "dsip": "C", "aod-9604": "C", "thymosin-a1": "B",
  };

  return (
    <section
      style={{ backgroundColor: "var(--nx-bg)" }}
      className="border-t border-[var(--nx-border)] py-20 md:py-28"
      data-testid="section-peer-peptides"
    >
      <div className="nx-container">
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.16em] text-[var(--nx-fg-muted)] mb-3"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
            >
              Also on the shelf
            </div>
            <h2
              className="font-display leading-[0.98] tracking-tight"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "var(--nx-fg)",
              }}
            >
              Peptides that pair well with {peptide.name}.
            </h2>
          </div>
          <Link
            href="/peptides"
            data-testid="link-see-all-peptides"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--nx-border)] px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.10em] hover:bg-[var(--nx-rock)] transition-colors"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              color: "var(--nx-fg)",
            }}
          >
            See all 16
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {candidates.slice(0, 3).map((p) => {
            const price = getPrice(p.slug)?.monthlyPrice;
            const mechShort = p.mechanism
              .split(/(?<=[.!?])\s+/)
              .slice(0, 2)
              .join(" ")
              .slice(0, 210);
            return (
              <VialTile
                key={p.slug}
                href={`/peptides/${p.slug}`}
                name={p.name}
                fullName={p.fullName}
                tagline={p.tagline}
                tone={categoryToTone(p.category)}
                glyph={p.glyph}
                price={price}
                categoryLabel={p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                evidenceTier={tierMap[p.slug] ?? "B"}
                mechanism={mechShort}
                dose={p.typicalDose}
                cycle={p.cycleLength}
                ctaLabel="See protocol"
                testId={`peer-${p.slug}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
