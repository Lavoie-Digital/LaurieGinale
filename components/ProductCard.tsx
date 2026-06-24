"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Check, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { type Product, formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [vIndex, setVIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const variant = product.variants[vIndex];

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      variant: variant.label,
      price: variant.price,
      image: product.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      layout
      className="group flex flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_44px_-28px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-grape shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}
        {product.category === "saint-valentin" && (
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-rose shadow-[0_6px_18px_-6px_rgba(0,0,0,0.4)] ring-1 ring-black/5 backdrop-blur">
            <Heart className="h-4 w-4 fill-rose" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-ink">{product.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{product.blurb}</p>

        {product.variants.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.variants.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setVIndex(i)}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  i === vIndex
                    ? "bg-grape text-white"
                    : "bg-cream-2 text-ink-soft hover:bg-lavender-soft"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <div className="leading-none">
            <span className="font-display text-2xl font-semibold text-ink">
              {formatPrice(variant.price)}
            </span>
            {product.variants.length === 1 && (
              <span className="ml-1 text-xs text-muted">/ {variant.label.toLowerCase()}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Ajouter ${product.name} au panier`}
            className={`relative grid h-11 w-11 cursor-pointer place-items-center overflow-hidden rounded-full text-white shadow-md transition-colors ${
              added ? "bg-mint" : "bg-rose hover:bg-[#cf3f7d]"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="h-5 w-5" strokeWidth={3} />
                </motion.span>
              ) : (
                <motion.span key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Plus className="h-5 w-5" strokeWidth={2.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
