import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string", initialValue: "VANA" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [{ type: "buttonLink" }],
    }),
    defineField({
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "links", title: "Links", type: "array", of: [{ type: "buttonLink" }] }),
          ],
        },
      ],
    }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "seo", title: "Default SEO", type: "seo" }),
  ],
});
