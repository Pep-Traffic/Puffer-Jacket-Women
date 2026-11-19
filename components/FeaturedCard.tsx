import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { photoForProduct, type Product } from "@/lib/catalog";

// Editorial card for the home page: a full-bleed photograph with a white
// label. The label opens on hover or focus to reveal the link.
export default function FeaturedCard({ product }: { product: Product }) {
  const photo = photoForProduct(product);
  return (
    <article className="feat">
      <Link href={`/product/${product.slug}`} className="feat__link" aria-label={`${product.name}, ${product.colour}`}>
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
        <span className="feat__label">
          <span className="feat__name">{product.name}</span>
          <span className="feat__meta">
            {product.colour}
            <span className="feat__price">Price to confirm</span>
          </span>
          <span className="feat__more">
            <span className="feat__cta">
              View piece <ArrowRight size={14} aria-hidden="true" />
            </span>
          </span>
        </span>
      </Link>
    </article>
  );
}
