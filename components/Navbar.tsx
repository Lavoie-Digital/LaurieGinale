"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/boutique", label: "Boutique" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/evenements", label: "Événements" },
  { href: "/contact", label: "Nous joindre" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "glass shadow-[0_12px_40px_-20px_rgba(106,63,134,0.4)]"
              : "border border-transparent bg-white/40 backdrop-blur-sm"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5" aria-label="LaurieGinale — accueil">
            <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
              <Image src="/logo.jpg" alt="" fill sizes="40px" className="object-cover scale-[1.35]" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg font-semibold text-ink">LaurieGinale</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Chocolaterie · Pâtisserie
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      active ? "text-grape" : "text-ink-soft hover:text-grape"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-lavender-soft"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/boutique"
              className="hidden rounded-full bg-rose px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(225,75,138,0.8)] transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex"
            >
              Commander
            </Link>
            <Link
              href="/panier"
              aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink ring-1 ring-black/5 transition-colors hover:bg-white"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose px-1 text-[11px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink ring-1 ring-black/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-grape/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-cream px-6 py-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-ink">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink ring-1 ring-black/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {links.map((l, i) => {
                  const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                  return (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                    >
                      <Link
                        href={l.href}
                        className={`block rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors ${
                          active ? "bg-lavender-soft text-grape" : "text-ink hover:bg-white"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <Link
                href="/boutique"
                className="mt-auto rounded-full bg-rose py-3.5 text-center text-base font-semibold text-white shadow-lg"
              >
                Commander maintenant
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
