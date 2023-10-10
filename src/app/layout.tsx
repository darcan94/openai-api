import Header from "@/components/header/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Openai API",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="mx-auto my-0 flex h-screen w-full flex-row-reverse justify-end pt-[4rem]">
          {children}
        </main>
        <TailwindIndicator />
      </body>
    </html>
  );
}
