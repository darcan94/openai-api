import Header from "@/components/header";
import React from "react";
import SidebarContainer from "@/components/sidebar/sidebarContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full h-full overflow-hidden">
      <SidebarContainer/>
      <div className="relative w-full h-full">
        <Header />
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </main>
  );
}
