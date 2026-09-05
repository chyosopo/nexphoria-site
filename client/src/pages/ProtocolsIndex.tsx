/* JOB: read the protocols on the shelf and reach one. */
/* ═══ PROTOCOLS INDEX — the protocols still on the shelf, to
   docs/COPY-DECK-PLAIN.md. Reads FLAGSHIP_STACKS, which the launch scope
   filters (stacksCatalog LAUNCH_STACK_SLUGS). ═══ */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/EnterprisePatterns";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { PROTO_TILE } from "@/lib/studioTiles";
import { FLAGSHIP_STACKS, usd, stackReservable, SAME_JOB, PAIRS_WELL } from "@/data/stacksCatalog";
import { soloByName } from "@/data/soloCatalog";
import { RETEST_WEEK } from "@/data/monitoring";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { ArrowRight } from "lucide-react";
import { F, S } from "@/lib/typography";

/* Filter chips in the deck's category vocabulary (the same words as the
   goal tiles and the catalog filters). Each chip matches a protocol by
   substrings of its stacksCatalog `category`, so a renamed category still
   lands behind the right word. */
const ALL_CATEGORIES = [
  "All", "Weight loss", "Body composition", "Recovery", "Skin and ageing", "Energy and healthy ageing",
  "Focus and mood", "Sleep", "Sexual health", "Hormones",
];
const CHIP_ALIASES: Record<string, string[]> = {
  "Weight loss": ["metabolic", "weight"],
  "Body composition": ["growth", "gh axis", "body composition"],
  Recovery: ["recovery"],
  "Skin and ageing": ["skin"],
  "Energy and healthy ageing": ["longevity", "cellular", "energy", "healthy ageing"],
  "Focus and mood": ["cognitive", "cognition", "focus", "mood"],
  Sleep: ["sleep"],
  "Sexual health": ["sexual"],
  Hormones: ["hormone", "testosterone"],
};
const matchCat = (c: string, filter: string) =>
  filter === "All" ||
  (CHIP_ALIASES[filter] ?? [filter.toLowerCase()]).some((m) => c.toLowerCase().includes(m));
/* Only surface a chip when it actually has protocols behind it — a 0-count
   filter is a dead end (visual-QA finding). "All" always shows. */
const CATEGORIES = ALL_CATEGORIES.filter(
  (c) => c === "All" || FLAGSHIP_STACKS.some((s) => matchCat(s.category, c)),
);

export default function ProtocolsIndex() {
  const [filter, setFilter] = useState("All");
  /* The shelf reads in the visitor's world (Chiya: worlds fully separate,
     everything tailored): her protocols lead on her side, his on his, the
     shared ones between, the other world's flagship last, never hidden
     (one engine underneath). */
  const [loc] = useLocation();
  const world = resolveWorld(loc);
  const ownLean = world === "women" ? "her" : "him";
  const otherLean = world === "women" ? "him" : "her";
  const leanRank = (lean?: "him" | "her" | "both") =>
    lean === ownLean ? 0 : lean === otherLean ? 2 : 1;
  // Single-sourced so the meta description and the webPage JSON-LD node can't
  // drift apart. Typed MedicalWebPage for clinical E-E-A-T parity with the
  // protocol PDPs it indexes (StackPage) and the sibling goal-protocol index
  // (Category) — both already MedicalWebPage; this flagship index was the
  // lone plain WebPage outlier.
  const desc = `Medicines prescribed together, on one plan. A protocol is two to four medicines a physician prescribes together, with one panel before the first dose and the same panel at week ${RETEST_WEEK}.`;
  useSeo({
    title: "Protocols: medicines prescribed together | Nexphoria",
    description: desc,
    // Neutral canonical. This index renders at four routes (/stacks,
    // /protocols, /men/protocols, /women/protocols); consolidate them onto
    // /stacks — the same URL the webPage/breadcrumb JSON-LD already declares —
    // so Google indexes one page. Omitting path silently canonicalized the
    // whole index onto the homepage (the SoloPDP omitted-path deindex bug).
    path: "/stacks",
    jsonLd: [
      webPageJsonLd({ name: "Protocols", description: desc, path: "/stacks", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Protocols", path: "/stacks" }]),
      // ItemList of the flagship protocols — real names/paths only, no prices here.
      itemListJsonLd({
        name: "Nexphoria peptide protocols",
        description: "Peptide protocols in the Nexphoria catalog.",
        items: FLAGSHIP_STACKS.map((s) => ({ name: s.name, path: `/stacks/${s.slug}` })),
      }),
    ],
  });

  const shown = FLAGSHIP_STACKS.filter((s) => matchCat(s.category, filter))
    .slice()
    .sort((a, b) => leanRank(a.worldLean) - leanRank(b.worldLean));

  return (
    <SiteLayout navVariant={world} footerVariant={world}>
      <section className="nx-tilehero" aria-labelledby="protocols-hero-title">
        <div className="nx-container">
          <div className="nx-tilehero__head nx-hero-seq">
            <p className="nx-eyebrow">Protocols</p>
            <h1 id="protocols-hero-title" className="nx-tilehero__h1 nx-shout" style={{ fontFamily: S }}>Prescribed together.</h1>
            <p className="nx-tilehero__sub" style={{ fontFamily: F }}>
              A protocol is two to four medicines a physician prescribes together, with one panel before the first dose and the same panel at week {RETEST_WEEK}. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy.
            </p>
          </div>
        </div>
      </section>
      {/* filter */}
      <section className="nx-container" style={{ paddingBottom: "1rem" }} aria-label="Filter protocols">
        <div role="group" aria-label="Filter protocols by category" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button key={c} onClick={() => setFilter(c)} aria-pressed={active} data-testid={`protofilter-${c.toLowerCase()}`} className="nx-filter-chip" style={{
                fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600,
              }}>
                {c}
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {filter === "All" ? "Showing all protocols." : `Showing ${shown.length} ${shown.length === 1 ? "protocol" : "protocols"} in ${filter}.`}
        </p>
      </section>

      {/* the protocols, as tiles: the medicines of each rendered together on its goal-toned panel */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-sec)" }} aria-label="Protocols">
        <div className="nx-tiles nx-tiles--2" style={{ marginTop: 0 }}>
          {shown.map((s, i) => {
            const rec = s.cadences.length ? Math.min(...s.cadences.map((c) => c.perMonth ?? c.total)) : undefined;
            const reservable = stackReservable(s);
            const art = PROTO_TILE[s.slug];
            return (
              <Reveal key={s.slug} delay={i * 45} className="nx-tiles__item">
                <Link href={`/stacks/${s.slug}`} data-testid={`protocol-${s.slug}`} className="nx-tile nx-tile--dark nx-tile--proto">
                  {art && <img src={art.src} srcSet={`${art.src600} 600w, ${art.src} 1200w`} sizes="(max-width: 900px) 100vw, 50vw" alt={`The medicines of the ${s.name.toLowerCase()}`} loading={i < 2 ? "eager" : "lazy"} decoding="async" width={1200} height={900} />}
                  <span className="nx-chips nx-chips--tile" aria-hidden="true">
                    <span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{s.category}</span>
                    <span className="nx-chip" style={{ fontFamily: F }}>{s.gated ? "Assessed" : reservable ? "Pending" : "Rx"}</span>
                  </span>
                  <span className="nx-tile__foot nx-tile__foot--proto">
                    <span className="nx-tile__t nx-shout" style={{ fontFamily: S }}>{s.name}</span>
                    <span className="nx-tile__b" style={{ fontFamily: F }}>{s.tagline}</span>
                    <span className="nx-tile__btn nx-tile__btn--static" style={{ fontFamily: F }}>{s.gated ? "Priced at consultation" : rec ? `Shop the protocol · from ${usd(rec)}/mo` : "Shop the protocol"}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── How they fit together: what to combine, what to pick one of (the playbook) ── */}
      <section className="nx-container" style={{ paddingTop: "0", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="protocols-synergy-title" data-testid="protocols-synergy">
        <SectionHead
          title={<>How they fit together.</>}
          lead="Each medicine in a protocol does a different job. The same rule applies if you build your own."
          maxTitle="18ch"
        />
        <div className="nx-synergy" style={{ marginTop: "clamp(1.6rem,3vw,2.4rem)" }}>
          <div className="nx-synergy__col">
            <p className="nx-synergy__h" style={{ fontFamily: F }}>Pairs well</p>
            <ul className="nx-synergy__list">
              {PAIRS_WELL.map((p) => (
                <li key={p.pair.join("+")} className="nx-synergy__item">
                  <p style={{ fontFamily: S }} className="nx-synergy__pair">
                    {p.pair.map((n, i) => { const s = soloByName(n); return (
                      <span key={n}>{i > 0 && <span aria-hidden> + </span>}{s ? <Link href={`/peptides/${s.slug}`}>{n}</Link> : n}</span>
                    ); })}
                  </p>
                  <p style={{ fontFamily: F }} className="nx-synergy__note">{p.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="nx-synergy__col nx-synergy__col--one">
            <p className="nx-synergy__h" style={{ fontFamily: F }}>One at a time</p>
            <ul className="nx-synergy__list">
              {SAME_JOB.map((g) => (
                <li key={g.name} className="nx-synergy__item">
                  <p style={{ fontFamily: S }} className="nx-synergy__pair">{g.name}</p>
                  <p style={{ fontFamily: F }} className="nx-synergy__members">
                    {g.members.map((n, i) => { const s = soloByName(n); return (
                      <span key={n}>{i > 0 && <span aria-hidden> · </span>}{s ? <Link href={`/peptides/${s.slug}`}>{n}</Link> : n}</span>
                    ); })}
                  </p>
                  <p style={{ fontFamily: F }} className="nx-synergy__note">{g.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Blood testing. The sample "biomarker index" dashboard was retired 2026-09-03: fabricated-looking figures. */}
      <section className="nx-container nx-sec" style={{ paddingBottom: "var(--nx-sp-sec)" }} aria-label="Blood testing">
        <div style={{ maxWidth: 720 }}>
          <div>
            <SectionHead
              eyebrow="Blood testing"
              title={<>A panel before the first dose, and again at week {RETEST_WEEK}.</>}
              lead={`The kit ships with the first order and is drawn at home before the first dose. At week ${RETEST_WEEK} the same ${PANEL_TOTAL_MARKERS} markers are tested again and the physician adjusts from what changed.`}
              maxTitle="18ch"
            />
          </div>
        </div>
      </section>

      {/* the closer, as one tile */}
      <section className="nx-container" style={{ paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="protocols-assess-title">
        <div className="nx-closer-tile">
          <div>
            <h2 id="protocols-assess-title" className="nx-shout" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "16ch", margin: 0 }}>
              Which one is the physician's call.
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", maxWidth: "46ch", marginTop: ".8rem" }}>
              The health questions state what is being treated. A licensed physician chooses the protocol, or a single medicine if that fits better.
            </p>
            <Link href="/how-it-works" className="nx-cta-ceramic" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)", marginTop: "1.6rem" }} data-testid="proto-assess-cta">
              How it works
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
