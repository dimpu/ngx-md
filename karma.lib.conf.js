module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],

    files: [
      { pattern: "lib/base.spec.ts" },
      { pattern: "lib/**/**/*.ts" }
      // { pattern: "lib/**/*.+(ts|html)" }
    ],

    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },

    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [require("karma-typescript-angular2-transform")]
      },
      compilerOptions: {
        lib: ["ES2015", "DOM"]
      },
      exclude: ["demo"]
    },

    reporters: ["dots", "karma-typescript"],

    browsers: ["Chrome"]
  });
};
