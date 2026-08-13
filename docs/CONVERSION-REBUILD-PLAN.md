# Conversion Rebuild — plan of record

**Authorised by Chiya 2026-08-13.** Supersedes nothing; this is the plan the
next several phases execute against. Read `CLAUDE.md` first — it still governs.

---

## The diagnosis

The site is built for a formulary that no longer exists.

| | built for | actually live |
|---|---|---|
| SKUs | 20 solo + 7 stacks | **4 solo + 1 stack** |
| goal categories | 8 | **3** (metabolic, growth, sexual health) |
| routes | **49** | ~20 carry weight |
| page code | **18,285 lines** | Assessment (2,164) + Pricing (1,469) + Science (1,376) + Bloodwork (1,219) are 33% of it |

Everything downstream of that mismatch is the symptom Chiya is describing:
pages that exist because a catalog used to justify them, a menu that lists
sections instead of selling goals, and a journey diluted across 49 doors.

**The job now is narrower than "polish":** prove legitimacy to LegitScript, and
convert. Every phase below is scored against those two, and anything that
serves neither gets cut.

---

## Standing decisions (Chiya, 2026-08-13)

1. **Vial imagery → licensed stock photography.** Both AI platforms are out of
   credits (Bloom `INSUFFICIENT_CREDITS`, higgsfield 0.04), and AI product
   shots are the "AI slop" look being objected to. Real glass photographs
   better than any render, and garbled AI label text on a *medical* product is
   a compliance hazard, not just an aesthetic one. See §Vial sourcing.
2. **Science page → fold, then delete.** Mechanisms move onto the PDPs where
   they convert; citations become a compact evidence strip. `/science`
   redirects. The credibility signal survives; the 1,376-line page does not.
3. **Colour → per-goal accent family, drawn from a full pastel set.**
   Graphite & Ice stays the SYSTEM. Colour becomes NAVIGATION: each live goal
   owns a tint, used on tiles, menu items, and band edges. This is an explicit
   palette authorisation from the principal — the standing "ask before you
   repaint" rule (CLAUDE.md law 1) is satisfied for this change and this
   change only.

---

## Phases

### P1 · Scope cut — fewer, better doors
Delete what a 4-SKU catalog cannot justify. Nothing is "archived in place":
retired code is deleted, retired routes redirect so no link dies.

- Fold Science → PDP mechanism blocks + evidence strip → delete, redirect.
- Audit all 49 routes against "does this help LegitScript or convert?"
  Candidates already flagged: `/stacks/build`, `/booking`, `/gate`, `/community`,
  `/gift`, `/gift/claim`. Each either earns its place or redirects.
- Every dead goal category (5 of 8) stops being reachable.
- **Gate:** `audit:funnel` still ≤3 clicks; smoke green on every redirect.

### P2 · The colour system — meaning, not decoration
- Add a per-goal accent token family to the sheet. Each live goal gets
  `--nx-goal-<key>-tint` / `-ink` / `-edge`, all verified WCAG AA on both
  canvases.
- **Rule that keeps it from becoming noise:** a colour identifies a GOAL. It is
  never chosen for variety. Two tiles share a colour if and only if they lead
  to the same goal.
- **Gate:** extend `audit:design` with a contrast assertion per pair, so a tint
  that fails AA fails the build.

### P3 · The menu as tiles
The thing Chiya called out first. The nav becomes a visual mega-menu: each goal
a tinted tile carrying its own art, outcome line, and price floor — not a text
list of sections. Motion on open, keyboard-navigable, reduced-motion honoured.

### P4 · Tiles everywhere + motion with meaning
Goal tiles, catalog shelves, PDP cross-sell, and the closing bands all adopt
one tinted-tile grammar. Motion rule: **every animation must encode a fact** —
a fill shows quantity, a rise shows sequence, a draw shows a process. Nothing
moves for delight alone.

### P5 · The journey — educational → conversion
One spine: *understand the molecule → see the evidence → see the price →
assessment*. Education is not a separate destination (that was Science's
mistake); it sits inside the path to purchase, at the moment the question
arises.

### P6 · Vial photography
Replace the drawn SVG with licensed stock on every product surface. The SVG
stays as the fallback for any SKU without a photo, so the shelf can never go
blank — the `audit:catalog` failure mode.

---

## Vial sourcing — what to buy

**Search terms that return the right frames:** "pharmaceutical vial isolated
white", "3ml glass vial crimp cap", "injectable medication vial studio".

**Buy shots that are:** single vial, upright, front-facing, on white or a pale
seamless sweep; silver/aluminium crimp cap (NOT navy or coloured — off-sheet);
clear or faintly blue liquid; **blank or illegible label**, because we print our
own molecule name over it.

**Reject:** anything with a readable brand name, a syringe or needle in frame
(route-of-administration imagery invites scrutiny), hands, or a clinical
setting. Props belong on lifestyle bands, never on a product surface.

**Volume:** 4 SKUs → 4 hero frames + 1 lineup. ~5 images, ~$50-150 total.

Drop the files in `attached_assets/` and tell me; I wire them in and the SVG
falls back automatically.

---

## What does NOT change

- PHI never enters this repo.
- No apex deploy without Chiya's explicit go-ahead, every time.
- The nine-gate battery runs before every commit. All nine are currently green;
  any red is a regression, not a baseline.
- Institutional voice. No hype, no urgency theatre, no invented testimonials,
  patients, reviews, or outcome statistics — there are none, and there will be
  none until they are real.
- Never "done" — a shrinking punch list only.
