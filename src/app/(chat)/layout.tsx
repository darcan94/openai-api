import Header from "@/components/header";
import React, { Suspense } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarItemListSkeleton from "@/components/sidebar/sidebarItemListSkeleton";
import SidebarItemList from "@/components/sidebar/sidebarItemlist";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full h-full overflow-hidden">
      <Sidebar>
        <Suspense fallback={<SidebarItemListSkeleton/>}>
          <SidebarItemList />
        </Suspense>
      </Sidebar>
      <div className="relative w-full h-full">
        <Header />
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </main>
  );
}
