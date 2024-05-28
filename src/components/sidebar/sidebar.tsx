"use client";
import React from "react";
import { useSidebar } from "@/components/sidebarProvider";
import SidebarHeader from "@/components/sidebar/sidebarHeader";
import SidebarFooter from "@/components/sidebar/sidebarFooter";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const { isSidebarOpen, isLoading } = useSidebar();
  const state = isSidebarOpen && !isLoading ? "open" : "closed";

  return (
    <div id="sidebar"
      data-state={state}
      className="absolute md:static hidden md:flex flex-col gap-2 h-full z-20 data-[state=open]:flex w-10/12 md:w-[300px] 
      md:data-[state=closed]:w-16 justify-between border-r border-white/10 bg-secondary p-2 pt-16 text-font duration-300"
    >
      <SidebarHeader state={state}/>
      {isSidebarOpen && children}
      <SidebarFooter />
    </div>
  );
}