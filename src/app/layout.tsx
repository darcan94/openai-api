import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import React from "react";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false
});

export const metadata: Metadata = {
  title: {
    template: "%s | ai-chat",
    default: "AI API chat",
  },
  description: "Chatbot with some LLM's",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (    
      <html lang="en" suppressHydrationWarning className={inter.className}>
        <body className="h-screen w-screen">
          <ViewTransitions>
            <Providers>
              {children}
            </Providers>
          </ViewTransitions>
        </body>
      </html>    
  );
}
