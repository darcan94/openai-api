import { signOut } from "@/auth";
import Button from "@/components/ui/Button";
import ModelSelector from "@/components/ui/modelSelector";
import { SidebarToggle } from "@/components/sidebar/sidebarToggle";
import ModelConfig from "./modelConfig";

export default function Header() {
  return (
    <header className="flex px-2 justify-center md:justify-between items-center absolute z-10 top-0 h-14 w-full text-font bg-background-alpha backdrop-blur-md">   
      <SidebarToggle />  
      <ModelSelector />

      <div className="flex items-center">
        <ModelConfig />
        
        <form className="hidden md:flex h-full items-center justify-end px-6"
          action={async () => {
            'use server';
            await signOut({redirectTo: '/login'});
          }}>
            <Button variant="rounded" className="text-white bg-primary">
              Sign Out
            </Button>
        </form>
      </div>
    </header>
  );
}
