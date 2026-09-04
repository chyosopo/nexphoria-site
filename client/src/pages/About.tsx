/* JOB: who operates the service, who prescribes, who compounds, where it ships. */
/* ═══ ABOUT — the plain deck (docs/COPY-DECK-PLAIN.md, 2026-09-04)
   What the service is, what it offers, who is involved (the provider and
   pharmacy blocks verbatim from compliance.ts), where it operates, how to
   reach it, two questions, and the closer. State, do not persuade. */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, orgJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { BUSINESS, PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { RETEST_WEEK } from "@/data/monitoring";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import heroAbout from "@/assets/brand/hero-about.webp";

const kicker: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600,
  letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)",
};
const h2: React.CSSProperties = {
  fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)",
  lineHeight: 1.08, letterSpacing: "var(--nx-ls-tight)", marginTop: "0.7rem", textWrap: "balance",
};
const body: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "58ch",
};
const small: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)",
};
const card: React.CSSProperties = {
  background: "var(--nx-bg)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)", padding: "1rem 1.15rem",
};

const GOALS = "weight loss, body composition, recovery, skin and ageing, energy and healthy ageing, focus and mood, sleep, sexual health and hormones";

/* The two questions the deck keeps, as they were. */
const ABOUT_FAQ_ITEMS = [
  {
    q: "Is Nexphoria affiliated with Bask Health?",
    a: "Nexphoria uses Bask Health as its telehealth infrastructure partner. Bask Health is a licensed telehealth platform that connects patients with board-certified physicians. The prescribing physicians you interact with through Nexphoria are independent licensed clinicians. Nexphoria does not employ physicians or influence clinical decision-making.",
  },
  {
    q: "Is Nexphoria accredited or regulated?",
    a: "Nexphoria operates as a telehealth platform under applicable U.S. state telehealth laws. The compounding pharmacies Nexphoria partners with are 503A-licensed and subject to state pharmacy board oversight and FDA inspection. Physicians are board-certified and licensed in the states where they practice. Nexphoria itself is not a pharmacy or a medical practice.",
  },
];

const HERO_SUB = `Nexphoria is a telehealth service for prescription peptide therapy. Prescriptions are written by independent, U.S.-licensed physicians of ${PROVIDER_INFO.name}, through the Bask Health telehealth platform. Medicines are compounded by ${PHARMACY_INFO.name}, a state-licensed 503A pharmacy in Houston, Texas, and blood work is analysed by a CLIA-certified laboratory. Nexphoria operates the service and does not make clinical decisions.`;

export default function About() {
  useSeo({
    title: "About Nexphoria",
    description: `Nexphoria is a telehealth service for prescription peptide therapy. Prescriptions are written by independent, U.S.-licensed physicians of ${PROVIDER_INFO.name}, through the Bask Health telehealth platform, and medicines are compounded by ${PHARMACY_INFO.name}, a state-licensed 503A pharmacy.`,
    path: "/about",
    jsonLd: [
      webPageJsonLd({
        name: "About Nexphoria",
        description: HERO_SUB,
        path: "/about",
      }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
      faqJsonLd(ABOUT_FAQ_ITEMS),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      {/* ── Hero ── */}
      <section className="nx-hero-r3" data-testid="about-hero" aria-labelledby="about-h1">
        <div className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)" }}>
          <Reveal>
            <p style={kicker}>About</p>
            <h1 id="about-h1" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1.03, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.9rem" }}>
              About Nexphoria.
            </h1>
            <p style={{ ...body, fontSize: "var(--nx-t-lg)", maxWidth: "62ch", marginTop: "1.1rem" }}>{HERO_SUB}</p>
          </Reveal>
          <Reveal>
            <figure className="relative overflow-hidden nx-editorial-bleed" style={{ borderRadius: "var(--nx-r-lg)", border: "1px solid var(--nx-border)", marginTop: "clamp(2rem,4vw,3rem)" }} data-testid="about-hero-editorial">
              <img src={heroAbout} alt="A physician in a consultation room" className="w-full object-cover" style={{ aspectRatio: "21 / 9", minHeight: 300 }} loading="eager" decoding="async" />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── What we offer ── */}
      <section className="nx-container" aria-labelledby="about-offer" style={{ paddingTop: "var(--nx-sp-sec)" }} data-testid="about-offer">
        <Reveal>
          <p style={kicker}>What we offer</p>
          <h2 id="about-offer" style={{ ...h2, maxWidth: "20ch" }}>Twenty-two medicines and six protocols.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>
            Twenty-two compounded peptide medicines and six protocols, for {GOALS}. Each is listed with what it is for, how it works, how you take it, what to expect, and its price.
          </p>
          <p style={{ ...body, marginTop: "0.8rem" }}>
            An at-home blood kit of {PANEL_TOTAL_MARKERS} markers ships with the first order and is drawn before the first dose. The same {PANEL_TOTAL_MARKERS} markers are tested again at week {RETEST_WEEK} on terms of three months and longer.
          </p>
          <p style={{ ...body, marginTop: "0.8rem" }}>
            One monthly price, paid up front for a term of one, three, six or twelve months. It includes the medicine, the physician's review, the blood testing the term includes, and cold shipping. Three months is 10% less per month, six 15%, twelve 20%.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
            <Link href="/peptides" className="nx-text-link" style={{ ...small, fontWeight: 600 }} data-testid="about-peptides-link">The complete list</Link>
            <Link href="/stacks" className="nx-text-link" style={{ ...small, fontWeight: 600 }}>The protocols</Link>
            <Link href="/labs" className="nx-text-link" style={{ ...small, fontWeight: 600 }}>Every marker, and the additional tests</Link>
          </div>
        </Reveal>
      </section>

      {/* ── Who is involved ── */}
      <section className="nx-container" aria-labelledby="about-who" style={{ paddingTop: "var(--nx-sp-sec)" }} data-testid="about-who">
        <Reveal>
          <p style={kicker}>Who is involved</p>
          <h2 id="about-who" style={{ ...h2, maxWidth: "18ch" }}>Who is involved.</h2>
        </Reveal>
        <ul style={{ listStyle: "none", margin: "1.4rem 0 0", padding: 0, display: "grid", gap: 10, maxWidth: 820 }}>
          <li style={card}>
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>Nexphoria</p>
            <p style={{ ...small, marginTop: "0.25rem" }}>Nexphoria Research LLC operates the service and does not make clinical decisions.</p>
          </li>
          <li style={card}>
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>Bask Health</p>
            <p style={{ ...small, marginTop: "0.25rem" }}>Bask Health is the telehealth platform through which the health questions are answered and the prescription is written.</p>
          </li>
          <li style={card} data-testid="about-provider">
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>{PROVIDER_INFO.name}</p>
            <p style={{ ...small, marginTop: "0.25rem" }}>{PROVIDER_INFO.body}</p>
          </li>
          <li style={card} data-testid="about-pharmacy">
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>{PHARMACY_INFO.name}</p>
            <p style={{ ...small, marginTop: "0.25rem", whiteSpace: "pre-line" }}>{PHARMACY_INFO.body}</p>
          </li>
        </ul>
      </section>

      {/* ── Where we operate ── */}
      <section className="nx-container" aria-labelledby="about-where" style={{ paddingTop: "var(--nx-sp-sec)" }} data-testid="about-where">
        <Reveal>
          <p style={kicker}>Where we operate</p>
          <h2 id="about-where" style={{ ...h2, maxWidth: "18ch" }}>Where we operate.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>
            Medicines ship to all 50 states. Compounded GLP-1 medicines are restricted by law in some states; the health questions check.
          </p>
          <p style={{ ...small, marginTop: "0.9rem" }}>
            <Link href="/legal/state-availability" className="nx-text-link" style={{ fontWeight: 600 }} data-testid="about-state-link">State availability</Link>
          </p>
        </Reveal>
      </section>

      {/* ── Contact ── */}
      <section className="nx-container" aria-labelledby="about-contact" style={{ paddingTop: "var(--nx-sp-sec)" }} data-testid="about-contact-cta">
        <Reveal>
          <p style={kicker}>Contact</p>
          <h2 id="about-contact" style={{ ...h2, maxWidth: "18ch" }}>Contact.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>
            Email <a href={`mailto:${BUSINESS.email}`} className="nx-text-link" style={{ fontWeight: 600 }}>{BUSINESS.email}</a> or call <a href={`tel:${BUSINESS.phoneE164}`} className="nx-text-link" style={{ fontWeight: 600 }}>{BUSINESS.phone}</a>.
          </p>
          <p style={{ ...small, marginTop: "0.9rem" }}>
            <Link href="/contact" className="nx-text-link" style={{ fontWeight: 600 }} data-testid="about-contact-link">The contact page</Link>
          </p>
        </Reveal>
      </section>

      {/* ── Common questions ── */}
      <section className="nx-container nx-faq-section" aria-labelledby="about-faq-title" data-testid="about-faq">
        <Reveal>
          <p style={kicker}>Questions</p>
          <h2 id="about-faq-title" style={{ ...h2, maxWidth: "18ch" }}>Common questions.</h2>
        </Reveal>
        <div className="nx-faq-list">
          {ABOUT_FAQ_ITEMS.map((it, i) => (
            <Reveal key={it.q} delay={i * 50}>
              <details className="nx-faq-item" open={i === 0}>
                <summary>
                  <span>{it.q}</span>
                  <span className="nx-faq-plus" aria-hidden />
                </summary>
                <p className="nx-faq-a">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Closer ── */}
      <section className="nx-gradient-hero-dark nx-closer" aria-labelledby="about-closer">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 id="about-closer" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-display)", maxWidth: "18ch", margin: "0 auto", textWrap: "balance" }}>
              The next step is a physician.
            </h2>
            <Link href="/assessment" className="nx-cta-ceramic" data-testid="about-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              Begin the health questions
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
