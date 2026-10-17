/**
 * Studio 29 Worker.
 *
 * Static site assets (./dist) are served by Cloudflare automatically with SPA
 * fallback (see wrangler.jsonc). This Worker only runs for /api/* requests.
 *
 * POST /api/inquiry validates a booking/contact submission and forwards it as
 * JSON to INQUIRY_WEBHOOK_URL (Zapier, Make, n8n, an email-API relay, etc.).
 * If that secret is not set it returns 503, which the site treats as
 * "not connected" — it never reports a false success.
 *
 * Worker settings (Dashboard > Workers & Pages > studio29 > Settings):
 *   INQUIRY_WEBHOOK_URL   (secret)
 *   ALLOWED_ORIGIN        (optional, e.g. https://studio29.ca)
 */
interface Env {
  ASSETS: Fetcher;
  INQUIRY_WEBHOOK_URL?: string;
  ALLOWED_ORIGIN?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

async function handleInquiry(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!env.INQUIRY_WEBHOOK_URL) return json({ error: 'not_configured' }, 503);

  const origin = request.headers.get('Origin');
  if (env.ALLOWED_ORIGIN && origin && origin !== env.ALLOWED_ORIGIN) return json({ error: 'forbidden' }, 403);

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const kind = data.kind;
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const name = typeof data.fullName === 'string' ? data.fullName.trim() : '';
  if ((kind !== 'booking' && kind !== 'contact') || !EMAIL.test(email) || name.length < 2) {
    return json({ error: 'invalid_submission' }, 422);
  }
  if (JSON.stringify(data).length > 10_000) return json({ error: 'too_large' }, 413);

  const upstream = await fetch(env.INQUIRY_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, receivedAt: new Date().toISOString(), source: 'studio29-website' }),
  });
  return upstream.ok ? json({ ok: true }) : json({ error: 'upstream_failed' }, 502);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/inquiry') return handleInquiry(request, env);
    if (pathname.startsWith('/api/')) return json({ error: 'not_found' }, 404);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
