// Shared settings for every news post created in Sveltia CMS.
export default {
  layout: "layouts/post.njk",
  eleventyComputed: {
    // Drafts are not published; file names like 2026-09-15-my-post become /news/my-post/
    permalink: (data) => (data.draft ? false : `/news/${data.page.fileSlug}/`),
  },
};
