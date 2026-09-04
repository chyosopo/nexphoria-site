/* ═══ Physician-approved protocols, as a rail (R3) ═══
   Photograph left, the plan right: tagline, who it is for, the three-word
   triad, the medicines with their spec, one button. Reservable protocols
   say so. */
import { useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";
import { FLAGSHIP_STACKS, usd, stackReservable } from "@/data/stacksCatalog";
import { stackArt, outcomeSrcSet } from "@/data/outcomeImagery";
import { CATEGORY_TRIAD } from "@/data/peptides";
import { GOAL_OF_STACK } from "@/data/protocolSelector";
import { StatusPill } from "@/components/StatusPill";

export function ProtocolRail() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.round(rail.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <section className="nx-band nx-band--deep" aria-labelledby="fd-protocols" data-testid="frontdoor-protocols">
      <div className="nx-container nx-band__body">
        <div className="nx-band__head">
          <div>
            <p className="nx-band__kicker" style={{ fontFamily: F }}>Protocols</p>
            <h2 id="fd-protocols" className="nx-band__h2" style={{ fontFamily: S }}>Medications that work together, one plan.</h2>
          </div>
          <Link href="/stacks" className="nx-cta-ceramic nx-cta--sm" data-testid="frontdoor-protocols-all">All protocols <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="nx-rail nx-rail--wide" ref={rail}>
          {FLAGSHIP_STACKS.map((s) => {
            const goal = GOAL_OF_STACK[s.slug];
            const triad = goal ? CATEGORY_TRIAD[goal] : undefined;
            const art = stackArt(s.slug);
            const from = s.cadences.length ? Math.min(...s.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
            return (
              <Link key={s.slug} href={`/stacks/${s.slug}`} className="nx-proto" data-testid={`frontdoor-protocol-${s.slug}`}>
                <div className="nx-proto__art">
                  {art && <img src={art} srcSet={outcomeSrcSet(art)} sizes="220px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={1632} height={2048} />}
                  <span className="nx-proto__cat" style={{ fontFamily: F }}>{s.category}</span>
                  <span className="nx-proto__name" style={{ fontFamily: S }}>{s.name}</span>
                </div>
                <div className="nx-proto__body">
                  <p className="nx-proto__tag" style={{ fontFamily: S }}>{s.tagline}</p>
                  <p className="nx-proto__for" style={{ fontFamily: F }}>{s.bestFor}</p>
                  {triad && <p className="nx-proto__triad">{triad.map((t) => <span key={t} className="nx-chip-acid" style={{ fontFamily: F }}>{t}</span>)}</p>}
                  <p className="nx-proto__label" style={{ fontFamily: F }}>Inside the plan</p>
                  <ul className="nx-proto__list" style={{ fontFamily: F }}>
                    {s.peptides.map((p) => <li key={p.name}><span>{p.name}</span><span>{p.spec}</span></li>)}
                  </ul>
                  <div className="nx-proto__foot">
                    <span style={{ fontFamily: F }}>{s.gated ? "Priced at consultation" : from ? `From ${usd(from)}/mo` : ""}</span>
                    {stackReservable(s) && <StatusPill status="reserve" />}
                  </div>
                  <span className="nx-frost__btn nx-cta-ceramic nx-cta--sm" style={{ fontFamily: F }}>Learn more</span>
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
