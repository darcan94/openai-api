'use client'
import React from "react";
import { useSidebar } from "../sidebarProvider";
import { SidebarToggle } from "./sidebarToggle";
import ThemeToggle from "../ui/ThemeToggle";

export default function Sidebar({ children }: { children?: React.ReactNode}) {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
      <div 
        data-state = {isSidebarOpen && !isLoading ? 'open' : 'closed'}
        className="flex flex-col justify-between w-[330px] gap-2 p-2 duration-300 data-[state=closed]:w-16 overflow-y-auto border-r bg-secondary text-font border-white/10">
          <SidebarToggle />
          { isSidebarOpen && children }
          <ThemeToggle />
      </div>
  );
}
