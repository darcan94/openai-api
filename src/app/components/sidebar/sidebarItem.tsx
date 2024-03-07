"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { IconMessage, IconTrash } from "@/app/components/ui/Icons";
import { ObjectId } from "mongodb";
import clsx from "clsx";
import { deleteChat } from "@/app/modules/chat/application/actions";
import Dialog from "../dialog/Dialog";
import { useState } from "react";

export default function SidebarItem({ chat }: { chat: any }) {
  const pathname: string = usePathname();
  const active: boolean = pathname === `/chat/${chat._id}`;
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleDeleteConfirm = async (id: ObjectId) => {
    await deleteChat(id);
    setIsDialogOpen(false);
    router.push('/chat')
  };

  return (
    <div
      className={clsx(
        "group relative flex items-center justify-start gap-2 rounded-lg px-2 py-2 text-font hover:bg-background",
        { "bg-background": active },
      )}
    >
      <div className="w-[5%]">
        <IconMessage />
      </div>
      <Link
        key={chat._id}
        className="w-[90%] overflow-hidden whitespace-nowrap font-light text-font no-underline"
        href={`/chat/${chat._id}`}>
        {chat.title}
      </Link>
      <div className="h-full hidden absolute right-2.5 group-hover:flex group-hover:items-center bg-background">
        <Button
          variant="ghost"
          size="iconsm"
          onClick={ () => setIsDialogOpen(true)}>
          <IconTrash />
          <span className="sr-only"> Delete chat </span>
        </Button>
        {isDialogOpen && <Dialog
          onClose={() => setIsDialogOpen(false)}
          onConfirm={() => handleDeleteConfirm(chat._id)}
        />}
      </div>
    </div>
  );
}
