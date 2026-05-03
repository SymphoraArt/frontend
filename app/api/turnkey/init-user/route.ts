import { NextRequest, NextResponse } from 'next/server';
import { TurnkeyClient } from '@turnkey/http';
import { ApiKeyStamper } from '@turnkey/api-key-stamper';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { requireAuth } from '@/lib/auth';

const TURNKEY_BASE_URL = 'https://api.turnkey.com';

function getTurnkeyClient() {
  const apiPublicKey = process.env.TURNKEY_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.TURNKEY_API_PRIVATE_KEY;
  if (!apiPublicKey || !apiPrivateKey) {
    throw new Error('TURNKEY_API_PUBLIC_KEY and TURNKEY_API_PRIVATE_KEY must be set');
  }
  return new TurnkeyClient(
    { baseUrl: TURNKEY_BASE_URL },
    new ApiKeyStamper({ apiPublicKey, apiPrivateKey })
  );
}

// POST /api/turnkey/init-user
// Creates a Turnkey sub-organization for a user with their passkey credential.
// Body: { walletAddress, encodedChallenge, attestation }
export async function POST(req: NextRequest) {
  // Require wallet auth — ensures only the wallet owner can register a Turnkey account for it
  let authUser;
  try {
    authUser = await requireAuth(req);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { encodedChallenge, attestation } = await req.json();
    const walletAddress = authUser.walletAddress;

    if (!encodedChallenge || !attestation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orgId = process.env.TURNKEY_ORGANIZATION_ID;
    if (!orgId) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const client = getTurnkeyClient();

    const result = await client.createSubOrganization({
      type: 'ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V4',
      timestampMs: Date.now().toString(),
      organizationId: orgId,
      parameters: {
        subOrganizationName: `user-${walletAddress}`,
        rootQuorumThreshold: 1,
        rootUsers: [
          {
            userName: walletAddress,
            userEmail: '',
            apiKeys: [],
            authenticators: [
              {
                authenticatorName: 'Device Passkey',
                challenge: encodedChallenge,
                attestation,
              },
            ],
          },
        ],
        wallet: {
          walletName: 'Default Wallet',
          accounts: [
            {
              curve: 'CURVE_ED25519',
              pathFormat: 'PATH_FORMAT_BIP32',
              path: "m/44'/501'/0'/0'",
              addressFormat: 'ADDRESS_FORMAT_SOLANA',
            },
          ],
        },
      },
    });

    const subOrgId = result.activity.result.createSubOrganizationResultV4?.subOrganizationId;

    if (!subOrgId) {
      throw new Error('Failed to create sub-organization');
    }

    // Store sub-org ID linked to wallet address in Supabase
    const supabase = getSupabaseServerClient();
    await supabase
      .from('user_turnkey_orgs')
      .upsert({ wallet_address: walletAddress.toLowerCase(), sub_org_id: subOrgId });

    return NextResponse.json({ subOrgId });
  } catch (error) {
    console.error('Turnkey init-user error:', error);
    return NextResponse.json({ error: 'Failed to initialize Turnkey account' }, { status: 500 });
  }
}
