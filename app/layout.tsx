import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import Nav from "@/components/ui/Nav";
import AuthGate from "@/components/auth/AuthGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Nuestros recuerdos",
  description: "Nuestros viajes y momentos, en una línea de tiempo y un mapa",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Recuerdos" },
};

export const viewport: Viewport = { themeColor: "#fb7185" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthGate>
          <Nav />
          <main className="flex-1">{children}</main>
          <footer className="py-6 text-center text-sm text-rose-300">
            Hecho con <span className="text-rose-400">♥</span> para nosotros
          </footer>
        </AuthGate>
      </body>
    </html>
  );
}
