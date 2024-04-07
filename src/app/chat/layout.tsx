import Sidebar from "@/app/components/sidebar/sidebar";
import SidebarItemList from "@/app/components/sidebar/sidebarItemlist";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-0 flex h-screen w-full justify-end">
      <Sidebar>
        <SidebarItemList />
      </Sidebar>
      {children}
    </div>
  );
}
