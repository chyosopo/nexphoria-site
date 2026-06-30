import { Link } from "wouter";
import { useParams } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { PricingTiers } from "@/components/PricingTiers";
import { MolecularGlyph } from "@/components/MolecularGlyph";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getStackBySlug,
  getPeptidesForStack,
  glyphForPeptide,
  type Stack,
} from "@/lib/protocols";
import NotFound from "@/pages/not-found";
import {
  Check,
  X,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Snowflake,
  Stethoscope,
  Truck,
} from "lucide-react";
import { useSeo, productJsonLd } from "@/lib/seo";

/* Cinematic per-stack hero images */
import heroWolverine from "@/assets/brand/protocol-hero-wolverine.webp";
import heroGlow from "@/assets/brand/protocol-hero-glow.webp";
import heroLongevity from "@/assets/brand/protocol-hero-longevity.webp";
import heroSleep from "@/assets/brand/protocol-hero-sleep.webp";
import heroLean from "@/assets/brand/protocol-hero-lean.webp";

/* Vial-cluster product PNGs */
import vialWolverine from "@/assets/brand/stack-wolverine.webp";
import vialGlow from "@/assets/brand/stack-glow.webp";
import vialLongevity from "@/assets/brand/stack-longevity.webp";
import vialSleep from "@/assets/brand/stack-sleep.webp";
import vialLean from "@/assets/brand/stack-weightloss.webp";

const STACK_HEROES: Record<string, string> = {
  wolverine: heroWolverine,
  glow: heroGlow,
  longevity: heroLongevity,
  sleep: heroSleep,
  lean: heroLean,
};

const STACK_VIALS: Record<string, string> = {
  wolverine: vialWolverine,
  glow: vialGlow,
  longevity: vialLongevity,
  sleep: vialSleep,
  lean: vialLean,
};

const numberWord = (n: number) =>
  ["Zero", "One", "Two", "Three", "Four", "Five", "Six"][n] ?? String(n);

/* What's-in-the-case inventory — peptide vials (plausible SKU codes) plus
   the standard supplies that ship with every protocol kit. */
function caseInventory(stack: Stack): { item: string; sku: string; qty: string }[] {
  const peps = getPeptidesForStack(stack);
  const vialQty = stack.protocol.duration.includes("16") ? "×4" : "×3";
  const rows = peps.map((p) => ({
    item: `${p.name} — compounded vial`,
    sku: `NX-${p.slug.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 6)}-${stack.slug.slice(0, 3).toUpperCase()}`,
    qty: vialQty,
  }));
  return [
    ...rows,
    { item: "Bacteriostatic water", sku: "NX-BACWTR-30", qty: "×2" },
    { item: "Insulin syringes (0.3mL, 31G)", sku: "NX-SYR-31G", qty: "×60" },
    { item: "Alcohol prep pads", sku: "NX-PREP-200", qty: "×200" },
    { item: "Sharps disposal container", sku: "NX-SHARPS-1L", qty: "×1" },
    { item: "Cold-chain dosing guide", sku: "NX-GUIDE-01", qty: "×1" },
  ];
}

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};

/* ───────────────────────────────────────────────────────────────
   Purchase rail / card — used both as desktop sticky aside and
   inline mobile card. NO italic anywhere (tagline is acid-green only).
   ─────────────────────────────────────────────────────────────── */
function PurchaseCard({ stack }: { stack: Stack }) {
  const fromPrice = Math.min(...stack.pricing.map((t) => t.pricePerMonth));
  return (
    <div className="nx-card bg-card p-6 md:p-7">
      <img
        src={STACK_VIALS[stack.slug]}
        alt={`${stack.name} protocol vials`}
        className="w-[200px] max-w-full h-auto object-contain mx-auto mb-5"
        loading="lazy"
        data-testid={`img-rail-vial-${stack.slug}`}
      />
      <p className="nx-eyebrow text-nx-faint mb-2">PROTOCOL · {stack.name.toUpperCase()}</p>
      <h3 className="font-display text-[28px] font-bold leading-none tracking-tight text-foreground mb-1.5">
        {stack.name}
      </h3>
      {/* Rail tagline — acid green, NO italic (preserves one-italic-per-page lock) */}
      <p className="text-primary text-sm font-medium mb-5">{stack.tagline}</p>

      <div className="flex items-end gap-1.5">
        <span className="font-display text-[56px] leading-[0.85] font-bold text-primary tabular">
          ${fromPrice}
        </span>
        <span className="font-mono text-xs text-muted-foreground mb-2">/month</span>
      </div>
      <p className="font-mono text-[11px] text-nx-faint mt-1.5 mb-5">
        <span className="line-through">{stack.anchorPrice}</span> if sourced separately
      </p>

      <ul className="space-y-2.5 mb-6 border-t border-border pt-5">
        {[
          { icon: Stethoscope, label: "Physician consult included" },
          { icon: ShieldCheck, label: "Pharmacy-compounded peptides" },
          { icon: Snowflake, label: "Cold-chain shipping" },
          { icon: Check, label: "Cancel anytime" },
        ].map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5 text-sm text-foreground/85">
            <Icon className="h-4 w-4 text-primary shrink-0" strokeWidth={2.2} />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <StartIntakeButton
        variant="primary"
        size="lg"
        productSlug={stack.slug}
        source="protocol-rail"
        className="w-full font-bold"
      >
        Start free intake
      </StartIntakeButton>
      <StartIntakeButton
        variant="outline-dark"
        size="md"
        productSlug={stack.slug}
        source="protocol-rail-consult"
        className="w-full mt-3"
        showArrow={false}
      >
        Talk to a physician
      </StartIntakeButton>

      <p className="font-mono text-[11px] text-nx-faint text-center mt-5 leading-relaxed">
        60-day guarantee · No commitments · MD review in 24h
      </p>
    </div>
  );
}

export default function StackReveal() {
  const params = useParams<{ slug: string }>();
  const stack = params.slug ? getStackBySlug(params.slug) : undefined;
  useSeo({
    title: stack
      ? `${stack.name} Protocol — Science you can feel. Results you can measure.`
      : "Protocol — Nexphoria",
    description: stack
      ? `${stack.name}: ${stack.tagline} Physician-prescribed, compounded in U.S. pharmacies, with ongoing medical oversight.`
      : "Physician-guided peptide protocols from Nexphoria.",
    path: stack ? `/protocols/${stack.slug}` : "/protocols",
    jsonLd: stack
      ? [
          productJsonLd({
            name: `${stack.name} Protocol`,
            description: stack.tagline,
            path: `/protocols/${stack.slug}`,
            category: "Peptide therapy protocol",
          }),
        ]
      : undefined,
  });
  if (!stack) return <NotFound />;

  const peptides = getPeptidesForStack(stack);
  const heroSrc = STACK_HEROES[stack.slug] ?? heroWolverine;

  return (
    <SiteLayout navVariant="showcase">
      {/* ═══════════════ ACT 1 — CINEMATIC HERO ═══════════════ */}
      <section
        className="relative w-full h-[70vh] lg:h-[80vh] min-h-[520px] flex items-end overflow-hidden bg-background"
        data-testid={`hero-${stack.slug}`}
      >
        {/* Crisp atmospheric image — NO blur, NO scroll-scale, NO parallax */}
        <img
          src={heroSrc}
          alt={`${stack.name} protocol`}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          data-testid={`img-hero-${stack.slug}`}
        />
        {/* Top gradient: background → transparent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 30%)",
          }}
          aria-hidden
        />
        {/* Bottom gradient: background → transparent (legibility) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to top, hsl(var(--background)) 0%, transparent 50%)",
          }}
          aria-hidden
        />

        <div className="nx-container relative z-10 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <p
              className="nx-eyebrow text-nx-faint mb-5"
              data-testid={`text-hero-eyebrow-${stack.slug}`}
            >
              PROTOCOL · {stack.name.toUpperCase()}
            </p>
            <h1
              className="font-display font-semibold tracking-tight text-foreground leading-[0.95] mb-6"
              style={{ fontSize: "clamp(2.75rem, 6.4vw, 6rem)" }}
              data-testid={`text-hero-problem-${stack.slug}`}
            >
              {stack.problem}
            </h1>
            <p className="text-foreground/75 text-lg md:text-[22px] leading-snug max-w-2xl mb-7">
              {stack.subProblem}
            </p>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-nx-faint">
              {stack.protocol.duration} · {numberWord(peptides.length).toLowerCase()} peptides ·
              physician-prescribed
            </p>
          </div>
        </div>

        {/* Scroll cue — animates only when motion is allowed */}
        <button
          type="button"
          onClick={() => scrollToId("protocol-reveal")}
          aria-label="Scroll to protocol"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-foreground/50 hover:text-primary transition-colors motion-safe:animate-bounce"
          data-testid="button-scroll-cue"
        >
          <ChevronDown className="h-6 w-6" strokeWidth={1.8} />
        </button>
      </section>

      {/* ═══════════════ MOBILE PURCHASE CARD (inline, after hero) ═══════════════ */}
      <section className="lg:hidden bg-background pt-12 pb-2">
        <div className="nx-container">
          <Reveal>
            <PurchaseCard stack={stack} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ BODY GRID: main + sticky rail ═══════════════ */}
      <div className="bg-background">
        <div className="nx-container">
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 py-20 md:py-28">
            {/* ───────── MAIN COLUMN ───────── */}
            <main className="min-w-0">
              {/* ACT 2 — THE PROTOCOL (vial cluster + italic moment) */}
              <section id="protocol-reveal" className="scroll-mt-24">
                <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
                  <Reveal>
                    <div className="relative nx-card bg-card p-8 md:p-10 flex items-center justify-center">
                      <img
                        src={STACK_VIALS[stack.slug]}
                        alt={`${stack.name} vial cluster`}
                        className="w-full max-w-[340px] h-auto object-contain"
                        loading="lazy"
                        data-testid={`img-reveal-vial-${stack.slug}`}
                      />
                    </div>
                  </Reveal>
                  <Reveal delay={120}>
                    <p className="nx-eyebrow text-primary mb-5">THE PROTOCOL</p>
                    {/* ── THE ONE GAMBARINO ITALIC MOMENT ON THIS PAGE ── */}
                    <h2
                      className="font-display font-semibold tracking-tight text-foreground leading-[1.02] mb-7"
                      style={{ fontSize: "clamp(2.1rem, 4vw, 3.25rem)" }}
                      data-testid={`text-protocol-headline-${stack.slug}`}
                    >
                      {stack.protocolItalicHeadline.plain}
                      <span className="font-serif text-primary">
                        {stack.protocolItalicHeadline.italic}
                      </span>
                      {stack.protocolItalicHeadline.plain2}
                    </h2>
                    <ul className="space-y-4 mb-8">
                      {stack.protocolDoes.map((line, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="nx-data-dot mt-2 shrink-0" aria-hidden />
                          <span className="text-foreground/80 leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => scrollToId("molecules")}
                      className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-mono text-xs uppercase tracking-[0.16em]"
                      data-testid="link-see-science"
                    >
                      See the science <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
                    </button>
                  </Reveal>
                </div>
              </section>

              {/* ACT 3 — OUTCOME KPI BAND */}
              <section className="mt-20 md:mt-28">
                <Reveal>
                  <div className="nx-card bg-card p-8 md:p-12">
                    <p className="nx-eyebrow text-nx-faint mb-8">WHAT CHANGES · AGGREGATED COHORT</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                      {stack.outcomeKpis.map((kpi, i) => (
                        <div key={i} data-testid={`kpi-${stack.slug}-${i}`}>
                          <p className="font-display font-bold text-primary tabular leading-none mb-2"
                            style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
                            {kpi.value}
                          </p>
                          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground leading-snug">
                            {kpi.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[12px] text-nx-faint mt-10 border-t border-border pt-6">
                      {stack.outcomesFootnote}
                    </p>
                  </div>
                </Reveal>
              </section>

              {/* MOLECULES */}
              <section id="molecules" className="mt-20 md:mt-28 scroll-mt-24">
                <Reveal>
                  <p className="nx-eyebrow text-primary mb-5">THE MOLECULES</p>
                  <h2 className="nx-headline text-foreground max-w-2xl mb-12">
                    {numberWord(peptides.length)} molecules.{" "}
                    <span className="font-medium text-primary">One protocol.</span>
                  </h2>
                </Reveal>
                <div className="space-y-5">
                  {peptides.map((p, idx) => (
                    <Reveal key={p.slug} delay={idx * 80}>
                      <div className="nx-card bg-card p-7 md:p-9 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start nx-card-lift">
                        <div className="sm:col-span-3 flex sm:flex-col items-center sm:items-start gap-4">
                          <MolecularGlyph
                            glyph={glyphForPeptide(p.slug)}
                            size={96}
                            className="text-primary shrink-0"
                            title={`${p.name} molecular glyph`}
                          />
                        </div>
                        <div className="sm:col-span-9 min-w-0">
                          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-nx-faint mb-1">
                            MECHANISM
                          </p>
                          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                            {p.name}
                          </h3>
                          <p className="text-sm text-foreground/55 mb-4">{p.fullName}</p>
                          <p className="text-foreground/80 leading-relaxed max-w-[60ch] mb-3">
                            {p.oneLiner}
                          </p>
                          <p className="text-sm text-foreground/65 leading-relaxed max-w-[60ch] mb-5">
                            {p.mechanism}
                          </p>
                          <Link
                            href={`/peptides/${p.slug}`}
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary hover:text-primary/80 transition-colors"
                            data-testid={`link-peptide-${p.slug}`}
                          >
                            See research <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* WEEK-BY-WEEK TIMELINE — horizontal scroll on desktop */}
              <section className="mt-20 md:mt-28">
                <Reveal>
                  <p className="nx-eyebrow text-primary mb-5">
                    {stack.protocol.duration.toUpperCase()} TIMELINE
                  </p>
                  <h2 className="nx-headline text-foreground max-w-2xl mb-4">
                    What to expect,{" "}
                    <span className="font-medium text-primary">week by week.</span>
                  </h2>
                  <p className="nx-body text-foreground/70 max-w-xl mb-10">
                    Most patients feel the first effects within 7–14 days. Visible outcomes follow
                    on a predictable curve.
                  </p>
                </Reveal>
                <Reveal delay={100}>
                  <div className="relative">
                    {/* acid-green progress line */}
                    <div
                      className="hidden md:block absolute top-7 left-0 right-0 h-px"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.25) 100%)",
                      }}
                      aria-hidden
                    />
                    <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 snap-x">
                      {stack.timeline.map((phase, idx) => (
                        <div
                          key={idx}
                          className="relative shrink-0 w-[78%] sm:w-[60%] md:w-auto snap-start nx-card bg-card p-6 md:p-7 hover:border-primary/40 transition-colors"
                          data-testid={`phase-${idx}`}
                        >
                          <div className="hidden md:block absolute -top-[5px] left-7 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
                          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary mb-3">
                            Phase {String(idx + 1).padStart(2, "0")} · {phase.weeks}
                          </p>
                          <h3 className="font-display text-xl font-bold text-foreground mb-2.5">
                            {phase.phase}
                          </h3>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {phase.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* PROTOCOL LOGISTICS */}
              <section className="mt-20 md:mt-28">
                <Reveal>
                  <p className="nx-eyebrow text-nx-faint mb-5">PROTOCOL LOGISTICS</p>
                  <h2 className="nx-headline text-foreground mb-4">
                    Clinical-grade.{" "}
                    <span className="font-medium text-primary">Home-friendly.</span>
                  </h2>
                  <p className="nx-body text-foreground/70 max-w-xl mb-10">
                    Subcutaneous injection — the same technique as an insulin or GLP-1 pen. Most
                    patients inject in under 30 seconds; we train you on your first kit.
                  </p>
                </Reveal>
                <Reveal delay={100}>
                  <div className="nx-card bg-card p-7 md:p-9 divide-y divide-border">
                    {[
                      { label: "FREQUENCY", value: stack.protocol.frequency },
                      { label: "DURATION", value: stack.protocol.duration },
                      { label: "DOSE", value: stack.protocol.dose },
                      { label: "ADMINISTRATION", value: stack.protocol.administration },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-5 first:pt-0 last:pb-0"
                      >
                        <p className="sm:col-span-4 font-mono text-[11px] uppercase tracking-[0.16em] text-nx-faint pt-1">
                          {row.label}
                        </p>
                        <p className="sm:col-span-8 text-foreground font-display text-lg">
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </section>

              {/* COMPOUNDED BY + WHAT'S IN THE CASE */}
              <section className="mt-20 md:mt-28">
                <Reveal>
                  <p className="nx-eyebrow text-nx-faint mb-5">PROVENANCE</p>
                  <h2 className="nx-headline text-foreground mb-10 max-w-2xl">
                    Compounded with{" "}
                    <span className="font-medium text-primary">a chain of custody.</span>
                  </h2>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Compounded by */}
                  <Reveal>
                    <div className="nx-card bg-card p-7 md:p-9 h-full">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "hsl(var(--accent) / 0.10)" }}>
                          <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={2} />
                        </span>
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                          COMPOUNDED BY
                        </p>
                      </div>
                      <p className="font-display text-xl font-bold text-foreground mb-3 leading-snug">
                        A state-licensed 503A pharmacy in Texas.
                      </p>
                      <p className="text-foreground/75 leading-relaxed text-[15px] mb-5">
                        Your {stack.name} protocol is prepared to prescription by an FDA-registered,
                        state-board-licensed 503A compounding pharmacy — then batch-verified before it
                        ships cold-chain to your door.
                      </p>
                      <ul className="space-y-2.5">
                        {[
                          "FDA-registered facility",
                          "USP &lt;797&gt; sterile compounding",
                          "Batch potency + sterility tested",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                            <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2.4} />
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                  {/* What's in the case */}
                  <Reveal delay={100}>
                    <div className="nx-card bg-card p-7 md:p-9 h-full">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-nx-faint mb-5">
                        WHAT'S IN THE CASE
                      </p>
                      <ul className="divide-y divide-border">
                        {caseInventory(stack).map((row) => (
                          <li key={row.sku} className="flex items-center justify-between gap-4 py-3 first:pt-0">
                            <div className="min-w-0">
                              <p className="text-foreground text-[15px] truncate">{row.item}</p>
                              <p className="font-mono text-[11px] text-nx-faint tabular">{row.sku}</p>
                            </div>
                            <span className="font-mono text-xs text-foreground/60 tabular shrink-0">{row.qty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* PRICING — inline reinforce */}
              <section id="pricing" className="mt-20 md:mt-28 scroll-mt-24">
                <Reveal>
                  <p className="nx-eyebrow text-nx-faint mb-5">TRANSPARENT PRICING</p>
                  <h2 className="nx-headline text-foreground mb-4 max-w-2xl">
                    One protocol.{" "}
                    <span className="font-medium text-primary">Three commitments.</span>
                  </h2>
                  <p className="nx-body text-foreground/70 max-w-xl mb-10">
                    The longer you commit, the lower your monthly cost. Every tier includes physician
                    review, compounded medication, supplies, and ongoing care.
                  </p>
                </Reveal>
                <Reveal delay={100}>
                  <PricingTiers
                    tiers={stack.pricing}
                    productSlug={stack.slug}
                    source="protocol-pricing"
                    variant="dark"
                  />
                </Reveal>
              </section>

              {/* PHYSICIAN CALLOUT */}
              <section className="mt-20 md:mt-28">
                <Reveal>
                  <div className="nx-card bg-card p-7 md:p-10 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "hsl(var(--accent) / 0.10)" }}>
                        <ShieldCheck className="h-6 w-6 text-primary" strokeWidth={2} />
                      </span>
                      <p className="font-display text-xl font-bold text-foreground whitespace-nowrap">
                        Physician-reviewed
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground/80 leading-relaxed mb-3">
                        {stack.physicianCalloutCopy}
                      </p>
                      <Link
                        href="/physicians"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary hover:text-primary/80 transition-colors"
                        data-testid="link-physicians"
                      >
                        Meet our physicians <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* WHAT YOU GET / WHAT YOU DON'T */}
              <section className="mt-20 md:mt-28">
                <Reveal>
                  <p className="nx-eyebrow text-nx-faint mb-5">THE DIFFERENCE</p>
                  <h2 className="nx-headline text-foreground mb-10 max-w-2xl">
                    What you get.{" "}
                    <span className="font-medium text-primary">What you don't.</span>
                  </h2>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-5">
                  <Reveal>
                    <div className="nx-card bg-card p-7 md:p-9 h-full" style={{ borderLeft: "2px solid hsl(var(--accent))" }}>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary mb-5">
                        WHAT YOU GET
                      </p>
                      <ul className="space-y-3.5">
                        {[
                          "Pharmacy-compounded by an FDA-registered 503A facility",
                          "Real physician oversight, not AI prescribing",
                          "Lab work covered when needed",
                          "60-day satisfaction guarantee",
                          "Monitored every 90 days",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2.4} />
                            <span className="text-foreground/85">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                  <Reveal delay={100}>
                    <div className="nx-card bg-card p-7 md:p-9 h-full" style={{ borderLeft: "2px solid hsl(330 60% 45%)" }}>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-5">
                        WHAT YOU DON'T
                      </p>
                      <ul className="space-y-3.5">
                        {[
                          "Mystery research-chemical vials from gray-market sources",
                          "“Telehealth-mill” rubber-stamp prescriptions",
                          "Lock-in contracts",
                          "Hidden monthly fees",
                          "Bro-science dosing",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <X className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "hsl(330 65% 58%)" }} strokeWidth={2.4} />
                            <span className="text-foreground/60">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* FAQ ACCORDION — stack-specific */}
              <section className="mt-20 md:mt-28">
                <Reveal>
                  <p className="nx-eyebrow text-primary mb-5">QUESTIONS</p>
                  <h2 className="nx-headline text-foreground mb-10 max-w-2xl">
                    Before you{" "}
                    <span className="font-medium text-primary">begin.</span>
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <Accordion type="single" collapsible className="nx-card bg-card px-6 md:px-8">
                    {stack.faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="border-border last:border-b-0"
                        data-testid={`faq-${stack.slug}-${i}`}
                      >
                        <AccordionTrigger className="text-left font-display text-lg font-semibold text-foreground hover:no-underline [&>svg]:text-primary py-5">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground/75 leading-relaxed text-[15px] pr-6 pb-5">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Reveal>
              </section>

              {/* CONTRAINDICATIONS — acid-green border-left */}
              <section className="mt-20 md:mt-28">
                <Reveal>
                  <div
                    className="nx-card bg-card p-7 md:p-10"
                    style={{ borderLeft: "3px solid hsl(var(--accent))" }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-nx-faint mb-2">
                      NOT FOR EVERYONE
                    </p>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-5">
                      Contraindications
                    </h3>
                    <p className="text-foreground/75 mb-4">
                      Our physicians will not prescribe {stack.name} if you have:
                    </p>
                    <ul className="space-y-2.5">
                      {stack.contraindications.map((c, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-muted-foreground mt-2">—</span>
                          <span className="text-foreground/80">{c}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-foreground/55 mt-6 border-t border-border pt-6">
                      Our intake form screens for these and additional conditions. If you have any
                      concerns, our clinical team reviews edge cases case-by-case.
                    </p>
                  </div>
                </Reveal>
              </section>
            </main>

            {/* ───────── STICKY PURCHASE RAIL (lg+ only) ───────── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <PurchaseCard stack={stack} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ═══════════════ ACT 4 — CLOSING CTA (full-width) ═══════════════ */}
      <section className="relative bg-background text-foreground py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #c6f184 0%, transparent 50%), radial-gradient(circle at 80% 70%, #a8a8a0 0%, transparent 50%)",
          }}
          aria-hidden
        />
        <div className="nx-container relative max-w-4xl text-center">
          <Reveal>
            <p className="nx-eyebrow text-primary mb-6">READY TO BEGIN</p>
            <h2 className="nx-display mb-7 leading-[0.98]">
              Start your{" "}
              <span className="font-medium text-primary">{stack.name.toLowerCase()}</span>{" "}
              protocol.
            </h2>
            <p className="nx-body text-foreground/70 mb-10 max-w-2xl mx-auto">
              5-minute intake. MD review within 48 hours. Your first kit ships in under a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <StartIntakeButton
                variant="primary"
                size="lg"
                productSlug={stack.slug}
                source="protocol-hero"
                className="font-bold"
              >
                Start free intake
              </StartIntakeButton>
              <StartIntakeButton
                variant="outline-dark"
                size="lg"
                productSlug={stack.slug}
                source="protocol-closing-consult"
                showArrow={false}
              >
                Talk to a physician
              </StartIntakeButton>
            </div>
            <Link
              href="/protocols"
              className="inline-block mt-8 text-foreground/60 hover:text-primary transition-colors text-sm font-mono uppercase tracking-[0.16em]"
              data-testid="link-other-protocols"
            >
              ← See other protocols
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
