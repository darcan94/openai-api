import SidebarItem from "./sidebarItem";
import React from "react";
import SidebarItemListSkeleton from "./sidebarItemListSkeleton";
import { getChats } from "@/app/modules/chat/application/actions";

export default async function SidebarItemList() {  
  const chats = await getChats();

  const chatList = chats ? chats.map((chat: any, i: number) => (
    <li key={chat._id} className="list-none">
      <SidebarItem chat={chat} />
    </li>
  )): [];

  return (
    <React.Suspense fallback={ <SidebarItemListSkeleton /> }>
        <div className="flex flex-col">
          <nav>
            <ul className="mx-2 flex flex-col gap-2 overflow-hidden">
              {chatList}
            </ul>
          </nav>
        </div>
    </React.Suspense>
    
  );
}
