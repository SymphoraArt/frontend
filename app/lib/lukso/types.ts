/**
 * LUKSO Universal Profile Types
 */

export interface UniversalProfile {
  address: string;
  name?: string;
  description?: string;
  profileImage?: string;
  backgroundImage?: string;
  tags?: string[];
  links?: ProfileLink[];
  socialMedia?: SocialMedia[];
  lsp3Profile?: LSP3Profile;
}

export interface LSP3Profile {
  LSP3Profile: {
    name: string;
    description?: string;
    profileImage?: LSP3ProfileImage[];
    backgroundImage?: LSP3ProfileImage[];
    tags?: string[];
    links?: LSP3ProfileLink[];
  };
}

export interface LSP3ProfileImage {
  width?: number;
  height?: number;
  url: string;
  verification?: {
    method: string;
    data: string;
  };
}

export interface LSP3ProfileLink {
  title: string;
  url: string;
}

export interface ProfileLink {
  title: string;
  url: string;
}

export interface SocialMedia {
  platform: string;
  username: string;
  url: string;
}

export interface UniversalProfileContextType {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;

  // Profile data
  profile: UniversalProfile | null;
  isLoadingProfile: boolean;

  // Actions
  connect: () => Promise<void>;
  disconnect: () => void;

  // Utilities
  getProfile: (address?: string) => Promise<UniversalProfile | null>;
  updateProfile: (updates: Partial<UniversalProfile>) => Promise<void>;
}

export interface IPFSUploadResult {
  cid: string;
  url: string;
  size: number;
}

export interface IPFSStorage {
  uploadFile: (file: File) => Promise<IPFSUploadResult>;
  uploadJSON: (data: any) => Promise<IPFSUploadResult>;
  uploadText: (text: string) => Promise<IPFSUploadResult>;
  getContent: (cid: string) => Promise<any>;
}
