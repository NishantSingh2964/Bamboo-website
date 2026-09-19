import { defineField, defineType } from "sanity";

export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
  ],
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
  ],
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "blogCategory" }] }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "relatedPosts", title: "Related Posts", type: "array", of: [{ type: "reference", to: [{ type: "blogPost" }] }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

export const journalPage = defineType({
  name: "journalPage",
  title: "Journal Page",
  type: "document",
  preview: {
    prepare: () => ({ title: "Journal Page" }),
  },
  fields: [
    defineField({ name: "hero", title: "Page Header", type: "heroSection" }),
    defineField({ name: "featuredPost", title: "Featured Post", type: "reference", to: [{ type: "blogPost" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
