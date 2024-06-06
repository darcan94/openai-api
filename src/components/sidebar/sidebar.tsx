"use client";
import React from "react";
import { useSidebar } from "@/components/sidebarProvider";
import { Link } from "next-view-transitions";
import { IconClearChat } from "@/components/ui/Icons";
import Settings from "@/components/ui/settings";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const { isSidebarOpen, isLoading } = useSidebar();
  const state = isSidebarOpen && !isLoading ? "open" : "closed";

  return (
    <aside id="sidebar"
      data-state={state}
      className="absolute md:static hidden md:flex flex-col gap-2 h-full z-20 data-[state=open]:flex w-10/12 md:w-[300px] 
      md:data-[state=closed]:w-16 justify-between border-r border-white/10 bg-secondary p-2 pt-16 text-font duration-300"
    >
      <Link 
            href="/"
            className="flex items-center no-underline text-font p-2 rounded-full w-max bg-background-alpha hover:bg-background">
            <IconClearChat />
            <span
                data-state={state}
                className="mr-2 data-[state=closed]:hidden">
                New Chat
            </span>
            <span className="sr-only">New Chat</span>
      </Link>
      <div data-state={state} className="md:data-[state=closed]:hidden grow">
        {children}
      </div>
      <Settings />
    </aside>
  );
}