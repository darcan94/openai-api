import { Chat } from "@/app/modules/chat/domain/Chat";
import SidebarItem from "@/components/sidebar/sidebarItem";

export default function SidebarItems({ chats }: { chats: Chat[] }){
    return(
        <nav className="w-full">
          <ul className="mx-0 flex flex-col gap-2 overflow-hidden">
            {chats.map((chat: Chat) => (
              <li key={chat._id.toString()} className="list-none">
                <SidebarItem chat={chat} />
              </li>
            ))}
          </ul>
        </nav>
    )
}