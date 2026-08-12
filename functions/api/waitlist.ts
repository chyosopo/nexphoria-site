/* ═══ /api/waitlist — Cloudflare Pages Function (apex production) ═══
   The static apex has no Express server; this Function is the live
   counterpart of server/routes.ts's waitlist handler. Marketing data ONLY
   (an email address + source tag) — PHI never lands here. Storage: KV
   namespace bound as WAITLIST (see wrangler.toml), keyed by email so
   repeat signups stay idempotent. */

interface Env {
  WAITLIST: {
    put(key: string, value: string): Promise<void>;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    });
  }

  let payload: { email?: unknown; source?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: "invalid JSON body" });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload.source === "string" ? payload.source.slice(0, 64) : "unknown";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json(400, { error: "invalid email" });
  }

  await env.WAITLIST.put(
    `email:${email}`,
    JSON.stringify({ email, source, ts: new Date().toISOString() }),
  );
  return json(200, { ok: true });
}
