const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1500, "auto"],
    formats: ["avif", "webp", "png"],
    outputDir: "./public/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  console.log(metadata);

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addPassthroughCopy({ "./src/img/favicon": "/" });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
