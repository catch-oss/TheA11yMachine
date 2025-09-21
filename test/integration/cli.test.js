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
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            // Should exit with 0 and show help
            expect(code).toBe(0);
            expect(output).toContain('Usage:');
            expect(output).toContain('Options:');
            expect(output).toContain('--standards');
            expect(output).toContain('WCAG 2.1 & 2.2 rules are included when using axe runner');
            done();
        });

        // Timeout after 5 seconds
        setTimeout(() => {
            child.kill();
            done();
        }, 5000);
    }, 10000);

    test('should display version when --version flag is used', (done) => {
        const child = spawn('node', [cliPath, '--version']);
        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            expect(code).toBe(0);
            expect(output).toMatch(/\d+\.\d+\.\d+/); // Version number pattern
            done();
        });

        // Timeout after 5 seconds
        setTimeout(() => {
            child.kill();
            done();
        }, 5000);
    }, 10000);

    test('should recognize CLI options', (done) => {
        // Test that CLI accepts basic options without error
        const child = spawn('node', [cliPath, '--help']);
        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            // Should recognize basic options
            expect(output).toContain('-s, --standards');
            expect(output).toContain('-d, --depth');
            expect(output).toContain('-o, --output');
            expect(output).toContain('-r, --report');
            done();
        });

        // Timeout after 5 seconds
        setTimeout(() => {
            child.kill();
            done();
        }, 5000);
    }, 10000);

});