// Basic smoke tests for core modules
describe('Core Modules', () => {
    test('crawler module can be imported', () => {
        const Crawler = require('../../lib/crawler');
        expect(typeof Crawler).toBe('function');
    });

    test('tester module can be imported', () => {
        const tester = require('../../lib/tester');
        expect(typeof tester).toBe('function');
    });

    test('a11ym module can be imported', () => {
        const a11ym = require('../../lib/a11ym');
        expect(typeof a11ym).toBe('object');
        expect(a11ym).toBeDefined();
    });

    test('logger module can be imported', () => {
        const Logger = require('../../lib/logger');
        expect(typeof Logger).toBe('function');
    });
});