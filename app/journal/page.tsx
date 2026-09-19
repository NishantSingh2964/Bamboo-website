import { SiteShell } from "@/components/layout/site-shell";
import { CmsImageSlot } from "@/components/ui/cms-image-slot";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { posts as fallbackPosts } from "@/lib/site-data";
import { getBlogPosts } from "@/sanity/lib/content";
import Link from "next/link";

export const revalidate = 0;

export default async function JournalPage() {
  const cmsPosts = await getBlogPosts();

  const displayPosts = cmsPosts?.length
    ? cmsPosts.map((cms, idx) => ({
        slug: cms.slug?.current ?? fallbackPosts[idx % fallbackPosts.length].slug,
        title: cms.title ?? fallbackPosts[idx % fallbackPosts.length].title,
        date: cms.publishedAt
          ? new Date(cms.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          : fallbackPosts[idx % fallbackPosts.length].date,
        category: cms.category?.title ?? fallbackPosts[idx % fallbackPosts.length].category,
        image: cms.mainImage,
      }))
    : fallbackPosts.map((p) => ({ ...p, image: undefined }));

  const featured = displayPosts[0];
  const list = displayPosts.slice(1);

  return (
    <SiteShell>
      <PageHeader title="Journal" description="Care guides, sustainability notes, and behind-the-scenes." />
      <Section compact>
        <Container>
          {featured ? (
            <Link href={`/journal/${featured.slug}`} className="grid gap-6 rounded-md bg-primary p-6 text-white lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="text-sm text-white/70">Featured</p>
                <h2 className="mt-3 font-serif text-3xl">{featured.title}</h2>
                <p className="mt-4 text-sm text-white/80">{featured.date}</p>
              </div>
              <CmsImageSlot image={featured.image} alt={featured.title} label="Featured post image from CMS" className="min-h-64 border-white/30 bg-white/10 text-white/80" />
            </Link>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-2">
            {["All", "Care Guides", "Sustainability", "Behind the Scenes"].map((item) => (
              <button className="rounded-full border border-primary/15 px-4 py-2 text-xs text-text" key={item}>
                {item}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((post) => (
              <Link className="group" href={`/journal/${post.slug}`} key={post.slug}>
                <CmsImageSlot image={post.image} alt={post.title} label="Post image from CMS" className="aspect-[4/3] min-h-0" />
                <p className="mt-4 text-xs text-primary">{post.category}</p>
                <h2 className="mt-2 text-base font-semibold text-text group-hover:text-primary">{post.title}</h2>
                <p className="mt-2 text-xs text-muted">{post.date}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
