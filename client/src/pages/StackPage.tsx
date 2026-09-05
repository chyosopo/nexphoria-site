/* JOB: present ONE protocol: what is in it, what it is for, what it costs, who prescribes it. */
/* ═══ PROTOCOL PAGE, the plain deck (docs/COPY-DECK-PLAIN.md, 2026-09-04) ═══
   One structure shared with SoloPDP: hero · buy box · what to expect ·
   blood testing · who should not take it · regulatory status · who
   prescribes it · common questions · other protocols · closer. Every fact
   once per page. Ignite (GLP-1) renders the physician wall in the buy box. */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { BuyBox, BuyTier } from "@/components/BuyBox";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { getStack, FLAGSHIP_STACKS, usd, stackReservable, stackPending, stackComponents } from "@/data/stacksCatalog";
import { regulatoryOf, type SoloRegulatory } from "@/data/soloCatalog";
import { StatusPill } from "@/components/StatusPill";
import { AddonsFor } from "@/components/AddonsFor";
import { ArrowLeft, X } from "lucide-react";
import { F, S } from "@/lib/typography";
import { SpecPlate } from "@/components/DataPlate";
import { stackArt, outcomeSrcSet } from "@/data/outcomeImagery";
import { VialMockup, labelSpec } from "@/components/VialMockup";
import { SkuPhoto } from "@/components/SkuPhoto";
import { PdpFaq, buildPdpFaq } from "@/components/PdpFaq";
import { Disclaimer } from "@/components/Disclaimer";
import { RegulatoryDisclosure } from "@/components/RegulatoryDisclosure";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { monitoringFor } from "@/data/monitoring";
import { faqJsonLd } from "@/lib/seo";
import { analytics } from "@/lib/analytics";

export default function StackPage({ slug }: { slug: string }) {
  const stack = getStack(slug);
  const [loc] = useLocation();
  const [selected, setSelected] = useState<string>("3mo");
  useEffect(() => {
    if (stack) analytics.productViewed({ kind: "stack", slug: stack.slug, category: stack.category, gated: !!stack.gated });
  }, [stack]);
  const faq = stack
    ? buildPdpFaq({
        name: stack.name,
        gated: stack.gated,
        hasPricing: !stack.gated,
        firstMark: stack.timeline[0],
        components: stackComponents(stack).map((c) => ({ name: c.name, regulatory: regulatoryOf(c) })),
      })
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

  /* The other protocols: same-category first, then the rest, never the
     opposite world's. "both" always shows. */
  const world = resolveWorld(loc);
  const oppositeLean = world === "women" ? "him" : "her";
  const otherStacks = FLAGSHIP_STACKS
    .filter((s) => s.slug !== stack.slug && s.worldLean !== oppositeLean)
    .sort((a, b) => Number(b.category === stack.category) - Number(a.category === stack.category))
    .slice(0, 3);

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

  return (
    <SiteLayout navVariant={world} footerVariant={world}>
      {/* ── 1 · HERO: the protocol beside what it is for ── */}
      <section className="nx-hero-r3 relative" style={{ overflow: "hidden" }} aria-labelledby="stack-hero-title">
        <div className="nx-container relative" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]" style={{ gap: "clamp(1.6rem,4vw,3rem)", alignItems: "center" }}>
            <div>
              <Link href="/stacks" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none" }}>
                <ArrowLeft size={15} aria-hidden="true" /> All protocols
              </Link>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)", marginTop: "1.2rem" }}>
                {stack.category}
              </p>
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
                <Link href="/assessment" className="nx-cta-cobalt" data-testid="stack-hero-cta" style={{ fontSize: "var(--nx-t-base)", padding: "13px 24px" }}>
                  See if I'm eligible
                </Link>
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
            {stackArt(stack.slug, world) && (
              <div className="nx-hero-frame" style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-4)", aspectRatio: "1 / 1", width: "100%" }}>
                <img
                  src={stackArt(stack.slug, world)}
                  srcSet={outcomeSrcSet(stackArt(stack.slug, world)!)}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  alt=""
                  aria-hidden
                  fetchPriority="high"
                  width={1632}
                  height={2048}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  data-testid={`stack-outcome-${stack.slug}`}
                />
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, transparent 55%, color-mix(in srgb, var(--nx-fg) 34%, transparent) 100%)" }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── What is in it: the protocol, rendered as its vials ── */}
      <section style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} aria-labelledby="stack-vials-title">
        <div className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-tight)" }}>
          <h2 id="stack-vials-title" className="nx-eyebrow" style={{ textAlign: "center" }}>What is in it</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-end", gap: "clamp(1.5rem,5vw,3.5rem)", marginTop: "1.4rem" }}>
            {stack.peptides.map((p, i) => {
              return (
                <Reveal key={p.name} delay={i * 70}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                    {/* Same object the PDP, the shelf and the catalog hero render. */}
                    <SkuPhoto name={p.name} className="nx-sku-img nx-sku-img--stack" fallback={<VialMockup name={p.name} dose={labelSpec(p.spec)} size="clamp(190px, 22vw, 260px)" fill={0.62} />} />
                    <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", lineHeight: 1.1, textAlign: "center" }}>{p.name}</p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", textAlign: "center" }}>{p.spec}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BODY: content rail + sticky buy box ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-band)" }} aria-label="Protocol details">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]" style={{ gap: "clamp(1.8rem,4vw,3.2rem)", alignItems: "start" }}>

          {/* LEFT */}
          <div>
            {/* Dose and format: each compound as a specimen label, then how they fit together */}
            <h2 style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Dose and format</h2>
            <div className="grid sm:grid-cols-2" style={{ gap: 12, marginTop: "0.9rem" }}>
              {stack.peptides.map((p, i) => (
                <Reveal key={p.name} delay={i * 40}>
                  <SpecPlate
                    name={p.name}
                    rows={[
                      { label: "Dose", value: p.dose },
                      { label: "Format", value: p.spec },
                    ]}
                    testId={`stack-spec-${i}`}
                  />
                </Reveal>
              ))}
            </div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.7, color: "var(--nx-fg-graphite)", maxWidth: "62ch", marginTop: "1.4rem" }}>
              {stack.synergy}
            </p>

            {/* ── 3 · What to expect ── */}
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              What to expect
            </h2>
            <div className="nx-timeline" style={{ marginTop: "1.4rem" }}>
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

            {/* ── 4 · Blood testing for this protocol ── */}
            <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} aria-labelledby="stack-blood-title" data-testid="stack-blood">
              <h2 id="stack-blood-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>
                Blood testing for this protocol
              </h2>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "58ch", marginTop: "0.9rem" }}>
                A blood test before your first dose, and the same test at week 12.
              </p>
              {watch.length > 0 && (
                <div className="nx-glass-tile" style={{ display: "block", marginTop: "1rem" }}>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>What your physician reads first</p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg)", marginTop: "0.4rem" }}>{watch.join(" · ")}</p>
                </div>
              )}
              <AddonsFor keys={[stack.slug, ...components.map((c) => c.slug)]} testId="stack-addons" />
              <Link href="/labs" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.8rem" }}>
                Every marker, and the additional tests
              </Link>
            </section>

            {/* ── 5 · Who should not take it ── */}
            <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} aria-labelledby="stack-contra-title">
              <h2 id="stack-contra-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>Who should not take it</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginTop: "1rem", maxWidth: 760 }}>
                {stack.contraindications.map((c) => (
                  <div key={c} className="nx-glass-tile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <X size={17} strokeWidth={2.4} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg-graphite)" }}>{c}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}><Disclaimer /></div>
            </section>

            {/* ── 6 · Regulatory status (verbatim block; the parties are named once, in 7) ── */}
            <div style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              <RegulatoryDisclosure regulatory={stackRegulatory} showParties={false} testid="stack-regulatory" />
            </div>

            {/* ── 7 · Who prescribes it, and who makes it (compliance.ts, verbatim) ── */}
            <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} aria-labelledby="stack-parties-title" data-testid="stack-parties">
              <h2 id="stack-parties-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>Who prescribes it, and who makes it</h2>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Clinical care</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{PROVIDER_INFO.body}</p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Dispensing pharmacy</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{PHARMACY_INFO.body.replace(/\n+/g, " ")}</p>
              </div>
            </section>

            {/* ── 8 · Common questions ── */}
            <PdpFaq items={faq} />
          </div>

          {/* ── 2 · RIGHT · the buy box ── */}
          <aside style={{ alignSelf: "stretch" }}>
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

      {/* ── 9 · The other protocols ── */}
      {otherStacks.length > 0 && (
        <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }} aria-labelledby="stack-crosssell-title">
          <h2 id="stack-crosssell-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>
            The other protocols
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", maxWidth: "58ch", marginTop: "0.5rem" }}>
            Each comes with the same physician review and the same blood testing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 14, marginTop: "1.4rem" }}>
            {otherStacks.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link href={`/stacks/${s.slug}`} className="nx-float-card" data-testid={`stack-related-${s.slug}`}>
                  {stackArt(s.slug, world) && (
                    <div className="nx-float-card__media">
                      <img
                        src={stackArt(s.slug, world)}
                        srcSet={outcomeSrcSet(stackArt(s.slug, world)!)}
                        sizes="(max-width: 640px) 100vw, 33vw"
                        alt=""
                        aria-hidden
                        loading="lazy"
                        width={1632}
                        height={1020}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  )}
                  <div className="nx-float-card__body">
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{s.category}</p>
                    <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: "0.5rem", lineHeight: 1.1 }}>{s.name}</h3>
                    <p className="nx-line-2" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{s.tagline}</p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", marginTop: "auto", paddingTop: "0.95rem" }}>
                      {s.cadences.length ? <>From {usd(Math.min(...s.cadences.map((c) => c.perMonth ?? c.total)))}/mo<span style={{ fontWeight: 400, color: "var(--nx-fg-muted)" }}> · if prescribed</span></> : "Priced at consultation"}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── 10 · Closer ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)", textAlign: "center" }} aria-labelledby="stack-close-title">
        <h2 id="stack-close-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "0 auto", lineHeight: 1.12 }}>
          The next step is a physician.
        </h2>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "52ch", margin: "0.9rem auto 0" }}>A few health questions, read by a licensed U.S. physician, who decides whether this protocol is right for you.</p>
        <Link href="/assessment" className="nx-cta-cobalt" style={{ fontSize: "var(--nx-t-base)", padding: "14px 28px", marginTop: "1.6rem" }}>
          See if I'm eligible
        </Link>
      </section>
    </SiteLayout>
  );
}
