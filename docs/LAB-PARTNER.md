# Lab partner for the week-12 panel: MyLabsDirect vs SiPhox Health

Written 2026-09-03 for Chiya, who asked for a look at both partner
programs with a peptide-customised panel in mind. Facts below come from
each company's public partner and product pages on 2026-09-03; neither
page publishes partner pricing, so the money question is a call to each.

## What we need from a lab partner

The site's model (docs/MASTER-PLAN.md, Chiya 2026-09-02): you start first,
one full panel at week 12, included in every plan, the same panel for
everyone. `client/src/data/monitoring.ts` is the proposed panel: 24
markers in five groups, pending the prescribers' sign-off. So the partner
has to do four things:

1. Run every marker in that panel, or tell us plainly which ones it cannot.
2. Collect from a person at home, or send them to a draw site, with the
   result going to the prescribing doctor, not only to the patient.
3. Let us brand the kit and the results page as Nexphoria.
4. Price a fixed panel per member so the "included" claim holds.

## Side by side

| | MyLabsDirect | SiPhox Health |
|---|---|---|
| Model | White-label at-home kits, fully custom panels, they process in their own CLIA-certified labs | White-label, co-brand or referral; custom panels; CLIA and CAP certified lab; API or co-branded dashboard |
| Collection | At-home kits (finger prick and blood draw kits) | At-home capillary kit from the upper arm, five minutes, results in 7 to 10 days; virtual phlebotomy calls and free replacements for failed collections |
| Custom panel | Yes, "lab scientists help design custom lab panels"; branded packaging designed by their team | Yes, "customizable test panels"; they train partners on biomarkers |
| Doctor access to results | Results delivered "in real time", HIPAA and SOC 2; partner-side access to be confirmed | Partner dashboard and API to "track your clients' health journeys"; structured results |
| Named markers on site | Cholesterol, inflammation, cardiac risk, TSH, T3, T4, testosterone, hormone panels, liver, kidney, vitamin D, nutrients, diabetic risk | 62 named markers incl. HbA1c, glucose, ApoB, Lp(a), hs-CRP, homocysteine, TSH, free T3, free T4, TPOAb, total and free testosterone, sensitive estradiol, SHBG, DHEA-S, FSH, LH, prolactin, progesterone, eGFR, creatinine, cystatin C, ALT, AST, albumin, bilirubin, vitamin D, ferritin |
| Ready-made fit | None named | A "GLP Monitoring Panel" already exists (metabolic, liver, kidney, nutrition, hormones), plus Hormone Focus and Ultimate 360 |
| Retest cadence | Not stated | Monthly, quarterly or every six months |
| Pricing | Not published; partner form or (877) 355-7978 | Not published; partner intake form. Consumer add-ons: GLP panel +$75, Ultimate 360 +$125 over base |
| LegitScript | Says LegitScript certified | Not stated on the pages read |

## Our 24 markers against SiPhox's published list

Covered by finger-prick kit as published: HbA1c, fasting glucose, total,
LDL and HDL cholesterol, triglycerides, ApoB, hs-CRP, ALT and AST,
creatinine and eGFR, total and free testosterone,
estradiol, SHBG, TSH, free T4, vitamin D, ferritin.

Not on SiPhox's published list, so ask: fasting insulin, lipase, IGF-1,
cortisol, complete blood count, vitamin B12. IGF-1 matters most: it is the
number tesamorelin's dose is set against, and a CBC is usually a venous
draw. MyLabsDirect publishes a shorter list, so the same six are the first
question for them too.

## Recommendation

Talk to both, with the same one-page spec, and pick on three answers:
IGF-1 and insulin availability, the partner price per panel, and whether
results land in the prescriber's hands the way Bask needs. On what is
published, SiPhox looks closer to the shape we want (a GLP monitoring
panel already exists, hormones are deep, the kit is genuinely at home and
there is an API). MyLabsDirect looks more flexible on the custom kit and
carries the LegitScript mark, which matters for our own certification.

Questions to send both, in one email:

1. Can you run IGF-1, fasting insulin, lipase, cortisol, CBC and B12 from
   your at-home kit? If not, which need a venous draw, and can you route
   those to a draw site?
2. Partner price per member for our fixed 24-marker panel, and the price
   if the six above are dropped.
3. Can results be delivered to a prescribing physician through Bask Health
   or by API, with the member seeing them at the same time?
4. Can the kit and results page carry the Nexphoria name and colours?
5. Turnaround from collection to result, and the failed-collection
   replacement policy.
6. Which states you cannot ship a kit to (New York is the usual one).

## What the site says meanwhile

Until the partner is chosen, every page describes the draw without naming
a network or a kit: "We send you what you need for the draw as week 12
approaches." The "2,000+ partner laboratory locations" figure came off the
site on 2026-09-03 because it belonged to a network we may not use.
