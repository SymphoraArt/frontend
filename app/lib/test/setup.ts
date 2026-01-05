/**
 * Test Setup and Utilities
 */

import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll, afterEach } from 'vitest';

// Mock environment variables for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Mock fetch for API calls
global.fetch = vi.fn();

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'test-uuid-123'),
  },
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = vi.fn();
  console.warn = vi.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Reset all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});

// Custom test utilities
export const createMockResponse = (data: any, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: vi.fn().mockResolvedValue(data),
  text: vi.fn().mockResolvedValue(JSON.stringify(data)),
  headers: new Map(),
});

export const createMockErrorResponse = (error: string, status = 500) => ({
  ok: false,
  status,
  json: vi.fn().mockResolvedValue({ error }),
  text: vi.fn().mockResolvedValue(error),
  headers: new Map(),
});

export const mockEnvironmentVariables = (vars: Record<string, string>) => {
  const originalEnv = { ...process.env };

  beforeAll(() => {
    Object.assign(process.env, vars);
  });

  afterAll(() => {
    process.env = originalEnv;
  });
};

export const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0));

export const createMockGeneration = (overrides = {}) => ({
  id: 'gen-123',
  status: 'completed',
  imageUrls: ['https://example.com/image1.png', 'https://example.com/image2.png'],
  errorMessage: null,
  createdAt: new Date().toISOString(),
  completedAt: new Date().toISOString(),
  amountPaid: null,
  promptId: 'prompt-123',
  ...overrides,
});

export const createMockPrompt = (overrides = {}) => ({
  id: 'prompt-123',
  title: 'Test Prompt',
  description: 'A test prompt for AI generation',
  price: '0.1',
  creatorAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  variables: [
    {
      id: 'color',
      name: 'color',
      type: 'select' as const,
      label: 'Color',
      required: true,
      options: [
        { label: 'Red', promptValue: 'red' },
        { label: 'Blue', promptValue: 'blue' },
      ],
    },
  ],
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  avatar: 'https://example.com/avatar.png',
  ...overrides,
});

// Mock implementations for common external dependencies
export const mockThirdweb = () => {
  vi.mock('thirdweb', () => ({
    createThirdwebClient: vi.fn(() => ({ secretKey: 'mock-secret' })),
    getContract: vi.fn(),
    defineChain: vi.fn(() => ({ id: 42, name: 'LUKSO' })),
    getRpcClient: vi.fn(() => 'mock-rpc-client'),
    eth_getTransactionByHash: vi.fn(),
    eth_getBlockByNumber: vi.fn(),
  }));
};

export const mockSupabase = () => {
  const mockSupabaseClient = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        })),
      })),
      update: vi.fn(() => ({
        set: vi.fn(() => ({
          where: vi.fn(() => ({
            eq: vi.fn().mockResolvedValue({ error: null }),
          })),
        })),
      })),
      delete: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ error: null }),
      })),
    })),
  };

  vi.mock('@/lib/supabaseServer', () => ({
    getSupabaseServerClient: vi.fn(() => mockSupabaseClient),
  }));

  return mockSupabaseClient;
};
