"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button/Button";
import { IconTrash } from "@/app/components/ui/icons/Icons";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function SidebarItem({ chat }: { chat: any }) {
  const router = useRouter();
  const pathname: string = usePathname();
  const active: boolean = pathname === `/chat/${chat._id}`;

  const deleteChat = async (id: ObjectId) => {
    const res = await fetch(`http://localhost:3000/api/chat/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete chat with id ${id}: ${res.statusText}`);
    }
    router.push("/");
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between rounded-lg px-2 py-2 text-font hover:bg-background",
        { "bg-background": active },
      )}
    >
      <Link
        key={chat._id}
        className="w-full overflow-hidden whitespace-nowrap font-extralight text-font no-underline"
        href={`/chat/${chat._id}`}
      >
        {chat.title}
      </Link>
      <div className={clsx("h-4 pl-2", { block: active, hidden: !active })}>
        <Button
          variant="ghost"
          size="iconsm"
          onClick={() => deleteChat(chat._id)}
        >
          <IconTrash />
          <span className="sr-only"> Delete chat </span>
        </Button>
      </div>
    </div>
  );
}