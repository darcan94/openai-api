import Chat from "@/components/chat/chat";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex h-screen justify-end w-full my-0 mx-auto">
        <Sidebar key="history" className="mt-[4rem]">
          <h1>History</h1>
        </Sidebar>
        <Chat />
        <Sidebar key="settings" className="mt-[4rem]">
          <h1>Settings</h1>
        </Sidebar>
      </main>
    </>
  )
}
