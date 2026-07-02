import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  ArrowRight,
  SlidersHorizontal,
  X,
  Check,
  ChevronDown,
  Plus,
  Syringe,
  Pill as PillIcon,
  Droplets,
  Wind,
} from "lucide-react";
import { useCart } from "@/contexts/CartProvider";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { AddToCartButton } from "@/components/AddToCartButton";
import { MolecularGlyph } from "@/components/MolecularGlyph";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { VialTile, categoryToTone } from "@/components/VialTile";
import { PillBadge } from "@/components/PillBadge";
import {
  peptides,
  CATEGORY_LABELS,
  type PeptideCategory,
  type Peptide,
} from "@/data/peptides";
import { pricing, getPrice, formatUSD } from "@/data/pricing";
import { useSeo, orgJsonLd, medicalBusinessJsonLd, webPageJsonLd } from "@/lib/seo";

/* ────────────────────────────────────────────────────────────────
   Derived metadata layer — peptides.ts is read-only, so we map the
   library's existing fields (category, administration, badge, price)
   into the richer filter dimensions the library UI needs.
   ──────────────────────────────────────────────────────────────── */

type Goal =
  | "Weight loss"
  | "Recovery"
  | "Sleep"
  | "Skin"
  | "Longevity"
  | "Cognition"
  | "GH";

type EvidenceTier = "A" | "B+" | "B" | "B−";

type Route = "Subcutaneous" | "Oral" | "Topical" | "Nasal";

const GOAL_FOR_CATEGORY: Record<PeptideCategory, Goal> = {
  metabolic: "Weight loss",
  recovery: "Recovery",
  sleep: "Sleep",
  skin: "Skin",
  longevity: "Longevity",
  cognition: "Cognition",
  growth: "GH",
};

const GOALS: Goal[] = [
  "Weight loss",
  "Recovery",
  "Sleep",
  "Skin",
  "Longevity",
  "Cognition",
  "GH",
];

const EVIDENCE_TIERS: EvidenceTier[] = ["A", "B+", "B", "B−"];
const ROUTES: Route[] = ["Subcutaneous", "Oral", "Topical", "Nasal"];

// Evidence tier per peptide — A = FDA-approved / large RCTs, descending.
const EVIDENCE: Record<string, EvidenceTier> = {
  tirzepatide: "A",
  tesamorelin: "A",
  retatrutide: "B+",
  "bpc-157": "B+",
  "ghk-cu": "B+",
  ipamorelin: "B+",
  "cjc-1295": "B",
  "tb-500": "B",
  "nad-plus": "B",
  "mots-c": "B",
  "thymosin-a1": "B",
  semax: "B",
  selank: "B",
  epitalon: "B−",
  dsip: "B−",
  "aod-9604": "B−",
};

// Two-bullet benefit list per peptide.
const BENEFITS: Record<string, [string, string]> = {
  "bpc-157": ["Accelerates tendon & gut repair", "Calms local inflammation"],
  "tb-500": ["Systemic tissue recovery", "Eases nagging strains"],
  "ghk-cu": ["Rebuilds collagen & elastin", "Evens tone, softens lines"],
  semax: ["Sharpens focus & recall", "Lifts mental fatigue"],
  selank: ["Calm without sedation", "Steadies mood under stress"],
  tesamorelin: ["Targets visceral fat", "Raises IGF-1 physiologically"],
  ipamorelin: ["Clean GH pulse", "Deepens sleep & recovery"],
  "cjc-1295": ["Sustains GH baseline", "Pairs with Ipamorelin"],
  epitalon: ["Recalibrates circadian rhythm", "Studied for telomere support"],
  "thymosin-a1": ["Restores T-cell function", "Modulates immune surveillance"],
  "nad-plus": ["Fuels mitochondrial energy", "Supports DNA repair"],
  "mots-c": ["Exercise-mimetic metabolism", "Improves glucose handling"],
  dsip: ["Deeper slow-wave sleep", "Shortens sleep-onset latency"],
  tirzepatide: ["Steady weight loss", "Curbs cravings & food noise"],
  retatrutide: ["Largest fat-loss lever", "Raises energy expenditure"],
  "aod-9604": ["Targeted lipolysis", "Spares glucose & IGF-1"],
};

// Short "Onset" copy per peptide for the mini stat row.
const ONSET: Record<string, string> = {
  "bpc-157": "Onset 1–2 wks",
  "tb-500": "Onset 1–2 wks",
  "ghk-cu": "Onset 1–3 wks",
  semax: "Onset days",
  selank: "Onset days",
  tesamorelin: "Onset 1–2 wks",
  ipamorelin: "Onset 1–2 wks",
  "cjc-1295": "Onset 1–2 wks",
  epitalon: "Onset 1–2 wks",
  "thymosin-a1": "Onset 1–3 wks",
  "nad-plus": "Onset 1–2 wks",
  "mots-c": "Onset 1–2 wks",
  dsip: "Onset 1–3 nts",
  tirzepatide: "Onset 1–4 wks",
  retatrutide: "Onset 1–4 wks",
  "aod-9604": "Onset 1–3 wks",
};

// Short cadence/route copy per peptide for the mini stat row.
const CADENCE: Record<string, string> = {
  "bpc-157": "Subq daily",
  "tb-500": "Subq weekly",
  "ghk-cu": "Subq / topical",
  semax: "Nasal daily",
  selank: "Nasal daily",
  tesamorelin: "Subq nightly",
  ipamorelin: "Subq nightly",
  "cjc-1295": "Subq weekly",
  epitalon: "Subq cycled",
  "thymosin-a1": "Subq 2×/wk",
  "nad-plus": "Subq weekly",
  "mots-c": "Subq 2–3×/wk",
  dsip: "Subq nightly",
  tirzepatide: "Subq weekly",
  retatrutide: "Subq weekly",
  "aod-9604": "Subq daily",
};

function RouteIcon({ route }: { route: Route }) {
  const cls = "h-3.5 w-3.5 shrink-0";
  if (route === "Nasal") return <Wind className={cls} strokeWidth={1.8} />;
  if (route === "Topical") return <Droplets className={cls} strokeWidth={1.8} />;
  if (route === "Oral") return <PillIcon className={cls} strokeWidth={1.8} />;
  return <Syringe className={cls} strokeWidth={1.8} />;
}

function evidenceBadgeStyle(tier: EvidenceTier): { bg: string; color: string } {
  if (tier === "A") return { bg: "#1C1815", color: "#c6f184" };
  if (tier === "B+") return { bg: "#1a3a1a", color: "#c6f184" };
  if (tier === "B") return { bg: "#f5f4ef", color: "#3a3a3a" };
  return { bg: "#f5f0ec", color: "#7a4a2a" };
}

const SHIMMER_CSS = `
@keyframes nx-shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.nx-shimmer {
  background: linear-gradient(90deg, #f0eee7 25%, #e8e6df 50%, #f0eee7 75%);
  background-size: 800px 100%;
  animation: nx-shimmer 1.4s infinite linear;
}
`;

function PeptideCardSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-white p-6 flex flex-col gap-3" aria-hidden>
      <div className="flex justify-between">
        <div className="nx-shimmer h-5 w-24 rounded-full" />
        <div className="nx-shimmer h-5 w-20 rounded-full" />
      </div>
      <div className="nx-shimmer h-12 w-12 rounded-2xl mt-2" />
      <div className="nx-shimmer h-3 w-16 rounded" />
      <div className="nx-shimmer h-6 w-32 rounded" />
      <div className="nx-shimmer h-3 w-full rounded" />
      <div className="nx-shimmer h-3 w-4/5 rounded" />
      <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
        <div className="nx-shimmer h-6 w-16 rounded" />
        <div className="nx-shimmer h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

function routeFor(p: Peptide): Route {
  const a = p.administration.toLowerCase();
  if (a.includes("intranasal") || a.includes("nasal")) return "Nasal";
  if (a.includes("topical")) return "Topical";
  if (a.includes("oral")) return "Oral";
  return "Subcutaneous";
}

function statusBadge(slug: string): "MOST PRESCRIBED" | "NEW" | "POPULAR" | null {
  const b = getPrice(slug)?.badge;
  if (b === "New") return "NEW";
  if (b === "Most popular") return "MOST PRESCRIBED";
  if (b === "GLP-1") return "POPULAR";
  return null;
}

// "Most prescribed" sort weight — badged items first, then price asc.
function prescribedRank(slug: string): number {
  const b = getPrice(slug)?.badge;
  if (b === "Most popular") return 0;
  if (b === "GLP-1") return 1;
  if (b === "New") return 2;
  return 3;
}

type SortKey = "prescribed" | "price-asc" | "price-desc" | "name" | "evidence";

const SORT_LABELS: Record<SortKey, string> = {
  prescribed: "Most prescribed",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name (A–Z)",
  evidence: "Evidence tier",
};

const EVIDENCE_ORDER: Record<EvidenceTier, number> = { A: 0, "B+": 1, B: 2, "B−": 3 };

const CATEGORY_DEEPDIVE: {
  key: PeptideCategory;
  goal: string;
}[] = [
  { key: "metabolic", goal: "Fat loss · appetite · glucose" },
  { key: "recovery", goal: "Tissue repair · injury · gut" },
  { key: "growth", goal: "Body composition · GH axis" },
  { key: "longevity", goal: "Healthspan · energy · immunity" },
  { key: "sleep", goal: "Deep sleep · circadian rhythm" },
  { key: "skin", goal: "Collagen · tone · elasticity" },
  { key: "cognition", goal: "Focus · memory · calm" },
];

const PEPTIDE_FAQS = [
  {
    category: "GUIDANCE",
    q: "How is the right peptide chosen for me?",
    a: "Your physician matches a peptide to your goal, history, and bloodwork — not a quiz alone. After your 4-minute intake and 65-marker panel, a board-certified physician reviews contraindications, current medications, and target outcome, then selects the molecule (or pairing) with the strongest evidence for your case. If your labs raise a flag, they will recommend an alternative or hold.",
  },
  {
    category: "PROTOCOL",
    q: "Can I combine peptides?",
    a: "Often, yes — many of our protocols are deliberate pairings. BPC-157 and TB-500 cover local and systemic repair; CJC-1295 and Ipamorelin produce a larger, still-physiologic GH pulse together. Combinations are only dispensed when a physician confirms the mechanisms are complementary and the safety profile is understood. We do not stack molecules speculatively.",
  },
  {
    category: "PHARMACY",
    q: "Are these compounded medications?",
    a: "Yes. Every peptide is prepared by a licensed U.S. 503A compounding pharmacy under a valid physician prescription, in ISO-compliant cleanrooms, batch-tested for potency and purity, and shipped cold-chain with a certificate of analysis. These are not research-grade powders or overseas products — the compound you receive is the compound you were prescribed.",
  },
  {
    category: "PROCESS",
    q: "What's the dispensing process?",
    a: "Intake (4 minutes) → blood draw (at home or LabCorp) → physician review of your 65-marker panel → personalized prescription → cold-chain shipment within 5–7 business days. Quarterly reassessments are included so dosing tracks your labs, not guesswork. Everything runs asynchronously through your member portal — no scheduled video calls required.",
  },
  {
    category: "PROTOCOL",
    q: "Can I switch peptides mid-protocol?",
    a: "Yes. There are no long-term contracts. If a molecule isn't producing the response your labs or experience call for, message your physician through the portal — they can adjust dose, swap compounds, or sequence in a new peptide. Some compounds (certain GH secretagogues) benefit from a brief taper; your physician will advise on the appropriate transition.",
  },
];

const COMPARE_FIELDS: { label: string; get: (p: Peptide) => string }[] = [
  { label: "Category", get: (p) => CATEGORY_LABELS[p.category] },
  { label: "Goal", get: (p) => GOAL_FOR_CATEGORY[p.category] },
  { label: "Evidence", get: (p) => EVIDENCE[p.slug] ?? "B" },
  { label: "Route", get: (p) => routeFor(p) },
  { label: "Onset", get: (p) => (ONSET[p.slug] ?? "Onset 1–4 wks").replace("Onset ", "") },
  { label: "Half-life", get: (p) => p.halfLife.replace(/\s*\([^)]*\)/, "") },
  { label: "Typical dose", get: (p) => p.typicalDose },
  { label: "Cycle", get: (p) => p.cycleLength },
  {
    label: "From / mo",
    get: (p) => {
      const pr = getPrice(p.slug);
      return pr ? formatUSD(pr.monthlyPrice) : "—";
    },
  },
];

export default function Peptides() {
  // ── Filter + sort state (React state only — no storage) ──
  const [activeCats, setActiveCats] = useState<PeptideCategory[]>([]);
  const [activeGoals, setActiveGoals] = useState<Goal[]>([]);
  const [activeTiers, setActiveTiers] = useState<EvidenceTier[]>([]);
  const [activeRoutes, setActiveRoutes] = useState<Route[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [sort, setSort] = useState<SortKey>("prescribed");
  const [sortOpen, setSortOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const cart = useCart();

  useSeo({
    title: "Peptide catalog — BPC-157, GLP-1, NAD+, Epitalon and 16 more",
    description:
      "Browse 16+ physician-prescribed peptides: BPC-157, TB-500, GHK-Cu, Tirzepatide, Epitalon, NAD+, MOTS-c. Filter by goal, evidence tier, and route. Every compound compounded in a U.S. 503A pharmacy.",
    path: "/peptides",
    jsonLd: [orgJsonLd(), medicalBusinessJsonLd(), webPageJsonLd({ name: "Nexphoria Peptide Library", description: "Physician-prescribed peptide catalog with mechanism, dosing, timelines, and clinical references.", path: "/peptides" })],
  });

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const priceCapped = maxPrice < 300;

  const filtered = useMemo(() => {
    let list = peptides.filter((p) => {
      if (activeCats.length && !activeCats.includes(p.category)) return false;
      if (activeGoals.length && !activeGoals.includes(GOAL_FOR_CATEGORY[p.category]))
        return false;
      if (activeTiers.length && !activeTiers.includes(EVIDENCE[p.slug] ?? "B"))
        return false;
      if (activeRoutes.length && !activeRoutes.includes(routeFor(p))) return false;
      const price = getPrice(p.slug)?.monthlyPrice ?? 0;
      if (priceCapped && price > maxPrice) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      const pa = getPrice(a.slug)?.monthlyPrice ?? 0;
      const pb = getPrice(b.slug)?.monthlyPrice ?? 0;
      switch (sort) {
        case "price-asc":
          return pa - pb;
        case "price-desc":
          return pb - pa;
        case "name":
          return a.name.localeCompare(b.name);
        case "evidence":
          return (
            EVIDENCE_ORDER[EVIDENCE[a.slug] ?? "B"] -
            EVIDENCE_ORDER[EVIDENCE[b.slug] ?? "B"]
          );
        case "prescribed":
        default:
          return prescribedRank(a.slug) - prescribedRank(b.slug) || pa - pb;
      }
    });
    return list;
  }, [activeCats, activeGoals, activeTiers, activeRoutes, maxPrice, priceCapped, sort]);

  const total = peptides.length;
  const anyFilter =
    activeCats.length ||
    activeGoals.length ||
    activeTiers.length ||
    activeRoutes.length ||
    priceCapped;

  const clearAll = () => {
    setActiveCats([]);
    setActiveGoals([]);
    setActiveTiers([]);
    setActiveRoutes([]);
    setMaxPrice(300);
  };

  const toggleCompare = (slug: string) => {
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  };

  const compareList = compare
    .map((s) => peptides.find((p) => p.slug === s))
    .filter((p): p is Peptide => Boolean(p));

  // Active filter chips list (label + remove handler)
  const chips: { id: string; label: string; remove: () => void }[] = [
    ...activeCats.map((c) => ({
      id: `cat-${c}`,
      label: CATEGORY_LABELS[c],
      remove: () => toggle(activeCats, c, setActiveCats),
    })),
    ...activeGoals.map((g) => ({
      id: `goal-${g}`,
      label: `Goal: ${g}`,
      remove: () => toggle(activeGoals, g, setActiveGoals),
    })),
    ...activeTiers.map((t) => ({
      id: `tier-${t}`,
      label: `Evidence ${t}`,
      remove: () => toggle(activeTiers, t, setActiveTiers),
    })),
    ...activeRoutes.map((r) => ({
      id: `route-${r}`,
      label: r,
      remove: () => toggle(activeRoutes, r, setActiveRoutes),
    })),
    ...(priceCapped
      ? [{ id: "price", label: `Under $${maxPrice}/mo`, remove: () => setMaxPrice(300) }]
      : []),
  ];

  return (
    <SiteLayout navVariant="showcase">
      <style dangerouslySetInnerHTML={{ __html: SHIMMER_CSS }} />
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          {/* ── Maximus header ── */}
          <MxHeader
            badge={<PillBadge tone="acid">Physician-directed pharmacy</PillBadge>}
            headline={<>{total} molecules.<br /><span>Each one a </span><span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>specific</span><span> instruction</span> to your body.</>}
            subtitle="Every peptide below is prescription-only, compounded in a U.S. 503A pharmacy, and dispensed under physician oversight. Browse by goal, by category, or by molecule."
          />

          {/* ── Hero tile pair ── */}
          <div className="mx-grid">
            <ColoredHeroTile
              href="/stacks/wolverine"
              tone="cobalt"
              glyph={TileGlyphs.hex}
              label={<>Recovery<br />&amp; performance</>}
              caption="Wolverine stack"
              ctaLabel="Explore stack"
            />
            <ColoredHeroTile
              href="/stacks/glow"
              tone="rose"
              glyph={TileGlyphs.leaf}
              label={<>Skin, sleep<br />&amp; longevity</>}
              caption="Glow stack"
              ctaLabel="Explore stack"
            />
          </div>

          {/* ── Compare strip (Maximus style) ── */}
          <div
            className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x"
            data-testid="hero-compare-strip"
            style={{ marginTop: 24, marginBottom: 8 }}
          >
            {[
              { v: String(total), k: "peptides in library" },
              { v: "7", k: "therapeutic categories" },
              { v: "100%", k: "physician-prescribed" },
              { v: "2–4 wks", k: "average onset" },
            ].map((kpi) => (
              <div
                key={kpi.k}
                className="snap-start shrink-0 min-w-[180px] px-5 py-4"
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid rgba(14,14,15,0.08)",
                }}
              >
                <div
                  className="text-3xl leading-none tabular-nums"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, color: "#0E0E0F" }}
                >
                  {kpi.v}
                </div>
                <div
                  className="mt-2 text-[10px] uppercase"
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", letterSpacing: "0.16em", color: "#6B6B6B" }}
                >
                  {kpi.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ───────────────── FILTER SIDEBAR + GRID ───────────────── */}
      <section className="nx-section text-foreground pt-4 md:pt-6" style={{ background: "var(--mx-page-bg)" }}>
        <div className="nx-container">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
            {/* ── SIDEBAR (desktop sticky) ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <FilterPanel
                  activeCats={activeCats}
                  activeGoals={activeGoals}
                  activeTiers={activeTiers}
                  activeRoutes={activeRoutes}
                  maxPrice={maxPrice}
                  onToggleCat={(c) => toggle(activeCats, c, setActiveCats)}
                  onToggleGoal={(g) => toggle(activeGoals, g, setActiveGoals)}
                  onToggleTier={(t) => toggle(activeTiers, t, setActiveTiers)}
                  onToggleRoute={(r) => toggle(activeRoutes, r, setActiveRoutes)}
                  onPrice={setMaxPrice}
                  onClear={clearAll}
                  anyFilter={Boolean(anyFilter)}
                />
              </div>
            </aside>

            {/* ── RESULTS COLUMN ── */}
            <div>
              {/* Results bar: count + mobile filter btn + sort */}
              <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                <p
                  className="text-fluid-sm text-foreground/70"
                  data-testid="text-results-count"
                >
                  Showing{" "}
                  <span className="font-medium text-foreground">{filtered.length}</span>{" "}
                  of {total} peptides
                </p>

                <div className="flex items-center gap-3">
                  {/* Mobile filter trigger */}
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    data-testid="button-open-filters"
                    className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-fluid-sm font-medium hover:border-primary transition-colors"
                  >
                    <SlidersHorizontal className="h-4 w-4" strokeWidth={1.8} />
                    Filters
                    {anyFilter ? (
                      <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-white text-[10px] font-mono">
                        {chips.length}
                      </span>
                    ) : null}
                  </button>

                  {/* Sort dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSortOpen((o) => !o)}
                      onBlur={() => setTimeout(() => setSortOpen(false), 120)}
                      data-testid="button-sort"
                      aria-haspopup="listbox"
                      aria-expanded={sortOpen}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-fluid-sm font-medium hover:border-primary transition-colors"
                    >
                      <span className="text-foreground/55">Sort by:</span>
                      <span className="text-foreground">{SORT_LABELS[sort]}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                        strokeWidth={1.8}
                      />
                    </button>
                    {sortOpen && (
                      <ul
                        role="listbox"
                        data-testid="menu-sort"
                        className="absolute right-0 top-[calc(100%+0.5rem)] z-40 min-w-[220px] rounded-xl border border-border bg-white p-1.5 shadow-[0_8px_32px_rgba(28,24,21,0.08)]"
                      >
                        {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                          <li key={k}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={sort === k}
                              data-testid={`sort-option-${k}`}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setSort(k);
                                setSortOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-fluid-sm transition-colors ${
                                sort === k
                                  ? "bg-primary/[0.06] text-foreground font-medium"
                                  : "text-foreground/70 hover:bg-primary/[0.04]"
                              }`}
                            >
                              {SORT_LABELS[k]}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Active filter chip strip */}
              {chips.length > 0 && (
                <div
                  className="flex flex-wrap items-center gap-2 mb-8"
                  data-testid="active-filter-chips"
                >
                  {chips.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={c.remove}
                      data-testid={`chip-${c.id}`}
                      className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-primary/[0.06] border border-primary/20 text-fluid-xs font-medium text-foreground hover:bg-primary/10 transition-colors"
                    >
                      {c.label}
                      <X className="h-3 w-3 text-foreground/55" strokeWidth={2} />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearAll}
                    data-testid="button-clear-filters"
                    className="text-fluid-xs font-mono uppercase tracking-[0.1em] text-foreground/50 hover:text-foreground underline underline-offset-4 ml-1"
                  >
                    Clear all
                  </button>
                </div>
              )}
              {chips.length === 0 && <div className="mb-8" />}

              {/* GRID */}
              {loading ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <PeptideCardSkeleton key={i} />
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((p, i) => (
                    <Reveal key={p.slug} delay={Math.min(i, 8) * 40}>
                      <PeptideVialTile peptide={p} />
                    </Reveal>
                  ))}
                  <Reveal delay={Math.min(filtered.length, 9) * 40}>
                    <Link href="/stacks" data-testid="card-peptide-guide">
                      <article className="group h-full rounded-3xl p-8 border border-primary/35 bg-primary/[0.05] hover:bg-primary/[0.09] transition-colors cursor-pointer flex flex-col justify-between min-h-[300px] nx-tile">
                        <div className="flex items-start justify-between">
                          <div className="nx-eyebrow text-primary">
                            Not sure where to start?
                          </div>
                          <ArrowUpRight
                            className="h-5 w-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.8}
                          />
                        </div>
                        <div>
                          <h3 className="font-display text-fluid-2xl leading-tight tracking-tight mb-3">
                            See the protocols these build into.
                          </h3>
                          <p className="text-fluid-sm text-foreground/65 leading-relaxed">
                            Single molecules are the vocabulary. Our physician-designed
                            protocols are the sentences — sequenced, dosed, and supervised.
                          </p>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                </div>
              ) : (
                <div
                  className="rounded-3xl border border-border bg-white px-8 py-16 text-center"
                  data-testid="empty-state"
                >
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mx-auto mb-6" aria-hidden>
                    <circle cx="36" cy="36" r="35" stroke="#e8e9db" strokeWidth="1.5" />
                    <circle cx="36" cy="28" r="10" stroke="#c6c8ba" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="22" y1="46" x2="50" y2="46" stroke="#c6c8ba" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="27" y1="52" x2="45" y2="52" stroke="#c6c8ba" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="32" y1="22" x2="32" y2="34" stroke="#c6f184" strokeWidth="2" strokeLinecap="round" />
                    <line x1="26" y1="28" x2="38" y2="28" stroke="#c6f184" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <h3 className="font-display text-fluid-2xl tracking-tight mb-2">
                    No peptides match those filters.
                  </h3>
                  <p className="text-fluid-sm text-foreground/60 mb-6 max-w-sm mx-auto">
                    Try widening your goal, evidence tier, or price range. All {total} peptides are visible with no filters applied.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    data-testid="button-reset-empty"
                    className="nx-cta-cobalt"
                  >
                    Reset filters
                  </button>
                </div>
              )}

              {/* ASSESSMENT CTA TILE */}
              {!loading && (
                <Reveal delay={20}>
                  <Link href="/assessment" data-testid="card-assessment-cta">
                    <article
                      className="group rounded-3xl p-8 flex items-center justify-between gap-6 nx-tile cursor-pointer border transition-all mt-8"
                      style={{ background: "#1C1815", borderColor: "#1C1815" }}
                    >
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-2" style={{ color: "#c6f184" }}>
                          Not sure where to start?
                        </div>
                        <h3 className="font-display text-fluid-xl leading-tight tracking-tight text-white">
                          Take the 5-minute assessment.
                        </h3>
                        <p className="text-fluid-xs leading-relaxed mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                          A physician maps your labs and goals to the right peptide — not a quiz.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] transition-all group-hover:gap-3"
                          style={{ background: "#c6f184", color: "#1C1815" }}
                        >
                          Start <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              )}

              {/* EVIDENCE FOOTNOTE STRIP */}
              <div
                className="mt-12 rounded-2xl border border-border bg-[var(--nx-bg-cream)] px-6 py-5"
                data-testid="evidence-footnote"
              >
                <p className="text-fluid-xs text-foreground/55 leading-relaxed max-w-3xl">
                  <span className="font-mono uppercase tracking-[0.12em] text-foreground/70">
                    Evidence note ·{" "}
                  </span>
                  All peptides above are dispensed under physician oversight after intake
                  review. Pricing reflects a 3-month plan. Not FDA-approved as standalone
                  drugs unless noted (Tirzepatide and Tesamorelin carry FDA approval for
                  specific indications).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── SCIENCE EXPLAINER BAND ───────────────── */}
      <section className="bg-[var(--nx-bg-cream)] text-foreground nx-section" data-testid="science-explainer">
        <div className="nx-container">
          <Reveal>
            <div className="nx-eyebrow text-foreground/55 mb-3">The science, briefly</div>
            <h2 className="font-display text-fluid-3xl leading-tight tracking-tight max-w-2xl mb-10">
              Three things worth knowing before you read a single label.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                eyebrow: "01",
                title: "What are peptides?",
                body: "Short chains of amino acids — the same building blocks as proteins — that act as precise biological messengers. They instruct cells to repair tissue, release a hormone, or regulate metabolism, rather than overriding the system.",
                href: "/science",
              },
              {
                eyebrow: "02",
                title: "How do they work?",
                body: "Each peptide binds a specific receptor and triggers a downstream signal: BPC-157 drives angiogenesis at injury sites; GHRH analogs prompt the pituitary's own GH pulse; GLP-1 agonists slow gastric emptying and quiet appetite.",
                href: "/science",
              },
              {
                eyebrow: "03",
                title: "Why prescription?",
                body: "Dose, sterility, and contraindications matter. Every Nexphoria peptide is prescribed after bloodwork, compounded in a licensed 503A pharmacy, batch-tested, and reassessed quarterly — not bought as an unverified powder.",
                href: "/how-it-works",
              },
            ].map((tile) => (
              <Reveal key={tile.title}>
                <Link href={tile.href} data-testid={`science-tile-${tile.eyebrow}`}>
                  <article className="group h-full rounded-3xl bg-white border border-border p-7 nx-tile cursor-pointer flex flex-col">
                    <div className="font-mono text-fluid-xs text-foreground/40 mb-4">
                      {tile.eyebrow}
                    </div>
                    <h3 className="font-display text-fluid-xl leading-tight tracking-tight mb-3">
                      {tile.title}
                    </h3>
                    <p className="text-fluid-sm text-foreground/65 leading-relaxed mb-6">
                      {tile.body}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-fluid-sm font-medium text-primary">
                      Read full
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        strokeWidth={1.8}
                      />
                    </span>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CATEGORY DEEP-DIVE ───────────────── */}
      <section className="bg-background text-foreground nx-section" data-testid="category-deepdive">
        <div className="nx-container">
          <Reveal>
            <div className="nx-eyebrow text-foreground/55 mb-3">Browse by category</div>
            <h2 className="font-display text-fluid-3xl leading-tight tracking-tight max-w-2xl mb-10">
              Seven categories. Pick the system you want to move.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CATEGORY_DEEPDIVE.map((cat) => {
              const members = peptides.filter((p) => p.category === cat.key);
              const top =
                members.find((m) => getPrice(m.slug)?.badge === "Most popular") ??
                members.find((m) => getPrice(m.slug)?.badge) ??
                members[0];
              const glyph = members[0]?.glyph ?? "chain";
              return (
                <Reveal key={cat.key}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCats([cat.key]);
                      setActiveGoals([]);
                      setActiveTiers([]);
                      setActiveRoutes([]);
                      setMaxPrice(300);
                      document
                        .querySelector('[data-testid="text-results-count"]')
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    data-testid={`deepdive-${cat.key}`}
                    className="group w-full h-full text-left rounded-3xl bg-white border border-border p-6 nx-tile cursor-pointer flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <MolecularGlyph
                        glyph={glyph}
                        size={40}
                        className="text-foreground"
                        title={`${CATEGORY_LABELS[cat.key]} glyph`}
                      />
                      <ArrowUpRight
                        className="h-4 w-4 text-foreground/40 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.8}
                      />
                    </div>
                    <h3 className="font-display text-fluid-lg leading-tight tracking-tight mb-1">
                      {CATEGORY_LABELS[cat.key]}
                    </h3>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/45 mb-3">
                      {members.length} peptide{members.length === 1 ? "" : "s"}
                    </div>
                    <p className="text-fluid-xs text-foreground/60 leading-relaxed mb-3">
                      <span className="text-foreground/45">Common goals · </span>
                      {cat.goal}
                    </p>
                    <div className="mt-auto pt-3 border-t border-border">
                      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/40 mb-0.5">
                        Most prescribed
                      </div>
                      <div className="text-fluid-sm font-medium text-foreground">
                        {top?.name ?? "—"}
                      </div>
                      <span className="mt-3 inline-flex items-center gap-1 text-fluid-xs font-medium text-primary">
                        Explore category
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── FAQ TAIL ───────────────── */}
      <FAQAccordion
        title="Questions about the library."
        items={PEPTIDE_FAQS}
        showCategories
      />

      {/* ───────────────── CTA ───────────────── */}
      <section className="bg-background text-foreground relative overflow-hidden border-t border-border">
        <div className="relative nx-container py-20 md:py-28 text-center">
          <h2 className="font-display text-fluid-4xl leading-[0.95] tracking-tight text-balance max-w-3xl mx-auto mb-8">
            Not sure which peptide fits your goal?
            <br />
            Let a <span className="font-medium text-primary">physician</span> decide.
          </h2>
          <StartIntakeButton size="xl" source="peptides_index" variant="primary">
            Start your assessment
          </StartIntakeButton>
        </div>
      </section>

      {/* ───────────────── MOBILE FILTER DRAWER ───────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" data-testid="filter-drawer">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            data-testid="drawer-overlay"
          />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-[340px] bg-[var(--nx-bg)] shadow-2xl overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-5 py-4 bg-[var(--nx-bg)] border-b border-border">
              <div className="font-display text-fluid-xl tracking-tight">Filters</div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                data-testid="button-close-filters"
                className="p-2 -mr-2 rounded-full hover:bg-primary/[0.06]"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>
            <div className="p-5">
              <FilterPanel
                activeCats={activeCats}
                activeGoals={activeGoals}
                activeTiers={activeTiers}
                activeRoutes={activeRoutes}
                maxPrice={maxPrice}
                onToggleCat={(c) => toggle(activeCats, c, setActiveCats)}
                onToggleGoal={(g) => toggle(activeGoals, g, setActiveGoals)}
                onToggleTier={(t) => toggle(activeTiers, t, setActiveTiers)}
                onToggleRoute={(r) => toggle(activeRoutes, r, setActiveRoutes)}
                onPrice={setMaxPrice}
                onClear={clearAll}
                anyFilter={Boolean(anyFilter)}
              />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                data-testid="button-apply-filters"
                className="nx-cta-cobalt w-full justify-center mt-6"
              >
                Show {filtered.length} peptides
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── COMPARE STICKY BAR ───────────────── */}
      {compareList.length > 0 && (
        <div
          className="fixed bottom-0 inset-x-0 z-50"
          data-testid="compare-bar"
        >
          <div className="nx-container py-3">
            <div className="rounded-2xl bg-[var(--nx-fg)] text-white shadow-[0_8px_40px_rgba(28,24,21,0.25)] px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-fluid-sm">
                  <span className="font-medium">{compareList.length}</span>{" "}
                  peptide{compareList.length === 1 ? "" : "s"} selected
                </span>
                <div className="hidden sm:flex items-center gap-1.5">
                  {compareList.map((p) => (
                    <span
                      key={p.slug}
                      className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-white/10 text-fluid-xs"
                    >
                      {p.name}
                      <button
                        type="button"
                        onClick={() => toggleCompare(p.slug)}
                        data-testid={`compare-remove-${p.slug}`}
                        aria-label={`Remove ${p.name}`}
                        className="hover:text-white/70"
                      >
                        <X className="h-3 w-3" strokeWidth={2.2} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCompare([])}
                  data-testid="button-compare-clear"
                  className="text-fluid-xs font-mono uppercase tracking-[0.1em] text-white/55 hover:text-white"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setCompareOpen(true)}
                  data-testid="button-compare-open"
                  disabled={compareList.length < 2}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[var(--nx-fg)] text-fluid-sm font-semibold disabled:opacity-40"
                >
                  Compare side-by-side
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── COMPARE MODAL ───────────────── */}
      {compareOpen && compareList.length > 0 && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
          data-testid="compare-modal"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setCompareOpen(false)}
          />
          <div className="relative w-full sm:max-w-4xl max-h-[88vh] overflow-y-auto bg-[var(--nx-bg)] sm:rounded-3xl rounded-t-3xl border border-border shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-[var(--nx-bg)] border-b border-border">
              <div>
                <div className="nx-eyebrow text-foreground/55 mb-1">Side-by-side</div>
                <div className="font-display text-fluid-2xl tracking-tight">
                  Comparing {compareList.length} peptides
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCompareOpen(false)}
                data-testid="button-compare-close"
                className="p-2 -mr-2 rounded-full hover:bg-primary/[0.06]"
                aria-label="Close comparison"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <table
                className="w-full border-separate border-spacing-0 min-w-[520px]"
                data-testid="table-peptide-compare"
              >
                <thead>
                  <tr>
                    <th className="text-left p-3 align-bottom w-[26%]">
                      <span className="nx-eyebrow text-foreground/40 font-normal">
                        Property
                      </span>
                    </th>
                    {compareList.map((p) => (
                      <th key={p.slug} className="text-left p-3 align-bottom">
                        <div className="nx-eyebrow text-primary mb-1">
                          {p.name}
                        </div>
                        <div className="font-display text-fluid-sm text-foreground/65 leading-snug">
                          {p.tagline}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_FIELDS.map((f) => (
                    <tr key={f.label}>
                      <td className="p-3 font-display text-fluid-sm border-t border-border text-foreground/85">
                        {f.label}
                      </td>
                      {compareList.map((p) => (
                        <td
                          key={p.slug}
                          className="p-3 border-t border-border text-fluid-sm text-foreground/70"
                        >
                          {f.get(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 flex flex-wrap gap-3">
                {compareList.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/peptides/${p.slug}`}
                    data-testid={`compare-view-${p.slug}`}
                    className="nx-cta-ghost"
                  >
                    View {p.name} protocol
                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

/* ──────────────────────── FILTER PANEL ──────────────────────── */
function FilterPanel(props: {
  activeCats: PeptideCategory[];
  activeGoals: Goal[];
  activeTiers: EvidenceTier[];
  activeRoutes: Route[];
  maxPrice: number;
  onToggleCat: (c: PeptideCategory) => void;
  onToggleGoal: (g: Goal) => void;
  onToggleTier: (t: EvidenceTier) => void;
  onToggleRoute: (r: Route) => void;
  onPrice: (n: number) => void;
  onClear: () => void;
  anyFilter: boolean;
}) {
  const cats = Object.keys(CATEGORY_LABELS) as PeptideCategory[];
  return (
    <div data-testid="filter-panel">
      <div className="flex items-center justify-between mb-5">
        <div className="nx-eyebrow text-foreground/55">Filter</div>
        {props.anyFilter && (
          <button
            type="button"
            onClick={props.onClear}
            data-testid="button-sidebar-clear"
            className="text-fluid-xs font-mono uppercase tracking-[0.1em] text-foreground/45 hover:text-foreground underline underline-offset-4"
          >
            Clear
          </button>
        )}
      </div>

      <FilterGroup label="Category">
        {cats.map((c) => (
          <CheckRow
            key={c}
            id={`filter-cat-${c}`}
            label={CATEGORY_LABELS[c]}
            checked={props.activeCats.includes(c)}
            onChange={() => props.onToggleCat(c)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Goal">
        {GOALS.map((g) => (
          <CheckRow
            key={g}
            id={`filter-goal-${g}`}
            label={g}
            checked={props.activeGoals.includes(g)}
            onChange={() => props.onToggleGoal(g)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Evidence tier">
        {EVIDENCE_TIERS.map((t) => (
          <CheckRow
            key={t}
            id={`filter-tier-${t}`}
            label={`Tier ${t}`}
            checked={props.activeTiers.includes(t)}
            onChange={() => props.onToggleTier(t)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Route">
        {ROUTES.map((r) => (
          <CheckRow
            key={r}
            id={`filter-route-${r}`}
            label={r}
            checked={props.activeRoutes.includes(r)}
            onChange={() => props.onToggleRoute(r)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Price range" last>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-foreground/50">$50</span>
          <span className="font-mono text-fluid-sm text-foreground">
            {props.maxPrice >= 300 ? "$300+" : `$${props.maxPrice}`}/mo
          </span>
          <span className="font-mono text-[11px] text-foreground/50">$300</span>
        </div>
        <input
          type="range"
          min={50}
          max={300}
          step={10}
          value={props.maxPrice}
          onChange={(e) => props.onPrice(Number(e.target.value))}
          data-testid="filter-price-slider"
          aria-label="Maximum monthly price"
          className="w-full accent-[var(--nx-cobalt)] cursor-pointer"
        />
        <p className="mt-2 text-fluid-xs text-foreground/45">
          Showing peptides at or under this monthly price.
        </p>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "py-5" : "py-5 border-b border-border"}>
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/45 mb-3">
        {label}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className="flex items-center gap-2.5 py-1 cursor-pointer group select-none"
      data-testid={`label-${id}`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        data-testid={id}
        className={`shrink-0 h-4 w-4 rounded-[4px] border flex items-center justify-center transition-colors ${
          checked
            ? "bg-primary border-primary"
            : "border-foreground/30 group-hover:border-foreground/60"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </button>
      <span
        className={`text-fluid-sm transition-colors ${
          checked ? "text-foreground font-medium" : "text-foreground/70 group-hover:text-foreground"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

/* ──────────────────────── PEPTIDE CARD ──────────────────────── */
function PeptideCard({
  peptide,
  selected,
  disabled,
  onToggleCompare,
}: {
  peptide: Peptide;
  selected: boolean;
  disabled: boolean;
  onToggleCompare: () => void;
}) {
  const badge = statusBadge(peptide.slug);
  const price = getPrice(peptide.slug)?.monthlyPrice;
  const benefits = BENEFITS[peptide.slug] ?? [peptide.tagline, peptide.summary.split(".")[0]];
  const onset = ONSET[peptide.slug] ?? "Onset 1–4 wks";
  const cadence = CADENCE[peptide.slug] ?? peptide.administration;
  const tier = (EVIDENCE[peptide.slug] ?? "B") as EvidenceTier;
  const route = routeFor(peptide);
  const { bg: tierBg, color: tierColor } = evidenceBadgeStyle(tier);
  const cart = useCart();

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    cart.addPeptide(peptide.slug, { qty: 1, cadence: "3mo" });
  }

  // Subtle category tint — barely-there, so each card has its own quiet identity
  const CATEGORY_TINT: Record<string, string> = {
    recovery: "#F0F2E6",   // sage
    skin: "#F7ECE6",       // rose
    cognition: "#E8EEF1",  // sky
    sleep: "#EAE6F1",      // dusk
    growth: "#F2EDDE",     // butter
    longevity: "#E8EFEC",  // cobalt-soft
    metabolic: "#EEF1F4",  // mineral
  };
  const tintBg = CATEGORY_TINT[peptide.category] ?? "#ffffff";

  // Regulatory chip — classify fdaStatus into a compact 3-state label
  const fdaStatus = (peptide as any).evidenceTier?.fdaStatus as string | undefined;
  const reg = (() => {
    if (!fdaStatus) return null;
    const s = fdaStatus.toLowerCase();
    if (s.startsWith("fda-approved")) return { label: "FDA-approved", bg: "#EAF6E6", color: "#2E6B24", border: "#B7DDB0" };
    if (s.includes("development halted") || s.includes("phase 2") || s.includes("phase 3") || s.includes("clinical trial")) return { label: "In trials", bg: "#F5EEDA", color: "#7A5A0F", border: "#DFC98A" };
    if (s.startsWith("not fda-approved") || s.includes("investigational") || s.includes("compounded") || s.includes("registered as a drug in russia")) return { label: "Rx · Compounded", bg: "#EEF1F4", color: "#3D4A5C", border: "#C6D0DC" };
    return { label: "Rx", bg: "#EEF1F4", color: "#3D4A5C", border: "#C6D0DC" };
  })();

  return (
    <article
      className={`group relative h-full text-foreground rounded-3xl p-6 nx-tile overflow-hidden flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(28,24,21,0.10)] ${
        selected ? "border-primary ring-1 ring-primary" : "border-border"
      }`}
      style={{ background: tintBg }}
      data-testid={`card-peptide-${peptide.slug}`}
    >
      {/* Top row: evidence badge + status badge + compare checkbox */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-[0.12em]"
            style={{ background: tierBg, color: tierColor }}
            title={`Evidence tier ${tier}`}
            data-testid={`evidence-badge-${peptide.slug}`}
          >
            Tier {tier}
          </span>
          {badge && (
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[9px] uppercase tracking-[0.12em]"
              data-testid={`badge-${peptide.slug}`}
            >
              {badge}
            </span>
          )}
          {reg && (
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-[0.12em]"
              style={{ background: reg.bg, color: reg.color, border: `1px solid ${reg.border}` }}
              title={fdaStatus}
              data-testid={`regulatory-chip-${peptide.slug}`}
            >
              {reg.label}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleCompare}
          disabled={disabled}
          data-testid={`compare-toggle-${peptide.slug}`}
          aria-pressed={selected}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-[0.1em] transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
            selected
              ? "bg-primary text-white border-primary"
              : "border-border text-foreground/55 hover:border-primary hover:text-foreground"
          }`}
        >
          {selected ? (
            <Check className="h-3 w-3" strokeWidth={3} />
          ) : (
            <Plus className="h-3 w-3" strokeWidth={2.5} />
          )}
          Compare
        </button>
      </div>

      {/* Glyph — subtle scale on hover */}
      <div className="mb-4 transition-transform duration-300 group-hover:scale-105 origin-left">
        <MolecularGlyph
          glyph={peptide.glyph}
          size={52}
          className="text-foreground"
          title={`${peptide.name} molecular glyph`}
        />
      </div>

      {/* Eyebrow + name */}
      <div className="nx-eyebrow text-primary mb-1.5">
        {CATEGORY_LABELS[peptide.category]}
      </div>
      <Link
        href={`/peptides/${peptide.slug}`}
        data-testid={`link-peptide-${peptide.slug}`}
        className="block"
      >
        <h3 className="font-display text-fluid-2xl leading-tight tracking-tight mb-1 group-hover:text-primary transition-colors">
          {peptide.name}
        </h3>
      </Link>
      <div className="text-fluid-xs font-mono uppercase tracking-[0.1em] text-foreground/45 mb-4">
        {peptide.fullName}
      </div>

      {/* Two-bullet benefit list */}
      <div className="text-fluid-sm text-foreground/70 leading-relaxed mb-4">
        {benefits[0]} <span className="text-foreground/30">·</span> {benefits[1]}
      </div>

      {/* Mini stat row — with route icon */}
      <div className="flex items-center gap-2 mb-5 font-mono text-[11px] text-foreground/55">
        <RouteIcon route={route} />
        <span>{route}</span>
        <span className="text-foreground/25">·</span>
        <span>{onset}</span>
      </div>

      {/* Accent underline on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-3xl"
        style={{ background: "#c6f184" }}
        aria-hidden
      />

      {/* Price footer + CTA */}
      <div className="mt-auto pt-4 border-t border-border flex items-end justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/40 mb-0.5">
            Starts
          </div>
          <div className="font-display text-fluid-xl leading-none tracking-tight">
            {price ? `${formatUSD(price)}` : "—"}
            <span className="text-fluid-xs font-mono text-foreground/45 ml-1">/mo</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Quick-add at 3mo cadence — faster than opening the detail page */}
          <button
            type="button"
            onClick={quickAdd}
            data-testid={`quick-add-${peptide.slug}`}
            aria-label={`Add ${peptide.name} to cart at quarterly cadence`}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-border font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/70 hover:border-foreground hover:text-foreground transition-colors"
          >
            <Plus className="h-3 w-3" strokeWidth={2.5} />
            Add
          </button>
          <Link
            href={`/peptides/${peptide.slug}`}
            data-testid={`cta-peptide-${peptide.slug}`}
            className="inline-flex items-center gap-1 text-fluid-sm font-medium text-primary"
          >
            Details
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ── PeptideVialTile: adapter around VialTile for the peptide grid ── */
const SHORT_CATEGORY: Record<PeptideCategory, string> = {
  recovery: "Recovery",
  skin: "Skin",
  cognition: "Cognition",
  sleep: "Sleep",
  growth: "Growth",
  longevity: "Longevity",
  metabolic: "Metabolic",
};

function PeptideVialTile({ peptide }: { peptide: Peptide }) {
  const price = getPrice(peptide.slug)?.monthlyPrice;
  const tierRaw = (EVIDENCE[peptide.slug] ?? "B") as EvidenceTier;
  // VialTile accepts single-letter tiers; map plus/minus to letter
  const tierLetter = tierRaw.charAt(0) as "A" | "B" | "C";
  const badge = statusBadge(peptide.slug);

  // Short mechanism ~200 chars max, first 1-2 sentences
  const mechShort = peptide.mechanism
    .split(/(?<=[.!?])\s+/)
    .slice(0, 2)
    .join(" ")
    .slice(0, 210);

  return (
    <VialTile
      href={`/peptides/${peptide.slug}`}
      name={peptide.name}
      fullName={peptide.fullName}
      tagline={peptide.tagline}
      tone={categoryToTone(peptide.category)}
      glyph={peptide.glyph}
      price={price}
      categoryLabel={SHORT_CATEGORY[peptide.category]}
      evidenceTier={tierLetter}
      mechanism={mechShort}
      dose={peptide.typicalDose}
      cycle={peptide.cycleLength}
      ctaLabel="See protocol"
      badge={badge ?? undefined}
      fdaStatus={(peptide as any).evidenceTier?.fdaStatus}
      testId={peptide.slug}
    />
  );
}
