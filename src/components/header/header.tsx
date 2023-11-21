import Sidebar from "@/components/sidebar/sidebar";

export default function Header() {
  return (
    <header className="blur-9.8 fixed top-0 z-10 flex h-16 w-full shrink-0 items-center  justify-between border-b border-b-black/10 bg-white/70 px-4 backdrop-blur-lg">
      <div className="flex items-center">
        <Sidebar />
      </div>
      <h2>GPT 3.5</h2>
    </header>
  );
}
