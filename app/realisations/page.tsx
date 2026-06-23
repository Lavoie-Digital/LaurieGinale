import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import RealisationsGallery from "@/components/RealisationsGallery";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Réalisations uniques — Gâteaux & pièces sur mesure | LaurieGinale",
  description:
    "Galerie des créations sur mesure de LaurieGinale : gâteaux thématiques, trompe-l'œil, pièces artistiques. Demandez votre réalisation unique.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="réalisations uniques"
        title="Des créations sur mesure"
        subtitle="Anniversaires, pièces artistiques, trompe-l'œil… un aperçu des demandes spéciales que Laurie a donné vie. La vôtre est la prochaine."
      />
      <RealisationsGallery />

      <CtaBanner
        eyebrow="une création unique en tête ?"
        title="Imaginons votre pièce sur mesure"
        text="Décrivez-nous votre projet — thème, occasion, nombre de portions — et Laurie reviendra vers vous avec une proposition gourmande."
        cta="Demander une réalisation"
        href="/contact"
      />
    </>
  );
}
