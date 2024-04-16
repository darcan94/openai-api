import React, { cache } from "react";
import { getChats } from "@/app/modules/chat/application/actions";
import SidebarItems from "@/components/sidebar/sidebarItems";
import { Chat } from "@/app/modules/chat/domain/Chat";

const loadChats = cache(async (userId?: string) => {
  return await getChats();
})

export default async function SidebarItemList() {
  const chats: Chat[] = await loadChats();

  return (   
      <div className="flex grow overflow-y-auto">
        {
          chats?.length ? (
            <SidebarItems chats={chats}/>
          ):(
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">No chat history</p>
            </div>
          )
        }
      </div>
  );
}
