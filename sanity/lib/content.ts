import { client } from "@/sanity/lib/client";

export type CmsButton = {
  label?: string;
  href?: string;
  variant?: string;
};

export type CmsHero = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  image?: unknown;
  primaryCta?: CmsButton;
};

export type CmsFeature = {
  title?: string;
  description?: string;
};

export type CmsTestimonial = {
  quote?: string;
  name?: string;
  rating?: number;
};

export type CmsValue = {
  title?: string;
  description?: string;
};

export type CmsProduct = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  price?: number;
  compareAtPrice?: number;
  shortDescription?: string;
  image?: unknown;
  images?: unknown[];
  cloudinaryImages?: Array<{ url?: string; alt?: string }>;
  isBestseller?: boolean;
  category?: { title?: string };
  materials?: Array<{ title?: string }>;
  relatedProducts?: CmsProduct[];
};

export type CmsBlogPost = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  excerpt?: string;
  mainImage?: unknown;
  category?: { title?: string };
  author?: { name?: string; image?: unknown };
};

export type HomePageContent = {
  hero?: CmsHero;
  featureStrip?: CmsFeature[];
  storyTeaser?: CmsHero;
  testimonials?: CmsTestimonial[];
  newsletterCta?: CmsHero;
};

export type ShopPageContent = {
  hero?: CmsHero;
  featureStrip?: CmsFeature[];
  resultsLabel?: string;
};

export type AboutPageContent = {
  hero?: CmsHero;
  featureStrip?: CmsFeature[];
  storySection?: CmsHero;
  valuesIntro?: string;
  values?: CmsValue[];
  journeyCta?: CmsHero;
};

export type ProductDetailSettings = {
  relatedProductsTitle?: string;
  featureStrip?: CmsFeature[];
  promiseTitle?: string;
  promiseText?: string;
};

export type ContactPageContent = {
  hero?: CmsHero;
  formEyebrow?: string;
  formTitle?: string;
  formIntro?: string;
  detailsEyebrow?: string;
  detailsTitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  studioCta?: CmsHero;
};

export async function getHomePageContent(): Promise<HomePageContent | null> {
  try {
    return await client.fetch<HomePageContent | null>(
      `*[_type == "homePage"] | order(_updatedAt desc)[0]{
        hero,
        featureStrip,
        storyTeaser,
        testimonials,
        newsletterCta
      }`,
    );
  } catch (error) {
    console.warn("Sanity fetch error (homePage):", error);
    return null;
  }
}

export async function getShopPageContent(): Promise<ShopPageContent | null> {
  try {
    return await client.fetch<ShopPageContent | null>(
      `*[_type == "shopPage"] | order(_updatedAt desc)[0]{
        hero,
        featureStrip,
        resultsLabel
      }`,
    );
  } catch (error) {
    console.warn("Sanity fetch error (shopPage):", error);
    return null;
  }
}

export async function getAboutPageContent(): Promise<AboutPageContent | null> {
  try {
    return await client.fetch<AboutPageContent | null>(
      `*[_type == "aboutPage"] | order(_updatedAt desc)[0]{
        hero,
        featureStrip,
        storySection,
        valuesIntro,
        values,
        journeyCta
      }`,
    );
  } catch (error) {
    console.warn("Sanity fetch error (aboutPage):", error);
    return null;
  }
}

export async function getProductDetailSettings(): Promise<ProductDetailSettings | null> {
  try {
    return await client.fetch<ProductDetailSettings | null>(
      `*[_type == "productDetailPageSettings"] | order(_updatedAt desc)[0]{
        relatedProductsTitle,
        featureStrip,
        promiseTitle,
        promiseText
      }`,
    );
  } catch (error) {
    console.warn("Sanity fetch error (productDetailPageSettings):", error);
    return null;
  }
}

export async function getContactPageContent(): Promise<ContactPageContent | null> {
  try {
    return await client.fetch<ContactPageContent | null>(
      `*[_type == "contactPage"] | order(_updatedAt desc)[0]{
        hero,
        formEyebrow,
        formTitle,
        formIntro,
        detailsEyebrow,
        detailsTitle,
        email,
        phone,
        address,
        studioCta
      }`,
    );
  } catch (error) {
    console.warn("Sanity fetch error (contactPage):", error);
    return null;
  }
}

export async function getAllProducts(): Promise<CmsProduct[]> {
  try {
    const res = await client.fetch<CmsProduct[] | null>(
      `*[_type == "product"] | order(_createdAt desc){
        _id,
        title,
        slug,
        price,
        compareAtPrice,
        shortDescription,
        image,
        images,
        cloudinaryImages,
        isBestseller,
        category->{title},
        materials[]->{title}
      }`,
    );
    return res ?? [];
  } catch (error) {
    console.warn("Sanity fetch error (getAllProducts):", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<CmsProduct | null> {
  try {
    return await client.fetch<CmsProduct | null>(
      `*[_type == "product" && slug.current == $slug] | order(_updatedAt desc)[0]{
        _id,
        title,
        slug,
        price,
        compareAtPrice,
        shortDescription,
        image,
        images,
        cloudinaryImages,
        isBestseller,
        category->{title},
        materials[]->{title},
        relatedProducts[]->{_id, title, slug, price, shortDescription, image, category->{title}}
      }`,
      { slug },
    );
  } catch (error) {
    console.warn(`Sanity fetch error (getProductBySlug - ${slug}):`, error);
    return null;
  }
}

export async function getBlogPosts(): Promise<CmsBlogPost[]> {
  try {
    const res = await client.fetch<CmsBlogPost[] | null>(
      `*[_type == "blogPost"] | order(publishedAt desc){
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        category->{title},
        author->{name, image}
      }`,
    );
    return res ?? [];
  } catch (error) {
    console.warn("Sanity fetch error (getBlogPosts):", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<CmsBlogPost | null> {
  try {
    return await client.fetch<CmsBlogPost | null>(
      `*[_type == "blogPost" && slug.current == $slug] | order(_updatedAt desc)[0]{
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        category->{title},
        author->{name, image}
      }`,
      { slug },
    );
  } catch (error) {
    console.warn(`Sanity fetch error (getBlogPostBySlug - ${slug}):`, error);
    return null;
  }
}
