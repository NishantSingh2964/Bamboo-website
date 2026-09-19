import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { CmsImageSlot } from "@/components/ui/cms-image-slot";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { getContactPageContent } from "@/sanity/lib/content";
import { ArrowRight } from "lucide-react";

export const revalidate = 0;

const socialLinks = ["IG", "PT", "FB", "YT"];

export default async function ContactPage() {
  const content = await getContactPageContent();
  const hero = content?.hero;
  const studioCta = content?.studioCta;

  return (
    <SiteShell>
      <main className="bg-cream">
        <section className="overflow-hidden">
          <Container className="grid min-h-[380px] items-center gap-10 py-12 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-accent">
                {hero?.eyebrow ?? "Get in touch"}
              </p>
              <h1 className="max-w-xl font-serif text-5xl leading-[1.02] text-text sm:text-6xl">
                {hero?.heading ?? "We'd love to hear from you"}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
                {hero?.description ??
                  "Have a question, feedback, or just want to say hello? Our team is here to help. Fill out the form or reach us through the details below."}
              </p>
            </div>
            <CmsImageSlot
              image={hero?.image}
              alt={hero?.heading ?? "Contact us"}
              label="Contact hero image from CMS"
              className="min-h-[360px] rounded-none border-0 bg-[radial-gradient(circle_at_58%_58%,#d98e2b_0_13%,transparent_14%),linear-gradient(110deg,#fffaf1_0%,#f2eee5_45%,#d7e2c2_100%)] text-primary/45"
            />
          </Container>
        </section>

        <section className="py-12">
          <Container className="grid gap-16 lg:grid-cols-[1fr_0.92fr]">
            <section>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-accent">
                {content?.formEyebrow ?? "Send us a message"}
              </p>
              <h2 className="font-serif text-4xl text-text sm:text-5xl">{content?.formTitle ?? "Let's talk"}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                {content?.formIntro ??
                  "Whether you have a question about our products, need help with an order, or just want to share your thoughts, we're all ears."}
              </p>

              <form className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block rounded-md border border-primary/15 bg-white px-4 py-3 text-xs font-semibold text-text">
                    Name *
                    <input className="mt-2 h-8 w-full bg-transparent text-sm font-normal outline-none" placeholder="Your name" />
                  </label>
                  <label className="block rounded-md border border-primary/15 bg-white px-4 py-3 text-xs font-semibold text-text">
                    Email *
                    <input className="mt-2 h-8 w-full bg-transparent text-sm font-normal outline-none" placeholder="you@example.com" />
                  </label>
                </div>
                <label className="block rounded-md border border-primary/15 bg-white px-4 py-3 text-xs font-semibold text-text">
                  Subject
                  <input className="mt-2 h-8 w-full bg-transparent text-sm font-normal outline-none" placeholder="What is this about?" />
                </label>
                <label className="block rounded-md border border-primary/15 bg-white px-4 py-3 text-xs font-semibold text-text">
                  Message *
                  <textarea
                    className="mt-2 min-h-32 w-full resize-y bg-transparent text-sm font-normal outline-none"
                    placeholder="Type your message here..."
                  />
                </label>
                <Button className="h-14 w-full rounded-md text-base inline-flex items-center justify-center gap-2" type="submit">
                  <span>Send Message</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </section>

            <aside>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-accent">
                {content?.detailsEyebrow ?? "Other ways to reach us"}
              </p>
              <h2 className="font-serif text-4xl text-text sm:text-5xl">
                {content?.detailsTitle ?? "Contact Details"}
              </h2>

              <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1fr]">
                <div className="space-y-7">
                  {[
                    {
                      label: "Email",
                      value: content?.email ?? "hello@vanahomeware.com",
                      note: "We'll get back to you within 24 hours.",
                    },
                    {
                      label: "Phone",
                      value: content?.phone ?? "+91 98765 43210",
                      note: "Mon - Fri, 9am - 6pm (IST)",
                    },
                    {
                      label: "Our Location",
                      value: content?.address ?? "123 Green Valley Road, Jaipur, Rajasthan 302017, India",
                      note: "",
                    },
                  ].map((item, index) => (
                    <div className="flex gap-5" key={item.label}>
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-leaf text-lg font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-text">{item.label}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted">{item.value}</p>
                        {item.note ? <p className="mt-1 text-xs text-muted">{item.note}</p> : null}
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <h3 className="text-base font-semibold text-text">Follow Us</h3>
                    <div className="mt-4 flex gap-4">
                      {socialLinks.map((item) => (
                        <a
                          className="grid h-11 w-11 place-items-center rounded-full bg-leaf text-sm font-semibold text-primary hover:bg-primary hover:text-white"
                          href="#"
                          key={item}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <MediaPlaceholder
                    label="Map embed"
                    className="min-h-[255px] rounded-md border-0 bg-[linear-gradient(135deg,#e9efe4,#f8f4e9_52%,#d9e7d1)] text-primary/45"
                  />
                  <div className="mt-5 rounded-md bg-leaf p-7">
                    <div className="flex gap-5">
                      <div className="text-4xl text-primary">/</div>
                      <div>
                        <h3 className="font-serif text-xl text-text">{studioCta?.heading ?? "Visit Our Studio"}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          {studioCta?.description ??
                            "We'd love to welcome you to our space. Come explore our collection and learn more about our bamboo journey."}
                        </p>
                        <a className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline" href={studioCta?.primaryCta?.href ?? "#"}>
                          <span>{studioCta?.primaryCta?.label ?? "Learn more"}</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </Container>
        </section>
      </main>
    </SiteShell>
  );
}
