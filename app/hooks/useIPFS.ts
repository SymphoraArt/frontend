import { useState, useCallback } from 'react';
import { ipfsStorage, isValidCID, cidToURL, urlToCID } from '../lib/lukso/ipfs';
import { IPFSUploadResult } from '../lib/lukso/types';

export function useIPFS() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [lastUploadResult, setLastUploadResult] = useState<IPFSUploadResult | null>(null);

  const uploadFile = useCallback(async (file: File): Promise<IPFSUploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress for user feedback
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const result = await ipfsStorage.uploadFile(file);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setLastUploadResult(result);

      console.log('📤 File uploaded to IPFS:', result);
      return result;

    } catch (error) {
      console.error('Failed to upload file to IPFS:', error);
      throw error;
    } finally {
      setIsUploading(false);
      // Keep progress for a moment to show completion
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, []);

  const uploadJSON = useCallback(async (data: any): Promise<IPFSUploadResult> => {
    setIsUploading(true);
    try {
      const result = await ipfsStorage.uploadJSON(data);
      setLastUploadResult(result);
      console.log('📤 JSON uploaded to IPFS:', result);
      return result;
    } catch (error) {
      console.error('Failed to upload JSON to IPFS:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const uploadText = useCallback(async (text: string): Promise<IPFSUploadResult> => {
    setIsUploading(true);
    try {
      const result = await ipfsStorage.uploadText(text);
      setLastUploadResult(result);
      console.log('📤 Text uploaded to IPFS:', result);
      return result;
    } catch (error) {
      console.error('Failed to upload text to IPFS:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const getContent = useCallback(async (cid: string): Promise<any> => {
    if (!isValidCID(cid)) {
      throw new Error('Invalid IPFS CID');
    }

    try {
      return await ipfsStorage.getContent(cid);
    } catch (error) {
      console.error('Failed to get content from IPFS:', error);
      throw error;
    }
  }, []);

  const cidToIPFSUrl = useCallback((cid: string, gatewayIndex = 0): string => {
    return cidToURL(cid, gatewayIndex);
  }, []);

  const ipfsUrlToCID = useCallback((url: string): string | null => {
    return urlToCID(url);
  }, []);

  return {
    // State
    isUploading,
    uploadProgress,
    lastUploadResult,

    // Upload functions
    uploadFile,
    uploadJSON,
    uploadText,

    // Retrieval functions
    getContent,
    cidToIPFSUrl,
    ipfsUrlToCID,

    // Utilities
    isValidCID
  };
}

// Hook for managing IPFS content with caching
export function useIPFSCache() {
  const [cache, setCache] = useState<Map<string, any>>(new Map());

  const getCachedContent = useCallback(async (cid: string, fetcher: () => Promise<any>) => {
    if (cache.has(cid)) {
      return cache.get(cid);
    }

    const content = await fetcher();
    setCache(prev => new Map(prev.set(cid, content)));
    return content;
  }, [cache]);

  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  const removeFromCache = useCallback((cid: string) => {
    setCache(prev => {
      const newCache = new Map(prev);
      newCache.delete(cid);
      return newCache;
    });
  }, []);

  return {
    getCachedContent,
    clearCache,
    removeFromCache,
    cacheSize: cache.size
  };
}
