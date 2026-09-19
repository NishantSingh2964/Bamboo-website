import { SiteShell } from "@/components/layout/site-shell";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { faqs } from "@/lib/site-data";

export default function FAQPage() {
  return (
    <SiteShell>
      <PageHeader title="FAQ" description="Find answers to common questions about our products, orders, and care." />
      <Section compact>
        <Container>
          <div className="mb-6 flex flex-wrap gap-2">
            {["Orders", "Shipping", "Product Care", "Materials", "General"].map((item) => (
              <button className="rounded-full border border-primary/15 px-4 py-2 text-xs text-text" key={item}>
                {item}
              </button>
            ))}
          </div>
          <Accordion items={faqs} />
          <div className="mt-8 rounded-md bg-leaf p-8 text-center">
            <h2 className="font-serif text-2xl text-text">Still have questions?</h2>
            <Button className="mt-5" href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
