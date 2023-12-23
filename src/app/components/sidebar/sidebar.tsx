import ThemeToggle from "../ui/ThemeToggle";
import { SidebarToggle } from "./sidebarToggle";
import React from "react";

export default function Sidebar({ children }: { children?: React.ReactNode}) {
  return (
    <div className="peer hidden duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex  lg:w-[350px] overflow-y-auto border-r bg-secondary text-font border-white/10">
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex h-[60px] items-center justify-between gap-5 px-6">
          <h2>Chat history</h2>
          <SidebarToggle />
        </div>
        { children }
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
