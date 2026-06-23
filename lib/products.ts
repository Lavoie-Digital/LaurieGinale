export type Variant = { label: string; price: number };

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  image: string;
  blurb: string;
  badge?: string;
  variants: Variant[];
};

export type CategoryId =
  | "trompe-loeil"
  | "petits-gateaux"
  | "chocolats"
  | "fete-canada";

export type Category = {
  id: CategoryId;
  label: string;
  short: string;
  blurb: string;
  accent: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: "trompe-loeil",
    label: "Trompe-l'œil",
    short: "Trompe-l'œil",
    blurb:
      "Des illusions gourmandes si réalistes qu'on hésite à les croquer. La signature de la maison.",
    accent: "#e14b8a",
    image: "/products/glaze-b.jpg",
  },
  {
    id: "petits-gateaux",
    label: "Petits gâteaux & cupcakes",
    short: "Petits gâteaux",
    blurb:
      "Mignardises, cupcakes garnis et macarons colorés, montés à la main chaque matin.",
    accent: "#b388d9",
    image: "/products/cupcake-b.jpg",
  },
  {
    id: "chocolats",
    label: "Chocolats fins",
    short: "Chocolats fins",
    blurb:
      "Pralinés, truffes et bonbons fourrés façonnés un à un, à l'unité ou en boîte cadeau.",
    accent: "#6a3f86",
    image: "/products/choco-box.jpg",
  },
  {
    id: "fete-canada",
    label: "Fête du Canada",
    short: "Fête du Canada",
    blurb:
      "Collection thématique rouge & blanc, drapeau à l'appui — un aperçu des créations festives de Laurie.",
    accent: "#e0322f",
    image: "/products/cw-cake.jpg",
  },
];

export const products: Product[] = [
  // ── Trompe-l'œil ───────────────────────────────────────────────
  {
    id: "tl-dome",
    name: "Dôme chocolat brillant",
    category: "trompe-loeil",
    image: "/products/glaze-b.jpg",
    blurb: "Mousse au chocolat sous un miroir glacé — bluffant de brillance.",
    badge: "Signature",
    variants: [
      { label: "À l'unité", price: 14 },
      { label: "Boîte collection", price: 72 },
    ],
  },
  {
    id: "tl-coeur",
    name: "Cœur fruits rouges",
    category: "trompe-loeil",
    image: "/products/red-c.jpg",
    blurb: "Entremets glacé framboise au reflet miroir, troublant de réalisme.",
    variants: [
      { label: "À l'unité", price: 12 },
      { label: "Boîte collection", price: 64 },
    ],
  },
  {
    id: "tl-fruits",
    name: "Illusion fruits du verger",
    category: "trompe-loeil",
    image: "/products/glaze-d.jpg",
    blurb: "Fines crêpes, crème et fruits frais — l'illusion d'un verger croqué.",
    variants: [
      { label: "À l'unité", price: 9 },
      { label: "Boîte collection", price: 48 },
    ],
  },
  {
    id: "tl-boite",
    name: "Boîte collection trompe-l'œil",
    category: "trompe-loeil",
    image: "/products/petitgateau-c.jpg",
    blurb: "Assortiment surprise de 9 illusions gourmandes, présentées en écrin.",
    badge: "Coup de cœur",
    variants: [{ label: "Boîte collection (9 pièces)", price: 64 }],
  },

  // ── Petits gâteaux & cupcakes ──────────────────────────────────
  {
    id: "pg-cupcake-fleur",
    name: "Cupcake jardin fleuri",
    category: "petits-gateaux",
    image: "/products/cupcake-b.jpg",
    blurb: "Génoise vanille, crème au beurre meringuée pochée en pétales.",
    variants: [
      { label: "À l'unité", price: 5.5 },
      { label: "Demi-douzaine", price: 30 },
    ],
  },
  {
    id: "pg-cupcake-fruits",
    name: "Cupcake fruits rouges",
    category: "petits-gateaux",
    image: "/products/cupcake-c.jpg",
    blurb: "Cœur coulant aux petits fruits, chantilly mascarpone.",
    variants: [
      { label: "À l'unité", price: 5.5 },
      { label: "Demi-douzaine", price: 30 },
    ],
  },
  {
    id: "pg-cupcake-choco",
    name: "Cupcake choco-caramel",
    category: "petits-gateaux",
    image: "/products/cupcake-d.jpg",
    blurb: "Chocolat noir 64 %, caramel à la fleur de sel coulant.",
    badge: "Best-seller",
    variants: [
      { label: "À l'unité", price: 6 },
      { label: "Demi-douzaine", price: 33 },
    ],
  },
  {
    id: "pg-petitgateau",
    name: "Entremets crème & fruits",
    category: "petits-gateaux",
    image: "/products/petitgateau-a.jpg",
    blurb: "Mille-feuille déstructuré, crème légère et fruits frais de saison.",
    variants: [{ label: "À l'unité", price: 8.5 }],
  },
  {
    id: "pg-tartelette",
    name: "Tartelette dorée",
    category: "petits-gateaux",
    image: "/products/petitgateau-b.jpg",
    blurb: "Pâte sablée pur beurre, crème pâtissière et caramel ambré.",
    variants: [{ label: "À l'unité", price: 7 }],
  },
  {
    id: "pg-macarons",
    name: "Macarons de Laurie",
    category: "petits-gateaux",
    image: "/products/macaron-a.jpg",
    blurb: "Coques lisses et garnitures changeantes — la couleur de l'humeur du jour.",
    badge: "Coloré",
    variants: [
      { label: "Boîte de 6", price: 16 },
      { label: "Boîte de 12", price: 30 },
    ],
  },
  {
    id: "pg-bouquet",
    name: "Bouquet de cupcakes",
    category: "petits-gateaux",
    image: "/products/bouquet-b.jpg",
    blurb: "Un assortiment de cupcakes festifs réunis comme un bouquet à offrir.",
    badge: "À offrir",
    variants: [{ label: "Bouquet (7 pièces)", price: 55 }],
  },

  // ── Chocolats fins ─────────────────────────────────────────────
  {
    id: "ch-pralines",
    name: "Pralinés assortis",
    category: "chocolats",
    image: "/products/choco-box.jpg",
    blurb: "Ganaches et pralinés maison, enrobage tempéré brillant.",
    badge: "Signature",
    variants: [
      { label: "À l'unité", price: 2.5 },
      { label: "Boîte de 6", price: 15 },
      { label: "Boîte de 12", price: 28 },
    ],
  },
  {
    id: "ch-truffes",
    name: "Truffes velours",
    category: "chocolats",
    image: "/products/cw-box.jpg",
    blurb: "Cœur fondant chocolat noir, roulées à la main au cacao.",
    variants: [
      { label: "À l'unité", price: 2 },
      { label: "Boîte de 6", price: 12 },
      { label: "Boîte de 12", price: 22 },
    ],
  },
  {
    id: "ch-bonbons",
    name: "Bonbons fourrés",
    category: "chocolats",
    image: "/products/choco-c.jpg",
    blurb: "Carrés garnis de gianduja, noisette et caramel.",
    variants: [
      { label: "À l'unité", price: 2.5 },
      { label: "Boîte de 6", price: 15 },
      { label: "Boîte de 12", price: 28 },
    ],
  },
  {
    id: "ch-tablette",
    name: "Tablette grand cru",
    category: "chocolats",
    image: "/products/cacake-c.jpg",
    blurb: "Chocolat d'origine, conché longuement — pure dégustation.",
    variants: [{ label: "Tablette 90 g", price: 9 }],
  },
  {
    id: "ch-signature",
    name: "Écrin signature",
    category: "chocolats",
    image: "/products/choco-d.jpg",
    blurb: "La boîte cadeau par excellence : 12 chocolats, tous différents.",
    badge: "À offrir",
    variants: [
      { label: "Boîte de 6", price: 18 },
      { label: "Boîte de 12", price: 34 },
    ],
  },

  // ── Fête du Canada (rouge & blanc, drapeau canadien) ──────────
  {
    id: "ca-cupcake",
    name: "Cupcake feuille d'érable",
    category: "fete-canada",
    image: "/products/cw-d2.jpg",
    blurb: "Glaçage vanille blanc et éclats dorés — fièrement rouge et blanc.",
    badge: "Édition fêtes",
    variants: [
      { label: "À l'unité", price: 6 },
      { label: "Demi-douzaine", price: 33 },
    ],
  },
  {
    id: "ca-gateau",
    name: "Grand gâteau du Canada",
    category: "fete-canada",
    image: "/products/cw-cake.jpg",
    blurb: "Gâteau à étages crème blanche et fraises rouges, pour les grandes tablées.",
    badge: "Pièce centrale",
    variants: [
      { label: "8 à 10 portions", price: 68 },
      { label: "16 à 20 portions", price: 115 },
    ],
  },
  {
    id: "ca-chocolats",
    name: "Petits chocolats rouge & blanc",
    category: "fete-canada",
    image: "/products/cw-straw.jpg",
    blurb: "Bouchées blanches et rouges à croquer — l'esprit du 1er juillet.",
    variants: [
      { label: "Boîte de 6", price: 14 },
      { label: "Boîte de 12", price: 26 },
    ],
  },
  {
    id: "ca-boite",
    name: "Boîte Fête du Canada",
    category: "fete-canada",
    image: "/products/strawberry-a.jpg",
    blurb:
      "L'assortiment festif complet : toutes les petites pâtisseries thématiques réunies.",
    badge: "Édition limitée",
    variants: [{ label: "Grande boîte (12 pièces)", price: 58 }],
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);
