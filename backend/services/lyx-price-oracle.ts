/**
 * LYX Price Oracle
 * Fetches real-time LYX price from multiple sources with fallback
 */

interface PriceSource {
  name: string;
  fetch: () => Promise<number | null>;
}

const PRICE_SOURCES: PriceSource[] = [
  {
    name: 'CoinGecko',
    fetch: async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=usd',
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`CoinGecko API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data['lukso-token']?.usd || null;
      } catch (error) {
        console.warn('CoinGecko price fetch failed:', error);
        return null;
      }
    }
  },
  {
    name: 'CoinMarketCap',
    fetch: async () => {
      try {
        const apiKey = process.env.COINMARKETCAP_API_KEY;
        if (!apiKey) return null;

        const response = await fetch(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=LYX&convert=USD',
          {
            headers: { 
              'X-CMC_PRO_API_KEY': apiKey,
              'Accept': 'application/json',
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`CoinMarketCap API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data.data?.LYX?.quote?.USD?.price || null;
      } catch (error) {
        console.warn('CoinMarketCap price fetch failed:', error);
        return null;
      }
    }
  },
  {
    name: 'Fallback',
    fetch: async () => {
      // Manual fallback - update periodically
      // Last updated: 2026-01-05
      console.warn('Using fallback LYX price');
      return 5.50; // Update this manually as needed
    }
  }
];

let cachedPrice: { price: number; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 1000; // 1 minute

/**
 * Fetches current LYX price with caching and fallback
 */
export async function getLYXPrice(): Promise<{ price: number; currency: string } | null> {
  try {
    // Return cached price if fresh
    if (cachedPrice && Date.now() - cachedPrice.timestamp < CACHE_DURATION) {
      return {
        price: cachedPrice.price,
        currency: 'USD'
      };
    }

    // Try each source in order
    for (const source of PRICE_SOURCES) {
      try {
        const price = await source.fetch();
        if (price && price > 0) {
          console.log(`✅ Fetched LYX price from ${source.name}: $${price.toFixed(4)}`);

          // Cache the price
          cachedPrice = {
            price,
            timestamp: Date.now()
          };

          return {
            price,
            currency: 'USD'
          };
        }
      } catch (error) {
        console.warn(`⚠️ ${source.name} price fetch failed:`, error);
        continue;
      }
    }

    // All sources failed
    console.error('❌ All LYX price sources failed');
    return null;

  } catch (error) {
    console.error('❌ LYX price oracle error:', error);
    return null;
  }
}

/**
 * Get price with retry logic
 */
export async function getLYXPriceWithRetry(maxRetries: number = 3): Promise<number> {
  for (let i = 0; i < maxRetries; i++) {
    const result = await getLYXPrice();
    if (result) return result.price;

    // Wait before retry (exponential backoff)
    await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
  }

  throw new Error('Failed to fetch LYX price after retries');
}

/**
 * Clear price cache (for testing or manual updates)
 */
export function clearPriceCache() {
  cachedPrice = null;
}

