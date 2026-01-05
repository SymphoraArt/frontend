import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  verifyPayment,
  calculatePlatformFee,
  calculateTotalWithFee,
  isValidLUKSOAddress,
  isValidLYXAmount,
  convertUSDToLYX,
  convertLYXToUSD
} from '../payment-verification.js';

// Mock thirdweb
vi.mock('thirdweb', () => ({
  createThirdwebClient: vi.fn(() => ({ secretKey: 'test' })),
  getRpcClient: vi.fn(() => 'mock-rpc-client'),
}));

vi.mock('thirdweb/rpc', () => ({
  eth_getTransactionByHash: vi.fn(),
  eth_getBlockByNumber: vi.fn(),
}));

import { eth_getTransactionByHash, eth_getBlockByNumber } from 'thirdweb/rpc';

const mockEthGetTransactionByHash = vi.mocked(eth_getTransactionByHash);
const mockEthGetBlockByNumber = vi.mocked(eth_getBlockByNumber);

describe('Payment Verification Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Set required environment variables for tests
    process.env.THIRDWEB_SECRET_KEY = 'test-secret-key';
    process.env.TREASURY_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('verifyPayment', () => {
    const validTx = {
      hash: '0x1234567890abcdef',
      to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      from: '0xsender123456789012345678901234567890123',
      value: '1000000000000000000', // 1 LYX in wei
      blockNumber: '0x12345'
    };

    it('should verify a valid payment transaction', async () => {
      mockEthGetTransactionByHash.mockResolvedValue(validTx as any);
      mockEthGetBlockByNumber.mockResolvedValue({
        timestamp: BigInt('0x64f12345') // Some timestamp as bigint
      } as any);

      const result = await (verifyPayment as any)(
        '0x1234567890abcdef',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(true);
      expect(result.amountPaid).toBe('1.0');
      expect(result.from).toBe(validTx.from);
      expect(result.to).toBe(validTx.to);
      expect(result.transactionHash).toBe('0x1234567890abcdef');
    });

    it('should reject transaction not found', async () => {
      mockEthGetTransactionByHash.mockResolvedValue(null as any);

      const result = await (verifyPayment as any)(
        '0xnonexistent',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(false);
      expect(result.error).toContain('not found');
    });

    it('should reject unmined transaction', async () => {
      const unminedTx = { ...validTx, blockNumber: undefined };
      mockEthGetTransactionByHash.mockResolvedValue(unminedTx as any);

      const result = await (verifyPayment as any)(
        '0x1234567890abcdef',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(false);
      expect(result.error).toContain('not yet mined');
    });

    it('should reject wrong recipient address', async () => {
      const wrongRecipientTx = { ...validTx, to: '0xwrong123456789012345678901234567890123' };
      mockEthGetTransactionByHash.mockResolvedValue(wrongRecipientTx as any);

      const result = await (verifyPayment as any)(
        '0x1234567890abcdef',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(false);
      expect(result.error).toContain('wrong address');
    });

    it('should reject incorrect payment amount', async () => {
      const wrongAmountTx = { ...validTx, value: '500000000000000000' }; // 0.5 LYX
      mockEthGetTransactionByHash.mockResolvedValue(wrongAmountTx as any);

      const result = await (verifyPayment as any)(
        '0x1234567890abcdef',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(false);
      expect(result.error).toContain('Incorrect payment amount');
    });

    it('should handle amount within tolerance', async () => {
      // 1.00001 LYX (within 0.1% tolerance)
      const toleranceAmount = '1000010000000000000';
      const toleranceTx = { ...validTx, value: toleranceAmount };
      mockEthGetTransactionByHash.mockResolvedValue(toleranceTx as any);

      const result = await (verifyPayment as any)(
        '0x1234567890abcdef',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(true);
    });

    it('should handle network errors gracefully', async () => {
      mockEthGetTransactionByHash.mockRejectedValue(new Error('Network timeout'));

      const result = await (verifyPayment as any)(
        '0x1234567890abcdef',
        '1.0',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      );

      expect(result.verified).toBe(false);
      expect(result.error).toContain('Verification failed');
    });
  });

  describe('calculatePlatformFee', () => {
    it('should calculate 3% platform fee', () => {
      expect(calculatePlatformFee('1.0')).toBe('0.030000000000000000');
      expect(calculatePlatformFee('10.0')).toBe('0.300000000000000000');
      expect(calculatePlatformFee('0.1')).toBe('0.003000000000000000');
    });

    it('should handle decimal amounts', () => {
      expect(calculatePlatformFee('1.5')).toBe('0.045000000000000000');
      expect(calculatePlatformFee('0.01')).toBe('0.000300000000000000');
    });
  });

  describe('calculateTotalWithFee', () => {
    it('should calculate total amount including fee', () => {
      const result = calculateTotalWithFee('1.0');
      expect(result.total).toBe('1.030000000000000000');
      expect(result.fee).toBe('0.030000000000000000');
    });

    it('should handle different amounts', () => {
      const result = calculateTotalWithFee('10.0');
      expect(result.total).toBe('10.300000000000000000');
      expect(result.fee).toBe('0.300000000000000000');
    });
  });

  describe('isValidLUKSOAddress', () => {
    it('should validate correct LUKSO addresses', () => {
      expect(isValidLUKSOAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')).toBe(true);
      expect(isValidLUKSOAddress('0x0000000000000000000000000000000000000000')).toBe(true);
    });

    it('should reject invalid addresses', () => {
      expect(isValidLUKSOAddress('')).toBe(false);
      expect(isValidLUKSOAddress('0x123')).toBe(false);
      expect(isValidLUKSOAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44')).toBe(false); // Too short
      expect(isValidLUKSOAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44ee')).toBe(false); // Too long
      expect(isValidLUKSOAddress('not-an-address')).toBe(false);
    });
  });

  describe('isValidLYXAmount', () => {
    it('should validate reasonable LYX amounts', () => {
      expect(isValidLYXAmount('1.0')).toBe(true);
      expect(isValidLYXAmount('0.1')).toBe(true);
      expect(isValidLYXAmount('100')).toBe(true);
      expect(isValidLYXAmount('0.01')).toBe(true);
    });

    it('should reject invalid amounts', () => {
      expect(isValidLYXAmount('0')).toBe(false);
      expect(isValidLYXAmount('-1')).toBe(false);
      expect(isValidLYXAmount('1000001')).toBe(false); // Over reasonable limit
      expect(isValidLYXAmount('abc')).toBe(false);
      expect(isValidLYXAmount('')).toBe(false);
    });
  });

  describe('Currency Conversion (placeholder)', () => {
    // These tests use placeholder implementations
    // In production, these would test actual price fetching

    it('should convert USD to LYX', async () => {
      const result = await convertUSDToLYX(1.0);
      expect(typeof result).toBe('string');
      expect(parseFloat(result)).toBeGreaterThan(0);
    });

    it('should convert LYX to USD', async () => {
      const result = await convertLYXToUSD('1.0');
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Error handling', () => {
    it('should handle missing THIRDWEB_SECRET_KEY', async () => {
      delete process.env.THIRDWEB_SECRET_KEY;

      await expect(verifyPayment('0x123', '1.0', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'))
        .rejects.toThrow('THIRDWEB_SECRET_KEY environment variable is not set');
    });
  });
});
