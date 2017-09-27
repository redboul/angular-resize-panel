// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
const webpack = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['webpack', 'sourcemap']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    webpack,

    webpackMiddleware: {
    },
    reporters:  ['progress', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
