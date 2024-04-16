import Sidebar from "@/components/sidebar/sidebar";
import SidebarItemList from "@/components/sidebar/sidebarItemlist";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <Sidebar>
        <SidebarItemList />
      </Sidebar>
      {children}
    </div>
  );
}
