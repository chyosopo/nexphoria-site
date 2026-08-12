# IVYRX STUDY — reference teardown for the LegitScript-ready rebuild
**Reference:** https://www.ivyrx.com · **Crawled:** 2026-08-12 · **Method:** HTTP/DOM + stylesheet extraction (see *Method limits*)

Chiya's brief: take IvyRx's design, journey, menu logic, breakdowns and checkout as the
inspiration for the Nexphoria rebuild. This doc extracts the **grammar**. Per Standing Law 1
the Porcelain & Navy token sheet does not change — we steal structure, never skin, and never
their copy or claims.

---

## 0 · Method limits (read this before trusting anything below)
- **No rendered screenshots.** Chromium has no external egress in this sandbox — every
  navigation returns `ERR_CONNECTION_RESET`, verified against example.com, nexphoria.com and
  ivyrx.com alike (it reaches localhost only, which is why CI prerender and our own
  dev-server captures work). TLS verification was **not** disabled to work around it.
- Everything below is extracted from served HTML, JSON-LD and the Webflow stylesheet. That is
  strong for IA, offer model, copy and tokens; **it says nothing about rendered composition,
  motion, or visual hierarchy.** Those need Atlas (has a browser) — see *Open items*.
- One measurement was discarded as unreliable: grepping product pages for route-of-
  administration returned the same terms on every page because they are category nav links.
  Only ingredient lines are trustworthy.

---

## 1 · What IvyRx actually is
Webflow-built telehealth storefront, **LegitScript certified** (seal `15352787`, script at
`static.legitscript.com/seals/15352787.js` — a real cert ID, not a badge graphic).
Entity "Ivy Rx PLLC". Phone published site-wide: `+1-866-464-8979`. 352 URLs in sitemap.

---

## 2 · The single most important structural lesson: **goal-first, not molecule-first**
Their entire funnel is organised around *what the patient wants*, with the molecule attached
downstream. `/find-your-treatment` triages into exactly **three goals**, each already priced:

| Goal | Entry price |
|---|---|
| Lose weight | $276 |
| Achieve greater energy and better mood | $79 |
| Build muscle and optimize physical fitness | $69 |

Home headings follow the same grammar — outcome first, molecule second:
*"Lose weight with — Personalized GLP-1 Injections"*, *"Stay energized — NAD+ injections"*.

**Our site is molecule-first** (peptide catalog → categories → stacks). That is the biggest
single conversion gap identified. A patient arrives with a goal, not a peptide.

---

## 3 · The journey — "3 simple steps"
1. **Consultation** — framed *"Free consultation, fast approval"*
2. **Prescription**
3. **Delivery** — *"Free and discreet delivery"*, *"shipped discreetly from an FDA-registered pharmacy"*

Short, numbered, outcome-shaped. Note they anchor the *program* at $276 but surface
**"from $97"** on the PDP — a low entry anchor with the program price revealed after triage.

---

## 4 · Design system (from `ivyrx-testing.webflow.shared.min.css`, 443KB)
- **Type:** DM Sans (primary) + Manrope, loaded 300–700 via WebFont.
- **Heading grammar:** tight tracking (`--letter-spacing--0-03em`), line-height ~1.0,
  margin-top 4 / margin-bottom 2 on the space scale.
- **Palette — monochrome discipline plus exactly two soft accents:**
  - near-blacks `#1c1c1c` `#171717` `#2e2e2e` `#242628`
  - off-whites `#fafafa` `#f5f5f5` `#ffffff`
  - accents **`#dc9ea8`** (dusty rose) and **`#948ec4`** (periwinkle) — used sparingly
- **Tokens:** `--space--N`, `--column-margin--N`, `--button--{background,border,text}(-hover)`,
  alpha whites (`--alpha--white--15/33/60`), `--border-width--main: .094rem` (hairline).
- **Buttons:** default `#2e2e2e` on white, inverting to white-on-transparent on hover.

**Transferable grammar:** severe neutral base, hairline borders, one or two restrained
accents, tight display tracking. **Not transferable:** their actual hues. Ours stay
Porcelain & Navy; their rose/periwinkle is their brand, not ours.

---

## 5 · Compliance architecture — the most valuable finding
IvyRx sells **BPC-157 and methylene blue while holding LegitScript certification.** That
disproves "certification requires an FDA-approved-only catalog." What actually carries it:

**a) Route of administration is the gate, not the molecule.**
Products with no approved active are sold **orally** — BPC-157 is *"500mcg, vegetable capsule
(hypromellose), rice powder"*; likewise methylene blue, gut peptide complex, GLP-1 boost.
**Sterile injectables are reserved for actives with regulatory standing** (GLP-1s, B12,
glutathione, NAD). Oral formulation avoids sterile-compounding exposure entirely.

**b) Explicit, repeated non-approval disclosure.** Verbatim from their BPC-157 page:
> "BPC-157 is not FDA-approved for any indication; therefore, its use should be considered
> experimental or off-label."
> "The FDA does not review compounded medications for safety or effectiveness."
> "Much of the evidence … comes from animal or in vitro models. Caution is advised."

**c) Named structure:** physician evaluation → licensed prescriber → partner pharmacy
(503B referenced), plus a dedicated `/safety-information` page (23 uses of "compounded",
7 of "not FDA-approved") and a **`/consumer-health-data-privacy-policy`** — the Washington
My Health My Data surface most telehealth sites forget.

**⚠️ What NOT to copy.** The same BPC-157 page also says *"Proven Healing Power … accelerates
recovery"* and *"considered safe when used as directed."* Those are efficacy and safety claims
on a non-approved substance and they contradict the page's own disclaimer. We take the
disclosure architecture; we do not take the claim copy.

---

## 6 · Conversion machinery worth stealing
- **Paid-landing matrix:** `/lp/{meta,google,tiktok}/{glp1-lf, glp1-ps, semaglutide-lf,
  tirzepatide-lf}` — channel × offer × format, each a dedicated page.
- **Patient story pages:** `/patient/{brandi,jocelyn,lacretia,amber}` each with a paired
  `/lp/meta/patient-{name}`. Story as its own landing surface.
  **We cannot copy this** — we have no real patients yet, and inventing them is fabricated
  testimony. Build the slot; leave it empty until real consented stories exist.
- **Utility magnets:** `/resources/bmi-calculator`, `/resources/tdee-calculator` — tools that
  rank organically and feed triage.
- **A/B infrastructure:** `/exp/bmi-calculator-b`, `/exp/product/nad`.
- **Localisation:** `/es/productos/…` Spanish route.
- **Programs:** `/reviews`, `/ambassador-program`, `/affiliates`.

---

## 7 · What this means for Nexphoria (the build brief)
1. **Invert the IA to goal-first.** Triage on goal, attach protocol after. Highest-leverage change.
2. **Build the disclosure architecture as reusable infrastructure**, not per-page prose — a
   compliance component wrapping every product surface. This makes the catalog a dial, not a
   one-way door.
3. **Adopt route-of-administration as a first-class data field** on every SKU. It determines
   what may be sold and how it must be disclosed.
4. **Three-step journey**, numbered, outcome-shaped — we have the 01→05 pipeline; consider
   whether five steps is two too many before a purchase decision.
5. **Price anchoring:** decide deliberately between low entry anchor ("from $X") and complete
   program price. House voice forbids "free" — use "complimentary"/"included".
6. **Retire, don't delete.** Flag removed SKUs so oral re-entry later is config, not rebuild.

---

## 8 · Open items (need Atlas or Chiya)
- [ ] **Rendered visual pass** — Atlas to capture ivyrx.com desktop+mobile for composition,
      spacing rhythm, imagery treatment and motion. Blocked here by sandbox egress.
- [ ] **Checkout flow walkthrough** — requires interactive session; not reachable via HTTP alone.
- [ ] Confirm our pharmacy/provider entities and whether any 503B relationship exists.
- [ ] Chiya decision: catalog scope — 4 SKUs confirmed for launch; oral re-entry path open.
