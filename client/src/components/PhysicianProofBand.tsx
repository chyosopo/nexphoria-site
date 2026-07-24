import { F } from "@/lib/typography";
import physicianPortrait from "@/assets/doctors/dr-chen.webp";

/* PhysicianGate — compact physician presence at decision moments
   (ROADMAP 5.1): beside hero CTAs, beside the buy box, on checkout.
   Same unnamed network portrait, one line: board certification + the
   freedom to decline. Never used as page wallpaper. */
export function PhysicianGate({ testid = "physician-gate", style }: { testid?: string; style?: React.CSSProperties }) {
  return (
    <div data-testid={testid} style={{ display: "flex", alignItems: "center", gap: 10, ...style }}>
      <img
        src={physicianPortrait}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        width={34}
        height={34}
        style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0, boxShadow: "var(--nx-e-1)" }}
      />
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.45, color: "var(--nx-fg-graphite)", margin: 0, textAlign: "left" }}>
        <strong style={{ fontWeight: 600, color: "var(--nx-fg)" }}>Reviewed by a board-certified U.S. physician</strong>
        {" "}— licensed in your state, and free to decline.
      </p>
    </div>
  );
}

/* PhysicianProofBand — the compliant reviews-alternative for Rx PDPs.
   No star ratings, no testimonials, no named individuals (the physicians
   data model deliberately describes a process, not people): one unnamed
   portrait from the review network plus the clinical standard, in the
   shared nx-proof grammar. */
export function PhysicianProofBand({ name }: { name: string }) {
  return (
    // Renders inside the PDP content rail — no container wrapper of its own.
    <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} data-testid="pdp-physician-proof">
      <div
        className="grid grid-cols-1 sm:grid-cols-[96px_1fr]"
        style={{
          gap: "clamp(1.1rem,2.5vw,1.8rem)",
          alignItems: "center",
          border: "1px solid var(--nx-border)",
          borderRadius: "var(--nx-r-lg)",
          background: "var(--nx-cobalt-soft)",
          padding: "clamp(1.4rem,3vw,2.2rem)",
        }}
      >
        <div style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden", boxShadow: "var(--nx-e-2)" }}>
          <img
            src={physicianPortrait}
            alt="A physician on the Nexphoria review network"
            loading="lazy"
            decoding="async"
            width={96}
            height={96}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div>
          <p className="nx-proof-quote" style={{ fontSize: "var(--nx-t-xl)" }}>
            Every {name} prescription is written by a U.S.-licensed physician who has read your bloodwork — and declined when the numbers say no.
          </p>
          <p className="nx-proof-attr" style={{ marginTop: 10 }}>The Nexphoria clinical standard</p>
        </div>
      </div>
    </section>
  );
}
