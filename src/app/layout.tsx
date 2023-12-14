import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/app/components/sidebar/sidebar";
import { ChatThemeProvider } from "@/app/components/chatThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Openai API",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          >
            <main className="mx-auto my-0 flex h-screen w-full justify-end">
              <Sidebar />
              {children}
            </main>
        </ChatThemeProvider>
      </body>
    </html>
  );
}
