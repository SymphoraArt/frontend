// Test setup file
import { beforeAll, afterAll, vi } from 'vitest';

// Mock environment variables
process.env.PROMPT_ENCRYPTION_KEY = 'dGVzdC1rZXktZm9yLXRlc3RpbmctMTIzNDU2Nzg5MDEyMzQ1Njc4OTA='; // base64 encoded 32-byte key
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key';

// Mock console methods to reduce noise in tests
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  log: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Clean up after tests
afterAll(() => {
  global.console = originalConsole;
  vi.restoreAllMocks();
});
