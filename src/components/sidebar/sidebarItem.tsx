import Link from "next/link";

export default function SidebarItem({ chat }: { chat: any }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <nav className="grid gap-4 items-start px-4 text-sm font-medium">
        <Link href="/">
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50">
            Contact Name
          </div>
        </Link>  
      </nav>
    </div>
  );
}

/**
 *  <div>
      <Link href="/">
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={chat.title}
        >
          <span className="whitespace-nowrap">{chat.title}</span>
        </div>
      </Link>
    </div>



    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          Contact Name
        </div>
 */