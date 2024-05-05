"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { IconTrash } from "@/components/ui/Icons";
import { ObjectId } from "mongodb";
import clsx from "clsx";
import { deleteChat } from "@/app/modules/chat/application/actions";
import Dialog from "@/components/dialog/Dialog";
import { useState } from "react";

export default function SidebarItem({ chat }: { chat: any }) {
  const pathname: string = usePathname();
  const active: boolean = pathname === `/chat/${chat._id}`;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDeleteConfirm = async (id: ObjectId) => {
    await deleteChat(id);
    setIsDialogOpen(false);
  };

  return (
    <div
      className={clsx(
        "relative w-full group flex items-center justify-between gap-2 rounded-lg p-2 text-font hover:bg-background",
        { "bg-background": active },
      )}
    >
      <Link
        key={chat._id}
        className="whitespace-nowrap font-light text-font no-underline"
        href={`/chat/${chat._id}`}
      >
        {chat.title}
      </Link>
      <div className={`${active ? 'flex' : 'hidden'} bg-background group-hover:flex absolute right-2`}>
        <Button
          variant="ghost"
          size="iconsm"
          onClick={() => setIsDialogOpen(!isDialogOpen)}
        >
          <IconTrash />
          <span className="sr-only"> Delete chat </span>
        </Button>
        
      </div>
      
      {isDialogOpen && <Dialog
        onClose={setIsDialogOpen}
        onConfirm={() => handleDeleteConfirm(chat._id)}
      />}
    </div>
  );
}
