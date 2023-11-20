"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/button/Button";
import { IconTrash } from "../icons/Icons";
import { ObjectId } from "mongodb";

export default function SidebarItem({ chat }: { chat: any }) {
  const pathname: string = usePathname();
  const active: string =
    pathname === `/chat/${chat._id}` ? "bg-background" : "";

  const deleteChat = async (id: ObjectId) => {
    const res = await fetch(`http://localhost:3000/api/chats/${id}`, { method: 'DELETE'})
    console.log(res);
  }; 

  return (
    <div
        className={`${active} rounded-lg px-2 py-2 text-font hover:bg-background flex justify-between items-center`}>
        <Link
            key={chat._id}
            className="overflow-hidden w-full no-underline whitespace-nowrap font-extralight text-font"
            href={`/chat/${chat._id}`}>
              {chat.title}
        </Link>
        <div className={`h-4 pl-2 ${active ? 'block' : 'hidden'}`}>
          <Button 
            variant="ghost" 
            size="iconsm"
            onClick={() => deleteChat(chat._id)}>
              <IconTrash />
              <span className="sr-only"> Delete chat </span>
          </Button>
        </div>
      </div>
    
  );
}
