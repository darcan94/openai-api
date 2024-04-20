import { signOut } from "@/../auth";

export default function Header() {
  return (
    <header className="fixed top-0 z-10 hidden h-16 w-full shrink-0 items-center justify-between bg-secondary px-4 text-font">
      <div className="flex items-center"></div>
      <h2>GPT 3.5</h2>
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
    </header>
  );
}
