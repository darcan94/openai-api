'use client'
import { Button } from "@/app/components/ui/button/Button";
import { IconSidebarAlt } from "@/app/components/ui/icons/Icons";

export function SidebarToggle(){

    return(
        <Button 
            variant="ghost" 
            size="icon"
            onClick={() => ''}>
                <IconSidebarAlt />
                <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}