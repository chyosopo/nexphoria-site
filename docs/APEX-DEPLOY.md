# Apex deploy — nexphoria.com

Chiya authorised this release on 2026-08-14 ("Push it to nexphoria.com").
It could not be run from the sandbox: **Cloudflare credentials do not exist
there.** `wrangler whoami` reports "You are not authenticated", `wrangler
login` is an interactive OAuth flow, and there is no `CLOUDFLARE_API_TOKEN`
in the environment. The working credentials live in
`~/Library/Preferences/.wrangler/` **on the Mac** — so this runs from Atlas's
machine, not from a container.

The Cloudflare MCP server available in the sandbox does not close the gap
either: it exposes D1, KV, R2, Hyperdrive and Workers tools, and **no Pages
deploy tool**. Vercel is not a substitute — the apex is a Cloudflare Pages
project, so a Vercel deploy would not change what nexphoria.com serves
unless apex DNS moved, and apex DNS is not to be touched without a decision
from Chiya (CLAUDE.md, Domain Safety).

## What is being shipped

Branch `claude/nexphoria-enterprise-overhaul-ld0sqd`, head `80e11c9`.
Seven commits beyond `cf2eda7`, the last state the apex is known to have
served from. Highlights:

- Pricing + Bloodwork merged into one `/plan`; four old URLs redirect
- Home page 10,901px → 7,152px (two undefined CSS classes were rendering
  four vials at ~1,000px each)
- Jewel colour-block palette; Tesamorelin re-shot in lapis, gold retired
- Scroll reveal now actually fades; grids stagger; tiles lift
- 22 defensive-negation phrases rewritten, plus `audit:voice` to hold it

## Gates — all ten green on `80e11c9`, verified 2026-08-14

```
check · build · smoke 39/39 · audit:data · audit:design (12/12 accent pairs AA)
audit:catalog · audit:bundle · audit:funnel 9/9 · audit:legitscript
audit:compliance · audit:a2p · audit:voice
```

`audit:compliance` is the gate that blocks an apex deploy, and it passes:
every business fact is a real value, no placeholders, no empty required
fields.

## Run this on the Mac

```sh
cd <repo>
git fetch origin claude/nexphoria-enterprise-overhaul-ld0sqd
git checkout claude/nexphoria-enterprise-overhaul-ld0sqd
git pull --ff-only origin claude/nexphoria-enterprise-overhaul-ld0sqd
nvm use                    # Node 20 — better-sqlite3 will not build on 26

npm ci
npm run build

# Re-run the battery on the machine that is publishing. Do not deploy on the
# strength of a green run from somewhere else.
npm run check && npm run smoke && npm run audit:data && npm run audit:design \
  && npm run audit:catalog && npm run audit:bundle && npm run audit:funnel \
  && npm run audit:legitscript && npm run audit:compliance \
  && npm run audit:a2p && npm run audit:voice

# THE 404 TRAP. Deploy a COPY with 404.html REMOVED. A top-level 404.html
# disables Cloudflare Pages' automatic SPA fallback and BEATS _redirects, so
# leaving it in turns every deep link into a hard 404. The 404.html is for
# gh-pages only (rafgraph SPA hack) and must stay in dist for that target.
rm -rf .deploy-apex
cp -r dist/public .deploy-apex
rm -f .deploy-apex/404.html
test ! -f .deploy-apex/404.html || { echo "404.html still present — STOP"; exit 1; }

npx wrangler pages deploy .deploy-apex \
  --project-name=nexphoria \
  --branch=main \
  --commit-dirty=true
```

## Verify after publishing

Deep links are the thing that breaks, and they break silently — the home
page will look perfect either way.

```sh
for p in / /plan /peptides /peptides/tesamorelin /legal/messaging /faq; do
  printf '%s -> %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://nexphoria.com$p)"
done
```

All six must return `200`. A `404` on anything but `/` means the 404.html
removal did not take — redeploy the copy, do not patch DNS.

Then confirm by eye that the formulary tiles are emerald / lapis / garnet and
that the Tesamorelin bottle is blue. If it is gold, an old build shipped.

## Open items this deploy does NOT resolve

- `client/public/img/img_2724ef984ae9.mp4` and `img_6d36ae1989c8.mp4` —
  7.7MB, referenced by nothing in `client/src`, still shipping. They cost
  deploy size, not page load, since nothing requests them. Kept rather than
  deleted because they were generated deliberately and that is Chiya's call.
- The four Express API routes (`/api/waitlist`, `/api/contact`,
  `/api/intake-click`, `/api/checkout`) do not run on a static host. The
  marketing pages are fully static and fine; those endpoints stay dead until
  they are ported to functions or pointed at Bask.
- Still blocked on Chiya: bremelanotide / PT-141 references, semaglutide
  pricing sign-off, Bask DNS + portal URL + GLP-1 questionnaire links.
