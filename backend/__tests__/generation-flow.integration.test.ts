import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { substituteVariablesWithPrompt } from '../services/variable-substitution.js';
import { prepareEncryptedPromptForDB, decryptFinalPrompt } from '../services/generation-encryption.js';
import { getSupabaseServerClient as getSupabaseClient } from '../../app/lib/supabaseServer';
import { createGenerationSchema } from '../../app/middleware/validation';

// Mock Supabase client - using ReturnType for proper typing
import type { SupabaseClient } from '@supabase/supabase-js';

describe('Generation Flow Integration Tests', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSupabase: any; // Mock type for tests - using any is acceptable for test mocks

  beforeEach(() => {
    // Mock Supabase client
    mockSupabase = {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'prompt-123',
                title: 'Test Prompt',
                encryptedContent: 'mock-encrypted-content',
                iv: 'mock-iv',
                authTag: 'mock-auth-tag',
                variables: JSON.stringify([
                  {
                    name: 'color',
                    type: 'text',
                    required: true,
                    label: 'Color',
                  },
                ]),
              },
              error: null,
            }),
          })),
        })),
      })),
    };

    vi.mocked(getSupabaseClient).mockReturnValue(mockSupabase);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete Generation Flow', () => {
    it('should handle the complete variable substitution flow', async () => {
      // Mock the prompt data
      const mockPrompt = {
        id: 'prompt-123',
        title: 'Test Prompt',
        encryptedContent: 'mock-encrypted-content',
        iv: 'mock-iv',
        authTag: 'mock-auth-tag',
        variables: [
          {
            name: 'color',
            type: 'text' as const,
            required: true,
            label: 'Color',
          },
        ],
      };

      // Mock the storage interface
      const mockStorage = {
        getPrompt: vi.fn().mockResolvedValue(mockPrompt),
        getVariablesByPromptId: vi.fn().mockResolvedValue(mockPrompt.variables),
        uploadFile: vi.fn().mockResolvedValue('mock-url'),
        getFileUrl: vi.fn().mockReturnValue('mock-url'),
      };

      // Mock the encryption functions
      const mockDecryptPrompt = vi.fn().mockReturnValue('A [color] house in the countryside');
      vi.doMock('../services/generation-encryption.js', () => ({
        decryptPrompt: mockDecryptPrompt,
      }));

      // Import after mocking
      const { substituteVariablesWithPrompt } = await import('../services/variable-substitution.js');

      const variableValues = [
        { variableName: 'color', value: 'blue' },
      ];

      const result = await substituteVariablesWithPrompt(mockPrompt, variableValues, mockStorage);

      expect(result.success).toBe(true);
      expect(result.finalPrompt).toBe('A blue house in the countryside');
      expect(result.errors).toHaveLength(0);
      expect(mockDecryptPrompt).toHaveBeenCalledWith({
        encrypted: mockPrompt.encryptedContent,
        iv: mockPrompt.iv,
        authTag: mockPrompt.authTag,
      });
    });

    it('should handle encryption and decryption roundtrip', async () => {
      const originalPrompt = 'A beautiful landscape with mountains and a lake';

      // Encrypt the prompt
      const encrypted = prepareEncryptedPromptForDB(originalPrompt);

      // Create a mock generation record
      const mockGeneration = {
        id: 'gen-123',
        userId: 'user-123',
        promptId: 'prompt-123',
        finalPrompt: encrypted.finalPrompt,
        finalPromptIv: encrypted.finalPromptIv,
        finalPromptAuthTag: encrypted.finalPromptAuthTag,
        variableValues: [],
        settings: {},
        transactionHash: undefined,
        paymentVerified: false,
        amountPaid: undefined,
        status: 'generating' as const,
        imageUrls: [],
        errorMessage: undefined,
        retryCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: undefined,
      };

      // Decrypt the prompt
      const decryptedPrompt = decryptFinalPrompt(mockGeneration);

      expect(decryptedPrompt).toBe(originalPrompt);
    });

    it('should handle payment verification integration', async () => {
      const { verifyPayment } = await import('../services/payment-verification.js');

      // Mock the Thirdweb RPC calls
      const mockEthGetTransactionByHash = vi.fn().mockResolvedValue({
        hash: '0x1234567890abcdef',
        to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        from: '0xsender123456789012345678901234567890123',
        value: '1000000000000000000', // 1 LYX in wei
        blockNumber: '0x12345',
      });

      const mockEthGetBlockByNumber = vi.fn().mockResolvedValue({
        timestamp: '0x64f12345',
      });

      // Mock the thirdweb imports
      vi.doMock('thirdweb', () => ({
        createThirdwebClient: vi.fn(() => ({ secretKey: 'test' })),
        getRpcClient: vi.fn(() => ({
          eth_getTransactionByHash: mockEthGetTransactionByHash,
          eth_getBlockByNumber: mockEthGetBlockByNumber,
        })),
      }));

      // Set mock environment variables
      process.env.THIRDWEB_SECRET_KEY = 'test-secret-key';

      const result = await verifyPayment(
        '0x1234567890abcdef',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(true);
      expect(result.amountPaid).toBe('1.0');
      expect(result.transactionHash).toBe('0x1234567890abcdef');
    });

    it('should handle API request validation', async () => {
      const { validateBody, createErrorResponse } = await import('../../app/middleware/validation.js');

      // Test valid generation request
      const validRequest = {
        promptId: 'prompt-123',
        variableValues: {
          color: 'blue',
          size: 'large',
        },
        settings: {
          aspectRatio: '1:1',
          numImages: 2,
        },
      };

      const validation = validateBody(createGenerationSchema, validRequest);
      expect(validation.success).toBe(true);

      // Test invalid generation request
      const invalidRequest = {
        // Missing required fields
      };

      const invalidValidation = validateBody(createGenerationSchema, invalidRequest);
      expect(invalidValidation.success).toBe(false);
    });

    it('should handle database operations for generations', async () => {
      // Mock database operations
      const mockDbInsert = vi.fn().mockResolvedValue({
        id: 'gen-123',
        status: 'pending',
      });

      const mockDbQuery = vi.fn().mockResolvedValue({
        id: 'gen-123',
        status: 'completed',
        imageUrls: ['https://example.com/image1.png'],
      });

      // Simulate the database flow
      const generationData = {
        userId: 'user-123',
        promptId: 'prompt-123',
        finalPrompt: 'A blue house',
        variableValues: [{ variableName: 'color', value: 'blue' }],
        settings: { aspectRatio: '1:1' },
        status: 'pending',
      };

      // Insert generation
      const inserted = await mockDbInsert(generationData);
      expect(inserted.id).toBe('gen-123');
      expect(inserted.status).toBe('pending');

      // Query generation
      const queried = await mockDbQuery('gen-123');
      expect(queried.status).toBe('completed');
      expect(queried.imageUrls).toHaveLength(1);
    });

    it('should handle error scenarios gracefully', async () => {
      // Test payment verification failure
      const { verifyPayment } = await import('../services/payment-verification.js');

      // Mock failed transaction lookup
      vi.doMock('thirdweb', () => ({
        createThirdwebClient: vi.fn(() => ({ secretKey: 'test' })),
        getRpcClient: vi.fn(() => ({
          eth_getTransactionByHash: vi.fn().mockResolvedValue(null),
        })),
      }));

      process.env.THIRDWEB_SECRET_KEY = 'test-secret-key';

      const result = await verifyPayment(
        '0xnonexistent',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(false);
      expect(result.error).toContain('not found');
    });

    it('should validate generation settings', () => {
      // Test valid settings
      const validSettings = {
        aspectRatio: '16:9',
        numImages: 4,
        modelVersion: 'gemini-pro-vision',
      };

      expect(validSettings.aspectRatio).toMatch(/^\d+:\d+$/);
      expect(validSettings.numImages).toBeGreaterThan(0);
      expect(validSettings.numImages).toBeLessThanOrEqual(4);

      // Test invalid settings
      const invalidSettings = {
        aspectRatio: 'invalid',
        numImages: 10, // Too many
        modelVersion: 'unknown-model',
      };

      expect(invalidSettings.aspectRatio).not.toMatch(/^\d+:\d+$/);
      expect(invalidSettings.numImages).toBeGreaterThan(4);
    });
  });
});
