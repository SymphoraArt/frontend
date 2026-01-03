"use client";

/**
 * Thirdweb Provider for Next.js
 *
 * Wraps the application with Thirdweb's provider to enable x402 payment hooks.
 * This works alongside Privy - Privy handles wallet connection, Thirdweb handles payments.
 *
 * NOTE: In Thirdweb v5, ThirdwebProvider doesn't take props - the client is configured
 * globally via createThirdwebClient in lib/thirdweb-client.ts
 */

import { ThirdwebProvider as TWProvider } from "thirdweb/react";
import { ReactNode } from "react";

export function ThirdwebProvider({ children }: { children: ReactNode }) {
  // In Thirdweb v5, the provider doesn't need configuration
  // The client is set up globally and hooks access it automatically
  return <TWProvider>{children}</TWProvider>;
}
