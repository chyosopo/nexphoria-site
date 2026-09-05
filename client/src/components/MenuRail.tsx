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
import { SOLO_CATALOG, type SoloPeptide } from "@/data/soloCatalog";
import { ProductTile, ProtocolTile } from "@/components/ProductTile";
import { FLAGSHIP_STACKS } from "@/data/stacksCatalog";

const ORDER = liveCategories(["metabolic", "growth", "hormone", "recovery", "longevity", "cognition", "sleep", "skin", "sexual-health"]);

export function MenuRail({ photo }: { photo: string }) {
  const [cat, setCat] = useState<PeptideCategory | "all" | "protocols">("all");
  /* How you take it (alyverx.com filters its grid by injectable or not):
     injection, nasal spray, or taken only on the day. */
  const [route, setRoute] = useState<"any" | "injection" | "nasal" | "as-needed">("any");
  const isNasal = (s: SoloPeptide) => s.route === "nasal" || /nasal spray/i.test(s.outcome);
  const isAsNeeded = (s: SoloPeptide) => /as needed|before\./i.test(s.outcome);
  const rail = useRef<HTMLDivElement>(null);
  const items: SoloPeptide[] = peptides
    .filter((p) => cat === "all" || (cat !== "protocols" && p.category === cat))
    .map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug))
    .filter((s): s is SoloPeptide => Boolean(s))
    .filter((s) => route === "any" || (route === "nasal" ? isNasal(s) : route === "as-needed" ? isAsNeeded(s) : !isNasal(s)));
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.round(rail.current.clientWidth * 0.8), behavior: "smooth" });

  return (
    <section className="nx-band" aria-labelledby="fd-formulary" data-testid="frontdoor-menu">
      <div className="nx-band__art" aria-hidden="true"><img src={photo} alt="" loading="lazy" decoding="async" /></div>
      <div className="nx-container nx-band__body">
        <div className="nx-band__head">
          <div>
            <p className="nx-band__kicker" style={{ fontFamily: F }}>The medicines</p>
            <h2 id="fd-formulary" className="nx-band__h2" style={{ fontFamily: S }}>All twenty-two, with what each is for and its price.</h2>
          </div>
          <Link href="/peptides" className="nx-cta-ceramic nx-cta--sm" data-testid="frontdoor-menu-all">The complete list <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="nx-tabs" role="tablist" aria-label="Filter by goal">
          <button role="tab" aria-selected={cat === "all"} className="nx-tab" onClick={() => setCat("all")} style={{ fontFamily: F }} data-testid="menu-tab-all">All medicines</button>
          <button role="tab" aria-selected={cat === "protocols"} className="nx-tab" onClick={() => setCat("protocols")} style={{ fontFamily: F }} data-testid="menu-tab-protocols">Protocols</button>
          {ORDER.filter((c) => LIVE_CATEGORIES.includes(c)).map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className="nx-tab" onClick={() => setCat(c)} style={{ fontFamily: F }} data-testid={`menu-tab-${c}`}>{CATEGORY_LABELS[c]}</button>
          ))}
        </div>
        {cat !== "protocols" && (
          <div className="nx-tabs nx-tabs--route" role="tablist" aria-label="Filter by how you take it">
            {([["any", "Any form"], ["injection", "Injection"], ["nasal", "Nasal spray"], ["as-needed", "Taken as needed"]] as const).map(([k, label]) => (
              <button key={k} role="tab" aria-selected={route === k} className="nx-tab nx-tab--sm" onClick={() => setRoute(k)} style={{ fontFamily: F }} data-testid={`menu-route-${k}`}>{label}</button>
            ))}
          </div>
        )}
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
