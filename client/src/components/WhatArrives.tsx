/* ═══ What arrives (2026-09-05) ═══
   One photograph of the box and the list of what a month includes, beside
   it. The same five facts the price section used to carry as icon cards,
   now in one place a reader can picture. */
import { FlaskConical, Stethoscope, Droplets, RefreshCw, Snowflake } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { F, S } from "@/lib/typography";
import { ARRIVES_IMAGE } from "@/data/goalImages";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";

export function WhatArrives() {
  const items = [
    { Icon: FlaskConical, t: "The medicine", b: "Compounded to order in a licensed U.S. pharmacy, with the syringes and swabs for the month." },
    { Icon: Droplets, t: `The ${PANEL_TOTAL_MARKERS}-marker blood kit`, b: "Drawn at home before the first dose, with a prepaid return." },
    { Icon: Stethoscope, t: "The physician's review", b: "Of the health answers, of the panel, and of the results at the retest." },
    { Icon: RefreshCw, t: `The week-${RETEST_WEEK} test`, b: "The same markers again, on terms of three months and longer." },
    { Icon: Snowflake, t: "Cold shipping", b: "Plain packaging, to all 50 states." },
  ];
  return (
    <section className="nx-container nx-sec" aria-labelledby="fd-arrives" data-testid="frontdoor-arrives">
      <div className="nx-arrives">
        <Reveal className="nx-arrives__media-wrap">
          <div className="nx-arrives__media">
            <img src={ARRIVES_IMAGE.src} srcSet={ARRIVES_IMAGE.src800 ? `${ARRIVES_IMAGE.src800} 800w, ${ARRIVES_IMAGE.src} 1600w` : undefined} sizes="(max-width: 900px) 100vw, 50vw" alt={ARRIVES_IMAGE.alt} loading="lazy" decoding="async" width={1600} height={1063} />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">What arrives</p>
            <h2 id="fd-arrives" className="nx-dsh2" style={{ maxWidth: "16ch" }}>What a month includes.</h2>
            <p className="nx-lede">The medicine ships cold, once a month. The blood kit comes with the first order.</p>
          </div>
          <ul className="nx-arrives__list" aria-label="What a month includes" data-testid="frontdoor-includes">
            {items.map(({ Icon, t, b }) => (
              <li key={t}>
                <span className="nx-arrives__i"><Icon size={16} strokeWidth={2.1} aria-hidden="true" /></span>
                <span>
                  <span className="nx-arrives__t" style={{ fontFamily: S }}>{t}</span>
                  <span className="nx-arrives__b" style={{ fontFamily: F }}>{b}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
