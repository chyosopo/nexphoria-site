/* ═══ What arrives (2026-09-05; tiles since the evening polish) ═══
   The carton, rendered in the house studio, and what a month includes
   beside it as six small tiles, two across: an icon, the title and one
   line each. The same facts the price section used to carry as icon cards,
   now in one place a reader can picture. Cold shipping and the plain
   carton are two tiles; both were one line before. */
import { FlaskConical, Stethoscope, Droplets, RefreshCw, Snowflake, Package } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";
import monthBox from "@/assets/studio/month-box.webp";
import monthBox1200 from "@/assets/studio/month-box-1200.webp";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

export function WhatArrives() {
  const items = [
    { Icon: FlaskConical, t: "The medicine", b: "Compounded to order in a licensed U.S. pharmacy, with the month's syringes and swabs." },
    { Icon: Droplets, t: `The ${PANEL_TOTAL_MARKERS}-marker blood kit`, b: "Drawn at home before the first dose, with a prepaid return." },
    { Icon: Stethoscope, t: "The physician's review", b: "Of your answers, of the panel, and of the retest." },
    { Icon: RefreshCw, t: `The week-${RETEST_WEEK} test`, b: "The same markers again, on terms of three months and longer." },
    { Icon: Snowflake, t: "Cold shipping", b: "An ice pack in the carton, to all 50 states." },
    { Icon: Package, t: "Plain packaging", b: "A plain carton at your door, once a month." },
  ];
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-arrives" data-testid="frontdoor-arrives">
      <div className="nx-arrives nx-arrives--grid">
        <Reveal className="nx-arrives__media-wrap">
          <div className="nx-arrives__media">
            <img src={monthBox} srcSet={`${monthBox1200} 1200w, ${monthBox} 2000w`} sizes="(max-width: 900px) 100vw, 50vw" alt="The open Nexphoria carton with the vial, the blood kit, two syringes, two prep pads, the ice pack and the card" loading="lazy" decoding="async" width={2000} height={1300} />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">What arrives</p>
            <h2 id="fd-arrives" className="nx-dsh2" style={{ maxWidth: "20ch" }}>Everything a month needs arrives in one box.</h2>
            <p className="nx-lede">The medicine ships cold once a month, and the blood kit comes with your first order.</p>
          </div>
          <ul className="nx-arrives__grid" aria-label="What a month includes" data-testid="frontdoor-includes">
            {items.map(({ Icon, t, b }) => (
              <li key={t} className="nx-arrives__tile">
                <span className="nx-arrives__i"><Icon size={15} strokeWidth={2.1} aria-hidden="true" /></span>
                <span className="nx-arrives__t" style={{ fontFamily: S }}>{t}</span>
                <span className="nx-arrives__b" style={{ fontFamily: F }}>{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
