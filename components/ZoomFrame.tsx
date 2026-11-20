"use client";

import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

// Pointer-follow zoom for a photograph. The pointer position is written to two
// CSS variables, so the image zooms toward the point the reader is looking at.
// The zoom is switched on only for fine pointers (see globals.css).
export default function ZoomFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function follow(event: ReactPointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--zx", `${((event.clientX - box.left) / box.width) * 100}%`);
    el.style.setProperty("--zy", `${((event.clientY - box.top) / box.height) * 100}%`);
  }

  return (
    <div ref={ref} className="zoom" onPointerMove={follow}>
      {children}
    </div>
  );
}
