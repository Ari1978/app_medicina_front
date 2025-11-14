import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Menu from "./Components/Navbar/Menu";
import Footer from "./Components/Footer";
import { AuthProvider } from "./Components/AuthContext";
import { CarritoProvider } from "./Components/CarritoContext";
import BotonVolverWrapper from "./Components/BotonVolverWrapper";
import "./globals.css";

// Fuentes optimizadas
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asmel Clinic | Soluciones en Medicina Laboral",
  description: "Asmel ofrece soluciones integrales en medicina laboral para tu empresa.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 antialiased">
        <AuthProvider>
          <CarritoProvider>
            <Menu />
            <main className="flex-1 w-full flex flex-col items-center py-10 px-4">
              <div className="w-full max-w-4xl">{children}</div>
              <BotonVolverWrapper />
            </main>
            <Footer />
          </CarritoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
