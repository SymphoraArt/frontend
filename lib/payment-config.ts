/**
 * Payment Configuration Bridge
 *
 * Re-exports the shared payment configuration from the frontend/shared directory.
 * This ensures frontend and backend use identical chain/USDC configurations.
 *
 * Note: With turbopack.root isolation, we maintain a copy in frontend/shared
 * that is synced with root shared/ directory.
 */

export * from "../shared/payment-config";
