# Agent brief — the ten-agent polish pass (2026-09-05, evening)

Chiya: "a lot of enhancements and polish, the copy and the design,
everything, even the little menu sidebar." Ten agents, one area each,
strict file ownership, the lead integrates.

## Rules for every agent
1. Read CLAUDE.md, docs/VOICE.md (v3: flowing sentences, second person, no
   caps labels), docs/AUDIT-2026-09-05.md, docs/DESIGN-SYSTEM.md if present.
2. Edit ONLY the files you own (listed in your prompt). Never edit
   client/src/index.css: put your CSS in client/src/styles/<area>.css and
   import it from a component you own. Tokens only (var(--nx-*)); no hex,
   no px font sizes, no off-token radius/shadow/transition literals in TSX.
3. Keep every data-testid that scripts/ or review/ reference (grep first),
   every legal clause, every price fact. No counts, no urgency, no
   discounts, no "free", no comparison with other companies, no "not a…",
   "we don't", "no hidden" (scripts/audit-voice.ts).
4. Do not commit, push, or run `npm run build` (it writes dist/ that others
   use). To see your work: `npm run check` (must be 0), then a PRIVATE
   build: `npx vite build --outDir /tmp/claude-0/-home-user-nexphoria-site/879e755e-4e72-5062-bfe4-4ef0e3861870/scratchpad/build-<area>/public --emptyOutDir`
   then copy review/serve.mjs to ./_serve-<area>.mjs, change `root` to that
   folder and the port to YOUR port, run it in the background, and capture
   with Playwright (executablePath "/opt/pw-browsers/chromium"; scripts in
   the project root, e.g. ./_cap-<area>.mjs; delete both helpers when done).
   SPA routing: open http://localhost:<port>/ and navigate client-side
   (the private build has no prerendered routes; deep links 404 there).
5. Mobile first: 390 px, tap targets ≥ 36 px, no horizontal overflow.
   Desktop 1440. Look at your screenshots before reporting.
6. Report: what changed, why (one line each), screenshot paths, `npm run
   check` output, and anything you left for the lead.
