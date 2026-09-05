/* What arrives, as a list a reader can picture. Only what the site already
   states is claimed: the medicine, cold-shipped; the blood kit; the
   physician's review; the week-12 test on longer terms. */
import { FlaskConical, Droplets, Stethoscope, RefreshCw, Snowflake } from "lucide-react";
import { F, S } from "@/lib/typography";
import { LAB_KIT } from "@/data/labs";
import { RETEST_WEEK } from "@/data/monitoring";
import { vialFacts } from "@/lib/vial";
import type { SoloPeptide } from "@/data/soloCatalog";

export function WhatArrives({ sku, testId }: { sku: SoloPeptide; testId?: string }) {
  const v = vialFacts(sku);
  const medicine =
    v.form === "vial" && v.vialsPerMonth
      ? `${v.vialsPerMonth} ${v.vialsPerMonth === 1 ? "vial" : "vials"} of ${sku.name}${v.course ? ` for the course` : " for the month"}`
      : v.form === "vial" ? `${sku.name}, in vials`
      : v.form === "weekly-pen" ? `${sku.name}, for weekly injection`
      : v.form === "nasal-spray" ? `${sku.name}, as a nasal spray`
      : v.form === "capsule" ? `${sku.name}, in capsules`
      : v.form === "protocol" ? "Each medicine, in its own vial"
      : sku.name;
  const items = [
    { Icon: FlaskConical, t: medicine, b: "Compounded to order in a licensed U.S. pharmacy." },
    { Icon: Snowflake, t: "Cold, in plain packaging.", b: "Shipped with cold packs and temperature indicators, to all 50 states." },
    { Icon: Droplets, t: `The at-home blood kit: ${LAB_KIT.markers} markers, included.`, b: "Drawn at home before your first dose, with a prepaid box back to the laboratory." },
    { Icon: Stethoscope, t: "A licensed physician's review.", b: "Of your health answers first, and of your results before your first dose." },
    { Icon: RefreshCw, t: `The same ${LAB_KIT.markers}-marker test again at week ${RETEST_WEEK}.`, b: "On terms of three months and longer, so the dose follows what changed." },
  ];
  return (
    <div className="nx-card" data-testid={testId ?? `arrives-${sku.slug}`}>
      <p className="nx-eyebrow">What arrives at your door</p>
      <ul style={{ listStyle: "none", margin: "0.9rem 0 0", padding: 0, display: "grid", gap: 12 }}>
        {items.map(({ Icon, t, b }) => (
          <li key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: 3 }}><Icon size={17} strokeWidth={2.1} aria-hidden="true" /></span>
            <span>
              <span style={{ display: "block", fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", lineHeight: 1.3 }}>{t}</span>
              <span style={{ display: "block", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", lineHeight: 1.5, marginTop: 2 }}>{b}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
