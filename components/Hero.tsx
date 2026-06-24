"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Background carousel slides (pâtissière at work)
const slides = [
  { src: "/hero-1.jpg", alt: "Pâtissière garnissant un gâteau rose dans sa cuisine" },
  { src: "/hero-2.jpg", alt: "Pâtissière décorant des macarons à la poche à douille" },
  { src: "/hero-3.jpg", alt: "Pâtissière lissant le glaçage d'un gâteau" },
];

const SLIDE_MS = 5000;

const title = ["L'art", "sucré,", "fait", "maison."];

export default function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink">
      {/* ── Background carousel ────────────────────────────────────── */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease }, scale: { duration: SLIDE_MS / 1000 + 1.2, ease } }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Brand-tinted gradient veils for legibility ─────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/55 to-grape/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-ink/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(34rem 28rem at 6% 100%, rgba(179,136,217,0.55), transparent 60%)," +
            "radial-gradient(30rem 26rem at 96% 0%, rgba(225,75,138,0.45), transparent 60%)",
        }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-12 pt-32 sm:pt-36">
        <div className="max-w-2xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white shadow-sm ring-1 ring-white/25 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-pink" />
            Chocolaterie · Pâtisserie artisanale — Chicoutimi
          </motion.div>

          <h1 className="mt-6 font-display text-[2.9rem] font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(43,34,48,0.5)] sm:text-6xl lg:text-[4.6rem]">
            {title.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className={`inline-block ${w === "sucré," ? "text-gradient-light" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.35 + i * 0.09 }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.95 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 lg:mx-0"
          >
            Chocolats fins, trompe-l'œil bluffants et pâtisseries sur mesure.
            Chaque pièce est imaginée et façonnée à la main par{" "}
            <span className="font-semibold text-white">Laurie Lemay</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.1 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
          >
            <Link
              href="/boutique"
              className="group inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_45px_-15px_rgba(225,75,138,0.85)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Commander
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3.5 text-base font-semibold text-white ring-1 ring-white/30 backdrop-blur-md transition-colors hover:bg-white/25"
            >
              Voir les créations
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.25 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:items-start"
          >
            <div className="flex items-center gap-2">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-butter text-butter" />
                ))}
              </span>
              <span className="text-sm font-medium text-white/85">100 % recommandé</span>
            </div>
            <span aria-hidden className="hidden h-4 w-px bg-white/25 sm:block" />
            <span className="text-sm font-medium text-white/85">
              Fait maison chaque jour · depuis 2024
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Carousel indicators ────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 lg:left-auto lg:right-10 lg:translate-x-0">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Afficher l'image ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
