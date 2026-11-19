"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import type { Photo } from "@/lib/images";

type Item = {
  title: string;
  body: string;
  href: string;
  label: string;
  photo: Photo;
  position?: string;
  icon: React.ReactNode;
};

const HOLD_MS = 6000;

// Weather scenarios as a list with a photograph that wipes to match the
// selection. The open row shows its text and link and fills a thin progress
// line while it autoplays. Hover or focus pauses; reduced motion never
// autoplays. All four texts stay in the page for search engines.
export default function DayPlanner({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);

  function select(i: number) {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  }

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => select((active + 1) % items.length), HOLD_MS);
    return () => window.clearTimeout(id);
    // select only reads active; listing it keeps the timer in step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, paused, active, items.length]);

  return (
    <div
      className="planner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul className="planner__list">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <li key={item.title} className={on ? "is-on" : undefined}>
              <button
                type="button"
                className="planner__head"
                aria-expanded={on}
                onClick={() => select(i)}
                onMouseEnter={() => select(i)}
              >
                <span className="planner__icon">{item.icon}</span>
                <span className="planner__title">{item.title}</span>
              </button>
              <div className="planner__body">
                <div>
                  <p>{item.body}</p>
                  <Link href={item.href} className="textlink">
                    {item.label} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <span className="planner__line" aria-hidden="true">
                {on && !reduce && !paused ? <span key={`${active}-bar`} ref={bar} className="planner__fill" /> : null}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="planner__stage" aria-hidden="true">
        {items.map((item, i) => (
          <img
            key={item.photo.src}
            src={item.photo.src}
            alt=""
            width={item.photo.width}
            height={item.photo.height}
            loading="lazy"
            style={item.position ? { objectPosition: item.position } : undefined}
            className={i === active ? "is-active" : i === prev ? "is-prev" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
