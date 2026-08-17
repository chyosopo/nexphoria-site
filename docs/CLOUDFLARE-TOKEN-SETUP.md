# Giving CI permission to publish nexphoria.com

The apex deploy already runs from GitHub Actions. It builds, runs the gate
battery, strips the 404.html and publishes to Cloudflare Pages. It has failed
twice for one reason only: the repo has no `CLOUDFLARE_API_TOKEN` secret, so
the workflow stops at its own guard clause before spending anything.

This is the one-time fix. It takes about five minutes and needs no code.

## Rule that matters more than the steps

**The token goes straight from Cloudflare into GitHub's secret box.** It is
never pasted into a chat with Claude, an email, a Slack message, or a doc.
Anyone holding it can publish to the live site. GitHub encrypts it and Claude
can trigger the workflow that uses it without ever being able to read it,
which is exactly the arrangement we want.

Cloudflare shows the token **once**. If it scrolls away, delete it and make a
new one rather than hunting for it.

## Who can do this

Two accesses, and they can be two different people:

- **Cloudflare** — access to the account that owns the `nexphoria` Pages
  project, with permission to create API tokens.
- **GitHub** — admin on `chyosopo/nexphoria-site` (needed to add a secret).

## Part 1 — Create the token in Cloudflare

1. Go to **https://dash.cloudflare.com/profile/api-tokens**
   (or: dash.cloudflare.com → profile icon, top right → My Profile → API Tokens)
2. **Create Token**
3. Scroll past the templates to **Create Custom Token** → **Get started**
4. **Token name:** `nexphoria-pages-deploy`
5. **Permissions** — set exactly one row:
   - `Account` · `Cloudflare Pages` · `Edit`
6. **Account Resources:** Include → the account that owns `nexphoria`.
   Scope it to that ONE account. A token that can see several accounts makes
   wrangler ask which, and then the workflow needs a second secret.
7. **TTL:** leave as is. An expiring token means the deploy dies later for a
   reason nobody remembers.
8. **Continue to summary** → confirm it reads *Cloudflare Pages: Edit* and
   nothing else → **Create Token**
9. Copy the token. This is the only time it is shown.

That permission is the minimum that can deploy. It cannot touch DNS, cannot
read the zone, cannot reach any other service.

## Part 2 — Put it into GitHub

1. Go to **https://github.com/chyosopo/nexphoria-site/settings/secrets/actions**
2. **New repository secret**
3. **Name:** `CLOUDFLARE_API_TOKEN` — exactly that, case-sensitive
4. **Secret:** paste the token
5. **Add secret**

Done. Tell Claude it is in, and the deploy can be triggered.

## Part 3 — Add the Account ID (required, not optional)

Measured on run 3 (2026-08-17): with the token alone, the deploy authenticated
and then failed, because a Pages-scoped token cannot enumerate accounts and
wrangler had nothing to address. It built the URL
`/accounts//pages/projects/nexphoria` — note the double slash where the
account should be — and Cloudflare answered 7003. Add the second secret:

- **Name:** `CLOUDFLARE_ACCOUNT_ID`
- **Value:** the Account ID from the Cloudflare dashboard. Open the account;
  it is in the right-hand column of the overview page, and it is also the long
  hex string in the dashboard URL: `dash.cloudflare.com/<account-id>/...`

Same place as Part 2: **New repository secret**.

That value is an identifier, not a credential. It is fine to paste anywhere,
including into a chat.

The workflow now checks for it up front, so a future setup fails in one second
with that sentence instead of forty seconds later with a Cloudflare error
whose wording blames the project name.

## Rotating or revoking

Same page as Part 1. Roll or delete the token any time; the site stays up
because a Pages deploy is already published. Only the next deploy needs it.
