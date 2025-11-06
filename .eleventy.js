import postcssPlugin from "@jgarber/eleventy-plugin-postcss";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import Image from "@11ty/eleventy-img";

async function imageShortcode(src, alt, sizes, classname) {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1500],
    formats: ["avif", "webp", "png"],
    outputDir: "./public/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: classname,
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addPassthroughCopy({ "./src/img/favicon": "/" });
  eleventyConfig.addPassthroughCopy({ "./src/img/ref": "/ref" });
  eleventyConfig.addPassthroughCopy({ "./src/img/sig": "/sig" });
  eleventyConfig.addPassthroughCopy({ "./src/img/gif": "/img/gif" });
  eleventyConfig.addPassthroughCopy("./CNAME");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(postcssPlugin);

  /**
   * No-code icons, using Iconify api
   * @docs https://iconify.design/docs/usage/css/no-code/
   * @docs https://icon-sets.iconify.design/?keyword=ion
   *
   * 1. default theme is "ion", change it to any othcer theme at icon-sets.iconify.design
   * 2. explictly list the icons you want to use. this helps save bandwidth and forces you to be intentional about which icons are loaded
   */
  eleventyConfig.addGlobalData("iconBrands", {
    theme: "fa6-brands",
    list: [
      "youtube",
      "twitter",
      "bluesky",
      "twitch",
      "spotify",
      "instagram",
      "tiktok",
    ],
    get url() {
      const iconListParam = encodeURIComponent(this.list.join(","));
      return `https://api.iconify.design/${this.theme}.css?icons=${iconListParam}`;
    },
  });
  eleventyConfig.addGlobalData("icon", {
    theme: "fa6-solid",
    list: ["envelope"],
    get url() {
      const iconListParam = encodeURIComponent(this.list.join(","));
      return `https://api.iconify.design/${this.theme}.css?icons=${iconListParam}`;
    },
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
