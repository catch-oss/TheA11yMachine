// Exists only so babel-jest can transpile the ESM-only dependencies that jest
// cannot parse - @puppeteer/browsers 3.x, reached through pa11y's puppeteer.
// Nothing in lib/ or bin/ is affected at runtime; this is test-time only.
//
// sourceType: 'unambiguous' asks babel to decide per file - anything using
// import/export is a module, everything else stays a CommonJS script and keeps
// its `this` and `require` semantics. The default ('module') would rewrite the
// project's own CommonJS files too.
module.exports = {
  sourceType: 'unambiguous',
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
};
