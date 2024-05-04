import React, { cache } from "react";
import { getChats } from "@/app/modules/chat/application/actions";
import SidebarItems from "@/components/sidebar/sidebarItems";
import { Chat } from "@/app/modules/chat/domain/Chat";

const loadChats = cache(async () => {
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
            <div className="p-4 text-center w-full">
              <h3 className="text-sm text-muted-foreground">No chat history</h3>
            </div>
          )
        }
      </div>
  );
}
