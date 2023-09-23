import Link from "next/link";

export default function SidebarItem({ chat }: {chat: any}){
    return (
        <div>
          <Link
            href='/'
          >
            <div
              className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
              title={chat.title}
            >
              <span className="whitespace-nowrap">{chat.title}</span>
            </div>
          </Link>
        </div>
      )
}