import Sidebar from "@/app/components/sidebar/sidebar";
import SidebarItemList from "@/app/components/sidebar/sidebarItemlist";

export default function Layout({ children }: { children: React.ReactNode }){
    return(        
        <main className="mx-auto my-0 flex flex-1 h-screen w-full justify-end">
          <Sidebar>
             <SidebarItemList />
          </Sidebar>
          {children}
        </main>
    );
}