/* ═══ After the box arrives (2026-09-15) ═══
   openloophealth.com's "Patient-first platform" band: a soft radial tint,
   a centred headline, three icon items. Ours: what continues after the
   first dose. Three facts, an icon each. */
import { Stethoscope, Droplets, MessageCircle } from "lucide-react";
import { F } from "@/lib/typography";
import { RETEST_WEEK } from "@/data/monitoring";

export function CareBand() {
  const items = [
    { Icon: Stethoscope, t: "The physician", b: "reviews every dose change" },
    { Icon: Droplets, t: `Week ${RETEST_WEEK}`, b: "the same blood panel, read again" },
    { Icon: MessageCircle, t: "A person", b: "answers your questions, in writing" },
  ];
  return (
    <section className="nx-bleed nx-olcare" aria-labelledby="fd-care" data-testid="frontdoor-support">
      <div className="nx-container">
        <div className="nx-ivhead nx-ivhead--center">
          <p className="nx-eyebrow">After the box arrives</p>
          <h2 id="fd-care" className="nx-ivhead__h2">Care continues <span className="nx-grad">after the first dose.</span></h2>
          <p className="nx-ivhead__lede" style={{ fontFamily: F }}>The prescription is the start of the care, and the physician stays with it.</p>
        </div>
        <ul className="nx-olcare__items" aria-label="What continues">
          {items.map(({ Icon, t, b }) => (
            <li key={t}>
              <span className="nx-olicon" aria-hidden="true"><Icon strokeWidth={2} /></span>
              <b>{t}</b>
              <span style={{ fontFamily: F }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
