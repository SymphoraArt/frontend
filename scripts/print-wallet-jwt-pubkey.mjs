// Prints the PUBLIC verification key (PEM) for the wallet-vendor JWT bridge,
// to paste into Privy's dashboard ("Public Verification Key") — lets localhost
// dev work without a publicly reachable JWKS URL. Reads the signing key from
// .env.local. Usage: node scripts/print-wallet-jwt-pubkey.mjs
import { readFileSync } from "fs";
import { createPublicKey, createPrivateKey } from "crypto";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const line = env.split(/\r?\n/).find((l) => /^(WALLET_JWT_PRIVATE_KEY|DYNAMIC_JWT_PRIVATE_KEY)=/.test(l));
if (!line) { console.error("No signing key (WALLET_JWT_PRIVATE_KEY / DYNAMIC_JWT_PRIVATE_KEY) in .env.local"); process.exit(1); }

const b64 = line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
const pem = Buffer.from(b64, "base64").toString("utf8");
const pub = createPublicKey(createPrivateKey(pem)).export({ type: "spki", format: "pem" });
console.log(pub.toString().trim());
