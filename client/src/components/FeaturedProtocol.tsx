/* ═══ The featured protocol band (enhanced.com study, 2026-09-05) ═══
   One wide tile: the protocol's medicines rendered together on the right,
   a "Protocol" chip, the name, the tagline as a fact, the price from, and
   one button. Reads the flagship catalog; the render is the studio's
   proto-<slug>-wide. */
import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { PROTO_WIDE } from "@/lib/studioTiles";

export function FeaturedProtocol({ slug = "recover", shout = "Prescribed together." }: { slug?: string; shout?: string }) {
  const st = FLAGSHIP_STACKS.find((s) => s.slug === slug) ?? FLAGSHIP_STACKS[0];
  if (!st) return null;
  const art = PROTO_WIDE[st.slug];
  const from = st.cadences.length ? Math.min(...st.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-protocol" data-testid="frontdoor-protocol">
      <Reveal>
        <Link href={`/stacks/${st.slug}`} className="nx-tile nx-tile--wide nx-tile--dark" data-testid={`frontdoor-protocol-${st.slug}`}>
          {art && <img src={art.src} srcSet={`${art.src1200} 1200w, ${art.src} 2400w`} sizes="(max-width: 900px) 100vw, 1200px" alt={`The medicines of the ${st.name.toLowerCase()}`} loading="lazy" decoding="async" width={2400} height={1000} />}
          <div className="nx-tile__widecopy">
            <span className="nx-chips" aria-hidden="true"><span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>Protocol</span><span className="nx-chip" style={{ fontFamily: F }}>{st.category}</span></span>
            <h2 id="fd-protocol" className="nx-tile__t nx-tile__t--lg nx-shout" style={{ fontFamily: S }}>{shout}</h2>
            <p className="nx-tile__name" style={{ fontFamily: S }}>{st.name}</p>
            <p className="nx-tile__b" style={{ fontFamily: F }}>{st.tagline}</p>
            <span className="nx-tile__btn nx-tile__btn--static" style={{ fontFamily: F }}>{from ? `Shop the protocol · from ${usd(from)}/mo` : "Shop the protocol"}</span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
