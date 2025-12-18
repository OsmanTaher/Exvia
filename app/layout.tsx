import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import Header from "../components/layout/Header";
import Home from "../components/layout/Home";
import Footer from "../components/layout/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exvia Platform",
  description: "Luxor University Student Exam System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${geistMono.variable} antialiased`}>
        {/* ---------- You Can Add Here NavBar ----------. */}
        <Header />
        <Home />
        {children}
        <Footer />
        {/* ---------- & That Is A Footer ----------! */}
      </body>
    </html>
  );
}
