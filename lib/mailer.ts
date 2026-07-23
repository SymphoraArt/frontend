/**
 * Outbound email via Resend's HTTP API (no SDK — one fetch).
 *
 * Setup (Kev): create a free account at resend.com → API Keys → new key →
 * .env.local:
 *   RESEND_API_KEY=re_…
 *   EMAIL_FROM="Enki Art <noreply@YOUR-VERIFIED-DOMAIN>"
 * For testing without a verified domain, Resend allows
 * EMAIL_FROM="Enki Art <onboarding@resend.dev>" (delivers only to your own
 * Resend account email). Free tier: 100 mails/day — plenty for reset codes.
 *
 * Not configured → { ok:false } and the caller decides (dev logs the code).
 */
export async function sendMail({ to, subject, text }: { to: string; subject: string; text: string }): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Enki Art <onboarding@resend.dev>";
  if (!key) return { ok: false, error: "RESEND_API_KEY not configured" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text }),
    });
    if (!res.ok) {
      console.error("[mailer] send failed:", res.status, (await res.text()).slice(0, 200));
      return { ok: false, error: "send failed" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[mailer] error:", e instanceof Error ? e.message : e);
    return { ok: false, error: "send failed" };
  }
}
