"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

type Item = { term: string; definition: string };

// A searchable dictionary of label words. All terms stay in the page for
// search engines; typing only hides the ones that do not match.
export default function Glossary({ items, children }: { items: Item[]; children?: React.ReactNode }) {
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((i) => i.term.toLowerCase().includes(needle) || i.definition.toLowerCase().includes(needle));
  }, [items, q]);

  const sorted = useMemo(() => [...shown].sort((a, b) => a.term.localeCompare(b.term)), [shown]);

  return (
    <div className="gloss">
      <div className="gloss__side">
        {children}
        <label className="gloss__search">
          <span>Search the terms</span>
          <span className="gloss__field">
            <MagnifyingGlass size={20} aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try loft, shell or down"
              autoComplete="off"
            />
          </span>
        </label>
        <p className="gloss__count" role="status">
          {sorted.length === items.length ? `${items.length} terms` : `${sorted.length} of ${items.length} terms`}
        </p>
      </div>

      <dl className="gloss__list">
        {sorted.map((item) => (
          <div className="gloss__row" key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
        {sorted.length === 0 ? <p className="gloss__empty">No term matches. Try a shorter word.</p> : null}
      </dl>
    </div>
  );
}
