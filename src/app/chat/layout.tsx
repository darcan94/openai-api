import Sidebar from "@/components/sidebar/sidebar";
import SidebarItemListSkeleton from "@/components/sidebar/sidebarItemListSkeleton";
import SidebarItemList from "@/components/sidebar/sidebarItemlist";
import React, { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <Sidebar>
        <Suspense fallback={<SidebarItemListSkeleton/>}>
          <SidebarItemList />
        </Suspense>
      </Sidebar>
      {children}
    </div>
  );
}
