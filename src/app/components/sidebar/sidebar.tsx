'use client'
import React from "react";
import { useSidebar } from "../sidebarProvider";

export default function Sidebar({ children }: { children?: React.ReactNode}) {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
      <div 
        data-state = {isSidebarOpen && !isLoading ? 'open' : 'closed'}
        className="peer left-0 absolute inset-y-0 z-10 lg:flex lg:flex-col lg:w-[350px] gap-2 hidden p-2 -translate-x-full duration-300 ease-in-out data-[state=open]:translate-x-0 overflow-y-auto border-r bg-secondary text-font border-white/10">
          { children }
      </div>
  );
}
