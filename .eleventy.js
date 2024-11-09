import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import Image from "@11ty/eleventy-img";

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [600, 900, 1500],
    formats: ["avif", "webp", "png"],
    outputDir: "./public/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addPassthroughCopy({ "./src/img/favicon": "/" });
  eleventyConfig.addPassthroughCopy("./CNAME");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
