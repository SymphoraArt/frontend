import { useCallback } from 'react';
import { useUniversalProfile as useUPContext } from '../contexts/UniversalProfileContext';
import { UniversalProfile } from '../lib/lukso/types';
import { fetchUniversalProfile, searchUniversalProfiles } from '../lib/lukso/profile';

// Re-export the main hook for convenience
export { useUniversalProfile } from '../contexts/UniversalProfileContext';

// Additional hooks for specific operations

export function useProfileSearch() {
  const search = useCallback(async (query: string): Promise<UniversalProfile[]> => {
    if (!query.trim()) return [];

    try {
      return await searchUniversalProfiles(query);
    } catch (error) {
      console.error('Profile search failed:', error);
      return [];
    }
  }, []);

  return { search };
}

export function useProfileData() {
  const { getProfile, updateProfile } = useUPContext();

  const refreshProfile = useCallback(async (address?: string) => {
    return await getProfile(address);
  }, [getProfile]);

  const updateProfileData = useCallback(async (updates: Partial<UniversalProfile>) => {
    await updateProfile(updates);
  }, [updateProfile]);

  return {
    refreshProfile,
    updateProfileData
  };
}

export function useProfileVerification() {
  const { address, isConnected } = useUPContext();

  const isVerified = useCallback(() => {
    // In production, this would check LSP3 verification
    return isConnected && !!address;
  }, [isConnected, address]);

  const getVerificationStatus = useCallback(() => {
    if (!isConnected) return 'disconnected';
    if (!address) return 'no_address';
    // In production, check LSP3 data
    return 'verified';
  }, [isConnected, address]);

  return {
    isVerified: isVerified(),
    verificationStatus: getVerificationStatus()
  };
}

export function useProfileStats() {
  const { profile, address } = useUPContext();

  const getStats = useCallback(() => {
    if (!profile) return null;

    return {
      address: profile.address,
      hasProfileImage: !!profile.profileImage,
      hasBackgroundImage: !!profile.backgroundImage,
      tagsCount: profile.tags?.length || 0,
      linksCount: profile.links?.length || 0,
      socialMediaCount: profile.socialMedia?.length || 0,
      isLSP3Compliant: !!profile.lsp3Profile,
      lastUpdated: new Date().toISOString() // Placeholder
    };
  }, [profile]);

  return {
    stats: getStats(),
    hasCompleteProfile: !!(profile?.name && profile?.description)
  };
}
