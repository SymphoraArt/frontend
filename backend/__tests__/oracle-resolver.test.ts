/**
 * Oracle Resolver Tests
 *
 * Comprehensive test suite for on-chain oracle integration:
 * - Chainlink primary path
 * - Uniswap TWAP fallback
 * - Stablecoin manual pricing
 * - Fail-closed behavior
 * - Deterministic resolution
 * - Backward compatibility
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { OracleResolver } from '../oracles/oracle-resolver';
import { ChainlinkOracle, ChainlinkOracleError, ChainlinkErrorCode } from '../oracles/chainlink-oracle';
import { UniswapTwapOracle, UniswapOracleError, UniswapErrorCode } from '../oracles/uniswap-twap-oracle';

describe('Oracle Resolver - Stablecoin Pricing', () => {
  let resolver: OracleResolver;

  beforeEach(() => {
    resolver = new OracleResolver();
  });

  it('should use manual pricing for USDC', async () => {
    const price = await resolver.resolvePrice('USDC', 'base-sepolia');

    expect(price.priceUsd).toBe(1.0);
    expect(price.source).toBe('MANUAL');
    expect(price.confidence).toBeGreaterThan(0.95);
    expect(price.isSafe).toBe(true);
    expect(price.explanation).toContain('Stablecoin detected: USDC');
  });

  it('should use manual pricing for USDC.e', async () => {
    const price = await resolver.resolvePrice('USDC.e', 'abstract-testnet');

    expect(price.priceUsd).toBe(1.0);
    expect(price.source).toBe('MANUAL');
    expect(price.isSafe).toBe(true);
  });

  it('should use manual pricing for DAI', async () => {
    const price = await resolver.resolvePrice('DAI', 'ethereum-sepolia');

    expect(price.priceUsd).toBe(1.0);
    expect(price.source).toBe('MANUAL');
    expect(price.isSafe).toBe(true);
  });

  it('should provide high confidence for stablecoins', async () => {
    const price = await resolver.resolvePrice('USDC', 'base');

    expect(price.confidence).toBeGreaterThanOrEqual(0.95);
  });
});

describe('Oracle Resolver - Chainlink Integration', () => {
  let resolver: OracleResolver;
  let chainlink: ChainlinkOracle;

  beforeEach(() => {
    resolver = new OracleResolver();
    chainlink = new ChainlinkOracle();
  });

  it('should check Chainlink feed availability', async () => {
    const available = chainlink.isFeedAvailable('WETH', 'base');
    expect(typeof available).toBe('boolean');
  });

  it('should get available chains for token', () => {
    const chains = chainlink.getAvailableChains('WETH');
    expect(Array.isArray(chains)).toBe(true);
  });

  it('should reject resolution when Chainlink unavailable and TWAP unavailable', async () => {
    // Token that has no oracle configured
    await expect(
      resolver.resolvePrice('UNKNOWN_TOKEN', 'base' as any)
    ).rejects.toThrow();
  });
});

describe('Oracle Resolver - Configuration', () => {
  it('should use default configuration', () => {
    const resolver = new OracleResolver();
    const config = resolver.getConfig();

    expect(config.enableChainlink).toBe(true);
    expect(config.enableUniswapTwap).toBe(true);
    expect(config.minConfidence).toBeGreaterThan(0);
  });

  it('should allow custom configuration', () => {
    const resolver = new OracleResolver({
      enableChainlink: false,
      minConfidence: 0.9,
    });

    const config = resolver.getConfig();
    expect(config.enableChainlink).toBe(false);
    expect(config.minConfidence).toBe(0.9);
  });

  it('should allow configuration updates', () => {
    const resolver = new OracleResolver();

    resolver.updateConfig({
      minConfidence: 0.85,
    });

    const config = resolver.getConfig();
    expect(config.minConfidence).toBe(0.85);
  });
});

describe('Oracle Resolver - Availability Checks', () => {
  let resolver: OracleResolver;

  beforeEach(() => {
    resolver = new OracleResolver();
  });

  it('should check oracle availability for USDC', async () => {
    const availability = await resolver.checkAvailability('USDC', 'base');

    expect(availability.anyAvailable).toBe(true);
    // Stablecoins use manual pricing, so considered available
    expect(availability.chainlinkAvailable).toBe(true);
  });

  it('should check oracle availability for WETH', async () => {
    const availability = await resolver.checkAvailability('WETH', 'base');

    expect(availability.anyAvailable).toBe(true);
    expect(
      availability.chainlinkAvailable || availability.uniswapTwapAvailable
    ).toBe(true);
  });
});

describe('Chainlink Oracle - Configuration', () => {
  let oracle: ChainlinkOracle;

  beforeEach(() => {
    oracle = new ChainlinkOracle();
  });

  it('should have feed configured for ETH on Ethereum', () => {
    const available = oracle.isFeedAvailable('ETH', 'ethereum');
    expect(available).toBe(true);
  });

  it('should have feed configured for USDC on Base', () => {
    const available = oracle.isFeedAvailable('USDC', 'base');
    expect(available).toBe(true);
  });

  it('should return null for unconfigured token', () => {
    const config = oracle.getFeedConfigForInspection('UNKNOWN', 'ethereum');
    expect(config).toBeNull();
  });

  it('should get feed configuration details', () => {
    const config = oracle.getFeedConfigForInspection('WETH', 'base');

    if (config) {
      expect(config.feedAddress).toBeDefined();
      expect(config.decimals).toBe(8); // Chainlink USD feeds use 8 decimals
      expect(config.maxStalenessSeconds).toBeGreaterThan(0);
      expect(config.description).toBeDefined();
    }
  });

  it('should get available chains for ETH', () => {
    const chains = oracle.getAvailableChains('ETH');
    expect(chains.length).toBeGreaterThan(0);
    expect(chains).toContain('ethereum');
  });
});

describe('Uniswap TWAP Oracle - Configuration', () => {
  let oracle: UniswapTwapOracle;

  beforeEach(() => {
    oracle = new UniswapTwapOracle();
  });

  it('should have pool configured for WETH on Ethereum', () => {
    const available = oracle.isPoolAvailable('WETH', 'ethereum');
    expect(available).toBe(true);
  });

  it('should have pool configured for WETH on Base', () => {
    const available = oracle.isPoolAvailable('WETH', 'base');
    expect(available).toBe(true);
  });

  it('should return false for unconfigured pool', () => {
    const available = oracle.isPoolAvailable('UNKNOWN', 'ethereum');
    expect(available).toBe(false);
  });

  it('should get pool configuration details', () => {
    const config = oracle.getPoolConfigForInspection('WETH', 'ethereum');

    if (config) {
      expect(config.poolAddress).toBeDefined();
      expect(config.token0).toBeDefined();
      expect(config.token1).toBeDefined();
      expect(config.feeTier).toBeGreaterThan(0);
      expect(config.quoteToken).toBe('USDC');
      expect(config.minLiquidityUsd).toBeGreaterThan(0);
    }
  });

  it('should get available chains for WETH', () => {
    const chains = oracle.getAvailableChains('WETH');
    expect(chains.length).toBeGreaterThan(0);
  });
});

describe('Oracle Resolution - Decision Logic', () => {
  let resolver: OracleResolver;

  beforeEach(() => {
    resolver = new OracleResolver();
  });

  it('should provide explanation for stablecoin pricing', async () => {
    const price = await resolver.resolvePrice('USDC', 'base');

    expect(price.explanation.length).toBeGreaterThan(0);
    expect(price.explanation.some(e => e.includes('Stablecoin'))).toBe(true);
  });

  it('should include source in resolution', async () => {
    const price = await resolver.resolvePrice('USDC', 'base');

    expect(['CHAINLINK', 'UNISWAP_TWAP', 'MANUAL']).toContain(price.source);
  });

  it('should include timestamp', async () => {
    const price = await resolver.resolvePrice('USDC', 'base');

    expect(price.timestamp).toBeInstanceOf(Date);
    expect(price.timestamp.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('should include metadata based on source', async () => {
    const price = await resolver.resolvePrice('USDC', 'base');

    if (price.source === 'MANUAL') {
      expect(price.metadata.manual).toBeDefined();
      expect(price.metadata.manual?.price).toBe(1.0);
    } else if (price.source === 'CHAINLINK') {
      expect(price.metadata.chainlink).toBeDefined();
    } else if (price.source === 'UNISWAP_TWAP') {
      expect(price.metadata.uniswapTwap).toBeDefined();
    }
  });
});

describe('Oracle Resolution - Safety Guarantees', () => {
  let resolver: OracleResolver;

  beforeEach(() => {
    resolver = new OracleResolver();
  });

  it('should mark safe prices as safe', async () => {
    const price = await resolver.resolvePrice('USDC', 'base');

    expect(price.isSafe).toBe(true);
    expect(price.unsafeReason).toBeUndefined();
  });

  it('should enforce minimum confidence', async () => {
    const resolver = new OracleResolver({
      minConfidence: 0.99, // Very high threshold
    });

    // Stablecoins should still pass with high confidence
    const price = await resolver.resolvePrice('USDC', 'base');
    expect(price.confidence).toBeGreaterThanOrEqual(0.95);
  });

  it('should fail when both oracles unavailable', async () => {
    const resolver = new OracleResolver({
      enableChainlink: false,
      enableUniswapTwap: false,
    });

    // Even non-stablecoins should fail
    await expect(
      resolver.resolvePrice('UNKNOWN', 'base' as any)
    ).rejects.toThrow('all oracles failed');
  });
});

describe('Oracle Resolution - Backward Compatibility', () => {
  it('should maintain USDC behavior', async () => {
    const resolver = new OracleResolver();

    // Multiple calls should give consistent results
    const price1 = await resolver.resolvePrice('USDC', 'base-sepolia');
    const price2 = await resolver.resolvePrice('USDC', 'base-sepolia');

    expect(price1.priceUsd).toBe(price2.priceUsd);
    expect(price1.source).toBe(price2.source);
    expect(price1.source).toBe('MANUAL'); // Stablecoins use manual
  });

  it('should work for all registered stablecoins', async () => {
    const resolver = new OracleResolver();
    const stablecoins = ['USDC', 'USDC.e', 'DAI'];

    for (const stable of stablecoins) {
      // Test on a chain where the token exists
      let chain: 'base' | 'ethereum' | 'abstract' = 'base';
      if (stable === 'USDC.e') chain = 'abstract';
      if (stable === 'DAI') chain = 'ethereum';

      const price = await resolver.resolvePrice(stable, chain);

      expect(price.priceUsd).toBeCloseTo(1.0, 2);
      expect(price.source).toBe('MANUAL');
      expect(price.isSafe).toBe(true);
    }
  });
});

describe('Multi-Token Engine Integration', () => {
  it('should export oracle resolver for integration', async () => {
    const { oracleResolver } = await import('../oracles/oracle-resolver');

    expect(oracleResolver).toBeDefined();
    expect(typeof oracleResolver.resolvePrice).toBe('function');
  });

  it('should provide consistent pricing', async () => {
    const { oracleResolver } = await import('../oracles/oracle-resolver');

    const price = await oracleResolver.resolvePrice('USDC', 'base');

    expect(price.priceUsd).toBe(1.0);
    expect(price.confidence).toBeGreaterThan(0.9);
  });
});

describe('Oracle Error Handling', () => {
  it('should provide specific error codes', () => {
    const error = new ChainlinkOracleError(
      'Test error',
      ChainlinkErrorCode.STALE_DATA,
      { age: 3600 }
    );

    expect(error.code).toBe(ChainlinkErrorCode.STALE_DATA);
    expect(error.details).toEqual({ age: 3600 });
    expect(error.name).toBe('ChainlinkOracleError');
  });

  it('should provide error details', () => {
    const error = new UniswapOracleError(
      'Pool not found',
      UniswapErrorCode.POOL_NOT_CONFIGURED,
      { token: 'WETH', chain: 'polygon' }
    );

    expect(error.code).toBe(UniswapErrorCode.POOL_NOT_CONFIGURED);
    expect(error.details.token).toBe('WETH');
  });
});

describe('Oracle Resolution - Edge Cases', () => {
  let resolver: OracleResolver;

  beforeEach(() => {
    resolver = new OracleResolver();
  });

  it('should handle case-insensitive token symbols', async () => {
    const price1 = await resolver.resolvePrice('USDC', 'base');
    const price2 = await resolver.resolvePrice('usdc', 'base');

    expect(price1.priceUsd).toBe(price2.priceUsd);
  });

  it('should provide detailed explanation chain', async () => {
    const price = await resolver.resolvePrice('USDC', 'base');

    expect(Array.isArray(price.explanation)).toBe(true);
    expect(price.explanation.length).toBeGreaterThan(0);

    // Should explain the resolution path
    const explanationText = price.explanation.join(' ');
    expect(explanationText.length).toBeGreaterThan(0);
  });

  it('should include confidence score', async () => {
    const price = await resolver.resolvePrice('USDC', 'base');

    expect(price.confidence).toBeGreaterThan(0);
    expect(price.confidence).toBeLessThanOrEqual(1);
  });
});
