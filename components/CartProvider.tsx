"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

export type CartItem = {
  key: string; // productId + variant
  productId: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  lastAdded: string | null;
  addItem: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "laurieginale-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "key" | "qty">, qty = 1) => {
      const key = `${item.productId}__${item.variant}`;
      setItems((prev) => {
        const existing = prev.find((p) => p.key === key);
        if (existing) {
          return prev.map((p) =>
            p.key === key ? { ...p, qty: p.qty + qty } : p,
          );
        }
        return [...prev, { ...item, key, qty }];
      });
      setLastAdded(key);
      window.setTimeout(() => setLastAdded(null), 1800);
    },
    [],
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.key === key ? { ...p, qty: Math.max(0, qty) } : p))
        .filter((p) => p.qty > 0),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((p) => p.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, total } = useMemo(
    () => ({
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
    }),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, total, lastAdded, addItem, updateQty, removeItem, clear }),
    [items, count, total, lastAdded, addItem, updateQty, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
