import { readFileSync } from "node:fs";
import { createClient } from "next-sanity";

function loadEnv() {
  const env = readFileSync(".env", "utf8");
  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index);
    const value = trimmed.slice(index + 1);
    process.env[key] = process.env[key] ?? value;
  }
}

loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const featureStrip = [
  { _key: "sustainable", title: "Sustainable", description: "& Eco-Friendly", iconName: "leaf" },
  { _key: "durable", title: "Durable", description: "& Long Lasting", iconName: "shield" },
  { _key: "modern", title: "Modern Aesthetics", description: "for Your Home", iconName: "home" },
  { _key: "shipping", title: "Fast & Reliable", description: "Shipping", iconName: "truck" },
];

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "VANA",
    tagline: "Bamboo Homeware",
    contactEmail: "hello@vanahomeware.com",
    contactPhone: "+91 98765 43210",
    address: "123 Green Valley Road, Jaipur, Rajasthan 302017, India",
    navigation: [
      { _key: "shop", label: "Shop", href: "/shop", variant: "ghost" },
      { _key: "story", label: "Our Story", href: "/about", variant: "ghost" },
      { _key: "journal", label: "Journal", href: "/journal", variant: "ghost" },
      { _key: "contact", label: "Contact", href: "/contact", variant: "ghost" },
    ],
    seo: {
      title: "VANA Bamboo Homeware",
      description: "Thoughtful bamboo homeware for slower, better everyday rituals.",
    },
  },
  {
    _id: "homePage",
    _type: "homePage",
    hero: {
      eyebrow: "Bamboo Homeware",
      heading: "Bamboo, shaped for everyday life",
      description:
        "Thoughtfully designed bamboo home essentials that bring natural beauty, durability and calm to your everyday spaces.",
      primaryCta: { label: "Shop Home Essentials", href: "/shop", variant: "primary" },
    },
    featureStrip,
    storyTeaser: {
      eyebrow: "Our Story",
      heading: "Pure by design, Kind to the planet.",
      description:
        "At VANA, we believe in a simpler, greener tomorrow. Our bamboo homeware is crafted with care, combining natural materials, timeless design and a commitment to a more sustainable lifestyle.",
      primaryCta: { label: "Learn More", href: "/about", variant: "secondary" },
    },
    testimonials: [
      {
        _key: "priya",
        quote:
          "Beautiful quality and so well made! The bamboo mug is now my everyday favorite. It feels natural, looks stunning and is super durable.",
        name: "Priya S.",
        rating: 5,
      },
      {
        _key: "arjun",
        quote:
          "I love how minimal and elegant everything looks. The storage canisters are perfect for my kitchen. Great quality and fast shipping too!",
        name: "Arjun M.",
        rating: 5,
      },
      {
        _key: "neha",
        quote:
          "Finally, home essentials that are both stylish and sustainable. The cutting board is my absolute favorite. Highly recommend VANA!",
        name: "Neha T.",
        rating: 5,
      },
    ],
    newsletterCta: {
      eyebrow: "Our Promise",
      heading: "A greener home, a brighter future.",
      description: "Sustainable bamboo. Thoughtfully designed. Made for everyday life.",
      primaryCta: { label: "Shop Now", href: "/shop", variant: "primary" },
    },
  },
  {
    _id: "shopPage",
    _type: "shopPage",
    hero: {
      eyebrow: "Shop",
      heading: "Thoughtful bamboo for a simpler life",
      description: "Discover sustainable, handcrafted bamboo essentials for your home, kitchen and everyday moments.",
      primaryCta: { label: "Shop Home Essentials", href: "/shop", variant: "primary" },
    },
    featureStrip,
    resultsLabel: "Showing 1-12 of 68 products",
    emptyStateTitle: "No products match your filters",
    emptyStateDescription: "Try adjusting your filters or clear them all.",
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    hero: {
      eyebrow: "About VANA",
      heading: "Thoughtful home essentials for a better tomorrow.",
      description:
        "At VANA, we believe that everyday objects should do more, for your home, for your well-being, and for the planet. Our bamboo homeware is designed to bring natural beauty, sustainable living and lasting quality into your everyday life.",
      primaryCta: { label: "Shop Our Collection", href: "/shop", variant: "primary" },
    },
    featureStrip,
    storySection: {
      eyebrow: "Our Story",
      heading: "From a simple idea to a sustainable home.",
      description:
        "VANA was born from a simple belief, that small changes make a big difference. We set out to create beautiful, functional home essentials made from bamboo, a renewable and versatile material that helps reduce our environmental footprint.",
    },
    valuesIntro:
      "At VANA, our values shape everything we do, from the materials we choose to the products we create. We are committed to making home essentials that are good for you, and kinder to the planet.",
    values: [
      {
        _key: "sustainability",
        title: "Sustainability First",
        description: "We choose renewable materials and eco-friendly practices to protect our planet.",
        iconName: "leaf",
      },
      {
        _key: "quality",
        title: "Quality Always",
        description: "Thoughtful design and simple, durable construction for everyday use.",
        iconName: "heart",
      },
      {
        _key: "community",
        title: "People & Community",
        description: "We support fair practices and work with partners who share our values.",
        iconName: "users",
      },
      {
        _key: "future",
        title: "A Greener Future",
        description: "Because a more sustainable home today means a healthier planet tomorrow.",
        iconName: "globe",
      },
    ],
    journeyCta: {
      heading: "Join our journey",
      description:
        "Be part of a growing community that values sustainable living, thoughtful design and a healthier planet.",
      primaryCta: { label: "Shop Our Collection", href: "/shop", variant: "primary" },
    },
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    hero: {
      eyebrow: "Get in touch",
      heading: "We'd love to hear from you",
      description:
        "Have a question, feedback, or just want to say hello? Our team is here to help. Fill out the form or reach us through the details below.",
    },
    formEyebrow: "Send us a message",
    formTitle: "Let's talk",
    formIntro:
      "Whether you have a question about our products, need help with an order, or just want to share your thoughts, we're all ears.",
    detailsEyebrow: "Other ways to reach us",
    detailsTitle: "Contact Details",
    email: "hello@vanahomeware.com",
    phone: "+91 98765 43210",
    address: "123 Green Valley Road, Jaipur, Rajasthan 302017, India",
    studioCta: {
      heading: "Visit Our Studio",
      description:
        "We'd love to welcome you to our space. Come explore our collection and learn more about our bamboo journey.",
      primaryCta: { label: "Plan a visit", href: "/contact", variant: "ghost" },
    },
  },
  {
    _id: "productDetailPageSettings",
    _type: "productDetailPageSettings",
    relatedProductsTitle: "You may also like",
    reviewsTitle: "Reviews",
    featureStrip,
    promiseTitle: "Our Promise",
    promiseText:
      "We believe in creating beautiful, functional products that are kind to the planet. Every piece from VANA is designed with sustainability at its core.",
  },
  {
    _id: "cartPageSettings",
    _type: "cartPageSettings",
    title: "Your Cart",
    promoLabel: "Promo code",
    summaryTitle: "Order Summary",
  },
  {
    _id: "checkoutPageSettings",
    _type: "checkoutPageSettings",
    steps: ["Shipping", "Payment", "Review"],
    confirmation: {
      heading: "Your order is confirmed",
      description: "We sent a confirmation email with your order details and next steps.",
      primaryCta: { label: "Continue Shopping", href: "/shop", variant: "primary" },
    },
  },
  {
    _id: "journalPage",
    _type: "journalPage",
    hero: {
      eyebrow: "Journal",
      heading: "Care guides, sustainability notes, and behind-the-scenes.",
      description: "Explore ideas for a slower, greener home.",
    },
  },
  {
    _id: "faqPage",
    _type: "faqPage",
    hero: {
      eyebrow: "FAQ",
      heading: "FAQ",
      description: "Find answers to common questions about our products, orders, and care.",
    },
    contactCta: {
      heading: "Still have questions?",
      description: "Reach out and we'll help.",
      primaryCta: { label: "Contact Us", href: "/contact", variant: "secondary" },
    },
  },
];

const tx = client.transaction();

for (const doc of docs) {
  tx.createIfNotExists(doc).patch(doc._id, (patch) => patch.setIfMissing(doc));
}

await tx.commit({ visibility: "sync" });

console.log(`Seeded ${docs.length} Sanity singleton documents without replacing existing images.`);
