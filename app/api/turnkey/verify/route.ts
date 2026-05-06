import { NextRequest, NextResponse } from 'next/server';
import { TurnkeyClient } from '@turnkey/http';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { requireAuth } from '@/lib/auth';
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from '@/lib/rate-limit';

const TURNKEY_BASE_URL = 'https://api.turnkey.com';

// POST /api/turnkey/verify
// Verifies a Turnkey passkey stamp from the client.
// Body: { walletAddress, stamp: { stampHeaderName, stampHeaderValue } }
export async function POST(req: NextRequest) {
  let authUser;
  try {
    authUser = await requireAuth(req);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { stamp } = await req.json();
    const walletAddress = authUser.walletAddress;
    const limit = checkRequestRateLimit(rateLimitKey(req, 'turnkey:verify', walletAddress), 20, 60 * 1000);
    if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

    if (!stamp?.stampHeaderName || !stamp?.stampHeaderValue) {
      return NextResponse.json({ error: 'Missing stamp' }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { data: row } = await supabase
      .from('user_turnkey_orgs')
      .select('sub_org_id')
      .eq('wallet_address', walletAddress.toLowerCase())
      .maybeSingle();

    if (!row?.sub_org_id) {
      return NextResponse.json({ error: 'No Turnkey account found for this wallet' }, { status: 404 });
    }

    // Use the stamp to call Turnkey's whoami endpoint to verify the passkey auth
    const whoamiResponse = await fetch(`${TURNKEY_BASE_URL}/public/v1/query/whoami`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [stamp.stampHeaderName]: stamp.stampHeaderValue,
      },
      body: JSON.stringify({ organizationId: row.sub_org_id }),
    });

    if (!whoamiResponse.ok) {
      return NextResponse.json({ error: 'Passkey verification failed' }, { status: 401 });
    }

    const whoami = await whoamiResponse.json();

    // Verify the authenticated org matches what we have on file
    if (whoami.organizationId !== row.sub_org_id) {
      return NextResponse.json({ error: 'Organization mismatch' }, { status: 401 });
    }

    return NextResponse.json({ verified: true, subOrgId: row.sub_org_id });
  } catch (error) {
    console.error('Turnkey verify error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
