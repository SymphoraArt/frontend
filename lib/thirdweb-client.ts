/**
 * Thirdweb Client Configuration for Next.js
 *
 * This client is used for x402 payment operations alongside Privy wallet connection.
 * Privy handles wallet UI/UX, while Thirdweb handles payment protocol execution.
 */

import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  console.warn(
    "⚠️  NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set. x402 payments will not function correctly."
  );
}

export const thirdwebClient = createThirdwebClient({
  clientId: clientId || '',
});
