"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Photo } from "@/lib/images";

type Detail = { title: string; body: string; x: number; y: number };

const ZOOM = 2.1;
const HOLD_MS = 4800;

// A guided look at one photograph. Overview first: four pulsing hotspots.
// Then each detail in turn zooms the photograph into that spot while its row
// opens. Hover or focus pauses the tour; reduced motion never tours and never
// zooms by itself. Every description stays in the page for search engines.
export default function DetailZoom({
  photo,
  details,
  children,
}: {
  photo: Photo;
  details: Detail[];
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0); // 0 = overview, 1..n = detail

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(
      () => {
        const next = (step + 1) % (details.length + 1);
        setStep(next);
        setActive(next === 0 ? null : next - 1);
      },
      step === 0 ? 2600 : HOLD_MS,
    );
    return () => window.clearTimeout(id);
  }, [reduce, paused, step, details.length]);

  function pick(i: number | null) {
    setActive(i);
    setStep(i === null ? 0 : i + 1);
  }

  const d = active === null ? null : details[active];
  const style: React.CSSProperties =
    d && !reduce
      ? { transformOrigin: `${d.x}% ${d.y}%`, transform: `scale(${ZOOM})` }
      : { transformOrigin: "50% 50%", transform: "scale(1)" };

  return (
    <div
      className="dz"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="dz__media">
        <div className="dz__zoom" style={style}>
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
        </div>

        <div className={`dz__spots${active === null ? " is-on" : ""}`}>
          {details.map((det, i) => (
            <button
              key={det.title}
              type="button"
              className="dz__spot"
              style={{ left: `${det.x}%`, top: `${det.y}%` }}
              aria-label={`Look at: ${det.title}`}
              tabIndex={active === null ? 0 : -1}
              onClick={() => pick(i)}
            >
              <span />
            </button>
          ))}
        </div>

        <p className={`dz__caption${d ? " is-on" : ""}`} aria-live="polite">
          <strong>{d ? d.title : ""}</strong>
          <button type="button" onClick={() => pick(null)} tabIndex={d ? 0 : -1}>
            Back to overview
          </button>
        </p>
      </div>

      <div className="dz__side">
        {children}
        <ol className="dz__list">
          {details.map((det, i) => (
            <li key={det.title} className={i === active ? "is-on" : undefined}>
              <button type="button" className="dz__head" aria-expanded={i === active} onClick={() => pick(i)}>
                <span className="dz__n">{i + 1}</span>
                <span className="dz__title">{det.title}</span>
              </button>
              <div className="dz__body">
                <p>{det.body}</p>
              </div>
              <span className="dz__line" aria-hidden="true">
                {i === active && !reduce && !paused ? <span key={`${step}-bar`} className="dz__fill" /> : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
