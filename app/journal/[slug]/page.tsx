import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { ProductCard } from "@/components/ui/product-card";
import { Section } from "@/components/ui/section";
import { posts, products } from "@/lib/site-data";

export default function BlogPostPage() {
  return (
    <SiteShell>
      <article>
        <Container className="py-8">
          <MediaPlaceholder label="Blog hero image from CMS" className="min-h-[360px]" />
          <p className="mt-8 text-sm text-primary">Care Guides</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight text-text">How to Clean Bamboo Products</h1>
          <p className="mt-3 text-sm text-muted">April 18, 2026</p>
        </Container>
        <Container className="max-w-3xl pb-12">
          <div className="space-y-5 text-base leading-8 text-muted">
            <p>
              Bamboo is naturally durable and easy to maintain, but a little care keeps it looking beautiful for years.
            </p>
            <h2 className="font-serif text-3xl text-text">1. Wipe with a soft cloth</h2>
            <p>Use a damp cloth and mild soap. Avoid harsh chemicals or abrasive scrubbers.</p>
            <h2 className="font-serif text-3xl text-text">2. Rinse and dry</h2>
            <p>Do not soak your bamboo products. Water can cause cracks over time.</p>
          </div>
          <div className="mt-10 rounded-md bg-leaf p-5 text-sm text-muted">Written by the VANA team.</div>
        </Container>
      </article>
      <Section compact>
        <Container>
          <h2 className="font-serif text-3xl text-text">Related Posts</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {posts.slice(2, 5).map((post) => (
              <div key={post.slug}>
                <MediaPlaceholder label="Related post image" className="aspect-[4/3] min-h-0" />
                <h3 className="mt-3 text-sm font-semibold text-text">{post.title}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section compact>
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
