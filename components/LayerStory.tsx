"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Layer } from "./LayerStack";

// Scroll-driven layering. The section pins while the reader scrolls through
// three steps. Three photograph cards sit stacked like layers: the current
// step's card comes to the front, finished ones recede behind, waiting ones
// peek out. A meter counts the layers worn. Rows can also be clicked, and
// reduced motion removes the pin so only clicks change the step.
export default function LayerStory({ layers }: { layers: Layer[] }) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const marks = useRef<(HTMLSpanElement | null)[]>([]);

  // Three sentinels, one per step, are watched against the middle of the
  // viewport. This stays correct when lazy images change the page height.
  useEffect(() => {
    if (reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(Number((en.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    marks.current.forEach((m) => m && io.observe(m));
    return () => io.disconnect();
  }, [reduce]);

  function pick(i: number) {
    setActive(i);
    if (reduce || !track.current || window.innerWidth <= 900) return;
    const r = track.current.getBoundingClientRect();
    const top = window.scrollY + r.top;
    const span = track.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * (i + 0.5)) / layers.length, behavior: "smooth" });
  }

  return (
    <div ref={track} className={`story${reduce ? " is-static" : ""}`} style={{ ["--n" as string]: layers.length }}>
      {!reduce &&
        layers.map((layer, i) => (
          <span
            key={layer.name}
            ref={(el) => {
              marks.current[i] = el;
            }}
            data-i={i}
            className="story__mark"
            style={{ top: `${(i * 100) / layers.length}%`, height: `${100 / layers.length}%` }}
            aria-hidden="true"
          />
        ))}
      <div className="story__sticky">
        <div className="story__text">
          <ol className="story__list">
            {layers.map((layer, i) => (
              <li key={layer.title} className={i === active ? "is-on" : i < active ? "is-done" : undefined}>
                <button type="button" onClick={() => pick(i)} aria-expanded={i === active} className="story__head">
                  <span className="story__name">{layer.name}</span>
                  <span className="story__title">{layer.title}</span>
                </button>
                <div className="story__body">
                  <p>{layer.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="story__meter" role="img" aria-label={`${active + 1} of ${layers.length} layers worn`}>
            {layers.map((layer, i) => (
              <span key={layer.name} className={i <= active ? "is-on" : undefined}>
                <i />
                {layer.name.replace(" layer", "")}
              </span>
            ))}
          </div>
        </div>

        <div className="story__stage" aria-hidden="true">
          {layers.map((layer, i) => (
            <figure
              key={layer.title}
              className={`story__card ${i === active ? "is-active" : i < active ? "is-past" : "is-next"}`}
              style={{ ["--i" as string]: i }}
            >
              <img src={layer.photo.src} alt="" width={layer.photo.width} height={layer.photo.height} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
