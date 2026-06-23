import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { Reveal } from "@/components/Motion";
import {
  Heart,
  Briefcase,
  Users,
  Baby,
  PartyPopper,
  CakeSlice,
  Martini,
  Gift,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Événements — Mariages, corpo & fêtes | LaurieGinale",
  description:
    "Commandes pour événements : mariages, événements corporatifs, fêtes familiales, baby showers, tables de desserts et plus. Faits main à Chicoutimi.",
};

const eventTypes = [
  {
    icon: Heart,
    title: "Mariages",
    text: "Pièces montées, tables de desserts et faveurs sucrées pour célébrer le grand jour.",
  },
  {
    icon: Briefcase,
    title: "Événements corporatifs",
    text: "Bouchées raffinées, boîtes-cadeaux personnalisées et plateaux pour clients et employés.",
  },
  {
    icon: Users,
    title: "Fêtes familiales",
    text: "Baptêmes, retrouvailles, fêtes de famille : un gâteau qui rassemble tout le monde.",
  },
  {
    icon: Baby,
    title: "Baby showers",
    text: "Gâteaux de couches, cupcakes thématiques et douceurs pastel tout en tendresse.",
  },
  {
    icon: CakeSlice,
    title: "Anniversaires",
    text: "Du gâteau licorne au trompe-l'œil renversant — pour les petits comme les grands.",
  },
  {
    icon: Martini,
    title: "Cocktails & 5 à 7",
    text: "Mignardises et bouchées élégantes à partager, présentées avec soin.",
  },
  {
    icon: PartyPopper,
    title: "Fêtes thématiques",
    text: "Noël, Pâques, Saint-Valentin, Fête du Canada… des collections de saison sur demande.",
  },
  {
    icon: Gift,
    title: "Cadeaux d'entreprise",
    text: "Chocolats fins en écrin, à votre image, pour remercier et marquer les esprits.",
  },
];

const steps = [
  { n: "01", title: "On discute", text: "Vous nous racontez l'occasion, le thème, le nombre d'invités et vos envies." },
  { n: "02", title: "On imagine", text: "Laurie vous propose une création sur mesure avec saveurs et estimation." },
  { n: "03", title: "On régale", text: "Le jour J, vos douceurs sont prêtes — fraîches, faites main, prêtes à épater." },
];

export default function EvenementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="événements"
        title="On s'occupe de la gourmandise"
        subtitle="Mariages, événements corporatifs, fêtes familiales… LaurieGinale crée des douceurs sur mesure pour tous vos grands moments."
      />

      {/* Feature image + intro */}
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-35px_rgba(106,63,134,0.6)]">
              <Image
                src="/evenement.jpg"
                alt="Création LaurieGinale pour un événement"
                fill
                sizes="(max-width:1024px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Des douceurs à la hauteur de l'événement
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Chaque rassemblement mérite une touche sucrée mémorable. De la simple
              boîte de mignardises à la table de desserts spectaculaire, on adapte
              saveurs, couleurs et quantités à votre occasion.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Options sans gluten, sans lactose et sans œufs disponibles sur demande,
              pour que personne ne reste sur sa faim.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Event types grid */}
      <section className="bg-watercolor px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <span className="font-script text-3xl text-rose">pour toutes les occasions</span>
            <h2 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Quel est votre événement ?
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {eventTypes.map((e, i) => (
              <Reveal key={e.title} delay={(i % 4) * 0.07}>
                <div className="group h-full rounded-[1.6rem] bg-white p-6 shadow-[0_18px_50px_-32px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lavender-soft text-grape transition-colors group-hover:bg-rose group-hover:text-white">
                    <e.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{e.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{e.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <span className="font-script text-3xl text-rose">simple comme bonjour</span>
            <h2 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Comment ça marche
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative h-full rounded-[1.6rem] bg-white p-7 shadow-[0_18px_50px_-32px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04]">
                  <span className="font-display text-5xl font-semibold text-lavender-soft">{s.n}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="parlons-en !"
        title="Planifions ensemble votre événement"
        text="Remplissez notre formulaire de demande d'information : on revient vers vous rapidement avec une proposition gourmande et personnalisée."
        cta="Faire une demande d'information"
        href="/contact"
      />
    </>
  );
}
