"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, Heart, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Resting positions for the watercolor blobs (they "explode" from center → here)
const blobs = [
  { c: "#b388d9", s: 380, x: "-20%", y: "-24%", d: 0.0 },
  { c: "#e14b8a", s: 320, x: "64%", y: "-16%", d: 0.08 },
  { c: "#f6dd8a", s: 280, x: "72%", y: "56%", d: 0.16 },
  { c: "#b7e3b0", s: 300, x: "-22%", y: "60%", d: 0.12 },
  { c: "#f8cba6", s: 240, x: "32%", y: "82%", d: 0.2 },
  { c: "#f4b6d3", s: 260, x: "44%", y: "-32%", d: 0.06 },
];

const particleColors = ["#b388d9", "#e14b8a", "#f6dd8a", "#b7e3b0", "#f8cba6", "#f4b6d3", "#6a3f86"];
const particles = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * Math.PI * 2 + (i % 3);
  const dist = 180 + (i % 6) * 56;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    s: 6 + (i % 4) * 4,
    c: particleColors[i % particleColors.length],
    d: 0.2 + (i % 6) * 0.03,
  };
});

// Small decorative sparkle dots that gently drift around the medallion
const sparkles = [
  { cls: "left-[2%] top-[26%]", s: 10, c: "#e14b8a", d: 1.0 },
  { cls: "right-[6%] top-[40%]", s: 8, c: "#b388d9", d: 1.1 },
  { cls: "left-[14%] bottom-[14%]", s: 12, c: "#f6dd8a", d: 1.2 },
  { cls: "right-[16%] bottom-[8%]", s: 9, c: "#b7e3b0", d: 1.05 },
  { cls: "left-[40%] top-[2%]", s: 7, c: "#f8cba6", d: 1.15 },
];

const flavors = [
  "Trompe-l'œil",
  "Chocolats fins",
  "Cupcakes",
  "Macarons",
  "Gâteaux sur mesure",
  "Pralinés",
  "Pâtisseries",
  "Truffes",
];

// Full-bleed ambient color orbs that drift slowly to fill the side voids on wide screens
const ambient = [
  { c: "#b388d9", s: "36rem", pos: { left: "-10%", top: "2%" }, dur: 17, dx: 40, dy: 30, o: 0.45 },
  { c: "#b7e3b0", s: "30rem", pos: { left: "-8%", bottom: "-14%" }, dur: 21, dx: 50, dy: -40, o: 0.4 },
  { c: "#e14b8a", s: "34rem", pos: { right: "-12%", top: "-10%" }, dur: 19, dx: -45, dy: 35, o: 0.4 },
  { c: "#f6dd8a", s: "26rem", pos: { right: "-6%", top: "44%" }, dur: 23, dx: -35, dy: -30, o: 0.45 },
  { c: "#f8cba6", s: "22rem", pos: { right: "20%", bottom: "-12%" }, dur: 25, dx: 30, dy: -25, o: 0.35 },
  { c: "#f4b6d3", s: "24rem", pos: { left: "18%", top: "-12%" }, dur: 27, dx: -28, dy: 32, o: 0.35 },
];

const title = ["Une", "explosion", "de", "saveurs,", "faite", "main."];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-watercolor" />

      {/* Ambient full-bleed color play — drifting blurred orbs fill the side voids */}
      <div aria-hidden className="hero-ambient pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {ambient.map((o, i) => (
          <motion.div
            key={`amb-${i}`}
            className="absolute rounded-full blur-[80px] mix-blend-multiply"
            style={{ width: o.s, height: o.s, background: o.c, opacity: o.o, ...o.pos }}
            animate={
              reduce
                ? undefined
                : { x: [0, o.dx, 0], y: [0, o.dy, 0], scale: [1, 1.12, 1] }
            }
            transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* subtle moving sheen across the whole hero */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50rem 40rem at 50% 30%, rgba(255,255,255,0.35), transparent 70%)",
          }}
          animate={reduce ? undefined : { opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ── Left: copy ─────────────────────────────────────────── */}
          <div className="relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-grape shadow-sm ring-1 ring-grape/10"
            >
              <Sparkles className="h-4 w-4 text-rose" />
              Chocolaterie · Pâtisserie artisanale — Chicoutimi
            </motion.div>

            <h1 className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
              {title.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={`inline-block ${w === "saveurs," ? "text-gradient" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.45 + i * 0.08 }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.0 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft lg:mx-0"
            >
              Chocolats fins, trompe-l'œil bluffants et pâtisseries sur mesure.
              Chaque pièce est imaginée et façonnée à la main par{" "}
              <span className="font-semibold text-grape">Laurie Lemay</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.15 }}
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
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-7 py-3.5 text-base font-semibold text-grape ring-1 ring-grape/15 transition-colors hover:bg-white"
              >
                Voir les créations
              </Link>
            </motion.div>

            {/* Stats row to give the hero substance */}
            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.3 }}
              className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 lg:mx-0"
            >
              {[
                { k: "100 %", v: "recommandé" },
                { k: "Fait main", v: "chaque jour" },
                { k: "2024", v: "à Chicoutimi" },
              ].map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <dt className="font-display text-2xl font-semibold text-grape sm:text-3xl">
                    {s.k}
                  </dt>
                  <dd className="text-xs text-muted sm:text-sm">{s.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ── Right: medallion + explosion (hidden on mobile) ────── */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[28rem] lg:block">
            {/* exploding watercolor blobs */}
            {blobs.map((b, i) => (
              <motion.div
                key={i}
                aria-hidden
                className="absolute rounded-full blur-2xl"
                style={{
                  width: b.s,
                  height: b.s,
                  left: "50%",
                  top: "50%",
                  background: b.c,
                  opacity: 0.5,
                }}
                initial={{ x: "-50%", y: "-50%", scale: 0 }}
                animate={
                  reduce
                    ? { x: `calc(-50% + ${b.x})`, y: `calc(-50% + ${b.y})`, scale: 1 }
                    : {
                        x: `calc(-50% + ${b.x})`,
                        y: `calc(-50% + ${b.y})`,
                        scale: [0, 1.15, 1],
                      }
                }
                transition={{ duration: 1.2, ease, delay: b.d }}
              />
            ))}

            {/* flavor confetti burst */}
            {!reduce &&
              particles.map((p, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{ width: p.s, height: p.s, background: p.c }}
                  initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                  animate={{
                    x: `calc(-50% + ${p.x}px)`,
                    y: `calc(-50% + ${p.y}px)`,
                    scale: [0, 1, 0.6],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.4, ease, delay: p.d }}
                />
              ))}

            {/* rotating dashed orbit ring */}
            <motion.div
              aria-hidden
              className="absolute inset-[3%] rounded-full border border-dashed border-grape/20"
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* logo medallion */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
              className="absolute inset-[7%] grid place-items-center"
            >
              <div className="relative h-full w-full">
                <div className="absolute inset-0 rounded-full bg-white shadow-[0_45px_100px_-30px_rgba(106,63,134,0.6)] ring-8 ring-white" />
                <motion.div
                  animate={reduce ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 overflow-hidden rounded-full"
                >
                  <Image
                    src="/logo.jpg"
                    alt="LaurieGinale Chocolaterie Pâtisserie"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 440px"
                    className="scale-[1.04] object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* decorative drifting sparkles */}
            {sparkles.map((sp, i) => (
              <motion.span
                key={`sp-${i}`}
                aria-hidden
                className={`absolute ${sp.cls} rounded-full`}
                style={{ width: sp.s, height: sp.s, background: sp.c, boxShadow: `0 0 14px ${sp.c}` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  reduce
                    ? { scale: 1, opacity: 0.9 }
                    : { scale: 1, opacity: [0.4, 1, 0.4], y: [0, -10, 0] }
                }
                transition={{
                  scale: { duration: 0.5, delay: sp.d },
                  opacity: { duration: 4, repeat: Infinity, delay: sp.d },
                  y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: sp.d },
                }}
              />
            ))}

            {/* floating glass badge — rating */}
            <motion.div
              initial={{ scale: 0, opacity: 0, x: -10 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 16, delay: 1.1 }}
              className="absolute -left-2 top-[14%] sm:left-[-6%]"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-[0_18px_45px_-20px_rgba(106,63,134,0.6)]"
              >
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-butter text-butter" />
                  ))}
                </span>
                <span className="text-xs font-semibold text-ink">100 % recommandé</span>
              </motion.div>
            </motion.div>

            {/* floating glass badge — handmade */}
            <motion.div
              initial={{ scale: 0, opacity: 0, x: 10 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 16, delay: 1.25 }}
              className="absolute -right-1 bottom-[12%] sm:right-[-4%]"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="glass flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-[0_18px_45px_-20px_rgba(106,63,134,0.6)]"
              >
                <Heart className="h-4 w-4 fill-rose text-rose" />
                <span className="text-xs font-semibold text-ink">Fait main à Chicoutimi</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Flavor marquee strip — reinforces the "explosion of flavors" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="marquee-pause relative mt-2 overflow-hidden border-y border-grape/10 bg-white/40 py-4 backdrop-blur-sm"
      >
        <div className="flex w-max animate-marquee items-center gap-8 pr-8">
          {[...flavors, ...flavors].map((f, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-xl font-medium text-ink/70 sm:text-2xl">{f}</span>
              <Sparkles className="h-4 w-4 shrink-0 text-rose/70" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
