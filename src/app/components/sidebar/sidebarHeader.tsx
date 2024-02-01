import { SidebarToggle } from "./sidebarToggle";

export default function SidebarHeader(){
    return (
        <div className="flex h-[60px] items-center justify-between gap-5">
          <h2>Chat history</h2>
          <SidebarToggle />
        </div>
    );
}