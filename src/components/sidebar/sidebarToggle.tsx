"use client";
import Button from "@/components/ui/Button";
import { IconSidebarAlt } from "@/components/ui/Icons";
import { useSidebar } from "@/components/sidebarProvider";
import { createPortal } from 'react-dom';

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <>{
      createPortal(
        <Button
          variant="ghost"
          size="icon"
          className="fixed m-2 z-30"
          onClick={toggleSidebar}
        >
          <IconSidebarAlt />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>,
        document.body
      )
    }</>
    
  );
}
