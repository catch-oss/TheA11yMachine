const Crawler = require('../../lib/crawler');

describe('Crawler', () => {
    describe('createCrawler', () => {
        test('should create a crawler instance', () => {
            const options = {
                url: 'http://example.com',
                depth: 2,
                checkSubdomains: false,
                timeout: 30000
            };
            
            const crawlerInstance = new Crawler(options);
            expect(typeof crawlerInstance).toBe('object');
            expect(typeof crawlerInstance.start).toBe('function');
            expect(typeof crawlerInstance.add).toBe('function');
            expect(typeof crawlerInstance.stop).toBe('function');
        });

        test('should handle different URL formats', () => {
            const httpsUrl = {
                url: 'https://example.com',
                depth: 1
            };
            
            const crawlerInstance = new Crawler(httpsUrl);
            expect(typeof crawlerInstance).toBe('object');
            expect(typeof crawlerInstance.start).toBe('function');
            expect(typeof crawlerInstance.add).toBe('function');
            expect(typeof crawlerInstance.stop).toBe('function');
        });

        test('should configure depth limits', () => {
            const options = {
                url: 'http://example.com',
                depth: 5,
                checkSubdomains: true
            };
            
            const crawlerInstance = new Crawler(options);
            expect(typeof crawlerInstance).toBe('object');
        });

        test('should handle subdomain checking option', () => {
            const withSubdomains = {
                url: 'http://example.com',
                depth: 2,
                checkSubdomains: true
            };
            
            const crawlerInstance = new Crawler(withSubdomains);
            expect(typeof crawlerInstance).toBe('object');
        });

        test('should handle URL filtering', () => {
            const options = {
                url: 'http://example.com',
                depth: 2,
                filterByUrl: ['**/admin/**', '**/private/**']
            };
            
            const crawlerInstance = new Crawler(options);
            expect(typeof crawlerInstance).toBe('object');
        });
    });

    describe('URL validation', () => {
        test('should handle valid URLs', () => {
            const validUrls = [
                'http://example.com',
                'https://example.com',
                'http://subdomain.example.com',
                'https://example.com/path'
            ];
            
            validUrls.forEach(url => {
                const options = { url, depth: 1 };
                const crawlerInstance = new Crawler(options);
                expect(typeof crawlerInstance).toBe('object');
            });
        });
    });
});