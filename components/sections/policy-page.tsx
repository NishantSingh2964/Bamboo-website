import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export function PolicyPage({ title }: { title: string }) {
  const sections = ["Shipping Policy", "Delivery Times", "Shipping Costs", "Returns & Exchanges", "Privacy Policy"];

  return (
    <SiteShell>
      <PageHeader title={title} description="Last updated: April 30, 2026" />
      <Section compact>
        <Container className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-md border border-primary/10 p-5">
            <h2 className="text-sm font-semibold text-text">On this page</h2>
            <ol className="mt-4 space-y-3 text-sm text-muted">
              {sections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ol>
          </aside>
          <div className="space-y-8">
            {sections.slice(0, 3).map((section) => (
              <section className="border-b border-primary/10 pb-8" key={section}>
                <h2 className="font-serif text-2xl text-text">{section}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Policy content will be editable in Sanity as ordered sections with optional rich text blocks.
                </p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
