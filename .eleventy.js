const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("webmentions.js");
  eleventyConfig.addPassthroughCopy("events.js");
  eleventyConfig.addFilter("regularDate", function(value) { 
    return new Date(value).toLocaleString('en-US', { timeZone: 'America/New_York', timeStyle: "short", dateStyle: "long" }).split(" at")[0] 
   });

  eleventyConfig.addShortcode("ISOdate", function () {
    return new Date().toISOString();
  });
  eleventyConfig.addFilter("rssbody", function (value) {
    return value.replaceAll("<body>", "").replaceAll("</body>", "");
  });

  eleventyConfig.addFilter("description", function (value) {
    return value.split("\n").slice(4).join("\n");
  });
  eleventyConfig.addFilter("toISOString", function (value) {
    return new Date(value).toISOString();
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      });
    }

    return content;
  });
  eleventyConfig.addTransform("cssmin", function (content, outputPath) {
    if (outputPath.endsWith(".css")) {
      return new CleanCSS({}).minify(content);
    }
    return content;
  });
  require("./imageResolve.js");
};
