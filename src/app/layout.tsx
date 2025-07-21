import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { BookingsProvider } from "@/contexts/BookingsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PsyChallenge - Encuentra tu Psicólogo Ideal",
  description: "Conecta con profesionales de la salud mental especializados en diferentes áreas para recibir el apoyo que necesitas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BookingsProvider>
          <Header />
          <main>
            {children}
          </main>
          <Toaster />
        </BookingsProvider>
      </body>
    </html>
  );
}
