# DATA-UNIFICATION-PLAN

**Scope:** Retire the drift risk between the two hand-maintained peptide/stack data
layers in `client/src/data/`. Prose plan only — this document changes no runtime code.
Every claim below is grepped from the tree at the time of writing (branch `design/azure`).

**Status of this pass:** Investigation + plan (Deliverable 1) + one zero-risk guard-rail
(Deliverable 2). No source data changed. No prices, peptides, cadences, or sellable
predicates touched.

---

## 0. The two layers (and a third, out of scope)

| Layer | File | Exports | Role today |
|---|---|---|---|
| **LEGACY stacks** | `client/src/data/stacks.ts` | `Stack`, `stacks[]`, `getStack`, `getStacksForGender`, `resolveStackSlug`, `computeStackPrice` | Fallback stack pricing in cart, confidence-overlap source in the builder, contents strip in Cart/Checkout |
| **LEGACY peptides** | `client/src/data/peptides.ts` | `Peptide`, `PeptideCategory`, `peptides[]`, `CATEGORY_LABELS`, `getPeptide`, `peptidesByCategory` | The `/peptides` display library (editorial: studies, glyphs, evidence tiers) |
| **NEW stacks** | `client/src/data/stacksCatalog.ts` | `FlagshipStack`, `FLAGSHIP_STACKS[]`, `getStack`, `PANELS`, `usd`, GLP-1 exclusions | Canonical commercial stack catalog (dosing, cadence pricing, panels, gating) |
| **NEW solos** | `client/src/data/soloCatalog.ts` | `SoloPeptide`, `SoloCategory`, `SOLO_CATALOG[]`, `getSolo` | Canonical commercial solo catalog (dosing, spec, tier pricing, gating) |

> **A third parallel source exists and is OUT OF SCOPE here:** `client/src/lib/protocols.ts`
> also exports its own `peptides[]`, `stacks[]`, `Peptide`, `Stack`, and
> `getPeptidesForStack`, consumed by `client/src/components/StackCard.tsx:4`
> (`import type { Stack } from "@/lib/protocols"`). That is a fourth catalog and a
> separate debt item; this plan does not touch it. Flagged so it is not forgotten.

**Critical correction to the working premise.** The legacy `stacks[]` and `FLAGSHIP_STACKS`
are **NOT slug-aligned and NOT derived from each other**:

- Legacy slugs: `wolverine · glow · restore · clarity · prime · balance` (6).
- Catalog slugs: `wolverine · glow · ascend · lucidity · meridian · ignite · threshold` (7).
- Only `wolverine` and `glow` share a slug, and even those **disagree on peptides**:
  legacy `wolverine.peptides = ["bpc-157","tb-500","ghk-cu"]` (3) vs catalog
  `wolverine.peptides = [BPC-157, TB-500]` (2). Prices also disagree (legacy
  `wolverine.startingPrice = 262` matches no catalog cadence).

Therefore the `audit:data` line *"none — all 7 stacks × 3 cadences agree"* is **NOT** a
legacy-vs-catalog assertion. It is a **cart-vs-PDP** assertion: `scripts/audit-data-drift.ts:31-41`
iterates `FLAGSHIP_STACKS` and compares each cadence's `perMonth` against
`priceAtCadence(slug, key)`, and `priceAtCadence` (`pricing.ts:88-100`) reads the **catalog**
first. Both sides of that check are catalog-derived. The legacy `stacks[]` file is a
**divergent fallback**, not a mirror. Any unification must reconcile that divergence, not
assume it away.

---

## 1. Field-by-field mapping — `Stack` (legacy) ↔ `FlagshipStack` (catalog)

Source: `stacks.ts:6-32` and `stacksCatalog.ts:36-55`.

| Legacy `Stack` field | Catalog `FlagshipStack` field | Verdict | Notes |
|---|---|---|---|
| `slug: string` | `slug: string` | **identical shape / divergent values** | Value sets differ (see §0). Migration must map legacy slugs → catalog slugs. |
| `name: string` | `name: string` | **identical** | `wolverine`/`glow` names match; others have no counterpart. |
| `tagline: string` | `tagline: string` | **identical shape / divergent content** | Legacy "The repair stack." vs catalog "Recovery, measured." Both institutional. |
| `purpose: string` | — | **legacy-only** | Catalog spreads this intent across `category` + `bestFor` + `synergy`. |
| `curator: string` | — | **legacy-only** | e.g. "Board-certified physician — Sports Medicine". No catalog equivalent. |
| `description: string` | `synergy: string` (closest) | **reshaped** | Not 1:1; catalog `synergy` is a tighter mechanism note. |
| `peptides: string[]` (slugs) | `peptides: StackPeptideLine[]` (`{name,dose,spec}`) | **reshaped** | Legacy = slug list; catalog = rich dose/spec objects keyed by display name, not slug. **This is the hardest mapping** (name→slug reverse lookup needed). |
| `labMarkers: string[]` | `panel: PanelTier` + `panelNote?` | **reshaped** | Legacy = free markers; catalog = tiered panel (`Basic`/`Full`/`Elite`) + note. |
| `duration: string` | `timeline: StackTimelineMark[]` (`{wk,effect}`) | **reshaped** | Legacy = one string; catalog = staged timeline array. |
| `bestFor: string` | `bestFor: string` | **identical shape / divergent content** | |
| `image: string` | — | **legacy-only** | Catalog uses `category` art + `worldLean`; no per-stack image slug. |
| `gender: "her"\|"him"\|"both"` | `worldLean?: "him"\|"her"\|"both"` | **renamed** | Same value set, reordered union. Optional in catalog. |
| `badge?: "Flagship"\|"Bestseller"\|"New"` | — | **legacy-only** | No catalog badge concept. |
| `startingPrice?: number` | `cadences: StackCadence[]` (`total`,`perMonth`,`badge`,`includesPanel`) | **reshaped** | Legacy = single "from"; catalog = full 1mo/3mo/12mo/fixed matrix. |
| — | `category: string` | **catalog-only** | e.g. "Recovery & Injury". |
| — | `synergy: string` | **catalog-only** | |
| — | `contraindications: string[]` | **catalog-only** | |
| — | `gated?: boolean` | **catalog-only** | `ignite` = `true` (GLP-1, unsold). |
| — | `stateExclusions?: string[]` | **catalog-only** | GLP-1 state gate. |
| — | `panelNote?: string` | **catalog-only** | |

**Takeaway:** the catalog is a strict superset of commercial fields; the legacy file is a
superset of *editorial* fields (`purpose`, `curator`, `description`, `image`, `badge`).
No lossless one-way collapse exists — a merge must pick a canonical home per field.

---

## 2. Field-by-field mapping — `Peptide` (legacy) ↔ `SoloPeptide` (catalog)

Source: `peptides.ts:43-73` and `soloCatalog.ts:19-33`.

| Legacy `Peptide` field | Catalog `SoloPeptide` field | Verdict | Notes |
|---|---|---|---|
| `slug: string` | `slug: string` | **identical** | Membership already gated by catalog — see §2.1. |
| `name: string` | `name: string` | **identical — already unified** | `peptides.ts:936-939` overrides each `name` from `SOLO_CATALOG` via the `CANON` map. Display names are **already** catalog-sourced. |
| `fullName: string` | — | **legacy-only** | |
| `tagline: string` | — | **legacy-only** | |
| `category: PeptideCategory` (kebab, lowercase) | `category: SoloCategory` (Title Case) | **renamed + divergent value set** | `"recovery"` vs `"Recovery"`, `"skin"`/`"longevity"` vs `"Skin & Longevity"`. **Not byte-identical — cannot be trivially deduped.** |
| `glyph: <union>` | — | **legacy-only** | Molecular SVG id. |
| `summary: string` | — | **legacy-only** | |
| `mechanism: string` | `mechanism: string` | **identical shape / divergent content** | Both present; text differs (legacy longer). |
| `halfLife: string` | — | **legacy-only** | |
| `typicalDose: string` | `dose: string` | **renamed** | |
| `cycleLength: string` | — | **legacy-only** | |
| `administration: string` | — | **legacy-only** | Catalog folds route into `dose`/`spec`. |
| `timeline: {week,effect}[]` | `timeline: {wk,effect}[]` | **renamed key** | `week` → `wk`. |
| `studies: PeptideStudy[]` | — | **legacy-only** | Editorial citations. |
| `pairsWith: string[]` | — | **legacy-only** | |
| `inStacks: string[]` | — | **legacy-only** | |
| `evidenceTier?: PeptideEvidenceTier` | — | **legacy-only** | |
| `contraindications?: string` | `contraindications: string[]` | **reshaped** | String vs array; required in catalog. |
| — | `spec: string` | **catalog-only** | Vial spec. |
| — | `panel` / `panelNote?` | **catalog-only** | |
| — | `pricing?: SoloPricing` | **catalog-only** | `{m1,m3,m12}`; absent ⇒ "priced at consult". |
| — | `gated?` / `stateExclusions?` | **catalog-only** | GLP-1 gate. |

### 2.1 Already-unified surface (important)
`peptides.ts:933-939` imports `SOLO_CATALOG`, builds `CANON`, and filters `RAW_PEPTIDES`
to catalog membership **and** overrides `name` from the catalog. So the peptide display
library is **already** a projection over the solo catalog for *membership + names*.
`audit:data` locks this (E40 block, `audit-data-drift.ts:58-69`: GHOSTS + NAME DRIFT).
The remaining legacy peptide fields are purely editorial and safe to keep local.

---

## 3. Import sites of every legacy export (grep-verified)

Grep: `from "@/data/stacks"` and `from "@/data/peptides"` across the tree.

### 3.1 `@/data/stacks`
| # | File:line (import) | Symbols | Usage sites | How used |
|---|---|---|---|---|
| 1 | `client/src/contexts/CartProvider.tsx:3` | `stacks`, `computeStackPrice` | `:183` `stacks.find`, `:187` `computeStackPrice(stack,pricing)` | **LIVE price fallback** — only when `getFlagship(slug)` is undefined (`:169`). |
| 2 | `client/src/components/CadenceSelector.tsx:5` | `stacks`, `computeStackPrice` | `:43` `stacks.find`, `:45` `computeStackPrice` | Cadence-card bundle math for legacy-slug stacks. |
| 3 | `client/src/pages/Cart.tsx:8` | `stacks` | `:494` `stacks.find(...).peptides` | Display-only "INCLUDES · A + B + C" strip (`StackContents`). |
| 4 | `client/src/pages/Checkout.tsx:13` | `stacks` | `:531` `stacks.find` (+ `.peptides.length` in summary) | Display-only "N peptides" count. |
| 5 | `client/src/pages/BuildYourStack.tsx:12` | `getStack` | `:189` `getStack(GOAL_TO_STACK[goalId])` → `:193` `formulaOverlap(matchedStack.peptides, picked)` | **LIVE** — drives the confidence-overlap score. `GOAL_TO_STACK` (`:120-128`) targets **legacy** slugs (`metabolic`,`sleep`,`cognitive`,`longevity`) resolved via `resolveStackSlug` aliases (`stacks.ts:131-146`). |

### 3.2 `@/data/peptides`
| # | File:line (import) | Symbols | How used |
|---|---|---|---|
| 1 | `client/src/pages/Category.tsx:11` | `peptides`, `CATEGORY_LABELS`, `type PeptideCategory` | `:128` label lookup, `:129` `peptides.filter(category)` → JSON-LD + tiles. |
| 2 | `client/src/pages/BuildYourStack.tsx:7` | `peptides`, `CATEGORY_LABELS`, `type PeptideCategory` | `:203` `peptides.filter(sellable)`, `:212` category filter, `:644`/`:871` label render. |
| 3 | `client/src/components/WorldHome.tsx:10` | `peptides`, `CATEGORY_LABELS`, `PeptideCategory` | `:88` per-category counts, `:90` featured-slug resolve; `:49` `Record<PeptideCategory,...>`. |
| 4 | `client/src/pages/Home.tsx:11` | `peptides as ALL_PEPTIDES` | Featured-peptide resolution on the home grid. |
| 5 | `client/src/components/ProtocolConfigurator.tsx:5` | `peptides` | Peptide lookup within the configurator. |
| 6 | `client/src/components/Nav.tsx:8` | `CATEGORY_LABELS`, `type PeptideCategory` | Mega-menu category taxonomy (`MEGA_CATEGORIES`, `:61`). |
| 7 | `client/src/pages/Category.tsx` (see #1) | — | — |
| 8 | `client/src/pages/SoloPDP.tsx:21` | `type PeptideCategory` | `:24` `Record<SoloCategory, PeptideCategory>` outcome map (type only). |
| 9 | `client/src/data/outcomeImagery.ts:12` | `type PeptideCategory` | `:28` `Partial<Record<PeptideCategory,string>>` (type only). |

### 3.3 Dead / internal-only exports (grep-confirmed no external importers)
- `getStacksForGender` (`stacks.ts:153`) — **no importers.** Fully dead.
- `resolveStackSlug` (`stacks.ts:144`) — no external importers, but **used internally** by
  `getStack` (`:149`); it powers the `GOAL_TO_STACK` alias resolution in §3.1 #5. Not dead.
- `getPeptide` (`peptides.ts:941`) — no external importers.
- `peptidesByCategory` (`peptides.ts:945`) — no external importers.
- `Peptide` / `Stack` types — imported from **`@/lib/protocols`**, not from these files
  (`StackCard.tsx:4`); the data-file type exports have no external consumers.

---

## 4. Staged migration order (safest → riskiest)

Each step is independently shippable and independently revertible. Cart/checkout **pricing**
is migrated LAST, behind `audit:data`.

**Step 0 — Guard-rail (this pass, done).** Add a build-time assertion so future drift on the
legacy fallback path fails a gate. See §6. Zero runtime effect.

**Step 1 — Remove provably-dead exports.** Delete `getStacksForGender`, `getPeptide`,
`peptidesByCategory` (no importers). *Do NOT* remove `resolveStackSlug` (internally live).
- Guard: `npm run check` (unused-symbol removal cannot change runtime) + `smoke` unchanged.
- Risk: near-zero. Reversible by re-adding.

**Step 2 — Unify the peptide-category taxonomy (type-level).** `PeptideCategory` (kebab)
and `SoloCategory` (Title Case) are semantically parallel but **not byte-identical**, so they
cannot be blindly re-exported. Introduce an explicit, tested `SOLO_TO_PEPTIDE_CATEGORY`
bridge (a `Record<SoloCategory, PeptideCategory>`; a partial one already exists in
`SoloPDP.tsx:24`) as the single crossing point, then keep `PeptideCategory` +
`CATEGORY_LABELS` as the display taxonomy owned by `peptides.ts`.
- Guard: `npm run check`; `audit:design` token counts unchanged (no TSX render change).
- Risk: low (types + one map).

**Step 3 — Migrate the display-only legacy stack readers.** Repoint `Cart.tsx:494`
(`StackContents`) and `Checkout.tsx:531` to read peptide names from `FLAGSHIP_STACKS`
(`getFlagship(slug).peptides.map(p => p.name)`), with a legacy fallback retained until Step 6.
- Guard: `smoke` 47/47; visual parity check on `/cart` and `/checkout`. No price path touched.
- Risk: low–medium (display strings only). Note: today these `.find` calls silently return
  `null` for catalog-only slugs (`ascend` etc.), so the "INCLUDES" strip already no-ops for
  them — migrating *adds* coverage, it does not remove it.

**Step 4 — Migrate the builder confidence score.** Repoint `BuildYourStack` `GOAL_TO_STACK`
(`:120-128`) to **catalog** slugs and derive `matchedStack.peptides` from
`FLAGSHIP_STACKS` (mapping catalog peptide **names** back to solo slugs for `formulaOverlap`).
- ⚠️ This **changes the overlap number** because catalog stacks have different peptide sets
  (e.g. catalog `wolverine` has 2 peptides vs legacy 3). Product-visible but non-commercial.
- Guard: `smoke`; manual overlap-score review; `audit:data` unaffected (not a price path).
- Risk: medium. Ship isolated, with the score change called out in the commit.

**Step 5 — Reconcile the two `wolverine`/`glow` records.** Decide the canonical peptide set +
tagline for the shared slugs so legacy and catalog stop disagreeing. Editorial decision;
no code-mechanical answer. Blocks a clean Step 6.
- Guard: `audit:data` stays clean; human sign-off on peptide-set change.
- Risk: medium (content/clinical review).

**Step 6 — Retire the legacy stack *pricing* fallback (LAST, behind the gate).** Remove the
`computeStackPrice` fallback from `CartProvider.tsx:182-199` and `CadenceSelector.tsx:43-45`
once every reachable stack slug is guaranteed present in `FLAGSHIP_STACKS`. Then `stacks.ts`
may keep only editorial fields (or be deleted per Atlas's call — **this plan does not delete
either data file**, per constraint 6).
- Guard: **`npm run audit:data` MUST still print `none — all 7 stacks × 3 cadences agree`
  and `12 sellable solos` and `ignite gated`.** Plus `check` + `build` + `smoke` 47/47 +
  `audit:bundle` + `audit:design` non-regress.
- Risk: highest — this is the money path. Do not start until Steps 1–5 are shipped and green.

---

## 5. Risks & the exact invariant guarding each step

| Risk | Where | Guarding invariant / gate |
|---|---|---|
| Stack price changes for a buyer | `priceAtCadence` / `FLAGSHIP_STACKS.cadences` | `audit:data` STACK PRICE DRIFT: `cart === pdp` for all 7 × {1mo,3mo,12mo}; must read `none — all 7 stacks × 3 cadences agree` (`audit-data-drift.ts:31-41`). |
| Solo price changes for a buyer | `SOLO_CATALOG.pricing` vs `priceAtCadence` | `audit:data` PEPTIDE PRICE DRIFT: `cart1 === s.pricing.m1` (`:14-23`). |
| Sellable count drifts / a gated GLP-1 becomes buyable | builder `sellable` predicate | `audit:data` LEAK CHECK: `12 sellable solos`, no `GATED-SELLABLE`, no `ORPHAN-SELLABLE` (`:43-53`). |
| `ignite` accidentally priced | `FLAGSHIP_STACKS` gating | `audit:data`: `ignite: gated — intentionally unpriced/unsellable ✓` (`:34`). |
| A zombie PDP tile / renamed peptide | `peptides` vs `SOLO_CATALOG` | `audit:data` E40: no GHOSTS, no NAME DRIFT (`:58-69`). |
| Legacy fallback silently prices a peptide at $0 | `computeStackPrice` (`stacks.ts:159`, `pricing[slug]?.monthlyPrice \|\| 0`) | **NEW guard-rail, §6** — every legacy `stacks[].peptides` slug must exist in `pricing`. |
| Off-token color / type literal creeps in | any TSX edit | `audit:design` must stay `fs52 · r19 · sh10 · tr4 · redecl0 · token 99/99`. |
| Bundle budget regression | entry imports | `audit:bundle` (entry ≤300KB, recharts banned, Bloodwork lazy). |

---

## 6. Deliverable 2 — the one zero-risk slice shipped this pass

**What the task suggested** was a guard asserting legacy `stacks[]` and `FLAGSHIP_STACKS`
"agree on slug/peptides/price." **That assertion is FALSE today** (§0: different slugs,
different peptides, different prices) and would immediately fail the gate — so it is *not*
zero-risk and was not implemented.

**What was implemented instead** (provably true today, audit-only, zero runtime effect):
a **LEGACY STACK FALLBACK INTEGRITY** check in `scripts/audit-data-drift.ts` asserting that
**every peptide slug referenced by `stacks[].peptides` exists in `pricing`**. This locks the
exact footgun in `computeStackPrice` (`stacks.ts:159`): a missing slug silently contributes
`$0` to the cart fallback total. It is true for all 6 legacy stacks today (all 11 distinct
referenced slugs — `bpc-157, tb-500, ghk-cu, tirzepatide, dsip, epitalon, selank, semax,
mots-c, ipamorelin, nad-plus` — are keys in `pricing`), so it prints `none` and changes no
gate outcome. It fails only if a future edit introduces an unpriced legacy-stack peptide.

This is the single move that both (a) cannot change any runtime output and (b) adds real
future-drift protection on the legacy path this plan will eventually retire.
