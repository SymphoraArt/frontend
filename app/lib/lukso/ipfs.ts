/**
 * IPFS Integration for LUKSO
 */

import { IPFSUploadResult, IPFSStorage } from './types';

// IPFS Gateway URLs for LUKSO
const IPFS_GATEWAYS = [
  'https://api.universalprofile.cloud/ipfs',
  'https://ipfs.lukso.network/ipfs',
  'https://gateway.ipfs.io/ipfs',
  'https://ipfs.infura.io/ipfs'
];

/**
 * Get the best IPFS gateway URL
 */
export function getIPFSGatewayURL(cid: string, gatewayIndex = 0): string {
  return `${IPFS_GATEWAYS[gatewayIndex]}/${cid}`;
}

/**
 * Upload file to IPFS via LUKSO gateway
 */
async function uploadToIPFS(data: FormData): Promise<IPFSUploadResult> {
  const response = await fetch('https://api.universalprofile.cloud/ipfs', {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error(`IPFS upload failed: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    cid: result.cid,
    url: getIPFSGatewayURL(result.cid),
    size: result.size || 0,
  };
}

/**
 * IPFS Storage implementation
 */
export const ipfsStorage: IPFSStorage = {
  /**
   * Upload a file to IPFS
   */
  async uploadFile(file: File): Promise<IPFSUploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    return uploadToIPFS(formData);
  },

  /**
   * Upload JSON data to IPFS
   */
  async uploadJSON(data: any): Promise<IPFSUploadResult> {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const file = new File([blob], 'data.json', { type: 'application/json' });

    return this.uploadFile(file);
  },

  /**
   * Upload text content to IPFS
   */
  async uploadText(text: string): Promise<IPFSUploadResult> {
    const blob = new Blob([text], { type: 'text/plain' });
    const file = new File([blob], 'content.txt', { type: 'text/plain' });

    return this.uploadFile(file);
  },

  /**
   * Get content from IPFS
   */
  async getContent(cid: string): Promise<any> {
    // Try multiple gateways for redundancy
    for (let i = 0; i < IPFS_GATEWAYS.length; i++) {
      try {
        const url = getIPFSGatewayURL(cid, i);
        const response = await fetch(url);

        if (response.ok) {
          const contentType = response.headers.get('content-type');

          if (contentType?.includes('application/json')) {
            return await response.json();
          } else if (contentType?.includes('text/')) {
            return await response.text();
          } else {
            // Return blob for binary data
            return await response.blob();
          }
        }
      } catch (error) {
        console.warn(`IPFS gateway ${i} failed:`, error);
        continue;
      }
    }

    throw new Error(`Failed to fetch content from IPFS: ${cid}`);
  }
};

/**
 * Validate IPFS CID format
 */
export function isValidCID(cid: string): boolean {
  // Basic CID validation (simplified)
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$|^bafy[1-9A-HJ-NP-Za-km-z]{55}$|^bafk[1-9A-HJ-NP-Za-km-z]{57}$/.test(cid);
}

/**
 * Convert IPFS URL to CID
 */
export function urlToCID(url: string): string | null {
  const match = url.match(/\/ipfs\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

/**
 * Convert CID to IPFS URL using preferred gateway
 */
export function cidToURL(cid: string, gatewayIndex = 0): string {
  return getIPFSGatewayURL(cid, gatewayIndex);
}

/**
 * Pin content to multiple IPFS nodes for redundancy
 * Delegates to ipfs-pinning service
 */
export async function pinToMultipleNodes(cid: string): Promise<void> {
  try {
    const { pinToMultipleNodes: pinToServices } = await import('./ipfs-pinning');
    const result = await pinToServices(cid);
    
    if (!result.success) {
      console.warn(`⚠️ IPFS pinning failed for ${cid}:`, result.results);
    }
  } catch (error) {
    console.error(`❌ IPFS pinning error for ${cid}:`, error);
    // Don't throw - pinning is not critical for functionality
  }
}

/**
 * Check if content is pinned and available
 */
export async function checkPinStatus(cid: string): Promise<boolean> {
  try {
    await ipfsStorage.getContent(cid);
    return true;
  } catch {
    return false;
  }
}
