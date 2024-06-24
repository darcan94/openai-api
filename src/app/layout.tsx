import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatThemeProvider } from "@/components/chatThemeProvider";
import React from "react";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className={inter.className}>
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
    </ViewTransitions>
  );
}
