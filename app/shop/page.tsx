import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CmsImageSlot } from "@/components/ui/cms-image-slot";
import { Container } from "@/components/ui/container";
import type { Product } from "@/lib/site-data";
import { products as fallbackProducts } from "@/lib/site-data";
import { getAllProducts, getShopPageContent, type CmsProduct } from "@/sanity/lib/content";
import { Leaf, ShieldCheck, House, Truck } from "lucide-react";

export const revalidate = 0;

const featureIcons = [Leaf, ShieldCheck, House, Truck];

const featureStrip = [
  { title: "Sustainable", text: "& Eco-Friendly" },
  { title: "Durable", text: "& Long Lasting" },
  { title: "Modern Aesthetics", text: "for Your Home" },
  { title: "Fast & Reliable", text: "Shipping" },
];

const filters = [
  {
    title: "Category",
    type: "checkbox",
    items: [
      ["Kitchen", "24"],
      ["Dining", "18"],
      ["Home Decor", "12"],
      ["Storage", "10"],
      ["Bath", "8"],
    ],
  },
  {
    title: "Price",
    type: "radio",
    items: [
      ["Under $20", "14"],
      ["$20 - $40", "22"],
      ["$40 - $60", "28"],
      ["Over $60", "12"],
    ],
  },
  {
    title: "Material",
    type: "checkbox",
    items: [
      ["Bamboo", "56"],
      ["Wood", "8"],
      ["Other", "4"],
    ],
  },
  {
    title: "Availability",
    type: "checkbox",
    items: [
      ["In stock", "52"],
      ["Pre-order", "16"],
    ],
  },
];

function cmsProductToCard(cms: CmsProduct, fallback: Product): Product & { image?: unknown } {
  const imageUrl = cms.image || cms.cloudinaryImages?.[0]?.url;
  return {
    name: cms.title ?? fallback.name,
    slug: cms.slug?.current ?? fallback.slug,
    category: cms.category?.title ?? fallback.category,
    price: typeof cms.price === "number" ? `$${cms.price.toFixed(2)}` : fallback.price,
    rating: fallback.rating,
    material: cms.materials?.[0]?.title ?? fallback.material,
    image: imageUrl,
  };
}

function ShopProductCard({ product, index }: { product: Product & { image?: unknown }; index: number }) {
  const badge = index === 0 || index === 7 || index === 10 ? "New" : index === 5 || index === 9 ? "Sale" : null;
  const reviewCount = index === 0 ? 124 : Math.max(10, 98 - index * 7);

  return (
    <article className="group overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-[#f5f0e8]">
          {badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-white">
              {badge}
            </span>
          )}
          <CmsImageSlot
            image={product.image}
            alt={product.name}
            label="Product image"
            className="aspect-square min-h-0 rounded-none border-0 bg-[linear-gradient(135deg,#f8efe3,#fffaf1_52%,#e3d4bd)] text-primary/35"
            imageClassName="h-full w-full object-cover object-center"
          />
        </div>
        <div className="px-3 py-3">
          <h2 className="text-xs font-semibold leading-snug text-text group-hover:text-primary">
            {product.name}
          </h2>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="flex text-amber-400">
              {"★★★★"}
              <span className="text-amber-200">{"★"}</span>
            </span>
            <span className="text-xs text-muted">({reviewCount})</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs font-bold text-text">{product.price}</p>
            <button
              className="grid h-7 w-7 place-items-center rounded-md border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-white"
              aria-label={`Add ${product.name} to cart`}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default async function ShopPage() {
  const [content, cmsProducts] = await Promise.all([getShopPageContent(), getAllProducts()]);
  const hero = content?.hero;
  const featureItems = content?.featureStrip?.length
    ? content.featureStrip.map((item) => ({ title: item.title ?? "", text: item.description ?? "" }))
    : featureStrip;

  const displayProducts = cmsProducts?.length
    ? cmsProducts.map((cms, idx) => cmsProductToCard(cms, fallbackProducts[idx % fallbackProducts.length]))
    : fallbackProducts;

  return (
    <>
      <Navbar />
      <main className="bg-cream">
        <section className="relative overflow-hidden bg-cream border-b border-primary/10 min-h-[360px] lg:min-h-[420px] flex items-center">
          {/* Full Background Image */}
          <CmsImageSlot
            image={hero?.image}
            alt={hero?.heading ?? "Shop"}
            label="Shop hero image from CMS"
            className="absolute inset-0 h-full w-full rounded-none border-0"
            imageClassName="h-full w-full object-cover object-center"
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/60 to-transparent max-w-3xl" />
          <div className="absolute inset-0 bg-cream/5" />

          {/* Text Content */}
          <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="max-w-xl">
              <p className="mb-3 text-sm font-semibold text-primary">{hero?.eyebrow ?? "Shop"}</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-text">
                {hero?.heading ?? "Thoughtful bamboo for a simpler life"}
              </h1>
              <p className="mt-5 text-base sm:text-lg leading-8 text-muted">
                {hero?.description ??
                  "Discover sustainable, handcrafted bamboo essentials for your home, kitchen and everyday moments."}
              </p>
            </div>
          </Container>
        </section>

        <section className="border-y border-primary/10 bg-leaf/70">
          <Container className="grid py-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureItems.map((item, index) => {
              const IconComponent = featureIcons[index % featureIcons.length];
              return (
                <div
                  className="flex items-center gap-4 px-6 py-3 lg:border-r lg:border-primary/20 last:lg:border-r-0"
                  key={item.title}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-primary">
                    <IconComponent className="h-14 w-14 stroke-[1.3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{item.title}</p>
                    <p className="text-sm text-text/80">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </Container>
        </section>

        <Container className="grid gap-8 py-12 lg:grid-cols-[200px_1fr]">
          <aside className="h-fit lg:sticky lg:top-28">
            {/* Filter Panel */}
            <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-primary/10 bg-leaf/30 px-4 py-3.5">
                <h2 className="font-serif text-base font-semibold text-text">Filters</h2>
                <button
                  className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
                  type="button"
                >
                  Clear
                </button>
              </div>

              {/* Filter Groups */}
              <div className="divide-y divide-primary/8">
                {filters.map((group) => (
                  <details className="group" key={group.title} open>
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-sm font-semibold text-text transition-colors hover:bg-leaf/20 select-none">
                      {group.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-primary transition-transform duration-200 group-open:rotate-180"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </summary>
                    <div className="space-y-2.5 px-4 pb-4 pt-2">
                      {group.items.map(([label, count], itemIndex) => (
                        <label
                          className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-xs text-muted transition-colors hover:bg-leaf/20"
                          key={label}
                        >
                          <span className="flex items-center gap-2.5">
                            <input
                              className="h-3.5 w-3.5 rounded border-primary/30 accent-primary"
                              name={group.title}
                              type={group.type}
                              defaultChecked={group.title === "Price" && itemIndex === 1}
                            />
                            <span className="text-text/80">{label}</span>
                          </span>
                          <span className="text-[10px] text-muted/60">({count})</span>
                        </label>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <p className="text-base text-muted">{content?.resultsLabel ?? `Showing 1-${displayProducts.length} of ${displayProducts.length} products`}</p>
              <div className="flex items-center gap-3">
                <select className="h-12 w-full rounded-md border border-primary/15 bg-white px-4 text-sm text-text md:w-56">
                  <option>Sort by: Featured</option>
                  <option>Newest</option>
                  <option>Price: Low to high</option>
                  <option>Price: High to low</option>
                </select>
                <button className="grid h-12 w-12 place-items-center rounded-md bg-primary text-white" type="button" aria-label="Grid view">
                  Grid
                </button>
                <button className="grid h-12 w-12 place-items-center rounded-md border border-primary/15 bg-white text-primary" type="button" aria-label="List view">
                  List
                </button>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {displayProducts.map((product, index) => (
                <ShopProductCard index={index} key={product.slug} product={product} />
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-3">
              <button className="grid h-10 w-10 place-items-center rounded-md border border-primary/15 bg-white text-primary" type="button">
                {"<"}
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  className={
                    page === 1
                      ? "grid h-10 w-10 place-items-center rounded-md bg-primary text-white"
                      : "grid h-10 w-10 place-items-center rounded-md text-text hover:bg-leaf"
                  }
                  key={page}
                  type="button"
                >
                  {page}
                </button>
              ))}
              <button className="grid h-10 w-10 place-items-center rounded-md border border-primary/15 bg-white text-primary" type="button">
                {">"}
              </button>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
