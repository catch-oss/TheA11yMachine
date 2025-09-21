const path = require('path');

// Mock pa11y and related dependencies to test tester logic
jest.mock('pa11y', () => {
    return jest.fn().mockResolvedValue([]);
});

jest.mock('get-installed-path', () => ({
    getInstalledPathSync: jest.fn().mockReturnValue('/mock/pa11y/path')
}));

// Mock the built-in HTML reporter
jest.mock('../../reporter/html', () => ({
    config: jest.fn(),
    results: jest.fn()
}));

const tester = require('../../lib/tester');

describe('Tester Module', () => {
    describe('module structure', () => {
        test('should export a function', () => {
            expect(typeof tester).toBe('function');
        });
    });

    describe('tester creation with mocked dependencies', () => {
        test('should create tester with built-in HTML reporter', () => {
            const options = {
                standards: 'WCAG2AA',
                sniffers: path.join(__dirname, '../../resource/sniffers.js'),
                report: 'html'
            };
            
            expect(() => {
                const testInstance = tester(options);
                expect(typeof testInstance).toBe('function');
            }).not.toThrow();
        });

        test('should handle different standards', () => {
            const standards = ['WCAG2A', 'WCAG2AA', 'WCAG2AAA', 'HTML'];
            
            standards.forEach(standard => {
                const options = {
                    standards: standard,
                    sniffers: path.join(__dirname, '../../resource/sniffers.js'),
                    report: 'html'
                };
                
                expect(() => {
                    const testInstance = tester(options);
                    expect(typeof testInstance).toBe('function');
                }).not.toThrow();
            });
        });

        test('should handle combined standards', () => {
            const options = {
                standards: 'WCAG2AA,HTML',
                sniffers: path.join(__dirname, '../../resource/sniffers.js'),
                report: 'html'
            };
            
            expect(() => {
                const testInstance = tester(options);
                expect(typeof testInstance).toBe('function');
            }).not.toThrow();
        });

        test('should handle authentication options', () => {
            const options = {
                standards: 'WCAG2AA',
                sniffers: path.join(__dirname, '../../resource/sniffers.js'),
                report: 'html',
                httpAuthUser: 'testuser',
                httpAuthPassword: 'testpass'
            };
            
            expect(() => {
                const testInstance = tester(options);
                expect(typeof testInstance).toBe('function');
            }).not.toThrow();
        });

        test('should handle empty standards (no a11y testing)', () => {
            const options = {
                standards: '',
                sniffers: path.join(__dirname, '../../resource/sniffers.js'),
                report: 'html'
            };
            
            expect(() => {
                const testInstance = tester(options);
                expect(typeof testInstance).toBe('function');
            }).not.toThrow();
        });
    });

    describe('error level handling', () => {
        test('should accept different error levels', () => {
            const errorLevels = ['notice', 'warning', 'error'];
            
            errorLevels.forEach(level => {
                const options = {
                    standards: 'WCAG2AA',
                    sniffers: path.join(__dirname, '../../resource/sniffers.js'),
                    report: 'html',
                    errorLevel: level
                };
                
                expect(() => {
                    const testInstance = tester(options);
                    expect(typeof testInstance).toBe('function');
                }).not.toThrow();
            });
        });
    });
});