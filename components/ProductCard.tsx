"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { type Product, formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";

const MAPLE =
  "M383.8 351.7c-1.5-3.6-7.9-1.5-7.9-1.5l-58.6 10.3c2.3-7.7 4-20.4 0-27.3-3.4-5.9-14.7-3.9-14.7-3.9l44.6-44.2c-12.6-3.6-9.7-12.9-7.4-22l-39.6 9.3 8.6-22.7c-9.9 1.6-19.9 3.4-29.9 4.9 .9-15.6 1.8-31.2 2.6-46.8l-23.6 19.4c-3.6 1.5-5.9-3.4-5.9-3.4l-21.6-41.8-21.6 41.8s-2.3 4.9-5.9 3.4l-23.6-19.4c .9 15.6 1.8 31.2 2.6 46.8-10-1.5-20-3.3-29.9-4.9l8.6 22.7-39.6-9.3c2.3 9.1 5.2 18.4-7.4 22l44.6 44.2s-11.3-2-14.7 3.9c-4 6.9-2.3 19.6 0 27.3l-58.6-10.3s-6.4-2.1-7.9 1.5c-1.4 3.5 3.4 6.4 3.4 6.4l84.8 46.6c4.3 2.4 3.1 6.1 2.6 8.4l-4.9 22.7 60.2-7.4c3.6-.4 3.4 2.9 3.4 2.9l-2.6 73.7h18.4l-2.6-73.7s-.2-3.3 3.4-2.9l60.2 7.4-4.9-22.7c-.5-2.3-1.7-6 2.6-8.4l84.8-46.6s4.8-2.9 3.4-6.4z";

function CanadaFlag() {
  return (
    <span className="flex h-7 w-14 items-center justify-center overflow-hidden rounded-md bg-white shadow-[0_6px_18px_-6px_rgba(0,0,0,0.5)] ring-1 ring-black/10">
      <svg viewBox="0 0 64 32" className="h-full w-full" aria-hidden>
        <rect width="64" height="32" fill="#ffffff" />
        <rect width="16" height="32" fill="#d52b1e" />
        <rect x="48" width="16" height="32" fill="#d52b1e" />
        <g transform="translate(32 16) scale(0.0317) translate(-256 -256)">
          <path d={MAPLE} fill="#d52b1e" />
        </g>
      </svg>
    </span>
  );
}

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
        {product.category === "fete-canada" && (
          <span className="absolute right-3 top-3">
            <CanadaFlag />
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
