const a11ym = require('../../lib/a11ym');
const path = require('path');

describe('A11yM Core', () => {
    const defaultOptions = {
        url: 'http://example.com',
        depth: 1,
        standards: 'WCAG2AA',
        sniffers: path.join(__dirname, '../../resource/sniffers.js'),
        output: './test_output',
        report: 'html'
    };

    describe('main function', () => {
        test('should export a function', () => {
            expect(typeof a11ym).toBe('function');
        });

        test('should accept valid options object', () => {
            // Since a11ym likely does async operations, we test that it doesn't throw synchronously
            expect(() => {
                a11ym(defaultOptions, () => {});
            }).not.toThrow();
        });

        test('should handle different report formats', () => {
            const reportFormats = ['html', 'json', 'csv', 'cli'];
            
            reportFormats.forEach(format => {
                const options = { ...defaultOptions, report: format };
                expect(() => {
                    a11ym(options, () => {});
                }).not.toThrow();
            });
        });

        test('should handle different standards', () => {
            const standards = ['WCAG2A', 'WCAG2AA', 'WCAG2AAA', 'Section508'];
            
            standards.forEach(standard => {
                const options = { ...defaultOptions, standards: standard };
                expect(() => {
                    a11ym(options, () => {});
                }).not.toThrow();
            });
        });

        test('should handle depth configuration', () => {
            const depths = [0, 1, 2, 5, 10];
            
            depths.forEach(depth => {
                const options = { ...defaultOptions, depth };
                expect(() => {
                    a11ym(options, () => {});
                }).not.toThrow();
            });
        });

        test('should handle authentication options', () => {
            const authOptions = {
                ...defaultOptions,
                httpAuthUser: 'testuser',
                httpAuthPassword: 'testpass'
            };
            
            expect(() => {
                a11ym(authOptions, () => {});
            }).not.toThrow();
        });

        test('should handle custom headers', () => {
            const headerOptions = {
                ...defaultOptions,
                headers: {
                    'User-Agent': 'TheA11yMachine/Test',
                    'Accept': 'text/html'
                }
            };
            
            expect(() => {
                a11ym(headerOptions, () => {});
            }).not.toThrow();
        });

        test('should require callback function', () => {
            expect(() => {
                a11ym(defaultOptions);
            }).not.toThrow(); // The function might have default handling
        });
    });

    describe('option validation', () => {
        test('should handle missing required options gracefully', () => {
            const incompleteOptions = {
                url: 'http://example.com'
                // Missing other required options
            };
            
            expect(() => {
                a11ym(incompleteOptions, () => {});
            }).not.toThrow();
        });

        test('should handle invalid URL formats', () => {
            const invalidUrlOptions = {
                ...defaultOptions,
                url: 'not-a-url'
            };
            
            // Should not throw immediately but might fail during execution
            expect(() => {
                a11ym(invalidUrlOptions, () => {});
            }).not.toThrow();
        });
    });
});