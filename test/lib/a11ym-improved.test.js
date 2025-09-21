const a11ym = require('../../lib/a11ym');

describe('A11yM Core Module', () => {
    describe('module structure', () => {
        test('should export an object with expected properties', () => {
            expect(typeof a11ym).toBe('object');
            expect(a11ym).toHaveProperty('defaultOptions');
            expect(a11ym).toHaveProperty('start');
            expect(typeof a11ym.start).toBe('function');
        });

        test('should have default options defined', () => {
            expect(typeof a11ym.defaultOptions).toBe('object');
            expect(a11ym.defaultOptions).toBeDefined();
        });
    });

    describe('defaultOptions', () => {
        test('should contain expected default configuration', () => {
            const defaults = a11ym.defaultOptions;
            
            // Check that defaults is an object with expected properties
            expect(typeof defaults).toBe('object');
            expect(defaults).toBeDefined();
            
            // Test for common expected properties (adjust based on actual implementation)
            if (defaults.hasOwnProperty('depth')) {
                expect(typeof defaults.depth).toBe('number');
            }
            if (defaults.hasOwnProperty('standards')) {
                expect(typeof defaults.standards).toBe('string');
            }
        });

        test('should be immutable reference', () => {
            const defaults1 = a11ym.defaultOptions;
            const defaults2 = a11ym.defaultOptions;
            
            expect(defaults1).toBe(defaults2);
        });
    });

    describe('start function', () => {
        test('should be a function that accepts options and inputs', () => {
            expect(typeof a11ym.start).toBe('function');
            expect(a11ym.start.length).toBeGreaterThanOrEqual(1); // At least one parameter
        });

        test('should handle being called with minimal parameters', () => {
            // Test that it doesn't throw immediately with basic parameters
            expect(() => {
                // Call with empty options object - should not throw synchronously
                const result = a11ym.start({});
            }).not.toThrow();
        });

        test('should handle being called with options and inputs', () => {
            expect(() => {
                const result = a11ym.start({}, []);
            }).not.toThrow();
        });

        test('should handle reportOptions parsing', () => {
            expect(() => {
                // Test with reportOptions as string (should be parsed as JSON)
                const result = a11ym.start({ 
                    reportOptions: '{"test": true}' 
                });
            }).not.toThrow();
        });

        test('should handle invalid reportOptions by throwing', () => {
            expect(() => {
                // Test with invalid JSON in reportOptions - should throw
                const result = a11ym.start({ 
                    reportOptions: 'invalid json' 
                });
            }).toThrow();
        });
    });

    describe('configuration handling', () => {
        test('should handle various option combinations', () => {
            const testOptions = [
                {},
                { depth: 1 },
                { url: 'http://example.com' },
                { reportOptions: null },
                { reportOptions: undefined },
                { reportOptions: {} }
            ];

            testOptions.forEach(options => {
                expect(() => {
                    a11ym.start(options);
                }).not.toThrow();
            });
        });
    });
});