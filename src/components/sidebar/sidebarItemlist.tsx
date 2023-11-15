import SidebarItem from "./sidebarItem";

export default function SidebarItemList({chats}: {chats: any}){
    const chatList = chats.map((chat: any, i: number) => 
        <li key={i} className="list-none">
            <SidebarItem chat={chat}/>
        </li>)
    
    return (
        <div className="flex flex-col">
            <nav>
              <ul className="flex flex-col mx-2 gap-2 overflow-hidden">
                {chatList}
              </ul>
            </nav>
        </div>
    );
}