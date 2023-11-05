import { IconSidebarAlt } from "@/components/icons/Icons";
import SidebarItem from "./sidebarItem";
import * as Dialog from "@radix-ui/react-dialog";
 
export default async function Sidebar({ children }: { children?: React.ReactNode }) {
  const res = await fetch('http://localhost:3000/api/chats');
  const {chats} = await res.json();
  const chatList = chats.map((chat: any) => <SidebarItem key={chat.id} chat={chat}/>)

  return (
    <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40 w-[320px] overflow-y-auto">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6 gap-5 justify-between">
              <h2>Chat history</h2>
              <IconSidebarAlt className=""/>
          </div>
          {chatList}
        </div>
      </div>
  );
}