"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

type Slide = { src: string; poster: string; label: string; alt: string };

// A carousel of rendered films. Each film opens and closes on an ink frame, so
// a hard cut between them looks like one continuous piece. Progress lines sit
// under the film; the active line fills while its film plays. Under reduced
// motion nothing autoplays and the poster frames stand in for the films.
export default function HeroReel({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);

  const go = useCallback(
    (i: number) => setIdx(((i % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === idx && !reduce) {
        v.currentTime = 0;
        void v.play().catch(() => undefined);
      } else {
        v.pause();
      }
    });
    bars.current.forEach((b, i) => {
      if (b) b.style.transform = `scaleX(${i < idx ? 1 : 0})`;
    });
  }, [idx, reduce]);

  return (
    <div className="reel" role="group" aria-roledescription="carousel" aria-label="Featured collections">
      <div className="reel__stage">
        {slides.map((s, i) => (
          <video
            key={s.src}
            ref={(el) => {
              videos.current[i] = el;
            }}
            className={`reel__video${i === idx ? " is-active" : ""}`}
            src={s.src}
            poster={s.poster}
            muted
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            aria-label={s.alt}
            aria-hidden={i !== idx}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              const b = bars.current[i];
              if (b && i === idx && v.duration) b.style.transform = `scaleX(${v.currentTime / v.duration})`;
            }}
            onEnded={() => go(idx + 1)}
          />
        ))}
        <div className="reel__arrows">
          <button type="button" onClick={() => go(idx - 1)} aria-label="Previous film">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(idx + 1)} aria-label="Next film">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ol className="reel__tabs">
        {slides.map((s, i) => (
          <li key={s.label}>
            <button type="button" onClick={() => go(i)} aria-current={i === idx} aria-label={`Show ${s.label}`}>
              <span className="reel__line">
                <span
                  className="reel__fill"
                  ref={(el) => {
                    bars.current[i] = el;
                  }}
                />
              </span>
              <span className="reel__name">{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
