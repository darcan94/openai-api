"use client";
import React from "react";
import { useSidebar } from "../sidebarProvider";
import { SidebarToggle } from "./sidebarToggle";
import Settings from "../ui/settings";
import { Button } from "../ui/Button";
import { IconClearChat } from "../ui/Icons";
import { useRouter } from "next/navigation";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const { isSidebarOpen, isLoading } = useSidebar();
  const state = isSidebarOpen && !isLoading ? "open" : "closed";
  const router = useRouter();

  return (
    <div
      data-state={state}
      className="flex w-[330px] flex-col justify-between gap-2 border-r border-white/10 bg-secondary p-2 text-font duration-300 data-[state=closed]:w-16"
    >
      <div className="flex flex-col gap-6">
        <SidebarToggle />
        <Button
          variant="rounded"
          size="lg2"
          className="w-max bg-background"
          onClick={(e) => {
            e.preventDefault();
            router.push("/chat");
          }}
        >
          <IconClearChat />
          <span
            data-state={state}
            className="mr-2 font-normal data-[state=closed]:hidden"
          >
            New Chat
          </span>
          <span className="sr-only">New Chat</span>
        </Button>
      </div>
      {isSidebarOpen && children}
      <Settings />
    </div>
  );
}
