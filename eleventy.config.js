import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";

const md = markdownIt({ html: true, linkify: true, typographer: true });

export default function (eleventyConfig) {
  // Prefixes root-relative URLs with pathPrefix (needed for GitHub Pages project sites)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Static assets and the Decap CMS admin are copied as-is.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/admin/**");

  // Published news posts, newest first. Posts marked as draft are left out.
  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("src/news/posts/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date))
  );

  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));

  eleventyConfig.addFilter("limit", (items, n) => (items || []).slice(0, n));

  eleventyConfig.addFilter("without", (items, url) => (items || []).filter((item) => item.url !== url));

  eleventyConfig.addFilter("categories", (posts) => [
    ...new Set((posts || []).map((post) => post.data.category).filter(Boolean)),
  ]);

  eleventyConfig.addFilter("markdown", (text) => md.render(text || ""));

  eleventyConfig.addFilter("initials", (name) =>
    (name || "")
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0].toUpperCase())
      .slice(0, 2)
      .join("")
  );

  eleventyConfig.addFilter("slugify", (text) =>
    (text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  );

  eleventyConfig.addFilter("isActive", (pageUrl, itemUrl) =>
    itemUrl === "/" ? pageUrl === "/" : (pageUrl || "").startsWith(itemUrl)
  );

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  return {
    // On GitHub Pages the site lives under /<repo-name>/; the deploy workflow sets this.
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // .html and .md files are processed with Liquid (Eleventy's default engine)
    templateFormats: ["md", "html"],
  };
}
