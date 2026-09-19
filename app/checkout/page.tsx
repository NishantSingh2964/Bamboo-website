import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Section } from "@/components/ui/section";
import { products } from "@/lib/site-data";

export default function CheckoutPage() {
  return (
    <SiteShell minimalNav>
      <Section compact>
        <Container>
          <div className="mx-auto mb-10 flex max-w-xl items-center justify-between text-sm text-muted">
            {["Shipping", "Payment", "Review"].map((step, index) => (
              <div className="text-center" key={step}>
                <div className="mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-primary text-white">{index + 1}</div>
                {step}
              </div>
            ))}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <form className="space-y-5">
              <h1 className="font-serif text-3xl text-text">Shipping Details</h1>
              {["Full name", "Email address", "Address", "City", "State", "PIN code"].map((label) => (
                <label className="block text-sm font-medium text-text" key={label}>
                  {label}
                  <input className="mt-2 h-11 w-full rounded-md border border-primary/15 px-3 text-sm" />
                </label>
              ))}
              <Button className="w-full">Proceed to Payment</Button>
            </form>
            <aside className="h-fit rounded-md border border-primary/10 p-5">
              <h2 className="font-serif text-2xl text-text">Order Summary</h2>
              <div className="mt-5 space-y-4">
                {products.slice(0, 2).map((product) => (
                  <div className="grid grid-cols-[64px_1fr] gap-3" key={product.slug}>
                    <MediaPlaceholder label="Image" className="aspect-square min-h-0" />
                    <div className="text-sm">
                      <p className="font-medium text-text">{product.name}</p>
                      <p className="text-muted">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-primary/10 pt-4 text-sm">
                <div className="flex justify-between font-semibold"><span>Total</span><span>$74.00</span></div>
              </div>
              <Button className="mt-6 w-full">Place Order</Button>
            </aside>
          </div>
        </Container>
      </Section>
      <Section compact>
        <Container>
          <div className="rounded-md bg-leaf p-8 text-center">
            <h2 className="font-serif text-3xl text-text">Your order is confirmed</h2>
            <p className="mt-3 text-sm text-muted">Confirmation and next-step content will be populated from checkout data.</p>
            <Button className="mt-6" href="/shop">Continue Shopping</Button>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
