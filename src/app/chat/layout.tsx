import Sidebar from "@/app/components/sidebar/sidebar";
import SidebarItemList from "@/app/components/sidebar/sidebarItemlist";
import { Suspense } from "react";
import SidebarItemListSkeleton from "@/app/components/sidebar/sidebarItemListSkeleton";

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
