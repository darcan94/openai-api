import Button from "../button/Button"
import { IconSidebar } from "../icons/Icons";
import Sidebar from "../sidebar/sidebar";

export default function Header() {
  return (
    <header className="blur-9.8 fixed top-0 z-10 flex h-16 w-full items-center justify-between  border-b shrink-0 border-b-black/10 bg-white/70 px-4 backdrop-blur-lg">
      <div className="flex items-center justify-between w-full">

        <Sidebar/>
        <h2>GPT 3.5</h2>
      </div>
    </header>
  );
}
