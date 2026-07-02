/* ═══ HOW IT WORKS — rebuilt P2 · the institution's argument ═══
   One quiet timeline. Light by default, one night band. Bank voice. */
import { SiteLayout } from "@/components/SiteLayout";
import { Link } from "wouter";
import { useSeo, webPageJsonLd } from "@/lib/seo";

const F = "'General Sans', system-ui, sans-serif";
const S = "'Fraunces', Georgia, serif";

const STEPS = [
  { n: "01", t: "Structured intake", d: "A medical questionnaire covering history, goals, and current medications. Reviewed in full before anything else happens." },
  { n: "02", t: "Bloodwork at the lab", d: "A single draw at a partner laboratory near you. Seventy-six biomarkers across heart, hormones, metabolism, liver, kidneys, and more — your baseline, measured." },
  { n: "03", t: "Physician review", d: "A licensed U.S. physician reads your intake against your markers. If a protocol is appropriate, it is prescribed. If it is not, you are told so plainly." },
  { n: "04", t: "503A compounding", d: "Prescriptions are compounded for you in a state-licensed 503A pharmacy — batch-documented, prescription-only." },
  { n: "05", t: "Cold-chain delivery", d: "Temperature-controlled from pharmacy to door, in discreet packaging." },
  { n: "06", t: "Your dashboard", d: "Markers, ranges, trends, protocol, and physician messaging — one place." },
  { n: "07", t: "The 90-day retest", d: "Your panel is drawn again. The trend is reviewed and the protocol adjusted against it. This loop is the product." },
];

export default function HowItWorks() {
  useSeo({
    title: "How It Works — Nexphoria",
    description: "Intake, bloodwork, physician review, 503A compounding, cold-chain delivery, one dashboard, 90-day retesting.",
    jsonLd: [webPageJsonLd({ name: "How It Works", url: "/how-it-works" })],
  });
  return (
    <SiteLayout>
      {/* hero — quiet */}
      <section className="nx-container" style={{ padding: "clamp(3.2rem,7vw,5.5rem) 0 2.5rem" }}>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>How it works</p>
        <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(36px,5.6vw,64px)", lineHeight: 1.06, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "17ch", marginTop: "0.9rem" }}>
          Seven steps. <em style={{ color: "var(--nx-cobalt)" }}>No improvisation.</em>
        </h1>
        <p style={{ fontFamily: F, fontSize: 16.5, lineHeight: 1.6, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1rem" }}>
          Physician oversight, laboratory bloodwork, state-licensed compounding, and one dashboard — in a fixed order that does not bend.
        </p>
      </section>

      {/* the timeline */}
      <section className="nx-container" style={{ paddingBottom: "3.5rem" }}>
        <div style={{ borderTop: "1px solid var(--nx-border)" }}>
          {STEPS.map((s) => (
            <div key={s.n} className="grid md:grid-cols-[110px_1fr] gap-2 md:gap-8 py-7" style={{ borderBottom: "1px solid var(--nx-border)" }}>
              <p style={{ fontFamily: S, fontSize: 30, color: "var(--nx-rust)", lineHeight: 1 }}>{s.n}</p>
              <div>
                <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(21px,2.6vw,27px)", color: "var(--nx-fg)" }}>{s.t}</h2>
                <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "58ch", marginTop: "0.45rem" }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* the one night band — the loop */}
      <section style={{ background: "var(--nx-bg-dark)", padding: "clamp(3rem,6vw,4.5rem) 0" }}>
        <div className="nx-container">
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>Why the loop matters</p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.4vw,46px)", color: "var(--nx-ceramic)", maxWidth: "22ch", marginTop: "0.8rem" }}>
            A prescription is a hypothesis. <em style={{ color: "var(--nx-acid)" }}>The retest is the evidence.</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: 15.5, lineHeight: 1.7, color: "var(--nx-acid)", opacity: 0.85, maxWidth: "56ch", marginTop: "1rem" }}>
            Most of this market sells vials and disappears. Here, every 90 days the same seventy-six markers are drawn again, the trend is placed next to the protocol, and a physician decides what changes. Nothing is assumed. Everything is measured.
          </p>
        </div>
      </section>

      {/* terms strip + close */}
      <section className="nx-container" style={{ padding: "3rem 0 4.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
          Licensed physicians · State-licensed 503A pharmacies · Prescription required · One dashboard
        </p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.2vw,44px)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "1.4rem auto 0" }}>
          The consultation carries no charge. <em style={{ color: "var(--nx-cobalt)" }}>You pay only if prescribed.</em>
        </h2>
        <Link href="/assessment" style={{ display: "inline-block", fontFamily: F, fontWeight: 600, fontSize: 15, background: "var(--nx-cobalt)", color: "var(--nx-ceramic)", borderRadius: 999, padding: "14px 28px", marginTop: "1.6rem", textDecoration: "none" }} data-testid="hiw-cta">
          Begin your intake
        </Link>
      </section>
    </SiteLayout>
  );
}
