import Hero from "@/components/Hero";
import RealisationsPreview from "@/components/RealisationsPreview";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />

      <RealisationsPreview />

      <Testimonials />

      <CtaBanner
        eyebrow="envie de se gâter ?"
        title="Commandez vos gourmandises dès maintenant"
        text="Parcourez la boutique en ligne et composez votre boîte de douceurs faites maison, prête à emporter sur le boulevard Talbot."
        cta="Commander maintenant"
        href="/boutique"
      />
    </>
  );
}
