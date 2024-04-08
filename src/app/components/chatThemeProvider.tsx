"use client";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/app/components/sidebarProvider";

export function ChatThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
