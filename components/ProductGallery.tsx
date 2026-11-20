"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowsOutSimple, X } from "@phosphor-icons/react";
import type { Photo } from "@/lib/images";

// A main photo with a thumbnail column and a full-screen view. The photos are
// stock images until product photography is added, and are labelled as such.
export default function ProductGallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const expandButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const current = photos[active];

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      expandButton.current?.focus();
    };
  }, [open]);

  return (
    <div className="pdp-gallery">
      <div className="pdp-gallery__thumbs" role="group" aria-label="Product photos">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className="pdp-gallery__thumb"
            aria-pressed={i === active}
            aria-label={`Show photo ${i + 1} of ${photos.length}`}
            onClick={() => setActive(i)}
          >
            <img src={photo.src} alt="" width={photo.width} height={photo.height} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="pdp-gallery__main">
        <img src={current.src} alt={current.alt} width={current.width} height={current.height} />
        <span className="pdp-gallery__chip">Stock photo</span>
        <button
          ref={expandButton}
          type="button"
          className="pdp-gallery__expand"
          aria-label="View this photo full screen"
          onClick={() => setOpen(true)}
        >
          <ArrowsOutSimple size={20} aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Product photo" onClick={() => setOpen(false)}>
          <button
            ref={closeButton}
            type="button"
            className="lightbox__close"
            aria-label="Close full-screen photo"
            onClick={() => setOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
          <img
            className="lightbox__img"
            src={current.src}
            alt={current.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
}
