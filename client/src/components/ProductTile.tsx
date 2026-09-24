/* ═══ THE product card (the ivy restyle, 2026-09-08) ═══
   One card for every shelf, the way ivyrx.com lays theirs out: the name and
   the price at the top, the vial on the goal's tint, one dark pill and one
   white pill, and the safety line. The render is transparent (the house
   studio), so the tint behind it is the goal's colour from the ivy layer.
   Anything a shelf needs to say about a product is said here, so two
   shelves can never disagree. Styles: styles/catalog.css and styles/ivy.css. */
import { Link } from "wouter";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { F } from "@/lib/typography";
import { statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { usd, stackReservable, type FlagshipStack } from "@/data/stacksCatalog";
import { peptides, CATEGORY_LABELS } from "@/data/peptides";
import { stackArt } from "@/data/outcomeImagery";
import { SkuPhoto } from "@/components/SkuPhoto";
import { VialPanel, labelSpec } from "@/components/VialMockup";
import { StatusPill } from "@/components/StatusPill";
import "@/styles/catalog.css";
import "@/styles/ivy.css";

/* The card's one line: the outcome without its "For <goal>." opener (the
   goal chip already says it), cut at the first full stop. The whole
   outcome stays in the card's accessible name. */
export function oneLineOf(outcome: string): string {
  const rest = outcome.replace(/^For [^.]+\.\s*/, "");
  const body = rest.trim() ? rest : outcome;
  const m = body.match(/^[^.]+[.]/);
  return (m ? m[0] : body).trim();
}

/* "$183/mo" with the number set as the figure; a note when there is no number. */
function PriceLine({ from, note }: { from?: number; note?: string }) {
  return (
    <p className="nx-pcard__price" style={{ fontFamily: F }}>
      {from !== undefined ? <><b>{usd(from)}</b>/mo<small>{usd(from * 12)} for twelve months</small></> : <span>{note}</span>}
    </p>
  );
}

export function ProductTile({ sku, index = 0, base = "", testId }: { sku: SoloPeptide; index?: number; detail?: boolean; base?: string; testId?: string }) {
  void index;
  const goal = peptides.find((p) => p.slug === sku.slug)?.category;
  const status = statusOf(sku);
  const pending = status === "coming" ? "Pending" : status === "watch" ? "Under review" : null;
  const href = `${base}/peptides/${sku.slug}`;
  return (
    <article className={`nx-pcard${pending ? " nx-pcard--pending" : ""}`} data-testid={`card-${sku.slug}`}>
      <Link href={href} className="nx-pcard__name" data-testid={testId ?? `tile-${sku.slug}`} aria-label={`${sku.name}: ${sku.outcome}`}>{sku.name}</Link>
      {sku.gated ? <PriceLine note="Priced after review" /> : sku.pricing ? <PriceLine from={sku.pricing.m12} /> : <PriceLine note="Priced at consultation" />}
      <Link href={href} className="nx-pcard__media nx-tint" data-goal={goal} aria-hidden="true" tabIndex={-1}>
        <span className="nx-chips nx-pcard__chips">
          <span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{goal ? CATEGORY_LABELS[goal] : sku.category}</span>
          <span className="nx-chip" style={{ fontFamily: F }}>Rx</span>
          {pending && <span className="nx-chip" style={{ fontFamily: F }}>{pending}</span>}
        </span>
        <SkuPhoto slug={sku.slug} name={sku.name} className="nx-sku-img nx-sku-img--card" fallback={<VialPanel name={sku.name} dose={labelSpec(sku.spec)} size="78%" ratio="1 / 1" fill={0.58} />} />
      </Link>
      <p className="nx-pcard__line" style={{ fontFamily: F }}>{oneLineOf(sku.outcome)}</p>
      <div className="nx-pcard__actions">
        <Link href={`${href}#buy`} className="nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }} data-testid={`shop-${sku.slug}`}>
          {pending ? "See the price" : "Shop now"} <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span>
        </Link>
        <Link href={href} className="nx-cta-ceramic nx-cta--sm" style={{ fontFamily: F }}>Learn more</Link>
      </div>
      <Link href={`${href}#solo-contra-title`} className="nx-pcard__safety" style={{ fontFamily: F }}><ShieldCheck aria-hidden="true" /> Important safety information</Link>
    </article>
  );
}

export function ProtocolTile({ stack, index = 0, testId }: { stack: FlagshipStack; index?: number; testId?: string }) {
  void index;
  const art = stackArt(stack.slug);
  const from = stack.cadences.length ? Math.min(...stack.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
  const href = `/stacks/${stack.slug}`;
  return (
    <article className="nx-pcard" data-testid={`card-stack-${stack.slug}`}>
      <Link href={href} className="nx-pcard__name" data-testid={testId ?? `tile-stack-${stack.slug}`}>{stack.name}</Link>
      {stack.gated ? <PriceLine note="Priced at consultation" /> : from ? <PriceLine from={from} /> : <PriceLine note="" />}
      <Link href={href} className="nx-pcard__media nx-frost__media--photo" aria-hidden="true" tabIndex={-1}>
        <span className="nx-chips nx-pcard__chips">
          <span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{stack.category}</span>
          <span className="nx-chip" style={{ fontFamily: F }}>Rx</span>
        </span>
        {art && <img src={art} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1632} height={2048} />}
      </Link>
      <p className="nx-pcard__line" style={{ fontFamily: F }}>{stack.peptides.map((p) => p.name).join(" + ")}</p>
      {stackReservable(stack) && <StatusPill status="reserve" short style={{ marginTop: 6, alignSelf: "flex-start" }} />}
      <div className="nx-pcard__actions">
        <Link href={href} className="nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }}>See the protocol <span className="nx-cta__arrow" aria-hidden="true"><ArrowRight /></span></Link>
      </div>
    </article>
  );
}
