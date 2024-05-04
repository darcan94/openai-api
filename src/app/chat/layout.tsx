import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarItemListSkeleton from "@/components/sidebar/sidebarItemListSkeleton";
import SidebarItemList from "@/components/sidebar/sidebarItemlist";
import React, { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <Sidebar>
        <Suspense fallback={<SidebarItemListSkeleton/>}>
          <SidebarItemList />
        </Suspense>
      </Sidebar>
      <div className="relative w-full h-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
