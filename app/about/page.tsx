import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { CmsImageSlot } from "@/components/ui/cms-image-slot";
import { Container } from "@/components/ui/container";
import { getAboutPageContent } from "@/sanity/lib/content";
import { Leaf, ShieldCheck, Home, Truck, ArrowRight } from "lucide-react";

export const revalidate = 0;

const featureIcons = [Leaf, ShieldCheck, Home, Truck];

const featureStrip = [
  { title: "Sustainable", text: "& Eco-Friendly" },
  { title: "Durable", text: "& Long Lasting" },
  { title: "Modern Aesthetics", text: "for Your Home" },
  { title: "Fast & Reliable", text: "Shipping" },
];

const values = [
  {
    title: "Sustainability First",
    text: "We choose renewable materials and eco-friendly practices to protect our planet.",
  },
  {
    title: "Quality Always",
    text: "Thoughtful design and simple, durable construction for everyday use.",
  },
  {
    title: "People & Community",
    text: "We support fair practices and work with partners who share our values.",
  },
  {
    title: "A Greener Future",
    text: "Because a more sustainable home today means a healthier planet tomorrow.",
  },
];

export default async function AboutPage() {
  const content = await getAboutPageContent();
  const hero = content?.hero;
  const featureItems = content?.featureStrip?.length
    ? content.featureStrip.map((item) => ({ title: item.title ?? "", text: item.description ?? "" }))
    : featureStrip;
  const story = content?.storySection;
  const valueItems = content?.values?.length
    ? content.values.map((item) => ({ title: item.title ?? "", text: item.description ?? "" }))
    : values;
  const journey = content?.journeyCta;

  return (
    <SiteShell>
      <main className="bg-cream">
        <section className="overflow-hidden">
          <Container className="grid min-h-[460px] items-center gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative z-10">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary">
                {hero?.eyebrow ?? "About VANA"}
              </p>
              <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] text-text sm:text-6xl">
                {hero?.heading ?? "Thoughtful home essentials for a better tomorrow."}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
                {hero?.description ??
                  "At VANA, we believe that everyday objects should do more, for your home, for your well-being, and for the planet. Our bamboo homeware is designed to bring natural beauty, sustainable living and lasting quality into your everyday life."}
              </p>
            </div>
            <CmsImageSlot
              image={hero?.image}
              alt={hero?.heading ?? "About VANA"}
              label="About hero image from CMS"
              className="min-h-[420px] rounded-none border-0 bg-[radial-gradient(circle_at_70%_55%,#d98e2b_0_12%,transparent_13%),linear-gradient(110deg,#fffaf1_0%,#f3eee3_45%,#d7e2c2_100%)] text-primary/45"
            />
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

        <section className="py-16">
          <Container className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">Our Story</p>
              <h2 className="max-w-md font-serif text-4xl leading-tight text-text sm:text-5xl">
                {story?.heading ?? "From a simple idea to a sustainable home."}
              </h2>
              <div className="mt-7 space-y-5 text-base leading-8 text-muted">
                <p>
                  {story?.description ??
                    "VANA was born from a simple belief, that small changes make a big difference. We set out to create beautiful, functional home essentials made from bamboo, a renewable and versatile material that helps reduce our environmental footprint."}
                </p>
              </div>
            </div>
            <CmsImageSlot
              image={story?.image}
              alt={story?.heading ?? "Our Story"}
              label="Story image from CMS"
              className="min-h-[380px] rounded-md border-0 bg-[linear-gradient(135deg,#234729,#4b7b41_45%,#afc879)] text-white/75"
            />
          </Container>
        </section>

        <section className="pb-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">Our Values</p>
                <h2 className="max-w-md font-serif text-4xl leading-tight text-text sm:text-5xl">
                  The principles that guide us.
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-8 text-muted">
                {content?.valuesIntro ??
                  "At VANA, our values shape everything we do, from the materials we choose to the products we create. We are committed to making home essentials that are good for you, and kinder to the planet."}
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-4 lg:divide-x lg:divide-primary/15">
              {valueItems.map((value, index) => (
                <article className="lg:px-10 lg:first:pl-0 lg:last:pr-0" key={value.title}>
                  <div className="mb-5 text-4xl text-primary">{index + 1}</div>
                  <h3 className="font-serif text-xl text-primary">{value.title}</h3>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-muted">{value.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-14">
          <Container>
            <div className="grid overflow-hidden rounded-md bg-leaf lg:grid-cols-[0.55fr_1fr]">
              <div className="p-8 sm:p-12">
                <h2 className="font-serif text-4xl text-text">{journey?.heading ?? "Join our journey"}</h2>
                <p className="mt-5 max-w-md text-base leading-8 text-muted">
                  {journey?.description ??
                    "Be part of a growing community that values sustainable living, thoughtful design and a healthier planet."}
                </p>
                <Button className="mt-7 inline-flex items-center gap-2" href={journey?.primaryCta?.href ?? "/shop"}>
                  <span>{journey?.primaryCta?.label ?? "Shop Our Collection"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <CmsImageSlot
                image={journey?.image}
                alt={journey?.heading ?? "Join our journey"}
                label="CTA image from CMS"
                className="min-h-[280px] rounded-none border-0 bg-[radial-gradient(circle_at_55%_50%,#d98e2b_0_14%,transparent_15%),linear-gradient(110deg,#f8fff2,#fff8ee_55%,#d8e4c5)] text-primary/45"
              />
            </div>
          </Container>
        </section>
      </main>
    </SiteShell>
  );
}
