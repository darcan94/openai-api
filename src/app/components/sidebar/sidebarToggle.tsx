'use client'
import { Button } from "@/app/components/ui/Button";
import { IconSidebarAlt } from "@/app/components/ui/Icons";
import { useSidebar } from "../sidebarProvider";
import { createPortal } from "react-dom";

export function SidebarToggle(){
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    const toggleButton = <Button 
                            variant="ghost" 
                            size="icon"
                            className={`fixed top-0 z-10 transition-all duration-300 ${isSidebarOpen ? 'left-[350px]' : 'left-0'}`}
                            onClick={() => toggleSidebar()}>
                                <IconSidebarAlt />
                                <span className="sr-only">Toggle Sidebar</span>
                        </Button>

    return(
        <>
            {createPortal(toggleButton, document.body)}
        </>        
    );
}