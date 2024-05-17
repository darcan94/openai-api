import React, { cache } from "react";
import { getChats } from "@/app/modules/chat/application/actions";
import SidebarItems from "@/components/sidebar/sidebarItems";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { Session } from "next-auth";
import { auth } from "@/auth";

const loadChats = cache(async (userId: string = "") => {
  return await getChats(userId);
})

export default async function SidebarItemList() {
  const session: Session | null = await auth();
  const chats: Chat[] = await loadChats(session?.user?.id);

  return (   
      <div className="flex grow overflow-y-auto overflow-x-hidden">
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
