"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { IconTrash } from "@/app/components/ui/Icons";
import { ObjectId } from "mongodb";
import clsx from "clsx";
import { deleteChat } from "@/app/modules/chat/application/actions";

export default function SidebarItem({ chat }: { chat: any }) {
  const pathname: string = usePathname();
  const active: boolean = pathname === `/chat/${chat._id}`;

  const delChat = async (id: ObjectId) => {
    await deleteChat(id);
  };

  return (
    <div
      className={clsx(
        "group flex items-center justify-between rounded-lg px-2 py-2 text-font hover:bg-background",
        { "bg-background": active },
      )}
    >
      <Link
        key={chat._id}
        className="w-full overflow-hidden whitespace-nowrap font-extralight text-font no-underline"
        href={`/chat/${chat._id}`}>
        {chat.title}
      </Link>
      <div className="h-4 pl-2 hidden group-hover:block">
        <Button
          variant="ghost"
          size="iconsm"
          onClick={() => delChat(chat._id)}
        >
          <IconTrash />
          <span className="sr-only"> Delete chat </span>
        </Button>
      </div>
    </div>
  );
}
