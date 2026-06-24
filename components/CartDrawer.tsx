"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Check,
  Store,
  CalendarClock,
  CreditCard,
  Lock,
  X,
} from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/products";

type Step = "cart" | "payment" | "done";
type PayMethod = "credit" | "debit";

// Pickup time slots (boutique hours)
const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

const formatPickup = (date: string, time: string) => {
  const d = new Date(`${date}T${time}`);
  const day = new Intl.DateTimeFormat("fr-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
  return `${day} à ${time}`;
};

export default function CartDrawer() {
  const { items, updateQty, removeItem, total, clear, isOpen, closeCart } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [confirmed, setConfirmed] = useState<{ date: string; time: string } | null>(null);

  // Payment form (demo)
  const [method, setMethod] = useState<PayMethod>("credit");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  // Earliest pickup = tomorrow (preparation time)
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  // Lock body scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  // Reset to the cart step whenever the drawer is reopened after a completed order
  useEffect(() => {
    if (isOpen && step === "done") setStep("cart");
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const canCheckout = items.length > 0 && pickupDate !== "" && pickupTime !== "";

  const digits = cardNumber.replace(/\s/g, "");
  const cardValid =
    cardName.trim().length > 1 &&
    digits.length === 16 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    /^\d{3,4}$/.test(cvc);

  const handleCardNumber = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 16);
    setCardNumber(d.replace(/(.{4})/g, "$1 ").trim());
  };
  const handleExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
  };

  const pay = () => {
    setProcessing(true);
    window.setTimeout(() => {
      setConfirmed({ date: pickupDate, time: pickupTime });
      setProcessing(false);
      setStep("done");
      clear();
      // reset payment fields
      setCardName("");
      setCardNumber("");
      setExpiry("");
      setCvc("");
    }, 1100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-grape/30 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            role="dialog"
            aria-label="Panier"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
              <div className="flex items-center gap-2.5">
                {step === "payment" && (
                  <button
                    onClick={() => setStep("cart")}
                    aria-label="Retour au panier"
                    className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white text-ink ring-1 ring-black/5 transition-colors hover:text-grape"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {step === "cart" && "Votre panier"}
                  {step === "payment" && "Paiement"}
                  {step === "done" && "Merci !"}
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Fermer le panier"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white text-ink ring-1 ring-black/5 transition-colors hover:text-rose"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ───────────────────────── CART STEP ───────────────────────── */}
            {step === "cart" && (
              items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-lavender-soft text-grape">
                    <ShoppingBag className="h-9 w-9" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                    Votre panier est vide
                  </h3>
                  <p className="mt-2 text-ink-soft">
                    La boutique regorge de douceurs à découvrir.
                  </p>
                  <Link
                    href="/boutique"
                    onClick={closeCart}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    Découvrir la boutique <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                    {/* Items */}
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.div
                          key={item.key}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          className="flex gap-3.5 rounded-[1.2rem] bg-white p-3.5 shadow-[0_16px_44px_-30px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04]"
                        >
                          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                            <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                          </span>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-display text-base font-semibold leading-tight text-ink">
                                  {item.name}
                                </h3>
                                <p className="text-xs text-muted">{item.variant}</p>
                              </div>
                              <button
                                onClick={() => removeItem(item.key)}
                                aria-label={`Retirer ${item.name}`}
                                className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-rose-soft/40 hover:text-rose"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="inline-flex items-center rounded-full bg-cream-2 p-1">
                                <button
                                  onClick={() => updateQty(item.key, item.qty - 1)}
                                  aria-label="Diminuer la quantité"
                                  className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:text-rose"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-8 text-center text-sm font-semibold text-ink">{item.qty}</span>
                                <button
                                  onClick={() => updateQty(item.key, item.qty + 1)}
                                  aria-label="Augmenter la quantité"
                                  className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:text-rose"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="font-display text-base font-semibold text-ink">
                                {formatPrice(item.price * item.qty)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Pickup date & time */}
                    <div className="rounded-[1.2rem] bg-white p-5 shadow-[0_16px_44px_-30px_rgba(106,63,134,0.5)] ring-1 ring-black/[0.04]">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-lavender-soft text-grape">
                          <CalendarClock className="h-4 w-4" />
                        </span>
                        <h3 className="font-display text-lg font-semibold text-ink">Cueillette</h3>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <label className="flex flex-col gap-1.5">
                          <span className="text-xs font-semibold text-ink">Date</span>
                          <input
                            type="date"
                            min={minDate}
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="rounded-xl border-0 bg-cream-2 px-3 py-2.5 text-sm text-ink ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-grape"
                          />
                        </label>
                        <label className="flex flex-col gap-1.5">
                          <span className="text-xs font-semibold text-ink">Heure</span>
                          <select
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="cursor-pointer rounded-xl border-0 bg-cream-2 px-3 py-2.5 text-sm text-ink ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-grape"
                          >
                            <option value="" disabled>
                              Heure
                            </option>
                            {TIME_SLOTS.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={clear}
                      className="cursor-pointer text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-rose hover:underline"
                    >
                      Vider le panier
                    </button>
                  </div>

                  {/* Footer: totals + checkout */}
                  <div className="border-t border-black/5 bg-white px-6 py-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-ink-soft">Total</span>
                      <span className="font-display text-2xl font-semibold text-rose">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                      <Store className="h-3.5 w-3.5 text-grape" />
                      Cueillette gratuite · 1464 boul. Talbot, Chicoutimi
                    </p>
                    <button
                      disabled={!canCheckout}
                      onClick={() => setStep("payment")}
                      className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-7 py-4 font-semibold text-white shadow-[0_18px_45px_-15px_rgba(225,75,138,0.85)] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
                    >
                      Procéder au paiement
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    {!canCheckout && (
                      <p className="mt-2.5 text-center text-xs text-muted">
                        Choisissez une date et une heure de cueillette pour continuer.
                      </p>
                    )}
                  </div>
                </>
              )
            )}

            {/* ─────────────────────── PAYMENT STEP ──────────────────────── */}
            {step === "payment" && (
              <>
                <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
                  {/* Pickup recap */}
                  <div className="flex items-center gap-2 rounded-2xl bg-lavender-soft px-4 py-3 text-sm font-medium text-grape">
                    <CalendarClock className="h-4 w-4 shrink-0" />
                    Cueillette : {formatPickup(pickupDate, pickupTime)}
                  </div>

                  {/* Method toggle */}
                  <div>
                    <span className="text-sm font-semibold text-ink">Mode de paiement</span>
                    <div className="mt-2 grid grid-cols-2 gap-2 rounded-2xl bg-cream-2 p-1.5">
                      {([
                        { id: "credit", label: "Carte de crédit" },
                        { id: "debit", label: "Carte de débit" },
                      ] as const).map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMethod(m.id)}
                          className={`relative rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                            method === m.id ? "text-white" : "text-ink-soft hover:text-grape"
                          }`}
                        >
                          {method === m.id && (
                            <motion.span
                              layoutId="pay-method-pill"
                              className="absolute inset-0 -z-10 rounded-xl bg-grape"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card form */}
                  <div className="space-y-3.5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-ink">Nom sur la carte</span>
                      <input
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Laurie Lemay"
                        autoComplete="cc-name"
                        className="rounded-2xl border-0 bg-white px-4 py-3 text-ink ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-grape"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-ink">Numéro de carte</span>
                      <div className="relative">
                        <input
                          value={cardNumber}
                          onChange={(e) => handleCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          className="w-full rounded-2xl border-0 bg-white px-4 py-3 pr-11 text-ink ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-grape"
                        />
                        <CreditCard className="absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                      </div>
                    </label>
                    <div className="grid grid-cols-2 gap-3.5">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold text-ink">Expiration</span>
                        <input
                          value={expiry}
                          onChange={(e) => handleExpiry(e.target.value)}
                          placeholder="MM/AA"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          className="rounded-2xl border-0 bg-white px-4 py-3 text-ink ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-grape"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold text-ink">CVC</span>
                        <input
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className="rounded-2xl border-0 bg-white px-4 py-3 text-ink ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-grape"
                        />
                      </label>
                    </div>
                  </div>

                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <Lock className="h-3.5 w-3.5" />
                    Démonstration — aucun paiement réel n'est traité.
                  </p>
                </div>

                {/* Footer: pay */}
                <div className="border-t border-black/5 bg-white px-6 py-5">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="text-sm text-ink-soft">Total à payer</span>
                    <span className="font-display text-2xl font-semibold text-rose">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <button
                    disabled={!cardValid || processing}
                    onClick={pay}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-7 py-4 font-semibold text-white shadow-[0_18px_45px_-15px_rgba(225,75,138,0.85)] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
                  >
                    {processing ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Traitement…
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Payer {formatPrice(total)}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* ─────────────────────── DONE STEP ─────────────────────────── */}
            {step === "done" && (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="grid h-20 w-20 place-items-center rounded-full bg-mint text-white"
                >
                  <Check className="h-10 w-10" strokeWidth={3} />
                </motion.span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                  Commande confirmée !
                </h3>
                {confirmed && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-lavender-soft px-4 py-2 text-sm font-semibold text-grape">
                    <CalendarClock className="h-4 w-4" />
                    Cueillette : {formatPickup(confirmed.date, confirmed.time)}
                  </p>
                )}
                <p className="mt-4 text-ink-soft">
                  Merci ! Votre commande sera préparée avec amour et prête pour la cueillette au
                  1464, boulevard Talbot.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Continuer mes achats <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
