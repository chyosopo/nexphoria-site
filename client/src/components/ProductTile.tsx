/* ═══ THE product tile (the Spine, Phase 2) ═══
   One card for every shelf: the home rail, the catalog, a goal page's
   options, a product page's "other treatments". The vial on a tinted panel,
   the goal tag, the name, the plain line, availability, when you feel it,
   the from-price, one button. A protocol uses the same tile with its
   photograph. Anything a shelf needs to say about a product is said here,
   so two shelves can never disagree. */
import { Link } from "wouter";
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

export function ProductTile({ sku, index = 0, detail = false, base = "", testId }: { sku: SoloPeptide; index?: number; detail?: boolean; base?: string; testId?: string }) {
  const goal = peptides.find((p) => p.slug === sku.slug)?.category;
  return (
    <Link href={`${base}/peptides/${sku.slug}`} className="nx-frost nx-stagger-item" style={{ ["--i" as string]: Math.min(index, 8) }} data-testid={testId ?? `tile-${sku.slug}`} aria-label={`${sku.name}: ${sku.outcome}`}>
      <div className="nx-frost__media" data-goal={goal}>
        <SkuPhoto slug={sku.slug} name={sku.name} className="nx-sku-img nx-sku-img--card" fallback={<VialPanel name={sku.name} dose={labelSpec(sku.spec)} size="78%" ratio="1 / 1" fill={0.58} />} />
      </div>
      <div className="nx-frost__body">
        <span className="nx-frost__tag" style={{ fontFamily: F }}>{goal ? CATEGORY_LABELS[goal] : sku.category}</span>
        <span className="nx-frost__name" style={{ fontFamily: S }}>{sku.name}</span>
        <span className="nx-frost__line" style={{ fontFamily: F }}>{sku.outcome}</span>
        <StatusPill status={statusOf(sku)} short style={{ marginTop: 6 }} />
        {detail && <div style={{ marginTop: ".7rem" }}><BenefitStrip slug={sku.slug} compact /></div>}
        {detail && <div style={{ marginTop: ".8rem" }}><ExpectTimeline slug={sku.slug} compact /></div>}
        {sku.feelBy && <span className="nx-frost__feel" style={{ fontFamily: F }}>Typical onset: {sku.feelBy.charAt(0).toLowerCase() + sku.feelBy.slice(1)}</span>}
        <span className="nx-frost__price" style={{ fontFamily: F }}>{sku.gated ? "Priced after review" : sku.pricing ? `From ${usd(sku.pricing.m12)}/mo` : "Priced at consultation"}</span>
        <span className="nx-frost__btn nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }}>Read more</span>
      </div>
    </Link>
  );
}

export function ProtocolTile({ stack, index = 0, testId }: { stack: FlagshipStack; index?: number; testId?: string }) {
  const art = stackArt(stack.slug);
  const from = stack.cadences.length ? Math.min(...stack.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
  return (
    <Link href={`/stacks/${stack.slug}`} className="nx-frost nx-stagger-item" style={{ ["--i" as string]: Math.min(index, 8) }} data-testid={testId ?? `tile-stack-${stack.slug}`}>
      <div className="nx-frost__media nx-frost__media--photo">{art && <img src={art} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1632} height={2048} />}</div>
      <div className="nx-frost__body">
        <span className="nx-frost__tag" style={{ fontFamily: F }}>{stack.category}</span>
        <span className="nx-frost__name" style={{ fontFamily: S }}>{stack.name}</span>
        <span className="nx-frost__line" style={{ fontFamily: F }}>{stack.peptides.map((p) => p.name).join(" + ")}</span>
        {stackReservable(stack) && <StatusPill status="reserve" short style={{ marginTop: 6 }} />}
        <span className="nx-frost__price" style={{ fontFamily: F }}>{stack.gated ? "Priced at consultation" : from ? `From ${usd(from)}/mo` : ""}</span>
        <span className="nx-frost__btn nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }}>Read more</span>
      </div>
    </Link>
  );
}
