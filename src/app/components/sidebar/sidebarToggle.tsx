'use client'
import { Button } from "@/app/components/ui/Button";
import { IconSidebarAlt } from "@/app/components/ui/Icons";
import { useSidebar } from "../sidebarProvider";

export function SidebarToggle(){
    const { toggleSidebar } = useSidebar();

    return(
        <Button 
            variant="ghost" 
            size="icon"
            onClick={() => toggleSidebar()}>
                <IconSidebarAlt />
                <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}