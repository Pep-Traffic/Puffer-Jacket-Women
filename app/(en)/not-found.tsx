import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/Split";
import PhotoFrame from "@/components/PhotoFrame";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container lost">
      <div className="lost__copy">
        <h1>
          <Split>Page not found</Split>
        </h1>
        <p className="hero__lede">The page you are looking for has moved or does not exist.</p>
        <div className="lost__actions">
          <Link href="/shop" className="btn">
            Shop all products
          </Link>
          <Link href="/guide" className="textlink">
            Read the buying guide
          </Link>
        </div>
      </div>
      <div className="lost__photo">
        <PhotoFrame photo={photos.longSleeveTrench} ratio="4 / 3" />
      </div>
    </section>
  );
}
