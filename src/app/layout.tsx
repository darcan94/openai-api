import '@/app/globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatThemeProvider } from '@/app/components/chatThemeProvider';

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['100', '300', '500'] 
});

export const metadata: Metadata = {
  title: {
    template: '%s | open-ai',
    default: 'Open-ai API chat'
  },
  description: "Chatbot with open-ai llm",
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ChatThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            enableColorScheme>
               { children }
        </ChatThemeProvider>
      </body>
    </html>
  );
}
