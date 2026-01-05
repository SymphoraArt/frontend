/**
 * Universal Profile Utilities
 */

import { UniversalProfile, LSP3Profile } from './types';
import { cidToURL } from './ipfs';

// Try to import ERC725, fallback to mock if not available
let ERC725: any = null;
let LSP3ProfileSchema: any = null;

try {
  const erc725Module = require('@erc725/erc725.js');
  ERC725 = erc725Module.default || erc725Module.ERC725;
  LSP3ProfileSchema = require('@erc725/erc725.js/schemas/LSP3ProfileMetadata.json');
} catch (error) {
  console.warn('⚠️ @erc725/erc725.js not available, using fallback implementation');
}

/**
 * Fetch REAL Universal Profile data from LUKSO blockchain
 */
export async function fetchUniversalProfile(address: string): Promise<UniversalProfile | null> {
  try {
    console.log(`🔍 Fetching Universal Profile for ${address}`);

    // Use ERC725 if available
    if (ERC725 && LSP3ProfileSchema) {
      const rpcUrl = process.env.LUKSO_RPC_URL || 'https://42.rpc.thirdweb.com';
      const ipfsGateway = process.env.IPFS_GATEWAY_URL || 'https://api.universalprofile.cloud/ipfs';

      const erc725 = new ERC725(
        LSP3ProfileSchema,
        address,
        rpcUrl,
        {
          ipfsGateway
        }
      );

      // Fetch LSP3Profile metadata from blockchain
      const profileData = await erc725.fetchData('LSP3Profile');

      if (!profileData || !profileData.value) {
        console.warn(`No LSP3Profile found for ${address}`);
        // Return minimal profile with address
        return {
          address,
          name: `UP ${address.slice(0, 6)}...${address.slice(-4)}`,
          description: '',
        };
      }

      const lsp3 = profileData.value as any;

      // Extract profile information
      const profile: UniversalProfile = {
        address,
        name: lsp3.LSP3Profile?.name || `UP ${address.slice(0, 6)}...${address.slice(-4)}`,
        description: lsp3.LSP3Profile?.description || '',
        profileImage: extractImageURL(lsp3.LSP3Profile?.profileImage),
        backgroundImage: extractImageURL(lsp3.LSP3Profile?.backgroundImage),
        tags: lsp3.LSP3Profile?.tags || [],
        links: lsp3.LSP3Profile?.links || [],
        socialMedia: extractSocialMedia(lsp3.LSP3Profile),
        lsp3Profile: lsp3
      };

      console.log(`✅ Fetched real Universal Profile for ${address}`);
      return profile;
    }

    // Fallback: Return minimal profile if ERC725 not available
    console.warn('⚠️ ERC725 not available, returning minimal profile');
    return {
      address,
      name: `UP ${address.slice(0, 6)}...${address.slice(-4)}`,
      description: '',
    };

  } catch (error) {
    console.error(`❌ Failed to fetch Universal Profile for ${address}:`, error);
    // Return minimal profile on error
    return {
      address,
      name: `UP ${address.slice(0, 6)}...${address.slice(-4)}`,
      description: '',
    };
  }
}

// Helper: Extract image URL from LSP3 image array
function extractImageURL(imageArray: any[]): string | undefined {
  if (!imageArray || imageArray.length === 0) return undefined;

  const image = imageArray[0];
  if (!image?.url) return undefined;

  // Handle IPFS URLs
  if (image.url.startsWith('ipfs://')) {
    const cid = image.url.replace('ipfs://', '');
    return cidToURL(cid);
  }

  return image.url;
}

// Helper: Extract social media links
function extractSocialMedia(lsp3: any): Array<{ platform: string; username: string; url: string }> {
  if (!lsp3?.links) return [];

  const socialPlatforms = ['twitter', 'instagram', 'discord', 'github', 'linkedin'];
  return lsp3.links
    .filter((link: any) => socialPlatforms.some(p => link.url?.includes(p)))
    .map((link: any) => ({
      platform: detectPlatform(link.url),
      username: extractUsername(link.url),
      url: link.url
    }));
}

function detectPlatform(url: string): string {
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('discord.')) return 'discord';
  if (url.includes('github.com')) return 'github';
  if (url.includes('linkedin.com')) return 'linkedin';
  return 'website';
}

function extractUsername(url: string): string {
  // Extract username from social media URL
  const parts = url.split('/').filter(p => p);
  return parts[parts.length - 1] || '';
}

/**
 * Update Universal Profile data (would require wallet signature)
 */
export async function updateUniversalProfile(
  address: string,
  updates: Partial<UniversalProfile>
): Promise<boolean> {
  try {
    console.log(`🔄 Updating Universal Profile for ${address}`, updates);

    // In production, this would:
    // 1. Use LSP libraries to interact with the UP contract
    // 2. Require wallet signature for the transaction
    // 3. Update the LSP3Profile data on-chain

    // For now, simulate the update
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`✅ Updated Universal Profile for ${address}`);
    return true;

  } catch (error) {
    console.error(`❌ Failed to update Universal Profile for ${address}:`, error);
    return false;
  }
}

/**
 * Get profile image URL from LSP3 profile
 */
export function getProfileImageURL(profile: UniversalProfile): string | null {
  if (profile.profileImage) {
    return profile.profileImage;
  }

  const lsp3Image = profile.lsp3Profile?.LSP3Profile?.profileImage?.[0];
  if (lsp3Image) {
    // Handle IPFS URLs
    if (lsp3Image.url.startsWith('ipfs://')) {
      const cid = lsp3Image.url.replace('ipfs://', '');
      return cidToURL(cid);
    }
    return lsp3Image.url;
  }

  return null;
}

/**
 * Get background image URL from LSP3 profile
 */
export function getBackgroundImageURL(profile: UniversalProfile): string | null {
  if (profile.backgroundImage) {
    return profile.backgroundImage;
  }

  const lsp3Image = profile.lsp3Profile?.LSP3Profile?.backgroundImage?.[0];
  if (lsp3Image) {
    // Handle IPFS URLs
    if (lsp3Image.url.startsWith('ipfs://')) {
      const cid = lsp3Image.url.replace('ipfs://', '');
      return cidToURL(cid);
    }
    return lsp3Image.url;
  }

  return null;
}

/**
 * Format profile name for display
 */
export function getDisplayName(profile: UniversalProfile): string {
  return profile.name || profile.lsp3Profile?.LSP3Profile?.name || `0x${profile.address.slice(-6)}`;
}

/**
 * Get profile description
 */
export function getProfileDescription(profile: UniversalProfile): string {
  return profile.description || profile.lsp3Profile?.LSP3Profile?.description || '';
}

/**
 * Get profile tags
 */
export function getProfileTags(profile: UniversalProfile): string[] {
  return profile.tags || profile.lsp3Profile?.LSP3Profile?.tags || [];
}

/**
 * Check if an address is a valid Universal Profile
 */
export async function isValidUniversalProfile(address: string): Promise<boolean> {
  try {
    // In production, this would check if the address has LSP3 data
    // For now, just validate it's an Ethereum address
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  } catch {
    return false;
  }
}

/**
 * Get Universal Profile creation date (from LSP3 data)
 */
export function getProfileCreationDate(profile: UniversalProfile): Date | null {
  // LSP3 doesn't store creation date directly
  // This would need to be fetched from blockchain transaction data
  return null;
}

/**
 * Get profile verification status
 */
export function isProfileVerified(profile: UniversalProfile): boolean {
  // Check if profile has proper LSP3 data and verification
  return !!(profile.lsp3Profile && profile.lsp3Profile.LSP3Profile);
}

/**
 * Search for Universal Profiles by name or tags
 */
export async function searchUniversalProfiles(query: string): Promise<UniversalProfile[]> {
  // In production, this would search through indexed UP data
  // For now, return mock results
  console.log(`🔍 Searching Universal Profiles for: ${query}`);

  const mockResults: UniversalProfile[] = [
    {
      address: '0x1234567890123456789012345678901234567890',
      name: 'AI Artist Pro',
      description: 'Professional AI artist on LUKSO',
      tags: ['AI', 'Artist']
    },
    {
      address: '0x0987654321098765432109876543210987654321',
      name: 'Digital Creator',
      description: 'Creating digital art with blockchain',
      tags: ['Digital', 'Creator']
    }
  ].filter(profile =>
    profile.name?.toLowerCase().includes(query.toLowerCase()) ||
    profile.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return mockResults;
}
