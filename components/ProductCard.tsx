import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { photoForProduct, type Product } from "@/lib/catalog";
import { swatchFor } from "@/lib/swatch";
import PhotoFrame from "./PhotoFrame";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} aria-label={`${product.name}, ${product.colour}`}>
        <PhotoFrame photo={photoForProduct(product)} caption={product.photos?.length ? undefined : "Stock photo"} />
        <div className="card__meta">
          <div className="card__text">
            <h3 className="card__name">{product.name}</h3>
            <p className="card__colour">
              <span className="card__swatch" style={{ ["--sw" as string]: swatchFor(product.colour) }} aria-hidden="true" />
              <span>{product.colour}</span>
            </p>
            <p className="card__price">Price to confirm</p>
          </div>
          <span className="card__arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
    </article>
  );
}
