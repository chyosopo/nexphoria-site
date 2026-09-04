/* The kit, drawn (no photograph yet; the partner's box is not designed).
   Tokens only: the box is the ceramic surface, the lid line is the border,
   the label is set in the house faces. Decorative. */
import { F, S } from "@/lib/typography";

export function LabKitBox({ markers, name = "The Panel", size = "100%", className }: { markers: number; name?: string; size?: string; className?: string }) {
  return (
    <div className={`nx-kit ${className ?? ""}`} style={{ width: size }} aria-hidden="true">
      <div className="nx-kit__box">
        <div className="nx-kit__lid" />
        <div className="nx-kit__label">
          <span className="nx-kit__brand" style={{ fontFamily: F }}>Nexphoria</span>
          <span className="nx-kit__name" style={{ fontFamily: S }}>{name}</span>
          <span className="nx-kit__meta" style={{ fontFamily: F }}>{markers} markers · at-home blood kit</span>
          <span className="nx-kit__rule" />
          <span className="nx-kit__fine" style={{ fontFamily: F }}>Draw in the morning, before you eat. Prepaid return inside.</span>
        </div>
        <div className="nx-kit__vials">
          <i /><i /><i />
        </div>
      </div>
    </div>
  );
}
