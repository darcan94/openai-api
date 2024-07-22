import { auth, signOut } from "@/auth";
import Button from "@/components/ui/Button";
import ModelSelector from "@/components/ui/modelSelector";
import { SidebarToggle } from "@/components/sidebar/sidebarToggle";
import ModelConfig from "./modelConfig";
import Avatar from "./avatar";
import { Session } from "next-auth";
import UserMenu from "./user-menu";

export default async function Header() {
  const session: Session | null = await auth();

  return (
    <header className="flex px-2 justify-center md:justify-between items-center absolute z-10 top-0 h-14 w-full text-font bg-background-alpha backdrop-blur-md">   
      <SidebarToggle />  
      <ModelSelector />

      <div className="flex items-center">
        <ModelConfig />
        
        
        <UserMenu session={session}>
          <form className="hidden md:flex h-full items-center justify-end px-2"
            action={async () => {
              'use server';
              await signOut({redirectTo: '/login'});
            }}>
              <Button variant="ghost" className="text-white font-extralight">
                Sign Out
              </Button>
          </form>
        </UserMenu>
      </div>
    </header>
  );
}
