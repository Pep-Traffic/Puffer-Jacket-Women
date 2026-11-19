import Link from "next/link";
import { photoForProduct, type Product } from "@/lib/catalog";
import PhotoFrame from "./PhotoFrame";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} aria-label={`${product.name}, ${product.colour}`}>
        <PhotoFrame photo={photoForProduct(product)} caption="Stock photo" />
        <div className="card__meta">
          <div>
            <h3 className="card__name">{product.name}</h3>
            <p className="card__colour">{product.colour}</p>
          </div>
          <span className="card__price">Price to confirm</span>
        </div>
      </Link>
    </article>
  );
}
