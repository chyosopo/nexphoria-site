/* JOB: present ONE protocol: what is in it, what it is for, what it costs, who prescribes it. */
/* ═══ PROTOCOL PAGE, the plain deck (docs/COPY-DECK-PLAIN.md, 2026-09-04) ═══
   One structure shared with SoloPDP: hero · buy box · what to expect ·
   blood testing · who should not take it · regulatory status · who
   prescribes it · common questions · other protocols · closer. Every fact
   once per page. Ignite (GLP-1) renders the physician wall in the buy box.

   Tightened 2026-09-05 (Chiya: "huge scroll and scroll and scroll"), the
   mirror of SoloPDP: the medicines are one row of product cards, the dose
   under each (the same card every shelf uses, 2026-09-05 evening); the blood is a
   sub-block of What arrives; regulatory status and the two care cards are
   one row of three tiles; the FAQ is five; the "other protocols" shelf went
   (the index is one click up, and the reader decides). */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { BuyBox, BuyTier } from "@/components/BuyBox";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { getStack, stackReservable, stackPending, stackComponents } from "@/data/stacksCatalog";
import { regulatoryOf, type SoloRegulatory } from "@/data/soloCatalog";
import { StatusPill } from "@/components/StatusPill";
import { AddonsFor } from "@/components/AddonsFor";
import { ArrowLeft, X } from "lucide-react";
import { F, S } from "@/lib/typography";
import { ProductTile } from "@/components/ProductTile";
import "@/styles/protocols.css";
import { PROTO_TILE } from "@/lib/studioTiles";
import { PdpFaq, buildPdpFaq } from "@/components/PdpFaq";
import { RegulatoryDisclosure } from "@/components/RegulatoryDisclosure";
import { FoldSection } from "@/components/FoldSection";
import { CareCards } from "@/components/CareCards";
import { InsideTheVial } from "@/components/InsideTheVial";
import { soloByName } from "@/data/soloCatalog";
import { monitoringFor } from "@/data/monitoring";
import { faqJsonLd } from "@/lib/seo";
import { analytics } from "@/lib/analytics";

/* Five questions on the page. The "first weeks" one is the section above it
   (what to expect), so it is the one that goes. */
const FAQ_CAP = 5;
const capFaq = <T extends { q: string }>(items: T[]) =>
  items.filter((f) => !/^What should I expect/.test(f.q)).slice(0, FAQ_CAP);

export default function StackPage({ slug }: { slug: string }) {
  const stack = getStack(slug);
  const [loc] = useLocation();
  const [selected, setSelected] = useState<string>("3mo");
  useEffect(() => {
    if (stack) analytics.productViewed({ kind: "stack", slug: stack.slug, category: stack.category, gated: !!stack.gated });
  }, [stack]);
  const faq = stack
    ? capFaq(buildPdpFaq({
        name: stack.name,
        gated: stack.gated,
        hasPricing: !stack.gated,
        firstMark: stack.timeline[0],
        components: stackComponents(stack).map((c) => ({ name: c.name, regulatory: regulatoryOf(c) })),
      }))
    : [];

  useSeo({
    title: stack ? `${stack.name} · ${stack.category} | Nexphoria` : "Stack | Nexphoria",
    description: stack ? `${stack.name}: ${stack.bestFor} Prescribed by a licensed U.S. physician, with a blood test before the first dose and again at week 12.` : "",
    // Self-referential canonical/og:url. Without this the page defaulted to the
    // bare homepage URL, collapsing every flagship protocol PDP onto "/" for
    // canonicalization, the same catalog-deindexing trap SoloPDP guards against.
    path: stack ? `/stacks/${stack.slug}` : "/stacks",
    jsonLd: stack
      ? [
          // Prescription protocol PDP: MedicalWebPage for clinical E-E-A-T, parity with SoloPDP.
          webPageJsonLd({ name: stack.name, description: stack.tagline, path: `/stacks/${stack.slug}`, type: "MedicalWebPage" }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Protocols", path: "/stacks" }, { name: stack.name, path: `/stacks/${stack.slug}` }]),
          faqJsonLd(faq),
          // Prescription protocol: name/brand/category enrichment only, no offers/price (pharma rich-result policy).
          productJsonLd({ name: stack.name, description: stack.bestFor, path: `/stacks/${stack.slug}`, category: stack.category }),
        ]
      : [],
  });

  if (!stack) {
    return (
      <SiteLayout>
        <section className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="stack-notfound-title">
          <h1 id="stack-notfound-title" style={{ fontFamily: F, color: "var(--nx-fg-graphite)" }}>Protocol not found.</h1>
          <Link href="/stacks" style={{ fontFamily: F, color: "var(--nx-cobalt)" }}>← All protocols</Link>
        </section>
      </SiteLayout>
    );
  }

  const world = resolveWorld(loc);

  const tiers: BuyTier[] | undefined = stack.gated
    ? undefined
    : stack.cadences.map((c) => ({
        key: c.key,
        label: c.label,
        sub: c.sublabel,
        badge: c.badge,
        amount: c.perMonth ?? c.total,
        per: c.key === "fixed" ? "/cycle" : "/mo",
        includesPanel: c.includesPanel,
        labs: c.labs,
      }));
  const reservable = stackReservable(stack);
  const pending = stackPending(stack);
  const components = stackComponents(stack);

  /* The regulatory standing of the protocol is the conservative reading of
     its components: only when every active is FDA-approved does the approved
     branch of the verbatim block apply. */
  const stackRegulatory: SoloRegulatory =
    components.length > 0 && components.every((c) => regulatoryOf(c) === "compounded-approved-active")
      ? "compounded-approved-active"
      : "compounded-no-approved-active";

  /* The markers the physician reads first, across the medicines in the protocol. */
  const watch = Array.from(new Set(components.flatMap((c) => monitoringFor(c.slug)?.watch ?? [])));

  /* Each medicine's vial, resolved through the catalog. */
  const members = stack.peptides.map((p) => soloByName(p.name)).filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <SiteLayout navVariant={world} footerVariant={world}>
      <div className="nx-tight">
      {/* ── 1 · HERO: the protocol beside what it is for ── */}
      <section className="nx-tilehero" aria-labelledby="stack-hero-title">
        <div className="nx-container" style={{ paddingTop: "1.4rem", paddingBottom: "var(--nx-sp-tight)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]" style={{ gap: "clamp(1.6rem,4vw,3rem)", alignItems: "center" }}>
            <div>
              <Link href="/stacks" className="nx-proto-back" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)" }}>
                <ArrowLeft size={15} aria-hidden="true" /> All protocols
              </Link>
              <p className="nx-pdp-shout" style={{ fontFamily: S, marginTop: "1.2rem" }}>Prescribed together, so each medicine does its own job.</p>
              <h1 id="stack-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1.03, letterSpacing: "var(--nx-ls-snug)", color: "var(--nx-fg)", marginTop: "0.5rem" }}>
                {stack.name}
              </h1>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-cobalt)", marginTop: "0.4rem" }}>
                {stack.tagline}
              </p>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1rem" }}>
                {stack.bestFor}
              </p>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
                <a href="#buy" className="nx-cta-cobalt" data-testid="stack-hero-cta" style={{ fontSize: "var(--nx-t-base)", padding: "13px 24px" }}>
                  Choose a plan
                </a>
                {reservable && <StatusPill status="reserve" testId="stack-status" />}
              </div>
              {components.some((c) => c.feelBy) && (
                <ul className="nx-feelby" data-testid="stack-feelby" aria-label="Typical onset of each medicine">
                  {components.filter((c) => c.feelBy).map((c) => (
                    <li key={c.slug} style={{ fontFamily: F }}><strong>{c.name}</strong>. Typical onset: {c.feelBy!.charAt(0).toLowerCase() + c.feelBy!.slice(1)}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="nx-tile nx-tile--pdp nx-tile--dark" style={{ aspectRatio: "4 / 3" }}>
              {PROTO_TILE[stack.slug]
                ? <img src={PROTO_TILE[stack.slug].src} srcSet={`${PROTO_TILE[stack.slug].src600} 600w, ${PROTO_TILE[stack.slug].src} 1200w`} sizes="(max-width: 1024px) 100vw, 45vw" alt={`The medicines of the ${stack.name.toLowerCase()}`} fetchPriority="high" width={1200} height={900} data-testid={`stack-outcome-${stack.slug}`} />
                : null}
              <span className="nx-chips nx-chips--tile" aria-hidden="true"><span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>Protocol</span><span className="nx-chip" style={{ fontFamily: F }}>{stack.category}</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · What is in it: each medicine as the product card every shelf uses,
          with its dose in this protocol under the card ── */}
      <section style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} aria-labelledby="stack-vials-title">
        <div className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-tight)" }}>
          <h2 id="stack-vials-title" className="nx-eyebrow" style={{ textAlign: "center" }}>What is in it</h2>
          <div className="nx-proto-members">
            {stack.peptides.map((p, i) => {
              const sku = soloByName(p.name);
              return (
                <Reveal key={p.name} delay={i * 70} className="nx-proto-member">
                  {sku ? (
                    <ProductTile sku={sku} index={i} testId={`stack-member-${sku.slug}`} />
                  ) : (
                    <div className="nx-frost"><div className="nx-frost__head"><span className="nx-frost__name" style={{ fontFamily: S }}>{p.name}</span></div></div>
                  )}
                  <dl className="nx-proto-dose" data-testid={`stack-spec-${i}`} aria-label={`${p.name} in this protocol`}>
                    <dt style={{ fontFamily: F }}>Dose</dt>
                    <dd style={{ fontFamily: F }}>{p.dose}</dd>
                    <dt style={{ fontFamily: F }}>Format</dt>
                    <dd style={{ fontFamily: F }}>{p.spec}</dd>
                  </dl>
                </Reveal>
              );
            })}
          </div>
          <p className="nx-proto-synergy" style={{ fontFamily: F }}>
            {stack.synergy}
          </p>
        </div>
      </section>

      {/* ── BODY: content rail + sticky buy box ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-tight)" }} aria-label="Protocol details">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]" style={{ gap: "clamp(1.8rem,4vw,3.2rem)", alignItems: "start" }}>

          {/* LEFT */}
          <div>
            {/* ── 3 · What arrives: each medicine's vial, and the blood that sets its dose ── */}
            {/* ── 3 · The volumes fold. "What is in it" above already names each
                medicine, its dose and its vial format; this block restated the
                concentration and added the syringe arithmetic — real detail, but
                not the third time a reader is told what is in the protocol. It
                measured 1,617px on a phone against the 2,099px lineup above it. ── */}
            {members.length > 0 && (
              <FoldSection
                id="stack-get-title"
                title="What arrives, and at what dose."
                summary="The volume to draw, the units on the syringe, and how long each vial lasts."
                testid="stack-get"
              >
                <p className="nx-lede">Each medicine is dispensed in its own vial, at its own dose. The amounts follow from the stated dose and vial, and the prescription states the exact volumes.</p>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 12, marginTop: "1rem" }}>
                  {members.map((m) => (
                    <div key={m.slug} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <InsideTheVial sku={m} compact testId={`stack-vial-${m.slug}`} />
                      <Link href={`/peptides/${m.slug}`} className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, alignSelf: "flex-start" }} data-testid={`stack-member-link-${m.slug}`}>About {m.name}</Link>
                    </div>
                  ))}
                </div>
              </FoldSection>
            )}
            <section className="nx-proto-block" aria-labelledby="stack-blood-title">
              <div className="nx-pdp-sub" data-testid="stack-blood">
                <p id="stack-blood-title" className="nx-eyebrow">Blood testing for this protocol</p>
                <p className="nx-lede" style={{ marginTop: "0.5rem" }}>
                  You draw the panel at home before the first dose and again at week 12, and the physician compares the two and adjusts your dose from what changed.
                </p>
                {watch.length > 0 && (
                  <div className="nx-glass-tile" style={{ display: "block", marginTop: "0.8rem" }}>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Read first at week 12</p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg)", marginTop: "0.4rem" }}>{watch.join(" · ")}</p>
                  </div>
                )}
                <AddonsFor keys={[stack.slug, ...components.map((c) => c.slug)]} testId="stack-addons" />
                <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.8rem" }}>
                  See every marker and the additional tests
                </Link>
              </div>
            </section>

            {/* ── 4 · What to expect ── */}
            <section className="nx-pdp-sec nx-proto-block" aria-labelledby="stack-expect-title">
              <h2 id="stack-expect-title" className="nx-dsh3">The first twelve weeks.</h2>
              <div className="nx-timeline" style={{ marginTop: "1.2rem" }}>
                {stack.timeline.map((t, i) => (
                  <Reveal key={t.wk} delay={i * 55}>
                    <div className="nx-timeline-step" style={{ paddingBottom: i < stack.timeline.length - 1 ? "1.1rem" : 0 }}>
                      <span className="nx-timeline-node" aria-hidden>{i + 1}</span>
                      <div className="nx-glass-tile" style={{ display: "block" }}>
                        <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-cobalt)" }}>{t.wk}</p>
                        <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{t.effect}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── 5 · Who should not take it ── */}
            <section className="nx-pdp-sec nx-proto-block" aria-labelledby="stack-contra-title">
              <h2 id="stack-contra-title" className="nx-dsh3">Who it is not for.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginTop: "1rem", maxWidth: 760 }}>
                {stack.contraindications.map((c) => (
                  <div key={c} className="nx-glass-tile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <X size={17} strokeWidth={2.4} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg-graphite)" }}>{c}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 6 · Who prescribes, who makes it, and the regulatory status: one row of three
                tiles. The regulatory block is verbatim (compliance.ts); the parties are
                named once, in the care cards. ── */}
            <FoldSection
              id="stack-parties-title"
              title="Who prescribes it, and who makes it."
              summary="The physician group, the pharmacy, and the regulatory status of a compounded preparation."
              testid="stack-parties"
            >
              <div className="nx-parties-row">
                <RegulatoryDisclosure regulatory={stackRegulatory} showParties={false} testid="stack-regulatory" />
                <div className="nx-parties-row__care"><CareCards slug={stack.slug} /></div>
              </div>
            </FoldSection>

            {/* ── 7 · Common questions, five ── */}
            <div className="nx-proto-block nx-pdp-sec"><PdpFaq items={faq} /></div>
          </div>

          {/* ── RIGHT · the buy box ── */}
          <aside id="buy" style={{ alignSelf: "stretch", scrollMarginTop: "96px" }}>
            <div className="nx-buyrail">
            <BuyBox
              name={stack.name}
              category={stack.category}
              slug={stack.slug}
              addType="stack"
              tiers={tiers}
              selected={selected}
              onSelect={setSelected}
              gated={stack.gated}
              gatedStates={stack.stateExclusions}
              availability={reservable ? "reserve" : "live"}
              pending={pending}
              ctaTestId={stack.gated ? "ignite-intake" : "stack-cta"}
            />
            </div>
          </aside>
        </div>
      </section>

      {/* ── 8 · Closer, as one tile ── */}
      <section className="nx-container nx-sec" style={{ paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="stack-close-title">
        <div className="nx-closer-tile">
          <div>
            <h2 id="stack-close-title" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0, textWrap: "balance" }}>A physician decides, and prescribes if it is appropriate.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", maxWidth: "46ch", marginTop: ".8rem" }}>You place the order, a licensed physician reviews it, and if not prescribed, nothing is made.</p>
            <a href="#buy" className="nx-cta-ceramic" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.2rem" }}>See the plan and price</a>
          </div>
        </div>
      </section>
      </div>
    </SiteLayout>
  );
}
