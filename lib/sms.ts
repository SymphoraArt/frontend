/**
 * SMS sender. Uses Twilio when configured (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN
 * / TWILIO_FROM); otherwise it logs the message in dev so the flow is testable
 * without a provider — same graceful pattern as lib/mailer.ts.
 */
export async function sendSms({ to, body }: { to: string; body: string }): Promise<{ ok: boolean; error?: string }> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;

  if (!sid || !token || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[sms] not configured — would send to ${to}: ${body}`);
      return { ok: true }; // treat as sent in dev so the UI flow works
    }
    return { ok: false, error: "SMS not configured" };
  }

  try {
    const params = new URLSearchParams({ To: to, From: from, Body: body });
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    if (!res.ok) {
      const msg = await res.text().catch(() => "");
      console.error("[sms] send failed", res.status, msg.slice(0, 200));
      return { ok: false, error: "Could not send SMS" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[sms] error", e instanceof Error ? e.message : e);
    return { ok: false, error: "Could not send SMS" };
  }
}
