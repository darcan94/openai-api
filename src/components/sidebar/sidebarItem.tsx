"use client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { IconTrash } from "@/components/ui/Icons";
import clsx from "clsx";
import { deleteChat } from "@/app/modules/chat/application/actions";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import { Link } from "next-view-transitions";

export default function SidebarItem({ chat }: { chat: any }) {
  const pathname: string = usePathname();
  const active: boolean = pathname === `/chat/${chat.id}`;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDeleteConfirm = async (id: string) => {
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
        key={chat.id}
        className="w-full whitespace-nowrap font-light text-font no-underline overflow-hidden"
        href={`/chat/${chat.id}`}
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
        onConfirm={() => handleDeleteConfirm(chat.id)}
      />}
    </div>
  );
}
