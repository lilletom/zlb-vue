// Karma configuration
var webpackConfig = require("../../build/webpack.config.test");
module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],// 指定Mocha为测试框架
    // 需要将dll文件添加到入口文件的前面，否则会报错。
    files: ["../../dll/*.js", "./index.js"],
    preprocessors: {
      "./index.js": ["webpack"]
    },
    browsers: ["Chrome"],
    webpack: webpackConfig,
    // reporters中添加coverage，激活覆盖率报告生成器
    reporters: ["spec", "coverage"],
    port: 9876
  });
};