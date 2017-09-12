// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
const webpack = require('./webpack.config');
console.log(webpack);
delete webpack.entry;

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/**/*.ts': ['webpack'],
      './src/test.ts': ['webpack']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },

    webpack,

    webpackMiddleware: {
    },
    reporters:  ['progress', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
