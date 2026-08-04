import type { SupabaseClient } from "@supabase/supabase-js";
import { decryptString, type EncryptedPayload } from "@/lib/crypto";
import { sendMail } from "@/lib/mailer";

/**
 * Fan an email out to every active admin/mod with a saved notification
 * address (admin_prefs, encrypted at rest with AAD = user_id). Failures are
 * swallowed — mail is a nudge, the admin panel is the source of truth.
 */
export async function notifyAdmins(
  supabase: SupabaseClient,
  { subject, text, exceptUserId }: { subject: string; text: string; exceptUserId?: string },
): Promise<void> {
  const [{ data: members }, { data: prefs }] = await Promise.all([
    supabase.from("users").select("id").in("role", ["admin", "mod"]).is("deleted_at", null),
    supabase.from("admin_prefs").select("user_id, notify_email_ct, notify_email_iv, notify_email_tag, notify_email_kid"),
  ]);
  const prefMap = new Map((prefs ?? []).map((r) => [String(r.user_id), r]));
  await Promise.allSettled((members ?? [])
    .filter((m) => String(m.id) !== exceptUserId)
    .map((m) => {
      const p = prefMap.get(String(m.id));
      if (!p || typeof p.notify_email_ct !== "string" || !p.notify_email_ct) return Promise.resolve({ ok: false });
      const payload: EncryptedPayload = {
        encrypted: p.notify_email_ct, iv: String(p.notify_email_iv), authTag: String(p.notify_email_tag),
        kid: typeof p.notify_email_kid === "string" ? p.notify_email_kid : undefined,
      };
      let email: string | null = null;
      for (const aad of [String(m.id), undefined]) {
        try { email = decryptString(payload, aad); break; } catch { /* try next */ }
      }
      return email ? sendMail({ to: email, subject, text }) : Promise.resolve({ ok: false });
    }));
}
