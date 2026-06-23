import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LaurieGinale — Chocolaterie & Pâtisserie artisanale | Chicoutimi",
  description:
    "Chocolats fins, trompe-l'œil bluffants et pâtisseries sur mesure, faits main à Chicoutimi. Commandez en ligne ou pour vos événements.",
  keywords: [
    "chocolaterie",
    "pâtisserie",
    "Chicoutimi",
    "Saguenay",
    "trompe-l'œil",
    "gâteau sur mesure",
    "LaurieGinale",
  ],
  openGraph: {
    title: "LaurieGinale — Chocolaterie & Pâtisserie artisanale",
    description:
      "Des petits luxes à s'offrir, faits main à Chicoutimi. Chocolats fins, trompe-l'œil et créations sur mesure.",
    type: "website",
    locale: "fr_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr-CA"
      className={`${playfair.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
