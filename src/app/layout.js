import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoriteContext";
import { AddressProvider } from "@/context/AddressContext";
import Footer from "@/components/MainPage/Footer";
import Loading from "./Loading";
import FloatingCart from "@/components/FloatingCart/FloatingCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vinil",
  description: "Magazin online de viniluri",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><head>
      {/* Înlocuiește cu URL-ul real de storage al proiectului tău Supabase */}
      <link rel="preconnect" href="https://ndsjagxakzjuniavktgn.supabase.co" crossOrigin="anonymous" />
    </head>
      <body className="no-scroll">
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <AddressProvider>
                <Loading />
                <NavBar />
                <NavBar hiden={true} />
                <FloatingCart />
                {children}
                <Footer />
              </AddressProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
