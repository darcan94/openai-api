import { IconSidebarAlt } from "@/app/components/ui/icons/Icons";
import SidebarItemList from "@/app/components/sidebar/sidebarItemlist";
import { Button } from "@/app/components/ui/button/Button";
import ThemeToggle from "../ui/themeToggle/themeToggle";
import { SidebarToggle } from "./sidebarToggle";

export default async function Sidebar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const res = await fetch("http://localhost:3000/api/chat");
  const { chats } = await res.json();

  return (
    <div className="hidden w-[350px] overflow-y-auto border-r bg-secondary text-font dark:border-white/10 lg:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-[60px] items-center justify-between gap-5 px-6">
          <h2>Chat history</h2>
          <SidebarToggle />
        </div>
        <SidebarItemList chats={chats} />
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
