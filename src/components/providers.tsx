"use client";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/sidebarProvider";
import { ConfigProvider } from "./modelConfig";

interface Props{  children: React.ReactNode }

export function Providers({ children }: Props ) {
  return (
    <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            enableColorScheme>
      <SidebarProvider>
        <ConfigProvider>
         {children}
        </ConfigProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
