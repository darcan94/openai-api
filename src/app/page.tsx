import Chat from "@/components/chat/chat";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto my-0 flex h-screen w-full justify-end pt-[4rem]">
        <Sidebar key="history" className="w-1/4">
          <h1>History</h1>
        </Sidebar>
        <Chat />
      </main>
    </>
  );
}
