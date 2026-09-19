export type Product = {
  name: string;
  slug: string;
  category: string;
  price: string;
  rating: string;
  material: string;
};

export const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const products: Product[] = [
  { name: "Bamboo Mug", slug: "bamboo-mug", category: "Kitchen", price: "$24.00", rating: "4.8", material: "Bamboo" },
  { name: "Serving Bowl", slug: "serving-bowl", category: "Dining", price: "$42.00", rating: "4.9", material: "Bamboo" },
  { name: "Cutting Board", slug: "cutting-board", category: "Kitchen", price: "$36.00", rating: "4.7", material: "Bamboo" },
  { name: "Utensil Set", slug: "utensil-set", category: "Kitchen", price: "$28.00", rating: "4.8", material: "Bamboo" },
  { name: "Storage Jar", slug: "storage-jar", category: "Storage", price: "$32.00", rating: "4.8", material: "Bamboo + Glass" },
  { name: "Plate Set", slug: "plate-set", category: "Dining", price: "$84.00", rating: "4.7", material: "Bamboo" },
];

export const posts = [
  {
    title: "The Ultimate Guide to Caring for Your Bamboo Homeware",
    slug: "care-for-bamboo-homeware",
    date: "April 12, 2026",
    category: "Care Guides",
  },
  { title: "How to Clean Bamboo Products", slug: "how-to-clean-bamboo-products", date: "April 18, 2026", category: "Care Guides" },
  { title: "Behind the Scenes of Our Finish", slug: "behind-the-scenes-finish", date: "May 2, 2026", category: "Behind the Scenes" },
  { title: "Our Sourcing Journey", slug: "our-sourcing-journey", date: "May 11, 2026", category: "Sustainability" },
  { title: "5 Ways to Style Bamboo in Your Home", slug: "style-bamboo-home", date: "May 26, 2026", category: "Home" },
  { title: "Small Changes, Big Impact", slug: "small-changes-big-impact", date: "June 4, 2026", category: "Sustainability" },
];

export const footerGroups = [
  { title: "Shop", links: ["All Products", "Bestsellers", "New Arrivals", "Sale"] },
  { title: "Our Company", links: ["Our Story", "Journal", "Testimonials", "FAQs"] },
  { title: "Help", links: ["Shipping & Returns", "Contact", "Terms & Privacy"] },
];

export const faqs = [
  { question: "How can I place an order?", answer: "Choose your items, add them to cart, and proceed through checkout." },
  { question: "Can I change or cancel my order?", answer: "Contact us as soon as possible. We can help before the order ships." },
  { question: "When will my order ship?", answer: "Most orders leave our studio within 1-2 business days." },
  { question: "Do you offer international shipping?", answer: "International shipping can be enabled by region from the admin setup." },
  { question: "How do I care for my bamboo products?", answer: "Wash gently by hand, dry fully, and avoid soaking for long periods." },
];
