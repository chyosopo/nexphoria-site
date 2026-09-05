# The Nexphoria design system (2026-09-05)

Phase 2 of the delivery plan (Chiya, 2026-09-05): one system, so the whole site
reads as one company instead of pages assembled band by band. Everything below
is built on the existing tokens in `client/src/index.css` `:root`. Introduce no
new literal (audit:design must not regress). Both worlds (navy / rose) inherit
automatically because every value is a token.

## Tokens (already defined; do not restate inline)
- Space rhythm: `--nx-sp-sec` (between sections), `--nx-sp-band`, `--nx-sp-tight`.
- Type scale: `--nx-t-display / -giant / -h1 / -h2 / -h3 / -xl / -lg / -body / -base / -sm / -xs / -2xs`.
- Radii: `--nx-r-lg 20 / -md 14 / -sm 8 / -xs 4 / -pill`.
- Tracking: `--nx-ls-display / -tight / -snug / -normal / -wide / -caps`.
- Colour: `--nx-fg`, `--nx-fg-graphite`, `--nx-fg-muted`, `--nx-bg`, `--nx-ceramic`,
  `--nx-border`, `--nx-cobalt` (the one accent), `--nx-bg-dark` (navy band).
- Faces: `F` (body) and `S` (display) from `@/lib/typography`; both are General Sans.

## Primitive classes (use these, not per-page inline objects)
- `.nx-eyebrow` — the uppercase cobalt kicker above a heading. Always cobalt, always t-2xs.
- `.nx-dsh1 / .nx-dsh2 / .nx-dsh3` — the three heading sizes. Display face, weight 500, tight tracking, balanced.
- `.nx-lede` — the one-paragraph intro under a heading. 58ch max, graphite.
- `.nx-prose` (`.nx-prose--sm`) — body copy.
- `.nx-sec-head` — the header stack: `<p class="nx-eyebrow">…</p><h2 class="nx-dsh2">…</h2><p class="nx-lede">…</p>`. Consistent spacing everywhere.
- `.nx-sec` — standard top padding for a section (`padding-top: var(--nx-sp-sec)`).
- `.nx-card` — the one card surface (ceramic, 1px border, r-lg, consistent padding). `.nx-card--flush` for media cards.
- On a `.nx-band` (navy) or `.nx-hero-r3`, the header classes invert automatically. Do not hand-set colours inside bands.

## The rule
Every section on every page is:
```
<section class="nx-container nx-sec" aria-labelledby="…">
  <div class="nx-sec-head">
    <p class="nx-eyebrow">Eyebrow</p>
    <h2 class="nx-dsh2" id="…">The heading.</h2>
    <p class="nx-lede">One sentence of context.</p>
  </div>
  … content, using .nx-card / .nx-prose …
</section>
```
Retire the per-page `const kicker/h2/body/lede` style objects as you migrate a
page. Keep every `data-testid`. Copy stays the plain deck (docs/COPY-DECK-PLAIN.md).

## What this is NOT
Not a repaint (palette is Porcelain & Navy, locked). Not new components. It is
the single source for the roles every page already uses, so they stop drifting.
