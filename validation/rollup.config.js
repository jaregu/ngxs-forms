const resolve = require('rollup-plugin-node-resolve');

// Add here external dependencies that actually you use.
const globals = {
  'ngxs-forms': 'ngxs.forms',
};

module.exports = {
  entry: './dist/ngxs/forms/validation.es5.js',
  dest: './dist/bundles/forms-validation.umd.js',
  exports: 'named',
  plugins: [resolve()],
  external: Object.keys(globals),
  globals: globals,
  onwarn: () => { return }
}
