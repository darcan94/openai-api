import { IconSidebarAlt } from "@/components/icons/Icons";
import SidebarItem from "./sidebarItem";
import { connectDB } from "@/utils/db";

 
export default async function Sidebar({ children }: { children?: React.ReactNode }) {
  const res = await fetch('http://localhost:3000/api/chats');
  const {chats} = await res.json();
  
  return (
    <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40 w-[320px]">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6 gap-5">
              <IconSidebarAlt/>
              <h2 className="">Chat history</h2>
          </div>  
          {chats.map((chat: any) => (
                <SidebarItem key={chat.id} chat={chat}/>
              ))}     
        </div>
      </div>
  );
}