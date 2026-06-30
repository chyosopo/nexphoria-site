/* ──────────────────────────────────────────────────────────────
   Showcase — The pharmacy floor.
   Not marketing. The shelf, organized by what it does.
   Every peptide visible. Every category labeled. Every detail
   one click away. Education through structure, not story.
   ────────────────────────────────────────────────────────────── */

import { Link } from "wouter";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MolecularGlyph } from "@/components/MolecularGlyph";
import {
  peptides,
  CATEGORY_LABELS,
  type Peptide,
  type PeptideCategory,
} from "@/data/peptides";
import { ArrowRight, FlaskConical, Microscope, Truck, Stethoscope } from "lucide-react";

/* ── Category display order ─────────────────────────────────── */
const CATEGORY_ORDER: PeptideCategory[] = [
  "metabolic",
  "growth",
  "recovery",
  "longevity",
  "skin",
  "sleep",
  "cognition",
];

const CATEGORY_DESCRIPTIONS: Record<PeptideCategory, string> = {
  metabolic:
    "GLP-1 / GIP receptor agonists. Appetite, glucose, body-composition.",
  growth:
    "Growth-hormone releasing hormones and secretagogues. Recovery, sleep, body-composition.",
  recovery:
    "Tissue-repair signals. Tendon, ligament, gut, soft-tissue healing.",
  longevity:
    "Mitochondrial, telomeric, immune-regenerative compounds. Cellular age.",
  skin: "Copper-peptide and dermal-repair compounds. Collagen, hair, scar.",
  sleep: "Delta-sleep inducing peptides. Architecture, latency, REM.",
  cognition: "Neuropeptides for focus, mood, BDNF expression.",
};

const groupByCategory = (list: Peptide[]) => {
  const out = {} as Record<PeptideCategory, Peptide[]>;
  CATEGORY_ORDER.forEach((c) => (out[c] = []));
  list.forEach((p) => out[p.category].push(p));
  return out;
};

export default function Showcase() {
  const grouped = groupByCategory(peptides);

  return (
    <div className="min-h-screen bg-[var(--nx-bg-cream)] text-nx-fg">
      <Nav variant="showcase" />

      {/* ── HERO — Declarative pharmacy statement ───────────── */}
      <section className="border-b border-black/10 bg-[var(--nx-bg-cream)]">
        <div className="nx-container py-20 md:py-28">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-end">
            <div>
              <p className="nx-eyebrow mb-8" data-testid="hero-eyebrow">
                ● Peptide pharmacy · Open shelf
              </p>
              <h1
                className="nx-hero-heading mb-8 max-w-[18ch]"
                data-testid="hero-headline"
              >
                Every peptide.{" "}
                <span className="nx-italic-accent">With prescription.</span>{" "}
                From one pharmacy.
              </h1>
              <p
                className="text-lg md:text-xl text-nx-fg/75 max-w-[52ch] leading-relaxed"
                data-testid="hero-sub"
              >
                Seventeen compounds. Seven categories. Each one prescribed by a
                licensed physician, compounded at a USP&nbsp;&lt;797&gt;
                pharmacy, monitored with quarterly bloodwork, shipped
                cold-chain. The shelf is open — read what each one does, how it
                works, and what it costs.
              </p>
            </div>

            {/* Right-rail backbone strip */}
            <div className="border-l border-black/10 pl-8 md:pl-12 py-2">
              <p className="nx-eyebrow mb-6">What's included with every order</p>
              <ul className="space-y-5">
                {[
                  {
                    icon: Stethoscope,
                    label: "Licensed physician",
                    detail: "Prescription required. Telehealth visit included.",
                  },
                  {
                    icon: FlaskConical,
                    label: "Compounding pharmacy",
                    detail: "USP <797> sterile facility. Third-party tested.",
                  },
                  {
                    icon: Microscope,
                    label: "Lab monitoring",
                    detail:
                      "Baseline + quarterly bloodwork. Reviewed by your doctor.",
                  },
                  {
                    icon: Truck,
                    label: "Cold-chain shipping",
                    detail: "2-day refrigerated delivery. Tracked end-to-end.",
                  },
                ].map((row) => {
                  const Icon = row.icon;
                  return (
                    <li
                      key={row.label}
                      className="flex gap-4 items-start"
                      data-testid={`backbone-${row.label.toLowerCase().replace(/ /g, "-")}`}
                    >
                      <Icon
                        size={20}
                        className="text-nx-cobalt shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <div>
                        <p className="font-medium text-nx-fg leading-tight">
                          {row.label}
                        </p>
                        <p className="text-sm text-nx-fg/65 mt-1 leading-snug">
                          {row.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inventory counter strip ─────────────────────────── */}
      <section className="bg-nx-cobalt text-[var(--nx-bg-cream)] border-y border-black/20">
        <div className="nx-container py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <CounterCell num="17" label="peptides on shelf" />
            <CounterCell num="07" label="categories" />
            <CounterCell num="3,200+" label="patients served" />
            <CounterCell num="USP 797" label="pharmacy standard" />
          </div>
        </div>
      </section>

      {/* ── THE SHELF — Categories ──────────────────────────── */}
      <section className="bg-[var(--nx-bg-cream)]">
        <div className="nx-container py-20 md:py-28">
          <div className="mb-16 max-w-[60ch]">
            <p className="nx-eyebrow mb-4">The shelf</p>
            <h2 className="nx-heading mb-5">
              Organized by what it does.{" "}
              <span className="nx-italic-accent">Not by who takes it.</span>
            </h2>
            <p className="text-base text-nx-fg/70 leading-relaxed">
              Peptides are tools. Find what you want to change — appetite,
              recovery, sleep, skin, cognition, cellular age — and read what's
              on the shelf for it.
            </p>
          </div>

          <div className="space-y-20">
            {CATEGORY_ORDER.map((cat, idx) => {
              const items = grouped[cat];
              if (items.length === 0) return null;
              return (
                <CategoryShelf
                  key={cat}
                  category={cat}
                  peptides={items}
                  index={idx}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Path-to-prescription strip ──────────────────────── */}
      <section className="border-t border-black/10 bg-white">
        <div className="nx-container py-20 md:py-24">
          <div className="max-w-[60ch] mb-14">
            <p className="nx-eyebrow mb-4">The path</p>
            <h2 className="nx-heading">
              From shelf to first dose.{" "}
              <span className="nx-italic-accent">In four steps.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {[
              {
                num: "01",
                label: "Intake",
                detail:
                  "8-minute medical questionnaire. Goals, history, current medications, lab access.",
              },
              {
                num: "02",
                label: "Physician review",
                detail:
                  "Licensed doctor reviews your file. Approves or asks for additional bloodwork.",
              },
              {
                num: "03",
                label: "Pharmacy",
                detail:
                  "Prescription routed to a USP <797> compounding pharmacy. Compounded fresh.",
              },
              {
                num: "04",
                label: "Cold-chain ship",
                detail:
                  "Refrigerated 2-day shipping. Comes with reconstitution instructions and bloodwork schedule.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="border-t border-nx-cobalt pt-6"
                data-testid={`step-${step.num}`}
              >
                <p
                  className="font-serif italic text-nx-cobalt text-2xl mb-3"
                  style={{ fontFamily: "Fraunces" }}
                >
                  {step.num}
                </p>
                <p className="font-medium text-nx-fg mb-2 text-lg">
                  {step.label}
                </p>
                <p className="text-sm text-nx-fg/65 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Link href="/how-it-works">
              <a
                className="inline-flex items-center gap-2 text-nx-cobalt font-medium border-b border-nx-cobalt/30 pb-1 hover:border-nx-cobalt transition"
                data-testid="link-how-it-works"
              >
                Read the full process
                <ArrowRight size={16} />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closer ──────────────────────────────────────────── */}
      <section className="bg-nx-cobalt text-[var(--nx-bg-cream)]">
        <div className="nx-container py-24 md:py-32 text-center">
          <p className="nx-eyebrow mb-6 text-[var(--nx-bg-cream)]/70">
            Open the door
          </p>
          <h2 className="nx-hero-heading mb-8 max-w-[20ch] mx-auto">
            The pharmacy is{" "}
            <span className="nx-italic-accent text-[var(--nx-accent-rust)]">
              open.
            </span>
          </h2>
          <Link href="/assessment">
            <a
              className="inline-flex items-center gap-3 bg-[var(--nx-bg-cream)] text-nx-cobalt px-8 py-4 font-medium hover:bg-white transition"
              data-testid="link-start-intake"
            >
              Start your intake
              <ArrowRight size={18} />
            </a>
          </Link>
          <p className="text-sm text-[var(--nx-bg-cream)]/60 mt-6">
            8 minutes. Free. No card required.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Counter cell ───────────────────────────────────────────── */
function CounterCell({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <p
        className="font-serif text-3xl md:text-5xl leading-none mb-2"
        style={{ fontFamily: "Fraunces", fontWeight: 500 }}
      >
        {num}
      </p>
      <p className="nx-eyebrow text-[var(--nx-bg-cream)]/65">{label}</p>
    </div>
  );
}

/* ── A category shelf row ───────────────────────────────────── */
function CategoryShelf({
  category,
  peptides,
  index,
}: {
  category: PeptideCategory;
  peptides: Peptide[];
  index: number;
}) {
  return (
    <div data-testid={`shelf-${category}`}>
      {/* Category header */}
      <div className="border-t border-nx-cobalt/30 pt-6 mb-8 flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <p className="nx-eyebrow text-nx-cobalt mb-2">
            {String(index + 1).padStart(2, "0")} · Category
          </p>
          <h3
            className="font-serif text-3xl md:text-4xl text-nx-fg"
            style={{
              fontFamily: "Fraunces",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {CATEGORY_LABELS[category]}
          </h3>
        </div>
        <p className="text-sm text-nx-fg/65 max-w-[40ch] md:text-right">
          {CATEGORY_DESCRIPTIONS[category]}
        </p>
      </div>

      {/* Peptide cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
        {peptides.map((p) => (
          <PeptideCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}

/* ── Individual peptide card ────────────────────────────────── */
function PeptideCard({ p }: { p: Peptide }) {
  return (
    <Link href={`/peptides/${p.slug}`}>
      <a
        className="group block bg-[var(--nx-bg-cream)] hover:bg-white p-7 transition-colors"
        data-testid={`peptide-card-${p.slug}`}
      >
        {/* Top row: glyph + status */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 flex items-center justify-center text-nx-cobalt">
            <MolecularGlyph
              glyph={p.glyph}
              size={48}
              stroke="currentColor"
              strokeWidth={1.25}
            />
          </div>
          <p
            className="nx-eyebrow text-[10px] text-nx-fg/50 border border-black/10 px-2 py-1"
            data-testid={`peptide-rx-${p.slug}`}
          >
            Rx required
          </p>
        </div>

        {/* Name + tagline */}
        <h4
          className="font-serif text-2xl text-nx-fg mb-1"
          style={{
            fontFamily: "Fraunces",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          {p.name}
        </h4>
        <p className="text-xs text-nx-fg/55 mb-4 italic" style={{ fontFamily: "Fraunces" }}>
          {p.fullName}
        </p>

        <p className="text-sm text-nx-fg/75 leading-relaxed mb-6 line-clamp-3">
          {p.tagline} {p.summary.split(".")[0]}.
        </p>

        {/* Spec strip */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-black/10">
          <SpecRow label="Half-life" value={p.halfLife} />
          <SpecRow label="Dose" value={p.typicalDose} />
          <SpecRow label="Cycle" value={p.cycleLength} />
          <SpecRow label="Route" value={p.administration} />
        </div>

        <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-nx-cobalt font-medium group-hover:gap-2.5 transition-all">
          Read monograph
          <ArrowRight size={12} />
        </div>
      </a>
    </Link>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-nx-fg/45 font-mono mb-0.5" style={{ fontFamily: "DM Mono" }}>
        {label}
      </p>
      <p className="text-xs text-nx-fg leading-tight">{value}</p>
    </div>
  );
}
