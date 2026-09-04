/* ═══ /labs — blood testing as a product (Chiya, 2026-09-04) ═══
   "It should be like a box, like a product added to the cart that they pay
   or maybe get for free … test completely everything, and they should be
   able to add different types of tests." One panel, at home, read by a
   physician; complimentary with any medication order; add-ons beside it.
   Pattern study: Rythm (one comprehensive panel, expandable categories with
   a reason per marker, three-step how-it-works), the white-label kits of
   SiPhox and MyLabsDirect (docs/LAB-PARTNER.md). House voice throughout. */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, FlaskConical, Home, Mail, Plus, Stethoscope, Truck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { LabKitBox } from "@/components/LabKitBox";
import { useCart } from "@/contexts/CartProvider";
import { LAB_KIT, LAB_ADDONS, LAB_SCHEDULE, labSlugFor } from "@/data/labs";
import { RETEST_WEEK } from "@/data/monitoring";
import { PROVIDER_INFO } from "@/data/compliance";
import { usd } from "@/data/stacksCatalog";
import { F, S } from "@/lib/typography";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { track } from "@/lib/analytics";

const kicker: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" };
const h2: React.CSSProperties = { fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.08, letterSpacing: "var(--nx-ls-tight)", marginTop: "0.7rem", textWrap: "balance" };
const body: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "58ch" };
const small: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)" };

const STEPS: { Icon: typeof Home; t: string; b: string }[] = [
  { Icon: Home, t: "Test at home.", b: LAB_KIT.collection },
  { Icon: Mail, t: "Mail it back.", b: "Seal the prepaid box and drop it in the post. The laboratory is CLIA-certified." },
  { Icon: Stethoscope, t: "Read by your physician.", b: "Your results land in your account with your physician's note. Your dose is set against your numbers." },
];

/* One worked example for the results layout. Illustrative values inside the
   printed ranges; not a patient record and not derived from any patient. */
const EXAMPLE_ROWS: { marker: string; baseline: string; week12: string; range: string }[] = [
  { marker: "Fasting insulin", baseline: "11.2 \u00b5IU/mL", week12: "7.4 \u00b5IU/mL", range: "2.6 to 24.9 \u00b5IU/mL" },
  { marker: "IGF-1", baseline: "121 ng/mL", week12: "178 ng/mL", range: "83 to 233 ng/mL" },
  { marker: "Total testosterone", baseline: "388 ng/dL", week12: "612 ng/dL", range: "264 to 916 ng/dL" },
  { marker: "hs-CRP", baseline: "2.6 mg/L", week12: "1.1 mg/L", range: "under 3.0 mg/L" },
];

const FAQ = [
  { q: "Is it included?", a: `Yes. The panel is complimentary with your first medication order, and the same panel is drawn again at week ${RETEST_WEEK} on plans of three months and longer. On its own it is ${usd(LAB_KIT.price)}, and a further panel for anyone on a plan is ${usd(LAB_KIT.retestPrice)}.` },
  { q: "Do I need to fast?", a: LAB_KIT.fasting },
  { q: "How long do results take?", a: LAB_KIT.turnaround },
  { q: "Who reads it?", a: `A licensed U.S. physician of ${PROVIDER_INFO.name} reads every marker against your plan and writes a note in plain words: what is in range, what moved, and what changes.` },
  { q: "Can I use recent results from my own doctor?", a: "Often, yes. If you have results from a CLIA-certified laboratory from the last few months, your physician may use them as your baseline. Upload them with your health questions." },
  { q: "Can I add tests later?", a: "Yes. Add-ons can be added to any panel, including the ones already included in your plan, and your physician may recommend one from your results." },
];

export default function Labs() {
  const { addLab, items } = useCart();
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const inCart = (slug: string) => items.some((i) => i.type === "lab" && i.slug === slug);
  const hasMedicine = items.some((i) => i.type === "peptide" || i.type === "stack");
  const addonTotal = LAB_ADDONS.filter((a) => picked.has(a.slug)).reduce((n, a) => n + a.price, 0);

  useSeo({
    title: `${LAB_KIT.name}: a ${LAB_KIT.markers}-marker at-home blood test, read by a physician`,
    description: `${LAB_KIT.line} Complimentary with any medication order, ${usd(LAB_KIT.price)} on its own, with add-on tests from ${usd(Math.min(...LAB_ADDONS.map((a) => a.price)))}.`,
    path: "/labs",
    jsonLd: [
      webPageJsonLd({ name: LAB_KIT.name, description: LAB_KIT.line, path: "/labs", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blood testing", path: "/labs" }]),
      faqJsonLd(FAQ),
    ],
  });

  function addPanel() {
    addLab(LAB_KIT.slug);
    LAB_ADDONS.filter((a) => picked.has(a.slug)).forEach((a) => addLab(labSlugFor(a)));
    track("add_to_cart", { source: "labs", slug: LAB_KIT.slug, type: "lab", addons: Array.from(picked) });
  }
  function toggle(slug: string) {
    setPicked((p) => { const n = new Set(p); if (n.has(slug)) n.delete(slug); else n.add(slug); return n; });
  }

  return (
    <SiteLayout navVariant="showcase">
      {/* ── 1. The box ── */}
      <section className="nx-hero-r3" aria-labelledby="labs-title"><div className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)" }}>
        <div className="nx-labs-hero">
          <div>
            <p style={kicker}>Blood testing</p>
            <h1 id="labs-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "16ch", textWrap: "balance" }} data-testid="labs-h1">
              A blood test before your first dose.
            </h1>
            <p style={{ ...body, fontSize: "var(--nx-t-lg)", marginTop: "1.1rem" }} data-testid="labs-sub">
              {LAB_KIT.name}: {LAB_KIT.markers} markers across {LAB_KIT.systems} systems, drawn at home and read by a licensed physician. Complimentary with any medication order. {usd(LAB_KIT.price)} on its own.
            </p>
            <ul className="nx-phero-chips" aria-label="What you get" style={{ marginTop: "1.3rem" }}>
              {["Drawn at home", "CLIA-certified laboratory", "Read by a licensed physician", `The same panel again at week ${RETEST_WEEK}`].map((c) => (
                <li key={c} style={{ fontFamily: F }}><Check size={13} strokeWidth={2.6} aria-hidden="true" /> {c}</li>
              ))}
            </ul>
            <div className="nx-labs-buy" data-testid="labs-buy">
              <div>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", lineHeight: 1, color: "var(--nx-fg)", margin: 0 }} data-testid="labs-price">
                  {hasMedicine ? "Complimentary" : usd(LAB_KIT.price + addonTotal)}
                </p>
                <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", margin: "0.35rem 0 0" }}>
                  {hasMedicine
                    ? `With the medication in your cart. Add-ons ${addonTotal ? usd(addonTotal) : "priced below"}.`
                    : "On its own. Complimentary once a medication is in your cart."}
                </p>
              </div>
              {inCart(LAB_KIT.slug) ? (
                <Link href="/cart" className="nx-cta-cobalt" data-testid="labs-in-cart">In your cart <ArrowRight size={16} strokeWidth={2} aria-hidden="true" /></Link>
              ) : (
                <button type="button" onClick={addPanel} className="nx-cta-cobalt" style={{ border: "none", cursor: "pointer" }} data-testid="labs-add">
                  Add the panel{picked.size ? ` + ${picked.size} add-on${picked.size > 1 ? "s" : ""}` : ""}
                </button>
              )}
            </div>
            <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.8rem" }}>
              Ordered by a licensed physician. Available in all 50 states.
            </p>
          </div>
          <Reveal className="nx-reveal-scale">
            <div className="nx-labs-art"><LabKitBox markers={LAB_KIT.markers} name={LAB_KIT.short} /></div>
          </Reveal>
        </div>
        <ul className="nx-stats" aria-label="The panel in numbers" data-testid="labs-stats">
          {[[String(LAB_KIT.markers), "markers measured"], [String(LAB_KIT.systems), "systems read"], [`Wk ${RETEST_WEEK}`, "the same panel again"], ["CLIA", "certified laboratory"]].map(([n, l]) => (
            <li key={l}><strong style={{ fontFamily: S }}>{n}</strong><span style={{ fontFamily: F }}>{l}</span></li>
          ))}
        </ul>
      </div></section>

      {/* ── 2. Three steps ── */}
      <section className="nx-labs-band" aria-labelledby="labs-steps">
        <div className="nx-container">
          <Reveal>
            <p style={kicker}>How it works</p>
            <h2 id="labs-steps" style={{ ...h2, maxWidth: "18ch" }}>A few drops, a prepaid box, a physician's note.</h2>
          </Reveal>
          <ol className="nx-labs-steps" data-testid="labs-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <li className="nx-labs-step">
                  <span className="nx-icon-circle" aria-hidden="true"><s.Icon size={19} strokeWidth={1.9} /></span>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", lineHeight: 1.15, color: "var(--nx-fg)", margin: "0.9rem 0 0" }}>{s.t}</p>
                  <p style={{ ...body, fontSize: "var(--nx-t-base)", marginTop: "0.5rem" }}>{s.b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 2.4. Inside the laboratory: the film ── */}
      <section className="nx-container" aria-label="Inside the laboratory" style={{ paddingTop: "var(--nx-sp-band)" }}>
        <Reveal className="nx-reveal-scale">
          <div className="nx-film" data-testid="labs-film">
            <video autoPlay muted loop playsInline preload="metadata" src="img/img_6d36ae1989c8.mp4" poster="img/img_b9ec00db43d6.webp" aria-label="Laboratory work on a panel" />
            <p style={{ fontFamily: S }}>Analysed in a CLIA-certified laboratory. Read by your physician.</p>
          </div>
        </Reveal>
      </section>

      {/* ── 2.5. The systems, at a glance (R3 band) ── */}
      <section className="nx-band" aria-label="The five systems" data-testid="labs-systems">
        <div className="nx-container nx-band__body">
          <div className="nx-band__head">
            <div>
              <p className="nx-band__kicker" style={{ fontFamily: F }}>What we measure</p>
              <h2 className="nx-band__h2" style={{ fontFamily: S }}>{LAB_KIT.markers} markers across {LAB_KIT.systems} systems.</h2>
            </div>
          </div>
          <Reveal><ul className="nx-systems">
            {LAB_KIT.groups.map((g, i) => (
              <li key={g.name} className="nx-glass nx-systems__card nx-stagger-item" style={{ ["--i" as string]: i }}>
                <span className="nx-systems__n" style={{ fontFamily: F }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="nx-systems__name" style={{ fontFamily: S }}>{g.name}</span>
                <span className="nx-systems__count" style={{ fontFamily: F }}>{g.markers.length} markers</span>
                <span className="nx-systems__line" style={{ fontFamily: F }}>{g.markers.map((m) => m.name).join(" · ")}</span>
              </li>
            ))}
          </ul></Reveal>
        </div>
      </section>

      {/* ── 3. What we test ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="labs-panel">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]" style={{ gap: "clamp(1.6rem,4vw,3.5rem)" }}>
          <Reveal>
            <p style={kicker}>What we test</p>
            <h2 id="labs-panel" style={{ ...h2, maxWidth: "14ch" }}>{LAB_KIT.markers} markers. Every one has a reason.</h2>
            <p style={{ ...body, marginTop: "1rem" }}>One panel, the same for everyone, built around what a peptide plan can move. Open a system to see each marker and why your physician reads it.</p>
            <p style={{ ...small, marginTop: "0.9rem" }}>
              <Link href="/bloodwork" className="nx-text-link" style={{ fontWeight: 600 }}>Why blood work is part of every plan</Link>
            </p>
          </Reveal>
          <Reveal delay={60}>
            <div className="nx-panel-groups" data-testid="labs-groups">
              {LAB_KIT.groups.map((g, i) => (
                <details key={g.name} className="nx-panel-group" open={i === 0} data-testid={`labs-group-${i}`}>
                  <summary style={{ fontFamily: F }}>
                    <span className="nx-panel-group__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className="nx-panel-group__name" style={{ fontFamily: S }}>{g.name}</span>
                    <span className="nx-panel-group__count">{g.markers.length} markers</span>
                    <span className="nx-faq-plus" aria-hidden="true" />
                  </summary>
                  <ul className="nx-panel-markers">
                    {g.markers.map((m) => (
                      <li key={m.name}>
                        <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>{m.name}</p>
                        <p style={{ ...small, margin: "0.2rem 0 0" }}>{m.why}</p>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Add-ons ── */}
      <section className="nx-labs-band" aria-labelledby="labs-addons">
        <div className="nx-container">
          <Reveal>
            <p style={kicker}>Additional tests</p>
            <h2 id="labs-addons" style={{ ...h2, maxWidth: "18ch" }}>The tests that go with a plan.</h2>
            <p style={{ ...body, marginTop: "1rem" }}>Each add-on is drawn from the same kit and read in the same note. Your physician may recommend one from your results; you can add any of them now.</p>
          </Reveal>
          <ul className="nx-addon-grid" data-testid="labs-addons">
            {LAB_ADDONS.map((a, i) => {
              const on = picked.has(a.slug) || inCart(labSlugFor(a));
              return (
                <Reveal key={a.slug} delay={i * 40}>
                  <li className={`nx-addon${on ? " nx-addon--on" : ""}`}>
                    <button type="button" onClick={() => toggle(a.slug)} aria-pressed={on} className="nx-addon__btn" data-testid={`labs-addon-${a.slug}`} disabled={inCart(labSlugFor(a))}>
                      <span className="nx-addon__head">
                        <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{a.name}</span>
                        <span className="nx-addon__price" style={{ fontFamily: F }}>{usd(a.price)}</span>
                      </span>
                      <span style={{ ...small, display: "block", marginTop: "0.4rem" }}>{a.line}</span>
                      <span className="nx-addon__markers" style={{ fontFamily: F }}>{a.markers.join(" · ")}</span>
                      {a.recommendedLine && <span className="nx-addon__rec" style={{ fontFamily: F }}>{a.recommendedLine}</span>}
                      <span className="nx-addon__act" style={{ fontFamily: F }}>
                        {inCart(labSlugFor(a)) ? <><Check size={13} strokeWidth={2.6} aria-hidden="true" /> In your cart</> : on ? <><Check size={13} strokeWidth={2.6} aria-hidden="true" /> Added to your panel</> : <><Plus size={13} strokeWidth={2.6} aria-hidden="true" /> Add to your panel</>}
                      </span>
                    </button>
                  </li>
                </Reveal>
              );
            })}
          </ul>
          {picked.size > 0 && !inCart(LAB_KIT.slug) && (
            <p style={{ ...small, marginTop: "1.2rem" }} aria-live="polite" data-testid="labs-addon-summary">
              {picked.size} add-on{picked.size > 1 ? "s" : ""} · {usd(addonTotal)} on top of the panel.{" "}
              <a href="#labs-title" className="nx-text-link" style={{ fontWeight: 600 }}>Add the panel</a>
            </p>
          )}
          {picked.size > 0 && inCart(LAB_KIT.slug) && (
            <button type="button" className="nx-cta-cobalt" style={{ marginTop: "1.2rem", border: "none", cursor: "pointer" }} onClick={() => { LAB_ADDONS.filter((a) => picked.has(a.slug)).forEach((a) => addLab(labSlugFor(a))); setPicked(new Set()); }} data-testid="labs-add-addons">
              Add {picked.size} add-on{picked.size > 1 ? "s" : ""} · {usd(addonTotal)}
            </button>
          )}
        </div>
      </section>

      {/* ── 5. When you test ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="labs-when">
        <Reveal>
          <p style={kicker}>When you test</p>
          <h2 id="labs-when" style={{ ...h2, maxWidth: "18ch" }}>Baseline first. Then the same panel, so you see what changed.</h2>
        </Reveal>
        <ol className="nx-labs-when" data-testid="labs-schedule">
          {LAB_SCHEDULE.map((s, i) => (
            <Reveal key={s.when} delay={i * 60}>
              <li className="nx-labs-when__row">
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", margin: 0 }}>{s.when}</p>
                <p style={{ ...small, margin: 0 }}>{s.what}</p>
                <p className="nx-labs-when__inc" style={{ fontFamily: F }}><FlaskConical size={13} strokeWidth={2.2} aria-hidden="true" /> {s.included}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── 6. How you read it ── */}
      <section className="nx-labs-band" aria-labelledby="labs-read">
        <div className="nx-container grid lg:grid-cols-[0.9fr_1.1fr]" style={{ gap: "clamp(1.6rem,4vw,3.5rem)", alignItems: "center" }}>
          <Reveal>
            <p style={kicker}>Your results</p>
            <h2 id="labs-read" style={{ ...h2, maxWidth: "16ch" }}>Written for you, in plain words.</h2>
            <p style={{ ...body, marginTop: "1rem" }}>Every marker sits beside its range and, from week {RETEST_WEEK} on, beside your baseline. Your physician's note says what is in range, what moved, and what changes in your plan because of it.</p>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginBottom: "0.5rem" }} data-testid="labs-report-label">Example, not a patient record.</p>
            <div className="nx-report" aria-label="An example of how a result is laid out. Example, not a patient record." data-testid="labs-report">
              <div className="nx-report__head" style={{ fontFamily: F }}><span>Marker</span><span>Your baseline</span><span>Week {RETEST_WEEK}</span><span>Range</span></div>
              {EXAMPLE_ROWS.map((r) => (
                <div key={r.marker} className="nx-report__row" style={{ fontFamily: F }}>
                  <span style={{ fontWeight: 600, color: "var(--nx-fg)" }}>{r.marker}</span><span>{r.baseline}</span><span>{r.week12}</span><span>{r.range}</span>
                </div>
              ))}
              <div className="nx-report__note" style={{ fontFamily: F }}>
                <Stethoscope size={14} strokeWidth={2} aria-hidden="true" /> Example note: fasting insulin and hs-CRP moved toward the middle of their ranges, IGF-1 rose with the dose, and testosterone is within range. Continue at the current dose.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Questions ── */}
      <section className="nx-container nx-faq-section" aria-labelledby="labs-faq">
        <Reveal>
          <p style={kicker}>Questions</p>
          <h2 id="labs-faq" style={{ ...h2, maxWidth: "18ch" }}>Common questions.</h2>
        </Reveal>
        <div className="nx-faq-list" data-testid="labs-faq">
          {FAQ.map((f, i) => (
            <details key={f.q} className="nx-faq-item" open={i === 0}>
              <summary><span>{f.q}</span><span className="nx-faq-plus" aria-hidden="true" /></summary>
              <p className="nx-faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 8. Closer ── */}
      <section className="nx-closer" aria-labelledby="labs-closer">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 id="labs-closer" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-display)", maxWidth: "18ch", margin: "0 auto", textWrap: "balance" }}>
              A blood test first. Then your first dose.
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.9rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <Link href="/peptides" className="nx-cta-ceramic" data-testid="labs-closer-shop" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)" }}>
                Choose a treatment <Truck size={16} strokeWidth={2} aria-hidden="true" style={{ marginLeft: 8 }} />
              </Link>
              {!inCart(LAB_KIT.slug) && (
                <button type="button" onClick={addPanel} className="nx-cta-ghost-dark" style={{ cursor: "pointer" }} data-testid="labs-closer-add">
                  Add the panel on its own
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
