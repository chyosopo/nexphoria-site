/* ═══ HomeTrust — shared trust sections for both world homes ═══
   Physician-trust band + "How it works" 3-step band. All color derives from
   --nx-* tokens, so it inherits men (azure/steel) under /men and women
   (orchid/rose) under /women automatically — one component, two worlds.
   Copy is verbatim from COPY-BLOCKS §1 + §3 (bank voice). */
import { ClipboardList, FlaskConical, ShieldCheck, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";

const CREDENTIALS = ["Board-certified", "U.S.-licensed", "Can decline a prescription"];

const STEPS = [
  {
    n: "01",
    Icon: ClipboardList,
    title: "Share your history.",
    body: "A private, structured intake covering your goals, training, and medical history — the same questions a physician would ask in the room.",
  },
  {
    n: "02",
    Icon: FlaskConical,
    title: "Get evaluated.",
    body: "Baseline bloodwork and a review by a U.S.-licensed physician. They are the only party who decides whether a prescription is appropriate.",
  },
  {
    n: "03",
    Icon: ShieldCheck,
    title: "Start under supervision.",
    body: "If prescribed, your protocol ships from a state-licensed 503A pharmacy, with labs re-run every 90 days and adjustments made against your markers.",
  },
];

export function HomeTrust() {
  return (
    <>
      {/* ── PHYSICIAN-TRUST BAND — COPY-BLOCKS §3, credential-forward ── */}
      <section className="nx-container" style={{ paddingTop: "clamp(3.5rem,6vw,5.5rem)", paddingBottom: "clamp(3.5rem,6vw,5.5rem)" }}>
        <Reveal>
          <div className="nx-glass-card" style={{ padding: "clamp(1.8rem,4vw,2.8rem)" }}>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
              Physician oversight
            </p>
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.6vw,38px)", color: "var(--nx-fg)", maxWidth: "20ch", marginTop: "0.8rem", lineHeight: 1.14 }}>
              Every protocol is decided by a licensed physician.
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "62ch", marginTop: "1rem" }}>
              Your intake and bloodwork are reviewed by board-certified, U.S.-licensed physicians of MDI Providers PLLC. They determine whether a prescription is appropriate — and decline when it is not.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "1.6rem" }}>
              {CREDENTIALS.map((c) => (
                <span
                  key={c}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", background: "color-mix(in srgb, var(--nx-ceramic) 50%, transparent)", border: "1px solid color-mix(in srgb, var(--nx-fg) 14%, transparent)", borderRadius: "var(--nx-r-pill)", padding: "8px 14px" }}
                >
                  <Check size={14} strokeWidth={2.4} style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── HOW IT WORKS — COPY-BLOCKS §1, 3-step, verb-first ── */}
      <section className="nx-container" style={{ paddingTop: "clamp(3.5rem,6vw,5.5rem)", paddingBottom: "clamp(3.5rem,6vw,5.5rem)" }}>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
          The process
        </p>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,3.6vw,38px)", color: "var(--nx-fg)", marginTop: "0.8rem", lineHeight: 1.14 }}>
          How it works
        </h2>
        <div className="nx-steps-lg" style={{ marginTop: "clamp(2.4rem,4vw,3.4rem)" }}>
          {STEPS.map((s, i) => {
            const { Icon } = s;
            return (
              <Reveal key={s.n} delay={i * 70}>
                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <span className="nx-step-lg-num">{s.n}</span>
                    <span className="nx-icon-circle" style={{ marginTop: "0.4rem" }}>
                      <Icon size={19} strokeWidth={1.8} aria-hidden />
                    </span>
                  </div>
                  <div className="nx-step-lg-rule" />
                  <h3 className="nx-step-lg-title">{s.title}</h3>
                  <p className="nx-step-lg-body">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
