const CORS_HEADERS = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function corsHeaders(origin) {
  return { ...CORS_HEADERS, 'Access-Control-Allow-Origin': origin };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || 'https://awesome100.hypercerts.guide';

    // Also allow local dev
    const isAllowed = origin === allowed || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(isAllowed ? origin : allowed) });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/submit' || request.method !== 'POST') {
      return json({ ok: false, error: 'Not found' }, 404, isAllowed ? origin : allowed);
    }

    if (!isAllowed) {
      return json({ ok: false, error: 'Forbidden' }, 403, allowed);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: '無效的請求格式' }, 400, origin);
    }

    // Honeypot check
    if (body.website) {
      // Silently accept to not tip off bots
      return json({ ok: true }, 200, origin);
    }

    // Timing check — reject if submitted faster than 2 seconds
    const ts = Number(body._ts);
    if (ts && Date.now() - ts < 2000) {
      return json({ ok: true }, 200, origin);
    }

    // JS proof check — bots that don't execute JS won't have this
    if (!body._proof || typeof body._proof !== 'string' || body._proof.length < 6) {
      return json({ ok: true }, 200, origin);
    }

    // Validate required fields
    const { org_name, contact_name, contact_method, contact_handle, description } = body;
    const validMethods = ['signal', 'telegram', 'line', 'email'];

    if (!org_name || !contact_name || !contact_method || !contact_handle || !description) {
      return json({ ok: false, error: '請填寫所有必填欄位' }, 400, origin);
    }

    if (!validMethods.includes(contact_method)) {
      return json({ ok: false, error: '請選擇有效的聯繫方式' }, 400, origin);
    }

    if (org_name.length > 200 || contact_name.length > 100 || contact_handle.length > 254 || description.length > 2000) {
      return json({ ok: false, error: '欄位內容過長' }, 400, origin);
    }

    if (contact_method === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_handle)) {
      return json({ ok: false, error: '請輸入有效的電子信箱' }, 400, origin);
    }

    // Rate limiting via KV (if bound)
    if (env.SUBMISSIONS) {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const rateKey = `rate:${ip}`;
      const count = Number(await env.SUBMISSIONS.get(rateKey)) || 0;
      if (count >= 3) {
        return json({ ok: false, error: '送出太頻繁，請稍後再試' }, 429, origin);
      }
      await env.SUBMISSIONS.put(rateKey, String(count + 1), { expirationTtl: 3600 });

      // Store submission
      const id = `sub:${new Date().toISOString()}:${crypto.randomUUID().slice(0, 6)}`;
      await env.SUBMISSIONS.put(id, JSON.stringify({
        org_name, contact_name, contact_method, contact_handle, description,
        submitted_at: new Date().toISOString(),
        ip,
      }), { expirationTtl: 86400 * 90 });
    }

    // Send Telegram notification
    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      const methodLabels = { signal: 'Signal', telegram: 'Telegram', line: 'LINE', email: 'Email' };
      const text = [
        `📬 *新申請*`,
        `*組織名稱：* ${org_name}`,
        `*聯絡人：* ${contact_name}`,
        `*聯繫方式：* ${methodLabels[contact_method] || contact_method}`,
        `*帳號：* ${contact_handle}`,
        `*介紹：*\n${description.slice(0, 1000)}`,
      ].join('\n');

      try {
        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'Markdown',
          }),
        });
      } catch {
        // Don't fail the submission if Telegram is down
      }
    }

    return json({ ok: true }, 200, origin);
  },
};
