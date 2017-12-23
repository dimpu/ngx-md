// Karma configuration
// Generated on Fri Dec 22 2017 20:34:45 GMT-0500 (EST)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "./",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      "jasmine",
      "karma-typescript"
      // "@angular/cli"
    ],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("karma-typescript"),
      require("@angular/cli/plugins/karma")
    ],
    // list of files / patterns to load in the browser
    files: [
      // zone.js
      "node_modules/zone.js/dist/zone.js",
      "node_modules/zone.js/dist/long-stack-trace-zone.js",
      "node_modules/zone.js/dist/proxy.js",
      "node_modules/zone.js/dist/sync-test.js",
      "node_modules/zone.js/dist/jasmine-patch.js",
      "node_modules/zone.js/dist/async-test.js",
      "node_modules/zone.js/dist/fake-async-test.js",

      "test.ts",

      // "test.spec.ts",
      "lib/**/*.spec.ts"
    ],

    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json" // this will get rid of all compiler error messages
    },

    // list of files to exclude
    exclude: ["demo/**/**", "node_modules"],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "lib/**/*.ts": "karma-typescript"
    },
    coverageIstanbulReporter: {
      reports: ["html", "lcovonly"],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: "dev"
    },
    reporters: ["progress", "karma-typescript", "kjhtml"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
