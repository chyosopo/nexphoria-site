import { F } from "@/lib/typography";
import physicianPortrait from "@/assets/doctors/dr-chen.webp";

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
          <p className="nx-proof-quote" style={{ fontSize: "clamp(18px,2.2vw,24px)" }}>
            Every {name} prescription is written by a U.S.-licensed physician who has read your bloodwork — and declined when the numbers say no.
          </p>
          <p className="nx-proof-attr" style={{ marginTop: 10 }}>The Nexphoria clinical standard</p>
        </div>
      </div>
    </section>
  );
}
