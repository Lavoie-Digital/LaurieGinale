import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BoutiqueClient from "@/components/BoutiqueClient";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Boutique en ligne — Chocolats, trompe-l'œil & pâtisseries | LaurieGinale",
  description:
    "Commandez en ligne : trompe-l'œil, petits gâteaux et cupcakes, chocolats fins et la collection Fête du Canada. Faits main à Chicoutimi.",
};

export default function BoutiquePage() {
  return (
    <>
      <PageHeader
        eyebrow="la boutique"
        title="Toutes nos gourmandises"
        subtitle="Filtrez par envie et composez votre boîte. Chaque création est faite main, fraîche du jour."
      />
      <Suspense fallback={<div className="py-20 text-center text-muted">Chargement…</div>}>
        <BoutiqueClient />
      </Suspense>

      <CtaBanner
        eyebrow="un gâteau sur mesure ?"
        title="Une création personnalisée en tête ?"
        text="Pour les pièces uniques, gâteaux thématiques et grandes quantités, écrivez-nous : on donne vie à vos idées."
        cta="Faire une demande"
        href="/contact"
      />
    </>
  );
}
