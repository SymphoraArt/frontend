/**
 * Platform fee on top of API cost for image generation.
 * Fee by user specialty: normal 7%, family 1%, admin 0%.
 */
export type UserSpecialty = "normal" | "family" | "admin";

export const FEE_PERCENT_NORMAL = 7;
export const FEE_PERCENT_FAMILY = 1;
export const FEE_PERCENT_ADMIN = 0;

/** Wallet addresses that always pay API price (0% fee). */
export const ADMIN_ADDRESSES: string[] = [
  "0x4cef192f72725253cde8f76b68b8cf5295758fc0",
];

export function getFeePercent(specialty: UserSpecialty): number {
  switch (specialty) {
    case "admin":
      return FEE_PERCENT_ADMIN;
    case "family":
      return FEE_PERCENT_FAMILY;
    default:
      return FEE_PERCENT_NORMAL;
  }
}

export function resolveSpecialty(
  userId: string | undefined,
  preferences: { specialty?: string } | null | undefined
): UserSpecialty {
  if (!userId) return "normal";
  const addr = userId.toLowerCase();
  if (ADMIN_ADDRESSES.some((a) => a === addr)) return "admin";
  const s = preferences?.specialty;
  if (s === "family" || s === "admin") return s;
  return "normal";
}

export function applyFee(apiPriceUsd: number, specialty: UserSpecialty): number {
  const percent = getFeePercent(specialty);
  return apiPriceUsd * (1 + percent / 100);
}
