import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CartClient from "@/components/CartClient";

export const metadata: Metadata = {
  title: "Panier | LaurieGinale",
  description: "Votre panier de gourmandises LaurieGinale.",
};

export default function PanierPage() {
  return (
    <>
      <PageHeader
        eyebrow="votre panier"
        title="Vos douceurs choisies"
        subtitle="Vérifiez votre sélection, ajustez les quantités et passez à la commande."
      />
      <CartClient />
    </>
  );
}
