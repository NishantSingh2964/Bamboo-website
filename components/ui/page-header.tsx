import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Section compact className="border-b border-primary/10">
      <Container>
        {eyebrow ? <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p> : null}
        <h1 className="max-w-3xl font-serif text-4xl text-text sm:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{description}</p> : null}
      </Container>
    </Section>
  );
}
