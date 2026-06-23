"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Check, Store } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/products";

export default function CartClient() {
  const { items, updateQty, removeItem, total, clear } = useCart();
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div className="mx-auto max-w-xl px-6 py-10 text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint text-white"
        >
          <Check className="h-10 w-10" strokeWidth={3} />
        </motion.span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-ink">Commande confirmée !</h2>
        <p className="mt-3 text-ink-soft">
          Merci ! Votre commande sera préparée avec amour et prête pour la cueillette au
          1464, boulevard Talbot. (Démonstration — aucun paiement n'a été traité.)
        </p>
        <Link
          href="/boutique"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Continuer mes achats <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lavender-soft text-grape">
          <ShoppingBag className="h-9 w-9" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-ink">Votre panier est vide</h2>
        <p className="mt-3 text-ink-soft">
          Il est encore temps de vous faire plaisir — la boutique regorge de douceurs.
        </p>
        <Link
          href="/boutique"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Découvrir la boutique <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 pb-8 lg:grid-cols-[1.5fr_1fr]">
      {/* Items */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.key}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex gap-4 rounded-[1.4rem] bg-white p-4 shadow-[0_16px_44px_-30px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04]"
            >
              <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </span>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight text-ink">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted">{item.variant}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    aria-label={`Retirer ${item.name}`}
                    className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-rose-soft/40 hover:text-rose"
                  >
                    <Trash2 className="h-[18px] w-[18px]" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="inline-flex items-center rounded-full bg-cream-2 p-1">
                    <button
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      aria-label="Diminuer la quantité"
                      className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:text-rose"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold text-ink">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      aria-label="Augmenter la quantité"
                      className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:text-rose"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-display text-lg font-semibold text-ink">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={clear}
          className="cursor-pointer text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-rose hover:underline"
        >
          Vider le panier
        </button>
      </div>

      {/* Summary */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[1.6rem] bg-white p-7 shadow-[0_24px_60px_-35px_rgba(106,63,134,0.6)] ring-1 ring-black/[0.04]">
          <h2 className="font-display text-2xl font-semibold text-ink">Résumé</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-ink-soft">
              <dt>Sous-total</dt>
              <dd className="font-medium text-ink">{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>Cueillette en boutique</dt>
              <dd className="font-medium text-grape">Gratuit</dd>
            </div>
            <div className="my-3 border-t border-black/5" />
            <div className="flex items-baseline justify-between">
              <dt className="font-display text-lg font-semibold text-ink">Total</dt>
              <dd className="font-display text-2xl font-semibold text-rose">{formatPrice(total)}</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-cream-2 p-3.5 text-xs text-ink-soft">
            <Store className="mt-0.5 h-4 w-4 shrink-0 text-grape" />
            Cueillette au 1464, boulevard Talbot, Chicoutimi. Taxes calculées à la confirmation.
          </div>

          <button
            onClick={() => {
              setOrdered(true);
              clear();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-7 py-4 font-semibold text-white shadow-[0_18px_45px_-15px_rgba(225,75,138,0.85)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Passer la commande
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="/boutique"
            className="mt-3 block text-center text-sm font-medium text-grape hover:underline"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}
