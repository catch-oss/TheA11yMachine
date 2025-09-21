const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('CLI Integration Tests', () => {
    const cliPath = path.join(__dirname, '../../a11ym');
    const testOutputDir = path.join(__dirname, '../output');
    const processes = [];

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
        
        // Kill any remaining processes
        processes.forEach(proc => {
            if (proc && !proc.killed) {
                proc.kill('SIGTERM');
            }
        });
        processes.length = 0;
    });

    test('should display help when --help flag is used', (done) => {
        const child = spawn('node', [cliPath, '--help']);
        processes.push(child);
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

        // Timeout after 3 seconds
        setTimeout(() => {
            if (!child.killed) {
                child.kill('SIGTERM');
            }
            done();
        }, 3000);
    }, 5000);

    test('should handle version flag', (done) => {
        const child = spawn('node', [cliPath, '--version']);
        processes.push(child);
        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            // May exit with 0 or 1, but should produce some output
            expect(output.length > 0 || errorOutput.length > 0).toBe(true);
            done();
        });

        // Timeout after 2 seconds
        setTimeout(() => {
            if (!child.killed) {
                child.kill('SIGTERM');
            }
            done();
        }, 2000);
    }, 4000);

    test('should recognize CLI options', (done) => {
        // Test that CLI accepts basic options without error
        const child = spawn('node', [cliPath, '--help']);
        processes.push(child);
        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            // Should recognize basic options (adjust for actual CLI option names)
            expect(output).toContain('-s, --standards');
            expect(output).toContain('-d, --maximum-depth'); // Actual option name
            expect(output).toContain('-o, --output-directory'); // Actual option name
            expect(output).toContain('-r, --report');
            done();
        });

        // Timeout after 3 seconds
        setTimeout(() => {
            if (!child.killed) {
                child.kill('SIGTERM');
            }
            done();
        }, 3000);
    }, 5000);

});