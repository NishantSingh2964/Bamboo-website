import { defineField, defineType } from "sanity";

const productGridField = defineField({
  name: "productSelection",
  title: "Product Selection",
  type: "array",
  of: [{ type: "reference", to: [{ type: "product" }] }],
});

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
  initialValue: {
    hero: {
      heading: "Bamboo, shaped for everyday life",
      description:
        "Thoughtfully designed bamboo home essentials that bring natural beauty, durability and calm to your everyday spaces.",
      primaryCta: { label: "Shop Home Essentials", href: "/shop", variant: "primary" },
    },
  },
  fields: [
    defineField({ name: "hero", title: "Hero", type: "heroSection" }),
    defineField({ name: "featureStrip", title: "Feature Strip", type: "array", of: [{ type: "featureItem" }] }),
    defineField({ ...productGridField, name: "bestsellers", title: "Bestsellers" }),
    defineField({ name: "storyTeaser", title: "Story Teaser", type: "heroSection" }),
    defineField({ name: "testimonials", title: "Testimonials", type: "array", of: [{ type: "testimonial" }] }),
    defineField({ name: "newsletterCta", title: "Newsletter CTA", type: "heroSection" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

export const shopPage = defineType({
  name: "shopPage",
  title: "Shop Page",
  type: "document",
  preview: {
    prepare: () => ({ title: "Shop Page" }),
  },
  initialValue: {
    hero: {
      eyebrow: "Shop",
      heading: "Thoughtful bamboo for a simpler life",
      description: "Discover sustainable, handcrafted bamboo essentials for your home, kitchen and everyday moments.",
    },
  },
  fields: [
    defineField({ name: "hero", title: "Hero", type: "heroSection" }),
    defineField({ name: "featureStrip", title: "Feature Strip", type: "array", of: [{ type: "featureItem" }] }),
    defineField({ name: "resultsLabel", title: "Results Label", type: "string" }),
    defineField({ name: "emptyStateTitle", title: "Empty State Title", type: "string" }),
    defineField({ name: "emptyStateDescription", title: "Empty State Description", type: "text", rows: 2 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

export const productDetailPageSettings = defineType({
  name: "productDetailPageSettings",
  title: "Product Detail Page Settings",
  type: "document",
  preview: {
    prepare: () => ({ title: "Product Detail Page Settings" }),
  },
  initialValue: {
    relatedProductsTitle: "You may also like",
  },
  fields: [
    defineField({ name: "relatedProductsTitle", title: "Related Products Title", type: "string" }),
    defineField({ name: "reviewsTitle", title: "Reviews Title", type: "string" }),
    defineField({ name: "featureStrip", title: "Feature Strip", type: "array", of: [{ type: "featureItem" }] }),
    defineField({ name: "promiseTitle", title: "Promise Title", type: "string" }),
    defineField({ name: "promiseText", title: "Promise Text", type: "text", rows: 3 }),
  ],
});

export const cartPageSettings = defineType({
  name: "cartPageSettings",
  title: "Cart Page Settings",
  type: "document",
  preview: {
    prepare: () => ({ title: "Cart Page Settings" }),
  },
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "promoLabel", title: "Promo Label", type: "string" }),
    defineField({ name: "summaryTitle", title: "Summary Title", type: "string" }),
  ],
});

export const checkoutPageSettings = defineType({
  name: "checkoutPageSettings",
  title: "Checkout Page Settings",
  type: "document",
  preview: {
    prepare: () => ({ title: "Checkout Page Settings" }),
  },
  fields: [
    defineField({ name: "steps", title: "Steps", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "confirmation", title: "Confirmation State", type: "heroSection" }),
  ],
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
  initialValue: {
    hero: {
      eyebrow: "About VANA",
      heading: "Thoughtful home essentials for a better tomorrow.",
    },
  },
  fields: [
    defineField({ name: "hero", title: "Hero", type: "heroSection" }),
    defineField({ name: "featureStrip", title: "Feature Strip", type: "array", of: [{ type: "featureItem" }] }),
    defineField({ name: "storySection", title: "Our Story Section", type: "heroSection" }),
    defineField({ name: "valuesIntro", title: "Values Intro Copy", type: "text", rows: 3 }),
    defineField({ name: "values", title: "Values", type: "array", of: [{ type: "valueItem" }] }),
    defineField({ name: "journeyCta", title: "Join Our Journey CTA", type: "heroSection" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ Page",
  type: "document",
  preview: {
    prepare: () => ({ title: "FAQ Page" }),
  },
  fields: [
    defineField({ name: "hero", title: "Page Header", type: "heroSection" }),
    defineField({ name: "items", title: "FAQ Items", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "contactCta", title: "Contact CTA", type: "heroSection" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
  initialValue: {
    hero: {
      eyebrow: "Get in touch",
      heading: "We'd love to hear from you",
      description:
        "Have a question, feedback, or just want to say hello? Our team is here to help. Fill out the form or reach us through the details below.",
    },
  },
  fields: [
    defineField({ name: "hero", title: "Page Header", type: "heroSection" }),
    defineField({ name: "formEyebrow", title: "Form Eyebrow", type: "string" }),
    defineField({ name: "formTitle", title: "Form Title", type: "string" }),
    defineField({ name: "formIntro", title: "Form Intro", type: "text", rows: 3 }),
    defineField({ name: "detailsEyebrow", title: "Details Eyebrow", type: "string" }),
    defineField({ name: "detailsTitle", title: "Details Title", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "studioCta", title: "Visit Studio CTA", type: "heroSection" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

export const policyPage = defineType({
  name: "policyPage",
  title: "Policy Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date" }),
    defineField({ name: "sections", title: "Sections", type: "array", of: [{ type: "policySection" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
