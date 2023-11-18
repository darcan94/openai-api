import { IconSidebarAlt } from "@/components/icons/Icons";
import SidebarItemList from "@/components/sidebar/sidebarItemlist";
import { Button } from "@/components/button/Button";
 
export default async function Sidebar({ children }: { children?: React.ReactNode }) {
  const res = await fetch('http://localhost:3000/api/chats');
  const {chats} = await res.json();
  
  return (
    <div className="hidden border-r text-font dark:border-white/10 bg-secondary lg:block w-[20%] overflow-y-auto">
        <div className="flex flex-col gap-2 h-full">
          <div className="flex h-[60px] items-center px-6 gap-5 justify-between">
              <h2>Chat history</h2>
              <Button variant="ghost" size="icon">
                <IconSidebarAlt className=""/>
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
          </div>
          <SidebarItemList chats = {chats}/>
        </div>
      </div>
  );
}