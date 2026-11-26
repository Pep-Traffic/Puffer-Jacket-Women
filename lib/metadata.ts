import type { Metadata } from "next";
import { photos, type Photo } from "./images";
import { site } from "./site";

type PageInput = {
  title: string;
  description: string;
  path: string;
  image?: Photo;
  type?: "website" | "article";
  // Set when the title already carries the brand name.
  absoluteTitle?: boolean;
  // False for a page that has nothing to offer a searcher yet.
  index?: boolean;
};

export const defaultShareImage: Photo = photos.winterField;

// One page's metadata. A page that sets openGraph or twitter replaces the
// layout's values completely, so the full set is built here every time.
export function pageMetadata({
  title,
  description,
  path,
  image = defaultShareImage,
  type = "website",
  absoluteTitle = false,
  index = true,
}: PageInput): Metadata {
  const images = [{ url: image.src, width: image.width, height: image.height, alt: image.alt }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: site.locale,
      url: path === "/" ? site.url : path,
      title,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: [image.src] },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
