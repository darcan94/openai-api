'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ chat }: { chat: any }) { 
  const pathname: string = usePathname();
  const active: string = pathname === `/chat/${chat._id}` ? 'bg-background' : '';
  
  return (    
        <Link key={chat._id} className="no-underline overflow-hidden" href={`/chat/${chat._id}`}>
          <div className={`${active} rounded-lg  py-2 px-2 text-font transition-all hover:bg-background`}>
            <span className="font-extralight whitespace-nowrap">{chat.title}</span>
          </div>
        </Link>
  );
}