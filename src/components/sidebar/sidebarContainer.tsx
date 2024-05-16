import React, {Suspense} from "react";
import SidebarItemListSkeleton from "@/components/sidebar/sidebarItemListSkeleton";
import SidebarItemList from "@/components/sidebar/sidebarItemlist";
import Sidebar from "@/components/sidebar/sidebar";

export default function SidebarContainer(){
    return(
        <Sidebar>
            <Suspense fallback={<SidebarItemListSkeleton/>}>
                <SidebarItemList />
            </Suspense>
        </Sidebar>
    )
}