/* ═══ /api/checkout-session — Stripe Checkout, on the static apex ═══
   Chiya, 2026-09-06: "connect to Stripe and I want to test checkout."

   The apex is a static Cloudflare Pages site with no Express server, so
   server/routes.ts's /api/checkout does not exist there — it answers 405 in
   production today. This Function is the live payment path: it creates a
   Stripe Checkout Session and hands back the hosted URL to redirect to.

   ── THE SECURITY RULE ─────────────────────────────────────────────────
   The request names WHAT is being bought (slug, term, quantity). It never
   names the PRICE. Every amount is looked up here, in the generated
   manifest (./_prices.ts, written from the same catalog the pages render).
   A browser that can post its own amount can buy a twelve-month term for a
   dollar, so the client is not trusted with money at any point.

   ── THE PHI RULE (CLAUDE.md law 5) ────────────────────────────────────
   What reaches Stripe: the product name the customer already has in their
   cart, the amount, and the slug/term in metadata so the order can be
   reconciled. What NEVER reaches Stripe: intake answers, health history,
   screening flags, anything from the medical questions. Those belong to
   Bask/MDI and do not pass through this file. Do not add them.

   ── SCOPE ─────────────────────────────────────────────────────────────
   stripeLinks.ts carries a standing scope law: self-serve payment is for
   gifts and panels, with prescription plans behind the Bask physician
   gate. Chiya directed this path on 2026-09-06 with that on the record.
   Payment here still buys nothing on its own: the physician review comes
   after, and the refund policy governs a decline — which is exactly what
   the checkout page and the FAQ already tell the reader.

   ── KEYS ──────────────────────────────────────────────────────────────
   STRIPE_SECRET_KEY is read from the environment and never from the repo.
   Set it in the Cloudflare Pages project (Settings → Environment
   variables) as a SECRET, once per environment. Use a TEST key (sk_test_…)
   until the flow is signed off; swapping in the live key is the only step
   that makes this real money. With no key set the endpoint answers 503 and
   the site says so honestly rather than pretending to take payment. */

import { PRICES } from "./_prices";

interface Env {
  STRIPE_SECRET_KEY?: string;
  /** Optional: overrides the origin used to build the return URLs. */
  SITE_ORIGIN?: string;
}

type LineIn = { type?: unknown; slug?: unknown; cadence?: unknown; qty?: unknown };

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const MAX_LINES = 10;
const MAX_QTY = 10;

/** The amount, in cents, for one line — the only place money is decided. */
function priceLine(type: string, slug: string, cadence: string, qty: number) {
  const term = PRICES.terms[cadence as keyof typeof PRICES.terms];
  if (!term) return null;
  if (type === "peptide") {
    const s = PRICES.solos[slug as keyof typeof PRICES.solos];
    if (!s) return null;
    const perMonth = s[term.tier];
    return { name: s.name, perMonth, months: term.months, cents: Math.round(perMonth * term.months * 100) * qty };
  }
  if (type === "stack") {
    const st = PRICES.stacks[slug as keyof typeof PRICES.stacks];
    if (!st) return null;
    /* Stacks quote one monthly figure; the term discount is the same ladder
       the buy box shows (0 / 10 / 15 / 20 per cent less per month). */
    const pct = { 1: 0, 3: 0.1, 6: 0.15, 12: 0.2 }[term.months] ?? 0;
    const perMonth = Math.round(st.perMonth * (1 - pct));
    return { name: st.name, perMonth, months: term.months, cents: Math.round(perMonth * term.months * 100) * qty };
  }
  return null;
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  if (request.method !== "POST") {
    return json(405, { error: "method not allowed" });
  }
  if (!env.STRIPE_SECRET_KEY) {
    return json(503, {
      error: "payments_not_configured",
      message: "Card payment is not switched on for this environment yet.",
    });
  }

  let body: { items?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "invalid JSON body" });
  }

  const raw = Array.isArray(body.items) ? (body.items as LineIn[]) : [];
  if (raw.length === 0) return json(400, { error: "no items" });
  if (raw.length > MAX_LINES) return json(400, { error: "too many items" });

  const priced: { name: string; cents: number; months: number; slug: string; type: string; qty: number }[] = [];
  for (const it of raw) {
    const type = typeof it.type === "string" ? it.type : "";
    const slug = typeof it.slug === "string" ? it.slug : "";
    const cadence = typeof it.cadence === "string" ? it.cadence : "";
    const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(it.qty) || 1)));
    const line = priceLine(type, slug, cadence, qty);
    if (!line) return json(400, { error: "unknown item", detail: `${type}:${slug}:${cadence}` });
    priced.push({ ...line, slug, type, qty });
  }

  const origin = env.SITE_ORIGIN || new URL(request.url).origin;
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", `${origin}/checkout?paid=1&session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", `${origin}/cart?cancelled=1`);
  form.set("billing_address_collection", "required");
  form.set("phone_number_collection[enabled]", "true");
  priced.forEach((l, i) => {
    form.set(`line_items[${i}][price_data][currency]`, "usd");
    form.set(`line_items[${i}][price_data][product_data][name]`, l.name);
    form.set(
      `line_items[${i}][price_data][product_data][description]`,
      `${l.months} ${l.months === 1 ? "month" : "months"}, paid up front. Prescribed only if a licensed U.S. physician finds it appropriate.`,
    );
    /* unit_amount is the whole term for one unit; quantity stays 1 and the
       reader's quantity is folded into the amount, so the term total the
       cart showed is the figure Stripe displays. */
    form.set(`line_items[${i}][price_data][unit_amount]`, String(l.cents));
    form.set(`line_items[${i}][quantity]`, "1");
    form.set(`metadata[item_${i}]`, `${l.type}:${l.slug}:${l.months}mo:x${l.qty}`);
  });
  const email = typeof body.email === "string" && body.email.includes("@") ? body.email.trim().slice(0, 254) : "";
  if (email) form.set("customer_email", email);
  form.set("metadata[source]", "nexphoria-web");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });
  const data = (await res.json()) as { url?: string; id?: string; error?: { message?: string } };
  if (!res.ok || !data.url) {
    /* Stripe's message is safe to relay (it describes the request we sent,
       never the key) and is what makes a misconfiguration debuggable. */
    return json(502, { error: "stripe_error", message: data.error?.message ?? "Stripe did not return a session." });
  }
  return json(200, { url: data.url, id: data.id, amount: priced.reduce((a, l) => a + l.cents, 0) });
}
