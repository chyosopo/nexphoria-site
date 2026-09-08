/* ═══ The treatments (the ivy restyle, 2026-09-08) ═══
   The label pill, the headline with its gradient phrase, "All treatments"
   at the right, and every medicine as a card in a rail: live and priced
   first, pending after. Every card links to its page (id="treatments"). */
import { useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { F } from "@/lib/typography";
import { peptides } from "@/data/peptides";
import { SOLO_CATALOG, isSellable, type SoloPeptide } from "@/data/soloCatalog";
import { ProductTile } from "@/components/ProductTile";

export function TreatmentsRail() {
  const rail = useRef<HTMLDivElement>(null);
  const items: SoloPeptide[] = peptides
    .map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug))
    .filter((s): s is SoloPeptide => Boolean(s))
    .sort((a, b) => Number(isSellable(b)) - Number(isSellable(a)));
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.round(rail.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <section id="treatments" className="nx-container nx-sec" aria-labelledby="fd-formulary" data-testid="frontdoor-menu" style={{ scrollMarginTop: 72 }}>
      <div className="nx-ivhead">
        <div>
          <p className="nx-eyebrow">Treatments</p>
          <h2 id="fd-formulary" className="nx-ivhead__h2">Feel better, <span className="nx-grad">for longer</span></h2>
        </div>
        <Link href="/peptides" className="nx-cta-ceramic" style={{ fontFamily: F }} data-testid="frontdoor-menu-all">All treatments</Link>
      </div>
      <div className="nx-trail" ref={rail} data-testid="frontdoor-rail">
        {items.map((s, i) => <ProductTile key={s.slug} sku={s} index={i} testId={`frontdoor-sku-${s.slug}`} />)}
      </div>
      <div className="nx-trail__nav">
        <button type="button" aria-label="Scroll back" onClick={() => scroll(-1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label="Scroll forward" onClick={() => scroll(1)}><ArrowRight size={18} /></button>
      </div>
    </section>
  );
}
