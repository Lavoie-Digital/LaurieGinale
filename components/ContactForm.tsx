"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Check } from "lucide-react";

const subjects = [
  "Commande de produits",
  "Réalisation sur mesure",
  "Événement (mariage, corpo…)",
  "Autre question",
];

export default function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState(defaultSubject ?? subjects[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const fieldClass =
    "w-full rounded-2xl border border-grape/12 bg-white px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/20";

  return (
    <div className="relative rounded-[1.9rem] bg-white p-7 shadow-[0_24px_60px_-35px_rgba(106,63,134,0.6)] ring-1 ring-black/[0.04] sm:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-mint text-white"
            >
              <Check className="h-8 w-8" strokeWidth={3} />
            </motion.span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
              Message envoyé !
            </h3>
            <p className="mt-2 max-w-sm text-ink-soft">
              Merci pour votre demande. Laurie vous reviendra dans les plus brefs délais.
              (Ceci est une démonstration — aucun courriel n'est réellement envoyé.)
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 cursor-pointer rounded-full bg-cream-2 px-5 py-2.5 text-sm font-semibold text-grape transition-colors hover:bg-lavender-soft"
            >
              Envoyer une autre demande
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <h3 className="font-display text-2xl font-semibold text-ink">
              Demande d'information
            </h3>
            <p className="-mt-2 text-sm text-ink-soft">
              Une commande, un événement ou une création unique ? Écrivez-nous.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                  Nom complet
                </label>
                <input id="name" name="name" required placeholder="Votre nom" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
                  Téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="418 000-0000"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Courriel
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                className={fieldClass}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink">
                  Type de demande
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`${fieldClass} cursor-pointer appearance-none`}
                >
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-ink">
                  Date souhaitée <span className="text-muted">(optionnel)</span>
                </label>
                <input id="date" name="date" type="date" className={`${fieldClass} cursor-pointer`} />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                Votre message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Décrivez votre projet : occasion, thème, nombre de portions, allergies…"
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-7 py-4 text-base font-semibold text-white shadow-[0_18px_45px_-15px_rgba(225,75,138,0.85)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Envoyer ma demande
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
