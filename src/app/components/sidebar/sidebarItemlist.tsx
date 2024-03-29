import SidebarItem from "@/app/components/sidebar/sidebarItem";
import React from "react";
import SidebarItemListSkeleton from "@/app/components/sidebar/sidebarItemListSkeleton";
import { getChats } from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";

export default async function SidebarItemList() {
  const chats = await getChats();

  const chatList = chats.map((chat: Chat) => (
    <li key={chat._id.toString()} className="list-none">
      <SidebarItem chat={chat} />
    </li>
  ));

  return (
    <React.Suspense fallback={<SidebarItemListSkeleton />}>
      <div className="flex grow flex-col overflow-y-auto">
        <nav>
          <ul className="mx-0 flex flex-col gap-2 overflow-hidden">
            {chatList}
          </ul>
        </nav>
      </div>
    </React.Suspense>
  );
}
