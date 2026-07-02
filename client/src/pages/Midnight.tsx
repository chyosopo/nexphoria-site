/* ────────────────────────────────────────────────────────────────
   MIDNIGHT STYLE LAB — /midnight (hidden route, not linked in nav)
   Palette A: the exact spec sheet. Palette B: midnight + candlelight.
   Real components, real type, real glass — judge on the truth.
   ──────────────────────────────────────────────────────────────── */
import { Link } from "wouter";

const F = "'General Sans', system-ui, sans-serif";
const SERIF = "'Fraunces', Georgia, serif";

/* Palette A — the spec, no substitutions */
const A = { base: "#0B1420", surface: "#121E2E", elevated: "#16212B", border: "#1E2C3E", steel: "#3E6C8E", hover: "#6FA3CC", ice: "#9FC2DE", muted: "#8FA3B8", faint: "#56687C", white: "#FFFFFF" };

function Sample({ p, accent, accentSoft, name, note }: { p: typeof A; accent: string; accentSoft: string; name: string; note: string }) {
  return (
    <section style={{ background: p.base, padding: "clamp(3rem,6vw,5rem) 0", borderTop: `1px solid ${p.border}` }}>
      <div className="nx-container">
        <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: accent }}>{name}</p>
        <p style={{ fontFamily: F, fontSize: 13.5, color: p.muted, marginTop: 6, maxWidth: "52ch" }}>{note}</p>

        {/* Hero sample */}
        <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(38px,5.6vw,72px)", lineHeight: 1.06, letterSpacing: "-0.015em", color: p.white, maxWidth: "15ch", marginTop: "2.2rem" }}>
          The best version of you, <em style={{ fontStyle: "italic", color: accent }}>prescribed.</em>
        </h1>
        <p style={{ fontFamily: F, fontSize: 16.5, lineHeight: 1.55, color: p.muted, maxWidth: "50ch", marginTop: "1.1rem" }}>
          Physician-directed peptide protocols, gated by 76 biomarkers and re-tested every 90 days.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, background: accent, color: p.base, borderRadius: 999, padding: "13px 24px", display: "inline-block" }}>Start your free intake</span>
          <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: p.ice, border: `1px solid ${p.border}`, borderRadius: 999, padding: "13px 24px", display: "inline-block" }}>See the bloodwork</span>
        </div>

        {/* Tile row sample */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[["Heart", "9 markers"], ["Thyroid", "5 markers"], ["Hormones", "8 markers"], ["Liver", "7 markers"]].map(([t, s]) => (
            <div key={t} style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: 18, padding: "1.3rem 1.2rem" }}>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 20, color: p.white }}>{t}</div>
              <div style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, color: accent, marginTop: 4 }}>{s}</div>
              <div style={{ fontFamily: F, fontSize: 12.5, color: p.faint, marginTop: 8 }}>Apolipoprotein B · hs-CRP</div>
            </div>
          ))}
        </div>

        {/* Glass dashboard sample */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${p.border}`, borderRadius: 20, padding: "1.4rem 1.5rem", backdropFilter: "blur(10px)" }}>
            {[["Apolipoprotein B", "72 mg/dL", "Optimal", 42], ["hs-CRP", "0.8 mg/L", "Optimal", 22], ["HbA1c", "5.6 %", "Watch", 74]].map(([m, v, s, pct]) => (
              <div key={m as string} className="py-3.5" style={{ borderBottom: `1px solid ${p.border}` }}>
                <div className="flex items-baseline justify-between gap-3">
                  <span style={{ fontFamily: F, fontSize: 14.5, fontWeight: 600, color: p.white }}>{m}</span>
                  <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: s === "Watch" ? accent : accentSoft }}>{s} · {v}</span>
                </div>
                <div className="relative mt-2.5" style={{ height: 6, borderRadius: 999, background: p.border }}>
                  <span className="absolute top-0 h-full" style={{ left: "18%", width: "38%", borderRadius: 999, background: `${accentSoft}44` }} />
                  <span className="absolute" style={{ left: `calc(${pct}% - 6px)`, top: -3, width: 12, height: 12, borderRadius: 999, background: accent, boxShadow: `0 0 0 3px ${accent}40` }} />
                </div>
              </div>
            ))}
            <p style={{ fontFamily: F, fontSize: 11, color: p.faint, marginTop: "0.9rem" }}>Illustration of the member dashboard.</p>
          </div>
          <div style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: 20, padding: "1.4rem 1.5rem" }}>
            <div className="flex items-baseline justify-between">
              <span style={{ fontFamily: F, fontSize: 14.5, fontWeight: 600, color: p.white }}>ApoB · 12 months</span>
              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: accentSoft }}>−25%</span>
            </div>
            <svg viewBox="0 0 300 110" className="mt-4 w-full" style={{ height: 110 }}>
              <polyline points="20,26 106,38 192,58 278,74" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {[26, 38, 58, 74].map((y, i) => (
                <circle key={i} cx={20 + i * 86} cy={y} r="4" fill={p.base} stroke={accent} strokeWidth="2" />
              ))}
            </svg>
            <p style={{ fontFamily: F, fontSize: 13, lineHeight: 1.55, color: p.muted, marginTop: "0.8rem" }}>
              Every 90 days your physician reviews the trend — and adjusts against it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Midnight() {
  return (
    <main style={{ background: A.base, minHeight: "100vh" }}>
      <div className="nx-container" style={{ paddingTop: "2.5rem" }}>
        <Link href="/" style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: A.ice, textDecoration: "none" }}>← Back to the warm site (the control)</Link>
        <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,4vw,44px)", color: A.white, marginTop: "1.2rem" }}>
          Midnight Style Lab
        </h1>
        <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.6, color: A.muted, maxWidth: "58ch", marginTop: "0.6rem" }}>
          Two consistent futures, rendered with the site's real components and type. Scroll both, then flip back to the warm site. Same headline, same dashboard, same tiles — only the world changes.
        </p>
      </div>

      <div style={{ height: "2.5rem" }} />

      {/* A — the spec, verbatim */}
      <Sample p={A} accent={A.steel} accentSoft={A.hover} name="Variant A · Your spec, verbatim"
        note="Steel blue as the only accent — clinical, cool, disciplined. This is the signature's exact world." />

      {/* B — midnight + candlelight */}
      <Sample p={A} accent="#2E7BF0" accentSoft="#8FC6FF" name="Variant B · Midnight + candlelight"
        note="Same midnight architecture — but the accent stays honey. The signature italic, the buttons, the data dots: warm light in a dark room. Keeps brand continuity with everything built so far." />

      {/* Verdict notes */}
      <section style={{ background: A.elevated, borderTop: `1px solid ${A.border}`, padding: "3rem 0 4rem" }}>
        <div className="nx-container">
          <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: A.ice }}>What to look at before deciding</p>
          <p style={{ fontFamily: F, fontSize: 14.5, lineHeight: 1.7, color: A.muted, maxWidth: "62ch", marginTop: "0.8rem" }}>
            One — which accent makes you feel the price is justified: steel (A) or candlelight (B)? Two — imagine the photo library here: every image we've made is graded warm cream and gold; under A they will fight the page, under B they harmonize. Three — flip to the warm site and back twice. The palette you miss is the answer.
          </p>
        </div>
      </section>
    </main>
  );
}
