"use client";
import React from "react";
import { useSidebar } from "@/components/sidebarProvider";
import SidebarHeader from "@/components/sidebar/sidebarHeader";
import SidebarFooter from "./sidebarFooter";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const { isSidebarOpen, isLoading } = useSidebar();
  const state = isSidebarOpen && !isLoading ? "open" : "closed";
  

  return (
    <div
      data-state={state}
      className="flex w-[300px] flex-col justify-between gap-2 border-r border-white/10 bg-secondary p-2 text-font duration-300 data-[state=closed]:w-16"
    >
      <SidebarHeader state={state}/>
      {isSidebarOpen && children}
      <SidebarFooter />
    </div>
  );
}
