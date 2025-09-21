const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('CLI Integration Tests', () => {
    const cliPath = path.join(__dirname, '../../a11ym');
    const testOutputDir = path.join(__dirname, '../output');

    beforeEach(() => {
        // Clean up test output directory
        if (fs.existsSync(testOutputDir)) {
            fs.rmSync(testOutputDir, { recursive: true, force: true });
        }
    });

    afterEach(() => {
        // Clean up after tests
        if (fs.existsSync(testOutputDir)) {
            fs.rmSync(testOutputDir, { recursive: true, force: true });
        }
    });

    test('should display help when --help flag is used', (done) => {
        const child = spawn('node', [cliPath, '--help']);
        let output = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.on('close', (code) => {
            expect(code).toBe(0);
            expect(output).toContain('Usage:');
            expect(output).toContain('Options:');
            expect(output).toContain('--standards');
            expect(output).toContain('WCAG 2.1 & 2.2 rules are included when using axe runner');
            done();
        });
    }, 10000);

    test('should display version when --version flag is used', (done) => {
        const child = spawn('node', [cliPath, '--version']);
        let output = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.on('close', (code) => {
            expect(code).toBe(0);
            expect(output).toMatch(/\d+\.\d+\.\d+/); // Version number pattern
            done();
        });
    }, 10000);

    test('should reject invalid standards', (done) => {
        const child = spawn('node', [cliPath, 'http://example.com', '-s', 'INVALID_STANDARD']);
        let errorOutput = '';

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            expect(code).not.toBe(0);
            done();
        });
    }, 15000);

    test('should accept valid WCAG standards', (done) => {
        // Use a simple HTML string as URL to avoid network dependencies
        const testHtml = 'data:text/html,<html><head><title>Test</title></head><body><h1>Test</h1></body></html>';
        const child = spawn('node', [
            cliPath, 
            testHtml, 
            '-s', 'WCAG2AA',
            '-o', testOutputDir,
            '-d', '0' // Depth 0 to avoid crawling
        ]);
        
        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            // May fail due to data URL not being supported, but should not reject the standard
            if (errorOutput.includes('Standard must be one of')) {
                fail('Should accept WCAG2AA as valid standard');
            }
            done();
        });
    }, 20000);

    test('should handle output directory option', (done) => {
        const testHtml = 'data:text/html,<html><head><title>Test</title></head><body><h1>Test</h1></body></html>';
        const child = spawn('node', [
            cliPath,
            testHtml,
            '-o', testOutputDir,
            '-d', '0'
        ]);

        let errorOutput = '';

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            // Should not fail due to output directory option
            if (errorOutput.includes('Unknown option')) {
                fail('Should recognize output directory option');
            }
            done();
        });
    }, 15000);

    test('should handle depth option', (done) => {
        const testHtml = 'data:text/html,<html><head><title>Test</title></head><body><h1>Test</h1></body></html>';
        const child = spawn('node', [
            cliPath,
            testHtml,
            '-d', '2'
        ]);

        let errorOutput = '';

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            // Should not fail due to depth option
            if (errorOutput.includes('Unknown option')) {
                fail('Should recognize depth option');
            }
            done();
        });
    }, 15000);

    test('should handle report format option', (done) => {
        const testHtml = 'data:text/html,<html><head><title>Test</title></head><body><h1>Test</h1></body></html>';
        const child = spawn('node', [
            cliPath,
            testHtml,
            '-r', 'json',
            '-d', '0'
        ]);

        let errorOutput = '';

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            // Should not fail due to report format option
            if (errorOutput.includes('Unknown option')) {
                fail('Should recognize report format option');
            }
            done();
        });
    }, 15000);
});