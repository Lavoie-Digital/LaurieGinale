"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-soft">
                {r.occasion}
              </span>
              <h3 className="font-display text-base font-semibold leading-tight">{r.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RealisationsPreview() {
  return (
    <section className="overflow-hidden py-20">
      <Reveal className="mx-auto mb-10 max-w-2xl px-6 text-center">
        <span className="font-script text-3xl text-rose">nos réalisations</span>
        <h2 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Des créations sur mesure
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          Anniversaires, pièces artistiques, trompe-l'œil… un aperçu des demandes spéciales
          auxquelles Laurie a donné vie. La vôtre est la prochaine.
        </p>
      </Reveal>

      <div className="space-y-5">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>

      <Reveal className="mt-12 text-center">
        <Link
          href="/realisations"
          className="group inline-flex items-center gap-2 rounded-full bg-grape px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_45px_-15px_rgba(106,63,134,0.85)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Voir toutes les réalisations
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
