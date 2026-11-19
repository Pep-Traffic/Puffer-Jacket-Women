"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const BOLD = "Puffer Jacket";
const LIGHT = "Women";

// The footer wordmark, sized to fill the container exactly at any width.
// Letters rise in one by one when the footer comes into view, and a wave of
// lift and colour follows the cursor across them. Only transform and colour
// change on hover, so the width never shifts. Reduced motion keeps it still.
export default function FooterMark() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const chars = useRef<HTMLSpanElement[]>([]);
  const centers = useRef<number[]>([]);
  const [inView, setInView] = useState(false);

  // Fit: scale the font so the line is exactly as wide as its box.
  useEffect(() => {
    const el = box.current;
    const ln = line.current;
    if (!el || !ln) return;
    const fit = () => {
      ln.style.fontSize = "100px";
      const w = ln.scrollWidth;
      const target = el.clientWidth;
      if (w > 0) ln.style.fontSize = `${(100 * target * 0.94) / w}px`;
      // Optical centring: match the gaps outside the first and last letters.
      ln.style.translate = "0px 0px";
      const first = chars.current[0]?.getBoundingClientRect();
      const last = chars.current[chars.current.length - 1]?.getBoundingClientRect();
      const bx = el.getBoundingClientRect();
      if (first && last) {
        const dx = (bx.right - last.right - (first.left - bx.left)) / 2;
        ln.style.translate = `${dx.toFixed(1)}px 0px`;
      }
      const left = el.getBoundingClientRect().left;
      centers.current = chars.current.map((c) => {
        const r = c.getBoundingClientRect();
        return r.left - left + r.width / 2;
      });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  // Reveal once when the wordmark scrolls into view.
  useEffect(() => {
    if (reduce || !box.current) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(box.current);
    return () => io.disconnect();
  }, [reduce]);

  // Cursor wave: lift and tint the letters nearest the pointer.
  useEffect(() => {
    const el = box.current;
    if (!el || reduce) return;
    let raf = 0;
    let x = -9999;
    const paint = () => {
      raf = 0;
      chars.current.forEach((c, i) => {
        const d = Math.abs(centers.current[i] - x);
        const k = Math.max(0, 1 - d / 220);
        const e = k * k * (3 - 2 * k);
        c.style.setProperty("--lift", e.toFixed(3));
      });
    };
    const move = (ev: PointerEvent) => {
      x = ev.clientX - el.getBoundingClientRect().left;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = () => {
      x = -9999;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  let n = 0;
  const render = (text: string, cls: string) =>
    text.split("").map((ch) => {
      const i = n++;
      return (
        <span
          key={i}
          className={`fm__ch ${cls}`}
          style={{ transitionDelay: inView && !reduce ? `${i * 28}ms` : undefined }}
          ref={(el) => {
            if (el) chars.current[i] = el;
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      );
    });

  return (
    <div ref={box} className={`fm${inView ? " is-in" : ""}`} aria-hidden="true">
      <p ref={line} className="fm__line">
        {render(BOLD, "fm__ch--bold")}
        {render(" ", "")}
        {render(LIGHT, "fm__ch--light")}
      </p>
      <p className="fm__domain">pufferjacketwomen.com</p>
    </div>
  );
}
