import { IconSidebarAlt } from "@/components/icons/Icons";
import SidebarItemList from "./sidebarItemlist";
 
export default async function Sidebar({ children }: { children?: React.ReactNode }) {
  const res = await fetch('http://localhost:3000/api/chats');
  const {chats} = await res.json();
  
  return (
    <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40 w-[20%] overflow-y-auto">
        <div className="flex flex-col gap-2 h-full">
          <div className="flex h-[60px] items-center px-6 gap-5 justify-between">
              <h2>Chat history</h2>
              <IconSidebarAlt className=""/>
          </div>
          <SidebarItemList chats = {chats}/>
        </div>
      </div>
  );
}