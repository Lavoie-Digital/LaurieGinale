import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Nous joindre — LaurieGinale Chocolaterie | Chicoutimi",
  description:
    "Coordonnées de LaurieGinale : 1464 boulevard Talbot, Chicoutimi. Téléphone 418 545-2022. Formulaire de demande d'information.",
};

const infos = [
  {
    icon: MapPin,
    label: "Adresse",
    lines: ["1464, boulevard Talbot", "Chicoutimi (Québec) G7H 4C2"],
    href: "https://www.google.com/maps/search/?api=1&query=1464+boulevard+Talbot+Chicoutimi",
  },
  {
    icon: Phone,
    label: "Téléphone",
    lines: ["418 545-2022"],
    href: "tel:+14185452022",
  },
  {
    icon: Mail,
    label: "Courriel",
    lines: ["info@laurieginale.com"],
    href: "mailto:info@laurieginale.com",
  },
];

const hours = [
  ["Lundi", "Fermé"],
  ["Mardi – Mercredi", "10 h – 18 h"],
  ["Jeudi – Vendredi", "10 h – 19 h"],
  ["Samedi", "10 h – 17 h"],
  ["Dimanche", "Fermé"],
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="nous joindre"
        title="Parlons gourmandise"
        subtitle="Une question, une commande spéciale ou un événement ? On adore avoir de vos nouvelles."
      />

      <section className="px-6 pb-12 pt-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Coordinates + map */}
          <Reveal className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {infos.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.icon === MapPin ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group rounded-[1.5rem] bg-white p-5 shadow-[0_18px_50px_-32px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04] transition-transform hover:-translate-y-1"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lavender-soft text-grape transition-colors group-hover:bg-rose group-hover:text-white">
                    <info.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {info.label}
                  </p>
                  {info.lines.map((l) => (
                    <p key={l} className="text-sm font-medium text-ink">
                      {l}
                    </p>
                  ))}
                </a>
              ))}

              {/* Hours */}
              <div className="rounded-[1.5rem] bg-white p-5 shadow-[0_18px_50px_-32px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04]">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lavender-soft text-grape">
                  <Clock className="h-5 w-5" />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Heures d'ouverture
                </p>
                <ul className="mt-1 space-y-0.5 text-sm">
                  {hours.map(([d, h]) => (
                    <li key={d} className="flex justify-between gap-3 text-ink">
                      <span className="text-ink-soft">{d}</span>
                      <span className="font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_-32px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04]">
              <iframe
                title="Carte — 1464 boulevard Talbot, Chicoutimi"
                src="https://www.google.com/maps?q=1464+boulevard+Talbot+Chicoutimi+Quebec&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
