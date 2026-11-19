import type { Photo } from "@/lib/images";

// A real photograph in a fixed ratio. The fixed ratio reserves space, so the
// page does not jump while the image loads.
export default function PhotoFrame({
  photo,
  ratio = "4 / 5",
  caption,
  priority = false,
  className,
}: {
  photo: Photo;
  ratio?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`photo${className ? ` ${className}` : ""}`}>
      <div className="photo__box" style={{ aspectRatio: ratio }}>
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
      {caption ? <figcaption className="photo__caption">{caption}</figcaption> : null}
    </figure>
  );
}
