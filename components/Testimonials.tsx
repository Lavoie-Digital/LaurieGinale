"use client";

import { Star, Quote } from "lucide-react";
import { Reveal, StaggerGroup, motion, staggerItem } from "./Motion";

type Review = { name: string; city: string; text: string; initials: string; tint: string };

const reviews: Review[] = [
  {
    name: "Mélanie Tremblay",
    city: "Chicoutimi",
    text: "Les trompe-l'œil sont super délicieux et le service est super agréable. On va assurément y retourner !",
    initials: "MT",
    tint: "#e7d6f5",
  },
  {
    name: "Jean-François Lavoie",
    city: "Jonquière",
    text: "Un choix magnifique et varié, des produits généreux. Une vraie belle découverte sur le boulevard Talbot.",
    initials: "JL",
    tint: "#f6c9de",
  },
  {
    name: "Caroline Bouchard",
    city: "La Baie",
    text: "J'ai commandé un gâteau thématique pour mon garçon : il était bouche bée. Du vrai travail d'artiste.",
    initials: "CB",
    tint: "#b7e3b0",
  },
  {
    name: "Marc-André Gagné",
    city: "Saguenay",
    text: "Le canard en chocolat de Pâques a fait sensation à la maison. Laurie a un talent fou.",
    initials: "MG",
    tint: "#f6dd8a",
  },
  {
    name: "Annie Girard",
    city: "Chicoutimi",
    text: "Des petits luxes à s'offrir sans culpabiliser. Les chocolats fondent littéralement en bouche.",
    initials: "AG",
    tint: "#f8cba6",
  },
  {
    name: "Sophie Roy",
    city: "Saguenay",
    text: "Accueil chaleureux et même des options sans gluten. On sent la passion dans chaque création.",
    initials: "SR",
    tint: "#f4b6d3",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-script text-3xl text-rose">on en parle…</span>
          <h2 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Ils ont craqué
          </h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm ring-1 ring-black/5">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-butter text-butter" />
              ))}
            </span>
            <span className="text-sm font-semibold text-ink">
              100 % recommandé <span className="text-muted">· avis Facebook</span>
            </span>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <motion.figure
              key={r.name}
              variants={staggerItem}
              className="group relative flex flex-col rounded-[1.75rem] bg-white p-7 shadow-[0_18px_50px_-30px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1"
            >
              <Quote className="h-8 w-8 text-lavender-soft" />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-grape"
                  style={{ background: r.tint }}
                >
                  {r.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-ink">{r.name}</span>
                  <span className="block text-xs text-muted">{r.city}</span>
                </span>
                <span className="ml-auto flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-butter text-butter" />
                  ))}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
