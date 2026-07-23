// Generates the RS256 keypair for the wallet-vendor external-JWT bridge (Privy)
// and prints the env line. Usage: node scripts/gen-wallet-jwt-key.mjs >> .env.local
import { generateKeyPairSync } from "crypto";

const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const pkcs8 = privateKey.export({ type: "pkcs8", format: "pem" });
console.log(`WALLET_JWT_PRIVATE_KEY=${Buffer.from(pkcs8).toString("base64")}`);
