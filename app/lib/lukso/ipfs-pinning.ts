/**
 * IPFS Pinning Service Integration
 * Pins content to multiple services for redundancy
 */

interface PinningResult {
  service: string;
  success: boolean;
  error?: string;
}

/**
 * Pin to Pinata
 */
async function pinToPinata(cid: string): Promise<PinningResult> {
  try {
    const apiKey = process.env.PINATA_API_KEY;
    const apiSecret = process.env.PINATA_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error('Pinata credentials not configured');
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinByHash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': apiKey,
        'pinata_secret_api_key': apiSecret
      },
      body: JSON.stringify({
        hashToPin: cid,
        pinataMetadata: {
          name: `AIgency-${cid}`,
          keyvalues: {
            platform: 'AIgency',
            timestamp: Date.now().toString()
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Pinata API error: ${response.statusText} - ${errorText}`);
    }

    return { service: 'Pinata', success: true };

  } catch (error: any) {
    return { service: 'Pinata', success: false, error: error.message };
  }
}

/**
 * Pin to Infura
 */
async function pinToInfura(cid: string): Promise<PinningResult> {
  try {
    const projectId = process.env.INFURA_IPFS_PROJECT_ID;
    const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;

    if (!projectId || !projectSecret) {
      throw new Error('Infura credentials not configured');
    }

    const auth = Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

    const response = await fetch(`https://ipfs.infura.io:5001/api/v0/pin/add?arg=${cid}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Infura API error: ${response.statusText} - ${errorText}`);
    }

    return { service: 'Infura', success: true };

  } catch (error: any) {
    return { service: 'Infura', success: false, error: error.message };
  }
}

/**
 * Pin content to multiple IPFS pinning services
 */
export async function pinToMultipleNodes(cid: string): Promise<{
  success: boolean;
  results: PinningResult[];
}> {
  console.log(`📌 Pinning ${cid} to multiple IPFS services...`);

  const results = await Promise.all([
    pinToPinata(cid),
    pinToInfura(cid),
    // Add more services as needed
  ]);

  const successCount = results.filter(r => r.success).length;
  const success = successCount > 0; // At least one must succeed

  if (success) {
    console.log(`📌 Pinning complete: ${successCount}/${results.length} services succeeded`);
  } else {
    console.warn(`⚠️ All pinning services failed for CID: ${cid}`);
  }

  return {
    success,
    results
  };
}

/**
 * Check if CID is pinned on any service
 */
export async function checkPinStatus(cid: string): Promise<{
  pinned: boolean;
  services: string[];
}> {
  const results = await Promise.all([
    checkPinataPinStatus(cid),
    checkInfuraPinStatus(cid),
  ]);

  const pinnedServices = results
    .filter(r => r.pinned)
    .map(r => r.service);

  return {
    pinned: pinnedServices.length > 0,
    services: pinnedServices
  };
}

async function checkPinataPinStatus(cid: string): Promise<{ pinned: boolean; service: string }> {
  try {
    const apiKey = process.env.PINATA_API_KEY;
    const apiSecret = process.env.PINATA_API_SECRET;

    if (!apiKey || !apiSecret) return { pinned: false, service: 'Pinata' };

    const response = await fetch(`https://api.pinata.cloud/data/pinList?hashContains=${cid}`, {
      headers: {
        'pinata_api_key': apiKey,
        'pinata_secret_api_key': apiSecret
      }
    });

    if (!response.ok) {
      return { pinned: false, service: 'Pinata' };
    }

    const data = await response.json();
    return {
      pinned: data.count > 0,
      service: 'Pinata'
    };

  } catch {
    return { pinned: false, service: 'Pinata' };
  }
}

async function checkInfuraPinStatus(cid: string): Promise<{ pinned: boolean; service: string }> {
  // Infura doesn't have a pin list API
  // Just try to fetch the content
  try {
    const response = await fetch(`https://ipfs.infura.io/ipfs/${cid}`, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    return {
      pinned: response.ok,
      service: 'Infura'
    };
  } catch {
    return { pinned: false, service: 'Infura' };
  }
}

