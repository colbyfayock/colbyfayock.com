const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssReporter = require('postcss-reporter');

module.exports = () => ({
  plugins: [
    postcssImport(),
    postcssPresetEnv(),
    postcssBrowserReporter(),
    postcssReporter(),
  ],
});