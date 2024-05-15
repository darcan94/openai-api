import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Comfortaa } from "next/font/google";
import { ChatThemeProvider } from "@/components/chatThemeProvider";
import React from "react";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    template: "%s | open-ai",
    default: "Open-ai API chat",
  },
  description: "Chatbot with open-ai llm",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={comfortaa.className}>
      <body className="h-screen w-screen">
        <ChatThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
        >
          {children}
        </ChatThemeProvider>
      </body>
    </html>
  );
}
