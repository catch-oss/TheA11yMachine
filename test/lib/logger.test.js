const Logger = require('../../lib/logger');

describe('Logger', () => {
    describe('constructor', () => {
        test('should create logger with verbose option enabled', () => {
            const logger = new Logger({ verbose: true });
            expect(typeof logger.write).toBe('function');
            expect(typeof logger.error).toBe('function');
            expect(typeof logger.colorize).toBe('function');
        });

        test('should create logger with verbose option disabled', () => {
            const logger = new Logger({ verbose: false });
            expect(typeof logger.write).toBe('function');
            expect(typeof logger.error).toBe('function');
            expect(typeof logger.colorize).toBe('function');
        });

        test('should create logger with no options (defaults to non-verbose)', () => {
            const logger = new Logger();
            expect(typeof logger.write).toBe('function');
            expect(typeof logger.error).toBe('function');
            expect(typeof logger.colorize).toBe('function');
        });

        test('should create logger with empty options object', () => {
            const logger = new Logger({});
            expect(typeof logger.write).toBe('function');
            expect(typeof logger.error).toBe('function');
            expect(typeof logger.colorize).toBe('function');
        });
    });

    describe('verbose mode behavior', () => {
        test('verbose logger should have working write functions', () => {
            const logger = new Logger({ verbose: true });
            
            // Should have functions that can be called without error
            expect(typeof logger.write).toBe('function');
            expect(typeof logger.error).toBe('function');
            expect(() => logger.write('')).not.toThrow();
            expect(() => logger.error('')).not.toThrow();
        });

        test('non-verbose logger should use no-op functions', () => {
            const logger = new Logger({ verbose: false });
            
            // In non-verbose mode, should be no-op functions
            const result1 = logger.write('test');
            const result2 = logger.error('test');
            
            // No-op functions return undefined
            expect(result1).toBeUndefined();
            expect(result2).toBeUndefined();
        });
    });

    describe('colorize functionality', () => {
        test('should have chalk colorization available', () => {
            const logger = new Logger();
            
            // Should have common chalk methods
            expect(typeof logger.colorize.red).toBe('function');
            expect(typeof logger.colorize.green).toBe('function');
            expect(typeof logger.colorize.blue).toBe('function');
            expect(typeof logger.colorize.yellow).toBe('function');
        });

        test('should colorize text correctly', () => {
            const logger = new Logger();
            
            const redText = logger.colorize.red('error');
            const greenText = logger.colorize.green('success');
            
            expect(typeof redText).toBe('string');
            expect(typeof greenText).toBe('string');
            expect(redText).toContain('error');
            expect(greenText).toContain('success');
        });
    });
});