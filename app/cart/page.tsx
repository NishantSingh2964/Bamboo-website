import { SiteShell } from "@/components/layout/site-shell";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { PageHeader } from "@/components/ui/page-header";
import { ProductCard } from "@/components/ui/product-card";
import { Section } from "@/components/ui/section";
import { products } from "@/lib/site-data";

export default function CartPage() {
  return (
    <SiteShell>
      <PageHeader title="Your Cart" />
      <Section compact>
        <Container className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {products.slice(0, 2).map((product) => (
              <div className="grid grid-cols-[96px_1fr] gap-4 border-b border-primary/10 pb-5" key={product.slug}>
                <MediaPlaceholder label="Image" className="aspect-square min-h-0" />
                <div className="grid gap-3 sm:grid-cols-4 sm:items-center">
                  <div>
                    <h2 className="text-sm font-semibold text-text">{product.name}</h2>
                    <p className="text-xs text-muted">{product.material}</p>
                  </div>
                  <p className="text-sm text-text">{product.price}</p>
                  <div className="inline-flex h-9 w-fit items-center rounded-md border border-primary/15 text-sm">
                    <button className="px-3">-</button>
                    <span className="px-3">1</span>
                    <button className="px-3">+</button>
                  </div>
                  <button className="text-left text-xs text-muted">Remove</button>
                </div>
              </div>
            ))}
            <div>
              <h2 className="mb-3 text-sm font-semibold text-text">Promo code</h2>
              <form className="flex gap-3">
                <input className="h-11 flex-1 rounded-md border border-primary/15 px-3 text-sm" placeholder="Enter code" />
                <Button>Apply</Button>
              </form>
            </div>
            <Accordion
              items={[
                { question: "Description", answer: "A beautifully crafted bamboo mug, perfect for your everyday coffee or tea." },
                { question: "Materials & Care", answer: "Clean with mild soap and dry immediately." },
                { question: "Shipping & Returns", answer: "Shipping estimates are calculated at checkout." },
              ]}
            />
          </div>
          <aside className="h-fit rounded-md border border-primary/10 p-5">
            <h2 className="font-serif text-2xl text-text">Order Summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>$66.00</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>$8.00</span></div>
              <div className="flex justify-between border-t border-primary/10 pt-3 font-semibold"><span>Total</span><span>$74.00</span></div>
            </div>
            <Button className="mt-6 w-full" href="/checkout">
              Proceed to Checkout
            </Button>
          </aside>
        </Container>
      </Section>
      <Section compact>
        <Container>
          <h2 className="font-serif text-3xl text-text">Reviews</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(1, 5).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
