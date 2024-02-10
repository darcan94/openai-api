'use client'
import React from "react";
import { useSidebar } from "../sidebarProvider";

export default function Sidebar({ children }: { children?: React.ReactNode}) {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
      <div 
        data-state = {isSidebarOpen && !isLoading ? 'open' : 'closed'}
        className="flex flex-col w-[330px] gap-2 p-2 duration-300 data-[state=closed]:w-16 overflow-y-auto border-r bg-secondary text-font border-white/10">
          { children }
      </div>
  );
}
