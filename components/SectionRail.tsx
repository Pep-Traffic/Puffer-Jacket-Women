"use client";

import { useEffect, useState } from "react";

export type RailItem = { id: string; label: string };

// A sticky index of the sections on a page. The section in the reading band
// is marked current, so the rail follows the reader down the page.
export default function SectionRail({ items, label }: { items: RailItem[]; label: string }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="rail" aria-label={label}>
      <div className="container">
        <ul className="rail__list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="rail__link"
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
