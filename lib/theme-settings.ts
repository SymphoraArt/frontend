export type ThemePreference = "light" | "dark";

/**
 * Persist the user's theme preference to the settings API.
 * Safe to call from client components; silently no-ops on failure.
 */
export async function saveUserThemePreference(
  userId: string | null | undefined,
  theme: ThemePreference
): Promise<void> {
  if (!userId) return;

  try {
    const getRes = await fetch(`/api/users/${userId}/settings`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!getRes.ok) return;

    const data = await getRes.json();
    const settings = (data?.settings || {}) as Record<string, unknown>;

    await fetch(`/api/users/${userId}/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        settings: {
          ...settings,
          theme,
        },
      }),
    });
  } catch (error) {
    // Best-effort only; don't block UI on errors.
    console.error("Failed to persist theme preference", error);
  }
}

