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
  | "saint-valentin";

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
    image: "/to-1.jpg",
  },
  {
    id: "petits-gateaux",
    label: "Petits gâteaux & cupcakes",
    short: "Petits gâteaux",
    blurb:
      "Mignardises, cupcakes garnis et macarons colorés, montés à la main chaque matin.",
    accent: "#b388d9",
    image: "/cup-3.jpg",
  },
  {
    id: "chocolats",
    label: "Chocolats fins",
    short: "Chocolats fins",
    blurb:
      "Pralinés, truffes et bonbons fourrés façonnés un à un, à l'unité ou en boîte cadeau.",
    accent: "#6a3f86",
    image: "/cf-1.jpg",
  },
  {
    id: "saint-valentin",
    label: "St-Valentin",
    short: "St-Valentin",
    blurb:
      "Paniers gourmands, boîtes cœurs et coffrets à offrir — l'amour se déguste en rouge et en chocolat.",
    accent: "#e14b8a",
    image: "/saintvalentin2.jpg",
  },
];

export const products: Product[] = [
  // ── Trompe-l'œil ───────────────────────────────────────────────
  {
    id: "tl-burger",
    name: "Burger trompe-l'œil",
    category: "trompe-loeil",
    image: "/to-1.jpg",
    blurb: "Un macaron déguisé en burger : coques moelleuses et garnitures en sucre. Bluffant.",
    badge: "Signature",
    variants: [
      { label: "À l'unité", price: 9 },
      { label: "Boîte collection", price: 48 },
    ],
  },
  {
    id: "tl-pomme",
    name: "Pomme givrée",
    category: "trompe-loeil",
    image: "/to-2.jpg",
    blurb: "Entremets glaçage miroir framboise en forme de pomme croquée, feuille de menthe fraîche.",
    variants: [
      { label: "À l'unité", price: 12 },
      { label: "Boîte collection", price: 64 },
    ],
  },
  {
    id: "tl-monsieur",
    name: "Monsieur Moustache",
    category: "trompe-loeil",
    image: "/to-3.jpg",
    blurb: "Dôme vanille coiffé d'un chapeau et d'une moustache en chocolat noir. Plein d'humour.",
    variants: [
      { label: "À l'unité", price: 11 },
      { label: "Boîte collection", price: 58 },
    ],
  },
  {
    id: "tl-vitrine",
    name: "Boîte collection trompe-l'œil",
    category: "trompe-loeil",
    image: "/to-4.jpg",
    blurb: "Assortiment surprise de nos plus belles illusions gourmandes, présentées en écrin.",
    badge: "Coup de cœur",
    variants: [{ label: "Boîte collection (9 pièces)", price: 64 }],
  },

  // ── Petits gâteaux & cupcakes ──────────────────────────────────
  {
    id: "pg-cupcake-fleur",
    name: "Cupcake jardin fleuri",
    category: "petits-gateaux",
    image: "/cup-1.jpg",
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
    image: "/cup-2.jpg",
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
    image: "/cup-3.jpg",
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
    image: "/cup-4.jpg",
    blurb: "Mille-feuille déstructuré, crème légère et fruits frais de saison.",
    variants: [{ label: "À l'unité", price: 8.5 }],
  },
  {
    id: "pg-tartelette",
    name: "Tartelette dorée",
    category: "petits-gateaux",
    image: "/cup-1.jpg",
    blurb: "Pâte sablée pur beurre, crème pâtissière et caramel ambré.",
    variants: [{ label: "À l'unité", price: 7 }],
  },
  {
    id: "pg-macarons",
    name: "Macarons de Laurie",
    category: "petits-gateaux",
    image: "/cup-2.jpg",
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
    image: "/cup-3.jpg",
    blurb: "Un assortiment de cupcakes festifs réunis comme un bouquet à offrir.",
    badge: "À offrir",
    variants: [{ label: "Bouquet (7 pièces)", price: 55 }],
  },

  // ── Chocolats fins ─────────────────────────────────────────────
  {
    id: "ch-pralines",
    name: "Pralinés assortis",
    category: "chocolats",
    image: "/cf-1.jpg",
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
    image: "/cf-1.jpg",
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
    image: "/cf-1.jpg",
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
    image: "/cf-1.jpg",
    blurb: "Chocolat d'origine, conché longuement — pure dégustation.",
    variants: [{ label: "Tablette 90 g", price: 9 }],
  },
  {
    id: "ch-signature",
    name: "Écrin signature",
    category: "chocolats",
    image: "/cf-1.jpg",
    blurb: "La boîte cadeau par excellence : 12 chocolats, tous différents.",
    badge: "À offrir",
    variants: [
      { label: "Boîte de 6", price: 18 },
      { label: "Boîte de 12", price: 34 },
    ],
  },

  // ── St-Valentin (paniers & coffrets rouges, cœurs) ────────────
  {
    id: "sv-panier",
    name: "Panier gourmand St-Valentin",
    category: "saint-valentin",
    image: "/saintvalentin2.jpg",
    blurb: "Chocolats fins, douceurs et toutou tout doux, emballés d'un ruban rouge. Prêt à offrir.",
    badge: "Édition St-Valentin",
    variants: [
      { label: "Petit panier", price: 45 },
      { label: "Grand panier", price: 75 },
    ],
  },
  {
    id: "sv-boite-coeurs",
    name: "Boîte de chocolats cœurs",
    category: "saint-valentin",
    image: "/saintvalentin3.jpg",
    blurb: "Nos chocolats fins dans un écrin tout en cœurs rouges, noué d'un joli ruban.",
    badge: "À offrir",
    variants: [
      { label: "Boîte de 6", price: 18 },
      { label: "Boîte de 12", price: 34 },
    ],
  },
  {
    id: "sv-duo",
    name: "Coffret duo amoureux",
    category: "saint-valentin",
    image: "/saintvalentin2.jpg",
    blurb: "Deux écrins assortis pour partager à deux — ou se gâter sans compter.",
    variants: [{ label: "Coffret duo", price: 52 }],
  },
  {
    id: "sv-toutou",
    name: "Panier toutou & chocolats",
    category: "saint-valentin",
    image: "/saintvalentin3.jpg",
    blurb: "Un toutou câlin niché parmi les chocolats et friandises rouges. Coup de cœur garanti.",
    badge: "Coup de cœur",
    variants: [{ label: "Panier (1 toutou)", price: 48 }],
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);
