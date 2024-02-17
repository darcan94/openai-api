'use client'
import React from "react";
import { useSidebar } from "../sidebarProvider";
import { SidebarToggle } from "./sidebarToggle";
import Settings from "../ui/settings";
import { Button } from "../ui/Button";
import { IconClearChat } from "../ui/Icons";
import { useRouter } from "next/navigation";

export default function Sidebar({ children }: { children?: React.ReactNode}) {
  const { isSidebarOpen, isLoading } = useSidebar();
  const router = useRouter();

  return (
      <div 
        data-state = {isSidebarOpen && !isLoading ? 'open' : 'closed'}
        className="flex flex-col justify-between w-[330px] gap-2 p-2 duration-300 data-[state=closed]:w-16 overflow-y-auto border-r bg-secondary text-font border-white/10">
          <div className="flex flex-col gap-6">
            <SidebarToggle />
            <Button
              variant="rounded" 
              size="lg2"
              className="bg-background"
              onClick={(e) => {
                e.preventDefault();
                router.push("/chat");
              }}
          >
            <IconClearChat />
            <span data-state = {isSidebarOpen && !isLoading ? 'open' : 'closed'} className="transition-all ease-in-out duration-300 font-normal mr-2 data-[state=closed]:hidden">New Chat</span>
            <span className="sr-only">New Chat</span>
          </Button>
          </div>
          { isSidebarOpen && children }
          <Settings />
      </div>
  );
}
