'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ chat }: { chat: any }) { 
  const pathname: string = usePathname();
  const active: string = pathname === `/chat/${chat._id}` ? 'bg-zinc-100' : '';
  
  return (    
        <Link key={chat._id} className="no-underline overflow-hidden" href={`/chat/${chat._id}`}>
          <div className={`${active} rounded-lg  py-2 px-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100`}>
            <span className="font-light whitespace-nowrap">{chat.title}</span>
          </div>
        </Link>
  );
}