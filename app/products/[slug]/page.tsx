import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { CmsImageSlot } from "@/components/ui/cms-image-slot";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import type { Product } from "@/lib/site-data";
import { products } from "@/lib/site-data";
import { getProductBySlug, getProductDetailSettings, type CmsProduct } from "@/sanity/lib/content";
import { Leaf, ShieldCheck, Home, Truck, ArrowRight } from "lucide-react";

export const revalidate = 0;

const featureIcons = [Leaf, ShieldCheck, Home, Truck];

const featureStrip = [
  { title: "Sustainable", text: "& Eco-Friendly" },
  { title: "Durable", text: "& Long Lasting" },
  { title: "Modern Aesthetics", text: "for Your Home" },
  { title: "Fast & Reliable", text: "Shipping" },
];

const productBenefits = [
  { title: "100% Natural", text: "Bamboo" },
  { title: "Eco-Friendly", text: "& Sustainable" },
  { title: "Free Shipping", text: "on Orders $50+" },
];

const details = [
  "Made from 100% sustainable bamboo",
  "Lightweight and easy to carry",
  "Naturally antibacterial",
  "Durable and long-lasting",
  "Perfect for hot and cold beverages",
];

function RelatedProductCard({ product, index }: { product: Product & { image?: unknown }; index: number }) {
  return (
    <article className="group overflow-hidden rounded-md border border-primary/10 bg-white shadow-[0_16px_42px_rgba(47,82,51,0.05)]">
      <Link href={`/products/${product.slug}`} className="block">
        <CmsImageSlot
          image={product.image}
          alt={product.name}
          label="Product image"
          className="aspect-[1.18] min-h-0 rounded-none border-0 bg-[linear-gradient(135deg,#f8efe3,#fffaf1_52%,#e3d4bd)] text-primary/35"
        />
        <div className="p-4">
          <h3 className="font-serif text-lg text-text group-hover:text-primary">{product.name}</h3>
          <p className="mt-2 text-xs text-accent">
            ***** <span className="text-muted">({76 - index * 7})</span>
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-bold text-primary">{product.price}</p>
            <button
              aria-label={`Add ${product.name} to cart`}
              className="grid h-9 w-9 place-items-center rounded-full border border-primary/15 text-primary hover:bg-primary hover:text-white"
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}

function formatPrice(price?: number) {
  return typeof price === "number" ? `$${price.toFixed(2)}` : undefined;
}

function cmsProductToCard(product: CmsProduct, fallback: Product): Product & { image?: unknown } {
  const image = product.image || product.cloudinaryImages?.[0]?.url;
  return {
    name: product.title ?? fallback.name,
    slug: product.slug?.current ?? fallback.slug,
    category: product.category?.title ?? fallback.category,
    price: formatPrice(product.price) ?? fallback.price,
    rating: fallback.rating,
    material: product.materials?.[0]?.title ?? fallback.material,
    image,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cmsProduct, settings] = await Promise.all([getProductBySlug(slug), getProductDetailSettings()]);
  const product = cmsProductToCard(cmsProduct ?? {}, { ...products[0], price: "$20.00" });
  const related = cmsProduct?.relatedProducts?.length
    ? cmsProduct.relatedProducts.map((item, index) => cmsProductToCard(item, products[index + 1] ?? products[0]))
    : [products[1], products[2], products[3], products[5], products[4]];
  const featureItems = settings?.featureStrip?.length
    ? settings.featureStrip.map((item) => ({ title: item.title ?? "", text: item.description ?? "" }))
    : featureStrip;

  const mainProductImage = cmsProduct?.image || cmsProduct?.cloudinaryImages?.[0]?.url;

  return (
    <>
      <Navbar />
      <main className="bg-cream">
        <Container className="py-6">
          <nav className="flex items-center gap-3 text-sm text-primary">
            <Link href="/">Home</Link>
            <span>{">"}</span>
            <Link href="/shop">Shop</Link>
            <span>{">"}</span>
            <span className="text-text">{product.name}</span>
          </nav>
        </Container>

        <section>
          <Container className="grid gap-12 pb-16 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="grid gap-5 md:grid-cols-[88px_1fr]">
              <div className="grid grid-cols-5 gap-3 md:grid-cols-1">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <button
                    className={
                      index === 0
                        ? "overflow-hidden rounded-md border-2 border-primary bg-white p-1"
                        : "overflow-hidden rounded-md border border-primary/10 bg-white p-1"
                    }
                    key={item}
                    type="button"
                  >
                    <MediaPlaceholder
                      label={index === 4 ? "Video" : "Image"}
                      className="aspect-square min-h-0 rounded-sm border-0 bg-[linear-gradient(135deg,#f8efe3,#fffaf1_55%,#e5d2b8)] p-2 text-[9px] tracking-[0.1em]"
                    />
                  </button>
                ))}
              </div>
              <div className="relative">
                <CmsImageSlot
                  image={mainProductImage}
                  alt={product.name}
                  label="Main product image from CMS"
                  className="min-h-[560px] rounded-md border-0 bg-[radial-gradient(circle_at_54%_52%,#d98e2b_0_17%,transparent_18%),linear-gradient(135deg,#fff8ee,#f1e9da_48%,#d7e2c2)] text-primary/45"
                />
                <button
                  aria-label="Zoom product image"
                  className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white text-primary shadow-[0_10px_24px_rgba(47,82,51,0.18)]"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            <aside className="pt-2">
              <span className="inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">
                Bestseller
              </span>
              <h1 className="mt-5 font-serif text-5xl leading-tight text-text">{product.name}</h1>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-lg text-accent">*****</span>
                <span className="text-sm text-muted">(124)</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-primary">{product.price}</p>
              <p className="mt-5 max-w-md text-base leading-8 text-muted">
                {cmsProduct?.shortDescription ??
                  "Start your day the sustainable way with our bamboo mug. Lightweight, durable and naturally beautiful, perfect for your morning coffee, tea or herbal brew."}
              </p>

              <div className="my-7 h-px bg-primary/10" />

              <div>
                <p className="mb-3 text-sm font-semibold text-text">Quantity</p>
                <div className="inline-flex h-11 overflow-hidden rounded-md border border-primary/15 bg-white">
                  <button className="w-12 text-lg text-primary" type="button">
                    -
                  </button>
                  <span className="grid w-14 place-items-center border-x border-primary/10 text-sm text-text">1</span>
                  <button className="w-12 text-lg text-primary" type="button">
                    +
                  </button>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Button className="h-14 w-full rounded-md text-base" type="button">
                  Add to Cart
                </Button>
                <Button className="h-12 w-full rounded-md bg-transparent" type="button" variant="secondary">
                  Add to Wishlist
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 divide-x divide-primary/15">
                {productBenefits.map((item) => (
                  <div className="px-4 first:pl-0 last:pr-0" key={item.title}>
                    <div className="mb-3 text-3xl text-primary">/</div>
                    <p className="text-sm font-medium text-muted">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.text}</p>
                  </div>
                ))}
              </div>
            </aside>
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

        <section className="py-14">
          <Container>
            <div className="mb-10 flex gap-14 border-b border-primary/10 text-base text-muted">
              {["Description", "Specifications", "Shipping & Returns"].map((tab, index) => (
                <button
                  className={
                    index === 0
                      ? "border-b-2 border-primary pb-4 font-semibold text-primary"
                      : "pb-4 hover:text-primary"
                  }
                  key={tab}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h2 className="max-w-lg font-serif text-4xl leading-tight text-text">
                  A simple mug for a more sustainable tomorrow.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-muted">
                  Crafted from 100% natural bamboo, this mug brings together functionality and mindful living. Its
                  smooth finish and lightweight design make it perfect for everyday use at home, at work, or on the go.
                </p>
                <ul className="mt-7 space-y-4">
                  {details.map((item) => (
                    <li className="flex items-center gap-3 text-base text-muted" key={item}>
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-xs text-white">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <MediaPlaceholder
                  label="Lifestyle image from CMS"
                  className="min-h-[280px] rounded-md border-0 bg-[radial-gradient(circle_at_70%_55%,#d98e2b_0_13%,transparent_14%),linear-gradient(135deg,#fff8ee,#f0e4d2_55%,#d5e2c6)] text-primary/45"
                />
                <div className="mt-6 rounded-md bg-leaf p-7">
                  <div className="flex gap-5">
                    <div className="text-4xl text-primary">/</div>
                    <div>
                      <h3 className="font-serif text-xl text-text">{settings?.promiseTitle ?? "Our Promise"}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {settings?.promiseText ??
                          "We believe in creating beautiful, functional products that are kind to the planet. Every piece from VANA is designed with sustainability at its core."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-14">
          <Container>
            <div className="mb-7 flex items-end justify-between gap-6">
              <h2 className="font-serif text-4xl text-text">{settings?.relatedProductsTitle ?? "You may also like"}</h2>
              <Link className="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex" href="/shop">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
              {related.map((item, index) => (
                <RelatedProductCard index={index} key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
