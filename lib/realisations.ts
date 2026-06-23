export type Realisation = {
  image: string;
  title: string;
  occasion: string;
  span?: boolean; // wider tile in the masonry
};

export const realisations: Realisation[] = [
  {
    image: "/realisation9.jpg",
    title: "Licorne arc-en-ciel",
    occasion: "Anniversaire enfant · 5 ans",
    span: true,
  },
  {
    image: "/realisation3.jpg",
    title: "Cœur écarlate trompe-l'œil",
    occasion: "Pièce artistique",
  },
  {
    image: "/realisation8.jpg",
    title: "Canard royal en chocolat",
    occasion: "Pâques · Trompe-l'œil",
  },
  {
    image: "/realisation6.jpg",
    title: "Vocation infirmier",
    occasion: "40 ans · Gâteau thématique",
    span: true,
  },
  {
    image: "/realisation10.jpg",
    title: "Renard & hérissons",
    occasion: "Forêt enchantée · 3 ans",
  },
  {
    image: "/realisation4.jpg",
    title: "Bouquet de cupcakes",
    occasion: "Fête des Mères",
  },
  {
    image: "/reallisation2.jpg",
    title: "Hommage Harley-Davidson",
    occasion: "Passion & anniversaire",
    span: true,
  },
  {
    image: "/realisation5.jpg",
    title: "Royaume des dinosaures",
    occasion: "1er anniversaire",
  },
  {
    image: "/realisation1.jpg",
    title: "Petit cochon gourmand",
    occasion: "Anniversaire surprise",
  },
  {
    image: "/realisation7.jpg",
    title: "Gâteau de couches",
    occasion: "Baby shower",
    span: true,
  },
];
