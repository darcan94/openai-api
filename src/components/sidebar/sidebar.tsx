import { IconSidebarAlt } from "@/components/icons/Icons";
import SidebarItem from "./sidebarItem";
import { connectDB } from "@/utils/db";

export const runtime = "edge";
 
export default async function Sidebar({ children }: { children?: React.ReactNode }) {
  const collection = await connectDB();
  const chats = await collection.find().toArray();
  console.log(chats);
  
  return (
    <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40 w-[320px]">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6 gap-5">
              <IconSidebarAlt/>
              <h2 className="">Chat history</h2>
          </div>
          <SidebarItem chat={ null }/>
        </div>
      </div>
  );
}