import { NextRequest, NextResponse } from 'next/server';
import { ApiKeyStamper } from '@turnkey/api-key-stamper';
import { TurnkeyBrowserClient, DEFAULT_SOLANA_ACCOUNTS } from '@turnkey/sdk-browser';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { requireAuth } from '@/lib/auth';
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from '@/lib/rate-limit';

const TURNKEY_BASE_URL = 'https://api.turnkey.com';

function getTurnkeyClient() {
  const apiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.TURNKEY_API_PRIVATE_KEY;
  const organizationId = process.env.TURNKEY_ORGANIZATION_ID;
  if (!apiPublicKey || !apiPrivateKey || !organizationId) {
    throw new Error('TURNKEY_API_PUBLIC_KEY, TURNKEY_API_PRIVATE_KEY, TURNKEY_ORGANIZATION_ID must be set');
  }
  const stamper = new ApiKeyStamper({ apiPublicKey, apiPrivateKey });
  return new TurnkeyBrowserClient({ stamper, apiBaseUrl: TURNKEY_BASE_URL, organizationId });
}

/**
 * POST /api/turnkey/init-user
 * Creates a Turnkey sub-organization for a wallet-authenticated user.
 * Registers a passkey as the primary authenticator and provisions a Solana wallet.
 * Body: { encodedChallenge, attestation }
 */
export async function POST(req: NextRequest) {
  let authUser;
  try {
    authUser = await requireAuth(req);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let encodedChallenge: string;
  let attestation: {
    credentialId: string;
    clientDataJson: string;
    attestationObject: string;
    transports: string[];
  };

  try {
    ({ encodedChallenge, attestation } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!encodedChallenge || !attestation) {
    return NextResponse.json({ error: 'encodedChallenge and attestation are required' }, { status: 400 });
  }

  const orgId = process.env.TURNKEY_ORGANIZATION_ID!;
  const walletAddress = authUser.walletAddress;
  const limit = checkRequestRateLimit(rateLimitKey(req, 'turnkey:init-user', walletAddress), 3, 10 * 60 * 1000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  // Check if already registered
  const supabase = getSupabaseServerClient();
  const { data: existing } = await supabase
    .from('user_turnkey_orgs')
    .select('sub_org_id')
    .eq('wallet_address', walletAddress.toLowerCase())
    .maybeSingle();

  if (existing?.sub_org_id) {
    return NextResponse.json({ subOrgId: existing.sub_org_id, alreadyExists: true });
  }

  try {
    const client = getTurnkeyClient();

    const result = await client.createSubOrganization({
      organizationId: orgId,
      subOrganizationName: `user-${walletAddress}`,
      rootQuorumThreshold: 1,
      rootUsers: [
        {
          userName: walletAddress,
          userEmail: '',
          apiKeys: [],
          oauthProviders: [],
          authenticators: [
            {
              authenticatorName: 'Device Passkey',
              challenge: encodedChallenge,
              attestation: {
                credentialId: attestation.credentialId,
                clientDataJson: attestation.clientDataJson,
                attestationObject: attestation.attestationObject,
                transports: attestation.transports as (
                  | 'AUTHENTICATOR_TRANSPORT_BLE'
                  | 'AUTHENTICATOR_TRANSPORT_INTERNAL'
                  | 'AUTHENTICATOR_TRANSPORT_NFC'
                  | 'AUTHENTICATOR_TRANSPORT_USB'
                  | 'AUTHENTICATOR_TRANSPORT_HYBRID'
                )[],
              },
            },
          ],
        },
      ],
      wallet: {
        walletName: 'Default Wallet',
        accounts: DEFAULT_SOLANA_ACCOUNTS,
      },
    });

    const subOrgId = result.subOrganizationId;
    const solanaAddress = result.wallet?.addresses?.[0];

    if (!subOrgId) throw new Error('Sub-org creation returned no ID');

    await supabase.from('user_turnkey_orgs').upsert({
      wallet_address: walletAddress.toLowerCase(),
      sub_org_id: subOrgId,
      solana_address: solanaAddress ?? null,
    });

    return NextResponse.json({ subOrgId, solanaAddress });
  } catch (error) {
    console.error('Turnkey init-user error:', error);
    return NextResponse.json({ error: 'Failed to initialize Turnkey account' }, { status: 500 });
  }
}
