import Link from "next/link";

export default function SidebarItem({ chat }: { chat: any }) {  
  return (    
        <Link key={chat._id} className="no-underline overflow-hidden" href={`/chat/${chat._id}`}>
          <div className="rounded-lg  py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100">
            <span className="font-light whitespace-nowrap">{chat.title}</span>
          </div>
        </Link>
  );
}