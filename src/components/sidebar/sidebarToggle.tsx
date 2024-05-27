"use client";
import Button from "@/components/ui/Button";
import { IconSidebarAlt } from "@/components/ui/Icons";
import { useSidebar } from "@/components/sidebarProvider";

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="left-4 z-20 rounded-full transition-all duration-300"
      onClick={() => toggleSidebar()}
    >
      <IconSidebarAlt />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
