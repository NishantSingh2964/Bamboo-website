import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { CmsImageSlot } from "@/components/ui/cms-image-slot";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Section } from "@/components/ui/section";
import type { Product } from "@/lib/site-data";
import { products } from "@/lib/site-data";
import { getHomePageContent } from "@/sanity/lib/content";
import { Leaf, ShieldCheck, House, Truck, ArrowRight } from "lucide-react";

export const revalidate = 0;

const featureIcons = [Leaf, ShieldCheck, House, Truck];

const features = [
  { title: "Sustainable", text: "& Eco-Friendly" },
  { title: "Durable", text: "& Long Lasting" },
  { title: "Modern Aesthetics", text: "for Your Home" },
  { title: "Fast & Reliable", text: "Shipping" },
];

const testimonials = [
  {
    quote:
      "Beautiful quality and so well made! The bamboo mug is now my everyday favorite. It feels natural, looks stunning and is super durable.",
    name: "Priya S.",
    place: "Mumbai, India",
  },
  {
    quote:
      "I love how minimal and elegant everything looks. The storage canisters are perfect for my kitchen. Great quality and fast shipping too!",
    name: "Arjun M.",
    place: "Bangalore, India",
  },
  {
    quote:
      "Finally, home essentials that are both stylish and sustainable. The cutting board is my absolute favorite. Highly recommend VANA!",
    name: "Neha T.",
    place: "Delhi, India",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="mt-1.5 flex items-center gap-1.5">
      <span className="flex text-amber-400">
        {"★★★★"}
        <span className="text-amber-200">{"★"}</span>
      </span>
      <span className="text-xs text-muted">({count})</span>
    </div>
  );
}

function HomeProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <a href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-[#f5f0e8]">
          <MediaPlaceholder
            label="Product image"
            className="aspect-square min-h-0 rounded-none border-0 bg-[linear-gradient(135deg,#f7efe3,#fffaf1_55%,#ead7bd)]"
          />
        </div>
        <div className="px-3 py-3">
          <h3 className="text-xs font-semibold leading-snug text-text group-hover:text-primary">
            {product.name}
          </h3>
          <StarRating count={98} />
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
      </a>
    </article>
  );
}

export default async function Home() {
  const content = await getHomePageContent();
  const hero = content?.hero;
  const featureItems = content?.featureStrip?.length
    ? content.featureStrip.map((item) => ({ title: item.title ?? "", text: item.description ?? "" }))
    : features;
  const story = content?.storyTeaser;
  const testimonialItems = content?.testimonials?.length
    ? content.testimonials.map((item) => ({ quote: item.quote ?? "", name: item.name ?? "Customer", place: "VANA Customer" }))
    : testimonials;
  const newsletter = content?.newsletterCta;

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-cream border-b border-primary/10 min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Full Hero Section Background Image */}
        <CmsImageSlot
          image={hero?.image}
          alt={hero?.heading ?? "VANA bamboo homeware"}
          label="Hero image from CMS"
          className="absolute inset-0 h-full w-full rounded-none border-0"
          imageClassName="h-full w-full object-cover object-right lg:object-center"
        />

        {/* Soft Gradient Overlay to ensure crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-cream/30 md:to-transparent max-w-4xl" />
        <div className="absolute inset-0 bg-cream/20" />

        {/* Hero Text Content */}
        <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-4 text-sm sm:text-base font-semibold tracking-[0.08em] text-primary">
              {hero?.eyebrow ?? "Bamboo Homeware"}
            </p>
            <h1 className="font-serif text-5xl leading-[0.98] text-text sm:text-6xl lg:text-7xl">
              {hero?.heading ?? "Bamboo, shaped for everyday life"}
            </h1>
            <p className="mt-7 text-base sm:text-lg leading-8 text-muted">
              {hero?.description ??
                "Thoughtfully designed bamboo home essentials that bring natural beauty, durability and calm to your everyday spaces."}
            </p>
            <Button
              className="mt-8 h-14 rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-sm inline-flex items-center gap-2"
              href={hero?.primaryCta?.href ?? "/shop"}
            >
              <span>{hero?.primaryCta?.label ?? "Shop Home Essentials"}</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-y border-primary/10 bg-leaf/70">
        <Container className="grid gap-0 py-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <Section className="bg-cream">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl text-text">Bestsellers</h2>
              <p className="mt-2 text-sm text-muted">Our most loved bamboo homeware.</p>
            </div>
            <Button href="/shop" variant="ghost" className="hidden sm:inline-flex items-center gap-1.5">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {products.map((product) => (
              <HomeProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      <Section compact className="bg-cream">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Left: Image */}
            <div className="overflow-hidden rounded-2xl">
              <CmsImageSlot
                image={story?.image}
                alt={story?.heading ?? "VANA bamboo story"}
                label="Story image from CMS"
                className="min-h-[320px] max-h-[400px] w-full rounded-2xl border-0 bg-[linear-gradient(135deg,#234729,#4b7b41_45%,#afc879)] text-white/75"
                imageClassName="h-full w-full object-cover object-center"
              />
            </div>

            {/* Right: Text */}
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                Our Story
              </p>
              <h2 className="font-serif text-4xl leading-[1.12] text-text sm:text-[2.8rem]">
                {story?.heading ?? "Pure by design, Kind to the planet."}
              </h2>
              <p className="mt-6 text-sm leading-7 text-muted">
                {story?.description ??
                  "At VANA, we believe in a simpler, greener tomorrow. Our bamboo homeware is crafted with care — combining natural materials, timeless design and a commitment to a more sustainable lifestyle."}
              </p>
              <div className="mt-8">
                <Button
                  href={story?.primaryCta?.href ?? "/about"}
                  variant="secondary"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/30 bg-transparent px-7 text-sm font-medium text-text hover:bg-primary/5"
                >
                  <span>{story?.primaryCta?.label ?? "Learn More"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          {/* Section header */}
          <div className="mb-10">
            <h2 className="font-serif text-3xl text-text sm:text-4xl">What our customers say</h2>
            <p className="mt-2 text-sm text-muted">Real homes. Real stories. Loved by many.</p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {testimonialItems.map((item) => (
              <article
                key={item.name}
                className="flex flex-col justify-between rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Quote */}
                <p className="text-sm leading-7 text-muted/90 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf text-sm font-bold text-primary">
                    {item.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none text-text">{item.name}</p>
                    <p className="mt-1 text-xs text-muted">{item.place}</p>
                    {/* Stars */}
                    <div className="mt-1.5 flex items-center gap-0.5">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i} className={i < 4 ? "text-amber-400 text-xs" : "text-amber-200 text-xs"}>
                          {star}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section compact className="bg-cream">
        <Container>
          <div className="relative min-h-[320px] overflow-hidden rounded-md bg-primary/20 px-6 py-16 text-center text-white">
            <CmsImageSlot
              image={newsletter?.image}
              alt={newsletter?.heading ?? "VANA bamboo promise"}
              label="CTA background image from CMS"
              className="absolute inset-0 h-full w-full rounded-none border-0"
              imageClassName="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">Our Promise</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                {newsletter?.heading ?? "A greener home, a brighter future."}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/90">
                {newsletter?.description ?? "Sustainable bamboo. Thoughtfully designed. Made for everyday life."}
              </p>
              <Button className="mt-7 bg-accent hover:bg-text text-white inline-flex items-center gap-2" href={newsletter?.primaryCta?.href ?? "/shop"}>
                <span>{newsletter?.primaryCta?.label ?? "Shop Now"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
