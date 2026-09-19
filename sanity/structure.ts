import type { StructureBuilder } from "sanity/structure";

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "shopPage",
  "productDetailPageSettings",
  "cartPageSettings",
  "checkoutPageSettings",
  "aboutPage",
  "journalPage",
  "faqPage",
  "contactPage",
]);

const singletonItem = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title));

const documentTypeListItem = (S: StructureBuilder, type: string, title: string) =>
  S.listItem().title(title).schemaType(type).child(S.documentTypeList(type).title(title));

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("VANA Content")
    .items([
      S.listItem()
        .title("Global")
        .child(
          S.list()
            .title("Global")
            .items([
              singletonItem(S, "siteSettings", "Site Settings"),
              singletonItem(S, "productDetailPageSettings", "Product Detail Settings"),
              singletonItem(S, "cartPageSettings", "Cart Settings"),
              singletonItem(S, "checkoutPageSettings", "Checkout Settings"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singletonItem(S, "homePage", "Home Page"),
              singletonItem(S, "shopPage", "Shop Page"),
              singletonItem(S, "aboutPage", "About Page"),
              singletonItem(S, "journalPage", "Journal Page"),
              singletonItem(S, "faqPage", "FAQ Page"),
              singletonItem(S, "contactPage", "Contact Page"),
              documentTypeListItem(S, "policyPage", "Policy Pages"),
            ]),
        ),
      S.listItem()
        .title("Products")
        .child(
          S.list()
            .title("Products")
            .items([
              documentTypeListItem(S, "product", "Products"),
              documentTypeListItem(S, "productCategory", "Categories"),
              documentTypeListItem(S, "material", "Materials"),
              documentTypeListItem(S, "productReview", "Reviews"),
            ]),
        ),
      S.listItem()
        .title("Journal")
        .child(
          S.list()
            .title("Journal")
            .items([
              documentTypeListItem(S, "blogPost", "Blog Posts"),
              documentTypeListItem(S, "blogCategory", "Blog Categories"),
              documentTypeListItem(S, "author", "Authors"),
            ]),
        ),
      S.listItem()
        .title("Support")
        .child(
          S.list()
            .title("Support")
            .items([documentTypeListItem(S, "faqCategory", "FAQ Categories"), documentTypeListItem(S, "policyPage", "Policy Pages")]),
        ),
    ]);
