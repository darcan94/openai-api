"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { IconMessage, IconTrash } from "@/app/components/ui/Icons";
import { ObjectId } from "mongodb";
import clsx from "clsx";
import { deleteChat } from "@/app/modules/chat/application/actions";

export default function SidebarItem({ chat }: { chat: any }) {
  const pathname: string = usePathname();
  const active: boolean = pathname === `/chat/${chat._id}`;
  const router = useRouter();

  const delChat = async (id: ObjectId) => {
    await deleteChat(id);
  };

  return (
    <div
      className={clsx(
        "group flex items-center justify-start gap-2 rounded-lg px-2 py-2 text-font hover:bg-background",
        { "bg-background": active },
      )}
    >
      <div className="w-[5%]">
        <IconMessage />
      </div>
      <Link
        key={chat._id}
        className="w-[90%] overflow-hidden whitespace-nowrap font-extralight text-font no-underline"
        href={`/chat/${chat._id}`}>
        {chat.title}
      </Link>
      <div className="h-4 hidden w-[5%] right-2.5 group-hover:block">
        <Button
          variant="ghost"
          size="iconsm"
          onClick={async () => {
              await delChat(chat._id);
              router.push('/chat')
            }
          }
        >
          <IconTrash />
          <span className="sr-only"> Delete chat </span>
        </Button>
      </div>
    </div>
  );
}
