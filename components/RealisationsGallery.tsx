"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { realisations, type Realisation } from "@/lib/realisations";
import { Reveal } from "./Motion";

// Two marquee rows, split for opposite-direction scroll
const rowA = realisations.slice(0, 5);
const rowB = realisations.slice(5);

function MarqueeRow({ items, reverse }: { items: Realisation[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-pause flex w-max gap-5">
      <div
        className="flex w-max gap-5 animate-marquee"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((r, i) => (
          <div
            key={i}
            className="relative h-56 w-44 shrink-0 overflow-hidden rounded-[1.4rem] shadow-[0_18px_45px_-25px_rgba(106,63,134,0.6)] sm:h-72 sm:w-56"
          >
            <Image src={r.image} alt={r.title} fill sizes="224px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RealisationsGallery() {
  const [active, setActive] = useState<Realisation | null>(null);

  return (
    <>
      {/* Auto-scrolling marquee */}
      <section className="space-y-5 overflow-hidden py-6">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </section>

      {/* Interactive masonry */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 text-center">
            <span className="font-script text-3xl text-rose">galerie</span>
            <h2 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Chaque pièce, une histoire
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Survolez une création pour la découvrir — ou cliquez pour l'agrandir.
            </p>
          </Reveal>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {realisations.map((r, i) => (
              <Reveal key={r.image} delay={(i % 3) * 0.06}>
                <button
                  onClick={() => setActive(r)}
                  className={`group relative block w-full cursor-pointer overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_-30px_rgba(106,63,134,0.55)] ring-1 ring-black/[0.04] ${
                    r.span ? "aspect-square" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(max-width:1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-left text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-soft">
                      {r.occasion}
                    </span>
                    <h3 className="mt-0.5 font-display text-xl font-semibold">{r.title}</h3>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              aria-label="Fermer"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-xl overflow-hidden rounded-[1.8rem] bg-white shadow-2xl"
            >
              <div className="relative aspect-[3/4] max-h-[70vh] w-full">
                <Image src={active.image} alt={active.title} fill sizes="600px" className="object-cover" />
              </div>
              <figcaption className="p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-rose">
                  {active.occasion}
                </span>
                <h3 className="mt-0.5 font-display text-2xl font-semibold text-ink">{active.title}</h3>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
