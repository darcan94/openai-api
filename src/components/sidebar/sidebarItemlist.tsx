import React from "react";
import { getChats } from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { Session } from "next-auth";
import { auth } from "@/auth";
import SidebarItem from "@/components/sidebar/sidebarItem";

export default async function SidebarItemList() {
  const session: Session | null = await auth();
  const chats: Chat[] = await getChats(session?.user?.id || '');

  return  chats?.length ? (
            <nav className="overflow-y-auto">
              <ul className="mx-0 space-y-2">
                {chats.map((chat: Chat) => (
                  <li key={chat.id} className="list-none">
                    <SidebarItem chat={chat} />
                  </li>
                ))}
              </ul>
            </nav>
          ):(
            <div className="p-4 text-center w-full h-full my-16">
              <h3 className="text-lg text-gray-500">No chat history</h3>
            </div>
          )
}
