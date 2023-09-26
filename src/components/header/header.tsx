import Button from "../button/Button"
import { IconSidebar } from "../icons/Icons";

export default function Header() {
  return (
    <header className="blur-9.8 fixed top-0 z-10 flex h-16 w-full items-center justify-between  border-b  border-b-black/10 bg-white/70 px-4 backdrop-blur-lg">
      <Button variant="ghost" size="icon">
          <IconSidebar />
          <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <h2>GPT 3.5</h2>
    </header>
  );
}
