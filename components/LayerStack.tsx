"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import type { Photo } from "@/lib/images";
import PhotoFrame from "./PhotoFrame";

export type Layer = {
  name: string;
  title: string;
  body: string;
  photo: Photo;
};

// Sticky layering: each layer pins as the reader scrolls, and the layer
// beneath it eases back as the next one arrives.
export default function LayerStack({ layers }: { layers: Layer[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="layer-stack" style={{ height: `${layers.length * 62}vh` }}>
      {layers.map((layer, index) => (
        <LayerSlot
          key={layer.title}
          layer={layer}
          index={index}
          total={layers.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function LayerSlot({
  layer,
  index,
  total,
  progress,
}: {
  layer: Layer;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const isLast = index === total - 1;
  const arrives = (index + 1) / total;
  const scale = useTransform(
    progress,
    [Math.max(0, arrives - 0.14), Math.min(1, arrives)],
    [1, 0.94],
  );

  return (
    <div
      className="layer-slot"
      style={{ top: `calc(var(--header-h) + 28px + ${index * 16}px)` }}
    >
      <motion.article
        className="layer-card"
        style={{ scale: reduce || isLast ? 1 : scale }}
      >
        <div className="layer-card__photo">
          <PhotoFrame photo={layer.photo} ratio="4 / 5" />
        </div>
        <div className="layer-card__text">
          <p className="layer-card__name">{layer.name}</p>
          <h3>{layer.title}</h3>
          <p>{layer.body}</p>
        </div>
      </motion.article>
    </div>
  );
}
