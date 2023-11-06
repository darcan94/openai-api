import Link from "next/link";

export default function SidebarItem({ chat }: { chat: any }) {  
  return (
    <div key={chat._id} className="flex-1 w-full">
      <nav className="grid gap-4 items-start px-4 text-sm font-medium">
        <Link className="no-underline overflow-hidden" href={`/chat/${chat._id}`}>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100">
            <span className="font-extralight whitespace-nowrap">{chat.title}</span>
          </div>
        </Link>  
      </nav>
    </div>
  );
}