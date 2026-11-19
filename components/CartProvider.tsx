"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BagItem = {
  slug: string;
  name: string;
  colour: string;
  size: string;
  qty: number;
};

type CartValue = {
  items: BagItem[];
  count: number;
  add: (item: Omit<BagItem, "qty">) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
};

const STORAGE_KEY = "pjw-bag-v1";
const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [ready, setReady] = useState(false);

  // Load the bag once on the client. Storage can be blocked or full,
  // so every read and write is guarded and the store still works without it.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as BagItem[]);
    } catch {
      /* storage unavailable: start with an empty bag */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: the bag lives for this visit only */
    }
  }, [items, ready]);

  const add = useCallback((item: Omit<BagItem, "qty">) => {
    setItems((prev) => {
      const index = prev.findIndex(
        (x) => x.slug === item.slug && x.size === item.size,
      );
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...next[index], qty: next[index].qty + 1 };
        return next;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((x) =>
          x.slug === slug && x.size === size ? { ...x, qty } : x,
        )
        .filter((x) => x.qty > 0),
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setItems((prev) =>
      prev.filter((x) => !(x.slug === slug && x.size === size)),
    );
  }, []);

  const count = items.reduce((total, item) => total + item.qty, 0);
  const value = useMemo(
    () => ({ items, count, add, setQty, remove }),
    [items, count, add, setQty, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
