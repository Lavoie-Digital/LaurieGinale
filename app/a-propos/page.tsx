import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { Reveal } from "@/components/Motion";
import { GraduationCap, Sparkles, Users, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos — Le rêve de Laurie Lemay | LaurieGinale",
  description:
    "L'histoire de LaurieGinale : comment Laurie Lemay, 24 ans, a transformé sa passion d'enfance en chocolaterie-pâtisserie à Chicoutimi.",
};

const timeline = [
  {
    icon: Sparkles,
    year: "L'étincelle",
    title: "Le petit four Easy Bake",
    text: "« Quand j'étais toute petite, je n'ai jamais vraiment joué aux poupées. Ce qui m'intéressait, c'était plutôt le petit four Easy Bake. » La vocation était déjà là.",
  },
  {
    icon: GraduationCap,
    year: "La formation",
    title: "Du CFP à l'Académie du Chocolat",
    text: "Cours de pâtisserie au CFP de Jonquière, DEP en cuisine, puis spécialisation à l'Académie du Chocolat de Montréal et formation en lancement d'entreprise au CFP du Grand-Fjord.",
  },
  {
    icon: Users,
    year: "Le déclic",
    title: "Un mentor inspirant",
    text: "Aux côtés du chef chocolatier Francis Pearson : « Il m'a toujours conseillé de commencer de bonne heure, qu'il valait mieux commencer tôt que tard. »",
  },
  {
    icon: Store,
    year: "Décembre 2024",
    title: "L'ouverture, boulevard Talbot",
    text: "Un coup de cœur pour un ancien local de Gagnon Frères, les clés reçues le 1ᵉʳ novembre, et l'ouverture le 16 décembre 2024. Le rêve prend forme.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="notre histoire"
        title="Le rêve d'une jeune chocolatière"
        subtitle="À 24 ans, Laurie Lemay a fait de sa passion d'enfance une boutique gourmande au cœur de Chicoutimi."
      />

      {/* Intro + portrait */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-35px_rgba(106,63,134,0.6)]">
              <Image
                src="/photo-histoire.jpg"
                alt="Laurie Lemay, fondatrice de LaurieGinale, dans sa boutique"
                fill
                sizes="(max-width:1024px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Des petits luxes à s'offrir
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                LaurieGinale, c'est l'aboutissement d'un rêve nourri depuis l'enfance.
                Après plusieurs expériences en restauration et une spécialisation en
                chocolaterie, Laurie a choisi de se lancer pour offrir aux gens du
                Saguenay des desserts originaux et raffinés.
              </p>
              <p>
                Chocolats fins, trompe-l'œil bluffants, pâtisseries individuelles et
                gâteaux personnalisés : chaque pièce est confectionnée à la main, avec
                l'envie de créer « des petits luxes à s'offrir » dans une ambiance
                chaleureuse et conviviale.
              </p>
            </div>
            <figure className="mt-8 rounded-2xl border-l-4 border-rose bg-white/70 p-6 shadow-sm">
              <blockquote className="font-display text-xl italic leading-snug text-grape">
                « Je veux que LaurieGinale devienne une référence gourmande de la région. »
              </blockquote>
              <figcaption className="mt-2 text-sm text-muted">— Laurie Lemay, fondatrice</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-watercolor px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <span className="font-script text-3xl text-rose">étape par étape</span>
            <h2 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">
              De la passion à la boutique
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-lavender/40 sm:block" />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.08}>
                  <div className="relative flex gap-5 rounded-[1.6rem] bg-white p-6 shadow-[0_18px_50px_-32px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04]">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-lavender-soft text-grape">
                      <t.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-rose">
                        {t.year}
                      </span>
                      <h3 className="mt-0.5 font-display text-xl font-semibold text-ink">
                        {t.title}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-ink-soft">{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Family note */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Users className="mx-auto h-10 w-10 text-lavender" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Une aventure de famille
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Le projet n'est pas une affaire en solo : sa grand-mère, sa mère et son frère
            l'épaulent à la boutique et l'ont soutenue tout au long des préparatifs. C'est
            ce cœur familial qu'on retrouve dans chaque création.
          </p>
        </Reveal>
      </section>

      <CtaBanner
        eyebrow="envie de goûter ?"
        title="Découvrez les créations de Laurie"
        text="Parcourez la boutique en ligne ou venez nous rencontrer au 1464, boulevard Talbot, à Chicoutimi."
        cta="Voir la boutique"
        href="/boutique"
      />
    </>
  );
}
