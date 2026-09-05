/* ═══ The menu as a rail (R3 "Shop bestsellers", on our full menu) ═══
   A navy band with a photograph behind it, category tabs, and a horizontal
   rail of frosted product tiles: the vial on a tinted panel, the goal tag,
   the name, the plain line, and one button. Every tile links to the PDP;
   pending medicines carry the reserve badge. */
import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { peptides, CATEGORY_LABELS, LIVE_CATEGORIES, liveCategories, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, isSellable, type SoloPeptide } from "@/data/soloCatalog";
import { ProductTile, ProtocolTile } from "@/components/ProductTile";
import { FLAGSHIP_STACKS } from "@/data/stacksCatalog";

const ORDER = liveCategories(["metabolic", "growth", "hormone", "recovery", "longevity", "cognition", "sleep", "skin", "sexual-health"]);

export function MenuRail({ photo }: { photo: string }) {
  const [cat, setCat] = useState<PeptideCategory | "all" | "protocols">("all");
  const rail = useRef<HTMLDivElement>(null);
  const items: SoloPeptide[] = peptides
    .filter((p) => cat === "all" || (cat !== "protocols" && p.category === cat))
    .map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug))
    .filter((s): s is SoloPeptide => Boolean(s))
    /* Live, buyable medicines lead; pending ones trail. A shopper should
       land on what a physician can prescribe today (Chiya 2026-09-05). */
    .sort((a, b) => Number(isSellable(b)) - Number(isSellable(a)));
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.round(rail.current.clientWidth * 0.8), behavior: "smooth" });

  return (
    <section id="treatments" className="nx-band" aria-labelledby="fd-formulary" data-testid="frontdoor-menu" style={{ scrollMarginTop: 72 }}>
      <div className="nx-band__art" aria-hidden="true"><img src={photo} alt="" loading="lazy" decoding="async" /></div>
      <div className="nx-container nx-band__body">
        <div className="nx-band__head">
          <div>
            <p className="nx-band__kicker" style={{ fontFamily: F }}>The medicines</p>
            <h2 id="fd-formulary" className="nx-band__h2" style={{ fontFamily: S }}>What each medicine treats, and what it costs.</h2>
          </div>
          <Link href="/peptides" className="nx-cta-ceramic nx-cta--sm" data-testid="frontdoor-menu-all">See every medicine <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="nx-tabs" role="tablist" aria-label="Filter by goal">
          <button role="tab" aria-selected={cat === "all"} className="nx-tab" onClick={() => setCat("all")} style={{ fontFamily: F }} data-testid="menu-tab-all">All medicines</button>
          <button role="tab" aria-selected={cat === "protocols"} className="nx-tab" onClick={() => setCat("protocols")} style={{ fontFamily: F }} data-testid="menu-tab-protocols">Protocols</button>
          {ORDER.filter((c) => LIVE_CATEGORIES.includes(c)).map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className="nx-tab" onClick={() => setCat(c)} style={{ fontFamily: F }} data-testid={`menu-tab-${c}`}>{CATEGORY_LABELS[c]}</button>
          ))}
        </div>
        <Reveal><div className="nx-rail" ref={rail} data-testid="frontdoor-rail">
          {cat === "protocols" && FLAGSHIP_STACKS.map((st, i) => <ProtocolTile key={st.slug} stack={st} index={i} testId={`frontdoor-protocol-${st.slug}`} />)}
          {cat !== "protocols" && items.map((s, i) => <ProductTile key={s.slug} sku={s} index={i} testId={`frontdoor-sku-${s.slug}`} />)}
        </div></Reveal>
        <div className="nx-rail__nav">
          <button type="button" aria-label="Scroll back" onClick={() => scroll(-1)}><ArrowLeft size={16} /></button>
          <button type="button" aria-label="Scroll forward" onClick={() => scroll(1)}><ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}
