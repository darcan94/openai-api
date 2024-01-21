'use client'
import { Button } from "@/app/components/ui/Button";
import { IconSidebarAlt } from "@/app/components/ui/Icons";

export function SidebarToggle(){
    //TODO: implement show/hide sidebar
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