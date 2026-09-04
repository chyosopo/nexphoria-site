/* ═══ The menu as a rail (R3 "Shop bestsellers", on our full menu) ═══
   A navy band with a photograph behind it, category tabs, and a horizontal
   rail of frosted product tiles: the vial on a tinted panel, the goal tag,
   the name, the plain line, and one button. Every tile links to the PDP;
   pending medicines carry the reserve badge. */
import { useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { peptides, CATEGORY_LABELS, LIVE_CATEGORIES, liveCategories, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, statusOf, type SoloPeptide } from "@/data/soloCatalog";
import { SkuPhoto } from "@/components/SkuPhoto";
import { VialPanel, labelSpec } from "@/components/VialMockup";
import { StatusPill } from "@/components/StatusPill";
import { usd, FLAGSHIP_STACKS, stackReservable } from "@/data/stacksCatalog";
import { stackArt } from "@/data/outcomeImagery";

const ORDER = liveCategories(["metabolic", "growth", "hormone", "recovery", "longevity", "cognition", "sleep", "skin", "sexual-health"]);

export function MenuRail({ photo }: { photo: string }) {
  const [cat, setCat] = useState<PeptideCategory | "all" | "protocols">("all");
  const rail = useRef<HTMLDivElement>(null);
  const items: SoloPeptide[] = peptides
    .filter((p) => cat === "all" || (cat !== "protocols" && p.category === cat))
    .map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug))
    .filter((s): s is SoloPeptide => Boolean(s));
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.round(rail.current.clientWidth * 0.8), behavior: "smooth" });
  const goalOf = (s: SoloPeptide) => peptides.find((p) => p.slug === s.slug)?.category;

  return (
    <section className="nx-band" aria-labelledby="fd-formulary" data-testid="frontdoor-menu">
      <div className="nx-band__art" aria-hidden="true"><img src={photo} alt="" loading="lazy" decoding="async" /></div>
      <div className="nx-container nx-band__body">
        <div className="nx-band__head">
          <div>
            <p className="nx-band__kicker" style={{ fontFamily: F }}>The medications</p>
            <h2 id="fd-formulary" className="nx-band__h2" style={{ fontFamily: S }}>The full menu, and what each one does.</h2>
          </div>
          <Link href="/peptides" className="nx-cta-ceramic nx-cta--sm" data-testid="frontdoor-menu-all">The complete catalog <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="nx-tabs" role="tablist" aria-label="Filter by goal">
          <button role="tab" aria-selected={cat === "all"} className="nx-tab" onClick={() => setCat("all")} style={{ fontFamily: F }} data-testid="menu-tab-all">All medicines</button>
          <button role="tab" aria-selected={cat === "protocols"} className="nx-tab" onClick={() => setCat("protocols")} style={{ fontFamily: F }} data-testid="menu-tab-protocols">Protocols</button>
          {ORDER.filter((c) => LIVE_CATEGORIES.includes(c)).map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className="nx-tab" onClick={() => setCat(c)} style={{ fontFamily: F }} data-testid={`menu-tab-${c}`}>{CATEGORY_LABELS[c]}</button>
          ))}
        </div>
        <div className="nx-rail" ref={rail} data-testid="frontdoor-rail">
          {cat === "protocols" && FLAGSHIP_STACKS.map((st) => {
            const art = stackArt(st.slug);
            const from = st.cadences.length ? Math.min(...st.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
            return (
              <Link key={st.slug} href={`/stacks/${st.slug}`} className="nx-frost" data-testid={`frontdoor-protocol-${st.slug}`}>
                <div className="nx-frost__media nx-frost__media--photo">{art && <img src={art} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1632} height={2048} />}</div>
                <div className="nx-frost__body">
                  <span className="nx-frost__tag" style={{ fontFamily: F }}>{st.category}</span>
                  <span className="nx-frost__name" style={{ fontFamily: S }}>{st.name}</span>
                  <span className="nx-frost__line" style={{ fontFamily: F }}>{st.peptides.map((p) => p.name).join(" + ")}</span>
                  {stackReservable(st) && <StatusPill status="reserve" short style={{ marginTop: 6 }} />}
                  <span className="nx-frost__price" style={{ fontFamily: F }}>{st.gated ? "Priced at consultation" : from ? `From ${usd(from)}/mo` : ""}</span>
                  <span className="nx-frost__btn nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }}>Learn more</span>
                </div>
              </Link>
            );
          })}
          {cat !== "protocols" && items.map((s) => {
            const g = goalOf(s);
            return (
              <Link key={s.slug} href={`/peptides/${s.slug}`} className="nx-frost" data-testid={`frontdoor-sku-${s.slug}`}>
                <div className="nx-frost__media" data-goal={g}>
                  <SkuPhoto slug={s.slug} name={s.name} className="nx-sku-img nx-sku-img--card" fallback={<VialPanel name={s.name} dose={labelSpec(s.spec)} size="78%" ratio="1 / 1" fill={0.58} />} />
                </div>
                <div className="nx-frost__body">
                  <span className="nx-frost__tag" style={{ fontFamily: F }}>{g ? CATEGORY_LABELS[g] : s.category}</span>
                  <span className="nx-frost__name" style={{ fontFamily: S }}>{s.name}</span>
                  <span className="nx-frost__line" style={{ fontFamily: F }}>{s.outcome}</span>
                  <StatusPill status={statusOf(s)} short style={{ marginTop: 6 }} />
                  <span className="nx-frost__price" style={{ fontFamily: F }}>{s.pricing ? `From ${usd(s.pricing.m12)}/mo` : "Priced at consultation"}</span>
                  <span className="nx-frost__btn nx-cta-cobalt nx-cta--sm" style={{ fontFamily: F }}>Learn more</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="nx-rail__nav">
          <button type="button" aria-label="Scroll back" onClick={() => scroll(-1)}><ArrowLeft size={16} /></button>
          <button type="button" aria-label="Scroll forward" onClick={() => scroll(1)}><ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}
