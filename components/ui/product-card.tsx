import Link from "next/link";
import type { Product } from "@/lib/site-data";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <MediaPlaceholder label="Product image" className="aspect-square min-h-0" />
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-text group-hover:text-primary">{product.name}</h3>
            <p className="mt-1 text-xs text-muted">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-text">{product.price}</p>
        </div>
        <p className="mt-2 text-xs text-accent">Rating {product.rating}</p>
      </Link>
    </article>
  );
}
