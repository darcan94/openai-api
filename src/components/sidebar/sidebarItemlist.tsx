import React, { cache } from "react";
import { getChats } from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { Session } from "next-auth";
import { auth } from "@/auth";
import SidebarItem from "@/components/sidebar/sidebarItem";

export default async function SidebarItemList() {
  const session: Session | null = await auth();
  const chats: Chat[] = await getChats(session?.user?.id || '');

  return (   
      <div className="flex overflow-y-auto overflow-x-hidden">
        {
          chats?.length ? (
            <nav className="w-full">
              <ul className="mx-0">
                {chats.map((chat: Chat) => (
                  <li key={chat.id} className="list-none mt-2">
                    <SidebarItem chat={chat} />
                  </li>
                ))}
              </ul>
            </nav>
          ):(
            <div className="p-4 text-center w-full">
              <h3 className="text-sm text-muted-foreground">No chat history</h3>
            </div>
          )
        }
      </div>
  );
}
