import { signOut } from "@/auth";
import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="absolute z-10 top-0 h-14 w-full text-font bg-background-alpha backdrop-blur-md">
      <form className="flex h-full items-center justify-end px-6"
          action={async () => {
            'use server';
            await signOut({redirectTo: '/login'});
          }}
        >
          <Button variant="rounded" className="text-white bg-primary">
            <div className="hidden md:block">Sign Out</div>
          </Button>
        </form>
    </header>
  );
}
