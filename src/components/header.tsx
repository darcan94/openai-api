import { signOut } from "@/auth";
import Button from "@/components/ui/Button";
import ModelSelector from "./ui/modelSelector";
import { SidebarToggle } from "./sidebar/sidebarToggle";

export default function Header() {
  return (
    <header className="flex px-2 justify-center md:justify-between items-center absolute z-10 top-0 h-14 w-full text-font bg-background-alpha backdrop-blur-md">   
      <SidebarToggle />  
      <ModelSelector />
      <form className="hidden md:flex h-full items-center justify-end px-6"
        action={async () => {
          'use server';
          await signOut({redirectTo: '/login'});
        }}>
          <Button variant="rounded" className="text-white bg-primary">
            Sign Out
          </Button>
      </form>
    </header>
  );
}
