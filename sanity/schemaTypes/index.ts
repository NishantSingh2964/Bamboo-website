import { type SchemaTypeDefinition } from "sanity";
import { author, blogCategory, blogPost, journalPage } from "./documents/blog";
import { faqCategory } from "./documents/faq";
import {
  aboutPage,
  cartPageSettings,
  checkoutPageSettings,
  contactPage,
  faqPage,
  homePage,
  policyPage,
  productDetailPageSettings,
  shopPage,
} from "./documents/pages";
import { material, product, productCategory, productReview } from "./documents/product";
import { siteSettings } from "./documents/settings";
import { buttonLink, faqItem, featureItem, heroSection, policySection, seo, testimonial, valueItem } from "./objects/shared";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    buttonLink,
    heroSection,
    featureItem,
    valueItem,
    testimonial,
    faqItem,
    policySection,
    siteSettings,
    productCategory,
    material,
    product,
    productReview,
    blogCategory,
    author,
    blogPost,
    journalPage,
    faqCategory,
    homePage,
    shopPage,
    productDetailPageSettings,
    cartPageSettings,
    checkoutPageSettings,
    aboutPage,
    faqPage,
    contactPage,
    policyPage,
  ],
};
