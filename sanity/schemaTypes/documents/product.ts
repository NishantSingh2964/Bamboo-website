import { defineField, defineType } from "sanity";

export const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
  ],
});

export const material = defineType({
  name: "material",
  title: "Material",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Product Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "sku", title: "SKU", type: "string" }),
    defineField({ name: "price", title: "Price", type: "number" }),
    defineField({ name: "compareAtPrice", title: "Compare-at Price", type: "number" }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "productCategory" }] }),
    defineField({ name: "materials", title: "Materials", type: "array", of: [{ type: "reference", to: [{ type: "material" }] }] }),
    defineField({ name: "image", title: "Main Product Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "images", title: "Product Gallery Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({
      name: "cloudinaryImages",
      title: "Backend/Cloudinary Image References",
      description: "Store IDs or URLs from the product backend. Sanity owns copy and merchandising, not product upload.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "assetId", title: "Cloudinary Asset ID", type: "string" }),
            defineField({ name: "url", title: "Image URL", type: "url" }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "materialsCare", title: "Materials & Care", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "shippingReturns", title: "Shipping & Returns", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "relatedProducts", title: "Related Products", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] }),
    defineField({ name: "isBestseller", title: "Show as Bestseller", type: "boolean", initialValue: false }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

export const productReview = defineType({
  name: "productReview",
  title: "Product Review",
  type: "document",
  fields: [
    defineField({ name: "product", title: "Product", type: "reference", to: [{ type: "product" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "name", title: "Customer Name", type: "string" }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "quote", title: "Review", type: "text", rows: 4 }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
  ],
});
