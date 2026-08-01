const ADULT_PRICE = 1000;
const MAX_QTY = 20;

export async function onRequestPost(context) {
  const { request, env } = context;

  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: "決済が未設定です（STRIPE_SECRET_KEY 未登録）。" }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return json({ error: "リクエストの形式が正しくありません。" }, 400);
  }

  const adults = Math.max(0, Math.min(MAX_QTY, parseInt(body.adults, 10) || 0));
  const kids = Math.max(0, Math.min(MAX_QTY, parseInt(body.kids, 10) || 0));
  const email = String(body.email || "").trim();
  const name = String(body.name || "").trim().slice(0, 100);
  const kana = String(body.kana || "").trim().slice(0, 100);
  const tel = String(body.tel || "").trim().slice(0, 40);
  const date = String(body.date || "").trim().slice(0, 60);
  const note = String(body.note || "").trim().slice(0, 500);

  if (adults < 1) return json({ error: "大人を1名以上指定してください。" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ error: "メールアドレスが正しくありません。" }, 400);
  if (!name) return json({ error: "お名前が未入力です。" }, 400);

  const origin = env.SITE_URL || new URL(request.url).origin;
  const success_url = `${origin}/yoyaku-complete.html?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${origin}/yoyaku.html`;

  const params = new URLSearchParams();
  params.append("mode", "payment");
  params.append("locale", "ja");
  params.append("payment_method_types[0]", "card");
  params.append("success_url", success_url);
  params.append("cancel_url", cancel_url);
  params.append("customer_email", email);

  params.append("line_items[0][price_data][currency]", "jpy");
  params.append(
    "line_items[0][price_data][product_data][name]",
    "大町温泉郷 星空観賞会 先行予約（大人）"
  );
  params.append(
    "line_items[0][price_data][product_data][description]",
    "銀河の旅人 ／ 先行予約特別価格・プリンスターグッズ付き"
  );
  params.append("line_items[0][price_data][unit_amount]", String(ADULT_PRICE));
  params.append("line_items[0][quantity]", String(adults));

  const meta = {
    reservation_name: name,
    reservation_kana: kana,
    phone: tel,
    event_date: date,
    adults: String(adults),
    children: String(kids),
    total_guests: String(adults + kids),
    note: note,
    perk: `プリンスターグッズ ×${adults + kids}`,
  };
  Object.entries(meta).forEach(([k, v]) => {
    if (v) params.append(`metadata[${k}]`, v);
  });

  params.append(
    "payment_intent_data[description]",
    `星空観賞会 先行予約 / ${name}様 / 大人${adults}名・こども${kids}名 / ${date}`
  );

  const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await resp.json();
  if (!resp.ok) {
    return json(
      { error: (data.error && data.error.message) || "Stripeの決済作成に失敗しました。" },
      502
    );
  }

  return json({ url: data.url });
}

export async function onRequest(context) {
  if (context.request.method === "POST") return onRequestPost(context);
  return new Response("Method Not Allowed", { status: 405 });
}
