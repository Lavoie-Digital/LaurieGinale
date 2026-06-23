"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import ProductCard from "./ProductCard";
import { categories, products, type CategoryId } from "@/lib/products";

type Filter = "all" | CategoryId;

export default function BoutiqueClient() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = (params.get("cat") as Filter) || "all";
  const [filter, setFilter] = useState<Filter>(
    categories.some((c) => c.id === initial) ? initial : "all",
  );

  const select = useCallback(
    (f: Filter) => {
      setFilter(f);
      const url = f === "all" ? "/boutique" : `/boutique?cat=${f}`;
      router.replace(url, { scroll: false });
    },
    [router],
  );

  const visible = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const chips: { id: Filter; label: string; accent?: string }[] = [
    { id: "all", label: "Tout" },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.short, accent: c.accent })),
  ];

  const activeCat = categories.find((c) => c.id === filter);

  return (
    <section className="px-6 pb-8">
      <div className="mx-auto max-w-6xl">
        {/* Filter chips */}
        <div className="sticky top-20 z-30 -mx-6 mb-2 px-6 py-3">
          <div className="no-scrollbar flex justify-start gap-2.5 overflow-x-auto rounded-full bg-white/70 p-2 shadow-sm ring-1 ring-black/5 backdrop-blur-md sm:justify-center">
            {chips.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => select(c.id)}
                  className={`relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? "text-white" : "text-ink-soft hover:text-grape"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-grape"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeCat && (
          <motion.p
            key={activeCat.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-8 max-w-2xl text-center text-ink-soft"
          >
            {activeCat.blurb}
          </motion.p>
        )}

        <LayoutGroup>
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
