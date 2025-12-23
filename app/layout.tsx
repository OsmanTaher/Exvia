import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cookies } from "next/headers";
import Home from "@/components/layout/Home";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exvia Platform",
  description: "Educational Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  let user = null;

  if (session) {
    try {
      user = JSON.parse(session.value);
    } catch (e) {
      console.error("Session parse error", e);
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={user} />
        <Home />
        <main className="min-h-screen bg-[#EDF5FF]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
