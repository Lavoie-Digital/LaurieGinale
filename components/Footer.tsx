import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40rem 30rem at 10% 0%, rgba(179,136,217,0.35), transparent 60%), radial-gradient(36rem 28rem at 100% 100%, rgba(225,75,138,0.3), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/70">
              <Image src="/logo.jpg" alt="" fill sizes="48px" className="object-cover scale-[1.35]" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-2xl font-semibold">LaurieGinale</p>
              <p className="text-xs uppercase tracking-[0.22em] text-cream/60">
                Chocolaterie · Pâtisserie
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
            Des petits luxes à s'offrir, faits main chaque jour à Chicoutimi.
            Chocolats fins, trompe-l'œil et pâtisseries sur mesure.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.facebook.com/p/LaurieGinale-Chocolaterie-P%C3%A2tisserie-61563704051352/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-rose"
            >
              <Facebook className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-rose"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Navigation</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
            {[
              ["Boutique", "/boutique"],
              ["À propos", "/a-propos"],
              ["Réalisations uniques", "/realisations"],
              ["Événements", "/evenements"],
              ["Nous joindre", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="link-underline transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Nous trouver</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-rose-soft" />
              <span>1464, boulevard Talbot<br />Chicoutimi (Québec) G7H 4C2</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-rose-soft" />
              <a href="tel:+14185452022" className="hover:text-white">418 545-2022</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-rose-soft" />
              <a href="mailto:info@laurieginale.com" className="hover:text-white">
                info@laurieginale.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} LaurieGinale Chocolaterie-Pâtisserie. Tous droits réservés.</p>
          <p>Site démonstration — conçu avec gourmandise.</p>
        </div>
      </div>
    </footer>
  );
}
