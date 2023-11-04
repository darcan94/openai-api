import Link from "next/link";

export default function SidebarItem({ chat }: { chat: any }) {  
  return (
    <div className="flex-1 overflow-y-auto">
      <nav className="grid gap-4 items-start px-4 text-sm font-medium">
        <Link className="no-underline" href={`/chat/${chat._id}`}>
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50">
            <span className="font-extralight">{chat.title}</span>
          </div>
        </Link>  
      </nav>
    </div>
  );
}