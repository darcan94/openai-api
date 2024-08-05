"use client";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/components/sidebarProvider";
import { ConfigProvider } from "./modelConfig";

export function ChatThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <SidebarProvider>
        <ConfigProvider>
         {children}
        </ConfigProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
