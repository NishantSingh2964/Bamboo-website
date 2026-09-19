import type { SanityImageSource } from "@sanity/image-url";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

export function CmsImageSlot({
  image,
  alt,
  label,
  className,
  imageClassName,
}: {
  image?: unknown;
  alt: string;
  label: string;
  className?: string;
  imageClassName?: string;
}) {
  if (!image) {
    return <MediaPlaceholder label={label} className={className} />;
  }

  let src: string | null = null;

  if (typeof image === "string" && image.trim().length > 0) {
    src = image;
  } else if (typeof image === "object" && image !== null) {
    const obj = image as Record<string, unknown>;
    if (typeof obj.url === "string" && obj.url.trim().length > 0) {
      src = obj.url;
    } else if (obj.asset || obj._ref) {
      try {
        src = urlFor(image as SanityImageSource).width(1600).auto("format").url();
      } catch (err) {
        console.error("Error generating Sanity image URL:", err);
      }
    }
  }

  if (!src) {
    return <MediaPlaceholder label={label} className={className} />;
  }

  const isPositioned = className?.includes("absolute") || className?.includes("fixed");

  return (
    <div className={cn(isPositioned ? "overflow-hidden" : "relative overflow-hidden rounded-md", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        className={cn("h-full w-full object-cover", imageClassName)}
        src={src}
      />
    </div>
  );
}
