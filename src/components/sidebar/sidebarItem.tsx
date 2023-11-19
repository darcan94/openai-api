"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ chat }: { chat: any }) {
  const pathname: string = usePathname();
  const active: string =
    pathname === `/chat/${chat._id}` ? "bg-background" : "";

  return (
    <Link
      key={chat._id}
      className="overflow-hidden no-underline"
      href={`/chat/${chat._id}`}
    >
      <div
        className={`${active} rounded-lg px-2 py-2 text-font hover:bg-background`}
      >
        <span className="whitespace-nowrap font-extralight">{chat.title}</span>
      </div>
    </Link>
  );
}
