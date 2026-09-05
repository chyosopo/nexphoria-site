/* ═══ THE product tile (the Spine, Phase 2; the polish pass, 2026-09-05) ═══
   One card for every shelf: the home rail, the catalog, a goal page's
   options, a product page's "other treatments". The render fills the top of
   the card edge to edge with the chips over it (the goal, Rx, and Pending
   when it applies), then the name, one line, the price set large, and the
   house pill. A protocol uses the same tile with its photograph. Anything a
   shelf needs to say about a product is said here, so two shelves can never
   disagree. The styles live in styles/catalog.css. */
import { Link } from "wouter";
import { m, useSheen, PRESS_SPRING } from "@/motion";
import { F, S } from "@/lib/typography";
import { statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { usd, stackReservable, type FlagshipStack } from "@/data/stacksCatalog";
import { peptides, CATEGORY_LABELS } from "@/data/peptides";
import { stackArt } from "@/data/outcomeImagery";
import { SkuPhoto } from "@/components/SkuPhoto";
import { VialPanel, labelSpec } from "@/components/VialMockup";
import { StatusPill } from "@/components/StatusPill";
import { BenefitStrip } from "@/components/BenefitStrip";
import { ExpectTimeline } from "@/components/ExpectTimeline";
import "@/styles/catalog.css";

/* The card's one line: the outcome without its "For <goal>." opener (the
   goal chip already says it), cut at the first full stop. The whole
   outcome stays in the card's accessible name. */
export function oneLineOf(outcome: string): string {
  const rest = outcome.replace(/^For [^.]+\.\s*/, "");
  const body = rest.trim() ? rest : outcome;
  const m = body.match(/^[^.]+[.]/);
  return (m ? m[0] : body).trim();
}

/* "From $103/mo" with the number set large; a note when there is no number. */
function PriceLine({ from, note }: { from?: number; note?: string }) {
  return (
    <span className="nx-frost__price" style={{ fontFamily: F }}>
      {from !== undefined ? <><span>From</span><b style={{ fontFamily: S }}>{usd(from)}</b><span>/mo</span></> : <span className="nx-frost__price--note">{note}</span>}
    </span>
  );
}

export function ProductTile({ sku, index = 0, detail = false, base = "", testId }: { sku: SoloPeptide; index?: number; detail?: boolean; base?: string; testId?: string }) {
  const goal = peptides.find((p) => p.slug === sku.slug)?.category;
  const status = statusOf(sku);
  const pending = status === "coming" ? "Pending" : status === "watch" ? "Under review" : null;
  const sheen = useSheen();
  return (
    <Link href={`${base}/peptides/${sku.slug}`} asChild>
    <m.a className="nx-frost nx-stagger-item nx-sheen" style={{ ["--i" as string]: Math.min(index, 8) }} data-testid={testId ?? `tile-${sku.slug}`} aria-label={`${sku.name}: ${sku.outcome}`} whileTap={{ scale: 0.975 }} transition={PRESS_SPRING} {...sheen}>
      <div className="nx-frost__media" data-goal={goal}>
        <span className="nx-frost__chips" aria-hidden="true">
          <span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{goal ? CATEGORY_LABELS[goal] : sku.category}</span>
          <span className="nx-chip" style={{ fontFamily: F }}>Rx</span>
          {pending && <span className="nx-chip nx-chip--pending" style={{ fontFamily: F }}>{pending}</span>}
        </span>
        <SkuPhoto slug={sku.slug} name={sku.name} className="nx-sku-img nx-sku-img--card" fallback={<VialPanel name={sku.name} dose={labelSpec(sku.spec)} size="78%" ratio="1 / 1" fill={0.58} />} />
      </div>
      <div className="nx-frost__body">
        <span className="nx-frost__name" style={{ fontFamily: S }}>{sku.name}</span>
        <span className="nx-frost__line" style={{ fontFamily: F }}>{oneLineOf(sku.outcome)}</span>
        {detail && <div style={{ marginTop: ".7rem" }}><BenefitStrip slug={sku.slug} compact /></div>}
        {detail && <div style={{ marginTop: ".8rem" }}><ExpectTimeline slug={sku.slug} compact /></div>}
        {detail && sku.feelBy && <span className="nx-frost__feel" style={{ fontFamily: F }}>Typical onset: {sku.feelBy.charAt(0).toLowerCase() + sku.feelBy.slice(1)}</span>}
        {sku.gated ? <PriceLine note="Priced after review" /> : sku.pricing ? <PriceLine from={sku.pricing.m12} /> : <PriceLine note="Priced at consultation" />}
        <span className="nx-frost__btn nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }}>Read more</span>
      </div>
    </m.a>
    </Link>
  );
}

export function ProtocolTile({ stack, index = 0, testId }: { stack: FlagshipStack; index?: number; testId?: string }) {
  const art = stackArt(stack.slug);
  const from = stack.cadences.length ? Math.min(...stack.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
  return (
    <Link href={`/stacks/${stack.slug}`} className="nx-frost nx-stagger-item" style={{ ["--i" as string]: Math.min(index, 8) }} data-testid={testId ?? `tile-stack-${stack.slug}`}>
      <div className="nx-frost__media nx-frost__media--photo">
        <span className="nx-frost__chips" aria-hidden="true">
          <span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{stack.category}</span>
          <span className="nx-chip" style={{ fontFamily: F }}>Rx</span>
        </span>
        {art && <img src={art} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1632} height={2048} />}
      </div>
      <div className="nx-frost__body">
        <span className="nx-frost__name" style={{ fontFamily: S }}>{stack.name}</span>
        <span className="nx-frost__line" style={{ fontFamily: F }}>{stack.peptides.map((p) => p.name).join(" + ")}</span>
        {stackReservable(stack) && <StatusPill status="reserve" short style={{ marginTop: 6, alignSelf: "flex-start" }} />}
        {stack.gated ? <PriceLine note="Priced at consultation" /> : from ? <PriceLine from={from} /> : <PriceLine note="" />}
        <span className="nx-frost__btn nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }}>Read more</span>
      </div>
    </Link>
  );
}
