// Jest setup file for global test configuration

// Increase timeout for integration tests that may take longer
jest.setTimeout(30000);

// Mock console methods during tests to reduce noise
const originalConsole = { ...console };

beforeEach(() => {
  // Only suppress console during tests, not in development
  if (process.env.NODE_ENV === 'test') {
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = originalConsole.error; // Keep errors visible
  }
});

afterEach(() => {
  // Restore console methods
  if (process.env.NODE_ENV === 'test') {
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
  }
});

// Global test utilities
global.testUtils = {
  // Helper to create test HTML content
  createTestHtml: (title = 'Test', content = '<h1>Test</h1>') => {
    return `<html><head><title>${title}</title></head><body>${content}</body></html>`;
  },
  
  // Helper to create data URLs for testing
  createDataUrl: (html) => {
    return `data:text/html,${encodeURIComponent(html)}`;
  }
};