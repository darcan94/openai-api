import Header from "@/components/header/header";
import React from "react";
import SidebarContainer from "@/components/sidebar/sidebarContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <SidebarContainer/>
      <div className="relative w-full h-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
